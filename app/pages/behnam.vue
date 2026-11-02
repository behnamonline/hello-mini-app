<script setup lang="ts">
import { ref } from 'vue';

const name = ref('');
const greetingMessage = ref('');

const sendName = async () => {
  if (!name.value.trim()) return;

  const { data } = await useFetch('/api/hello', {
    method: 'POST',
    body: { name: name.value }
  });

  if (data.value) {
    greetingMessage.value = data.value.message;
  }
};
</script>

<template>
  <div class="flex min-h-screen items-center justify-center bg-gray-50 px-4">
    <div class="w-full max-w-md rounded-2xl bg-white p-8 shadow-sm border border-gray-100 text-gray-900">
      <h1 class="text-xl font-semibold mb-6">خوش‌آمدگویی</h1>

      <div class="flex gap-2">
        <input 
          v-model="name" 
          type="text" 
          placeholder="اسم خودت رو وارد کن..." 
          @keyup.enter="sendName"
          class="flex-1 rounded-xl border border-gray-200 px-4 py-2.5 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black/5 focus:border-black transition-all"
        />
        <button 
          @click="sendName"
          class="rounded-xl bg-black px-5 py-2.5 font-medium text-white hover:bg-gray-800 active:scale-95 transition-all"
        >
          بفرست
        </button>
      </div>

      <!-- پیام خروجی با متن مشکی و خوانا -->
      <p v-if="greetingMessage" class="mt-6 text-base font-medium text-gray-900">
        {{ greetingMessage }}
      </p>
    </div>
  </div>
</template>