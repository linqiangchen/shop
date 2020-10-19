import axios from 'axios'
export default {
    namespaced: true,
    state: {
     
        good: [],
        count:''
    },
    mutations: {
        setGood(state, obj) {
            state.good = obj.data
            state.count = obj.count
        },
    },
    actions: {

        async getGood(context,option = 1) {
            const result = await axios.get('/api/good/getAllGood?limit=7&offset=' + option)
            context.commit('setGood', result.data)
        },
        async searchGood(context,option={kw :'',offset :1}) {
            const result = await axios.get('/api/good/searchGood?limit=7&kw=' + option.kw + '&offset=' + option.offset)
            console.log('result: ', result);
            context.commit('setGood', result.data)
        },
    }
}