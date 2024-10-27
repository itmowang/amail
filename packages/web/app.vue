<template>
  <div class="bg-gradient-to-r from-blue-900 to-purple-900">
    <div class="container flex mx-auto min-h-screen p-6">
      <div class="w-1/3 bg-gray-800 text-white p-6 rounded-lg shadow-lg">
        
        <h1 class="text-3xl font-bold mb-4 text-center">{{data}}匿名邮件生成器</h1>
        <button 
          @click="generateAnonymousEmail" 
          class="w-full bg-blue-500 hover:bg-blue-700 text-white px-4 py-3 rounded-lg transition-all transform hover:scale-105 shadow-lg"
        >
          生成随机匿名邮箱
        </button>
        <div v-if="anonymousEmail" class="mt-6 text-center">
          <p class="font-semibold">邮箱: <span class="text-blue-300">{{ anonymousEmail }}</span></p>
          <p class="text-gray-400">有效期: <span class="text-red-400">{{ expiryTime }}</span></p>
        </div>

        <h2 class="text-lg font-semibold mt-6">邮件列表</h2>
        <ul class="mt-2 space-y-2">
          <li 
            v-for="(email, index) in emailList" 
            :key="index" 
            class="p-4 bg-gray-700 rounded-lg transition-all transform hover:scale-105 cursor-pointer shadow-md"
            @click="selectEmail(index)"
          >
            <h3 class="font-bold text-lg">{{ email.subject }}</h3>
            <p class="text-gray-300">{{ email.preview }}</p>
          </li>
        </ul>
      </div>

      <div class="w-2/3 ml-6 bg-white p-6 rounded-lg shadow-xl">
        <h2 class="text-2xl font-bold mb-4">阅读邮件</h2>
        <div v-if="selectedEmail" class="bg-gray-100 p-4 rounded-lg shadow">
          <h3 class="font-bold text-xl">{{ selectedEmail.subject }}</h3>
          <p class="text-gray-700 mt-2">{{ selectedEmail.content }}</p>
        </div>
        <p v-else class="text-gray-500">请选择一封邮件查看内容。</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref,onMounted } from 'vue';
const { data } = await useFetch('/api/test')

onMounted(async () => {

});

const anonymousEmail = ref('');
const expiryTime = ref('');
const emailList = ref([]);
const selectedEmail = ref(null);

const generateAnonymousEmail = () => {
  const randomEmail = `user${Math.floor(Math.random() * 10000)}@anonymous.com`;
  const now = new Date();
  const expiry = new Date(now.getTime() + 60 * 60 * 1000); // 1小时有效期
  anonymousEmail.value = randomEmail;
  expiryTime.value = expiry.toLocaleString();

  // 添加一封测试邮件
  emailList.value.push({
    subject: '测试邮件',
    preview: '这是邮件的预览内容...',
    content: '这是邮件的详细内容。',
  });
};

const selectEmail = (index) => {
  selectedEmail.value = emailList.value[index];
};
</script>

<style>
.container {
  max-width: 1200px;
}
</style>
