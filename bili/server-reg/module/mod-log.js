define(function(){
    `use strict`;
    class Log{
        constructor(options){
            this.u = $("#user");
            this.p = $("#pass");
            this.key = "yh";
            this.enter = $(".amdin-login");
            // $("label").removeClass().addClass("label2");
            //判断要不要记住密码
            this.onff = false;
            this.init();
        }
        init(){
            var that = this;
            $("label").on("click",function(){
                //判断二次点击
                if($(this).attr("class") == "label1"){
                    //点击记住密码
                    that.onff = true;
                    $(this).removeClass().addClass("label2");
                }else{
                    //再次点击不记住密码
                    that.onff = false;
                    $(this).attr("class","label1");
                }
            })
            this.enter.click(function(){
                that.enterAjax();
            })
        }
        enterAjax(){
            //登入开始验证ajax
            var that = this;
            $.ajax({
                url:"http://www.icodeilife.cn/ctrl/login.php",
                data:{
                    user:that.u.val(),
                    pass:that.p.val()
                },
                success:function(rel){
                    // console.log(rel);
                    switch(rel){
                        case "0":
                                that.u.val("");
                                that.p.val("");
                            alert("用户名密码不符,请重新输入！");
                            break;
                        case "1":
                            alert("用户名密码为空");
                            break;
                        default:
                            rel =  $.parseJSON(rel);
                            // 登入成功后将用户数据保存到cookie
                            that.clickRight(rel);
                            window.location.href="../src/index.html";
                            that.u.val("");
                            that.p.val("");
                            alert("登入成功！")
                            break;
                    }
                }
            })
        }
        clickRight(data){
            console.log(this.onff);
            if(this.onff){
                data.pass = "";
                console.log(1)
                data = JSON.stringify(data);
                // console.log(this.key,data)
                setCookie(this.key,data,{path:"/node/mygulp/src"})
            }else{
                console.log(0)
                data = JSON.stringify(data);
                // console.log(this.key,data)
                removeCookie(this.key)
                setCookie(this.key,data,{expires:7,path:"/node/mygulp/src"})
            }
        }
    }
    return {
        lg:Log
    };
});