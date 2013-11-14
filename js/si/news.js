(function( doc, $ ) {

    window.SI = window.SI || {};

    var me, s, els;

    SI.news = {
    
        settings: {
            $w: $( window ),
            wh: $( window ).height(),

            tagUrl: SI.tagUrl || '',

            wsLoadUrl: '/webservices/wsNews.asmx/loadNewsItemsAsHtml',
            start: 1,
            end: 8,
            max: 8,
            displayMode: 1,

            latestKnowsScrollY: 0,
            ticking: false,

            areMoreEntries: true
        },

        elements: {
            entriesWrapper: doc.getElementById( 'entries' ),
            entries: doc.querySelectorAll( '.news-item-summary' )
        },

        init: function() {
            me = this;
            s = me.settings;
            els = me.elements;

            if ( ! SI.isEntry ) {
                me.bindEvents();

                // if the document body is <= the window height, try to load more entries
                if ( $( doc.body ).height() <= s.wh ) {
                    me.requestTick();
                }
            }
        },

        bindEvents: function() {
            window.addEventListener( 'scroll', me.onScroll, false );
        },

        onScroll: function() {
            if ( ! s.areMoreEntries || els.entries.length === 0 ) {
                window.removeEventListener( 'scroll', me.onScroll, false );
            }
            else {
                s.lastScrollY = window.scrollY || window.pageYOffset;
                me.requestTick();
            }
        },

        requestTick: function() {
            if ( ! s.ticking ) {
                requestAnimationFrame( me.update );
                s.ticking = true;
            }
        },

        update: function() {
            var currentScrollY = window.scrollY || window.pageYOffset;
            s.ticking = false;
            
            var lastEntry = els.entries[els.entries.length - 1],
                lastEntryTop = $( lastEntry ).offset().top;
            
            if ( s.wh + s.$w.scrollTop() >= lastEntryTop ) {
                me.loadMoreEntries();
            }
        },

        loadMoreEntries: function() {
            s.start = s.start + s.max;
            s.end = s.end + s.max;

            SI.ajax( s.wsLoadUrl, {
                newsId: -1,
                search: '',
                webUrl: '',
                tagUrl: s.tagUrl,
                isActive: true,
                start: s.start,
                max: s.end,
                displayMode: s.displayMode
            }, function( data ) {
                if ( data && data.d && data.d.length > 0 ) {
                    $( els.entriesWrapper ).append( data.d );
                    els.entries = doc.querySelectorAll( '.news-item-summary' );

                    setTimeout( function() {
                        SI.checkWebP();

                        if ( $( 'html' ).is( '.lt-ie9' ) ) {
                            Selectivizr.init();
                        }
                    }, 10 );
                }
                else {
                    s.areMoreEntries = false;
                }
            });
        }
    };
    
    SI.news.init();
}( document, jQuery ) );