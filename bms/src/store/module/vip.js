import axios from 'axios'
export default {
    namespaced: true,
    state: {
     
        userList:[],
        count:''
    },
    mutations: {
        setUser(state, obj) {
            state.userList = obj.data
            state.count = obj.count
        },
    },
    actions: {

        async getUser(context,option = 1) {
            const result = await axios.get('/api/user/allUser?limit=7&offset=' + option)
            context.commit('setUser', result.data)
        },
    }
}