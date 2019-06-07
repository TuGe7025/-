require.config({
    //查找小模块的基目录
    baseUrl:"js", 
    //给小模块命名
    paths:{
        jqban:"jquery.banner.2.0",
        cookie:"jquery.cookie",
        yh:"../module/mod-yh",
        splist:"../module/shopping",
        sop:"../module/mod-shopping"
    }
})
require(["jqban","cookie","yh","splist","sop"],function(jqban,cookie,yh,splist,sop){
    // console.log(cookie);
    new sop.sohop();
    new yh.modyh();
    new splist.list();
});