var request = require("request");
var cheerio = require("cheerio");
var targetUrl = "https://www.zomato.com/pune/viman-nagar-restaurants";
console.log("started scrapping : " + targetUrl);
request(targetUrl, function(err, response, data){
	if(!err && response.statusCode === 200){
		var $ = cheerio.load(data);
		var restaurants = $("#orig-search-list a.result-title");
		console.log("total restaurants: " + restaurants.length);
		restaurants.each(function(index, restaurant){
			console.log($(restaurant).text() + "--- ( " + $(restaurant).attr("href") + " ) ");
		});
	}
});