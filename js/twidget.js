var Twidget = (function() {
	var container,
		header,
		results,
		btn,
		stream_tiles = [];

	function init(config) {
		container = config.element;
		buildHTML();
	}

	function buildHTML() {
		header = document.createElement('div');
		results = document.createElement('div');
		btn = document.createElement('a');

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

		var url = 'https://api.twitch.tv/kraken/search/streams?q=' + keyword + '&callback=Twidget.display';

		var tag = document.createElement('script');
		tag.src = url;
		tag.type = 'text/javascript';
		document.body.appendChild(tag);
	}

	function display(data) {
		for (var i = 0; i < data.streams.length; i++) {
			var stream_tile = new StreamTile({
				display_name: data.streams[i].channel.display_name
			});

			console.log(data.streams[i]);
			stream_tile.build();
			stream_tiles.push(stream_tile);

			results.appendChild(stream_tile.element);
		}
	}

	return {
		init: init,
		display: display
	}
})();

(function() {
	Twidget.init({
		element: document.getElementById('twidget')
	});
})();