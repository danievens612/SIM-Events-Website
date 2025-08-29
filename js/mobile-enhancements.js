/**
 * Mobile Enhancements for SIM Events Website
 * Handles mobile-specific functionality and optimizations
 */

(function($) {
    'use strict';

    // Mobile Detection
    function isMobile() {
        return window.innerWidth <= 767;
    }

    // Tablet Detection
    function isTablet() {
        return window.innerWidth > 767 && window.innerWidth <= 991;
    }

    // Initialize Mobile Enhancements
    function initMobileEnhancements() {
        
        // Mobile Navigation Enhancement
        if (isMobile()) {
            // Ensure mobile menu is properly initialized
            if (typeof $.fn.slicknav !== 'undefined') {
                $('.mobile-menu').slicknav({
                    prependTo: '#mobile-menu-wrap',
                    allowParentLinks: true,
                    duplicate: true,
                    label: '',
                    closedSymbol: '&#9658;',
                    openedSymbol: '&#9660;'
                });
            }
        }

        // Touch-friendly enhancements
        addTouchEnhancements();
        
        // Video responsiveness
        makeVideosResponsive();
        
        // Image optimization
        optimizeImages();
        
        // Form enhancements
        enhanceForms();
        
        // Smooth scrolling for mobile
        enableSmoothScrolling();
    }

    // Add touch-friendly enhancements
    function addTouchEnhancements() {
        // Add touch class to body
        if ('ontouchstart' in window) {
            $('body').addClass('touch-device');
        }

        // Improve button tap targets
        $('.primary-btn, .site-btn, button').each(function() {
            var $btn = $(this);
            if ($btn.height() < 44) {
                $btn.css('min-height', '44px');
            }
        });

        // Add touch feedback for interactive elements
        $('.service__item, .about__services__item, .blog__item, .youtube__item').on('touchstart', function() {
            $(this).addClass('touch-active');
        }).on('touchend touchcancel', function() {
            $(this).removeClass('touch-active');
        });
    }

    // Make videos responsive
    function makeVideosResponsive() {
        // Wrap YouTube iframes in responsive containers
        $('iframe[src*="youtube"], iframe[src*="youtu.be"]').each(function() {
            var $iframe = $(this);
            if (!$iframe.parent().hasClass('video-responsive')) {
                $iframe.wrap('<div class="video-responsive"></div>');
            }
        });

        // Adjust video dimensions on mobile
        if (isMobile()) {
            $('iframe').each(function() {
                var $iframe = $(this);
                var src = $iframe.attr('src');
                
                if (src && (src.includes('youtube') || src.includes('youtu.be'))) {
                    $iframe.css({
                        'width': '100%',
                        'height': 'auto',
                        'max-width': '100%'
                    });
                }
            });
        }
    }

    // Optimize images for mobile
    function optimizeImages() {
        // Lazy loading for images (if not already implemented)
        $('img').each(function() {
            var $img = $(this);
            
            // Add responsive image class
            if (!$img.hasClass('img-responsive')) {
                $img.addClass('img-responsive');
            }
            
            // Ensure images don't exceed container width
            $img.css('max-width', '100%');
        });

        // Handle background images on mobile
        if (isMobile()) {
            $('.set-bg').each(function() {
                var $element = $(this);
                var bgImage = $element.data('setbg');
                
                if (bgImage) {
                    $element.css({
                        'background-size': 'cover',
                        'background-position': 'center center',
                        'background-attachment': 'scroll' // Better performance on mobile
                    });
                }
            });
        }
    }

    // Enhance forms for mobile
    function enhanceForms() {
        // Add proper input types for mobile keyboards
        $('input[placeholder*="email"], input[placeholder*="Email"]').attr('type', 'email');
        $('input[placeholder*="phone"], input[placeholder*="Phone"]').attr('type', 'tel');
        
        // Improve form field spacing on mobile
        if (isMobile()) {
            $('input, textarea, select').css({
                'font-size': '16px', // Prevents zoom on iOS
                'margin-bottom': '15px'
            });
        }

        // Add form validation feedback
        $('form').on('submit', function(e) {
            var $form = $(this);
            var isValid = true;
            
            $form.find('input[required], textarea[required]').each(function() {
                var $field = $(this);
                if (!$field.val().trim()) {
                    $field.addClass('error');
                    isValid = false;
                } else {
                    $field.removeClass('error');
                }
            });
            
            if (!isValid) {
                e.preventDefault();
                alert('Please fill in all required fields.');
            }
        });
    }

    // Enable smooth scrolling
    function enableSmoothScrolling() {
        $('a[href^="#"]').on('click', function(e) {
            var target = $(this.getAttribute('href'));
            
            if (target.length) {
                e.preventDefault();
                $('html, body').animate({
                    scrollTop: target.offset().top - 80 // Account for fixed header
                }, 800);
            }
        });
    }

    // Handle orientation changes
    function handleOrientationChange() {
        $(window).on('orientationchange resize', function() {
            setTimeout(function() {
                // Recalculate dimensions after orientation change
                makeVideosResponsive();
                
                // Trigger window resize event for other plugins
                $(window).trigger('resize');
            }, 100);
        });
    }

    // Performance optimizations for mobile - Keep animations
    function optimizePerformance() {
        // Keep all animations on mobile for better user experience
        // Only optimize scroll events for performance
        
        // Optimize scroll events
        var scrollTimer = null;
        $(window).on('scroll', function() {
            if (scrollTimer) {
                clearTimeout(scrollTimer);
            }
            
            scrollTimer = setTimeout(function() {
                // Add scroll-based functionality here if needed
            }, 150);
        });
    }

    // Fix common mobile issues
    function fixMobileIssues() {
        // Fix iOS Safari viewport height issue
        function setVH() {
            let vh = window.innerHeight * 0.01;
            document.documentElement.style.setProperty('--vh', `${vh}px`);
        }
        
        setVH();
        $(window).on('resize orientationchange', setVH);

        // Prevent zoom on input focus (iOS)
        $('input, select, textarea').on('focus', function() {
            if (isMobile()) {
                $('meta[name=viewport]').attr('content', 
                    'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no');
            }
        }).on('blur', function() {
            if (isMobile()) {
                $('meta[name=viewport]').attr('content', 
                    'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no');
            }
        });

        // Fix sticky hover states on touch devices
        if ('ontouchstart' in window) {
            $('*').on('touchstart', function() {
                $(this).trigger('hover');
            }).on('touchend', function() {
                $(this).trigger('mouseleave');
            });
        }
    }

    // Initialize everything when document is ready
    $(document).ready(function() {
        initMobileEnhancements();
        handleOrientationChange();
        optimizePerformance();
        fixMobileIssues();
        
        // Add mobile-specific CSS class
        if (isMobile()) {
            $('body').addClass('mobile-device');
        } else if (isTablet()) {
            $('body').addClass('tablet-device');
        }
    });

    // Re-initialize on window resize
    $(window).on('resize', function() {
        setTimeout(function() {
            initMobileEnhancements();
        }, 250);
    });

})(jQuery);