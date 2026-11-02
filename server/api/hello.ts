export default defineEventHandler(async (event) => {
  // گرفتن داده‌های ارسالی از سمت کاربر (متد POST)
  const body = await readBody(event);
  const name = body?.name || 'دوست عزیز';

  return {
    message: `سلام ${name}، خوش اومدی به Nuxt!`
  };
});