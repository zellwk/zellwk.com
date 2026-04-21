import { lists, sendy } from '../../services/sendy.js'
import { JSONResponse, parseData } from '../../services/utils.js'
export const prerender = false

export async function POST(context) {
  const body = await parseData(context)
  console.log(body)

  // Honeypot check
  if (body.hp) return

  const listId = lists[body.list] || lists.main
  console.log(listId)

  const response = await sendy.subscribe({
    context,
    email: body.email,
    name: body.name,
    listId,
  })

  if (response) return JSONResponse({ message: 'Success' })
  else return JSONResponse({ message: 'Error' }, { status: 400 })
}
