<template>
  <!-- 通过ref访问DOM -->
  <h1 ref='box'>一行文字</h1>

  <div v-for='i in 5' :ref='collect'></div>

</template>

<script setup>
  import { ref, onMounted } from 'vue'
  const box = ref(null)

  // v3中，使用自定义方法收集ref对象
  let refs = []
  const collect = (ref) => {
    if (ref) refs.push(ref)
  }

  onMounted(()=>{
    console.log('----box', box)
    box.value.style.color = 'red'
  })

  onMounted(()=>{
    console.log('----refs', refs)
  })

</script>
