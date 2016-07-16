var Spinner = (function() {
	function Spinner(config) {
		this.with_overlay = config.with_overlay || false;
	}

	Spinner.prototype = {
		init: function() {
			var bounce1 = document.createElement('div'),
				bounce2 = document.createElement('div'),
				bounce3 = document.createElement('div');

			this.spinner = document.createElement('div');

			this.spinner.classList.add('twidget_spinner');
			bounce1.classList.add('bounce1');
			bounce2.classList.add('bounce2');
			bounce3.classList.add('bounce3');

			this.spinner.appendChild(bounce1);
			this.spinner.appendChild(bounce2);
			this.spinner.appendChild(bounce3);

			if (this.with_overlay) {
				this.container = document.createElement('div');
				this.container.classList.add('twidget_spinner_overlay');
				this.container.appendChild(this.spinner);
				this.spinner.style.display = 'block';
				return this.container;
			}	
			else {
				return this.spinner;
			}

			

			return this.container;
		},

		show: function() {
			var el = (this.with_overlay ? this.container : this.spinner);
			el.style.display = 'block';
		},

		hide: function() {
			var el = (this.with_overlay ? this.container : this.spinner);
			el.style.display = 'none';
		}
	}

	return Spinner;
})();