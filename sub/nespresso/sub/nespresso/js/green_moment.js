//green_moment.js


$(function(){
    /*Scroll Event************************************/
    $(window).scroll(function(){
        scTop = $(this).scrollTop(); //스크롤 높이
        console.log(scTop+'scrollTop');
        
        //#btnTop 
        secTop = $('section').offset().top;
        /*console.log(bestTop);*/
        
        if(scTop>=secTop) {
            $('#btnTop').fadeIn(600);
        }else if(scTop<secTop) {
            $('#btnTop').fadeOut(600);
        }
        
        
        //art_tit tit_txt 
        //article 총 수
        var artL = $('article').length;
        
        //.tit_txt (소제목 설명 텍스트) slideDown으로 보여짐
        for(i=0; i<artL; i++){
            showTxt(i);
        }
        
        //.tit_txt (소제목 설명 텍스트) slideDown 함수
        function showTxt (titIdx){
            tit = $('article').eq(titIdx);
            titTop = $('article').eq(titIdx).offset().top-700;
            console.log(titTop);
            
            //현재 스크롤 높이 > (소제목 스크롤 높이-700) 일때 소제목 설명 텍스트가 slideDown
            
            if(scTop>titTop){
                $(tit).children('.container').children('.art_tit').children('.tit_txt').slideDown(900,'easeInOutQuint');
            }
        }
        
        
        
        // 알루미늄 커피 설명 텍스트
        //현재 스크롤 높이 > (#new_start div.box 스크롤 높이-900) && 현재 스크롤 높이 < (#new_start div.box스크롤 높이 +1000) 일때 나타남 
        
        box = $('#new_start div.box');
        boxTop = box.offset().top-900;
        /*console.log(boxTop);*/
        
        if(scTop>boxTop && scTop<(boxTop+1000)){
            box.addClass('active');
        }else {
            box.removeClass('active');
        }
        
        //현재 스크롤 높이 > (#campaign .con-wrap 스크롤 높이-400) && 현재 스크롤 높이 < (#campaign .con-wrap 스크롤 높이 +700) 일때 나타남
        bag=$('#campaign .con-wrap');
        bagTop=bag.offset().top;
        
        if(scTop>(bagTop-400) && scTop<(bagTop+700)){
            $(bag).addClass('active');
        }else {
            $(bag).removeClass('active');
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
    
        
    
/*#btnTop*********************************************************/
    $('#btnTop').click(function(){ //맨 위로 이동
        $('html').animate({
            scrollTop: 0
        },900);
    });//click #btnTop
    
/*//#btnTop********************************************************/
    
});/// jQuery
