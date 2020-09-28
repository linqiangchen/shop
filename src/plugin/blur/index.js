import style from './style.scss'
export default {
    install(Vue) {
        //自定义背景虚化指令
        Vue.directive('blur', (...rest) => {
            let blur = rest[0].getAttribute('blur') || 80;
            let op = rest[0].getAttribute('op') || 0.5;
            let color = rest[0].getAttribute('maskColor') || `rgba(0,0,0,${op})`
            let divImg = rest[0].querySelector(`.__bg`) || document.createElement('div');
            let divMask = rest[0].querySelector(`.my_mask`) || document.createElement('div');
            rest[0].classList.add('blur');
            divMask.classList.add(`my_mask`);
            divImg.classList.add(`__bg`);
            divImg.style.background = `url(${rest[1].value}) center`;
            divImg.style.backgroundSize = `cover`;
            divImg.style.filter = `blur(${blur}px)`;
            divMask.style.backgroundColor = color;
            rest[0].appendChild(divImg);
            rest[0].appendChild(divMask);
        });
    }
}