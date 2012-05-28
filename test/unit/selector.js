/**
 * This test page is for selector tests that require jQuery in order to do the selection
 */

module("selector - jQuery only", { teardown: moduleTeardown });

test("element - jQuery only", function() {
	expect( 5 );

	deepEqual( jQuery("p", document.getElementsByTagName("div")).get(), q("firstp","ap","sndp","en","sap","first"), "Finding elements with a context." );
	deepEqual( jQuery("p", "div").get(), q("firstp","ap","sndp","en","sap","first"), "Finding elements with a context." );
	deepEqual( jQuery("p", jQuery("div")).get(), q("firstp","ap","sndp","en","sap","first"), "Finding elements with a context." );
	deepEqual( jQuery("div").find("p").get(), q("firstp","ap","sndp","en","sap","first"), "Finding elements with a context." );

	//#7533
	equal( jQuery("<div id=\"A'B~C.D[E]\"><p>foo</p></div>").find("p").length, 1, "Find where context root is a node and has an ID with CSS3 meta characters" );
});

test("class - jQuery only", function() {
	expect( 4 );

	deepEqual( jQuery(".blog", document.getElementsByTagName("p")).get(), q("mark", "simon"), "Finding elements with a context." );
	deepEqual( jQuery(".blog", "p").get(), q("mark", "simon"), "Finding elements with a context." );
	deepEqual( jQuery(".blog", jQuery("p")).get(), q("mark", "simon"), "Finding elements with a context." );
	deepEqual( jQuery("p").find(".blog").get(), q("mark", "simon"), "Finding elements with a context." );
});

test("pseudo - visibility", function() {
	expect(9);

	t( "Is Visible", "div:visible:not(#qunit-testrunner-toolbar):lt(2)", ["nothiddendiv", "nothiddendivchild"] );
	t( "Is Not Hidden", "#qunit-fixture:hidden", [] );
	t( "Is Hidden", "#form input:hidden", ["hidden1","hidden2"] );

	var $div = jQuery('<div/>').appendTo("body");
	$div.css({ fontSize: 0, lineHeight: 0 });// IE also needs to set font-size and line-height to 0
	$div.width(1).height(0);
	t( "Is Visible", '#nothiddendivchild:visible', ['nothiddendivchild'] );
	t( "Is Not Visible", '#nothiddendivchild:hidden', [] );
	$div.width(0).height(1);
	t( "Is Visible", '#nothiddendivchild:visible', ['nothiddendivchild'] );
	t( "Is Not Visible", '#nothiddendivchild:hidden', [] );
	$div.width(1).height(1);
	t( "Is Visible", '#nothiddendivchild:visible', ['nothiddendivchild'] );
	t( "Is Not Visible", '#nothiddendivchild:hidden', [] );
	$div.remove();
});

test("disconnected nodes", function() {
	expect(4);
	var $opt = jQuery('<option></option>').attr("value", "whipit").appendTo("#qunit-fixture").detach();
	equal( $opt.val(), "whipit", "option value" );
	equal( $opt.is(":selected"), false, "unselected option" );
	$opt.attr("selected", true);
	equal( $opt.is(":selected"), true, "selected option" );

	var $div = jQuery( '<div/>' );
	equal( $div.is("div"), true, "Make sure .is('nodeName') works on disconnect nodes." );
});

testIframe("selector/html5_selector", "attributes - jQuery.attr", function( jQuery, window, document ) {
	expect(34);

	/**
	 * Returns an array of elements with the given IDs, eg.
	 */
	function q() {
		var r = [],
			i = 0;

		for ( ; i < arguments.length; i++ ) {
			r.push( document.getElementById( arguments[i] ) );
		}
		return r;
	}

	/**
	 * Asserts that a select matches the given IDs
	 * @example t("Check for something", "//[a]", ["foo", "baar"]);
	 * @param {String} a - Assertion name
	 * @param {String} b - Sizzle selector
	 * @param {String} c - Array of ids to construct what is expected
	 */
	function t( a, b, c ) {
		var f = jQuery(b).get(),
			s = "",
			i = 0;

		for ( ; i < f.length; i++ ) {
			s += (s && ",") + '"' + f[i].id + '"';
		}

		deepEqual(f, q.apply( q, c ), a + " (" + b + ")");
	}

	// ====== All known boolean attributes, including html5 booleans ======
	// autobuffer, autofocus, autoplay, async, checked,
	// compact, controls, declare, defer, disabled,
	// formnovalidate, hidden, indeterminate (property only),
	// ismap, itemscope, loop, multiple, muted, nohref, noresize,
	// noshade, nowrap, novalidate, open, pubdate, readonly, required,
	// reversed, scoped, seamless, selected, truespeed, visible (skipping visible attribute, which is on a barprop object)

	t( "Attribute Exists", "[autobuffer]",     ["video1"]);
	t( "Attribute Exists", "[autofocus]",      ["text1"]);
	t( "Attribute Exists", "[autoplay]",       ["video1"]);
	t( "Attribute Exists", "[async]",          ["script1"]);
	t( "Attribute Exists", "[checked]",        ["check1"]);
	t( "Attribute Exists", "[compact]",        ["dl"]);
	t( "Attribute Exists", "[controls]",       ["video1"]);
	t( "Attribute Exists", "[declare]",        ["object1"]);
	t( "Attribute Exists", "[defer]",          ["script1"]);
	t( "Attribute Exists", "[disabled]",       ["check1"]);
	t( "Attribute Exists", "[formnovalidate]", ["form1"]);
	t( "Attribute Exists", "[hidden]",         ["div1"]);
	t( "Attribute Exists", "[indeterminate]",  []);
	t( "Attribute Exists", "[ismap]",          ["img1"]);
	t( "Attribute Exists", "[itemscope]",      ["div1"]);
	// t( "Attribute Exists", "[loop]",           ["video1"]); // IE 6/7 cannot differentiate here. loop is also used on img, input, and marquee tags as well as video/audio. getAttributeNode unfortunately only retrieves the property value.
	t( "Attribute Exists", "[multiple]",       ["select1"]);
	t( "Attribute Exists", "[muted]",          ["audio1"]);
	// t( "Attribute Exists", "[nohref]",         ["area1"]); // IE 6/7 keep this set to false regardless of presence. The attribute node is not retrievable.
	t( "Attribute Exists", "[noresize]",       ["textarea1"]);
	t( "Attribute Exists", "[noshade]",        ["hr1"]);
	t( "Attribute Exists", "[nowrap]",         ["td1", "div1"]);
	t( "Attribute Exists", "[novalidate]",     ["form1"]);
	t( "Attribute Exists", "[open]",           ["details1"]);
	t( "Attribute Exists", "[pubdate]",        ["article1"]);
	t( "Attribute Exists", "[readonly]",       ["text1"]);
	t( "Attribute Exists", "[required]",       ["text1"]);
	t( "Attribute Exists", "[reversed]",       ["ol1"]);
	t( "Attribute Exists", "[scoped]",         ["style1"]);
	t( "Attribute Exists", "[seamless]",       ["iframe1"]);
	// t( "Attribute Exists", "[selected]",       ["option1"]); // IE8's querySelectorAll fails here. Redirecting to oldSizzle would work, but it would require an additional support test as well as a check for the selected attribute within the qsa logic
	t( "Attribute Exists", "[truespeed]",      ["marquee1"]);

	// Enumerated attributes (these are not boolean content attributes)
	jQuery.each([ "draggable", "contenteditable", "aria-disabled" ], function( i, val ) {
		t( "Enumerated attribute", "[" + val + "]", ["div1"]);
	});
	t( "Enumerated attribute", "[spellcheck]", ["span1"]);

	// t( "tabindex selector does not retrieve all elements in IE6/7(#8473)", "form, [tabindex]", ["form1", "text1"]); // Uncomment this when the tabindex attrHook is deprecated

	t( "Improperly named form elements do not interfere with form selections (#9570)", "form[name='formName']", ["form1"]);
});

testIframe("selector/sizzle_cache", "Sizzle cache collides with multiple Sizzles on a page", function( jQuery, window, document ) {
	var $cached = window.$cached;

	expect(3);
	deepEqual( $cached('.test a').get(), [ document.getElementById('collision') ], "Select collision anchor with first sizzle" );
	equal( jQuery('.evil a').length, 0, "Select nothing with second sizzle" );
	equal( jQuery('.evil a').length, 0, "Select nothing again with second sizzle" );
});
