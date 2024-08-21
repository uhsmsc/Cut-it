let isFalling = false;

document.addEventListener('mousemove', function(event) {
    if (isFalling) return;

    const knife = document.getElementById('knife');
    const app = document.getElementById('app');
    const windowWidth = window.innerWidth;
    const containerWidth = app.getBoundingClientRect().width;
    const diff = windowWidth - containerWidth;
    
    let knifeX = event.clientX;

    if (knifeX < diff) knifeX = diff;
    if (knifeX > containerWidth) knifeX = containerWidth;


    knife.style.left = knifeX + "px";
});

document.getElementById('app').addEventListener('click', function(event) {
    const knife = document.getElementById('knife');

    const watermelon = document.getElementById('watermelon');
    const watermelonLeft = document.getElementById('watermelon-left');
    const watermelonRight = document.getElementById('watermelon-right');

    let knifeX = event.clientX;
    let rect = watermelonLeft.getBoundingClientRect();
    let watermelonX = rect.left;
    let watermelonY = rect.top;

    let leftWidth = knifeX - watermelonX;
    let rightWidth = 200 - leftWidth;

    watermelonLeft.style.width = leftWidth + 'px';
    watermelonRight.style.width = rightWidth + 'px';

    console.log(leftWidth);
    console.log(rightWidth);

    isFalling = true;
    knife.classList.add('falling');

    watermelon.style.backgroundImage = 'none';

    watermelonLeft.classList.add('animate-left');
    watermelonRight.classList.add('animate-right');

    /*percentLeft = 100 * leftWidth / 200;
    percentRight = 100 * rightWidth / 200;*/

    percentLeft = 100 * Math.round((leftWidth * 1000)/1000) / 200;
    percentRight = 100 * Math.round((rightWidth * 1000))/1000 / 200;

    setTimeout(() => {
        animatePercentage(percentLeft.toFixed(1), 'leftResult');
        animatePercentage(percentRight.toFixed(1), 'rightResult');
    }, 1300); 
});

function animatePercentage(target, id) {
    let current = 0;

    const interval = setInterval(function() {
        current++;
        if (current >= target) {
            current = target;
            clearInterval(interval);
        }
        document.getElementById(id).textContent = current + '%';
    }, 20);
}