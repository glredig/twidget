var Twidget = (function() {
	var container,
		header,
		results,
		btn,
		field,
		stream_tiles = [],
		offset = 0,
		tag,
		result_total = 0;

	function init(config) {
		container = config.element;
		buildHTML();
	}

	function buildHTML() {
		header = document.createElement('div');
		results = document.createElement('div');
		field = document.createElement('input');
		btn = document.createElement('button');
		pagination = document.createElement('div');
		result_count = document.createElement('div');
		page_nav = document.createElement('div');
		left_arr = document.createElement('div');
		left_arr.innerText = '<';
		page_count = document.createElement('div');
		right_arr = document.createElement('div');
		right_arr.innerText = '>';
		spinner = buildSpinner();

		container.classList.add('twidget_container');
		header.classList.add('twidget_header');
		results.classList.add('twidget_results');
		pagination.classList.add('twidget_pagination');
		pagination.style.visibility = 'hidden';

		field.type = 'text';
		field.placeholder = 'Search query...';

		btn.classList.add('twidget_button');
		btn.innerText = 'Search';

		header.appendChild(field);
		header.appendChild(btn);

		page_nav.appendChild(right_arr);
		page_nav.appendChild(page_count);
		page_nav.appendChild(left_arr);

		pagination.appendChild(result_count);
		pagination.appendChild(page_nav);

		results.appendChild(pagination);
		results.appendChild(spinner);

		container.appendChild(header);
		container.appendChild(results);

		setupListeners();
		field.focus();
	}

	function buildSpinner() {
		var spinner = document.createElement('div'),
			bounce1 = document.createElement('div'),
			bounce2 = document.createElement('div'),
			bounce3 = document.createElement('div');

		spinner.classList.add('twidget_spinner');
		bounce1.classList.add('bounce1');
		bounce2.classList.add('bounce2');
		bounce3.classList.add('bounce3');

		spinner.appendChild(bounce1);
		spinner.appendChild(bounce2);
		spinner.appendChild(bounce3);

		return spinner;
	}

	function showSpinner() {
		spinner.style.display = 'block';
	}

	function hideSpinner() {
		spinner.style.display = 'none';
	}

	function setupListeners() {
		btn.addEventListener('click', function() {
			offset = 0;
			search(encodeURI(field.value));
		});

		field.addEventListener('keyup', function(e) {
			if (e.keyCode === 13) {
				offset = 0;
				search(encodeURI(field.value));
			}
		});

		left_arr.addEventListener('click', function() {
			if (offset > 0) {
				pageChange(-1);
			}
		});

		right_arr.addEventListener('click', function() {
			if ((offset / 5 + 1) < Math.ceil(result_total / 5)) {
				pageChange(1);
			}
		});

	}

	function pageChange(direction) {
		if (direction > 0) {
			offset += 5;
			search(field.value);
		}
		else {
			offset -= 5;
			search(field.value);
		}
	}

	function search(keyword) {		
		var url = 'https://api.twitch.tv/kraken/search/streams?limit=5&offset=' + offset + '&q=' + keyword + '&callback=Twidget.display';
		
		showSpinner();

		if (tag !== undefined) {
			document.body.removeChild(tag);
		}	

		tag = document.createElement('script');
		tag.src = url;
		tag.type = 'text/javascript';
		document.body.appendChild(tag);
	}

	function display(data) {
		result_total = data._total;
		clearResults();
		result_count.innerText = 'Total results: ' + result_total;
		page_count.innerText = (offset / 5 + 1) + '/' + Math.ceil(result_total / 5);
		pagination.style.visibility = 'visible';

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

		hideSpinner();
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