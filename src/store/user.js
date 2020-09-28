import axios from 'axios'
export default{
    namespaced: true,
    state: {
        login:-1
    },
    mutations: {
        setLogin(state,bool){
            state.login = bool
        }
    },
    actions: {
       async checkLogin(context){
          const result = await  axios.get('/api/user/isLogin')
          console.log('result: ', result);
          context.commit('setLogin',result.data.msg)
        }
    },
}