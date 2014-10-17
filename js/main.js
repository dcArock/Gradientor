$(document).ready(function () {

	'use strict';

	$('#code-display').fadeOut();

	var gradientDone, gradientColorsString, isCircular, circular, isRandom, valueIsOpen = false,
		value = [],
		codeIsOpen = false,
		menuIsOpen = false,
		isIE, isIE11;

	function roll(to) {

		return Math.floor(Math.random() * to);

	}

	function gradient(xx) {

		// return gradient type
		function gradientType() {

			if (isRandom === 1) {

				switch (roll(2)) {

				case 0:
					isCircular = false;
					return 'linear-gradient';

				case 1:
					isCircular = true;
					return 'radial-gradient';

				}

			}
			if (Number($('#circular').val()) === 1) {

				return 'radial-gradient';

			} else {

				return 'linear-gradient';

			}

		}

		// return number of stops
		function gradientStops() {

			if (isRandom === 1) {

				return (roll(4) + 2);

			} else {

				return $('#stops').val();

			}
		}

		// retun gradient angle
		function gradientAngle() {

			if (Number($('#angle').val()) <= 10) {
				return roll(361);

			} else {

				return Number($('#angle').val());

			}

		}

		// return hex color
		function gradientColor() {

			//			var tmp = roll(16);
			//
			//			if (tmp >= 10) {
			//
			//				switch (tmp) {
			//
			//				case 10:
			//					tmp = 'a';
			//					break;
			//
			//				case 11:
			//					tmp = 'b';
			//					break;
			//
			//				case 12:
			//					tmp = 'c';
			//					break;
			//
			//				case 13:
			//					tmp = 'd';
			//					break;
			//
			//				case 14:
			//					tmp = 'e';
			//					break;
			//
			//				case 15:
			//					tmp = 'f';
			//					break;
			//
			//				}
			//
			//			}

			//			return tmp;

			return roll(256);


		}

		// return opacity
		function gradientOpacity() {

			return (roll(101) / 100);

		}

		// return percent
		function gradientPercent() {

			return Math.floor(roll(101));

		}

		// return string with colors
		function gradientColors() {

			gradientColorsString = '';

			var tmp = gradientStops(),
				i;

			for (i = 0; i <= Number(tmp); i++) {

				// if last stop, no comma at end
				if (i === Number(tmp)) {

					//					gradientColorsString += '#' + gradientColor() + gradientColor() + gradientColor() + gradientColor() + gradientColor() + gradientColor();

					gradientColorsString += 'rgba(' + gradientColor() + ',' + gradientColor() + ',' + gradientColor() + ',' + gradientOpacity() + ')';

				} else {

					// put comma at the end	
					//					gradientColorsString += '#' + gradientColor() + gradientColor() + gradientColor() + gradientColor() + gradientColor() + gradientColor();

					gradientColorsString += 'rgba(' + gradientColor() + ',' + gradientColor() + ',' + gradientColor() + ',' + gradientOpacity() + ')';


					if (roll(3) === 0) {

						//						gradientColorsString += ' ' + gradientPercent() + '%';

						gradientColorsString += ' ' + gradientPercent() + '%';

					}

					gradientColorsString += ', ';

				}

			}

			return gradientColorsString;

		}


		// Create string for css
		gradientDone = gradientType() + '(';

		if (!isCircular && (Number($('#circular').val()) === 0)) {

			gradientDone += gradientAngle() + 'deg, ';

		}

		gradientDone += gradientColors() + ')';

		//		console.log(gradientDone);

		$(xx).css({

			'background': gradientDone

		});

		switch (xx) {

		case '.cube1':
			value[1] = gradientDone;
			break;

		case '.cube2':
			value[2] = gradientDone;
			break;

		case '.cube3':
			value[3] = gradientDone;
			break;

		case '.cube4':
			value[4] = gradientDone;
			break;

		case '.cube5':
			value[5] = gradientDone;
			break;

		}


	}

	// Handle actions when roll is clicked
	$('.roll').on('click', function () {

		// stop animation on roll icon
		$('.roll').css({
			'animation': 'none'
		});


		isRandom = Number($('#is-random').val());

		if (Number($('#layers').val()) === 1) {

			$('.cube-layer').fadeOut();

			$('.cube1').css({
				'opacity': 1
			});

			gradient('.cube1');

		} else {

			var tmp, j;

			for (j = 1; j <= Number($('#layers').val()); j++) {
				$('.cube-layer').fadeIn();

				tmp = '.cube' + j;

				gradient(tmp);

				$(tmp).css({
					'opacity': (roll(101) * 0.01)
				});

			}

		}

	});


	// Code page handler
	$('#code').on('click', function () {

		// Update Value

		//		$('#code-display .code-container').html(
		//		gradientDone
		//		);

		// Handle opening function
		if (!codeIsOpen) {

			// Appear
			$('#code-display').fadeIn(500);
			codeIsOpen = true;


			// if only one layer
			if (Number($('input#layers').val()) === 1) {

				$('#code-display .code-container').html(
					gradientDone
				);

			} else {

				var k;
				//			gradientDone = 'Layer 1: ' + gradientDone;

				gradientDone = '';

				for (k = 1; k <= $('input#layers').val(); k++) {

					//				console.log($(tmp).css('background'))

					gradientDone = 'Layer ' + k + ': ' + value[k] + '<br>' + gradientDone;

				}

				$('#code-display .code-container').html(
					gradientDone
				);

			}

			// Center div
			$('#code-display .code-container').animate({
				'top': ((($('#code-display').height() - $('#code-display .code-container').height()) / 2) + 'px')
			}, 500);



		} else {

			$('#code-display').fadeOut(500);
			//			gradientDone = '';
			codeIsOpen = false;

		}


	});


	// Close code page on close click button
	$('.close').on('mouseenter', function () {

		$('#code-display').fadeOut(250);

	});


	// Hide menu on start
	$('#menu').animate({

		width: 'toggle'

	}, 0);


	// Close menu on mouse leave
	//	$('#menu').on('mouseleave', function () {
	//	
	//		$('#menu').animate({
	//		
	//			width: 'toggle'
	//		
	//		}, 100);
	//		
	//		if ( valueIsOpen ) {
	//		
	//		$('#value').animate({
	//		
	//			width: 'toggle'
	//		
	//		}, 100);
	//		
	//			valueIsOpen = false
	//			
	//		}
	//	
	//	})

	isIE = (navigator.userAgent.indexOf("MSIE") !== -1);
	isIE11 = (navigator.userAgent.indexOf("rv:11") !== -1);

	$('#menu').on('mouseleave', function () {

		if (!isIE && !isIE11 && ($(window).width() > 480)) {

			if (menuIsOpen) {

				$('#menu').animate({

					width: 'toggle'

				}, 250);

				menuIsOpen = false;

			}

		}

	});


	// Open the menu panel
	$('.menu-icon').on('click', function () {

		if (!menuIsOpen) {

			$('#menu').animate({

				width: 'toggle'

			}, 500);

			menuIsOpen = true;

		} else {

			$('#menu').animate({

				width: 'toggle'

			}, 500);

			menuIsOpen = false;

		}

		if (valueIsOpen) {

			$('#value').animate({

				width: 'toggle'

			}, 500);

			valueIsOpen = false;

		}

	});


	// Initial hide the value box
	$('#value').animate({

		width: 'toggle'

	}, 0);


	// Handles the value window html and slide in
	$('input').change(function () {

		if (!valueIsOpen) {

			$('#value').animate({

				width: 'toggle'

			}, 500);

			valueIsOpen = true;

		}

		var tmp = $(this).val();

		if ($(this).attr('id') === 'layers') {

			tmp = 'Layers :' + $(this).val();

		}

		if ($(this).attr('id') === 'stops') {

			tmp = 'Stops :' + $(this).val();

		}

		if ($(this).attr('id') === 'circular') {

			if (Number($(this).val()) === 0) {

				tmp = 'Linear Only';

			} else {

				tmp = 'Circular Only';

			}

		}

		if ($(this).attr('id') === 'angle') {

			if (Number($(this).val()) === 0) {

				tmp = 'Random';

			} else {

				tmp = $(this).val() + ' deg';

			}

		}

		if ($(this).attr('id') === 'is-random') {

			if (Number($(this).val()) === 0) {

				tmp = 'Controllable';

			} else {

				tmp = 'All Random';

			}

		}


		$('#value span').html(tmp);



	});

	if ($(window).width() <= 480) {

		$('#menu').css({

			'bottom': ((($('.cube1').height() - $('.open-menu').offset().top) * 1.66) + 'px')

		});

		//		$('.menu-tools').css({
		//			'padding-top': ((($('#menu').height() - $('.menu-tools').height() ) / 2) + 'px')
		//		})

	}


	// Load with gradient
	gradient('.cube1');

	$('#loader').animate({
		height: 'toggle'
	}, 500, function () {
		$('#loader').remove();
	});

});