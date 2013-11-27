/*!
 * util.js
 *
 * A utility file that provides helper methods for error messages, ajax calls, logging, etc...
 * Ajax function has been updated to return the jXHR object available in jQuery 1.5
 * Provides a window.log default function to prevent errors in browsers without a console.
 *
 * @author: Jeremy Burton (jeremy@select-interactive.com - www.select-interactive.com)
 */
(function( document, $ ) {
    window.SI = window.SI || {};

    // requestAnimation
    window.requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame ||
                                   window.webkitRequestAnimationFrame || window.msRequestAnimationFrame ||
                                   function( callback ) {
                                       window.setTimeout( callback, 1000 / 60 );
                                   };

    // Fix for iPhone viewport scale bug
    // http://www.blog.highub.com/mobile-2/a-fix-for-iphone-viewport-scale-bug/
    SI.viewportmeta = document.querySelector && document.querySelector( 'meta[name="viewport"]' );
    SI.ua = navigator.userAgent;

    SI.scaleFix = function() {
        if ( SI.viewportmeta && /iPhone|iPad|iPod/.test( SI.ua ) && !/Opera Mini/.test( SI.ua ) ) {
            SI.viewportmeta.content = 'width=device-width, minimum-scale=1.0, maximum-scale=1.0';
            document.addEventListener( 'gesturestart', SI.gestureStart, false );
        }
    };

    SI.gestureStart = function() {
        SI.viewportmeta.content = 'width=device-width, minimum-scale=0.25, maximum-scale=1.6';
    };

    /**
     * Normalized hide address bar for iOS & Android
     * (c) Scott Jehl, scottjehl.com
     * MIT License
     */

    // If we split this up into two functions we can reuse
    // this function if we aren't doing full page reloads.

    // If we cache this we don't need to re-calibrate everytime we call
    // the hide url bar
    SI.BODY_SCROLL_TOP = false;

    // So we don't redefine this function everytime we
    // we call hideUrlBar
    SI.getScrollTop = function() {
        var win = window,
            doc = document;

        return win.pageYOffset || doc.compatMode === 'CSS1Compat' && doc.documentElement.scrollTop || doc.body.scrollTop || 0;
    };

    // It should be up to the mobile
    SI.hideUrlBar = function() {
        var win = window;

        // if there is a hash, or SI.BODY_SCROLL_TOP hasn't been set yet, wait till that happens
        if ( !location.hash && SI.BODY_SCROLL_TOP !== false ) {
            win.scrollTo( 0, SI.BODY_SCROLL_TOP === 1 ? 0 : 1 );
        }
    };

    SI.hideUrlBarOnLoad = function() {
        var win = window,
            doc = win.document,
            bodycheck;

        // If there's a hash, or addEventListener is undefined, stop here
        if ( !location.hash && win.addEventListener && ( !window.matchMedia || window.matchMedia( '(max-width: 768px)' ).matches ) ) {
        
            // scroll to 1
            window.scrollTo( 0, 1 );
            SI.BODY_SCROLL_TOP = 1;

            // reset to 0 on bodyready, if needed
            bodycheck = setInterval(function() {
                if ( doc.body ) {
                    clearInterval( bodycheck );
                    SI.BODY_SCROLL_TOP = SI.getScrollTop();
                    SI.hideUrlBar();
                }
            }, 15 );

            win.addEventListener( 'load', function() {
                setTimeout(function() {
                    // at load, if user hasn't scrolled more than 20 or so...
                    if ( SI.getScrollTop() < 20 ) {
                        // reset to hide addr bar at onload
                        SI.hideUrlBar();
                    }
                }, 0);
            });
        }
    };

    SI.ajax = function( wsUrl, wsData, callSuccess, callFailure ) {
        if ( typeof wsData !== 'string' ) {
            wsData = JSON.stringify( wsData );
        }

        return $.ajax({
            cache: false,
            contentType: 'application/json; charset=utf-8',
            data: wsData,
            error: callFailure,
            success: callSuccess,
            dataType: 'json',
            type: 'POST',
            url: wsUrl
        });
    };

    SI.initNav = function() {
        var navTrigger = document.getElementById( 'nav-trigger' ),
            navColumn = document.getElementById( 'nav-column' ), 
            contentWrapper = document.getElementById( 'content-wrapper' ),
            page = document.getElementById( 'page-wrapper' ),
            moved = false, startX = 0, startY = 0;

        // tablet landscape & computer
        if ( ! window.matchMedia || window.matchMedia( '(min-width: 1024px)' ).matches ) {
            
        }

        // table portrait & phones
        else {
            if ( navColumn.offsetHeight + 100 < page.offsetHeight ) {
                navColumn.style.height = navColumn.offsetHeight + 100 + 'px';
            }

            // Use ontouch events to check for a tap
            // on the page to close the menu
            contentWrapper.ontouchstart = function( e ) {
                moved = false;
                startX = e.touches[0].clientX;
                startY = e.touches[0].clientY;
            };

            contentWrapper.ontouchmove = function( e ) {
                if ( Math.abs( e.touches[0].clientX - startX ) > 10 ||
                     Math.abs( e.touches[0].clientY - startY ) > 10) {
                        moved = true;
                }
            };

            contentWrapper.ontouchend = function( e ) {
                if ( ! moved && navColumn.classList.contains( 'in' ) ) {
                    navColumn.classList.remove( 'in' );
                }
            };
        }

        navTrigger.addEventListener( 'click', function( e ) {
            e.preventDefault();

            navColumn.classList.toggle( 'in' );
        }, false );
    };

    SI.checkRspImgs = function() {
        var imgs = document.querySelectorAll( '.rsp-img' ),
            i = 0,
            len = imgs.length,
            webp = Modernizr.webp,
            ticking = false,
            img, dir, imgName;

        function getDir() {
            var directory;

            if ( ! window.matchMedia || window.matchMedia( '(min-width:1292px)' ).matches ) {
                directory = 'large';
            }
            else if ( window.matchMedia && ( window.matchMedia( '(min-width:769px) and (max-width:1291px)' ).matches ) || ( window.matchMedia( '(min-width:768px) and (orientation:landscape)' ).matches ) ) {
                directory = 'med';
            }
            else {
                directory = 'small';
            }

            return directory;
        }

        dir = getDir();

        for ( ; i < len; i++ ) {
            img = imgs[i];
            
            imgName = img.getAttribute( 'data-img' );
            
            if ( ! webp ) {
                imgName = imgName.replace( '.webp', '.' + img.getAttribute( 'data-type' ) );
            }

            img.src = img.getAttribute( 'data-path' ) + dir + '/' + imgName;
        }

        function windowResize() {
            requestTick();
        }

        function requestTick() {
            if ( ! ticking ) {
                requestAnimationFrame( update );
                ticking = true;
            }
        }

        function update() {
            var directory = getDir();
            
            if ( dir !== directory ) {
                for ( i = 0 ; i < len; i++ ) {
                    img = imgs[i];
                    img.src = img.src.replace( '/' + dir + '/', '/' + directory + '/' );
                }

                dir = directory;
            }

            ticking = false;
        }

        window.addEventListener( 'resize', windowResize, false );
    };

    SI.checkWebP = function() {
        // webp replacement
        if ( ! Modernizr.webp ) {
            // select all elements with class webp
            var imgs = document.querySelectorAll( '.webp' ),
                i = 0,
                len = imgs.length;
            
            // loop through them and replace with either
            // jpg or png depending on class name
            for ( ; i < len; i++ ) {
                var img = imgs[i],
                    replace = img.classList.contains( 'jpg' ) ? 'jpg' : 'png';

                img.src = img.src.replace( /webp/i, replace );
            }
        }
    };

    SI.checkDPI = function() {
        // use matchMedia to determine if device is "retina display"/high DPI
        if ( window.matchMedia && window.matchMedia( 'only screen and (-moz-min-device-pixel-ratio: 1.3), only screen and (-o-min-device-pixel-ratio: 2.6/2), only screen and (-webkit-min-device-pixel-ratio: 1.3), only screen  and (min-device-pixel-ratio: 1.3), only screen and (min-resolution: 1.3dppx)' ).matches ) {
            // select all elements with class dpi
            var imgs = document.querySelectorAll( '.dpi' ),
                i = 0,
                len = imgs.length;

            // loop through them and replace with dpi version.
            for ( ; i < len; i++ ) {
                var img = imgs[i],
                    src = img.src,
                    temp = '',
                    ext;
                
                // trim off anything before /img
                // capture the extension
                if ( src.indexOf( '/SI_Images.ashx?' ) > 0 ) {
                    src = src.substring( src.indexOf( '?' ) );
                    temp = src.substring( 0 , src.indexOf( '.' ) );
                    src = '//static.select-interactive.com/SI_Images.ashx' + temp + '-@2.' + src.substring( src.indexOf( '.' ) + 1 );
                }
                else {
                    src = src.substring( src.indexOf( '/img' ) );
                    ext = src.substring( src.indexOf( '.' ) );

                    // put -@2 before the extension and set to the img src
                    src = src.substring( 0 , src.indexOf( '.' ) ) + '-@2' + ext;
                }
               
                img.src = src;
            }
        }
    };

    SI.initTracking = function() {
        var links = document.querySelectorAll( '.track-event' ),
            i = 0,
            len = links.length;
            
        for ( ; i < len; i++ ) {
            links[i].addEventListener( 'click', trackEvent, false );
        }

        function trackEvent( e ) {
            var _this = $( this ),
                category = 'News View',
                action = _this.data( 'event' ),
                label = _this.parent().parent().find( '.news-headline' ).text();

            if ( ! label || label === '' ) {
                label = _this.parent().parent().parent().find( '.news-headline' ).text();
            }

            e.preventDefault();

            _gaq.push( ['_trackEvent', category, action, label] );

            setTimeout(function() {
                window.location = _this.attr( 'href' );
            }, 10 );
        }
    };

    SI.init = function() {
        SI.checkRspImgs();
        SI.checkWebP();
        SI.checkDPI();
        SI.initNav();
        SI.initTracking();

        // scroll top for iPhone/Android phoes
        if ( window.matchMedia && window.matchMedia( '(max-width: 768px)' ).matches ) {
            SI.hideUrlBarOnLoad();
        }

        // fix scale issue for iPhone
        SI.scaleFix();

        // init logout clicks
        var logout = document.querySelector( '.logout' );
        
        if ( logout ) {
            logout.addEventListener( 'click', function( e ) {
                SI.ajax( '/webservices/wsUser.asmx/userLogout', {}, function( msg ) {
                    if ( msg && msg.d && msg.d === 'success' ) {
                        window.location = '/';
                    }
                });

                e.preventDefault();
            }, false );
        }
    };

    // load in classList and addEventListener support to oldIE
    Modernizr.load({
        test: 'classList' in document.createElement( 'a' ),
        nope: ['/js/plugins/classList.js'],
        complete: function() {
            SI.init();
        }
    });

}( document, jQuery ) );

// Avoid 'console' errors in browsers that lack a console
(function() {
    var method;
    var noop = function () {};
    var methods = [
        'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error',
        'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log',
        'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd',
        'timeStamp', 'trace', 'warn'
    ];
    var length = methods.length;
    var console = (window.console = window.console || {});

    while (length--) {
        method = methods[length];

        // Only stub undefined methods.
        if (!console[method]) {
            console[method] = noop;
        }
    }
}());

// addEventListener Polyfill for IE8
!window.addEventListener&&function(f,g,h,k,l,m,d){f[k]=g[k]=h[k]=function(b,e){var c=this;d.unshift([c,b,e,function(a){a.currentTarget=c;a.preventDefault=function(){a.returnValue=!1};a.stopPropagation=function(){a.cancelBubble=!0};a.target=a.srcElement||c;e.call(c,a)}]);this.attachEvent("on"+b,d[0][3])};f[l]=g[l]=h[l]=function(b,e){for(var c=0,a;a=d[c];++c)if(a[0]==this&&a[1]==b&&a[2]==e)return this.detachEvent("on"+b,d.splice(c,1)[0][3])};f[m]=g[m]=h[m]=function(b){return this.fireEvent("on"+b.type, b)}}(Window.prototype,HTMLDocument.prototype,Element.prototype,"addEventListener","removeEventListener","dispatchEvent",[]);