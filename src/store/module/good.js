import axios from 'axios'
export default{
    namespaced: true,
    state: {
        recommend:[],
        new:[],
        good:[],
        curGood:{},
        allGood:[],
        select:{},
        comment:[]
    },
    mutations: {
        setRecommend(state,arr){
            state.recommend = arr
        },
        setNew(state,obj){
            state.new = obj
        },
        setGood(state,obj){
            state.good = obj
        },
        setAllGood(state,obj){
            state.allGood.push(...obj)
        },
        setCurGood(state,obj){
            state.curGood = obj
        },
        setSelect(state,obj){
            state.select = obj
        },
        setComment(state,obj){
            state.comment = obj
        },
        setClassifyGood(state,obj){
            state.allGood = obj
        }
    },
    actions: {
       async getRecommend(context){
          const result = await  axios.get('/api/good/getRecommendGood')
          
          context.commit('setRecommend',result.data.data)
        },
        async getComment(context,id){
            const result = await  axios.get('/api/good/getGoodComment?goodID=' + id)
            let data = result.data.data.length?result.data.data:[{
                id:1,
                user:{
                    avatar:"/public/avatar/1601437624741-少年.jpg",
                    name:'忘川'
                },
                con:'不错不错，很喜欢。不错不错，很喜欢。不错不错，很喜欢。',
                time:'2020-10-16 19:21:21',
                star:5,
            },{
                id:2,
                user:{
                    avatar:"/public/avatar/1601437624741-少年.jpg",
                    name:'忘川'
                },
                con:'不错不错,很喜欢。不错不错，很喜欢。不错不错，很喜欢。',
                time:'2020-10-16 19:21:21',
                star:5,
            },{
                id:3,
                user:{
                    avatar:"/public/avatar/1601437624741-少年.jpg",
                    name:'忘川'
                },
                con:'不错不错，很喜欢。不错不错，很喜欢。不错不错，很喜欢。',
                time:'2020-10-16 19:21:21',
                star:5,
            }]
            data.forEach(item =>{
                item.star*=1
            })
            context.commit('setComment',data)
          },
        async getNew(context){
            const result = await  axios.get('/api/good/getNewGood')
            context.commit('setNew',result.data.data)
          },
          async getAllGood(context,obj){
             if(!obj.state){
                 obj.state = -1
             }
            const result = await  axios.get('/api/good/getAllGood?offset=' + obj.offset + '&sort=' + obj.sort + '&state=' + obj.state)
            if(obj.offset === 1){
            context.commit('setClassifyGood', result.data.data)
            }else{
                context.commit('setAllGood',result.data.data)
            }
           
          },
          async getClassifyGood(context,classify){
            const result = await  axios.get('/api/good/getClassifyGood?classify=' + classify)
            context.commit('setClassifyGood',result.data.data)
          },
          async searchGood(context,option={kw :'',offset :1}) {
            const result = await axios.get('/api/good/searchGood?limit=40&kw=' + option.kw + '&offset=' + option.offset)
            
            context.commit('setClassifyGood', result.data.data)
        },
}
}