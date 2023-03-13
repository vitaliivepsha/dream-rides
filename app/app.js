// God save the Dev

'use strict';

if (process.env.NODE_ENV !== 'production') {
    require('./assets/templates/layouts/index.html');
    require('_templates/layouts/catalog.html');
    require('_templates/layouts/product.html');
    require('_templates/layouts/contacts.html');
    require('_templates/layouts/conditions.html');
    require('_templates/layouts/404.html');
    require('_templates/layouts/data-protection.html');
}

// Depends
var $ = require('jquery');
require('bootstrap-sass');

// Modules
var Forms = require('_modules/forms');
var LightGallery = require('_modules/lightgallery');
var Slider = require('_modules/slider');
require('../node_modules/sweetalert2/dist/sweetalert2');

// Stylesheet entrypoint
require('_stylesheets/app.scss');
const swal = require("sweetalert2");

// Are you ready?
$(function () {
    new Forms();
    new LightGallery();
    new Slider();

    setTimeout(function () {
        $('body').trigger('scroll');
        $(window).trigger('resize');
    }, 100);

    setTimeout(function () {
        $('body').removeAttr('style');
    }, 1000);

    // animations

    setTimeout(function () {
        var doAnimations = function () {
            var offset = $(window).scrollTop() + $(window).height(),
                $animatables = $('main .animate');
            if ($animatables.length == 0) {
                $(window).off('scroll', doAnimations);
            }
            $animatables.each(function (i) {
                var $animatable = $(this);
                if (($animatable.offset().top + $animatable.height() - 20) < offset) {
                    $animatable.removeClass('animate').addClass('animated');
                }
            });
        };
        $(window).on('scroll', doAnimations);
        $(window).trigger('scroll');
    }, 1050);

    // fixed header

    // var header = $('.header');
    //
    // $(window).scroll(function () {
    //     var scrolled = $(window).scrollTop();
    //
    //     if (scrolled > 90) {
    //         header.addClass('fixed');
    //     } else {
    //         header.removeClass('fixed');
    //     }
    // });
    //


    var header = $(".header");
    var headerMain = $(".header.header_main");
    var scrollPrev = 0;
    $(window).scroll(function () {
        var scrolled = $(window).scrollTop();
        if (scrolled > 120 && scrolled > scrollPrev) {
            header.addClass("fixed");
        } else {
            header.removeClass("fixed");
        }
        if (scrolled < 30) {
            headerMain.addClass("bg");
        } else {
            headerMain.removeClass("bg");
        }
        scrollPrev = scrolled;
    });


    // language dropdown

    $('.header-lang > span').click(function () {
        $('.header-lang').toggleClass('active');
        return false;
    });

    $(document).click(function () {
        $('.header-lang').removeClass('active');
    });

    $(document).on('click', '.header-lang > ul', function (e) {
        e.stopPropagation();
    });

    // faq

    $('.faq-head').click(function () {
        $(this).toggleClass('active').next().slideToggle();
        $('.faq-head').not(this).removeClass('active').next().slideUp();
        if ($('.faq-head').has('.active')) {
            $(this).closest($('.faq-item')).toggleClass('active');
            $('.faq-head').not(this).closest($('.faq-item')).removeClass('active');
        }
    });

    // checkbox change

    $('.checkbox-wrapper input').on('change', function () {
        var btn = $(this).closest('form').find('button[type=submit]');
        if (this.checked) {
            btn.prop('disabled', false);
        } else {
            btn.prop('disabled', true);
        }
    });

    // mobile menu

    var touch = $('.mobile-menu__btn');

    var toggles = document.querySelectorAll('.mobile-menu__btn');

    for (var i = toggles.length - 1; i >= 0; i--) {
        var toggle = toggles[i];
        toggleHandler(toggle);
    }

    function toggleHandler(toggle) {
        toggle.addEventListener('click', function (e) {
            e.preventDefault();
            (this.classList.contains('active') === true) ? this.classList.remove('active') : this.classList.add('active');
        });
    }

    $(touch).click(function (e) {
        e.preventDefault();
        $('body').toggleClass('menu-opened');
        return false;
    });

    $(document).on('click', '.mobile-menu__btn', function (e) {
        e.stopPropagation();
    });

    $(document).on('click', '.mobile-menu__wrapper', function (e) {
        e.stopPropagation();
    });

    $(window).resize(function () {
        if ($(window).width() > 991) {
            $('.mobile-menu__btn').removeClass('active');
            $('body').removeClass('menu-opened');
        }
    });

    // lazy load
    var lazyload = function () {
        var scroll = $(window).scrollTop() + $(window).height() * 3;

        $('.lazy').each(function () {
            var $this = $(this);
            if ($this.offset().top < scroll) {
                $this.attr('src', $(this).data('original'));
            }
        });
        $('.lazy-web').each(function () {
            var $this = $(this);
            if ($this.offset().top < scroll) {
                $this.attr('srcset', $(this).data('original'));
            }
        });
    };
    $(window).scroll(lazyload);
});
