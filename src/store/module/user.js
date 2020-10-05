import axios from 'axios'
export default{
    namespaced: true,
    state: {
        login:-1,
        info:{},
        address:[]
    },
    mutations: {
        setLogin(state,bool){
            state.login = bool
        },
        setInfo(state,obj){
            state.info = obj
        },
        setAddress(state,obj){
            state.address = obj
        }
    },
    actions: {
       async checkLogin(context){
          const result = await  axios.get('/api/user/isLogin')
          context.commit('setLogin',result.data.msg)
        },
        async getInfo(context){
            const result = await  axios.get('/api/user/info')
            context.commit('setInfo',result.data.data)
          },
          async getAddress(context){
            const result = await  axios.get('/api/user/getAddress')
            context.commit('setAddress',result.data.data)
          },
}
}