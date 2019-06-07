define(function(){
    `use strict`;
	class List{
		constructor(){
            //获取cookie数据

            this.k = "spKey";
            this.p = "price";
            this.value = {
                num:0,
                price:"",
                zong:""
            }
           $(".cart-nr-zj-botton").on("click",function(){
               console.log($("#ckbox2"))
               if($("#ckbox2")[0].checked == true){
                if($.cookie("yh")){
                    $.cookie("spKey",null)
                     
                    alert("结算成功!");
                }else{
                    alert("请登入后结算!")
                    window.location.href="../server-reg/denlv.html";
                 
                }
               }else{
                   alert("请勾选计算总价!");
               }
               
           })
            // 全选按钮
            this.boxbtn = document.getElementById("ckbox1");

            // $.cookie(this.k)
            // console.log($.cookie(this.k));
            this.shop = $.parseJSON($.cookie(this.k));
            // console.log(this.shop);
            this.off = false;
            this.getAjax();
            this.boxbtn2();
        }
        getAjax(){
            var that = this;
            $.ajax({
                url:"http://localhost:8866/node/mygulp/src/indexjson/indexjson.json",
                success :function(res){
                    // console.log(res);
                    that.display(res); 
                }
            })
        }
        display(data){
            // console.log(this.shop)
            var str = "";
            if(data && this.shop){
                for(var i=0;i<data.length;i++){
                    for(var j=0;j<this.shop.length;j++){
                        // console.log(this.shop[j].id,data[i].name);
                        if(this.shop[j].id == data[i].name){
                           str += `<tr>
                           <td class="w1"><input type="checkbox" checked="checked"></td>
                           <td class="img0"><img src="${data[i].img0}" alt="${data[i].name}"></td>
                           <td class="name">${data[i].name}</td>
                           <td class="price">${data[i].price}</td>
                           <td class="num"><b class="b-left">-</b><input type="text" class="numval" value="${this.shop[j].num}" disabled="disabled"><b class="b-right">+</b></td>
                           <td class="span_li_sub">${(data[i].price * this.shop[j].num).toFixed(2)}</td>
                        
                           <td class="span_li_w"><span class="btn-span">删除</span></td>
                       </tr>`;
                        //    $("tr").find(".name").html(data[i].name);
                        //    $("tr").find("img").attr("src",data[i].img0);
                        //    $("tr").find(".price").html("￥"+data[i].price);
                        //    $("tr").find(".num").find(".numval").val(this.shop[j].num);
                        //    $("tr").find(".span_li_sub").html((data[i].price * this.shop[j].num).toFixed(2));
                           this.addnum(data,j);
                        }
                    }
                }
            }
            $("tbody").html(str);
            this.addprice();
        }
        addnum(data,j){
           
            var i = this.shop[j].num;
            var that = this;
            // console.log($(".b-right"))
            $("tbody").on("click",".b-right",function(eve){
                $("#ckbox2")[0].checked = false;
                $(".cart-nr-zj-js").html("0.00");

                i++;
                $(this).prev().val(i)
                var num = Number($(this).parent().parent().find(".price").html());
                $(this).parent().parent().find(".span_li_sub").html((num * i).toFixed(2));

            })
            $("tbody").on("click",".b-left",function(){
                $("#ckbox2")[0].checked = false;
                $(".cart-nr-zj-js").html("0.00");
                this.off = true;
                if(i <= 1){
                    i = 1;
                }else{
                    i--;
                }
                $(this).next().val(i)
                var num = Number($(this).parent().parent().find(".price").html())
                $(this).parent().parent().find(".span_li_sub").html((num * i).toFixed(2));
            })
            this.remove(j,data);
        }
        remove(j,data){
            
            var that = this;
            $("tbody").bind("click",".btn-span",function(eve){
                $("#ckbox2")[0].checked = false;
                $(".cart-nr-zj-js").html("0.00");
                if($($(eve.target)[0]).attr("class") == "btn-span"){
                   
                    var name = $(eve.target).parent().parent().find(".name").html();
                    console.log(that.shop[j])
                    if(that.shop[j] && that.shop[j].id == name){
                        //找到需要删除的下标，删除cookie
                        that.shop.splice(j,1)
                       
                        $.cookie(that.k,JSON.stringify(that.shop))
                        that.display(data);
                    }
                }
            })
        }
        addprice(){
             //1.找元素
             this.max = document.querySelector("tbody");
             this.l = this.max.childNodes.length;
            var that = this;

            //判断全选状态
            $(".cart-t").on("click",".w1",function(){
                that.lookmin();
                that.addDisplay();
            })
            $(".cart-t").on("click","#ckbox1",function(){
                that.lookmax();
                that.addDisplay();
            })
        }
        lookmin(){
            //所有选择框this.max.childNodes
            for(var i=0;i<this.l;i++){
                if(this.max.childNodes[i].firstElementChild.firstElementChild.checked == true){
                    // console.log(this.max.childNodes[i].firstElementChild.firstElementChild.checked)
                    //找到当前选中的总价
                    // console.log($(this.max.childNodes[i]).find(".price").html())
                    // console.log($(this.max.childNodes[i]).find(".numval").val())
                }else{
                    // console.log(this.max.childNodes[i].firstElementChild.firstElementChild.checked)
                    // console.log(this.max.childNodes[i])
                    this.boxbtn.checked = false;
                }
            }
        }
        lookmax(){
            //找到全选按钮
            // 当按钮状态为选中时勾选所有选择框
            if(this.boxbtn.checked == true){
                for(var i=0;i<this.l;i++){
                    this.max.childNodes[i].firstElementChild.firstElementChild.checked = true;
                }
            }
        }
        //开始计算总价格
        boxbtn2(){
            var that = this;
            setTimeout(()=>{
                $("input").trigger("#ckbox2","click");
            },0)
            
            $("#ckbox2").on("click",function(){
                // console.log($("#ckbox2")[0].checked)
                if($("#ckbox2")[0].checked == true){
                    //计算价格选中时判断选中的开始累加价格
                    that.lookmin();
                    that.addDisplay();
                }else if($("#ckbox2")[0].checked == false){
                    that.lookmin();
                    $(".cart-nr-zj-js").html("0.00");
                }
            })
           
        }
        addDisplay(){
            var zong = 0;
            for(var i=0;i<this.l;i++){
                if(this.max.childNodes[i].firstElementChild.firstElementChild.checked == true){
                    var price = $(this.max.childNodes[i]).find(".price").html();
                    var num = $(this.max.childNodes[i]).find(".numval").val()
                    zong += price * num;
                    // console.log(zong)
                    // console.log($(this.max.childNodes[i]).find(".price").html())
                    // console.log($(this.max.childNodes[i]).find(".numval").val())
                }
            }
            $(".cart-nr-zj-js").html(zong.toFixed(2));
        }
        //-------------------分割线舍弃---------------------------
        // addprice(num,i){
        //     var total = 0;
        //     var that = this;

        //     $("tbody").bind("click",function(eve){
                
        //         if((eve.target).checked == true){
        //             //找到当前合计
        //             total += Number($(eve.target).parent().parent().find(".span_li_sub").html());
        //             $(".cart-nr-zj-js").html(total.toFixed(2))
        //             // console.log((parseFloat($(eve.target).parent().parent().find(".span_li_sub").html()).toFixed(2)))
        //             console.log($(".cart-nr-zj-js").html());
        //         }else if((eve.target).checked == false){
        //             total -= Number($(eve.target).parent().parent().find(".span_li_sub").html());
                    
        //             $(".cart-nr-zj-js").html(total.toFixed(2))
        //             console.log($(".cart-nr-zj-js").html());
        //         }
        //         // console.log(eve.target)
        //     })
        //     $("#ckbox1").on("click",function(eve){
        //         var tr = ($("tbody")[0]).childNodes;
        //         if(this.checked == true){
        //             for(var i=0;i<tr.length;i++){
        //                 $(tr[i]).find(".w1").find("input")[0].checked = true;
        //             }
        //         }else{
        //             for(var i=0;i<tr.length;i++){
        //                 $(tr[i]).find(".w1").find("input")[0].checked = false;
        //             }
        //         }
        //     })
        // }
        //-------------------分割线舍弃---------------------------
    }

     return {
         list:List
     }

})