document.addEventListener('DOMContentLoaded', function() {
  svg4everybody();
  $('input[type="tel"]').mask('+7 (999) 999-99-99', {});

  var vacancyForm = document.querySelector('.vacancy-form');
  var inputHasCar;
  var personCar;
  var personCarFields;

  function makeRequiredField(field) {
    field.required = true;
    field.setAttribute('aria-required', 'true');
    field.classList.add('wpcf7-validates-as-required');
  }

  function makeOptionalField(field) {
    field.required = false;
    field.setAttribute('aria-required', 'false');
    field.classList.remove('wpcf7-validates-as-required');
  }

  function isChecked(input) {
    return input.checked ? true : false;
  }

  if (vacancyForm) {
    inputHasCar = vacancyForm.elements['hasCar[]'];
    personCar = vacancyForm.querySelector('.person-car');
    personCarFields = personCar.querySelectorAll('input');

    if (isChecked(inputHasCar)) {
      Array.from(personCarFields).forEach(makeRequiredField);
    } else {
      Array.from(personCarFields).forEach(makeOptionalField);
    }

    inputHasCar.addEventListener('change', function() {
      if (isChecked(this)) {
        personCar.hidden = false;
        Array.from(personCarFields).forEach(makeRequiredField);
      } else {
        personCar.hidden = true;
        Array.from(personCarFields).forEach(makeOptionalField);
      }
    });
  }

  var getTaxi = document.querySelector('.get-taxi');

  if (getTaxi) {
    setInterval(function() {
      getTaxi.classList.remove('get-taxi--animate');
      getTaxi.offsetWidth = getTaxi.offsetWidth;
      getTaxi.classList.add('get-taxi--animate');
    }, 8888);
  }

  var siteWrapper = document.querySelector('.site-wrapper');
  var siteHeader = document.querySelector('.site-header');
  var siteHeaderHeight = siteHeader.offsetHeight;
  var siteNavToggle = document.querySelector('.site-nav__toggle');
  var scrollPage = 0;

  function openSiteCover() {
    scrollPage = window.pageYOffset;
    document.body.classList.add('no-scroll');
    siteCover.classList.add('site-cover--opened');
  }

  function closeSiteCover() {
    document.body.classList.remove('no-scroll');
    siteCover.classList.remove('site-cover--opened');
    window.scrollTo(0, scrollPage);
  }

  var siteCover = document.querySelector('.site-cover');
  var siteCoverClose = siteCover.querySelector('.site-cover__close');

  var REFFERER_TARGET = 'refferer=app';
  var appPopup = document.querySelector('.download-popup');
  var appPopupClose = document.querySelector('.download-popup__close');
  var isFromApp = ~location.search.indexOf(REFFERER_TARGET);
  var isAppPopupShow =
    isFromApp || parseInt(sessionStorage.getItem('downloadPopupShowed'), 10);

  $(siteCoverClose).on('click', function(event) {
    event.preventDefault();
    closeSiteCover();
  });

  $(siteNavToggle).on('click', function(event) {
    event.preventDefault();
    openSiteCover();
  });

  if (!isAppPopupShow) {
    setTimeout(function() {
      showDowloadPopup();
    }, 1000);
  }

  function showDowloadPopup() {
    if (window.matchMedia('(max-width: 767px)').matches) {
      appPopup.classList.add('download-popup--opened');
    }
  }

  appPopupClose.addEventListener('click', function(event) {
    event.preventDefault();
    appPopup.classList.remove('download-popup--opened');
    sessionStorage.setItem('downloadPopupShowed', 1);
  });

  if (!document.body.classList.contains('homepage')) {
    setTimeout(function() {
      siteHeaderHeight = siteHeader.offsetHeight;
      siteWrapper.style.paddingTop = siteHeaderHeight + 'px';
    }, 111);
  }

  var welcomeScreen = document.querySelector('.welcome-screen');
  var welcomeSlider = document.querySelector('.welcome-slider');

  if (welcomeScreen) {
    var gutterTopScreen = 0;
    if (window.matchMedia('(max-height: 567px)').matches) {
      gutterTopScreen = 10;
    }

    setTimeout(function() {
      siteHeaderHeight = siteHeader.offsetHeight;
      welcomeScreen.style.paddingTop =
        siteHeaderHeight + gutterTopScreen + 'px';
    }, 111);

    $(welcomeSlider).slick({
      accessibility: false,
      autoplaySpeed: 4444,
      autoplay: true
    });

    var welcomeScreenPointer = document.querySelector(
      '.welcome-screen__pointer'
    );

    welcomeScreenPointer.addEventListener('click', function(event) {
      event.preventDefault();

      var headerHeight = siteHeader.offsetHeight;
      var clientHeight = document.documentElement.clientHeight;
      $('html, body').animate({
        scrollTop: clientHeight - headerHeight
      });
    });
  }

  var $accordeon = $('.js-accordeon');

  if ($accordeon.length) {
    $accordeon.find('dd').hide();
    $accordeon.on('click', 'dt', function(event) {
      event.preventDefault();

      $(event.delegateTarget)
        .find('dt')
        .not($(this))
        .removeClass('is-opened')
        .next('dd')
        .slideUp();

      if (!$(this).hasClass('is-opened')) {
        $(this).addClass('is-opened');
        $(this)
          .next('dd')
          .stop()
          .slideDown();
      } else {
        $(this).removeClass('is-opened');
        $(this)
          .next('dd')
          .stop()
          .slideUp();
      }
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
    var filterString = Array.prototype.reduce.call(
      activeFilters,
      function(prevValue, item) {
        return (
          prevValue + item.querySelector('.tarifs-filter__link').dataset.filter
        );
      },
      ''
    );

    if (filterString) {
      $tarifsOutputTables.addClass('tarifs-output__table--hidden');
      $tarifsOutputTables
        .filter('[data-taxi-id~="' + filterString + '"]')
        .removeClass('tarifs-output__table--hidden');
    }
  }

  if (tabsTarifs) {
    $(tabsTarifs).tabslet();

    $(tabsTarifs).on('_after', function() {
      updateTarifsFilter();
    });

    updateTarifsFilter();

    $(tabsTarifs).on('click', '.tarifs-filter__link', function(event) {
      event.preventDefault();
      var $tarifsPane = $(this).closest('.tabs-tarifs__pane');
      var $tarifsOutputTables = $('.tarifs-output__table', $tarifsPane);
      var $cyrrentTarifsOutputTable = $('.tarifs-output__table');
      var $tarifsFilterList = $(this).closest('.tarifs-filter__list');
      var $currentTarifsItem = $(this).closest('.tarifs-filter__item');
      var $trarisFilterItems = $('.tarifs-filter__item', $tarifsFilterList);

      $currentTarifsItem.addClass('tarifs-filter__item--active');
      $trarisFilterItems
        .not($currentTarifsItem)
        .removeClass('tarifs-filter__item--active');

      var activeFilters = $('.tarifs-filter__item--active', $tarifsPane);
      var filterString = Array.prototype.reduce.call(
        activeFilters,
        function(prevValue, item) {
          return (
            prevValue +
            item.querySelector('.tarifs-filter__link').dataset.filter
          );
        },
        ''
      );

      if (filterString) {
        $tarifsOutputTables.addClass('tarifs-output__table--hidden');
        $tarifsOutputTables
          .filter('[data-taxi-id~="' + filterString + '"]')
          .removeClass('tarifs-output__table--hidden');
      }
    });
  }

  var appSlider = document.querySelector('.app-slider');
  var appSliderTouchId = document.querySelector(
    '.app-slider-mocup-phone__touch-id'
  );

  if (appSlider) {
    appSliderTouchId.addEventListener('click', function(event) {
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
    customPaging: function(slider, i) {
      var currentSlide = slider.$slides[i];
      var descriptionSlide = currentSlide.querySelector(
        '.app-slider__description'
      );
      var descriptionSlideText = descriptionSlide.textContent;
      var controlsButton = document.createElement('button');
      controlsButton.classList.add('app-slider-controls__button');
      controlsButton.type = 'button';
      controlsButton.textContent = descriptionSlideText;
      return controlsButton;
    }
  });

  /*====================================
  =            Contacts map            =
  ====================================*/

  var contactsMap = document.querySelector('#contacts-map');

  if (contactsMap) {
    loadMapScript();
  }

  /*=====  End of Contacts map  ======*/
});

// Загрузка карты
function loadMapScript() {
  var script = document.createElement('script');
  script.src =
    'http://maps.googleapis.com/maps/api/js?key=AIzaSyC9a_UDjprd--E33HE4d9_S6I0yjvViR8o&callback=initializeMap';
  document.head.appendChild(script);
}

// Инициализация карты
function initializeMap() {
  var locationOffice = {
    lat: 53.250673,
    lng: 34.371321
  };

  var centerMap = locationOffice;

  function createProp(defaultLocation) {
    return {
      center: centerMap,
      zoom: 16,
      streetViewControl: false,
      zoomControl: true,
      zoomControlOptions: {
        position: google.maps.ControlPosition.RIGHT_CENTER
      },
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      scrollwheel: false,
      styles: [
        {
          elementType: 'geometry',
          stylers: [
            {
              color: '#f5f5f5'
            }
          ]
        },
        {
          elementType: 'labels.icon',
          stylers: [
            {
              visibility: 'off'
            }
          ]
        },
        {
          elementType: 'labels.text.fill',
          stylers: [
            {
              color: '#616161'
            }
          ]
        },
        {
          elementType: 'labels.text.stroke',
          stylers: [
            {
              color: '#f5f5f5'
            }
          ]
        },
        {
          featureType: 'landscape.man_made',
          elementType: 'geometry.fill',
          stylers: [
            {
              color: '#e1e1e1'
            },
            {
              lightness: 30
            }
          ]
        },
        {
          featureType: 'landscape.man_made',
          elementType: 'labels.text',
          stylers: [
            {
              color: '#969696'
            }
          ]
        },
        {
          featureType: 'poi',
          elementType: 'geometry',
          stylers: [
            {
              color: '#eeeeee'
            }
          ]
        },
        {
          featureType: 'poi',
          elementType: 'labels.text.fill',
          stylers: [
            {
              color: '#757575'
            }
          ]
        },
        {
          featureType: 'poi.park',
          elementType: 'geometry',
          stylers: [
            {
              color: '#e5e5e5'
            }
          ]
        },
        {
          featureType: 'poi.park',
          elementType: 'labels.text.fill',
          stylers: [
            {
              color: '#9e9e9e'
            }
          ]
        },
        {
          featureType: 'road',
          elementType: 'geometry',
          stylers: [
            {
              color: '#ffffff'
            }
          ]
        },
        {
          featureType: 'road.arterial',
          elementType: 'labels.text.fill',
          stylers: [
            {
              color: '#757575'
            }
          ]
        },
        {
          featureType: 'road.highway',
          elementType: 'geometry',
          stylers: [
            {
              color: '#dadada'
            }
          ]
        },
        {
          featureType: 'road.highway',
          elementType: 'labels.text.fill',
          stylers: [
            {
              color: '#616161'
            }
          ]
        },
        {
          featureType: 'road.local',
          elementType: 'labels.text.fill',
          stylers: [
            {
              color: '#9e9e9e'
            }
          ]
        },
        {
          featureType: 'transit.line',
          elementType: 'geometry',
          stylers: [
            {
              color: '#e5e5e5'
            }
          ]
        },
        {
          featureType: 'transit.station',
          elementType: 'geometry',
          stylers: [
            {
              color: '#eeeeee'
            }
          ]
        },
        {
          featureType: 'water',
          elementType: 'geometry',
          stylers: [
            {
              color: '#c9c9c9'
            }
          ]
        },
        {
          featureType: 'water',
          elementType: 'labels.text.fill',
          stylers: [
            {
              color: '#9e9e9e'
            }
          ]
        }
      ]
    };
  }

  var mapProp = createProp(locationOffice);
  var map = new google.maps.Map(
    document.getElementById('contacts-map'),
    mapProp
  );
  var ICONPATH =
    location.hostname === 'localhost' ? 'images/location-pin.svg' : '/wp-content/themes/gortaxi/images/location-pin.svg';
  var marker = new google.maps.Marker({
    position: locationOffice,
    map: map,
    title: 'Офис компании «Городское такси»',
    icon: {
      url: ICONPATH,
      scale: 1
    }
  });
}
