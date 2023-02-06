<template>
  <div class="app">
    <CnCate :cates='cates' v-model='tab'></CnCate>
    <CnList :list='newList'></CnList>
    <CnPage v-model='page'></CnPage>
  </div>
</template>

<script>
import CnCate from '~/components/cnode/CnCate.vue'
import CnList from '~/components/cnode/CnList.vue'
import CnPage from '~/components/cnode/CnPage.vue'
import { fetchList } from '@/utils/api'
import '~/assets/style.css'  //  全局样式
export default {
  name: 'Cnode',
  components: { CnCate, CnList, CnPage },
  async asyncData () {
    const params = { limit: 5, cate: '', page: 1 }
    const list = await fetchList(params)
    return { list }
  },
  data () {
    return {
      cates: [
        { id: 1, tab: '', label: '全部' },
        { id: 2, tab: 'good', label: '精华' },
        { id: 3, tab: 'share', label: '分享' },
        { id: 4, tab: 'ask', label: '问答' },
        { id: 5, tab: 'job', label: '招聘' }
      ],
      tab: '',
      page: 1
    }
  },
  computed: {
    newList() {
      const result = []
      this.list.forEach(ele1=>{
        const cate = this.cates.find(ele2=>ele2.tab===ele1.tab)
        ele1['label'] = ele1.top ? '置顶' : ( ele1.good ? '精华' : (cate?.label||'问答'))
        ele1['first'] = this.tab===''
        result.push(ele1)
      })
      return result
    }
  },
  watch: {
    tab() { this.page=1; this.getList() },
    page() { this.getList() }
  },
  // created() { this.getList() },
  methods: {
    getList() {
      const params = {
        tab: this.tab,
        limit: 5,
        page: this.page,
        mdrender: true
      }
      fetchList(params).then(list => {
        this.list = list
      })
    }
  }
}
</script>
