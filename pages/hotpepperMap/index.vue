<template>
  <div>
    <h1>ホットペッパーグルメがおすすめする飲食店</h1>
    <SelectedPrefecture />
    <SelectedMiddleAreaAndFood />
    <GoogleMap />
  </div>
</template>

<script>
import SelectedPrefecture from '../../components/HotpepperMap/SelectedPrefecture.vue';
import SelectedMiddleAreaAndFood from '../../components/HotpepperMap/SelectedMiddleAreaAndFood.vue';
import GoogleMap from '../../components/HotpepperMap/GoogleMap.vue';

export default {
  components: {
    SelectedPrefecture,
    SelectedMiddleAreaAndFood,
    GoogleMap,
  }
}
</script>