(function( doc, $ ) {

    window.SI = window.SI || {};

    var me, s, els;

    SI.portfolio = {
    
        settings: {
        
        },

        elements: {
            contentWrapper: doc.getElementById( 'content-wrapper' ),
            projects: doc.querySelectorAll( '.project-img' ),

            overlay: '<div class="project-overlay out">View Project Details</div>'
        },

        init: function() {
            me = this;
            s = me.settings;
            els = me.elements;
            me.bindEvents();
        },

        bindEvents: function() {
            Array.prototype.forEach.call( els.projects, function( el ) {
                //el.addEventListener( 'mouseenter', me.showOverlay, false );
                //el.addEventListener( 'mouseleave', me.removeOverlay, false );
                //el.addEventListener( 'click', me.goToDetails, false );
            });
        },

        showOverlay: function() {
            var _this = $( this );
            _this.append( els.overlay );
            
            setTimeout( function() {
                _this.find( '.project-overlay' ).removeClass( 'out' );
            }, 10 );
        },

        removeOverlay: function() {
            $( this ).find( '.project-overlay' ).remove();
        },

        goToDetails: function() {
            var url = '/news/' + $( this ).parent().data( 'details' );
            window.location = url;
        }
    };
    
    SI.portfolio.init();
}( document, jQuery ) );