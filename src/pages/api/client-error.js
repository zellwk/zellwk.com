export const prerender = false

export async function POST({ request }) {
  const report = JSON.parse(await request.text())
  const userAgent = request.headers.get('user-agent')

  console.log('Client error:', { ...report, userAgent })
  return new Response(null, { status: 204 })
}
