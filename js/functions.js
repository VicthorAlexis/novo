$(function(){

	/*Menu mobile*/

	$('nav.menu-mobile').click(function(){
		$(this).find('ul').slideToggle();
	});

	/* Scroll dinâmico para contato*/

	var directory = '/Front-end/projetos/Projeto%205/';

	$('[goto="contato"]').click(function(){
		location.href = directory + 'index.html?contato';
		return false;
	});

	checkUrl();

	function checkUrl(){
		var url = location.href.split('/');
		var curPage = url[url.length - 1].split('?');

		if(curPage[1] == 'contato'){
			$('html,body').animate({'scrollTop': $('.contato').offset().top});
		
			$(window).scroll(function(){
				var windowOffY = $(window).scrollTop();

				if(windowOffY >= $('.contato').offset().top - 180){
					$('footer li a').css('color', 'white');
					$('footer [goto="contato"]').css('color', '#EB2D2D');
				}
			});
		}
	}
	
	/* Sistema de pesquisa */

	var currentValue = 0;
	var isDrag = false;
	var maxPrice = 250000;
	var currentPrice = 0;

	$('.pointer-barra').mousedown(function(){
		isDrag = true;
	});

	$(document).mouseup(function(){
		isDrag = false;
		enableTextSelection();
	});

	$('.barra-preco').mousemove(function(e){
		if(isDrag == true){
			var elBase = $(this);
			var mouseX = e.pageX - elBase.offset().left;

			if(mouseX < 0)
				mouseX = 0;
			if(mouseX > elBase.width())
				mouseX = elBase.width();

			$('.pointer-barra').css('left', (mouseX - 13) + 'px');

			currentValue = (mouseX / elBase.width()) * 100;
			
			$('.barra-preco-fill').css('width', currentValue + '%');

			currentPrice = (currentValue / 100) * maxPrice;

			currentPrice = formattingPrice(currentPrice);

			$('.preco_atual').html('R$'+currentPrice);

			disableTextSelection();
		}
	});

	function disableTextSelection(){
		$('body').css('user-select','none');
		$('body').css('-webkit-user-select','none');
		$('body').css('-ms-user-select','none');
		$('body').css('-o-user-select','none');
		$('body').css('-moz-user-select','none');
	}

	function enableTextSelection(){
		$('body').css('user-select','auto');
		$('body').css('-webkit-user-select','auto');
		$('body').css('-ms-user-select','auto');
		$('body').css('-o-user-select','auto');
		$('body').css('-moz-user-select','auto');
	}

	/* Formatação dos preços */

	function formattingPrice(currentPrice){
		currentPrice = currentPrice.toFixed(2);
		var price_arr = currentPrice.split('.');
		var newPrice = totalFormatting(price_arr);
	
		return newPrice;
	}

	function totalFormatting(price_arr){
		if(price_arr[0] < 1000)
			return price_arr[0]+','+price_arr[1];
		else if(price_arr[0] < 10000){
			return price_arr[0][0] + '.' + price_arr[0].substr(1,price_arr[0].lenght) + 
			',' + price_arr[1];
		}
		else if(price_arr[0] < 100000){
			return price_arr[0][0] + price_arr[0][1] + '.' + 
			price_arr[0].substr(2,price_arr[0].lenght) + ',' + price_arr[1];
		}
		else if(price_arr[0] < 1000000){
			return price_arr[0].substr(price_arr[0].lenght,3) + '.' +
			price_arr[0].substr(3,price_arr[0].lenght) + ',' + price_arr[1];
		}
	}

	/* * * * */

	/* slider personalizado (veículo-teste.html) */

	var curIndex = 0;
	var maxIndex = Math.ceil($('.mini-img').length/3) - 1;

	initSlider();
	navigateSlider();
	clickSlider();

	function initSlider(){
		var amt = $('.mini-img').length * 33.3;
		var elScroll = $('.nav-galeria-wrapper');
		var elSingle = $('.mini-img');

		elScroll.css('width', amt + '%');
		elSingle.css('width', 33.3 * 100/amt + '%').css('padding-top', 33.3 * 100/amt * 0.6 + '%');
	}

	function navigateSlider(){
		$('.nav-arrow-right').click(function(){
			if(curIndex < maxIndex){
				++curIndex;
				
				var elOff = $('.mini-img').eq(curIndex*3).offset().left - $('.nav-galeria-wrapper').offset().left;
				
				$('.nav-galeria').animate({'scrollLeft': elOff + 'px'});
			}
		});

		$('.nav-arrow-left').click(function(){
			if(curIndex > 0){
				--curIndex

				var elOff = $('.mini-img').eq(curIndex*3).offset().left - $('.nav-galeria-wrapper').offset().left;
				
				$('.nav-galeria').animate({'scrollLeft': elOff + 'px'});
			}
		});
	}

	function clickSlider(){
		$('.mini-img').click(function(){
			$('.mini-img').css('border-color', 'white');
			$(this).css('border-color','#ccc');

			var img = $(this).css('background-image');

			$('.foto-destaque').css('background-image', img);

			//(this).children()
		});

		$('.mini-img').eq(0).click();
	}

	/* * * * */

	/* Mudança de depoimentos dinamicamente */

	var curIndexDp = 0;
	var maxIndexDp = $('.half2 .text-block p').length;

	$('.half2 .text-block p').hide();
	$('.half2 .text-block p').eq(0).show();

	$('.half2 .nome-depoimento p').hide();
	$('.half2 .nome-depoimento p').eq(0).show();

	$('[next]').click(function(){
		
		++curIndexDp;

		if(curIndexDp == maxIndexDp)
			curIndexDp = 0;

		$('.half2 .text-block p').hide();
		$('.half2 .text-block p').eq(curIndexDp).show();

		$('.half2 .nome-depoimento p').hide();
		$('.half2 .nome-depoimento p').eq(curIndexDp).show();

	});

	$('[prev]').click(function(){
		
		--curIndexDp;

		if(curIndexDp < 0)
			curIndexDp = maxIndexDp - 1;

		$('.half2 .text-block p').hide();
		$('.half2 .text-block p').eq(curIndexDp).show();

		$('.half2 .nome-depoimento p').hide();
		$('.half2 .nome-depoimento p').eq(curIndexDp).show();

	});

	/* * * * */
});