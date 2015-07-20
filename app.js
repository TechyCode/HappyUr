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
			var rest = new RestaurantDetails($(restaurant).text(), $(restaurant).attr("href"))
			rest.Parse();

		});
	}
}); 
function RestaurantDetails(restaurantName, restaurantUrl){
	var self = this;
	self.Parse = function(){
		var url = restaurantUrl;
		request(url, function(err, response, body){
			if(!err && response.statusCode === 200){
				var $ = cheerio.load(body);
				var address = $(".res-main-address-text");
				console.log("\n------------------------------------------------------------\n")
				console.log("Parsing for " + restaurantName + " at url : " + restaurantUrl);
				console.log("\t Address : " + address.text() + "\n");
				var metaTags = $("meta");
				metaTags.each(function(index, key){
					 if ( key.attribs
				       && key.attribs.property
				       && key.attribs.property === 'zomatocom:location:latitude') {
				      console.log("\t latitude : " + key.attribs.content + "\n");
				    }
				    else if ( key.attribs
				       && key.attribs.property
				       && key.attribs.property === 'zomatocom:location:longitude') {
				      console.log("\t longitude : " + key.attribs.content + "\n");
				    }
				});
				console.log("\n------------------------------------------------------------\n")
			}
		});
	}
}