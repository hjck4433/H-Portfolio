//machine.js

/* color
0-화이트 #fff
1-블랙  #000
2-타이탄 #B6AFA9
3-레드 #FF0000
4-체리레드 #A50D24
5-실키화이트 #FFF8DC
6-스테인리스 스틸 #E0DFDB
7-실버 #CCCCCC
8-매트블랙 #141517*/



$(function(){
    nowT = $('.selT').data('seq'); //0-오리지널 1-버츄오
    
    //.color li 각 컬러에 맞게 배경색 채우는 초기 설정
    color = ['#fff','#000','#B6AFA9','#FF0000','#A50D24','#FFF8DC','#E0DFDB','#CCCCCC','#141517'];
    
    for (i=0; i<2; i++) {
        var boxL = $('section>div').eq(i).find('.box').length;
        console.log('.box 길이 :'+boxL);
        
        for(j=0; j<boxL; j++){
            var olVo = $('section>div').eq(i);
            /*console.log(olVo);*/
            
            var colSeq = olVo.find('.color').eq(j).find('li');
            
            var colorL = colSeq.length;
           /* console.log(mcolor);*/
            
            
            for(k=1; k<colorL; k++){
                var col = colSeq.eq(k).data('col');
                console.log(col);
                
                colSeq.eq(k).children('span').css({
                    backgroundColor : color[col]
                });
            }
            
        }
        
    } //for문
    
    
    /*Scroll Event************************************/
    $(window).scroll(function(){
        scTop = $(this).scrollTop(); //스크롤 높이
        /*console.log(scTop);*/
        
        //#btnTop 
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
    

/*#btn_choice*************************************************/
    
    $('#btn_choice li').click(function(){
        
        $(this).addClass('selT').siblings().removeClass('selT');
        
        var choice = $(this).data('seq');
        console.log(choice);
        
        if(nowT===choice) return false;
        
        
        
        //맨 위로 이동
        
        $('html').stop().animate({
            scrollTop: 0
        },900);
        
        $('footer').css({
            display: 'none'
        });
        
        if(choice===0){ //오리지널을 클릭했을 때
            
            nowT=choice
            //main 전환
            $('#m_vo').stop().animate({
                opacity: .2
            },600,function(){
                $('#m_vo').css({
                    visibility: 'hidden'
                });
            });
            $('#m_ol').css({
                visibility: 'visible'
            }).stop().animate({
                opacity: 1
            },600);
            
            
            //list 전환
            $('#ol').css({
                opacity: 0
            });
            
            $('#vo').delay(600).fadeOut(300,function(){
                $('#ol').show(100,function(){
                    $('#ol').stop().animate({
                        opacity: 1
                    },200);
                    $('footer').css({
                        display: 'block'
                    });
                    
                })
            });
        }else if(choice===1){ //버츄오를 클릭했을 떄
            
            nowT=choice;
            //main 전환
            $('#m_ol').stop().animate({
                opacity: .2
            },600,function(){
                $('#m_ol').css({
                    visibility: 'hidden'
                });
            });
            $('#m_vo').stop().css({
                visibility: 'visible'
            }).animate({
                opacity: 1
            },600);
            
            
            //list 전환
            $('#vo').css({
                opacity: 0
            });
            
            
            $('#ol').delay(600).fadeOut(300,function(){
                $('#vo').show(100,function(){
                    $('#vo').stop().animate({
                        opacity: 1
                    },200);
                    $('footer').css({
                        display: 'block'
                    });
                    
                })
            });
        }
    });//click #btn_choice
    
    
/*//#btn_choice*************************************************/

/*#btnTop*********************************************************/
    $('#btnTop').click(function(){
        $('html').animate({
            scrollTop: 0
        },900);
    });//click #btnTop
    
/*//#btnTop********************************************************/
    
    
});//jQuery

















