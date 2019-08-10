import $ from 'jquery';

$(document).ready(function () {
    // prevent transition runing, IE fix - disable transition on preloading
    $("body").removeClass("preload");

    var root = document.documentElement;
    var body = document.querySelector('body');
    var rocket = document.querySelector('.rocket');
    var platform = document.querySelector('.platform');
    var spinPlatform = document.querySelector('.spinPlatform');
    var rotationAngle = 0;

    var position = 10;
    var velocity;
    function defaultVelocity() {
        velocity = 4;
    }    defaultVelocity();
    function changeFlameAnimationSpeed() {
        root.style.setProperty('--multiplier', 0 + "s");
    }    changeFlameAnimationSpeed();

    body.addEventListener('keydown', function (e) {
        //console.log(e);
        root.style.setProperty('--boost-animation', 0.7 + 's');
        if(e.keyCode === 39 || e.keyCode === 68) {
            //rotate right
            root.style.setProperty('--angle', 20 + "deg");
        } else if (e.keyCode === 65 || e.keyCode === 37) {
            //rotate left
            root.style.setProperty('--angle', -20 + "deg");
        }

        if (e.keyCode === 87 || e.keyCode === 38) {
            //increase speed
            velocity = 10;
            root.style.setProperty('--multiplier', -.5 + "s");
            root.style.setProperty('--boost', 0);
        } else if (e.keyCode === 40 || e.keyCode === 83) {
            //decrease speed
            velocity = 2;
            root.style.setProperty('--multiplier', .5 + "s");
            root.style.setProperty('--boost', 24 + '%');
        }
    });
    body.addEventListener('keyup', function (e) {
        if (e.keyCode === 82) { rotateRocket() }

        //reset to default values
        if(e.keyCode === 39 || e.keyCode === 68 || e.keyCode === 65 || e.keyCode === 37) {
            //rocket angle
            resetStarsRotationAngle();
        }
        if (e.keyCode === 87 || e.keyCode === 38 || e.keyCode === 40 || e.keyCode === 83) {
            //rocket speed
            changeFlameAnimationSpeed();
            defaultVelocity();
            rocketNitro();
        }
    });

    function resetStarsRotationAngle() {
        root.style.setProperty('--angle', 0);
    }    resetStarsRotationAngle();

    function animateStars() {
        position = position + velocity;
        platform.style.backgroundPositionY = position + 'px';
        requestAnimationFrame(animateStars);
    }
    animateStars();

    function rocketNitro() {
        root.style.setProperty('--boost', 14 + "%");
    } rocketNitro();

    function rotateRocket() {
        rotationAngle = rotationAngle + 8;
        if (rotationAngle >= 361){
            rotationAngle = 0;
            return;
        }
        spinPlatform.style.transform = 'rotate(' + rotationAngle + 'deg)';
        requestAnimationFrame(rotateRocket);
    }
});
