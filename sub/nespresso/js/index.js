/*index.js*/

var winW=$(window).width();
var protH = 0;

        
$(function(){
    
    //초기설정///////////////////////////////////////////////
    
    //#olVsVo
    $('#olVsVo .vsOl').css({
        clip: 'rect(0,'+(winW/2)+'px, 1030px, 0)'
    });
    
    //////////////////////////////////////////////////////////
    
    
    
    /*Scroll Event************************************/
    $(window).scroll(function(){
        var scTop = $(this).scrollTop(); //스크롤 높이
        /*console.log(scTop);*/
        
        //header 변화
        if(scTop<100) {
            $('header').removeClass('scr');
        }else if(scTop>=100) {
            $('header').addClass('scr');
        }
        
        //btnTop 
        var bestTop = $('#best').offset().top;
        /*console.log(bestTop);*/
        
        if(scTop>=bestTop) {
            $('#btnTop').fadeIn(600);
        }else if(scTop<bestTop) {
            $('#btnTop').fadeOut(600);
        }
        
    });//scroll
    /*//Scroll Event******************************************/
    
    
    /*#gnb Drop down****************************************/
    
    $('#gnb li').hover(
        function(){
            $(this).children('.subM').stop().slideDown(600);
            $(this).addClass('selM').siblings().removeClass('selM');
            
        },
        function(){
            $(this).children('.subM').stop().slideUp(600);
            $(this).removeClass('selM');
            
        });//hover() #gnb li
    
    /*//#gnb Drop Down****************************************/
    
    
    /*#slider***********************************************/
    
    var autoSlide = setInterval(move, 3000);
    
    //슬라이더 위에 호버시 멈춤/ 나가면 다시 자동이동
    $('#slider').hover(
        function(){
            clearInterval(autoSlide);
            $('.selP span').stop().css({
                left: 0
            });
        },
        function(){
            autoSlide =setInterval(move,3000);
            $('.selP span').stop().animate({
                left: '100%'
            },3100,'linear');
            
        });//hover #slider
    
    //페이저 조절
    $('.selP span').stop().animate({
        left: '100%'
    },3100,'linear');
    
    
    //페이저 클릭했을 때 이동
    $('#pager li').click(function(e){
        
        e.preventDefault(); 
        $(this).addClass('selP').siblings().removeClass('selP');
        
        $('.selP span').css({
            left: 0
        });
        
        //페이저 인덱스 값
        idx = $(this).index();
        
        //인덱스 left값
        var slideI =  (-100*idx)+'%';
        
        //현재 .slide index 0의 data-seq
        var seq = $('.slide:first').data('seq');
        
        //총 slide수
        var slideNum = $('.slide').length;
        
        //seq순서대로 배치 후 이동
        if(seq===0){
            $('#slide_wrap').stop().animate({
                left: slideI
            },800,'easeInOutQuint',function(){
                $('.slide').slice(0,idx).appendTo('#slide_wrap');
                $('#slide_wrap').css({
                    left: 0
                });
            });
            
        }if(seq>0){
            $('.slide').slice(slideNum-seq).prependTo('#slide_wrap');
            $('#slide_wrap').css({
                left: (-100*seq)+'%'
            });
            
            $('#slide_wrap').stop().animate({
                left: slideI
            },800,'easeInOutQuint',function(){
            
            $('.slide').slice(0,idx).appendTo('#slide_wrap');
            $('#slide_wrap').css({
                    left: 0
                });
            });//animate
        }
        
    });//click #pagerli
    
    /*//slider**************************************************/
    
    
    
    
    /*#evtNotice***************************************************/
    
    var autoEvt = setInterval(evtMove,3000);
    
    //evt위에 호버하면 멈추고 나가면 다시 작동
    $('#evtNotice .container').hover(
        function(){
            clearInterval(autoEvt);
        },
        function(){
            autoEvt =setInterval(evtMove,3000);
        });//hover #evtNotice
    
    
    
   /*//#evtNotice***************************************************/
    
    
    
    /*#best******************************************************/
    
    
    //버튼 클릭하면 오리지널/ 버츄오에 맞게 전환
    $('#best .btnBest a').click(function(e){
        e.preventDefault();
        
        $(this).addClass('selB').siblings().removeClass('selB');
        var sel = $(this).data('seq');
        console.log(sel);
        
        
        if (sel===0) {
            $('#bestOl').stop().fadeIn(600);
            $('#bestVo').stop().fadeOut(600);
            
            $('#best').css({
                backgroundImage: 'url(images/index/best_bg_ol.jpg)'
            });
            
        }else if (sel===1) {
            
            $('#bestVo').stop().fadeIn(600);
            $('#bestOl').stop().fadeOut(600);
            
            $('#best').css({
                backgroundImage: 'url(images/index/best_bg_vo.jpg)'
            });
        }
    });//click #best .btnBest
    
    
    
    // 호버시 이미지 전환
    $('#best .box').hover(
        function(){
            
            $(this).children('a').children('.bfrHover').stop().fadeOut(400);
            $(this).children('a').children('.aftHover').stop().fadeIn(400);
            
            
        },function(){
            
           $(this).children('a').children('.aftHover').stop().fadeOut(400);
            $(this).children('a').children('.bfrHover').stop().fadeIn(400);
            
        });
    
    $('#best .box a').click(function(e){
        e.preventDefault();
    });
    
    
    
    
    /*//#best******************************************************/
    
    
    
    /*olVsVo*************************************/
    
    //비율을 조절했을 때
    $(window).resize(function(){
        winW =$(window).width();
        
        $('#olVsVo .vsOl').css({
            clip: 'rect(0,'+(winW/2)+'px, 1030px, 0)'
        })
        
        $('#olVsVo .vsOl').hover(
            function(){
                $(this).css({
                    clip: 'rect(0,'+(winW*0.8125)+'px, 1030px, 0)',
                    transition: 'all .8s ease-out',
                    zIndex: 4
                });
            },
            function(){
                $(this).css({
                    clip: 'rect(0,'+(winW/2)+'px, 1030px, 0)',
                    transition: 'all .8s ease-out'
                })
            });
        
        $('#olVsVo .vsVo').hover(
            function(){
                $('#olVsVo .vsOl').css({
                    clip: 'rect(0,'+(winW*0.1825)+'px, 1030px, 0)',
                    transition: 'all .8s ease-out'
                });
            },
            function(){
                $('#olVsVo .vsOl').css({
                    clip: 'rect(0,'+(winW/2)+'px, 1030px, 0)',
                    transition: 'all .8s ease-out'
                })
            });
    });//resize
    
    //OL 호버했을 때
    $('#olVsVo .vsOl').hover(
        function(){
            $(this).css({
                clip: 'rect(0,'+(winW*0.8125)+'px, 1030px, 0)',
                transition: 'all .8s ease-out'
            });
        },
        function(){
            $(this).css({
                clip: 'rect(0,'+(winW/2)+'px, 1030px, 0)',
                transition: 'all .8s ease-out'
            })
        });
    
    //VO 호버했을 때
    $('#olVsVo .vsVo').hover(
        function(){
            $('#olVsVo .vsOl').css({
                clip: 'rect(0,'+(winW*0.1825)+'px, 1030px, 0)',
                transition: 'all .8s ease-out'
            });
        },
        function(){
            $('#olVsVo .vsOl').css({
                clip: 'rect(0,'+(winW/2)+'px, 1030px, 0)',
                transition: 'all .8s ease-out'
            })
        });
    /*//olVsVo*********************************************/
    
    
    
    /*btnTop***************************************************/
    
    $('#btnTop').click(function(){
            $('html').animate({
                scrollTop: 0
            },900);
        });
    
    
    
    
    /*//btnTop***************************************************/
       
        
    }); //jQuery




/*#Slider 함수*/
function move () {
    //slide 이동
    $('#slide_wrap').stop().animate({
        left: '-100%'
    },800,'easeInOutQuint',function(){
        $('.slide:first').appendTo('#slide_wrap');
        $('#slide_wrap').css({
            left: 0
        });
    });
    
    chgPager();
    
}

function chgPager () {
    var i = $('.slide').eq(1).attr('data-seq');
    /*console.log(i);*/
    $('#pager li').eq(i).addClass('selP');
    $('.selP span').css({
        left: '0'
    });
    $('.selP span').stop().animate({
        left: '100%'
    },3100,'linear',function(){
        $(this).css({
            left:0
        });
    });
    $('#pager li').eq(i).siblings().removeClass('selP');
}

/*#evtNotice 함수*/
function evtMove () {
    $('.evt_wrap').stop().animate({
        top: '-100%'
    },800,'easeInOutQuint',function(){
        $('.evt:first').appendTo('.evt_wrap');
        $('.evt_wrap').css({
            top:0
        });
    });
}
























