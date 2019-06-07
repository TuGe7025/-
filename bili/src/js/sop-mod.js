require.config({
    //查找小模块的基目录
    baseUrl:"js", 
    //给小模块命名
    paths:{
        jqban:"jquery.banner.2.0",

        ban:"../module/mod-addshow",
        yh:"../module/mod-yh",
        spg:"../module/mod-shopping"
    }
})
require(["jqban","ban","yh","spg"],function(jqban,ban,yh,spg){
    new spg.sohop();
    new yh.modyh();
    new ban.add();
});