<template>
  <div>
    <div id="map" style="width: 100%; height: 400px;"></div>
  </div>
</template>

<script>
import { Loader } from "@googlemaps/js-api-loader";
import { prefectureData } from '../../data/prefectureData';

export default {
  data() {
    return {
      // google map API
      loader: new Loader({
        apiKey: this.$config.googleMapsApiKey, // ここにあなたのAPIキーを入れます
        version: 'weekly', // 最新バージョンを指定
      }),
    }
  },

  mounted() {

    this.loader.load().then(() => {
      new google.maps.Map(document.getElementById("map"), {
        center: { lat: 35.6895, lng: 139.6917 }, // 初期表示位置（例: 東京）
        zoom: 4,
      });
    });
  },
  computed: {
    // Vuexのstateを取得
    prefecture() {
      return this.$store.state.prefecture;
    },
    spotInfo() {
      return this.$store.state.spotInfo;
    }
  },
  watch: {
    // selectedDayの変更を監視
    prefecture(newVal, oldVal) {

      if(newVal) {
        const selectedPrefectureData = prefectureData.find((prefectureObject) => prefectureObject.prefecture === newVal);
    
    //地図の位置を移動
    this.loader.load().then(() => {
      new google.maps.Map(document.getElementById("map"), {
        center: { lat: selectedPrefectureData.selectedPrefectureLat, lng: selectedPrefectureData.selectedPrefectureLng }, // 初期表示位置（例: 東京）
        zoom: 9,
      });
    });
  
      }
    },

    // スポット情報を取得
    spotInfo(newVal, oldVal) {
      if(newVal) {

    
    this.loader.load().then(() => {
      const map = new google.maps.Map(document.getElementById("map"), {
        center: { lat: newVal[0].lat, lng: newVal[0].lng }, // 初期表示位置
        zoom: 13,
      });

      
      // ウインドウインスタンスを作成
      const infoWindow = new google.maps.InfoWindow();
      // LatLngBoundsをインスタンス作成して、すべてのマーカーを含める
        const bounds = new google.maps.LatLngBounds();

      newVal.forEach(position => {

        const marker = new google.maps.Marker({
          position: { lat: position.lat, lng: position.lng },
          map: map,
          title: position.name
        });

        // マーカーをLatLngBoundsに{ lat: position.lat, lng: position.lng }として入れる
        bounds.extend(marker.position);
      
        // マーカークリック時
        marker.addListener("click", () => {
          
          // 表示するウィンドウを作成
          infoWindow.setContent(
            
            `
             <img src="${position.logo_image}" alt="no image">
             <h3>${position.name}</h3>
             <p>${position.address}</p>
             <p>${position.open}</p>
             <p><a href="${position.urls.pc}" target="_blank">詳しくはこちら</a></p>
            `
          );
          // ウィンドウを表示
          infoWindow.open(map, marker);
        });
      });
      // マップのズームと中心をマーカーに合わせて調整 → ズームレベルが自動で調整される
      map.fitBounds(bounds);
    });
  
      }
    },
  },

  
};
</script>

<style scoped>
#map {
  width: 100%;
  height: 400px;
}
</style>
