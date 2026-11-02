<script setup lang="ts">
import { ref } from 'vue';

const name = ref('');
const greetingMessage = ref('');
const loading = ref(false);

const sendName = async () => {
  if (!name.value.trim()) return;
  
  loading.value = true;
  try {
    const { data } = await useFetch('/api/hello', {
      query: { name: name.value }
    });
    
    if (data.value && typeof data.value === 'object' && 'message' in data.value) {
      greetingMessage.value = data.value.message as string;
    }
  } catch (error) {
    console.error('Error fetching API:', error);
  } finally {
    loading.value = false;
  }
};
</script>

<template>
  <div class="container">
    <div class="card">
      <h1>خوش‌آمدگویی با Nuxt</h1>
      <p class="subtitle">لطفاً نام خود را وارد کنید تا به شما سلام کنیم.</p>
      
      <!-- فرم دریافت اسم -->
      <div class="form-group">
        <input 
          v-model="name" 
          type="text" 
          placeholder="نام شما..." 
          @keyup.enter="sendName"
          class="input-field"
        />
        <button @click="sendName" :disabled="loading" class="btn">
          {{ loading ? 'در حال ارسال...' : 'ارسال' }}
        </button>
      </div>

      <!-- نمایش پیام دریافتی از API -->
      <transition name="fade">
        <div v-if="greetingMessage" class="result-box">
          <p>{{ greetingMessage }}</p>
        </div>
      </transition>
    </div>
  </div>
</template>

<style scoped>
/* استایل‌های کلی صفحه و مرکزچین کردن */
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #f4f7f6;
  font-family: 'Tahoma', 'Vazirmatn', sans-serif;
  direction: rtl;
}

/* کارت اصلی */
.card {
  background: #ffffff;
  padding: 30px;
  border-radius: 12px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
  width: 100%;
  max-width: 400px;
  text-align: center;
}

h1 {
  font-size: 1.5rem;
  color: #333;
  margin-bottom: 8px;
}

.subtitle {
  font-size: 0.9rem;
  color: #666;
  margin-bottom: 20px;
}

/* بخش فرم */
.form-group {
  display: flex;
  gap: 10px;
}

/* اینپوت با متن کاملاً سیاه */
.input-field {
  flex: 1;
  padding: 10px 14px;
  font-size: 1rem;
  color: #000000 !important; /* رنگ متن سیاه */
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 8px;
  outline: none;
  transition: border-color 0.3s;
}

.input-field::placeholder {
  color: #888; /* رنگ متن راهنما (Placeholder) */
}

.input-field:focus {
  border-color: #4f46e5;
}

/* دکمه */
.btn {
  padding: 10px 20px;
  font-size: 1rem;
  font-weight: bold;
  color: #fff;
  background-color: #4f46e5;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.btn:hover:not(:disabled) {
  background-color: #4338ca;
}

.btn:disabled {
  background-color: #a5b4fc;
  cursor: not-allowed;
}

/* کادر نمایش پاسخ */
.result-box {
  margin-top: 20px;
  padding: 12px;
  background-color: #ecfdf5;
  border: 1px solid #a7f3d0;
  border-radius: 8px;
  color: #065f46;
  font-weight: bold;
  font-size: 1.1rem;
}

/* انیمیشن ظاهر شدن پیام */
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.4s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>