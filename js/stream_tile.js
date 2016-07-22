var StreamTile = (function() {
	function StreamTile(config) {
		this.display_name = config.display_name;
		this.game = config.game;
		this.viewers = config.viewers;
		this.thumb_url = config.thumb_url;
		this.url = config.url;
		this.created_at = config.created_at;
		this.views = config.views;
		this.mature = config.mature;
		this.status = config.status;
	};

	StreamTile.prototype.build = function() {
		var duration = Utils.getTimeDistance((new Date()).getTime(), Date.parse(this.created_at));
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
		if (this.mature) {
			this.header.classList.add('mature');
		}
		this.stream_info = document.createElement('p');
		if (Utils.formatString(this.status, 50, true)) {
			this.thumb.title = Utils.formatString(this.status, 50, true);
		}
		this.stream_info.innerHTML = (this.game ? '<span>' + this.game + '</span> - ' : '') + this.viewers + (this.viewers === 1 ? ' viewer' : ' viewers');
		this.stream_info.innerHTML += '<br> Total views: ' + this.views;
		this.stream_info.innerHTML += '<br> Streaming for ' + duration;
		this.info_container.appendChild(this.header);
		this.info_container.appendChild(this.stream_info);

		this.element.appendChild(this.thumb);
		this.element.appendChild(this.info_container);
	}

	return StreamTile;
})();