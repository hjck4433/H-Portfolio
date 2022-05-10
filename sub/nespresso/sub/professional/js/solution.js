//solution.js


///전역변수 구역//////////////
var pno = 0; //현재 페이지 번호(첫페이지 0)
const totpno = 4; //전체 페이지 갯수
var psts = 0; //광스크롤 막기 (0-허용, 1-막기)

var isPause = false; //setInterval clear 후 추가 실행 방지 
var autoFade; //setInterval용 변수

$(function(){

/*초기설정***********************************************/
    $('.machine img:first').appendTo('.machine');
    $('.coffee img:first').appendTo('.coffee');
/********************************************************/
    
    
    
/*#gnb Drop down****************************************/
    
    $('#gnb li').hover(
        function(){
            $(this).children('.subM').stop().slideDown(600);
            $(this).addClass('selM').siblings().removeClass('selM');
            
        },
        function(){
            $(this).children('.subM').stop().slideUp(600);
            $(this).removeClass('selM');
            
            $('#gnb').mouseleave(function(){
                
                $('#gnb>li.now').addClass('selM');
                
            });
            
            
        });//hover() #gnb li
    
/*//#gnb Drop Down****************************************/
    


    
/*#depth***************************************************/
    
    $('#depth li').hover(
        function(){
            $(this).addClass('selD').siblings().removeClass('selD');
        },
        function(){
            $('#depth .now').addClass('selD').siblings().removeClass('selD');
        });//hover #depth li
    
/*//#depth***************************************************/    
    
    
    
    $('.thumb, .bList>li').click(function(){
        //비지니스 타입 선택 후 스크롤 이동
        if (psts===1) return false;
        psts++;
        
        var actType = $('.bDesc>li:visible').index(); //현재 타입 인덱스
        
        var thIdx = $(this).index();//선택된 타입 인덱스
        console.log(thIdx);
        
        pno=1;
        
        var pagepos = $('.page').eq(pno).offset().top;
        
        //페이지 이동
        $('html, body').stop().animate({
            scrollTop: pagepos+'px'
        },800, 'easeInOutQuint',function(){
            psts=0;
        });//animate
        
        //비지니스 네비 페이드인
        $('.list-wrap').fadeIn(800);
        scroll(pno);
        imgOut();
        
        //이미 선택된 타입 클릭 시 상태 유지
        if (thIdx===actType) return false;
        
        //선택된 타입 강조
        $('.bList>li').removeClass('selB');
        $('.bList>li').eq(thIdx).addClass('selB');
        
        //선택된 타입 소개 페이드 인
        $('.bDesc>li').fadeOut(800);
        $('.bDesc>li').eq(thIdx).fadeIn(800);
        
        //선택된 타입 아이콘 페이드 인
        $('.box-wrap>li .ico-wrap').fadeOut(800);
        var boxIdx = $('.box-wrap>li').eq(thIdx);
        boxIdx.children('.ico-wrap').fadeIn(800);
        
        
    });
    
    
    
    
    $(document).on('mousewheel DOMMouseScroll MozMousePixelScroll', function(e){
        
        //스크롤 기본이동 막기
        e.preventDefault();
        
        //스크롤 이동 중 잠금장치!
        if(pno===0) return false;
        
        if(psts === 1) return false;
        psts = 1;
        
        //ie구버전 구분하기, wheelDelta값 구하기
        var evt = window.event || e;
        //둘 중에 존재하는 (true) 전달변수가 할당됨
        
        
        var delta = evt.detail ? evt.detail : evt.wheelDelta;
        //조건연사자 : 조건문?실행문1:실행문2;
        //var delta = evt.wheelDelta;
        
        //파이어폭스를 위한 처리////
        if(/Firefox/i.test(navigator.userAgent)){
            delta=-e.originalEvent.detail;
        }
        console.log('마우스휠 델타값: '+delta);
        
        
        
        //마우스휠 방향에 따라서 페이지 번호 변경하기
        if(delta > 0) {//양수, 윗방향
            pno--;
            if(pno === -1) pno=0; //한계수 지정
            
        }else if(delta < 0) {//delta <0, 음수, 아랫방향
            pno++;
            if(pno === totpno) pno=totpno-1;
        }
        
        console.log(pno);
        
        //해당순번 페이지 높이값(top) 구하기
        var pagepos = $('.page').eq(pno).offset().top;
        
        //페이지이동 애니메이션
        $('html, body').stop().animate({
            scrollTop: pagepos+'px'
        },800, 'easeInOutQuint',function(){
            

            psts=0; //스크롤 잠금 풀기
        });//animate
        
        
        //페이지 별 효과 설정
        if(pno===0){
            //비지니스 네비 및 스크롤 애니메이션 페이드아웃
            $('.list-wrap').fadeOut(800);
            $('.scroll').fadeOut(800);
        }else if(pno===1){
            //맞춤 솔루션 이미지 페이드 아웃 & 자동실행 제거
            imgOut();
            
        }else if(pno===2){
            //맞춤 솔루션 머신과 캡슐 이미지 동시 페이드 인 후 번갈아가면서 이미지 페이드 인 자동 실행
            $('.machine img:last').stop().delay(700).fadeIn(800,function(){
                autoChg();
                imgFade();
            });
            $('.coffee img:last').stop().delay(700).fadeIn(800);
            
            
        }else if(pno===3){
            //스크롤 애니메이션 페이드 아웃 및 맞춤 솔루션 이미지 페이드 아웃 & 자동실행 제거
            $('.scroll').fadeOut(800);
            imgOut();
            
        }
        
        //스크롤 바 애니메이션 함수
        // 1~2 페이지 에서만 나타남
        scroll(pno);
        
    }); //mousewheel 이벤트
    
    
    
    
    
/*#btnTop*******************************************************/
    
    //맨 위로 이동
    $('#btnTop').click(function(){ 
        pno=0;
        $('html, body').stop().animate({
            scrollTop: 0
        },1600, 'easeInOutQuint',function(){
            $('.list-wrap').fadeOut(600);
        });
        
    }); //click()
    
    
/*//#btnTop*******************************************************/    
    
    
    
});//jQuery



/*scroll function********************************/
function scroll (pno){
    //스크롤 바 애니메이션 함수 
    // 1~2 페이지 에서만 나타남
    if(pno>0 && pno<3){
        $('.scroll').fadeIn(300,function(){
            var autoScroll = setInterval(function(){
                $('.scroll .inner').animate({
                    top: 70+'px'
                }, 1200, function(){
                    $('.scroll .inner').css({
                        top: -70+'px'
                    });
                });
            },1200);
        });
    }
    
}
/**************************************************/

/*.con fadeInOut function******************************/

function imgFade (){
    
    if(!isPause){ // 머신과 캡슐 이미지가 번갈아가면서 페이드 인 아웃
        $('.machine img:last').delay(600).fadeOut(800);
        $('.machine img:first').stop().delay(600).fadeIn(800,function(){
            $('.machine img:first').appendTo('.machine');
            
            $('.coffee img:last').delay(800).fadeOut(800);
            $('.coffee img:first').stop().delay(800).fadeIn(800,function(){
                $('.coffee img:first').appendTo('.coffee');
            });
            
        });
    }
}
function autoChg (){ //이미지 페이드 인 아웃 자동실행
    isPause = false;
    autoFade = setInterval(imgFade,3500);
}
function stopChg (){ //이미지 페이드 인 아웃 자동실행 제거
    clearInterval(autoFade);
    isPause = true;
}

function imgOut (){ //이미지 페이드 아웃
    $('.con img').stop().fadeOut(100,function(){
        stopChg();
    });
}

/**************************************************/

