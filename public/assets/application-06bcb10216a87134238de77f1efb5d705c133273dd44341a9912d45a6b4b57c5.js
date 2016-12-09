/*!
 * jQuery JavaScript Library v1.12.4
 * http://jquery.com/
 *
 * Includes Sizzle.js
 * http://sizzlejs.com/
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2016-05-20T17:17Z
 */


(function( global, factory ) {

	if ( typeof module === "object" && typeof module.exports === "object" ) {
		// For CommonJS and CommonJS-like environments where a proper `window`
		// is present, execute the factory and get jQuery.
		// For environments that do not have a `window` with a `document`
		// (such as Node.js), expose a factory as module.exports.
		// This accentuates the need for the creation of a real `window`.
		// e.g. var jQuery = require("jquery")(window);
		// See ticket #14549 for more info.
		module.exports = global.document ?
			factory( global, true ) :
			function( w ) {
				if ( !w.document ) {
					throw new Error( "jQuery requires a window with a document" );
				}
				return factory( w );
			};
	} else {
		factory( global );
	}

// Pass this if window is not defined yet
}(typeof window !== "undefined" ? window : this, function( window, noGlobal ) {

// Support: Firefox 18+
// Can't be in strict mode, several libs including ASP.NET trace
// the stack via arguments.caller.callee and Firefox dies if
// you try to trace through "use strict" call chains. (#13335)
//"use strict";
var deletedIds = [];

var document = window.document;

var slice = deletedIds.slice;

var concat = deletedIds.concat;

var push = deletedIds.push;

var indexOf = deletedIds.indexOf;

var class2type = {};

var toString = class2type.toString;

var hasOwn = class2type.hasOwnProperty;

var support = {};



var
	version = "1.12.4",

	// Define a local copy of jQuery
	jQuery = function( selector, context ) {

		// The jQuery object is actually just the init constructor 'enhanced'
		// Need init if jQuery is called (just allow error to be thrown if not included)
		return new jQuery.fn.init( selector, context );
	},

	// Support: Android<4.1, IE<9
	// Make sure we trim BOM and NBSP
	rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,

	// Matches dashed string for camelizing
	rmsPrefix = /^-ms-/,
	rdashAlpha = /-([\da-z])/gi,

	// Used by jQuery.camelCase as callback to replace()
	fcamelCase = function( all, letter ) {
		return letter.toUpperCase();
	};

jQuery.fn = jQuery.prototype = {

	// The current version of jQuery being used
	jquery: version,

	constructor: jQuery,

	// Start with an empty selector
	selector: "",

	// The default length of a jQuery object is 0
	length: 0,

	toArray: function() {
		return slice.call( this );
	},

	// Get the Nth element in the matched element set OR
	// Get the whole matched element set as a clean array
	get: function( num ) {
		return num != null ?

			// Return just the one element from the set
			( num < 0 ? this[ num + this.length ] : this[ num ] ) :

			// Return all the elements in a clean array
			slice.call( this );
	},

	// Take an array of elements and push it onto the stack
	// (returning the new matched element set)
	pushStack: function( elems ) {

		// Build a new jQuery matched element set
		var ret = jQuery.merge( this.constructor(), elems );

		// Add the old object onto the stack (as a reference)
		ret.prevObject = this;
		ret.context = this.context;

		// Return the newly-formed element set
		return ret;
	},

	// Execute a callback for every element in the matched set.
	each: function( callback ) {
		return jQuery.each( this, callback );
	},

	map: function( callback ) {
		return this.pushStack( jQuery.map( this, function( elem, i ) {
			return callback.call( elem, i, elem );
		} ) );
	},

	slice: function() {
		return this.pushStack( slice.apply( this, arguments ) );
	},

	first: function() {
		return this.eq( 0 );
	},

	last: function() {
		return this.eq( -1 );
	},

	eq: function( i ) {
		var len = this.length,
			j = +i + ( i < 0 ? len : 0 );
		return this.pushStack( j >= 0 && j < len ? [ this[ j ] ] : [] );
	},

	end: function() {
		return this.prevObject || this.constructor();
	},

	// For internal use only.
	// Behaves like an Array's method, not like a jQuery method.
	push: push,
	sort: deletedIds.sort,
	splice: deletedIds.splice
};

jQuery.extend = jQuery.fn.extend = function() {
	var src, copyIsArray, copy, name, options, clone,
		target = arguments[ 0 ] || {},
		i = 1,
		length = arguments.length,
		deep = false;

	// Handle a deep copy situation
	if ( typeof target === "boolean" ) {
		deep = target;

		// skip the boolean and the target
		target = arguments[ i ] || {};
		i++;
	}

	// Handle case when target is a string or something (possible in deep copy)
	if ( typeof target !== "object" && !jQuery.isFunction( target ) ) {
		target = {};
	}

	// extend jQuery itself if only one argument is passed
	if ( i === length ) {
		target = this;
		i--;
	}

	for ( ; i < length; i++ ) {

		// Only deal with non-null/undefined values
		if ( ( options = arguments[ i ] ) != null ) {

			// Extend the base object
			for ( name in options ) {
				src = target[ name ];
				copy = options[ name ];

				// Prevent never-ending loop
				if ( target === copy ) {
					continue;
				}

				// Recurse if we're merging plain objects or arrays
				if ( deep && copy && ( jQuery.isPlainObject( copy ) ||
					( copyIsArray = jQuery.isArray( copy ) ) ) ) {

					if ( copyIsArray ) {
						copyIsArray = false;
						clone = src && jQuery.isArray( src ) ? src : [];

					} else {
						clone = src && jQuery.isPlainObject( src ) ? src : {};
					}

					// Never move original objects, clone them
					target[ name ] = jQuery.extend( deep, clone, copy );

				// Don't bring in undefined values
				} else if ( copy !== undefined ) {
					target[ name ] = copy;
				}
			}
		}
	}

	// Return the modified object
	return target;
};

jQuery.extend( {

	// Unique for each copy of jQuery on the page
	expando: "jQuery" + ( version + Math.random() ).replace( /\D/g, "" ),

	// Assume jQuery is ready without the ready module
	isReady: true,

	error: function( msg ) {
		throw new Error( msg );
	},

	noop: function() {},

	// See test/unit/core.js for details concerning isFunction.
	// Since version 1.3, DOM methods and functions like alert
	// aren't supported. They return false on IE (#2968).
	isFunction: function( obj ) {
		return jQuery.type( obj ) === "function";
	},

	isArray: Array.isArray || function( obj ) {
		return jQuery.type( obj ) === "array";
	},

	isWindow: function( obj ) {
		/* jshint eqeqeq: false */
		return obj != null && obj == obj.window;
	},

	isNumeric: function( obj ) {

		// parseFloat NaNs numeric-cast false positives (null|true|false|"")
		// ...but misinterprets leading-number strings, particularly hex literals ("0x...")
		// subtraction forces infinities to NaN
		// adding 1 corrects loss of precision from parseFloat (#15100)
		var realStringObj = obj && obj.toString();
		return !jQuery.isArray( obj ) && ( realStringObj - parseFloat( realStringObj ) + 1 ) >= 0;
	},

	isEmptyObject: function( obj ) {
		var name;
		for ( name in obj ) {
			return false;
		}
		return true;
	},

	isPlainObject: function( obj ) {
		var key;

		// Must be an Object.
		// Because of IE, we also have to check the presence of the constructor property.
		// Make sure that DOM nodes and window objects don't pass through, as well
		if ( !obj || jQuery.type( obj ) !== "object" || obj.nodeType || jQuery.isWindow( obj ) ) {
			return false;
		}

		try {

			// Not own constructor property must be Object
			if ( obj.constructor &&
				!hasOwn.call( obj, "constructor" ) &&
				!hasOwn.call( obj.constructor.prototype, "isPrototypeOf" ) ) {
				return false;
			}
		} catch ( e ) {

			// IE8,9 Will throw exceptions on certain host objects #9897
			return false;
		}

		// Support: IE<9
		// Handle iteration over inherited properties before own properties.
		if ( !support.ownFirst ) {
			for ( key in obj ) {
				return hasOwn.call( obj, key );
			}
		}

		// Own properties are enumerated firstly, so to speed up,
		// if last one is own, then all properties are own.
		for ( key in obj ) {}

		return key === undefined || hasOwn.call( obj, key );
	},

	type: function( obj ) {
		if ( obj == null ) {
			return obj + "";
		}
		return typeof obj === "object" || typeof obj === "function" ?
			class2type[ toString.call( obj ) ] || "object" :
			typeof obj;
	},

	// Workarounds based on findings by Jim Driscoll
	// http://weblogs.java.net/blog/driscoll/archive/2009/09/08/eval-javascript-global-context
	globalEval: function( data ) {
		if ( data && jQuery.trim( data ) ) {

			// We use execScript on Internet Explorer
			// We use an anonymous function so that context is window
			// rather than jQuery in Firefox
			( window.execScript || function( data ) {
				window[ "eval" ].call( window, data ); // jscs:ignore requireDotNotation
			} )( data );
		}
	},

	// Convert dashed to camelCase; used by the css and data modules
	// Microsoft forgot to hump their vendor prefix (#9572)
	camelCase: function( string ) {
		return string.replace( rmsPrefix, "ms-" ).replace( rdashAlpha, fcamelCase );
	},

	nodeName: function( elem, name ) {
		return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();
	},

	each: function( obj, callback ) {
		var length, i = 0;

		if ( isArrayLike( obj ) ) {
			length = obj.length;
			for ( ; i < length; i++ ) {
				if ( callback.call( obj[ i ], i, obj[ i ] ) === false ) {
					break;
				}
			}
		} else {
			for ( i in obj ) {
				if ( callback.call( obj[ i ], i, obj[ i ] ) === false ) {
					break;
				}
			}
		}

		return obj;
	},

	// Support: Android<4.1, IE<9
	trim: function( text ) {
		return text == null ?
			"" :
			( text + "" ).replace( rtrim, "" );
	},

	// results is for internal usage only
	makeArray: function( arr, results ) {
		var ret = results || [];

		if ( arr != null ) {
			if ( isArrayLike( Object( arr ) ) ) {
				jQuery.merge( ret,
					typeof arr === "string" ?
					[ arr ] : arr
				);
			} else {
				push.call( ret, arr );
			}
		}

		return ret;
	},

	inArray: function( elem, arr, i ) {
		var len;

		if ( arr ) {
			if ( indexOf ) {
				return indexOf.call( arr, elem, i );
			}

			len = arr.length;
			i = i ? i < 0 ? Math.max( 0, len + i ) : i : 0;

			for ( ; i < len; i++ ) {

				// Skip accessing in sparse arrays
				if ( i in arr && arr[ i ] === elem ) {
					return i;
				}
			}
		}

		return -1;
	},

	merge: function( first, second ) {
		var len = +second.length,
			j = 0,
			i = first.length;

		while ( j < len ) {
			first[ i++ ] = second[ j++ ];
		}

		// Support: IE<9
		// Workaround casting of .length to NaN on otherwise arraylike objects (e.g., NodeLists)
		if ( len !== len ) {
			while ( second[ j ] !== undefined ) {
				first[ i++ ] = second[ j++ ];
			}
		}

		first.length = i;

		return first;
	},

	grep: function( elems, callback, invert ) {
		var callbackInverse,
			matches = [],
			i = 0,
			length = elems.length,
			callbackExpect = !invert;

		// Go through the array, only saving the items
		// that pass the validator function
		for ( ; i < length; i++ ) {
			callbackInverse = !callback( elems[ i ], i );
			if ( callbackInverse !== callbackExpect ) {
				matches.push( elems[ i ] );
			}
		}

		return matches;
	},

	// arg is for internal usage only
	map: function( elems, callback, arg ) {
		var length, value,
			i = 0,
			ret = [];

		// Go through the array, translating each of the items to their new values
		if ( isArrayLike( elems ) ) {
			length = elems.length;
			for ( ; i < length; i++ ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}

		// Go through every key on the object,
		} else {
			for ( i in elems ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}
		}

		// Flatten any nested arrays
		return concat.apply( [], ret );
	},

	// A global GUID counter for objects
	guid: 1,

	// Bind a function to a context, optionally partially applying any
	// arguments.
	proxy: function( fn, context ) {
		var args, proxy, tmp;

		if ( typeof context === "string" ) {
			tmp = fn[ context ];
			context = fn;
			fn = tmp;
		}

		// Quick check to determine if target is callable, in the spec
		// this throws a TypeError, but we will just return undefined.
		if ( !jQuery.isFunction( fn ) ) {
			return undefined;
		}

		// Simulated bind
		args = slice.call( arguments, 2 );
		proxy = function() {
			return fn.apply( context || this, args.concat( slice.call( arguments ) ) );
		};

		// Set the guid of unique handler to the same of original handler, so it can be removed
		proxy.guid = fn.guid = fn.guid || jQuery.guid++;

		return proxy;
	},

	now: function() {
		return +( new Date() );
	},

	// jQuery.support is not used in Core but other projects attach their
	// properties to it so it needs to exist.
	support: support
} );

// JSHint would error on this code due to the Symbol not being defined in ES5.
// Defining this global in .jshintrc would create a danger of using the global
// unguarded in another place, it seems safer to just disable JSHint for these
// three lines.
/* jshint ignore: start */
if ( typeof Symbol === "function" ) {
	jQuery.fn[ Symbol.iterator ] = deletedIds[ Symbol.iterator ];
}
/* jshint ignore: end */

// Populate the class2type map
jQuery.each( "Boolean Number String Function Array Date RegExp Object Error Symbol".split( " " ),
function( i, name ) {
	class2type[ "[object " + name + "]" ] = name.toLowerCase();
} );

function isArrayLike( obj ) {

	// Support: iOS 8.2 (not reproducible in simulator)
	// `in` check used to prevent JIT error (gh-2145)
	// hasOwn isn't used here due to false negatives
	// regarding Nodelist length in IE
	var length = !!obj && "length" in obj && obj.length,
		type = jQuery.type( obj );

	if ( type === "function" || jQuery.isWindow( obj ) ) {
		return false;
	}

	return type === "array" || length === 0 ||
		typeof length === "number" && length > 0 && ( length - 1 ) in obj;
}
var Sizzle =
/*!
 * Sizzle CSS Selector Engine v2.2.1
 * http://sizzlejs.com/
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2015-10-17
 */
(function( window ) {

var i,
	support,
	Expr,
	getText,
	isXML,
	tokenize,
	compile,
	select,
	outermostContext,
	sortInput,
	hasDuplicate,

	// Local document vars
	setDocument,
	document,
	docElem,
	documentIsHTML,
	rbuggyQSA,
	rbuggyMatches,
	matches,
	contains,

	// Instance-specific data
	expando = "sizzle" + 1 * new Date(),
	preferredDoc = window.document,
	dirruns = 0,
	done = 0,
	classCache = createCache(),
	tokenCache = createCache(),
	compilerCache = createCache(),
	sortOrder = function( a, b ) {
		if ( a === b ) {
			hasDuplicate = true;
		}
		return 0;
	},

	// General-purpose constants
	MAX_NEGATIVE = 1 << 31,

	// Instance methods
	hasOwn = ({}).hasOwnProperty,
	arr = [],
	pop = arr.pop,
	push_native = arr.push,
	push = arr.push,
	slice = arr.slice,
	// Use a stripped-down indexOf as it's faster than native
	// http://jsperf.com/thor-indexof-vs-for/5
	indexOf = function( list, elem ) {
		var i = 0,
			len = list.length;
		for ( ; i < len; i++ ) {
			if ( list[i] === elem ) {
				return i;
			}
		}
		return -1;
	},

	booleans = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",

	// Regular expressions

	// http://www.w3.org/TR/css3-selectors/#whitespace
	whitespace = "[\\x20\\t\\r\\n\\f]",

	// http://www.w3.org/TR/CSS21/syndata.html#value-def-identifier
	identifier = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",

	// Attribute selectors: http://www.w3.org/TR/selectors/#attribute-selectors
	attributes = "\\[" + whitespace + "*(" + identifier + ")(?:" + whitespace +
		// Operator (capture 2)
		"*([*^$|!~]?=)" + whitespace +
		// "Attribute values must be CSS identifiers [capture 5] or strings [capture 3 or capture 4]"
		"*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + identifier + "))|)" + whitespace +
		"*\\]",

	pseudos = ":(" + identifier + ")(?:\\((" +
		// To reduce the number of selectors needing tokenize in the preFilter, prefer arguments:
		// 1. quoted (capture 3; capture 4 or capture 5)
		"('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|" +
		// 2. simple (capture 6)
		"((?:\\\\.|[^\\\\()[\\]]|" + attributes + ")*)|" +
		// 3. anything else (capture 2)
		".*" +
		")\\)|)",

	// Leading and non-escaped trailing whitespace, capturing some non-whitespace characters preceding the latter
	rwhitespace = new RegExp( whitespace + "+", "g" ),
	rtrim = new RegExp( "^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" + whitespace + "+$", "g" ),

	rcomma = new RegExp( "^" + whitespace + "*," + whitespace + "*" ),
	rcombinators = new RegExp( "^" + whitespace + "*([>+~]|" + whitespace + ")" + whitespace + "*" ),

	rattributeQuotes = new RegExp( "=" + whitespace + "*([^\\]'\"]*?)" + whitespace + "*\\]", "g" ),

	rpseudo = new RegExp( pseudos ),
	ridentifier = new RegExp( "^" + identifier + "$" ),

	matchExpr = {
		"ID": new RegExp( "^#(" + identifier + ")" ),
		"CLASS": new RegExp( "^\\.(" + identifier + ")" ),
		"TAG": new RegExp( "^(" + identifier + "|[*])" ),
		"ATTR": new RegExp( "^" + attributes ),
		"PSEUDO": new RegExp( "^" + pseudos ),
		"CHILD": new RegExp( "^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + whitespace +
			"*(even|odd|(([+-]|)(\\d*)n|)" + whitespace + "*(?:([+-]|)" + whitespace +
			"*(\\d+)|))" + whitespace + "*\\)|)", "i" ),
		"bool": new RegExp( "^(?:" + booleans + ")$", "i" ),
		// For use in libraries implementing .is()
		// We use this for POS matching in `select`
		"needsContext": new RegExp( "^" + whitespace + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" +
			whitespace + "*((?:-\\d)?\\d*)" + whitespace + "*\\)|)(?=[^-]|$)", "i" )
	},

	rinputs = /^(?:input|select|textarea|button)$/i,
	rheader = /^h\d$/i,

	rnative = /^[^{]+\{\s*\[native \w/,

	// Easily-parseable/retrievable ID or TAG or CLASS selectors
	rquickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,

	rsibling = /[+~]/,
	rescape = /'|\\/g,

	// CSS escapes http://www.w3.org/TR/CSS21/syndata.html#escaped-characters
	runescape = new RegExp( "\\\\([\\da-f]{1,6}" + whitespace + "?|(" + whitespace + ")|.)", "ig" ),
	funescape = function( _, escaped, escapedWhitespace ) {
		var high = "0x" + escaped - 0x10000;
		// NaN means non-codepoint
		// Support: Firefox<24
		// Workaround erroneous numeric interpretation of +"0x"
		return high !== high || escapedWhitespace ?
			escaped :
			high < 0 ?
				// BMP codepoint
				String.fromCharCode( high + 0x10000 ) :
				// Supplemental Plane codepoint (surrogate pair)
				String.fromCharCode( high >> 10 | 0xD800, high & 0x3FF | 0xDC00 );
	},

	// Used for iframes
	// See setDocument()
	// Removing the function wrapper causes a "Permission Denied"
	// error in IE
	unloadHandler = function() {
		setDocument();
	};

// Optimize for push.apply( _, NodeList )
try {
	push.apply(
		(arr = slice.call( preferredDoc.childNodes )),
		preferredDoc.childNodes
	);
	// Support: Android<4.0
	// Detect silently failing push.apply
	arr[ preferredDoc.childNodes.length ].nodeType;
} catch ( e ) {
	push = { apply: arr.length ?

		// Leverage slice if possible
		function( target, els ) {
			push_native.apply( target, slice.call(els) );
		} :

		// Support: IE<9
		// Otherwise append directly
		function( target, els ) {
			var j = target.length,
				i = 0;
			// Can't trust NodeList.length
			while ( (target[j++] = els[i++]) ) {}
			target.length = j - 1;
		}
	};
}

function Sizzle( selector, context, results, seed ) {
	var m, i, elem, nid, nidselect, match, groups, newSelector,
		newContext = context && context.ownerDocument,

		// nodeType defaults to 9, since context defaults to document
		nodeType = context ? context.nodeType : 9;

	results = results || [];

	// Return early from calls with invalid selector or context
	if ( typeof selector !== "string" || !selector ||
		nodeType !== 1 && nodeType !== 9 && nodeType !== 11 ) {

		return results;
	}

	// Try to shortcut find operations (as opposed to filters) in HTML documents
	if ( !seed ) {

		if ( ( context ? context.ownerDocument || context : preferredDoc ) !== document ) {
			setDocument( context );
		}
		context = context || document;

		if ( documentIsHTML ) {

			// If the selector is sufficiently simple, try using a "get*By*" DOM method
			// (excepting DocumentFragment context, where the methods don't exist)
			if ( nodeType !== 11 && (match = rquickExpr.exec( selector )) ) {

				// ID selector
				if ( (m = match[1]) ) {

					// Document context
					if ( nodeType === 9 ) {
						if ( (elem = context.getElementById( m )) ) {

							// Support: IE, Opera, Webkit
							// TODO: identify versions
							// getElementById can match elements by name instead of ID
							if ( elem.id === m ) {
								results.push( elem );
								return results;
							}
						} else {
							return results;
						}

					// Element context
					} else {

						// Support: IE, Opera, Webkit
						// TODO: identify versions
						// getElementById can match elements by name instead of ID
						if ( newContext && (elem = newContext.getElementById( m )) &&
							contains( context, elem ) &&
							elem.id === m ) {

							results.push( elem );
							return results;
						}
					}

				// Type selector
				} else if ( match[2] ) {
					push.apply( results, context.getElementsByTagName( selector ) );
					return results;

				// Class selector
				} else if ( (m = match[3]) && support.getElementsByClassName &&
					context.getElementsByClassName ) {

					push.apply( results, context.getElementsByClassName( m ) );
					return results;
				}
			}

			// Take advantage of querySelectorAll
			if ( support.qsa &&
				!compilerCache[ selector + " " ] &&
				(!rbuggyQSA || !rbuggyQSA.test( selector )) ) {

				if ( nodeType !== 1 ) {
					newContext = context;
					newSelector = selector;

				// qSA looks outside Element context, which is not what we want
				// Thanks to Andrew Dupont for this workaround technique
				// Support: IE <=8
				// Exclude object elements
				} else if ( context.nodeName.toLowerCase() !== "object" ) {

					// Capture the context ID, setting it first if necessary
					if ( (nid = context.getAttribute( "id" )) ) {
						nid = nid.replace( rescape, "\\$&" );
					} else {
						context.setAttribute( "id", (nid = expando) );
					}

					// Prefix every selector in the list
					groups = tokenize( selector );
					i = groups.length;
					nidselect = ridentifier.test( nid ) ? "#" + nid : "[id='" + nid + "']";
					while ( i-- ) {
						groups[i] = nidselect + " " + toSelector( groups[i] );
					}
					newSelector = groups.join( "," );

					// Expand context for sibling selectors
					newContext = rsibling.test( selector ) && testContext( context.parentNode ) ||
						context;
				}

				if ( newSelector ) {
					try {
						push.apply( results,
							newContext.querySelectorAll( newSelector )
						);
						return results;
					} catch ( qsaError ) {
					} finally {
						if ( nid === expando ) {
							context.removeAttribute( "id" );
						}
					}
				}
			}
		}
	}

	// All others
	return select( selector.replace( rtrim, "$1" ), context, results, seed );
}

/**
 * Create key-value caches of limited size
 * @returns {function(string, object)} Returns the Object data after storing it on itself with
 *	property name the (space-suffixed) string and (if the cache is larger than Expr.cacheLength)
 *	deleting the oldest entry
 */
function createCache() {
	var keys = [];

	function cache( key, value ) {
		// Use (key + " ") to avoid collision with native prototype properties (see Issue #157)
		if ( keys.push( key + " " ) > Expr.cacheLength ) {
			// Only keep the most recent entries
			delete cache[ keys.shift() ];
		}
		return (cache[ key + " " ] = value);
	}
	return cache;
}

/**
 * Mark a function for special use by Sizzle
 * @param {Function} fn The function to mark
 */
function markFunction( fn ) {
	fn[ expando ] = true;
	return fn;
}

/**
 * Support testing using an element
 * @param {Function} fn Passed the created div and expects a boolean result
 */
function assert( fn ) {
	var div = document.createElement("div");

	try {
		return !!fn( div );
	} catch (e) {
		return false;
	} finally {
		// Remove from its parent by default
		if ( div.parentNode ) {
			div.parentNode.removeChild( div );
		}
		// release memory in IE
		div = null;
	}
}

/**
 * Adds the same handler for all of the specified attrs
 * @param {String} attrs Pipe-separated list of attributes
 * @param {Function} handler The method that will be applied
 */
function addHandle( attrs, handler ) {
	var arr = attrs.split("|"),
		i = arr.length;

	while ( i-- ) {
		Expr.attrHandle[ arr[i] ] = handler;
	}
}

/**
 * Checks document order of two siblings
 * @param {Element} a
 * @param {Element} b
 * @returns {Number} Returns less than 0 if a precedes b, greater than 0 if a follows b
 */
function siblingCheck( a, b ) {
	var cur = b && a,
		diff = cur && a.nodeType === 1 && b.nodeType === 1 &&
			( ~b.sourceIndex || MAX_NEGATIVE ) -
			( ~a.sourceIndex || MAX_NEGATIVE );

	// Use IE sourceIndex if available on both nodes
	if ( diff ) {
		return diff;
	}

	// Check if b follows a
	if ( cur ) {
		while ( (cur = cur.nextSibling) ) {
			if ( cur === b ) {
				return -1;
			}
		}
	}

	return a ? 1 : -1;
}

/**
 * Returns a function to use in pseudos for input types
 * @param {String} type
 */
function createInputPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return name === "input" && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for buttons
 * @param {String} type
 */
function createButtonPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return (name === "input" || name === "button") && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for positionals
 * @param {Function} fn
 */
function createPositionalPseudo( fn ) {
	return markFunction(function( argument ) {
		argument = +argument;
		return markFunction(function( seed, matches ) {
			var j,
				matchIndexes = fn( [], seed.length, argument ),
				i = matchIndexes.length;

			// Match elements found at the specified indexes
			while ( i-- ) {
				if ( seed[ (j = matchIndexes[i]) ] ) {
					seed[j] = !(matches[j] = seed[j]);
				}
			}
		});
	});
}

/**
 * Checks a node for validity as a Sizzle context
 * @param {Element|Object=} context
 * @returns {Element|Object|Boolean} The input node if acceptable, otherwise a falsy value
 */
function testContext( context ) {
	return context && typeof context.getElementsByTagName !== "undefined" && context;
}

// Expose support vars for convenience
support = Sizzle.support = {};

/**
 * Detects XML nodes
 * @param {Element|Object} elem An element or a document
 * @returns {Boolean} True iff elem is a non-HTML XML node
 */
isXML = Sizzle.isXML = function( elem ) {
	// documentElement is verified for cases where it doesn't yet exist
	// (such as loading iframes in IE - #4833)
	var documentElement = elem && (elem.ownerDocument || elem).documentElement;
	return documentElement ? documentElement.nodeName !== "HTML" : false;
};

/**
 * Sets document-related variables once based on the current document
 * @param {Element|Object} [doc] An element or document object to use to set the document
 * @returns {Object} Returns the current document
 */
setDocument = Sizzle.setDocument = function( node ) {
	var hasCompare, parent,
		doc = node ? node.ownerDocument || node : preferredDoc;

	// Return early if doc is invalid or already selected
	if ( doc === document || doc.nodeType !== 9 || !doc.documentElement ) {
		return document;
	}

	// Update global variables
	document = doc;
	docElem = document.documentElement;
	documentIsHTML = !isXML( document );

	// Support: IE 9-11, Edge
	// Accessing iframe documents after unload throws "permission denied" errors (jQuery #13936)
	if ( (parent = document.defaultView) && parent.top !== parent ) {
		// Support: IE 11
		if ( parent.addEventListener ) {
			parent.addEventListener( "unload", unloadHandler, false );

		// Support: IE 9 - 10 only
		} else if ( parent.attachEvent ) {
			parent.attachEvent( "onunload", unloadHandler );
		}
	}

	/* Attributes
	---------------------------------------------------------------------- */

	// Support: IE<8
	// Verify that getAttribute really returns attributes and not properties
	// (excepting IE8 booleans)
	support.attributes = assert(function( div ) {
		div.className = "i";
		return !div.getAttribute("className");
	});

	/* getElement(s)By*
	---------------------------------------------------------------------- */

	// Check if getElementsByTagName("*") returns only elements
	support.getElementsByTagName = assert(function( div ) {
		div.appendChild( document.createComment("") );
		return !div.getElementsByTagName("*").length;
	});

	// Support: IE<9
	support.getElementsByClassName = rnative.test( document.getElementsByClassName );

	// Support: IE<10
	// Check if getElementById returns elements by name
	// The broken getElementById methods don't pick up programatically-set names,
	// so use a roundabout getElementsByName test
	support.getById = assert(function( div ) {
		docElem.appendChild( div ).id = expando;
		return !document.getElementsByName || !document.getElementsByName( expando ).length;
	});

	// ID find and filter
	if ( support.getById ) {
		Expr.find["ID"] = function( id, context ) {
			if ( typeof context.getElementById !== "undefined" && documentIsHTML ) {
				var m = context.getElementById( id );
				return m ? [ m ] : [];
			}
		};
		Expr.filter["ID"] = function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				return elem.getAttribute("id") === attrId;
			};
		};
	} else {
		// Support: IE6/7
		// getElementById is not reliable as a find shortcut
		delete Expr.find["ID"];

		Expr.filter["ID"] =  function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				var node = typeof elem.getAttributeNode !== "undefined" &&
					elem.getAttributeNode("id");
				return node && node.value === attrId;
			};
		};
	}

	// Tag
	Expr.find["TAG"] = support.getElementsByTagName ?
		function( tag, context ) {
			if ( typeof context.getElementsByTagName !== "undefined" ) {
				return context.getElementsByTagName( tag );

			// DocumentFragment nodes don't have gEBTN
			} else if ( support.qsa ) {
				return context.querySelectorAll( tag );
			}
		} :

		function( tag, context ) {
			var elem,
				tmp = [],
				i = 0,
				// By happy coincidence, a (broken) gEBTN appears on DocumentFragment nodes too
				results = context.getElementsByTagName( tag );

			// Filter out possible comments
			if ( tag === "*" ) {
				while ( (elem = results[i++]) ) {
					if ( elem.nodeType === 1 ) {
						tmp.push( elem );
					}
				}

				return tmp;
			}
			return results;
		};

	// Class
	Expr.find["CLASS"] = support.getElementsByClassName && function( className, context ) {
		if ( typeof context.getElementsByClassName !== "undefined" && documentIsHTML ) {
			return context.getElementsByClassName( className );
		}
	};

	/* QSA/matchesSelector
	---------------------------------------------------------------------- */

	// QSA and matchesSelector support

	// matchesSelector(:active) reports false when true (IE9/Opera 11.5)
	rbuggyMatches = [];

	// qSa(:focus) reports false when true (Chrome 21)
	// We allow this because of a bug in IE8/9 that throws an error
	// whenever `document.activeElement` is accessed on an iframe
	// So, we allow :focus to pass through QSA all the time to avoid the IE error
	// See http://bugs.jquery.com/ticket/13378
	rbuggyQSA = [];

	if ( (support.qsa = rnative.test( document.querySelectorAll )) ) {
		// Build QSA regex
		// Regex strategy adopted from Diego Perini
		assert(function( div ) {
			// Select is set to empty string on purpose
			// This is to test IE's treatment of not explicitly
			// setting a boolean content attribute,
			// since its presence should be enough
			// http://bugs.jquery.com/ticket/12359
			docElem.appendChild( div ).innerHTML = "<a id='" + expando + "'></a>" +
				"<select id='" + expando + "-\r\\' msallowcapture=''>" +
				"<option selected=''></option></select>";

			// Support: IE8, Opera 11-12.16
			// Nothing should be selected when empty strings follow ^= or $= or *=
			// The test attribute must be unknown in Opera but "safe" for WinRT
			// http://msdn.microsoft.com/en-us/library/ie/hh465388.aspx#attribute_section
			if ( div.querySelectorAll("[msallowcapture^='']").length ) {
				rbuggyQSA.push( "[*^$]=" + whitespace + "*(?:''|\"\")" );
			}

			// Support: IE8
			// Boolean attributes and "value" are not treated correctly
			if ( !div.querySelectorAll("[selected]").length ) {
				rbuggyQSA.push( "\\[" + whitespace + "*(?:value|" + booleans + ")" );
			}

			// Support: Chrome<29, Android<4.4, Safari<7.0+, iOS<7.0+, PhantomJS<1.9.8+
			if ( !div.querySelectorAll( "[id~=" + expando + "-]" ).length ) {
				rbuggyQSA.push("~=");
			}

			// Webkit/Opera - :checked should return selected option elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			// IE8 throws error here and will not see later tests
			if ( !div.querySelectorAll(":checked").length ) {
				rbuggyQSA.push(":checked");
			}

			// Support: Safari 8+, iOS 8+
			// https://bugs.webkit.org/show_bug.cgi?id=136851
			// In-page `selector#id sibing-combinator selector` fails
			if ( !div.querySelectorAll( "a#" + expando + "+*" ).length ) {
				rbuggyQSA.push(".#.+[+~]");
			}
		});

		assert(function( div ) {
			// Support: Windows 8 Native Apps
			// The type and name attributes are restricted during .innerHTML assignment
			var input = document.createElement("input");
			input.setAttribute( "type", "hidden" );
			div.appendChild( input ).setAttribute( "name", "D" );

			// Support: IE8
			// Enforce case-sensitivity of name attribute
			if ( div.querySelectorAll("[name=d]").length ) {
				rbuggyQSA.push( "name" + whitespace + "*[*^$|!~]?=" );
			}

			// FF 3.5 - :enabled/:disabled and hidden elements (hidden elements are still enabled)
			// IE8 throws error here and will not see later tests
			if ( !div.querySelectorAll(":enabled").length ) {
				rbuggyQSA.push( ":enabled", ":disabled" );
			}

			// Opera 10-11 does not throw on post-comma invalid pseudos
			div.querySelectorAll("*,:x");
			rbuggyQSA.push(",.*:");
		});
	}

	if ( (support.matchesSelector = rnative.test( (matches = docElem.matches ||
		docElem.webkitMatchesSelector ||
		docElem.mozMatchesSelector ||
		docElem.oMatchesSelector ||
		docElem.msMatchesSelector) )) ) {

		assert(function( div ) {
			// Check to see if it's possible to do matchesSelector
			// on a disconnected node (IE 9)
			support.disconnectedMatch = matches.call( div, "div" );

			// This should fail with an exception
			// Gecko does not error, returns false instead
			matches.call( div, "[s!='']:x" );
			rbuggyMatches.push( "!=", pseudos );
		});
	}

	rbuggyQSA = rbuggyQSA.length && new RegExp( rbuggyQSA.join("|") );
	rbuggyMatches = rbuggyMatches.length && new RegExp( rbuggyMatches.join("|") );

	/* Contains
	---------------------------------------------------------------------- */
	hasCompare = rnative.test( docElem.compareDocumentPosition );

	// Element contains another
	// Purposefully self-exclusive
	// As in, an element does not contain itself
	contains = hasCompare || rnative.test( docElem.contains ) ?
		function( a, b ) {
			var adown = a.nodeType === 9 ? a.documentElement : a,
				bup = b && b.parentNode;
			return a === bup || !!( bup && bup.nodeType === 1 && (
				adown.contains ?
					adown.contains( bup ) :
					a.compareDocumentPosition && a.compareDocumentPosition( bup ) & 16
			));
		} :
		function( a, b ) {
			if ( b ) {
				while ( (b = b.parentNode) ) {
					if ( b === a ) {
						return true;
					}
				}
			}
			return false;
		};

	/* Sorting
	---------------------------------------------------------------------- */

	// Document order sorting
	sortOrder = hasCompare ?
	function( a, b ) {

		// Flag for duplicate removal
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		// Sort on method existence if only one input has compareDocumentPosition
		var compare = !a.compareDocumentPosition - !b.compareDocumentPosition;
		if ( compare ) {
			return compare;
		}

		// Calculate position if both inputs belong to the same document
		compare = ( a.ownerDocument || a ) === ( b.ownerDocument || b ) ?
			a.compareDocumentPosition( b ) :

			// Otherwise we know they are disconnected
			1;

		// Disconnected nodes
		if ( compare & 1 ||
			(!support.sortDetached && b.compareDocumentPosition( a ) === compare) ) {

			// Choose the first element that is related to our preferred document
			if ( a === document || a.ownerDocument === preferredDoc && contains(preferredDoc, a) ) {
				return -1;
			}
			if ( b === document || b.ownerDocument === preferredDoc && contains(preferredDoc, b) ) {
				return 1;
			}

			// Maintain original order
			return sortInput ?
				( indexOf( sortInput, a ) - indexOf( sortInput, b ) ) :
				0;
		}

		return compare & 4 ? -1 : 1;
	} :
	function( a, b ) {
		// Exit early if the nodes are identical
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		var cur,
			i = 0,
			aup = a.parentNode,
			bup = b.parentNode,
			ap = [ a ],
			bp = [ b ];

		// Parentless nodes are either documents or disconnected
		if ( !aup || !bup ) {
			return a === document ? -1 :
				b === document ? 1 :
				aup ? -1 :
				bup ? 1 :
				sortInput ?
				( indexOf( sortInput, a ) - indexOf( sortInput, b ) ) :
				0;

		// If the nodes are siblings, we can do a quick check
		} else if ( aup === bup ) {
			return siblingCheck( a, b );
		}

		// Otherwise we need full lists of their ancestors for comparison
		cur = a;
		while ( (cur = cur.parentNode) ) {
			ap.unshift( cur );
		}
		cur = b;
		while ( (cur = cur.parentNode) ) {
			bp.unshift( cur );
		}

		// Walk down the tree looking for a discrepancy
		while ( ap[i] === bp[i] ) {
			i++;
		}

		return i ?
			// Do a sibling check if the nodes have a common ancestor
			siblingCheck( ap[i], bp[i] ) :

			// Otherwise nodes in our document sort first
			ap[i] === preferredDoc ? -1 :
			bp[i] === preferredDoc ? 1 :
			0;
	};

	return document;
};

Sizzle.matches = function( expr, elements ) {
	return Sizzle( expr, null, null, elements );
};

Sizzle.matchesSelector = function( elem, expr ) {
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	// Make sure that attribute selectors are quoted
	expr = expr.replace( rattributeQuotes, "='$1']" );

	if ( support.matchesSelector && documentIsHTML &&
		!compilerCache[ expr + " " ] &&
		( !rbuggyMatches || !rbuggyMatches.test( expr ) ) &&
		( !rbuggyQSA     || !rbuggyQSA.test( expr ) ) ) {

		try {
			var ret = matches.call( elem, expr );

			// IE 9's matchesSelector returns false on disconnected nodes
			if ( ret || support.disconnectedMatch ||
					// As well, disconnected nodes are said to be in a document
					// fragment in IE 9
					elem.document && elem.document.nodeType !== 11 ) {
				return ret;
			}
		} catch (e) {}
	}

	return Sizzle( expr, document, null, [ elem ] ).length > 0;
};

Sizzle.contains = function( context, elem ) {
	// Set document vars if needed
	if ( ( context.ownerDocument || context ) !== document ) {
		setDocument( context );
	}
	return contains( context, elem );
};

Sizzle.attr = function( elem, name ) {
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	var fn = Expr.attrHandle[ name.toLowerCase() ],
		// Don't get fooled by Object.prototype properties (jQuery #13807)
		val = fn && hasOwn.call( Expr.attrHandle, name.toLowerCase() ) ?
			fn( elem, name, !documentIsHTML ) :
			undefined;

	return val !== undefined ?
		val :
		support.attributes || !documentIsHTML ?
			elem.getAttribute( name ) :
			(val = elem.getAttributeNode(name)) && val.specified ?
				val.value :
				null;
};

Sizzle.error = function( msg ) {
	throw new Error( "Syntax error, unrecognized expression: " + msg );
};

/**
 * Document sorting and removing duplicates
 * @param {ArrayLike} results
 */
Sizzle.uniqueSort = function( results ) {
	var elem,
		duplicates = [],
		j = 0,
		i = 0;

	// Unless we *know* we can detect duplicates, assume their presence
	hasDuplicate = !support.detectDuplicates;
	sortInput = !support.sortStable && results.slice( 0 );
	results.sort( sortOrder );

	if ( hasDuplicate ) {
		while ( (elem = results[i++]) ) {
			if ( elem === results[ i ] ) {
				j = duplicates.push( i );
			}
		}
		while ( j-- ) {
			results.splice( duplicates[ j ], 1 );
		}
	}

	// Clear input after sorting to release objects
	// See https://github.com/jquery/sizzle/pull/225
	sortInput = null;

	return results;
};

/**
 * Utility function for retrieving the text value of an array of DOM nodes
 * @param {Array|Element} elem
 */
getText = Sizzle.getText = function( elem ) {
	var node,
		ret = "",
		i = 0,
		nodeType = elem.nodeType;

	if ( !nodeType ) {
		// If no nodeType, this is expected to be an array
		while ( (node = elem[i++]) ) {
			// Do not traverse comment nodes
			ret += getText( node );
		}
	} else if ( nodeType === 1 || nodeType === 9 || nodeType === 11 ) {
		// Use textContent for elements
		// innerText usage removed for consistency of new lines (jQuery #11153)
		if ( typeof elem.textContent === "string" ) {
			return elem.textContent;
		} else {
			// Traverse its children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				ret += getText( elem );
			}
		}
	} else if ( nodeType === 3 || nodeType === 4 ) {
		return elem.nodeValue;
	}
	// Do not include comment or processing instruction nodes

	return ret;
};

Expr = Sizzle.selectors = {

	// Can be adjusted by the user
	cacheLength: 50,

	createPseudo: markFunction,

	match: matchExpr,

	attrHandle: {},

	find: {},

	relative: {
		">": { dir: "parentNode", first: true },
		" ": { dir: "parentNode" },
		"+": { dir: "previousSibling", first: true },
		"~": { dir: "previousSibling" }
	},

	preFilter: {
		"ATTR": function( match ) {
			match[1] = match[1].replace( runescape, funescape );

			// Move the given value to match[3] whether quoted or unquoted
			match[3] = ( match[3] || match[4] || match[5] || "" ).replace( runescape, funescape );

			if ( match[2] === "~=" ) {
				match[3] = " " + match[3] + " ";
			}

			return match.slice( 0, 4 );
		},

		"CHILD": function( match ) {
			/* matches from matchExpr["CHILD"]
				1 type (only|nth|...)
				2 what (child|of-type)
				3 argument (even|odd|\d*|\d*n([+-]\d+)?|...)
				4 xn-component of xn+y argument ([+-]?\d*n|)
				5 sign of xn-component
				6 x of xn-component
				7 sign of y-component
				8 y of y-component
			*/
			match[1] = match[1].toLowerCase();

			if ( match[1].slice( 0, 3 ) === "nth" ) {
				// nth-* requires argument
				if ( !match[3] ) {
					Sizzle.error( match[0] );
				}

				// numeric x and y parameters for Expr.filter.CHILD
				// remember that false/true cast respectively to 0/1
				match[4] = +( match[4] ? match[5] + (match[6] || 1) : 2 * ( match[3] === "even" || match[3] === "odd" ) );
				match[5] = +( ( match[7] + match[8] ) || match[3] === "odd" );

			// other types prohibit arguments
			} else if ( match[3] ) {
				Sizzle.error( match[0] );
			}

			return match;
		},

		"PSEUDO": function( match ) {
			var excess,
				unquoted = !match[6] && match[2];

			if ( matchExpr["CHILD"].test( match[0] ) ) {
				return null;
			}

			// Accept quoted arguments as-is
			if ( match[3] ) {
				match[2] = match[4] || match[5] || "";

			// Strip excess characters from unquoted arguments
			} else if ( unquoted && rpseudo.test( unquoted ) &&
				// Get excess from tokenize (recursively)
				(excess = tokenize( unquoted, true )) &&
				// advance to the next closing parenthesis
				(excess = unquoted.indexOf( ")", unquoted.length - excess ) - unquoted.length) ) {

				// excess is a negative index
				match[0] = match[0].slice( 0, excess );
				match[2] = unquoted.slice( 0, excess );
			}

			// Return only captures needed by the pseudo filter method (type and argument)
			return match.slice( 0, 3 );
		}
	},

	filter: {

		"TAG": function( nodeNameSelector ) {
			var nodeName = nodeNameSelector.replace( runescape, funescape ).toLowerCase();
			return nodeNameSelector === "*" ?
				function() { return true; } :
				function( elem ) {
					return elem.nodeName && elem.nodeName.toLowerCase() === nodeName;
				};
		},

		"CLASS": function( className ) {
			var pattern = classCache[ className + " " ];

			return pattern ||
				(pattern = new RegExp( "(^|" + whitespace + ")" + className + "(" + whitespace + "|$)" )) &&
				classCache( className, function( elem ) {
					return pattern.test( typeof elem.className === "string" && elem.className || typeof elem.getAttribute !== "undefined" && elem.getAttribute("class") || "" );
				});
		},

		"ATTR": function( name, operator, check ) {
			return function( elem ) {
				var result = Sizzle.attr( elem, name );

				if ( result == null ) {
					return operator === "!=";
				}
				if ( !operator ) {
					return true;
				}

				result += "";

				return operator === "=" ? result === check :
					operator === "!=" ? result !== check :
					operator === "^=" ? check && result.indexOf( check ) === 0 :
					operator === "*=" ? check && result.indexOf( check ) > -1 :
					operator === "$=" ? check && result.slice( -check.length ) === check :
					operator === "~=" ? ( " " + result.replace( rwhitespace, " " ) + " " ).indexOf( check ) > -1 :
					operator === "|=" ? result === check || result.slice( 0, check.length + 1 ) === check + "-" :
					false;
			};
		},

		"CHILD": function( type, what, argument, first, last ) {
			var simple = type.slice( 0, 3 ) !== "nth",
				forward = type.slice( -4 ) !== "last",
				ofType = what === "of-type";

			return first === 1 && last === 0 ?

				// Shortcut for :nth-*(n)
				function( elem ) {
					return !!elem.parentNode;
				} :

				function( elem, context, xml ) {
					var cache, uniqueCache, outerCache, node, nodeIndex, start,
						dir = simple !== forward ? "nextSibling" : "previousSibling",
						parent = elem.parentNode,
						name = ofType && elem.nodeName.toLowerCase(),
						useCache = !xml && !ofType,
						diff = false;

					if ( parent ) {

						// :(first|last|only)-(child|of-type)
						if ( simple ) {
							while ( dir ) {
								node = elem;
								while ( (node = node[ dir ]) ) {
									if ( ofType ?
										node.nodeName.toLowerCase() === name :
										node.nodeType === 1 ) {

										return false;
									}
								}
								// Reverse direction for :only-* (if we haven't yet done so)
								start = dir = type === "only" && !start && "nextSibling";
							}
							return true;
						}

						start = [ forward ? parent.firstChild : parent.lastChild ];

						// non-xml :nth-child(...) stores cache data on `parent`
						if ( forward && useCache ) {

							// Seek `elem` from a previously-cached index

							// ...in a gzip-friendly way
							node = parent;
							outerCache = node[ expando ] || (node[ expando ] = {});

							// Support: IE <9 only
							// Defend against cloned attroperties (jQuery gh-1709)
							uniqueCache = outerCache[ node.uniqueID ] ||
								(outerCache[ node.uniqueID ] = {});

							cache = uniqueCache[ type ] || [];
							nodeIndex = cache[ 0 ] === dirruns && cache[ 1 ];
							diff = nodeIndex && cache[ 2 ];
							node = nodeIndex && parent.childNodes[ nodeIndex ];

							while ( (node = ++nodeIndex && node && node[ dir ] ||

								// Fallback to seeking `elem` from the start
								(diff = nodeIndex = 0) || start.pop()) ) {

								// When found, cache indexes on `parent` and break
								if ( node.nodeType === 1 && ++diff && node === elem ) {
									uniqueCache[ type ] = [ dirruns, nodeIndex, diff ];
									break;
								}
							}

						} else {
							// Use previously-cached element index if available
							if ( useCache ) {
								// ...in a gzip-friendly way
								node = elem;
								outerCache = node[ expando ] || (node[ expando ] = {});

								// Support: IE <9 only
								// Defend against cloned attroperties (jQuery gh-1709)
								uniqueCache = outerCache[ node.uniqueID ] ||
									(outerCache[ node.uniqueID ] = {});

								cache = uniqueCache[ type ] || [];
								nodeIndex = cache[ 0 ] === dirruns && cache[ 1 ];
								diff = nodeIndex;
							}

							// xml :nth-child(...)
							// or :nth-last-child(...) or :nth(-last)?-of-type(...)
							if ( diff === false ) {
								// Use the same loop as above to seek `elem` from the start
								while ( (node = ++nodeIndex && node && node[ dir ] ||
									(diff = nodeIndex = 0) || start.pop()) ) {

									if ( ( ofType ?
										node.nodeName.toLowerCase() === name :
										node.nodeType === 1 ) &&
										++diff ) {

										// Cache the index of each encountered element
										if ( useCache ) {
											outerCache = node[ expando ] || (node[ expando ] = {});

											// Support: IE <9 only
											// Defend against cloned attroperties (jQuery gh-1709)
											uniqueCache = outerCache[ node.uniqueID ] ||
												(outerCache[ node.uniqueID ] = {});

											uniqueCache[ type ] = [ dirruns, diff ];
										}

										if ( node === elem ) {
											break;
										}
									}
								}
							}
						}

						// Incorporate the offset, then check against cycle size
						diff -= last;
						return diff === first || ( diff % first === 0 && diff / first >= 0 );
					}
				};
		},

		"PSEUDO": function( pseudo, argument ) {
			// pseudo-class names are case-insensitive
			// http://www.w3.org/TR/selectors/#pseudo-classes
			// Prioritize by case sensitivity in case custom pseudos are added with uppercase letters
			// Remember that setFilters inherits from pseudos
			var args,
				fn = Expr.pseudos[ pseudo ] || Expr.setFilters[ pseudo.toLowerCase() ] ||
					Sizzle.error( "unsupported pseudo: " + pseudo );

			// The user may use createPseudo to indicate that
			// arguments are needed to create the filter function
			// just as Sizzle does
			if ( fn[ expando ] ) {
				return fn( argument );
			}

			// But maintain support for old signatures
			if ( fn.length > 1 ) {
				args = [ pseudo, pseudo, "", argument ];
				return Expr.setFilters.hasOwnProperty( pseudo.toLowerCase() ) ?
					markFunction(function( seed, matches ) {
						var idx,
							matched = fn( seed, argument ),
							i = matched.length;
						while ( i-- ) {
							idx = indexOf( seed, matched[i] );
							seed[ idx ] = !( matches[ idx ] = matched[i] );
						}
					}) :
					function( elem ) {
						return fn( elem, 0, args );
					};
			}

			return fn;
		}
	},

	pseudos: {
		// Potentially complex pseudos
		"not": markFunction(function( selector ) {
			// Trim the selector passed to compile
			// to avoid treating leading and trailing
			// spaces as combinators
			var input = [],
				results = [],
				matcher = compile( selector.replace( rtrim, "$1" ) );

			return matcher[ expando ] ?
				markFunction(function( seed, matches, context, xml ) {
					var elem,
						unmatched = matcher( seed, null, xml, [] ),
						i = seed.length;

					// Match elements unmatched by `matcher`
					while ( i-- ) {
						if ( (elem = unmatched[i]) ) {
							seed[i] = !(matches[i] = elem);
						}
					}
				}) :
				function( elem, context, xml ) {
					input[0] = elem;
					matcher( input, null, xml, results );
					// Don't keep the element (issue #299)
					input[0] = null;
					return !results.pop();
				};
		}),

		"has": markFunction(function( selector ) {
			return function( elem ) {
				return Sizzle( selector, elem ).length > 0;
			};
		}),

		"contains": markFunction(function( text ) {
			text = text.replace( runescape, funescape );
			return function( elem ) {
				return ( elem.textContent || elem.innerText || getText( elem ) ).indexOf( text ) > -1;
			};
		}),

		// "Whether an element is represented by a :lang() selector
		// is based solely on the element's language value
		// being equal to the identifier C,
		// or beginning with the identifier C immediately followed by "-".
		// The matching of C against the element's language value is performed case-insensitively.
		// The identifier C does not have to be a valid language name."
		// http://www.w3.org/TR/selectors/#lang-pseudo
		"lang": markFunction( function( lang ) {
			// lang value must be a valid identifier
			if ( !ridentifier.test(lang || "") ) {
				Sizzle.error( "unsupported lang: " + lang );
			}
			lang = lang.replace( runescape, funescape ).toLowerCase();
			return function( elem ) {
				var elemLang;
				do {
					if ( (elemLang = documentIsHTML ?
						elem.lang :
						elem.getAttribute("xml:lang") || elem.getAttribute("lang")) ) {

						elemLang = elemLang.toLowerCase();
						return elemLang === lang || elemLang.indexOf( lang + "-" ) === 0;
					}
				} while ( (elem = elem.parentNode) && elem.nodeType === 1 );
				return false;
			};
		}),

		// Miscellaneous
		"target": function( elem ) {
			var hash = window.location && window.location.hash;
			return hash && hash.slice( 1 ) === elem.id;
		},

		"root": function( elem ) {
			return elem === docElem;
		},

		"focus": function( elem ) {
			return elem === document.activeElement && (!document.hasFocus || document.hasFocus()) && !!(elem.type || elem.href || ~elem.tabIndex);
		},

		// Boolean properties
		"enabled": function( elem ) {
			return elem.disabled === false;
		},

		"disabled": function( elem ) {
			return elem.disabled === true;
		},

		"checked": function( elem ) {
			// In CSS3, :checked should return both checked and selected elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			var nodeName = elem.nodeName.toLowerCase();
			return (nodeName === "input" && !!elem.checked) || (nodeName === "option" && !!elem.selected);
		},

		"selected": function( elem ) {
			// Accessing this property makes selected-by-default
			// options in Safari work properly
			if ( elem.parentNode ) {
				elem.parentNode.selectedIndex;
			}

			return elem.selected === true;
		},

		// Contents
		"empty": function( elem ) {
			// http://www.w3.org/TR/selectors/#empty-pseudo
			// :empty is negated by element (1) or content nodes (text: 3; cdata: 4; entity ref: 5),
			//   but not by others (comment: 8; processing instruction: 7; etc.)
			// nodeType < 6 works because attributes (2) do not appear as children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				if ( elem.nodeType < 6 ) {
					return false;
				}
			}
			return true;
		},

		"parent": function( elem ) {
			return !Expr.pseudos["empty"]( elem );
		},

		// Element/input types
		"header": function( elem ) {
			return rheader.test( elem.nodeName );
		},

		"input": function( elem ) {
			return rinputs.test( elem.nodeName );
		},

		"button": function( elem ) {
			var name = elem.nodeName.toLowerCase();
			return name === "input" && elem.type === "button" || name === "button";
		},

		"text": function( elem ) {
			var attr;
			return elem.nodeName.toLowerCase() === "input" &&
				elem.type === "text" &&

				// Support: IE<8
				// New HTML5 attribute values (e.g., "search") appear with elem.type === "text"
				( (attr = elem.getAttribute("type")) == null || attr.toLowerCase() === "text" );
		},

		// Position-in-collection
		"first": createPositionalPseudo(function() {
			return [ 0 ];
		}),

		"last": createPositionalPseudo(function( matchIndexes, length ) {
			return [ length - 1 ];
		}),

		"eq": createPositionalPseudo(function( matchIndexes, length, argument ) {
			return [ argument < 0 ? argument + length : argument ];
		}),

		"even": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 0;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"odd": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 1;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"lt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; --i >= 0; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"gt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; ++i < length; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		})
	}
};

Expr.pseudos["nth"] = Expr.pseudos["eq"];

// Add button/input type pseudos
for ( i in { radio: true, checkbox: true, file: true, password: true, image: true } ) {
	Expr.pseudos[ i ] = createInputPseudo( i );
}
for ( i in { submit: true, reset: true } ) {
	Expr.pseudos[ i ] = createButtonPseudo( i );
}

// Easy API for creating new setFilters
function setFilters() {}
setFilters.prototype = Expr.filters = Expr.pseudos;
Expr.setFilters = new setFilters();

tokenize = Sizzle.tokenize = function( selector, parseOnly ) {
	var matched, match, tokens, type,
		soFar, groups, preFilters,
		cached = tokenCache[ selector + " " ];

	if ( cached ) {
		return parseOnly ? 0 : cached.slice( 0 );
	}

	soFar = selector;
	groups = [];
	preFilters = Expr.preFilter;

	while ( soFar ) {

		// Comma and first run
		if ( !matched || (match = rcomma.exec( soFar )) ) {
			if ( match ) {
				// Don't consume trailing commas as valid
				soFar = soFar.slice( match[0].length ) || soFar;
			}
			groups.push( (tokens = []) );
		}

		matched = false;

		// Combinators
		if ( (match = rcombinators.exec( soFar )) ) {
			matched = match.shift();
			tokens.push({
				value: matched,
				// Cast descendant combinators to space
				type: match[0].replace( rtrim, " " )
			});
			soFar = soFar.slice( matched.length );
		}

		// Filters
		for ( type in Expr.filter ) {
			if ( (match = matchExpr[ type ].exec( soFar )) && (!preFilters[ type ] ||
				(match = preFilters[ type ]( match ))) ) {
				matched = match.shift();
				tokens.push({
					value: matched,
					type: type,
					matches: match
				});
				soFar = soFar.slice( matched.length );
			}
		}

		if ( !matched ) {
			break;
		}
	}

	// Return the length of the invalid excess
	// if we're just parsing
	// Otherwise, throw an error or return tokens
	return parseOnly ?
		soFar.length :
		soFar ?
			Sizzle.error( selector ) :
			// Cache the tokens
			tokenCache( selector, groups ).slice( 0 );
};

function toSelector( tokens ) {
	var i = 0,
		len = tokens.length,
		selector = "";
	for ( ; i < len; i++ ) {
		selector += tokens[i].value;
	}
	return selector;
}

function addCombinator( matcher, combinator, base ) {
	var dir = combinator.dir,
		checkNonElements = base && dir === "parentNode",
		doneName = done++;

	return combinator.first ?
		// Check against closest ancestor/preceding element
		function( elem, context, xml ) {
			while ( (elem = elem[ dir ]) ) {
				if ( elem.nodeType === 1 || checkNonElements ) {
					return matcher( elem, context, xml );
				}
			}
		} :

		// Check against all ancestor/preceding elements
		function( elem, context, xml ) {
			var oldCache, uniqueCache, outerCache,
				newCache = [ dirruns, doneName ];

			// We can't set arbitrary data on XML nodes, so they don't benefit from combinator caching
			if ( xml ) {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						if ( matcher( elem, context, xml ) ) {
							return true;
						}
					}
				}
			} else {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						outerCache = elem[ expando ] || (elem[ expando ] = {});

						// Support: IE <9 only
						// Defend against cloned attroperties (jQuery gh-1709)
						uniqueCache = outerCache[ elem.uniqueID ] || (outerCache[ elem.uniqueID ] = {});

						if ( (oldCache = uniqueCache[ dir ]) &&
							oldCache[ 0 ] === dirruns && oldCache[ 1 ] === doneName ) {

							// Assign to newCache so results back-propagate to previous elements
							return (newCache[ 2 ] = oldCache[ 2 ]);
						} else {
							// Reuse newcache so results back-propagate to previous elements
							uniqueCache[ dir ] = newCache;

							// A match means we're done; a fail means we have to keep checking
							if ( (newCache[ 2 ] = matcher( elem, context, xml )) ) {
								return true;
							}
						}
					}
				}
			}
		};
}

function elementMatcher( matchers ) {
	return matchers.length > 1 ?
		function( elem, context, xml ) {
			var i = matchers.length;
			while ( i-- ) {
				if ( !matchers[i]( elem, context, xml ) ) {
					return false;
				}
			}
			return true;
		} :
		matchers[0];
}

function multipleContexts( selector, contexts, results ) {
	var i = 0,
		len = contexts.length;
	for ( ; i < len; i++ ) {
		Sizzle( selector, contexts[i], results );
	}
	return results;
}

function condense( unmatched, map, filter, context, xml ) {
	var elem,
		newUnmatched = [],
		i = 0,
		len = unmatched.length,
		mapped = map != null;

	for ( ; i < len; i++ ) {
		if ( (elem = unmatched[i]) ) {
			if ( !filter || filter( elem, context, xml ) ) {
				newUnmatched.push( elem );
				if ( mapped ) {
					map.push( i );
				}
			}
		}
	}

	return newUnmatched;
}

function setMatcher( preFilter, selector, matcher, postFilter, postFinder, postSelector ) {
	if ( postFilter && !postFilter[ expando ] ) {
		postFilter = setMatcher( postFilter );
	}
	if ( postFinder && !postFinder[ expando ] ) {
		postFinder = setMatcher( postFinder, postSelector );
	}
	return markFunction(function( seed, results, context, xml ) {
		var temp, i, elem,
			preMap = [],
			postMap = [],
			preexisting = results.length,

			// Get initial elements from seed or context
			elems = seed || multipleContexts( selector || "*", context.nodeType ? [ context ] : context, [] ),

			// Prefilter to get matcher input, preserving a map for seed-results synchronization
			matcherIn = preFilter && ( seed || !selector ) ?
				condense( elems, preMap, preFilter, context, xml ) :
				elems,

			matcherOut = matcher ?
				// If we have a postFinder, or filtered seed, or non-seed postFilter or preexisting results,
				postFinder || ( seed ? preFilter : preexisting || postFilter ) ?

					// ...intermediate processing is necessary
					[] :

					// ...otherwise use results directly
					results :
				matcherIn;

		// Find primary matches
		if ( matcher ) {
			matcher( matcherIn, matcherOut, context, xml );
		}

		// Apply postFilter
		if ( postFilter ) {
			temp = condense( matcherOut, postMap );
			postFilter( temp, [], context, xml );

			// Un-match failing elements by moving them back to matcherIn
			i = temp.length;
			while ( i-- ) {
				if ( (elem = temp[i]) ) {
					matcherOut[ postMap[i] ] = !(matcherIn[ postMap[i] ] = elem);
				}
			}
		}

		if ( seed ) {
			if ( postFinder || preFilter ) {
				if ( postFinder ) {
					// Get the final matcherOut by condensing this intermediate into postFinder contexts
					temp = [];
					i = matcherOut.length;
					while ( i-- ) {
						if ( (elem = matcherOut[i]) ) {
							// Restore matcherIn since elem is not yet a final match
							temp.push( (matcherIn[i] = elem) );
						}
					}
					postFinder( null, (matcherOut = []), temp, xml );
				}

				// Move matched elements from seed to results to keep them synchronized
				i = matcherOut.length;
				while ( i-- ) {
					if ( (elem = matcherOut[i]) &&
						(temp = postFinder ? indexOf( seed, elem ) : preMap[i]) > -1 ) {

						seed[temp] = !(results[temp] = elem);
					}
				}
			}

		// Add elements to results, through postFinder if defined
		} else {
			matcherOut = condense(
				matcherOut === results ?
					matcherOut.splice( preexisting, matcherOut.length ) :
					matcherOut
			);
			if ( postFinder ) {
				postFinder( null, results, matcherOut, xml );
			} else {
				push.apply( results, matcherOut );
			}
		}
	});
}

function matcherFromTokens( tokens ) {
	var checkContext, matcher, j,
		len = tokens.length,
		leadingRelative = Expr.relative[ tokens[0].type ],
		implicitRelative = leadingRelative || Expr.relative[" "],
		i = leadingRelative ? 1 : 0,

		// The foundational matcher ensures that elements are reachable from top-level context(s)
		matchContext = addCombinator( function( elem ) {
			return elem === checkContext;
		}, implicitRelative, true ),
		matchAnyContext = addCombinator( function( elem ) {
			return indexOf( checkContext, elem ) > -1;
		}, implicitRelative, true ),
		matchers = [ function( elem, context, xml ) {
			var ret = ( !leadingRelative && ( xml || context !== outermostContext ) ) || (
				(checkContext = context).nodeType ?
					matchContext( elem, context, xml ) :
					matchAnyContext( elem, context, xml ) );
			// Avoid hanging onto element (issue #299)
			checkContext = null;
			return ret;
		} ];

	for ( ; i < len; i++ ) {
		if ( (matcher = Expr.relative[ tokens[i].type ]) ) {
			matchers = [ addCombinator(elementMatcher( matchers ), matcher) ];
		} else {
			matcher = Expr.filter[ tokens[i].type ].apply( null, tokens[i].matches );

			// Return special upon seeing a positional matcher
			if ( matcher[ expando ] ) {
				// Find the next relative operator (if any) for proper handling
				j = ++i;
				for ( ; j < len; j++ ) {
					if ( Expr.relative[ tokens[j].type ] ) {
						break;
					}
				}
				return setMatcher(
					i > 1 && elementMatcher( matchers ),
					i > 1 && toSelector(
						// If the preceding token was a descendant combinator, insert an implicit any-element `*`
						tokens.slice( 0, i - 1 ).concat({ value: tokens[ i - 2 ].type === " " ? "*" : "" })
					).replace( rtrim, "$1" ),
					matcher,
					i < j && matcherFromTokens( tokens.slice( i, j ) ),
					j < len && matcherFromTokens( (tokens = tokens.slice( j )) ),
					j < len && toSelector( tokens )
				);
			}
			matchers.push( matcher );
		}
	}

	return elementMatcher( matchers );
}

function matcherFromGroupMatchers( elementMatchers, setMatchers ) {
	var bySet = setMatchers.length > 0,
		byElement = elementMatchers.length > 0,
		superMatcher = function( seed, context, xml, results, outermost ) {
			var elem, j, matcher,
				matchedCount = 0,
				i = "0",
				unmatched = seed && [],
				setMatched = [],
				contextBackup = outermostContext,
				// We must always have either seed elements or outermost context
				elems = seed || byElement && Expr.find["TAG"]( "*", outermost ),
				// Use integer dirruns iff this is the outermost matcher
				dirrunsUnique = (dirruns += contextBackup == null ? 1 : Math.random() || 0.1),
				len = elems.length;

			if ( outermost ) {
				outermostContext = context === document || context || outermost;
			}

			// Add elements passing elementMatchers directly to results
			// Support: IE<9, Safari
			// Tolerate NodeList properties (IE: "length"; Safari: <number>) matching elements by id
			for ( ; i !== len && (elem = elems[i]) != null; i++ ) {
				if ( byElement && elem ) {
					j = 0;
					if ( !context && elem.ownerDocument !== document ) {
						setDocument( elem );
						xml = !documentIsHTML;
					}
					while ( (matcher = elementMatchers[j++]) ) {
						if ( matcher( elem, context || document, xml) ) {
							results.push( elem );
							break;
						}
					}
					if ( outermost ) {
						dirruns = dirrunsUnique;
					}
				}

				// Track unmatched elements for set filters
				if ( bySet ) {
					// They will have gone through all possible matchers
					if ( (elem = !matcher && elem) ) {
						matchedCount--;
					}

					// Lengthen the array for every element, matched or not
					if ( seed ) {
						unmatched.push( elem );
					}
				}
			}

			// `i` is now the count of elements visited above, and adding it to `matchedCount`
			// makes the latter nonnegative.
			matchedCount += i;

			// Apply set filters to unmatched elements
			// NOTE: This can be skipped if there are no unmatched elements (i.e., `matchedCount`
			// equals `i`), unless we didn't visit _any_ elements in the above loop because we have
			// no element matchers and no seed.
			// Incrementing an initially-string "0" `i` allows `i` to remain a string only in that
			// case, which will result in a "00" `matchedCount` that differs from `i` but is also
			// numerically zero.
			if ( bySet && i !== matchedCount ) {
				j = 0;
				while ( (matcher = setMatchers[j++]) ) {
					matcher( unmatched, setMatched, context, xml );
				}

				if ( seed ) {
					// Reintegrate element matches to eliminate the need for sorting
					if ( matchedCount > 0 ) {
						while ( i-- ) {
							if ( !(unmatched[i] || setMatched[i]) ) {
								setMatched[i] = pop.call( results );
							}
						}
					}

					// Discard index placeholder values to get only actual matches
					setMatched = condense( setMatched );
				}

				// Add matches to results
				push.apply( results, setMatched );

				// Seedless set matches succeeding multiple successful matchers stipulate sorting
				if ( outermost && !seed && setMatched.length > 0 &&
					( matchedCount + setMatchers.length ) > 1 ) {

					Sizzle.uniqueSort( results );
				}
			}

			// Override manipulation of globals by nested matchers
			if ( outermost ) {
				dirruns = dirrunsUnique;
				outermostContext = contextBackup;
			}

			return unmatched;
		};

	return bySet ?
		markFunction( superMatcher ) :
		superMatcher;
}

compile = Sizzle.compile = function( selector, match /* Internal Use Only */ ) {
	var i,
		setMatchers = [],
		elementMatchers = [],
		cached = compilerCache[ selector + " " ];

	if ( !cached ) {
		// Generate a function of recursive functions that can be used to check each element
		if ( !match ) {
			match = tokenize( selector );
		}
		i = match.length;
		while ( i-- ) {
			cached = matcherFromTokens( match[i] );
			if ( cached[ expando ] ) {
				setMatchers.push( cached );
			} else {
				elementMatchers.push( cached );
			}
		}

		// Cache the compiled function
		cached = compilerCache( selector, matcherFromGroupMatchers( elementMatchers, setMatchers ) );

		// Save selector and tokenization
		cached.selector = selector;
	}
	return cached;
};

/**
 * A low-level selection function that works with Sizzle's compiled
 *  selector functions
 * @param {String|Function} selector A selector or a pre-compiled
 *  selector function built with Sizzle.compile
 * @param {Element} context
 * @param {Array} [results]
 * @param {Array} [seed] A set of elements to match against
 */
select = Sizzle.select = function( selector, context, results, seed ) {
	var i, tokens, token, type, find,
		compiled = typeof selector === "function" && selector,
		match = !seed && tokenize( (selector = compiled.selector || selector) );

	results = results || [];

	// Try to minimize operations if there is only one selector in the list and no seed
	// (the latter of which guarantees us context)
	if ( match.length === 1 ) {

		// Reduce context if the leading compound selector is an ID
		tokens = match[0] = match[0].slice( 0 );
		if ( tokens.length > 2 && (token = tokens[0]).type === "ID" &&
				support.getById && context.nodeType === 9 && documentIsHTML &&
				Expr.relative[ tokens[1].type ] ) {

			context = ( Expr.find["ID"]( token.matches[0].replace(runescape, funescape), context ) || [] )[0];
			if ( !context ) {
				return results;

			// Precompiled matchers will still verify ancestry, so step up a level
			} else if ( compiled ) {
				context = context.parentNode;
			}

			selector = selector.slice( tokens.shift().value.length );
		}

		// Fetch a seed set for right-to-left matching
		i = matchExpr["needsContext"].test( selector ) ? 0 : tokens.length;
		while ( i-- ) {
			token = tokens[i];

			// Abort if we hit a combinator
			if ( Expr.relative[ (type = token.type) ] ) {
				break;
			}
			if ( (find = Expr.find[ type ]) ) {
				// Search, expanding context for leading sibling combinators
				if ( (seed = find(
					token.matches[0].replace( runescape, funescape ),
					rsibling.test( tokens[0].type ) && testContext( context.parentNode ) || context
				)) ) {

					// If seed is empty or no tokens remain, we can return early
					tokens.splice( i, 1 );
					selector = seed.length && toSelector( tokens );
					if ( !selector ) {
						push.apply( results, seed );
						return results;
					}

					break;
				}
			}
		}
	}

	// Compile and execute a filtering function if one is not provided
	// Provide `match` to avoid retokenization if we modified the selector above
	( compiled || compile( selector, match ) )(
		seed,
		context,
		!documentIsHTML,
		results,
		!context || rsibling.test( selector ) && testContext( context.parentNode ) || context
	);
	return results;
};

// One-time assignments

// Sort stability
support.sortStable = expando.split("").sort( sortOrder ).join("") === expando;

// Support: Chrome 14-35+
// Always assume duplicates if they aren't passed to the comparison function
support.detectDuplicates = !!hasDuplicate;

// Initialize against the default document
setDocument();

// Support: Webkit<537.32 - Safari 6.0.3/Chrome 25 (fixed in Chrome 27)
// Detached nodes confoundingly follow *each other*
support.sortDetached = assert(function( div1 ) {
	// Should return 1, but returns 4 (following)
	return div1.compareDocumentPosition( document.createElement("div") ) & 1;
});

// Support: IE<8
// Prevent attribute/property "interpolation"
// http://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
if ( !assert(function( div ) {
	div.innerHTML = "<a href='#'></a>";
	return div.firstChild.getAttribute("href") === "#" ;
}) ) {
	addHandle( "type|href|height|width", function( elem, name, isXML ) {
		if ( !isXML ) {
			return elem.getAttribute( name, name.toLowerCase() === "type" ? 1 : 2 );
		}
	});
}

// Support: IE<9
// Use defaultValue in place of getAttribute("value")
if ( !support.attributes || !assert(function( div ) {
	div.innerHTML = "<input/>";
	div.firstChild.setAttribute( "value", "" );
	return div.firstChild.getAttribute( "value" ) === "";
}) ) {
	addHandle( "value", function( elem, name, isXML ) {
		if ( !isXML && elem.nodeName.toLowerCase() === "input" ) {
			return elem.defaultValue;
		}
	});
}

// Support: IE<9
// Use getAttributeNode to fetch booleans when getAttribute lies
if ( !assert(function( div ) {
	return div.getAttribute("disabled") == null;
}) ) {
	addHandle( booleans, function( elem, name, isXML ) {
		var val;
		if ( !isXML ) {
			return elem[ name ] === true ? name.toLowerCase() :
					(val = elem.getAttributeNode( name )) && val.specified ?
					val.value :
				null;
		}
	});
}

return Sizzle;

})( window );



jQuery.find = Sizzle;
jQuery.expr = Sizzle.selectors;
jQuery.expr[ ":" ] = jQuery.expr.pseudos;
jQuery.uniqueSort = jQuery.unique = Sizzle.uniqueSort;
jQuery.text = Sizzle.getText;
jQuery.isXMLDoc = Sizzle.isXML;
jQuery.contains = Sizzle.contains;



var dir = function( elem, dir, until ) {
	var matched = [],
		truncate = until !== undefined;

	while ( ( elem = elem[ dir ] ) && elem.nodeType !== 9 ) {
		if ( elem.nodeType === 1 ) {
			if ( truncate && jQuery( elem ).is( until ) ) {
				break;
			}
			matched.push( elem );
		}
	}
	return matched;
};


var siblings = function( n, elem ) {
	var matched = [];

	for ( ; n; n = n.nextSibling ) {
		if ( n.nodeType === 1 && n !== elem ) {
			matched.push( n );
		}
	}

	return matched;
};


var rneedsContext = jQuery.expr.match.needsContext;

var rsingleTag = ( /^<([\w-]+)\s*\/?>(?:<\/\1>|)$/ );



var risSimple = /^.[^:#\[\.,]*$/;

// Implement the identical functionality for filter and not
function winnow( elements, qualifier, not ) {
	if ( jQuery.isFunction( qualifier ) ) {
		return jQuery.grep( elements, function( elem, i ) {
			/* jshint -W018 */
			return !!qualifier.call( elem, i, elem ) !== not;
		} );

	}

	if ( qualifier.nodeType ) {
		return jQuery.grep( elements, function( elem ) {
			return ( elem === qualifier ) !== not;
		} );

	}

	if ( typeof qualifier === "string" ) {
		if ( risSimple.test( qualifier ) ) {
			return jQuery.filter( qualifier, elements, not );
		}

		qualifier = jQuery.filter( qualifier, elements );
	}

	return jQuery.grep( elements, function( elem ) {
		return ( jQuery.inArray( elem, qualifier ) > -1 ) !== not;
	} );
}

jQuery.filter = function( expr, elems, not ) {
	var elem = elems[ 0 ];

	if ( not ) {
		expr = ":not(" + expr + ")";
	}

	return elems.length === 1 && elem.nodeType === 1 ?
		jQuery.find.matchesSelector( elem, expr ) ? [ elem ] : [] :
		jQuery.find.matches( expr, jQuery.grep( elems, function( elem ) {
			return elem.nodeType === 1;
		} ) );
};

jQuery.fn.extend( {
	find: function( selector ) {
		var i,
			ret = [],
			self = this,
			len = self.length;

		if ( typeof selector !== "string" ) {
			return this.pushStack( jQuery( selector ).filter( function() {
				for ( i = 0; i < len; i++ ) {
					if ( jQuery.contains( self[ i ], this ) ) {
						return true;
					}
				}
			} ) );
		}

		for ( i = 0; i < len; i++ ) {
			jQuery.find( selector, self[ i ], ret );
		}

		// Needed because $( selector, context ) becomes $( context ).find( selector )
		ret = this.pushStack( len > 1 ? jQuery.unique( ret ) : ret );
		ret.selector = this.selector ? this.selector + " " + selector : selector;
		return ret;
	},
	filter: function( selector ) {
		return this.pushStack( winnow( this, selector || [], false ) );
	},
	not: function( selector ) {
		return this.pushStack( winnow( this, selector || [], true ) );
	},
	is: function( selector ) {
		return !!winnow(
			this,

			// If this is a positional/relative selector, check membership in the returned set
			// so $("p:first").is("p:last") won't return true for a doc with two "p".
			typeof selector === "string" && rneedsContext.test( selector ) ?
				jQuery( selector ) :
				selector || [],
			false
		).length;
	}
} );


// Initialize a jQuery object


// A central reference to the root jQuery(document)
var rootjQuery,

	// A simple way to check for HTML strings
	// Prioritize #id over <tag> to avoid XSS via location.hash (#9521)
	// Strict HTML recognition (#11290: must start with <)
	rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,

	init = jQuery.fn.init = function( selector, context, root ) {
		var match, elem;

		// HANDLE: $(""), $(null), $(undefined), $(false)
		if ( !selector ) {
			return this;
		}

		// init accepts an alternate rootjQuery
		// so migrate can support jQuery.sub (gh-2101)
		root = root || rootjQuery;

		// Handle HTML strings
		if ( typeof selector === "string" ) {
			if ( selector.charAt( 0 ) === "<" &&
				selector.charAt( selector.length - 1 ) === ">" &&
				selector.length >= 3 ) {

				// Assume that strings that start and end with <> are HTML and skip the regex check
				match = [ null, selector, null ];

			} else {
				match = rquickExpr.exec( selector );
			}

			// Match html or make sure no context is specified for #id
			if ( match && ( match[ 1 ] || !context ) ) {

				// HANDLE: $(html) -> $(array)
				if ( match[ 1 ] ) {
					context = context instanceof jQuery ? context[ 0 ] : context;

					// scripts is true for back-compat
					// Intentionally let the error be thrown if parseHTML is not present
					jQuery.merge( this, jQuery.parseHTML(
						match[ 1 ],
						context && context.nodeType ? context.ownerDocument || context : document,
						true
					) );

					// HANDLE: $(html, props)
					if ( rsingleTag.test( match[ 1 ] ) && jQuery.isPlainObject( context ) ) {
						for ( match in context ) {

							// Properties of context are called as methods if possible
							if ( jQuery.isFunction( this[ match ] ) ) {
								this[ match ]( context[ match ] );

							// ...and otherwise set as attributes
							} else {
								this.attr( match, context[ match ] );
							}
						}
					}

					return this;

				// HANDLE: $(#id)
				} else {
					elem = document.getElementById( match[ 2 ] );

					// Check parentNode to catch when Blackberry 4.6 returns
					// nodes that are no longer in the document #6963
					if ( elem && elem.parentNode ) {

						// Handle the case where IE and Opera return items
						// by name instead of ID
						if ( elem.id !== match[ 2 ] ) {
							return rootjQuery.find( selector );
						}

						// Otherwise, we inject the element directly into the jQuery object
						this.length = 1;
						this[ 0 ] = elem;
					}

					this.context = document;
					this.selector = selector;
					return this;
				}

			// HANDLE: $(expr, $(...))
			} else if ( !context || context.jquery ) {
				return ( context || root ).find( selector );

			// HANDLE: $(expr, context)
			// (which is just equivalent to: $(context).find(expr)
			} else {
				return this.constructor( context ).find( selector );
			}

		// HANDLE: $(DOMElement)
		} else if ( selector.nodeType ) {
			this.context = this[ 0 ] = selector;
			this.length = 1;
			return this;

		// HANDLE: $(function)
		// Shortcut for document ready
		} else if ( jQuery.isFunction( selector ) ) {
			return typeof root.ready !== "undefined" ?
				root.ready( selector ) :

				// Execute immediately if ready is not present
				selector( jQuery );
		}

		if ( selector.selector !== undefined ) {
			this.selector = selector.selector;
			this.context = selector.context;
		}

		return jQuery.makeArray( selector, this );
	};

// Give the init function the jQuery prototype for later instantiation
init.prototype = jQuery.fn;

// Initialize central reference
rootjQuery = jQuery( document );


var rparentsprev = /^(?:parents|prev(?:Until|All))/,

	// methods guaranteed to produce a unique set when starting from a unique set
	guaranteedUnique = {
		children: true,
		contents: true,
		next: true,
		prev: true
	};

jQuery.fn.extend( {
	has: function( target ) {
		var i,
			targets = jQuery( target, this ),
			len = targets.length;

		return this.filter( function() {
			for ( i = 0; i < len; i++ ) {
				if ( jQuery.contains( this, targets[ i ] ) ) {
					return true;
				}
			}
		} );
	},

	closest: function( selectors, context ) {
		var cur,
			i = 0,
			l = this.length,
			matched = [],
			pos = rneedsContext.test( selectors ) || typeof selectors !== "string" ?
				jQuery( selectors, context || this.context ) :
				0;

		for ( ; i < l; i++ ) {
			for ( cur = this[ i ]; cur && cur !== context; cur = cur.parentNode ) {

				// Always skip document fragments
				if ( cur.nodeType < 11 && ( pos ?
					pos.index( cur ) > -1 :

					// Don't pass non-elements to Sizzle
					cur.nodeType === 1 &&
						jQuery.find.matchesSelector( cur, selectors ) ) ) {

					matched.push( cur );
					break;
				}
			}
		}

		return this.pushStack( matched.length > 1 ? jQuery.uniqueSort( matched ) : matched );
	},

	// Determine the position of an element within
	// the matched set of elements
	index: function( elem ) {

		// No argument, return index in parent
		if ( !elem ) {
			return ( this[ 0 ] && this[ 0 ].parentNode ) ? this.first().prevAll().length : -1;
		}

		// index in selector
		if ( typeof elem === "string" ) {
			return jQuery.inArray( this[ 0 ], jQuery( elem ) );
		}

		// Locate the position of the desired element
		return jQuery.inArray(

			// If it receives a jQuery object, the first element is used
			elem.jquery ? elem[ 0 ] : elem, this );
	},

	add: function( selector, context ) {
		return this.pushStack(
			jQuery.uniqueSort(
				jQuery.merge( this.get(), jQuery( selector, context ) )
			)
		);
	},

	addBack: function( selector ) {
		return this.add( selector == null ?
			this.prevObject : this.prevObject.filter( selector )
		);
	}
} );

function sibling( cur, dir ) {
	do {
		cur = cur[ dir ];
	} while ( cur && cur.nodeType !== 1 );

	return cur;
}

jQuery.each( {
	parent: function( elem ) {
		var parent = elem.parentNode;
		return parent && parent.nodeType !== 11 ? parent : null;
	},
	parents: function( elem ) {
		return dir( elem, "parentNode" );
	},
	parentsUntil: function( elem, i, until ) {
		return dir( elem, "parentNode", until );
	},
	next: function( elem ) {
		return sibling( elem, "nextSibling" );
	},
	prev: function( elem ) {
		return sibling( elem, "previousSibling" );
	},
	nextAll: function( elem ) {
		return dir( elem, "nextSibling" );
	},
	prevAll: function( elem ) {
		return dir( elem, "previousSibling" );
	},
	nextUntil: function( elem, i, until ) {
		return dir( elem, "nextSibling", until );
	},
	prevUntil: function( elem, i, until ) {
		return dir( elem, "previousSibling", until );
	},
	siblings: function( elem ) {
		return siblings( ( elem.parentNode || {} ).firstChild, elem );
	},
	children: function( elem ) {
		return siblings( elem.firstChild );
	},
	contents: function( elem ) {
		return jQuery.nodeName( elem, "iframe" ) ?
			elem.contentDocument || elem.contentWindow.document :
			jQuery.merge( [], elem.childNodes );
	}
}, function( name, fn ) {
	jQuery.fn[ name ] = function( until, selector ) {
		var ret = jQuery.map( this, fn, until );

		if ( name.slice( -5 ) !== "Until" ) {
			selector = until;
		}

		if ( selector && typeof selector === "string" ) {
			ret = jQuery.filter( selector, ret );
		}

		if ( this.length > 1 ) {

			// Remove duplicates
			if ( !guaranteedUnique[ name ] ) {
				ret = jQuery.uniqueSort( ret );
			}

			// Reverse order for parents* and prev-derivatives
			if ( rparentsprev.test( name ) ) {
				ret = ret.reverse();
			}
		}

		return this.pushStack( ret );
	};
} );
var rnotwhite = ( /\S+/g );



// Convert String-formatted options into Object-formatted ones
function createOptions( options ) {
	var object = {};
	jQuery.each( options.match( rnotwhite ) || [], function( _, flag ) {
		object[ flag ] = true;
	} );
	return object;
}

/*
 * Create a callback list using the following parameters:
 *
 *	options: an optional list of space-separated options that will change how
 *			the callback list behaves or a more traditional option object
 *
 * By default a callback list will act like an event callback list and can be
 * "fired" multiple times.
 *
 * Possible options:
 *
 *	once:			will ensure the callback list can only be fired once (like a Deferred)
 *
 *	memory:			will keep track of previous values and will call any callback added
 *					after the list has been fired right away with the latest "memorized"
 *					values (like a Deferred)
 *
 *	unique:			will ensure a callback can only be added once (no duplicate in the list)
 *
 *	stopOnFalse:	interrupt callings when a callback returns false
 *
 */
jQuery.Callbacks = function( options ) {

	// Convert options from String-formatted to Object-formatted if needed
	// (we check in cache first)
	options = typeof options === "string" ?
		createOptions( options ) :
		jQuery.extend( {}, options );

	var // Flag to know if list is currently firing
		firing,

		// Last fire value for non-forgettable lists
		memory,

		// Flag to know if list was already fired
		fired,

		// Flag to prevent firing
		locked,

		// Actual callback list
		list = [],

		// Queue of execution data for repeatable lists
		queue = [],

		// Index of currently firing callback (modified by add/remove as needed)
		firingIndex = -1,

		// Fire callbacks
		fire = function() {

			// Enforce single-firing
			locked = options.once;

			// Execute callbacks for all pending executions,
			// respecting firingIndex overrides and runtime changes
			fired = firing = true;
			for ( ; queue.length; firingIndex = -1 ) {
				memory = queue.shift();
				while ( ++firingIndex < list.length ) {

					// Run callback and check for early termination
					if ( list[ firingIndex ].apply( memory[ 0 ], memory[ 1 ] ) === false &&
						options.stopOnFalse ) {

						// Jump to end and forget the data so .add doesn't re-fire
						firingIndex = list.length;
						memory = false;
					}
				}
			}

			// Forget the data if we're done with it
			if ( !options.memory ) {
				memory = false;
			}

			firing = false;

			// Clean up if we're done firing for good
			if ( locked ) {

				// Keep an empty list if we have data for future add calls
				if ( memory ) {
					list = [];

				// Otherwise, this object is spent
				} else {
					list = "";
				}
			}
		},

		// Actual Callbacks object
		self = {

			// Add a callback or a collection of callbacks to the list
			add: function() {
				if ( list ) {

					// If we have memory from a past run, we should fire after adding
					if ( memory && !firing ) {
						firingIndex = list.length - 1;
						queue.push( memory );
					}

					( function add( args ) {
						jQuery.each( args, function( _, arg ) {
							if ( jQuery.isFunction( arg ) ) {
								if ( !options.unique || !self.has( arg ) ) {
									list.push( arg );
								}
							} else if ( arg && arg.length && jQuery.type( arg ) !== "string" ) {

								// Inspect recursively
								add( arg );
							}
						} );
					} )( arguments );

					if ( memory && !firing ) {
						fire();
					}
				}
				return this;
			},

			// Remove a callback from the list
			remove: function() {
				jQuery.each( arguments, function( _, arg ) {
					var index;
					while ( ( index = jQuery.inArray( arg, list, index ) ) > -1 ) {
						list.splice( index, 1 );

						// Handle firing indexes
						if ( index <= firingIndex ) {
							firingIndex--;
						}
					}
				} );
				return this;
			},

			// Check if a given callback is in the list.
			// If no argument is given, return whether or not list has callbacks attached.
			has: function( fn ) {
				return fn ?
					jQuery.inArray( fn, list ) > -1 :
					list.length > 0;
			},

			// Remove all callbacks from the list
			empty: function() {
				if ( list ) {
					list = [];
				}
				return this;
			},

			// Disable .fire and .add
			// Abort any current/pending executions
			// Clear all callbacks and values
			disable: function() {
				locked = queue = [];
				list = memory = "";
				return this;
			},
			disabled: function() {
				return !list;
			},

			// Disable .fire
			// Also disable .add unless we have memory (since it would have no effect)
			// Abort any pending executions
			lock: function() {
				locked = true;
				if ( !memory ) {
					self.disable();
				}
				return this;
			},
			locked: function() {
				return !!locked;
			},

			// Call all callbacks with the given context and arguments
			fireWith: function( context, args ) {
				if ( !locked ) {
					args = args || [];
					args = [ context, args.slice ? args.slice() : args ];
					queue.push( args );
					if ( !firing ) {
						fire();
					}
				}
				return this;
			},

			// Call all the callbacks with the given arguments
			fire: function() {
				self.fireWith( this, arguments );
				return this;
			},

			// To know if the callbacks have already been called at least once
			fired: function() {
				return !!fired;
			}
		};

	return self;
};


jQuery.extend( {

	Deferred: function( func ) {
		var tuples = [

				// action, add listener, listener list, final state
				[ "resolve", "done", jQuery.Callbacks( "once memory" ), "resolved" ],
				[ "reject", "fail", jQuery.Callbacks( "once memory" ), "rejected" ],
				[ "notify", "progress", jQuery.Callbacks( "memory" ) ]
			],
			state = "pending",
			promise = {
				state: function() {
					return state;
				},
				always: function() {
					deferred.done( arguments ).fail( arguments );
					return this;
				},
				then: function( /* fnDone, fnFail, fnProgress */ ) {
					var fns = arguments;
					return jQuery.Deferred( function( newDefer ) {
						jQuery.each( tuples, function( i, tuple ) {
							var fn = jQuery.isFunction( fns[ i ] ) && fns[ i ];

							// deferred[ done | fail | progress ] for forwarding actions to newDefer
							deferred[ tuple[ 1 ] ]( function() {
								var returned = fn && fn.apply( this, arguments );
								if ( returned && jQuery.isFunction( returned.promise ) ) {
									returned.promise()
										.progress( newDefer.notify )
										.done( newDefer.resolve )
										.fail( newDefer.reject );
								} else {
									newDefer[ tuple[ 0 ] + "With" ](
										this === promise ? newDefer.promise() : this,
										fn ? [ returned ] : arguments
									);
								}
							} );
						} );
						fns = null;
					} ).promise();
				},

				// Get a promise for this deferred
				// If obj is provided, the promise aspect is added to the object
				promise: function( obj ) {
					return obj != null ? jQuery.extend( obj, promise ) : promise;
				}
			},
			deferred = {};

		// Keep pipe for back-compat
		promise.pipe = promise.then;

		// Add list-specific methods
		jQuery.each( tuples, function( i, tuple ) {
			var list = tuple[ 2 ],
				stateString = tuple[ 3 ];

			// promise[ done | fail | progress ] = list.add
			promise[ tuple[ 1 ] ] = list.add;

			// Handle state
			if ( stateString ) {
				list.add( function() {

					// state = [ resolved | rejected ]
					state = stateString;

				// [ reject_list | resolve_list ].disable; progress_list.lock
				}, tuples[ i ^ 1 ][ 2 ].disable, tuples[ 2 ][ 2 ].lock );
			}

			// deferred[ resolve | reject | notify ]
			deferred[ tuple[ 0 ] ] = function() {
				deferred[ tuple[ 0 ] + "With" ]( this === deferred ? promise : this, arguments );
				return this;
			};
			deferred[ tuple[ 0 ] + "With" ] = list.fireWith;
		} );

		// Make the deferred a promise
		promise.promise( deferred );

		// Call given func if any
		if ( func ) {
			func.call( deferred, deferred );
		}

		// All done!
		return deferred;
	},

	// Deferred helper
	when: function( subordinate /* , ..., subordinateN */ ) {
		var i = 0,
			resolveValues = slice.call( arguments ),
			length = resolveValues.length,

			// the count of uncompleted subordinates
			remaining = length !== 1 ||
				( subordinate && jQuery.isFunction( subordinate.promise ) ) ? length : 0,

			// the master Deferred.
			// If resolveValues consist of only a single Deferred, just use that.
			deferred = remaining === 1 ? subordinate : jQuery.Deferred(),

			// Update function for both resolve and progress values
			updateFunc = function( i, contexts, values ) {
				return function( value ) {
					contexts[ i ] = this;
					values[ i ] = arguments.length > 1 ? slice.call( arguments ) : value;
					if ( values === progressValues ) {
						deferred.notifyWith( contexts, values );

					} else if ( !( --remaining ) ) {
						deferred.resolveWith( contexts, values );
					}
				};
			},

			progressValues, progressContexts, resolveContexts;

		// add listeners to Deferred subordinates; treat others as resolved
		if ( length > 1 ) {
			progressValues = new Array( length );
			progressContexts = new Array( length );
			resolveContexts = new Array( length );
			for ( ; i < length; i++ ) {
				if ( resolveValues[ i ] && jQuery.isFunction( resolveValues[ i ].promise ) ) {
					resolveValues[ i ].promise()
						.progress( updateFunc( i, progressContexts, progressValues ) )
						.done( updateFunc( i, resolveContexts, resolveValues ) )
						.fail( deferred.reject );
				} else {
					--remaining;
				}
			}
		}

		// if we're not waiting on anything, resolve the master
		if ( !remaining ) {
			deferred.resolveWith( resolveContexts, resolveValues );
		}

		return deferred.promise();
	}
} );


// The deferred used on DOM ready
var readyList;

jQuery.fn.ready = function( fn ) {

	// Add the callback
	jQuery.ready.promise().done( fn );

	return this;
};

jQuery.extend( {

	// Is the DOM ready to be used? Set to true once it occurs.
	isReady: false,

	// A counter to track how many items to wait for before
	// the ready event fires. See #6781
	readyWait: 1,

	// Hold (or release) the ready event
	holdReady: function( hold ) {
		if ( hold ) {
			jQuery.readyWait++;
		} else {
			jQuery.ready( true );
		}
	},

	// Handle when the DOM is ready
	ready: function( wait ) {

		// Abort if there are pending holds or we're already ready
		if ( wait === true ? --jQuery.readyWait : jQuery.isReady ) {
			return;
		}

		// Remember that the DOM is ready
		jQuery.isReady = true;

		// If a normal DOM Ready event fired, decrement, and wait if need be
		if ( wait !== true && --jQuery.readyWait > 0 ) {
			return;
		}

		// If there are functions bound, to execute
		readyList.resolveWith( document, [ jQuery ] );

		// Trigger any bound ready events
		if ( jQuery.fn.triggerHandler ) {
			jQuery( document ).triggerHandler( "ready" );
			jQuery( document ).off( "ready" );
		}
	}
} );

/**
 * Clean-up method for dom ready events
 */
function detach() {
	if ( document.addEventListener ) {
		document.removeEventListener( "DOMContentLoaded", completed );
		window.removeEventListener( "load", completed );

	} else {
		document.detachEvent( "onreadystatechange", completed );
		window.detachEvent( "onload", completed );
	}
}

/**
 * The ready event handler and self cleanup method
 */
function completed() {

	// readyState === "complete" is good enough for us to call the dom ready in oldIE
	if ( document.addEventListener ||
		window.event.type === "load" ||
		document.readyState === "complete" ) {

		detach();
		jQuery.ready();
	}
}

jQuery.ready.promise = function( obj ) {
	if ( !readyList ) {

		readyList = jQuery.Deferred();

		// Catch cases where $(document).ready() is called
		// after the browser event has already occurred.
		// Support: IE6-10
		// Older IE sometimes signals "interactive" too soon
		if ( document.readyState === "complete" ||
			( document.readyState !== "loading" && !document.documentElement.doScroll ) ) {

			// Handle it asynchronously to allow scripts the opportunity to delay ready
			window.setTimeout( jQuery.ready );

		// Standards-based browsers support DOMContentLoaded
		} else if ( document.addEventListener ) {

			// Use the handy event callback
			document.addEventListener( "DOMContentLoaded", completed );

			// A fallback to window.onload, that will always work
			window.addEventListener( "load", completed );

		// If IE event model is used
		} else {

			// Ensure firing before onload, maybe late but safe also for iframes
			document.attachEvent( "onreadystatechange", completed );

			// A fallback to window.onload, that will always work
			window.attachEvent( "onload", completed );

			// If IE and not a frame
			// continually check to see if the document is ready
			var top = false;

			try {
				top = window.frameElement == null && document.documentElement;
			} catch ( e ) {}

			if ( top && top.doScroll ) {
				( function doScrollCheck() {
					if ( !jQuery.isReady ) {

						try {

							// Use the trick by Diego Perini
							// http://javascript.nwbox.com/IEContentLoaded/
							top.doScroll( "left" );
						} catch ( e ) {
							return window.setTimeout( doScrollCheck, 50 );
						}

						// detach all dom ready events
						detach();

						// and execute any waiting functions
						jQuery.ready();
					}
				} )();
			}
		}
	}
	return readyList.promise( obj );
};

// Kick off the DOM ready check even if the user does not
jQuery.ready.promise();




// Support: IE<9
// Iteration over object's inherited properties before its own
var i;
for ( i in jQuery( support ) ) {
	break;
}
support.ownFirst = i === "0";

// Note: most support tests are defined in their respective modules.
// false until the test is run
support.inlineBlockNeedsLayout = false;

// Execute ASAP in case we need to set body.style.zoom
jQuery( function() {

	// Minified: var a,b,c,d
	var val, div, body, container;

	body = document.getElementsByTagName( "body" )[ 0 ];
	if ( !body || !body.style ) {

		// Return for frameset docs that don't have a body
		return;
	}

	// Setup
	div = document.createElement( "div" );
	container = document.createElement( "div" );
	container.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px";
	body.appendChild( container ).appendChild( div );

	if ( typeof div.style.zoom !== "undefined" ) {

		// Support: IE<8
		// Check if natively block-level elements act like inline-block
		// elements when setting their display to 'inline' and giving
		// them layout
		div.style.cssText = "display:inline;margin:0;border:0;padding:1px;width:1px;zoom:1";

		support.inlineBlockNeedsLayout = val = div.offsetWidth === 3;
		if ( val ) {

			// Prevent IE 6 from affecting layout for positioned elements #11048
			// Prevent IE from shrinking the body in IE 7 mode #12869
			// Support: IE<8
			body.style.zoom = 1;
		}
	}

	body.removeChild( container );
} );


( function() {
	var div = document.createElement( "div" );

	// Support: IE<9
	support.deleteExpando = true;
	try {
		delete div.test;
	} catch ( e ) {
		support.deleteExpando = false;
	}

	// Null elements to avoid leaks in IE.
	div = null;
} )();
var acceptData = function( elem ) {
	var noData = jQuery.noData[ ( elem.nodeName + " " ).toLowerCase() ],
		nodeType = +elem.nodeType || 1;

	// Do not set data on non-element DOM nodes because it will not be cleared (#8335).
	return nodeType !== 1 && nodeType !== 9 ?
		false :

		// Nodes accept data unless otherwise specified; rejection can be conditional
		!noData || noData !== true && elem.getAttribute( "classid" ) === noData;
};




var rbrace = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
	rmultiDash = /([A-Z])/g;

function dataAttr( elem, key, data ) {

	// If nothing was found internally, try to fetch any
	// data from the HTML5 data-* attribute
	if ( data === undefined && elem.nodeType === 1 ) {

		var name = "data-" + key.replace( rmultiDash, "-$1" ).toLowerCase();

		data = elem.getAttribute( name );

		if ( typeof data === "string" ) {
			try {
				data = data === "true" ? true :
					data === "false" ? false :
					data === "null" ? null :

					// Only convert to a number if it doesn't change the string
					+data + "" === data ? +data :
					rbrace.test( data ) ? jQuery.parseJSON( data ) :
					data;
			} catch ( e ) {}

			// Make sure we set the data so it isn't changed later
			jQuery.data( elem, key, data );

		} else {
			data = undefined;
		}
	}

	return data;
}

// checks a cache object for emptiness
function isEmptyDataObject( obj ) {
	var name;
	for ( name in obj ) {

		// if the public data object is empty, the private is still empty
		if ( name === "data" && jQuery.isEmptyObject( obj[ name ] ) ) {
			continue;
		}
		if ( name !== "toJSON" ) {
			return false;
		}
	}

	return true;
}

function internalData( elem, name, data, pvt /* Internal Use Only */ ) {
	if ( !acceptData( elem ) ) {
		return;
	}

	var ret, thisCache,
		internalKey = jQuery.expando,

		// We have to handle DOM nodes and JS objects differently because IE6-7
		// can't GC object references properly across the DOM-JS boundary
		isNode = elem.nodeType,

		// Only DOM nodes need the global jQuery cache; JS object data is
		// attached directly to the object so GC can occur automatically
		cache = isNode ? jQuery.cache : elem,

		// Only defining an ID for JS objects if its cache already exists allows
		// the code to shortcut on the same path as a DOM node with no cache
		id = isNode ? elem[ internalKey ] : elem[ internalKey ] && internalKey;

	// Avoid doing any more work than we need to when trying to get data on an
	// object that has no data at all
	if ( ( !id || !cache[ id ] || ( !pvt && !cache[ id ].data ) ) &&
		data === undefined && typeof name === "string" ) {
		return;
	}

	if ( !id ) {

		// Only DOM nodes need a new unique ID for each element since their data
		// ends up in the global cache
		if ( isNode ) {
			id = elem[ internalKey ] = deletedIds.pop() || jQuery.guid++;
		} else {
			id = internalKey;
		}
	}

	if ( !cache[ id ] ) {

		// Avoid exposing jQuery metadata on plain JS objects when the object
		// is serialized using JSON.stringify
		cache[ id ] = isNode ? {} : { toJSON: jQuery.noop };
	}

	// An object can be passed to jQuery.data instead of a key/value pair; this gets
	// shallow copied over onto the existing cache
	if ( typeof name === "object" || typeof name === "function" ) {
		if ( pvt ) {
			cache[ id ] = jQuery.extend( cache[ id ], name );
		} else {
			cache[ id ].data = jQuery.extend( cache[ id ].data, name );
		}
	}

	thisCache = cache[ id ];

	// jQuery data() is stored in a separate object inside the object's internal data
	// cache in order to avoid key collisions between internal data and user-defined
	// data.
	if ( !pvt ) {
		if ( !thisCache.data ) {
			thisCache.data = {};
		}

		thisCache = thisCache.data;
	}

	if ( data !== undefined ) {
		thisCache[ jQuery.camelCase( name ) ] = data;
	}

	// Check for both converted-to-camel and non-converted data property names
	// If a data property was specified
	if ( typeof name === "string" ) {

		// First Try to find as-is property data
		ret = thisCache[ name ];

		// Test for null|undefined property data
		if ( ret == null ) {

			// Try to find the camelCased property
			ret = thisCache[ jQuery.camelCase( name ) ];
		}
	} else {
		ret = thisCache;
	}

	return ret;
}

function internalRemoveData( elem, name, pvt ) {
	if ( !acceptData( elem ) ) {
		return;
	}

	var thisCache, i,
		isNode = elem.nodeType,

		// See jQuery.data for more information
		cache = isNode ? jQuery.cache : elem,
		id = isNode ? elem[ jQuery.expando ] : jQuery.expando;

	// If there is already no cache entry for this object, there is no
	// purpose in continuing
	if ( !cache[ id ] ) {
		return;
	}

	if ( name ) {

		thisCache = pvt ? cache[ id ] : cache[ id ].data;

		if ( thisCache ) {

			// Support array or space separated string names for data keys
			if ( !jQuery.isArray( name ) ) {

				// try the string as a key before any manipulation
				if ( name in thisCache ) {
					name = [ name ];
				} else {

					// split the camel cased version by spaces unless a key with the spaces exists
					name = jQuery.camelCase( name );
					if ( name in thisCache ) {
						name = [ name ];
					} else {
						name = name.split( " " );
					}
				}
			} else {

				// If "name" is an array of keys...
				// When data is initially created, via ("key", "val") signature,
				// keys will be converted to camelCase.
				// Since there is no way to tell _how_ a key was added, remove
				// both plain key and camelCase key. #12786
				// This will only penalize the array argument path.
				name = name.concat( jQuery.map( name, jQuery.camelCase ) );
			}

			i = name.length;
			while ( i-- ) {
				delete thisCache[ name[ i ] ];
			}

			// If there is no data left in the cache, we want to continue
			// and let the cache object itself get destroyed
			if ( pvt ? !isEmptyDataObject( thisCache ) : !jQuery.isEmptyObject( thisCache ) ) {
				return;
			}
		}
	}

	// See jQuery.data for more information
	if ( !pvt ) {
		delete cache[ id ].data;

		// Don't destroy the parent cache unless the internal data object
		// had been the only thing left in it
		if ( !isEmptyDataObject( cache[ id ] ) ) {
			return;
		}
	}

	// Destroy the cache
	if ( isNode ) {
		jQuery.cleanData( [ elem ], true );

	// Use delete when supported for expandos or `cache` is not a window per isWindow (#10080)
	/* jshint eqeqeq: false */
	} else if ( support.deleteExpando || cache != cache.window ) {
		/* jshint eqeqeq: true */
		delete cache[ id ];

	// When all else fails, undefined
	} else {
		cache[ id ] = undefined;
	}
}

jQuery.extend( {
	cache: {},

	// The following elements (space-suffixed to avoid Object.prototype collisions)
	// throw uncatchable exceptions if you attempt to set expando properties
	noData: {
		"applet ": true,
		"embed ": true,

		// ...but Flash objects (which have this classid) *can* handle expandos
		"object ": "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"
	},

	hasData: function( elem ) {
		elem = elem.nodeType ? jQuery.cache[ elem[ jQuery.expando ] ] : elem[ jQuery.expando ];
		return !!elem && !isEmptyDataObject( elem );
	},

	data: function( elem, name, data ) {
		return internalData( elem, name, data );
	},

	removeData: function( elem, name ) {
		return internalRemoveData( elem, name );
	},

	// For internal use only.
	_data: function( elem, name, data ) {
		return internalData( elem, name, data, true );
	},

	_removeData: function( elem, name ) {
		return internalRemoveData( elem, name, true );
	}
} );

jQuery.fn.extend( {
	data: function( key, value ) {
		var i, name, data,
			elem = this[ 0 ],
			attrs = elem && elem.attributes;

		// Special expections of .data basically thwart jQuery.access,
		// so implement the relevant behavior ourselves

		// Gets all values
		if ( key === undefined ) {
			if ( this.length ) {
				data = jQuery.data( elem );

				if ( elem.nodeType === 1 && !jQuery._data( elem, "parsedAttrs" ) ) {
					i = attrs.length;
					while ( i-- ) {

						// Support: IE11+
						// The attrs elements can be null (#14894)
						if ( attrs[ i ] ) {
							name = attrs[ i ].name;
							if ( name.indexOf( "data-" ) === 0 ) {
								name = jQuery.camelCase( name.slice( 5 ) );
								dataAttr( elem, name, data[ name ] );
							}
						}
					}
					jQuery._data( elem, "parsedAttrs", true );
				}
			}

			return data;
		}

		// Sets multiple values
		if ( typeof key === "object" ) {
			return this.each( function() {
				jQuery.data( this, key );
			} );
		}

		return arguments.length > 1 ?

			// Sets one value
			this.each( function() {
				jQuery.data( this, key, value );
			} ) :

			// Gets one value
			// Try to fetch any internally stored data first
			elem ? dataAttr( elem, key, jQuery.data( elem, key ) ) : undefined;
	},

	removeData: function( key ) {
		return this.each( function() {
			jQuery.removeData( this, key );
		} );
	}
} );


jQuery.extend( {
	queue: function( elem, type, data ) {
		var queue;

		if ( elem ) {
			type = ( type || "fx" ) + "queue";
			queue = jQuery._data( elem, type );

			// Speed up dequeue by getting out quickly if this is just a lookup
			if ( data ) {
				if ( !queue || jQuery.isArray( data ) ) {
					queue = jQuery._data( elem, type, jQuery.makeArray( data ) );
				} else {
					queue.push( data );
				}
			}
			return queue || [];
		}
	},

	dequeue: function( elem, type ) {
		type = type || "fx";

		var queue = jQuery.queue( elem, type ),
			startLength = queue.length,
			fn = queue.shift(),
			hooks = jQuery._queueHooks( elem, type ),
			next = function() {
				jQuery.dequeue( elem, type );
			};

		// If the fx queue is dequeued, always remove the progress sentinel
		if ( fn === "inprogress" ) {
			fn = queue.shift();
			startLength--;
		}

		if ( fn ) {

			// Add a progress sentinel to prevent the fx queue from being
			// automatically dequeued
			if ( type === "fx" ) {
				queue.unshift( "inprogress" );
			}

			// clear up the last queue stop function
			delete hooks.stop;
			fn.call( elem, next, hooks );
		}

		if ( !startLength && hooks ) {
			hooks.empty.fire();
		}
	},

	// not intended for public consumption - generates a queueHooks object,
	// or returns the current one
	_queueHooks: function( elem, type ) {
		var key = type + "queueHooks";
		return jQuery._data( elem, key ) || jQuery._data( elem, key, {
			empty: jQuery.Callbacks( "once memory" ).add( function() {
				jQuery._removeData( elem, type + "queue" );
				jQuery._removeData( elem, key );
			} )
		} );
	}
} );

jQuery.fn.extend( {
	queue: function( type, data ) {
		var setter = 2;

		if ( typeof type !== "string" ) {
			data = type;
			type = "fx";
			setter--;
		}

		if ( arguments.length < setter ) {
			return jQuery.queue( this[ 0 ], type );
		}

		return data === undefined ?
			this :
			this.each( function() {
				var queue = jQuery.queue( this, type, data );

				// ensure a hooks for this queue
				jQuery._queueHooks( this, type );

				if ( type === "fx" && queue[ 0 ] !== "inprogress" ) {
					jQuery.dequeue( this, type );
				}
			} );
	},
	dequeue: function( type ) {
		return this.each( function() {
			jQuery.dequeue( this, type );
		} );
	},
	clearQueue: function( type ) {
		return this.queue( type || "fx", [] );
	},

	// Get a promise resolved when queues of a certain type
	// are emptied (fx is the type by default)
	promise: function( type, obj ) {
		var tmp,
			count = 1,
			defer = jQuery.Deferred(),
			elements = this,
			i = this.length,
			resolve = function() {
				if ( !( --count ) ) {
					defer.resolveWith( elements, [ elements ] );
				}
			};

		if ( typeof type !== "string" ) {
			obj = type;
			type = undefined;
		}
		type = type || "fx";

		while ( i-- ) {
			tmp = jQuery._data( elements[ i ], type + "queueHooks" );
			if ( tmp && tmp.empty ) {
				count++;
				tmp.empty.add( resolve );
			}
		}
		resolve();
		return defer.promise( obj );
	}
} );


( function() {
	var shrinkWrapBlocksVal;

	support.shrinkWrapBlocks = function() {
		if ( shrinkWrapBlocksVal != null ) {
			return shrinkWrapBlocksVal;
		}

		// Will be changed later if needed.
		shrinkWrapBlocksVal = false;

		// Minified: var b,c,d
		var div, body, container;

		body = document.getElementsByTagName( "body" )[ 0 ];
		if ( !body || !body.style ) {

			// Test fired too early or in an unsupported environment, exit.
			return;
		}

		// Setup
		div = document.createElement( "div" );
		container = document.createElement( "div" );
		container.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px";
		body.appendChild( container ).appendChild( div );

		// Support: IE6
		// Check if elements with layout shrink-wrap their children
		if ( typeof div.style.zoom !== "undefined" ) {

			// Reset CSS: box-sizing; display; margin; border
			div.style.cssText =

				// Support: Firefox<29, Android 2.3
				// Vendor-prefix box-sizing
				"-webkit-box-sizing:content-box;-moz-box-sizing:content-box;" +
				"box-sizing:content-box;display:block;margin:0;border:0;" +
				"padding:1px;width:1px;zoom:1";
			div.appendChild( document.createElement( "div" ) ).style.width = "5px";
			shrinkWrapBlocksVal = div.offsetWidth !== 3;
		}

		body.removeChild( container );

		return shrinkWrapBlocksVal;
	};

} )();
var pnum = ( /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/ ).source;

var rcssNum = new RegExp( "^(?:([+-])=|)(" + pnum + ")([a-z%]*)$", "i" );


var cssExpand = [ "Top", "Right", "Bottom", "Left" ];

var isHidden = function( elem, el ) {

		// isHidden might be called from jQuery#filter function;
		// in that case, element will be second argument
		elem = el || elem;
		return jQuery.css( elem, "display" ) === "none" ||
			!jQuery.contains( elem.ownerDocument, elem );
	};



function adjustCSS( elem, prop, valueParts, tween ) {
	var adjusted,
		scale = 1,
		maxIterations = 20,
		currentValue = tween ?
			function() { return tween.cur(); } :
			function() { return jQuery.css( elem, prop, "" ); },
		initial = currentValue(),
		unit = valueParts && valueParts[ 3 ] || ( jQuery.cssNumber[ prop ] ? "" : "px" ),

		// Starting value computation is required for potential unit mismatches
		initialInUnit = ( jQuery.cssNumber[ prop ] || unit !== "px" && +initial ) &&
			rcssNum.exec( jQuery.css( elem, prop ) );

	if ( initialInUnit && initialInUnit[ 3 ] !== unit ) {

		// Trust units reported by jQuery.css
		unit = unit || initialInUnit[ 3 ];

		// Make sure we update the tween properties later on
		valueParts = valueParts || [];

		// Iteratively approximate from a nonzero starting point
		initialInUnit = +initial || 1;

		do {

			// If previous iteration zeroed out, double until we get *something*.
			// Use string for doubling so we don't accidentally see scale as unchanged below
			scale = scale || ".5";

			// Adjust and apply
			initialInUnit = initialInUnit / scale;
			jQuery.style( elem, prop, initialInUnit + unit );

		// Update scale, tolerating zero or NaN from tween.cur()
		// Break the loop if scale is unchanged or perfect, or if we've just had enough.
		} while (
			scale !== ( scale = currentValue() / initial ) && scale !== 1 && --maxIterations
		);
	}

	if ( valueParts ) {
		initialInUnit = +initialInUnit || +initial || 0;

		// Apply relative offset (+=/-=) if specified
		adjusted = valueParts[ 1 ] ?
			initialInUnit + ( valueParts[ 1 ] + 1 ) * valueParts[ 2 ] :
			+valueParts[ 2 ];
		if ( tween ) {
			tween.unit = unit;
			tween.start = initialInUnit;
			tween.end = adjusted;
		}
	}
	return adjusted;
}


// Multifunctional method to get and set values of a collection
// The value/s can optionally be executed if it's a function
var access = function( elems, fn, key, value, chainable, emptyGet, raw ) {
	var i = 0,
		length = elems.length,
		bulk = key == null;

	// Sets many values
	if ( jQuery.type( key ) === "object" ) {
		chainable = true;
		for ( i in key ) {
			access( elems, fn, i, key[ i ], true, emptyGet, raw );
		}

	// Sets one value
	} else if ( value !== undefined ) {
		chainable = true;

		if ( !jQuery.isFunction( value ) ) {
			raw = true;
		}

		if ( bulk ) {

			// Bulk operations run against the entire set
			if ( raw ) {
				fn.call( elems, value );
				fn = null;

			// ...except when executing function values
			} else {
				bulk = fn;
				fn = function( elem, key, value ) {
					return bulk.call( jQuery( elem ), value );
				};
			}
		}

		if ( fn ) {
			for ( ; i < length; i++ ) {
				fn(
					elems[ i ],
					key,
					raw ? value : value.call( elems[ i ], i, fn( elems[ i ], key ) )
				);
			}
		}
	}

	return chainable ?
		elems :

		// Gets
		bulk ?
			fn.call( elems ) :
			length ? fn( elems[ 0 ], key ) : emptyGet;
};
var rcheckableType = ( /^(?:checkbox|radio)$/i );

var rtagName = ( /<([\w:-]+)/ );

var rscriptType = ( /^$|\/(?:java|ecma)script/i );

var rleadingWhitespace = ( /^\s+/ );

var nodeNames = "abbr|article|aside|audio|bdi|canvas|data|datalist|" +
		"details|dialog|figcaption|figure|footer|header|hgroup|main|" +
		"mark|meter|nav|output|picture|progress|section|summary|template|time|video";



function createSafeFragment( document ) {
	var list = nodeNames.split( "|" ),
		safeFrag = document.createDocumentFragment();

	if ( safeFrag.createElement ) {
		while ( list.length ) {
			safeFrag.createElement(
				list.pop()
			);
		}
	}
	return safeFrag;
}


( function() {
	var div = document.createElement( "div" ),
		fragment = document.createDocumentFragment(),
		input = document.createElement( "input" );

	// Setup
	div.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>";

	// IE strips leading whitespace when .innerHTML is used
	support.leadingWhitespace = div.firstChild.nodeType === 3;

	// Make sure that tbody elements aren't automatically inserted
	// IE will insert them into empty tables
	support.tbody = !div.getElementsByTagName( "tbody" ).length;

	// Make sure that link elements get serialized correctly by innerHTML
	// This requires a wrapper element in IE
	support.htmlSerialize = !!div.getElementsByTagName( "link" ).length;

	// Makes sure cloning an html5 element does not cause problems
	// Where outerHTML is undefined, this still works
	support.html5Clone =
		document.createElement( "nav" ).cloneNode( true ).outerHTML !== "<:nav></:nav>";

	// Check if a disconnected checkbox will retain its checked
	// value of true after appended to the DOM (IE6/7)
	input.type = "checkbox";
	input.checked = true;
	fragment.appendChild( input );
	support.appendChecked = input.checked;

	// Make sure textarea (and checkbox) defaultValue is properly cloned
	// Support: IE6-IE11+
	div.innerHTML = "<textarea>x</textarea>";
	support.noCloneChecked = !!div.cloneNode( true ).lastChild.defaultValue;

	// #11217 - WebKit loses check when the name is after the checked attribute
	fragment.appendChild( div );

	// Support: Windows Web Apps (WWA)
	// `name` and `type` must use .setAttribute for WWA (#14901)
	input = document.createElement( "input" );
	input.setAttribute( "type", "radio" );
	input.setAttribute( "checked", "checked" );
	input.setAttribute( "name", "t" );

	div.appendChild( input );

	// Support: Safari 5.1, iOS 5.1, Android 4.x, Android 2.3
	// old WebKit doesn't clone checked state correctly in fragments
	support.checkClone = div.cloneNode( true ).cloneNode( true ).lastChild.checked;

	// Support: IE<9
	// Cloned elements keep attachEvent handlers, we use addEventListener on IE9+
	support.noCloneEvent = !!div.addEventListener;

	// Support: IE<9
	// Since attributes and properties are the same in IE,
	// cleanData must set properties to undefined rather than use removeAttribute
	div[ jQuery.expando ] = 1;
	support.attributes = !div.getAttribute( jQuery.expando );
} )();


// We have to close these tags to support XHTML (#13200)
var wrapMap = {
	option: [ 1, "<select multiple='multiple'>", "</select>" ],
	legend: [ 1, "<fieldset>", "</fieldset>" ],
	area: [ 1, "<map>", "</map>" ],

	// Support: IE8
	param: [ 1, "<object>", "</object>" ],
	thead: [ 1, "<table>", "</table>" ],
	tr: [ 2, "<table><tbody>", "</tbody></table>" ],
	col: [ 2, "<table><tbody></tbody><colgroup>", "</colgroup></table>" ],
	td: [ 3, "<table><tbody><tr>", "</tr></tbody></table>" ],

	// IE6-8 can't serialize link, script, style, or any html5 (NoScope) tags,
	// unless wrapped in a div with non-breaking characters in front of it.
	_default: support.htmlSerialize ? [ 0, "", "" ] : [ 1, "X<div>", "</div>" ]
};

// Support: IE8-IE9
wrapMap.optgroup = wrapMap.option;

wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
wrapMap.th = wrapMap.td;


function getAll( context, tag ) {
	var elems, elem,
		i = 0,
		found = typeof context.getElementsByTagName !== "undefined" ?
			context.getElementsByTagName( tag || "*" ) :
			typeof context.querySelectorAll !== "undefined" ?
				context.querySelectorAll( tag || "*" ) :
				undefined;

	if ( !found ) {
		for ( found = [], elems = context.childNodes || context;
			( elem = elems[ i ] ) != null;
			i++
		) {
			if ( !tag || jQuery.nodeName( elem, tag ) ) {
				found.push( elem );
			} else {
				jQuery.merge( found, getAll( elem, tag ) );
			}
		}
	}

	return tag === undefined || tag && jQuery.nodeName( context, tag ) ?
		jQuery.merge( [ context ], found ) :
		found;
}


// Mark scripts as having already been evaluated
function setGlobalEval( elems, refElements ) {
	var elem,
		i = 0;
	for ( ; ( elem = elems[ i ] ) != null; i++ ) {
		jQuery._data(
			elem,
			"globalEval",
			!refElements || jQuery._data( refElements[ i ], "globalEval" )
		);
	}
}


var rhtml = /<|&#?\w+;/,
	rtbody = /<tbody/i;

function fixDefaultChecked( elem ) {
	if ( rcheckableType.test( elem.type ) ) {
		elem.defaultChecked = elem.checked;
	}
}

function buildFragment( elems, context, scripts, selection, ignored ) {
	var j, elem, contains,
		tmp, tag, tbody, wrap,
		l = elems.length,

		// Ensure a safe fragment
		safe = createSafeFragment( context ),

		nodes = [],
		i = 0;

	for ( ; i < l; i++ ) {
		elem = elems[ i ];

		if ( elem || elem === 0 ) {

			// Add nodes directly
			if ( jQuery.type( elem ) === "object" ) {
				jQuery.merge( nodes, elem.nodeType ? [ elem ] : elem );

			// Convert non-html into a text node
			} else if ( !rhtml.test( elem ) ) {
				nodes.push( context.createTextNode( elem ) );

			// Convert html into DOM nodes
			} else {
				tmp = tmp || safe.appendChild( context.createElement( "div" ) );

				// Deserialize a standard representation
				tag = ( rtagName.exec( elem ) || [ "", "" ] )[ 1 ].toLowerCase();
				wrap = wrapMap[ tag ] || wrapMap._default;

				tmp.innerHTML = wrap[ 1 ] + jQuery.htmlPrefilter( elem ) + wrap[ 2 ];

				// Descend through wrappers to the right content
				j = wrap[ 0 ];
				while ( j-- ) {
					tmp = tmp.lastChild;
				}

				// Manually add leading whitespace removed by IE
				if ( !support.leadingWhitespace && rleadingWhitespace.test( elem ) ) {
					nodes.push( context.createTextNode( rleadingWhitespace.exec( elem )[ 0 ] ) );
				}

				// Remove IE's autoinserted <tbody> from table fragments
				if ( !support.tbody ) {

					// String was a <table>, *may* have spurious <tbody>
					elem = tag === "table" && !rtbody.test( elem ) ?
						tmp.firstChild :

						// String was a bare <thead> or <tfoot>
						wrap[ 1 ] === "<table>" && !rtbody.test( elem ) ?
							tmp :
							0;

					j = elem && elem.childNodes.length;
					while ( j-- ) {
						if ( jQuery.nodeName( ( tbody = elem.childNodes[ j ] ), "tbody" ) &&
							!tbody.childNodes.length ) {

							elem.removeChild( tbody );
						}
					}
				}

				jQuery.merge( nodes, tmp.childNodes );

				// Fix #12392 for WebKit and IE > 9
				tmp.textContent = "";

				// Fix #12392 for oldIE
				while ( tmp.firstChild ) {
					tmp.removeChild( tmp.firstChild );
				}

				// Remember the top-level container for proper cleanup
				tmp = safe.lastChild;
			}
		}
	}

	// Fix #11356: Clear elements from fragment
	if ( tmp ) {
		safe.removeChild( tmp );
	}

	// Reset defaultChecked for any radios and checkboxes
	// about to be appended to the DOM in IE 6/7 (#8060)
	if ( !support.appendChecked ) {
		jQuery.grep( getAll( nodes, "input" ), fixDefaultChecked );
	}

	i = 0;
	while ( ( elem = nodes[ i++ ] ) ) {

		// Skip elements already in the context collection (trac-4087)
		if ( selection && jQuery.inArray( elem, selection ) > -1 ) {
			if ( ignored ) {
				ignored.push( elem );
			}

			continue;
		}

		contains = jQuery.contains( elem.ownerDocument, elem );

		// Append to fragment
		tmp = getAll( safe.appendChild( elem ), "script" );

		// Preserve script evaluation history
		if ( contains ) {
			setGlobalEval( tmp );
		}

		// Capture executables
		if ( scripts ) {
			j = 0;
			while ( ( elem = tmp[ j++ ] ) ) {
				if ( rscriptType.test( elem.type || "" ) ) {
					scripts.push( elem );
				}
			}
		}
	}

	tmp = null;

	return safe;
}


( function() {
	var i, eventName,
		div = document.createElement( "div" );

	// Support: IE<9 (lack submit/change bubble), Firefox (lack focus(in | out) events)
	for ( i in { submit: true, change: true, focusin: true } ) {
		eventName = "on" + i;

		if ( !( support[ i ] = eventName in window ) ) {

			// Beware of CSP restrictions (https://developer.mozilla.org/en/Security/CSP)
			div.setAttribute( eventName, "t" );
			support[ i ] = div.attributes[ eventName ].expando === false;
		}
	}

	// Null elements to avoid leaks in IE.
	div = null;
} )();


var rformElems = /^(?:input|select|textarea)$/i,
	rkeyEvent = /^key/,
	rmouseEvent = /^(?:mouse|pointer|contextmenu|drag|drop)|click/,
	rfocusMorph = /^(?:focusinfocus|focusoutblur)$/,
	rtypenamespace = /^([^.]*)(?:\.(.+)|)/;

function returnTrue() {
	return true;
}

function returnFalse() {
	return false;
}

// Support: IE9
// See #13393 for more info
function safeActiveElement() {
	try {
		return document.activeElement;
	} catch ( err ) { }
}

function on( elem, types, selector, data, fn, one ) {
	var origFn, type;

	// Types can be a map of types/handlers
	if ( typeof types === "object" ) {

		// ( types-Object, selector, data )
		if ( typeof selector !== "string" ) {

			// ( types-Object, data )
			data = data || selector;
			selector = undefined;
		}
		for ( type in types ) {
			on( elem, type, selector, data, types[ type ], one );
		}
		return elem;
	}

	if ( data == null && fn == null ) {

		// ( types, fn )
		fn = selector;
		data = selector = undefined;
	} else if ( fn == null ) {
		if ( typeof selector === "string" ) {

			// ( types, selector, fn )
			fn = data;
			data = undefined;
		} else {

			// ( types, data, fn )
			fn = data;
			data = selector;
			selector = undefined;
		}
	}
	if ( fn === false ) {
		fn = returnFalse;
	} else if ( !fn ) {
		return elem;
	}

	if ( one === 1 ) {
		origFn = fn;
		fn = function( event ) {

			// Can use an empty set, since event contains the info
			jQuery().off( event );
			return origFn.apply( this, arguments );
		};

		// Use same guid so caller can remove using origFn
		fn.guid = origFn.guid || ( origFn.guid = jQuery.guid++ );
	}
	return elem.each( function() {
		jQuery.event.add( this, types, fn, data, selector );
	} );
}

/*
 * Helper functions for managing events -- not part of the public interface.
 * Props to Dean Edwards' addEvent library for many of the ideas.
 */
jQuery.event = {

	global: {},

	add: function( elem, types, handler, data, selector ) {
		var tmp, events, t, handleObjIn,
			special, eventHandle, handleObj,
			handlers, type, namespaces, origType,
			elemData = jQuery._data( elem );

		// Don't attach events to noData or text/comment nodes (but allow plain objects)
		if ( !elemData ) {
			return;
		}

		// Caller can pass in an object of custom data in lieu of the handler
		if ( handler.handler ) {
			handleObjIn = handler;
			handler = handleObjIn.handler;
			selector = handleObjIn.selector;
		}

		// Make sure that the handler has a unique ID, used to find/remove it later
		if ( !handler.guid ) {
			handler.guid = jQuery.guid++;
		}

		// Init the element's event structure and main handler, if this is the first
		if ( !( events = elemData.events ) ) {
			events = elemData.events = {};
		}
		if ( !( eventHandle = elemData.handle ) ) {
			eventHandle = elemData.handle = function( e ) {

				// Discard the second event of a jQuery.event.trigger() and
				// when an event is called after a page has unloaded
				return typeof jQuery !== "undefined" &&
					( !e || jQuery.event.triggered !== e.type ) ?
					jQuery.event.dispatch.apply( eventHandle.elem, arguments ) :
					undefined;
			};

			// Add elem as a property of the handle fn to prevent a memory leak
			// with IE non-native events
			eventHandle.elem = elem;
		}

		// Handle multiple events separated by a space
		types = ( types || "" ).match( rnotwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[ t ] ) || [];
			type = origType = tmp[ 1 ];
			namespaces = ( tmp[ 2 ] || "" ).split( "." ).sort();

			// There *must* be a type, no attaching namespace-only handlers
			if ( !type ) {
				continue;
			}

			// If event changes its type, use the special event handlers for the changed type
			special = jQuery.event.special[ type ] || {};

			// If selector defined, determine special event api type, otherwise given type
			type = ( selector ? special.delegateType : special.bindType ) || type;

			// Update special based on newly reset type
			special = jQuery.event.special[ type ] || {};

			// handleObj is passed to all event handlers
			handleObj = jQuery.extend( {
				type: type,
				origType: origType,
				data: data,
				handler: handler,
				guid: handler.guid,
				selector: selector,
				needsContext: selector && jQuery.expr.match.needsContext.test( selector ),
				namespace: namespaces.join( "." )
			}, handleObjIn );

			// Init the event handler queue if we're the first
			if ( !( handlers = events[ type ] ) ) {
				handlers = events[ type ] = [];
				handlers.delegateCount = 0;

				// Only use addEventListener/attachEvent if the special events handler returns false
				if ( !special.setup ||
					special.setup.call( elem, data, namespaces, eventHandle ) === false ) {

					// Bind the global event handler to the element
					if ( elem.addEventListener ) {
						elem.addEventListener( type, eventHandle, false );

					} else if ( elem.attachEvent ) {
						elem.attachEvent( "on" + type, eventHandle );
					}
				}
			}

			if ( special.add ) {
				special.add.call( elem, handleObj );

				if ( !handleObj.handler.guid ) {
					handleObj.handler.guid = handler.guid;
				}
			}

			// Add to the element's handler list, delegates in front
			if ( selector ) {
				handlers.splice( handlers.delegateCount++, 0, handleObj );
			} else {
				handlers.push( handleObj );
			}

			// Keep track of which events have ever been used, for event optimization
			jQuery.event.global[ type ] = true;
		}

		// Nullify elem to prevent memory leaks in IE
		elem = null;
	},

	// Detach an event or set of events from an element
	remove: function( elem, types, handler, selector, mappedTypes ) {
		var j, handleObj, tmp,
			origCount, t, events,
			special, handlers, type,
			namespaces, origType,
			elemData = jQuery.hasData( elem ) && jQuery._data( elem );

		if ( !elemData || !( events = elemData.events ) ) {
			return;
		}

		// Once for each type.namespace in types; type may be omitted
		types = ( types || "" ).match( rnotwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[ t ] ) || [];
			type = origType = tmp[ 1 ];
			namespaces = ( tmp[ 2 ] || "" ).split( "." ).sort();

			// Unbind all events (on this namespace, if provided) for the element
			if ( !type ) {
				for ( type in events ) {
					jQuery.event.remove( elem, type + types[ t ], handler, selector, true );
				}
				continue;
			}

			special = jQuery.event.special[ type ] || {};
			type = ( selector ? special.delegateType : special.bindType ) || type;
			handlers = events[ type ] || [];
			tmp = tmp[ 2 ] &&
				new RegExp( "(^|\\.)" + namespaces.join( "\\.(?:.*\\.|)" ) + "(\\.|$)" );

			// Remove matching events
			origCount = j = handlers.length;
			while ( j-- ) {
				handleObj = handlers[ j ];

				if ( ( mappedTypes || origType === handleObj.origType ) &&
					( !handler || handler.guid === handleObj.guid ) &&
					( !tmp || tmp.test( handleObj.namespace ) ) &&
					( !selector || selector === handleObj.selector ||
						selector === "**" && handleObj.selector ) ) {
					handlers.splice( j, 1 );

					if ( handleObj.selector ) {
						handlers.delegateCount--;
					}
					if ( special.remove ) {
						special.remove.call( elem, handleObj );
					}
				}
			}

			// Remove generic event handler if we removed something and no more handlers exist
			// (avoids potential for endless recursion during removal of special event handlers)
			if ( origCount && !handlers.length ) {
				if ( !special.teardown ||
					special.teardown.call( elem, namespaces, elemData.handle ) === false ) {

					jQuery.removeEvent( elem, type, elemData.handle );
				}

				delete events[ type ];
			}
		}

		// Remove the expando if it's no longer used
		if ( jQuery.isEmptyObject( events ) ) {
			delete elemData.handle;

			// removeData also checks for emptiness and clears the expando if empty
			// so use it instead of delete
			jQuery._removeData( elem, "events" );
		}
	},

	trigger: function( event, data, elem, onlyHandlers ) {
		var handle, ontype, cur,
			bubbleType, special, tmp, i,
			eventPath = [ elem || document ],
			type = hasOwn.call( event, "type" ) ? event.type : event,
			namespaces = hasOwn.call( event, "namespace" ) ? event.namespace.split( "." ) : [];

		cur = tmp = elem = elem || document;

		// Don't do events on text and comment nodes
		if ( elem.nodeType === 3 || elem.nodeType === 8 ) {
			return;
		}

		// focus/blur morphs to focusin/out; ensure we're not firing them right now
		if ( rfocusMorph.test( type + jQuery.event.triggered ) ) {
			return;
		}

		if ( type.indexOf( "." ) > -1 ) {

			// Namespaced trigger; create a regexp to match event type in handle()
			namespaces = type.split( "." );
			type = namespaces.shift();
			namespaces.sort();
		}
		ontype = type.indexOf( ":" ) < 0 && "on" + type;

		// Caller can pass in a jQuery.Event object, Object, or just an event type string
		event = event[ jQuery.expando ] ?
			event :
			new jQuery.Event( type, typeof event === "object" && event );

		// Trigger bitmask: & 1 for native handlers; & 2 for jQuery (always true)
		event.isTrigger = onlyHandlers ? 2 : 3;
		event.namespace = namespaces.join( "." );
		event.rnamespace = event.namespace ?
			new RegExp( "(^|\\.)" + namespaces.join( "\\.(?:.*\\.|)" ) + "(\\.|$)" ) :
			null;

		// Clean up the event in case it is being reused
		event.result = undefined;
		if ( !event.target ) {
			event.target = elem;
		}

		// Clone any incoming data and prepend the event, creating the handler arg list
		data = data == null ?
			[ event ] :
			jQuery.makeArray( data, [ event ] );

		// Allow special events to draw outside the lines
		special = jQuery.event.special[ type ] || {};
		if ( !onlyHandlers && special.trigger && special.trigger.apply( elem, data ) === false ) {
			return;
		}

		// Determine event propagation path in advance, per W3C events spec (#9951)
		// Bubble up to document, then to window; watch for a global ownerDocument var (#9724)
		if ( !onlyHandlers && !special.noBubble && !jQuery.isWindow( elem ) ) {

			bubbleType = special.delegateType || type;
			if ( !rfocusMorph.test( bubbleType + type ) ) {
				cur = cur.parentNode;
			}
			for ( ; cur; cur = cur.parentNode ) {
				eventPath.push( cur );
				tmp = cur;
			}

			// Only add window if we got to document (e.g., not plain obj or detached DOM)
			if ( tmp === ( elem.ownerDocument || document ) ) {
				eventPath.push( tmp.defaultView || tmp.parentWindow || window );
			}
		}

		// Fire handlers on the event path
		i = 0;
		while ( ( cur = eventPath[ i++ ] ) && !event.isPropagationStopped() ) {

			event.type = i > 1 ?
				bubbleType :
				special.bindType || type;

			// jQuery handler
			handle = ( jQuery._data( cur, "events" ) || {} )[ event.type ] &&
				jQuery._data( cur, "handle" );

			if ( handle ) {
				handle.apply( cur, data );
			}

			// Native handler
			handle = ontype && cur[ ontype ];
			if ( handle && handle.apply && acceptData( cur ) ) {
				event.result = handle.apply( cur, data );
				if ( event.result === false ) {
					event.preventDefault();
				}
			}
		}
		event.type = type;

		// If nobody prevented the default action, do it now
		if ( !onlyHandlers && !event.isDefaultPrevented() ) {

			if (
				( !special._default ||
				 special._default.apply( eventPath.pop(), data ) === false
				) && acceptData( elem )
			) {

				// Call a native DOM method on the target with the same name name as the event.
				// Can't use an .isFunction() check here because IE6/7 fails that test.
				// Don't do default actions on window, that's where global variables be (#6170)
				if ( ontype && elem[ type ] && !jQuery.isWindow( elem ) ) {

					// Don't re-trigger an onFOO event when we call its FOO() method
					tmp = elem[ ontype ];

					if ( tmp ) {
						elem[ ontype ] = null;
					}

					// Prevent re-triggering of the same event, since we already bubbled it above
					jQuery.event.triggered = type;
					try {
						elem[ type ]();
					} catch ( e ) {

						// IE<9 dies on focus/blur to hidden element (#1486,#12518)
						// only reproducible on winXP IE8 native, not IE9 in IE8 mode
					}
					jQuery.event.triggered = undefined;

					if ( tmp ) {
						elem[ ontype ] = tmp;
					}
				}
			}
		}

		return event.result;
	},

	dispatch: function( event ) {

		// Make a writable jQuery.Event from the native event object
		event = jQuery.event.fix( event );

		var i, j, ret, matched, handleObj,
			handlerQueue = [],
			args = slice.call( arguments ),
			handlers = ( jQuery._data( this, "events" ) || {} )[ event.type ] || [],
			special = jQuery.event.special[ event.type ] || {};

		// Use the fix-ed jQuery.Event rather than the (read-only) native event
		args[ 0 ] = event;
		event.delegateTarget = this;

		// Call the preDispatch hook for the mapped type, and let it bail if desired
		if ( special.preDispatch && special.preDispatch.call( this, event ) === false ) {
			return;
		}

		// Determine handlers
		handlerQueue = jQuery.event.handlers.call( this, event, handlers );

		// Run delegates first; they may want to stop propagation beneath us
		i = 0;
		while ( ( matched = handlerQueue[ i++ ] ) && !event.isPropagationStopped() ) {
			event.currentTarget = matched.elem;

			j = 0;
			while ( ( handleObj = matched.handlers[ j++ ] ) &&
				!event.isImmediatePropagationStopped() ) {

				// Triggered event must either 1) have no namespace, or 2) have namespace(s)
				// a subset or equal to those in the bound event (both can have no namespace).
				if ( !event.rnamespace || event.rnamespace.test( handleObj.namespace ) ) {

					event.handleObj = handleObj;
					event.data = handleObj.data;

					ret = ( ( jQuery.event.special[ handleObj.origType ] || {} ).handle ||
						handleObj.handler ).apply( matched.elem, args );

					if ( ret !== undefined ) {
						if ( ( event.result = ret ) === false ) {
							event.preventDefault();
							event.stopPropagation();
						}
					}
				}
			}
		}

		// Call the postDispatch hook for the mapped type
		if ( special.postDispatch ) {
			special.postDispatch.call( this, event );
		}

		return event.result;
	},

	handlers: function( event, handlers ) {
		var i, matches, sel, handleObj,
			handlerQueue = [],
			delegateCount = handlers.delegateCount,
			cur = event.target;

		// Support (at least): Chrome, IE9
		// Find delegate handlers
		// Black-hole SVG <use> instance trees (#13180)
		//
		// Support: Firefox<=42+
		// Avoid non-left-click in FF but don't block IE radio events (#3861, gh-2343)
		if ( delegateCount && cur.nodeType &&
			( event.type !== "click" || isNaN( event.button ) || event.button < 1 ) ) {

			/* jshint eqeqeq: false */
			for ( ; cur != this; cur = cur.parentNode || this ) {
				/* jshint eqeqeq: true */

				// Don't check non-elements (#13208)
				// Don't process clicks on disabled elements (#6911, #8165, #11382, #11764)
				if ( cur.nodeType === 1 && ( cur.disabled !== true || event.type !== "click" ) ) {
					matches = [];
					for ( i = 0; i < delegateCount; i++ ) {
						handleObj = handlers[ i ];

						// Don't conflict with Object.prototype properties (#13203)
						sel = handleObj.selector + " ";

						if ( matches[ sel ] === undefined ) {
							matches[ sel ] = handleObj.needsContext ?
								jQuery( sel, this ).index( cur ) > -1 :
								jQuery.find( sel, this, null, [ cur ] ).length;
						}
						if ( matches[ sel ] ) {
							matches.push( handleObj );
						}
					}
					if ( matches.length ) {
						handlerQueue.push( { elem: cur, handlers: matches } );
					}
				}
			}
		}

		// Add the remaining (directly-bound) handlers
		if ( delegateCount < handlers.length ) {
			handlerQueue.push( { elem: this, handlers: handlers.slice( delegateCount ) } );
		}

		return handlerQueue;
	},

	fix: function( event ) {
		if ( event[ jQuery.expando ] ) {
			return event;
		}

		// Create a writable copy of the event object and normalize some properties
		var i, prop, copy,
			type = event.type,
			originalEvent = event,
			fixHook = this.fixHooks[ type ];

		if ( !fixHook ) {
			this.fixHooks[ type ] = fixHook =
				rmouseEvent.test( type ) ? this.mouseHooks :
				rkeyEvent.test( type ) ? this.keyHooks :
				{};
		}
		copy = fixHook.props ? this.props.concat( fixHook.props ) : this.props;

		event = new jQuery.Event( originalEvent );

		i = copy.length;
		while ( i-- ) {
			prop = copy[ i ];
			event[ prop ] = originalEvent[ prop ];
		}

		// Support: IE<9
		// Fix target property (#1925)
		if ( !event.target ) {
			event.target = originalEvent.srcElement || document;
		}

		// Support: Safari 6-8+
		// Target should not be a text node (#504, #13143)
		if ( event.target.nodeType === 3 ) {
			event.target = event.target.parentNode;
		}

		// Support: IE<9
		// For mouse/key events, metaKey==false if it's undefined (#3368, #11328)
		event.metaKey = !!event.metaKey;

		return fixHook.filter ? fixHook.filter( event, originalEvent ) : event;
	},

	// Includes some event props shared by KeyEvent and MouseEvent
	props: ( "altKey bubbles cancelable ctrlKey currentTarget detail eventPhase " +
		"metaKey relatedTarget shiftKey target timeStamp view which" ).split( " " ),

	fixHooks: {},

	keyHooks: {
		props: "char charCode key keyCode".split( " " ),
		filter: function( event, original ) {

			// Add which for key events
			if ( event.which == null ) {
				event.which = original.charCode != null ? original.charCode : original.keyCode;
			}

			return event;
		}
	},

	mouseHooks: {
		props: ( "button buttons clientX clientY fromElement offsetX offsetY " +
			"pageX pageY screenX screenY toElement" ).split( " " ),
		filter: function( event, original ) {
			var body, eventDoc, doc,
				button = original.button,
				fromElement = original.fromElement;

			// Calculate pageX/Y if missing and clientX/Y available
			if ( event.pageX == null && original.clientX != null ) {
				eventDoc = event.target.ownerDocument || document;
				doc = eventDoc.documentElement;
				body = eventDoc.body;

				event.pageX = original.clientX +
					( doc && doc.scrollLeft || body && body.scrollLeft || 0 ) -
					( doc && doc.clientLeft || body && body.clientLeft || 0 );
				event.pageY = original.clientY +
					( doc && doc.scrollTop  || body && body.scrollTop  || 0 ) -
					( doc && doc.clientTop  || body && body.clientTop  || 0 );
			}

			// Add relatedTarget, if necessary
			if ( !event.relatedTarget && fromElement ) {
				event.relatedTarget = fromElement === event.target ?
					original.toElement :
					fromElement;
			}

			// Add which for click: 1 === left; 2 === middle; 3 === right
			// Note: button is not normalized, so don't use it
			if ( !event.which && button !== undefined ) {
				event.which = ( button & 1 ? 1 : ( button & 2 ? 3 : ( button & 4 ? 2 : 0 ) ) );
			}

			return event;
		}
	},

	special: {
		load: {

			// Prevent triggered image.load events from bubbling to window.load
			noBubble: true
		},
		focus: {

			// Fire native event if possible so blur/focus sequence is correct
			trigger: function() {
				if ( this !== safeActiveElement() && this.focus ) {
					try {
						this.focus();
						return false;
					} catch ( e ) {

						// Support: IE<9
						// If we error on focus to hidden element (#1486, #12518),
						// let .trigger() run the handlers
					}
				}
			},
			delegateType: "focusin"
		},
		blur: {
			trigger: function() {
				if ( this === safeActiveElement() && this.blur ) {
					this.blur();
					return false;
				}
			},
			delegateType: "focusout"
		},
		click: {

			// For checkbox, fire native event so checked state will be right
			trigger: function() {
				if ( jQuery.nodeName( this, "input" ) && this.type === "checkbox" && this.click ) {
					this.click();
					return false;
				}
			},

			// For cross-browser consistency, don't fire native .click() on links
			_default: function( event ) {
				return jQuery.nodeName( event.target, "a" );
			}
		},

		beforeunload: {
			postDispatch: function( event ) {

				// Support: Firefox 20+
				// Firefox doesn't alert if the returnValue field is not set.
				if ( event.result !== undefined && event.originalEvent ) {
					event.originalEvent.returnValue = event.result;
				}
			}
		}
	},

	// Piggyback on a donor event to simulate a different one
	simulate: function( type, elem, event ) {
		var e = jQuery.extend(
			new jQuery.Event(),
			event,
			{
				type: type,
				isSimulated: true

				// Previously, `originalEvent: {}` was set here, so stopPropagation call
				// would not be triggered on donor event, since in our own
				// jQuery.event.stopPropagation function we had a check for existence of
				// originalEvent.stopPropagation method, so, consequently it would be a noop.
				//
				// Guard for simulated events was moved to jQuery.event.stopPropagation function
				// since `originalEvent` should point to the original event for the
				// constancy with other events and for more focused logic
			}
		);

		jQuery.event.trigger( e, null, elem );

		if ( e.isDefaultPrevented() ) {
			event.preventDefault();
		}
	}
};

jQuery.removeEvent = document.removeEventListener ?
	function( elem, type, handle ) {

		// This "if" is needed for plain objects
		if ( elem.removeEventListener ) {
			elem.removeEventListener( type, handle );
		}
	} :
	function( elem, type, handle ) {
		var name = "on" + type;

		if ( elem.detachEvent ) {

			// #8545, #7054, preventing memory leaks for custom events in IE6-8
			// detachEvent needed property on element, by name of that event,
			// to properly expose it to GC
			if ( typeof elem[ name ] === "undefined" ) {
				elem[ name ] = null;
			}

			elem.detachEvent( name, handle );
		}
	};

jQuery.Event = function( src, props ) {

	// Allow instantiation without the 'new' keyword
	if ( !( this instanceof jQuery.Event ) ) {
		return new jQuery.Event( src, props );
	}

	// Event object
	if ( src && src.type ) {
		this.originalEvent = src;
		this.type = src.type;

		// Events bubbling up the document may have been marked as prevented
		// by a handler lower down the tree; reflect the correct value.
		this.isDefaultPrevented = src.defaultPrevented ||
				src.defaultPrevented === undefined &&

				// Support: IE < 9, Android < 4.0
				src.returnValue === false ?
			returnTrue :
			returnFalse;

	// Event type
	} else {
		this.type = src;
	}

	// Put explicitly provided properties onto the event object
	if ( props ) {
		jQuery.extend( this, props );
	}

	// Create a timestamp if incoming event doesn't have one
	this.timeStamp = src && src.timeStamp || jQuery.now();

	// Mark it as fixed
	this[ jQuery.expando ] = true;
};

// jQuery.Event is based on DOM3 Events as specified by the ECMAScript Language Binding
// http://www.w3.org/TR/2003/WD-DOM-Level-3-Events-20030331/ecma-script-binding.html
jQuery.Event.prototype = {
	constructor: jQuery.Event,
	isDefaultPrevented: returnFalse,
	isPropagationStopped: returnFalse,
	isImmediatePropagationStopped: returnFalse,

	preventDefault: function() {
		var e = this.originalEvent;

		this.isDefaultPrevented = returnTrue;
		if ( !e ) {
			return;
		}

		// If preventDefault exists, run it on the original event
		if ( e.preventDefault ) {
			e.preventDefault();

		// Support: IE
		// Otherwise set the returnValue property of the original event to false
		} else {
			e.returnValue = false;
		}
	},
	stopPropagation: function() {
		var e = this.originalEvent;

		this.isPropagationStopped = returnTrue;

		if ( !e || this.isSimulated ) {
			return;
		}

		// If stopPropagation exists, run it on the original event
		if ( e.stopPropagation ) {
			e.stopPropagation();
		}

		// Support: IE
		// Set the cancelBubble property of the original event to true
		e.cancelBubble = true;
	},
	stopImmediatePropagation: function() {
		var e = this.originalEvent;

		this.isImmediatePropagationStopped = returnTrue;

		if ( e && e.stopImmediatePropagation ) {
			e.stopImmediatePropagation();
		}

		this.stopPropagation();
	}
};

// Create mouseenter/leave events using mouseover/out and event-time checks
// so that event delegation works in jQuery.
// Do the same for pointerenter/pointerleave and pointerover/pointerout
//
// Support: Safari 7 only
// Safari sends mouseenter too often; see:
// https://code.google.com/p/chromium/issues/detail?id=470258
// for the description of the bug (it existed in older Chrome versions as well).
jQuery.each( {
	mouseenter: "mouseover",
	mouseleave: "mouseout",
	pointerenter: "pointerover",
	pointerleave: "pointerout"
}, function( orig, fix ) {
	jQuery.event.special[ orig ] = {
		delegateType: fix,
		bindType: fix,

		handle: function( event ) {
			var ret,
				target = this,
				related = event.relatedTarget,
				handleObj = event.handleObj;

			// For mouseenter/leave call the handler if related is outside the target.
			// NB: No relatedTarget if the mouse left/entered the browser window
			if ( !related || ( related !== target && !jQuery.contains( target, related ) ) ) {
				event.type = handleObj.origType;
				ret = handleObj.handler.apply( this, arguments );
				event.type = fix;
			}
			return ret;
		}
	};
} );

// IE submit delegation
if ( !support.submit ) {

	jQuery.event.special.submit = {
		setup: function() {

			// Only need this for delegated form submit events
			if ( jQuery.nodeName( this, "form" ) ) {
				return false;
			}

			// Lazy-add a submit handler when a descendant form may potentially be submitted
			jQuery.event.add( this, "click._submit keypress._submit", function( e ) {

				// Node name check avoids a VML-related crash in IE (#9807)
				var elem = e.target,
					form = jQuery.nodeName( elem, "input" ) || jQuery.nodeName( elem, "button" ) ?

						// Support: IE <=8
						// We use jQuery.prop instead of elem.form
						// to allow fixing the IE8 delegated submit issue (gh-2332)
						// by 3rd party polyfills/workarounds.
						jQuery.prop( elem, "form" ) :
						undefined;

				if ( form && !jQuery._data( form, "submit" ) ) {
					jQuery.event.add( form, "submit._submit", function( event ) {
						event._submitBubble = true;
					} );
					jQuery._data( form, "submit", true );
				}
			} );

			// return undefined since we don't need an event listener
		},

		postDispatch: function( event ) {

			// If form was submitted by the user, bubble the event up the tree
			if ( event._submitBubble ) {
				delete event._submitBubble;
				if ( this.parentNode && !event.isTrigger ) {
					jQuery.event.simulate( "submit", this.parentNode, event );
				}
			}
		},

		teardown: function() {

			// Only need this for delegated form submit events
			if ( jQuery.nodeName( this, "form" ) ) {
				return false;
			}

			// Remove delegated handlers; cleanData eventually reaps submit handlers attached above
			jQuery.event.remove( this, "._submit" );
		}
	};
}

// IE change delegation and checkbox/radio fix
if ( !support.change ) {

	jQuery.event.special.change = {

		setup: function() {

			if ( rformElems.test( this.nodeName ) ) {

				// IE doesn't fire change on a check/radio until blur; trigger it on click
				// after a propertychange. Eat the blur-change in special.change.handle.
				// This still fires onchange a second time for check/radio after blur.
				if ( this.type === "checkbox" || this.type === "radio" ) {
					jQuery.event.add( this, "propertychange._change", function( event ) {
						if ( event.originalEvent.propertyName === "checked" ) {
							this._justChanged = true;
						}
					} );
					jQuery.event.add( this, "click._change", function( event ) {
						if ( this._justChanged && !event.isTrigger ) {
							this._justChanged = false;
						}

						// Allow triggered, simulated change events (#11500)
						jQuery.event.simulate( "change", this, event );
					} );
				}
				return false;
			}

			// Delegated event; lazy-add a change handler on descendant inputs
			jQuery.event.add( this, "beforeactivate._change", function( e ) {
				var elem = e.target;

				if ( rformElems.test( elem.nodeName ) && !jQuery._data( elem, "change" ) ) {
					jQuery.event.add( elem, "change._change", function( event ) {
						if ( this.parentNode && !event.isSimulated && !event.isTrigger ) {
							jQuery.event.simulate( "change", this.parentNode, event );
						}
					} );
					jQuery._data( elem, "change", true );
				}
			} );
		},

		handle: function( event ) {
			var elem = event.target;

			// Swallow native change events from checkbox/radio, we already triggered them above
			if ( this !== elem || event.isSimulated || event.isTrigger ||
				( elem.type !== "radio" && elem.type !== "checkbox" ) ) {

				return event.handleObj.handler.apply( this, arguments );
			}
		},

		teardown: function() {
			jQuery.event.remove( this, "._change" );

			return !rformElems.test( this.nodeName );
		}
	};
}

// Support: Firefox
// Firefox doesn't have focus(in | out) events
// Related ticket - https://bugzilla.mozilla.org/show_bug.cgi?id=687787
//
// Support: Chrome, Safari
// focus(in | out) events fire after focus & blur events,
// which is spec violation - http://www.w3.org/TR/DOM-Level-3-Events/#events-focusevent-event-order
// Related ticket - https://code.google.com/p/chromium/issues/detail?id=449857
if ( !support.focusin ) {
	jQuery.each( { focus: "focusin", blur: "focusout" }, function( orig, fix ) {

		// Attach a single capturing handler on the document while someone wants focusin/focusout
		var handler = function( event ) {
			jQuery.event.simulate( fix, event.target, jQuery.event.fix( event ) );
		};

		jQuery.event.special[ fix ] = {
			setup: function() {
				var doc = this.ownerDocument || this,
					attaches = jQuery._data( doc, fix );

				if ( !attaches ) {
					doc.addEventListener( orig, handler, true );
				}
				jQuery._data( doc, fix, ( attaches || 0 ) + 1 );
			},
			teardown: function() {
				var doc = this.ownerDocument || this,
					attaches = jQuery._data( doc, fix ) - 1;

				if ( !attaches ) {
					doc.removeEventListener( orig, handler, true );
					jQuery._removeData( doc, fix );
				} else {
					jQuery._data( doc, fix, attaches );
				}
			}
		};
	} );
}

jQuery.fn.extend( {

	on: function( types, selector, data, fn ) {
		return on( this, types, selector, data, fn );
	},
	one: function( types, selector, data, fn ) {
		return on( this, types, selector, data, fn, 1 );
	},
	off: function( types, selector, fn ) {
		var handleObj, type;
		if ( types && types.preventDefault && types.handleObj ) {

			// ( event )  dispatched jQuery.Event
			handleObj = types.handleObj;
			jQuery( types.delegateTarget ).off(
				handleObj.namespace ?
					handleObj.origType + "." + handleObj.namespace :
					handleObj.origType,
				handleObj.selector,
				handleObj.handler
			);
			return this;
		}
		if ( typeof types === "object" ) {

			// ( types-object [, selector] )
			for ( type in types ) {
				this.off( type, selector, types[ type ] );
			}
			return this;
		}
		if ( selector === false || typeof selector === "function" ) {

			// ( types [, fn] )
			fn = selector;
			selector = undefined;
		}
		if ( fn === false ) {
			fn = returnFalse;
		}
		return this.each( function() {
			jQuery.event.remove( this, types, fn, selector );
		} );
	},

	trigger: function( type, data ) {
		return this.each( function() {
			jQuery.event.trigger( type, data, this );
		} );
	},
	triggerHandler: function( type, data ) {
		var elem = this[ 0 ];
		if ( elem ) {
			return jQuery.event.trigger( type, data, elem, true );
		}
	}
} );


var rinlinejQuery = / jQuery\d+="(?:null|\d+)"/g,
	rnoshimcache = new RegExp( "<(?:" + nodeNames + ")[\\s/>]", "i" ),
	rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:-]+)[^>]*)\/>/gi,

	// Support: IE 10-11, Edge 10240+
	// In IE/Edge using regex groups here causes severe slowdowns.
	// See https://connect.microsoft.com/IE/feedback/details/1736512/
	rnoInnerhtml = /<script|<style|<link/i,

	// checked="checked" or checked
	rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i,
	rscriptTypeMasked = /^true\/(.*)/,
	rcleanScript = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,
	safeFragment = createSafeFragment( document ),
	fragmentDiv = safeFragment.appendChild( document.createElement( "div" ) );

// Support: IE<8
// Manipulating tables requires a tbody
function manipulationTarget( elem, content ) {
	return jQuery.nodeName( elem, "table" ) &&
		jQuery.nodeName( content.nodeType !== 11 ? content : content.firstChild, "tr" ) ?

		elem.getElementsByTagName( "tbody" )[ 0 ] ||
			elem.appendChild( elem.ownerDocument.createElement( "tbody" ) ) :
		elem;
}

// Replace/restore the type attribute of script elements for safe DOM manipulation
function disableScript( elem ) {
	elem.type = ( jQuery.find.attr( elem, "type" ) !== null ) + "/" + elem.type;
	return elem;
}
function restoreScript( elem ) {
	var match = rscriptTypeMasked.exec( elem.type );
	if ( match ) {
		elem.type = match[ 1 ];
	} else {
		elem.removeAttribute( "type" );
	}
	return elem;
}

function cloneCopyEvent( src, dest ) {
	if ( dest.nodeType !== 1 || !jQuery.hasData( src ) ) {
		return;
	}

	var type, i, l,
		oldData = jQuery._data( src ),
		curData = jQuery._data( dest, oldData ),
		events = oldData.events;

	if ( events ) {
		delete curData.handle;
		curData.events = {};

		for ( type in events ) {
			for ( i = 0, l = events[ type ].length; i < l; i++ ) {
				jQuery.event.add( dest, type, events[ type ][ i ] );
			}
		}
	}

	// make the cloned public data object a copy from the original
	if ( curData.data ) {
		curData.data = jQuery.extend( {}, curData.data );
	}
}

function fixCloneNodeIssues( src, dest ) {
	var nodeName, e, data;

	// We do not need to do anything for non-Elements
	if ( dest.nodeType !== 1 ) {
		return;
	}

	nodeName = dest.nodeName.toLowerCase();

	// IE6-8 copies events bound via attachEvent when using cloneNode.
	if ( !support.noCloneEvent && dest[ jQuery.expando ] ) {
		data = jQuery._data( dest );

		for ( e in data.events ) {
			jQuery.removeEvent( dest, e, data.handle );
		}

		// Event data gets referenced instead of copied if the expando gets copied too
		dest.removeAttribute( jQuery.expando );
	}

	// IE blanks contents when cloning scripts, and tries to evaluate newly-set text
	if ( nodeName === "script" && dest.text !== src.text ) {
		disableScript( dest ).text = src.text;
		restoreScript( dest );

	// IE6-10 improperly clones children of object elements using classid.
	// IE10 throws NoModificationAllowedError if parent is null, #12132.
	} else if ( nodeName === "object" ) {
		if ( dest.parentNode ) {
			dest.outerHTML = src.outerHTML;
		}

		// This path appears unavoidable for IE9. When cloning an object
		// element in IE9, the outerHTML strategy above is not sufficient.
		// If the src has innerHTML and the destination does not,
		// copy the src.innerHTML into the dest.innerHTML. #10324
		if ( support.html5Clone && ( src.innerHTML && !jQuery.trim( dest.innerHTML ) ) ) {
			dest.innerHTML = src.innerHTML;
		}

	} else if ( nodeName === "input" && rcheckableType.test( src.type ) ) {

		// IE6-8 fails to persist the checked state of a cloned checkbox
		// or radio button. Worse, IE6-7 fail to give the cloned element
		// a checked appearance if the defaultChecked value isn't also set

		dest.defaultChecked = dest.checked = src.checked;

		// IE6-7 get confused and end up setting the value of a cloned
		// checkbox/radio button to an empty string instead of "on"
		if ( dest.value !== src.value ) {
			dest.value = src.value;
		}

	// IE6-8 fails to return the selected option to the default selected
	// state when cloning options
	} else if ( nodeName === "option" ) {
		dest.defaultSelected = dest.selected = src.defaultSelected;

	// IE6-8 fails to set the defaultValue to the correct value when
	// cloning other types of input fields
	} else if ( nodeName === "input" || nodeName === "textarea" ) {
		dest.defaultValue = src.defaultValue;
	}
}

function domManip( collection, args, callback, ignored ) {

	// Flatten any nested arrays
	args = concat.apply( [], args );

	var first, node, hasScripts,
		scripts, doc, fragment,
		i = 0,
		l = collection.length,
		iNoClone = l - 1,
		value = args[ 0 ],
		isFunction = jQuery.isFunction( value );

	// We can't cloneNode fragments that contain checked, in WebKit
	if ( isFunction ||
			( l > 1 && typeof value === "string" &&
				!support.checkClone && rchecked.test( value ) ) ) {
		return collection.each( function( index ) {
			var self = collection.eq( index );
			if ( isFunction ) {
				args[ 0 ] = value.call( this, index, self.html() );
			}
			domManip( self, args, callback, ignored );
		} );
	}

	if ( l ) {
		fragment = buildFragment( args, collection[ 0 ].ownerDocument, false, collection, ignored );
		first = fragment.firstChild;

		if ( fragment.childNodes.length === 1 ) {
			fragment = first;
		}

		// Require either new content or an interest in ignored elements to invoke the callback
		if ( first || ignored ) {
			scripts = jQuery.map( getAll( fragment, "script" ), disableScript );
			hasScripts = scripts.length;

			// Use the original fragment for the last item
			// instead of the first because it can end up
			// being emptied incorrectly in certain situations (#8070).
			for ( ; i < l; i++ ) {
				node = fragment;

				if ( i !== iNoClone ) {
					node = jQuery.clone( node, true, true );

					// Keep references to cloned scripts for later restoration
					if ( hasScripts ) {

						// Support: Android<4.1, PhantomJS<2
						// push.apply(_, arraylike) throws on ancient WebKit
						jQuery.merge( scripts, getAll( node, "script" ) );
					}
				}

				callback.call( collection[ i ], node, i );
			}

			if ( hasScripts ) {
				doc = scripts[ scripts.length - 1 ].ownerDocument;

				// Reenable scripts
				jQuery.map( scripts, restoreScript );

				// Evaluate executable scripts on first document insertion
				for ( i = 0; i < hasScripts; i++ ) {
					node = scripts[ i ];
					if ( rscriptType.test( node.type || "" ) &&
						!jQuery._data( node, "globalEval" ) &&
						jQuery.contains( doc, node ) ) {

						if ( node.src ) {

							// Optional AJAX dependency, but won't run scripts if not present
							if ( jQuery._evalUrl ) {
								jQuery._evalUrl( node.src );
							}
						} else {
							jQuery.globalEval(
								( node.text || node.textContent || node.innerHTML || "" )
									.replace( rcleanScript, "" )
							);
						}
					}
				}
			}

			// Fix #11809: Avoid leaking memory
			fragment = first = null;
		}
	}

	return collection;
}

function remove( elem, selector, keepData ) {
	var node,
		elems = selector ? jQuery.filter( selector, elem ) : elem,
		i = 0;

	for ( ; ( node = elems[ i ] ) != null; i++ ) {

		if ( !keepData && node.nodeType === 1 ) {
			jQuery.cleanData( getAll( node ) );
		}

		if ( node.parentNode ) {
			if ( keepData && jQuery.contains( node.ownerDocument, node ) ) {
				setGlobalEval( getAll( node, "script" ) );
			}
			node.parentNode.removeChild( node );
		}
	}

	return elem;
}

jQuery.extend( {
	htmlPrefilter: function( html ) {
		return html.replace( rxhtmlTag, "<$1></$2>" );
	},

	clone: function( elem, dataAndEvents, deepDataAndEvents ) {
		var destElements, node, clone, i, srcElements,
			inPage = jQuery.contains( elem.ownerDocument, elem );

		if ( support.html5Clone || jQuery.isXMLDoc( elem ) ||
			!rnoshimcache.test( "<" + elem.nodeName + ">" ) ) {

			clone = elem.cloneNode( true );

		// IE<=8 does not properly clone detached, unknown element nodes
		} else {
			fragmentDiv.innerHTML = elem.outerHTML;
			fragmentDiv.removeChild( clone = fragmentDiv.firstChild );
		}

		if ( ( !support.noCloneEvent || !support.noCloneChecked ) &&
				( elem.nodeType === 1 || elem.nodeType === 11 ) && !jQuery.isXMLDoc( elem ) ) {

			// We eschew Sizzle here for performance reasons: http://jsperf.com/getall-vs-sizzle/2
			destElements = getAll( clone );
			srcElements = getAll( elem );

			// Fix all IE cloning issues
			for ( i = 0; ( node = srcElements[ i ] ) != null; ++i ) {

				// Ensure that the destination node is not null; Fixes #9587
				if ( destElements[ i ] ) {
					fixCloneNodeIssues( node, destElements[ i ] );
				}
			}
		}

		// Copy the events from the original to the clone
		if ( dataAndEvents ) {
			if ( deepDataAndEvents ) {
				srcElements = srcElements || getAll( elem );
				destElements = destElements || getAll( clone );

				for ( i = 0; ( node = srcElements[ i ] ) != null; i++ ) {
					cloneCopyEvent( node, destElements[ i ] );
				}
			} else {
				cloneCopyEvent( elem, clone );
			}
		}

		// Preserve script evaluation history
		destElements = getAll( clone, "script" );
		if ( destElements.length > 0 ) {
			setGlobalEval( destElements, !inPage && getAll( elem, "script" ) );
		}

		destElements = srcElements = node = null;

		// Return the cloned set
		return clone;
	},

	cleanData: function( elems, /* internal */ forceAcceptData ) {
		var elem, type, id, data,
			i = 0,
			internalKey = jQuery.expando,
			cache = jQuery.cache,
			attributes = support.attributes,
			special = jQuery.event.special;

		for ( ; ( elem = elems[ i ] ) != null; i++ ) {
			if ( forceAcceptData || acceptData( elem ) ) {

				id = elem[ internalKey ];
				data = id && cache[ id ];

				if ( data ) {
					if ( data.events ) {
						for ( type in data.events ) {
							if ( special[ type ] ) {
								jQuery.event.remove( elem, type );

							// This is a shortcut to avoid jQuery.event.remove's overhead
							} else {
								jQuery.removeEvent( elem, type, data.handle );
							}
						}
					}

					// Remove cache only if it was not already removed by jQuery.event.remove
					if ( cache[ id ] ) {

						delete cache[ id ];

						// Support: IE<9
						// IE does not allow us to delete expando properties from nodes
						// IE creates expando attributes along with the property
						// IE does not have a removeAttribute function on Document nodes
						if ( !attributes && typeof elem.removeAttribute !== "undefined" ) {
							elem.removeAttribute( internalKey );

						// Webkit & Blink performance suffers when deleting properties
						// from DOM nodes, so set to undefined instead
						// https://code.google.com/p/chromium/issues/detail?id=378607
						} else {
							elem[ internalKey ] = undefined;
						}

						deletedIds.push( id );
					}
				}
			}
		}
	}
} );

jQuery.fn.extend( {

	// Keep domManip exposed until 3.0 (gh-2225)
	domManip: domManip,

	detach: function( selector ) {
		return remove( this, selector, true );
	},

	remove: function( selector ) {
		return remove( this, selector );
	},

	text: function( value ) {
		return access( this, function( value ) {
			return value === undefined ?
				jQuery.text( this ) :
				this.empty().append(
					( this[ 0 ] && this[ 0 ].ownerDocument || document ).createTextNode( value )
				);
		}, null, value, arguments.length );
	},

	append: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.appendChild( elem );
			}
		} );
	},

	prepend: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.insertBefore( elem, target.firstChild );
			}
		} );
	},

	before: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this );
			}
		} );
	},

	after: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this.nextSibling );
			}
		} );
	},

	empty: function() {
		var elem,
			i = 0;

		for ( ; ( elem = this[ i ] ) != null; i++ ) {

			// Remove element nodes and prevent memory leaks
			if ( elem.nodeType === 1 ) {
				jQuery.cleanData( getAll( elem, false ) );
			}

			// Remove any remaining nodes
			while ( elem.firstChild ) {
				elem.removeChild( elem.firstChild );
			}

			// If this is a select, ensure that it displays empty (#12336)
			// Support: IE<9
			if ( elem.options && jQuery.nodeName( elem, "select" ) ) {
				elem.options.length = 0;
			}
		}

		return this;
	},

	clone: function( dataAndEvents, deepDataAndEvents ) {
		dataAndEvents = dataAndEvents == null ? false : dataAndEvents;
		deepDataAndEvents = deepDataAndEvents == null ? dataAndEvents : deepDataAndEvents;

		return this.map( function() {
			return jQuery.clone( this, dataAndEvents, deepDataAndEvents );
		} );
	},

	html: function( value ) {
		return access( this, function( value ) {
			var elem = this[ 0 ] || {},
				i = 0,
				l = this.length;

			if ( value === undefined ) {
				return elem.nodeType === 1 ?
					elem.innerHTML.replace( rinlinejQuery, "" ) :
					undefined;
			}

			// See if we can take a shortcut and just use innerHTML
			if ( typeof value === "string" && !rnoInnerhtml.test( value ) &&
				( support.htmlSerialize || !rnoshimcache.test( value )  ) &&
				( support.leadingWhitespace || !rleadingWhitespace.test( value ) ) &&
				!wrapMap[ ( rtagName.exec( value ) || [ "", "" ] )[ 1 ].toLowerCase() ] ) {

				value = jQuery.htmlPrefilter( value );

				try {
					for ( ; i < l; i++ ) {

						// Remove element nodes and prevent memory leaks
						elem = this[ i ] || {};
						if ( elem.nodeType === 1 ) {
							jQuery.cleanData( getAll( elem, false ) );
							elem.innerHTML = value;
						}
					}

					elem = 0;

				// If using innerHTML throws an exception, use the fallback method
				} catch ( e ) {}
			}

			if ( elem ) {
				this.empty().append( value );
			}
		}, null, value, arguments.length );
	},

	replaceWith: function() {
		var ignored = [];

		// Make the changes, replacing each non-ignored context element with the new content
		return domManip( this, arguments, function( elem ) {
			var parent = this.parentNode;

			if ( jQuery.inArray( this, ignored ) < 0 ) {
				jQuery.cleanData( getAll( this ) );
				if ( parent ) {
					parent.replaceChild( elem, this );
				}
			}

		// Force callback invocation
		}, ignored );
	}
} );

jQuery.each( {
	appendTo: "append",
	prependTo: "prepend",
	insertBefore: "before",
	insertAfter: "after",
	replaceAll: "replaceWith"
}, function( name, original ) {
	jQuery.fn[ name ] = function( selector ) {
		var elems,
			i = 0,
			ret = [],
			insert = jQuery( selector ),
			last = insert.length - 1;

		for ( ; i <= last; i++ ) {
			elems = i === last ? this : this.clone( true );
			jQuery( insert[ i ] )[ original ]( elems );

			// Modern browsers can apply jQuery collections as arrays, but oldIE needs a .get()
			push.apply( ret, elems.get() );
		}

		return this.pushStack( ret );
	};
} );


var iframe,
	elemdisplay = {

		// Support: Firefox
		// We have to pre-define these values for FF (#10227)
		HTML: "block",
		BODY: "block"
	};

/**
 * Retrieve the actual display of a element
 * @param {String} name nodeName of the element
 * @param {Object} doc Document object
 */

// Called only from within defaultDisplay
function actualDisplay( name, doc ) {
	var elem = jQuery( doc.createElement( name ) ).appendTo( doc.body ),

		display = jQuery.css( elem[ 0 ], "display" );

	// We don't have any data stored on the element,
	// so use "detach" method as fast way to get rid of the element
	elem.detach();

	return display;
}

/**
 * Try to determine the default display value of an element
 * @param {String} nodeName
 */
function defaultDisplay( nodeName ) {
	var doc = document,
		display = elemdisplay[ nodeName ];

	if ( !display ) {
		display = actualDisplay( nodeName, doc );

		// If the simple way fails, read from inside an iframe
		if ( display === "none" || !display ) {

			// Use the already-created iframe if possible
			iframe = ( iframe || jQuery( "<iframe frameborder='0' width='0' height='0'/>" ) )
				.appendTo( doc.documentElement );

			// Always write a new HTML skeleton so Webkit and Firefox don't choke on reuse
			doc = ( iframe[ 0 ].contentWindow || iframe[ 0 ].contentDocument ).document;

			// Support: IE
			doc.write();
			doc.close();

			display = actualDisplay( nodeName, doc );
			iframe.detach();
		}

		// Store the correct default display
		elemdisplay[ nodeName ] = display;
	}

	return display;
}
var rmargin = ( /^margin/ );

var rnumnonpx = new RegExp( "^(" + pnum + ")(?!px)[a-z%]+$", "i" );

var swap = function( elem, options, callback, args ) {
	var ret, name,
		old = {};

	// Remember the old values, and insert the new ones
	for ( name in options ) {
		old[ name ] = elem.style[ name ];
		elem.style[ name ] = options[ name ];
	}

	ret = callback.apply( elem, args || [] );

	// Revert the old values
	for ( name in options ) {
		elem.style[ name ] = old[ name ];
	}

	return ret;
};


var documentElement = document.documentElement;



( function() {
	var pixelPositionVal, pixelMarginRightVal, boxSizingReliableVal,
		reliableHiddenOffsetsVal, reliableMarginRightVal, reliableMarginLeftVal,
		container = document.createElement( "div" ),
		div = document.createElement( "div" );

	// Finish early in limited (non-browser) environments
	if ( !div.style ) {
		return;
	}

	div.style.cssText = "float:left;opacity:.5";

	// Support: IE<9
	// Make sure that element opacity exists (as opposed to filter)
	support.opacity = div.style.opacity === "0.5";

	// Verify style float existence
	// (IE uses styleFloat instead of cssFloat)
	support.cssFloat = !!div.style.cssFloat;

	div.style.backgroundClip = "content-box";
	div.cloneNode( true ).style.backgroundClip = "";
	support.clearCloneStyle = div.style.backgroundClip === "content-box";

	container = document.createElement( "div" );
	container.style.cssText = "border:0;width:8px;height:0;top:0;left:-9999px;" +
		"padding:0;margin-top:1px;position:absolute";
	div.innerHTML = "";
	container.appendChild( div );

	// Support: Firefox<29, Android 2.3
	// Vendor-prefix box-sizing
	support.boxSizing = div.style.boxSizing === "" || div.style.MozBoxSizing === "" ||
		div.style.WebkitBoxSizing === "";

	jQuery.extend( support, {
		reliableHiddenOffsets: function() {
			if ( pixelPositionVal == null ) {
				computeStyleTests();
			}
			return reliableHiddenOffsetsVal;
		},

		boxSizingReliable: function() {

			// We're checking for pixelPositionVal here instead of boxSizingReliableVal
			// since that compresses better and they're computed together anyway.
			if ( pixelPositionVal == null ) {
				computeStyleTests();
			}
			return boxSizingReliableVal;
		},

		pixelMarginRight: function() {

			// Support: Android 4.0-4.3
			if ( pixelPositionVal == null ) {
				computeStyleTests();
			}
			return pixelMarginRightVal;
		},

		pixelPosition: function() {
			if ( pixelPositionVal == null ) {
				computeStyleTests();
			}
			return pixelPositionVal;
		},

		reliableMarginRight: function() {

			// Support: Android 2.3
			if ( pixelPositionVal == null ) {
				computeStyleTests();
			}
			return reliableMarginRightVal;
		},

		reliableMarginLeft: function() {

			// Support: IE <=8 only, Android 4.0 - 4.3 only, Firefox <=3 - 37
			if ( pixelPositionVal == null ) {
				computeStyleTests();
			}
			return reliableMarginLeftVal;
		}
	} );

	function computeStyleTests() {
		var contents, divStyle,
			documentElement = document.documentElement;

		// Setup
		documentElement.appendChild( container );

		div.style.cssText =

			// Support: Android 2.3
			// Vendor-prefix box-sizing
			"-webkit-box-sizing:border-box;box-sizing:border-box;" +
			"position:relative;display:block;" +
			"margin:auto;border:1px;padding:1px;" +
			"top:1%;width:50%";

		// Support: IE<9
		// Assume reasonable values in the absence of getComputedStyle
		pixelPositionVal = boxSizingReliableVal = reliableMarginLeftVal = false;
		pixelMarginRightVal = reliableMarginRightVal = true;

		// Check for getComputedStyle so that this code is not run in IE<9.
		if ( window.getComputedStyle ) {
			divStyle = window.getComputedStyle( div );
			pixelPositionVal = ( divStyle || {} ).top !== "1%";
			reliableMarginLeftVal = ( divStyle || {} ).marginLeft === "2px";
			boxSizingReliableVal = ( divStyle || { width: "4px" } ).width === "4px";

			// Support: Android 4.0 - 4.3 only
			// Some styles come back with percentage values, even though they shouldn't
			div.style.marginRight = "50%";
			pixelMarginRightVal = ( divStyle || { marginRight: "4px" } ).marginRight === "4px";

			// Support: Android 2.3 only
			// Div with explicit width and no margin-right incorrectly
			// gets computed margin-right based on width of container (#3333)
			// WebKit Bug 13343 - getComputedStyle returns wrong value for margin-right
			contents = div.appendChild( document.createElement( "div" ) );

			// Reset CSS: box-sizing; display; margin; border; padding
			contents.style.cssText = div.style.cssText =

				// Support: Android 2.3
				// Vendor-prefix box-sizing
				"-webkit-box-sizing:content-box;-moz-box-sizing:content-box;" +
				"box-sizing:content-box;display:block;margin:0;border:0;padding:0";
			contents.style.marginRight = contents.style.width = "0";
			div.style.width = "1px";

			reliableMarginRightVal =
				!parseFloat( ( window.getComputedStyle( contents ) || {} ).marginRight );

			div.removeChild( contents );
		}

		// Support: IE6-8
		// First check that getClientRects works as expected
		// Check if table cells still have offsetWidth/Height when they are set
		// to display:none and there are still other visible table cells in a
		// table row; if so, offsetWidth/Height are not reliable for use when
		// determining if an element has been hidden directly using
		// display:none (it is still safe to use offsets if a parent element is
		// hidden; don safety goggles and see bug #4512 for more information).
		div.style.display = "none";
		reliableHiddenOffsetsVal = div.getClientRects().length === 0;
		if ( reliableHiddenOffsetsVal ) {
			div.style.display = "";
			div.innerHTML = "<table><tr><td></td><td>t</td></tr></table>";
			div.childNodes[ 0 ].style.borderCollapse = "separate";
			contents = div.getElementsByTagName( "td" );
			contents[ 0 ].style.cssText = "margin:0;border:0;padding:0;display:none";
			reliableHiddenOffsetsVal = contents[ 0 ].offsetHeight === 0;
			if ( reliableHiddenOffsetsVal ) {
				contents[ 0 ].style.display = "";
				contents[ 1 ].style.display = "none";
				reliableHiddenOffsetsVal = contents[ 0 ].offsetHeight === 0;
			}
		}

		// Teardown
		documentElement.removeChild( container );
	}

} )();


var getStyles, curCSS,
	rposition = /^(top|right|bottom|left)$/;

if ( window.getComputedStyle ) {
	getStyles = function( elem ) {

		// Support: IE<=11+, Firefox<=30+ (#15098, #14150)
		// IE throws on elements created in popups
		// FF meanwhile throws on frame elements through "defaultView.getComputedStyle"
		var view = elem.ownerDocument.defaultView;

		if ( !view || !view.opener ) {
			view = window;
		}

		return view.getComputedStyle( elem );
	};

	curCSS = function( elem, name, computed ) {
		var width, minWidth, maxWidth, ret,
			style = elem.style;

		computed = computed || getStyles( elem );

		// getPropertyValue is only needed for .css('filter') in IE9, see #12537
		ret = computed ? computed.getPropertyValue( name ) || computed[ name ] : undefined;

		// Support: Opera 12.1x only
		// Fall back to style even without computed
		// computed is undefined for elems on document fragments
		if ( ( ret === "" || ret === undefined ) && !jQuery.contains( elem.ownerDocument, elem ) ) {
			ret = jQuery.style( elem, name );
		}

		if ( computed ) {

			// A tribute to the "awesome hack by Dean Edwards"
			// Chrome < 17 and Safari 5.0 uses "computed value"
			// instead of "used value" for margin-right
			// Safari 5.1.7 (at least) returns percentage for a larger set of values,
			// but width seems to be reliably pixels
			// this is against the CSSOM draft spec:
			// http://dev.w3.org/csswg/cssom/#resolved-values
			if ( !support.pixelMarginRight() && rnumnonpx.test( ret ) && rmargin.test( name ) ) {

				// Remember the original values
				width = style.width;
				minWidth = style.minWidth;
				maxWidth = style.maxWidth;

				// Put in the new values to get a computed value out
				style.minWidth = style.maxWidth = style.width = ret;
				ret = computed.width;

				// Revert the changed values
				style.width = width;
				style.minWidth = minWidth;
				style.maxWidth = maxWidth;
			}
		}

		// Support: IE
		// IE returns zIndex value as an integer.
		return ret === undefined ?
			ret :
			ret + "";
	};
} else if ( documentElement.currentStyle ) {
	getStyles = function( elem ) {
		return elem.currentStyle;
	};

	curCSS = function( elem, name, computed ) {
		var left, rs, rsLeft, ret,
			style = elem.style;

		computed = computed || getStyles( elem );
		ret = computed ? computed[ name ] : undefined;

		// Avoid setting ret to empty string here
		// so we don't default to auto
		if ( ret == null && style && style[ name ] ) {
			ret = style[ name ];
		}

		// From the awesome hack by Dean Edwards
		// http://erik.eae.net/archives/2007/07/27/18.54.15/#comment-102291

		// If we're not dealing with a regular pixel number
		// but a number that has a weird ending, we need to convert it to pixels
		// but not position css attributes, as those are
		// proportional to the parent element instead
		// and we can't measure the parent instead because it
		// might trigger a "stacking dolls" problem
		if ( rnumnonpx.test( ret ) && !rposition.test( name ) ) {

			// Remember the original values
			left = style.left;
			rs = elem.runtimeStyle;
			rsLeft = rs && rs.left;

			// Put in the new values to get a computed value out
			if ( rsLeft ) {
				rs.left = elem.currentStyle.left;
			}
			style.left = name === "fontSize" ? "1em" : ret;
			ret = style.pixelLeft + "px";

			// Revert the changed values
			style.left = left;
			if ( rsLeft ) {
				rs.left = rsLeft;
			}
		}

		// Support: IE
		// IE returns zIndex value as an integer.
		return ret === undefined ?
			ret :
			ret + "" || "auto";
	};
}




function addGetHookIf( conditionFn, hookFn ) {

	// Define the hook, we'll check on the first run if it's really needed.
	return {
		get: function() {
			if ( conditionFn() ) {

				// Hook not needed (or it's not possible to use it due
				// to missing dependency), remove it.
				delete this.get;
				return;
			}

			// Hook needed; redefine it so that the support test is not executed again.
			return ( this.get = hookFn ).apply( this, arguments );
		}
	};
}


var

		ralpha = /alpha\([^)]*\)/i,
	ropacity = /opacity\s*=\s*([^)]*)/i,

	// swappable if display is none or starts with table except
	// "table", "table-cell", or "table-caption"
	// see here for display values:
	// https://developer.mozilla.org/en-US/docs/CSS/display
	rdisplayswap = /^(none|table(?!-c[ea]).+)/,
	rnumsplit = new RegExp( "^(" + pnum + ")(.*)$", "i" ),

	cssShow = { position: "absolute", visibility: "hidden", display: "block" },
	cssNormalTransform = {
		letterSpacing: "0",
		fontWeight: "400"
	},

	cssPrefixes = [ "Webkit", "O", "Moz", "ms" ],
	emptyStyle = document.createElement( "div" ).style;


// return a css property mapped to a potentially vendor prefixed property
function vendorPropName( name ) {

	// shortcut for names that are not vendor prefixed
	if ( name in emptyStyle ) {
		return name;
	}

	// check for vendor prefixed names
	var capName = name.charAt( 0 ).toUpperCase() + name.slice( 1 ),
		i = cssPrefixes.length;

	while ( i-- ) {
		name = cssPrefixes[ i ] + capName;
		if ( name in emptyStyle ) {
			return name;
		}
	}
}

function showHide( elements, show ) {
	var display, elem, hidden,
		values = [],
		index = 0,
		length = elements.length;

	for ( ; index < length; index++ ) {
		elem = elements[ index ];
		if ( !elem.style ) {
			continue;
		}

		values[ index ] = jQuery._data( elem, "olddisplay" );
		display = elem.style.display;
		if ( show ) {

			// Reset the inline display of this element to learn if it is
			// being hidden by cascaded rules or not
			if ( !values[ index ] && display === "none" ) {
				elem.style.display = "";
			}

			// Set elements which have been overridden with display: none
			// in a stylesheet to whatever the default browser style is
			// for such an element
			if ( elem.style.display === "" && isHidden( elem ) ) {
				values[ index ] =
					jQuery._data( elem, "olddisplay", defaultDisplay( elem.nodeName ) );
			}
		} else {
			hidden = isHidden( elem );

			if ( display && display !== "none" || !hidden ) {
				jQuery._data(
					elem,
					"olddisplay",
					hidden ? display : jQuery.css( elem, "display" )
				);
			}
		}
	}

	// Set the display of most of the elements in a second loop
	// to avoid the constant reflow
	for ( index = 0; index < length; index++ ) {
		elem = elements[ index ];
		if ( !elem.style ) {
			continue;
		}
		if ( !show || elem.style.display === "none" || elem.style.display === "" ) {
			elem.style.display = show ? values[ index ] || "" : "none";
		}
	}

	return elements;
}

function setPositiveNumber( elem, value, subtract ) {
	var matches = rnumsplit.exec( value );
	return matches ?

		// Guard against undefined "subtract", e.g., when used as in cssHooks
		Math.max( 0, matches[ 1 ] - ( subtract || 0 ) ) + ( matches[ 2 ] || "px" ) :
		value;
}

function augmentWidthOrHeight( elem, name, extra, isBorderBox, styles ) {
	var i = extra === ( isBorderBox ? "border" : "content" ) ?

		// If we already have the right measurement, avoid augmentation
		4 :

		// Otherwise initialize for horizontal or vertical properties
		name === "width" ? 1 : 0,

		val = 0;

	for ( ; i < 4; i += 2 ) {

		// both box models exclude margin, so add it if we want it
		if ( extra === "margin" ) {
			val += jQuery.css( elem, extra + cssExpand[ i ], true, styles );
		}

		if ( isBorderBox ) {

			// border-box includes padding, so remove it if we want content
			if ( extra === "content" ) {
				val -= jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );
			}

			// at this point, extra isn't border nor margin, so remove border
			if ( extra !== "margin" ) {
				val -= jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		} else {

			// at this point, extra isn't content, so add padding
			val += jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );

			// at this point, extra isn't content nor padding, so add border
			if ( extra !== "padding" ) {
				val += jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		}
	}

	return val;
}

function getWidthOrHeight( elem, name, extra ) {

	// Start with offset property, which is equivalent to the border-box value
	var valueIsBorderBox = true,
		val = name === "width" ? elem.offsetWidth : elem.offsetHeight,
		styles = getStyles( elem ),
		isBorderBox = support.boxSizing &&
			jQuery.css( elem, "boxSizing", false, styles ) === "border-box";

	// some non-html elements return undefined for offsetWidth, so check for null/undefined
	// svg - https://bugzilla.mozilla.org/show_bug.cgi?id=649285
	// MathML - https://bugzilla.mozilla.org/show_bug.cgi?id=491668
	if ( val <= 0 || val == null ) {

		// Fall back to computed then uncomputed css if necessary
		val = curCSS( elem, name, styles );
		if ( val < 0 || val == null ) {
			val = elem.style[ name ];
		}

		// Computed unit is not pixels. Stop here and return.
		if ( rnumnonpx.test( val ) ) {
			return val;
		}

		// we need the check for style in case a browser which returns unreliable values
		// for getComputedStyle silently falls back to the reliable elem.style
		valueIsBorderBox = isBorderBox &&
			( support.boxSizingReliable() || val === elem.style[ name ] );

		// Normalize "", auto, and prepare for extra
		val = parseFloat( val ) || 0;
	}

	// use the active box-sizing model to add/subtract irrelevant styles
	return ( val +
		augmentWidthOrHeight(
			elem,
			name,
			extra || ( isBorderBox ? "border" : "content" ),
			valueIsBorderBox,
			styles
		)
	) + "px";
}

jQuery.extend( {

	// Add in style property hooks for overriding the default
	// behavior of getting and setting a style property
	cssHooks: {
		opacity: {
			get: function( elem, computed ) {
				if ( computed ) {

					// We should always get a number back from opacity
					var ret = curCSS( elem, "opacity" );
					return ret === "" ? "1" : ret;
				}
			}
		}
	},

	// Don't automatically add "px" to these possibly-unitless properties
	cssNumber: {
		"animationIterationCount": true,
		"columnCount": true,
		"fillOpacity": true,
		"flexGrow": true,
		"flexShrink": true,
		"fontWeight": true,
		"lineHeight": true,
		"opacity": true,
		"order": true,
		"orphans": true,
		"widows": true,
		"zIndex": true,
		"zoom": true
	},

	// Add in properties whose names you wish to fix before
	// setting or getting the value
	cssProps: {

		// normalize float css property
		"float": support.cssFloat ? "cssFloat" : "styleFloat"
	},

	// Get and set the style property on a DOM Node
	style: function( elem, name, value, extra ) {

		// Don't set styles on text and comment nodes
		if ( !elem || elem.nodeType === 3 || elem.nodeType === 8 || !elem.style ) {
			return;
		}

		// Make sure that we're working with the right name
		var ret, type, hooks,
			origName = jQuery.camelCase( name ),
			style = elem.style;

		name = jQuery.cssProps[ origName ] ||
			( jQuery.cssProps[ origName ] = vendorPropName( origName ) || origName );

		// gets hook for the prefixed version
		// followed by the unprefixed version
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// Check if we're setting a value
		if ( value !== undefined ) {
			type = typeof value;

			// Convert "+=" or "-=" to relative numbers (#7345)
			if ( type === "string" && ( ret = rcssNum.exec( value ) ) && ret[ 1 ] ) {
				value = adjustCSS( elem, name, ret );

				// Fixes bug #9237
				type = "number";
			}

			// Make sure that null and NaN values aren't set. See: #7116
			if ( value == null || value !== value ) {
				return;
			}

			// If a number was passed in, add the unit (except for certain CSS properties)
			if ( type === "number" ) {
				value += ret && ret[ 3 ] || ( jQuery.cssNumber[ origName ] ? "" : "px" );
			}

			// Fixes #8908, it can be done more correctly by specifing setters in cssHooks,
			// but it would mean to define eight
			// (for every problematic property) identical functions
			if ( !support.clearCloneStyle && value === "" && name.indexOf( "background" ) === 0 ) {
				style[ name ] = "inherit";
			}

			// If a hook was provided, use that value, otherwise just set the specified value
			if ( !hooks || !( "set" in hooks ) ||
				( value = hooks.set( elem, value, extra ) ) !== undefined ) {

				// Support: IE
				// Swallow errors from 'invalid' CSS values (#5509)
				try {
					style[ name ] = value;
				} catch ( e ) {}
			}

		} else {

			// If a hook was provided get the non-computed value from there
			if ( hooks && "get" in hooks &&
				( ret = hooks.get( elem, false, extra ) ) !== undefined ) {

				return ret;
			}

			// Otherwise just get the value from the style object
			return style[ name ];
		}
	},

	css: function( elem, name, extra, styles ) {
		var num, val, hooks,
			origName = jQuery.camelCase( name );

		// Make sure that we're working with the right name
		name = jQuery.cssProps[ origName ] ||
			( jQuery.cssProps[ origName ] = vendorPropName( origName ) || origName );

		// gets hook for the prefixed version
		// followed by the unprefixed version
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// If a hook was provided get the computed value from there
		if ( hooks && "get" in hooks ) {
			val = hooks.get( elem, true, extra );
		}

		// Otherwise, if a way to get the computed value exists, use that
		if ( val === undefined ) {
			val = curCSS( elem, name, styles );
		}

		//convert "normal" to computed value
		if ( val === "normal" && name in cssNormalTransform ) {
			val = cssNormalTransform[ name ];
		}

		// Return, converting to number if forced or a qualifier was provided and val looks numeric
		if ( extra === "" || extra ) {
			num = parseFloat( val );
			return extra === true || isFinite( num ) ? num || 0 : val;
		}
		return val;
	}
} );

jQuery.each( [ "height", "width" ], function( i, name ) {
	jQuery.cssHooks[ name ] = {
		get: function( elem, computed, extra ) {
			if ( computed ) {

				// certain elements can have dimension info if we invisibly show them
				// however, it must have a current display style that would benefit from this
				return rdisplayswap.test( jQuery.css( elem, "display" ) ) &&
					elem.offsetWidth === 0 ?
						swap( elem, cssShow, function() {
							return getWidthOrHeight( elem, name, extra );
						} ) :
						getWidthOrHeight( elem, name, extra );
			}
		},

		set: function( elem, value, extra ) {
			var styles = extra && getStyles( elem );
			return setPositiveNumber( elem, value, extra ?
				augmentWidthOrHeight(
					elem,
					name,
					extra,
					support.boxSizing &&
						jQuery.css( elem, "boxSizing", false, styles ) === "border-box",
					styles
				) : 0
			);
		}
	};
} );

if ( !support.opacity ) {
	jQuery.cssHooks.opacity = {
		get: function( elem, computed ) {

			// IE uses filters for opacity
			return ropacity.test( ( computed && elem.currentStyle ?
				elem.currentStyle.filter :
				elem.style.filter ) || "" ) ?
					( 0.01 * parseFloat( RegExp.$1 ) ) + "" :
					computed ? "1" : "";
		},

		set: function( elem, value ) {
			var style = elem.style,
				currentStyle = elem.currentStyle,
				opacity = jQuery.isNumeric( value ) ? "alpha(opacity=" + value * 100 + ")" : "",
				filter = currentStyle && currentStyle.filter || style.filter || "";

			// IE has trouble with opacity if it does not have layout
			// Force it by setting the zoom level
			style.zoom = 1;

			// if setting opacity to 1, and no other filters exist -
			// attempt to remove filter attribute #6652
			// if value === "", then remove inline opacity #12685
			if ( ( value >= 1 || value === "" ) &&
					jQuery.trim( filter.replace( ralpha, "" ) ) === "" &&
					style.removeAttribute ) {

				// Setting style.filter to null, "" & " " still leave "filter:" in the cssText
				// if "filter:" is present at all, clearType is disabled, we want to avoid this
				// style.removeAttribute is IE Only, but so apparently is this code path...
				style.removeAttribute( "filter" );

				// if there is no filter style applied in a css rule
				// or unset inline opacity, we are done
				if ( value === "" || currentStyle && !currentStyle.filter ) {
					return;
				}
			}

			// otherwise, set new filter values
			style.filter = ralpha.test( filter ) ?
				filter.replace( ralpha, opacity ) :
				filter + " " + opacity;
		}
	};
}

jQuery.cssHooks.marginRight = addGetHookIf( support.reliableMarginRight,
	function( elem, computed ) {
		if ( computed ) {
			return swap( elem, { "display": "inline-block" },
				curCSS, [ elem, "marginRight" ] );
		}
	}
);

jQuery.cssHooks.marginLeft = addGetHookIf( support.reliableMarginLeft,
	function( elem, computed ) {
		if ( computed ) {
			return (
				parseFloat( curCSS( elem, "marginLeft" ) ) ||

				// Support: IE<=11+
				// Running getBoundingClientRect on a disconnected node in IE throws an error
				// Support: IE8 only
				// getClientRects() errors on disconnected elems
				( jQuery.contains( elem.ownerDocument, elem ) ?
					elem.getBoundingClientRect().left -
						swap( elem, { marginLeft: 0 }, function() {
							return elem.getBoundingClientRect().left;
						} ) :
					0
				)
			) + "px";
		}
	}
);

// These hooks are used by animate to expand properties
jQuery.each( {
	margin: "",
	padding: "",
	border: "Width"
}, function( prefix, suffix ) {
	jQuery.cssHooks[ prefix + suffix ] = {
		expand: function( value ) {
			var i = 0,
				expanded = {},

				// assumes a single number if not a string
				parts = typeof value === "string" ? value.split( " " ) : [ value ];

			for ( ; i < 4; i++ ) {
				expanded[ prefix + cssExpand[ i ] + suffix ] =
					parts[ i ] || parts[ i - 2 ] || parts[ 0 ];
			}

			return expanded;
		}
	};

	if ( !rmargin.test( prefix ) ) {
		jQuery.cssHooks[ prefix + suffix ].set = setPositiveNumber;
	}
} );

jQuery.fn.extend( {
	css: function( name, value ) {
		return access( this, function( elem, name, value ) {
			var styles, len,
				map = {},
				i = 0;

			if ( jQuery.isArray( name ) ) {
				styles = getStyles( elem );
				len = name.length;

				for ( ; i < len; i++ ) {
					map[ name[ i ] ] = jQuery.css( elem, name[ i ], false, styles );
				}

				return map;
			}

			return value !== undefined ?
				jQuery.style( elem, name, value ) :
				jQuery.css( elem, name );
		}, name, value, arguments.length > 1 );
	},
	show: function() {
		return showHide( this, true );
	},
	hide: function() {
		return showHide( this );
	},
	toggle: function( state ) {
		if ( typeof state === "boolean" ) {
			return state ? this.show() : this.hide();
		}

		return this.each( function() {
			if ( isHidden( this ) ) {
				jQuery( this ).show();
			} else {
				jQuery( this ).hide();
			}
		} );
	}
} );


function Tween( elem, options, prop, end, easing ) {
	return new Tween.prototype.init( elem, options, prop, end, easing );
}
jQuery.Tween = Tween;

Tween.prototype = {
	constructor: Tween,
	init: function( elem, options, prop, end, easing, unit ) {
		this.elem = elem;
		this.prop = prop;
		this.easing = easing || jQuery.easing._default;
		this.options = options;
		this.start = this.now = this.cur();
		this.end = end;
		this.unit = unit || ( jQuery.cssNumber[ prop ] ? "" : "px" );
	},
	cur: function() {
		var hooks = Tween.propHooks[ this.prop ];

		return hooks && hooks.get ?
			hooks.get( this ) :
			Tween.propHooks._default.get( this );
	},
	run: function( percent ) {
		var eased,
			hooks = Tween.propHooks[ this.prop ];

		if ( this.options.duration ) {
			this.pos = eased = jQuery.easing[ this.easing ](
				percent, this.options.duration * percent, 0, 1, this.options.duration
			);
		} else {
			this.pos = eased = percent;
		}
		this.now = ( this.end - this.start ) * eased + this.start;

		if ( this.options.step ) {
			this.options.step.call( this.elem, this.now, this );
		}

		if ( hooks && hooks.set ) {
			hooks.set( this );
		} else {
			Tween.propHooks._default.set( this );
		}
		return this;
	}
};

Tween.prototype.init.prototype = Tween.prototype;

Tween.propHooks = {
	_default: {
		get: function( tween ) {
			var result;

			// Use a property on the element directly when it is not a DOM element,
			// or when there is no matching style property that exists.
			if ( tween.elem.nodeType !== 1 ||
				tween.elem[ tween.prop ] != null && tween.elem.style[ tween.prop ] == null ) {
				return tween.elem[ tween.prop ];
			}

			// passing an empty string as a 3rd parameter to .css will automatically
			// attempt a parseFloat and fallback to a string if the parse fails
			// so, simple values such as "10px" are parsed to Float.
			// complex values such as "rotate(1rad)" are returned as is.
			result = jQuery.css( tween.elem, tween.prop, "" );

			// Empty strings, null, undefined and "auto" are converted to 0.
			return !result || result === "auto" ? 0 : result;
		},
		set: function( tween ) {

			// use step hook for back compat - use cssHook if its there - use .style if its
			// available and use plain properties where available
			if ( jQuery.fx.step[ tween.prop ] ) {
				jQuery.fx.step[ tween.prop ]( tween );
			} else if ( tween.elem.nodeType === 1 &&
				( tween.elem.style[ jQuery.cssProps[ tween.prop ] ] != null ||
					jQuery.cssHooks[ tween.prop ] ) ) {
				jQuery.style( tween.elem, tween.prop, tween.now + tween.unit );
			} else {
				tween.elem[ tween.prop ] = tween.now;
			}
		}
	}
};

// Support: IE <=9
// Panic based approach to setting things on disconnected nodes

Tween.propHooks.scrollTop = Tween.propHooks.scrollLeft = {
	set: function( tween ) {
		if ( tween.elem.nodeType && tween.elem.parentNode ) {
			tween.elem[ tween.prop ] = tween.now;
		}
	}
};

jQuery.easing = {
	linear: function( p ) {
		return p;
	},
	swing: function( p ) {
		return 0.5 - Math.cos( p * Math.PI ) / 2;
	},
	_default: "swing"
};

jQuery.fx = Tween.prototype.init;

// Back Compat <1.8 extension point
jQuery.fx.step = {};




var
	fxNow, timerId,
	rfxtypes = /^(?:toggle|show|hide)$/,
	rrun = /queueHooks$/;

// Animations created synchronously will run synchronously
function createFxNow() {
	window.setTimeout( function() {
		fxNow = undefined;
	} );
	return ( fxNow = jQuery.now() );
}

// Generate parameters to create a standard animation
function genFx( type, includeWidth ) {
	var which,
		attrs = { height: type },
		i = 0;

	// if we include width, step value is 1 to do all cssExpand values,
	// if we don't include width, step value is 2 to skip over Left and Right
	includeWidth = includeWidth ? 1 : 0;
	for ( ; i < 4 ; i += 2 - includeWidth ) {
		which = cssExpand[ i ];
		attrs[ "margin" + which ] = attrs[ "padding" + which ] = type;
	}

	if ( includeWidth ) {
		attrs.opacity = attrs.width = type;
	}

	return attrs;
}

function createTween( value, prop, animation ) {
	var tween,
		collection = ( Animation.tweeners[ prop ] || [] ).concat( Animation.tweeners[ "*" ] ),
		index = 0,
		length = collection.length;
	for ( ; index < length; index++ ) {
		if ( ( tween = collection[ index ].call( animation, prop, value ) ) ) {

			// we're done with this property
			return tween;
		}
	}
}

function defaultPrefilter( elem, props, opts ) {
	/* jshint validthis: true */
	var prop, value, toggle, tween, hooks, oldfire, display, checkDisplay,
		anim = this,
		orig = {},
		style = elem.style,
		hidden = elem.nodeType && isHidden( elem ),
		dataShow = jQuery._data( elem, "fxshow" );

	// handle queue: false promises
	if ( !opts.queue ) {
		hooks = jQuery._queueHooks( elem, "fx" );
		if ( hooks.unqueued == null ) {
			hooks.unqueued = 0;
			oldfire = hooks.empty.fire;
			hooks.empty.fire = function() {
				if ( !hooks.unqueued ) {
					oldfire();
				}
			};
		}
		hooks.unqueued++;

		anim.always( function() {

			// doing this makes sure that the complete handler will be called
			// before this completes
			anim.always( function() {
				hooks.unqueued--;
				if ( !jQuery.queue( elem, "fx" ).length ) {
					hooks.empty.fire();
				}
			} );
		} );
	}

	// height/width overflow pass
	if ( elem.nodeType === 1 && ( "height" in props || "width" in props ) ) {

		// Make sure that nothing sneaks out
		// Record all 3 overflow attributes because IE does not
		// change the overflow attribute when overflowX and
		// overflowY are set to the same value
		opts.overflow = [ style.overflow, style.overflowX, style.overflowY ];

		// Set display property to inline-block for height/width
		// animations on inline elements that are having width/height animated
		display = jQuery.css( elem, "display" );

		// Test default display if display is currently "none"
		checkDisplay = display === "none" ?
			jQuery._data( elem, "olddisplay" ) || defaultDisplay( elem.nodeName ) : display;

		if ( checkDisplay === "inline" && jQuery.css( elem, "float" ) === "none" ) {

			// inline-level elements accept inline-block;
			// block-level elements need to be inline with layout
			if ( !support.inlineBlockNeedsLayout || defaultDisplay( elem.nodeName ) === "inline" ) {
				style.display = "inline-block";
			} else {
				style.zoom = 1;
			}
		}
	}

	if ( opts.overflow ) {
		style.overflow = "hidden";
		if ( !support.shrinkWrapBlocks() ) {
			anim.always( function() {
				style.overflow = opts.overflow[ 0 ];
				style.overflowX = opts.overflow[ 1 ];
				style.overflowY = opts.overflow[ 2 ];
			} );
		}
	}

	// show/hide pass
	for ( prop in props ) {
		value = props[ prop ];
		if ( rfxtypes.exec( value ) ) {
			delete props[ prop ];
			toggle = toggle || value === "toggle";
			if ( value === ( hidden ? "hide" : "show" ) ) {

				// If there is dataShow left over from a stopped hide or show
				// and we are going to proceed with show, we should pretend to be hidden
				if ( value === "show" && dataShow && dataShow[ prop ] !== undefined ) {
					hidden = true;
				} else {
					continue;
				}
			}
			orig[ prop ] = dataShow && dataShow[ prop ] || jQuery.style( elem, prop );

		// Any non-fx value stops us from restoring the original display value
		} else {
			display = undefined;
		}
	}

	if ( !jQuery.isEmptyObject( orig ) ) {
		if ( dataShow ) {
			if ( "hidden" in dataShow ) {
				hidden = dataShow.hidden;
			}
		} else {
			dataShow = jQuery._data( elem, "fxshow", {} );
		}

		// store state if its toggle - enables .stop().toggle() to "reverse"
		if ( toggle ) {
			dataShow.hidden = !hidden;
		}
		if ( hidden ) {
			jQuery( elem ).show();
		} else {
			anim.done( function() {
				jQuery( elem ).hide();
			} );
		}
		anim.done( function() {
			var prop;
			jQuery._removeData( elem, "fxshow" );
			for ( prop in orig ) {
				jQuery.style( elem, prop, orig[ prop ] );
			}
		} );
		for ( prop in orig ) {
			tween = createTween( hidden ? dataShow[ prop ] : 0, prop, anim );

			if ( !( prop in dataShow ) ) {
				dataShow[ prop ] = tween.start;
				if ( hidden ) {
					tween.end = tween.start;
					tween.start = prop === "width" || prop === "height" ? 1 : 0;
				}
			}
		}

	// If this is a noop like .hide().hide(), restore an overwritten display value
	} else if ( ( display === "none" ? defaultDisplay( elem.nodeName ) : display ) === "inline" ) {
		style.display = display;
	}
}

function propFilter( props, specialEasing ) {
	var index, name, easing, value, hooks;

	// camelCase, specialEasing and expand cssHook pass
	for ( index in props ) {
		name = jQuery.camelCase( index );
		easing = specialEasing[ name ];
		value = props[ index ];
		if ( jQuery.isArray( value ) ) {
			easing = value[ 1 ];
			value = props[ index ] = value[ 0 ];
		}

		if ( index !== name ) {
			props[ name ] = value;
			delete props[ index ];
		}

		hooks = jQuery.cssHooks[ name ];
		if ( hooks && "expand" in hooks ) {
			value = hooks.expand( value );
			delete props[ name ];

			// not quite $.extend, this wont overwrite keys already present.
			// also - reusing 'index' from above because we have the correct "name"
			for ( index in value ) {
				if ( !( index in props ) ) {
					props[ index ] = value[ index ];
					specialEasing[ index ] = easing;
				}
			}
		} else {
			specialEasing[ name ] = easing;
		}
	}
}

function Animation( elem, properties, options ) {
	var result,
		stopped,
		index = 0,
		length = Animation.prefilters.length,
		deferred = jQuery.Deferred().always( function() {

			// don't match elem in the :animated selector
			delete tick.elem;
		} ),
		tick = function() {
			if ( stopped ) {
				return false;
			}
			var currentTime = fxNow || createFxNow(),
				remaining = Math.max( 0, animation.startTime + animation.duration - currentTime ),

				// Support: Android 2.3
				// Archaic crash bug won't allow us to use `1 - ( 0.5 || 0 )` (#12497)
				temp = remaining / animation.duration || 0,
				percent = 1 - temp,
				index = 0,
				length = animation.tweens.length;

			for ( ; index < length ; index++ ) {
				animation.tweens[ index ].run( percent );
			}

			deferred.notifyWith( elem, [ animation, percent, remaining ] );

			if ( percent < 1 && length ) {
				return remaining;
			} else {
				deferred.resolveWith( elem, [ animation ] );
				return false;
			}
		},
		animation = deferred.promise( {
			elem: elem,
			props: jQuery.extend( {}, properties ),
			opts: jQuery.extend( true, {
				specialEasing: {},
				easing: jQuery.easing._default
			}, options ),
			originalProperties: properties,
			originalOptions: options,
			startTime: fxNow || createFxNow(),
			duration: options.duration,
			tweens: [],
			createTween: function( prop, end ) {
				var tween = jQuery.Tween( elem, animation.opts, prop, end,
						animation.opts.specialEasing[ prop ] || animation.opts.easing );
				animation.tweens.push( tween );
				return tween;
			},
			stop: function( gotoEnd ) {
				var index = 0,

					// if we are going to the end, we want to run all the tweens
					// otherwise we skip this part
					length = gotoEnd ? animation.tweens.length : 0;
				if ( stopped ) {
					return this;
				}
				stopped = true;
				for ( ; index < length ; index++ ) {
					animation.tweens[ index ].run( 1 );
				}

				// resolve when we played the last frame
				// otherwise, reject
				if ( gotoEnd ) {
					deferred.notifyWith( elem, [ animation, 1, 0 ] );
					deferred.resolveWith( elem, [ animation, gotoEnd ] );
				} else {
					deferred.rejectWith( elem, [ animation, gotoEnd ] );
				}
				return this;
			}
		} ),
		props = animation.props;

	propFilter( props, animation.opts.specialEasing );

	for ( ; index < length ; index++ ) {
		result = Animation.prefilters[ index ].call( animation, elem, props, animation.opts );
		if ( result ) {
			if ( jQuery.isFunction( result.stop ) ) {
				jQuery._queueHooks( animation.elem, animation.opts.queue ).stop =
					jQuery.proxy( result.stop, result );
			}
			return result;
		}
	}

	jQuery.map( props, createTween, animation );

	if ( jQuery.isFunction( animation.opts.start ) ) {
		animation.opts.start.call( elem, animation );
	}

	jQuery.fx.timer(
		jQuery.extend( tick, {
			elem: elem,
			anim: animation,
			queue: animation.opts.queue
		} )
	);

	// attach callbacks from options
	return animation.progress( animation.opts.progress )
		.done( animation.opts.done, animation.opts.complete )
		.fail( animation.opts.fail )
		.always( animation.opts.always );
}

jQuery.Animation = jQuery.extend( Animation, {

	tweeners: {
		"*": [ function( prop, value ) {
			var tween = this.createTween( prop, value );
			adjustCSS( tween.elem, prop, rcssNum.exec( value ), tween );
			return tween;
		} ]
	},

	tweener: function( props, callback ) {
		if ( jQuery.isFunction( props ) ) {
			callback = props;
			props = [ "*" ];
		} else {
			props = props.match( rnotwhite );
		}

		var prop,
			index = 0,
			length = props.length;

		for ( ; index < length ; index++ ) {
			prop = props[ index ];
			Animation.tweeners[ prop ] = Animation.tweeners[ prop ] || [];
			Animation.tweeners[ prop ].unshift( callback );
		}
	},

	prefilters: [ defaultPrefilter ],

	prefilter: function( callback, prepend ) {
		if ( prepend ) {
			Animation.prefilters.unshift( callback );
		} else {
			Animation.prefilters.push( callback );
		}
	}
} );

jQuery.speed = function( speed, easing, fn ) {
	var opt = speed && typeof speed === "object" ? jQuery.extend( {}, speed ) : {
		complete: fn || !fn && easing ||
			jQuery.isFunction( speed ) && speed,
		duration: speed,
		easing: fn && easing || easing && !jQuery.isFunction( easing ) && easing
	};

	opt.duration = jQuery.fx.off ? 0 : typeof opt.duration === "number" ? opt.duration :
		opt.duration in jQuery.fx.speeds ?
			jQuery.fx.speeds[ opt.duration ] : jQuery.fx.speeds._default;

	// normalize opt.queue - true/undefined/null -> "fx"
	if ( opt.queue == null || opt.queue === true ) {
		opt.queue = "fx";
	}

	// Queueing
	opt.old = opt.complete;

	opt.complete = function() {
		if ( jQuery.isFunction( opt.old ) ) {
			opt.old.call( this );
		}

		if ( opt.queue ) {
			jQuery.dequeue( this, opt.queue );
		}
	};

	return opt;
};

jQuery.fn.extend( {
	fadeTo: function( speed, to, easing, callback ) {

		// show any hidden elements after setting opacity to 0
		return this.filter( isHidden ).css( "opacity", 0 ).show()

			// animate to the value specified
			.end().animate( { opacity: to }, speed, easing, callback );
	},
	animate: function( prop, speed, easing, callback ) {
		var empty = jQuery.isEmptyObject( prop ),
			optall = jQuery.speed( speed, easing, callback ),
			doAnimation = function() {

				// Operate on a copy of prop so per-property easing won't be lost
				var anim = Animation( this, jQuery.extend( {}, prop ), optall );

				// Empty animations, or finishing resolves immediately
				if ( empty || jQuery._data( this, "finish" ) ) {
					anim.stop( true );
				}
			};
			doAnimation.finish = doAnimation;

		return empty || optall.queue === false ?
			this.each( doAnimation ) :
			this.queue( optall.queue, doAnimation );
	},
	stop: function( type, clearQueue, gotoEnd ) {
		var stopQueue = function( hooks ) {
			var stop = hooks.stop;
			delete hooks.stop;
			stop( gotoEnd );
		};

		if ( typeof type !== "string" ) {
			gotoEnd = clearQueue;
			clearQueue = type;
			type = undefined;
		}
		if ( clearQueue && type !== false ) {
			this.queue( type || "fx", [] );
		}

		return this.each( function() {
			var dequeue = true,
				index = type != null && type + "queueHooks",
				timers = jQuery.timers,
				data = jQuery._data( this );

			if ( index ) {
				if ( data[ index ] && data[ index ].stop ) {
					stopQueue( data[ index ] );
				}
			} else {
				for ( index in data ) {
					if ( data[ index ] && data[ index ].stop && rrun.test( index ) ) {
						stopQueue( data[ index ] );
					}
				}
			}

			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this &&
					( type == null || timers[ index ].queue === type ) ) {

					timers[ index ].anim.stop( gotoEnd );
					dequeue = false;
					timers.splice( index, 1 );
				}
			}

			// start the next in the queue if the last step wasn't forced
			// timers currently will call their complete callbacks, which will dequeue
			// but only if they were gotoEnd
			if ( dequeue || !gotoEnd ) {
				jQuery.dequeue( this, type );
			}
		} );
	},
	finish: function( type ) {
		if ( type !== false ) {
			type = type || "fx";
		}
		return this.each( function() {
			var index,
				data = jQuery._data( this ),
				queue = data[ type + "queue" ],
				hooks = data[ type + "queueHooks" ],
				timers = jQuery.timers,
				length = queue ? queue.length : 0;

			// enable finishing flag on private data
			data.finish = true;

			// empty the queue first
			jQuery.queue( this, type, [] );

			if ( hooks && hooks.stop ) {
				hooks.stop.call( this, true );
			}

			// look for any active animations, and finish them
			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this && timers[ index ].queue === type ) {
					timers[ index ].anim.stop( true );
					timers.splice( index, 1 );
				}
			}

			// look for any animations in the old queue and finish them
			for ( index = 0; index < length; index++ ) {
				if ( queue[ index ] && queue[ index ].finish ) {
					queue[ index ].finish.call( this );
				}
			}

			// turn off finishing flag
			delete data.finish;
		} );
	}
} );

jQuery.each( [ "toggle", "show", "hide" ], function( i, name ) {
	var cssFn = jQuery.fn[ name ];
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return speed == null || typeof speed === "boolean" ?
			cssFn.apply( this, arguments ) :
			this.animate( genFx( name, true ), speed, easing, callback );
	};
} );

// Generate shortcuts for custom animations
jQuery.each( {
	slideDown: genFx( "show" ),
	slideUp: genFx( "hide" ),
	slideToggle: genFx( "toggle" ),
	fadeIn: { opacity: "show" },
	fadeOut: { opacity: "hide" },
	fadeToggle: { opacity: "toggle" }
}, function( name, props ) {
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return this.animate( props, speed, easing, callback );
	};
} );

jQuery.timers = [];
jQuery.fx.tick = function() {
	var timer,
		timers = jQuery.timers,
		i = 0;

	fxNow = jQuery.now();

	for ( ; i < timers.length; i++ ) {
		timer = timers[ i ];

		// Checks the timer has not already been removed
		if ( !timer() && timers[ i ] === timer ) {
			timers.splice( i--, 1 );
		}
	}

	if ( !timers.length ) {
		jQuery.fx.stop();
	}
	fxNow = undefined;
};

jQuery.fx.timer = function( timer ) {
	jQuery.timers.push( timer );
	if ( timer() ) {
		jQuery.fx.start();
	} else {
		jQuery.timers.pop();
	}
};

jQuery.fx.interval = 13;

jQuery.fx.start = function() {
	if ( !timerId ) {
		timerId = window.setInterval( jQuery.fx.tick, jQuery.fx.interval );
	}
};

jQuery.fx.stop = function() {
	window.clearInterval( timerId );
	timerId = null;
};

jQuery.fx.speeds = {
	slow: 600,
	fast: 200,

	// Default speed
	_default: 400
};


// Based off of the plugin by Clint Helfers, with permission.
// http://web.archive.org/web/20100324014747/http://blindsignals.com/index.php/2009/07/jquery-delay/
jQuery.fn.delay = function( time, type ) {
	time = jQuery.fx ? jQuery.fx.speeds[ time ] || time : time;
	type = type || "fx";

	return this.queue( type, function( next, hooks ) {
		var timeout = window.setTimeout( next, time );
		hooks.stop = function() {
			window.clearTimeout( timeout );
		};
	} );
};


( function() {
	var a,
		input = document.createElement( "input" ),
		div = document.createElement( "div" ),
		select = document.createElement( "select" ),
		opt = select.appendChild( document.createElement( "option" ) );

	// Setup
	div = document.createElement( "div" );
	div.setAttribute( "className", "t" );
	div.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>";
	a = div.getElementsByTagName( "a" )[ 0 ];

	// Support: Windows Web Apps (WWA)
	// `type` must use .setAttribute for WWA (#14901)
	input.setAttribute( "type", "checkbox" );
	div.appendChild( input );

	a = div.getElementsByTagName( "a" )[ 0 ];

	// First batch of tests.
	a.style.cssText = "top:1px";

	// Test setAttribute on camelCase class.
	// If it works, we need attrFixes when doing get/setAttribute (ie6/7)
	support.getSetAttribute = div.className !== "t";

	// Get the style information from getAttribute
	// (IE uses .cssText instead)
	support.style = /top/.test( a.getAttribute( "style" ) );

	// Make sure that URLs aren't manipulated
	// (IE normalizes it by default)
	support.hrefNormalized = a.getAttribute( "href" ) === "/a";

	// Check the default checkbox/radio value ("" on WebKit; "on" elsewhere)
	support.checkOn = !!input.value;

	// Make sure that a selected-by-default option has a working selected property.
	// (WebKit defaults to false instead of true, IE too, if it's in an optgroup)
	support.optSelected = opt.selected;

	// Tests for enctype support on a form (#6743)
	support.enctype = !!document.createElement( "form" ).enctype;

	// Make sure that the options inside disabled selects aren't marked as disabled
	// (WebKit marks them as disabled)
	select.disabled = true;
	support.optDisabled = !opt.disabled;

	// Support: IE8 only
	// Check if we can trust getAttribute("value")
	input = document.createElement( "input" );
	input.setAttribute( "value", "" );
	support.input = input.getAttribute( "value" ) === "";

	// Check if an input maintains its value after becoming a radio
	input.value = "t";
	input.setAttribute( "type", "radio" );
	support.radioValue = input.value === "t";
} )();


var rreturn = /\r/g,
	rspaces = /[\x20\t\r\n\f]+/g;

jQuery.fn.extend( {
	val: function( value ) {
		var hooks, ret, isFunction,
			elem = this[ 0 ];

		if ( !arguments.length ) {
			if ( elem ) {
				hooks = jQuery.valHooks[ elem.type ] ||
					jQuery.valHooks[ elem.nodeName.toLowerCase() ];

				if (
					hooks &&
					"get" in hooks &&
					( ret = hooks.get( elem, "value" ) ) !== undefined
				) {
					return ret;
				}

				ret = elem.value;

				return typeof ret === "string" ?

					// handle most common string cases
					ret.replace( rreturn, "" ) :

					// handle cases where value is null/undef or number
					ret == null ? "" : ret;
			}

			return;
		}

		isFunction = jQuery.isFunction( value );

		return this.each( function( i ) {
			var val;

			if ( this.nodeType !== 1 ) {
				return;
			}

			if ( isFunction ) {
				val = value.call( this, i, jQuery( this ).val() );
			} else {
				val = value;
			}

			// Treat null/undefined as ""; convert numbers to string
			if ( val == null ) {
				val = "";
			} else if ( typeof val === "number" ) {
				val += "";
			} else if ( jQuery.isArray( val ) ) {
				val = jQuery.map( val, function( value ) {
					return value == null ? "" : value + "";
				} );
			}

			hooks = jQuery.valHooks[ this.type ] || jQuery.valHooks[ this.nodeName.toLowerCase() ];

			// If set returns undefined, fall back to normal setting
			if ( !hooks || !( "set" in hooks ) || hooks.set( this, val, "value" ) === undefined ) {
				this.value = val;
			}
		} );
	}
} );

jQuery.extend( {
	valHooks: {
		option: {
			get: function( elem ) {
				var val = jQuery.find.attr( elem, "value" );
				return val != null ?
					val :

					// Support: IE10-11+
					// option.text throws exceptions (#14686, #14858)
					// Strip and collapse whitespace
					// https://html.spec.whatwg.org/#strip-and-collapse-whitespace
					jQuery.trim( jQuery.text( elem ) ).replace( rspaces, " " );
			}
		},
		select: {
			get: function( elem ) {
				var value, option,
					options = elem.options,
					index = elem.selectedIndex,
					one = elem.type === "select-one" || index < 0,
					values = one ? null : [],
					max = one ? index + 1 : options.length,
					i = index < 0 ?
						max :
						one ? index : 0;

				// Loop through all the selected options
				for ( ; i < max; i++ ) {
					option = options[ i ];

					// oldIE doesn't update selected after form reset (#2551)
					if ( ( option.selected || i === index ) &&

							// Don't return options that are disabled or in a disabled optgroup
							( support.optDisabled ?
								!option.disabled :
								option.getAttribute( "disabled" ) === null ) &&
							( !option.parentNode.disabled ||
								!jQuery.nodeName( option.parentNode, "optgroup" ) ) ) {

						// Get the specific value for the option
						value = jQuery( option ).val();

						// We don't need an array for one selects
						if ( one ) {
							return value;
						}

						// Multi-Selects return an array
						values.push( value );
					}
				}

				return values;
			},

			set: function( elem, value ) {
				var optionSet, option,
					options = elem.options,
					values = jQuery.makeArray( value ),
					i = options.length;

				while ( i-- ) {
					option = options[ i ];

					if ( jQuery.inArray( jQuery.valHooks.option.get( option ), values ) > -1 ) {

						// Support: IE6
						// When new option element is added to select box we need to
						// force reflow of newly added node in order to workaround delay
						// of initialization properties
						try {
							option.selected = optionSet = true;

						} catch ( _ ) {

							// Will be executed only in IE6
							option.scrollHeight;
						}

					} else {
						option.selected = false;
					}
				}

				// Force browsers to behave consistently when non-matching value is set
				if ( !optionSet ) {
					elem.selectedIndex = -1;
				}

				return options;
			}
		}
	}
} );

// Radios and checkboxes getter/setter
jQuery.each( [ "radio", "checkbox" ], function() {
	jQuery.valHooks[ this ] = {
		set: function( elem, value ) {
			if ( jQuery.isArray( value ) ) {
				return ( elem.checked = jQuery.inArray( jQuery( elem ).val(), value ) > -1 );
			}
		}
	};
	if ( !support.checkOn ) {
		jQuery.valHooks[ this ].get = function( elem ) {
			return elem.getAttribute( "value" ) === null ? "on" : elem.value;
		};
	}
} );




var nodeHook, boolHook,
	attrHandle = jQuery.expr.attrHandle,
	ruseDefault = /^(?:checked|selected)$/i,
	getSetAttribute = support.getSetAttribute,
	getSetInput = support.input;

jQuery.fn.extend( {
	attr: function( name, value ) {
		return access( this, jQuery.attr, name, value, arguments.length > 1 );
	},

	removeAttr: function( name ) {
		return this.each( function() {
			jQuery.removeAttr( this, name );
		} );
	}
} );

jQuery.extend( {
	attr: function( elem, name, value ) {
		var ret, hooks,
			nType = elem.nodeType;

		// Don't get/set attributes on text, comment and attribute nodes
		if ( nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		// Fallback to prop when attributes are not supported
		if ( typeof elem.getAttribute === "undefined" ) {
			return jQuery.prop( elem, name, value );
		}

		// All attributes are lowercase
		// Grab necessary hook if one is defined
		if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {
			name = name.toLowerCase();
			hooks = jQuery.attrHooks[ name ] ||
				( jQuery.expr.match.bool.test( name ) ? boolHook : nodeHook );
		}

		if ( value !== undefined ) {
			if ( value === null ) {
				jQuery.removeAttr( elem, name );
				return;
			}

			if ( hooks && "set" in hooks &&
				( ret = hooks.set( elem, value, name ) ) !== undefined ) {
				return ret;
			}

			elem.setAttribute( name, value + "" );
			return value;
		}

		if ( hooks && "get" in hooks && ( ret = hooks.get( elem, name ) ) !== null ) {
			return ret;
		}

		ret = jQuery.find.attr( elem, name );

		// Non-existent attributes return null, we normalize to undefined
		return ret == null ? undefined : ret;
	},

	attrHooks: {
		type: {
			set: function( elem, value ) {
				if ( !support.radioValue && value === "radio" &&
					jQuery.nodeName( elem, "input" ) ) {

					// Setting the type on a radio button after the value resets the value in IE8-9
					// Reset value to default in case type is set after value during creation
					var val = elem.value;
					elem.setAttribute( "type", value );
					if ( val ) {
						elem.value = val;
					}
					return value;
				}
			}
		}
	},

	removeAttr: function( elem, value ) {
		var name, propName,
			i = 0,
			attrNames = value && value.match( rnotwhite );

		if ( attrNames && elem.nodeType === 1 ) {
			while ( ( name = attrNames[ i++ ] ) ) {
				propName = jQuery.propFix[ name ] || name;

				// Boolean attributes get special treatment (#10870)
				if ( jQuery.expr.match.bool.test( name ) ) {

					// Set corresponding property to false
					if ( getSetInput && getSetAttribute || !ruseDefault.test( name ) ) {
						elem[ propName ] = false;

					// Support: IE<9
					// Also clear defaultChecked/defaultSelected (if appropriate)
					} else {
						elem[ jQuery.camelCase( "default-" + name ) ] =
							elem[ propName ] = false;
					}

				// See #9699 for explanation of this approach (setting first, then removal)
				} else {
					jQuery.attr( elem, name, "" );
				}

				elem.removeAttribute( getSetAttribute ? name : propName );
			}
		}
	}
} );

// Hooks for boolean attributes
boolHook = {
	set: function( elem, value, name ) {
		if ( value === false ) {

			// Remove boolean attributes when set to false
			jQuery.removeAttr( elem, name );
		} else if ( getSetInput && getSetAttribute || !ruseDefault.test( name ) ) {

			// IE<8 needs the *property* name
			elem.setAttribute( !getSetAttribute && jQuery.propFix[ name ] || name, name );

		} else {

			// Support: IE<9
			// Use defaultChecked and defaultSelected for oldIE
			elem[ jQuery.camelCase( "default-" + name ) ] = elem[ name ] = true;
		}
		return name;
	}
};

jQuery.each( jQuery.expr.match.bool.source.match( /\w+/g ), function( i, name ) {
	var getter = attrHandle[ name ] || jQuery.find.attr;

	if ( getSetInput && getSetAttribute || !ruseDefault.test( name ) ) {
		attrHandle[ name ] = function( elem, name, isXML ) {
			var ret, handle;
			if ( !isXML ) {

				// Avoid an infinite loop by temporarily removing this function from the getter
				handle = attrHandle[ name ];
				attrHandle[ name ] = ret;
				ret = getter( elem, name, isXML ) != null ?
					name.toLowerCase() :
					null;
				attrHandle[ name ] = handle;
			}
			return ret;
		};
	} else {
		attrHandle[ name ] = function( elem, name, isXML ) {
			if ( !isXML ) {
				return elem[ jQuery.camelCase( "default-" + name ) ] ?
					name.toLowerCase() :
					null;
			}
		};
	}
} );

// fix oldIE attroperties
if ( !getSetInput || !getSetAttribute ) {
	jQuery.attrHooks.value = {
		set: function( elem, value, name ) {
			if ( jQuery.nodeName( elem, "input" ) ) {

				// Does not return so that setAttribute is also used
				elem.defaultValue = value;
			} else {

				// Use nodeHook if defined (#1954); otherwise setAttribute is fine
				return nodeHook && nodeHook.set( elem, value, name );
			}
		}
	};
}

// IE6/7 do not support getting/setting some attributes with get/setAttribute
if ( !getSetAttribute ) {

	// Use this for any attribute in IE6/7
	// This fixes almost every IE6/7 issue
	nodeHook = {
		set: function( elem, value, name ) {

			// Set the existing or create a new attribute node
			var ret = elem.getAttributeNode( name );
			if ( !ret ) {
				elem.setAttributeNode(
					( ret = elem.ownerDocument.createAttribute( name ) )
				);
			}

			ret.value = value += "";

			// Break association with cloned elements by also using setAttribute (#9646)
			if ( name === "value" || value === elem.getAttribute( name ) ) {
				return value;
			}
		}
	};

	// Some attributes are constructed with empty-string values when not defined
	attrHandle.id = attrHandle.name = attrHandle.coords =
		function( elem, name, isXML ) {
			var ret;
			if ( !isXML ) {
				return ( ret = elem.getAttributeNode( name ) ) && ret.value !== "" ?
					ret.value :
					null;
			}
		};

	// Fixing value retrieval on a button requires this module
	jQuery.valHooks.button = {
		get: function( elem, name ) {
			var ret = elem.getAttributeNode( name );
			if ( ret && ret.specified ) {
				return ret.value;
			}
		},
		set: nodeHook.set
	};

	// Set contenteditable to false on removals(#10429)
	// Setting to empty string throws an error as an invalid value
	jQuery.attrHooks.contenteditable = {
		set: function( elem, value, name ) {
			nodeHook.set( elem, value === "" ? false : value, name );
		}
	};

	// Set width and height to auto instead of 0 on empty string( Bug #8150 )
	// This is for removals
	jQuery.each( [ "width", "height" ], function( i, name ) {
		jQuery.attrHooks[ name ] = {
			set: function( elem, value ) {
				if ( value === "" ) {
					elem.setAttribute( name, "auto" );
					return value;
				}
			}
		};
	} );
}

if ( !support.style ) {
	jQuery.attrHooks.style = {
		get: function( elem ) {

			// Return undefined in the case of empty string
			// Note: IE uppercases css property names, but if we were to .toLowerCase()
			// .cssText, that would destroy case sensitivity in URL's, like in "background"
			return elem.style.cssText || undefined;
		},
		set: function( elem, value ) {
			return ( elem.style.cssText = value + "" );
		}
	};
}




var rfocusable = /^(?:input|select|textarea|button|object)$/i,
	rclickable = /^(?:a|area)$/i;

jQuery.fn.extend( {
	prop: function( name, value ) {
		return access( this, jQuery.prop, name, value, arguments.length > 1 );
	},

	removeProp: function( name ) {
		name = jQuery.propFix[ name ] || name;
		return this.each( function() {

			// try/catch handles cases where IE balks (such as removing a property on window)
			try {
				this[ name ] = undefined;
				delete this[ name ];
			} catch ( e ) {}
		} );
	}
} );

jQuery.extend( {
	prop: function( elem, name, value ) {
		var ret, hooks,
			nType = elem.nodeType;

		// Don't get/set properties on text, comment and attribute nodes
		if ( nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {

			// Fix name and attach hooks
			name = jQuery.propFix[ name ] || name;
			hooks = jQuery.propHooks[ name ];
		}

		if ( value !== undefined ) {
			if ( hooks && "set" in hooks &&
				( ret = hooks.set( elem, value, name ) ) !== undefined ) {
				return ret;
			}

			return ( elem[ name ] = value );
		}

		if ( hooks && "get" in hooks && ( ret = hooks.get( elem, name ) ) !== null ) {
			return ret;
		}

		return elem[ name ];
	},

	propHooks: {
		tabIndex: {
			get: function( elem ) {

				// elem.tabIndex doesn't always return the
				// correct value when it hasn't been explicitly set
				// http://fluidproject.org/blog/2008/01/09/getting-setting-and-removing-tabindex-values-with-javascript/
				// Use proper attribute retrieval(#12072)
				var tabindex = jQuery.find.attr( elem, "tabindex" );

				return tabindex ?
					parseInt( tabindex, 10 ) :
					rfocusable.test( elem.nodeName ) ||
						rclickable.test( elem.nodeName ) && elem.href ?
							0 :
							-1;
			}
		}
	},

	propFix: {
		"for": "htmlFor",
		"class": "className"
	}
} );

// Some attributes require a special call on IE
// http://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
if ( !support.hrefNormalized ) {

	// href/src property should get the full normalized URL (#10299/#12915)
	jQuery.each( [ "href", "src" ], function( i, name ) {
		jQuery.propHooks[ name ] = {
			get: function( elem ) {
				return elem.getAttribute( name, 4 );
			}
		};
	} );
}

// Support: Safari, IE9+
// Accessing the selectedIndex property
// forces the browser to respect setting selected
// on the option
// The getter ensures a default option is selected
// when in an optgroup
if ( !support.optSelected ) {
	jQuery.propHooks.selected = {
		get: function( elem ) {
			var parent = elem.parentNode;

			if ( parent ) {
				parent.selectedIndex;

				// Make sure that it also works with optgroups, see #5701
				if ( parent.parentNode ) {
					parent.parentNode.selectedIndex;
				}
			}
			return null;
		},
		set: function( elem ) {
			var parent = elem.parentNode;
			if ( parent ) {
				parent.selectedIndex;

				if ( parent.parentNode ) {
					parent.parentNode.selectedIndex;
				}
			}
		}
	};
}

jQuery.each( [
	"tabIndex",
	"readOnly",
	"maxLength",
	"cellSpacing",
	"cellPadding",
	"rowSpan",
	"colSpan",
	"useMap",
	"frameBorder",
	"contentEditable"
], function() {
	jQuery.propFix[ this.toLowerCase() ] = this;
} );

// IE6/7 call enctype encoding
if ( !support.enctype ) {
	jQuery.propFix.enctype = "encoding";
}




var rclass = /[\t\r\n\f]/g;

function getClass( elem ) {
	return jQuery.attr( elem, "class" ) || "";
}

jQuery.fn.extend( {
	addClass: function( value ) {
		var classes, elem, cur, curValue, clazz, j, finalValue,
			i = 0;

		if ( jQuery.isFunction( value ) ) {
			return this.each( function( j ) {
				jQuery( this ).addClass( value.call( this, j, getClass( this ) ) );
			} );
		}

		if ( typeof value === "string" && value ) {
			classes = value.match( rnotwhite ) || [];

			while ( ( elem = this[ i++ ] ) ) {
				curValue = getClass( elem );
				cur = elem.nodeType === 1 &&
					( " " + curValue + " " ).replace( rclass, " " );

				if ( cur ) {
					j = 0;
					while ( ( clazz = classes[ j++ ] ) ) {
						if ( cur.indexOf( " " + clazz + " " ) < 0 ) {
							cur += clazz + " ";
						}
					}

					// only assign if different to avoid unneeded rendering.
					finalValue = jQuery.trim( cur );
					if ( curValue !== finalValue ) {
						jQuery.attr( elem, "class", finalValue );
					}
				}
			}
		}

		return this;
	},

	removeClass: function( value ) {
		var classes, elem, cur, curValue, clazz, j, finalValue,
			i = 0;

		if ( jQuery.isFunction( value ) ) {
			return this.each( function( j ) {
				jQuery( this ).removeClass( value.call( this, j, getClass( this ) ) );
			} );
		}

		if ( !arguments.length ) {
			return this.attr( "class", "" );
		}

		if ( typeof value === "string" && value ) {
			classes = value.match( rnotwhite ) || [];

			while ( ( elem = this[ i++ ] ) ) {
				curValue = getClass( elem );

				// This expression is here for better compressibility (see addClass)
				cur = elem.nodeType === 1 &&
					( " " + curValue + " " ).replace( rclass, " " );

				if ( cur ) {
					j = 0;
					while ( ( clazz = classes[ j++ ] ) ) {

						// Remove *all* instances
						while ( cur.indexOf( " " + clazz + " " ) > -1 ) {
							cur = cur.replace( " " + clazz + " ", " " );
						}
					}

					// Only assign if different to avoid unneeded rendering.
					finalValue = jQuery.trim( cur );
					if ( curValue !== finalValue ) {
						jQuery.attr( elem, "class", finalValue );
					}
				}
			}
		}

		return this;
	},

	toggleClass: function( value, stateVal ) {
		var type = typeof value;

		if ( typeof stateVal === "boolean" && type === "string" ) {
			return stateVal ? this.addClass( value ) : this.removeClass( value );
		}

		if ( jQuery.isFunction( value ) ) {
			return this.each( function( i ) {
				jQuery( this ).toggleClass(
					value.call( this, i, getClass( this ), stateVal ),
					stateVal
				);
			} );
		}

		return this.each( function() {
			var className, i, self, classNames;

			if ( type === "string" ) {

				// Toggle individual class names
				i = 0;
				self = jQuery( this );
				classNames = value.match( rnotwhite ) || [];

				while ( ( className = classNames[ i++ ] ) ) {

					// Check each className given, space separated list
					if ( self.hasClass( className ) ) {
						self.removeClass( className );
					} else {
						self.addClass( className );
					}
				}

			// Toggle whole class name
			} else if ( value === undefined || type === "boolean" ) {
				className = getClass( this );
				if ( className ) {

					// store className if set
					jQuery._data( this, "__className__", className );
				}

				// If the element has a class name or if we're passed "false",
				// then remove the whole classname (if there was one, the above saved it).
				// Otherwise bring back whatever was previously saved (if anything),
				// falling back to the empty string if nothing was stored.
				jQuery.attr( this, "class",
					className || value === false ?
					"" :
					jQuery._data( this, "__className__" ) || ""
				);
			}
		} );
	},

	hasClass: function( selector ) {
		var className, elem,
			i = 0;

		className = " " + selector + " ";
		while ( ( elem = this[ i++ ] ) ) {
			if ( elem.nodeType === 1 &&
				( " " + getClass( elem ) + " " ).replace( rclass, " " )
					.indexOf( className ) > -1
			) {
				return true;
			}
		}

		return false;
	}
} );




// Return jQuery for attributes-only inclusion


jQuery.each( ( "blur focus focusin focusout load resize scroll unload click dblclick " +
	"mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave " +
	"change select submit keydown keypress keyup error contextmenu" ).split( " " ),
	function( i, name ) {

	// Handle event binding
	jQuery.fn[ name ] = function( data, fn ) {
		return arguments.length > 0 ?
			this.on( name, null, data, fn ) :
			this.trigger( name );
	};
} );

jQuery.fn.extend( {
	hover: function( fnOver, fnOut ) {
		return this.mouseenter( fnOver ).mouseleave( fnOut || fnOver );
	}
} );


var location = window.location;

var nonce = jQuery.now();

var rquery = ( /\?/ );



var rvalidtokens = /(,)|(\[|{)|(}|])|"(?:[^"\\\r\n]|\\["\\\/bfnrt]|\\u[\da-fA-F]{4})*"\s*:?|true|false|null|-?(?!0\d)\d+(?:\.\d+|)(?:[eE][+-]?\d+|)/g;

jQuery.parseJSON = function( data ) {

	// Attempt to parse using the native JSON parser first
	if ( window.JSON && window.JSON.parse ) {

		// Support: Android 2.3
		// Workaround failure to string-cast null input
		return window.JSON.parse( data + "" );
	}

	var requireNonComma,
		depth = null,
		str = jQuery.trim( data + "" );

	// Guard against invalid (and possibly dangerous) input by ensuring that nothing remains
	// after removing valid tokens
	return str && !jQuery.trim( str.replace( rvalidtokens, function( token, comma, open, close ) {

		// Force termination if we see a misplaced comma
		if ( requireNonComma && comma ) {
			depth = 0;
		}

		// Perform no more replacements after returning to outermost depth
		if ( depth === 0 ) {
			return token;
		}

		// Commas must not follow "[", "{", or ","
		requireNonComma = open || comma;

		// Determine new depth
		// array/object open ("[" or "{"): depth += true - false (increment)
		// array/object close ("]" or "}"): depth += false - true (decrement)
		// other cases ("," or primitive): depth += true - true (numeric cast)
		depth += !close - !open;

		// Remove this token
		return "";
	} ) ) ?
		( Function( "return " + str ) )() :
		jQuery.error( "Invalid JSON: " + data );
};


// Cross-browser xml parsing
jQuery.parseXML = function( data ) {
	var xml, tmp;
	if ( !data || typeof data !== "string" ) {
		return null;
	}
	try {
		if ( window.DOMParser ) { // Standard
			tmp = new window.DOMParser();
			xml = tmp.parseFromString( data, "text/xml" );
		} else { // IE
			xml = new window.ActiveXObject( "Microsoft.XMLDOM" );
			xml.async = "false";
			xml.loadXML( data );
		}
	} catch ( e ) {
		xml = undefined;
	}
	if ( !xml || !xml.documentElement || xml.getElementsByTagName( "parsererror" ).length ) {
		jQuery.error( "Invalid XML: " + data );
	}
	return xml;
};


var
	rhash = /#.*$/,
	rts = /([?&])_=[^&]*/,

	// IE leaves an \r character at EOL
	rheaders = /^(.*?):[ \t]*([^\r\n]*)\r?$/mg,

	// #7653, #8125, #8152: local protocol detection
	rlocalProtocol = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
	rnoContent = /^(?:GET|HEAD)$/,
	rprotocol = /^\/\//,
	rurl = /^([\w.+-]+:)(?:\/\/(?:[^\/?#]*@|)([^\/?#:]*)(?::(\d+)|)|)/,

	/* Prefilters
	 * 1) They are useful to introduce custom dataTypes (see ajax/jsonp.js for an example)
	 * 2) These are called:
	 *    - BEFORE asking for a transport
	 *    - AFTER param serialization (s.data is a string if s.processData is true)
	 * 3) key is the dataType
	 * 4) the catchall symbol "*" can be used
	 * 5) execution will start with transport dataType and THEN continue down to "*" if needed
	 */
	prefilters = {},

	/* Transports bindings
	 * 1) key is the dataType
	 * 2) the catchall symbol "*" can be used
	 * 3) selection will start with transport dataType and THEN go to "*" if needed
	 */
	transports = {},

	// Avoid comment-prolog char sequence (#10098); must appease lint and evade compression
	allTypes = "*/".concat( "*" ),

	// Document location
	ajaxLocation = location.href,

	// Segment location into parts
	ajaxLocParts = rurl.exec( ajaxLocation.toLowerCase() ) || [];

// Base "constructor" for jQuery.ajaxPrefilter and jQuery.ajaxTransport
function addToPrefiltersOrTransports( structure ) {

	// dataTypeExpression is optional and defaults to "*"
	return function( dataTypeExpression, func ) {

		if ( typeof dataTypeExpression !== "string" ) {
			func = dataTypeExpression;
			dataTypeExpression = "*";
		}

		var dataType,
			i = 0,
			dataTypes = dataTypeExpression.toLowerCase().match( rnotwhite ) || [];

		if ( jQuery.isFunction( func ) ) {

			// For each dataType in the dataTypeExpression
			while ( ( dataType = dataTypes[ i++ ] ) ) {

				// Prepend if requested
				if ( dataType.charAt( 0 ) === "+" ) {
					dataType = dataType.slice( 1 ) || "*";
					( structure[ dataType ] = structure[ dataType ] || [] ).unshift( func );

				// Otherwise append
				} else {
					( structure[ dataType ] = structure[ dataType ] || [] ).push( func );
				}
			}
		}
	};
}

// Base inspection function for prefilters and transports
function inspectPrefiltersOrTransports( structure, options, originalOptions, jqXHR ) {

	var inspected = {},
		seekingTransport = ( structure === transports );

	function inspect( dataType ) {
		var selected;
		inspected[ dataType ] = true;
		jQuery.each( structure[ dataType ] || [], function( _, prefilterOrFactory ) {
			var dataTypeOrTransport = prefilterOrFactory( options, originalOptions, jqXHR );
			if ( typeof dataTypeOrTransport === "string" &&
				!seekingTransport && !inspected[ dataTypeOrTransport ] ) {

				options.dataTypes.unshift( dataTypeOrTransport );
				inspect( dataTypeOrTransport );
				return false;
			} else if ( seekingTransport ) {
				return !( selected = dataTypeOrTransport );
			}
		} );
		return selected;
	}

	return inspect( options.dataTypes[ 0 ] ) || !inspected[ "*" ] && inspect( "*" );
}

// A special extend for ajax options
// that takes "flat" options (not to be deep extended)
// Fixes #9887
function ajaxExtend( target, src ) {
	var deep, key,
		flatOptions = jQuery.ajaxSettings.flatOptions || {};

	for ( key in src ) {
		if ( src[ key ] !== undefined ) {
			( flatOptions[ key ] ? target : ( deep || ( deep = {} ) ) )[ key ] = src[ key ];
		}
	}
	if ( deep ) {
		jQuery.extend( true, target, deep );
	}

	return target;
}

/* Handles responses to an ajax request:
 * - finds the right dataType (mediates between content-type and expected dataType)
 * - returns the corresponding response
 */
function ajaxHandleResponses( s, jqXHR, responses ) {
	var firstDataType, ct, finalDataType, type,
		contents = s.contents,
		dataTypes = s.dataTypes;

	// Remove auto dataType and get content-type in the process
	while ( dataTypes[ 0 ] === "*" ) {
		dataTypes.shift();
		if ( ct === undefined ) {
			ct = s.mimeType || jqXHR.getResponseHeader( "Content-Type" );
		}
	}

	// Check if we're dealing with a known content-type
	if ( ct ) {
		for ( type in contents ) {
			if ( contents[ type ] && contents[ type ].test( ct ) ) {
				dataTypes.unshift( type );
				break;
			}
		}
	}

	// Check to see if we have a response for the expected dataType
	if ( dataTypes[ 0 ] in responses ) {
		finalDataType = dataTypes[ 0 ];
	} else {

		// Try convertible dataTypes
		for ( type in responses ) {
			if ( !dataTypes[ 0 ] || s.converters[ type + " " + dataTypes[ 0 ] ] ) {
				finalDataType = type;
				break;
			}
			if ( !firstDataType ) {
				firstDataType = type;
			}
		}

		// Or just use first one
		finalDataType = finalDataType || firstDataType;
	}

	// If we found a dataType
	// We add the dataType to the list if needed
	// and return the corresponding response
	if ( finalDataType ) {
		if ( finalDataType !== dataTypes[ 0 ] ) {
			dataTypes.unshift( finalDataType );
		}
		return responses[ finalDataType ];
	}
}

/* Chain conversions given the request and the original response
 * Also sets the responseXXX fields on the jqXHR instance
 */
function ajaxConvert( s, response, jqXHR, isSuccess ) {
	var conv2, current, conv, tmp, prev,
		converters = {},

		// Work with a copy of dataTypes in case we need to modify it for conversion
		dataTypes = s.dataTypes.slice();

	// Create converters map with lowercased keys
	if ( dataTypes[ 1 ] ) {
		for ( conv in s.converters ) {
			converters[ conv.toLowerCase() ] = s.converters[ conv ];
		}
	}

	current = dataTypes.shift();

	// Convert to each sequential dataType
	while ( current ) {

		if ( s.responseFields[ current ] ) {
			jqXHR[ s.responseFields[ current ] ] = response;
		}

		// Apply the dataFilter if provided
		if ( !prev && isSuccess && s.dataFilter ) {
			response = s.dataFilter( response, s.dataType );
		}

		prev = current;
		current = dataTypes.shift();

		if ( current ) {

			// There's only work to do if current dataType is non-auto
			if ( current === "*" ) {

				current = prev;

			// Convert response if prev dataType is non-auto and differs from current
			} else if ( prev !== "*" && prev !== current ) {

				// Seek a direct converter
				conv = converters[ prev + " " + current ] || converters[ "* " + current ];

				// If none found, seek a pair
				if ( !conv ) {
					for ( conv2 in converters ) {

						// If conv2 outputs current
						tmp = conv2.split( " " );
						if ( tmp[ 1 ] === current ) {

							// If prev can be converted to accepted input
							conv = converters[ prev + " " + tmp[ 0 ] ] ||
								converters[ "* " + tmp[ 0 ] ];
							if ( conv ) {

								// Condense equivalence converters
								if ( conv === true ) {
									conv = converters[ conv2 ];

								// Otherwise, insert the intermediate dataType
								} else if ( converters[ conv2 ] !== true ) {
									current = tmp[ 0 ];
									dataTypes.unshift( tmp[ 1 ] );
								}
								break;
							}
						}
					}
				}

				// Apply converter (if not an equivalence)
				if ( conv !== true ) {

					// Unless errors are allowed to bubble, catch and return them
					if ( conv && s[ "throws" ] ) { // jscs:ignore requireDotNotation
						response = conv( response );
					} else {
						try {
							response = conv( response );
						} catch ( e ) {
							return {
								state: "parsererror",
								error: conv ? e : "No conversion from " + prev + " to " + current
							};
						}
					}
				}
			}
		}
	}

	return { state: "success", data: response };
}

jQuery.extend( {

	// Counter for holding the number of active queries
	active: 0,

	// Last-Modified header cache for next request
	lastModified: {},
	etag: {},

	ajaxSettings: {
		url: ajaxLocation,
		type: "GET",
		isLocal: rlocalProtocol.test( ajaxLocParts[ 1 ] ),
		global: true,
		processData: true,
		async: true,
		contentType: "application/x-www-form-urlencoded; charset=UTF-8",
		/*
		timeout: 0,
		data: null,
		dataType: null,
		username: null,
		password: null,
		cache: null,
		throws: false,
		traditional: false,
		headers: {},
		*/

		accepts: {
			"*": allTypes,
			text: "text/plain",
			html: "text/html",
			xml: "application/xml, text/xml",
			json: "application/json, text/javascript"
		},

		contents: {
			xml: /\bxml\b/,
			html: /\bhtml/,
			json: /\bjson\b/
		},

		responseFields: {
			xml: "responseXML",
			text: "responseText",
			json: "responseJSON"
		},

		// Data converters
		// Keys separate source (or catchall "*") and destination types with a single space
		converters: {

			// Convert anything to text
			"* text": String,

			// Text to html (true = no transformation)
			"text html": true,

			// Evaluate text as a json expression
			"text json": jQuery.parseJSON,

			// Parse text as xml
			"text xml": jQuery.parseXML
		},

		// For options that shouldn't be deep extended:
		// you can add your own custom options here if
		// and when you create one that shouldn't be
		// deep extended (see ajaxExtend)
		flatOptions: {
			url: true,
			context: true
		}
	},

	// Creates a full fledged settings object into target
	// with both ajaxSettings and settings fields.
	// If target is omitted, writes into ajaxSettings.
	ajaxSetup: function( target, settings ) {
		return settings ?

			// Building a settings object
			ajaxExtend( ajaxExtend( target, jQuery.ajaxSettings ), settings ) :

			// Extending ajaxSettings
			ajaxExtend( jQuery.ajaxSettings, target );
	},

	ajaxPrefilter: addToPrefiltersOrTransports( prefilters ),
	ajaxTransport: addToPrefiltersOrTransports( transports ),

	// Main method
	ajax: function( url, options ) {

		// If url is an object, simulate pre-1.5 signature
		if ( typeof url === "object" ) {
			options = url;
			url = undefined;
		}

		// Force options to be an object
		options = options || {};

		var

			// Cross-domain detection vars
			parts,

			// Loop variable
			i,

			// URL without anti-cache param
			cacheURL,

			// Response headers as string
			responseHeadersString,

			// timeout handle
			timeoutTimer,

			// To know if global events are to be dispatched
			fireGlobals,

			transport,

			// Response headers
			responseHeaders,

			// Create the final options object
			s = jQuery.ajaxSetup( {}, options ),

			// Callbacks context
			callbackContext = s.context || s,

			// Context for global events is callbackContext if it is a DOM node or jQuery collection
			globalEventContext = s.context &&
				( callbackContext.nodeType || callbackContext.jquery ) ?
					jQuery( callbackContext ) :
					jQuery.event,

			// Deferreds
			deferred = jQuery.Deferred(),
			completeDeferred = jQuery.Callbacks( "once memory" ),

			// Status-dependent callbacks
			statusCode = s.statusCode || {},

			// Headers (they are sent all at once)
			requestHeaders = {},
			requestHeadersNames = {},

			// The jqXHR state
			state = 0,

			// Default abort message
			strAbort = "canceled",

			// Fake xhr
			jqXHR = {
				readyState: 0,

				// Builds headers hashtable if needed
				getResponseHeader: function( key ) {
					var match;
					if ( state === 2 ) {
						if ( !responseHeaders ) {
							responseHeaders = {};
							while ( ( match = rheaders.exec( responseHeadersString ) ) ) {
								responseHeaders[ match[ 1 ].toLowerCase() ] = match[ 2 ];
							}
						}
						match = responseHeaders[ key.toLowerCase() ];
					}
					return match == null ? null : match;
				},

				// Raw string
				getAllResponseHeaders: function() {
					return state === 2 ? responseHeadersString : null;
				},

				// Caches the header
				setRequestHeader: function( name, value ) {
					var lname = name.toLowerCase();
					if ( !state ) {
						name = requestHeadersNames[ lname ] = requestHeadersNames[ lname ] || name;
						requestHeaders[ name ] = value;
					}
					return this;
				},

				// Overrides response content-type header
				overrideMimeType: function( type ) {
					if ( !state ) {
						s.mimeType = type;
					}
					return this;
				},

				// Status-dependent callbacks
				statusCode: function( map ) {
					var code;
					if ( map ) {
						if ( state < 2 ) {
							for ( code in map ) {

								// Lazy-add the new callback in a way that preserves old ones
								statusCode[ code ] = [ statusCode[ code ], map[ code ] ];
							}
						} else {

							// Execute the appropriate callbacks
							jqXHR.always( map[ jqXHR.status ] );
						}
					}
					return this;
				},

				// Cancel the request
				abort: function( statusText ) {
					var finalText = statusText || strAbort;
					if ( transport ) {
						transport.abort( finalText );
					}
					done( 0, finalText );
					return this;
				}
			};

		// Attach deferreds
		deferred.promise( jqXHR ).complete = completeDeferred.add;
		jqXHR.success = jqXHR.done;
		jqXHR.error = jqXHR.fail;

		// Remove hash character (#7531: and string promotion)
		// Add protocol if not provided (#5866: IE7 issue with protocol-less urls)
		// Handle falsy url in the settings object (#10093: consistency with old signature)
		// We also use the url parameter if available
		s.url = ( ( url || s.url || ajaxLocation ) + "" )
			.replace( rhash, "" )
			.replace( rprotocol, ajaxLocParts[ 1 ] + "//" );

		// Alias method option to type as per ticket #12004
		s.type = options.method || options.type || s.method || s.type;

		// Extract dataTypes list
		s.dataTypes = jQuery.trim( s.dataType || "*" ).toLowerCase().match( rnotwhite ) || [ "" ];

		// A cross-domain request is in order when we have a protocol:host:port mismatch
		if ( s.crossDomain == null ) {
			parts = rurl.exec( s.url.toLowerCase() );
			s.crossDomain = !!( parts &&
				( parts[ 1 ] !== ajaxLocParts[ 1 ] || parts[ 2 ] !== ajaxLocParts[ 2 ] ||
					( parts[ 3 ] || ( parts[ 1 ] === "http:" ? "80" : "443" ) ) !==
						( ajaxLocParts[ 3 ] || ( ajaxLocParts[ 1 ] === "http:" ? "80" : "443" ) ) )
			);
		}

		// Convert data if not already a string
		if ( s.data && s.processData && typeof s.data !== "string" ) {
			s.data = jQuery.param( s.data, s.traditional );
		}

		// Apply prefilters
		inspectPrefiltersOrTransports( prefilters, s, options, jqXHR );

		// If request was aborted inside a prefilter, stop there
		if ( state === 2 ) {
			return jqXHR;
		}

		// We can fire global events as of now if asked to
		// Don't fire events if jQuery.event is undefined in an AMD-usage scenario (#15118)
		fireGlobals = jQuery.event && s.global;

		// Watch for a new set of requests
		if ( fireGlobals && jQuery.active++ === 0 ) {
			jQuery.event.trigger( "ajaxStart" );
		}

		// Uppercase the type
		s.type = s.type.toUpperCase();

		// Determine if request has content
		s.hasContent = !rnoContent.test( s.type );

		// Save the URL in case we're toying with the If-Modified-Since
		// and/or If-None-Match header later on
		cacheURL = s.url;

		// More options handling for requests with no content
		if ( !s.hasContent ) {

			// If data is available, append data to url
			if ( s.data ) {
				cacheURL = ( s.url += ( rquery.test( cacheURL ) ? "&" : "?" ) + s.data );

				// #9682: remove data so that it's not used in an eventual retry
				delete s.data;
			}

			// Add anti-cache in url if needed
			if ( s.cache === false ) {
				s.url = rts.test( cacheURL ) ?

					// If there is already a '_' parameter, set its value
					cacheURL.replace( rts, "$1_=" + nonce++ ) :

					// Otherwise add one to the end
					cacheURL + ( rquery.test( cacheURL ) ? "&" : "?" ) + "_=" + nonce++;
			}
		}

		// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
		if ( s.ifModified ) {
			if ( jQuery.lastModified[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-Modified-Since", jQuery.lastModified[ cacheURL ] );
			}
			if ( jQuery.etag[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-None-Match", jQuery.etag[ cacheURL ] );
			}
		}

		// Set the correct header, if data is being sent
		if ( s.data && s.hasContent && s.contentType !== false || options.contentType ) {
			jqXHR.setRequestHeader( "Content-Type", s.contentType );
		}

		// Set the Accepts header for the server, depending on the dataType
		jqXHR.setRequestHeader(
			"Accept",
			s.dataTypes[ 0 ] && s.accepts[ s.dataTypes[ 0 ] ] ?
				s.accepts[ s.dataTypes[ 0 ] ] +
					( s.dataTypes[ 0 ] !== "*" ? ", " + allTypes + "; q=0.01" : "" ) :
				s.accepts[ "*" ]
		);

		// Check for headers option
		for ( i in s.headers ) {
			jqXHR.setRequestHeader( i, s.headers[ i ] );
		}

		// Allow custom headers/mimetypes and early abort
		if ( s.beforeSend &&
			( s.beforeSend.call( callbackContext, jqXHR, s ) === false || state === 2 ) ) {

			// Abort if not done already and return
			return jqXHR.abort();
		}

		// aborting is no longer a cancellation
		strAbort = "abort";

		// Install callbacks on deferreds
		for ( i in { success: 1, error: 1, complete: 1 } ) {
			jqXHR[ i ]( s[ i ] );
		}

		// Get transport
		transport = inspectPrefiltersOrTransports( transports, s, options, jqXHR );

		// If no transport, we auto-abort
		if ( !transport ) {
			done( -1, "No Transport" );
		} else {
			jqXHR.readyState = 1;

			// Send global event
			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxSend", [ jqXHR, s ] );
			}

			// If request was aborted inside ajaxSend, stop there
			if ( state === 2 ) {
				return jqXHR;
			}

			// Timeout
			if ( s.async && s.timeout > 0 ) {
				timeoutTimer = window.setTimeout( function() {
					jqXHR.abort( "timeout" );
				}, s.timeout );
			}

			try {
				state = 1;
				transport.send( requestHeaders, done );
			} catch ( e ) {

				// Propagate exception as error if not done
				if ( state < 2 ) {
					done( -1, e );

				// Simply rethrow otherwise
				} else {
					throw e;
				}
			}
		}

		// Callback for when everything is done
		function done( status, nativeStatusText, responses, headers ) {
			var isSuccess, success, error, response, modified,
				statusText = nativeStatusText;

			// Called once
			if ( state === 2 ) {
				return;
			}

			// State is "done" now
			state = 2;

			// Clear timeout if it exists
			if ( timeoutTimer ) {
				window.clearTimeout( timeoutTimer );
			}

			// Dereference transport for early garbage collection
			// (no matter how long the jqXHR object will be used)
			transport = undefined;

			// Cache response headers
			responseHeadersString = headers || "";

			// Set readyState
			jqXHR.readyState = status > 0 ? 4 : 0;

			// Determine if successful
			isSuccess = status >= 200 && status < 300 || status === 304;

			// Get response data
			if ( responses ) {
				response = ajaxHandleResponses( s, jqXHR, responses );
			}

			// Convert no matter what (that way responseXXX fields are always set)
			response = ajaxConvert( s, response, jqXHR, isSuccess );

			// If successful, handle type chaining
			if ( isSuccess ) {

				// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
				if ( s.ifModified ) {
					modified = jqXHR.getResponseHeader( "Last-Modified" );
					if ( modified ) {
						jQuery.lastModified[ cacheURL ] = modified;
					}
					modified = jqXHR.getResponseHeader( "etag" );
					if ( modified ) {
						jQuery.etag[ cacheURL ] = modified;
					}
				}

				// if no content
				if ( status === 204 || s.type === "HEAD" ) {
					statusText = "nocontent";

				// if not modified
				} else if ( status === 304 ) {
					statusText = "notmodified";

				// If we have data, let's convert it
				} else {
					statusText = response.state;
					success = response.data;
					error = response.error;
					isSuccess = !error;
				}
			} else {

				// We extract error from statusText
				// then normalize statusText and status for non-aborts
				error = statusText;
				if ( status || !statusText ) {
					statusText = "error";
					if ( status < 0 ) {
						status = 0;
					}
				}
			}

			// Set data for the fake xhr object
			jqXHR.status = status;
			jqXHR.statusText = ( nativeStatusText || statusText ) + "";

			// Success/Error
			if ( isSuccess ) {
				deferred.resolveWith( callbackContext, [ success, statusText, jqXHR ] );
			} else {
				deferred.rejectWith( callbackContext, [ jqXHR, statusText, error ] );
			}

			// Status-dependent callbacks
			jqXHR.statusCode( statusCode );
			statusCode = undefined;

			if ( fireGlobals ) {
				globalEventContext.trigger( isSuccess ? "ajaxSuccess" : "ajaxError",
					[ jqXHR, s, isSuccess ? success : error ] );
			}

			// Complete
			completeDeferred.fireWith( callbackContext, [ jqXHR, statusText ] );

			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxComplete", [ jqXHR, s ] );

				// Handle the global AJAX counter
				if ( !( --jQuery.active ) ) {
					jQuery.event.trigger( "ajaxStop" );
				}
			}
		}

		return jqXHR;
	},

	getJSON: function( url, data, callback ) {
		return jQuery.get( url, data, callback, "json" );
	},

	getScript: function( url, callback ) {
		return jQuery.get( url, undefined, callback, "script" );
	}
} );

jQuery.each( [ "get", "post" ], function( i, method ) {
	jQuery[ method ] = function( url, data, callback, type ) {

		// shift arguments if data argument was omitted
		if ( jQuery.isFunction( data ) ) {
			type = type || callback;
			callback = data;
			data = undefined;
		}

		// The url can be an options object (which then must have .url)
		return jQuery.ajax( jQuery.extend( {
			url: url,
			type: method,
			dataType: type,
			data: data,
			success: callback
		}, jQuery.isPlainObject( url ) && url ) );
	};
} );


jQuery._evalUrl = function( url ) {
	return jQuery.ajax( {
		url: url,

		// Make this explicit, since user can override this through ajaxSetup (#11264)
		type: "GET",
		dataType: "script",
		cache: true,
		async: false,
		global: false,
		"throws": true
	} );
};


jQuery.fn.extend( {
	wrapAll: function( html ) {
		if ( jQuery.isFunction( html ) ) {
			return this.each( function( i ) {
				jQuery( this ).wrapAll( html.call( this, i ) );
			} );
		}

		if ( this[ 0 ] ) {

			// The elements to wrap the target around
			var wrap = jQuery( html, this[ 0 ].ownerDocument ).eq( 0 ).clone( true );

			if ( this[ 0 ].parentNode ) {
				wrap.insertBefore( this[ 0 ] );
			}

			wrap.map( function() {
				var elem = this;

				while ( elem.firstChild && elem.firstChild.nodeType === 1 ) {
					elem = elem.firstChild;
				}

				return elem;
			} ).append( this );
		}

		return this;
	},

	wrapInner: function( html ) {
		if ( jQuery.isFunction( html ) ) {
			return this.each( function( i ) {
				jQuery( this ).wrapInner( html.call( this, i ) );
			} );
		}

		return this.each( function() {
			var self = jQuery( this ),
				contents = self.contents();

			if ( contents.length ) {
				contents.wrapAll( html );

			} else {
				self.append( html );
			}
		} );
	},

	wrap: function( html ) {
		var isFunction = jQuery.isFunction( html );

		return this.each( function( i ) {
			jQuery( this ).wrapAll( isFunction ? html.call( this, i ) : html );
		} );
	},

	unwrap: function() {
		return this.parent().each( function() {
			if ( !jQuery.nodeName( this, "body" ) ) {
				jQuery( this ).replaceWith( this.childNodes );
			}
		} ).end();
	}
} );


function getDisplay( elem ) {
	return elem.style && elem.style.display || jQuery.css( elem, "display" );
}

function filterHidden( elem ) {

	// Disconnected elements are considered hidden
	if ( !jQuery.contains( elem.ownerDocument || document, elem ) ) {
		return true;
	}
	while ( elem && elem.nodeType === 1 ) {
		if ( getDisplay( elem ) === "none" || elem.type === "hidden" ) {
			return true;
		}
		elem = elem.parentNode;
	}
	return false;
}

jQuery.expr.filters.hidden = function( elem ) {

	// Support: Opera <= 12.12
	// Opera reports offsetWidths and offsetHeights less than zero on some elements
	return support.reliableHiddenOffsets() ?
		( elem.offsetWidth <= 0 && elem.offsetHeight <= 0 &&
			!elem.getClientRects().length ) :
			filterHidden( elem );
};

jQuery.expr.filters.visible = function( elem ) {
	return !jQuery.expr.filters.hidden( elem );
};




var r20 = /%20/g,
	rbracket = /\[\]$/,
	rCRLF = /\r?\n/g,
	rsubmitterTypes = /^(?:submit|button|image|reset|file)$/i,
	rsubmittable = /^(?:input|select|textarea|keygen)/i;

function buildParams( prefix, obj, traditional, add ) {
	var name;

	if ( jQuery.isArray( obj ) ) {

		// Serialize array item.
		jQuery.each( obj, function( i, v ) {
			if ( traditional || rbracket.test( prefix ) ) {

				// Treat each array item as a scalar.
				add( prefix, v );

			} else {

				// Item is non-scalar (array or object), encode its numeric index.
				buildParams(
					prefix + "[" + ( typeof v === "object" && v != null ? i : "" ) + "]",
					v,
					traditional,
					add
				);
			}
		} );

	} else if ( !traditional && jQuery.type( obj ) === "object" ) {

		// Serialize object item.
		for ( name in obj ) {
			buildParams( prefix + "[" + name + "]", obj[ name ], traditional, add );
		}

	} else {

		// Serialize scalar item.
		add( prefix, obj );
	}
}

// Serialize an array of form elements or a set of
// key/values into a query string
jQuery.param = function( a, traditional ) {
	var prefix,
		s = [],
		add = function( key, value ) {

			// If value is a function, invoke it and return its value
			value = jQuery.isFunction( value ) ? value() : ( value == null ? "" : value );
			s[ s.length ] = encodeURIComponent( key ) + "=" + encodeURIComponent( value );
		};

	// Set traditional to true for jQuery <= 1.3.2 behavior.
	if ( traditional === undefined ) {
		traditional = jQuery.ajaxSettings && jQuery.ajaxSettings.traditional;
	}

	// If an array was passed in, assume that it is an array of form elements.
	if ( jQuery.isArray( a ) || ( a.jquery && !jQuery.isPlainObject( a ) ) ) {

		// Serialize the form elements
		jQuery.each( a, function() {
			add( this.name, this.value );
		} );

	} else {

		// If traditional, encode the "old" way (the way 1.3.2 or older
		// did it), otherwise encode params recursively.
		for ( prefix in a ) {
			buildParams( prefix, a[ prefix ], traditional, add );
		}
	}

	// Return the resulting serialization
	return s.join( "&" ).replace( r20, "+" );
};

jQuery.fn.extend( {
	serialize: function() {
		return jQuery.param( this.serializeArray() );
	},
	serializeArray: function() {
		return this.map( function() {

			// Can add propHook for "elements" to filter or add form elements
			var elements = jQuery.prop( this, "elements" );
			return elements ? jQuery.makeArray( elements ) : this;
		} )
		.filter( function() {
			var type = this.type;

			// Use .is(":disabled") so that fieldset[disabled] works
			return this.name && !jQuery( this ).is( ":disabled" ) &&
				rsubmittable.test( this.nodeName ) && !rsubmitterTypes.test( type ) &&
				( this.checked || !rcheckableType.test( type ) );
		} )
		.map( function( i, elem ) {
			var val = jQuery( this ).val();

			return val == null ?
				null :
				jQuery.isArray( val ) ?
					jQuery.map( val, function( val ) {
						return { name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
					} ) :
					{ name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
		} ).get();
	}
} );


// Create the request object
// (This is still attached to ajaxSettings for backward compatibility)
jQuery.ajaxSettings.xhr = window.ActiveXObject !== undefined ?

	// Support: IE6-IE8
	function() {

		// XHR cannot access local files, always use ActiveX for that case
		if ( this.isLocal ) {
			return createActiveXHR();
		}

		// Support: IE 9-11
		// IE seems to error on cross-domain PATCH requests when ActiveX XHR
		// is used. In IE 9+ always use the native XHR.
		// Note: this condition won't catch Edge as it doesn't define
		// document.documentMode but it also doesn't support ActiveX so it won't
		// reach this code.
		if ( document.documentMode > 8 ) {
			return createStandardXHR();
		}

		// Support: IE<9
		// oldIE XHR does not support non-RFC2616 methods (#13240)
		// See http://msdn.microsoft.com/en-us/library/ie/ms536648(v=vs.85).aspx
		// and http://www.w3.org/Protocols/rfc2616/rfc2616-sec9.html#sec9
		// Although this check for six methods instead of eight
		// since IE also does not support "trace" and "connect"
		return /^(get|post|head|put|delete|options)$/i.test( this.type ) &&
			createStandardXHR() || createActiveXHR();
	} :

	// For all other browsers, use the standard XMLHttpRequest object
	createStandardXHR;

var xhrId = 0,
	xhrCallbacks = {},
	xhrSupported = jQuery.ajaxSettings.xhr();

// Support: IE<10
// Open requests must be manually aborted on unload (#5280)
// See https://support.microsoft.com/kb/2856746 for more info
if ( window.attachEvent ) {
	window.attachEvent( "onunload", function() {
		for ( var key in xhrCallbacks ) {
			xhrCallbacks[ key ]( undefined, true );
		}
	} );
}

// Determine support properties
support.cors = !!xhrSupported && ( "withCredentials" in xhrSupported );
xhrSupported = support.ajax = !!xhrSupported;

// Create transport if the browser can provide an xhr
if ( xhrSupported ) {

	jQuery.ajaxTransport( function( options ) {

		// Cross domain only allowed if supported through XMLHttpRequest
		if ( !options.crossDomain || support.cors ) {

			var callback;

			return {
				send: function( headers, complete ) {
					var i,
						xhr = options.xhr(),
						id = ++xhrId;

					// Open the socket
					xhr.open(
						options.type,
						options.url,
						options.async,
						options.username,
						options.password
					);

					// Apply custom fields if provided
					if ( options.xhrFields ) {
						for ( i in options.xhrFields ) {
							xhr[ i ] = options.xhrFields[ i ];
						}
					}

					// Override mime type if needed
					if ( options.mimeType && xhr.overrideMimeType ) {
						xhr.overrideMimeType( options.mimeType );
					}

					// X-Requested-With header
					// For cross-domain requests, seeing as conditions for a preflight are
					// akin to a jigsaw puzzle, we simply never set it to be sure.
					// (it can always be set on a per-request basis or even using ajaxSetup)
					// For same-domain requests, won't change header if already provided.
					if ( !options.crossDomain && !headers[ "X-Requested-With" ] ) {
						headers[ "X-Requested-With" ] = "XMLHttpRequest";
					}

					// Set headers
					for ( i in headers ) {

						// Support: IE<9
						// IE's ActiveXObject throws a 'Type Mismatch' exception when setting
						// request header to a null-value.
						//
						// To keep consistent with other XHR implementations, cast the value
						// to string and ignore `undefined`.
						if ( headers[ i ] !== undefined ) {
							xhr.setRequestHeader( i, headers[ i ] + "" );
						}
					}

					// Do send the request
					// This may raise an exception which is actually
					// handled in jQuery.ajax (so no try/catch here)
					xhr.send( ( options.hasContent && options.data ) || null );

					// Listener
					callback = function( _, isAbort ) {
						var status, statusText, responses;

						// Was never called and is aborted or complete
						if ( callback && ( isAbort || xhr.readyState === 4 ) ) {

							// Clean up
							delete xhrCallbacks[ id ];
							callback = undefined;
							xhr.onreadystatechange = jQuery.noop;

							// Abort manually if needed
							if ( isAbort ) {
								if ( xhr.readyState !== 4 ) {
									xhr.abort();
								}
							} else {
								responses = {};
								status = xhr.status;

								// Support: IE<10
								// Accessing binary-data responseText throws an exception
								// (#11426)
								if ( typeof xhr.responseText === "string" ) {
									responses.text = xhr.responseText;
								}

								// Firefox throws an exception when accessing
								// statusText for faulty cross-domain requests
								try {
									statusText = xhr.statusText;
								} catch ( e ) {

									// We normalize with Webkit giving an empty statusText
									statusText = "";
								}

								// Filter status for non standard behaviors

								// If the request is local and we have data: assume a success
								// (success with no data won't get notified, that's the best we
								// can do given current implementations)
								if ( !status && options.isLocal && !options.crossDomain ) {
									status = responses.text ? 200 : 404;

								// IE - #1450: sometimes returns 1223 when it should be 204
								} else if ( status === 1223 ) {
									status = 204;
								}
							}
						}

						// Call complete if needed
						if ( responses ) {
							complete( status, statusText, responses, xhr.getAllResponseHeaders() );
						}
					};

					// Do send the request
					// `xhr.send` may raise an exception, but it will be
					// handled in jQuery.ajax (so no try/catch here)
					if ( !options.async ) {

						// If we're in sync mode we fire the callback
						callback();
					} else if ( xhr.readyState === 4 ) {

						// (IE6 & IE7) if it's in cache and has been
						// retrieved directly we need to fire the callback
						window.setTimeout( callback );
					} else {

						// Register the callback, but delay it in case `xhr.send` throws
						// Add to the list of active xhr callbacks
						xhr.onreadystatechange = xhrCallbacks[ id ] = callback;
					}
				},

				abort: function() {
					if ( callback ) {
						callback( undefined, true );
					}
				}
			};
		}
	} );
}

// Functions to create xhrs
function createStandardXHR() {
	try {
		return new window.XMLHttpRequest();
	} catch ( e ) {}
}

function createActiveXHR() {
	try {
		return new window.ActiveXObject( "Microsoft.XMLHTTP" );
	} catch ( e ) {}
}




// Install script dataType
jQuery.ajaxSetup( {
	accepts: {
		script: "text/javascript, application/javascript, " +
			"application/ecmascript, application/x-ecmascript"
	},
	contents: {
		script: /\b(?:java|ecma)script\b/
	},
	converters: {
		"text script": function( text ) {
			jQuery.globalEval( text );
			return text;
		}
	}
} );

// Handle cache's special case and global
jQuery.ajaxPrefilter( "script", function( s ) {
	if ( s.cache === undefined ) {
		s.cache = false;
	}
	if ( s.crossDomain ) {
		s.type = "GET";
		s.global = false;
	}
} );

// Bind script tag hack transport
jQuery.ajaxTransport( "script", function( s ) {

	// This transport only deals with cross domain requests
	if ( s.crossDomain ) {

		var script,
			head = document.head || jQuery( "head" )[ 0 ] || document.documentElement;

		return {

			send: function( _, callback ) {

				script = document.createElement( "script" );

				script.async = true;

				if ( s.scriptCharset ) {
					script.charset = s.scriptCharset;
				}

				script.src = s.url;

				// Attach handlers for all browsers
				script.onload = script.onreadystatechange = function( _, isAbort ) {

					if ( isAbort || !script.readyState || /loaded|complete/.test( script.readyState ) ) {

						// Handle memory leak in IE
						script.onload = script.onreadystatechange = null;

						// Remove the script
						if ( script.parentNode ) {
							script.parentNode.removeChild( script );
						}

						// Dereference the script
						script = null;

						// Callback if not abort
						if ( !isAbort ) {
							callback( 200, "success" );
						}
					}
				};

				// Circumvent IE6 bugs with base elements (#2709 and #4378) by prepending
				// Use native DOM manipulation to avoid our domManip AJAX trickery
				head.insertBefore( script, head.firstChild );
			},

			abort: function() {
				if ( script ) {
					script.onload( undefined, true );
				}
			}
		};
	}
} );




var oldCallbacks = [],
	rjsonp = /(=)\?(?=&|$)|\?\?/;

// Default jsonp settings
jQuery.ajaxSetup( {
	jsonp: "callback",
	jsonpCallback: function() {
		var callback = oldCallbacks.pop() || ( jQuery.expando + "_" + ( nonce++ ) );
		this[ callback ] = true;
		return callback;
	}
} );

// Detect, normalize options and install callbacks for jsonp requests
jQuery.ajaxPrefilter( "json jsonp", function( s, originalSettings, jqXHR ) {

	var callbackName, overwritten, responseContainer,
		jsonProp = s.jsonp !== false && ( rjsonp.test( s.url ) ?
			"url" :
			typeof s.data === "string" &&
				( s.contentType || "" )
					.indexOf( "application/x-www-form-urlencoded" ) === 0 &&
				rjsonp.test( s.data ) && "data"
		);

	// Handle iff the expected data type is "jsonp" or we have a parameter to set
	if ( jsonProp || s.dataTypes[ 0 ] === "jsonp" ) {

		// Get callback name, remembering preexisting value associated with it
		callbackName = s.jsonpCallback = jQuery.isFunction( s.jsonpCallback ) ?
			s.jsonpCallback() :
			s.jsonpCallback;

		// Insert callback into url or form data
		if ( jsonProp ) {
			s[ jsonProp ] = s[ jsonProp ].replace( rjsonp, "$1" + callbackName );
		} else if ( s.jsonp !== false ) {
			s.url += ( rquery.test( s.url ) ? "&" : "?" ) + s.jsonp + "=" + callbackName;
		}

		// Use data converter to retrieve json after script execution
		s.converters[ "script json" ] = function() {
			if ( !responseContainer ) {
				jQuery.error( callbackName + " was not called" );
			}
			return responseContainer[ 0 ];
		};

		// force json dataType
		s.dataTypes[ 0 ] = "json";

		// Install callback
		overwritten = window[ callbackName ];
		window[ callbackName ] = function() {
			responseContainer = arguments;
		};

		// Clean-up function (fires after converters)
		jqXHR.always( function() {

			// If previous value didn't exist - remove it
			if ( overwritten === undefined ) {
				jQuery( window ).removeProp( callbackName );

			// Otherwise restore preexisting value
			} else {
				window[ callbackName ] = overwritten;
			}

			// Save back as free
			if ( s[ callbackName ] ) {

				// make sure that re-using the options doesn't screw things around
				s.jsonpCallback = originalSettings.jsonpCallback;

				// save the callback name for future use
				oldCallbacks.push( callbackName );
			}

			// Call if it was a function and we have a response
			if ( responseContainer && jQuery.isFunction( overwritten ) ) {
				overwritten( responseContainer[ 0 ] );
			}

			responseContainer = overwritten = undefined;
		} );

		// Delegate to script
		return "script";
	}
} );




// data: string of html
// context (optional): If specified, the fragment will be created in this context,
// defaults to document
// keepScripts (optional): If true, will include scripts passed in the html string
jQuery.parseHTML = function( data, context, keepScripts ) {
	if ( !data || typeof data !== "string" ) {
		return null;
	}
	if ( typeof context === "boolean" ) {
		keepScripts = context;
		context = false;
	}
	context = context || document;

	var parsed = rsingleTag.exec( data ),
		scripts = !keepScripts && [];

	// Single tag
	if ( parsed ) {
		return [ context.createElement( parsed[ 1 ] ) ];
	}

	parsed = buildFragment( [ data ], context, scripts );

	if ( scripts && scripts.length ) {
		jQuery( scripts ).remove();
	}

	return jQuery.merge( [], parsed.childNodes );
};


// Keep a copy of the old load method
var _load = jQuery.fn.load;

/**
 * Load a url into a page
 */
jQuery.fn.load = function( url, params, callback ) {
	if ( typeof url !== "string" && _load ) {
		return _load.apply( this, arguments );
	}

	var selector, type, response,
		self = this,
		off = url.indexOf( " " );

	if ( off > -1 ) {
		selector = jQuery.trim( url.slice( off, url.length ) );
		url = url.slice( 0, off );
	}

	// If it's a function
	if ( jQuery.isFunction( params ) ) {

		// We assume that it's the callback
		callback = params;
		params = undefined;

	// Otherwise, build a param string
	} else if ( params && typeof params === "object" ) {
		type = "POST";
	}

	// If we have elements to modify, make the request
	if ( self.length > 0 ) {
		jQuery.ajax( {
			url: url,

			// If "type" variable is undefined, then "GET" method will be used.
			// Make value of this field explicit since
			// user can override it through ajaxSetup method
			type: type || "GET",
			dataType: "html",
			data: params
		} ).done( function( responseText ) {

			// Save response for use in complete callback
			response = arguments;

			self.html( selector ?

				// If a selector was specified, locate the right elements in a dummy div
				// Exclude scripts to avoid IE 'Permission Denied' errors
				jQuery( "<div>" ).append( jQuery.parseHTML( responseText ) ).find( selector ) :

				// Otherwise use the full result
				responseText );

		// If the request succeeds, this function gets "data", "status", "jqXHR"
		// but they are ignored because response was set above.
		// If it fails, this function gets "jqXHR", "status", "error"
		} ).always( callback && function( jqXHR, status ) {
			self.each( function() {
				callback.apply( this, response || [ jqXHR.responseText, status, jqXHR ] );
			} );
		} );
	}

	return this;
};




// Attach a bunch of functions for handling common AJAX events
jQuery.each( [
	"ajaxStart",
	"ajaxStop",
	"ajaxComplete",
	"ajaxError",
	"ajaxSuccess",
	"ajaxSend"
], function( i, type ) {
	jQuery.fn[ type ] = function( fn ) {
		return this.on( type, fn );
	};
} );




jQuery.expr.filters.animated = function( elem ) {
	return jQuery.grep( jQuery.timers, function( fn ) {
		return elem === fn.elem;
	} ).length;
};





/**
 * Gets a window from an element
 */
function getWindow( elem ) {
	return jQuery.isWindow( elem ) ?
		elem :
		elem.nodeType === 9 ?
			elem.defaultView || elem.parentWindow :
			false;
}

jQuery.offset = {
	setOffset: function( elem, options, i ) {
		var curPosition, curLeft, curCSSTop, curTop, curOffset, curCSSLeft, calculatePosition,
			position = jQuery.css( elem, "position" ),
			curElem = jQuery( elem ),
			props = {};

		// set position first, in-case top/left are set even on static elem
		if ( position === "static" ) {
			elem.style.position = "relative";
		}

		curOffset = curElem.offset();
		curCSSTop = jQuery.css( elem, "top" );
		curCSSLeft = jQuery.css( elem, "left" );
		calculatePosition = ( position === "absolute" || position === "fixed" ) &&
			jQuery.inArray( "auto", [ curCSSTop, curCSSLeft ] ) > -1;

		// need to be able to calculate position if either top or left
		// is auto and position is either absolute or fixed
		if ( calculatePosition ) {
			curPosition = curElem.position();
			curTop = curPosition.top;
			curLeft = curPosition.left;
		} else {
			curTop = parseFloat( curCSSTop ) || 0;
			curLeft = parseFloat( curCSSLeft ) || 0;
		}

		if ( jQuery.isFunction( options ) ) {

			// Use jQuery.extend here to allow modification of coordinates argument (gh-1848)
			options = options.call( elem, i, jQuery.extend( {}, curOffset ) );
		}

		if ( options.top != null ) {
			props.top = ( options.top - curOffset.top ) + curTop;
		}
		if ( options.left != null ) {
			props.left = ( options.left - curOffset.left ) + curLeft;
		}

		if ( "using" in options ) {
			options.using.call( elem, props );
		} else {
			curElem.css( props );
		}
	}
};

jQuery.fn.extend( {
	offset: function( options ) {
		if ( arguments.length ) {
			return options === undefined ?
				this :
				this.each( function( i ) {
					jQuery.offset.setOffset( this, options, i );
				} );
		}

		var docElem, win,
			box = { top: 0, left: 0 },
			elem = this[ 0 ],
			doc = elem && elem.ownerDocument;

		if ( !doc ) {
			return;
		}

		docElem = doc.documentElement;

		// Make sure it's not a disconnected DOM node
		if ( !jQuery.contains( docElem, elem ) ) {
			return box;
		}

		// If we don't have gBCR, just use 0,0 rather than error
		// BlackBerry 5, iOS 3 (original iPhone)
		if ( typeof elem.getBoundingClientRect !== "undefined" ) {
			box = elem.getBoundingClientRect();
		}
		win = getWindow( doc );
		return {
			top: box.top  + ( win.pageYOffset || docElem.scrollTop )  - ( docElem.clientTop  || 0 ),
			left: box.left + ( win.pageXOffset || docElem.scrollLeft ) - ( docElem.clientLeft || 0 )
		};
	},

	position: function() {
		if ( !this[ 0 ] ) {
			return;
		}

		var offsetParent, offset,
			parentOffset = { top: 0, left: 0 },
			elem = this[ 0 ];

		// Fixed elements are offset from window (parentOffset = {top:0, left: 0},
		// because it is its only offset parent
		if ( jQuery.css( elem, "position" ) === "fixed" ) {

			// we assume that getBoundingClientRect is available when computed position is fixed
			offset = elem.getBoundingClientRect();
		} else {

			// Get *real* offsetParent
			offsetParent = this.offsetParent();

			// Get correct offsets
			offset = this.offset();
			if ( !jQuery.nodeName( offsetParent[ 0 ], "html" ) ) {
				parentOffset = offsetParent.offset();
			}

			// Add offsetParent borders
			parentOffset.top  += jQuery.css( offsetParent[ 0 ], "borderTopWidth", true );
			parentOffset.left += jQuery.css( offsetParent[ 0 ], "borderLeftWidth", true );
		}

		// Subtract parent offsets and element margins
		// note: when an element has margin: auto the offsetLeft and marginLeft
		// are the same in Safari causing offset.left to incorrectly be 0
		return {
			top:  offset.top  - parentOffset.top - jQuery.css( elem, "marginTop", true ),
			left: offset.left - parentOffset.left - jQuery.css( elem, "marginLeft", true )
		};
	},

	offsetParent: function() {
		return this.map( function() {
			var offsetParent = this.offsetParent;

			while ( offsetParent && ( !jQuery.nodeName( offsetParent, "html" ) &&
				jQuery.css( offsetParent, "position" ) === "static" ) ) {
				offsetParent = offsetParent.offsetParent;
			}
			return offsetParent || documentElement;
		} );
	}
} );

// Create scrollLeft and scrollTop methods
jQuery.each( { scrollLeft: "pageXOffset", scrollTop: "pageYOffset" }, function( method, prop ) {
	var top = /Y/.test( prop );

	jQuery.fn[ method ] = function( val ) {
		return access( this, function( elem, method, val ) {
			var win = getWindow( elem );

			if ( val === undefined ) {
				return win ? ( prop in win ) ? win[ prop ] :
					win.document.documentElement[ method ] :
					elem[ method ];
			}

			if ( win ) {
				win.scrollTo(
					!top ? val : jQuery( win ).scrollLeft(),
					top ? val : jQuery( win ).scrollTop()
				);

			} else {
				elem[ method ] = val;
			}
		}, method, val, arguments.length, null );
	};
} );

// Support: Safari<7-8+, Chrome<37-44+
// Add the top/left cssHooks using jQuery.fn.position
// Webkit bug: https://bugs.webkit.org/show_bug.cgi?id=29084
// getComputedStyle returns percent when specified for top/left/bottom/right
// rather than make the css module depend on the offset module, we just check for it here
jQuery.each( [ "top", "left" ], function( i, prop ) {
	jQuery.cssHooks[ prop ] = addGetHookIf( support.pixelPosition,
		function( elem, computed ) {
			if ( computed ) {
				computed = curCSS( elem, prop );

				// if curCSS returns percentage, fallback to offset
				return rnumnonpx.test( computed ) ?
					jQuery( elem ).position()[ prop ] + "px" :
					computed;
			}
		}
	);
} );


// Create innerHeight, innerWidth, height, width, outerHeight and outerWidth methods
jQuery.each( { Height: "height", Width: "width" }, function( name, type ) {
	jQuery.each( { padding: "inner" + name, content: type, "": "outer" + name },
	function( defaultExtra, funcName ) {

		// margin is only for outerHeight, outerWidth
		jQuery.fn[ funcName ] = function( margin, value ) {
			var chainable = arguments.length && ( defaultExtra || typeof margin !== "boolean" ),
				extra = defaultExtra || ( margin === true || value === true ? "margin" : "border" );

			return access( this, function( elem, type, value ) {
				var doc;

				if ( jQuery.isWindow( elem ) ) {

					// As of 5/8/2012 this will yield incorrect results for Mobile Safari, but there
					// isn't a whole lot we can do. See pull request at this URL for discussion:
					// https://github.com/jquery/jquery/pull/764
					return elem.document.documentElement[ "client" + name ];
				}

				// Get document width or height
				if ( elem.nodeType === 9 ) {
					doc = elem.documentElement;

					// Either scroll[Width/Height] or offset[Width/Height] or client[Width/Height],
					// whichever is greatest
					// unfortunately, this causes bug #3838 in IE6/8 only,
					// but there is currently no good, small way to fix it.
					return Math.max(
						elem.body[ "scroll" + name ], doc[ "scroll" + name ],
						elem.body[ "offset" + name ], doc[ "offset" + name ],
						doc[ "client" + name ]
					);
				}

				return value === undefined ?

					// Get width or height on the element, requesting but not forcing parseFloat
					jQuery.css( elem, type, extra ) :

					// Set width or height on the element
					jQuery.style( elem, type, value, extra );
			}, type, chainable ? margin : undefined, chainable, null );
		};
	} );
} );


jQuery.fn.extend( {

	bind: function( types, data, fn ) {
		return this.on( types, null, data, fn );
	},
	unbind: function( types, fn ) {
		return this.off( types, null, fn );
	},

	delegate: function( selector, types, data, fn ) {
		return this.on( types, selector, data, fn );
	},
	undelegate: function( selector, types, fn ) {

		// ( namespace ) or ( selector, types [, fn] )
		return arguments.length === 1 ?
			this.off( selector, "**" ) :
			this.off( types, selector || "**", fn );
	}
} );

// The number of elements contained in the matched element set
jQuery.fn.size = function() {
	return this.length;
};

jQuery.fn.andSelf = jQuery.fn.addBack;




// Register as a named AMD module, since jQuery can be concatenated with other
// files that may use define, but not via a proper concatenation script that
// understands anonymous AMD modules. A named AMD is safest and most robust
// way to register. Lowercase jquery is used because AMD module names are
// derived from file names, and jQuery is normally delivered in a lowercase
// file name. Do this after creating the global so that if an AMD module wants
// to call noConflict to hide this version of jQuery, it will work.

// Note that for maximum portability, libraries that are not jQuery should
// declare themselves as anonymous modules, and avoid setting a global if an
// AMD loader is present. jQuery is a special case. For more information, see
// https://github.com/jrburke/requirejs/wiki/Updating-existing-libraries#wiki-anon

if ( typeof define === "function" && define.amd ) {
	define( "jquery", [], function() {
		return jQuery;
	} );
}



var

	// Map over jQuery in case of overwrite
	_jQuery = window.jQuery,

	// Map over the $ in case of overwrite
	_$ = window.$;

jQuery.noConflict = function( deep ) {
	if ( window.$ === jQuery ) {
		window.$ = _$;
	}

	if ( deep && window.jQuery === jQuery ) {
		window.jQuery = _jQuery;
	}

	return jQuery;
};

// Expose jQuery and $ identifiers, even in
// AMD (#7102#comment:10, https://github.com/jquery/jquery/pull/557)
// and CommonJS for browser emulators (#13566)
if ( !noGlobal ) {
	window.jQuery = window.$ = jQuery;
}

return jQuery;
}));
(function($, undefined) {

/**
 * Unobtrusive scripting adapter for jQuery
 * https://github.com/rails/jquery-ujs
 *
 * Requires jQuery 1.8.0 or later.
 *
 * Released under the MIT license
 *
 */

  // Cut down on the number of issues from people inadvertently including jquery_ujs twice
  // by detecting and raising an error when it happens.
  'use strict';

  if ( $.rails !== undefined ) {
    $.error('jquery-ujs has already been loaded!');
  }

  // Shorthand to make it a little easier to call public rails functions from within rails.js
  var rails;
  var $document = $(document);

  $.rails = rails = {
    // Link elements bound by jquery-ujs
    linkClickSelector: 'a[data-confirm], a[data-method], a[data-remote]:not([disabled]), a[data-disable-with], a[data-disable]',

    // Button elements bound by jquery-ujs
    buttonClickSelector: 'button[data-remote]:not([form]):not(form button), button[data-confirm]:not([form]):not(form button)',

    // Select elements bound by jquery-ujs
    inputChangeSelector: 'select[data-remote], input[data-remote], textarea[data-remote]',

    // Form elements bound by jquery-ujs
    formSubmitSelector: 'form',

    // Form input elements bound by jquery-ujs
    formInputClickSelector: 'form input[type=submit], form input[type=image], form button[type=submit], form button:not([type]), input[type=submit][form], input[type=image][form], button[type=submit][form], button[form]:not([type])',

    // Form input elements disabled during form submission
    disableSelector: 'input[data-disable-with]:enabled, button[data-disable-with]:enabled, textarea[data-disable-with]:enabled, input[data-disable]:enabled, button[data-disable]:enabled, textarea[data-disable]:enabled',

    // Form input elements re-enabled after form submission
    enableSelector: 'input[data-disable-with]:disabled, button[data-disable-with]:disabled, textarea[data-disable-with]:disabled, input[data-disable]:disabled, button[data-disable]:disabled, textarea[data-disable]:disabled',

    // Form required input elements
    requiredInputSelector: 'input[name][required]:not([disabled]), textarea[name][required]:not([disabled])',

    // Form file input elements
    fileInputSelector: 'input[name][type=file]:not([disabled])',

    // Link onClick disable selector with possible reenable after remote submission
    linkDisableSelector: 'a[data-disable-with], a[data-disable]',

    // Button onClick disable selector with possible reenable after remote submission
    buttonDisableSelector: 'button[data-remote][data-disable-with], button[data-remote][data-disable]',

    // Up-to-date Cross-Site Request Forgery token
    csrfToken: function() {
     return $('meta[name=csrf-token]').attr('content');
    },

    // URL param that must contain the CSRF token
    csrfParam: function() {
     return $('meta[name=csrf-param]').attr('content');
    },

    // Make sure that every Ajax request sends the CSRF token
    CSRFProtection: function(xhr) {
      var token = rails.csrfToken();
      if (token) xhr.setRequestHeader('X-CSRF-Token', token);
    },

    // Make sure that all forms have actual up-to-date tokens (cached forms contain old ones)
    refreshCSRFTokens: function(){
      $('form input[name="' + rails.csrfParam() + '"]').val(rails.csrfToken());
    },

    // Triggers an event on an element and returns false if the event result is false
    fire: function(obj, name, data) {
      var event = $.Event(name);
      obj.trigger(event, data);
      return event.result !== false;
    },

    // Default confirm dialog, may be overridden with custom confirm dialog in $.rails.confirm
    confirm: function(message) {
      return confirm(message);
    },

    // Default ajax function, may be overridden with custom function in $.rails.ajax
    ajax: function(options) {
      return $.ajax(options);
    },

    // Default way to get an element's href. May be overridden at $.rails.href.
    href: function(element) {
      return element[0].href;
    },

    // Checks "data-remote" if true to handle the request through a XHR request.
    isRemote: function(element) {
      return element.data('remote') !== undefined && element.data('remote') !== false;
    },

    // Submits "remote" forms and links with ajax
    handleRemote: function(element) {
      var method, url, data, withCredentials, dataType, options;

      if (rails.fire(element, 'ajax:before')) {
        withCredentials = element.data('with-credentials') || null;
        dataType = element.data('type') || ($.ajaxSettings && $.ajaxSettings.dataType);

        if (element.is('form')) {
          method = element.data('ujs:submit-button-formmethod') || element.attr('method');
          url = element.data('ujs:submit-button-formaction') || element.attr('action');
          data = $(element[0]).serializeArray();
          // memoized value from clicked submit button
          var button = element.data('ujs:submit-button');
          if (button) {
            data.push(button);
            element.data('ujs:submit-button', null);
          }
          element.data('ujs:submit-button-formmethod', null);
          element.data('ujs:submit-button-formaction', null);
        } else if (element.is(rails.inputChangeSelector)) {
          method = element.data('method');
          url = element.data('url');
          data = element.serialize();
          if (element.data('params')) data = data + '&' + element.data('params');
        } else if (element.is(rails.buttonClickSelector)) {
          method = element.data('method') || 'get';
          url = element.data('url');
          data = element.serialize();
          if (element.data('params')) data = data + '&' + element.data('params');
        } else {
          method = element.data('method');
          url = rails.href(element);
          data = element.data('params') || null;
        }

        options = {
          type: method || 'GET', data: data, dataType: dataType,
          // stopping the "ajax:beforeSend" event will cancel the ajax request
          beforeSend: function(xhr, settings) {
            if (settings.dataType === undefined) {
              xhr.setRequestHeader('accept', '*/*;q=0.5, ' + settings.accepts.script);
            }
            if (rails.fire(element, 'ajax:beforeSend', [xhr, settings])) {
              element.trigger('ajax:send', xhr);
            } else {
              return false;
            }
          },
          success: function(data, status, xhr) {
            element.trigger('ajax:success', [data, status, xhr]);
          },
          complete: function(xhr, status) {
            element.trigger('ajax:complete', [xhr, status]);
          },
          error: function(xhr, status, error) {
            element.trigger('ajax:error', [xhr, status, error]);
          },
          crossDomain: rails.isCrossDomain(url)
        };

        // There is no withCredentials for IE6-8 when
        // "Enable native XMLHTTP support" is disabled
        if (withCredentials) {
          options.xhrFields = {
            withCredentials: withCredentials
          };
        }

        // Only pass url to `ajax` options if not blank
        if (url) { options.url = url; }

        return rails.ajax(options);
      } else {
        return false;
      }
    },

    // Determines if the request is a cross domain request.
    isCrossDomain: function(url) {
      var originAnchor = document.createElement('a');
      originAnchor.href = location.href;
      var urlAnchor = document.createElement('a');

      try {
        urlAnchor.href = url;
        // This is a workaround to a IE bug.
        urlAnchor.href = urlAnchor.href;

        // If URL protocol is false or is a string containing a single colon
        // *and* host are false, assume it is not a cross-domain request
        // (should only be the case for IE7 and IE compatibility mode).
        // Otherwise, evaluate protocol and host of the URL against the origin
        // protocol and host.
        return !(((!urlAnchor.protocol || urlAnchor.protocol === ':') && !urlAnchor.host) ||
          (originAnchor.protocol + '//' + originAnchor.host ===
            urlAnchor.protocol + '//' + urlAnchor.host));
      } catch (e) {
        // If there is an error parsing the URL, assume it is crossDomain.
        return true;
      }
    },

    // Handles "data-method" on links such as:
    // <a href="/users/5" data-method="delete" rel="nofollow" data-confirm="Are you sure?">Delete</a>
    handleMethod: function(link) {
      var href = rails.href(link),
        method = link.data('method'),
        target = link.attr('target'),
        csrfToken = rails.csrfToken(),
        csrfParam = rails.csrfParam(),
        form = $('<form method="post" action="' + href + '"></form>'),
        metadataInput = '<input name="_method" value="' + method + '" type="hidden" />';

      if (csrfParam !== undefined && csrfToken !== undefined && !rails.isCrossDomain(href)) {
        metadataInput += '<input name="' + csrfParam + '" value="' + csrfToken + '" type="hidden" />';
      }

      if (target) { form.attr('target', target); }

      form.hide().append(metadataInput).appendTo('body');
      form.submit();
    },

    // Helper function that returns form elements that match the specified CSS selector
    // If form is actually a "form" element this will return associated elements outside the from that have
    // the html form attribute set
    formElements: function(form, selector) {
      return form.is('form') ? $(form[0].elements).filter(selector) : form.find(selector);
    },

    /* Disables form elements:
      - Caches element value in 'ujs:enable-with' data store
      - Replaces element text with value of 'data-disable-with' attribute
      - Sets disabled property to true
    */
    disableFormElements: function(form) {
      rails.formElements(form, rails.disableSelector).each(function() {
        rails.disableFormElement($(this));
      });
    },

    disableFormElement: function(element) {
      var method, replacement;

      method = element.is('button') ? 'html' : 'val';
      replacement = element.data('disable-with');

      if (replacement !== undefined) {
        element.data('ujs:enable-with', element[method]());
        element[method](replacement);
      }

      element.prop('disabled', true);
      element.data('ujs:disabled', true);
    },

    /* Re-enables disabled form elements:
      - Replaces element text with cached value from 'ujs:enable-with' data store (created in `disableFormElements`)
      - Sets disabled property to false
    */
    enableFormElements: function(form) {
      rails.formElements(form, rails.enableSelector).each(function() {
        rails.enableFormElement($(this));
      });
    },

    enableFormElement: function(element) {
      var method = element.is('button') ? 'html' : 'val';
      if (element.data('ujs:enable-with') !== undefined) {
        element[method](element.data('ujs:enable-with'));
        element.removeData('ujs:enable-with'); // clean up cache
      }
      element.prop('disabled', false);
      element.removeData('ujs:disabled');
    },

   /* For 'data-confirm' attribute:
      - Fires `confirm` event
      - Shows the confirmation dialog
      - Fires the `confirm:complete` event

      Returns `true` if no function stops the chain and user chose yes; `false` otherwise.
      Attaching a handler to the element's `confirm` event that returns a `falsy` value cancels the confirmation dialog.
      Attaching a handler to the element's `confirm:complete` event that returns a `falsy` value makes this function
      return false. The `confirm:complete` event is fired whether or not the user answered true or false to the dialog.
   */
    allowAction: function(element) {
      var message = element.data('confirm'),
          answer = false, callback;
      if (!message) { return true; }

      if (rails.fire(element, 'confirm')) {
        try {
          answer = rails.confirm(message);
        } catch (e) {
          (console.error || console.log).call(console, e.stack || e);
        }
        callback = rails.fire(element, 'confirm:complete', [answer]);
      }
      return answer && callback;
    },

    // Helper function which checks for blank inputs in a form that match the specified CSS selector
    blankInputs: function(form, specifiedSelector, nonBlank) {
      var foundInputs = $(),
        input,
        valueToCheck,
        radiosForNameWithNoneSelected,
        radioName,
        selector = specifiedSelector || 'input,textarea',
        requiredInputs = form.find(selector),
        checkedRadioButtonNames = {};

      requiredInputs.each(function() {
        input = $(this);
        if (input.is('input[type=radio]')) {

          // Don't count unchecked required radio as blank if other radio with same name is checked,
          // regardless of whether same-name radio input has required attribute or not. The spec
          // states https://www.w3.org/TR/html5/forms.html#the-required-attribute
          radioName = input.attr('name');

          // Skip if we've already seen the radio with this name.
          if (!checkedRadioButtonNames[radioName]) {

            // If none checked
            if (form.find('input[type=radio]:checked[name="' + radioName + '"]').length === 0) {
              radiosForNameWithNoneSelected = form.find(
                'input[type=radio][name="' + radioName + '"]');
              foundInputs = foundInputs.add(radiosForNameWithNoneSelected);
            }

            // We only need to check each name once.
            checkedRadioButtonNames[radioName] = radioName;
          }
        } else {
          valueToCheck = input.is('input[type=checkbox],input[type=radio]') ? input.is(':checked') : !!input.val();
          if (valueToCheck === nonBlank) {
            foundInputs = foundInputs.add(input);
          }
        }
      });
      return foundInputs.length ? foundInputs : false;
    },

    // Helper function which checks for non-blank inputs in a form that match the specified CSS selector
    nonBlankInputs: function(form, specifiedSelector) {
      return rails.blankInputs(form, specifiedSelector, true); // true specifies nonBlank
    },

    // Helper function, needed to provide consistent behavior in IE
    stopEverything: function(e) {
      $(e.target).trigger('ujs:everythingStopped');
      e.stopImmediatePropagation();
      return false;
    },

    //  Replace element's html with the 'data-disable-with' after storing original html
    //  and prevent clicking on it
    disableElement: function(element) {
      var replacement = element.data('disable-with');

      if (replacement !== undefined) {
        element.data('ujs:enable-with', element.html()); // store enabled state
        element.html(replacement);
      }

      element.bind('click.railsDisable', function(e) { // prevent further clicking
        return rails.stopEverything(e);
      });
      element.data('ujs:disabled', true);
    },

    // Restore element to its original state which was disabled by 'disableElement' above
    enableElement: function(element) {
      if (element.data('ujs:enable-with') !== undefined) {
        element.html(element.data('ujs:enable-with')); // set to old enabled state
        element.removeData('ujs:enable-with'); // clean up cache
      }
      element.unbind('click.railsDisable'); // enable element
      element.removeData('ujs:disabled');
    }
  };

  if (rails.fire($document, 'rails:attachBindings')) {

    $.ajaxPrefilter(function(options, originalOptions, xhr){ if ( !options.crossDomain ) { rails.CSRFProtection(xhr); }});

    // This event works the same as the load event, except that it fires every
    // time the page is loaded.
    //
    // See https://github.com/rails/jquery-ujs/issues/357
    // See https://developer.mozilla.org/en-US/docs/Using_Firefox_1.5_caching
    $(window).on('pageshow.rails', function () {
      $($.rails.enableSelector).each(function () {
        var element = $(this);

        if (element.data('ujs:disabled')) {
          $.rails.enableFormElement(element);
        }
      });

      $($.rails.linkDisableSelector).each(function () {
        var element = $(this);

        if (element.data('ujs:disabled')) {
          $.rails.enableElement(element);
        }
      });
    });

    $document.on('ajax:complete', rails.linkDisableSelector, function() {
        rails.enableElement($(this));
    });

    $document.on('ajax:complete', rails.buttonDisableSelector, function() {
        rails.enableFormElement($(this));
    });

    $document.on('click.rails', rails.linkClickSelector, function(e) {
      var link = $(this), method = link.data('method'), data = link.data('params'), metaClick = e.metaKey || e.ctrlKey;
      if (!rails.allowAction(link)) return rails.stopEverything(e);

      if (!metaClick && link.is(rails.linkDisableSelector)) rails.disableElement(link);

      if (rails.isRemote(link)) {
        if (metaClick && (!method || method === 'GET') && !data) { return true; }

        var handleRemote = rails.handleRemote(link);
        // Response from rails.handleRemote() will either be false or a deferred object promise.
        if (handleRemote === false) {
          rails.enableElement(link);
        } else {
          handleRemote.fail( function() { rails.enableElement(link); } );
        }
        return false;

      } else if (method) {
        rails.handleMethod(link);
        return false;
      }
    });

    $document.on('click.rails', rails.buttonClickSelector, function(e) {
      var button = $(this);

      if (!rails.allowAction(button) || !rails.isRemote(button)) return rails.stopEverything(e);

      if (button.is(rails.buttonDisableSelector)) rails.disableFormElement(button);

      var handleRemote = rails.handleRemote(button);
      // Response from rails.handleRemote() will either be false or a deferred object promise.
      if (handleRemote === false) {
        rails.enableFormElement(button);
      } else {
        handleRemote.fail( function() { rails.enableFormElement(button); } );
      }
      return false;
    });

    $document.on('change.rails', rails.inputChangeSelector, function(e) {
      var link = $(this);
      if (!rails.allowAction(link) || !rails.isRemote(link)) return rails.stopEverything(e);

      rails.handleRemote(link);
      return false;
    });

    $document.on('submit.rails', rails.formSubmitSelector, function(e) {
      var form = $(this),
        remote = rails.isRemote(form),
        blankRequiredInputs,
        nonBlankFileInputs;

      if (!rails.allowAction(form)) return rails.stopEverything(e);

      // Skip other logic when required values are missing or file upload is present
      if (form.attr('novalidate') === undefined) {
        if (form.data('ujs:formnovalidate-button') === undefined) {
          blankRequiredInputs = rails.blankInputs(form, rails.requiredInputSelector, false);
          if (blankRequiredInputs && rails.fire(form, 'ajax:aborted:required', [blankRequiredInputs])) {
            return rails.stopEverything(e);
          }
        } else {
          // Clear the formnovalidate in case the next button click is not on a formnovalidate button
          // Not strictly necessary to do here, since it is also reset on each button click, but just to be certain
          form.data('ujs:formnovalidate-button', undefined);
        }
      }

      if (remote) {
        nonBlankFileInputs = rails.nonBlankInputs(form, rails.fileInputSelector);
        if (nonBlankFileInputs) {
          // Slight timeout so that the submit button gets properly serialized
          // (make it easy for event handler to serialize form without disabled values)
          setTimeout(function(){ rails.disableFormElements(form); }, 13);
          var aborted = rails.fire(form, 'ajax:aborted:file', [nonBlankFileInputs]);

          // Re-enable form elements if event bindings return false (canceling normal form submission)
          if (!aborted) { setTimeout(function(){ rails.enableFormElements(form); }, 13); }

          return aborted;
        }

        rails.handleRemote(form);
        return false;

      } else {
        // Slight timeout so that the submit button gets properly serialized
        setTimeout(function(){ rails.disableFormElements(form); }, 13);
      }
    });

    $document.on('click.rails', rails.formInputClickSelector, function(event) {
      var button = $(this);

      if (!rails.allowAction(button)) return rails.stopEverything(event);

      // Register the pressed submit button
      var name = button.attr('name'),
        data = name ? {name:name, value:button.val()} : null;

      var form = button.closest('form');
      if (form.length === 0) {
        form = $('#' + button.attr('form'));
      }
      form.data('ujs:submit-button', data);

      // Save attributes from button
      form.data('ujs:formnovalidate-button', button.attr('formnovalidate'));
      form.data('ujs:submit-button-formaction', button.attr('formaction'));
      form.data('ujs:submit-button-formmethod', button.attr('formmethod'));
    });

    $document.on('ajax:send.rails', rails.formSubmitSelector, function(event) {
      if (this === event.target) rails.disableFormElements($(this));
    });

    $document.on('ajax:complete.rails', rails.formSubmitSelector, function(event) {
      if (this === event.target) rails.enableFormElements($(this));
    });

    $(function(){
      rails.refreshCSRFTokens();
    });
  }

})( jQuery );
/*!
 * Bootstrap v3.3.7 (http://getbootstrap.com)
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under the MIT license
 */


if (typeof jQuery === 'undefined') {
  throw new Error('Bootstrap\'s JavaScript requires jQuery')
}

+function ($) {
  'use strict';
  var version = $.fn.jquery.split(' ')[0].split('.')
  if ((version[0] < 2 && version[1] < 9) || (version[0] == 1 && version[1] == 9 && version[2] < 1) || (version[0] > 3)) {
    throw new Error('Bootstrap\'s JavaScript requires jQuery version 1.9.1 or higher, but lower than version 4')
  }
}(jQuery);

/* ========================================================================
 * Bootstrap: transition.js v3.3.7
 * http://getbootstrap.com/javascript/#transitions
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // CSS TRANSITION SUPPORT (Shoutout: http://www.modernizr.com/)
  // ============================================================

  function transitionEnd() {
    var el = document.createElement('bootstrap')

    var transEndEventNames = {
      WebkitTransition : 'webkitTransitionEnd',
      MozTransition    : 'transitionend',
      OTransition      : 'oTransitionEnd otransitionend',
      transition       : 'transitionend'
    }

    for (var name in transEndEventNames) {
      if (el.style[name] !== undefined) {
        return { end: transEndEventNames[name] }
      }
    }

    return false // explicit for ie8 (  ._.)
  }

  // http://blog.alexmaccaw.com/css-transitions
  $.fn.emulateTransitionEnd = function (duration) {
    var called = false
    var $el = this
    $(this).one('bsTransitionEnd', function () { called = true })
    var callback = function () { if (!called) $($el).trigger($.support.transition.end) }
    setTimeout(callback, duration)
    return this
  }

  $(function () {
    $.support.transition = transitionEnd()

    if (!$.support.transition) return

    $.event.special.bsTransitionEnd = {
      bindType: $.support.transition.end,
      delegateType: $.support.transition.end,
      handle: function (e) {
        if ($(e.target).is(this)) return e.handleObj.handler.apply(this, arguments)
      }
    }
  })

}(jQuery);

/* ========================================================================
 * Bootstrap: alert.js v3.3.7
 * http://getbootstrap.com/javascript/#alerts
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // ALERT CLASS DEFINITION
  // ======================

  var dismiss = '[data-dismiss="alert"]'
  var Alert   = function (el) {
    $(el).on('click', dismiss, this.close)
  }

  Alert.VERSION = '3.3.7'

  Alert.TRANSITION_DURATION = 150

  Alert.prototype.close = function (e) {
    var $this    = $(this)
    var selector = $this.attr('data-target')

    if (!selector) {
      selector = $this.attr('href')
      selector = selector && selector.replace(/.*(?=#[^\s]*$)/, '') // strip for ie7
    }

    var $parent = $(selector === '#' ? [] : selector)

    if (e) e.preventDefault()

    if (!$parent.length) {
      $parent = $this.closest('.alert')
    }

    $parent.trigger(e = $.Event('close.bs.alert'))

    if (e.isDefaultPrevented()) return

    $parent.removeClass('in')

    function removeElement() {
      // detach from parent, fire event then clean up data
      $parent.detach().trigger('closed.bs.alert').remove()
    }

    $.support.transition && $parent.hasClass('fade') ?
      $parent
        .one('bsTransitionEnd', removeElement)
        .emulateTransitionEnd(Alert.TRANSITION_DURATION) :
      removeElement()
  }


  // ALERT PLUGIN DEFINITION
  // =======================

  function Plugin(option) {
    return this.each(function () {
      var $this = $(this)
      var data  = $this.data('bs.alert')

      if (!data) $this.data('bs.alert', (data = new Alert(this)))
      if (typeof option == 'string') data[option].call($this)
    })
  }

  var old = $.fn.alert

  $.fn.alert             = Plugin
  $.fn.alert.Constructor = Alert


  // ALERT NO CONFLICT
  // =================

  $.fn.alert.noConflict = function () {
    $.fn.alert = old
    return this
  }


  // ALERT DATA-API
  // ==============

  $(document).on('click.bs.alert.data-api', dismiss, Alert.prototype.close)

}(jQuery);

/* ========================================================================
 * Bootstrap: button.js v3.3.7
 * http://getbootstrap.com/javascript/#buttons
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // BUTTON PUBLIC CLASS DEFINITION
  // ==============================

  var Button = function (element, options) {
    this.$element  = $(element)
    this.options   = $.extend({}, Button.DEFAULTS, options)
    this.isLoading = false
  }

  Button.VERSION  = '3.3.7'

  Button.DEFAULTS = {
    loadingText: 'loading...'
  }

  Button.prototype.setState = function (state) {
    var d    = 'disabled'
    var $el  = this.$element
    var val  = $el.is('input') ? 'val' : 'html'
    var data = $el.data()

    state += 'Text'

    if (data.resetText == null) $el.data('resetText', $el[val]())

    // push to event loop to allow forms to submit
    setTimeout($.proxy(function () {
      $el[val](data[state] == null ? this.options[state] : data[state])

      if (state == 'loadingText') {
        this.isLoading = true
        $el.addClass(d).attr(d, d).prop(d, true)
      } else if (this.isLoading) {
        this.isLoading = false
        $el.removeClass(d).removeAttr(d).prop(d, false)
      }
    }, this), 0)
  }

  Button.prototype.toggle = function () {
    var changed = true
    var $parent = this.$element.closest('[data-toggle="buttons"]')

    if ($parent.length) {
      var $input = this.$element.find('input')
      if ($input.prop('type') == 'radio') {
        if ($input.prop('checked')) changed = false
        $parent.find('.active').removeClass('active')
        this.$element.addClass('active')
      } else if ($input.prop('type') == 'checkbox') {
        if (($input.prop('checked')) !== this.$element.hasClass('active')) changed = false
        this.$element.toggleClass('active')
      }
      $input.prop('checked', this.$element.hasClass('active'))
      if (changed) $input.trigger('change')
    } else {
      this.$element.attr('aria-pressed', !this.$element.hasClass('active'))
      this.$element.toggleClass('active')
    }
  }


  // BUTTON PLUGIN DEFINITION
  // ========================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.button')
      var options = typeof option == 'object' && option

      if (!data) $this.data('bs.button', (data = new Button(this, options)))

      if (option == 'toggle') data.toggle()
      else if (option) data.setState(option)
    })
  }

  var old = $.fn.button

  $.fn.button             = Plugin
  $.fn.button.Constructor = Button


  // BUTTON NO CONFLICT
  // ==================

  $.fn.button.noConflict = function () {
    $.fn.button = old
    return this
  }


  // BUTTON DATA-API
  // ===============

  $(document)
    .on('click.bs.button.data-api', '[data-toggle^="button"]', function (e) {
      var $btn = $(e.target).closest('.btn')
      Plugin.call($btn, 'toggle')
      if (!($(e.target).is('input[type="radio"], input[type="checkbox"]'))) {
        // Prevent double click on radios, and the double selections (so cancellation) on checkboxes
        e.preventDefault()
        // The target component still receive the focus
        if ($btn.is('input,button')) $btn.trigger('focus')
        else $btn.find('input:visible,button:visible').first().trigger('focus')
      }
    })
    .on('focus.bs.button.data-api blur.bs.button.data-api', '[data-toggle^="button"]', function (e) {
      $(e.target).closest('.btn').toggleClass('focus', /^focus(in)?$/.test(e.type))
    })

}(jQuery);

/* ========================================================================
 * Bootstrap: carousel.js v3.3.7
 * http://getbootstrap.com/javascript/#carousel
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // CAROUSEL CLASS DEFINITION
  // =========================

  var Carousel = function (element, options) {
    this.$element    = $(element)
    this.$indicators = this.$element.find('.carousel-indicators')
    this.options     = options
    this.paused      = null
    this.sliding     = null
    this.interval    = null
    this.$active     = null
    this.$items      = null

    this.options.keyboard && this.$element.on('keydown.bs.carousel', $.proxy(this.keydown, this))

    this.options.pause == 'hover' && !('ontouchstart' in document.documentElement) && this.$element
      .on('mouseenter.bs.carousel', $.proxy(this.pause, this))
      .on('mouseleave.bs.carousel', $.proxy(this.cycle, this))
  }

  Carousel.VERSION  = '3.3.7'

  Carousel.TRANSITION_DURATION = 600

  Carousel.DEFAULTS = {
    interval: 5000,
    pause: 'hover',
    wrap: true,
    keyboard: true
  }

  Carousel.prototype.keydown = function (e) {
    if (/input|textarea/i.test(e.target.tagName)) return
    switch (e.which) {
      case 37: this.prev(); break
      case 39: this.next(); break
      default: return
    }

    e.preventDefault()
  }

  Carousel.prototype.cycle = function (e) {
    e || (this.paused = false)

    this.interval && clearInterval(this.interval)

    this.options.interval
      && !this.paused
      && (this.interval = setInterval($.proxy(this.next, this), this.options.interval))

    return this
  }

  Carousel.prototype.getItemIndex = function (item) {
    this.$items = item.parent().children('.item')
    return this.$items.index(item || this.$active)
  }

  Carousel.prototype.getItemForDirection = function (direction, active) {
    var activeIndex = this.getItemIndex(active)
    var willWrap = (direction == 'prev' && activeIndex === 0)
                || (direction == 'next' && activeIndex == (this.$items.length - 1))
    if (willWrap && !this.options.wrap) return active
    var delta = direction == 'prev' ? -1 : 1
    var itemIndex = (activeIndex + delta) % this.$items.length
    return this.$items.eq(itemIndex)
  }

  Carousel.prototype.to = function (pos) {
    var that        = this
    var activeIndex = this.getItemIndex(this.$active = this.$element.find('.item.active'))

    if (pos > (this.$items.length - 1) || pos < 0) return

    if (this.sliding)       return this.$element.one('slid.bs.carousel', function () { that.to(pos) }) // yes, "slid"
    if (activeIndex == pos) return this.pause().cycle()

    return this.slide(pos > activeIndex ? 'next' : 'prev', this.$items.eq(pos))
  }

  Carousel.prototype.pause = function (e) {
    e || (this.paused = true)

    if (this.$element.find('.next, .prev').length && $.support.transition) {
      this.$element.trigger($.support.transition.end)
      this.cycle(true)
    }

    this.interval = clearInterval(this.interval)

    return this
  }

  Carousel.prototype.next = function () {
    if (this.sliding) return
    return this.slide('next')
  }

  Carousel.prototype.prev = function () {
    if (this.sliding) return
    return this.slide('prev')
  }

  Carousel.prototype.slide = function (type, next) {
    var $active   = this.$element.find('.item.active')
    var $next     = next || this.getItemForDirection(type, $active)
    var isCycling = this.interval
    var direction = type == 'next' ? 'left' : 'right'
    var that      = this

    if ($next.hasClass('active')) return (this.sliding = false)

    var relatedTarget = $next[0]
    var slideEvent = $.Event('slide.bs.carousel', {
      relatedTarget: relatedTarget,
      direction: direction
    })
    this.$element.trigger(slideEvent)
    if (slideEvent.isDefaultPrevented()) return

    this.sliding = true

    isCycling && this.pause()

    if (this.$indicators.length) {
      this.$indicators.find('.active').removeClass('active')
      var $nextIndicator = $(this.$indicators.children()[this.getItemIndex($next)])
      $nextIndicator && $nextIndicator.addClass('active')
    }

    var slidEvent = $.Event('slid.bs.carousel', { relatedTarget: relatedTarget, direction: direction }) // yes, "slid"
    if ($.support.transition && this.$element.hasClass('slide')) {
      $next.addClass(type)
      $next[0].offsetWidth // force reflow
      $active.addClass(direction)
      $next.addClass(direction)
      $active
        .one('bsTransitionEnd', function () {
          $next.removeClass([type, direction].join(' ')).addClass('active')
          $active.removeClass(['active', direction].join(' '))
          that.sliding = false
          setTimeout(function () {
            that.$element.trigger(slidEvent)
          }, 0)
        })
        .emulateTransitionEnd(Carousel.TRANSITION_DURATION)
    } else {
      $active.removeClass('active')
      $next.addClass('active')
      this.sliding = false
      this.$element.trigger(slidEvent)
    }

    isCycling && this.cycle()

    return this
  }


  // CAROUSEL PLUGIN DEFINITION
  // ==========================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.carousel')
      var options = $.extend({}, Carousel.DEFAULTS, $this.data(), typeof option == 'object' && option)
      var action  = typeof option == 'string' ? option : options.slide

      if (!data) $this.data('bs.carousel', (data = new Carousel(this, options)))
      if (typeof option == 'number') data.to(option)
      else if (action) data[action]()
      else if (options.interval) data.pause().cycle()
    })
  }

  var old = $.fn.carousel

  $.fn.carousel             = Plugin
  $.fn.carousel.Constructor = Carousel


  // CAROUSEL NO CONFLICT
  // ====================

  $.fn.carousel.noConflict = function () {
    $.fn.carousel = old
    return this
  }


  // CAROUSEL DATA-API
  // =================

  var clickHandler = function (e) {
    var href
    var $this   = $(this)
    var $target = $($this.attr('data-target') || (href = $this.attr('href')) && href.replace(/.*(?=#[^\s]+$)/, '')) // strip for ie7
    if (!$target.hasClass('carousel')) return
    var options = $.extend({}, $target.data(), $this.data())
    var slideIndex = $this.attr('data-slide-to')
    if (slideIndex) options.interval = false

    Plugin.call($target, options)

    if (slideIndex) {
      $target.data('bs.carousel').to(slideIndex)
    }

    e.preventDefault()
  }

  $(document)
    .on('click.bs.carousel.data-api', '[data-slide]', clickHandler)
    .on('click.bs.carousel.data-api', '[data-slide-to]', clickHandler)

  $(window).on('load', function () {
    $('[data-ride="carousel"]').each(function () {
      var $carousel = $(this)
      Plugin.call($carousel, $carousel.data())
    })
  })

}(jQuery);

/* ========================================================================
 * Bootstrap: collapse.js v3.3.7
 * http://getbootstrap.com/javascript/#collapse
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */

/* jshint latedef: false */

+function ($) {
  'use strict';

  // COLLAPSE PUBLIC CLASS DEFINITION
  // ================================

  var Collapse = function (element, options) {
    this.$element      = $(element)
    this.options       = $.extend({}, Collapse.DEFAULTS, options)
    this.$trigger      = $('[data-toggle="collapse"][href="#' + element.id + '"],' +
                           '[data-toggle="collapse"][data-target="#' + element.id + '"]')
    this.transitioning = null

    if (this.options.parent) {
      this.$parent = this.getParent()
    } else {
      this.addAriaAndCollapsedClass(this.$element, this.$trigger)
    }

    if (this.options.toggle) this.toggle()
  }

  Collapse.VERSION  = '3.3.7'

  Collapse.TRANSITION_DURATION = 350

  Collapse.DEFAULTS = {
    toggle: true
  }

  Collapse.prototype.dimension = function () {
    var hasWidth = this.$element.hasClass('width')
    return hasWidth ? 'width' : 'height'
  }

  Collapse.prototype.show = function () {
    if (this.transitioning || this.$element.hasClass('in')) return

    var activesData
    var actives = this.$parent && this.$parent.children('.panel').children('.in, .collapsing')

    if (actives && actives.length) {
      activesData = actives.data('bs.collapse')
      if (activesData && activesData.transitioning) return
    }

    var startEvent = $.Event('show.bs.collapse')
    this.$element.trigger(startEvent)
    if (startEvent.isDefaultPrevented()) return

    if (actives && actives.length) {
      Plugin.call(actives, 'hide')
      activesData || actives.data('bs.collapse', null)
    }

    var dimension = this.dimension()

    this.$element
      .removeClass('collapse')
      .addClass('collapsing')[dimension](0)
      .attr('aria-expanded', true)

    this.$trigger
      .removeClass('collapsed')
      .attr('aria-expanded', true)

    this.transitioning = 1

    var complete = function () {
      this.$element
        .removeClass('collapsing')
        .addClass('collapse in')[dimension]('')
      this.transitioning = 0
      this.$element
        .trigger('shown.bs.collapse')
    }

    if (!$.support.transition) return complete.call(this)

    var scrollSize = $.camelCase(['scroll', dimension].join('-'))

    this.$element
      .one('bsTransitionEnd', $.proxy(complete, this))
      .emulateTransitionEnd(Collapse.TRANSITION_DURATION)[dimension](this.$element[0][scrollSize])
  }

  Collapse.prototype.hide = function () {
    if (this.transitioning || !this.$element.hasClass('in')) return

    var startEvent = $.Event('hide.bs.collapse')
    this.$element.trigger(startEvent)
    if (startEvent.isDefaultPrevented()) return

    var dimension = this.dimension()

    this.$element[dimension](this.$element[dimension]())[0].offsetHeight

    this.$element
      .addClass('collapsing')
      .removeClass('collapse in')
      .attr('aria-expanded', false)

    this.$trigger
      .addClass('collapsed')
      .attr('aria-expanded', false)

    this.transitioning = 1

    var complete = function () {
      this.transitioning = 0
      this.$element
        .removeClass('collapsing')
        .addClass('collapse')
        .trigger('hidden.bs.collapse')
    }

    if (!$.support.transition) return complete.call(this)

    this.$element
      [dimension](0)
      .one('bsTransitionEnd', $.proxy(complete, this))
      .emulateTransitionEnd(Collapse.TRANSITION_DURATION)
  }

  Collapse.prototype.toggle = function () {
    this[this.$element.hasClass('in') ? 'hide' : 'show']()
  }

  Collapse.prototype.getParent = function () {
    return $(this.options.parent)
      .find('[data-toggle="collapse"][data-parent="' + this.options.parent + '"]')
      .each($.proxy(function (i, element) {
        var $element = $(element)
        this.addAriaAndCollapsedClass(getTargetFromTrigger($element), $element)
      }, this))
      .end()
  }

  Collapse.prototype.addAriaAndCollapsedClass = function ($element, $trigger) {
    var isOpen = $element.hasClass('in')

    $element.attr('aria-expanded', isOpen)
    $trigger
      .toggleClass('collapsed', !isOpen)
      .attr('aria-expanded', isOpen)
  }

  function getTargetFromTrigger($trigger) {
    var href
    var target = $trigger.attr('data-target')
      || (href = $trigger.attr('href')) && href.replace(/.*(?=#[^\s]+$)/, '') // strip for ie7

    return $(target)
  }


  // COLLAPSE PLUGIN DEFINITION
  // ==========================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.collapse')
      var options = $.extend({}, Collapse.DEFAULTS, $this.data(), typeof option == 'object' && option)

      if (!data && options.toggle && /show|hide/.test(option)) options.toggle = false
      if (!data) $this.data('bs.collapse', (data = new Collapse(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  var old = $.fn.collapse

  $.fn.collapse             = Plugin
  $.fn.collapse.Constructor = Collapse


  // COLLAPSE NO CONFLICT
  // ====================

  $.fn.collapse.noConflict = function () {
    $.fn.collapse = old
    return this
  }


  // COLLAPSE DATA-API
  // =================

  $(document).on('click.bs.collapse.data-api', '[data-toggle="collapse"]', function (e) {
    var $this   = $(this)

    if (!$this.attr('data-target')) e.preventDefault()

    var $target = getTargetFromTrigger($this)
    var data    = $target.data('bs.collapse')
    var option  = data ? 'toggle' : $this.data()

    Plugin.call($target, option)
  })

}(jQuery);

/* ========================================================================
 * Bootstrap: dropdown.js v3.3.7
 * http://getbootstrap.com/javascript/#dropdowns
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // DROPDOWN CLASS DEFINITION
  // =========================

  var backdrop = '.dropdown-backdrop'
  var toggle   = '[data-toggle="dropdown"]'
  var Dropdown = function (element) {
    $(element).on('click.bs.dropdown', this.toggle)
  }

  Dropdown.VERSION = '3.3.7'

  function getParent($this) {
    var selector = $this.attr('data-target')

    if (!selector) {
      selector = $this.attr('href')
      selector = selector && /#[A-Za-z]/.test(selector) && selector.replace(/.*(?=#[^\s]*$)/, '') // strip for ie7
    }

    var $parent = selector && $(selector)

    return $parent && $parent.length ? $parent : $this.parent()
  }

  function clearMenus(e) {
    if (e && e.which === 3) return
    $(backdrop).remove()
    $(toggle).each(function () {
      var $this         = $(this)
      var $parent       = getParent($this)
      var relatedTarget = { relatedTarget: this }

      if (!$parent.hasClass('open')) return

      if (e && e.type == 'click' && /input|textarea/i.test(e.target.tagName) && $.contains($parent[0], e.target)) return

      $parent.trigger(e = $.Event('hide.bs.dropdown', relatedTarget))

      if (e.isDefaultPrevented()) return

      $this.attr('aria-expanded', 'false')
      $parent.removeClass('open').trigger($.Event('hidden.bs.dropdown', relatedTarget))
    })
  }

  Dropdown.prototype.toggle = function (e) {
    var $this = $(this)

    if ($this.is('.disabled, :disabled')) return

    var $parent  = getParent($this)
    var isActive = $parent.hasClass('open')

    clearMenus()

    if (!isActive) {
      if ('ontouchstart' in document.documentElement && !$parent.closest('.navbar-nav').length) {
        // if mobile we use a backdrop because click events don't delegate
        $(document.createElement('div'))
          .addClass('dropdown-backdrop')
          .insertAfter($(this))
          .on('click', clearMenus)
      }

      var relatedTarget = { relatedTarget: this }
      $parent.trigger(e = $.Event('show.bs.dropdown', relatedTarget))

      if (e.isDefaultPrevented()) return

      $this
        .trigger('focus')
        .attr('aria-expanded', 'true')

      $parent
        .toggleClass('open')
        .trigger($.Event('shown.bs.dropdown', relatedTarget))
    }

    return false
  }

  Dropdown.prototype.keydown = function (e) {
    if (!/(38|40|27|32)/.test(e.which) || /input|textarea/i.test(e.target.tagName)) return

    var $this = $(this)

    e.preventDefault()
    e.stopPropagation()

    if ($this.is('.disabled, :disabled')) return

    var $parent  = getParent($this)
    var isActive = $parent.hasClass('open')

    if (!isActive && e.which != 27 || isActive && e.which == 27) {
      if (e.which == 27) $parent.find(toggle).trigger('focus')
      return $this.trigger('click')
    }

    var desc = ' li:not(.disabled):visible a'
    var $items = $parent.find('.dropdown-menu' + desc)

    if (!$items.length) return

    var index = $items.index(e.target)

    if (e.which == 38 && index > 0)                 index--         // up
    if (e.which == 40 && index < $items.length - 1) index++         // down
    if (!~index)                                    index = 0

    $items.eq(index).trigger('focus')
  }


  // DROPDOWN PLUGIN DEFINITION
  // ==========================

  function Plugin(option) {
    return this.each(function () {
      var $this = $(this)
      var data  = $this.data('bs.dropdown')

      if (!data) $this.data('bs.dropdown', (data = new Dropdown(this)))
      if (typeof option == 'string') data[option].call($this)
    })
  }

  var old = $.fn.dropdown

  $.fn.dropdown             = Plugin
  $.fn.dropdown.Constructor = Dropdown


  // DROPDOWN NO CONFLICT
  // ====================

  $.fn.dropdown.noConflict = function () {
    $.fn.dropdown = old
    return this
  }


  // APPLY TO STANDARD DROPDOWN ELEMENTS
  // ===================================

  $(document)
    .on('click.bs.dropdown.data-api', clearMenus)
    .on('click.bs.dropdown.data-api', '.dropdown form', function (e) { e.stopPropagation() })
    .on('click.bs.dropdown.data-api', toggle, Dropdown.prototype.toggle)
    .on('keydown.bs.dropdown.data-api', toggle, Dropdown.prototype.keydown)
    .on('keydown.bs.dropdown.data-api', '.dropdown-menu', Dropdown.prototype.keydown)

}(jQuery);

/* ========================================================================
 * Bootstrap: modal.js v3.3.7
 * http://getbootstrap.com/javascript/#modals
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // MODAL CLASS DEFINITION
  // ======================

  var Modal = function (element, options) {
    this.options             = options
    this.$body               = $(document.body)
    this.$element            = $(element)
    this.$dialog             = this.$element.find('.modal-dialog')
    this.$backdrop           = null
    this.isShown             = null
    this.originalBodyPad     = null
    this.scrollbarWidth      = 0
    this.ignoreBackdropClick = false

    if (this.options.remote) {
      this.$element
        .find('.modal-content')
        .load(this.options.remote, $.proxy(function () {
          this.$element.trigger('loaded.bs.modal')
        }, this))
    }
  }

  Modal.VERSION  = '3.3.7'

  Modal.TRANSITION_DURATION = 300
  Modal.BACKDROP_TRANSITION_DURATION = 150

  Modal.DEFAULTS = {
    backdrop: true,
    keyboard: true,
    show: true
  }

  Modal.prototype.toggle = function (_relatedTarget) {
    return this.isShown ? this.hide() : this.show(_relatedTarget)
  }

  Modal.prototype.show = function (_relatedTarget) {
    var that = this
    var e    = $.Event('show.bs.modal', { relatedTarget: _relatedTarget })

    this.$element.trigger(e)

    if (this.isShown || e.isDefaultPrevented()) return

    this.isShown = true

    this.checkScrollbar()
    this.setScrollbar()
    this.$body.addClass('modal-open')

    this.escape()
    this.resize()

    this.$element.on('click.dismiss.bs.modal', '[data-dismiss="modal"]', $.proxy(this.hide, this))

    this.$dialog.on('mousedown.dismiss.bs.modal', function () {
      that.$element.one('mouseup.dismiss.bs.modal', function (e) {
        if ($(e.target).is(that.$element)) that.ignoreBackdropClick = true
      })
    })

    this.backdrop(function () {
      var transition = $.support.transition && that.$element.hasClass('fade')

      if (!that.$element.parent().length) {
        that.$element.appendTo(that.$body) // don't move modals dom position
      }

      that.$element
        .show()
        .scrollTop(0)

      that.adjustDialog()

      if (transition) {
        that.$element[0].offsetWidth // force reflow
      }

      that.$element.addClass('in')

      that.enforceFocus()

      var e = $.Event('shown.bs.modal', { relatedTarget: _relatedTarget })

      transition ?
        that.$dialog // wait for modal to slide in
          .one('bsTransitionEnd', function () {
            that.$element.trigger('focus').trigger(e)
          })
          .emulateTransitionEnd(Modal.TRANSITION_DURATION) :
        that.$element.trigger('focus').trigger(e)
    })
  }

  Modal.prototype.hide = function (e) {
    if (e) e.preventDefault()

    e = $.Event('hide.bs.modal')

    this.$element.trigger(e)

    if (!this.isShown || e.isDefaultPrevented()) return

    this.isShown = false

    this.escape()
    this.resize()

    $(document).off('focusin.bs.modal')

    this.$element
      .removeClass('in')
      .off('click.dismiss.bs.modal')
      .off('mouseup.dismiss.bs.modal')

    this.$dialog.off('mousedown.dismiss.bs.modal')

    $.support.transition && this.$element.hasClass('fade') ?
      this.$element
        .one('bsTransitionEnd', $.proxy(this.hideModal, this))
        .emulateTransitionEnd(Modal.TRANSITION_DURATION) :
      this.hideModal()
  }

  Modal.prototype.enforceFocus = function () {
    $(document)
      .off('focusin.bs.modal') // guard against infinite focus loop
      .on('focusin.bs.modal', $.proxy(function (e) {
        if (document !== e.target &&
            this.$element[0] !== e.target &&
            !this.$element.has(e.target).length) {
          this.$element.trigger('focus')
        }
      }, this))
  }

  Modal.prototype.escape = function () {
    if (this.isShown && this.options.keyboard) {
      this.$element.on('keydown.dismiss.bs.modal', $.proxy(function (e) {
        e.which == 27 && this.hide()
      }, this))
    } else if (!this.isShown) {
      this.$element.off('keydown.dismiss.bs.modal')
    }
  }

  Modal.prototype.resize = function () {
    if (this.isShown) {
      $(window).on('resize.bs.modal', $.proxy(this.handleUpdate, this))
    } else {
      $(window).off('resize.bs.modal')
    }
  }

  Modal.prototype.hideModal = function () {
    var that = this
    this.$element.hide()
    this.backdrop(function () {
      that.$body.removeClass('modal-open')
      that.resetAdjustments()
      that.resetScrollbar()
      that.$element.trigger('hidden.bs.modal')
    })
  }

  Modal.prototype.removeBackdrop = function () {
    this.$backdrop && this.$backdrop.remove()
    this.$backdrop = null
  }

  Modal.prototype.backdrop = function (callback) {
    var that = this
    var animate = this.$element.hasClass('fade') ? 'fade' : ''

    if (this.isShown && this.options.backdrop) {
      var doAnimate = $.support.transition && animate

      this.$backdrop = $(document.createElement('div'))
        .addClass('modal-backdrop ' + animate)
        .appendTo(this.$body)

      this.$element.on('click.dismiss.bs.modal', $.proxy(function (e) {
        if (this.ignoreBackdropClick) {
          this.ignoreBackdropClick = false
          return
        }
        if (e.target !== e.currentTarget) return
        this.options.backdrop == 'static'
          ? this.$element[0].focus()
          : this.hide()
      }, this))

      if (doAnimate) this.$backdrop[0].offsetWidth // force reflow

      this.$backdrop.addClass('in')

      if (!callback) return

      doAnimate ?
        this.$backdrop
          .one('bsTransitionEnd', callback)
          .emulateTransitionEnd(Modal.BACKDROP_TRANSITION_DURATION) :
        callback()

    } else if (!this.isShown && this.$backdrop) {
      this.$backdrop.removeClass('in')

      var callbackRemove = function () {
        that.removeBackdrop()
        callback && callback()
      }
      $.support.transition && this.$element.hasClass('fade') ?
        this.$backdrop
          .one('bsTransitionEnd', callbackRemove)
          .emulateTransitionEnd(Modal.BACKDROP_TRANSITION_DURATION) :
        callbackRemove()

    } else if (callback) {
      callback()
    }
  }

  // these following methods are used to handle overflowing modals

  Modal.prototype.handleUpdate = function () {
    this.adjustDialog()
  }

  Modal.prototype.adjustDialog = function () {
    var modalIsOverflowing = this.$element[0].scrollHeight > document.documentElement.clientHeight

    this.$element.css({
      paddingLeft:  !this.bodyIsOverflowing && modalIsOverflowing ? this.scrollbarWidth : '',
      paddingRight: this.bodyIsOverflowing && !modalIsOverflowing ? this.scrollbarWidth : ''
    })
  }

  Modal.prototype.resetAdjustments = function () {
    this.$element.css({
      paddingLeft: '',
      paddingRight: ''
    })
  }

  Modal.prototype.checkScrollbar = function () {
    var fullWindowWidth = window.innerWidth
    if (!fullWindowWidth) { // workaround for missing window.innerWidth in IE8
      var documentElementRect = document.documentElement.getBoundingClientRect()
      fullWindowWidth = documentElementRect.right - Math.abs(documentElementRect.left)
    }
    this.bodyIsOverflowing = document.body.clientWidth < fullWindowWidth
    this.scrollbarWidth = this.measureScrollbar()
  }

  Modal.prototype.setScrollbar = function () {
    var bodyPad = parseInt((this.$body.css('padding-right') || 0), 10)
    this.originalBodyPad = document.body.style.paddingRight || ''
    if (this.bodyIsOverflowing) this.$body.css('padding-right', bodyPad + this.scrollbarWidth)
  }

  Modal.prototype.resetScrollbar = function () {
    this.$body.css('padding-right', this.originalBodyPad)
  }

  Modal.prototype.measureScrollbar = function () { // thx walsh
    var scrollDiv = document.createElement('div')
    scrollDiv.className = 'modal-scrollbar-measure'
    this.$body.append(scrollDiv)
    var scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth
    this.$body[0].removeChild(scrollDiv)
    return scrollbarWidth
  }


  // MODAL PLUGIN DEFINITION
  // =======================

  function Plugin(option, _relatedTarget) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.modal')
      var options = $.extend({}, Modal.DEFAULTS, $this.data(), typeof option == 'object' && option)

      if (!data) $this.data('bs.modal', (data = new Modal(this, options)))
      if (typeof option == 'string') data[option](_relatedTarget)
      else if (options.show) data.show(_relatedTarget)
    })
  }

  var old = $.fn.modal

  $.fn.modal             = Plugin
  $.fn.modal.Constructor = Modal


  // MODAL NO CONFLICT
  // =================

  $.fn.modal.noConflict = function () {
    $.fn.modal = old
    return this
  }


  // MODAL DATA-API
  // ==============

  $(document).on('click.bs.modal.data-api', '[data-toggle="modal"]', function (e) {
    var $this   = $(this)
    var href    = $this.attr('href')
    var $target = $($this.attr('data-target') || (href && href.replace(/.*(?=#[^\s]+$)/, ''))) // strip for ie7
    var option  = $target.data('bs.modal') ? 'toggle' : $.extend({ remote: !/#/.test(href) && href }, $target.data(), $this.data())

    if ($this.is('a')) e.preventDefault()

    $target.one('show.bs.modal', function (showEvent) {
      if (showEvent.isDefaultPrevented()) return // only register focus restorer if modal will actually get shown
      $target.one('hidden.bs.modal', function () {
        $this.is(':visible') && $this.trigger('focus')
      })
    })
    Plugin.call($target, option, this)
  })

}(jQuery);

/* ========================================================================
 * Bootstrap: tooltip.js v3.3.7
 * http://getbootstrap.com/javascript/#tooltip
 * Inspired by the original jQuery.tipsy by Jason Frame
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // TOOLTIP PUBLIC CLASS DEFINITION
  // ===============================

  var Tooltip = function (element, options) {
    this.type       = null
    this.options    = null
    this.enabled    = null
    this.timeout    = null
    this.hoverState = null
    this.$element   = null
    this.inState    = null

    this.init('tooltip', element, options)
  }

  Tooltip.VERSION  = '3.3.7'

  Tooltip.TRANSITION_DURATION = 150

  Tooltip.DEFAULTS = {
    animation: true,
    placement: 'top',
    selector: false,
    template: '<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',
    trigger: 'hover focus',
    title: '',
    delay: 0,
    html: false,
    container: false,
    viewport: {
      selector: 'body',
      padding: 0
    }
  }

  Tooltip.prototype.init = function (type, element, options) {
    this.enabled   = true
    this.type      = type
    this.$element  = $(element)
    this.options   = this.getOptions(options)
    this.$viewport = this.options.viewport && $($.isFunction(this.options.viewport) ? this.options.viewport.call(this, this.$element) : (this.options.viewport.selector || this.options.viewport))
    this.inState   = { click: false, hover: false, focus: false }

    if (this.$element[0] instanceof document.constructor && !this.options.selector) {
      throw new Error('`selector` option must be specified when initializing ' + this.type + ' on the window.document object!')
    }

    var triggers = this.options.trigger.split(' ')

    for (var i = triggers.length; i--;) {
      var trigger = triggers[i]

      if (trigger == 'click') {
        this.$element.on('click.' + this.type, this.options.selector, $.proxy(this.toggle, this))
      } else if (trigger != 'manual') {
        var eventIn  = trigger == 'hover' ? 'mouseenter' : 'focusin'
        var eventOut = trigger == 'hover' ? 'mouseleave' : 'focusout'

        this.$element.on(eventIn  + '.' + this.type, this.options.selector, $.proxy(this.enter, this))
        this.$element.on(eventOut + '.' + this.type, this.options.selector, $.proxy(this.leave, this))
      }
    }

    this.options.selector ?
      (this._options = $.extend({}, this.options, { trigger: 'manual', selector: '' })) :
      this.fixTitle()
  }

  Tooltip.prototype.getDefaults = function () {
    return Tooltip.DEFAULTS
  }

  Tooltip.prototype.getOptions = function (options) {
    options = $.extend({}, this.getDefaults(), this.$element.data(), options)

    if (options.delay && typeof options.delay == 'number') {
      options.delay = {
        show: options.delay,
        hide: options.delay
      }
    }

    return options
  }

  Tooltip.prototype.getDelegateOptions = function () {
    var options  = {}
    var defaults = this.getDefaults()

    this._options && $.each(this._options, function (key, value) {
      if (defaults[key] != value) options[key] = value
    })

    return options
  }

  Tooltip.prototype.enter = function (obj) {
    var self = obj instanceof this.constructor ?
      obj : $(obj.currentTarget).data('bs.' + this.type)

    if (!self) {
      self = new this.constructor(obj.currentTarget, this.getDelegateOptions())
      $(obj.currentTarget).data('bs.' + this.type, self)
    }

    if (obj instanceof $.Event) {
      self.inState[obj.type == 'focusin' ? 'focus' : 'hover'] = true
    }

    if (self.tip().hasClass('in') || self.hoverState == 'in') {
      self.hoverState = 'in'
      return
    }

    clearTimeout(self.timeout)

    self.hoverState = 'in'

    if (!self.options.delay || !self.options.delay.show) return self.show()

    self.timeout = setTimeout(function () {
      if (self.hoverState == 'in') self.show()
    }, self.options.delay.show)
  }

  Tooltip.prototype.isInStateTrue = function () {
    for (var key in this.inState) {
      if (this.inState[key]) return true
    }

    return false
  }

  Tooltip.prototype.leave = function (obj) {
    var self = obj instanceof this.constructor ?
      obj : $(obj.currentTarget).data('bs.' + this.type)

    if (!self) {
      self = new this.constructor(obj.currentTarget, this.getDelegateOptions())
      $(obj.currentTarget).data('bs.' + this.type, self)
    }

    if (obj instanceof $.Event) {
      self.inState[obj.type == 'focusout' ? 'focus' : 'hover'] = false
    }

    if (self.isInStateTrue()) return

    clearTimeout(self.timeout)

    self.hoverState = 'out'

    if (!self.options.delay || !self.options.delay.hide) return self.hide()

    self.timeout = setTimeout(function () {
      if (self.hoverState == 'out') self.hide()
    }, self.options.delay.hide)
  }

  Tooltip.prototype.show = function () {
    var e = $.Event('show.bs.' + this.type)

    if (this.hasContent() && this.enabled) {
      this.$element.trigger(e)

      var inDom = $.contains(this.$element[0].ownerDocument.documentElement, this.$element[0])
      if (e.isDefaultPrevented() || !inDom) return
      var that = this

      var $tip = this.tip()

      var tipId = this.getUID(this.type)

      this.setContent()
      $tip.attr('id', tipId)
      this.$element.attr('aria-describedby', tipId)

      if (this.options.animation) $tip.addClass('fade')

      var placement = typeof this.options.placement == 'function' ?
        this.options.placement.call(this, $tip[0], this.$element[0]) :
        this.options.placement

      var autoToken = /\s?auto?\s?/i
      var autoPlace = autoToken.test(placement)
      if (autoPlace) placement = placement.replace(autoToken, '') || 'top'

      $tip
        .detach()
        .css({ top: 0, left: 0, display: 'block' })
        .addClass(placement)
        .data('bs.' + this.type, this)

      this.options.container ? $tip.appendTo(this.options.container) : $tip.insertAfter(this.$element)
      this.$element.trigger('inserted.bs.' + this.type)

      var pos          = this.getPosition()
      var actualWidth  = $tip[0].offsetWidth
      var actualHeight = $tip[0].offsetHeight

      if (autoPlace) {
        var orgPlacement = placement
        var viewportDim = this.getPosition(this.$viewport)

        placement = placement == 'bottom' && pos.bottom + actualHeight > viewportDim.bottom ? 'top'    :
                    placement == 'top'    && pos.top    - actualHeight < viewportDim.top    ? 'bottom' :
                    placement == 'right'  && pos.right  + actualWidth  > viewportDim.width  ? 'left'   :
                    placement == 'left'   && pos.left   - actualWidth  < viewportDim.left   ? 'right'  :
                    placement

        $tip
          .removeClass(orgPlacement)
          .addClass(placement)
      }

      var calculatedOffset = this.getCalculatedOffset(placement, pos, actualWidth, actualHeight)

      this.applyPlacement(calculatedOffset, placement)

      var complete = function () {
        var prevHoverState = that.hoverState
        that.$element.trigger('shown.bs.' + that.type)
        that.hoverState = null

        if (prevHoverState == 'out') that.leave(that)
      }

      $.support.transition && this.$tip.hasClass('fade') ?
        $tip
          .one('bsTransitionEnd', complete)
          .emulateTransitionEnd(Tooltip.TRANSITION_DURATION) :
        complete()
    }
  }

  Tooltip.prototype.applyPlacement = function (offset, placement) {
    var $tip   = this.tip()
    var width  = $tip[0].offsetWidth
    var height = $tip[0].offsetHeight

    // manually read margins because getBoundingClientRect includes difference
    var marginTop = parseInt($tip.css('margin-top'), 10)
    var marginLeft = parseInt($tip.css('margin-left'), 10)

    // we must check for NaN for ie 8/9
    if (isNaN(marginTop))  marginTop  = 0
    if (isNaN(marginLeft)) marginLeft = 0

    offset.top  += marginTop
    offset.left += marginLeft

    // $.fn.offset doesn't round pixel values
    // so we use setOffset directly with our own function B-0
    $.offset.setOffset($tip[0], $.extend({
      using: function (props) {
        $tip.css({
          top: Math.round(props.top),
          left: Math.round(props.left)
        })
      }
    }, offset), 0)

    $tip.addClass('in')

    // check to see if placing tip in new offset caused the tip to resize itself
    var actualWidth  = $tip[0].offsetWidth
    var actualHeight = $tip[0].offsetHeight

    if (placement == 'top' && actualHeight != height) {
      offset.top = offset.top + height - actualHeight
    }

    var delta = this.getViewportAdjustedDelta(placement, offset, actualWidth, actualHeight)

    if (delta.left) offset.left += delta.left
    else offset.top += delta.top

    var isVertical          = /top|bottom/.test(placement)
    var arrowDelta          = isVertical ? delta.left * 2 - width + actualWidth : delta.top * 2 - height + actualHeight
    var arrowOffsetPosition = isVertical ? 'offsetWidth' : 'offsetHeight'

    $tip.offset(offset)
    this.replaceArrow(arrowDelta, $tip[0][arrowOffsetPosition], isVertical)
  }

  Tooltip.prototype.replaceArrow = function (delta, dimension, isVertical) {
    this.arrow()
      .css(isVertical ? 'left' : 'top', 50 * (1 - delta / dimension) + '%')
      .css(isVertical ? 'top' : 'left', '')
  }

  Tooltip.prototype.setContent = function () {
    var $tip  = this.tip()
    var title = this.getTitle()

    $tip.find('.tooltip-inner')[this.options.html ? 'html' : 'text'](title)
    $tip.removeClass('fade in top bottom left right')
  }

  Tooltip.prototype.hide = function (callback) {
    var that = this
    var $tip = $(this.$tip)
    var e    = $.Event('hide.bs.' + this.type)

    function complete() {
      if (that.hoverState != 'in') $tip.detach()
      if (that.$element) { // TODO: Check whether guarding this code with this `if` is really necessary.
        that.$element
          .removeAttr('aria-describedby')
          .trigger('hidden.bs.' + that.type)
      }
      callback && callback()
    }

    this.$element.trigger(e)

    if (e.isDefaultPrevented()) return

    $tip.removeClass('in')

    $.support.transition && $tip.hasClass('fade') ?
      $tip
        .one('bsTransitionEnd', complete)
        .emulateTransitionEnd(Tooltip.TRANSITION_DURATION) :
      complete()

    this.hoverState = null

    return this
  }

  Tooltip.prototype.fixTitle = function () {
    var $e = this.$element
    if ($e.attr('title') || typeof $e.attr('data-original-title') != 'string') {
      $e.attr('data-original-title', $e.attr('title') || '').attr('title', '')
    }
  }

  Tooltip.prototype.hasContent = function () {
    return this.getTitle()
  }

  Tooltip.prototype.getPosition = function ($element) {
    $element   = $element || this.$element

    var el     = $element[0]
    var isBody = el.tagName == 'BODY'

    var elRect    = el.getBoundingClientRect()
    if (elRect.width == null) {
      // width and height are missing in IE8, so compute them manually; see https://github.com/twbs/bootstrap/issues/14093
      elRect = $.extend({}, elRect, { width: elRect.right - elRect.left, height: elRect.bottom - elRect.top })
    }
    var isSvg = window.SVGElement && el instanceof window.SVGElement
    // Avoid using $.offset() on SVGs since it gives incorrect results in jQuery 3.
    // See https://github.com/twbs/bootstrap/issues/20280
    var elOffset  = isBody ? { top: 0, left: 0 } : (isSvg ? null : $element.offset())
    var scroll    = { scroll: isBody ? document.documentElement.scrollTop || document.body.scrollTop : $element.scrollTop() }
    var outerDims = isBody ? { width: $(window).width(), height: $(window).height() } : null

    return $.extend({}, elRect, scroll, outerDims, elOffset)
  }

  Tooltip.prototype.getCalculatedOffset = function (placement, pos, actualWidth, actualHeight) {
    return placement == 'bottom' ? { top: pos.top + pos.height,   left: pos.left + pos.width / 2 - actualWidth / 2 } :
           placement == 'top'    ? { top: pos.top - actualHeight, left: pos.left + pos.width / 2 - actualWidth / 2 } :
           placement == 'left'   ? { top: pos.top + pos.height / 2 - actualHeight / 2, left: pos.left - actualWidth } :
        /* placement == 'right' */ { top: pos.top + pos.height / 2 - actualHeight / 2, left: pos.left + pos.width }

  }

  Tooltip.prototype.getViewportAdjustedDelta = function (placement, pos, actualWidth, actualHeight) {
    var delta = { top: 0, left: 0 }
    if (!this.$viewport) return delta

    var viewportPadding = this.options.viewport && this.options.viewport.padding || 0
    var viewportDimensions = this.getPosition(this.$viewport)

    if (/right|left/.test(placement)) {
      var topEdgeOffset    = pos.top - viewportPadding - viewportDimensions.scroll
      var bottomEdgeOffset = pos.top + viewportPadding - viewportDimensions.scroll + actualHeight
      if (topEdgeOffset < viewportDimensions.top) { // top overflow
        delta.top = viewportDimensions.top - topEdgeOffset
      } else if (bottomEdgeOffset > viewportDimensions.top + viewportDimensions.height) { // bottom overflow
        delta.top = viewportDimensions.top + viewportDimensions.height - bottomEdgeOffset
      }
    } else {
      var leftEdgeOffset  = pos.left - viewportPadding
      var rightEdgeOffset = pos.left + viewportPadding + actualWidth
      if (leftEdgeOffset < viewportDimensions.left) { // left overflow
        delta.left = viewportDimensions.left - leftEdgeOffset
      } else if (rightEdgeOffset > viewportDimensions.right) { // right overflow
        delta.left = viewportDimensions.left + viewportDimensions.width - rightEdgeOffset
      }
    }

    return delta
  }

  Tooltip.prototype.getTitle = function () {
    var title
    var $e = this.$element
    var o  = this.options

    title = $e.attr('data-original-title')
      || (typeof o.title == 'function' ? o.title.call($e[0]) :  o.title)

    return title
  }

  Tooltip.prototype.getUID = function (prefix) {
    do prefix += ~~(Math.random() * 1000000)
    while (document.getElementById(prefix))
    return prefix
  }

  Tooltip.prototype.tip = function () {
    if (!this.$tip) {
      this.$tip = $(this.options.template)
      if (this.$tip.length != 1) {
        throw new Error(this.type + ' `template` option must consist of exactly 1 top-level element!')
      }
    }
    return this.$tip
  }

  Tooltip.prototype.arrow = function () {
    return (this.$arrow = this.$arrow || this.tip().find('.tooltip-arrow'))
  }

  Tooltip.prototype.enable = function () {
    this.enabled = true
  }

  Tooltip.prototype.disable = function () {
    this.enabled = false
  }

  Tooltip.prototype.toggleEnabled = function () {
    this.enabled = !this.enabled
  }

  Tooltip.prototype.toggle = function (e) {
    var self = this
    if (e) {
      self = $(e.currentTarget).data('bs.' + this.type)
      if (!self) {
        self = new this.constructor(e.currentTarget, this.getDelegateOptions())
        $(e.currentTarget).data('bs.' + this.type, self)
      }
    }

    if (e) {
      self.inState.click = !self.inState.click
      if (self.isInStateTrue()) self.enter(self)
      else self.leave(self)
    } else {
      self.tip().hasClass('in') ? self.leave(self) : self.enter(self)
    }
  }

  Tooltip.prototype.destroy = function () {
    var that = this
    clearTimeout(this.timeout)
    this.hide(function () {
      that.$element.off('.' + that.type).removeData('bs.' + that.type)
      if (that.$tip) {
        that.$tip.detach()
      }
      that.$tip = null
      that.$arrow = null
      that.$viewport = null
      that.$element = null
    })
  }


  // TOOLTIP PLUGIN DEFINITION
  // =========================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.tooltip')
      var options = typeof option == 'object' && option

      if (!data && /destroy|hide/.test(option)) return
      if (!data) $this.data('bs.tooltip', (data = new Tooltip(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  var old = $.fn.tooltip

  $.fn.tooltip             = Plugin
  $.fn.tooltip.Constructor = Tooltip


  // TOOLTIP NO CONFLICT
  // ===================

  $.fn.tooltip.noConflict = function () {
    $.fn.tooltip = old
    return this
  }

}(jQuery);

/* ========================================================================
 * Bootstrap: popover.js v3.3.7
 * http://getbootstrap.com/javascript/#popovers
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // POPOVER PUBLIC CLASS DEFINITION
  // ===============================

  var Popover = function (element, options) {
    this.init('popover', element, options)
  }

  if (!$.fn.tooltip) throw new Error('Popover requires tooltip.js')

  Popover.VERSION  = '3.3.7'

  Popover.DEFAULTS = $.extend({}, $.fn.tooltip.Constructor.DEFAULTS, {
    placement: 'right',
    trigger: 'click',
    content: '',
    template: '<div class="popover" role="tooltip"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>'
  })


  // NOTE: POPOVER EXTENDS tooltip.js
  // ================================

  Popover.prototype = $.extend({}, $.fn.tooltip.Constructor.prototype)

  Popover.prototype.constructor = Popover

  Popover.prototype.getDefaults = function () {
    return Popover.DEFAULTS
  }

  Popover.prototype.setContent = function () {
    var $tip    = this.tip()
    var title   = this.getTitle()
    var content = this.getContent()

    $tip.find('.popover-title')[this.options.html ? 'html' : 'text'](title)
    $tip.find('.popover-content').children().detach().end()[ // we use append for html objects to maintain js events
      this.options.html ? (typeof content == 'string' ? 'html' : 'append') : 'text'
    ](content)

    $tip.removeClass('fade top bottom left right in')

    // IE8 doesn't accept hiding via the `:empty` pseudo selector, we have to do
    // this manually by checking the contents.
    if (!$tip.find('.popover-title').html()) $tip.find('.popover-title').hide()
  }

  Popover.prototype.hasContent = function () {
    return this.getTitle() || this.getContent()
  }

  Popover.prototype.getContent = function () {
    var $e = this.$element
    var o  = this.options

    return $e.attr('data-content')
      || (typeof o.content == 'function' ?
            o.content.call($e[0]) :
            o.content)
  }

  Popover.prototype.arrow = function () {
    return (this.$arrow = this.$arrow || this.tip().find('.arrow'))
  }


  // POPOVER PLUGIN DEFINITION
  // =========================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.popover')
      var options = typeof option == 'object' && option

      if (!data && /destroy|hide/.test(option)) return
      if (!data) $this.data('bs.popover', (data = new Popover(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  var old = $.fn.popover

  $.fn.popover             = Plugin
  $.fn.popover.Constructor = Popover


  // POPOVER NO CONFLICT
  // ===================

  $.fn.popover.noConflict = function () {
    $.fn.popover = old
    return this
  }

}(jQuery);

/* ========================================================================
 * Bootstrap: scrollspy.js v3.3.7
 * http://getbootstrap.com/javascript/#scrollspy
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // SCROLLSPY CLASS DEFINITION
  // ==========================

  function ScrollSpy(element, options) {
    this.$body          = $(document.body)
    this.$scrollElement = $(element).is(document.body) ? $(window) : $(element)
    this.options        = $.extend({}, ScrollSpy.DEFAULTS, options)
    this.selector       = (this.options.target || '') + ' .nav li > a'
    this.offsets        = []
    this.targets        = []
    this.activeTarget   = null
    this.scrollHeight   = 0

    this.$scrollElement.on('scroll.bs.scrollspy', $.proxy(this.process, this))
    this.refresh()
    this.process()
  }

  ScrollSpy.VERSION  = '3.3.7'

  ScrollSpy.DEFAULTS = {
    offset: 10
  }

  ScrollSpy.prototype.getScrollHeight = function () {
    return this.$scrollElement[0].scrollHeight || Math.max(this.$body[0].scrollHeight, document.documentElement.scrollHeight)
  }

  ScrollSpy.prototype.refresh = function () {
    var that          = this
    var offsetMethod  = 'offset'
    var offsetBase    = 0

    this.offsets      = []
    this.targets      = []
    this.scrollHeight = this.getScrollHeight()

    if (!$.isWindow(this.$scrollElement[0])) {
      offsetMethod = 'position'
      offsetBase   = this.$scrollElement.scrollTop()
    }

    this.$body
      .find(this.selector)
      .map(function () {
        var $el   = $(this)
        var href  = $el.data('target') || $el.attr('href')
        var $href = /^#./.test(href) && $(href)

        return ($href
          && $href.length
          && $href.is(':visible')
          && [[$href[offsetMethod]().top + offsetBase, href]]) || null
      })
      .sort(function (a, b) { return a[0] - b[0] })
      .each(function () {
        that.offsets.push(this[0])
        that.targets.push(this[1])
      })
  }

  ScrollSpy.prototype.process = function () {
    var scrollTop    = this.$scrollElement.scrollTop() + this.options.offset
    var scrollHeight = this.getScrollHeight()
    var maxScroll    = this.options.offset + scrollHeight - this.$scrollElement.height()
    var offsets      = this.offsets
    var targets      = this.targets
    var activeTarget = this.activeTarget
    var i

    if (this.scrollHeight != scrollHeight) {
      this.refresh()
    }

    if (scrollTop >= maxScroll) {
      return activeTarget != (i = targets[targets.length - 1]) && this.activate(i)
    }

    if (activeTarget && scrollTop < offsets[0]) {
      this.activeTarget = null
      return this.clear()
    }

    for (i = offsets.length; i--;) {
      activeTarget != targets[i]
        && scrollTop >= offsets[i]
        && (offsets[i + 1] === undefined || scrollTop < offsets[i + 1])
        && this.activate(targets[i])
    }
  }

  ScrollSpy.prototype.activate = function (target) {
    this.activeTarget = target

    this.clear()

    var selector = this.selector +
      '[data-target="' + target + '"],' +
      this.selector + '[href="' + target + '"]'

    var active = $(selector)
      .parents('li')
      .addClass('active')

    if (active.parent('.dropdown-menu').length) {
      active = active
        .closest('li.dropdown')
        .addClass('active')
    }

    active.trigger('activate.bs.scrollspy')
  }

  ScrollSpy.prototype.clear = function () {
    $(this.selector)
      .parentsUntil(this.options.target, '.active')
      .removeClass('active')
  }


  // SCROLLSPY PLUGIN DEFINITION
  // ===========================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.scrollspy')
      var options = typeof option == 'object' && option

      if (!data) $this.data('bs.scrollspy', (data = new ScrollSpy(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  var old = $.fn.scrollspy

  $.fn.scrollspy             = Plugin
  $.fn.scrollspy.Constructor = ScrollSpy


  // SCROLLSPY NO CONFLICT
  // =====================

  $.fn.scrollspy.noConflict = function () {
    $.fn.scrollspy = old
    return this
  }


  // SCROLLSPY DATA-API
  // ==================

  $(window).on('load.bs.scrollspy.data-api', function () {
    $('[data-spy="scroll"]').each(function () {
      var $spy = $(this)
      Plugin.call($spy, $spy.data())
    })
  })

}(jQuery);

/* ========================================================================
 * Bootstrap: tab.js v3.3.7
 * http://getbootstrap.com/javascript/#tabs
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // TAB CLASS DEFINITION
  // ====================

  var Tab = function (element) {
    // jscs:disable requireDollarBeforejQueryAssignment
    this.element = $(element)
    // jscs:enable requireDollarBeforejQueryAssignment
  }

  Tab.VERSION = '3.3.7'

  Tab.TRANSITION_DURATION = 150

  Tab.prototype.show = function () {
    var $this    = this.element
    var $ul      = $this.closest('ul:not(.dropdown-menu)')
    var selector = $this.data('target')

    if (!selector) {
      selector = $this.attr('href')
      selector = selector && selector.replace(/.*(?=#[^\s]*$)/, '') // strip for ie7
    }

    if ($this.parent('li').hasClass('active')) return

    var $previous = $ul.find('.active:last a')
    var hideEvent = $.Event('hide.bs.tab', {
      relatedTarget: $this[0]
    })
    var showEvent = $.Event('show.bs.tab', {
      relatedTarget: $previous[0]
    })

    $previous.trigger(hideEvent)
    $this.trigger(showEvent)

    if (showEvent.isDefaultPrevented() || hideEvent.isDefaultPrevented()) return

    var $target = $(selector)

    this.activate($this.closest('li'), $ul)
    this.activate($target, $target.parent(), function () {
      $previous.trigger({
        type: 'hidden.bs.tab',
        relatedTarget: $this[0]
      })
      $this.trigger({
        type: 'shown.bs.tab',
        relatedTarget: $previous[0]
      })
    })
  }

  Tab.prototype.activate = function (element, container, callback) {
    var $active    = container.find('> .active')
    var transition = callback
      && $.support.transition
      && ($active.length && $active.hasClass('fade') || !!container.find('> .fade').length)

    function next() {
      $active
        .removeClass('active')
        .find('> .dropdown-menu > .active')
          .removeClass('active')
        .end()
        .find('[data-toggle="tab"]')
          .attr('aria-expanded', false)

      element
        .addClass('active')
        .find('[data-toggle="tab"]')
          .attr('aria-expanded', true)

      if (transition) {
        element[0].offsetWidth // reflow for transition
        element.addClass('in')
      } else {
        element.removeClass('fade')
      }

      if (element.parent('.dropdown-menu').length) {
        element
          .closest('li.dropdown')
            .addClass('active')
          .end()
          .find('[data-toggle="tab"]')
            .attr('aria-expanded', true)
      }

      callback && callback()
    }

    $active.length && transition ?
      $active
        .one('bsTransitionEnd', next)
        .emulateTransitionEnd(Tab.TRANSITION_DURATION) :
      next()

    $active.removeClass('in')
  }


  // TAB PLUGIN DEFINITION
  // =====================

  function Plugin(option) {
    return this.each(function () {
      var $this = $(this)
      var data  = $this.data('bs.tab')

      if (!data) $this.data('bs.tab', (data = new Tab(this)))
      if (typeof option == 'string') data[option]()
    })
  }

  var old = $.fn.tab

  $.fn.tab             = Plugin
  $.fn.tab.Constructor = Tab


  // TAB NO CONFLICT
  // ===============

  $.fn.tab.noConflict = function () {
    $.fn.tab = old
    return this
  }


  // TAB DATA-API
  // ============

  var clickHandler = function (e) {
    e.preventDefault()
    Plugin.call($(this), 'show')
  }

  $(document)
    .on('click.bs.tab.data-api', '[data-toggle="tab"]', clickHandler)
    .on('click.bs.tab.data-api', '[data-toggle="pill"]', clickHandler)

}(jQuery);

/* ========================================================================
 * Bootstrap: affix.js v3.3.7
 * http://getbootstrap.com/javascript/#affix
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // AFFIX CLASS DEFINITION
  // ======================

  var Affix = function (element, options) {
    this.options = $.extend({}, Affix.DEFAULTS, options)

    this.$target = $(this.options.target)
      .on('scroll.bs.affix.data-api', $.proxy(this.checkPosition, this))
      .on('click.bs.affix.data-api',  $.proxy(this.checkPositionWithEventLoop, this))

    this.$element     = $(element)
    this.affixed      = null
    this.unpin        = null
    this.pinnedOffset = null

    this.checkPosition()
  }

  Affix.VERSION  = '3.3.7'

  Affix.RESET    = 'affix affix-top affix-bottom'

  Affix.DEFAULTS = {
    offset: 0,
    target: window
  }

  Affix.prototype.getState = function (scrollHeight, height, offsetTop, offsetBottom) {
    var scrollTop    = this.$target.scrollTop()
    var position     = this.$element.offset()
    var targetHeight = this.$target.height()

    if (offsetTop != null && this.affixed == 'top') return scrollTop < offsetTop ? 'top' : false

    if (this.affixed == 'bottom') {
      if (offsetTop != null) return (scrollTop + this.unpin <= position.top) ? false : 'bottom'
      return (scrollTop + targetHeight <= scrollHeight - offsetBottom) ? false : 'bottom'
    }

    var initializing   = this.affixed == null
    var colliderTop    = initializing ? scrollTop : position.top
    var colliderHeight = initializing ? targetHeight : height

    if (offsetTop != null && scrollTop <= offsetTop) return 'top'
    if (offsetBottom != null && (colliderTop + colliderHeight >= scrollHeight - offsetBottom)) return 'bottom'

    return false
  }

  Affix.prototype.getPinnedOffset = function () {
    if (this.pinnedOffset) return this.pinnedOffset
    this.$element.removeClass(Affix.RESET).addClass('affix')
    var scrollTop = this.$target.scrollTop()
    var position  = this.$element.offset()
    return (this.pinnedOffset = position.top - scrollTop)
  }

  Affix.prototype.checkPositionWithEventLoop = function () {
    setTimeout($.proxy(this.checkPosition, this), 1)
  }

  Affix.prototype.checkPosition = function () {
    if (!this.$element.is(':visible')) return

    var height       = this.$element.height()
    var offset       = this.options.offset
    var offsetTop    = offset.top
    var offsetBottom = offset.bottom
    var scrollHeight = Math.max($(document).height(), $(document.body).height())

    if (typeof offset != 'object')         offsetBottom = offsetTop = offset
    if (typeof offsetTop == 'function')    offsetTop    = offset.top(this.$element)
    if (typeof offsetBottom == 'function') offsetBottom = offset.bottom(this.$element)

    var affix = this.getState(scrollHeight, height, offsetTop, offsetBottom)

    if (this.affixed != affix) {
      if (this.unpin != null) this.$element.css('top', '')

      var affixType = 'affix' + (affix ? '-' + affix : '')
      var e         = $.Event(affixType + '.bs.affix')

      this.$element.trigger(e)

      if (e.isDefaultPrevented()) return

      this.affixed = affix
      this.unpin = affix == 'bottom' ? this.getPinnedOffset() : null

      this.$element
        .removeClass(Affix.RESET)
        .addClass(affixType)
        .trigger(affixType.replace('affix', 'affixed') + '.bs.affix')
    }

    if (affix == 'bottom') {
      this.$element.offset({
        top: scrollHeight - height - offsetBottom
      })
    }
  }


  // AFFIX PLUGIN DEFINITION
  // =======================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.affix')
      var options = typeof option == 'object' && option

      if (!data) $this.data('bs.affix', (data = new Affix(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  var old = $.fn.affix

  $.fn.affix             = Plugin
  $.fn.affix.Constructor = Affix


  // AFFIX NO CONFLICT
  // =================

  $.fn.affix.noConflict = function () {
    $.fn.affix = old
    return this
  }


  // AFFIX DATA-API
  // ==============

  $(window).on('load', function () {
    $('[data-spy="affix"]').each(function () {
      var $spy = $(this)
      var data = $spy.data()

      data.offset = data.offset || {}

      if (data.offsetBottom != null) data.offset.bottom = data.offsetBottom
      if (data.offsetTop    != null) data.offset.top    = data.offsetTop

      Plugin.call($spy, data)
    })
  })

}(jQuery);
!function(t){function e(){}function A(t,e){return function(){t.apply(e,arguments)}}function n(t){if("object"!=typeof this)throw new TypeError("Promises must be constructed via new");if("function"!=typeof t)throw new TypeError("not a function");this._state=0,this._handled=!1,this._value=void 0,this._deferreds=[],l(t,this)}function o(t,e){for(;3===t._state;)t=t._value;return 0===t._state?void t._deferreds.push(e):(t._handled=!0,void n._immediateFn(function(){var A=1===t._state?e.onFulfilled:e.onRejected;if(null===A)return void(1===t._state?i:s)(e.promise,t._value);var n;try{n=A(t._value)}catch(t){return void s(e.promise,t)}i(e.promise,n)}))}function i(t,e){try{if(e===t)throw new TypeError("A promise cannot be resolved with itself.");if(e&&("object"==typeof e||"function"==typeof e)){var o=e.then;if(e instanceof n)return t._state=3,t._value=e,void r(t);if("function"==typeof o)return void l(A(o,e),t)}t._state=1,t._value=e,r(t)}catch(e){s(t,e)}}function s(t,e){t._state=2,t._value=e,r(t)}function r(t){2===t._state&&0===t._deferreds.length&&n._immediateFn(function(){t._handled||n._unhandledRejectionFn(t._value)});for(var e=0,A=t._deferreds.length;e<A;e++)o(t,t._deferreds[e]);t._deferreds=null}function a(t,e,A){this.onFulfilled="function"==typeof t?t:null,this.onRejected="function"==typeof e?e:null,this.promise=A}function l(t,e){var A=!1;try{t(function(t){A||(A=!0,i(e,t))},function(t){A||(A=!0,s(e,t))})}catch(t){if(A)return;A=!0,s(e,t)}}var g=setTimeout;n.prototype.catch=function(t){return this.then(null,t)},n.prototype.then=function(t,A){var n=new this.constructor(e);return o(this,new a(t,A,n)),n},n.all=function(t){var e=Array.prototype.slice.call(t);return new n(function(t,A){function n(i,s){try{if(s&&("object"==typeof s||"function"==typeof s)){var r=s.then;if("function"==typeof r)return void r.call(s,function(t){n(i,t)},A)}e[i]=s,0===--o&&t(e)}catch(t){A(t)}}if(0===e.length)return t([]);for(var o=e.length,i=0;i<e.length;i++)n(i,e[i])})},n.resolve=function(t){return t&&"object"==typeof t&&t.constructor===n?t:new n(function(e){e(t)})},n.reject=function(t){return new n(function(e,A){A(t)})},n.race=function(t){return new n(function(e,A){for(var n=0,o=t.length;n<o;n++)t[n].then(e,A)})},n._immediateFn="function"==typeof setImmediate&&function(t){setImmediate(t)}||function(t){g(t,0)},n._unhandledRejectionFn=function(t){"undefined"!=typeof console&&console&&console.warn("Possible Unhandled Promise Rejection:",t)},n._setImmediateFn=function(t){n._immediateFn=t},n._setUnhandledRejectionFn=function(t){n._unhandledRejectionFn=t},"undefined"!=typeof module&&module.exports?module.exports=n:t.Promise||(t.Promise=n)}(this);try{var ce=new window.CustomEvent("test");if(ce.preventDefault(),ce.defaultPrevented!==!0)throw new Error("Could not prevent default")}catch(t){var CustomEvent=function(t,e){var A,n;return e=e||{bubbles:!1,cancelable:!1,detail:void 0},A=document.createEvent("CustomEvent"),A.initCustomEvent(t,e.bubbles,e.cancelable,e.detail),n=A.preventDefault,A.preventDefault=function(){n.call(this);try{Object.defineProperty(this,"defaultPrevented",{get:function(){return!0}})}catch(t){this.defaultPrevented=!0}},A};CustomEvent.prototype=window.Event.prototype,window.CustomEvent=CustomEvent}var cf;!function(t){var e=function(){function e(e){var A=this;if(this.isDevelopment=!1,window.ConversationalForm||(window.ConversationalForm=this),!e.formEl)throw new Error("Conversational Form error, the formEl needs to be defined.");this.formEl=e.formEl,this.submitCallback=e.submitCallback,""==this.formEl.getAttribute("cf-prevent-autofocus")&&(t.UserInput.preventAutoFocus=!0),console.log(t.UserInput.preventAutoFocus,this.formEl,this.formEl.getAttribute("cf-prevent-autofocus")),this.dictionary=new t.Dictionary({data:e.dictionaryData,aiQuestions:e.dictionaryAI,userImage:e.userImage}),t.Helpers.setEmojiLib(),this.defaultContext=!e.context,this.context=e.context?e.context:this.formEl.parentNode,this.tags=e.tags,setTimeout(function(){return A.init()},0)}return e.prototype.init=function(){var e=document.getElementById("conversational-form-development");if(e)this.isDevelopment=!0;else{var A=document.head||document.getElementsByTagName("head")[0],n=document.createElement("link"),o="https://cdn.rawgit.com/space10-community/conversational-form/master/dist/conversational-form.min.css";n.type="text/css",n.media="all",n.setAttribute("rel","stylesheet"),n.setAttribute("href",o),A.appendChild(n)}if("fixed"!=this.context.style.position&&"absolute"!=this.context.style.position&&"relative"!=this.context.style.position&&(this.context.style.position="relative"),!this.tags||0==this.tags.length){this.tags=[];for(var i=[].slice.call(this.formEl.querySelectorAll("input, select, button"),0),s=0;s<i.length;s++){var r=i[s];t.Tag.isTagValid(r)&&this.tags.push(t.Tag.createTag(r))}}for(var a=[],s=0;s<this.tags.length;s++){var r=this.tags[s];r&&t.Tag.isTagValid(r.domElement)||a.push(r)}for(var s=0;s<a.length;s++){var l=a[s];this.tags.splice(this.tags.indexOf(l),1)}return this.setupTagGroups(),this.setupUI(),this},e.prototype.setupTagGroups=function(){for(var e=[],A=0;A<this.tags.length;A++){var n=this.tags[A];"radio"!=n.type&&"checkbox"!=n.type||(e[n.name]||(e[n.name]=[]),e[n.name].push(n))}if(Object.keys(e).length>0)for(var o in e)if(e[o].length>0)for(var i=new t.TagGroup({elements:e[o]}),A=0;A<e[o].length;A++){var s=e[o][A];0==A?this.tags.splice(this.tags.indexOf(s),1,i):this.tags.splice(this.tags.indexOf(s),1)}},e.prototype.setupUI=function(){var e=this;console.log("Conversational Form > start > mapped DOM tags:",this.tags),console.log("----------------------------------------------"),this.flowManager=new t.FlowManager({cuiReference:this,tags:this.tags}),this.el=document.createElement("div"),this.el.id="conversational-form",this.el.className="conversational-form",this.defaultContext?(this.context=this.formEl.parentNode,this.formEl.parentNode.insertBefore(this.el,this.formEl.nextSibling)):this.context.appendChild(this.el),this.chatList=new t.ChatList({}),this.el.appendChild(this.chatList.el),this.userInput=new t.UserInput({}),this.el.appendChild(this.userInput.el),setTimeout(function(){e.el.classList.add("conversational-form--show"),e.flowManager.start()},0)},e.prototype.doSubmitForm=function(){this.submitCallback?this.submitCallback():(this.formEl.submit(),this.remove())},e.prototype.remove=function(){this.userInput.dealloc(),this.chatList.dealloc(),this.userInput=null,this.chatList=null,console.log(this,"remove() Conversational Form")},e.illustrateFlow=function(t,A,n,o){if(void 0===o&&(o=null),e.ILLUSTRATE_APP_FLOW&&"Netscape"!=navigator.appName){var i="font-weight: 900; background: pink; color: black; padding: 0px 5px;";console.log("%c** event flow: %c"+n+"%c flow type: %c"+A+"%c from: %c"+t.constructor.name,"font-weight: 900;",i,"font-weight: 400;",i,"font-weight: 400;",i),o&&console.log("** event flow detail:",o)}},e.ILLUSTRATE_APP_FLOW=!0,e}();t.ConversationalForm=e}(cf||(cf={})),window.addEventListener("load",function(){var t=document.querySelector("form[cf-form-element]"),e=document.querySelector("*[cf-context]");t&&(window.ConversationalForm=new cf.ConversationalForm({formEl:t,context:e}))},!1),function(t){if("function"==typeof define&&define.amd)define(["jquery"],t);else try{t(jQuery)}catch(t){}}(function(t){t.fn.conversationalForm=function(){return new cf.ConversationalForm({formEl:this[0]})}});var cf;!function(t){var e=function(){function t(){}return t.lerp=function(t,e,A){return(A-e)*t+e},t.norm=function(t,e,A){return(t-e)/(A-e)},t.getXYFromMouseTouchEvent=function(t){var e=null;return t.originalEvent?e=t.originalEvent.touches||t.originalEvent.changedTouches:t.changedTouches&&(e=t.changedTouches),e?{x:e[0].pageX,y:e[0].pageY,touches:e[0]}:{x:t.pageX,y:t.pageY,touches:null}},t.getInnerTextOfElement=function(t){var e=document.createElement("DIV");return e.innerHTML=t.innerHTML,e.textContent||e.innerText||""},t.getMouseEvent=function(t){var e=[];return e.mousedown="ontouchstart"in window?"touchstart":"mousedown",e.mouseup="ontouchstart"in window?"touchend":"mouseup",e.mousemove="ontouchstart"in window?"touchmove":"mousemove",e[t]},t.setEmojiLib=function(e,A){void 0===e&&(e="emojify"),void 0===A&&(A="//cdnjs.cloudflare.com/ajax/libs/emojify.js/1.1.0/js/emojify.min.js");var n=document.head||document.getElementsByTagName("head")[0],o=document.createElement("script");o.type="text/javascript",o.onload=function(){t.emojilib=window[e],t.emojilib&&t.emojilib.setConfig({img_dir:"https://cdnjs.cloudflare.com/ajax/libs/emojify.js/1.1.0/images/basic/"})},o.setAttribute("src",A),n.appendChild(o)},t.emojify=function(e){return t.emojilib&&(e=t.emojilib.replace(e)),e},t.setTransform=function(t,e){t.style["-webkit-transform"]=e,t.style["-moz-transform"]=e,t.style["-ms-transform"]=e,t.style.transform=e},t.caniuse={fileReader:function(){return!!(window.File&&window.FileReader&&window.FileList&&window.Blob)}},t.emojilib=null,t}();t.Helpers=e}(cf||(cf={}));var cf;!function(t){var e=function(){function t(t){this.setData(t),this.createElement()}return t.prototype.setData=function(t){},t.prototype.createElement=function(){var t=document.createElement("template");return t.innerHTML=this.getTemplate(),this.el=t.firstChild||t.content.firstChild,this.el},t.prototype.getTemplate=function(){return"should be overwritten..."},t.prototype.dealloc=function(){this.el.parentNode.removeChild(this.el)},t}();t.BasicElement=e}(cf||(cf={}));var __extends=this&&this.__extends||function(t,e){function A(){this.constructor=t}for(var n in e)e.hasOwnProperty(n)&&(t[n]=e[n]);t.prototype=null===e?Object.create(e):(A.prototype=e.prototype,new A)},cf;!function(t){t.ControlElementEvents={SUBMIT_VALUE:"cf-basic-element-submit",PROGRESS_CHANGE:"cf-basic-element-progress",ON_FOCUS:"cf-basic-element-on-focus"},t.ControlElementProgressStates={BUSY:"cf-control-element-progress-BUSY",READY:"cf-control-element-progress-READY"};var e=function(e){function A(t){e.call(this,t),this.animateInTimer=0,this._focus=!1,this.onFocusCallback=this.onFocus.bind(this),this.el.addEventListener("focus",this.onFocusCallback,!1),this.onBlurCallback=this.onBlur.bind(this),this.el.addEventListener("blur",this.onBlurCallback,!1)}return __extends(A,e),Object.defineProperty(A.prototype,"type",{get:function(){return"ControlElement"},enumerable:!0,configurable:!0}),Object.defineProperty(A.prototype,"value",{get:function(){return t.Helpers.getInnerTextOfElement(this.el)},enumerable:!0,configurable:!0}),Object.defineProperty(A.prototype,"positionVector",{get:function(){return this._positionVector},enumerable:!0,configurable:!0}),Object.defineProperty(A.prototype,"tabIndex",{set:function(t){this.el.tabIndex=t},enumerable:!0,configurable:!0}),Object.defineProperty(A.prototype,"focus",{get:function(){return this._focus},enumerable:!0,configurable:!0}),Object.defineProperty(A.prototype,"visible",{get:function(){return!this.el.classList.contains("hide")},set:function(t){t?this.el.classList.remove("hide"):(this.el.classList.add("hide"),this.tabIndex=-1)},enumerable:!0,configurable:!0}),A.prototype.onBlur=function(t){this._focus=!1},A.prototype.onFocus=function(e){this._focus=!0,t.ConversationalForm.illustrateFlow(this,"dispatch",t.ControlElementEvents.ON_FOCUS,this.referenceTag),document.dispatchEvent(new CustomEvent(t.ControlElementEvents.ON_FOCUS,{detail:this.positionVector}))},A.prototype.calcPosition=function(){var t=parseInt(window.getComputedStyle(this.el).getPropertyValue("margin-right"),10);this._positionVector={height:this.el.offsetHeight,width:this.el.offsetWidth+t,x:this.el.offsetLeft,y:this.el.offsetTop},this._positionVector.centerX=this._positionVector.x+.5*this._positionVector.width,this._positionVector.centerY=this._positionVector.y+.5*this._positionVector.height},A.prototype.setData=function(t){this.referenceTag=t.referenceTag,e.prototype.setData.call(this,t)},A.prototype.animateIn=function(){var t=this;clearTimeout(this.animateInTimer),this.el.classList.contains("animate-in")?(this.el.classList.remove("animate-in"),this.animateInTimer=setTimeout(function(){return t.el.classList.add("animate-in")},0)):this.el.classList.add("animate-in")},A.prototype.animateOut=function(){this.el.classList.add("animate-out")},A.prototype.onChoose=function(){t.ConversationalForm.illustrateFlow(this,"dispatch",t.ControlElementEvents.SUBMIT_VALUE,this.referenceTag),document.dispatchEvent(new CustomEvent(t.ControlElementEvents.SUBMIT_VALUE,{detail:this}))},A.prototype.dealloc=function(){this.el.removeEventListener("blur",this.onBlurCallback,!1),this.onBlurCallback=null,this.el.removeEventListener("focus",this.onFocusCallback,!1),this.onFocusCallback=null,e.prototype.dealloc.call(this)},A}(t.BasicElement);t.ControlElement=e}(cf||(cf={}));var cf;!function(t){var e=function(){function e(e){this.ignoreKeyboardInput=!1,this.rowIndex=-1,this.columnIndex=0,this.elementWidth=0,this.filterListNumberOfVisible=0,this.listWidth=0,this.el=e.el,this.list=this.el.getElementsByTagName("cf-list")[0],this.infoElement=this.el.getElementsByTagName("cf-info")[0],this.onScrollCallback=this.onScroll.bind(this),this.el.addEventListener("scroll",this.onScrollCallback,!1),this.onElementFocusCallback=this.onElementFocus.bind(this),document.addEventListener(t.ControlElementEvents.ON_FOCUS,this.onElementFocusCallback,!1),this.onChatAIReponseCallback=this.onChatAIReponse.bind(this),document.addEventListener(t.ChatResponseEvents.AI_QUESTION_ASKED,this.onChatAIReponseCallback,!1),this.onUserInputKeyChangeCallback=this.onUserInputKeyChange.bind(this),document.addEventListener(t.UserInputEvents.KEY_CHANGE,this.onUserInputKeyChangeCallback,!1),this.userInputUpdateCallback=this.onUserInputUpdate.bind(this),document.addEventListener(t.FlowEvents.USER_INPUT_UPDATE,this.userInputUpdateCallback,!1),this.listScrollController=new t.ScrollController({interactionListener:this.el,listToScroll:this.list,listNavButtons:this.el.getElementsByTagName("cf-list-button")})}return Object.defineProperty(e.prototype,"active",{get:function(){return this.elements&&this.elements.length>0},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"focus",{get:function(){for(var t=this.getElements(),e=0;e<t.length;e++){var A=t[e];if(A.focus)return!0}return!1},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"length",{get:function(){var t=this.getElements();return t.length},enumerable:!0,configurable:!0}),e.prototype.onScroll=function(t){this.el.scrollLeft=0},e.prototype.onElementFocus=function(t){var e=t.detail,A=e.x+e.width<this.elementWidth?0:e.x-e.width;A*=-1,this.listScrollController.setScroll(A,0)},e.prototype.onChatAIReponse=function(t){this.animateElementsIn()},e.prototype.onUserInputKeyChange=function(e){if(this.ignoreKeyboardInput)return void(this.ignoreKeyboardInput=!1);var A=e.detail,n=A.dto.input;if(this.active){var o=A.inputFieldActive;if(o){var i=e.detail.dto,s=i.input.getInputValue();this.filterElementsFrom(s)}else A.keyCode==t.Dictionary.keyCodes.left?this.columnIndex--:A.keyCode==t.Dictionary.keyCodes.right?this.columnIndex++:A.keyCode==t.Dictionary.keyCodes.down?this.updateRowIndex(1):A.keyCode==t.Dictionary.keyCodes.up?this.updateRowIndex(-1):A.keyCode!=t.Dictionary.keyCodes.enter&&A.keyCode!=t.Dictionary.keyCodes.space||(this.tableableRows[this.rowIndex]&&this.tableableRows[this.rowIndex][this.columnIndex]?this.tableableRows[this.rowIndex][this.columnIndex].el.click():this.tableableRows[0]&&1==this.tableableRows[0].length&&this.tableableRows[0][0].el.click()),this.validateRowColIndexes()||n.setFocusOnInput()}n.active||!this.tableableRows||0!=this.rowIndex&&1!=this.rowIndex||this.tableableRows[this.rowIndex][this.columnIndex].el.focus()},e.prototype.validateRowColIndexes=function(){this.el.classList.contains("two-row")?1:0;return this.tableableRows[this.rowIndex]?(this.columnIndex<0&&(this.columnIndex=this.tableableRows[this.rowIndex].length-1),this.columnIndex>this.tableableRows[this.rowIndex].length-1&&(this.columnIndex=0),!0):(this.resetTabList(),!1)},e.prototype.updateRowIndex=function(t){var e=this.rowIndex;if(this.rowIndex+=t,this.tableableRows[this.rowIndex])for(var A=this.tableableRows[e][this.columnIndex].positionVector,n=this.tableableRows[this.rowIndex],o=1e13,i=0;i<n.length;i++){var s=n[i];o>Math.abs(A.centerX-s.positionVector.centerX)&&(o=Math.abs(A.centerX-s.positionVector.centerX),this.columnIndex=i)}},e.prototype.resetTabList=function(){this.rowIndex=-1,this.columnIndex=-1},e.prototype.onUserInputUpdate=function(t){if(this.el.classList.remove("animate-in"),this.infoElement.classList.remove("show"),this.elements)for(var e=this.getElements(),A=0;A<e.length;A++){var n=e[A];n.animateOut()}},e.prototype.filterElementsFrom=function(e){var A=e.toLowerCase().split(" ");A.indexOf("")!=-1&&A.splice(A.indexOf(""),1);var n=this.getElements();if(n.length>1){for(var o=[],i=0;i<n.length;i++){for(var s=n[i],r=!0,a=0;a<A.length;a++){var l=A[a];r&&(r=s.value.toLowerCase().indexOf(l)!=-1)}s.visible=r,r&&s.visible&&o.push(s)}this.infoElement.innerHTML=0==o.length?t.Dictionary.get("input-no-filter").split("{input-value}").join(e):"",0==o.length?this.infoElement.classList.add("show"):this.infoElement.classList.remove("show");var g=this.filterListNumberOfVisible!=o.length;g&&(this.resize(),this.animateElementsIn()),this.filterListNumberOfVisible=o.length}},e.prototype.animateElementsIn=function(){var t=this.getElements();if(t.length>0){this.el.classList.contains("animate-in")||this.el.classList.add("animate-in");for(var e=0;e<t.length;e++){var A=t[e];A.animateIn()}}},e.prototype.getElements=function(){return this.elements.length>0&&"OptionsList"==this.elements[0].type?this.elements[0].elements:this.elements},e.prototype.buildTabableRows=function(){this.tableableRows=[],this.resetTabList();var t=this.getElements();if(this.el.classList.contains("two-row")){this.tableableRows[0]=[],this.tableableRows[1]=[];for(var e=0;e<t.length;e++){var A=t[e];A.visible&&(A.positionVector.y<30?this.tableableRows[0].push(A):this.tableableRows[1].push(A))}}else{this.tableableRows[0]=[];for(var e=0;e<t.length;e++){var A=t[e];A.visible&&this.tableableRows[0].push(A)}}},e.prototype.focusFrom=function(t){this.tableableRows&&(this.columnIndex=0,"bottom"==t?this.rowIndex=this.el.classList.contains("two-row")?1:0:"top"==t&&(this.rowIndex=0),this.tableableRows[this.rowIndex]&&this.tableableRows[this.rowIndex][this.columnIndex]?(this.ignoreKeyboardInput=!0,this.tableableRows[this.rowIndex][this.columnIndex].el.focus()):this.resetTabList())},e.prototype.setFocusOnElement=function(t){this.getElements();this.tableableRows&&t!=-1?this.tableableRows[0][0].el.focus():this.rowIndex=0},e.prototype.updateStateOnElements=function(t){if(this.list.classList.add("disabled"),"RadioButton"==t.type)for(var e=this.getElements(),A=0;A<e.length;A++){var n=e[A];n!=t&&(n.checked=!1)}},e.prototype.reset=function(){this.el.classList.remove("one-row"),this.el.classList.remove("two-row")},e.prototype.getElement=function(t){return this.elements[t]},e.prototype.getDTO=function(){var e={text:void 0,controlElements:[]};if(this.elements&&this.elements.length>0)switch(this.elements[0].type){case"CheckboxButton":for(var A=[],n=0;n<this.elements.length;n++){var o=this.elements[n];o.checked&&A.push(o.value),e.controlElements.push(o)}e.text=t.Dictionary.parseAndGetMultiValueString(A);break;case"RadioButton":for(var n=0;n<this.elements.length;n++){var i=this.elements[n];i.checked&&(e.text=i.value),e.controlElements.push(i)}break;case"OptionsList":var s=this.elements[0];e.controlElements=s.getValue();var A=[];if(e.controlElements&&e.controlElements[0])for(var r=0;r<e.controlElements.length;r++){e.controlElements[r];A.push(e.controlElements[r].value)}e.controlElements=s.elements,e.text=t.Dictionary.parseAndGetMultiValueString(A);break;case"UploadFileUI":e.text=this.elements[0].value,e.controlElements.push(this.elements[0])}return e},e.prototype.buildTags=function(e){var A=this;this.list.classList.remove("disabled");this.el.parentNode.getElementsByTagName("ul")[0],this.el.parentNode.getElementsByTagName("ul")[1];if(this.elements)for(;this.elements.length>0;)this.elements.pop().dealloc();this.elements=[];for(var n=0;n<e.length;n++){var o=e[n];switch(o.type){case"radio":this.elements.push(new t.RadioButton({referenceTag:o}));break;case"checkbox":this.elements.push(new t.CheckboxButton({referenceTag:o}));break;case"select":this.elements.push(new t.OptionsList({referenceTag:o,context:this.list}));break;case"password":default:"file"==o.type&&this.elements.push(new t.UploadFileUI({referenceTag:o}))}if("select"!=o.type&&this.elements.length>0){var i=this.elements[this.elements.length-1];this.list.appendChild(i.el)}}var s=this.elements[0]&&"OptionsList"==this.elements[0].type;s?this.filterListNumberOfVisible=this.elements[0].elements.length:this.filterListNumberOfVisible=e.length,new Promise(function(t,e){return A.resize(t,e)}).then(function(){var e=A.el.classList.contains("one-row")?52:A.el.classList.contains("two-row")?102:0,n={height:e};t.ConversationalForm.illustrateFlow(A,"dispatch",t.UserInputEvents.CONTROL_ELEMENTS_ADDED,n),document.dispatchEvent(new CustomEvent(t.UserInputEvents.CONTROL_ELEMENTS_ADDED,{detail:n}))})},e.prototype.resize=function(t,e){var A=this;this.list.style.width="100%",this.el.classList.remove("one-row"),this.el.classList.remove("two-row"),this.elementWidth=0,setTimeout(function(){A.listWidth=0;var e=A.getElements();if(e.length>0){for(var n=[],o=[],i=0;i<e.length;i++){var s=e[i];s.visible&&(s.calcPosition(),A.listWidth+=s.positionVector.width,n.push(s.positionVector.x+s.positionVector.width),o.push(s))}var r=A.el.offsetWidth,a=A.listWidth>r;a?(A.el.classList.add("two-row"),A.listWidth=Math.max(r,Math.round(n[Math.floor(n.length/2)]+50)),A.list.style.width=A.listWidth+"px"):A.el.classList.add("one-row"),setTimeout(function(){for(var t=0;t<e.length;t++){var n=e[t];n.visible&&n.calcPosition()}a=A.listWidth>r;for(var o=e.slice(),i=o.sort(function(t,e){return t.positionVector.x==e.positionVector.x?0:t.positionVector.x<e.positionVector.x?-1:1}),s=0,t=0;t<i.length;t++){var n=i[t];n.visible?n.tabIndex=2+s++:n.tabIndex=-1}cancelAnimationFrame(A.rAF),a?A.el.classList.remove("hide-nav-buttons"):A.el.classList.add("hide-nav-buttons"),A.elementWidth=r,A.listScrollController.resize(A.listWidth,A.elementWidth),A.buildTabableRows()},0)}t&&t()},0)},e.prototype.dealloc=function(){this.tableableRows=null,cancelAnimationFrame(this.rAF),this.rAF=null,this.el.removeEventListener("scroll",this.onScrollCallback,!1),this.onScrollCallback=null,document.removeEventListener(t.ControlElementEvents.ON_FOCUS,this.onElementFocusCallback,!1),this.onElementFocusCallback=null,document.removeEventListener(t.ChatResponseEvents.AI_QUESTION_ASKED,this.onChatAIReponseCallback,!1),this.onChatAIReponseCallback=null,document.removeEventListener(t.UserInputEvents.KEY_CHANGE,this.onUserInputKeyChangeCallback,!1),this.onUserInputKeyChangeCallback=null,document.removeEventListener(t.FlowEvents.USER_INPUT_UPDATE,this.userInputUpdateCallback,!1),this.userInputUpdateCallback=null,this.listScrollController.dealloc()},e}();t.ControlElements=e}(cf||(cf={}));var cf;!function(t){var e=function(){function e(e){this.listWidth=0,this.visibleAreaWidth=0,this.max=0,this.interacting=!1,this.x=0,this.xTarget=0,this.startX=0,this.startXTarget=0,this.mouseSpeed=0,this.mouseSpeedTarget=0,this.direction=0,this.directionTarget=0,this.inputAccerlation=0,this.inputAccerlationTarget=0,this.interactionListener=e.interactionListener,this.listToScroll=e.listToScroll,this.prevButton=e.listNavButtons[0],this.nextButton=e.listNavButtons[1],this.onListNavButtonsClickCallback=this.onListNavButtonsClick.bind(this),this.prevButton.addEventListener("click",this.onListNavButtonsClickCallback,!1),this.nextButton.addEventListener("click",this.onListNavButtonsClickCallback,!1),this.documentLeaveCallback=this.documentLeave.bind(this),this.onInteractStartCallback=this.onInteractStart.bind(this),this.onInteractEndCallback=this.onInteractEnd.bind(this),this.onInteractMoveCallback=this.onInteractMove.bind(this),document.addEventListener("mouseleave",this.documentLeaveCallback,!1),document.addEventListener(t.Helpers.getMouseEvent("mouseup"),this.documentLeaveCallback,!1),this.interactionListener.addEventListener(t.Helpers.getMouseEvent("mousedown"),this.onInteractStartCallback,!1),this.interactionListener.addEventListener(t.Helpers.getMouseEvent("mouseup"),this.onInteractEndCallback,!1),this.interactionListener.addEventListener(t.Helpers.getMouseEvent("mousemove"),this.onInteractMoveCallback,!1)}return e.prototype.onListNavButtonsClick=function(t){var e=t.currentTarget.getAttribute("direction");this.pushDirection("next"==e?-1:1)},e.prototype.documentLeave=function(t){this.onInteractEnd(t)},e.prototype.onInteractStart=function(e){var A=t.Helpers.getXYFromMouseTouchEvent(e);this.interacting=!0,this.startX=A.x,this.startXTarget=this.startX,this.inputAccerlation=0,this.render()},e.prototype.onInteractEnd=function(t){this.interacting=!1},e.prototype.onInteractMove=function(e){if(this.interacting){var A=t.Helpers.getXYFromMouseTouchEvent(e),n=A.x-this.startX,o=6.2;this.inputAccerlationTarget=n*o,this.directionTarget=this.inputAccerlationTarget<0?-1:1,this.startXTarget=A.x}},e.prototype.render=function(){var e=this;this.rAF&&cancelAnimationFrame(this.rAF),this.startX+=.2*(this.startXTarget-this.startX),this.inputAccerlation+=(this.inputAccerlationTarget-this.inputAccerlation)*(this.interacting?.2:.05);var A=.25;this.inputAccerlationTarget*=A,this.direction+=.2*(this.directionTarget-this.direction),this.mouseSpeed+=.2*(this.mouseSpeedTarget-this.mouseSpeed),this.direction+=this.mouseSpeed,this.xTarget+=.05*this.inputAccerlation,this.xTarget>0&&(this.xTarget+=.3*(0-this.xTarget)),this.xTarget<this.max&&(this.xTarget+=.3*(this.max-this.xTarget)),this.x+=.4*(this.xTarget-this.x);var n=Math.round(this.x);n<0&&(this.prevButton.classList.contains("active")||this.prevButton.classList.add("active"),this.prevButton.classList.contains("cf-gradient")||this.prevButton.classList.add("cf-gradient")),0==n&&(this.prevButton.classList.contains("active")&&this.prevButton.classList.remove("active"),this.prevButton.classList.contains("cf-gradient")&&this.prevButton.classList.remove("cf-gradient")),n>this.max&&(this.nextButton.classList.contains("active")||this.nextButton.classList.add("active"),this.nextButton.classList.contains("cf-gradient")||this.nextButton.classList.add("cf-gradient")),n<=this.max&&(this.nextButton.classList.contains("active")||this.nextButton.classList.remove("active"),this.nextButton.classList.contains("cf-gradient")||this.nextButton.classList.remove("cf-gradient"));var o=this.x;t.Helpers.setTransform(this.listToScroll,"translateX("+o+"px)"),(this.interacting||Math.abs(this.x-this.xTarget)>.02&&!this.interacting)&&(this.rAF=window.requestAnimationFrame(function(){return e.render()}))},e.prototype.setScroll=function(t,e){this.xTarget=this.visibleAreaWidth==this.listWidth?0:t,this.render()},e.prototype.pushDirection=function(t){this.inputAccerlationTarget+=5e3*t,this.render()},e.prototype.dealloc=function(){this.prevButton.removeEventListener("click",this.onListNavButtonsClickCallback,!1),this.nextButton.removeEventListener("click",this.onListNavButtonsClickCallback,!1),this.onListNavButtonsClickCallback=null,this.prevButton=null,this.nextButton=null,document.removeEventListener("mouseleave",this.documentLeaveCallback,!1),this.interactionListener.removeEventListener(t.Helpers.getMouseEvent("mousedown"),this.onInteractStartCallback,!1),this.interactionListener.removeEventListener(t.Helpers.getMouseEvent("mouseup"),this.onInteractEndCallback,!1),this.interactionListener.removeEventListener(t.Helpers.getMouseEvent("mousemove"),this.onInteractMoveCallback,!1),this.documentLeaveCallback=null,this.onInteractStartCallback=null,this.onInteractEndCallback=null,this.onInteractMoveCallback=null},e.prototype.reset=function(){this.interacting=!1,this.startX=0,this.startXTarget=this.startX,this.inputAccerlation=0,this.x=0,this.xTarget=0,this.render(),this.prevButton.classList.remove("active"),this.nextButton.classList.remove("active")},e.prototype.resize=function(t,e){this.reset(),this.visibleAreaWidth=e,this.listWidth=Math.max(e,t),this.max=(this.listWidth-this.visibleAreaWidth)*-1,this.render()},e}();t.ScrollController=e}(cf||(cf={}));var cf;!function(t){var e=function(){function t(e){this.data={"user-image":"data:image/png;charset=utf-8;base64,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",
"entry-not-found":"Dictionary item not found.","input-placeholder":"Type your answer here ...","input-placeholder-error":"Your input is not correct ...","input-placeholder-file-error":"File upload failed ...","input-placeholder-file-size-error":"File size too big ...","input-no-filter":"No results found for <strong>{input-value}</strong>","user-reponse-and":" and ","user-reponse-missing":"Missing input ...",general:"General type1|General type2","icon-type-file":"<svg class='cf-icon-file' viewBox='0 0 10 14' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'><g stroke='none' stroke-width='1' fill='none' fill-rule='evenodd'><g transform='translate(-756.000000, -549.000000)' fill='#0D83FF'><g transform='translate(736.000000, 127.000000)'><g transform='translate(0.000000, 406.000000)'><polygon points='20 16 26.0030799 16 30 19.99994 30 30 20 30'></polygon></g></g></g></g></svg>"},this.AIQuestions={robot:{thumb:"data:image/png;charset=utf-8;base64,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",
text:"Please write some text.",name:"What's your name?",email:"What is the best email to reach you at?",password:"What password would you like to use for your account? (Don't worry, I can't see your answer)",tel:"What's your phone number?",radio:"Please select one of the following options",checkbox:"Select as many as you want.",select:"Choose any of these options.",general:"General1|General2|General3.."},sonny:{thumb:"data:image/jpeg;charset=utf-8;base64,/9j/4QAYRXhpZgAASUkqAAgAAAAAAAAAAAAAAP/sABFEdWNreQABAAQAAAAyAAD/4QMvaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLwA8P3hwYWNrZXQgYmVnaW49Iu+7vyIgaWQ9Ilc1TTBNcENlaGlIenJlU3pOVGN6a2M5ZCI/PiA8eDp4bXBtZXRhIHhtbG5zOng9ImFkb2JlOm5zOm1ldGEvIiB4OnhtcHRrPSJBZG9iZSBYTVAgQ29yZSA1LjYtYzA2NyA3OS4xNTc3NDcsIDIwMTUvMDMvMzAtMjM6NDA6NDIgICAgICAgICI+IDxyZGY6UkRGIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyI+IDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiIHhtbG5zOnhtcD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLyIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bXA6Q3JlYXRvclRvb2w9IkFkb2JlIFBob3Rvc2hvcCBDQyAyMDE1IE1hY2ludG9zaCIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpDNzJDM0VGRDkzREQxMUU2QUYxQzg3RUY5REZFRTA3QiIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDpDNzJDM0VGRTkzREQxMUU2QUYxQzg3RUY5REZFRTA3QiI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOkM3MkMzRUZCOTNERDExRTZBRjFDODdFRjlERkVFMDdCIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOkM3MkMzRUZDOTNERDExRTZBRjFDODdFRjlERkVFMDdCIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+/+4ADkFkb2JlAGTAAAAAAf/bAIQACAYGBgYGCAYGCAwIBwgM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",text:"Gimme some text.",name:"I am wondering wht your name is..?",email:"Need your e-mail.",password:"What's your password?",tel:"What's your phone number? Promise not to exploit it.",radio:"I need you to select one of these.",checkbox:"Select as many as you want.",select:"Choose any of the options.",general:"General1|General2|General3.."}},t.instance=this,e&&e.data&&(this.data=this.validateAndSetNewData(e.data,this.data)),e.userImage&&(this.data["user-image"]=e.userImage),e&&e.aiQuestions&&(this.AIQuestions[t.AIType]=this.validateAndSetNewData(e.aiQuestions,this.AIQuestions[t.AIType]))}return t.get=function(e){var A=t.instance,n=A.data[e];if(n){var o=n.split("|");n=o[Math.floor(Math.random()*o.length)]}else n=A.data["entry-not-found"];return n},t.getAIResponse=function(e){var A=t.instance,n=A.AIQuestions[t.AIType][e];if(n){var o=n.split("|");n=o[Math.floor(Math.random()*o.length)]}else{var i=A.AIQuestions[t.AIType].general.split("|");n=i[Math.floor(Math.random()*i.length)]}return n},t.parseAndGetMultiValueString=function(e){for(var A="",n=0;n<e.length;n++){var o=e[n],i=e.length>1&&n==e.length-2?t.get("user-reponse-and"):", ";A+=o+(n<e.length-1?i:"")}return A},t.prototype.validateAndSetNewData=function(t,e){for(var A in e)t[A]||(console.warn("Conversational Form Dictionary warning, '"+A+"' value is undefined, mapping '"+A+"' to default value. See Dictionary.ts for keys."),t[A]=e[A]);return t},t.keyCodes={left:37,right:39,down:40,up:38,enter:13,space:32,shift:16,tab:9},t.AIType="robot",t}();t.Dictionary=e}(cf||(cf={}));var cf;!function(cf){var Tag=function(){function Tag(options){this.domElement=options.domElement,this.domElement.tabIndex=-1,options.questions&&(this.questions=options.questions),this.domElement.getAttribute("cf-validation-custom")&&(this.validationCallback=eval(this.domElement.getAttribute("cf-validation-custom"))),this.domElement.getAttribute("cf-validation-contains")&&(this.validationContains=this.domElement.getAttribute("cf-validation-contains").split("|")),""==this.domElement.getAttribute("cf-validation-email")&&(this.validationEmail=new RegExp("^[^@]+@[^@]+.[^@]+$")),this.domElement.getAttribute("pattern")?this.validationMatches=new RegExp(this.domElement.getAttribute("pattern")):this.domElement.getAttribute("cf-validation-matches")&&(this.validationMatches=new RegExp(this.domElement.getAttribute("cf-validation-matches"))),this.domElement.getAttribute("max")?this.validationMax=+this.domElement.getAttribute("max"):this.domElement.getAttribute("cf-validation-max")&&(this.validationMax=+this.domElement.getAttribute("cf-validation-max")),this.domElement.getAttribute("min")?this.validationMin=+this.domElement.getAttribute("min"):this.domElement.getAttribute("cf-validation-min")&&(this.validationMin=+this.domElement.getAttribute("cf-validation-min")),(this.domElement.getAttribute("required")||""==this.domElement.getAttribute("required"))&&(this.validationPresent=!0),this.defaultValue=this.domElement.value,"group"!=this.type&&console.log("Tag registered:",this.type),this.findAndSetQuestions()}return Object.defineProperty(Tag.prototype,"type",{get:function(){return this.domElement.getAttribute("type")},enumerable:!0,configurable:!0}),Object.defineProperty(Tag.prototype,"name",{get:function(){return this.domElement.getAttribute("name")},enumerable:!0,configurable:!0}),Object.defineProperty(Tag.prototype,"label",{get:function(){return this._label||this.findAndSetLabel(),this._label?this._label:cf.Dictionary.getAIResponse(this.type)},enumerable:!0,configurable:!0}),Object.defineProperty(Tag.prototype,"value",{get:function(){return this.domElement.value},enumerable:!0,configurable:!0}),Object.defineProperty(Tag.prototype,"question",{get:function(){return this.questions&&0!=this.questions.length?this.questions[Math.floor(Math.random()*this.questions.length)]:cf.Dictionary.getAIResponse(this.type)},enumerable:!0,configurable:!0}),Object.defineProperty(Tag.prototype,"errorMessage",{get:function(){return this.errorMessages||(this.domElement.getAttribute("cf-error")?this.errorMessages=this.domElement.getAttribute("cf-error").split("|"):"file"==this.type?this.errorMessages=[cf.Dictionary.get("input-placeholder-file-error")]:this.errorMessages=[cf.Dictionary.get("input-placeholder-error")]),this.errorMessages[Math.floor(Math.random()*this.errorMessages.length)]},enumerable:!0,configurable:!0}),Tag.prototype.includes=function(t,e){"use strict";if(null==t)throw new TypeError("Array.prototype.includes called on null or undefined");var A=t.length||0;if(0===A)return!1;for(var n,o=0;o<A;){if(n=t[o],e===n||e!==e&&n!==n)return!0;o++}return!1},Tag.prototype.dealloc=function(){this.domElement=null,this.defaultValue=null,this.errorMessages=null,this._label=null,this.validationContains=null,this.validationEmail=null,this.validationMin=null,this.validationMatches=null,this.validationMax=null,this.validationPresent=!1,this.validationCallback=null,this.questions=null},Tag.isTagValid=function(t){if("hidden"===t.getAttribute("type"))return!1;if("submit"===t.getAttribute("type"))return!1;if("button"==t.getAttribute("type"))return!1;if("none"===t.style.display)return!1;if("hidden"===t.style.visibility)return!1;var e=cf.Helpers.getInnerTextOfElement(t);return("option"!=t.tagName.toLowerCase()||""!=e&&" "!=e)&&("select"==t.tagName.toLowerCase()||"option"==t.tagName.toLowerCase()||!!(t.offsetWidth||t.offsetHeight||t.getClientRects().length))},Tag.createTag=function(t){if(Tag.isTagValid(t)){var e=void 0;return"input"==t.tagName.toLowerCase()?e=new cf.InputTag({domElement:t}):"select"==t.tagName.toLowerCase()?e=new cf.SelectTag({domElement:t}):"button"==t.tagName.toLowerCase()?e=new cf.ButtonTag({domElement:t}):"option"==t.tagName.toLowerCase()&&(e=new cf.OptionTag({domElement:t})),e}return null},Tag.prototype.setTagValueAndIsValid=function(t){var e=!0,A=t.text;return this.validationPresent&&(e=""!=A),e&&this.validationContains&&(e=this.includes(this.validationContains,A)),e&&this.validationEmail&&(e=this.validationEmail.test(A)),this.validationMatches&&(e=this.validationMatches.test(A)),e&&this.validationMax&&(e=this.validationMax>=+A),e&&this.validationMin&&(e=this.validationMin<=+A),e&&this.validationCallback&&(e=this.validationCallback(A,this)),e&&"file"!=this.type&&(this.domElement.value=A),e},Tag.prototype.findAndSetQuestions=function(){if(!this.questions){if(this.domElement.getAttribute("cf-questions"))this.questions=this.domElement.getAttribute("cf-questions").split("|");else{var t=this.domElement.getAttribute("id"),e=document.querySelector("label[for='"+t+"']");e&&(this.questions=[cf.Helpers.getInnerTextOfElement(e)])}!this.questions&&this.domElement.getAttribute("placeholder")&&(this.questions=[this.domElement.getAttribute("placeholder")])}},Tag.prototype.findAndSetLabel=function(){if(this.domElement.getAttribute("cf-label"))this._label=this.domElement.getAttribute("cf-label");else{var t=this.domElement.parentNode;if(t){var e=t.getElementsByTagName("label");if(0==e.length){var A=cf.Helpers.getInnerTextOfElement(t);A&&A.length>0&&(e=[t])}e.length>0&&e[0]&&(this._label=cf.Helpers.getInnerTextOfElement(e[0]))}}},Tag}();cf.Tag=Tag}(cf||(cf={}));var cf;!function(t){var e=function(){function e(t){this.elements=t.elements,console.log("TagGroup registered:",this.elements[0].type,this)}return Object.defineProperty(e.prototype,"type",{get:function(){return"group"},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"name",{get:function(){return this.elements[0].name},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"label",{get:function(){return this.elements[0].label},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"question",{get:function(){var e=this.elements[0].question;if(e)return e;var A=t.Dictionary.getAIResponse(this.getGroupTagType());return A},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"value",{get:function(){return""},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"errorMessage",{get:function(){if(!this.errorMessages){this.errorMessages=[t.Dictionary.get("input-placeholder-error")];for(var e=0;e<this.elements.length;e++){this.elements[e];this.elements[e].domElement.getAttribute("cf-error")&&(this.errorMessages=this.elements[e].domElement.getAttribute("cf-error").split("|"))}}return this.errorMessages[Math.floor(Math.random()*this.errorMessages.length)]},enumerable:!0,configurable:!0}),e.prototype.dealloc=function(){for(var t=0;t<this.elements.length;t++){var e=this.elements[t];e.dealloc()}this.elements=null,this.errorMessages=null},e.prototype.getGroupTagType=function(){return this.elements[0].type},e.prototype.setTagValueAndIsValid=function(t){var e=!1,A=this.elements[0].type;switch(A){case"radio":for(var n=[],o=!1,i=0;i<t.controlElements.length;i++){var s=t.controlElements[i],r=this.elements[this.elements.indexOf(s.referenceTag)];s.visible&&(n.push(s),r==s.referenceTag&&(r.domElement.checked=s.checked,!o&&s.checked&&(o=!0)))}if(e||1!=n.length)!e&&o&&(e=o);else{var s=n[0],r=this.elements[this.elements.indexOf(s.referenceTag)];s.checked=!0,r.domElement.checked=!0,e=!0}break;case"checkbox":e=!0;for(var i=0;i<t.controlElements.length;i++){var s=t.controlElements[i],r=this.elements[this.elements.indexOf(s.referenceTag)];r.domElement.checked=s.checked}}return e},e}();t.TagGroup=e}(cf||(cf={}));var __extends=this&&this.__extends||function(t,e){function A(){this.constructor=t}for(var n in e)e.hasOwnProperty(n)&&(t[n]=e[n]);t.prototype=null===e?Object.create(e):(A.prototype=e.prototype,new A)},cf;!function(t){var e=function(t){function e(e){t.call(this,e),"text"==this.type||"email"==this.type||"tel"==this.type||"checkbox"==this.type||"radio"==this.type||"password"==this.type||"file"==this.type}return __extends(e,t),e.prototype.findAndSetQuestions=function(){t.prototype.findAndSetQuestions.call(this)},e.prototype.findAndSetLabel=function(){t.prototype.findAndSetLabel.call(this),!this._label},e.prototype.setTagValueAndIsValid=function(e){return"checkbox"==this.type||t.prototype.setTagValueAndIsValid.call(this,e)},e.prototype.dealloc=function(){t.prototype.dealloc.call(this)},e}(t.Tag);t.InputTag=e}(cf||(cf={}));var __extends=this&&this.__extends||function(t,e){function A(){this.constructor=t}for(var n in e)e.hasOwnProperty(n)&&(t[n]=e[n]);t.prototype=null===e?Object.create(e):(A.prototype=e.prototype,new A)},cf;!function(t){var e=function(e){function A(A){e.call(this,A),this.optionTags=[];for(var n=this.domElement.getElementsByTagName("option"),o=0;o<n.length;o++){var i=n[o],s=t.Tag.createTag(i);s&&this.optionTags.push(s)}}return __extends(A,e),Object.defineProperty(A.prototype,"type",{get:function(){return"select"},enumerable:!0,configurable:!0}),Object.defineProperty(A.prototype,"multipleChoice",{get:function(){return this.domElement.hasAttribute("multiple")},enumerable:!0,configurable:!0}),A.prototype.setTagValueAndIsValid=function(t){for(var e=!1,A=[],n=0;n<this.optionTags.length;n++)for(var o=this.optionTags[n],i=0;i<t.controlElements.length;i++){var s=t.controlElements[i];s.referenceTag==o&&(o.selected=s.selected,!e&&o.selected&&(e=!0),s.visible&&A.push(s))}if(!e&&1==A.length){var r=A[0],o=this.optionTags[this.optionTags.indexOf(r.referenceTag)];r.selected=!0,o.selected=!0,e=!0}return e},A}(t.Tag);t.SelectTag=e}(cf||(cf={}));var __extends=this&&this.__extends||function(t,e){function A(){this.constructor=t}for(var n in e)e.hasOwnProperty(n)&&(t[n]=e[n]);t.prototype=null===e?Object.create(e):(A.prototype=e.prototype,new A)},cf;!function(t){var e=function(t){function e(e){t.call(this,e),"submit"==this.domElement.getAttribute("type")||"button"==this.domElement.getAttribute("type")}return __extends(e,t),e}(t.Tag);t.ButtonTag=e}(cf||(cf={}));var __extends=this&&this.__extends||function(t,e){function A(){this.constructor=t}for(var n in e)e.hasOwnProperty(n)&&(t[n]=e[n]);t.prototype=null===e?Object.create(e):(A.prototype=e.prototype,new A)},cf;!function(t){var e=function(e){function A(){e.apply(this,arguments)}return __extends(A,e),Object.defineProperty(A.prototype,"type",{get:function(){return"option"},enumerable:!0,configurable:!0}),Object.defineProperty(A.prototype,"label",{get:function(){return t.Helpers.getInnerTextOfElement(this.domElement)},enumerable:!0,configurable:!0}),Object.defineProperty(A.prototype,"selected",{get:function(){return this.domElement.selected},set:function(t){t?this.domElement.setAttribute("selected","selected"):this.domElement.removeAttribute("selected")},enumerable:!0,configurable:!0}),A.prototype.setTagValueAndIsValid=function(t){var e=!0;return e},A}(t.Tag);t.OptionTag=e}(cf||(cf={}));var __extends=this&&this.__extends||function(t,e){function A(){this.constructor=t}for(var n in e)e.hasOwnProperty(n)&&(t[n]=e[n]);t.prototype=null===e?Object.create(e):(A.prototype=e.prototype,new A)},cf;!function(t){var e=function(t){function e(e){t.call(this,e),this.clickCallback=this.onClick.bind(this),this.el.addEventListener("click",this.clickCallback,!1),this.mouseDownCallback=this.onMouseDown.bind(this),this.el.addEventListener("mousedown",this.mouseDownCallback,!1)}return __extends(e,t),Object.defineProperty(e.prototype,"type",{get:function(){return"Button"},enumerable:!0,configurable:!0}),e.prototype.onMouseDown=function(t){t.preventDefault()},e.prototype.onClick=function(t){this.onChoose()},e.prototype.dealloc=function(){this.el.removeEventListener("click",this.clickCallback,!1),this.clickCallback=null,this.el.removeEventListener("mousedown",this.mouseDownCallback,!1),this.mouseDownCallback=null,t.prototype.dealloc.call(this)},e.prototype.getTemplate=function(){return'<cf-button class="cf-button">\n\t\t\t\t'+this.referenceTag.label+"\n\t\t\t</cf-button>\n\t\t\t"},e}(t.ControlElement);t.Button=e}(cf||(cf={}));var __extends=this&&this.__extends||function(t,e){function A(){this.constructor=t}for(var n in e)e.hasOwnProperty(n)&&(t[n]=e[n]);t.prototype=null===e?Object.create(e):(A.prototype=e.prototype,new A)},cf;!function(t){var e=function(t){function e(){t.apply(this,arguments)}return __extends(e,t),Object.defineProperty(e.prototype,"type",{get:function(){return"RadioButton"},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"checked",{get:function(){var t=this.el.hasAttribute("checked")&&"checked"==this.el.getAttribute("checked");return t},set:function(t){t?this.el.setAttribute("checked","checked"):this.el.removeAttribute("checked")},enumerable:!0,configurable:!0}),e.prototype.onClick=function(e){this.checked=!this.checked,t.prototype.onClick.call(this,e)},e.prototype.getTemplate=function(){var t="1"==this.referenceTag.value||this.referenceTag.domElement.hasAttribute("checked");return'<cf-radio-button class="cf-button" checked='+(t?"checked":"")+">\n\t\t\t\t<cf-radio></cf-radio>\n\t\t\t\t"+this.referenceTag.label+"\n\t\t\t</cf-radio-button>\n\t\t\t"},e}(t.Button);t.RadioButton=e}(cf||(cf={}));var __extends=this&&this.__extends||function(t,e){function A(){this.constructor=t}for(var n in e)e.hasOwnProperty(n)&&(t[n]=e[n]);t.prototype=null===e?Object.create(e):(A.prototype=e.prototype,new A)},cf;!function(t){var e=function(t){function e(){t.apply(this,arguments)}return __extends(e,t),Object.defineProperty(e.prototype,"type",{get:function(){return"CheckboxButton"},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"checked",{get:function(){return"checked"==this.el.getAttribute("checked")},set:function(t){t?this.el.setAttribute("checked","checked"):this.el.removeAttribute("checked")},enumerable:!0,configurable:!0}),e.prototype.onClick=function(t){this.checked=!this.checked},e.prototype.getTemplate=function(){var t="1"==this.referenceTag.value||this.referenceTag.domElement.hasAttribute("checked");return'<cf-button class="cf-button cf-checkbox-button '+(0==this.referenceTag.label.trim().length?"no-text":"")+'" checked='+(t?"checked":"")+">\n\t\t\t\t<cf-checkbox></cf-checkbox>\n\t\t\t\t"+this.referenceTag.label+"\n\t\t\t</cf-button>\n\t\t\t"},e}(t.Button);t.CheckboxButton=e}(cf||(cf={}));var __extends=this&&this.__extends||function(t,e){function A(){this.constructor=t}for(var n in e)e.hasOwnProperty(n)&&(t[n]=e[n]);t.prototype=null===e?Object.create(e):(A.prototype=e.prototype,new A)},cf;!function(t){t.OptionButtonEvents={CLICK:"cf-option-button-click"};var e=function(e){function A(){e.apply(this,arguments),this.isMultiChoice=!1}return __extends(A,e),Object.defineProperty(A.prototype,"type",{get:function(){return"OptionButton"},enumerable:!0,configurable:!0}),Object.defineProperty(A.prototype,"selected",{get:function(){return this.el.hasAttribute("selected")},set:function(t){t?this.el.setAttribute("selected","selected"):this.el.removeAttribute("selected")},enumerable:!0,configurable:!0}),A.prototype.setData=function(t){this.isMultiChoice=t.isMultiChoice,e.prototype.setData.call(this,t)},A.prototype.onClick=function(e){t.ConversationalForm.illustrateFlow(this,"dispatch",t.OptionButtonEvents.CLICK,this),document.dispatchEvent(new CustomEvent(t.OptionButtonEvents.CLICK,{detail:this}))},A.prototype.getTemplate=function(){var t='<cf-button class="cf-button '+(this.isMultiChoice?"cf-checkbox-button":"")+'" '+(this.referenceTag.domElement.selected?"selected='selected'":"")+">";return this.isMultiChoice&&(t+="<cf-checkbox></cf-checkbox>"),t+=this.referenceTag.label,t+="</cf-button>"},A}(t.Button);t.OptionButton=e}(cf||(cf={}));var cf;!function(t){var e=function(){function e(e){this.context=e.context,this.referenceTag=e.referenceTag,this.multiChoice=this.referenceTag.domElement.hasAttribute("multiple"),this.onOptionButtonClickCallback=this.onOptionButtonClick.bind(this),document.addEventListener(t.OptionButtonEvents.CLICK,this.onOptionButtonClickCallback,!1),this.createElements()}return Object.defineProperty(e.prototype,"type",{get:function(){return"OptionsList"},enumerable:!0,configurable:!0}),e.prototype.getValue=function(){for(var t=[],e=0;e<this.elements.length;e++){var A=this.elements[e];if(!this.multiChoice&&A.selected)return t.push(A),t;this.multiChoice&&A.selected&&t.push(A)}return t},e.prototype.onOptionButtonClick=function(e){if(this.multiChoice)e.detail.selected=!e.detail.selected;else{for(var A=0;A<this.elements.length;A++){var n=this.elements[A];n!=e.detail?n.selected=!1:n.selected=!0}t.ConversationalForm.illustrateFlow(this,"dispatch",t.ControlElementEvents.SUBMIT_VALUE,this.referenceTag),document.dispatchEvent(new CustomEvent(t.ControlElementEvents.SUBMIT_VALUE,{detail:e.detail}))}},e.prototype.createElements=function(){this.elements=[];for(var e=this.referenceTag.optionTags,A=0;A<e.length;A++){var n=e[A],o=new t.OptionButton({referenceTag:n,isMultiChoice:this.referenceTag.multipleChoice});this.elements.push(o),this.context.appendChild(o.el)}},e.prototype.dealloc=function(){for(document.removeEventListener(t.OptionButtonEvents.CLICK,this.onOptionButtonClickCallback,!1),this.onOptionButtonClickCallback=null;this.elements.length>0;)this.elements.pop().dealloc();this.elements=null},e}();t.OptionsList=e}(cf||(cf={}));var __extends=this&&this.__extends||function(t,e){function A(){this.constructor=t}for(var n in e)e.hasOwnProperty(n)&&(t[n]=e[n]);t.prototype=null===e?Object.create(e):(A.prototype=e.prototype,new A)},cf;!function(t){var e=function(e){function A(A){if(e.call(this,A),this.maxFileSize=1e11,this.loading=!1,this.submitTimer=0,this.fileName="",!t.Helpers.caniuse.fileReader())throw new Error("Conversational Form Error: No FileReader available for client.");var n=this.referenceTag.domElement.getAttribute("cf-max-size")||this.referenceTag.domElement.getAttribute("max-size");if(n){var o=parseInt(n,10);this.maxFileSize=o}this.progressBar=this.el.getElementsByTagName("cf-upload-file-progress-bar")[0],this.onDomElementChangeCallback=this.onDomElementChange.bind(this),this.referenceTag.domElement.addEventListener("change",this.onDomElementChangeCallback,!1)}return __extends(A,e),Object.defineProperty(A.prototype,"value",{get:function(){return this.fileName},enumerable:!0,configurable:!0}),Object.defineProperty(A.prototype,"type",{get:function(){return"UploadFileUI"},enumerable:!0,configurable:!0}),A.prototype.onDomElementChange=function(e){var A=this,n=new FileReader;n.onerror=function(t){console.log("onerror",t)},n.onprogress=function(t){console.log("onprogress",t),A.progressBar.style.width=t.loaded/t.total*100+"%"},n.onabort=function(t){console.log("onabort",t)},n.onloadstart=function(e){var o=A.referenceTag.domElement.files[0],i=o?o.size:A.maxFileSize+1;if(i>A.maxFileSize){n.abort();var s={errorText:t.Dictionary.get("input-placeholder-file-size-error")};t.ConversationalForm.illustrateFlow(A,"dispatch",t.FlowEvents.USER_INPUT_INVALID,s),document.dispatchEvent(new CustomEvent(t.FlowEvents.USER_INPUT_INVALID,{detail:s}))}else{A.fileName=o.name,A.loading=!0,A.animateIn();var r=Math.floor(Math.log(i)/Math.log(1024)),a=["b","kb","mb","gb"];r=Math.min(a.length-1,r);var l=1*Number((i/Math.pow(1024,r)).toFixed(2))+" "+a[r],g=o.name+" ("+l+")";A.el.getElementsByTagName("cf-upload-file-text")[0].innerHTML=g,document.dispatchEvent(new CustomEvent(t.ControlElementEvents.PROGRESS_CHANGE,{detail:t.ControlElementProgressStates.BUSY}))}},n.onload=function(e){A.progressBar.classList.add("loaded"),A.submitTimer=setTimeout(function(){document.dispatchEvent(new CustomEvent(t.ControlElementEvents.PROGRESS_CHANGE,{detail:t.ControlElementProgressStates.READY})),A.el.classList.remove("animate-in"),A.onChoose()},2e3)},n.readAsBinaryString(e.target.files[0])},A.prototype.animateIn=function(){this.loading&&e.prototype.animateIn.call(this)},A.prototype.onClick=function(t){},A.prototype.triggerFileSelect=function(){this.referenceTag.domElement.click()},A.prototype.dealloc=function(){clearTimeout(this.submitTimer),this.progressBar=null,this.onDomElementChangeCallback&&(this.referenceTag.domElement.removeEventListener("change",this.onDomElementChangeCallback,!1),this.onDomElementChangeCallback=null),e.prototype.dealloc.call(this)},A.prototype.getTemplate=function(){"1"==this.referenceTag.value||this.referenceTag.domElement.hasAttribute("checked");return"<cf-upload-file-ui>\n\t\t\t\t<cf-upload-file-text></cf-upload-file-text>\n\t\t\t\t<cf-upload-file-progress>\n\t\t\t\t\t<cf-upload-file-progress-bar></cf-upload-file-progress-bar>\n\t\t\t\t</cf-upload-file-progress>\n\t\t\t</cf-upload-file-ui>\n\t\t\t"},A}(t.Button);t.UploadFileUI=e}(cf||(cf={}));var __extends=this&&this.__extends||function(t,e){function A(){this.constructor=t}for(var n in e)e.hasOwnProperty(n)&&(t[n]=e[n]);t.prototype=null===e?Object.create(e):(A.prototype=e.prototype,new A)},cf;!function(t){t.UserInputEvents={SUBMIT:"cf-input-user-input-submit",KEY_CHANGE:"cf-input-key-change",CONTROL_ELEMENTS_ADDED:"cf-input-control-elements-added"};var e=function(e){function A(A){e.call(this,A),this.errorTimer=0,this.shiftIsDown=!1,this._disabled=!1,this.el.setAttribute("placeholder",t.Dictionary.get("input-placeholder")),this.inputElement=this.el.getElementsByTagName("input")[0],this.onInputFocusCallback=this.onInputFocus.bind(this),this.inputElement.addEventListener("focus",this.onInputFocusCallback,!1),this.controlElements=new t.ControlElements({
el:this.el.getElementsByTagName("cf-input-control-elements")[0]}),this.windowFocusCallback=this.windowFocus.bind(this),window.addEventListener("focus",this.windowFocusCallback,!1),this.keyUpCallback=this.onKeyUp.bind(this),document.addEventListener("keyup",this.keyUpCallback,!1),this.keyDownCallback=this.onKeyDown.bind(this),document.addEventListener("keydown",this.keyDownCallback,!1),this.flowUpdateCallback=this.onFlowUpdate.bind(this),document.addEventListener(t.FlowEvents.FLOW_UPDATE,this.flowUpdateCallback,!1),this.inputInvalidCallback=this.inputInvalid.bind(this),document.addEventListener(t.FlowEvents.USER_INPUT_INVALID,this.inputInvalidCallback,!1),this.onControlElementSubmitCallback=this.onControlElementSubmit.bind(this),document.addEventListener(t.ControlElementEvents.SUBMIT_VALUE,this.onControlElementSubmitCallback,!1),this.onControlElementProgressChangeCallback=this.onControlElementProgressChange.bind(this),document.addEventListener(t.ControlElementEvents.PROGRESS_CHANGE,this.onControlElementProgressChangeCallback,!1),this.submitButton=this.el.getElementsByTagName("cf-input-button")[0],this.onSubmitButtonClickCallback=this.onSubmitButtonClick.bind(this),this.submitButton.addEventListener("click",this.onSubmitButtonClickCallback,!1)}return __extends(A,e),Object.defineProperty(A.prototype,"active",{get:function(){return this.inputElement===document.activeElement},enumerable:!0,configurable:!0}),Object.defineProperty(A.prototype,"disabled",{set:function(t){var e=this._disabled!=t;e&&(this._disabled=t,t?(this.el.setAttribute("disabled","disabled"),this.inputElement.blur()):(this.setFocusOnInput(),this.el.removeAttribute("disabled")))},enumerable:!0,configurable:!0}),A.prototype.getInputValue=function(){return this.inputElement.value},A.prototype.getFlowDTO=function(){var t;return t=this.controlElements&&this.controlElements.active?this.controlElements.getDTO():{text:this.getInputValue()},t.input=this,t},A.prototype.inputInvalid=function(e){var n=this;t.ConversationalForm.illustrateFlow(this,"receive",e.type,e.detail);var o=e.detail;this.inputElement.setAttribute("data-value",this.inputElement.value),this.inputElement.value="",this.el.setAttribute("error",""),this.disabled=!0,this.inputElement.setAttribute("placeholder",o.errorText||this.currentTag.errorMessage),clearTimeout(this.errorTimer),this.errorTimer=setTimeout(function(){n.disabled=!1,n.el.removeAttribute("error"),n.inputElement.value=n.inputElement.getAttribute("data-value"),n.inputElement.setAttribute("data-value",""),n.inputElement.setAttribute("placeholder",t.Dictionary.get("input-placeholder")),n.setFocusOnInput()},A.ERROR_TIME)},A.prototype.onFlowUpdate=function(e){var n=this;t.ConversationalForm.illustrateFlow(this,"receive",e.type,e.detail),this.el.classList.contains("animate-in")||this.el.classList.add("animate-in"),this.currentTag=e.detail,"password"==this.currentTag.type?this.inputElement.setAttribute("type","password"):this.inputElement.setAttribute("type","text"),this.el.setAttribute("tag-type",this.currentTag.type),clearTimeout(this.errorTimer),this.el.removeAttribute("error"),this.inputElement.setAttribute("data-value",""),this.inputElement.value="",this.inputElement.setAttribute("placeholder",t.Dictionary.get("input-placeholder")),this.resetValue(),A.preventAutoFocus||this.setFocusOnInput(),this.controlElements.reset(),"group"==this.currentTag.type?this.buildControlElements(this.currentTag.elements):this.buildControlElements([this.currentTag]),setTimeout(function(){n.disabled=!1},1e3)},A.prototype.onControlElementProgressChange=function(e){var A=e.detail;this.disabled=A==t.ControlElementProgressStates.BUSY},A.prototype.buildControlElements=function(t){this.controlElements.buildTags(t)},A.prototype.onControlElementSubmit=function(e){t.ConversationalForm.illustrateFlow(this,"receive",e.type,e.detail);var A=e.detail;this.controlElements.updateStateOnElements(A),this.doSubmit()},A.prototype.onSubmitButtonClick=function(t){this.onEnterOrSubmitButtonSubmit()},A.prototype.onKeyDown=function(e){e.keyCode==t.Dictionary.keyCodes.shift&&(this.shiftIsDown=!0)},A.prototype.onKeyUp=function(e){if(e.keyCode==t.Dictionary.keyCodes.shift)this.shiftIsDown=!1;else if(e.keyCode==t.Dictionary.keyCodes.up)e.preventDefault(),this.active&&!this.controlElements.focus&&this.controlElements.focusFrom("bottom");else if(e.keyCode==t.Dictionary.keyCodes.down)e.preventDefault(),this.active&&!this.controlElements.focus&&this.controlElements.focusFrom("top");else if(e.keyCode==t.Dictionary.keyCodes.tab){for(var A=!1,n=e.target.parentNode;null!=n;){if(n===window.ConversationalForm.el){A=!0;break}n=n.parentNode}A||(e.preventDefault(),this.shiftIsDown&&this.controlElements.active?this.controlElements.setFocusOnElement(this.controlElements.length-1):this.setFocusOnInput())}if(!this.el.hasAttribute("disabled")){var o=this.getFlowDTO();if(e.keyCode==t.Dictionary.keyCodes.enter||e.keyCode==t.Dictionary.keyCodes.space)if(e.keyCode==t.Dictionary.keyCodes.enter&&this.active)e.preventDefault(),this.onEnterOrSubmitButtonSubmit();else if(e.keyCode==t.Dictionary.keyCodes.enter||e.keyCode==t.Dictionary.keyCodes.space){e.preventDefault();var i="group"==this.currentTag.type?this.currentTag.getGroupTagType():this.currentTag.type;if("select"==i||"checkbox"==i){var s=this.currentTag;"checkbox"==i||s.multipleChoice?this.active&&e.keyCode==t.Dictionary.keyCodes.enter?this.submitButton.click():(this.dispatchKeyChange(o,e.keyCode),this.active||(this.resetValue(),this.setFocusOnInput(),this.dispatchKeyChange(o,e.keyCode))):this.dispatchKeyChange(o,e.keyCode)}else"group"==this.currentTag.type&&this.dispatchKeyChange(o,e.keyCode)}else e.keyCode==t.Dictionary.keyCodes.space&&document.activeElement&&this.dispatchKeyChange(o,e.keyCode);else e.keyCode!=t.Dictionary.keyCodes.shift&&e.keyCode!=t.Dictionary.keyCodes.tab&&this.dispatchKeyChange(o,e.keyCode)}},A.prototype.dispatchKeyChange=function(e,A){t.ConversationalForm.illustrateFlow(this,"dispatch",t.UserInputEvents.KEY_CHANGE,e),document.dispatchEvent(new CustomEvent(t.UserInputEvents.KEY_CHANGE,{detail:{dto:e,keyCode:A,inputFieldActive:this.active}}))},A.prototype.windowFocus=function(t){A.preventAutoFocus||this.setFocusOnInput()},A.prototype.onInputFocus=function(t){this.controlElements.active&&this.controlElements.setFocusOnElement(-1)},A.prototype.setFocusOnInput=function(){this.inputElement.focus()},A.prototype.onEnterOrSubmitButtonSubmit=function(){"file"==this.currentTag.type?this.controlElements.getElement(0).triggerFileSelect():this.doSubmit()},A.prototype.doSubmit=function(){var e=this.getFlowDTO();this.disabled=!0,this.el.removeAttribute("error"),this.inputElement.setAttribute("data-value",""),t.ConversationalForm.illustrateFlow(this,"dispatch",t.UserInputEvents.SUBMIT,e),document.dispatchEvent(new CustomEvent(t.UserInputEvents.SUBMIT,{detail:e}))},A.prototype.resetValue=function(){this.inputElement.value=""},A.prototype.dealloc=function(){this.inputElement.removeEventListener("focus",this.onInputFocusCallback,!1),this.onInputFocusCallback=null,window.removeEventListener("focus",this.windowFocusCallback,!1),this.windowFocusCallback=null,document.removeEventListener("keydown",this.keyDownCallback,!1),this.keyDownCallback=null,document.removeEventListener("keyup",this.keyUpCallback,!1),this.keyUpCallback=null,document.removeEventListener(t.FlowEvents.FLOW_UPDATE,this.flowUpdateCallback,!1),this.flowUpdateCallback=null,document.removeEventListener(t.FlowEvents.USER_INPUT_INVALID,this.inputInvalidCallback,!1),this.inputInvalidCallback=null,document.removeEventListener(t.ControlElementEvents.SUBMIT_VALUE,this.onControlElementSubmitCallback,!1),this.onControlElementSubmitCallback=null,this.submitButton=this.el.getElementsByClassName("cf-input-button")[0],this.submitButton.removeEventListener("click",this.onSubmitButtonClickCallback,!1),this.onSubmitButtonClickCallback=null,e.prototype.dealloc.call(this)},A.prototype.getTemplate=function(){return'<cf-input>\n\t\t\t\t<cf-input-control-elements>\n\t\t\t\t\t<cf-list-button direction="prev">\n\t\t\t\t\t</cf-list-button>\n\t\t\t\t\t<cf-list-button direction="next">\n\t\t\t\t\t</cf-list-button>\n\t\t\t\t\t<cf-list>\n\t\t\t\t\t\t<cf-info></cf-info>\n\t\t\t\t\t</cf-list>\n\t\t\t\t</cf-input-control-elements>\n\n\t\t\t\t<cf-input-button class="cf-input-button">\n\t\t\t\t\t<svg class="cf-icon-progress" viewBox="0 0 24 22" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g fill="#B9BCBE"><polygon transform="translate(12.257339, 11.185170) rotate(90.000000) translate(-12.257339, -11.185170) " points="10.2587994 9.89879989 14.2722074 5.85954869 12.4181046 3.92783101 5.07216899 11.1851701 12.4181046 18.4425091 14.2722074 16.5601737 10.2587994 12.5405503 19.4425091 12.5405503 19.4425091 9.89879989"></polygon></g></g></svg>\n\n\t\t\t\t\t<svg class="cf-icon-attachment" viewBox="0 0 24 22" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g><g transform="translate(-1226.000000, -1427.000000)"><g transform="translate(738.000000, 960.000000)"><g transform="translate(6.000000, 458.000000)"><path stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" d="M499,23.1092437 L499,18.907563 C499,16.2016807 496.756849,14 494,14 C491.243151,14 489,16.2016807 489,18.907563 L489,24.5042017 C489,26.4369748 490.592466,28 492.561644,28 C494.530822,28 496.123288,26.4369748 496.123288,24.5042017 L496.123288,18.907563 C496.140411,17.7478992 495.181507,16.8067227 494,16.8067227 C492.818493,16.8067227 491.859589,17.7478992 491.859589,18.907563 L491.859589,23.1092437" id="Icon"></path></g></g></g></g></svg>\n\t\t\t\t</cf-input-button>\n\n\t\t\t\t<input type=\'text\' tabindex="1" class="cf-main-input-box">\n\n\t\t\t</cf-input>\n\t\t\t'},A.preventAutoFocus=!1,A.ERROR_TIME=2e3,A}(t.BasicElement);t.UserInput=e}(cf||(cf={}));var __extends=this&&this.__extends||function(t,e){function A(){this.constructor=t}for(var n in e)e.hasOwnProperty(n)&&(t[n]=e[n]);t.prototype=null===e?Object.create(e):(A.prototype=e.prototype,new A)},cf;!function(t){t.ChatResponseEvents={AI_QUESTION_ASKED:"cf-on-ai-asked-question"};var e=function(e){function A(t){e.call(this,t),this.simulateThinking=!1,this.tag=t.tag}return __extends(A,e),Object.defineProperty(A.prototype,"visible",{set:function(t){t?this.el.classList.add("show"):this.el.classList.remove("show")},enumerable:!0,configurable:!0}),A.prototype.setValue=function(e){void 0===e&&(e=null),this.response=e?e.text:"",this.processResponse();var A=this.el.getElementsByTagName("text")[0];if(this.response&&0!=this.response.length){if(A.innerHTML=this.response,A.setAttribute("value-added",""),A.removeAttribute("thinking"),e.controlElements&&e.controlElements[0])switch(e.controlElements[0].type){case"UploadFileUI":A.classList.add("file-icon");var n=document.createElement("span");n.innerHTML=t.Dictionary.get("icon-type-file"),A.insertBefore(n.children[0],A.firstChild)}this.visible||(this.visible=!0),this.isAIReponse&&(t.ConversationalForm.illustrateFlow(this,"dispatch",t.ChatResponseEvents.AI_QUESTION_ASKED,this.response),document.dispatchEvent(new CustomEvent(t.ChatResponseEvents.AI_QUESTION_ASKED,{detail:this})))}else A.setAttribute("thinking","")},A.prototype.processResponse=function(){if(this.response=t.Helpers.emojify(this.response),"password"==this.tag.type&&!this.isAIReponse){for(var e="",A=0;A<this.response.length;A++)e+="*";this.response=e}},A.prototype.setData=function(A){var n=this;this.image=A.image,this.response="",this.isAIReponse=A.isAIReponse,e.prototype.setData.call(this,A),setTimeout(function(){if(n.visible=n.isAIReponse||n.response&&n.response.length>0,n.setValue(),n.isAIReponse){var e=0;n.simulateThinking&&(e=t.Helpers.lerp(Math.random(),500,900)),setTimeout(function(){return n.setValue({text:A.response})},e)}else setTimeout(function(){return n.el.classList.add("peak-thumb")},1400)},0)},A.prototype.getTemplate=function(){return'<cf-chat-response>\n\t\t\t\t<thumb style="background-image: url('+this.image+')"></thumb>\n\t\t\t\t<text>'+(this.response?this.response:"<thinking><span>.</span><span>.</span><span>.</span></thinking>")+"</text>\n\t\t\t</cf-chat-response>"},A}(t.BasicElement);t.ChatResponse=e}(cf||(cf={}));var __extends=this&&this.__extends||function(t,e){function A(){this.constructor=t}for(var n in e)e.hasOwnProperty(n)&&(t[n]=e[n]);t.prototype=null===e?Object.create(e):(A.prototype=e.prototype,new A)},cf;!function(t){var e=function(e){function A(A){e.call(this,A),this.flowUpdateCallback=this.onFlowUpdate.bind(this),document.addEventListener(t.FlowEvents.FLOW_UPDATE,this.flowUpdateCallback,!1),this.userInputUpdateCallback=this.onUserInputUpdate.bind(this),document.addEventListener(t.FlowEvents.USER_INPUT_UPDATE,this.userInputUpdateCallback,!1),this.onInputKeyChangeCallback=this.onInputKeyChange.bind(this),document.addEventListener(t.UserInputEvents.KEY_CHANGE,this.onInputKeyChangeCallback,!1),this.onControlElementsAddedToUserInputCallback=this.onControlElementsAddedToUserInput.bind(this),document.addEventListener(t.UserInputEvents.CONTROL_ELEMENTS_ADDED,this.onControlElementsAddedToUserInputCallback,!1)}return __extends(A,e),A.prototype.onControlElementsAddedToUserInput=function(t){var e=t.detail,A=30;this.el.style.paddingBottom=e.height+A+"px"},A.prototype.onInputKeyChange=function(e){var A=e.detail.dto;if(t.ConversationalForm.illustrateFlow(this,"receive",e.type,A),this.currentResponse){var n=A.text||A.input.getInputValue();n&&0!=n.length?this.currentResponse.visible||(this.currentResponse.visible=!0):this.currentResponse.visible=!1}},A.prototype.onUserInputUpdate=function(e){if(t.ConversationalForm.illustrateFlow(this,"receive",e.type,e.detail),!this.currentResponse)throw new Error("No current response ..?");var A=e.detail;this.flowDTOFromUserInputUpdate=A},A.prototype.onFlowUpdate=function(e){t.ConversationalForm.illustrateFlow(this,"receive",e.type,e.detail);var A=e.detail;this.flowDTOFromUserInputUpdate&&(this.flowDTOFromUserInputUpdate.text||(this.flowDTOFromUserInputUpdate.text=t.Dictionary.get("user-reponse-missing")),this.currentResponse.setValue(this.flowDTOFromUserInputUpdate));var n=t.Dictionary.getAIResponse("thumb"),o="";o=A.question,this.flowDTOFromUserInputUpdate&&(o=o.split("{previous-answer}").join(this.flowDTOFromUserInputUpdate.text)),this.createResponse(!0,A,o,n),this.createResponse(!1,A)},A.prototype.createResponse=function(e,A,n,o){void 0===n&&(n=null),void 0===o&&(o=t.Dictionary.get("user-image")),this.currentResponse=new t.ChatResponse({tag:A,isAIReponse:e,response:n,image:o}),this.el.appendChild(this.currentResponse.el)},A.prototype.getTemplate=function(){return"<cf-chat type='pluto'>\n\t\t\t\t\t</cf-chat>"},A.prototype.dealloc=function(){document.removeEventListener(t.FlowEvents.FLOW_UPDATE,this.flowUpdateCallback,!1),this.flowUpdateCallback=null,document.removeEventListener(t.FlowEvents.USER_INPUT_UPDATE,this.userInputUpdateCallback,!1),this.userInputUpdateCallback=null,document.removeEventListener(t.UserInputEvents.KEY_CHANGE,this.onInputKeyChangeCallback,!1),this.onInputKeyChangeCallback=null,document.removeEventListener(t.UserInputEvents.CONTROL_ELEMENTS_ADDED,this.onControlElementsAddedToUserInputCallback,!1),this.onControlElementsAddedToUserInputCallback=null,e.prototype.dealloc.call(this)},A}(t.BasicElement);t.ChatList=e}(cf||(cf={}));var cf;!function(t){t.FlowEvents={USER_INPUT_UPDATE:"cf-flow-user-input-update",USER_INPUT_INVALID:"cf-flow-user-input-invalid",FLOW_UPDATE:"cf-flow-update"};var e=function(){function e(e){this.maxSteps=0,this.step=0,this.stepTimer=0,this.cuiReference=e.cuiReference,this.tags=e.tags,this.maxSteps=this.tags.length,this.userInputSubmitCallback=this.userInputSubmit.bind(this),document.addEventListener(t.UserInputEvents.SUBMIT,this.userInputSubmitCallback,!1)}return Object.defineProperty(e.prototype,"currentTag",{get:function(){return this.tags[this.step]},enumerable:!0,configurable:!0}),e.prototype.userInputSubmit=function(e){var A=this;t.ConversationalForm.illustrateFlow(this,"receive",e.type,e.detail);var n=e.detail;this.currentTag.setTagValueAndIsValid(n)?(t.ConversationalForm.illustrateFlow(this,"dispatch",t.FlowEvents.USER_INPUT_UPDATE,n),n=n.input.getFlowDTO(),document.dispatchEvent(new CustomEvent(t.FlowEvents.USER_INPUT_UPDATE,{detail:n})),setTimeout(function(){return A.nextStep()},250)):(t.ConversationalForm.illustrateFlow(this,"dispatch",t.FlowEvents.USER_INPUT_INVALID,n),document.dispatchEvent(new CustomEvent(t.FlowEvents.USER_INPUT_INVALID,{detail:n})))},e.prototype.start=function(){this.validateStepAndUpdate()},e.prototype.nextStep=function(){this.step++,this.validateStepAndUpdate()},e.prototype.previousStep=function(){this.step--,this.validateStepAndUpdate()},e.prototype.addStep=function(){},e.prototype.dealloc=function(){document.removeEventListener(t.UserInputEvents.SUBMIT,this.userInputSubmitCallback,!1),this.userInputSubmitCallback=null},e.prototype.validateStepAndUpdate=function(){this.step==this.maxSteps?this.cuiReference.doSubmitForm():(this.step%=this.maxSteps,this.showStep())},e.prototype.showStep=function(){t.ConversationalForm.illustrateFlow(this,"dispatch",t.FlowEvents.FLOW_UPDATE,this.currentTag),document.dispatchEvent(new CustomEvent(t.FlowEvents.FLOW_UPDATE,{detail:this.currentTag}))},e.STEP_TIME=1e3,e}();t.FlowManager=e}(cf||(cf={}));
/*
Turbolinks 5.0.0
Copyright © 2016 Basecamp, LLC
 */

(function(){(function(){(function(){this.Turbolinks={supported:function(){return null!=window.history.pushState&&null!=window.requestAnimationFrame}(),visit:function(e,r){return t.controller.visit(e,r)},clearCache:function(){return t.controller.clearCache()}}}).call(this)}).call(this);var t=this.Turbolinks;(function(){(function(){var e,r;t.copyObject=function(t){var e,r,n;r={};for(e in t)n=t[e],r[e]=n;return r},t.closest=function(t,r){return e.call(t,r)},e=function(){var t,e;return t=document.documentElement,null!=(e=t.closest)?e:function(t){var e;for(e=this;e;){if(e.nodeType===Node.ELEMENT_NODE&&r.call(e,t))return e;e=e.parentNode}}}(),t.defer=function(t){return setTimeout(t,1)},t.dispatch=function(t,e){var r,n,o,i,s;return i=null!=e?e:{},s=i.target,r=i.cancelable,n=i.data,o=document.createEvent("Events"),o.initEvent(t,!0,r===!0),o.data=null!=n?n:{},(null!=s?s:document).dispatchEvent(o),o},t.match=function(t,e){return r.call(t,e)},r=function(){var t,e,r,n;return t=document.documentElement,null!=(e=null!=(r=null!=(n=t.matchesSelector)?n:t.webkitMatchesSelector)?r:t.msMatchesSelector)?e:t.mozMatchesSelector}(),t.uuid=function(){var t,e,r;for(r="",t=e=1;36>=e;t=++e)r+=9===t||14===t||19===t||24===t?"-":15===t?"4":20===t?(Math.floor(4*Math.random())+8).toString(16):Math.floor(15*Math.random()).toString(16);return r}}).call(this),function(){t.Location=function(){function t(t){var e,r;null==t&&(t=""),r=document.createElement("a"),r.href=t.toString(),this.absoluteURL=r.href,e=r.hash.length,2>e?this.requestURL=this.absoluteURL:(this.requestURL=this.absoluteURL.slice(0,-e),this.anchor=r.hash.slice(1))}var e,r,n,o;return t.wrap=function(t){return t instanceof this?t:new this(t)},t.prototype.getOrigin=function(){return this.absoluteURL.split("/",3).join("/")},t.prototype.getPath=function(){var t,e;return null!=(t=null!=(e=this.absoluteURL.match(/\/\/[^\/]*(\/[^?;]*)/))?e[1]:void 0)?t:"/"},t.prototype.getPathComponents=function(){return this.getPath().split("/").slice(1)},t.prototype.getLastPathComponent=function(){return this.getPathComponents().slice(-1)[0]},t.prototype.getExtension=function(){var t,e;return null!=(t=null!=(e=this.getLastPathComponent().match(/\.[^.]*$/))?e[0]:void 0)?t:""},t.prototype.isHTML=function(){return this.getExtension().match(/^(?:|\.(?:htm|html|xhtml))$/)},t.prototype.isPrefixedBy=function(t){var e;return e=r(t),this.isEqualTo(t)||o(this.absoluteURL,e)},t.prototype.isEqualTo=function(t){return this.absoluteURL===(null!=t?t.absoluteURL:void 0)},t.prototype.toCacheKey=function(){return this.requestURL},t.prototype.toJSON=function(){return this.absoluteURL},t.prototype.toString=function(){return this.absoluteURL},t.prototype.valueOf=function(){return this.absoluteURL},r=function(t){return e(t.getOrigin()+t.getPath())},e=function(t){return n(t,"/")?t:t+"/"},o=function(t,e){return t.slice(0,e.length)===e},n=function(t,e){return t.slice(-e.length)===e},t}()}.call(this),function(){var e=function(t,e){return function(){return t.apply(e,arguments)}};t.HttpRequest=function(){function r(r,n,o){this.delegate=r,this.requestCanceled=e(this.requestCanceled,this),this.requestTimedOut=e(this.requestTimedOut,this),this.requestFailed=e(this.requestFailed,this),this.requestLoaded=e(this.requestLoaded,this),this.requestProgressed=e(this.requestProgressed,this),this.url=t.Location.wrap(n).requestURL,this.referrer=t.Location.wrap(o).absoluteURL,this.createXHR()}return r.NETWORK_FAILURE=0,r.TIMEOUT_FAILURE=-1,r.timeout=60,r.prototype.send=function(){var t;return this.xhr&&!this.sent?(this.notifyApplicationBeforeRequestStart(),this.setProgress(0),this.xhr.send(),this.sent=!0,"function"==typeof(t=this.delegate).requestStarted?t.requestStarted():void 0):void 0},r.prototype.cancel=function(){return this.xhr&&this.sent?this.xhr.abort():void 0},r.prototype.requestProgressed=function(t){return t.lengthComputable?this.setProgress(t.loaded/t.total):void 0},r.prototype.requestLoaded=function(){return this.endRequest(function(t){return function(){var e;return 200<=(e=t.xhr.status)&&300>e?t.delegate.requestCompletedWithResponse(t.xhr.responseText,t.xhr.getResponseHeader("Turbolinks-Location")):(t.failed=!0,t.delegate.requestFailedWithStatusCode(t.xhr.status,t.xhr.responseText))}}(this))},r.prototype.requestFailed=function(){return this.endRequest(function(t){return function(){return t.failed=!0,t.delegate.requestFailedWithStatusCode(t.constructor.NETWORK_FAILURE)}}(this))},r.prototype.requestTimedOut=function(){return this.endRequest(function(t){return function(){return t.failed=!0,t.delegate.requestFailedWithStatusCode(t.constructor.TIMEOUT_FAILURE)}}(this))},r.prototype.requestCanceled=function(){return this.endRequest()},r.prototype.notifyApplicationBeforeRequestStart=function(){return t.dispatch("turbolinks:request-start",{data:{url:this.url,xhr:this.xhr}})},r.prototype.notifyApplicationAfterRequestEnd=function(){return t.dispatch("turbolinks:request-end",{data:{url:this.url,xhr:this.xhr}})},r.prototype.createXHR=function(){return this.xhr=new XMLHttpRequest,this.xhr.open("GET",this.url,!0),this.xhr.timeout=1e3*this.constructor.timeout,this.xhr.setRequestHeader("Accept","text/html, application/xhtml+xml"),this.xhr.setRequestHeader("Turbolinks-Referrer",this.referrer),this.xhr.onprogress=this.requestProgressed,this.xhr.onload=this.requestLoaded,this.xhr.onerror=this.requestFailed,this.xhr.ontimeout=this.requestTimedOut,this.xhr.onabort=this.requestCanceled},r.prototype.endRequest=function(t){return this.xhr?(this.notifyApplicationAfterRequestEnd(),null!=t&&t.call(this),this.destroy()):void 0},r.prototype.setProgress=function(t){var e;return this.progress=t,"function"==typeof(e=this.delegate).requestProgressed?e.requestProgressed(this.progress):void 0},r.prototype.destroy=function(){var t;return this.setProgress(1),"function"==typeof(t=this.delegate).requestFinished&&t.requestFinished(),this.delegate=null,this.xhr=null},r}()}.call(this),function(){var e=function(t,e){return function(){return t.apply(e,arguments)}};t.ProgressBar=function(){function t(){this.trickle=e(this.trickle,this),this.stylesheetElement=this.createStylesheetElement(),this.progressElement=this.createProgressElement()}var r;return r=300,t.defaultCSS=".turbolinks-progress-bar {\n  position: fixed;\n  display: block;\n  top: 0;\n  left: 0;\n  height: 3px;\n  background: #0076ff;\n  z-index: 9999;\n  transition: width "+r+"ms ease-out, opacity "+r/2+"ms "+r/2+"ms ease-in;\n  transform: translate3d(0, 0, 0);\n}",t.prototype.show=function(){return this.visible?void 0:(this.visible=!0,this.installStylesheetElement(),this.installProgressElement(),this.startTrickling())},t.prototype.hide=function(){return this.visible&&!this.hiding?(this.hiding=!0,this.fadeProgressElement(function(t){return function(){return t.uninstallProgressElement(),t.stopTrickling(),t.visible=!1,t.hiding=!1}}(this))):void 0},t.prototype.setValue=function(t){return this.value=t,this.refresh()},t.prototype.installStylesheetElement=function(){return document.head.insertBefore(this.stylesheetElement,document.head.firstChild)},t.prototype.installProgressElement=function(){return this.progressElement.style.width=0,this.progressElement.style.opacity=1,document.documentElement.insertBefore(this.progressElement,document.body),this.refresh()},t.prototype.fadeProgressElement=function(t){return this.progressElement.style.opacity=0,setTimeout(t,1.5*r)},t.prototype.uninstallProgressElement=function(){return this.progressElement.parentNode?document.documentElement.removeChild(this.progressElement):void 0},t.prototype.startTrickling=function(){return null!=this.trickleInterval?this.trickleInterval:this.trickleInterval=setInterval(this.trickle,r)},t.prototype.stopTrickling=function(){return clearInterval(this.trickleInterval),this.trickleInterval=null},t.prototype.trickle=function(){return this.setValue(this.value+Math.random()/100)},t.prototype.refresh=function(){return requestAnimationFrame(function(t){return function(){return t.progressElement.style.width=10+90*t.value+"%"}}(this))},t.prototype.createStylesheetElement=function(){var t;return t=document.createElement("style"),t.type="text/css",t.textContent=this.constructor.defaultCSS,t},t.prototype.createProgressElement=function(){var t;return t=document.createElement("div"),t.className="turbolinks-progress-bar",t},t}()}.call(this),function(){var e=function(t,e){return function(){return t.apply(e,arguments)}};t.BrowserAdapter=function(){function r(r){this.controller=r,this.showProgressBar=e(this.showProgressBar,this),this.progressBar=new t.ProgressBar}var n,o,i,s;return s=t.HttpRequest,n=s.NETWORK_FAILURE,i=s.TIMEOUT_FAILURE,o=500,r.prototype.visitProposedToLocationWithAction=function(t,e){return this.controller.startVisitToLocationWithAction(t,e)},r.prototype.visitStarted=function(t){return t.issueRequest(),t.changeHistory(),t.loadCachedSnapshot()},r.prototype.visitRequestStarted=function(t){return this.progressBar.setValue(0),t.hasCachedSnapshot()||"restore"!==t.action?this.showProgressBarAfterDelay():this.showProgressBar()},r.prototype.visitRequestProgressed=function(t){return this.progressBar.setValue(t.progress)},r.prototype.visitRequestCompleted=function(t){return t.loadResponse()},r.prototype.visitRequestFailedWithStatusCode=function(t,e){switch(e){case n:case i:return this.reload();default:return t.loadResponse()}},r.prototype.visitRequestFinished=function(t){return this.hideProgressBar()},r.prototype.visitCompleted=function(t){return t.followRedirect()},r.prototype.pageInvalidated=function(){return this.reload()},r.prototype.showProgressBarAfterDelay=function(){return this.progressBarTimeout=setTimeout(this.showProgressBar,o)},r.prototype.showProgressBar=function(){return this.progressBar.show()},r.prototype.hideProgressBar=function(){return this.progressBar.hide(),clearTimeout(this.progressBarTimeout)},r.prototype.reload=function(){return window.location.reload()},r}()}.call(this),function(){var e,r=function(t,e){return function(){return t.apply(e,arguments)}};e=!1,addEventListener("load",function(){return t.defer(function(){return e=!0})},!1),t.History=function(){function n(t){this.delegate=t,this.onPopState=r(this.onPopState,this)}return n.prototype.start=function(){return this.started?void 0:(addEventListener("popstate",this.onPopState,!1),this.started=!0)},n.prototype.stop=function(){return this.started?(removeEventListener("popstate",this.onPopState,!1),this.started=!1):void 0},n.prototype.push=function(e,r){return e=t.Location.wrap(e),this.update("push",e,r)},n.prototype.replace=function(e,r){return e=t.Location.wrap(e),this.update("replace",e,r)},n.prototype.onPopState=function(e){var r,n,o,i;return this.shouldHandlePopState()&&(i=null!=(n=e.state)?n.turbolinks:void 0)?(r=t.Location.wrap(window.location),o=i.restorationIdentifier,this.delegate.historyPoppedToLocationWithRestorationIdentifier(r,o)):void 0},n.prototype.shouldHandlePopState=function(){return e===!0},n.prototype.update=function(t,e,r){var n;return n={turbolinks:{restorationIdentifier:r}},history[t+"State"](n,null,e)},n}()}.call(this),function(){t.Snapshot=function(){function e(t){var e,r;r=t.head,e=t.body,this.head=null!=r?r:document.createElement("head"),this.body=null!=e?e:document.createElement("body")}return e.wrap=function(t){return t instanceof this?t:this.fromHTML(t)},e.fromHTML=function(t){var e;return e=document.createElement("html"),e.innerHTML=t,this.fromElement(e)},e.fromElement=function(t){return new this({head:t.querySelector("head"),body:t.querySelector("body")})},e.prototype.clone=function(){return new e({head:this.head.cloneNode(!0),body:this.body.cloneNode(!0)})},e.prototype.getRootLocation=function(){var e,r;return r=null!=(e=this.getSetting("root"))?e:"/",new t.Location(r)},e.prototype.getCacheControlValue=function(){return this.getSetting("cache-control")},e.prototype.hasAnchor=function(t){try{return null!=this.body.querySelector("[id='"+t+"']")}catch(e){}},e.prototype.isPreviewable=function(){return"no-preview"!==this.getCacheControlValue()},e.prototype.isCacheable=function(){return"no-cache"!==this.getCacheControlValue()},e.prototype.getSetting=function(t){var e,r;return r=this.head.querySelectorAll("meta[name='turbolinks-"+t+"']"),e=r[r.length-1],null!=e?e.getAttribute("content"):void 0},e}()}.call(this),function(){var e=[].slice;t.Renderer=function(){function t(){}var r;return t.render=function(){var t,r,n,o;return n=arguments[0],r=arguments[1],t=3<=arguments.length?e.call(arguments,2):[],o=function(t,e,r){r.prototype=t.prototype;var n=new r,o=t.apply(n,e);return Object(o)===o?o:n}(this,t,function(){}),o.delegate=n,o.render(r),o},t.prototype.renderView=function(t){return this.delegate.viewWillRender(this.newBody),t(),this.delegate.viewRendered(this.newBody)},t.prototype.invalidateView=function(){return this.delegate.viewInvalidated()},t.prototype.createScriptElement=function(t){var e;return"false"===t.getAttribute("data-turbolinks-eval")?t:(e=document.createElement("script"),e.textContent=t.textContent,r(e,t),e)},r=function(t,e){var r,n,o,i,s,a,u;for(i=e.attributes,a=[],r=0,n=i.length;n>r;r++)s=i[r],o=s.name,u=s.value,a.push(t.setAttribute(o,u));return a},t}()}.call(this),function(){t.HeadDetails=function(){function t(t){var e,r,i,s,a,u,c;for(this.element=t,this.elements={},c=this.element.childNodes,s=0,u=c.length;u>s;s++)i=c[s],i.nodeType===Node.ELEMENT_NODE&&(a=i.outerHTML,r=null!=(e=this.elements)[a]?e[a]:e[a]={type:o(i),tracked:n(i),elements:[]},r.elements.push(i))}var e,r,n,o;return t.prototype.hasElementWithKey=function(t){return t in this.elements},t.prototype.getTrackedElementSignature=function(){var t,e;return function(){var r,n;r=this.elements,n=[];for(t in r)e=r[t].tracked,e&&n.push(t);return n}.call(this).join("")},t.prototype.getScriptElementsNotInDetails=function(t){return this.getElementsMatchingTypeNotInDetails("script",t)},t.prototype.getStylesheetElementsNotInDetails=function(t){return this.getElementsMatchingTypeNotInDetails("stylesheet",t)},t.prototype.getElementsMatchingTypeNotInDetails=function(t,e){var r,n,o,i,s,a;o=this.elements,s=[];for(n in o)i=o[n],a=i.type,r=i.elements,a!==t||e.hasElementWithKey(n)||s.push(r[0]);return s},t.prototype.getProvisionalElements=function(){var t,e,r,n,o,i,s;r=[],n=this.elements;for(e in n)o=n[e],s=o.type,i=o.tracked,t=o.elements,null!=s||i?t.length>1&&r.push.apply(r,t.slice(1)):r.push.apply(r,t);return r},o=function(t){return e(t)?"script":r(t)?"stylesheet":void 0},n=function(t){return"reload"===t.getAttribute("data-turbolinks-track")},e=function(t){var e;return e=t.tagName.toLowerCase(),"script"===e},r=function(t){var e;return e=t.tagName.toLowerCase(),"style"===e||"link"===e&&"stylesheet"===t.getAttribute("rel")},t}()}.call(this),function(){var e=function(t,e){function n(){this.constructor=t}for(var o in e)r.call(e,o)&&(t[o]=e[o]);return n.prototype=e.prototype,t.prototype=new n,t.__super__=e.prototype,t},r={}.hasOwnProperty;t.SnapshotRenderer=function(r){function n(e,r){this.currentSnapshot=e,this.newSnapshot=r,this.currentHeadDetails=new t.HeadDetails(this.currentSnapshot.head),this.newHeadDetails=new t.HeadDetails(this.newSnapshot.head),this.newBody=this.newSnapshot.body}return e(n,r),n.prototype.render=function(t){return this.trackedElementsAreIdentical()?(this.mergeHead(),this.renderView(function(e){return function(){return e.replaceBody(),e.focusFirstAutofocusableElement(),t()}}(this))):this.invalidateView()},n.prototype.mergeHead=function(){return this.copyNewHeadStylesheetElements(),this.copyNewHeadScriptElements(),this.removeCurrentHeadProvisionalElements(),this.copyNewHeadProvisionalElements()},n.prototype.replaceBody=function(){return this.activateBodyScriptElements(),this.importBodyPermanentElements(),this.assignNewBody()},n.prototype.trackedElementsAreIdentical=function(){return this.currentHeadDetails.getTrackedElementSignature()===this.newHeadDetails.getTrackedElementSignature()},n.prototype.copyNewHeadStylesheetElements=function(){var t,e,r,n,o;for(n=this.getNewHeadStylesheetElements(),o=[],e=0,r=n.length;r>e;e++)t=n[e],o.push(document.head.appendChild(t));return o},n.prototype.copyNewHeadScriptElements=function(){var t,e,r,n,o;for(n=this.getNewHeadScriptElements(),o=[],e=0,r=n.length;r>e;e++)t=n[e],o.push(document.head.appendChild(this.createScriptElement(t)));return o},n.prototype.removeCurrentHeadProvisionalElements=function(){var t,e,r,n,o;for(n=this.getCurrentHeadProvisionalElements(),o=[],e=0,r=n.length;r>e;e++)t=n[e],o.push(document.head.removeChild(t));return o},n.prototype.copyNewHeadProvisionalElements=function(){var t,e,r,n,o;for(n=this.getNewHeadProvisionalElements(),o=[],e=0,r=n.length;r>e;e++)t=n[e],o.push(document.head.appendChild(t));return o},n.prototype.importBodyPermanentElements=function(){var t,e,r,n,o,i;for(n=this.getNewBodyPermanentElements(),i=[],e=0,r=n.length;r>e;e++)o=n[e],(t=this.findCurrentBodyPermanentElement(o))?i.push(o.parentNode.replaceChild(t,o)):i.push(void 0);return i},n.prototype.activateBodyScriptElements=function(){var t,e,r,n,o,i;for(n=this.getNewBodyScriptElements(),i=[],e=0,r=n.length;r>e;e++)o=n[e],t=this.createScriptElement(o),i.push(o.parentNode.replaceChild(t,o));return i},n.prototype.assignNewBody=function(){return document.body=this.newBody},n.prototype.focusFirstAutofocusableElement=function(){var t;return null!=(t=this.findFirstAutofocusableElement())?t.focus():void 0},n.prototype.getNewHeadStylesheetElements=function(){return this.newHeadDetails.getStylesheetElementsNotInDetails(this.currentHeadDetails)},n.prototype.getNewHeadScriptElements=function(){return this.newHeadDetails.getScriptElementsNotInDetails(this.currentHeadDetails)},n.prototype.getCurrentHeadProvisionalElements=function(){return this.currentHeadDetails.getProvisionalElements()},n.prototype.getNewHeadProvisionalElements=function(){return this.newHeadDetails.getProvisionalElements()},n.prototype.getNewBodyPermanentElements=function(){return this.newBody.querySelectorAll("[id][data-turbolinks-permanent]")},n.prototype.findCurrentBodyPermanentElement=function(t){return document.body.querySelector("#"+t.id+"[data-turbolinks-permanent]")},n.prototype.getNewBodyScriptElements=function(){return this.newBody.querySelectorAll("script")},n.prototype.findFirstAutofocusableElement=function(){return document.body.querySelector("[autofocus]")},n}(t.Renderer)}.call(this),function(){var e=function(t,e){function n(){this.constructor=t}for(var o in e)r.call(e,o)&&(t[o]=e[o]);return n.prototype=e.prototype,t.prototype=new n,t.__super__=e.prototype,t},r={}.hasOwnProperty;t.ErrorRenderer=function(t){function r(t){this.html=t}return e(r,t),r.prototype.render=function(t){return this.renderView(function(e){return function(){return e.replaceDocumentHTML(),e.activateBodyScriptElements(),t()}}(this))},r.prototype.replaceDocumentHTML=function(){return document.documentElement.innerHTML=this.html},r.prototype.activateBodyScriptElements=function(){var t,e,r,n,o,i;for(n=this.getScriptElements(),i=[],e=0,r=n.length;r>e;e++)o=n[e],t=this.createScriptElement(o),i.push(o.parentNode.replaceChild(t,o));return i},r.prototype.getScriptElements=function(){return document.documentElement.querySelectorAll("script")},r}(t.Renderer)}.call(this),function(){t.View=function(){function e(t){this.delegate=t,this.element=document.documentElement}return e.prototype.getRootLocation=function(){return this.getSnapshot().getRootLocation()},e.prototype.getSnapshot=function(){return t.Snapshot.fromElement(this.element)},e.prototype.render=function(t,e){var r,n,o;return o=t.snapshot,r=t.error,n=t.isPreview,this.markAsPreview(n),null!=o?this.renderSnapshot(o,e):this.renderError(r,e)},e.prototype.markAsPreview=function(t){return t?this.element.setAttribute("data-turbolinks-preview",""):this.element.removeAttribute("data-turbolinks-preview")},e.prototype.renderSnapshot=function(e,r){return t.SnapshotRenderer.render(this.delegate,r,this.getSnapshot(),t.Snapshot.wrap(e))},e.prototype.renderError=function(e,r){return t.ErrorRenderer.render(this.delegate,r,e)},e}()}.call(this),function(){var e=function(t,e){return function(){return t.apply(e,arguments)}};t.ScrollManager=function(){function t(t){this.delegate=t,this.onScroll=e(this.onScroll,this)}return t.prototype.start=function(){return this.started?void 0:(addEventListener("scroll",this.onScroll,!1),this.onScroll(),this.started=!0)},t.prototype.stop=function(){return this.started?(removeEventListener("scroll",this.onScroll,!1),this.started=!1):void 0},t.prototype.scrollToElement=function(t){return t.scrollIntoView()},t.prototype.scrollToPosition=function(t){var e,r;return e=t.x,r=t.y,window.scrollTo(e,r)},t.prototype.onScroll=function(t){return this.updatePosition({x:window.pageXOffset,y:window.pageYOffset})},t.prototype.updatePosition=function(t){var e;return this.position=t,null!=(e=this.delegate)?e.scrollPositionChanged(this.position):void 0},t}()}.call(this),function(){t.SnapshotCache=function(){function e(t){this.size=t,this.keys=[],this.snapshots={}}var r;return e.prototype.has=function(t){var e;return e=r(t),e in this.snapshots},e.prototype.get=function(t){var e;if(this.has(t))return e=this.read(t),this.touch(t),e},e.prototype.put=function(t,e){return this.write(t,e),this.touch(t),e},e.prototype.read=function(t){var e;return e=r(t),this.snapshots[e]},e.prototype.write=function(t,e){var n;return n=r(t),this.snapshots[n]=e},e.prototype.touch=function(t){var e,n;return n=r(t),e=this.keys.indexOf(n),e>-1&&this.keys.splice(e,1),this.keys.unshift(n),this.trim()},e.prototype.trim=function(){var t,e,r,n,o;for(n=this.keys.splice(this.size),o=[],t=0,r=n.length;r>t;t++)e=n[t],o.push(delete this.snapshots[e]);return o},r=function(e){return t.Location.wrap(e).toCacheKey()},e}()}.call(this),function(){var e=function(t,e){return function(){return t.apply(e,arguments)}};t.Visit=function(){function r(r,n,o){this.controller=r,this.action=o,this.performScroll=e(this.performScroll,this),this.identifier=t.uuid(),this.location=t.Location.wrap(n),this.adapter=this.controller.adapter,this.state="initialized",this.timingMetrics={}}var n;return r.prototype.start=function(){return"initialized"===this.state?(this.recordTimingMetric("visitStart"),this.state="started",this.adapter.visitStarted(this)):void 0},r.prototype.cancel=function(){var t;return"started"===this.state?(null!=(t=this.request)&&t.cancel(),this.cancelRender(),this.state="canceled"):void 0},r.prototype.complete=function(){var t;return"started"===this.state?(this.recordTimingMetric("visitEnd"),this.state="completed","function"==typeof(t=this.adapter).visitCompleted&&t.visitCompleted(this),this.controller.visitCompleted(this)):void 0},r.prototype.fail=function(){var t;return"started"===this.state?(this.state="failed","function"==typeof(t=this.adapter).visitFailed?t.visitFailed(this):void 0):void 0},r.prototype.changeHistory=function(){var t,e;return this.historyChanged?void 0:(t=this.location.isEqualTo(this.referrer)?"replace":this.action,e=n(t),this.controller[e](this.location,this.restorationIdentifier),this.historyChanged=!0)},r.prototype.issueRequest=function(){return this.shouldIssueRequest()&&null==this.request?(this.progress=0,this.request=new t.HttpRequest(this,this.location,this.referrer),this.request.send()):void 0},r.prototype.getCachedSnapshot=function(){var t;return!(t=this.controller.getCachedSnapshotForLocation(this.location))||null!=this.location.anchor&&!t.hasAnchor(this.location.anchor)||"restore"!==this.action&&!t.isPreviewable()?void 0:t},r.prototype.hasCachedSnapshot=function(){return null!=this.getCachedSnapshot()},r.prototype.loadCachedSnapshot=function(){var t,e;return(e=this.getCachedSnapshot())?(t=this.shouldIssueRequest(),this.render(function(){var r;return this.cacheSnapshot(),this.controller.render({snapshot:e,isPreview:t},this.performScroll),"function"==typeof(r=this.adapter).visitRendered&&r.visitRendered(this),t?void 0:this.complete()})):void 0},r.prototype.loadResponse=function(){return null!=this.response?this.render(function(){var t,e;return this.cacheSnapshot(),this.request.failed?(this.controller.render({error:this.response},this.performScroll),"function"==typeof(t=this.adapter).visitRendered&&t.visitRendered(this),this.fail()):(this.controller.render({snapshot:this.response},this.performScroll),"function"==typeof(e=this.adapter).visitRendered&&e.visitRendered(this),this.complete())}):void 0},r.prototype.followRedirect=function(){return this.redirectedToLocation&&!this.followedRedirect?(this.location=this.redirectedToLocation,this.controller.replaceHistoryWithLocationAndRestorationIdentifier(this.redirectedToLocation,this.restorationIdentifier),this.followedRedirect=!0):void 0},r.prototype.requestStarted=function(){var t;return this.recordTimingMetric("requestStart"),"function"==typeof(t=this.adapter).visitRequestStarted?t.visitRequestStarted(this):void 0},r.prototype.requestProgressed=function(t){var e;return this.progress=t,"function"==typeof(e=this.adapter).visitRequestProgressed?e.visitRequestProgressed(this):void 0},r.prototype.requestCompletedWithResponse=function(e,r){return this.response=e,null!=r&&(this.redirectedToLocation=t.Location.wrap(r)),this.adapter.visitRequestCompleted(this)},r.prototype.requestFailedWithStatusCode=function(t,e){return this.response=e,this.adapter.visitRequestFailedWithStatusCode(this,t)},r.prototype.requestFinished=function(){var t;return this.recordTimingMetric("requestEnd"),"function"==typeof(t=this.adapter).visitRequestFinished?t.visitRequestFinished(this):void 0},r.prototype.performScroll=function(){return this.scrolled?void 0:("restore"===this.action?this.scrollToRestoredPosition()||this.scrollToTop():this.scrollToAnchor()||this.scrollToTop(),this.scrolled=!0)},r.prototype.scrollToRestoredPosition=function(){var t,e;return t=null!=(e=this.restorationData)?e.scrollPosition:void 0,null!=t?(this.controller.scrollToPosition(t),!0):void 0},r.prototype.scrollToAnchor=function(){return null!=this.location.anchor?(this.controller.scrollToAnchor(this.location.anchor),!0):void 0},r.prototype.scrollToTop=function(){return this.controller.scrollToPosition({x:0,y:0})},r.prototype.recordTimingMetric=function(t){var e;return null!=(e=this.timingMetrics)[t]?e[t]:e[t]=(new Date).getTime()},r.prototype.getTimingMetrics=function(){return t.copyObject(this.timingMetrics)},n=function(t){switch(t){case"replace":return"replaceHistoryWithLocationAndRestorationIdentifier";case"advance":case"restore":return"pushHistoryWithLocationAndRestorationIdentifier"}},r.prototype.shouldIssueRequest=function(){return"restore"===this.action?!this.hasCachedSnapshot():!0},r.prototype.cacheSnapshot=function(){return this.snapshotCached?void 0:(this.controller.cacheSnapshot(),this.snapshotCached=!0)},r.prototype.render=function(t){return this.cancelRender(),this.frame=requestAnimationFrame(function(e){return function(){return e.frame=null,t.call(e)}}(this))},r.prototype.cancelRender=function(){return this.frame?cancelAnimationFrame(this.frame):void 0},r}()}.call(this),function(){var e=function(t,e){return function(){return t.apply(e,arguments)}};t.Controller=function(){function r(){this.clickBubbled=e(this.clickBubbled,this),this.clickCaptured=e(this.clickCaptured,this),this.pageLoaded=e(this.pageLoaded,this),this.history=new t.History(this),this.view=new t.View(this),this.scrollManager=new t.ScrollManager(this),this.restorationData={},this.clearCache()}return r.prototype.start=function(){return t.supported&&!this.started?(addEventListener("click",this.clickCaptured,!0),addEventListener("DOMContentLoaded",this.pageLoaded,!1),this.scrollManager.start(),this.startHistory(),this.started=!0,this.enabled=!0):void 0},r.prototype.disable=function(){return this.enabled=!1},r.prototype.stop=function(){return this.started?(removeEventListener("click",this.clickCaptured,!0),removeEventListener("DOMContentLoaded",this.pageLoaded,!1),this.scrollManager.stop(),this.stopHistory(),this.started=!1):void 0},r.prototype.clearCache=function(){return this.cache=new t.SnapshotCache(10)},r.prototype.visit=function(e,r){var n,o;return null==r&&(r={}),e=t.Location.wrap(e),this.applicationAllowsVisitingLocation(e)?this.locationIsVisitable(e)?(n=null!=(o=r.action)?o:"advance",this.adapter.visitProposedToLocationWithAction(e,n)):window.location=e:void 0},r.prototype.startVisitToLocationWithAction=function(e,r,n){var o;return t.supported?(o=this.getRestorationDataForIdentifier(n),this.startVisit(e,r,{restorationData:o})):window.location=e},r.prototype.startHistory=function(){return this.location=t.Location.wrap(window.location),this.restorationIdentifier=t.uuid(),this.history.start(),this.history.replace(this.location,this.restorationIdentifier)},r.prototype.stopHistory=function(){return this.history.stop()},r.prototype.pushHistoryWithLocationAndRestorationIdentifier=function(e,r){return this.restorationIdentifier=r,this.location=t.Location.wrap(e),this.history.push(this.location,this.restorationIdentifier)},r.prototype.replaceHistoryWithLocationAndRestorationIdentifier=function(e,r){return this.restorationIdentifier=r,this.location=t.Location.wrap(e),this.history.replace(this.location,this.restorationIdentifier)},r.prototype.historyPoppedToLocationWithRestorationIdentifier=function(e,r){var n;return this.restorationIdentifier=r,this.enabled?(n=this.getRestorationDataForIdentifier(this.restorationIdentifier),this.startVisit(e,"restore",{restorationIdentifier:this.restorationIdentifier,restorationData:n,historyChanged:!0}),this.location=t.Location.wrap(e)):this.adapter.pageInvalidated()},r.prototype.getCachedSnapshotForLocation=function(t){var e;return e=this.cache.get(t),e?e.clone():void 0},r.prototype.shouldCacheSnapshot=function(){return this.view.getSnapshot().isCacheable()},r.prototype.cacheSnapshot=function(){var t;return this.shouldCacheSnapshot()?(this.notifyApplicationBeforeCachingSnapshot(),t=this.view.getSnapshot(),this.cache.put(this.lastRenderedLocation,t.clone())):void 0},r.prototype.scrollToAnchor=function(t){var e;return(e=document.getElementById(t))?this.scrollToElement(e):this.scrollToPosition({x:0,y:0})},r.prototype.scrollToElement=function(t){return this.scrollManager.scrollToElement(t)},r.prototype.scrollToPosition=function(t){return this.scrollManager.scrollToPosition(t)},r.prototype.scrollPositionChanged=function(t){var e;return e=this.getCurrentRestorationData(),e.scrollPosition=t},r.prototype.render=function(t,e){return this.view.render(t,e)},r.prototype.viewInvalidated=function(){return this.adapter.pageInvalidated()},r.prototype.viewWillRender=function(t){return this.notifyApplicationBeforeRender(t)},r.prototype.viewRendered=function(){return this.lastRenderedLocation=this.currentVisit.location,this.notifyApplicationAfterRender()},r.prototype.pageLoaded=function(){return this.lastRenderedLocation=this.location,this.notifyApplicationAfterPageLoad()},r.prototype.clickCaptured=function(){return removeEventListener("click",this.clickBubbled,!1),addEventListener("click",this.clickBubbled,!1)},r.prototype.clickBubbled=function(t){var e,r,n;return this.enabled&&this.clickEventIsSignificant(t)&&(r=this.getVisitableLinkForNode(t.target))&&(n=this.getVisitableLocationForLink(r))&&this.applicationAllowsFollowingLinkToLocation(r,n)?(t.preventDefault(),e=this.getActionForLink(r),this.visit(n,{action:e})):void 0},r.prototype.applicationAllowsFollowingLinkToLocation=function(t,e){var r;return r=this.notifyApplicationAfterClickingLinkToLocation(t,e),!r.defaultPrevented},r.prototype.applicationAllowsVisitingLocation=function(t){var e;return e=this.notifyApplicationBeforeVisitingLocation(t),!e.defaultPrevented},r.prototype.notifyApplicationAfterClickingLinkToLocation=function(e,r){return t.dispatch("turbolinks:click",{target:e,data:{url:r.absoluteURL},cancelable:!0})},r.prototype.notifyApplicationBeforeVisitingLocation=function(e){return t.dispatch("turbolinks:before-visit",{data:{url:e.absoluteURL},cancelable:!0})},r.prototype.notifyApplicationAfterVisitingLocation=function(e){return t.dispatch("turbolinks:visit",{data:{url:e.absoluteURL}})},r.prototype.notifyApplicationBeforeCachingSnapshot=function(){return t.dispatch("turbolinks:before-cache")},r.prototype.notifyApplicationBeforeRender=function(e){return t.dispatch("turbolinks:before-render",{data:{newBody:e}})},r.prototype.notifyApplicationAfterRender=function(){return t.dispatch("turbolinks:render")},r.prototype.notifyApplicationAfterPageLoad=function(e){return null==e&&(e={}),t.dispatch("turbolinks:load",{data:{url:this.location.absoluteURL,timing:e}})},r.prototype.startVisit=function(t,e,r){var n;return null!=(n=this.currentVisit)&&n.cancel(),this.currentVisit=this.createVisit(t,e,r),this.currentVisit.start(),this.notifyApplicationAfterVisitingLocation(t)},r.prototype.createVisit=function(e,r,n){
var o,i,s,a,u;return i=null!=n?n:{},a=i.restorationIdentifier,s=i.restorationData,o=i.historyChanged,u=new t.Visit(this,e,r),u.restorationIdentifier=null!=a?a:t.uuid(),u.restorationData=t.copyObject(s),u.historyChanged=o,u.referrer=this.location,u},r.prototype.visitCompleted=function(t){return this.notifyApplicationAfterPageLoad(t.getTimingMetrics())},r.prototype.clickEventIsSignificant=function(t){return!(t.defaultPrevented||t.target.isContentEditable||t.which>1||t.altKey||t.ctrlKey||t.metaKey||t.shiftKey)},r.prototype.getVisitableLinkForNode=function(e){return this.nodeIsVisitable(e)?t.closest(e,"a[href]:not([target])"):void 0},r.prototype.getVisitableLocationForLink=function(e){var r;return r=new t.Location(e.getAttribute("href")),this.locationIsVisitable(r)?r:void 0},r.prototype.getActionForLink=function(t){var e;return null!=(e=t.getAttribute("data-turbolinks-action"))?e:"advance"},r.prototype.nodeIsVisitable=function(e){var r;return(r=t.closest(e,"[data-turbolinks]"))?"false"!==r.getAttribute("data-turbolinks"):!0},r.prototype.locationIsVisitable=function(t){return t.isPrefixedBy(this.view.getRootLocation())&&t.isHTML()},r.prototype.getCurrentRestorationData=function(){return this.getRestorationDataForIdentifier(this.restorationIdentifier)},r.prototype.getRestorationDataForIdentifier=function(t){var e;return null!=(e=this.restorationData)[t]?e[t]:e[t]={}},r}()}.call(this),function(){var e,r,n;t.start=function(){return r()?(null==t.controller&&(t.controller=e()),t.controller.start()):void 0},r=function(){return null==window.Turbolinks&&(window.Turbolinks=t),n()},e=function(){var e;return e=new t.Controller,e.adapter=new t.BrowserAdapter(e),e},n=function(){return window.Turbolinks===t},n()&&t.start()}.call(this)}).call(this),"object"==typeof module&&module.exports?module.exports=t:"function"==typeof define&&define.amd&&define(t)}).call(this);
(function() {
  var slice = [].slice;

  this.ActionCable = {
    INTERNAL: {
      "message_types": {
        "welcome": "welcome",
        "ping": "ping",
        "confirmation": "confirm_subscription",
        "rejection": "reject_subscription"
      },
      "default_mount_path": "/cable",
      "protocols": ["actioncable-v1-json", "actioncable-unsupported"]
    },
    createConsumer: function(url) {
      var ref;
      if (url == null) {
        url = (ref = this.getConfig("url")) != null ? ref : this.INTERNAL.default_mount_path;
      }
      return new ActionCable.Consumer(this.createWebSocketURL(url));
    },
    getConfig: function(name) {
      var element;
      element = document.head.querySelector("meta[name='action-cable-" + name + "']");
      return element != null ? element.getAttribute("content") : void 0;
    },
    createWebSocketURL: function(url) {
      var a;
      if (url && !/^wss?:/i.test(url)) {
        a = document.createElement("a");
        a.href = url;
        a.href = a.href;
        a.protocol = a.protocol.replace("http", "ws");
        return a.href;
      } else {
        return url;
      }
    },
    startDebugging: function() {
      return this.debugging = true;
    },
    stopDebugging: function() {
      return this.debugging = null;
    },
    log: function() {
      var messages;
      messages = 1 <= arguments.length ? slice.call(arguments, 0) : [];
      if (this.debugging) {
        messages.push(Date.now());
        return console.log.apply(console, ["[ActionCable]"].concat(slice.call(messages)));
      }
    }
  };

  if (typeof window !== "undefined" && window !== null) {
    window.ActionCable = this.ActionCable;
  }

  if (typeof module !== "undefined" && module !== null) {
    module.exports = this.ActionCable;
  }

}).call(this);
(function() {
  var bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  ActionCable.ConnectionMonitor = (function() {
    var clamp, now, secondsSince;

    ConnectionMonitor.pollInterval = {
      min: 3,
      max: 30
    };

    ConnectionMonitor.staleThreshold = 6;

    function ConnectionMonitor(connection) {
      this.connection = connection;
      this.visibilityDidChange = bind(this.visibilityDidChange, this);
      this.reconnectAttempts = 0;
    }

    ConnectionMonitor.prototype.start = function() {
      if (!this.isRunning()) {
        this.startedAt = now();
        delete this.stoppedAt;
        this.startPolling();
        document.addEventListener("visibilitychange", this.visibilityDidChange);
        return ActionCable.log("ConnectionMonitor started. pollInterval = " + (this.getPollInterval()) + " ms");
      }
    };

    ConnectionMonitor.prototype.stop = function() {
      if (this.isRunning()) {
        this.stoppedAt = now();
        this.stopPolling();
        document.removeEventListener("visibilitychange", this.visibilityDidChange);
        return ActionCable.log("ConnectionMonitor stopped");
      }
    };

    ConnectionMonitor.prototype.isRunning = function() {
      return (this.startedAt != null) && (this.stoppedAt == null);
    };

    ConnectionMonitor.prototype.recordPing = function() {
      return this.pingedAt = now();
    };

    ConnectionMonitor.prototype.recordConnect = function() {
      this.reconnectAttempts = 0;
      this.recordPing();
      delete this.disconnectedAt;
      return ActionCable.log("ConnectionMonitor recorded connect");
    };

    ConnectionMonitor.prototype.recordDisconnect = function() {
      this.disconnectedAt = now();
      return ActionCable.log("ConnectionMonitor recorded disconnect");
    };

    ConnectionMonitor.prototype.startPolling = function() {
      this.stopPolling();
      return this.poll();
    };

    ConnectionMonitor.prototype.stopPolling = function() {
      return clearTimeout(this.pollTimeout);
    };

    ConnectionMonitor.prototype.poll = function() {
      return this.pollTimeout = setTimeout((function(_this) {
        return function() {
          _this.reconnectIfStale();
          return _this.poll();
        };
      })(this), this.getPollInterval());
    };

    ConnectionMonitor.prototype.getPollInterval = function() {
      var interval, max, min, ref;
      ref = this.constructor.pollInterval, min = ref.min, max = ref.max;
      interval = 5 * Math.log(this.reconnectAttempts + 1);
      return Math.round(clamp(interval, min, max) * 1000);
    };

    ConnectionMonitor.prototype.reconnectIfStale = function() {
      if (this.connectionIsStale()) {
        ActionCable.log("ConnectionMonitor detected stale connection. reconnectAttempts = " + this.reconnectAttempts + ", pollInterval = " + (this.getPollInterval()) + " ms, time disconnected = " + (secondsSince(this.disconnectedAt)) + " s, stale threshold = " + this.constructor.staleThreshold + " s");
        this.reconnectAttempts++;
        if (this.disconnectedRecently()) {
          return ActionCable.log("ConnectionMonitor skipping reopening recent disconnect");
        } else {
          ActionCable.log("ConnectionMonitor reopening");
          return this.connection.reopen();
        }
      }
    };

    ConnectionMonitor.prototype.connectionIsStale = function() {
      var ref;
      return secondsSince((ref = this.pingedAt) != null ? ref : this.startedAt) > this.constructor.staleThreshold;
    };

    ConnectionMonitor.prototype.disconnectedRecently = function() {
      return this.disconnectedAt && secondsSince(this.disconnectedAt) < this.constructor.staleThreshold;
    };

    ConnectionMonitor.prototype.visibilityDidChange = function() {
      if (document.visibilityState === "visible") {
        return setTimeout((function(_this) {
          return function() {
            if (_this.connectionIsStale() || !_this.connection.isOpen()) {
              ActionCable.log("ConnectionMonitor reopening stale connection on visibilitychange. visbilityState = " + document.visibilityState);
              return _this.connection.reopen();
            }
          };
        })(this), 200);
      }
    };

    now = function() {
      return new Date().getTime();
    };

    secondsSince = function(time) {
      return (now() - time) / 1000;
    };

    clamp = function(number, min, max) {
      return Math.max(min, Math.min(max, number));
    };

    return ConnectionMonitor;

  })();

}).call(this);
(function() {
  var i, message_types, protocols, ref, supportedProtocols, unsupportedProtocol,
    slice = [].slice,
    bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

  ref = ActionCable.INTERNAL, message_types = ref.message_types, protocols = ref.protocols;

  supportedProtocols = 2 <= protocols.length ? slice.call(protocols, 0, i = protocols.length - 1) : (i = 0, []), unsupportedProtocol = protocols[i++];

  ActionCable.Connection = (function() {
    Connection.reopenDelay = 500;

    function Connection(consumer) {
      this.consumer = consumer;
      this.open = bind(this.open, this);
      this.subscriptions = this.consumer.subscriptions;
      this.monitor = new ActionCable.ConnectionMonitor(this);
      this.disconnected = true;
    }

    Connection.prototype.send = function(data) {
      if (this.isOpen()) {
        this.webSocket.send(JSON.stringify(data));
        return true;
      } else {
        return false;
      }
    };

    Connection.prototype.open = function() {
      if (this.isActive()) {
        ActionCable.log("Attempted to open WebSocket, but existing socket is " + (this.getState()));
        throw new Error("Existing connection must be closed before opening");
      } else {
        ActionCable.log("Opening WebSocket, current state is " + (this.getState()) + ", subprotocols: " + protocols);
        if (this.webSocket != null) {
          this.uninstallEventHandlers();
        }
        this.webSocket = new WebSocket(this.consumer.url, protocols);
        this.installEventHandlers();
        this.monitor.start();
        return true;
      }
    };

    Connection.prototype.close = function(arg) {
      var allowReconnect, ref1;
      allowReconnect = (arg != null ? arg : {
        allowReconnect: true
      }).allowReconnect;
      if (!allowReconnect) {
        this.monitor.stop();
      }
      if (this.isActive()) {
        return (ref1 = this.webSocket) != null ? ref1.close() : void 0;
      }
    };

    Connection.prototype.reopen = function() {
      var error, error1;
      ActionCable.log("Reopening WebSocket, current state is " + (this.getState()));
      if (this.isActive()) {
        try {
          return this.close();
        } catch (error1) {
          error = error1;
          return ActionCable.log("Failed to reopen WebSocket", error);
        } finally {
          ActionCable.log("Reopening WebSocket in " + this.constructor.reopenDelay + "ms");
          setTimeout(this.open, this.constructor.reopenDelay);
        }
      } else {
        return this.open();
      }
    };

    Connection.prototype.getProtocol = function() {
      var ref1;
      return (ref1 = this.webSocket) != null ? ref1.protocol : void 0;
    };

    Connection.prototype.isOpen = function() {
      return this.isState("open");
    };

    Connection.prototype.isActive = function() {
      return this.isState("open", "connecting");
    };

    Connection.prototype.isProtocolSupported = function() {
      var ref1;
      return ref1 = this.getProtocol(), indexOf.call(supportedProtocols, ref1) >= 0;
    };

    Connection.prototype.isState = function() {
      var ref1, states;
      states = 1 <= arguments.length ? slice.call(arguments, 0) : [];
      return ref1 = this.getState(), indexOf.call(states, ref1) >= 0;
    };

    Connection.prototype.getState = function() {
      var ref1, state, value;
      for (state in WebSocket) {
        value = WebSocket[state];
        if (value === ((ref1 = this.webSocket) != null ? ref1.readyState : void 0)) {
          return state.toLowerCase();
        }
      }
      return null;
    };

    Connection.prototype.installEventHandlers = function() {
      var eventName, handler;
      for (eventName in this.events) {
        handler = this.events[eventName].bind(this);
        this.webSocket["on" + eventName] = handler;
      }
    };

    Connection.prototype.uninstallEventHandlers = function() {
      var eventName;
      for (eventName in this.events) {
        this.webSocket["on" + eventName] = function() {};
      }
    };

    Connection.prototype.events = {
      message: function(event) {
        var identifier, message, ref1, type;
        if (!this.isProtocolSupported()) {
          return;
        }
        ref1 = JSON.parse(event.data), identifier = ref1.identifier, message = ref1.message, type = ref1.type;
        switch (type) {
          case message_types.welcome:
            this.monitor.recordConnect();
            return this.subscriptions.reload();
          case message_types.ping:
            return this.monitor.recordPing();
          case message_types.confirmation:
            return this.subscriptions.notify(identifier, "connected");
          case message_types.rejection:
            return this.subscriptions.reject(identifier);
          default:
            return this.subscriptions.notify(identifier, "received", message);
        }
      },
      open: function() {
        ActionCable.log("WebSocket onopen event, using '" + (this.getProtocol()) + "' subprotocol");
        this.disconnected = false;
        if (!this.isProtocolSupported()) {
          ActionCable.log("Protocol is unsupported. Stopping monitor and disconnecting.");
          return this.close({
            allowReconnect: false
          });
        }
      },
      close: function(event) {
        ActionCable.log("WebSocket onclose event");
        if (this.disconnected) {
          return;
        }
        this.disconnected = true;
        this.monitor.recordDisconnect();
        return this.subscriptions.notifyAll("disconnected", {
          willAttemptReconnect: this.monitor.isRunning()
        });
      },
      error: function() {
        return ActionCable.log("WebSocket onerror event");
      }
    };

    return Connection;

  })();

}).call(this);
(function() {
  var slice = [].slice;

  ActionCable.Subscriptions = (function() {
    function Subscriptions(consumer) {
      this.consumer = consumer;
      this.subscriptions = [];
    }

    Subscriptions.prototype.create = function(channelName, mixin) {
      var channel, params, subscription;
      channel = channelName;
      params = typeof channel === "object" ? channel : {
        channel: channel
      };
      subscription = new ActionCable.Subscription(this.consumer, params, mixin);
      return this.add(subscription);
    };

    Subscriptions.prototype.add = function(subscription) {
      this.subscriptions.push(subscription);
      this.consumer.ensureActiveConnection();
      this.notify(subscription, "initialized");
      this.sendCommand(subscription, "subscribe");
      return subscription;
    };

    Subscriptions.prototype.remove = function(subscription) {
      this.forget(subscription);
      if (!this.findAll(subscription.identifier).length) {
        this.sendCommand(subscription, "unsubscribe");
      }
      return subscription;
    };

    Subscriptions.prototype.reject = function(identifier) {
      var i, len, ref, results, subscription;
      ref = this.findAll(identifier);
      results = [];
      for (i = 0, len = ref.length; i < len; i++) {
        subscription = ref[i];
        this.forget(subscription);
        this.notify(subscription, "rejected");
        results.push(subscription);
      }
      return results;
    };

    Subscriptions.prototype.forget = function(subscription) {
      var s;
      this.subscriptions = (function() {
        var i, len, ref, results;
        ref = this.subscriptions;
        results = [];
        for (i = 0, len = ref.length; i < len; i++) {
          s = ref[i];
          if (s !== subscription) {
            results.push(s);
          }
        }
        return results;
      }).call(this);
      return subscription;
    };

    Subscriptions.prototype.findAll = function(identifier) {
      var i, len, ref, results, s;
      ref = this.subscriptions;
      results = [];
      for (i = 0, len = ref.length; i < len; i++) {
        s = ref[i];
        if (s.identifier === identifier) {
          results.push(s);
        }
      }
      return results;
    };

    Subscriptions.prototype.reload = function() {
      var i, len, ref, results, subscription;
      ref = this.subscriptions;
      results = [];
      for (i = 0, len = ref.length; i < len; i++) {
        subscription = ref[i];
        results.push(this.sendCommand(subscription, "subscribe"));
      }
      return results;
    };

    Subscriptions.prototype.notifyAll = function() {
      var args, callbackName, i, len, ref, results, subscription;
      callbackName = arguments[0], args = 2 <= arguments.length ? slice.call(arguments, 1) : [];
      ref = this.subscriptions;
      results = [];
      for (i = 0, len = ref.length; i < len; i++) {
        subscription = ref[i];
        results.push(this.notify.apply(this, [subscription, callbackName].concat(slice.call(args))));
      }
      return results;
    };

    Subscriptions.prototype.notify = function() {
      var args, callbackName, i, len, results, subscription, subscriptions;
      subscription = arguments[0], callbackName = arguments[1], args = 3 <= arguments.length ? slice.call(arguments, 2) : [];
      if (typeof subscription === "string") {
        subscriptions = this.findAll(subscription);
      } else {
        subscriptions = [subscription];
      }
      results = [];
      for (i = 0, len = subscriptions.length; i < len; i++) {
        subscription = subscriptions[i];
        results.push(typeof subscription[callbackName] === "function" ? subscription[callbackName].apply(subscription, args) : void 0);
      }
      return results;
    };

    Subscriptions.prototype.sendCommand = function(subscription, command) {
      var identifier;
      identifier = subscription.identifier;
      return this.consumer.send({
        command: command,
        identifier: identifier
      });
    };

    return Subscriptions;

  })();

}).call(this);
(function() {
  ActionCable.Subscription = (function() {
    var extend;

    function Subscription(consumer, params, mixin) {
      this.consumer = consumer;
      if (params == null) {
        params = {};
      }
      this.identifier = JSON.stringify(params);
      extend(this, mixin);
    }

    Subscription.prototype.perform = function(action, data) {
      if (data == null) {
        data = {};
      }
      data.action = action;
      return this.send(data);
    };

    Subscription.prototype.send = function(data) {
      return this.consumer.send({
        command: "message",
        identifier: this.identifier,
        data: JSON.stringify(data)
      });
    };

    Subscription.prototype.unsubscribe = function() {
      return this.consumer.subscriptions.remove(this);
    };

    extend = function(object, properties) {
      var key, value;
      if (properties != null) {
        for (key in properties) {
          value = properties[key];
          object[key] = value;
        }
      }
      return object;
    };

    return Subscription;

  })();

}).call(this);
(function() {
  ActionCable.Consumer = (function() {
    function Consumer(url) {
      this.url = url;
      this.subscriptions = new ActionCable.Subscriptions(this);
      this.connection = new ActionCable.Connection(this);
    }

    Consumer.prototype.send = function(data) {
      return this.connection.send(data);
    };

    Consumer.prototype.connect = function() {
      return this.connection.open();
    };

    Consumer.prototype.disconnect = function() {
      return this.connection.close({
        allowReconnect: false
      });
    };

    Consumer.prototype.ensureActiveConnection = function() {
      if (!this.connection.isActive()) {
        return this.connection.open();
      }
    };

    return Consumer;

  })();

}).call(this);
// Action Cable provides the framework to deal with WebSockets in Rails.
// You can generate new channels where WebSocket features live using the rails generate channel command.
//




(function() {
  this.App || (this.App = {});

  App.cable = ActionCable.createConsumer();

}).call(this);
(function() {


}).call(this);
(function() {


}).call(this);
(function() {


}).call(this);
(function() {


}).call(this);
(function() {
  $(function() {
    return $('select[id*="birthday"]').each(function() {
      return $(this).wrapAll('<div class="col-md-4">');
    });
  });

}).call(this);
// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or any plugin's vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file. JavaScript code in this file should be added after the last require_* statement.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//






;
