define(function(){
    `use strict`;
    class Reg{
        constructor(options){
            console.log("这是表单验证插件：");
            this.u = $("#mobile");
            this.p = $("#txtpwd");
            this.p2 = $("#t_pwd");
            this.smt = $(".amdin-login-nr-login");

            this.btn = $("#button1");

            this.p_chk = $("#p_chk");
            this.t_chk = $("#t_chk");

            this.pwdchk = $("#pwdchk");
            //用户名提示报错框
            this.u_tips = $("#phone_tips");
            //密码提示报错框
            this.p_tips = $("#pwd_tips");
            this.init();
            // this.verify();
            $(".ht").html(" ").css({height:"26px"});
        }
        init(){
            this.nof1 = 0;
            var that = this;

            $("input").focus(function(){
                $(this).next().html(" ");
            })
            this.btn.on("click",function(){
                $("#MyDiv").css({display:"block"}).find("span,button").click(function(){
                    $("#MyDiv").css({display:"none"})
                })
            })
            this.u.change(function(){
                var str1 = /^[\w]{4,16}$/;
                var img_u = `<img src="images/login_error.png">
                            <b>请输入4到11位（字母，数字，下划线)用户名</b>`;
                            
                that.verify({
                    val:that.u.val(),
                    st:str1.test(that.u.val()),
                    i:img_u,
                    u:that.u_tips,
                    chk:that.p_chk
                });
            })
            this.p.change(function(){
                var str2 = /^[\w]{6,16}$/;
                var img_p = `<img src="images/login_error.png">
                            <b>密码为6-16位的数字，数字或下划线组成</b>`;
                that.verify({
                    st:str2.test(that.p.val()),
                    i:img_p,
                    u:that.p_tips,
                    chk:that.pwdchk
                });
                if(str2.test(that.p.val()) == false){
                    that.p2.attr("disabled","disabled");
                    that.p2.val("");
                    that.t_chk.addClass("amdin-register-nr-k-cuo").css({backgroundPositionY:"-35px"})
                }else if(str2.test(that.p.val()) == true){
                    // that.t_chk.addClass("amdin-register-nr-k-cuo").css({backgroundPositionY:"-10px"})
                    that.p2.removeAttr("disabled");
                }
            });
            this.p2.change(function(){
                var b = "请输入确认密码"
                var b2 = "两次输入密码不一致"
                var src = "images/login_error.png";
                if(that.p2.val() == ""){
                    that.t_chk.addClass("amdin-register-nr-k-cuo").css({backgroundPositionY:"-35px"})
                    let img_p2_1 = `<img src="${src}">
                                <b>${b}</b>`;
                    $("#t_pwd_tips").html(img_p2_1);
                }else if(that.p2.val() != that.p.val()){
                    that.t_chk.addClass("amdin-register-nr-k-cuo").css({backgroundPositionY:"-35px"})
                    let img_p2_2 = `<img src="${src}">
                                <b>${b2}</b>`;
                    // that.p_chk.addClass("amdin-register-nr-k-cuo").css({backgroundPositionY:"-35px"});
                    $("#t_pwd_tips").html(img_p2_2);
                }else if(that.p2.val() == that.p.val()){
                    that.t_chk.css({backgroundPositionY:"10px"});
                    $("#t_pwd_tips").html("");
                }
            })
            //点击确认开始验证表单
            this.smt.click(function(){
                var url = "denlv.html"
                if(that.p.val() == that.p2.val()){
                    that.registerAjax(url);
                }else{
                    console.log(0);
                }
            })
        }
        registerAjax(hf){
            var that = this;
            //注册开始验证ajax
           $.ajax({
               url:"http://www.icodeilife.cn/ctrl/register.php",
               data:{
                   tel:this.u.val(),
                   pass:this.p.val(),
               },
               success:function(rel){
                   console.log(rel);
                   switch(rel){
                       case "0":
                           alert("用户名已存在请重新输入！");
                           break;
                       case "1":
                            window.location.href=hf;
                           alert("注册成功！");
                           break;
                       case "2":
                           alert("用户名或密码未填写，请重新输入！");
                           break;
                   }
               }   
           })
       }
        verify(data){
            //字母、数字、下划线
            (data.chk.addClass("amdin-register-nr-k-cuo"))
            if(data.st === false){
                data.chk.addClass("amdin-register-nr-k-cuo").css({backgroundPositionY:"-35px"});
                data.u.html(data.i);
            }else if(data.st === true){
                data.chk.css({backgroundPositionY:"10px"});
                data.u.html(" ");
            }
        }
    }
    return {
        rg:Reg
    };
});