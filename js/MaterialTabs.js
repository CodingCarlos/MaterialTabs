function MaterialTabs(dom, opts) {

	this.tabsDom = '.tabs';
	this.swiperDom = '.swiper-container';
	this.slide = 0;
	this.minTabWidth = 0;

	if(typeof(opts) != 'undefined') {
		if( typeof(opts.tabsDom) != 'undefined' ) {
			this.tabsDom = opts.tabsDom;
		}
		
		if( typeof(opts.swiperDom) != 'undefined' ) {
			this.swiperDom = opts.swiperDom;
		}
		
		if( typeof(opts.initialSlide) != 'undefined' && opts.initialSlide > 0 ) {
			this.slide = opts.initialSlide;
		}

		if( typeof(opts.minTabWidth) != 'undefined' && opts.minTabWidth > 0 ) {
			this.minTabWidth = opts.minTabWidth;
		}
	}

	this.countSlides = $(this.tabsDom + ' .tab').length;

	/* Define usefull variables */
	var hashnav = false;
	var spaceBetween = 0;
	
	if(typeof(opts) != 'undefined') {
		if( typeof(opts.hashnav) != 'undefined' ) {
			var hashnav = opts.hashnav;
		}
	
		if( typeof(opts.spaceBetween) != 'undefined' && opts.spaceBetween > 0 ) {
			var spaceBetween = opts.spaceBetween;
		}
	}

	var _this = this;


	/* Define methods for MaterialTabs objects */
	this.slideNext = function() {

		var nextSlide = 0;

		if(this.slide == 0) {
			nextSlide = this.slide + 2;
		} else {
			nextSlide = this.slide + 1;
		}

		if(nextSlide <= this.countSlides) {
			this.slide = nextSlide;
			// Move both plugins
			this.swiper.slideNext();
			_this.selectTab(nextSlide);
		}
	};

	this.slidePrev = function() {
		var prevSlide = this.slide - 1;
		if(prevSlide > 0) {
			this.slide = prevSlide;
			// Move both plugins
			this.swiper.slidePrev();
			_this.selectTab(prevSlide);
		}
	};

	this.selectTab = function(index) {
		var tabto = $(this.tabsDom + ' .tab:nth-child(' + index + ') a').attr('href').split("#")[1];
		$(this.tabsDom).tabs('select_tab', tabto);
		this.slide = index;
	};

	this.slideTab = function(href) {
		var index = -1;
		$.each( $(this.tabsDom + ' .tab a'), function(key, value) {
			if($(value).attr('href') == href) {
				index = key;
				return false;
			}

		});
		if(index >= 0) {
			this.swiper.slideTo(index, 300);
			this.slide = index;
		}
    }

    this.slideTo = function(id) {
    	this.swiper.slideTo(id);
    	_this.slideTab(id);
    }


	/* Swiper init */
	this.swiper = new Swiper( this.swiperDom, {
		initialSlide: this.slide,
		hashnav: hashnav,
		spaceBetween: spaceBetween
	});

	/* Tabs init */
	$(this.tabsDom).tabs();
	/* Tab select */
	if(this.slide != 0) {
		_this.selectTab( (this.slide + 1) );
	}

	if (this.minTabWidth > 0) {
		$.each($('.tab'), function(key, val) {
			$(val).css('min-width', this.minTabWidth + 'px');
		});

		if(this.minTabWidth * 4 > $(this.tabsDom).width()) {
			$(this.tabsDom).css({'width': (this.minTabWidth * 4) + 'px' });
		}
	};

	/* Listeners for autochange */

	// Listener to swipe on icon tap
	$(this.tabsDom + ' li a').on('click', function() {
		_this.slideTab( $(this).attr('href'));
	})
	// Change sellector on swipe
	this.swiper.on('slideChangeStart', function (swiper) {
		_this.selectTab(swiper.activeIndex+1);
	});
}