window.addEventListener('load', () => {
	var events = new Events();
	events.add = function (obj) {
		obj.events = {};
	}
	events.implement = function (fn) {
		fn.prototype = Object.create(Events.prototype);
	}

	function Events() {
		this.events = {};
	}
	Events.prototype.on = function (name, fn) {
		var events = this.events[name];
		if (events == undefined) {
			this.events[name] = [fn];
			this.emit('event:on', fn);
		} else {
			if (events.indexOf(fn) == -1) {
				events.push(fn);
				this.emit('event:on', fn);
			}
		}
		return this;
	}
	Events.prototype.once = function (name, fn) {
		var events = this.events[name];
		fn.once = true;
		if (!events) {
			this.events[name] = [fn];
			this.emit('event:once', fn);
		} else {
			if (events.indexOf(fn) == -1) {
				events.push(fn);
				this.emit('event:once', fn);
			}
		}
		return this;
	}
	Events.prototype.emit = function (name, args) {
		var events = this.events[name];
		if (events) {
			var i = events.length;
			while (i--) {
				if (events[i]) {
					events[i].call(this, args);
					if (events[i].once) {
						delete events[i];
					}
				}
			}
		}
		return this;
	}
	Events.prototype.unbind = function (name, fn) {
		if (name) {
			var events = this.events[name];
			if (events) {
				if (fn) {
					var i = events.indexOf(fn);
					if (i != -1) {
						delete events[i];
					}
				} else {
					delete this.events[name];
				}
			}
		} else {
			delete this.events;
			this.events = {};
		}
		return this;
	}

	var userPrefix;

	var prefix = (function () {
		var styles = window.getComputedStyle(document.documentElement, ''),
			pre = (Array.prototype.slice
				.call(styles)
				.join('')
				.match(/-(moz|webkit|ms)-/) || (styles.OLink === '' && ['', 'o'])
			)[1],
			dom = ('WebKit|Moz|MS|O').match(new RegExp('(' + pre + ')', 'i'))[1];
		userPrefix = {
			dom: dom,
			lowercase: pre,
			css: '-' + pre + '-',
			js: pre[0].toUpperCase() + pre.substr(1)
		};
	})();

	function bindEvent(element, type, handler) {
		if (element.addEventListener) {
			element.addEventListener(type, handler, false);
		} else {
			element.attachEvent('on' + type, handler);
		}
	}

	function Viewport(data) {

		const blank = document.querySelector('.blank');
		const cube = document.querySelector('.viewport');
		const cubeInnerAxle = document.querySelector('.cube');
		const html = document.documentElement;
		const cubesides = document.querySelectorAll('.cube > div');
		const cubeimages = document.querySelectorAll('.cube-image');

		let detecter = null;

		function cubeResizer(sideTranslateZ, sideWidth, sideHeight, blankWidth, blankHeight) {
			blank.style = `
				height: ${blankHeight}px;
				width: ${blankWidth}px;
			`;

			cubeInnerAxle.style = `
				height: ${sideHeight}px;
				width: ${sideWidth}px;
			`;

			for (let i = 0; i < cubeimages.length; i++) {
				cubeimages[i].style = `
				height: ${sideHeight}px;
				width: ${sideWidth}px;
				line-height: ${sideHeight}px;
				`;
			}

			cubesides[0].style = `
					-webkit-transform: rotateX(90deg) translateZ(${sideTranslateZ}px);
				-moz-transform: rotateX(90deg) translateZ(${sideTranslateZ}px);
				-ms-transform: rotateX(90deg) translateZ(${sideTranslateZ}px);
				-o-transform: rotateX(90deg) translateZ(${sideTranslateZ}px);
				transform: rotateX(90deg) translateZ(${sideTranslateZ}px);
				height: ${sideHeight}px;
				width: ${sideWidth}px;
				transition: width 0.6s, height 0.6s;
				`;
			cubesides[1].style = `
				-webkit-transform: translateZ(${sideTranslateZ}px);
				-moz-transform: translateZ(${sideTranslateZ}px);
				-ms-transform: translateZ(${sideTranslateZ}px);
				-o-transform: translateZ(${sideTranslateZ}px);
				transform: translateZ(${sideTranslateZ}px);
				height: ${sideHeight}px;
				width: ${sideWidth}px;
				transition: width 0.6s, height 0.6s;
				`;
			cubesides[2].style = `
				-webkit-transform: rotateY(90deg) translateZ(${sideTranslateZ}px);
				-moz-transform: rotateY(90deg) translateZ(${sideTranslateZ}px);
				-ms-transform: rotateY(90deg) translateZ(${sideTranslateZ}px);
				-o-transform: rotateY(90deg) translateZ(${sideTranslateZ}px);
				transform: rotateY(90deg) translateZ(${sideTranslateZ}px);
				height: ${sideHeight}px;
				width: ${sideWidth}px;
				transition: width 0.6s, height 0.6s;
				`;
			cubesides[3].style = `
				-webkit-transform: rotateY(180deg) translateZ(${sideTranslateZ}px);
				-moz-transform: rotateY(180deg) translateZ(${sideTranslateZ}px);
				-ms-transform: rotateY(180deg) translateZ(${sideTranslateZ}px);
				-o-transform: rotateY(180deg) translateZ(${sideTranslateZ}px);
				transform: rotateY(180deg) translateZ(${sideTranslateZ}px);
				height: ${sideHeight}px;
				width: ${sideWidth}px;
				transition: width 0.6s, height 0.6s;
				`;
			cubesides[4].style = `
				-webkit-transform: rotateY(-90deg) translateZ(${sideTranslateZ}px);
				-moz-transform: rotateY(-90deg) translateZ(${sideTranslateZ}px);
				-ms-transform: rotateY(-90deg) translateZ(${sideTranslateZ}px);
				-o-transform: rotateY(-90deg) translateZ(${sideTranslateZ}px);
				transform: rotateY(-90deg) translateZ(${sideTranslateZ}px);
				height: ${sideHeight}px;
				width: ${sideWidth}px;
				transition: width 0.6s, height 0.6s;
				`;
			cubesides[5].style = `
				-webkit-transform: rotateX(-90deg) rotate(180deg) translateZ(${sideTranslateZ}px);
				-moz-transform: rotateX(-90deg) rotate(180deg) translateZ(${sideTranslateZ}px);
				-ms-transform: rotateX(-90deg) rotate(180deg) translateZ(${sideTranslateZ}px);
				-o-transform: rotateX(-90deg) rotate(180deg) translateZ(${sideTranslateZ}px);
				transform: rotateX(-90deg) rotate(180deg) translateZ(${sideTranslateZ}px);
				height: ${sideHeight}px;
				width: ${sideWidth}px;
				transition: width 0.6s, height 0.6s;
				`;
		}

		let cubeSizeSwitcher = false;
		let cubeScaleSizeSwitcher = 0.8;
		if (window.innerWidth < 640) {
			cubeScaleSizeSwitcher = 0.6;
		}

		blank.onmousedown = function (event) {

			if (event.detail > 1 && !cubeSizeSwitcher) {
				cubeResizer(50, 100, 100, 35, 35);
				cubeSizeSwitcher = true;
			} else if (event.detail > 1 && cubeSizeSwitcher) {
				cubeResizer(100, 200, 200, 50, 50);
				cubeSizeSwitcher = false;
			}
			else {
				html.style.overflow = `hidden`

				let shiftX = event.clientX - blank.getBoundingClientRect().left;
				let shiftY = event.clientY - blank.getBoundingClientRect().top;

				cube.style.position = 'absolute';
				cube.style.zIndex = '1000';

				moveAt(event.pageX, event.pageY);

				function moveAt(pageX, pageY) {
					detecter = false;
					cube.style.left = `${pageX - (((cube.offsetWidth) / 2) - ((blank.offsetWidth * cubeScaleSizeSwitcher) / 2) + shiftX)}px`;
					cube.style.top = `${pageY - (((cube.offsetHeight) / 2) - ((blank.offsetHeight * cubeScaleSizeSwitcher) / 2) + shiftY)}px`;
				}

				function onMouseMove(event) {
					moveAt(event.pageX, event.pageY);
				}


				document.addEventListener('mousemove', onMouseMove);

				cube.onmouseup = function (event) {
					detecter = true;
					html.style.overflow = `auto`;
					document.removeEventListener('mousemove', onMouseMove);
					cube.onmouseup = null;
					cube.style.position = 'absolute';
				}

				cube.ondragstart = function () {
					return false;
				}

			}
		}
		// new code end


		events.add(this);

		var self = this;

		this.element = data.element;
		this.fps = data.fps;
		this.sensivity = data.sensivity;
		this.sensivityFade = data.sensivityFade;
		this.touchSensivity = data.touchSensivity;
		this.speed = data.speed;

		this.lastX = 0;
		this.lastY = 0;
		this.mouseX = 0;
		this.mouseY = 0;
		this.distanceX = 0;
		this.distanceY = 0;
		this.positionX = 1122;
		this.positionY = 136;
		this.torqueX = 0;
		this.torqueY = 0;

		this.down = false;
		this.upsideDown = false;

		this.previousPositionX = 0;
		this.previousPositionY = 0;

		this.currentSide = 0;
		this.calculatedSide = 0;


		bindEvent(document, 'mousedown', function () {
			self.down = true;
		});

		bindEvent(document, 'mouseup', function () {
			self.down = false;
		});

		bindEvent(document, 'keyup', function () {
			self.down = false;
		});


		// прокрутка куба
		bindEvent(document, 'mousemove', function (e) {
			if (detecter !== false && e.target.closest('#cube-wrapper')) {
				self.mouseX = e.pageX;
				self.mouseY = e.pageY;
			}
		});
		// прокрутка куба

		bindEvent(document, 'touchstart', function (e) {

			self.down = true;
			e.touches ? e = e.touches[0] : null;
			self.mouseX = e.pageX / self.touchSensivity;
			self.mouseY = e.pageY / self.touchSensivity;
			self.lastX = self.mouseX;
			self.lastY = self.mouseY;
		});

		bindEvent(document, 'touchmove', function (e) {
			if (e.preventDefault) {
				e.preventDefault();
			}

			if (e.touches.length == 1) {

				e.touches ? e = e.touches[0] : null;

				self.mouseX = e.pageX / self.touchSensivity;
				self.mouseY = e.pageY / self.touchSensivity;

			}
		});

		bindEvent(document, 'touchend', function (e) {
			self.down = false;
		});

		setInterval(this.animate.bind(this), this.fps);

	}
	events.implement(Viewport);
	Viewport.prototype.animate = function () {

		this.distanceX = (this.mouseX - this.lastX);
		this.distanceY = (this.mouseY - this.lastY);

		this.lastX = this.mouseX;
		this.lastY = this.mouseY;

		if (this.down) {
			this.torqueX = this.torqueX * this.sensivityFade + (this.distanceX * this.speed - this.torqueX) * this.sensivity;
			this.torqueY = this.torqueY * this.sensivityFade + (this.distanceY * this.speed - this.torqueY) * this.sensivity;
		}
		if (Math.abs(this.torqueX) > 1.0 || Math.abs(this.torqueY) > 1.0) {
			if (!this.down) {
				this.torqueX *= this.sensivityFade;
				this.torqueY *= this.sensivityFade;
			}
			this.positionY -= this.torqueY;
			if (this.positionY > 360) {
				this.positionY -= 360;
			} else if (this.positionY < 0) {
				this.positionY += 360;
			}
			if (this.positionY > 90 && this.positionY < 270) {
				this.positionX -= this.torqueX;
				if (!this.upsideDown) {
					this.upsideDown = true;
					this.emit('upsideDown', { upsideDown: this.upsideDown });
				}
			} else {
				this.positionX += this.torqueX;
				if (this.upsideDown) {
					this.upsideDown = false;
					this.emit('upsideDown', { upsideDown: this.upsideDown });
				}
			}
			if (this.positionX > 360) {
				this.positionX -= 360;
			} else if (this.positionX < 0) {
				this.positionX += 360;
			}
			if (!(this.positionY >= 46 && this.positionY <= 130) && !(this.positionY >= 220 && this.positionY <= 308)) {
				if (this.upsideDown) {
					if (this.positionX >= 42 && this.positionX <= 130) {
						this.calculatedSide = 3;
					} else if (this.positionX >= 131 && this.positionX <= 223) {
						this.calculatedSide = 2;
					} else if (this.positionX >= 224 && this.positionX <= 314) {
						this.calculatedSide = 5;
					} else {
						this.calculatedSide = 4;
					}
				} else {
					if (this.positionX >= 42 && this.positionX <= 130) {
						this.calculatedSide = 5;
					} else if (this.positionX >= 131 && this.positionX <= 223) {
						this.calculatedSide = 4;
					} else if (this.positionX >= 224 && this.positionX <= 314) {
						this.calculatedSide = 3;
					} else {
						this.calculatedSide = 2;
					}
				}
			} else {
				if (this.positionY >= 46 && this.positionY <= 130) {
					this.calculatedSide = 6;
				}
				if (this.positionY >= 220 && this.positionY <= 308) {
					this.calculatedSide = 1;
				}
			}
			if (this.calculatedSide !== this.currentSide) {
				this.currentSide = this.calculatedSide;
				this.emit('sideChange');
			}
		}
		this.element.style[userPrefix.js + 'Transform'] = 'rotateX(' + this.positionY + 'deg) rotateY(' + this.positionX + 'deg)';
		if (this.positionY != this.previousPositionY || this.positionX != this.previousPositionX) {
			this.previousPositionY = this.positionY;
			this.previousPositionX = this.positionX;
			this.emit('rotate');
		}
	}
	var viewport = new Viewport({
		element: document.getElementsByClassName('cube')[0],
		fps: 20,
		sensivity: .1,
		sensivityFade: .93,
		speed: 2,
		touchSensivity: 1.5
	});
	function Cube(data) {
		var self = this;
		this.element = data.element;
		this.sides = this.element.getElementsByClassName('side');
		this.viewport = data.viewport;
		this.viewport.on('rotate', function () {
			self.rotateSides();
		});
		this.viewport.on('upsideDown', function (obj) {
			self.upsideDown(obj);
		});
		this.viewport.on('sideChange', function () {
			self.sideChange();
		});
	}
	// сохранение вертикальной ротации изображения
	Cube.prototype.rotateSides = function () {
		var viewport = this.viewport;
		if (viewport.positionY > 90 && viewport.positionY < 270) {
			this.sides[0].getElementsByClassName('cube-image')[0].style[userPrefix.js + 'Transform'] = 'rotate(' + (viewport.positionX + viewport.torqueX) + 'deg)';
			this.sides[5].getElementsByClassName('cube-image')[0].style[userPrefix.js + 'Transform'] = 'rotate(' + -(viewport.positionX + 180 + viewport.torqueX) + 'deg)';
		} else {
			this.sides[0].getElementsByClassName('cube-image')[0].style[userPrefix.js + 'Transform'] = 'rotate(' + (viewport.positionX - viewport.torqueX) + 'deg)';
			this.sides[5].getElementsByClassName('cube-image')[0].style[userPrefix.js + 'Transform'] = 'rotate(' + -(viewport.positionX + 180 - viewport.torqueX) + 'deg)';
		}
	}
	// сохранение вертикальной ротации изображения
	Cube.prototype.upsideDown = function (obj) {
		var deg = (obj.upsideDown == true) ? '180deg' : '0deg';
		var i = 5;
		while (i > 0 && --i) {
			this.sides[i].getElementsByClassName('cube-image')[0].style[userPrefix.js + 'Transform'] = 'rotate(' + deg + ')';
		}
	}
	Cube.prototype.sideChange = function () {
		for (var i = 0; i < this.sides.length; ++i) {
			this.sides[i].getElementsByClassName('cube-image')[0].className = 'cube-image';
		}
		this.sides[this.viewport.currentSide - 1].getElementsByClassName('cube-image')[0].className = 'cube-image active';
	}
	new Cube({
		viewport: viewport,
		element: document.getElementsByClassName('cube')[0]
	});
});
