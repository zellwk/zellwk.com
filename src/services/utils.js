import { flattenArrayFields, formDataToObject } from '@splendidlabz/utils'
import { sanitize } from '@splendidlabz/utils/node'

/**
 * @param {APIContext} context - Astro context object
 * @return {string} Client IP address
 */
export function getIpAddress(context) {
  return context.clientAddress
}

/**
 * @param {APIContext} context - Astro context object
 * @return {string} Full URL including query parameters
 */
export function getCurrentUrl(context) {
  return context.url.href
}

export async function parseData(
  context,
  { sanitize: shouldSanitize = true } = {},
) {
  const { request } = context
  const contentType = request.headers.get('content-type')

  // Parse and return JSON
  if (contentType.includes('json')) return request.json()

  // Standard form data
  let data = formDataToObject(await request.formData())
  if (shouldSanitize) data = sanitize(data)
  return flattenArrayFields(data)
}

function response({ data, headers = {}, options = {} }) {
  const { status, headers: userHeaders = {}, ...rest } = options
  return new Response(data, {
    ...rest,
    status: status || 200,
    headers: {
      ...headers,
      ...userHeaders,
    },
  })
}

export function JSONResponse(data, options) {
  return response({
    data: JSON.stringify(data),
    headers: { 'Content-Type': 'application/json' },
    options,
  })
}
