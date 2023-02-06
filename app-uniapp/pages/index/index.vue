<template>
	<view class="content">
		<image class="logo" src="/static/logo.png"></image>
		<view class="text-area">
			<text class="title">{{title}}</text>
		</view>
		<view v-for='item in list' :key='item'>
			{{ item }}
		</view>
		<view class="">
			{{ num }}
		</view>
		<u-button type="primary" @click='add'>自增</u-button>
		
		<TabBar />
	</view>
</template>

<script setup>
	import { ref, reactive, onMounted, computed } from 'vue'
	// 尽可能使用uni-app提供的生命周期
	import { onLoad, onPullDownRefresh, onShareAppMessage } from '@dcloudio/uni-app'
	import { useStore } from 'vuex'
	import TabBar from '@/components/TabBar.vue'
	const title = ref('Hello')
	const list = reactive([1,2,3,4])
	onLoad(opt => console.log('opt', opt)) 
	onMounted(()=>console.log('---mounted'))
	const store = useStore()
	console.log('---store', store)
	
	// 选项写法中，mapState在computed中使用的！！
	const num = computed(()=>store.state.study.num)
	const add = () => {
		store.commit('study/add', 5)
	}
	onPullDownRefresh(()=>{
		console.log('---触发下拉')
		setTimeout(()=>{
			uni.stopPullDownRefresh()
		}, 500)
	})
	onShareAppMessage(res => {
		console.log('---分享', res.from)
	})
</script>

<style scoped>
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.logo {
		height: 200rpx;
		width: 200rpx;
		margin-top: 200rpx;
		margin-left: auto;
		margin-right: auto;
		margin-bottom: 50rpx;
	}

	.text-area {
		display: flex;
		justify-content: center;
	}

	.title {
		font-size: 36rpx;
		color: #8f8f94;
	}
</style>
