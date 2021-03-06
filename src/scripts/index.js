import $ from 'jquery';
import '../assets/img/favicon/favicon-32x32.png'
import '../assets/img/favicon/favicon-16x16.png'

$(document).ready(function () {
    // prevent transition runing, IE fix - disable transition on preloading
    $("body").removeClass("preload");

    var root = document.documentElement;
    var body = document.querySelector('body');
    var rocket = document.querySelector('.rocket');
    var rocketSVG = document.querySelector('.rocket svg');
    var platform = document.querySelector('.platform');
    var spinPlatform = document.querySelector('.spinPlatform');
    var explosions = document.querySelectorAll('.explsLayer');
    var rotationAngle = 0;
    var exploded = false;

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
            increaseSpeed();
            body.classList.add('vibrate-1');
            rocketSVG.classList.add('vibrate-3')
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
            body.classList.remove('vibrate-1');
            rocketSVG.classList.remove('vibrate-3')
        }
        if (e.keyCode === 32 && !exploded) { explosion(); }
    });

    function increaseSpeed(){
        velocity = 10;
        root.style.setProperty('--multiplier', -.5 + "s");
        root.style.setProperty('--boost', 0);
    }

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
            return }
        spinPlatform.style.transform = 'rotate(' + rotationAngle + 'deg)';
        requestAnimationFrame(rotateRocket);
    }
    function explosion() {
        exploded = true;
        body.classList.add('explosion');
        var animationDuration = 700;
        setTimeout(function () {
                body.classList.remove('explosion');
                //hide rocket
                rocketSVG.style.opacity = 0;
                animateExplosion();
                toggleRocket();
            } , animationDuration);

        var delay = 50;
        function animateExplosion() {
            explosions.forEach(function(layer) {
                delay = delay + 150;
                //enable each layer
                layer.style.display = 'block';
                setTimeout(function () {
                    layer.style.opacity = 1;
                }, delay);
            });
            setTimeout(function () {
                //hide layers
                explosions.forEach(function(exp) {
                    exp.style.opacity = 0;
                });
                appearFromBottom();
            }, delay);
        }
        function appearFromBottom() {
            setTimeout(function () {
                rocket.classList.add('appearFromBottom');
            }, 700)
        }
        function toggleRocket() {
            setTimeout(function () {
                rocketSVG.style.opacity = '';
                rocketSVG.classList.add('blink-1');
                rocket.classList.remove('appearFromBottom');
                increaseSpeed();
                stopAcceleration();
            }, delay + 3200);
        }
        function stopAcceleration(){
            var accelerationDuration = 3500;
            setTimeout( function () {
                changeFlameAnimationSpeed();
                rocketSVG.classList.remove('blink-1');
                defaultVelocity();
                rocketNitro();
                exploded = false;
            }, accelerationDuration);
        }
    }
});
