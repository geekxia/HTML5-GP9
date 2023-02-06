<template>
<u-tabbar v-model="current" :list="list" :mid-button="true"></u-tabbar>
</template>

<script setup>
	import { ref, reactive } from 'vue'
	const current = ref(0)
	const list = reactive([
		{
			iconPath: "home",
			selectedIconPath: "home-fill",
			text: '首页',
			customIcon: false,
		},
		{
			iconPath: "photo",
			selectedIconPath: "photo-fill",
			text: '放映厅',
			customIcon: false,
		},
		{
			iconPath: "https://cdn.uviewui.com/uview/common/min_button.png",
			selectedIconPath: "https://cdn.uviewui.com/uview/common/min_button_select.png",
			text: '发布',
			midButton: true,
			customIcon: false,
		},
		{
			iconPath: "play-right",
			selectedIconPath: "play-right-fill",
			text: '直播',
			customIcon: false,
		},
		{
			iconPath: "account",
			selectedIconPath: "account-fill",
			text: '我的',
			customIcon: false,
		}
	])	
</script>

<style>
</style>