var StreamTile = (function() {
	function StreamTile(config) {
		this.display_name = config.display_name;
		this.game = config.game;
		this.viewers = config.viewers;
		this.thumb_url = config.thumb_url;
	};

	StreamTile.prototype.build = function() {
		this.element = document.createElement('div');
		this.element.classList.add('stream_tile');

		this.element.style.height = '100px';
		
		this.thumb = document.createElement('img');
		this.thumb.src = this.thumb_url;
		this.info_container = document.createElement('div');

		this.header = document.createElement('h2');
		this.header.innerText = this.display_name;
		this.stream_info = document.createElement('p');
		this.stream_info.innerText = this.game + ' - ' + this.viewers + ' viewers';
		this.info_container.appendChild(this.header);
		this.info_container.appendChild(this.stream_info);

		this.element.appendChild(this.thumb);
		this.element.appendChild(this.info_container);
	}

	return StreamTile;
})();