(function( doc, $ ) {

    window.SI = window.SI || {};

    var me, s, els;

    SI.admin = SI.admin || {};

    SI.admin.news = {
    
        settings: {
            projectId: -1,
            primaryPic: '',
            logo: '',
            wsUrl: '/webservices/wsPortfolio.asmx/',
            wsDisplaymode: 2,

            editorOptions: {
                allowedContent: true,
                toolbar: 'Simple'
            }
        },

        elements: {
            // form options
            formOptions: doc.getElementById( 'form-option' ),
            ddlItems: doc.getElementById( 'ddl-items' ),
            btnNew: doc.getElementById( 'btn-new' ),

            // form project
            formProject: doc.getElementById( 'form-project' ),
            dataFields: doc.querySelectorAll( '[data-field]' ),
            cbIsHttps: doc.getElementById( 'cb-is-https' ),
            cbIsActive: doc.getElementById( 'cb-is-active' ),
            btnItemSave: doc.getElementById( 'btn-project-save' ),
            btnItemCancel: doc.getElementById( 'btn-project-cancel' ),
            btnItemDelete: doc.getElementById( 'btn-project-delete' ),

            // status
            status: doc.getElementById( 'status' )
        },

        init: function() {
            me = this;
            s = me.settings;
            els = me.elements;
            me.bindEvents();

            // add the ckeditor
            CKEDITOR.replace( 'ta-summary', s.editorOptions );
        },

        bindEvents: function() {
            els.ddlItems.addEventListener( 'change', me.loadItemDetails, false );
            els.btnNew.addEventListener( 'click', me.startNewItem, false );
            els.btnItemSave.addEventListener( 'click', me.saveItem, false );
            els.btnItemCancel.addEventListener( 'click', me.cancel, false );
            els.btnItemDelete.addEventListener( 'click', me.deleteItem, false );
        },

        loadItemDetails: function() {
            els.status.innerHTML = '<p class="info">Loading item details, please wait...</p>';

            // get the projectId of the selected item
            s.projectId = parseInt( els.ddlItems.value, 10 );

            SI.ajax( s.wsUrl + 'loadPortfolioItemsAsJson', {
                projectId: s.projectId,
                isActive: false
            }, function( data ) {
                if ( data && data.d ) {
                    var item = data.d[0].cols,
                        fields = els.dataFields,
                        i = 0,
                        len = fields.length, 
                        field, key, value;
                            
                    // loop through the fields on the form and get the entry data,
                    // populate the fields with the respective data
                    for ( ; i < len; i++ ) {
                        field = fields[i];
                        key = field.getAttribute( 'data-field' );
                        value = item[key];
                        
                        if ( field.tagName.toString().toLowerCase() === 'textarea' ) {
                            CKEDITOR.instances[field.id].setData( value );
                        }
                        else {
                            field.value = value;
                        }
                    }

                    // set isActive
                    if ( item.isActive ) {
                        els.cbIsActive.checked = true;
                    }
                    else {
                        els.cbIsActive.checked = false;
                    }

                    // set isActive
                    if ( item.isActive ) {
                        els.cbIsActive.checked = true;
                    }
                    else {
                        els.cbIsActive.checked = false;
                    }

                    // set the pictures
                    s.primaryPic = item.primaryPic;
                    s.logo = item.logo;
                    
                    // make sure the delete and preview buttons are visible
                    els.btnItemDelete.classList.remove( 'hidden' );

                    // hide options form, show entry form
                    els.formOptions.classList.add( 'hidden' );
                    els.formProject.classList.remove( 'hidden' );

                    // clear out the status
                    els.status.innerHTML = '';
                }
            });
        },

        startNewItem: function() {
            // make sure our variables and form have been reset
            me.resetForm();

            // hide the delete button
            els.btnItemDelete.classList.add( 'hidden' );

            // hide options form, show entry form
            els.formOptions.classList.add( 'hidden' );
            els.formProject.classList.remove( 'hidden' );

            // focus on title text box
            els.formProject.querySelectorAll( 'input' )[0].focus();
        },

        saveItem: function() {
            var isError = false,
                reqFields = els.formProject.querySelectorAll( '.req' ),
                fields = els.dataFields,
                i = 0,
                len = reqFields.length,
                field, key, value,
                params = {};
            
            // validate the form
            for ( ; i < len; i++ ) {
                // get the current field and trim it's value
                field = reqFields[i];
                
                if ( field.tagName.toString().toLowerCase() === 'textarea' ) {
                    value = $.trim( CKEDITOR.instances[field.id].getData() );
                }
                else {
                    value = $.trim( field.value );
                }

                // if nothing has been entered, give the field class invalid
                // and set isError to true
                if ( value === '' ) {
                    field.classList.add( 'invalid' );
                    isError = true;
                }

                // if the field does have content, make sure it does
                // not have class invalid
                else {
                    field.classList.remove( 'invalid' );
                }
            }
            
            // if there is an error, focus on the first invalid field
            // and break the function from continuing
            if ( isError ) {
                els.formProject.querySelectorAll( '.invalid' )[0].focus();
                return;
            }

            els.status.innerHTML = '<p class="info">Saving project, please wait...</p>';
            
            // collect the data
            for ( i = 0, len = fields.length; i < len; i++ ) {
                field = fields[i];
                key = field.getAttribute( 'data-field' );
                
                if ( field.tagName.toString().toLowerCase() === 'textarea' ) {
                    value = $.trim( CKEDITOR.instances[field.id].getData() );
                }
                else {
                    value = $.trim( field.value );
                }
                
                params[key] = value;
            }

            params['projectId'] = s.projectId;
            params['primaryPic'] = s.primaryPic;
            params['logo'] = s.logo;
            params['isHTTPS'] = els.cbIsHttps.checked;
            params['isActive'] = els.cbIsActive.checked;
                        
            // save the entry
            SI.ajax( s.wsUrl + 'saveProject', params, function( data ) {
                if ( data && data.d ) {
                    var rsp = JSON.parse( data.d );
            
                    if ( rsp && rsp.status && rsp.status === 'success' ) {
                        els.status.innerHTML = '<p class="success">The project has been saved successfully.</p>';
                        s.projectId = rsp.projectId;
                        me.loadItems();
            
                        // make sure the delete and preview buttons are visible
                        els.btnItemDelete.classList.remove( 'hidden' );
            
                        setTimeout(function() {
                            els.status.innerHTML = '';
                        }, 1000 );
                    }
                    else {
                        els.status.innerHTML = '<p class="error">Unable to save the project at this time.' + ( rsp.msg ? rsp.msg : '' ) + '</p>';
                    }
                }
            });
        },

        cancel: function() {
            if ( confirm( 'Are you sure you want to cancel your work?' ) ) {
                // hide the entry form, show the options form
                els.formProject.classList.add( 'hidden' );
                els.formOptions.classList.remove( 'hidden' );

                // set s.newsId = -1
                s.projectId = -1;
                me.loadItems();

                // deselect any items in ddl-items
                els.ddlItems.value = '-1';

                window.scrollTo( 0, 0 );
            }
        },

        deleteItem: function() {
            if ( confirm( 'Are you sure you want to delete this project?' ) ) {
                els.status.innerHTML = '<p class="info">Deleting project, please wait...</p>';

                SI.ajax( s.wsUrl + 'deleteProject', { projectId: s.projectId }, function( data ) {
                    if ( data && data.d ) {
                        var rsp = JSON.parse( data.d );

                        if ( rsp && rsp.status && rsp.status === 'success' ) {
                            els.status.innerHTML = '<p class="success">The project has been deleted successfully.</p>';
                            
                            // set s.projectId = -1
                            s.projectId = -1;

                            me.loadItems();

                            setTimeout(function() {
                                me.resetForm();
                
                                // hide the entry form, show the options form
                                els.formProject.classList.add( 'hidden' );
                                els.formOptions.classList.remove( 'hidden' );

                                els.status.innerHTML = '';
                            }, 1000 );
                        }
                        else {
                            els.status.innerHTML = '<p class="error">Unable to delete the project at this time.' + ( rsp.msg ? rsp.msg : '' ) + '</p>';
                        }
                    }
                });
            }
        },

        resetForm: function() {
            s.projectId = -1;
            s.primaryPic = '';
            s.logo = '';

            var inputs = els.formProject.querySelectorAll( 'input[type=text], input[type=url]' ),
                i = 0,
                len = inputs.length;

            for ( ; i < len; i++ ) {
                inputs[i].value = '';
            }

            els.cbIsHttps.checked = false;
            els.cbIsActive.checked = false;

            window.scrollTo( 0, 0 );
        },

        loadItems: function() {
            SI.ajax( s.wsUrl + 'loadPortfolioItemsAsHtml', {
                projectId: s.projectId,
                isActive: false,
                displayMode: s.wsDisplaymode
            }, function( data ) {
                if ( data && data.d ) {
                    els.ddlItems.innerHTML = data.d;
                }
            });
        }
    };
    
    SI.admin.news.init();

}( document, jQuery ) );