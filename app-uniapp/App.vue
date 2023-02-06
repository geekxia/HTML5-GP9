<script setup>
	// 如果是组件写法,并且要使用小程序风格的API,像这样导入!!
	// 如果是选项式写法，直接使用这些钩子。
	import { onLaunch, onShow } from '@dcloudio/uni-app'
	onLaunch(()=>{
		// #ifdef MP-WEIXIN
		uni.login({
			success: res => console.log('---code', res.code)
		})
		uni.getSetting({
		   success(res) {
			   console.log('---授权列表', res.authSetting)
		      if(!res.authSetting['scope.userLocation']) {
				  uni.authorize({
				  	scope: 'scope.userLocation'
				  })
			  }
			}
		})
		// #endif
	})
</script>

<style lang="scss">
	@import "./uni_modules/vk-uview-ui/index.scss";
</style>
