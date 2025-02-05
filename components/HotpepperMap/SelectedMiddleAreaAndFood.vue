<template>
  <div v-if="showMiddleAreaAndFood">
    <form>
      <label for="prefectures">エリアを選んでください:</label>
      <select id="prefectures" name="prefectures" v-model="selectedMiddleAreaIndex">
        <option v-for="(middle_area, index) in middleArea" :key="index" :value="index">
          {{ middle_area.name }}
        </option>
      </select>
    </form>
    <form>
      <label for="prefectures">飲食店のジャンルを選んでください:</label>
      <select id="prefectures" name="prefectures" v-model="selectedRestaurantCategoryDataIndex">
        <option v-for="(restaurant_category_data, index) in restaurantCategoryData" :key="index" :value="index">
          {{ restaurant_category_data.category }}
        </option>
      </select>
    </form>
    <button v-if="middleAreaIndex !== '' && restaurantCategoryDataIndex !== ''" @click="searchRecommendRestaurant">
        検索
    </button>
  </div>
</template>

<script type="ts"> 
import { restaurantCategoryData } from '../../data/restaurantCategoryData';

export default {
  data() {
    return {
      restaurantCategoryData: restaurantCategoryData,
      showMiddleAreaAndFood: false,
      selectedMiddleAreaIndex: '',
      middleAreaIndex: '', 
      selectedRestaurantCategoryDataIndex: '',
      restaurantCategoryDataIndex: '', 
    }
   },
  computed: {
    // Vuexのstateを取得
    middleArea() {
      return this.$store.state.middleArea;
    }
  },
  watch: {
    // selectedDayの変更を監視
    middleArea(newVal, oldVal) {
      if(newVal) {
        this.showMiddleAreaAndFood = true;
      }
    },

    // 選択された都道府県の地区を選択
    selectedMiddleAreaIndex(middleAreaIndex) {
      this.middleAreaIndex = middleAreaIndex;
    },
    // 選択された飲食店のカテゴリーを選択
    selectedRestaurantCategoryDataIndex(restaurantCategoryDataIndex) {
        this.restaurantCategoryDataIndex = restaurantCategoryDataIndex;
    }
  },
  methods: {
    //都道府県の地区と飲食店のカテゴリーを参考にAPIを呼び出す
    async searchRecommendRestaurant() {

        try {
          const response = await this.$axios.$get('/api/spot', {
            params: {
              hostName: window.location.hostname,
              middle_area: this.$store.state.middleArea[this.middleAreaIndex].code,
              genre: restaurantCategoryData[this.restaurantCategoryDataIndex].code,
            }
          }); 


      //レスポンスがないとき
      if(response.length === 0 || response === null) {
        alert('検索されたデータがありません');
        return;
      }

      //storeへ格納
      this.$store.dispatch('setSelectedSpotInfo', response);
      
    } catch (error) {
      console.error('データ取得エラー:', error);
    }
    }
  }
}
</script>
<style scoped>
</style>
