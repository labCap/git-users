export function isWebp() {
    function testWebP(callback) {
        let webP = new Image();
        webP.onload = webP.onerror = function () {
            callback(webP.height == 2);
        };
        webP.src = "https://i0.wp.com/css-tricks.com/wp-content/uploads/2016/08/broken-webp-2x.png?ssl=1"
    };
    testWebP(function (support) {
        let className = support === true ? 'webp' : 'no-webp';
        document.documentElement.classList.add(className)
    })
}