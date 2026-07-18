import { supabase } from './supabase'


const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api'


async function getAccessToken() {
  const { data: { session }, error } = await supabase.auth.getSession()

  if (error) throw error
  if (!session?.access_token) throw new Error('No active Supabase session')

  return session.access_token
}


async function request(endpoint, { method = 'GET', body, headers = {}, ...options } = {}) {
  const accessToken = await getAccessToken()

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    method,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
      ...headers,
    },
    body: body !== undefined ? JSON.stringify(body) : undefined,
    ...options,
  })

  if (!response.ok) {
    const text = await response.text()
    throw new Error(text || `Request failed with status ${response.status}`)
  }

  const contentType = response.headers.get('content-type') || ''

  if (contentType.includes('application/json')) {
    return response.json()
  }

  return response.text()
}


export const api = {
  get: (endpoint, options) => request(endpoint, { ...options, method: 'GET' }),
  post: (endpoint, body, options) => request(endpoint, { ...options, method: 'POST', body }),
  put: (endpoint, body, options) => request(endpoint, { ...options, method: 'PUT', body }),
  delete: (endpoint, options) => request(endpoint, { ...options, method: 'DELETE' }),
}
