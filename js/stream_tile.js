var StreamTile = (function() {
	function StreamTile(config) {
		this.display_name = config.display_name;
		this.game = config.game;
		this.viewers = config.viewers;
		this.thumb_url = config.thumb_url;
		this.url = config.url;
	};

	StreamTile.prototype.build = function() {
		this.element = document.createElement('div');
		this.element.classList.add('stream_tile');
		
		this.thumb = document.createElement('div');
		this.thumb.classList.add('twidget_thumb');
		this.thumb.style.backgroundImage = 'url("' + this.thumb_url + '")';
		this.info_container = document.createElement('div');

		this.header = document.createElement('a');
		this.header.href = this.url;
		this.header.innerText = this.display_name;
		this.header.target = '_blank';
		this.stream_info = document.createElement('p');
		this.stream_info.innerText = this.game + ' - ' + this.viewers + (this.viewers === 1 ? ' viewer' : ' viewers');
		this.info_container.appendChild(this.header);
		this.info_container.appendChild(this.stream_info);

		this.element.appendChild(this.thumb);
		this.element.appendChild(this.info_container);
	}

	return StreamTile;
})();