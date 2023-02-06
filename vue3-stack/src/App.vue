<template>
  <div>
    <van-button type="primary">点击</van-button>

    <router-link to='/cate' custom v-slot="{ navigate }">
      <span @click='navigate'>品类</span>
    </router-link>
    <hr>
    <router-view></router-view>
  </div>
</template>

<script setup>
  import { useRouter } from 'vue-router'
  const router = useRouter()
  console.log('---router', router)

</script>
