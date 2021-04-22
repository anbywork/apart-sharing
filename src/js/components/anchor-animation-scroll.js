export const anchorAnimationScroll = () => {

  const anchors = document.querySelectorAll('a[href*="#"]');
  const header = document.querySelector('.header');
  const main = document.querySelector('main');

  for (let i = 0; i < anchors.length; i++) {
    anchors[i].addEventListener('click', function (e) {
      const hrefAnchor = anchors[i].getAttribute('href');
      if (hrefAnchor.indexOf('#') === 0) {
        e.preventDefault();
        const elemID = hrefAnchor.substr(1);
        if (anchors[i].closest('.header') && header.classList.contains('header--opened')) {
            header.classList.remove('header--opened');
            header.classList.add('header--closed');
            document.querySelector('main > div').style.top ='';
            main.removeEventListener('click', mainClickHandler)
            setTimeout(function() {
              smoothScroll(elemID);
            }, 500);
        } else {
          smoothScroll(elemID);
        }
      }
    })
  }

  function currentYPosition() {
    // Firefox, Chrome, Opera, Safari
    if (self.pageYOffset) return self.pageYOffset;
    // Internet Explorer 6 - standards mode
    if (document.documentElement && document.documentElement.scrollTop)
      return document.documentElement.scrollTop;
    // Internet Explorer 6, 7 and 8
    if (document.body.scrollTop) return document.body.scrollTop;
    return 0;
  }


  function elmYPosition(eID) {
    var elm = document.getElementById(eID);
    var y = elm.offsetTop;
    var node = elm;
    while (node.offsetParent && node.offsetParent != document.body) {
      node = node.offsetParent;
      y += node.offsetTop;
    }
    return y;
  }


  function smoothScroll(eID) {
    var startY = currentYPosition();
    var stopY = elmYPosition(eID) - 20;
    var distance = stopY > startY ? stopY - startY : startY - stopY;
    if (distance < 100) {
      scrollTo(0, stopY);
      return;
    }
    var speed = Math.round(distance / 100);
    if (speed >= 20) speed = 20;
    var step = Math.round(distance / 25);
    var leapY = stopY > startY ? startY + step : startY - step;
    var timer = 0;
    if (stopY > startY) {
      for (var i = startY; i < stopY; i += step) {
        setTimeout("window.scrollTo(0, " + leapY + ")", timer * speed);
        leapY += step;
        if (leapY > stopY) leapY = stopY;
        timer++;
      }
      return;
    }
    for (var i = startY; i > stopY; i -= step) {
      setTimeout("window.scrollTo(0, " + leapY + ")", timer * speed);
      leapY -= step;
      if (leapY < stopY) leapY = stopY;
      timer++;
    }
  }
}
