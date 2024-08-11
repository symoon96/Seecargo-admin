$(document).ready(function(){
    layoutScroll()
    scrollEvent()
    tab()
})

// dim 생성
function dimMaker() {
    if($('body').find('.dim').length > 0){
        return;
    }
    $('body').append('<div class="dim"></div>');
    bodyHidden();
}

// dim 제거
function dimRemove() {
    $('.dim').remove();
    bodyAuto();
}

// body scroll hidden
function bodyHidden() {
    $('body').css('overflow', 'hidden');
}

// body scroll auto
function bodyAuto() {
    $('body').css('overflow', '')
}

// 팝업열기
function popOpen(target){
    $("." + target).addClass('on');
}

// 팝업닫기
function popClose(target) {
    $("." + target).removeClass('on');

    $('.popup').css('z-index', '');
}

// dim 옵션 팝업 열기
function popOpenAndDim(target, isDim){
    popOpen(target);
    
    if(isDim == true){
        dimMaker();
    }
}

// 중첩팝업 팝업 열기
function popDuble(e, target, isDim){
    $(e).closest('.popup').css('z-index', 97);
    
    popOpen(target);
    
    if(isDim == true){
        dimMaker();
    }
}

// dim 옵션 팝업 닫기
function popCloseAndDim(target, isDim){
    popClose(target);
    
    if(isDim == true){
        dimRemove();
    }
}

function layoutScroll(){
    $('#content .headline-depth02 + .contents').mCustomScrollbar({
        axis:"y", // horizontal scrollbar
        advanced:{ 
            updateOnContentResize: true 
        },
    });
}

function scrollEvent(){
    scrollX();
    scrollY();
    scrollYX();
}

function scrollX() {
    $('.scroll-x').each(function(){
        $(this).mCustomScrollbar({
            axis:"x", // horizontal scrollbar
            advanced:{ 
                updateOnContentResize: true 
            },
            scrollbarPosition: "outside",
        });
    })
}

function scrollY() {
    $('.scroll-y').each(function(){
        if($(this).hasClass('pop-body') || $(this).hasClass('inside')){
            $(this).mCustomScrollbar({
                axis:"y", // horizontal scrollbar
                advanced:{ 
                    updateOnContentResize: true 
                },
            });
        } else {
            $(this).mCustomScrollbar({
                axis:"y", // horizontal scrollbar
                advanced:{ 
                    updateOnContentResize: true 
                },
                scrollbarPosition: "outside",
            });
        }
    });
}

function scrollYX() {
    $('.scroll-yx').each(function(){
        $(this).mCustomScrollbar({
            axis:"yx", // horizontal scrollbar
            advanced:{ 
                updateOnContentResize: true 
            },
            scrollbarPosition: "outside",
            callbacks: {
                whileScrolling: function () {
                    var scrollPos = $(this).find('.mCSB_container').position();
                    $(this).siblings('.list-head').find('table').css('transform', 'translateX(' + scrollPos.left + 'px)');
                },
                onInit: function () {
                    var scrollPos = $(this).find('.mCSB_container').position();
                    $(this).siblings('.list-head').find('table').css('transform', 'translateX(' + scrollPos.left + 'px)');
                }
            }
        })
    });
}

// 탭
function tab(){
    $('.tab-wrap').each(function(){
        let thisUse = $(this).data('use'),
            thisNo = $(this).find('.tab-btn.on').index();

        if(thisUse !== false) {
            $(this).children('.tab-cont-wrap').children('.tab-cont').hide()
            $(this).children('.tab-cont-wrap').children('.tab-cont').eq(thisNo).css('display', '');
            
            $(this).find('.tab-btn').click(function(){
                thisNo = $(this).index();

                scrollEvent()

                $(this).siblings('.tab-btn').removeClass('on');
                $(this).addClass('on');

                $(this).closest('.tab-wrap').children('.tab-cont-wrap').each(function(){
                    $(this).children('.tab-cont').hide()
                    $(this).children('.tab-cont').eq(thisNo).css('display', '');
                })
            })

            if($('[data-tab]').length > 0){
                $('[data-tab]').each(function(){
    
                    $(this).click(function(){
                        thisTabNo = $(this).data('tab') - 1;

                        $(this).closest('.tab-wrap').find('.tab-cont').hide()
                        $(this).closest('.tab-wrap').find('.tab-cont').eq(thisTabNo).css('display', '');
        
                        $(this).closest('.tab-wrap').find('.tab-btn').removeClass('on');
                        $(this).closest('.tab-wrap').find('.tab-btn').eq(thisTabNo).addClass('on');
                    })
                })
            }
        }
    });
}