var Utils = (function() {
	function getTimeDistance(end, start) {
		var duration = '';	

		var delta = end - start;

		var days = Math.floor(delta / 86400000);
		var hours = Math.floor((delta - days * 86400000) / 3600000);
		var minutes = Math.floor((delta - days * 86400000 - hours * 3600000) / 60000);
		var seconds = Math.floor((delta - days * 86400000 - hours * 3600000 - minutes * 60000) / 1000);

		var day_str = days + 'day' + (days == 1 ? ', ' : 's, ');
		var hour_str = hours + ' hour' + (hours == 1 ? ', ' : 's, ');
		var minute_str = minutes + ' minute' + (minutes == 1 ? ', ' : 's, ');
		var second_str = seconds + ' second' + (seconds == 1 ? ', ' : 's');

		duration = (days > 0 ? day_str : '') + (hours > 0 ? hour_str : '') + (minutes > 0 ? minute_str : '') + (seconds > 0 ? second_str : '');
		
		return duration;
	}

	return {
		getTimeDistance: getTimeDistance
	}
})();