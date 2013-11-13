(function( doc, $ ) {

    window.SI = window.SI || {};

    var me, s, els;

    SI.admin = SI.admin || {};

    SI.admin.news = {
    
        settings: {
            newsId: -1,
            datePosted: '',
            primaryPic: '',
            thumbPic: '',
            wsUrl: '/webservices/wsNews.asmx/',
            wsDisplaymode: 3,

            editorOptions: {
                allowedContent: true,
                toolbar: 'Simple'
            }
        },

        elements: {
            // form options
            formOptions: doc.getElementById( 'form-option' ),
            ddlEntries: doc.getElementById( 'ddl-entries' ),
            btnNew: doc.getElementById( 'btn-new' ),

            // form news
            formNews: doc.getElementById( 'form-news' ),
            dataFields: doc.querySelectorAll( '[data-field]' ),
            ddlTags: doc.getElementById( 'ddl-tags' ),
            cbIsActive: doc.getElementById( 'cb-is-active' ),
            btnEntrySave: doc.getElementById( 'btn-entry-save' ),
            btnEntryCancel: doc.getElementById( 'btn-entry-cancel' ),
            btnEntryDelete: doc.getElementById( 'btn-entry-delete' ),
            btnEntryPreview: doc.getElementById( 'btn-entry-preview' ),

            // status
            status: doc.getElementById( 'status' )
        },

        init: function() {
            me = this;
            s = me.settings;
            els = me.elements;
            me.bindEvents();

            // add the ckeditor
            CKEDITOR.replace( 'ta-body', s.editorOptions );
            CKEDITOR.replace( 'ta-summary', s.editorOptions );

            // init select2
            $( els.ddlTags ).select2({
                placeholder: 'Select Tags'
            });
        },

        bindEvents: function() {
            els.ddlEntries.addEventListener( 'change', me.loadEntryDetails, false );
            els.btnNew.addEventListener( 'click', me.startNewEntry, false );
            els.btnEntrySave.addEventListener( 'click', me.saveEntry, false );
            els.btnEntryCancel.addEventListener( 'click', me.cancel, false );
            els.btnEntryDelete.addEventListener( 'click', me.deleteEntry, false );
            els.btnEntryPreview.addEventListener( 'click', me.previewEntry, false );
        },

        loadEntryDetails: function() {
            els.status.innerHTML = '<p class="info">Loading entry details, please wait...</p>';

            // get the newsId of the selected entry
            s.newsId = parseInt( els.ddlEntries.value, 10 );

            function loadEntryData() {
                return SI.ajax( s.wsUrl + 'loadNewsItemsAsJson', {
                    newsId: s.newsId,
                    search: '',
                    webUrl: '',
                    tagUrl: '',
                    isActive: false,
                    start: 1,
                    max: -1
                });
            }

            function loadEntryTags() {
                return SI.ajax( s.wsUrl + 'loadTagsAsJson', {
                    tagId: -1,
                    newsId: s.newsId
                });
            }
            
            // load the entry data
            $.when( loadEntryData(), loadEntryTags() ).then( function( entry, tags ) {
            
                if ( entry && tags ) {
                    var fields = els.dataFields,
                        i = 0,
                        len = fields.length, 
                        tagIds = [],
                        field, key, value;

                    entry = entry[0].d[0].cols;

                    // loop through the fields on the form and get the entry data,
                    // populate the fields with the respective data
                    for ( ; i < len; i++ ) {
                        field = fields[i];
                        key = field.getAttribute( 'data-field' );
                        value = entry[key];

                        if ( field.tagName.toString().toLowerCase() === 'textarea' ) {
                            CKEDITOR.instances[field.id].setData( value );
                        }
                        else {
                            field.value = value;
                        }
                    }

                    // set isActive
                    if ( entry.isActive ) {
                        els.cbIsActive.checked = true;
                    }
                    else {
                        els.cbIsActive.checked = false;
                    }

                    // set the pictures
                    s.primaryPic = entry.primaryPic;
                    s.thumbPic = entry.thumbPic;

                    // set the tags
                    tags = tags[0].d;
                    for ( i = 0, len = tags.length; i < len; i++ ) {
                        tagIds.push( tags[i].cols.tagId );
                    }
                    
                    $( els.ddlTags ).select2( 'val', tagIds );

                    // set the datePosted
                    s.datePosted = moment( entry.datePosted ).format( 'YYYY-MM-DD HH:mm:ss' );
                    
                    // set the data for preview button
                    els.btnEntryPreview.setAttribute( 'data-url', entry.webUrl );

                    // make sure the delete and preview buttons are visible
                    els.btnEntryDelete.classList.remove( 'hidden' );
                    els.btnEntryPreview.classList.remove( 'hidden' );

                    // hide options form, show entry form
                    els.formOptions.classList.add( 'hidden' );
                    els.formNews.classList.remove( 'hidden' );

                    // clear out the status
                    els.status.innerHTML = '';
                } 
            });
        },

        startNewEntry: function() {
            // make sure our variables and form have been reset
            me.resetForm();

            // hide the buttons
            els.btnEntryDelete.classList.add( 'hidden' );
            els.btnEntryPreview.classList.add( 'hidden' );

            // hide options form, show entry form
            els.formOptions.classList.add( 'hidden' );
            els.formNews.classList.remove( 'hidden' );

            // focus on title text box
            els.formNews.querySelectorAll( 'input' )[0].focus();
        },

        saveEntry: function() {
            var isError = false,
                reqFields = els.formNews.querySelectorAll( '.req' ),
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
                els.formNews.querySelectorAll( '.invalid' )[0].focus();
                return;
            }

            els.status.innerHTML = '<p class="info">Saving entry, please wait...</p>';
            
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

            params['newsId'] = s.newsId;
            params['datePosted'] = s.datePosted;
            params['primaryPic'] = s.primaryPic;
            params['thumbPic'] = s.thumbPic;
            params['isActive'] = els.cbIsActive.checked;

            // get the selected tags
            params['tags'] = $( els.ddlTags ).val();
            
            // save the entry
            SI.ajax( s.wsUrl + 'saveEntry', params, function( data ) {
                if ( data && data.d ) {
                    var rsp = JSON.parse( data.d );
            
                    if ( rsp && rsp.status && rsp.status === 'success' ) {
                        els.status.innerHTML = '<p class="success">The entry has been saved successfully.</p>';
                        s.newsId = rsp.newsId;
                        me.loadEntries();
            
                        // make sure the delete and preview buttons are visible
                        els.btnEntryDelete.classList.remove( 'hidden' );
                        els.btnEntryPreview.classList.remove( 'hidden' );
            
                        setTimeout(function() {
                            els.status.innerHTML = '';
                        }, 1000 );
                    }
                    else {
                        els.status.innerHTML = '<p class="error">Unable to save entry at this time.' + ( rsp.msg ? rsp.msg : '' ) + '</p>';
                    }
                }
            });
        },

        cancel: function() {
            if ( confirm( 'Are you sure you want to leave the entry form?' ) ) {
                // hide the entry form, show the options form
                els.formNews.classList.add( 'hidden' );
                els.formOptions.classList.remove( 'hidden' );

                // set s.newsId = -1
                s.newsId = -1;
                me.loadEntries();

                // deselect any items in ddl-entries
                els.ddlEntries.value = '-1';

                window.scrollTo( 0, 0 );
            }
        },

        deleteEntry: function() {
            if ( confirm( 'Are you sure you want to delete this entry?' ) ) {
                els.status.innerHTML = '<p class="info">Deleting entry, please wait...</p>';

                SI.ajax( s.wsUrl + 'deleteEntry', { newsId: s.newsId }, function( data ) {
                    if ( data && data.d ) {
                        var rsp = JSON.parse( data.d );

                        if ( rsp && rsp.status && rsp.status === 'success' ) {
                            els.status.innerHTML = '<p class="success">The entry has been deleted successfully.</p>';
                            
                            // set s.newsId = -1
                            s.newsId = -1;

                            me.loadEntries();

                            setTimeout(function() {
                                me.resetForm();
                
                                // hide the entry form, show the options form
                                els.formNews.classList.add( 'hidden' );
                                els.formOptions.classList.remove( 'hidden' );

                                els.status.innerHTML = '';
                            }, 1000 );
                        }
                        else {
                            els.status.innerHTML = '<p class="error">Unable to delete the entry at this time.' + ( rsp.msg ? rsp.msg : '' ) + '</p>';
                        }
                    }
                });
            }
        },

        previewEntry: function() {
            var url = '/news/' + this.getAttribute( 'data-url' );
            window.open( url, '_blank' );
        },

        resetForm: function() {
            s.newsId = -1;
            s.datePosted = '';
            s.primaryPic = '';
            s.thumbPic = '';

            var inputs = els.formNews.querySelectorAll( 'input[type=text], input[type=url]' ),
                i = 0,
                len = inputs.length;

            for ( ; i < len; i++ ) {
                inputs[i].value = '';
            }

            CKEDITOR.instances['ta-body'].setData( '' );
            CKEDITOR.instances['ta-summary'].setData( '' );

            $( els.ddlTags ).select2( 'val', [] );

            els.cbIsActive.checked = false;

            window.scrollTo( 0, 0 );
        },

        loadEntries: function() {
            SI.ajax( s.wsUrl + 'loadNewsItemsAsHtml', {
                newsId: -1,
                search: '',
                webUrl: '',
                tagUrl: '',
                isActive: false,
                start: 1,
                max: -1,
                displayMode: s.wsDisplaymode
            }, function( data ) {
                if ( data && data.d ) {
                    els.ddlEntries.innerHTML = data.d;
                }
            });
        }
    };
    
    SI.admin.news.init();

}( document, jQuery ) );