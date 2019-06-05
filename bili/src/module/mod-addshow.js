define(function(){
    `use strict`;
    class Ban{
        constructor(){
            // console.log("开启轮播图模块")
            //
            $(".ad").banner({
                // 传参设置插件
                items:$(".ad .imgbox").children(), //必填,轮播的图片
                list:false, 
                autoPlay:true, 
                moveTime:500, 
                transparency:true, //当为true时执行透明渐变运动,默认为false
                    // 判断是那个开启了轮播图
                my:$(".ad"),

                index:2         
            });

            $(".bd").banner({
                my:$(".bd"),
                items:$(".bd ul").children(),
                left:$(".prev"),
                right:$(".next"),
                list:true,
                transparency:true,
                delayTime:5000, 
                moveTime:500, 
                index:3
            })
        }
    }
    return {
        add:Ban
    };
});