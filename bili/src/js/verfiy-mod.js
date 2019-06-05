require.config({
    //查找小模块的基目录
    baseUrl:"js", 
    //给小模块命名
    paths:{
        jqban:"jquery.banner.2.0",
        cookie:"jquery.cookie",
        ban:"../module/mod-addshow",
        yh:"../module/mod-yh",
        spg:"../module/mod-shopping"
    }
})
require(["jqban","cookie","ban","yh","spg"],function(jqban,cookie,ban,yh,spg){
    new spg.sohop();
    new yh.modyh();
    new ban.add();
});