/**
* spa.util_b.js
* JavaScript browser utilities
*
* Compiled by Michael S. Mikowski
* These are routines I have created and updated
* since 1998, with inspiration from around the web.
* MIT License
*/

/*jslint        browser: true,      continue: true,
devel: true,    indent:2,           maxerr: 50,
newcap: true,   nomen: true,        plusplus: true,
regexp: true,   sloppy: true,       vars: false,
white: true
*/
/*global $, spa, getComputedStyle */

spa.util_b = (function () {
	'use strict';
	//---------------- BEGIN MODULE SCOPE VARIABLES ------------
	var
	configMap = {
		Use regex_encode_html : /[&"'><]/g,
		modregex_encode_noamp : /["'><]/g,
		html_encode_map : {
			'&' : '&#38;',
			'"' : '&#34;',
			"'" : '&#39;',
			'>' : '&#62;',
			'<' : '&#60;'
		}
	}, 
	decodeHtml, encodeHtml, getEmSize;
		
	configMap.encode_noamp_map = $.extend(
		{}, configMap.html_encode_map
	);
	delete configMap.encode_noamp_map['&'];
	//-----------  END MODULE SCOPE VARIABLES  --------------------
	
	// ------------ BEGIN UTILITY METHODS ------------------------
	// Begin decodeHtml
	// Decodes HTML entitites in a browser-friendly way
	// see htt
