
	class List{
		constructor(){
            //获取cookie数据

            this.k = "spKey";
            // $.cookie(this.k)
            // console.log($.cookie(this.k));
            this.shop = $.parseJSON($.cookie(this.k));
        
            this.getAjax();
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
            
            for(var i=0;i<data.length;i++){
                if(this.shop.name == data[i].name){
                    console.log(this.shop);
                    console.log(data[i].img0);
                   $("tr").find(".name").html(data[i].name);
                  
                   $("tr").find("img").attr("src",data[i].img0);
                   $("tr").find(".price").html("￥"+data[i].price);
                   $("tr").find(".num").find(".numval").val(this.shop.num);
                   $("tr").find(".span_li_sub").html((data[i].price * this.shop.num).toFixed(2));
                   this.addnum(data[i]);
                }
            }
        }
        addnum(data){
            var i = this.shop.num;
            console.log($(".b-right"))
            $(".b-right").on("click",function(){
                console.log(1);
                i++;
                $(".numval").val(i);
                $("tr").find(".span_li_sub").html((data.price * i).toFixed(2));
            })
            $(".b-left").on("click",function(){
                console.log(1);
                if(i <= 1){
                    i = 1;
                }else{
                    i--;
                }
                $(".numval").val(i);
                $("tr").find(".span_li_sub").html((data.price * i).toFixed(2));
            })
           
        }
    }	
    new List();
    // window.onload = function(){
        

    // }
    // onload();
        

    
    