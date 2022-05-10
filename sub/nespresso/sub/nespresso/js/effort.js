//effort.js

//전역변수
var pno = 0; // 현재 페이지
const totpno = 2; //총 페이지 수
var psts = 0; // 현 상태 유지 

$(function(){
    
    $(document).on('mousewheel DOMMouseScroll MozMousePixelScroll', function(e){
        
        //스크롤 기본이동 막기
        e.preventDefault();
        
        //스크롤 이동 중 잠금장치!
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
            
        }else {//delta <0, 음수, 아랫방향
            pno++;
            if(pno === totpno) pno=totpno-1;
        }
        
        
        //해당순번 페이지 높이값(top) 구하기
        var pagepos = $('.page').eq(pno).offset().top;
        
        //페이지이동 애니메이션
        $('html, body').stop().animate({
            scrollTop: pagepos+'px'
        },800, 'easeInOutQuint',function(){
            psts=0; //스크롤 잠금 풀기
        });//animate
        
        
    });//scroll
    
    
    
    
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
    

/*.scroll*******************************************************/
    
    // 첫 페이지 스크롤 애니메이션 자동 시작
    var auto = setInterval(scroll,1500);
    
    function scroll (){
        $('.scroll .inner').animate({
            top: 50+'px'
        },1500,function(){
            $('.scroll .inner').css({
                top: -50+'px'
            });
        });
    }
/*//.scroll**********************************************************/
    

/*.next .prev *******************************************************/    
    //클릭된 화살표에 따라서 .con-wrap .box(n)이 이동
    
    $('.next').click(function(e){ // .box(0->3) 순서로 이동
        
        //클릭 기본 이동 막기
        e.preventDefault();
        
        
        for(var i=0;i<4;i++){
            //현재 .box(n)의 data-seq 값
            var seq= $('.con-wrap li').eq(i).data('seq');
            console.log(seq);
            if(seq<3){
                $('.con-wrap li').eq(i).data('seq',seq+1);
                $('.con-wrap li').eq(i).removeClass('box'+seq);
                $('.con-wrap li').eq(i).addClass('box'+(seq+1));
                
                /*console.log($('.con-wrap li').eq(i).data('seq'));
                console.log($('.con-wrap li').eq(i).attr('class'));*/
                
                
            }else if(seq==3){
                $('.con-wrap li').eq(i).data('seq',0);
                $('.con-wrap li').eq(i).removeClass('box'+seq);
                $('.con-wrap li').eq(i).addClass('box0');
                
                /*console.log($('.con-wrap li').eq(i).data('seq'));
                console.log($('.con-wrap li').eq(i).attr('class'));*/
                
            }
            
        }
        
    });
    
    $('.prev').click(function(e){ //.box(3->0) 순서로 이동
        
        //클릭 기본 이동 막기
        e.preventDefault();
        
        
        for(var i=0;i<4;i++){
            //현재 .box(n)의 data-seq 값
            var seq= $('.con-wrap li').eq(i).data('seq');
            console.log(seq);
            if(seq<4 && seq>0){
                $('.con-wrap li').eq(i).data('seq',seq-1);
                $('.con-wrap li').eq(i).removeClass('box'+seq);
                $('.con-wrap li').eq(i).addClass('box'+(seq-1));
                
                /*console.log($('.con-wrap li').eq(i).data('seq'));
                console.log($('.con-wrap li').eq(i).attr('class'));*/
                
            }else if(seq==0){
                $('.con-wrap li').eq(i).data('seq',3);
                $('.con-wrap li').eq(i).removeClass('box'+seq);
                $('.con-wrap li').eq(i).addClass('box3');
                
                /*console.log($('.con-wrap li').eq(i).data('seq'));
                console.log($('.con-wrap li').eq(i).attr('class'));*/
                
            }
        }
        
        
    });
    
/*.next .prev ******************************************************/  
    
});//jQuery