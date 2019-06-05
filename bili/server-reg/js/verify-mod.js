// console.log(require)
require.config({
    //查找小模块的基目录
    baseUrl:"module", 
    //给小模块命名
    paths:{
        reg:"mod-reg",
        ts:"mod-tishi",
        log:"mod-log",
        cok:"../libs/cookie",
        jq:"../libs/jquery.2.2.4",
    }
})
// 注册接口：http://www.icodeilife.cn/ctrl/register.php
// 登入接口：http://www.icodeilife.cn/ctrl/login.php
require(["reg","ts","log","cok","jq"],function(reg,ts,log,cok,_){
    
    var p2 = $("#t_pwd");
    new reg.rg();
    new log.lg()
    new ts.ts({
        pass2:p2
    })
});