var Twidget = (function() {
	var container,
		header,
		results,
		btn,
		stream_tiles = [],
		offset = 0;

	function init(config) {
		container = config.element;
		buildHTML();
	}

	function buildHTML() {
		header = document.createElement('div');
		results = document.createElement('div');
		btn = document.createElement('button');

		container.classList.add('twidget_container');
		header.classList.add('twidget_header');
		results.classList.add('twidget_results');

		btn.classList.add('twidget_button');
		btn.innerText = 'Search';

		btn.addEventListener('click', function() {
			search('starcraft');
		});

		header.appendChild(btn);

		container.appendChild(header);
		container.appendChild(results);

	}

	function search(keyword) {
		var url = 'https://api.twitch.tv/kraken/search/streams?limit=5&offset=' + offset + '&q=' + keyword + '&callback=Twidget.display';

		var tag = document.createElement('script');
		tag.src = url;
		tag.type = 'text/javascript';
		document.body.appendChild(tag);
	}

	function display(data) {
		clearResults();

		for (var i = 0; i < data.streams.length; i++) {
			var stream_tile = new StreamTile({
				display_name: data.streams[i].channel.display_name,
				game: data.streams[i].game,
				viewers: data.streams[i].viewers,
				thumb_url: data.streams[i].preview.medium
			});

			console.log(data.streams[i]);
			stream_tile.build();
			stream_tiles.push(stream_tile);

			results.appendChild(stream_tile.element);
		}
	}

	function clearResults() {
		for (var i = 0; i < stream_tiles.length; i++) {
			results.removeChild(stream_tiles[i].element);
		}

		stream_tiles = [];
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