import Vue from 'vue'
import Vuex from 'vuex'
import * as getters from './getters'
import * as actions from './actions'
import mutations from './mutations'
import state from './state'
import createLogger from 'vuex/dist/Logger'

Vue.use(Vuex);

const debug =process.env.NODE_ENV !=='production'
export default new Vuex.Store({
	actions,
	getters,
	state,
	mutations,
	strict:debug,
	plugins:debug?[createLogger()]:[]
})