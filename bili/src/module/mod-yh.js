define(function(){
    `use strict`;
    class Yh{
        constructor(){
            // console.log("开启用户验证")
            //二级菜单
            this.over();
            //开始请求数据
            this.url = "http://localhost:8866/node/mygulp/src/indexjson/sp-json.json";
            this.setAjax();
            //楼层效果
            this.lou();

            //判断用户是否登入
            $(document).ready(function(){
                if($.cookie("yh")){
                    console.log("用户已登入")
                    this.key = $.cookie("yh");
                    $("li").detach(".log");
                    $(".top-log").prepend("<li class='zxlog'><a>注销用户</a></li>")
                }
                $(".top-log").on("click.zhlog",function(){
                    console.log(1);
                    $.cookie("yh",null);
                    location.reload(true);
                })
              });
            //判断用户点击了哪个商品就转到哪个商品的详情页面
            this.sop = "shopping"
        }
        over(){
            $(".nav-left").children("li").on("mouseover",function(){
                $(this).find("div").css({display:"block"}).end().siblings().find("div").css({display:"none"})
            })
            $(".nav-left").children("li").on("mouseout",function(){
                $(this).find("div").css({display:"none"})
            })
        }
        setAjax(){
            var that = this;
            
            $.ajax({
                url:this.url,
                success:function(rel){
                    that.display({
                        rel:rel,
                        f1:"f1",
                        f2:"f2",
                        f3:"f1",
                        f0:"f0"
                    })
                }
            })
        }
        display(options){
            options = options ? options : {};
            var rel = options.rel;
            var str0 = this.addmove(options.f0,rel);
            var str1 = this.addmove(options.f1,rel);
            var str2 = this.addmove(options.f2,rel);
            var str3 = this.addmove(options.f3,rel);
            var that = this;
            $(function(){
                $("."+options.f0).html(str0);
                $("."+options.f1).html(str1);
                $("."+options.f2).html(str2);
                $(".f3").html(str3);
                //页面加载完成后判断用户点击了哪个商品,将点击的加入cookie
                var arr = [];
                $("ul.clear").find("li").on("click",function(){
                    var name;
                    name = $(this).find("img").attr("title");
                        arr += `{"name":"${name}"}`;
                    $.cookie(that.sop,arr);
                    console.log($.cookie(that.sop));
                    window.location.href="particulars.html";
                })
              });
        }
        addmove(f,rel){
            var str = "";
            // console.log(f);
            if(f == "f0"){
                for(var i=0;i<rel.length;i++){
                    if(rel[i].id == f){
                        str +=`<li class="myli"><a href="##">
                                    <i class="img">
                                        <img title="${rel[i].name}" src="${rel[i].src}" width="190px" height="190px">
                                    </i>
                                    <span class="bt">${rel[i].name}</span><span class="jg">
                                        <em>${rel[i].price}</em>
                                        <i>${rel[i].price}</i>
                                    </span>
                                    </a>
                                </li>`;
                    }
                }
            }else{
                for(var j=0; j<rel.length;j++){
                        if(rel[j].id == f){
                            str +=`<li calss="myli">
                                <div class="img"><a href="##"><img src="${rel[j].src}" width="180px" height="180px" title="${rel[j].name}"></a></div>
                                <p><em style="height:30px;"><a href="##" title="${rel[j].name}"> 
                                ${rel[j].name}
                                </a></em><span>￥<i>${rel[j].price}</i><i class="ri">${rel[j]._price}</i></span></p>
                            </li>`;      
                    }
                }
            }
            return str;
        }
        lou(){
            $(window).scroll(function(){
                // console.log($(this).scrollTop())
                var top = $(this).scrollTop();
                if (top >= 1300) {
                    $('.fd-menu').show();
                }else{
                    $('.fd-menu').hide();
                };
            });
            $(".fd-menu").children("li").on("click",function(){
                $("html").stop(true,true).animate({
                    scrollTop:$(".ht-clss").eq($(this).index()).offset().top
                })
            })
        }
    }
    return {
        modyh:Yh
    };
});