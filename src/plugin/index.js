import blur from './blur'
import loading from './loading.scss'
export default {
    install(Vue){
        Vue.use(blur)
        const loading = document.createElement("div");
        loading.classList.add('loading')
        loading.innerHTML = `<div class="load1">
        <div class="rect1"></div>
        <div class="rect2"></div>
        <div class="rect3"></div>
        <div class="rect4"></div>
        <div class="rect5"></div>
    </div>`
        document.body.appendChild(loading)
        Vue.mixin({
            data(){
               return{
                minShowBack:true
               }
            },
           methods: {
            log(e) {
                e.refresh();
              },
              back(){
                this.$router.back()
              },
               $showLoading(){
                loading.style.display = 'block'
                loading.style.zIndex = 100
               },
               $hideLoading(){
                loading.style.display = 'none'
                loading.style.zIndex = -1
               }
           },
           created () {
               if(this.notShow){
                   
                   this.minShowBack = false
                   
               }
           }
        })
    }
}