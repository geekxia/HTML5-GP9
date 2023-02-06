export default {
	namespaced: true,
	state: {
		num: 1000
	},
	mutations: {
		add (state, payload) {
			state.num += payload
		}
	}
}