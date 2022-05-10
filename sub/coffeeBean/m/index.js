//coffee bean Index jQuery

$(document).ready(function(){
    
    //1. GNB
    $('.menu a').click(function(e){
        e.preventDefault();
        
        $('nav').stop().animate({
            left: '0%'
        },600);
    });//click .menu
    
    $('.close').click(function(e){
        e.preventDefault();
        
        $('nav').stop().animate({
            left: '-90%'
        },600);
    });//click .close
    
    //2. MD's pick
    
    $('.md-box').hide().slice(0,2).show();
    /*$('.md-box').slice(0,2).show();*/
    
    $('#more').click(function(e){
        
        e.preventDefault();
        
        $('.md-box:hidden').slice(0,2).slideDown();
        
        //감춰진요소가 0개일때!
        if($('.md-box:hidden').length == 0){
            $('#more').fadeOut('slow');
        }
        
        //자연스럽게 scroll
        $('html,body').animate({
            scrollTop: $(this).offset().top-120
        },1500);
        
    });
    
    /*$('#more').click(function(e){
        e.preventDefault();
        
        var i = $('.md-box:hidden').length-2;
        console.log(i);
        
        $('.md-box:hidden').slice(0,2).slideDown(300,function(){
            if(i===0){
                $('#more').fadeOut(600);
            };
            
            
        });
        
        var scTop = $('#more').offset().top-300;
        console.log(scTop);
        
        $('html, body').animate({
            scrollTop: scTop
        },600);
        
        
        if(i>2) {
            $('.md-box:hidden').slice(0,2).slideDown();
        }else {
            $('.md-box:hidden').slice(0,2).slideDown();
            $(this).fadeOut(600);
        }
        
    });*/
    
    //3. What's new slider
    var slider=$('.slider'); //.box를 담고 있는 부모, width:300%
    
    $('.slider>.box:last-child').insertBefore('.slider>.box:first-child');
    slider.css('margin-left','-100%');
    
    //슬라이딩 함수 만들기
    function move(){
        slider.animate({
           marginLeft: '-200%' 
        }, 800, function(){
            $('.slider>.box:first').insertAfter('.slider>.box:last');
            slider.css('margin-left','-100%');
        });
        
        //블릿변경
        var bseq = slider.find('.box').eq(2).attr('data-seq');
        console.log(bseq);
        chgB(Number(bseq));
    };
    
    //함수호출 - 실행 확인 (1회 실행)
    //move();
    
    //자동슬라이드 함수
    function autoplay(){
        setInterval(move, 3000);
    }
    
    autoplay();
    
    //블릿변경함수
    chgB = function(bseq){
        $('.new-pager li').eq(bseq).addClass('on').siblings().removeClass();
    };
    
    
    /*autoSlide = setInterval(slide,3000);*/
    
});//jQuery
/*j = 0;*/

/*function slide (){
    
    $('.slider').animate({
        left: '-100%'
    },600,function(){
        $('.box:first').appendTo('.slider');
        $('.slider').css({
            left: '0%'
        });
        
    });//animate
    
    j++
    $('.new-pager li a').css({
        color: '#999'
    }).parent().eq(j).children('a').css({
        color: 'rgb(207,102,26)'
    });
    /*$('.new-pager li').eq(j).children('a').css({
        color: 'rgb(207, 102, 26)'
    });
    
    if(j==2) j=-1;
    
}*/



