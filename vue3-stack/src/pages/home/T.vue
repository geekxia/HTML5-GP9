<template>
  <h1 class='hello'>你好</h1>
  <button @click='change'>变化</button>
  <hr>

  <h1 :class='$style.hello'>世界</h1>
  <hr>

  <h1 :class='qf.world'>千锋</h1>
</template>

<script setup>
  import { ref, reactive, computed, useCssModule } from 'vue'
  import bg from '@/assets/vue.svg'

  const style = useCssModule()
  const qf = useCssModule('qf')
  console.log('---style', style)
  console.log('---style', qf)

  const c = reactive({
    hello: 'red',
    bg: bg,
    size: 30
  })

  const change = () => {
    c.hello = 'blue'
    c.size += 10
  }

  const size = computed(()=>{
    return c.size + 'px'
  })

</script>

<!-- 在视图结构中，使用$style访问样式名 -->
<style module>
  .hello {
    color: purple;
  }
  .world {
    color: orange;
  }
</style>

<style lang="scss" scoped>
.hello {
  color: v-bind("c.hello");
  background-image: v-bind("c.bg");
  font-size: v-bind(size);
}
</style>

<style module='qf'>
  .hello {
    font-size: 30px;
  }
  .world {
    font-size: 50px;
  }
</style>
