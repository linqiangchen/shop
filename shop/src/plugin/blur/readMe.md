# blur
    1.自定义指令 使用方法 v-blur
    2. 示例：
        import blur from './plugin/blur'
        import Vue from 'vue'
        Vue.use(blur)
         <div class="bg" v-blur="coverImgUrl" blur="50"  op="0.5" >
            内容。。。。。
         </div>

    3.参数
        v-blur：需要虚化的图片地址 必填
        blur：图片虚化程度 选填 默认为80
        op：蒙板透明度 选填 默认为0.5
        maskColor: 蒙板背景颜色 选填 默认为 rgba(0 ,0 ,0 ,0.5)
    4.注意事项
        1.注意指令所在容器会加上相对定位。请考虑是否会对其他布局造成影响
        2.蒙板以及虚化图片大小默认为指令所在容器大小，请先设置容器宽高