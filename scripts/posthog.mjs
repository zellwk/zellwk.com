#!/usr/bin/env node
// PostHog read helper — run HogQL against the query API.
// Usage: node scripts/posthog.mjs "SELECT event, count() FROM events GROUP BY event"
// Reads POSTHOG_PERSONAL_API_KEY from .env (query:read scope). US cloud.

import { readFileSync } from 'node:fs'

const HOST = 'https://us.posthog.com'

function loadEnv() {
  try {
    const raw = readFileSync(new URL('../.env', import.meta.url), 'utf8')
    for (const line of raw.split('\n')) {
      const m = line.match(/^\s*([\w.-]+)\s*=\s*(.*)\s*$/)
      if (m && !process.env[m[1]]) {
        process.env[m[1]] = m[2].replace(/^["']|["']$/g, '')
      }
    }
  } catch {}
}

loadEnv()
const KEY = process.env.POSTHOG_PERSONAL_API_KEY
if (!KEY) {
  console.error('Missing POSTHOG_PERSONAL_API_KEY in .env')
  process.exit(1)
}

const headers = {
  'Content-Type': 'application/json',
  Authorization: `Bearer ${KEY}`,
}

async function getProjectId() {
  if (process.env.POSTHOG_PROJECT_ID) return process.env.POSTHOG_PROJECT_ID
  const res = await fetch(`${HOST}/api/projects/`, { headers })
  if (!res.ok) throw new Error(`projects list ${res.status}: ${await res.text()}`)
  const { results } = await res.json()
  if (!results?.length) throw new Error('No projects visible to this key')
  // Pin to the project matching this site's ingest key, not just the first one.
  const token = process.env.PUBLIC_POSTHOG_KEY
  const match = results.find(p => p.api_token === token)
  if (!match) {
    throw new Error(
      `No project matches PUBLIC_POSTHOG_KEY. Set POSTHOG_PROJECT_ID. Visible: ${results
        .map(p => `${p.id}:${p.name}`)
        .join(', ')}`,
    )
  }
  return match.id
}

async function query(hogql) {
  const projectId = await getProjectId()
  const res = await fetch(`${HOST}/api/projects/${projectId}/query/`, {
    method: 'POST',
    headers,
    body: JSON.stringify({ query: { kind: 'HogQLQuery', query: hogql } }),
  })
  if (!res.ok) throw new Error(`query ${res.status}: ${await res.text()}`)
  return res.json()
}

const hogql =
  process.argv[2] ||
  "SELECT event, count() AS n, max(timestamp) AS last_seen FROM events WHERE timestamp > now() - INTERVAL 24 HOUR GROUP BY event ORDER BY n DESC"

const { columns, results } = await query(hogql)
console.log(columns.join('\t'))
for (const row of results) console.log(row.join('\t'))
