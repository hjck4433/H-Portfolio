//find_store.js

$(function(){
    
    //문답중 첫번째 답변만 보이게 초기설정
    $('.qList li:first').find('.answer').css({
        display:'block'
    });
    
    
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
    
    
/*#faqChoice***********************************************/
    
    //질문 옵션 리스트 중 선택
    $('#list').change(function(){
        //선택된 질문 리스트 인덱스
        var listIdx = $('#list option').index($('#list option:selected'));
        
        //선택된 질물 제목 텍스트 값
        var selName = $('#list option:selected').text();
        console.log(listIdx);
        
        //선택된 옵션으로 제목 변경
        $('#Qname').text(selName);
        
        //선택된 옵션 질문 리스트 슬라이드 다운 나머지 슬라이드 업
        $('.qList').eq(listIdx).stop().slideDown(600).siblings().stop().slideUp(600);
        
        //첫번째 질문 답만 보이게 함
        var firstA = $('.qList').eq(listIdx).children('li:first').find('.answer');
        
        firstA.css({
            display:'block'
        });
        
        firstA.parent('li').siblings().find('.answer').css({
           display:'none'
        });
        
        //맨 위로 스크롤 이동
        $('html').stop().animate({
            scrollTop: 0
        },600);
    }); // change #list
    
    
    //질문 클릭 이벤트
    $('.qList li>a').click(function(e){
        //기본이동 막기
        e.preventDefault();
        
        //선택된 질문이 포함된 옵션 인덱스
        var listIdx = $('#list option:selected').index();
        
        //기존에 선택된 인덱스 (첫 클릭시에는 가장 첫번째 질문)
        activeQ = $('.qList').eq(listIdx).children('li.selQ').index();
        console.log(activeQ)
        
        //현재 선택된 질문 인덱스
        now = $(this).parent('li').index();
        console.log(now);
        
        if(now==activeQ){ //같은 질문 재클릭시 답변만 슬라이드업 되고 종료
            $(this).parent('li').removeClass('selQ');
            $(this).siblings('.answer').slideUp(600);
            return false;
        }
        
        //선택된 질문 답변 슬라이드다운 그외 답변 슬라이드 업
        $(this).siblings('.answer').stop().slideDown(600);
        $(this).parent('li').siblings().children('.answer').stop().slideUp(600);
        
        $(this).parent().addClass('selQ').siblings().removeClass('selQ');
        
        //선택된 질문 높이 값 -400
        var selQtop = $(this).offset().top-400;
        
        //selQtop 위치로 스크롤 이
        $('html').stop().animate({
            scrollTop : selQtop+'px'
        },600);
        
    }); //click .qLIst li
    
    
    //검색 버튼 클릭 이벤트
    $('#search .btnS').click(function(e){
        //기본 이동 막기
        e.preventDefault();
        
        //입력된 키워드 텍스트
        var sText = $('#search input').val();
        console.log(sText);
        
        //입력된 텍스트가 없는 경우 알림 띄움
        if (sText.trim().length == 0 || sText == ''){
            alert('키워드를 입력해 주세요');
            return false;
        }
        
        //키워드가 포함된 텍스트 찾기
        var Txt = $('.qList li>a:contains('+sText+')');
        
        //키워드 포함된 텍스트 중 가장 첫번째 높이값
        var Txtfirst = Txt.first().offset().top-600;
        console.log(Txtfirst+'top');
        
        //키워드 포함 질문 제목 배경색 및 키워드 폰트색 변경
        $('.qList li>a').css({
            backgroundColor: 'rgb(35,31,32)'
        });
        Txt.css({
             backgroundColor: '#886b41'
        });
        
        //키워드 포함 답변 슬라이드 다운 그 외 슬라이드 업
        $('.qList li .answer').stop().slideUp(600);
        Txt.siblings('.answer').stop().slideDown(600);
        
        //가정 첫 답변 위치로 스크롤 이동
        $('html').stop().animate({
            scrollTop: Txtfirst+'px'
        },600);
        
        
    });
    
    
    
    
    
    
    
    
/*//#faqChoice***********************************************/    
    


    
/*#depth***************************************************/
    
    $('#depth li').hover(
        function(){
            $(this).addClass('selD').siblings().removeClass('selD');
        },
        function(){
            $('#depth .now').addClass('selD').siblings().removeClass('selD');
        });//hover #depth li
    
/*//#depth***************************************************/
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
}); //jQuery