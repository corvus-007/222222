document.addEventListener('DOMContentLoaded', function () {
  svg4everybody();

  var siteHeader = document.querySelector('.site-header');

  $(siteHeader).sticky({
    zIndex: 20
  });

  var welcomeSlider = document.querySelector('.welcome-slider');

  if (welcomeSlider) {
    $(welcomeSlider).slick({
      // autoplay: true,
      accessibility: false,
    });
  }

  var welcomeScreenPointer = document.querySelector('.welcome-screen__pointer');

  welcomeScreenPointer.addEventListener('click', function (event) {
    event.preventDefault();

    var headerHeight = siteHeader.offsetHeight;
    var clientHeight = document.documentElement.clientHeight;
    $("html, body").animate({
      scrollTop: (clientHeight - headerHeight)
    });
  });

});
