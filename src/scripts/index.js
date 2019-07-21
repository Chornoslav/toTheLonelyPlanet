import $ from 'jquery'

$(document).ready(function () {
    // prevent transition runing, IE fix - disable transition on preloading
    $("body").removeClass("preload");

    var root = document.documentElement;
    var body = document.querySelector('body');

    var position = 10;
    var velocity;
    function defaultVelocity() {
        velocity = 4;
    }    defaultVelocity();
    function multi() {
        root.style.setProperty('--multiplier', 0 + "s");
    }    multi();

    body.addEventListener('keydown', function (e) {
        //console.log(e);
        if(e.keyCode === 39 || e.keyCode === 68) {
            root.style.setProperty('--angle', 20 + "deg");
        } else if (e.keyCode === 65 || e.keyCode === 37) {
            root.style.setProperty('--angle', -20 + "deg");
        }
        if (e.keyCode === 87 || e.keyCode === 38) {
            velocity = 10;
            root.style.setProperty('--multiplier', -.5 + "s");
        } else if (e.keyCode === 40 || e.keyCode === 83) {
            velocity = 2;
            root.style.setProperty('--multiplier', .5 + "s");
        }
    });
    body.addEventListener('keyup', function (e) {
        if (e.keyCode === 82) {
            root.style.setProperty('--angle', 360 + "deg");
            setTimeout(function() {
                root.style.setProperty('--angle-animation', 0 + "s");
                stars();
                setTimeout(function() {
                    angle();
                }, 100);
            }, 1000);
            return
        }
        stars();
        defaultVelocity();
        multi();
    });

    function stars() {
        root.style.setProperty('--angle', 0);
    }    stars();

    function angle() {
        root.style.setProperty('--angle-animation', 1 + "s");
    }    angle();

    function animateStars() {
        position = position + velocity;
        document.querySelector('.platform').style.backgroundPositionY = position + 'px';
        requestAnimationFrame(animateStars);
    }
    animateStars();
});
