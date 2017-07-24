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
  var siteHeaderHeight = siteHeader.offsetHeight;


  // $(siteHeader).sticky({
  //   zIndex: 20
  // });

  if (!document.body.classList.contains('homepage')) {
    document.body.style.paddingTop = siteHeaderHeight + 'px';
  }

  var welcomeScreen = document.querySelector('.welcome-screen');
  var welcomeSlider = document.querySelector('.welcome-slider');

  if (welcomeScreen) {

    var gutterTopScreen = 0;
    if (window.matchMedia("(max-height: 567px)").matches) {
      gutterTopScreen = 10;
    }
    welcomeScreen.style.paddingTop = (siteHeaderHeight + gutterTopScreen) + 'px';

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

  function updateTarifsFilter() {
    var $pane = $('.tabs-tarifs').find('.tabs-tarifs__pane:visible');

    var $tarifsPane = $pane;
    var $tarifsOutputTables = $('.tarifs-output__table', $tarifsPane);
    var $cyrrentTarifsOutputTable = $('.tarifs-output__table');
    var $tarifsFilterList = $tarifsPane.find('.tarifs-filter__list');
    var $currentTarifsItem = $tarifsPane.find('.tarifs-filter__item');
    var $trarisFilterItems = $('.tarifs-filter__item', $tarifsFilterList);

    // $currentTarifsItem.addClass('tarifs-filter__item--active');
    // $trarisFilterItems.not($currentTarifsItem).removeClass('tarifs-filter__item--active');

    var activeFilters = $('.tarifs-filter__item--active', $tarifsPane);
    var filterString = Array.prototype.reduce.call(activeFilters, function (prevValue, item) {
      return prevValue + item.querySelector('.tarifs-filter__link').dataset.filter;
    }, '');

    console.log(filterString);

    if (filterString) {
      $tarifsOutputTables.addClass('tarifs-output__table--hidden');
      $tarifsOutputTables.filter('[data-taxi-id="' + filterString + '"]').removeClass('tarifs-output__table--hidden');
    }
  }

  if (tabsTarifs) {
    $(tabsTarifs).tabslet();

    $(tabsTarifs).on('_after', function () {
      updateTarifsFilter();
    });

    updateTarifsFilter();

    $(tabsTarifs).on('click', '.tarifs-filter__link', function (event) {
      event.preventDefault();
      var $tarifsPane = $(this).closest('.tabs-tarifs__pane');
      var $tarifsOutputTables = $('.tarifs-output__table', $tarifsPane);
      var $cyrrentTarifsOutputTable = $('.tarifs-output__table');
      var $tarifsFilterList = $(this).closest('.tarifs-filter__list');
      var $currentTarifsItem = $(this).closest('.tarifs-filter__item');
      var $trarisFilterItems = $('.tarifs-filter__item', $tarifsFilterList);

      $currentTarifsItem.addClass('tarifs-filter__item--active');
      $trarisFilterItems.not($currentTarifsItem).removeClass('tarifs-filter__item--active');

      var activeFilters = $('.tarifs-filter__item--active', $tarifsPane);
      var filterString = Array.prototype.reduce.call(activeFilters, function (prevValue, item) {
        return prevValue + item.querySelector('.tarifs-filter__link').dataset.filter;
      }, '');

      console.log(filterString);

      if (filterString) {
        $tarifsOutputTables.addClass('tarifs-output__table--hidden');
        $tarifsOutputTables.filter('[data-taxi-id="' + filterString + '"]').removeClass('tarifs-output__table--hidden');
      }
    });
  }

  var appSlider = document.querySelector('.app-slider');
  var appSliderTouchId = document.querySelector('.app-slider-mocup-phone__touch-id');

  if (appSlider) {
    appSliderTouchId.addEventListener('click', function (event) {
      event.preventDefault();
      $(appSlider).slick('slickNext');
    });
  }

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
