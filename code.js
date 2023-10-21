function getAllUrlParams (searchstring) { 
	var s = searchstring;
	var allparams = new Object ();
	if (beginsWith (s, "?")) {
		s = stringDelete (s, 1, 1);
		}
	var splits = s.split ("&");
	splits.forEach (function (item) {
		var splits = item.split ("=");
		allparams [splits [0]] = decodeURIComponent (splits [1]);
		});
	return (allparams);
	}
function startup () {
	console.log ("startup");
	
	var replacetable = {
		app: "https://feedland.org/",
		command: "linkblog"
		};
	
	var urlParams = getAllUrlParams (location.search); 
	if (urlParams.app !== undefined) {
		replacetable.app = urlParams.app;
		}
	if (urlParams.command !== undefined) { //10/21/23 by DW
		replacetable.command = urlParams.command;
		}
	if (urlParams.name !== undefined) {
		$(".ancBookmarklet").text (urlParams.name);
		}
	
	readHttpFileThruProxy ("http://scripting.com/code/bookmarkletmaker/bookmarklet.txt", undefined, function (theText) {
		if (theText !== undefined) {
			theText = multipleReplaceAll (theText, replacetable, true, "[%", "%]");
			$(".divBookmarklet a").attr ("href", "javascript:(function () {" + theText + "})();");
			}
		});
	
	hitCounter ();
	}
