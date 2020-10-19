import axios from 'axios'
export default{
    namespaced: true,
    state: {
        login:-1,
        info:{},
        address:[],
        selectAddress:null,
        order:[],
    },
    mutations: {
        setLogin(state,bool){
            state.login = bool
        },
        setInfo(state,obj){
            state.info = obj
        },
        setOrder(state,obj){
            state.order = obj
        },
        setAddress(state,obj){
            state.address = obj
        },
        setSelectAddress(state,obj){
            state.selectAddress = obj
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
          async getOrder(context){
            const result = await  axios.get('/api/order/getMyOrder')
            
            context.commit('setOrder',result.data.data)
          },
}
}