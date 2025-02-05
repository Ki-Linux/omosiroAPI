<template>
  <div>
    <h1>Posts</h1>
    <ul>
      <li v-for="post in posts" :key="post.id">{{ post }}</li>
    </ul>
  </div>
</template>

<script>
export default {
  // asyncDataはサーバーサイドでもクライアントサイドでも使える
  async asyncData() {
    try {
      // APIリクエスト
      const response = await fetch('https://api.thecatapi.com/v1/images/search', {
        headers: {
          'x-api-key': 'live_sdcNbLUqhUASzVOFuJmG2hirFNLMDafmjA6cSyTBR5Ie0A3WKjRdCv7q71ml17e2'
        }
      });
      // レスポンスをJSONに変換
      const data = await response.json();

      // 取得したデータを返す
      return {
        posts: data
      };
    } catch (error) {
      console.error('Error fetching data:', error);
      return {
        posts: [] // エラー時は空の配列を返す
      };
    }
  },
  // `data` は `asyncData` から返された値を受け取ります。
  data() {
    return {
      posts: [] // 初期値は空配列
    };
  }
}
</script>