import axios from 'axios'
export default {
    namespaced: true,
    state: {
     
        order: [],
        count:''
    },
    mutations: {
        setOrder(state, obj) {
            state.order = obj.data
            state.count = obj.count
        },
    },
    actions: {
        async getOrder(context,option = 1) {
            const result = await axios.get('/api/order/getAllOrder?limit=7&offset=' + option)           
            context.commit('setOrder', result.data)
        },
        async searchGood(context,option={kw :'',offset :1}) {
            const result = await axios.get('/api/good/searchGood?limit=7&kw=' + option.kw + '&offset=' + option.offset)
            
            context.commit('setGood', result.data)
        },
    }
}