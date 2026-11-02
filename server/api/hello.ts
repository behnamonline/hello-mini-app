export default defineEventHandler((event) => {
  // گرفتن پارامتر ارسال شده از فرانت‌اند (مثل ?name=علی)
  const query = getQuery(event);
  const name = query.name ? String(query.name) : 'کاربر مهمان';

  return {
    message: `سلام ${name}! خوش آمدید.`
  };
});