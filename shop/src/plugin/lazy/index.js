export default {
    install(Vue, option = {
        loadUrl: '/assets/loading.jpg'
    }) {
        const observer = new IntersectionObserver(
            function (item) {
                item.forEach(img => {
                    const src = img.target.src
                    const targetSrc = img.target.getAttribute('data-src')
                    if (img.intersectionRatio > 0) {
                        if (src === targetSrc) {
                            return
                        }
                        img.target.src = img.target.getAttribute('data-src')
                        img.target.setAttribute('loading', true)
                    }
                })
            }
        );
        Vue.directive('lazy', {
            bind(...rest) {
                rest[0].src = option.loadUrl
                rest[0].setAttribute('data-src', rest[1].value)
                observer.observe(rest[0]);
            },
            update(...rest){
                // rest[0].src = option.loadUrl
                rest[0].setAttribute('data-src', rest[1].value)
                observer.observe(rest[0]);
            }
        });
    }
}