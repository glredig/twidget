var StreamTile = (function() {
	function StreamTile(config) {
		this.display_name = config.display_name;
	};

	StreamTile.prototype.build = function() {
		this.element = document.createElement('div');
		this.element.innerText = this.display_name;
	}

	return StreamTile;
})();