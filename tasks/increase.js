var path = require('path');
require('colors');
module.exports = function( grunt ) {
	 // Internal lib.
  	var increase = require('./lib/lib.js').init(grunt);
  	 grunt.registerMultiTask('increase', 'Auto increase version of package', function() {
  	 	var done = this.async();
  	 	var options = {
	    	degree: 3,
			json: false,
			report: false
	    };

	   

	    for (var prop in this.data) {
	    	if (this.data.hasOwnProperty(prop)) {
	    		options[prop] = this.data[prop];
	    	}
	    };

  	 	if (!options.json) {
  	 		 grunt.log.warn('Nothing to change!');
  	 		 return;
  	 	} else {

  	 		var file = options.json;
  	 		var reportFile, reportAnchor;
  	 		;("object"===typeof options.report) ? (reportFile=Object.keys(options.report)[0],reportAnchor=options.report[Object.keys(options.report)[0]])
  	 		: (("string"===typeof options.report) ? (reportFile=options.report,reportAnchor='## News') : (reportFile=false,reportAnchor=false) );
  	 		
  	 		// Patch package json
  	 		increase.patchPackageJson({
  	 			file: process.cwd()+'/'+file,
  	 			degree: options.degree
  	 		}, function(versionTxt) {
  	 			grunt.log.writeln('Updated version to '+versionTxt.cyan);
  	 			// Patch readme.json
  	 			if (reportFile) {

	  	 			increase.patchReportFile({
	  	 				file: reportFile,
	  	 				anchor: reportAnchor
	  	 			}, function() {
	  	 				grunt.log.writeln(file+' updated');
	  	 				grunt.log.writeln(reportFile+' updated');
	  	 				done();
	  	 			});
	  	 		} else {
	  	 			grunt.log.writeln('No report file');
	  	 			done();
	  	 		};
  	 		});
  	 		
  	 	}
  	 });
};
