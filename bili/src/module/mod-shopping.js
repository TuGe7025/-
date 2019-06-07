define(function(){
    `use strict`;
    class Shopping{
        constructor(){
            // console.log("购物车")
            this.imgbox = $(".box_img");
            this.btnimg = $(".btn_img");
            this.boxmax = $(".box_max");
            this.jia = $(".jia");
            this.jian = $(".jian");
            this.number = $(".inp_t").find("input");
            this.btn_sop = $(".btn-gwc");
            this.btn_open = $(".egu_shop_cart").find("span");
            this.k = "spKey";
            this.num = 1;
            this.arr = [];
            this.name = $.parseJSON($.cookie("shopping"));
           this.xuan();
            var that = this;
            $.ajax({
                url:"http://localhost:8866/node/mygulp/src/indexjson/indexjson.json",
                success :function(res){
                    // console.log(res);
                    that.addth(res);
                    that.shopdisplay();
                }
            })
            $.ajax({
                url:"http://localhost:8866/node/mygulp/src/indexjson/imgjson.json",
                success :function(res){
                    // console.log(res);
                    that.display(res);
                }
            })
        }
        xuan(){
           
            $("#desc_1").on("click",function(){
                console.log($(this).siblings())
                $(this).siblings().css({background:"none",color:"#000"});
                $("#serveDesc").stop().hide();
                $("#listParam").stop().hide();
                $("#desc_1").css({background:"red",color:"#fff"});

                $("#defParam").stop().show()
                $("#goodsDesc").stop().show()
            })
            $("#desc_2").on("click",function(){
                console.log($(this).siblings())
                $(this).siblings().css({background:"none",color:"#000"});
                $("#serveDesc").stop().hide();
                $("#desc_2").css({background:"red",color:"#fff"});
                $("#defParam").stop().hide()
                $("#goodsDesc").stop().hide()
                $("#listParam").stop().show()
            })
            $("#desc_3").on("click",function(){
                console.log($(this).siblings())
                $(this).siblings().css({background:"none",color:"#000"});
                $("#serveDesc").stop().hide();
                $("#desc_3").css({background:"red",color:"#fff"});
                $("#listParam").stop().hide()
                $("#defParam").stop().hide()
                $("#goodsDesc").stop().hide()
                $("#serveDesc").stop().show()
            })
        }
        addNumber(data){
            //data为当前页面的数据对象!
            // console.log(data)
            var that = this;
            this.name = data.name;
            this.jia.on("click",function(){
                that.num++;
                that.number.val(that.num);
            })
            this.jian.on("click",function(){
                if(that.num <= 1){
                    alert("数量不能为0");
                }else{
                    that.num--;
                }
                that.number.val(that.num);
            })

            //点击加入购物车按钮
            this.btn_sop.on("click",function(){
               
                
                //开始判断点击加入购物车按钮后，购物车cookie里有无本页面的数据，如无就
                // 将本页面的数据push进入arr数组后再将arr数组对象存入购物车cookie
                that.goods = $.cookie(that.k);
                // console.log(that.goods)
                if(that.goods){
                    //  之后点击,先解析数据

                    that.goods = JSON.parse(that.goods);
                    // 	判断点的是否重复数据
                    var onoff = true;
                    for(var i=0;i<that.goods.length; i++){
                        if(that.goods[i].id == that.name){
                            //是重复数据
                            var n = null
                            n += parseInt(that.number.val())
                            that.goods[i].num = n;
                            onoff = false;
                        }
                    }
                    // 	11.点的是新数据
                    if(onoff){
                        // sopnum += 1;
                        that.goods.push({
                            id:that.name,
                            num:1,
                           
                        })
                    }
                }else{
                    // 第一次点击，直接存
                    that.goods = [{
                        id:that.name,
                        num:parseInt(that.number.val()),
                        
                    }];
                }
                //以上都是操作数组，最后才设置cookie
                $.cookie(that.k,JSON.stringify(that.goods));
                // that.shopdisplay();

            })

            this.btn_open.on("click",function(){
                $(this).find("a").attr("href","shopping.html");

            })   
        }
        shopdisplay(){
            this.ht = "";
            // console.log($.cookie(this.k))
            if($.cookie(this.k)){
                this.ht = $.parseJSON($.cookie(this.k));
                if(this.ht){
                    for(var k=0; k<this.ht.length;k++){
                        
                    }
                    $("#egu-top-cart").html(k);
                    
                }
            }
        }
        getCookie(val,data){
            if($.cookie(this.k)){
               this.goods = $.parseJSON($.cookie(this.k));
                console.log(this.goods);
            }else{
                this.arr.push(data);
                $.cookie(this.k,data);
            }
        }
        addth(data){
            var that =this;
            var str = "";
            var sbtn = "";
            
            for(var i=0; i<data.length;i++){
                (function(mun){
                    if(that.name.name == data[mun].name){
                        //将页面的数据传入购物车cookie
                        that.addNumber(data[mun]);
                        var index = data[mun].index;
                        for(var j=0;j <index;j++){
                            str += `<img src="http://localhost:8866/node/mygulp/src/indexjson/sopimg/${data[mun].bq}${j}.jpg">`;
                            sbtn +=`<li><img src="http://localhost:8866/node/mygulp/src/indexjson/sopimg/${data[mun].bq}${j}.jpg"></li>`;
                        }
                        $(".cp-attr").find("h3").html(data[mun].name);
                        $(".cp-attr").find("font").html(data[mun].price);
                        $(".cp-attr").find("i").html(data[mun]._price);
                        $(".gg").find("li").html(data[mun].spe);
                    }
                })(i)
            }
            str += `<span></span>`;
            this.boxmax.html(str)
            this.imgbox.html(str)
            this.btnimg.html(sbtn)
        }
        display(data){
            this.str = "";
            for(var i=0; i<data.length;i++){
                
            }
        }
    }
    return {
        sohop:Shopping
    };
})