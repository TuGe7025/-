define(function(){
    `use strict`;
    class Shopping{
        constructor(){
            
            console.log("购物车")
            this.imgbox = $(".box_img");
            this.btnimg = $(".btn_img");
            this.boxmax = $(".box_max");
            
            // console.log(this.imgbox);
            this.name = $.parseJSON($.cookie("shopping"));

            var that = this;
            $.ajax({
                url:"http://localhost:8866/node/mygulp/src/indexjson/indexjson.json",
                success :function(res){
                    console.log(res);
                    that.addth(res);
                }
            })
            $.ajax({
                url:"http://localhost:8866/node/mygulp/src/indexjson/imgjson.json",
                success :function(res){
                    console.log(res);
                    that.display(res);
                }
            })
        }
        addth(data){
            var that =this;
            var str = "";
            var sbtn = "";
            for(var i=0; i<data.length;i++){
                (function(mun){
                    if(that.name.name == data[mun].name){
                        var index = data[mun].index;
                        for(var j=0;j <index;j++){
                            str += `<img src="http://localhost:8866/node/mygulp/src/indexjson/sopimg/${data[mun].bq}${j}.jpg">`;
                            sbtn +=`<li><img src="http://localhost:8866/node/mygulp/src/indexjson/sopimg/${data[mun].bq}${j}.jpg"></li>`;
                        }
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