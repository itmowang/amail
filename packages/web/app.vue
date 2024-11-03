<template>
  <div class="bg-gray-900">
    <div class="container mx-auto p-6 flex flex-col md:flex-row min-h-screen">
      <!-- 左侧菜单 -->
      <div class="w-full md:w-1/3 bg-gray-800 text-white p-6 rounded-lg shadow-lg mb-6 md:mb-0">
        <h1 class="text-3xl font-bold mb-4 text-center">匿名邮件生成器</h1>
        <button @click="verifrCode"
          class="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-lg transition-all transform hover:scale-105 shadow-lg">
          {{ isEmailsLoaded ? "重新生成匿名邮箱" : "生成匿名邮箱" }}
        </button>

        <div id="example-container" class="mt-2"></div>

        <div v-if="isEmailsLoaded" class="mt-6 text-center">
          <p class="font-semibold">邮箱: <span class="text-blue-300">{{ anonymousEmail }}</span></p>
          <p class="text-gray-400">每封邮件保留有效期: <span class="text-red-400">60分钟</span></p>
        </div>

        <h2 class="text-lg font-semibold mt-6">邮件列表</h2>
        <ul class="mt-2 space-y-2">
          <li v-for="(email, index) in emailList" :key="index"
            class="p-4 bg-gray-700 rounded-lg transition-all transform hover:scale-105 cursor-pointer shadow-md"
            @click="selectEmail(index)">
            <h3 class="font-bold text-lg">{{ email.subject }}</h3>
            <p class="text-gray-300">{{ email.from.name }} - {{ email.from.address }}</p>
          </li>
        </ul>
      </div>
      <!-- 右侧邮件内容 -->
      <div class="w-full md:w-2/3 bg-white p-6 rounded-lg shadow-xl">
        <h2 class="text-2xl font-bold mb-4">阅读邮件</h2>
        <div v-if="selectedEmail" class="bg-gray-100 p-4 rounded-lg shadow">
          <h3 class="font-bold text-xl">{{ selectedEmail.subject }}</h3>
          <p class="text-gray-700 mt-2" v-html="selectedEmail.html"></p>
        </div>
        <p v-else class="text-gray-500">请选择一封邮件查看内容。</p>
      </div>
    </div>
  </div>

</template>

<script setup>
import { ref, onMounted, nextTick } from 'vue';
const anonymousEmail = ref('');
const emailList = ref([]);
const selectedEmail = ref(null);
const isEmailsLoaded = ref(false);
const widgetId = ref("");


onMounted(async () => {
  getApp()

});



// watch监听isEmailsLoaded为true  才会触发每10秒刷新一次数据
watch(isEmailsLoaded, async (newValue) => {
  if (newValue) {
    await load();
    await setInterval(load, 10000);
  }
});

const load = async () => {
  const { data } = await useFetch(`https://amaiserver.loli5.workers.dev/api/mail/tt?name=${anonymousEmail.value}`)
  emailList.value = data.value
}

// 初始化的时候查看缓存是否存在app 如果有那么就保持有效状态
const getApp = () => {
  const app = JSON.parse(localStorage.getItem('app'));
  if (app?.email) {
    // base64 解码
    const email = atob(app.email);
    isEmailsLoaded.value = true;
    anonymousEmail.value = email;
  }
};

const verifrCode = () => {
  if (widgetId.value) {
    turnstile.reset(widgetId.value)
  } else {
    const id = turnstile.render("#example-container", {
      sitekey: "0x4AAAAAAAzEIyN1kQKtXnzo",
      callback: function (token) {
        generateAnonymousEmail();
      },
    });
    widgetId.value = id

  }

}

const generateAnonymousEmail = () => {
  isEmailsLoaded.value = true;
  const randomEmail = `${Math.floor(Math.random() * 10000)}@xmw.pw`;
  // 随机的randomEmail转换成为base64编码
  const base64Email = btoa(randomEmail);
  // 存入到浏览器的localStorage
  localStorage.setItem('app', JSON.stringify({ email: base64Email }));
  anonymousEmail.value = randomEmail;

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
