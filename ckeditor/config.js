/**
 * @license Copyright (c) 2003-2013, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.html or http://ckeditor.com/license
 */

CKEDITOR.editorConfig = function( config ) {
	// Define changes to default configuration here.
	// For the complete reference:
	// http://docs.ckeditor.com/#!/api/CKEDITOR.config

	// The toolbar groups arrangement, optimized for two toolbar rows.
	//config.toolbarGroups = [
	//	{ name: 'clipboard',   groups: [ 'clipboard', 'undo' ] },
	//	{ name: 'editing',     groups: [ 'find', 'selection', 'spellchecker' ] },
	//	{ name: 'links' },
	//	{ name: 'insert' },
	//	{ name: 'forms' },
	//	{ name: 'tools' },
	//	{ name: 'document',	   groups: [ 'mode', 'document', 'doctools' ] },
	//	{ name: 'others' },
	//	'/',
	//	{ name: 'basicstyles', groups: [ 'basicstyles', 'cleanup' ] },
	//	{ name: 'paragraph',   groups: [ 'list', 'indent', 'blocks', 'align', 'bidi' ] },
	//	{ name: 'styles' },
	//	{ name: 'colors' },
	//	{ name: 'about' }
	//];

    config.toolbar_Simple = [
        ['Paste', 'PasteText', 'PasteFromWord'],
        ['Scayt'],
        ['Bold', 'Italic', 'Underline', '-', 'NumberedList', 'BulletedList', '-', 'JustifyLeft', 'JustifyCenter', 'JustifyRight', 'JustifyBlock', '-', 'RemoveFormat'],
        ['Link', 'Unlink', 'Image'],
        ['Styles'],
        ['Maximize'],
        ['Source']
    ];

	// Remove some buttons, provided by the standard plugins, which we don't
	// need to have in the Standard(s) toolbar.
	config.removeButtons = 'Underline,Subscript,Superscript';

	// Se the most common block elements.
	config.format_tags = 'p;h1;h2;h3;pre';

	// Make dialogs simpler.
	//config.removeDialogTabs = 'image:advanced;link:advanced';

    // Justify classes
    config.justifyClasses = [
        'text-left', 'text-center', 'text-right', 'text-justify'
    ];

    config.stylesSet = [
       { name: 'Subheading', element: 'h3', attributes: { 'class': 'subtitle' } },
       { name: 'Blockquote', element: 'p', attributes: { 'class': 'quote' } },
       { name: 'note', element: 'p', attributes: { 'class': 'note' } },
       { name: 'Image Wrapper', element: 'div', attributes: { 'class': 'news-body-img' } },
       { name: 'Image Caption', element: 'p', attributes: { 'class': 'caption' } },
       { name: 'Arrow List', element: 'ul', attributes: { 'class': 'arrow' } },
       { name: 'Row', element: 'div', attributes: { 'class': 'row' } },
       { name: 'Column Half Width', element: 'div', attributes: { 'class': 'span-6' } },
       { name: 'Column Omega', element: 'div', attributes: { 'class': 'omega' } },
       { name: 'Link No Border', element: 'a', attributes: { 'class': 'no-border' } },
       { name: 'Keep P Margin', element: 'p', attributes: { 'class': 'margin-keep' }},
       { name: 'Code Block', element: 'p', attributes: { 'class': 'code' }}
    ];
};

CKEDITOR.on( 'instanceReady', function( ev ) {
    var tags = ['p', 'ol', 'ul', 'li', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'div'];

    for (var key in tags) {
        ev.editor.dataProcessor.writer.setRules(tags[key],
            {
                indent : false,
                breakBeforeOpen : true,
                breakAfterOpen : false,
                breakBeforeClose : false,
                breakAfterClose : true
            });
    }
});