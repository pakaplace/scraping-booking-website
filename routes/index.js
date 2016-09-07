var express = require('express');
var router = express.Router();
var request = require('request');
var cheerio = require('cheerio')

Date.prototype.yyyymmdd = function() {
  var mm = this.getMonth() + 1; // getMonth() is zero-based
  var dd = this.getDate();

  return [this.getFullYear(), !mm[1] && '0', mm, !dd[1] && '0', dd].join(''); // padding
};

router.get('/', function(req, res, next) {
	var date = new Date()
	request.post('http://www.kerteminde-tennisklub.dk/Activity/BookingSheet', {form: {activity:'Activity2520714441261358577', days: '7', date: date.yyyymmdd()}},function (error, response, body) {
		if (!error && response.statusCode == 200) {
			console.log("reached")
			var index = 0;
			$ = cheerio.load(body)
			$('div').find('[data-bookings^="<b>Bane"]').each(()=>{
				index++
			})
			console.log("Courts available this week-", index)
			res.render('index', {title: "Time slots available this week at Kerteminde Tennis Club", index});
		}
		else{
			console.log("ajax call failed")
			res.render('index', {title: 'Availability at Kerteminde Tennis Club is not available'});			
		}
	})
	
});

module.exports = router;

//from chrome dev document.querySelectorAll('[data-bookings^="<b>Bane"]')
