
(function (global) {

var dc = {};

var homeHtml = "snippets/home-snippet.html";
var swiperHtml = "snippets/swiper_snippet.html";
var prod_swiperHtml = "snippets/prod-swiper_snippet.html";
var deliveryHtml = "snippets/delivery-snippet.html";
var catalogHtml = "snippets/catalog/catalog.html";
var aboutHtml = "snippets/about.html";
var pageHtml = "snippets/catalog/category/single-page.html";

// Convenience function for inserting innerHTML for 'select'
var insertHtml = function (selector, html) {
  var targetElem = document.querySelector(selector);
  targetElem.innerHTML = html;
};

// Show loading icon inside element identified by 'selector'.
var showLoading = function (selector) {
  var html = "<div class='align-items-center'>";
  html += "<img src='img/ajax-loader.gif'></div>";
  insertHtml(selector, html);
};

// On page load (before images or CSS)
document.addEventListener("DOMContentLoaded", function (event) {

//On first load, show home view
showLoading(".section--content");
$ajaxUtils.sendGetRequest(
  homeHtml,
  function (responseText) {
    document.querySelector(".section--content").innerHTML = responseText;
  },
  false);

$ajaxUtils.sendGetRequest(
  swiperHtml,
  function (responseText) {
    document.querySelector("#swiper-row").innerHTML = responseText;
    const swiper = new Swiper('.swiper', {
	  // Optional parameters
	  direction: 'horizontal',
	  loop: true,

	  // If we need pagination
	  pagination: {
	    el: '.swiper-pagination',
	    // Буллеты
		clickable: true,
		// Динамические буллеты
		dynamicBullets: true,
	  },

	  // Navigation arrows
	  navigation: {
	    nextEl: '.swiper-button-next',
	    prevEl: '.swiper-button-prev',
	  },

	  // Autoplay
	   autoplay: {
	   delay: 5000,
	  },
}); }, 
    false);

    $ajaxUtils.sendGetRequest(
	  prod_swiperHtml,
	  function (responseText) {
	    document.querySelector(".index").innerHTML = responseText;
	    const prod_swiper = new Swiper('.p-swiper', {
  // Optional parameters
  direction: 'horizontal',
  
  // Navigation arrows
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },

  slidesPerView: 4,
  slidesPerGroup: 4,

  breakpoints: {
  	0: {
  		slidesPerView: 2,
		slidesPerGroup: 2,
  	},
  	576: {
  		slidesPerView: 3,
		slidesPerGroup: 3,
  	},
  	768: {
  		slidesPerView: 4,
		slidesPerGroup: 4,
  	}
  },
}); 
	},
  false);
});


function page (x) {
	var html;
	switch(x){
		case "home": html = homeHtml;
			break;
		case "delivery": html = deliveryHtml;
			break;
		case "catalog": html = catalogHtml;
			break;
		case "about": html = aboutHtml;
		 	break;
		case "oplata": html = "snippets/oplata.html";
			break;
		case "vozvrat": html = "snippets/vozvrat.html";
			break;
		case "order": html = "snippets/order.html";
			break;
		case 'contacts': html = "snippets/contacts.html";
			break;
	}
	return html;
}

dc.loadPage = function (x, index, id) {
  var html = page(x);
  document.getElementById("header").setAttribute("style","position: relative");	
  $ajaxUtils.sendGetRequest(
  html,
  function (responseText) {
    document.querySelector(".section--content").innerHTML = responseText;
  },
  false);
  // Загрузить категорию в каталоге
	if (x === "catalog") {
		dc.loadCatalogeCollection(index, id);
	} else if (x === "home") {
		dc.loadSwipers();
	}

}

dc.loadSwipers = function() {
	document.getElementById("header").setAttribute("style","position: absolute");	
	$ajaxUtils.sendGetRequest(
  swiperHtml,
  function (responseText) {
    document.querySelector("#swiper-row").innerHTML = responseText;
    const swiper = new Swiper('.swiper', {
	  // Optional parameters
	  direction: 'horizontal',
	  loop: true,

	  // If we need pagination
	  pagination: {
	    el: '.swiper-pagination',
	    // Буллеты
		clickable: true,
		// Динамические буллеты
		dynamicBullets: true,
	  },

	  // Navigation arrows
	  navigation: {
	    nextEl: '.swiper-button-next',
	    prevEl: '.swiper-button-prev',
	  },

	  // Autoplay
	   autoplay: {
	   delay: 5000,
	  },
}); }, 
    false);

    $ajaxUtils.sendGetRequest(
	  prod_swiperHtml,
	  function (responseText) {
	    document.querySelector(".index").innerHTML = responseText;
	    const prod_swiper = new Swiper('.p-swiper', {
  // Optional parameters
  direction: 'horizontal',
  
  // Navigation arrows
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },

  slidesPerView: 4,
  slidesPerGroup: 4,

  breakpoints: {
  	0: {
  		slidesPerView: 2,
		slidesPerGroup: 2,
  	},
  	576: {
  		slidesPerView: 3,
		slidesPerGroup: 3,
  	},
  	768: {
  		slidesPerView: 4,
		slidesPerGroup: 4,
  	}
  },
}); 
	},
  false);
}

let buttons = new Array();

js_size_button = function(obj) {
		let obj_id = obj.id;
		console.log(obj_id);
		buttons.push(obj_id);
		console.log(buttons);
		let buttons_i = buttons[buttons.length-1];
		let buttons_i_1 = buttons[buttons.length-2]
		if (buttons.length < 2) {
		document.getElementById(buttons_i).style.cssText = 'color: #ffffff; background: #4a4a4a';
	} else {
		document.getElementById(buttons_i).style.cssText = 'color: #ffffff; background: #4a4a4a';
		document.getElementById(buttons_i_1).style.cssText = 'color: #000000; background: #eeeeee';
	}

}


dc.loadCatalogeCollection = function (index, id) {
	var html_cat;
	// var breadcrumbs = "<a href='index.html' class='breadcrumbs-page breadcrumbs-page--home'> Каталог </a><span class=’breadcrumbs-pipe’> / </span>";
	var breadcrumbs_cat;
	var breadcrumbs_cat_prod;
	var link;
	switch (index) {
		case "all": html_cat = "snippets/catalog/catalog-collection.html";
			breadcrumbs_cat = "Каталог";
			break;
		case "necklace": html_cat = "snippets/catalog/category/necklace/necklace-snippet.html";
			breadcrumbs_cat = "<span class='breadcrumbs-page'>Цепочки и ожерелья</span>";
			switch (id) {
				case 1: html_cat = neck_1.page;
				breadcrumbs_cat_prod = neck_1.breadcrumbs_cat_prod;
				break;
				case 2: html_cat = neck_2.page;
				breadcrumbs_cat_prod = neck_2.breadcrumbs_cat_prod;
				break;
				default: break;
			}
			break;
		case "cufflinks": html_cat = "snippets/catalog/category/cufflinks/cufflinks-snippet.html";
			breadcrumbs_cat = "<span class='breadcrumbs-page'>Запонки</span>";
			switch (id) {
				case 1: html_cat = cuffl_1.page;
				breadcrumbs_cat_prod = cuffl_1.breadcrumbs_cat_prod;
				break;
				case 2: html_cat = cuffl_2.page;
				breadcrumbs_cat_prod = cuffl_2.breadcrumbs_cat_prod;
				break;
				default: break;
			}
			break;
		case "earrings": html_cat = "snippets/catalog/category/earrings/earrings-snippet.html";
			breadcrumbs_cat = "<span class='breadcrumbs-page'>Серьги</span>";
			switch (id) {
				case 1: html_cat = earr_1.page;
				breadcrumbs_cat_prod = earr_1.breadcrumbs_cat_prod;
				break;
				case 2: html_cat = earr_2.page;
				breadcrumbs_cat_prod = earr_2.breadcrumbs_cat_prod;
				break;
				default: break;
			}
			break;
		case "wristwatch": html_cat = "snippets/catalog/category/wristwatch/wristwatch-snippet.html";
			breadcrumbs_cat = "<span class='breadcrumbs-page'>Часы</span>";
			switch (id) {
				case 1: html_cat = watch_1.page;
				breadcrumbs_cat_prod = watch_1.breadcrumbs_cat_prod;
				break;
				case 2: html_cat = watch_2.page;
				breadcrumbs_cat_prod = watch_2.breadcrumbs_cat_prod;
				break;
				default: break;
			}
			break;
		case "bracelet": html_cat = "snippets/catalog/category/bracelet/bracelet-snippet.html";
			breadcrumbs_cat = "<span class='breadcrumbs-page'>Браслеты</span>";
			switch (id) {
				case 1: html_cat = brac_1.page;
				breadcrumbs_cat_prod = brac_1.breadcrumbs_cat_prod;
				break;
				default: break;
			}
			break;
		case "rings": html_cat = "snippets/catalog/category/rings/rings-snippet.html";
			breadcrumbs_cat = "<span class='breadcrumbs-page'>Кольца</span>";
			switch (id) {
				case 1: html_cat = ring_1.page;
				breadcrumbs_cat_prod = ring_1.breadcrumbs_cat_prod;
				break;
				case 2: html_cat = ring_2.page;
				breadcrumbs_cat_prod = ring_2.breadcrumbs_cat_prod;
				break;
				case 3: html_cat = ring_3.page;
				breadcrumbs_cat_prod = ring_3.breadcrumbs_cat_prod;
				break;
				default: break;
			}
			break;
	}

	if (id === 0) {
	 $ajaxUtils.sendGetRequest(
	    homeHtml,
	    function (responseText) {
	      document.querySelector("#breadcrumbs-page").innerHTML = breadcrumbs_cat;
	    },
	  false);

	 $ajaxUtils.sendGetRequest(
	  html_cat,
	  function (responseText) {
	    document.querySelector(".collection-products_list").innerHTML = responseText;
	  },
	false);

	} else {
		 $ajaxUtils.sendGetRequest(
			pageHtml,
			function (responseText) {
			  document.querySelector(".section--content").innerHTML = responseText;
			 
				$ajaxUtils.sendGetRequest(
			    html_cat,
			    function (responseText) {
			      document.querySelector("#single-page-content").innerHTML = responseText;
			      document.querySelector("#breadcrumbs-page").innerHTML = breadcrumbs_cat_prod;
			      document.getElementById("prev-link").setAttribute("onclick", link);
					const g_swiper = new Swiper('.g-swiper', {
					  // Optional parameters
					  direction: 'horizontal',

					  // Navigation arrows
					  navigation: {
					    nextEl: '.swiper-button-next',
					    prevEl: '.swiper-button-prev',
					  },
					 
					});
			    },
			    false);
			     },
			    false);
			    
	}

	
} 

js_quantity = function (x, id, position) {
	var clicks = document.getElementById(id).value;
	let inner = document.querySelector(".basket-items_count").innerHTML;
	if(x===1){
		clicks = +clicks + 1;
	};
	if (x===0) {
		 if (clicks > 0) {
		clicks = +clicks - 1; 
		}
	}

	if(position === 1) {
				if(x===1){
				inner = +inner + 1;
			};
			if (x===0) {
				 if (inner > 0) {
				inner = +inner - 1; 
				}
			}

	}
	document.getElementById(id).value = clicks;
	document.querySelector(".basket-items_count").innerHTML = inner;
	console.log("click = " + clicks);
	
}

var numb = 0;
var arr = new Array();
var text = "";

js_buy_numb = function(prod, x) {
	
	if (x === 1) {
		let class_input = prod.id_input;
		console.log("class_input = " + class_input);
		let numb1 = $(class_input).val();
		console.log("numb1 = " + numb1);
		let numb2 = $(".basket-items_count").text();
		console.log("что написано сверху = " + numb2);
		numb = parseFloat(numb2) - parseFloat(numb1);
		console.log("numb = " + numb);
	} else {
	let numb1 = $(".quantity-input").val();
	numb = parseFloat(numb) + parseFloat(numb1);
	prod.number += parseFloat(document.getElementById("input").value);
	 //prod.number;
	}
	document.querySelector(".basket-items_count").innerHTML = numb;
}

var sum = 0;

js_buy_arr = function (prod) {
	//prod.number = parseFloat(prod.number) + parseFloat(document.getElementById("input").value);
	if (arr.length == 0) {
		arr.push(prod);
	} else {
		for (var i = 0; i < arr.length; i++) {
			if (arr[i].code === prod.code) {
				console.log("prod.number = " + prod.number + " arr.number = " + arr[i].number);
				console.log("sum prod.number = "+ prod.number);
				break;
			} else {
				console.log("разные");
				arr.push(prod);

			}
			
		}
	}

	return arr;
}

var bs = "snippets/bs.html";

js_buy_print = function () {
	document.getElementById("header").setAttribute("style","position: relative");	
	$ajaxUtils.sendGetRequest(
  "snippets/basket-snippet.html",
  function (responseText) {
    document.querySelector(".section--content").innerHTML = responseText;

    if (arr.length === 0) {
    	$(".js-cart-notice").attr('style','display: block');
    	console.log("arr.length = 0");
    } else {
	
			jQuery(function($){

    		for (var i = 0; i < arr.length; i++) {
		  		var liLast = document.createElement('li');
		  		var id = 'li_' + i;
		  		var id1 = '#' + id;
		  		liLast.setAttribute('id', id);
		  		liLast.innerHTML = 'appand';
		  		ul.append(liLast);
		  		var load_text = arr[i].basketHtml + ' ' + arr[i].id;
		  	
						$(id1).load(load_text, function(){
							for(var j=0;j<arr.length;j++)
							{	
							var id_val_input = arr[j].id_input;
							var input_val = arr[j].number;
							$(id_val_input).val(input_val);
							
							}
						
						})
				
				} // end of 'for'

			}); // end of jQuery
		}
 $ajaxUtils.sendGetRequest(
	    homeHtml,
	    function (responseText) {
	    	js_total();
	    },
	  false);


  },
  false); // end of Ajax
} 

js_order = function() {
	$ajaxUtils.sendGetRequest(
  "snippets/order.html",
  function (responseText) {
  	 if (arr.length === 0) {
    	$(".js-cart-notice").attr('style','display: block');
    	console.log("arr.length = 0");
    } else {
    	jQuery(function($){

				let co_total = $('.js-cart-total').text();
				console.log("co_total = " + co_total);
				let total_price;

				document.querySelector(".section--content").innerHTML = responseText;
				document.getElementById('courier').checked = true;
				
    		for (var i = 0; i < arr.length; i++) {
		  		var liLast = document.createElement('li');
		  		var id = 'co_li_' + i;
		  		var id1 = '#' + id;
		  		liLast.setAttribute('id', id);
		  		co_ul.append(liLast);
		  		var load_text = arr[i].orderHtml; //+ ' ' + arr[i].id;
		  		var arr_orderhtml = arr[i].orderHtml;

	
						$(id1).load(load_text); //, function(){

						let input_value = arr[i].number;
						console.log("input_value = " + input_value);
						let co_count_id = "item_count_" + arr[i].code; //записываем количество элементов
						
					$ajaxUtils.sendGetRequest(
					  homeHtml,
					  function (responseText) {
					  //	setTimeout(() => {
					  	document.querySelector("#breadcrumbs-page").innerHTML = "<span class='breadcrumbs-page'>Оформление заказа</span>";
					  	document.getElementById(co_count_id).textContent = input_value;
					  	document.getElementById("items_price").textContent = co_total;

					  	total_price = js_cart_total();
					//  }, 10000);
					  //	document.getElementById("total_price").textContent = total_price;
							},
					  false); // end of Ajax
							// }
				} // end of 'for'

			}); // end of jQuery
		}
  },
  false); // end of Ajax
}

js_cart_total = function() {
	let total_price;
	co_total = $('#items_price').text();
	if ($("#courier").is(":checked")) {
		 let s_n = co_total.split('.')[0];
		//	let s_rub = co_total.split('.00')[1];
			total_price = parseFloat(s_n) + 300;
			total_price += ".00\xa0руб";
		document.getElementById("delivery_price").textContent = "300\xa0руб";
		document.getElementById("shipping_address_address").setAttribute('style','display: block');
	} else if ($("#self").is(":checked")) {
		  total_price = co_total;
		  console.log("total price = " + total_price);
		document.getElementById("delivery_price").textContent = "0\xa0руб";
		document.getElementById("shipping_address_address").setAttribute('style','display: none');
	}
	document.getElementById("total_price").textContent = total_price;
	return total_price;
}

js_total = function () {
$ajaxUtils.sendGetRequest(
	    homeHtml,
	    function (responseText) {
	let tot = 0;
	for(let i = 0; i<arr.length; i++){
	 	let input = arr[i].id_input;
		let num = $(input).val();
		arr[i].number = parseFloat(num);
	  tot = parseFloat(tot) + (parseFloat(arr[i].price) * parseFloat(num));
	
    $(".quantity-button").click(function(){
			num = $(input).val();
			arr[i].number = num;
			js_total();
		});
	}
	
	tot += ".00\xa0руб";
	$('.js-cart-total').text(tot);
	tot = 0;

  },
	  false);
}


 js_cart_item_delete = function(prod) {
 	js_buy_numb(prod, 1);
 	let prod_id = prod.id;
	$(prod_id).remove();

	// Удаляем из массива
	let index = arr.indexOf(prod);
	if (index > -1) {
		arr.splice(index, 1);
	}

	// Изменяем суммму (цена)
	let s = $('.js-cart-total').text();
	let s_n = s.split('.')[0];
	let s_rub = s.split('.00')[1];
	s_n = parseFloat(s_n) - (parseFloat(prod.price)*parseFloat(prod.number));
	if (s_n == 0) {
		s_n = "0\xa0руб";
		$(".js-cart-notice").attr('style','display: block');
		prod.number = 0;
	} else {
	s_n += s_rub;
  }
	$('.js-cart-total').text(s_n);
 }



var checker = true;
var arr_prod = [];
arr_prod[0] = {
	id: "#p1",
	material: 'steel',
	color: 0,
	brand: 'adidas',
	size: 'one'
}
arr_prod[1] = {
	id: "#p2",
	material: 0,
	color: 'multi',
	brand: 'paul',
	size: 'one'
}
arr_prod[2] = {
	id: "#p3",
	material: 'zinc',
	color: 'silvern',
	brand: 0,
	size: 'many'
}
arr_prod[3] = {
	id: "#p4",
	material: 'zinc',
	color: 'silvern',
	brand: 0,
	size: 'many'
}
arr_prod[4] = {
	id: "#p5",
	material: 'silver',
	color: 'silvern',
	brand: 'simon',
	size: 'one'
}
arr_prod[5] = {
	id: "#p6",
	material: 0,
	color: 0,
	brand: 0,
	size: 'one'
}
arr_prod[6] = {
	id: "#p7",
	material: 0,
	color: 0,
	brand: 0,
	size: 'one'
}
arr_prod[7] = {
	id: "#p8",
	material: 0,
	color: 'gold',
	brand: 'desingB',
	size: 'one'
}
arr_prod[8] = {
	id: "#p9",
	material: 0,
	color: 'gold',
	brand: 'armani',
	size: 'one'
}
arr_prod[9] = {
	id: "#p10",
	material: 0,
	color: 'silvern',
	brand: 'serge',
	size: 'many'
}
arr_prod[10] = {
	id: "#p11",
	material: 'steel',
	color: 'gold',
	brand: 'boss',
	size: 'one'
}
arr_prod[11] = {
	id: "#p12",
	material: 0,
	color: 'black',
	brand: 0,
	size: 'one'
}
var click = false;
var arr_click = [];
var click_1, click_2;

js_filter = function(obj, property, prop_id) {

if (!click) {
      console.log("First= " + obj.id);
      click = true;
    } else {
      console.log("and so on= " + obj.id);
    }
    arr_click.push(obj.name);
    console.log("Array= " + arr_click);
// let len = arr_click.length;
// if(arr_click.length == 0) {
// 	arr_click.push(obj.name);
// 	 console.log("Array= " + arr_click);
// 	} else if(obj.name !== arr_click[len-1].name) {
// 	arr_click.push(obj.name);
// 	 console.log("Array= " + arr_click);
// }

	let checkboxs = document.getElementsByClassName('filter_section-value_input');
	$(".product_catalog-collection").attr('style', 'display: none');

 	for(let i=0;i<checkboxs.length;i++) {

 		if($(checkboxs).filter(':checked').length == 0) {
 			$(".product_catalog-collection").attr('style', 'display: inline-block');
 		}

    if(checkboxs[i].checked) {
    	let ch_id = checkboxs[i].id;
    	let ch_name = checkboxs[i].name;
    	let this_name = $(obj).attr("name");
    	console.log(ch_id);
    	for(let j=0; j<arr_prod.length; j++) {

    		if ( ($(checkboxs).filter(':checked').length > 1) && (checkboxs[i].name !== obj.name) ) {
    			console.log("this.name = " + obj.name + " ch_name = " + checkboxs[i].name);

    			let len = arr_click.length;
    				click_1 = switch_func(arr_click[len-2], j);
    				click_2 = switch_func(arr_click[len-1], j);



    			if(click_2 === obj.id && click_1 === checkboxs[i].id){
    				console.log("из всех элементов " + arr_prod[j].material + ' а именно: ' + arr_prod[j].id);
    				console.log("находим элементы типа " + arr_prod[j].color + " и сравниваем с " + checkboxs[i].id);
    				console.log("есть у элемента " + arr_prod[j].id);
    				
    				let p_id = arr_prod[j].id;
		    			$(p_id).attr('style', 'display: inline-block');
		    
    			}

    		}  //else{
    		if ($(checkboxs).filter(':checked').length <2 || (checkboxs[j].name === obj.name && $(checkboxs).filter(':checked').length > 1)) {
    			console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! this.name = " + obj.name + " ch_name = " + checkboxs[i].name);
    		//	click = false;
    		//	setTimeout(() => {
    		switch (property) {
    			case 'color':
		    		if (arr_prod[j].color === ch_id) {
		    		//	console.log("arr_prod[j].color = " +  ch_id + " of element " + arr_prod[j].id);
		    			let p_id = arr_prod[j].id;
		    			$(p_id).attr('style', 'display: inline-block');
		    		}
		    		break;
		    	case 'material':
		    		if (arr_prod[j].material === ch_id) {
		    		//	console.log("arr_prod[j].material = " +  ch_id + " of element " + arr_prod[j].id);
		    			let p_id = arr_prod[j].id;
		    			$(p_id).attr('style', 'display: inline-block');
		    		}
		    	break;
		    	case 'brand':
		    		if (arr_prod[j].brand === ch_id) {
		    		//	console.log("arr_prod[j].material = " +  ch_id + " of element " + arr_prod[j].id);
		    			let p_id = arr_prod[j].id;
		    			$(p_id).attr('style', 'display: inline-block');
		    		}
		    	break;
		    	case 'size':
		    		if (arr_prod[j].size === ch_id) {
		    		//	console.log("arr_prod[j].material = " +  ch_id + " of element " + arr_prod[j].id);
		    			let p_id = arr_prod[j].id;
		    			$(p_id).attr('style', 'display: inline-block');
		    		}
		    	break;
	    	} // end of switch property
	    //	}, 1000);
	     }
    	 } // end of j цикла
    } // end of if
  } // end of checkboxs цикла
}

switch_func = function (choice, j) {
	let click;
	switch (choice){
		case 'color': click = arr_prod[j].color;
			break;
		case 'material': click = arr_prod[j].material;
			break;
		case 'brand': click = arr_prod[j].brand;
			break;
		case 'size': click = arr_prod[j].size;
			break;
	}
	return click;
}

js_filter_delete = function() {
	let checkboxs = document.getElementsByClassName('filter_section-value_input');
	const details = document.querySelectorAll("details");

		for(let i = 0; i < checkboxs.length; i++){
		if($(checkboxs).is(":checked")){
			checkboxs[i].checked = false;
			details.forEach((detail) => {
					detail.removeAttribute("open");
					console.log("deleted");
			});

 			$(".product_catalog-collection").attr('style', 'display: inline-block');
		}

	}
	
}

js_register = function() {
	if($("#register_ch").is(':checked')){
	document.querySelector('#client_email').setAttribute('style','display: block');
	} else {
	document.querySelector('#client_email').setAttribute('style','display: none');
	}
}

js_button_checkout_submit = function() {

var liLast = new Array();
	var today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
var yyyy = today.getFullYear();
var hour = today.getHours();
var minutes = today.getMinutes();
today =  dd + '.' + mm + '.' + yyyy + ' ' + hour + ':' + minutes;
console.log(today);

let total_price = $('#total_price').text(); // document.getElementById("total_price");
console.log(total_price);

let del_id;
let address;

let address_city = $('#shipping_address_full_locality_name').val();
console.log("address_city = "+address_city);

if ($("#courier").is(":checked")) {
	del_id = '#del_courier';
	address = $('#shipping_address_address').val();
	address_city += " " + address;
	console.log("address = " + address);
} else if ($("#self").is(":checked")) {
	del_id = '#del_self';
} 

let client = $('#client_name').val();
console.log("client = " + client);
let tel = $('#client_phone').val();
console.log("client phone = " + tel);
let client_info = client + ' ' + tel;

	for (var i = 0; i < arr.length; i++) {
	liLast[i] = document.createElement('tr');
	var id = 'co_tr_' + i;
	var id1 = '#' + id;
	var td_name = document.createElement('td');
	var td_count = document.createElement('td');
	var td_price = document.createElement('td');
	td_name.setAttribute('class', 'co-table-cell co-table-cell--body');
	td_name.setAttribute('id', (id1+'_name'));
	td_name.textContent = arr[i].name;
	td_count.setAttribute('class', 'co-table-cell co-table-cell--body');
	td_count.setAttribute('id', (id1+'_count'));
	td_count.textContent = arr[i].number;
	td_price.setAttribute('class', 'co-table-cell co-table-cell--body');
	td_price.setAttribute('id', (id1+'_price'));
	td_price.textContent = (parseFloat(arr[i].number) * parseFloat(arr[i].price)) + ".00\xa0руб";
	liLast[i].appendChild(td_name);
	liLast[i].appendChild(td_count);
	liLast[i].appendChild(td_price);

	console.log(liLast[i]);
	
	liLast[i].setAttribute('id', id);
	liLast[i].setAttribute('class', 'co-table-row co-table-row--body co-table-row--striped');

	}

	$ajaxUtils.sendGetRequest(
  "snippets/order_inf.html",
  function (responseText) {

    document.querySelector(".section--content").innerHTML = responseText;
    

    $ajaxUtils.sendGetRequest(
		  "snippets/order_inf.html",
			  function (responseText) {
    document.querySelector(".co-order-information_value").textContent = today;
    document.querySelector(".co-price").textContent = total_price;
    document.querySelector(".co-order_history-total_sum").textContent = total_price;
    document.querySelector(del_id).setAttribute('style', 'display: block');
    document.querySelector('#del_address').textContent = address_city;
    document.querySelector("#client_info").textContent = client_info;
  //  $(liLast).insertAfter('.co-table-row--head');
	  },
	  false);


	  
	
		 $ajaxUtils.sendGetRequest(
		  "snippets/order_inf.html",
			  function (responseText) {

		// let input_value = arr[i].number;
		// console.log("input_value = " + input_value);
		// let co_count_id = "item_count_" + arr[i].code;
		// let co_count = $(co_count_id).text();
		// console.log('co_count = ' + co_count);
		for (let j=0 ; j < arr.length; j++) {
			let tdlast = liLast[j];
			console.log("tdlast = " + liLast);
			 $(tdlast).insertAfter('.co-table-row--head');
		}


	  },
	  false);


      },
  false);
}

let a = true;
js_search = function() {
	if (a == true) {
	$('#search_input').slideDown();
	document.querySelector('#search_input').setAttribute('style','display: block');
	a = false
} else {
	a = true;
	$('#search_input').slideUp();
} 
}


global.$dc = dc;

})(window);





var neck_1 = {
	name: "Серебристое многорядное ожерелье с подвесками",
	size: "Один размер",
	code: "11",
	price: 1999.00,
	number: 0,
	page: "snippets/catalog/category/necklace/necklace-1.html",
	basketHtml: "snippets/catalog/category/necklace/neck_1.html",
	orderHtml: "snippets/catalog/category/necklace/n_1.html",
	id: "#cart_order_line_250142725",
	id_input: "#input_n_1",
	breadcrumbs_cat_prod: "<a href='#' onclick='' class='breadcrumbs-page breadcrumbs-page--home' id='prev-link'>Цепочки и ожерелья</a><span class='breadcrumbs-pipe'> / </span><span class='breadcrumbs-page'>Серебристое многорядное ожерелье с подвесками</span>",
}
var neck_2 = {
	name: "Серебристое ожерелье с подвеской в виде компаса",
	size: "Один размер",
	code: "12",
	price: 900.00,
	number: 0,
	page: "snippets/catalog/category/necklace/necklace-2.html",
	basketHtml: "snippets/catalog/category/necklace/neck_2.html",
	orderHtml: "snippets/catalog/category/necklace/n_2.html",
	id: "#cart_order_line_250142723",
	id_input: "#input_n_2",
	breadcrumbs_cat_prod: "<a href='#' onclick='' class='breadcrumbs-page breadcrumbs-page--home' id='prev-link'>Цепочки и ожерелья</a><span class='breadcrumbs-pipe'> / </span><span class='breadcrumbs-page'>Серебристое ожерелье с подвеской в виде компаса</span>",
}
var cuffl_1 = {
	name: "Запонки в полоску Paul Smith",
	size: "Один размер",
	code: "21",
	price: 9500.00,
	number: 0,
	page: "snippets/catalog/category/cufflinks/cufflinks-1.html",
	basketHtml: "snippets/catalog/category/cufflinks/cuffl_1.html",
	orderHtml: "snippets/catalog/category/cufflinks/c_1.html",
	id: "#cart_order_line_21",
	id_input: "#input_c_1",
	breadcrumbs_cat_prod: "<a href='#' onclick='' class='breadcrumbs-page breadcrumbs-page--home' id='prev-link'>Запонки</a><span class='breadcrumbs-pipe'> / </span><span class='breadcrumbs-page'>Запонки в полоску Paul Smith</span>",
}
var cuffl_2 = {
	name: "Золотистые запонки с контрастной отделкой DesignB",
	size: "Один размер",
	code: "22",
	price: 1400.00,
	number: 0,
	page: "snippets/catalog/category/cufflinks/cufflinks-2.html",
	basketHtml: "snippets/catalog/category/cufflinks/cuffl_2.html",
	orderHtml: "snippets/catalog/category/cufflinks/c_2.html",
	id: "#cart_order_line_22",
	id_input: "#input_c_2",
	breadcrumbs_cat_prod: "<a href='#' onclick='' class='breadcrumbs-page breadcrumbs-page--home' id='prev-link'>Запонки</a><span class='breadcrumbs-pipe'> / </span><span class='breadcrumbs-page'>Золотистые запонки с контрастной отделкой DesignB</span>",
}
var earr_1 = {
	name: "Серьги-гвоздики цвета розового золота с логотипом Emporio Armani",
	size: "Один размер",
	code: "31",
	price: 8400.00,
	number: 0,
	page: "snippets/catalog/category/earrings/earrings_1.html",
	basketHtml: "snippets/catalog/category/earrings/earr_1.html",
	orderHtml: "snippets/catalog/category/earrings/e_1.html",
	id: "#cart_order_line_31",
	id_input: "#input_e_1",
	breadcrumbs_cat_prod: "<a href='#' onclick='' class='breadcrumbs-page breadcrumbs-page--home' id='prev-link'>Серьги</a><span class='breadcrumbs-pipe'> / </span><span class='breadcrumbs-page'>Серьги-гвоздики цвета розового золота с логотипом Emporio Armani</span>",
}
var earr_2 = {
	name: "Серебряные серьги-кольца Simon Carter",
	size: "Один размер",
	code: "32",
	price: 5300.00,
	number: 0,
	page: "snippets/catalog/category/earrings/earrings_2.html",
	basketHtml: "snippets/catalog/category/earrings/earr_2.html",
	orderHtml: "snippets/catalog/category/earrings/e_2.html",
	id: "#cart_order_line_32",
	id_input: "#input_e_2",
	breadcrumbs_cat_prod: "<a href='#' onclick='' class='breadcrumbs-page breadcrumbs-page--home' id='prev-link'>Серьги</a><span class='breadcrumbs-pipe'> / </span><span class='breadcrumbs-page'>Серебряные серьги-кольца Simon Carter</span>",
}
var watch_1 = {
	name: "Adidas Z02 Process",
	size: "Один размер",
	code: "41",
	price: 8499.00,
	number: 0,
	page: "snippets/catalog/category/wristwatch/wristwatch_1.html",
	basketHtml: "snippets/catalog/category/wristwatch/watch_1.html",
	orderHtml: "snippets/catalog/category/wristwatch/w_1.html",
	id: "#cart_order_line_41",
	id_input: "#input_w_1",
	breadcrumbs_cat_prod: "<a href='#' onclick='' class='breadcrumbs-page breadcrumbs-page--home' id='prev-link'>Часы</a><span class='breadcrumbs-pipe'> / </span><span class='breadcrumbs-page'>Adidas Z02 Process</span>",
}
var watch_2 = {
	name: "Часы BOSS Trophy",
	size: "Один размер",
	code: "42",
	price: 42500.00,
	number: 0,
	page: "snippets/catalog/category/wristwatch/wristwatch_2.html",
	basketHtml: "snippets/catalog/category/wristwatch/watch_2.html",
	orderHtml: "snippets/catalog/category/wristwatch/w_2.html",
	id: "#cart_order_line_42",
	id_input: "#input_w_2",
	breadcrumbs_cat_prod: "<a href='#' onclick='' class='breadcrumbs-page breadcrumbs-page--home' id='prev-link'>Часы</a><span class='breadcrumbs-pipe'> / </span><span class='breadcrumbs-page'>Часы BOSS Trophy</span>",
}
var brac_1 = {
	name: "Черный браслет с якорем",
	size: "Один размер",
	code: "51",
	price: 1299.00,
	number: 0,
	page: "snippets/catalog/category/bracelet/bracelet-1.html",
	basketHtml: "snippets/catalog/category/bracelet/brac_1.html",
	orderHtml: "snippets/catalog/category/bracelet/b_1.html",
	id: "#cart_order_line_51",
	id_input: "#input_b_1",
	breadcrumbs_cat_prod: "<a href='#' onclick='' class='breadcrumbs-page breadcrumbs-page--home' id='prev-link'>Браслеты</a><span class='breadcrumbs-pipe'> / </span><span class='breadcrumbs-page'>Черный браслет с якорем</span>",
}
var ring_1 = {
	name: "Кольцо-печатка",
	size: "Один размер",
	code: "61",
	price: 900.00,
	number: 0,
	page: "snippets/catalog/category/rings/rings-1.html",
	basketHtml: "snippets/catalog/category/rings/ring_1.html",
	orderHtml: "snippets/catalog/category/rings/r_1.html",
	id: "#cart_order_line_61",
	id_input: "#input_r_1",
	breadcrumbs_cat_prod: "<a href='#' onclick='' class='breadcrumbs-page breadcrumbs-page--home' id='prev-link'>Кольца</a><span class='breadcrumbs-pipe'> / </span><span class='breadcrumbs-page'>Кольцо-печатка</span>",
}
var ring_2 = {
	name: "Серебристое кольцо с отделкой",
	size: "Один размер",
	code: "62",
	price: 740.00,
	number: 0,
	page: "snippets/catalog/category/rings/rings-2.html",
	basketHtml: "snippets/catalog/category/rings/ring_2.html",
	orderHtml: "snippets/catalog/category/rings/r_2.html",
	id: "#cart_order_line_62",
	id_input: "#input_r_2",
	breadcrumbs_cat_prod: "<a href='#' onclick='' class='breadcrumbs-page breadcrumbs-page--home' id='prev-link'>Кольца</a><span class='breadcrumbs-pipe'> / </span><span class='breadcrumbs-page'>Серебристое кольцо с отделкой</span>",
}
var ring_3 = {
	name: "Серебряное кольцо с камнем Serge DeNimes Dove",
	size: "Один размер",
	code: "63",
	price: 6380.00,
	number: 0,
	page: "snippets/catalog/category/rings/rings-3.html",
	basketHtml: "snippets/catalog/category/rings/ring_3.html",
	orderHtml: "snippets/catalog/category/rings/r_3.html",
	id: "#cart_order_line_63",
	id_input: "#input_r_3",
	breadcrumbs_cat_prod: "<a href='#' onclick='' class='breadcrumbs-page breadcrumbs-page--home' id='prev-link'>Кольца</a><span class='breadcrumbs-pipe'> / </span><span class='breadcrumbs-page'>Серебряное кольцо с камнем Serge DeNimes Dove</span>",
}