var StreamTile = (function() {
	function StreamTile(config) {
		this.display_name = config.display_name;
		this.game = config.game;
		this.viewers = config.viewers;
		this.thumb_url = config.thumb_url;
	};

	StreamTile.prototype.build = function() {
		this.element = document.createElement('div');
		
		this.thumb = document.createElement('img');
		this.thumb.src = this.thumb_url;
		this.header = document.createElement('h3');
		this.header.innerText = this.display_name;
		this.stream_info = document.createElement('p');
		this.stream_info.innerText = this.game + ' - ' + this.viewers + ' viewers';

		this.element.appendChild(this.thumb);
		this.element.appendChild(this.header);
		this.element.appendChild(this.stream_info);
	}

	return StreamTile;
})();