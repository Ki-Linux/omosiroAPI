<template>
  <div>
    <h1>Random Cat Image</h1>
    <p>{{ catImage }}</p>
    <li v-for="(image, index) in catImage" :key="index">
      <img :src="image.url" alt="Random Cat" />
    </li>
    <p v-if="!catImage">Loading...</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      catImage: null  // 初期状態ではnull
    };
  },
  created() {
    // created フックで API を呼び出す
    this.fetchCatImage();
  },
  methods: {
    async fetchCatImage() {
      try {
        const response = await this.$axios.get('https://api.thecatapi.com/v1/images/search?limit=10', {
          headers: {
            'x-api-key': process.env.API_KEY_CAT // API キーをリクエストヘッダーに追加
          }
        });
        this.catImage = response.data;  // 取得した画像URLをcatImageに保存
      } catch (error) {
        console.error('Error fetching cat image:', error);
      }
    }
  }
};
</script>