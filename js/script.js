$(document).ready(function() {

	var nbrImages = 0;
	var mesImages = new Array();
	var imagesLoad = 0;

	$('.backgroundImage').each(function() {
		nbrImages++;
		var src = $(this).css('background-image').replace(/^url\(["']?/, '').replace(/["']?\)$/, '');	
		if(src && src != 'none') {
			mesImages.push($('<img src="' + src + '"/>'));
		}
	});

	for(var i=0; i<=mesImages.length;i++){
		$(mesImages[i]).load(function(){
			imagesLoad++;
			console.log($(this));
			console.log(imagesLoad);
			$('#progress_bar').stop().animate({
				width : 100*imagesLoad/mesImages.length+"%"
			},500);	
			$('#back-load p').text( parseInt((100*imagesLoad)/nbrImages)+"%");				
			if (imagesLoad == nbrImages) {
				setTimeout(function(){
					$("#back-load").fadeOut();
					$(".main-path").delay(500).animate({'stroke-dashoffset':'10px'}, 2000, showtitle);
				},1000);
			}
		});
	}
	
	$("#buttonMenu").click(showMenu);

	$('#superContainer').fullpage({
	    anchors: ['home', 'about', 'work', 'contact'],
	    menu: '#myMenu',
	    afterLoad: function(anchorLink, index){
            if(index == '2' || index == '4'){
            	$('header #buttonMenu span').addClass('buttonAboutContact');
		    	$('header nav ul').addClass('linksAboutContact');
		    	$('header a.logo').addClass('logoAboutContact');
            }else{
            	$('header #buttonMenu span').removeClass('buttonAboutContact');
		    	$('header nav ul').removeClass('linksAboutContact');
		    	$('header a.logo').removeClass('logoAboutContact');
            }
            if(index == '2'){
            	startBarProgress();
            }
        }
	});

	resize();

    window.onresize = function() {
        resize();
    };

	$("#submit_btn").click(function() { 
        sendMail();
    });


});

function resize(){
	$('#back-load').css('height', window.innerHeight+'px');

    $('#section2 ul').css('height', (window.innerHeight)-160+'px');
    $('#section2 ul').css('width', ((window.innerWidth)-40)/3+'px');
    $('#section2 ul li').css('height', (($('#section2 ul').height())-10)/2+'px');
}

function showtitle(){
	$("#main-path").animate({opacity:'0'}, 800);
	showIdentification();
}
function showIdentification(){
	if($("h1").attr('class')=="identityNoVisible" || $(".content-home h2").attr('class')=="identityNoVisible"){
		$("h1").removeClass('identityNoVisible');
		$("h1").addClass('identityVisible');
		$(".content-home h2").removeClass('identityNoVisible');
		$(".content-home h2").addClass('identityVisible');
	}
	$("header").css('top','0');
	$(".arrowLink").css('bottom','20px');
}

function showMenu(){
	if($(this).attr('class')=="buttonNonRotate"){
		$(this).removeClass("buttonNonRotate");
		$(this).addClass("buttonRotate");
	}else{
		$(this).removeClass("buttonRotate");
		$(this).addClass("buttonNonRotate");
	}

	var lesLi = $("header nav ul li");
	for(var i=0; i<=lesLi.length;i++){
		if($(lesLi[i]).hasClass("menuNonActive")){
			$(lesLi[i]).removeClass("menuNonActive");
			$(lesLi[i]).addClass("menuActive");
		}else{
			$(lesLi[i]).removeClass("menuActive");
			$(lesLi[i]).addClass("menuNonActive");
		}
	}
}

function changeMenuColor(){
	console.log("ça passe");
	if(($(window).scrollTop()>=$('#section1').offset().top && $(window).scrollTop() < $('#section2').offset().top) || $(window).scrollTop()>=$('#section3').offset().top){
		$('header #buttonMenu span').addClass('buttonAboutContact');
    	$('header nav ul').addClass('linksAboutContact');
    	$('header a.logo').addClass('logoAboutContact');
	}else{
		$('header #buttonMenu span').removeClass('buttonAboutContact');
    	$('header nav ul').removeClass('linksAboutContact');
    	$('header a.logo').removeClass('logoAboutContact');
	}
}

function startBarProgress(){
	var lesProgressBar = $('.progressBar');
	for(var i=0;i<lesProgressBar.length;i++){
		if($(lesProgressBar[i]).hasClass('html')){
		 	$(lesProgressBar[i]).css('width',(91*$('.levelBar').width())/100+'px');
		}
		if($(lesProgressBar[i]).hasClass('js')){
		 	$(lesProgressBar[i]).css('width',(66*$('.levelBar').width())/100+'px');
		}
		if($(lesProgressBar[i]).hasClass('responsive')){
		 	$(lesProgressBar[i]).css('width',(82*$('.levelBar').width())/100+'px');
		}
		if($(lesProgressBar[i]).hasClass('d3')){
		 	$(lesProgressBar[i]).css('width',(33*$('.levelBar').width())/100+'px');
		}
		if($(lesProgressBar[i]).hasClass('teamwork')){
		 	$(lesProgressBar[i]).css('width',(85*$('.levelBar').width())/100+'px');
		}
		if($(lesProgressBar[i]).hasClass('psd')){
		 	$(lesProgressBar[i]).css('width',(57*$('.levelBar').width())/100+'px');
		}
		if($(lesProgressBar[i]).hasClass('curiosity')){
		 	$(lesProgressBar[i]).css('width',(100*$('.levelBar').width())/100+'px');
		}
		if($(lesProgressBar[i]).hasClass('foot')){
		 	$(lesProgressBar[i]).css('width',(61*$('.levelBar').width())/100+'px');
		}
		if($(lesProgressBar[i]).hasClass('dance')){
		 	$(lesProgressBar[i]).css('width',(44*$('.levelBar').width())/100+'px');
		}
		if($(lesProgressBar[i]).hasClass('cook')){
		 	$(lesProgressBar[i]).css('width',(21*$('.levelBar').width())/100+'px');
		}
	}
}

function sendMail () {
	var user_name = $('input[name=name]').val(); 
    var user_email = $('input[name=email]').val();
    var user_message = $('textarea[name=message]').val();
    var proceed = true;
    if(user_name==""){ 
        $('input[name=name]').css('border-color','red'); 
        proceed = false;
    }
    if(user_email==""){ 
        $('input[name=email]').css('border-color','red'); 
        proceed = false;
    }
    if(user_message=="") {  
        $('textarea[name=message]').css('border-color','red'); 
        proceed = false;
    }
    if(proceed) 
    {
        post_data = {'userName':user_name, 'userEmail':user_email, 'userMessage':user_message};
        $.post('contact_me.php', post_data, function(response){  
            if(response.type == 'error'){
                    output = '<div class="error">'+response.text+'</div>';
            }else{
                output = '<div class="success">'+response.text+'</div>';
                $('#contact_form input').val(''); 
                $('#contact_form textarea').val(''); 
            }
            $("#result").hide().html(output).slideDown();
        }, 'json');  
    }
}