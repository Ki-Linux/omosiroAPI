<template>
  <div>
    <form>
      <label for="prefectures">都道府県を選んでください:</label>
      <select id="prefectures" name="prefectures" v-model="selectedPrefectureIndex">
        <option v-for="(prefecture_data, index) in prefectureData" :key="index" :value="index">
          {{ prefecture_data.prefecture }}
        </option>
      </select>
    </form>
  </div>
</template>

<script type="ts">
import { prefectureData } from '../../data/prefectureData'; 

export default {
  data() {
    return {
      prefectureData: prefectureData,
      selectedPrefectureIndex: '',
    }
  },
  watch: {
    selectedPrefectureIndex(prefectureIndex) {
      // 選択された都道府県のアクションを実行
      this.fetchData(prefectureData[prefectureIndex].code);

      // 選択された都道府県をマップに表示するためにstoreへ入れる
      this.$store.dispatch('setSelectedPrefecture', prefectureData[prefectureIndex].prefecture);
    }
  },
  methods: {
    async fetchData(prefectureCode) {

      console.log(window.location.hostname)
      
    try {
      const response = await this.$axios.$get('/api/data', {
        params: {
          hostName: window.location.hostname,
          large_area: prefectureCode
        }
      }); 

      //レスポンスされたデータをstoreに格納
     this.$store.dispatch('setSelectedMiddleArea', response);
      
    } catch (error) {
      console.error('データ取得エラー:', error);
    }
  },
  }
}
</script>
<style scoped>
</style>
