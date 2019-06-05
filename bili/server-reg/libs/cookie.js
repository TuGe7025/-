
//打包封装的cookie
// 增:document.cookie = "名=值"

function setCookie(key,value,options){
	//判断用户有没传入需要设置的时间和路径
	//如果没有就为空对象
	options = options ? options :{};
	//处理默认有效期
	if(options.expires){
		//创建时间对象
		var d = new Date();
		//设置有效期options.expires
		d.setDate(d.getDate()+options.expires);
		//expires=添加设置有效期
		var expi = ";expires=" + d;
	}else{
		var expi = "";
	}
	//判断用户是否传入设置路径，有就path=添加,没有就为空字符
	var path = options.path ? ";path=" + options.path : "";
	//开始设置
	document.cookie = key + "=" + value + expi + path;
}
function removeCookie(key,options){
	//判断用户有没有输出需要删的
	options = options ? options :{};
	options.expires = -1;
	setCookie(key,"null",options);
}

//查
function getCookie(key){
	var arr = document.cookie.split("; ");
		// console.log(arr);
	for(var i=0; i<arr.length; i++){
		if(arr[i].split("=")[0] === key){
			return arr[i].split("=")[1];
			// console.log(arr[i].split("=")[1]);
		}
		if(arr[i].split("=")[0] === key){
			return arr[i].split("=")[0];
			// console.log(arr[i].split("=")[0]);
		}
			
	}
}

