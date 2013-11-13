(function( document, $ ) {
    
    window.SI = window.SI || {};

    function init() {
        var _formLogin = $( '#form-login' ),
            _tbUsername = $( '#tb-username' ),
            _tbPassword = $( '#tb-password' ),
            _btnLogin = $( '#btn-login' ),
            _statusLogin = $( '#status-login' );

        _formLogin.on( 'submit', function( e ) {
            // validate the form
            _formLogin.find( 'input' ).each(function() {
                var v = $.trim( this.value );
            });

            if ( _tbUsername.val() === '' || _tbPassword.val() === '' ) {
                _statusLogin.html( '<p class="error">Both username and password are required.</p>' );
                
                if ( _tbUsername.val() === '' ) {
                    _tbUsername.focus();
                }
                else {
                    _tbPassword.focus();
                }

                e.preventDefault();
            }
            else {
                _statusLogin.html( '<p class="info">Attempting to login, please wait...</p>' );
            }
        });

        _tbUsername.focus();

        if ( document.URL.indexOf( '?lgnfail' ) !== -1 ) {
            _statusLogin.html( '<p class="error">Login failed. Please try again.</p>' );
        }
    }

    $(function(){init();});
}( document, jQuery ) );