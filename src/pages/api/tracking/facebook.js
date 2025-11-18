import { fb } from '@/services/tracking/node'
import { JSONResponse, parseData } from '@splendidlabz/astro/server'

export const prerender = false

export async function POST(context) {
  const body = await parseData(context)

  const { response, error } = await fb.sendEvent(body, { context })

  if (response) return new JSONResponse(response.body, { status: 200 })
  if (error) return new JSONResponse(error, { status: 500 })
}
