var express = require('express');
var router = express.Router();
var request = require('request');
var cheerio = require('cheerio')

// var jsdom = require("jsdom").jsdom;
// var doc = jsdom();
// var window = doc.defaultView;

// // Load jQuery with the simulated jsdom window.
// var $ = require('jquery')(window);

// var RequestClass = function() {
// 	var html; 
	
// }; 

// // // ...add a method, which we do in this example:
// // RequestClass.prototype.getList = function() {
// //     return "My List";
// // };

// // now expose with module.exports:
// exports.Request = RequestClass;
/* GET home page. */
router.get('/', function(req, res, next) {
	var html = '';
	request('http://www.kerteminde-tennisklub.dk/Activity/BookingView/Activity2520714441261358577?callback=?', function (error, response, body) {
		if (!error && response.statusCode == 200) {
			// html = JSON.stringify(body);
			html = body
			console.log("yo mane", html);
		}
	})
	var index = 0;
	$ = cheerio.load(html)
	console.log("cheerio yo", $, "document yo", $('document'))
	$('[data-bookings^="<b>Bane"]').each((div)=>{
		index++
	})
	console.log("Index yo",index)
	res.render('index', { title: 'WannaSport', index});
});

module.exports = router;

//from chrome dev document.querySelectorAll('[data-bookings^="<b>Bane"]')
