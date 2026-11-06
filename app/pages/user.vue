<script setup lang="ts">
import { req } from '~/tgRequest';


const user = ref(null);
const error = ref(false);

onMounted(async () => {
    try {
        user.value = await req("/api/user")
    } catch {
        error.value = true
    }
})

</script>

<template>

    <div v-if="user"> <pre>{{ user }}</pre> </div>
    <div v-if="error">خطا در ورود</div>
</template>