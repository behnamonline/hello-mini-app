// server/api/messages.post.ts

import { myDB } from "./db";

export default defineEventHandler(async (event) => {
  // گرفتن داده‌های ارسالی از فرانت‌اند
  const body = await readBody(event);
  const userMessage = body?.message;

  if (!userMessage) {
    throw createError({
      statusCode: 400,
      statusMessage: "متن پیام الزامی است.",
    });
  }

  const db = myDB()

  // اصلاحیه کوئری برای جلوگیری از SQL Injection و درج امن پیام
  await db.sql`
    insert into messages (message) values (${userMessage})
  `;

  return {
    success: true,
    message: "پیام با موفقیت ذخیره شد.",
  };
});