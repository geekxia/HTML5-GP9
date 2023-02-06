<template>
  <h1>学习组合 API</h1>
  <h1 v-text='x.a.b.c.d'></h1>
  <button @click='change'>变化</button>
  <hr>

  <h1 v-text='y.a.b.c.d'></h1>
  <h1 v-text='y.count'></h1>
  <button @click='change2'>变化</button>

</template>

<script setup>
  import { shallowRef, shallowReactive, shallowReadonly, ref, triggerRef } from 'vue'

  const obj = {
    a: {
      b: {
        c: {
          d: 1
        }
      }
    }
  }

  const x = shallowRef(obj)
  console.log('---x', x)

  const change = () => {
    x.value.a.b.c.d++
    triggerRef(x)
  }

  const foo = {
    a: {
      b: {
        c: {
          d: 2
        }
      }
    },
    count: 1
  }
  const y = shallowReactive(foo)
  const change2 = () => {
    y.a.b.c.d++
    y.count++
  }

  const z = shallowReadonly({a: { b: 1}, c: 2})
  // z.c++
  z.a.b++ //

</script>

<style lang="css" scoped>
</style>
