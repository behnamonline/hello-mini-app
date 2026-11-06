export function req<T = any>(url: string, options: any = {}): Promise<T> {
  return $fetch<T>(url, {
    ...options,
    headers: {
      ...options.headers,
      Authorization: `tma ${window.Telegram?.WebApp?.initData || ''}`,
    },
  })
}