define(function(){
    "use strict"
     //合并方法
    // $.fn.banner = function(){}; //执行 $().banner();
    // $.banner = function(){};    //执行 $.banner();
    // $.extend({banner:function(){}});    //执行 $.banner();
    // $.fn.extend({banner:function(){}}); //执行 $().banner();
    // $.extend($,{banner:function(){}});  //执行 $.banner();
    // $.extend($.fn,{banner:function(){}});//执行 $().banner();
    $.fn.banner = function(options){
        //实现轮播图
        //重新保存获取到的参数
        var {list,items,left,right,autoPlay,delayTime,moveTime,index,transparency,my} = options;
        my = my ? my : false;
        transparency = transparency  ? transparency : false;
        list = list === false ? false : true;
        autoPlay = autoPlay === false ? false : true;
        delayTime = delayTime || 3000;
        moveTime = moveTime || 300;
        if(moveTime > delayTime || (delayTime-500 <moveTime)){alert("moveTime须小于delayTime,且delayTime须比moveTime多500毫秒");}
        index = index || 0;
        if(transparency){
            var move2 = function(){
                items.eq(iPrev).css({

                    opacity:1
                }).stop().animate({

                    opacity:0
                },moveTime).end().eq(index).css({

                    opacity:0
                }).stop().animate({

                    opacity:1
                },moveTime)
                
                list && $(".list").children("li").eq(iPrev).css({opacity:.2,background:"#000"}).end().eq(index).css({opacity: 0.9,background:"#fff"});
            }
        }else{
            var move = function(direct){
                //点击左按钮向右运动
                //移开的是iPrev
                items.eq(iPrev).css({
                    left:0
                }).stop().animate({
                    left:items.eq(0).width() * direct
                },moveTime).end().eq(index).css({
                    left:-items.width() * direct
                }).stop().animate({
                    left:0
                },moveTime)
                //设置点击按钮后的list当前项
                // if(list){
                //     $(".list").children("li").eq(iPrev).css({background:""}).end().eq(index).css({background:"red"});
                // }
                list && $(".list").children("li").eq(iPrev).css({background:""}).end().eq(index).css({opacity: 0.9,background:"#fff"});
                
            }
        }
        let iPrev = items.length-1;
        function rightEvent(){

            //计算索引
            if(index == items.length-1){
                index = 0;
                iPrev = items.length-1;
            }else{
                index++;
                iPrev = index-1;
            }
            if(transparency){
                move2();
            }else{
                move(-1);
            }
            // console.log(iPrev,index)
        }
        function leftEvent(){
            //计算索引
            if(index == 0){
                index = items.length-1;
                iPrev = 0;
            }else{
                index--;
                iPrev = index + 1;
            }
            if(transparency){
                move2();
            }else{
                move(1);
                
            }
        }
            //判断有没有传入左右按钮
           if(left !=undefined && left.length > 0 && right !=undefined && right.length > 0){
            //左右按钮的功能   
            // console.log("有左右按钮");
            //绑定点击事件
            left.click(leftEvent);
            right.click(rightEvent);
           }
           if(list){
               //1.list的生产和布局
            //    console.log("有list按钮");
               var str = "";
               //2.根据items的length生成li
               for(var i=0;i<items.length;i++){
                    str += `<li>${i+1}</li>`;
               }
               //3.将生成的li插入新增ul的内容里
                    // ↓ 2.在.banner1里创建一个ul     ↓ 3.再把根据items的length生成的li 插入ul
               $(".hd").append($("<ul class='list'>").html(str));
        //     ↑ 1.这里的this就指向了.banner1
        //      1.开始设置新建的ul的样式
               $(".list")
                // ↓ 2.设置ul里li的样式
               .children().css({
                zIndex:0
                // background: "#000",
                // opacity: 0.2,

                // ↓ 3.设置li里第index个的样式
               }).eq(index).css({
                    opacity: 0.9,
                   background:"#fff"
               })
               
               let move = function(direct,iPrev,iNow){
                   //iPrev当前移开
                    items.eq(iPrev).css({
                        left:0
                    }).stop().animate({
                        left:-items.eq(0).width() * direct
                    },moveTime)
                    //iNow当前进入
                    items.eq(iNow).css({
                        left:items.eq(0).width() * direct
                    }).stop().animate({
                        left:0
                    },moveTime)
               }
               let move2 = function(iPrev,iNow){
                items.eq(iPrev).css({
                    left:0,
                    opacity:1
                }).stop().animate({
                    left:0,
                    opacity:0
                },moveTime)
                items.eq(iNow).css({
                    left:0,
                    opacity:0
                }).stop().animate({
                    left:0,
                    opacity:1
                },moveTime)
               }
               //list的功能
            //    console.log(transparency);
               $(".list").children("li").click(function(){
                   //当点击的按钮大于当前显示图片的index，图片向左走
                //    $(this).index()表示要进来的
                //      index表示当前一个要离开的
                   if($(this).index() > index){
                    //    console.log("left",$(this).index(),index);
                    if(transparency){
                        move2(index,$(this).index());
                    }else{
                        move(1,index,$(this).index());
                    }
                   }
                   //当点击的按钮小于当前显示图片的index，图片向右
                   if($(this).index() < index){
                    //    console.log("right");
                        if(transparency){
                            move2(index,$(this).index());
                        }else{
                            move(-1,index,$(this).index());
                            
                        }
                   }
                   //设置list当前项
                //    console.log($(".list").children("li").eq(index));
                $(".list").children("li").eq(index).css({background:"#000",opacity: 0.2,}).end().eq($(this).index()).css({opacity: 0.9,background:"#fff"});
                 //点击那个按钮的index就为当前的index
                 index = $(this).index();
    
               })
           }
           //是否自动播放
           if(autoPlay){
               var a = $(".bd");
                let timer;
                //开始自动播放,利用了jq提供的模拟事件
                if($(this) == $(".ad")){
                    timer = setInterval(()=>{
                        // right.trigger("click")
                        rightEvent();
                    },delayTime)
                }
                if(my){
                    timer = setInterval(()=>{
                        // right.trigger("click")
                        rightEvent();
                    },delayTime)
                }
                // 鼠标进入和离开大框，分别停止和继续
                this.hover(function(){
                        clearInterval(timer);
                },function(){
                        timer = setInterval(()=>{
                            // right.trigger("click")
                            rightEvent();
                        },delayTime)
                })
            }
    }
    return {
        b:$.fn.banner
    };
});