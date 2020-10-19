import axios from 'axios'
export default {
    namespaced: true,
    state: {
        login: -1,
        info: {},
        account: []
    },
    mutations: {
        setLogin(state, bool) {
            state.login = bool
        },
        setInfo(state, obj) {
            state.info = obj
        },
        setAccount(state, obj) {
            state.account = obj
        },

    },
    actions: {
        async checkLogin(context) {
            const result = await axios.get('/os/account/isLogin')
            context.commit('setLogin', result.data.msg)
        },
        async getInfo(context) {
            const result = await axios.get('/os/account/info')
            context.commit('setInfo', result.data.data)
        },
        async getAccount(context) {
            const {data} = await axios.get('/os/account/account')
            data.data.forEach((item , index) => item.key = index+1) 
            context.commit('setAccount', data.data)
        },
    }
}