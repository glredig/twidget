var Twidget = (function() {
	var container;

	function init(config) {
		container = config.element;
		buildHTML();
	}

	function buildHTML() {
		var header = document.createElement('div');
		var results = document.createElement('div');
		var btn = document.createElement('a');

		container.classList.add('twidget_container');
		header.classList.add('twidget_header');
		results.classList.add('twidget_results');

		btn.classList.add('twidget_button');
		btn.href = '#';
		btn.innerText = 'Search';

		btn.addEventListener('click', function() {
			search('starcraft');
		});

		header.appendChild(btn);

		container.appendChild(header);
		container.appendChild(results);

	}

	function search(keyword) {
		window.display = function(data) {
			console.log('data', data);
		}

		var url = 'https://api.twitch.tv/kraken/search/streams?q=' + keyword + '&callback=display';

		var tag = document.createElement('script');
		tag.src = url;
		tag.type = 'text/javascript';
		document.body.appendChild(tag);
	}

	return {
		init: init
	}
})();

(function() {
	Twidget.init({
		element: document.getElementById('twidget')
	});
})();