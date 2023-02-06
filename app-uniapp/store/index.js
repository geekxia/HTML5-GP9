// Vue3 + Vuex4

import { createStore } from 'vuex'

import study from './modules/study'

const store = createStore({
	modules: {
		study
	}
})

export default store