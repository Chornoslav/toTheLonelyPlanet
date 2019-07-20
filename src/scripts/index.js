import $ from 'jquery'

$(document).ready(function () {
    // prevent transition runing, IE fix - disable transition on preloading
    $("body").removeClass("preload");

    // var root = document.documentElement;
    // var body = document.querySelector('body');
    //
    // body.addEventListener('keydown', function (e) {
    //     if(e.keyCode === 40 || e.keyCode === 83) {
    //         root.style.setProperty('--starsPixels', 400 + "s");
    //     }
    // });
    // body.addEventListener('keyup', function (e) {
    //     stars();
    // });
    //
    // function stars() {
    //     root.style.setProperty('--starsPixels', 200 + "s");
    // }
    // stars();
});
