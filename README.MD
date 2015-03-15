Grunt-release
--

> Helps to increase version of product and create comments to it.

## Getting started

Load via npm
```shell
npm install grunt-release --save-dev
```

## Creating tasks

Task `release` has next options:
- degree: deep of subversion, from 1 to 3. `1.2.3`;
- json: location of bower/package.json
- report: `{`location-of-the-report-file`: `marker-of-begining`}`

Here is example:

```javascript
grunt.initConfig({
	release: {
		tick: { // 
			degree: 3,
			json:  '../bower.json',
			report: {'../README.MD':'## News'}
		},
		model: {
			degree: 2,
			json:  '../bower.json',
			report: {'../README.MD':'## News'}
		},
		version: {
			degree: 1,
			json:  '../bower.json',
			report: {'../README.MD':'## News'}
		}
	}
});

In this example, task `tick` (with degree 1) will increase current version `1.0.0` up to version `1.0.1`. Task `model` (with degree 2) will increase it up to `1.1.1`. Finally, task `version` (with degree 3) increase version from `1.1.1` up to `2.1.1`.

Dont forget to load and register task.
```js
grunt.loadNpmTasks('grunt-release');
```
There are no clear rules for how to register this task. As a recommendation it might look like this:
```js
grunt.registerTask('up-tick', ['release:tick']);
grunt.registerTask('up-model', ['release:model']);
grunt.registerTask('up-version', ['release:version']);
```

## Comments after increasing
After all, the program will ask you to specify what exactly changes were made to the program. You can determine nothing or a lot of comments.  They appear in the file that you specified in the property `Report`.

## Calling task
```shell
grunt up-tick
grunt up-version
grunt up-model
```
