import axios from 'axios'
export default{
    namespaced: true,
    state: {
        cart:[],
        payment:[],
    },
    mutations: {
        setCart(state,obj){
            state.cart = obj
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