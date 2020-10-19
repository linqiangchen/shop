import axios from 'axios'
export default {
    namespaced: true,
    state: {
        comment:[],
        count:''
    },
    mutations: {
        setComment(state, obj) {
            state.comment = obj.data
            state.count = obj.count
        },
    },
    actions: {

        async getComment(context,option = 1) {
            const result = await axios.get('/api/good/getAllComment?&offset=' + option)
            console.log('result: ', result);
            context.commit('setComment', result.data)
        },
    }
}