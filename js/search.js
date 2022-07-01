function search(data) {
    var oUl = document.getElementById("ul1");
    var html = "";
    //当有提示内容时才显示，否则隐藏
    if (data.s.length) {
        //这个接口返回给我们的是像search({q:"d",p:false,s:["电影天堂","大麦网","电视剧","dnf","地图","dota2","dhl","豆瓣","大众点评","电影"]})这样形式的json，s后面跟的就是百度数据库里提示的内容，我们就根据s来做后面的内容
        oUl.style.display = "block";
        for (var i = 0; i < data.s.length; i++) {
            html += '<li><a target="_blank" href="http://www.baidu.com/s?wd=' + data.s[i] + '">' + data.s[i] + '</a></li>';
        }
        oUl.innerHTML = html;
    } else {
        oUl.style.display = "none";
    }
}
var oQ = document.getElementById("q");
var oUl = document.getElementById("ul1");
oQ.onkeyup = function () {
    //当输入内容不为空时，创建script标签，引入百度的接口后再添加到body标签里，应用了JSONP的原理
    if (this.value != "") {
        var oScript = document.createElement("script");
        oScript.src = "http://suggestion.baidu.com/su?wd=" + this.value + "&cb=search";
        // 上述接口是在浏览器里的network监听后得到的地址，已精简过。里面的wd后面跟要检索的内容。里面cb就是callback回调函数，接口中的内容不能直接使用，而是要用函数调用，百度建的函数是window.bdsug.sug,这里我们自己建了一个函数searh来替代
        document.body.appendChild(oScript);
    } else {
        oUl.style.display = "none";
        //当提示内容为空时不显示提示内容，当输入内容为空时也不显示提示内容
    }
}
var oBtn = document.getElementById("sub");
//当输入关键字，然后点击百度一下时，跳转到百度搜索
oBtn.onclick = function () {
    if (oQ.value) {
        // window.location.href="http://www.baidu.com/s?wd="+oQ.value+"";
        //用window.location.href方法不能在新窗口打开，因此改用window.open
        window.open("http://www.baidu.com/s?wd=" + oQ.value + "")
    }
}
oQ.focus();//自动获取页面焦点