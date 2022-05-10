//index.js

var isPause = false;
var timer;

//글자 지우기 변수
var autoFade;
var hello = false;
var protSts = 0;

$(function(){
    
    /*초기설정********************************************/
    
    
    var swiperW = $('.swiper-container').width();
    $('.swiper-container').height(swiperW*0.5952380952380952);
    
    /*//초기설정********************************************/
    
    
    /*.intro********************************************/
    
    $('.hello').stop().slideDown(600);
    startScroll();
    
    var aboutTop = $('#about').offset().top;
        console.log('about'+aboutTop);
    
    $(window).scroll(function(){
        var scTop = $(this).scrollTop();
        console.log(scTop);
        
        
        if(scTop<100){
            $('.txt1').stop().fadeOut(300);
            
            protSts = 1;
            hello = true;
            
            $('.box_wrap').removeClass('active');
            $('.box_wrap').stop().fadeOut(300,function(){
                $('.hello li').fadeIn(300);
            });
            
            $('.txt3').stop().slideUp(300);
            
        }else if(scTop>=100 && scTop<250){
            
            $('.txt1').stop().fadeIn(300);
            
            protSts = 0;
            startFade();
           
            
        }else if(scTop>=250 && scTop< aboutTop-1200){
            $('.intro_txt').fadeIn(300);
            $('.scroll').stop().fadeIn(300);
            $('.btnWrap').fadeOut(300);
            
        }else if (scTop>=aboutTop-1200){
            $('.intro_txt').fadeOut(300);
            $('.scroll').stop().fadeOut(100);
            $('.btnWrap').fadeIn(300);
        }
        
        
        
    });//scroll
    
    /*//.intro******************************************/
    
    
    /*#skills**********************************************/
    
    
    /*var autoMove = setInterval(startMove,1500);*/
    startMove();
    
    $('.skill_wrap li').click(function(){
        stopMove();
        $(this).addClass('active');
        $(this).siblings().removeClass('active');
        
        var skillIdx = $(this).index();
        var fadeIdx = $('.skill_desc li').eq(skillIdx);
        
        $('.skill_desc li').stop().fadeOut();
        fadeIdx.stop().fadeIn(function(){
            startMove();
        });
        
    });
    
    
    
    
    /*//#skills****************************************/
    
    /*#works*******************************************/
    
    //swiper 플러그인 설정 값
    const swiper = new Swiper('.swiper-container',{
        loop: true,
        cubeEffect: {
            shadow: true,
            slideShadows: true,
            shadowOffset: 20,
            shadowScale: 0.94,
        },
        speed: 800,
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        }
        
    });

    
    //slide 변경 시작과 동시에 제목 변경
    swiper.on('slideChangeTransitionStart',function(){
        
        //현재 slide index값
        var realIdx = swiper.realIndex;
        var slideIdx = $('.workList li').eq(realIdx)
        //기존 slide 제목은 사라지고 넘어간 slide제목 나타남
        slideIdx.stop().fadeIn(800);
        slideIdx.siblings().stop().fadeOut(300);
    });
    
    //swiper
    
    
    /*화면 크기에 따라 자동으로 스킬 스와이퍼 사이즈 비율 유지*/
    $(window).resize(function(){
       var swiperW = $('.swiper-container').width();
       $('.swiper-container').height(swiperW*0.5952380952380952);
    });
    
    
    
    /*//#works********************************************/
    
    /*.btnWrap**********************************************/
    $('#navBtn').click(function(){
        $('#navBtn a').click(function(e){
            e.preventDefault();
        });
        $('#gnb li').slideToggle();
        $('nav').toggleClass('active');
        $('nav #navBtn').toggleClass('active');
    });
    
    $('#gnb li a').click(function(e){
        //기본이동 막기
        e.preventDefault();
        
        //선택한 메뉴 id값 
        var selM = $(this).attr('href');
        //선택 한 메뉴의 위치값
        var selMtop = $(selM).offset().top;
        
        $('html, body').animate({// 위치값 -50의 위치까지 스크롤 이동
            scrollTop: selMtop-50
        }, 600);
    });
    
    $('#btnTop a').click(function(e){
        //기본 이동 막기
        e.preventDefault();
        $('html, body').animate({
            scrollTop: 0
        },1000);
    });
    
    /*//.btnWrap**********************************************/
    
    
    
    
});//jQuery

/*.scroll 함수*/

function startScroll () {
    var autoScroll = setInterval(scrolling,1200);
}

function scrolling () {
    $('.ing span').animate({
        top: 50+'px'
    },1200,function(){
        $('.ing span').css({
            top: -100+'px'
        });
    });
}

///*.scroll 함수*/

/*#skills 함수*/

function startMove () { //자동실행
    isPause = false;
    timer = setInterval(function(){
        move();
    },1500);
}

function stopMove () { //자동실행 종료
    
    clearInterval(timer);
    isPause = true;
    
}

function move () {//스킬 로고 및 설명이 차례로 커지고 나타남
    
    if(!isPause){
        
        //현재 active한 skill / 인덱스 값
        var activeS = $('.skill_wrap .active');
        var activeIdx = activeS.index();
        var nextS = $('.skill_wrap li').eq(activeIdx+1);
        
        //active한 skill에 맞는 .skill_desc li의 인덱스 값
        var nowDes = $('.skill_desc li').eq(activeIdx);
        var nextDes = $('.skill_desc li').eq(activeIdx+1);
        
        if(activeIdx < 4){ //activeIdx 값이 4미만인 경우 +1
            setTimeout(function(){
                nowDes.stop().fadeOut(800,function(){
                    if(!isPause){ //hover 이벤트 발생 시 멈춤
                        activeS.removeClass('active');
                        nextS.addClass('active');
                        nextDes.stop().fadeIn(800);
                    }
                    
                });
            }, 1500);
            
        }else if (activeIdx = 4) {//activeIdx 값이 4인경우 다시 처음으로
            setTimeout(function(){
                nowDes.stop().fadeOut(800,function(){
                    if(!isPause){ //hover 이벤트 발생 시 멈춤
                        activeS.removeClass('active');
                        $('.skill_wrap li:first').addClass('active');
                        $('.skill_desc li:first').stop().fadeIn(800);
                    }
                    
                });
            }, 1500);
            
        }
        
    }
    
}
/*#skills 함수*/


/*intro 함수*/

function startFade () { //ELLO! 가 뒤에서부터 사라짐
    hello = false;
    autoFade = setInterval(function(){
        fadeHello();
    },10);
}

function fadeHello () {
    
    if( !hello && protSts == 0){
        
        protSts = 1;
        var helloL = $('.hello li:visible').length;
    
        console.log("helloL"+helloL);
        
        if(helloL > 2){
            $('.hello li').eq(helloL-1).fadeOut(80,function(){
                protSts = 0;
            });
        }else if (helloL > 1){
            $('.hello li').eq(helloL-1).fadeOut(80,function(){
               $('.box_wrap').fadeIn(100,function(){
                   $('.box_wrap').addClass('active');
                   $('.txt3').delay(500).slideDown(600);
                   hello = true;
                   protSts = 0;
                   
               });
            });
        }
    }
    
    
}
/*//intro 함수*/
