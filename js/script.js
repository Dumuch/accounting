// var navMain = document.querySelector('.main-nav');
// var navToggle = document.querySelector('.main-nav__toggle');
var TABLET_WIDTH = 768;
var DESKTOP_WIDTH = 1300;
var LONGITUDE = 59.939181;
var LATITUDE = 30.321469;
var LATITUDE_TABLET = 30.319356;
var LATITUDE_DESKTOP = 30.323199;

var getScreenWidth = function() {
  return window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
}

//   navMain.classList.remove('main-nav--nojs');
//   navToggle.addEventListener('click', function() {
//     if (navMain.classList.contains('main-nav--closed')) {
//       navMain.classList.remove('main-nav--closed');
//       navMain.classList.add('main-nav--opened');
//     } else {
//       navMain.classList.add('main-nav--closed');
//       navMain.classList.remove('main-nav--opened');
//     }
//   })
// ;

var mapElement = document.querySelector("#map");
var mapWrapper = document.querySelector(".contacts__map-wrapper");
var map = "";
google.maps.event.addDomListener(window, "load", init);
google.maps.event.addDomListener(window, "resize", resizeMap);

function init() {
  var mapOptions = {
    zoom: 16,
    mapTypeControl: false,
    zoomControl: true,
    scrollwheel: false,
    zoomControlOptions: {
      position: google.maps.ControlPosition.LEFT_TOP
    },
    streetViewControl: false,
    center: new google.maps.LatLng(LONGITUDE, LATITUDE)
  };
  map = new google.maps.Map(mapElement, mapOptions);
  var image = {
    url: "img/map-icon.png",
    size: new google.maps.Size(124, 106),
    origin: new google.maps.Point(0, 0),
    anchor: new google.maps.Point(62, 106)
  };
  var marker = new google.maps.Marker({
    position: new google.maps.LatLng(LONGITUDE, LATITUDE),
    map: map,
    optimized: false,
    icon: image
  });
  resizeMap();
};

function resizeMap() {
  google.maps.event.trigger(map, "resize");
  var width = getScreenWidth();
  map.setZoom(
    width >= TABLET_WIDTH
    ? 17
    : 16);
  if (width >= DESKTOP_WIDTH) {
    map.panTo(new google.maps.LatLng(LONGITUDE, LATITUDE_TABLET));
  } else {
    map.panTo(new google.maps.LatLng(LONGITUDE, LATITUDE_DESKTOP));
  }
};

// плавная прокрутка к анкору
$(function() {
  $("a[href^='#']").click(function() {
    var _href = $(this).attr("href");
    $("html, body").animate({
      scrollTop: $(_href).offset().top + "px"
    });
    return false;
  });
});

$.fn.setCursorPosition = function(pos) {
  if ($(this).get(0).setSelectionRange) {
    $(this).get(0).setSelectionRange(pos, pos);
  } else if ($(this).get(0).createTextRange) {
    var range = $(this).get(0).createTextRange();
    range.collapse(true);
    range.moveEnd('character', pos);
    range.moveStart('character', pos);
    range.select();
  }
};

// Маска для телефона
$("#phone_2").click(function() {
  $(this).setCursorPosition(3);
}).mask("+7 (999) 999-99-99");

$("#phone_1").click(function() {
  $(this).setCursorPosition(3);
}).mask("+7 (999) 999-99-99");

// скрытие кнопки вверх
$(function() {
  $(window).scroll(function() {
    if ($(window).scrollTop() > 100) {
      $('#scroll_top').show();
    } else {
      $('#scroll_top').hide();
    }
  });
});

// Отправка заявки
$(document).ready(function() {
  $('#consultationform').submit(function() { // проверка на пустоту заполненных полей. Атрибут html5 — required не подходит (не поддерживается Safari)
    if (document.consultationform.name.value == '' || document.consultationform.phone.value == '') {
      valid = false;
      return valid;
    }
    $.ajax({type: "POST", url: "admin/mail.php", data: $(this).serialize()}).done(function() {
      $('.js-overlay-thank-you').fadeIn();
      $(this).find('input').val('');
      $('#consultationform').trigger('reset');
    });
    return false;
  });
});

$(document).ready(function() {
  $('#backcallform').submit(function() { // проверка на пустоту заполненных полей. Атрибут html5 — required не подходит (не поддерживается Safari)
    if (document.backcallform.backcall.value == '') {
      valid = false;
      return valid;
    }
    $.ajax({type: "POST", url: "admin/mail-2.php", data: $(this).serialize()}).done(function() {
      $('.js-overlay-thank-you').fadeIn();
      $(this).find('input').val('');
      $('#backcallform').trigger('reset');
    });
    return false;
  });
});

// Закрыть попап «спасибо»
$('.js-close-thank-you').click(function() { // по клику на крестик
  $('.js-overlay-thank-you').fadeOut();
});

$(document).mouseup(function(e) { // по клику вне попапа
  var popup = $('.popup');
  if (e.target != popup[0] && popup.has(e.target).length === 0) {
    $('.js-overlay-thank-you').fadeOut();
  }
});

var wow = new WOW({
  boxClass: 'wow', // animated element css class (default is wow)
  animateClass: 'animated', // animation css class (default is animated)
  offset: 0, // distance to the element when triggering the animation (default is 0)
  mobile: true, // trigger animations on mobile devices (default is true)
  live: true, // act on asynchronously loaded content (default is true)
  callback: function(box) {
    // the callback is fired every time an animation is started
    // the argument that is passed in is the DOM node being animated
  },
  scrollContainer: null, // optional scroll container selector, otherwise use window,
  resetAnimation: true, // reset animation on end (default is true)
});
// если настройки не нужны, то оставляем только init()
wow.init();

function pricelight() {
  document.getElementById('appeal').value = "Тарифный план: Старт " + '\r\n';
};
function pricemiddle() {
  document.getElementById('appeal').value = "Тарифный план: Все под контролем " + '\r\n';
};
function pricefull() {
  document.getElementById('appeal').value = "Тарифный план: Полная защита " + '\r\n';
};
function priceExtraFull() {
  document.getElementById('appeal').value = "Тарифный план: Розница под ключ " + '\r\n';
};

if (!$(this).hasClass('hover')) {
  $(this).addClass('hover');
} else {
  $(this).removeClass('hover');
}

$('.site-nav__toggle').click(function() {
  if (!$('.site-nav--top').hasClass('site-nav__list--opened')) {
    $('.site-nav--top').addClass('site-nav__list--opened');
  } else {
    $('.site-nav--top').removeClass('site-nav__list--opened');
  }
});
