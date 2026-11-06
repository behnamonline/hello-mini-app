import { createHmac, timingSafeEqual } from 'node:crypto'

export function tgAuth(event: any, maxAge = 86400) {
  const auth = getHeader(event, 'authorization') || ''
  const initData = auth.startsWith('tma ') ? auth.slice(4) : ''
 const telegramBotToken = "9289080952:AAGuWS2LD1USCdUZ7urzebcyL3ENrPoqJdg"

  const fail = () => {
    throw createError({ statusCode: 403, statusMessage: 'Forbidden' })
  }

  if (!initData) fail()

  const params = new URLSearchParams(initData)
  const checkHash = params.get('hash')
  if (!checkHash) fail()
  params.delete('hash')

  const dataCheckString = [...params.entries()]
    .sort(([a], [b]) => (a < b ? -1 : a > b ? 1 : 0))
    .map(([k, v]) => `${k}=${v}`)
    .join('\n')

  const secretKey = createHmac('sha256', 'WebAppData').update(telegramBotToken).digest()
  const hash = createHmac('sha256', secretKey).update(dataCheckString).digest('hex')

  const a = Buffer.from(hash, 'hex')
  const b = Buffer.from(checkHash!, 'hex')
  if (a.length !== b.length || !timingSafeEqual(a, b)) fail()

  const authDate = Number(params.get('auth_date'))
  if (!authDate || Date.now() / 1000 - authDate > maxAge) fail()

  try {
    return JSON.parse(params.get('user')!)
  } catch {
    fail()
  }
}