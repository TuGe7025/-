class Magnifier{
    constructor(){
        var that = this;
            // that.obox = $(".img-box");
            that.oboxImg = $(".box_img");
            // that.aboxImg = $(".box_img img");
            that.oboxMax = $(".box_max");
            // that.aMaximg = $(".box_max img");
            // that.btnImg = $(".btn_img li");
            // that.oSpan = $(".box_img span");
            // 初始化索引
            this.index = $(".box_img img").length-1;
            //绑定事件
        var that = this;
            this.init();
            $(function(){
                that.myzindex();
            })
    }
    init(){
        var that = this;
        // 开始绑定事件
        // 	当鼠标进入(滑入)box区域时
        // 		显示span和oboxMax
        this.oboxImg.on("mouseover",function(){
            that.show();
        })
        //当鼠标移开时隐藏
        this.oboxImg.on("mouseout",function(){
            that.hide();
        })
        //当鼠标在box区域移动时
         this.oboxImg.on("mousemove",function(ele){
            //捕捉鼠标
            // span跟随鼠标移动，同时计算比例
            that.move(ele,$(".box_max img").eq(that.index));
        })
    }
    myzindex(){
        var that = this;
        //当鼠标点击某个btnImg时显示那个btnImg
        // for(let i=0;i<this.btnImg.length;i++){
        //     // console.log(this.btnImg[i])
        //     this.btnImg[i].onclick = function(){
        //         console.log(this.aboxImg[that.index])
        //         // console.log(that.btnImg[that.index]);
        //         that.index = i;
        //         that.btnImg[that.index].className = "bdr";
        //         that.aboxImg[that.index].className = "zindex";
        //         that.aMaximg[that.index].className = "zindex";
        //     }
        // }
        $(".btn_img").on("click","li",function(){
            $(".btn_img li").eq(that.index).attr("class","")
            $(".box_img img").eq(that.index).attr("class","")
            $(".box_max img").eq(that.index).attr("class","")
            that.index = $(this).index();
            $(".btn_img li").eq(that.index).attr("class","bdr")
            $(".box_img img").eq(that.index).attr("class","zindex")
            $(".box_max img").eq(that.index).attr("class","zindex")
        })
    }
    move(e,ele){
        //跟随鼠标移动，计算移动比例
        var l = e.pageX - this.oboxImg.offset().left - $(".box_img span").width()/2;
        var t = e.pageY - this.oboxImg.offset().top - $(".box_img span").height()/2;
        // 边界限定
        if(l<0) l=0;
        if(t<0) t=0;
        if(l > this.oboxImg.width() - $(".box_img span").width()){
            l = this.oboxImg.width() - $(".box_img span").width();
        }
        if(t > this.oboxImg.height() - $(".box_img span").height()){
            t = this.oboxImg.height() - $(".box_img span").height();
        }
        //生成span的位置
        $(".box_img span").css({left:l + "px",top:t + "px",cursor: "move"});
        // 计算比例
//			计算用span在box移动后得到的比例计算大图的移动比例
        var x = l/(this.oboxImg.width() - $(".box_img span").width());
        var y = t/(this.oboxImg.height() - $(".box_img span").height());
//			根据比例，操作右边大图
        $(ele).css({left:x * -($(ele).width()-this.oboxMax.width()) + "px"});
        $(ele).css({top:y * -($(ele).height()-this.oboxMax.height()) + "px"});
    }
    show(){
    
        $(".box_img span").css({display:"block"});
        $(".box_max").css({display:"block"});
    }
    hide(){
        $(".box_img span").css({display:"none"});
        $(".box_max").css({display:"none"});
    }
}
$(document).ready(function () {
    new Magnifier();
})