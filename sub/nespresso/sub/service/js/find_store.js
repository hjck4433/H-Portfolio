//find_store.js

$(function(){
    
    
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
    
    
/*#selStore***********************************************/
    //선택된 이용목적에 맞게 화면 전환
    $('#storeChoice li').click(function(){
        
        $(this).addClass('selS').siblings().removeClass('selS');
        
        var storeIdx = $(this).index();
        $('.box_wrap li').eq(storeIdx).fadeIn(600).siblings().fadeOut(600);
    })
    
    
    
    
/*//#selStore***********************************************/    
    


    
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