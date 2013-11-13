(function( doc, $ ) {

    window.SI = window.SI || {};

    var me, s, els;

    SI.contact = {
    
        settings: {
            wsUrl: '/webservices/wsContact.asmx/submitContactRequest'
        },

        elements: {
            formContact: doc.getElementById( 'form-contact' ),
            formContent: doc.getElementById( 'form-content' ),
            optionsWrapper: doc.getElementById( 'options' ),
            options: doc.getElementById( 'options' ).querySelectorAll( 'input' ),
            btnSubmit: doc.getElementById( 'btn-submit' ),
            status: doc.getElementById( 'status' )
        },

        init: function() {
            me = this;
            s = me.settings;
            els = me.elements;
            me.bindEvents();
        },

        bindEvents: function() {
            els.btnSubmit.addEventListener( 'click', me.submitContactRequest, false );
        },

        submitContactRequest: function( e ) {
            var fields = els.formContact.querySelectorAll( '.req' ),
                i = 0,
                len = fields.length,
                isError = false,
                params = {},
                field, value;

            // validate the form
            if ( $( els.options ).filter( ':checked' ).length === 0 ) {
                els.status.innerHTML = '<p class="error">You must select a contact reason.</p>';
                return;
            }

            for ( ; i < len; i++ ) {
                field = fields[i];
                value = $.trim( field.value );

                if ( value === '' ) {
                    isError = true;
                    field.classList.add( 'invalid' );
                }
                else {
                    field.value = value;
                    field.classList.remove( 'invalid' );
                }
            }

            // if at least one field hasn't been entered
            if ( isError ) {
                els.status.innerHTML = '<p class="error">All fields are required.</p>';
                els.formContact.querySelectorAll( '.invalid' )[0].focus();
                return;
            }


            els.status.innerHTML = '<p>Submitting your request, please wait...</p>';

            // collect the data
            params['inquiry'] = $( els.options ).filter( ':checked' ).map( function( el ) {
                return this.value;
            }).get();

            params['name'] = doc.getElementById( 'tb-name' ).value;
            params['email'] = doc.getElementById( 'tb-email' ).value;
            params['phone'] = doc.getElementById( 'tb-phone' ).value;
            params['message'] = doc.getElementById( 'ta-comment' ).value;

            // submit the information and email to SI
            SI.ajax( s.wsUrl, params, function( data ) {
                if ( data && data.d ) {
                    var rsp = JSON.parse( data.d );
            
                    if ( rsp && rsp.status && rsp.status === 'success' ) {
                        els.formContent.innerHTML = '<p class="text-larger" style="margin-top:35px;">Your request has been received. Thank you for your interest in Select Interactive. A representative will be in contact with you as quickly as possible.</p>';
                    }
                    else {
                        els.status.innerHTML = '<p class="error">Unable to process your request at this time. Please try again or email us directly at <a href="mailto:contact@select-interactive.com">contact@select-interactive.com</a>.</p>';
                    }
                }
            });
        }
    };
    
    SI.contact.init();
}( document, jQuery ) );