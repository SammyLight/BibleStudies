var refTagger = {
		settings: {
			bibleVersion: "NKJV",
			socialSharing: [],
			customStyle: {
				heading: {
					fontFamily: "Arial, 'Helvetica Neue', Helvetica, sans-serif",
					fontSize: "14px"
				},
				body: {
					fontSize: "20px"
				}
			}
		}
	};
	(function(d, t) {
		var g = d.createElement(t),
			s = d.getElementsByTagName(t)[0];
		g.src = "//api.reftagger.com/v2/RefTagger.js";
		s.parentNode.insertBefore(g, s);
	}(document, "script"));