import { sendy } from '../../services/sendy.js'
import { JSONResponse, parseData } from '../../services/utils.js'
export const prerender = false

export async function POST(context) {
  const body = await parseData(context)

  // Honeypot check
  if (body.hp) return

  const response = await sendy.subscribe({
    context,
    email: body.email,
    name: body.name,
  })

  if (response) return JSONResponse({ message: 'Success' })
  else return JSONResponse({ message: 'Error' }, { status: 400 })
}
