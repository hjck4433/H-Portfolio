//recipes.js


$(function(){
    
    /*Scroll Event************************************/
    $(window).scroll(function(){
        scTop = $(this).scrollTop(); //스크롤 높이
        console.log(scTop+'scrollTop');
        
        //#btnTop section 아래로 스크롤이 내려가면 탑버튼 나타남
        secTop = $('section').offset().top;
        /*console.log(bestTop);*/
        
        if(scTop>=secTop) {
            $('#btnTop').fadeIn(600);
        }else if(scTop<secTop) {
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
    
    
/*#btnS 검색하기********************************************/
    
    $('.btnS').click(function(e){
        //기본이동 막기
        e.preventDefault();
        
        //기존에 선택되어 있던 레시피(.box)가 잇는 경우 클래스 제거
        $('.box').removeClass('active');
        //검색 텍스트 값
        var search = $('input').val();
        console.log(search);
        
        //검색 키워드를 포함하는 레시피
        var sTit = $('.box>h3:contains('+search+')');
        //선택된 레시피 높이 값-600
        var sTop = sTit.offset().top-600;
        console.log(sTop);
        
        //해당 레시피로 스크롤 이동
        $('html,body').animate({
            scrollTop : sTop+'px'
        },600);
        
        //해당 레시피 강조
        sTit.parent('.box').addClass('active');
    });
    
    
/*//#btnS 검색하기********************************************/    
    
    
    
        
    
/*#btnTop*********************************************************/
    $('#btnTop').click(function(){
        $('html').animate({
            scrollTop: 0
        },900);
    });//click #btnTop
    
/*//#btnTop********************************************************/
    
    
/*#modal**********************************************************/
    
    $('.btnWrap a').click(function(e){
        //기본 이동 막기
        e.preventDefault();
    });
    
    //레시피 보기 열기
    $('.btnWrap').click(function(){
        
        //선택된 레시피의 data-seq 값 
        selReci = $(this).parent('.box').data('seq');
        
        //현재 5번째의 모카만 레시피 보기 이용 가능하므로 값이 5인 경우에만 모달 팝업 그 외에는 알람
        if(selReci == 5){
            $('#modal').stop().fadeIn(600);
        }else {
            window.alert('모카의 레시피보기를 눌러주세요');
        }
        
        
        //1인 기준 재료양 
        nowReci = $('#modal .content')
        
        nowCon = $('#modal div#'+selReci);
        nowList = nowCon.children('.ingList');
        nowIng = nowList.children('.list')
        selIng = nowIng.children('li:has(span)'); //재료 중 개수 또는 ml 값
        ingLength = selIng.length; //수량이 들어가는 재료의 수
        console.log(ingLength);
        
        ingNum = new Array(); //배열 변수 지정
        
        //수량이 들어가는 재료 순서대로 배열에 값 저장
        for(var i=0; i<ingLength; i++){
            ingNum[i]=selIng.eq(i).children('span').text();
        }
        
    });
    
    //모달 닫기
    $('.close').click(function(){
        $('#modal').stop().fadeOut(600,function(){
            
            //모달이 사라지고 난 후 레시피 수 기준을 1로 되돌림 
            nowCon.find('.num').text(1);
            
            for(var i=0; i<ingLength; i++) {
                selIng.eq(i).children('span').text(ingNum[i]);
            }
            
            
        });
        
        //레시피 강조 해제
        $('.box').removeClass('active');
        
    });
    
    //수량에 따른 레시피 변화
    
    $('.minus').click(function(){//2이상인 경우에만 작동하여 필요 수량 변화
        
        // 현재 인수
        var num = $(this).siblings('.num').text();
        
        if(num > 1){ //1보다 큰 경우 인수 -1 
            $(this).siblings('.num').text(num-1);
            
            //-1된 인원 수 * 1인 기준 수량
            for(var k=0; k<ingLength; k++){
                selIng.eq(k).children('span').text(ingNum[k]*(num-1));
            }
        }
        
        
    });
    
    $('.plus').click(function(){
        
        //현재 인수
        var num = Number($(this).siblings('.num').text());
        console.log(num);
        
        //현재 인수 + 1
        $(this).siblings('.num').text(num+1);
        
        //+1된 인원 수 * 1인 기준 수량 
        for(var k=0; k<ingLength; k++){
            selIng.eq(k).children('span').text(ingNum[k]*(num+1));
        }
        
    });
    
    
    
    
    
    
/*//#modal**********************************************************/    
    
    
    
});//jQuery

