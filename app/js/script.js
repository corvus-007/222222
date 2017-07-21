document.addEventListener('DOMContentLoaded', function () {
  svg4everybody();

  var getTaxi = document.querySelector('.get-taxi');

  if (getTaxi) {
    setInterval(function () {
      getTaxi.classList.remove('get-taxi--animate');
      getTaxi.offsetWidth = getTaxi.offsetWidth;
      getTaxi.classList.add('get-taxi--animate');
    }, 8888);
  }


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

    var welcomeScreenPointer = document.querySelector('.welcome-screen__pointer');

    welcomeScreenPointer.addEventListener('click', function (event) {
      event.preventDefault();

      var headerHeight = siteHeader.offsetHeight;
      var clientHeight = document.documentElement.clientHeight;
      $("html, body").animate({
        scrollTop: (clientHeight - headerHeight)
      });
    });
  }


  var tabsTarifs = document.querySelector('.tabs-tarifs');

  if (tabsTarifs) {
    $(tabsTarifs).tabslet({
      animation: true
    });
  }

  var appSlider = document.querySelector('.app-slider');
  $(appSlider).slick({
    accessibility: false,
    arrows: false,
    dots: true,
    appendDots: '.app-slider-controls',
    dotsClass: 'app-slider-controls__list',
    customPaging: function (slider, i) {
      var currentSlide = slider.$slides[i]
      var descriptionSlide = currentSlide.querySelector('.app-slider__description');
      var descriptionSlideText = descriptionSlide.textContent;
      var controlsButton = document.createElement('button')
      controlsButton.classList.add('app-slider-controls__button');
      controlsButton.type = 'button';
      controlsButton.textContent = descriptionSlideText;
      return controlsButton;
    }
  });
});
