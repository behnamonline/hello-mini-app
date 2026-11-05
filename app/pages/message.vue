<template>
  <div style="max-width: 400px; margin: 40px auto; font-family: Tahoma, sans-serif;">
    <h2>ارسال پیام جدید</h2>
    
    <form @submit.prevent="sendMessage">
      <input 
        v-model="newMessage" 
        type="text" 
        placeholder="پیام خود را بنویسید..." 
        style="width: 100%; padding: 8px; margin-bottom: 10px;color: black;"
      />
      <button type="submit" :disabled="loading" style="padding: 8px 16px;">
        {{ loading ? 'در حال ارسال...' : 'ارسال پیام' }}
      </button>
    </form>

    <p v-if="statusMessage" style="margin-top: 10px; color: green;">
      {{ statusMessage }}
    </p>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const newMessage = ref('')
const loading = ref(false)
const statusMessage = ref('')

const sendMessage = async () => {
  if (!newMessage.value.trim()) return

  loading.value = true
  statusMessage.value = ''

  try {
    const response = await $fetch('/api/messages', {
      method: 'POST',
      body: {
        message: newMessage.value
      }
    })

    if (response.success) {
      statusMessage.value = 'پیام شما با موفقیت در دیتابیس ثبت شد!'
      newMessage.value = '' // پاک کردن اینپوت
    }
  } catch (error) {
    console.error(error)
    statusMessage.value = 'خطایی در ارسال پیام رخ داد.'
  } finally {
    loading.value = false
  }
}
</script>