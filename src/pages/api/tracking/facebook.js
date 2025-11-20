import { fb } from '@/services/tracking/node'
import { JSONResponse, parseData } from '@splendidlabz/astro/server'

export const prerender = false

export async function POST(context) {
  const body = await parseData(context)

  const data = { context, ...body }
  const { response, error } = await fb.sendEvent(data)

  if (response) return new JSONResponse(response.body, { status: 200 })
  if (error) return new JSONResponse(error, { status: 500 })
}
