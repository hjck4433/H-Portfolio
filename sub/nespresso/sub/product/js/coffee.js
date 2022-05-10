/*coffee js*/


$(function(){
    
    nowT = $('.selT').data('seq'); //0-오리지널 1-버츄오

    capOl = [$('#italiana'),$('#espresso_ol'),$('#world'),$('#master_ol'),$('#barista_ol')]; //오리지널 캡슐 종류
    capVo = [$('#espresso_vo'),$('#gran'),$('#mug'),$('#master_vo'),$('#barista_vo')]; //버츄오 캡슐 종류
    
    up = 0; //현재 스크롤 높이의 범위가 0이상 section 스크롤 높이-300 미만인 상태
    down = 1; //현재 스크롤 높이의 범위가 section-300 이상인 상태
    
    
    
/*Scroll Event************************************/
    $(window).scroll(function(){
        scTop = $(this).scrollTop(); //스크롤 높이
        /*console.log(scTop);*/
        
        //#btnTop 스크롤이 섹션 부분으로 내려오면 top버튼 보이기
        secTop = $('section').offset().top;
        /*console.log(bestTop);*/
        
        if(scTop>=secTop) {
            $('#btnTop').fadeIn(600);
        }else if(scTop<secTop) {
            $('#btnTop').fadeOut(600);
        }
        
        
        
        //.cap_nav
        if(nowT===0){ //오리지널 
            //캡슐 종류별 스크롤 높이에 따라 .cap_nav에서 해당 종류 강조
            capOlTop = [capOl[0].offset().top,capOl[1].offset().top,capOl[2].offset().top,capOl[3].offset().top,capOl[4].offset().top];
            
            console.log(capOlTop[4]);
            console.log($('#barista_ol').offset().top);
            
            if(scTop >= 0 && scTop < (capOlTop[1]-500)){
                $('#m_ol .cap_nav li').eq(0).addClass('selC').siblings().removeClass('selC');
                
            }else if(scTop >= (capOlTop[1]-500) && scTop < (capOlTop[2]-500)){
                 $('#m_ol .cap_nav li').eq(1).addClass('selC').siblings().removeClass('selC');
                
            }else if(scTop >= scTop<(capOlTop[2]-500) && scTop < (capOlTop[3]-500)) {
                 $('#m_ol .cap_nav li').eq(2).addClass('selC').siblings().removeClass('selC');
                
            }else if(scTop >= scTop<(capOlTop[3]-500) && scTop < (capOlTop[4]-500)) {
                $('#m_ol .cap_nav li').eq(3).addClass('selC').siblings().removeClass('selC');
                
            }else if(scTop >= (capOlTop[4]-500)) {
                $('#m_ol .cap_nav li').eq(4).addClass('selC').siblings().removeClass('selC');
            }
            
            
        }else if(nowT===1){ //버츄오
            //캡슐 종류별 스크롤 높이에 따라 .cap_nav에서 해당 종류 강조
            capVoTop = [capVo[0].offset().top,capVo[1].offset().top,capVo[2].offset().top,capVo[3].offset().top,capVo[4].offset().top];
            
            console.log(capVoTop[1]);
            console.log(capVoTop[1]-500);
            console.log(scTop);
            
            if(scTop >= 0 && scTop<(capVoTop[1]-500)){
                $('#m_vo .cap_nav li').eq(0).addClass('selC').siblings().removeClass('selC');
            }else if (scTop >= (capVoTop[1]-500) && scTop < (capVoTop[2]-500)){
                $('#m_vo .cap_nav li').eq(1).addClass('selC').siblings().removeClass('selC');
                
            }else if (scTop >= (capVoTop[2]-500) && scTop < (capVoTop[3]-500)){
                $('#m_vo .cap_nav li').eq(2).addClass('selC').siblings().removeClass('selC');
                
            }else if (scTop >= (capVoTop[3]-500) && scTop < (capVoTop[4]-500)) {
                $('#m_vo .cap_nav li').eq(3).addClass('selC').siblings().removeClass('selC');
                
            }else if (scTop >= (capVoTop[4]-500)){
                $('#m_vo .cap_nav li').eq(4).addClass('selC').siblings().removeClass('selC');
            }
            
        }
        
        //스크롤 높이에 따라 .cap_nav ul에 scr클래스를 부여하여 #btn_choice 옆으로 위치 이동 및 기존 위치로 돌아옴
        if(scTop>=0 && scTop<(secTop-300)){
            //스크롤 높이>=0 && 스크롤 높이< section 높이-300인 동안에는 현재 위치 고정
            
            //이미 해당 범위 일때는 잠금
            if(up>0) return false; 
            up++;
            
            $('.cap_nav>ul').removeClass('scr');
            down=1;
            
            
        }else if (scTop>=(secTop-300)){
            //스크롤 높이>=section높이-300인 동안에는 현재 위치 고정
            
            //이미 해당 범위 일때는 잠금
            if(down>1) return false;
            
            down++;
            
            $('.cap_nav>ul').addClass('scr');
            up=0;
            
        }
        
        
        /*//.cap_nav*/
        
        
        
        
    });//scroll
/*//Scroll Event******************************************/
    
/*#gnb Drop down****************************************/
    
    var scTop = $(window).scrollTop();
    var secTop = $('section').offset().top;
    
    $('#gnb li').hover(
        function(){
            $(this).children('.subM').stop().slideDown(600);
            $(this).addClass('selM').siblings().removeClass('selM');
            
            //스크롤 높이>=section높이-300인 동안 #gnb를 벗어나기 전까지  .cap_nav>ul가 submenu와 겹쳐보이지 않도록 scr 클래스 제거 및 opacity 0 및 zIndex 조정;
            
            if (down>1){
                    $('.cap_nav>ul').removeClass('scr').css({
                        opacity: 0,
                        zIndex: 888
                    })
                }
           
        },
        function(){
            $(this).children('.subM').stop().slideUp(600);
            $(this).removeClass('selM');
            
            var rIdx= $(this).index();
            
            $('#gnb').mouseleave(function(){
                
                $('#gnb>li.now').addClass('selM');
                
                //스크롤 높이>=section높이-300인 동안 #gnb를 벗어나면 .cap_nav ul이 다시 보이도록 opacity 1 및 zIndex 조정;
                
                if (down>1 && rIdx<4){
                    $('.cap_nav>ul').addClass('scr').stop().animate({
                        opacity: 1,
                        zIndex: 10000
                    });
                }
                if (down>1 && rIdx==4){
                    $('.cap_nav>ul').addClass('scr').stop().animate({
                        opacity: 1,
                        zIndex: 10000
                    },250);
                }
                
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
    
    //오리지널 버츄오 클리시 해당 내용으로 전환
    $('#btn_choice li').click(function(){
        
        $(this).addClass('selT').siblings().removeClass('selT');
        
        var choice = $(this).data('seq');
        //0-오리지널 1-버츄오
        console.log(choice);
        
        //해당 내용일 시 전환 금지
        if(nowT===choice) return false;
        
        
        
        //맨 위로 이동
        
        $('html').stop().animate({
            scrollTop: 0
        },900);
        
        $('footer').css({
            display: 'none'
        });
        
        if(choice===0){ //오리지널을 클릭했을 때
            
            nowT=choice //nowT = 0
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
            $('#ol .box').hide(0,function(){
                
                moreBtn();
                
                $('.btnMore').show();
                $('.btnMore').parent().animate({
                    'padding-bottom': '200px'
                },0);
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
            
            nowT=choice; //nowT = 1 
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
            $('#vo .box').hide(0,function(){
                
                moreBtn();
                
                $('.btnMore').show();
                $('.btnMore').parent().animate({
                    'padding-bottom': '200px'
                },0);
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
    

/*.cap_nav*********************************************************/
   
    //캡슐 나비 클릭 시 해당 위치로 이동
    $('.cap_nav li a').click(function(e){
        //기본 이동 막기
        e.preventDefault();
        console.log(nowT);
        
        var capHref = $(this).attr('href');
        var capTop = $(capHref).offset().top;
        $(this).parent().addClass('selC').siblings().removeClass('selC');
        
        var capH = capTop-300;
        
        $('html').stop().animate({
            scrollTop: capH+'px'
        },600,'easeInOutQuint')
        
    }); //click .cap_nav li
    
/*//.cap_nav*********************************************************/
    
/*.list************************************************************/
    
    //capsule이 종류당 초기에 6개까지만 보이게 하는 함수
    moreBtn();
    
    //더 보기 클릭 시 3개씩 추가로 보여짐
    $('.btnMore').click(function(e){
        //기본 이동 막기
        e.preventDefault();
        
        var more = $(this).siblings('.box_wrap').children('.box');
        var moreH = $(this).siblings('.box_wrap').children('.box:hidden');
        
        var moreL = more.length;
        
        moreH.slice(0,3).slideDown(600,'linear',function(){
            /*console.log(moreH.length);*/
            if((moreH.length-3) <= 0){
                $('.btnMore').fadeOut('600');
                $('.btnMore').parent().animate({
                    'padding-bottom': '120px'
                },600);
            }
        });
        
        //추가 되면서 스크롤 이동
        $('html').stop().animate({
            scrollTop: ($(this).offset().top)-300+'px'
        },600);
        
        
        
    });//click .btnMore
    
    
    
    
    
    
/*//.list************************************************************/
    
    
    
    
/*#btnTop*********************************************************/
    //맨 위로 이동
    $('#btnTop').click(function(){
        $('html').animate({
            scrollTop: 0
        },900);
    });//click #btnTop
    
/*//#btnTop********************************************************/
    
});//jQuery



/*capsule이 종류당 초기에 6개까지만 보이게 하는 함수*/
function moreBtn() {
    var listNum = $('.list').length;
    
    for( i=0; i<listNum; i++ ){
        var box = $('.list').eq(i).children('.box_wrap').children('.box');
        
        box.slice(0,6).show();
        
    }   
}

































