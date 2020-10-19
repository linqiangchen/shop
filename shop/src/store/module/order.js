import axios from 'axios'
export default{
    namespaced: true,
    state: {
        curOrderID:''
    },
    mutations: {
        setOrderID(state,id){
            state.curOrderID = id
        },
        setPayment(state,obj){
            state.payment = obj
        }
    },
    actions: {
       async getCart(context){
          const result = await  axios.get('/api/cart/getCart')
          context.commit('setCart',result.data.data)
     },
}
}