var fs = require('fs');
var prompt = require('prompt');
var path = require('path');
require('colors');

prompt.message = '';
exports.init = function(grunt) {
	return new (function() {
		this.versionTxt = '0.0.0';
    this.news = [];
		this.patchPackageJson = function(data, callback) {
			var bowerPsch = data.file;
  	 		var info = grunt.file.readJSON(bowerPsch);
  	 		if ("object"!==typeof info) {
  	 			grunt.err.warn(data.file+' corrupt!');
  	 			return;
  	 		}
  	 		/* Reset version to null if not exists */
  	 		if ("string"!==typeof info.version) info.version='0.0.0';


  	 		var version = info.version.split('.');


  	 		while (version.length<3) {
  	 			version.push('0');
  	 		};
  	 		for (var i=0;i<version.length;i++) {
  	 			version[i] = parseInt(version[i]);
  	 			if (isNaN(version[i])) {
  	 				/* Reset version to null if currupt */
  	 				version = [0,0,0]; break;
  	 			}
  	 		};

  	 		/* Protego from inaccessible index */
  	 		if ("undefined"===typeof version[data.degree-1]) {
  	 			for (var i=0;i<data.degree-1;i++) {
  	 				if ("number"!==typeof version[i]) version[i] = 0;
  	 			}
  	 		};

  	 		/* Up degree value */
  	 		version[data.degree-1]++;

  	 		this.versionTxt = version.join('.');
  	 		info['version'] = this.versionTxt;
        
  	 		/* Write back to file */
        var that = this;
       
  	 		fs.writeFile(bowerPsch, JSON.stringify(info,null,'\t'), 'utf-8', function(err) {
          if (err) {
            console.log(err); return;
          }
  	 			if ("function"===typeof callback) callback(that.versionTxt);
  	 		});
		};
		this.patchReportFile = function(data, callback) {
     
			this.askForNews(function() {
        if (this.news.length>0) {

          var fc = fs.readFileSync(data.file, 'utf-8');

          
          var fileparts = fc.split(data.anchor);

          if (fileparts[1].length>0) {
            var newtext = fileparts[0]+data.anchor+'\n### Version '+this.versionTxt+'\n- '+this.news.join('\n- ')+'\n'+fileparts[1];
            fs.writeFile(data.file, newtext, 'utf-8', function(err) {
              if (err) {
                grunt.log.warn('Record to .MD returns error', err);
              };
              callback();
            });            
          } else {
            grunt.log.warn('There is no anchore in report .MD');
          }
        } else {
          callback();
        }
      });
		};
    this.askForNews = function(callback) {
       
        var that = this;
        prompt.start();
        prompt.get(
          {
            properties: {
              data: {
                required: false,
                default: ''
              }
            }
          },
          function(err, data) {
             
            if (data.data!=='') {
              that.news.push(data.data);
              setTimeout(function() { that.askForNews(callback||false); }, 250);
            } else {
             
              if ("function"===typeof callback) callback.call(that);
            }
          }
        );
    };
		
	})();
}
