define(function(){
    `use strict`;
    class Ts{
        constructor(options){
            var u1 = document.getElementById("user");
            var u2 = document.getElementById("mobile");
            var p1 = document.getElementById("pass");
            var p2 = document.getElementById("txtpwd");
            // console.log(document.getElementById("user"));
            if(u1){
                this.u = u1;
            }else if(u2){
                this.u = u2;
            }
            if(p1){
                this.p = p1;
            }else{
                this.p = p2;
            }
            // this.u = $("#mobile");
            // this.p = $("#txtpwd");
            // this.u = $("#user");
            // this.p = $("#pass");
            this.p2 = options.pass2 ? options.pass2 : "";
            this.displaytxt();
        }
        displaytxt(data){
            // 当失去焦点时
            $(this.u).focusout(function(){
                if(!$(this).val()){
                    $(this).next().html("请输入用户名");
                }
            })
            $(this.p).focusout(function(){
                if(!$(this).val()){
                    $(this).next().html("请输入密码");
                }
            })
            if(this.p2){
                this.p2.focusout(function(){
                    if(!$(this).val()){
                        $(this).next().html("请确认密码");
                    }
                })
            }
        }
    }
    return {
        ts:Ts
    };
});