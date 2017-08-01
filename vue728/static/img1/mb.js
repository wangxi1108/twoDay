"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
var error=function(){
    layer.open({
        content: '网络异常'
        ,skin: 'msg'
        ,time: 2 //2秒后自动关闭
    });
};


debugger
var user_agent = navigator.userAgent.toLowerCase(); // detect the user agent
var ios_devices = user_agent.match(/(iphone|ipod|ipad)/)  ? "touchstart" : "click"; //check if the devices are ios devices

//判断safari浏览器是否处于无痕模式
try {
    localStorage.setItem('isPrivateMode', '1');
    localStorage.removeItem('isPrivateMode');
    window.isPrivateMode = false;
} catch(e) {

    layer.open({
        content: '为了不影响体验,请关闭safari浏览器的无痕模式！'
        ,skin: 'msg'
        ,time: 5
    });
    window.isPrivateMode = true;
}

function getUserInfo(callback){
    $post('/Tshop/account/accMsg').success(function(req){
        localStorage.setItem("userId",req.data.id);
        return callback(req);
    })
}

function ArrContain(_t,_a){
    if(_a.length>_t.length)return false;
    var num=0;
    for(var i in _a){
        if(_t.indexOf(_a[i])!=-1){
            num++;
        }
    }
    if(num===_a.length)return true;
    return num;
}

(function () {
    var Mb = function () {
        function Mb() {
            _classCallCheck(this, Mb);

            var _html = $('html');
            _html.css("font-size", _html.width() / 25 + "px");
            $(window).on('resize', function () {
                if (_html.width() > 640) return;
                _html.css("font-size", _html.width() / 25 + "px");
            });
        }
        //登录


        _createClass(Mb, [{
            key: "login",
            value: function login() {
                var form = $A("form")[0];

                var url = window.location.search;
                var urlAux = url.split('=');
                var urlId = url.indexOf('=');
                urlId = url.substring(urlId+1,url.length);


                console.log(urlId);




                lclick.login = function () {
                    var account = form.username.value;
                    var pwd = form.password.value;
                    var lay = layer.open({ type: 2, shadeClose: false });
                    $.post("/Tshop/account/doLogin", { account: account, password: pwd }, function (req) {
                        layer.close(lay);
                        console.log(req);
                        if(req.code != '200'){
                            layer.open({
                                content: req.msg,
                                btn: "确认"
                            });
                            return;
                        }
                        if(urlId==undefined || urlId==null || urlId==""){
                            location.href = '/';
                        }else{
                            console.log("urlId");
                            location.href = '/m/'+urlId;
                        }
                    });
                };
            }
            //注册


        }, {
            key: "register",
            value: function register() {
                var geolocation = new BMap.Geolocation();
                geolocation.getCurrentPosition(function (r) {
                    if (this.getStatus() == BMAP_STATUS_SUCCESS) {
                        var $distpicker = $('#distpicker');
                        $distpicker.distpicker({
                            province: r.address.province || "北京市",
                            city: r.address.city || '',
                            district: r.address.district || ''
                        });
                        /*var mk = new BMap.Marker(r.point);
                         map.addOverlay(mk);
                         map.panTo(r.point);
                         alert('您的位置：'+r.point.lng+','+r.point.lat);*/
                    } else {

                        alert('failed' + this.getStatus());
                    }
                }, { enableHighAccuracy: true });
                var form = $A("form");
                var reg_btn = $A("regbtn").setDisabled(true);
                form[0].pid.value = getUrlValue("tel");
                lclick.register = function () {
                    console.log(form.serialize());
                    $.post("/Tshop/account/doRegister", form.serialize(), function (req) {
                        console.log(req);
                        if (req.code === '200') {
                            /*layer.open({
                                content: "恭喜注册成功，是否前往实名认证。",
                                btn: ["直接登录", "实名认证"],
                                yes: function yes() {
                                    location.href = "/m/login";
                                },
                                no: function no() {
                                    location.href = "/m/personal/realname";
                                }
                            });*/

                            //跳转到设置平台交易密码页面
                            location.href = "/m/registersecond";



                        } else {
                            layer.open({
                                content: req.msg,
                                btn: "确认"
                            });
                        }
                    });
                };

                lclick.getCode = function () {
                    var account = form[0].account.value;
                    var _this = $(this);
                    var time = 60;
                    if (account != '') {
                        _this.text("重新获取验证码(" + time + ")");
                        _this.setDisabled(true);
                        var timer = interval(function () {
                            time--;
                            _this.text("重新获取验证码(" + time + ")");
                            if (time <= 0) {
                                interval.cancel(timer);
                                _this.setDisabled(false);
                                _this.text("获取验证码");
                            }
                        }, 1000);
                        $.post("/Tshop/account/getVerifyCode", { tel: account }, function (req) {

                            if (req.code != '200') {
                                layer.open({
                                    content: req.msg,
                                    btn: "确认"
                                });
                                interval.cancel(timer);
                                _this.setDisabled(false);
                                _this.text("获取验证码");
                            }
                        });
                    } else {
                        layer.open({
                            content: "手机号不能为空",
                            btn: "确认"
                        });
                    }
                };

                levent.inspect = function (a, e) {
                    var f = form[0];
                    if (f.account.value != '' && f.verifyCode.value != '' && f.password.value != '' && f.password2.value != '' && f.argee.checked) {
                        reg_btn.setDisabled(false);
                    } else {
                        reg_btn.setDisabled(true);
                    }
                };
                levent.showxy = function () {

                 $('#allAgreement').show();
                   /* $post("/dist/view/regxy.html?local=true").success(function (req) {
                        layer.open({
                            type: 1,
                            content: req,
                            anim: 'up',
                            style: 'position:fixed;overflow:auto; bottom:0; left:0; width: 100%; height: 300px; padding:10px 0; border:none;'
                        });
                    }).error(function (e) {
                        console.log(e.responseText);
                    });*/
                };
            }

        },

        {
            key:"registersecond",
            value:function registersecond(){
                debugger
                var realBtn = $(".real-btn").setDisabled(true);
                var form = $A("form");
                levent.inspect = function () {
                    var formreq = form.serialize().match(/=([^&]+)(&|$)/g);

                    var realArr= form.serializeArray();
                    var realData=new Object;
                    $.each(realArr,function(k,v){
                        realData[v.name]=v.value;
                    });

                    //判断是否有空值
                    if (formreq.length>=2) {
                        realBtn.setDisabled(false);
                    } else {
                        realBtn.setDisabled(true);
                    }
                };

                lclick.realname = function () {
                    //获取实名认证信息
                    var realArr= form.serializeArray();
                    var realData=new Object;
                    $.each(realArr,function(k,v){
                        realData[v.name]=v.value;
                    });

                    //判断两次输入密码是否相同
                    if(realData.payPassWord!=realData.payPassWord2){
                        layer.open({
                            content: '两次输入密码不一致'
                            ,skin: 'msg'
                            ,time: 2 //2秒后自动关闭
                        });
                        realBtn.setDisabled(true);
                        return;
                    }

                    var layindex = layer.open({ type: 2, shadeClose: false });
                    $post("/Tshop/account/saveSetting", realData).success(function (req) {
                        layer.close(layindex);
                        console.log(req);
                        if (req.code === '200') {
                            layer.open({
                                content: "恭喜注册成功，是否前往实名认证。",
                                btn: ["直接登录", "实名认证"],
                                yes: function yes() {
                                    location.href = "/m/login";
                                },
                                no: function no() {
                                    location.href = "/m/personal/realname";
                                }
                            })

                        } else {
                            layer.open({
                                content: req.msg,
                                btn: "确认"
                            });
                        }
                    }).error();
                };



            }

         },

                    //实名认证

            {
            key: "realname",
            value: function realname() {
                var realBtn = $(".real-btn").setDisabled(true);
                var form = $A("form");
                lclick.getCode = function () {
                    var _this = $(this),
                        time = 60;
                    _this.text("重新获取(" + time + ")");
                    _this.setDisabled(true);
                    var timer = interval(function () {
                        time--;
                        _this.text("重新获取(" + time + ")");
                        if (time <= 0) {
                            interval.cancel(timer);
                            _this.setDisabled(false);
                            _this.text("获取验证码");
                        }
                    }, 1000);
                    $.post("/Tshop/account/getVerifyCode3", { tel: phoneNum }, function (req) {
                        cs.log(req);
                        if (req.code != '200') {
                            layer.open({
                                content: req.msg,
                                btn: "确认"
                            });
                            interval.cancel(timer);
                            _this.setDisabled(false);
                            _this.text("获取验证码");
                        }
                    });
                };
                var alipay_dom = $A('alipay');
                levent.inspect = function () {
                    var formreq = form.serialize().match(/=([^&]+)(&|$)/g);

                    var realArr= form.serializeArray();
                    var realData=new Object;
                    $.each(realArr,function(k,v){
                        realData[v.name]=v.value;
                    });

                    //如果省份中填写了直辖市就禁用city输入
                    if( /重庆市|北京市|上海市|天津市/g.test(realData.province)){
                        $('#city').attr('disabled',true);
                    }

                    if (formreq.length>7) {
                        realBtn.setDisabled(false);
                    } else {
                        realBtn.setDisabled(true);
                    }
                };
                lclick.realname = function () {

                    //获取实名认证信息
                    var realArr= form.serializeArray();
                    var realData=new Object;
                    $.each(realArr,function(k,v){
                        realData[v.name]=v.value;
                    });


                    for(var key in realData){

                        if(key=='bankOwnName'&& realData[key]==""){
                            layer.open({
                                content: '银行名称必填'
                                ,skin: 'msg'
                                ,time: 2 //2秒后自动关闭
                            });
                            return;

                        }
                        if(key=='bankName'&& realData[key]==""){
                            layer.open({
                                content: '开户行支行名称必填'
                                ,skin: 'msg'
                                ,time: 2 //2秒后自动关闭
                            });
                            return;

                        }
                        if(key=='province'&& realData[key]==""){
                            layer.open({
                                content: '银行所在省份或直辖市必填'
                                ,skin: 'msg'
                                ,time: 2 //2秒后自动关闭
                            });
                            return;

                        }


                    }



                    //拼接银行分行完整地址 银行名+地区+支行名
                    realData.bankName= realData.bankName+""+$('#province').val()+$('#city').val()+$('#fenhang').val();

                    var layindex = layer.open({ type: 2, shadeClose: false });
                    $post("/Tshop/account/saveSetting", realData).success(function (req) {
                        layer.close(layindex);
                        console.log(req);
                        if (req.code === '200') {
                            layer.open({
                                content: req.msg,
                                btn: "登录",
                                end: function end() {
                                    location.href = "/m/login";
                                }
                            });
                        } else {
                            layer.open({
                                content: req.msg,
                                btn: "确认"
                            });
                        }
                    }).error();
                };
            }
            //忘记密码

        }, {
            key: "forgetpwd",
            value: function forgetpwd() {
                var form = $A("form");
                lclick.getCode = function () {
                    var _this = $(this),
                        time = 60;
                    _this.text("重新获取(" + time + ")");
                    _this.setDisabled(true);
                    var timer = interval(function () {
                        time--;
                        _this.text("重新获取(" + time + ")");
                        if (time <= 0) {
                            interval.cancel(timer);
                            _this.setDisabled(false);
                            _this.text("获取验证码");
                        }
                    }, 1000);
                    $.post("/Tshop/account/getVerifyCode3", { tel: form[0].tel.value }, function (req) {
                        cs.log(req);
                        if (req.code != '200') {
                            layer.open({
                                content: req.msg,
                                btn: "确认"
                            });
                            interval.cancel(timer);
                            _this.setDisabled(false);
                            _this.text("获取验证码");
                        }
                    });
                };
                lclick.next = function () {
                    var layindex = layer.open({ type: 2, shadeClose: false });
                    $post("/Tshop/account/changePsw", form.serialize()).success(function (req) {
                        cs.log(req);
                        layer.close(layindex);
                        if (req.code === '200') {
                            location.href = "/m/personal/forgetpwd";
                        } else {
                            layer.open({
                                content: req.msg,
                                btn: "确认"
                            });
                        }
                    }).error(function (req) {
                        cs.log("失败");
                        cs.log(req);
                    });
                };
                lclick.finish = function () {
                    var layindex = layer.open({ type: 2, shadeClose: false });
                    $post("/Tshop/account/submitNewPsw", form.serialize()).success(function (req) {
                        layer.close(layindex);
                        if (req.code === "200") {
                            location.href = "/m/personal/forgetfinish";
                        } else {
                            layer.open({
                                content: req.msg,
                                btn: "确认"
                            });
                        }
                    }).error(function (req) {});
                };
            }
            //首页

        }, {
            key: "index",
            value: function index() {


                var hotsell_list = $A("hotsell-list");
                function flushHotlist(req) {
                    var datas = req.data.productList;
                    var ul = $('<ul></ul>');
                    var lis = '';
                    for (var i = 0; i < 4; i++) {
                        lis += "\n                    <li>\n                        <a href=\"/m/detailOnly?id=" + datas[i].id + "\" class=\"img\">\n                            <img src=\"/" + datas[i].picture + "\" alt=\"\">\n                        </a>\n                        <p>" + datas[i].name + "</p>\n                    </li>";
                    }
                    ul.append(lis);
                    hotsell_list.empty();
                    hotsell_list.append(ul);
                    $(this).find('.icon-cw').removeClass("rotate_animate");
                }

                function clist(req, elem) {
                    var datas = req.data.productList;

                    var ul = $("<ul></ul>");
                    var lis = '';
                    forOf(datas, function (v, i) {
                        lis += "\n                    <li>\n                        <a href=\"/m/detailOnly?id=" + v.id + "\" class=\"img\">\n                            <img src=\"/" + v.picture + "\" alt=\"\">\n                        </a>\n                    </li>\n                    ";
                        if (i == 7) return false;
                    });
                    ul.append(lis);
                    elem.append(ul);
                }

                function jmsclist(req, elem){
                    var datas = req.data;
                    var ul = $("<ul></ul>");
                    var lis = '';
                    forOf(datas, function (v, i) {
                        lis += "\n                    <li>\n                        <a href=\"/m/detailOnly?id=" + v.id + "\" class=\"img\">\n                            <img src=\"/" + v.img + "\" alt=\"\">\n                        </a>\n                    </li>\n                    ";
                        if (i == 7) return false;
                    });
                    ul.append(lis);
                    elem.append(ul);
                }

                levent.replacehot = function () {
                    $(this).find('.icon-cw').addClass("rotate_animate");
                    $post("/Tshop/product/productMenu", { special: "newest" }).success(flushHotlist.bind(this)).error();
                };
                $post("/Tshop/product/productMenu", { special: "newest" }).success(flushHotlist).error();
                $post("/Tshop/product/productMenu", { mainCatalogName: "鞋靴/箱包/配饰" }).success(function (req) {
                    clist(req, $A("xiexue"));
                }).error();
                $post("/Tshop/product/productMenu", { mainCatalogName: "家电/手机/数码" }).success(function (req) {
                    clist(req, $A("jiadian"));
                }).error();
                $post("/Tshop/product/productMenu", { mainCatalogName: "食品/饮料/酒水" }).success(function (req) {
                    clist(req, $A("jiushui"));
                }).error();
                $post("/Tshop/product/productMenu", { mainCatalogName: "家具/家居/建材" }).success(function (req) {
                    clist(req, $A("jiaju"));
                }).error();
                $post("/Tshop/product/productMenu", { mainCatalogName: "运动户外/汽车/保险" }).success(function (req) {
                    clist(req, $A("yundong"));
                }).error();
                $post("/Tshop/product/productMenu", { mainCatalogName: "珠宝/眼镜/钟表" }).success(function (req) {
                    clist(req, $A("zhubao"));
                }).error();
                $post("/Tshop/product/productMenu", { mainCatalogName: "母婴/电教/玩具" }).success(function (req) {
                    clist(req, $A("muying"));
                }).error();
                // $post("/Tshop/showmessage/partnerPage").success(function (req) {
                //     jmsclist(req, $A("jiamengshang"));
                // }).error();

                $post("/Tshop/playImg").success(function (req) {
                    console.log(req);


                    var datas = req.data;
                    var imgs = '';
                    forOf(datas, function (v) {
                        imgs += "<div class=\"swiper-slide\" style=\"background-image:url(/" + v.picture + ")\">" +
                            "<a style=\"display:block;height:100%;width:100%;\" href=\""+v.link+"\"></a>" +
                            "</div>";
                    });
                    $A('headimg').append(imgs);
                    new Swiper('.swiper-container', {
                        pagination: '.swiper-pagination',
                        paginationClickable: true,
                        spaceBetween: 30
                    });
                }).error();
                levent.search = function (e) {
                    if (e.keyCode === 13) {
                        location.href = "/m/search?key=" + this.value;
                    }
                };
            }
            //  城市切换
        },{
            key: "cityselect",
            value: function cityselect() {
                var huanan=[],huadong=[],zhongnan=[],dongbei=[],xinan=[],huabei=[],xibei=[],qita=[],hotcity=[];

                var searchCandidate = $(".search-candidate");
                function cityList(req, elem){

                    var province = req.name;

                    var childerCity = req.children;
                    var lis = '';
                    lis +="<p>"+province+"</p>";
                    for(var i in childerCity){

                        lis += " <ul class=\"selectCity_list\"><li><a href=\"/selectCity?city="+childerCity[i].name+"\">"+childerCity[i].name+"</a></li></ul> ";
                    }
                    var div = $("<div></div>");
                    div.append(lis);
                    elem.append(div);
                }
                function hotCityList(req, elem){
                    var li = $("<li></li>");
                    var lis = '';
                    lis += "<a href=\"/selectCity?city="+req.name+"\">"+req.name+"</a>";
                    li.append(lis);
                    elem.append(li);
                }
                var lay = layer.open({ type: 2, shadeClose: false });
                $post("/Tshop/account/allCity").success(function (req) {
                    var datas=req.data;
                    layer.close(lay);
                    for(var i in datas){

                        var sheng=datas[i];
                        if(["山东","江苏","浙江","安徽"].indexOf(sheng.name)!=-1){
                            huadong.push(sheng);
                            cityList(sheng, $A("huadong"));
                        }else if(["广东","福建","广西","海南"].indexOf(sheng.name)!=-1){
                            huanan.push(sheng);
                            cityList(sheng, $A("huanan"));
                        }else if(["河南","湖北","湖南","江西"].indexOf(sheng.name)!=-1){
                            zhongnan.push(sheng);
                            cityList(sheng, $A("zhongnan"));
                        }else if(["辽宁","黑龙江","吉林"].indexOf(sheng.name)!=-1){
                            dongbei.push(sheng);
                            cityList(sheng, $A("dongbei"));
                        }else if(["四川","云南","贵州","西藏"].indexOf(sheng.name)!=-1){
                            xinan.push(sheng);
                            cityList(sheng, $A("xinan"));
                        }else if(["河北","山西","内蒙古"].indexOf(sheng.name)!=-1){
                            huabei.push(sheng);
                            cityList(sheng, $A("huabei"));
                        }else if(["陕西","新疆","甘肃","宁夏","青海"].indexOf(sheng.name)!=-1){
                            xibei.push(sheng);
                            cityList(sheng, $A("xibei"));
                        }else if(["香港","澳门","台湾"].indexOf(sheng.name)!=-1){
                            qita.push(sheng);
                            cityList(sheng, $A("qita"));
                        }else{
                            hotcity.push(sheng);
                            hotCityList(sheng, $A("hotcity"));
                        }

                    }


                }).error();

                $("#searchcity").on("input",function(){
                    var _this=$(this);

                    if(this.value.trim()!=''){

                        $post("/Tshop/account/cityName",{name:this.value}).success(function (req) {
                            var datas=req.data;
                            console.log(datas);
                            if(!datas){

                                return;
                            }
                            var ul=$("<ul></ul>");
                            var lis="";
                            for (var i in datas){
                                lis+='<li onclick="location.href=\'/selectCity?city='+datas[i].name+'\'"><a>'+datas[i].name+'</a></li>';
                            }
                            ul.append(lis);
                            searchCandidate.append(ul);
                        }).error();

                    }else{
                        searchCandidate.empty().hide();
                    }
                })

            }
            //限时抢
        },{
            key: "flashSale",
            value: function flashSale() {
                var offsetNo  = 0;
                var  count=1;
                var total,
                    pageSize,//一页多少条
                    pagerSize;//总共多少页
                var lay = layer.open({ type: 2, shadeClose: false });

                var data;

                var refresh = function(){
                    $post("/Tshop/product/activity",{
                        offset:offsetNo
                    }).success(function (req) {
                        layer.close(lay);
                        if(req.data==null){
                            $('.page-loading').html("没有更多数据了");
                            return;
                        }
                        console.log(req);

                        var datas = req.data.list;

                        total = req.data.total;
                        pageSize = req.data.pageSize;
                        pagerSize = req.data.pagerSize;
                        var saleDoods="";

                        var pageMore="";

                        if(pagerSize==count || req.data.total<pageSize){
                            $('.page-loading').html("没有更多数据了");
                        }else{
                            $('.page-loading').html("点击加载更多");
                        }
                        for(var i=0;i<datas.length;i++){
                            var  percent = 100-(datas[i].percent);
                            saleDoods+="<div class=\"saleDoods_unit\">"+
                                "<div class=\"saleDoodsImg\" style=\"background-image:url(/"+datas[i].picture+")\">" +
                                "</div>" +
                                "<dl class=\"saleDoods_right\">" +
                                "<dt>"+i+datas[i].name+"</dt>" +
                                "<dd>" +
                                "<span class=\"color_ee4745\">￥"+datas[i].nowPrice+"</span>" +
                                "<del>￥"+datas[i].price+"</del>" +
                                "<span class=\"color_ee4745\">已抢"+datas[i].sellcount+"件</span>" +
                                "</dd>" +
                                "<dd class=\"right_bottom\">" +
                                "<p >" +
                                "<span  style=\""+percent+"%\">库存"+percent+"%</span>" +
                                "</p>" +
                                "<a href=\"/m/detailOnly?id="+datas[i].id+"\">马上抢</a>" +
                                "</dd>" +
                                "</dl>"+
                                "</div>";

                        }
                        $(".saleDoods_list").append(saleDoods);


                    }).error();

                };
                refresh();
                $('.page-loading').on('click',function(){
                    count++;
                    if(count>pagerSize){
                        $('.page-loading').html("没有更多数据了");
                        return;
                    }else{
                        $('.page-loading').html("点击加载更多");
                    }
                    offsetNo=pageSize*count;
                    console.log(pageSize);

                    $('.page-loading').html("加载中....");
                    refresh();
                })
                var lis = "";
                $post("/Tshop/product/activityCatalog").success(function(req){
                    if(req.code!=200){
                        return;
                    }
                    var datas = req.data;


                    for(var i=0;i<datas.length;i++){
                        // console.log(datas[i].name);
                        lis+="<a class='goodsClass_unit' href=\"/m/sellOut?catalogID="+datas[i].id+"\">"+datas[i].name+"</a>";
                    }

                }).error();
                lclick.classList = function () {
                    layer.open({
                        type: 1
                        ,content: lis
                        ,anim: 'lower'
                        ,style: 'position:fixed; top:45px; right:0; width: 50%; height: 300px; padding:10px 0; border:none;overflow: auto'
                    });
                }
            }
            //    即将售罄
        },{
            key: "sellOut",
            value: function sellOut() {
                var offsetNo  = 0;
                var  count=1;
                var total,
                    pageSize,//一页多少条
                    pagerSize;//总共多少页
                var lay = layer.open({ type: 2, shadeClose: false });

                var data;

                var refresh = function(){
                    $post("/Tshop/product/activity",{
                        sellOut:true,
                        offset:offsetNo
                    }).success(function (req) {
                        layer.close(lay);
                        if(req.data==null){
                            $('.page-loading').html("没有更多数据了");
                            return;
                        }
                        console.log(req);

                        var datas = req.data.list;

                        total = req.data.total;
                        pageSize = req.data.pageSize;
                        pagerSize = req.data.pagerSize;
                        var saleDoods="";

                        var pageMore="";


                        if(pagerSize==count || req.data.total<pageSize){
                            $('.page-loading').html("没有更多数据了");
                        }else{
                            $('.page-loading').html("点击加载更多");
                        }
                        for(var i=0;i<datas.length;i++){
                            var  percent = 100-(datas[i].percent);
                            saleDoods+="<div class=\"saleDoods_unit\">"+
                                "<div class=\"saleDoodsImg\" style=\"background-image:url(/"+datas[i].picture+")\">" +
                                "</div>" +
                                "<dl class=\"saleDoods_right\">" +
                                "<dt>"+i+datas[i].name+"</dt>" +
                                "<dd>" +
                                "<span class=\"color_ee4745\">￥"+datas[i].nowPrice+"</span>" +
                                "<del>￥"+datas[i].price+"</del>" +
                                "<span class=\"color_ee4745\">已抢"+datas[i].sellcount+"件</span>" +
                                "</dd>" +
                                "<dd class=\"right_bottom\">" +
                                "<p >" +
                                "<span  style=\""+percent+"%\">库存"+percent+"%</span>" +
                                "</p>" +
                                "<a href=\"/m/detailOnly?id="+datas[i].id+"\">马上抢</a>" +
                                "</dd>" +
                                "</dl>"+
                                "</div>";

                        }
                        $(".saleDoods_list").append(saleDoods);


                    }).error();

                };
                refresh();
                $('.page-loading').on('click',function(){
                    count++;
                    if(count>pagerSize){
                        $('.page-loading').html("没有更多数据了");
                        return;
                    }else{
                        $('.page-loading').html("点击加载更多");
                    }
                    offsetNo=pageSize*count;
                    console.log(pageSize);

                    $('.page-loading').html("加载中....");
                    refresh();
                })
                var lis = "";
                $post("/Tshop/product/activityCatalog").success(function(req){
                    if(req.code!=200){
                        return;
                    }
                    var datas = req.data;


                    for(var i=0;i<datas.length;i++){
                        // console.log(datas[i].name);
                        lis+="<a class='goodsClass_unit' href=\"/m/sellOut?catalogID="+datas[i].id+"\">"+datas[i].name+"</a>";
                    }

                }).error();
                lclick.classList = function () {
                    layer.open({
                        type: 1
                        ,content: lis
                        ,anim: 'lower'
                        ,style: 'position:fixed; top:45px; right:0; width: 50%; height: 300px; padding:10px 0; border:none;overflow: auto'
                    });
                }


            }
            //    商品详情
        },{
            key: "detailOnly",
            value: function detailOnly() {
                var url = window.location.search;
                var urlAux = url.split('=');
                var urlId = urlAux[1];
                console.log(urlId);
                var product,datas,hotProductList,evaluate;
                var isSelectSpec=false;
                var shopNowPrice,shopStock,shopSpecId,shopScore,productHTML;
                // var ptId;








                $post('/Tshop/account/getAddress').success(function(req){
                    console.log(req);
                });
                var lay = layer.open({ type: 2, shadeClose: false });
                $post("/Tshop/product/productDetail",{id:urlId}).success(function(req){
                    layer.close(lay);
debugger;






                    datas = req.data;

                    //商品详情
                    product=req.data.product;
                    var images = product.images;
                    var spec = req.data.spec;
                    console.log(spec);
                    // 相关热卖
                    hotProductList  = req.data.hotProductList;
                    console.log(datas);
                    //评论
                    evaluate = datas.comment;
                    //详情介绍
                    productHTML = product.productHTML || '暂无详情介绍';


                    productHTML=productHTML.replace(/src=\"image\//g,'src="/image/');//处理图片链接

                    if(datas.isFavorite=='y'){
                        $('.addfav').addClass("cancelCollection").removeClass('addfavCollection');
                        $('.addfav').html("取消收藏");
                    }else{
                        $('.addfav').removeClass("cancelCollection").addClass('addfavCollection');
                        $('.addfav').html("收藏");
                    }

                    var datainfo={
                        'product':product,
                        'hotProductList':hotProductList,
                        'datas':datas
                    };

                    var html = template('content-tpl', datainfo);
                    document.querySelector('#detail_content').innerHTML = html;
                    console.log(datainfo);
                    var buyHtml = template('buySelect-tpl', datainfo);
                    document.querySelector('#buySelect').innerHTML = buyHtml;


                    document.querySelector('#goods_detail_images').innerHTML = productHTML;


                    console.log(product);

                    if(product.spec==null){
                        shopNowPrice = product.nowPrice;
                    }


                    //驾校固定产品显示预付款
                    if(urlId=='12521'||urlId=='12522'||urlId=='12628'||urlId=='12627'||urlId=='12614'){
                        $('#promotion').html('预付款')
                    }else{
                        $('#promotion').html('新品促销')
                    }



                    //选择颜色、尺寸
                    var html=[];
                    var specId=[];
                    var backIds=[];

                    $('.popup_goodsDetail_select_info ul li').on('click',function(){
                        var classList = $(this).attr('class');
                        var _this = $(this);
                        if(classList=='normal disabled'||isSelectSpec){
                            return;
                        }


                        isSelectSpec=true;
                        $(this).toggleClass('active').siblings().removeClass('active');

                        html=[];
                        specId=[];

                        backIds=[];

                        for(var i=0;i<$('.normal.active').length;i++){
                            specId.push($('.normal.active')[i].id);
                            var text = $('.normal.active')[i].innerHTML;
                            html.push(text);
                            $('.detail_goods_select_text .selected').html("已选:"+html);
                        }

                        var ids;
                        var deatailId = [];
                        var chooseline=[];
                        var newIds=[];
                        var backId=[];

                        if(specId.length){
                            $post('/Tshop/product/specMsg',{productId:product.id,detailIds:specId}).success(function(req){

                                var dt = req.data.dt;
                                var pt = req.data.pt;
                                deatailId = [];
                                chooseline=[];
                                newIds=[];

                                for(var i=0;i<dt.length;i++){

                                    var vrr=dt[i].detailId.split(",");
                                    if(ArrContain(vrr,specId)===true){
                                        Array.prototype.push.apply(deatailId,vrr);
                                    }else if(ArrContain(vrr,specId)===specId.length-1){
                                        Array.prototype.push.apply(chooseline,vrr);
                                    }

                                }

                                for(var i in spec){
                                    var spe=spec[i].value;
                                    var choose=false;
                                    var cspecIndex;


                                    for(var ii in spe){
                                        // console.log(specId.indexOf(spe[ii].id));
                                        // console.log(cspecIndex);
                                        if((cspecIndex=specId.indexOf(spe[ii].id))!==-1){
                                            choose=true;
                                            if(specId.length===1){

                                                Array.prototype.push.apply(chooseline,spe.map(function(v){return v.id}));
                                            }
                                            break;
                                        }
                                    }



                                    for(var ii in spe){

                                        if(choose&&spe[ii].id!=specId[cspecIndex]){
                                            chooseline.indexOf(spe[ii].id)==-1;
                                            if(chooseline.indexOf(spe[ii].id)!=-1){
                                                deatailId.push(spe[ii].id);
                                            }

                                        }else{
                                            // console.log(deatailId.indexOf(spe[ii].id));

                                            deatailId.indexOf(spe[ii].id)==-1;
                                        }
                                    }
                                }
                                // console.log(deatailId);



                                for(var i=0,o={},tmp=[],count=0,l=deatailId.length;i<l;i++){
                                    if(o[deatailId[i]]){
                                        count++;
                                    }else{
                                        o[deatailId[i]]=1;
                                        tmp.push(deatailId[i])
                                    }
                                }


                                for(var i=0;i<$('.popup_goodsDetail_select_info ul li').length;i++){

                                    var selectIds = $('.popup_goodsDetail_select_info ul li')[i].id;

                                    $('.popup_goodsDetail_select_info ul li').eq(i).addClass('disabled');

                                    for(var k=0;k<tmp.length;k++){
                                        if($('.popup_goodsDetail_select_info ul li')[i].id==tmp[k]){

                                            $('.popup_goodsDetail_select_info ul li').eq(i).removeClass('disabled');



                                        }
                                    }
                                }
                                if(specId.length===spec.length){
                                    shopNowPrice=pt.price;
                                    $('.goods_pro_info .detail_goods_price').html("￥"+shopNowPrice);
                                    shopStock=pt.stock;
                                    $('.goods_pro_info .detail_goods_stock').html(shopStock);
                                    shopSpecId=pt.id;
                                    shopScore=pt.epoint;
                                    $('.goods_pro_info .detail_goods_epoint').html(shopScore+'点');
                                }else{
                                    $('.goods_pro_info .detail_goods_price').html("￥"+product.nowPrice);
                                    $('.goods_pro_info .detail_goods_stock').html(product.stock);
                                    $('.goods_pro_info .detail_goods_epoint').html(product.score+'点');

                                }
                                isSelectSpec=false;




                            })

                        }else{
                            $('.popup_goodsDetail_select_info ul li').removeClass('disabled');
                            isSelectSpec=false;
                        }

                        if($('.popup_goodsDetail_select_info ul').length==html.length){
                            $('.detail_goods_select_text .notSelected').html("");
                        }
                    });

                    //数量加减
                    var num = $('.sku_quantity .btn-input input').val();









                    $('.sku_quantity .btn').on('click',function(){

                        var  className = $(this).attr('class');
                        if(className=='btn plus'){
                            num++;
                            $('.btn-minus').removeClass('off');
                        }else{
                            num--;
                            if(num<1){
                                num=1;
                                $('.btn-minus').addClass('off');
                            }else{
                                $('.btn-minus').removeClass('off');
                            }
                        }
                        $('.sku_quantity .btn-input input').val(num);
                    });
                    //弹窗

                    $('.select_goods').on('click',function(){
                        $('.popup_layer').addClass('popueWarp_slide');
                        $('.popup_warp').addClass('sliderUp');
                        $('.popup_warp').children().show();
                        $('body').addClass('oh');
                    });
                    $('.popup_close').on('click',function(){
                        ;
                        $('.popup_layer').removeClass('popueWarp_slide');
                        $('.popup_warp').removeClass('sliderUp');
                        $('body').removeClass('oh');
                        //$('#imgRresult').children().remove();
                    });

                    //点击加入购物车
                    $('.goodsAddcart').on(ios_devices,function(){

                        if($('.popup_goodsDetail_select_info ul').length!=html.length){
                            layer.open({
                                content: '请选择商品规格'
                                ,skin: 'msg'
                                ,time: 2
                            });
                            return;
                        }



                        $post('/Tshop/cart/addToCart',{
                            productID:product.id,
                            buyCount:num,
                            buySpecID:shopSpecId
                        }).success(function(req){

                            if(req.code==="201"){
                                layer.open({
                                    content: '请登录后再操作!'
                                    ,btn: ['去登录', '取消']
                                    ,yes: function(index){
                                        location.href="/m/login?url=detailOnly?id="+urlId;
                                        layer.close(index);
                                    }
                                });
                                return;
                            }
                            $('.popup_layer').removeClass('popueWarp_slide');
                            $('.popup_warp').removeClass('sliderUp');
                            $('body').removeClass('oh');

                            layer.open({
                                content: req.msg
                                ,skin: 'msg'
                                ,time: 2
                            });

                        }).error();
                    });
                    //点击立即购买
                    $('.gobuy').on(ios_devices,function(){

                        if($('.popup_goodsDetail_select_info ul').length!=html.length){
                            layer.open({
                                content: '请选择商品规格'
                                ,skin: 'msg'
                                ,time: 2
                            });
                            return;
                        }
                        var dataInfo = {
                            productId:product.id,
                            buyCount:num,
                            unitPrice:shopNowPrice,
                            specId:shopSpecId || null,//规格
                            totalPrice:shopNowPrice*num
                        }
                        console.log(dataInfo);

                        $post('/Tshop/order/submitOrder',{
                            productId:product.id,
                            buyCount:num,
                            unitPrice:shopNowPrice,
                            specId:shopSpecId,
                            totalPrice:shopNowPrice*num
                        }).success(function(req){
                            console.log(req);
                            if(req.code==="201"){
                                layer.open({
                                    content: '请登录后再操作!'
                                    ,btn: ['去登录', '取消']
                                    ,yes: function(index){
                                        location.href="/m/login?url=detailOnly?id="+urlId;
                                        layer.close(index);
                                    }
                                });
                                return;
                            }

                            if(req.code!=200){
                                layer.open({
                                    content: req.msg
                                    ,skin: 'msg'
                                    ,time: 2
                                });
                                return;
                            }

                            if (!window.isPrivateMode && window.localStorage) { // 不是 Safari 无痕模式并且能用 localStorage
                                localStorage.setItem("url",'gobuy');
                            }else {
                                layer.open({
                                    content: '请关闭safari浏览器的无痕模式'
                                    ,skin: 'msg'
                                    ,time: 3
                                });

                            }

                            location.href='/m/pay';

                            $('.popup_layer').removeClass('popueWarp_slide');
                            $('.popup_warp').removeClass('sliderUp');
                            $('body').removeClass('oh');

                        }).error();
                    });

                    $('.tab_tit li').on('click',function(){
                        $(this).addClass('active').siblings().removeClass('active');
                        var index = $(this).index();
                        var unit = $('.tab_unit');
                        for(var i=0;i<unit.length;i++){
                            unit[i].style.display = "none";
                            if(i==index){
                                unit[i].style.display = "block";
                            }
                        }
                    });

                    // 轮播
                    var imgCol = images.split(",");
                    var slider="";
                    for(var i=0;i<imgCol.length;i++){
                        slider+="<div class=\"swiper-slide\" style=\"background-size: 44%; background:url(/"+imgCol[i]+") no-repeat center;\"></div>";
                    }

                    $('.swiper-wrapper').html(slider);

                    var swiper = new Swiper('.swiper-container', {
                        pagination: '.swiper-pagination',
                        paginationClickable: true,
                        spaceBetween: 0

                    });

                    comment();
                    //特殊处理加油卡  如果是加油卡 则隐藏加入购物车按钮

                    if(req.data.product.id=='12368'||req.data.product.id=='12201'){
                        $('.addCart').hide();
                        $('.goodsAddcart').hide();
                    }


                }).error();






                //评论列表
                var evaluateList='';
                var offsetNo  = 0;
                var  count=0;
                var total,pageSize,pagerSize;
                var comment = function(){

                    $post('/Tshop/product/commentList',{productId:urlId,offset:offsetNo}).success(function(req){

                        // console.log(req.data);

                        if(req.data==null){
                            $('.lookMore').html('<p class=\"clickMore_evaluate\">没有更多数据了</p>');
                            return;
                        }


                        var commentList = req.data.commentList.list;
                        total = req.data.commentList.total;
                        pageSize = req.data.commentList.pageSize;
                        pagerSize = req.data.commentList.pagerSize;




                        if(commentList.length==0||commentList==null||commentList==undefined){
                            $('.lookMore').html('<p class=\"clickMore_evaluate\">没有更多数据了</p>');
                        }else{
                            for(var i=0;i<commentList.length;i++){
                                if(commentList[i].nickname==null){
                                    commentList[i].nickname="[未命名]";
                                }
                                if(commentList[i].content==null){
                                    commentList[i].content="未填写评价";
                                }
                                if(commentList[i].specColor==null){
                                    commentList[i].specColor="未设置"
                                }
                                if(commentList[i].specSize==null){
                                    commentList[i].specSize="未设置"
                                }
                                evaluateList+=  "<div class=\"goods_evaluate_item\">" +
                                    "<div class=\"goods_evaluate_peopleWarp\">"+
                                    "<div class=\"goods_evaluate_peopleInfo\">"+
                                    "<span class=\"goods_evaluate_peopleName\">"+commentList[i].nickname+"</span>"+
                                    "</div>"+
                                    "</div>"+
                                    "<div class=\"goods_evaluate_text\">"+commentList[i].content+"</div>"+
                                    "<div class=\"goods_evaluate_time\">"+
                                    "<span>"+commentList[i].createdate+"</span>"+
                                    "<span>颜色:"+commentList[i].specColor+"</span>"+
                                    "<span>尺码:"+commentList[i].specSize+"</span>"+
                                    "</div>"+
                                    "</div>";
                            }
                        }
                        document.querySelector('.goods_evaluate_list').innerHTML=evaluateList;

                        if(pagerSize==1){
                            $('.lookMore').html('<p class=\"clickMore_evaluate\">没有更多数据了</p>');
                        }else if(pagerSize>1){
                            $('.lookMore').html('<p class=\"clickMore_evaluate clickLookMore\">点击查看更多</p>');
                        }
                        if(pagerSize==count+1){
                            $('.lookMore').html("<p class=\"clickMore_evaluate\">没有更多数据了</p>");
                            return;
                        }
                        $('.clickLookMore').on('click',function(){
                            $('.lookMore').html('<p class=\"clickMore_evaluate\">加载中...</p>');
                            offsetNo=pageSize*count;
                            count++;

                            comment();
                        })



                    }).error();
                };
                //收藏
                levent.addfav = function () {

                    var classList = this.classList;

                    var index = $.inArray("cancelCollection", classList);


                    if(classList[index]=="cancelCollection"){

                        $post('/Tshop/product/cancelCollection',{productID:urlId}).success(function(req){

                            if(req.code==202){
                                layer.open({
                                    content: '请登录后再操作!'
                                    ,btn: ['去登录', '取消']
                                    ,yes: function(index){
                                        location.href="/m/login";
                                        layer.close(index);
                                    }
                                });
                                return;
                            }
                            $('.addfav').removeClass("cancelCollection").addClass('addfavCollection');
                            $('.addfav').html("收藏");
                            layer.open({
                                content: req.msg
                                ,skin: 'msg'
                                ,time: 2 //2秒后自动关闭
                            });

                        })


                    }else{
                        $post('/Tshop/product/addToCollect',{productID:urlId}).success(function(req){

                            if(req.code==202){
                                layer.open({
                                    content: '请登录后再操作!'
                                    ,btn: ['去登录', '取消']
                                    ,yes: function(index){
                                        location.href="/m/login";
                                        layer.close(index);
                                    }
                                });
                                return;
                            }
                            $('.addfav').addClass("cancelCollection").removeClass('addfavCollection');
                            $('.addfav').html("取消收藏");
                            layer.open({
                                content: req.msg
                                ,skin: 'msg'
                                ,time: 2 //2秒后自动关闭
                            });

                        })
                    }
                };

            }

            //支付页面
        },{
            key: "pay",
            value: function pay() {
debugger;
                // var url = window.location.search;
                // var urlAux = url.split('=');
                // var urlId = urlAux[1];
                //
                // console.log(urlId);
                var urlVal = localStorage.getItem("url");

                var lay = layer.open({ type: 2, shadeClose: false });
                //获取个人信息
                var wasteScore,cashAmount;
                var fee=0,score=0,productMoney,addressId,totalPrice,productNum,specId,productId,product=[],myAddress;


                getUserInfo(function(result){
                    // console.log(result);
                    wasteScore = result.data.wasteScore;
                    cashAmount=result.data.cashAmount;

                    //获取购买订单列表
                    $post('/Tshop/order/getSession').success(function(req){

                        debugger;
                        layer.close(lay);
                        if(req.product instanceof Array){

                            for(var i=0;i<req.product.length;i++){
                                fee += req.product[i].fee?parseFloat(req.product[i].fee):0;
                                score += req.product[i].score*parseInt(req.product[i].num);
                                product.push(req.product[i]);
                            }
                        }else{
                            product.push(req.product);
                            score=product[0].score*req.productNum;//单种商品订单的e点个数
                            fee=product[0].fee;//单个商品的运费
                        }

                        //$("#zEpoint").text(score);
                        productMoney = req.productMoney;
                        totalPrice = req.totalPrice;

                        if(req.address[0]==undefined){
                            myAddress="";
                            addressId = "";
                        }else{
                            myAddress=req.address[0];
                            addressId = req.address[0].id;
                        }


                        productNum = req.productNum;

                        if(product.length==1){
                            productId = product[0].id;
                            specId = product[0].specId || null;
                        }

debugger
                        var datainfo={
                            'address':myAddress,
                            'product':product,
                            'productMoney':productMoney,
                            'fee':fee,
                            'score':score,
                            'wasteScore':dealNum(wasteScore) || 0,
                            'cashAmount':dealNum(cashAmount) || 0,
                            'totalFreeze':req.totalFreeze
                        };


                        var html = template('content-tpl', datainfo);
                        document.querySelector('#payContent').innerHTML = html;
                        $('#productMoney').html('￥'+(parseFloat(productMoney)+parseFloat(fee)));


                        //如果是购买的加油卡显示上传照片模块
                       /* if(req.product.id=='12368'){
                            $('#uploadCard').show();
                        }*/
                        //特殊处理加油卡  如果是加油卡 则隐藏加入购物车按钮
                        if(req.product.id=='12368'||req.product.id=='12201'){
                            if(req.product.id=='12368'){
                                $('#uploadCard').show();
                                $('.ykCardNum').hide();
                                $('.ykInfo').show();
                            }else {
                                $('#uploadCard').hide();
                                $('.ykCardNum').show();
                                $('.ykInfo').hide();
                            }

                            $('#doCommentID').hide();
                        }else {
                            $('.ykInfo').hide();
                        }


                        //上传图片使用FileReader读取图片并转成base64编码
                        var imgCounts=0;
                        function selectImages(file){
                            if(typeof FileReader==='undefined'){
                                var index= layer.open({
                                    title:"提示",
                                    icon:1,
                                    content:"抱歉，你的浏览器不支持HTML5上传图片"
                                });
                                $('#upimginp').attr('disabled','disabled');//关闭传按钮
                            }else{
                                //进行图片处理
                                if(!file.files || !file.files[0]){
                                    return;
                                }


                                var reader = new FileReader();
                                debugger


                                var layPic = layer.open({
                                    type: 2,
                                    shadeClose: false,
                                    content: '上传中...'
                                });

                                reader.onload = function(evt){
                                    debugger

                                    var result = this.result;
                                    var img = new Image();
                                    img.src = result;
                                    var imgSrc='';

                                    $("<img/>").attr('src',result)[0].onload=function (e) {
                                        img.width = this.width;
                                        img.height = this.height;

                                        // //如果图片大小大于1M，否则直接上传
                                        if (img.src.length > 1048576) {
                                            imgSrc = compress(img);

                                        } else {
                                            imgSrc = img.src;
                                        }

                                        //var imgSrc = evt.target.result;//image src
                                        //生成预览图
                                       /* var imgHtml='<div class="s-pic-img-new" style="background-image:url('+imgSrc+')">' +
                                            '<i class="icon-cancel-circled"></i>'+
                                            '</div>';*/

                                    var imgHtml='<div class="s-pic-img-new">' +
                                        '<img src="'+imgSrc+'">' +
                                        '<i class="icon-cancel-circled"></i>'+
                                        '</div>';

                                        $('#imgRresult').append(imgHtml);
                                        layer.close(layPic);
                                        imgCounts++;
                                        //删除图片
                                        var iboxObj=$('.s-pic-img-new i');
                                        iboxObj.click(function (event) {
                                            imgCounts--;
                                            $(this).parent().remove();
                                        });



                                    }



                                };
                                reader.readAsDataURL(file.files[0]);
                            }
                        }



                        $('#upimginp').on('change',function () {

                            //上传不能超过5张图片
                            if(imgCounts>=2) {
                                layer.open({
                                    title: "提示",
                                    content: "上传图片不能超过2张",
                                    icon: 1
                                });
                                return;
                            }
                            var _this=this;
                            selectImages(_this);
                        })



                    }).error();


                });
                //压缩图片
                function compress(img) {
                    debugger
                    var initSize = img.src.length;
                    var width = img.width;
                    var height = img.height;

                    //如果图片大于四百万像素，计算压缩比并将大小压至400万以下
                    var ratio;
                    if ((ratio = width * height / 4000000)>1) {
                        ratio = Math.sqrt(ratio);
                        width /= ratio;
                        height /= ratio;
                    }else {
                        ratio = 1;
                    }
                    var canvas = document.createElement('canvas');
                    var ctx = canvas.getContext('2d');
                    var tCanvas = document.createElement('canvas');
                    var tctx = canvas.getContext('2d');
                    canvas.width = width;
                    canvas.height = height;

//        铺底色
                    ctx.fillStyle = "#fff";
                    ctx.fillRect(0, 0, canvas.width, canvas.height);

                    //如果图片像素大于100万则使用瓦片绘制
                    /* var count;
                     if ((count = width * height / 1000000) > 1) {
                     count = ~~(Math.sqrt(count)+1); //计算要分成多少块瓦片

                     //            计算每块瓦片的宽和高
                     var nw = ~~(width / count);
                     var nh = ~~(height / count);


                     tCanvas.width = nw;
                     tCanvas.height = nh;

                     for (var i = 0; i < count; i++) {
                     for (var j = 0; j < count; j++) {
                     tctx.drawImage(img, i * nw * ratio, j * nh * ratio, nw * ratio, nh * ratio, 0, 0, nw, nh);

                     ctx.drawImage(tCanvas, i * nw, j * nh, nw, nh);
                     }
                     }
                     } else {
                     ctx.drawImage(img, 0, 0, width, height);
                     }*/

                    ctx.drawImage(img, 0, 0, width, height);

                    //进行最小压缩
                    var ndata = canvas.toDataURL("image/jpeg", 0.1);

                    console.log("压缩前：" + initSize);
                    console.log("压缩后：" + ndata.length);
                    console.log("压缩率：" + ~~(100 * (initSize - ndata.length) / initSize) + "%");

                    tCanvas.width =0;
                    tCanvas.height =0;
                    canvas.width =0;
                    canvas.height = 0;

                    return ndata;
                }



                //点击提交订单
                levent.orderSubmit = function () {


                //备注加油卡账户姓名手机号身份证号

                    var ykInfoStr;


                    var lay = layer.open({ type: 2, shadeClose: false });
                    var buyCarIds=[],datainfo;
                    for(var i=0;i<product.length;i++){
                        // console.log(buyCarIds.push(scope.products[i].buyCarId););
                        buyCarIds.push(product[i].buyCarId);
                    }
                    var jifen,yuE,totalFreeze;
                    if($('#jifen').is(":checked")){
                        jifen = $('#jifen').val();
                    }else{
                        jifen =null;
                    }
                    if($('#yuE').is(":checked")){
                        yuE = $('#yuE').val();
                    }else{
                        yuE = "0";
                    }

                    if($("#totalFreeze").is(":checked")){
                        totalFreeze=$('#totalFreeze').val()
                    }else{
                        totalFreeze="0"
                    }
                    //当订单为多个时候
                    if(buyCarIds.length>=1&&buyCarIds[0]!=null){
                         datainfo = {
                            buyCarIds:buyCarIds,//购物车Id数组
                            totalPrice:totalPrice,//总计
                            remark:"",//备注
                            addressId:addressId,//地址ID
                            wasteScore:jifen,//使用积分
                            cashAmount:yuE,//使用余额
                            totalFreeze:totalFreeze//使用冻结金额
                        };


                    }else if(!buyCarIds[0]) {//点击立即购买进订单时

                        //油卡充值时
                        if($('.ykCardNum').is(':visible')){
                            ykInfoStr= '开户姓名'+$('#ykUserName').val()+',卡号:'+$('#ykNum').val();


                            if(!$('#ykUserName').val()){
                                layer.open({
                                    title: "提示",
                                    content: "请填写要充值的加油卡开户人姓名",
                                    icon: 1
                                });
                                return;

                            }
                            if(!$('#ykNum').val()){
                                layer.open({
                                    title: "提示",
                                    content: "请填写要充值的加油卡号",
                                    icon: 1
                                });
                                return;

                            }


                        }


                        var imgArrObj=$('.s-pic-img-new img');
                        var imgBaseArr=[];

                        if($('#uploadCard').is(':visible')){

                            ykInfoStr="姓名"+$('#ykName').val()+",手机号"+ $('#phonenum').val()+",身份证号码"+ $('#idCardNum').val();

                            //评论图片base64
                            for(var i=0;i<imgArrObj.length;i++){  //$('#imgRresult').children()[0].style.backgroundImage

                                //imgBaseArr.push(imgArrObj[i].style.backgroundImage);
                                imgBaseArr.push(imgArrObj[i].src);
                            }


                            if(!$('#ykName').val()){

                                layer.open({
                                    title: "提示",
                                    content: "请填写姓名。",
                                    icon: 1
                                });
                                layer.close(lay);
                                return;
                            }


                            if(!$('#phonenum').val()){


                                layer.open({
                                    title: "提示",
                                    content: "请填写手机号。",
                                    icon: 1
                                });
                                layer.close(lay);
                                return;
                            }
                            if(!$('#idCardNum').val()){


                                layer.open({
                                    title: "提示",
                                    content: "请填写身份证号码。",
                                    icon: 1
                                });
                                layer.close(lay);
                                return;
                            }


                            if(imgBaseArr.length<2){
                                layer.open({
                                    title: "提示",
                                    content: "请上传身份证正反面两张照片。",
                                    icon: 1
                                });
                                layer.close(lay);
                                return;
                            }

                        }

                         datainfo = {
                            productId:productId,//订单Id
                            buyCount:productNum,//数量
                            specId:specId,
                            remark:ykInfoStr,//备注信息
                            totalPrice:totalPrice,
                            addressId:addressId,//地址ID
                            wasteScore:jifen,//使用积分
                            cashAmount:yuE,//使用余额
                             totalFreeze:totalFreeze, //使用冻结金额
                             IDCard:imgBaseArr
                        };

                    }

                    var orderData;

                if(datainfo){
                    $post("/Tshop/order/createAndPay",datainfo).success(function(req){
                        layer.close(lay);

                        //处理提示信息
                        var attention='';
                        var redirectTo='m/';

                        if(req.msg=="钱包余额不够！"){
                            attention="去充值";
                            redirectTo="/m/paytwo";

                        }else if(req.msg=="请输入收货地址"){
                            attention="添加收货地址";
                            redirectTo="/m/setAddress";

                        }else {
                            attention='关闭';

                        }


                        if(req.code!="200"){

                            layer.open({
                                content: req.msg
                                ,btn: attention
                                ,yes:function(index,layero){
                                    location.href=redirectTo;

                                }
                            });

                          /*  layer.open({
                                content: req.msg
                                ,skin: 'msg'
                                ,time: 2 //2秒后自动关闭
                            });*/
                            return;
                        }
                        $('.payOrderTit').html('订单号'+req.data);
                        orderData = req.data;
                        $('.mack').css('display','block');
                        $('.popup_content').css('display','block');

                    }).error();



                }

                    //6位密碼輸入
                    var pwd;
                    var $input = $(".fake-box input");
                    $("#pwd-input").on("input", function() {
                        pwd = $(this).val().trim();
                        for (var i = 0, len = pwd.length; i < len; i++) {
                            $input.eq("" + i + "").val(pwd[i]);
                        }
                        $input.each(function() {
                            var index = $(this).index();
                            if (index >= len) {
                                $(this).val("");
                            }
                        });
                        if (len == 6) {
                            //执行其他操作
                        }
                    });
                    $(".pay_cancel_btn").on('click',function(){
                        $('.mack').hide();
                        $('.popup_content').hide();
                        $("#pwd-input").val("");
                        $(".fake-box input").val("");
                    });


                    $("#subpaypwd").off("click").on('click',function(){
                        var _this=$(this);
                        var lay = layer.open({ type: 2, shadeClose: false });
                        $post('/Tshop/order/payment',{orderId:orderData,payPassWord:pwd}).success(function(req){
                            layer.close(lay);
                            if(req.code!=200){
                                layer.open({
                                    content: req.msg
                                    ,time: 2
                                    ,skin: 'msg'
                                });
                               return;
                            }
                            localStorage.setItem("orderId",orderData);
                            location.href="/m/paysuccess";
                        })

                    })
                }




            }
            //支付成功
        },{
            key: "paysuccess",
            value: function paysuccess() {
                var orderData = localStorage.getItem("orderId");
                $("#lookOrder").html("<a href=\"/m/orderDetail?id="+orderData+"\"><div class=\"tr-btn\" style=\"margin:auto;\">查看订单</div></a>");


                function goodList(data,elem){
                    var datas = data;
                    var lis = '';

                    if (datas == null) {
                        lis += "<p style=\"line-height:40px;\">暂无数据</p>"
                    } else {
                        forOf(datas, function (v, i) {
                            lis += "<a href=\"/m/detailOnly?id=" + v.id + "\">" +
                                "<div class=\"like-item fl\">" +
                                "<div class=\"like-img\" style=\"background: url(" + v.picture + ");background-repeat: no-repeat;background-size: cover;\">" +
                                "</div>" +
                                "<div class=\"like-text\">" + v.name + "</div>" +
                                "<div class=\"like-price\">￥" + v.nowPrice + "<span style=\"float:right;color:#646464;font-size:12px;\">销量:" + v.sellcount + "</span></div>" +
                                "</div>" +
                                "</a> ";
                            if (i == 5) {
                                return false;
                            }
                        });
                    }
                    elem.append(lis);
                }

                $post('/Tshop/special/GuessLike').success(function(req){

                    goodList(req.data, $A("guessLike"));
                })

            }



            //购物车列表
        },{
            key: "buyCar",
            value: function buyCar() {
                var lay = layer.open({ type: 2, shadeClose: false });
                var buyCayHtml="";



                $post('/Tshop/cart/cartList').success(function(req){
                    layer.close(lay);

                    var datas;
                    if(req.data==null){
                        datas=null;
                        $('.goods_numberSum').html("(0)");
                    }else{
                        datas = req.data.buycarList;
                        $('.goods_numberSum').html("("+req.data.num+")");
                    }
                    var datainfo={
                        'buycarList':datas
                    };

                    function spec(res){

                        var specHtml="";
                        if(res==null){
                            specHtml="";
                        }else{
                            for(var j=0;j<res.length;j++){
                                specHtml+= "<span class=\"yanse\"  style='margin-right:10px;'>"+res[j].key+"："+res[j].value[0].name+"</span>";
                            }
                        }
                        return specHtml;
                    }

                    if(datas==null||datas==undefined){

                        buyCayHtml+="<h4 style=\"text-align:center;line-height:35px;margin-top:25px;\">" +
                            "您的购物车空空如也" +
                            "<a href=\"/m/appoint\" style=\"color:#ff2150;\">快去选购吧！</a>" +
                            "</h4>";
                    }else{
                        for(var i=0;i<datas.length;i++){
                            buyCayHtml+="<div class=\"xq-item\">"+
                                "<div class=\"xq-item-left\">"+
                                "<div class=\"ck-item\">"+
                                "<input type=\"checkbox\" value=\""+datas[i].id+"\" class=\"chk-item\" />"+
                                "</div>"+
                                "</div>"+

                                "<div class=\"xq-item-centent\">"+
                                "<a href=\"/m/detailOnly/?id="+datas[i].productId+"\">"+
                                "<div class=\"item-img\" style=\"background-image: url(/"+datas[i].productImg+");\"></div>"+
                                "</a>"+
                                "<div class=\"item-text\">"+
                                "<div class=\"sp-name\">"+datas[i].productName+"</div>"+
                                "<div class=\"sp-guige\">"+spec(datas[i].spec)+"</div>"+

                                "<div class=\"sp-price\">"+
                                " <input type=\"hidden\" class=\"commodityId\" value=\""+datas[i].productId+"\"/>"+

                                "<input type=\"hidden\" class=\"price\" value=\""+datas[i].price+"\"/>"+
                                " <input type=\"hidden\" value=\"\" class=\"sumnumber\" style=\"width: 30px;height: 20px;\"/>"+
                                " <input class=\"changeNumber jian\" type=\"button\" value=\"-\"/>"+
                                "<input class=\"zhong buyNumber\" value=\""+datas[i].productNum+"\" maxlength=\"3\" readOnly=\"true\" onkeyup=\"this.value=this.value.replace(/[^\d]/g,'') \" onafterpaste=\"this.value=this.value.replace(/[^\d]/g,'') \"/>"+
                                "<input class=\"changeNumber jia\" type=\"button\" value=\"+\"/>"+
                                "<p class=\"se-pink\" style=\"float:right\">￥<span class=\"shopCar_price\">"+datas[i].univalent+"</span>.00</p>"+
                                "</div>"+
                                "<div class=\"\">"+
                                "<p class=\"se-pink\" style=\"float:left\">￥<span class=\"sumMount\">"+datas[i].univalent*datas[i].productNum+"</span>.00</p>"+
                                "<a class=\"se-del shopCar_del\" style=\"float:right\" href=\"/buyCar/delete?id="+datas[i].productId+"\"></a>"+
                                "</div>"+
                                "</div>"+
                                "</div>"+
                                "</div>";
                        }
                    }
                    document.querySelector('#buyCarContent').innerHTML = buyCayHtml;



                    // var html = template('content-tpl', datainfo);
                    // document.querySelector('#buyCarContent').innerHTML = html;

                    $('.xq-container .ck-item').click(function(){
                        $(this).toggleClass('cur');
                    });
                    var dom,pri,num,index=0;
                    var lis = document.getElementsByClassName('chk-item');
                    for (var i = 0; i < lis.length; i++) {
                        lis[i].onclick = function () {
                            var a = $(this).find("input[class='chk-item']").is(':checked');
                            dom = $(this).parents('.xq-item-left').siblings('.xq-item-centent');
                            if(this.checked==true){

                                $(this).parent().addClass('cur');
                                pri = dom.find('.sumMount').html();
                                index++;
                                if (index == lis.length) {
                                    zong.checked = true;
                                    $(".chk-zong").addClass('bg');
                                }
                            }else {
                                $(this).parent().removeClass('cur');
                                if (index > 0) {
                                    pri = dom.find('.sumMount').html();

                                    index--;
                                    zong.checked = false;
                                    //$(".chk-zong").removeClass('bg');
                                    $(zong).parent().removeClass('bg');
                                }
                            }

                            zhongjia();
                            shu();
                            sheng();
                        };
                    }


                    $('.changeNumber').on('click',function(){
                        var commodityId =$(this).siblings('.commodityId').val();
                        var number = $(this).siblings('.buyNumber').val();
                        var price =$(this).siblings('p').children('.shopCar_price').html();
                        var dom = $(this);

                        if($(this).hasClass('jia')){
                            number++;
                        }else{
                            number--;
                            if(number<1){
                                number=1;
                            }
                        }

                        $post("/Tshop/cart/delete",{id:commodityId,buyCount:number}).success(function(){

                        }).error();

                        $(this).siblings('.buyNumber').val(number);
                        $(this).parents().siblings().children().children('.sumMount').html(number*price);
                        zhongjia();
                        shu();
                        sheng();
                    })
                    function zhongjia(){
                        var total_p=0;
                        var checkList=$(".xq-item-left");
                        checkList.each(function(i,elm){

                            if($(this).find(".chk-item").is(":checked")){

                                var price=$(this).next().find(".sumMount").text();
                                total_p+=parseFloat(price);

                            }
                        })
                        zongjia.textContent=total_p.toFixed(2);
                    }
                    //点击全选
                    $('.chk-zong').click(function(){
                        $(this).toggleClass('bg');

                        var zong = $(".chk-zong").find("input[id='zong']").is(':checked');
                        if(zong==true){
                            index=lis.length;
                            $(".ck-item").addClass("cur");
                            $(".chk-item").prop("checked", true);
                        }else{
                            index=0;
                            $(".ck-item").removeClass("cur");
                            $(".chk-item").prop("checked", false);
                        }
                        zhongjia();
                        shu();
                        sheng();
                    });

                    function shu(){
                        var total_n=0;
                        var checkList=$(".xq-item-left");
                        var jj = document.getElementById('jiesuan-a');
                        checkList.each(function(i,elm){
                            if($(this).find(".chk-item").is(":checked")){
                                var numbers=$(this).next().find(".zhong").val();
                                total_n+= parseInt(numbers);

                            }
                        })
                        jj.innerHTML = "去结算("+total_n+")";
                    }

                    function sheng(){
                        var total_s=0;
                        var checkList=$(".xq-item-left");
                        var sheng = document.getElementById('sheng');
                        checkList.each(function(i,elm){
                            if($(this).find(".chk-item").is(":checked")){
                                var price = $(this).next().find(".price").val();
                                var univalent = $(this).next().find(".shopCar_price").text();
                                var productNum=$(this).next().find(".buyNumber").val();

                                // console.log(price,univalent,productNum);

                                var number = (price-univalent)*productNum;
                                total_s+=parseInt(number);
                                // console.log(total_s);
                            }
                        })
                        sheng.innerHTML = "省:￥"+total_s;

                    }
                }).error();
                function backList(data, elem) {
                    var datas = data;
                    var lis = '';
                    // console.log(datas);

                    if(datas==null){
                        lis +="<p style=\"line-height:40px;\">暂无数据</p>"
                    }else{
                        forOf(datas, function (v, i) {
                            lis += "<a href=\"/m/detailOnly?id="+v.id+"\">" +
                                "<div class=\"like-item fl\">" +
                                "<div class=\"like-img\" style=\"background: url("+v.picture+");background-repeat: no-repeat;background-size: cover;\">" +
                                "</div>" +
                                "<div class=\"like-text\">"+v.name+"</div>" +
                                "<div class=\"like-price\">￥"+v.nowPrice+"<span style=\"float:right;color:#646464;font-size:12px;\">销量:"+v.sellcount+"</span></div>" +
                                "</div>" +
                                "</a> ";
                            if(i==5){
                                return false;
                            }
                        });
                    }

                    elem.append(lis);
                }
                //猜你喜欢
                $post('/Tshop/special/GuessLike').success(function(req){

                    backList(req.data, $A("guessLike"));
                });
                //最近浏览
                $post('/Tshop/product/historyProduct').success(function(req){

                    backList(req.data, $A("browse"));
                });
                //掌柜推荐
                $post('/Tshop/product/productMenu').success(function(req){

                    backList(req.data.productList, $A("recommend"));
                });



                //点击结算
                $('.jiesuan').on('click',function(){
                    var buyCarId=[];
                    var checkList=$(".xq-item-left");
                    checkList.each(function(i,elm){
                        if($(this).find(".chk-item").is(":checked")){
                            buyCarId.push($(this).find(".chk-item").val());
                        }
                    });
                    var totalPrice = ($("#zongjia").text()).toString();

                    if(buyCarId==null||buyCarId.length==0){
                        layer.open({
                            content: '你还没有选择商品'
                            ,skin: 'msg'
                            ,time: 2 //2秒后自动关闭
                        });
                        return;
                    }


                    $post('/Tshop/order/submitOrder',{buyCarIds:buyCarId,totalPrice:totalPrice}).success(function(req){

                        if(req.code==="201"){
                            layer.open({
                                content: '请登录后再操作!'
                                ,btn: ['去登录', '取消']
                                ,yes: function(index){
                                    location.href="/m/login?url=detailOnly?id="+urlId;
                                    layer.close(index);
                                }
                            });
                            return;
                        }else if(req.code==="203"){
                            layer.open({
                                content: req.msg
                                ,skin: 'msg'
                                ,time: 2 //2秒后自动关闭
                            });
                            return;
                        }
                        localStorage.setItem("url",'buyCar');
                        location.href='/m/pay';
                    })



                })
            }
        },{



            //    线下商铺
        },{
            key: "lineDown",
            value: function lineDown() {

                levent.goodType = function () {
                    var index =  $(this).index();
                    for(var i=0;i<$('.goods_type_list ul').length;i++){

                        if(index==i){
                            $('.goods_type_list ul').eq(i).slideToggle();
                        }else{
                            $('.goods_type_list ul').eq(i).css('display','none');
                        }
                    }
                }
                //分类
                function goods_type(req, elem){
                    var lis = '';
                    for(var i=0;i<req.length;i++){
                        lis+="<li><a href=\"\">"+req[i]+"</a></li>";
                    }
                    elem.append(lis);
                }
                var activity,area,loop;
                $post("/Tshop/lineStore/storeArea").success(function(req){
                    activity = req.data.activity;
                    goods_type(activity, $A("activity"));

                    area=req.data.area;
                    goods_type(area, $A("area"));

                    loop=req.data.loop;
                    goods_type(loop, $A("loop"));

                }).error();
                var lay = layer.open({ type: 2, shadeClose: false });

                function shopList(req, elem){
                    layer.close(lay);
                    var datas=req;
                    var lineDownList='';
                    for(var i=0;i<datas.length;i++){

                        lineDownList += "<a href=\"/m/detail?id="+datas[i].id+"\">" +
                            "<dl class=\"lineDown_goods_item\">" +
                            "<dt style=\"background-image: url(/"+datas[i].maxPicture+");\"></dt>" +
                            "<dd>" +
                            "<p>"+datas[i].storename+"</p>" +
                            "<p>地址："+datas[i].storeAddress+"</p>" +
                            "</dd>" +
                            "</dl>" +
                            "</a>"

                    }
                    elem.append(lineDownList);
                }
                //店铺列表
                $post("/Tshop/lineStore/StoreList").success(function(req){
                    var datas = req.data.list.slice(0,2);
                    shopList(datas, $A("StoreList"));
                }).error();
                //猜你喜欢
                $post("/Tshop/lineStore/guessYouLike").success(function(req){
                    var datas = req.data;
                    shopList(datas, $A("guessLikeShop"));
                }).error();
                //热门商铺
                $post("/Tshop/lineStore/StoreList").success(function(req){
                    var datas = req.data.list;
                    shopList(datas, $A("hotShop"));

                }).error();
                $(".page-content").append('<p style=\"color:#969696;font-size:12px;text-align:center;line-height:40px;\">已经到底了</p>');

            }
        },{
            key:"detail",
            value: function detail() {
                var url = window.location.search;
                var urlAux = url.split('=');
                var urlId = url.indexOf('=');
                urlId = url.substring(urlId+1,url.length);

                function sliderImg(image, elem){
                    var  data  = image;
                    var slider="";
                    for(var i=0;i<data.length;i++){
                        slider+="<div class=\"swiper-slide\" style=\"background-image:url(/"+data[i]+")\"></div>"
                    }
                    elem.append(slider);
                }

                var lay = layer.open({ type: 2, shadeClose: false });
                $post('/Tshop/lineStore/storeDetail',{id:urlId}).success(function(req){
                    layer.close(lay);
                    var storedetail  = req.data.storedetail;
                    var hotStore = req.data.hot;

                    $('.detail_footer').append("<a class=\"contactTel\" href=\"tel:"+storedetail.storeTel+"\">立即联系</a>")

                    var html = template('content-tpl', storedetail);
                    document.querySelector('#detailContent').innerHTML = html;

                    var images=[];

                    if(storedetail.images==null){
                        images.push(storedetail.maxPicture);
                    }else{
                        images=storedetail.images.split(",");
                    }

                    sliderImg(images, $A("galleryImage"));
                    var galleryTop = new Swiper('.gallery-top', {
                        spaceBetween: 0,
                        loop:true,
                        loopedSlides: 5,
                    });
                    var galleryThumbs = new Swiper('.gallery-thumbs', {
                        spaceBetween: 3,
                        slidesPerView: 4,
                        touchRatio: 0.2,
                        loop:true,
                        loopedSlides: 5, //looped slides should be the same
                        slideToClickedSlide: true
                    });
                    galleryTop.params.control = galleryThumbs;
                    galleryThumbs.params.control = galleryTop;
                    // 百度地图API功能
                    var map = new BMap.Map("allmap");
                    var point = new BMap.Point(storedetail.repairE,storedetail.repairN);
                    var marker = new BMap.Marker(point);  // 创建标注
                    map.addOverlay(marker);              // 将标注添加到地图中
                    map.centerAndZoom(point, 15);
                    var opts = {
                        width : 200,     // 信息窗口宽度
                        height: 100,     // 信息窗口高度
                        title : "布鲁斯国际新城" , // 信息窗口标题
                        enableMessage:true,//设置允许信息窗发送短息
                        message:"亲耐滴，晚上一起吃个饭吧？戳下面的链接看下地址喔~"
                    };
                    var infoWindow = new BMap.InfoWindow("地址：高新区滨河北路中段。（毗邻布鲁斯.国际新城3号）", opts);  // 创建信息窗口对象
                    marker.addEventListener("click", function(){
                        map.openInfoWindow(infoWindow,point); //开启信息窗口
                    });
                })
                //收藏店铺
                function collection(callback){
                    $('.collection').css('display','none');
                    $post('/Tshop/lineStore/collectStore',{lineStoreId:urlId}).success(function(req){
                        $('.collection').css('display','block');
                        return callback(req);
                    })
                }

                levent.collection = function () {
                    collection(function(result){
                        layer.open({
                            content: result.msg
                            ,skin: 'msg'
                            ,time: 2 //2秒后自动关闭
                        });
                    });
                }

            }
            //商品分类
        },{
            key:"sorts",
            value: function sorts() {

                var lay = layer.open({ type: 2, shadeClose: false });


                var ChildrenData;
                var Children;
                var index;
                $post('/Tshop/catalog/catalogs').success(function(req){
                    layer.close(lay);

                    var datas = {
                        'datainfo':req.data,
                    };
                    var html = template('content-tpl', datas);
                    document.querySelector('#category_tab').innerHTML = html;

                    $('.category_tab li').eq(0).attr('class','active');
                    index=0;
                    var newChildren = function(){
                        Children = req.data[index];

                        if(Children.children==null){
                            var childrenHtml = "<p style=\"text-align:center;line-height:40px;\">暂无数据！</p>";
                        }else{
                            var childrenHtml = template('children-tpl', Children);
                        }
                        document.getElementById('children_list').innerHTML = childrenHtml;

                    };
                    newChildren();

                    $('.category_tab li').on('click',function(){
                        index=$(this).index();
                        $(this).addClass('active').siblings().removeClass('active');
                        newChildren();
                    });

                })
            }
            //搜索
        },{
            key:"search",
            value: function search() {
                $("#submitSearch").on('click',function(){
                    var keyValue = $("#searchInp").val();
                    // if(keyValue){
                    //     keyValue="";
                    // }
                    location.href='/m/list?key='+keyValue;
                })
            }
            //商品列表
        },{
            key:"list",
            value: function list() {
                var url = window.location.search;
                var urlAux = url.split('=');
                var key = url.indexOf('=');
                key = url.substring(key+1,url.length);
                var offset=0,special="",lowPrice,topPrice,fee=0,stock=0,count=1,pageSize,pagerSize,attrID=[],catalog;

                key = decodeURIComponent(key);
                $('#keyVlue').html(key);



                var refresh = function(){
                    var dataInfo={
                        key:key,
                        offset:offset,
                        special:special,
                        lowPrice:lowPrice,
                        topPrice:topPrice,
                        fee:fee,
                        stock:stock,
                        attrID:attrID
                    };
                    var lay = layer.open({ type: 2, shadeClose: false });
                    $post('/Tshop/product/search',{
                        key:key,
                        offset:offset,
                        special:special,
                        lowPrice:lowPrice,
                        topPrice:topPrice,
                        fee:fee,
                        stock:stock,
                        attrID:attrID
                    }).success(function(req){

                        layer.close(lay);


                        var datas = req.data;
                        var catalogHtml="";

                        if(req.data.catalog==undefined){
                            catalog=null;
                        }else{
                            catalog = req.data.catalog.children[0].children;
                        }


                        var attribute = req.data.attribute;

                        var typeData={
                            'catalog':catalog,
                            'attribute':attribute
                        };

                        var typeHtml = template('dialogContent-tpl', typeData);
                        document.getElementById('dialogContent').innerHTML = typeHtml;

                        $(".list-dialog-type").click(function(){

                            $(this).siblings().removeClass('cur');
                            $(this).toggleClass("cur");
                        });

                        if(datas==null){
                            $('.search-one').css('display','block');
                            return;
                        }
                        datas = datas.product;

                        if(!jQuery.isArray(datas.list)){
                            $('.list_lading').removeClass('clickMore');


                            if(typeof (datas) =='string'){
                                $('.list_lading').html(datas);
                            }else {
                                $('.list_lading').html('没有更多数据了');
                            }

                            return;
                        }else{
                            $('.list_lading').addClass('clickMore');
                            $('.list_lading').html('点击加载更多');
                        }
                        pageSize = datas.pageSize;
                        pagerSize=datas.pagerSize;
                        if(datas.pagerSize==count){
                            // $('.list_lading').removeClass('clickMore');
                            $('.list_lading').html('没有更多数据了');
                        }else{
                            // $('.list_lading').addClass('clickMore');
                            $('.list_lading').html('点击加载更多');
                        }
                        $('.search-one').css('display','none');
                        var childrenHtml = template('content-tpl', datas);
                        document.getElementById('goodsList').innerHTML = childrenHtml;
                        $(".list-top").click(function(){
                            $("html,body").animate({scrollTop:0}, 500);
                        });
                        $(".list-saixuan").click(function(){
                            $('body').addClass('oh');
                            $(".bcar-del-bg").css('display','block');
                        });

                        $(".list-yincang").click(function(){
                            $(this).next(".yincang-ctrl").slideToggle();
                            $(this).toggleClass("cur");
                        });

                        $(".list-dialog-close").click(function(){
                            $('body').removeClass('oh');
                            $(".bcar-del-bg").css('display','none');
                        });

                    })
                }
                refresh();
                $('.list_lading').on('click',function(){
                    offset=pageSize*count;
                    count++;
                    if(count>pagerSize){
                        return;
                    }
                    $('.list_lading').html("加载中....");
                    refresh();
                });

                $('.list-dialog-btn').on('click',function(){

                    $('.list_lading').html("加载中....");
                    document.getElementById('goodsList').innerHTML="";
                    attrID=[];
                    $('body').removeClass('oh');
                    $(".bcar-del-bg").fadeToggle();
                    var dialog = $('.list-dialog-type');
                    dialog.each(function(i) {
                        if($(this).hasClass('cur')){
                            if(catalog!=null){
                                var jumpUrl = $(this).attr("data-text");
                                lowPrice=$('input[name=price-s]')[0].value;
                                topPrice=$('input[name=price-x]')[0].value;
                                key=jumpUrl;
                                refresh();
                                return;
                            }

                            var typeId = $(this).attr('id');
                            attrID.push(typeId);
                        }
                    })
                    lowPrice=$('input[name=price-s]')[0].value;
                    topPrice=$('input[name=price-x]')[0].value;

                    refresh();
                })



                $(".ent-li").on('click',function(){
                    document.getElementById('goodsList').innerHTML="";
                    var index = $(this).index();
                    $(this).addClass('active').siblings().removeClass('active');

                    if(index==0){
                        special="";
                    }else if(index==1){
                        special="sellcount";
                    }else if(index==2){
                        special="newset";
                    }else if(index==3){
                        special="comment";
                    }
                    refresh();
                })
                function backList(data, elem) {
                    var datas = data;
                    var lis = '';

                    if(datas==null){
                        lis +="<p style=\"line-height:40px;\">暂无数据</p>"
                    }else{
                        forOf(datas, function (v, i) {
                            lis += "<a href=\"/m/detailOnly?id="+v.id+"\">" +
                                "<div class=\"like-item fl\">" +
                                "<div class=\"like-img\" style=\"background: url("+v.picture+");background-repeat: no-repeat;background-size: cover;\">" +
                                "</div>" +
                                "<div class=\"like-text\">"+v.name+"</div>" +
                                "<div class=\"like-price\">￥"+v.nowPrice+"<span style=\"float:right;color:#646464;font-size:12px;\">销量:"+v.sellcount+"</span></div>" +
                                "</div>" +
                                "</a> ";
                            if(i==5){
                                return false;
                            }
                        });
                    }

                    elem.append(lis);
                }
                $post('/Tshop/product/hot').success(function(req){
                    backList(req.data.list, $A("hotGoods"));
                })
            }

           /* key:"list",
            value: function list() {
                var url = window.location.search;
                var urlAux = url.split('=');
                var key = url.indexOf('=');
                key = url.substring(key+1,url.length);
                var offset=0,special="",lowPrice,topPrice,fee=0,stock=0,count=1,pageSize,pagerSize,attrID=[],catalog;

                key = decodeURIComponent(key);
                $('#keyVlue').html(key);



                var refresh = function(){
                    var dataInfo={
                        key:key,
                        offset:offset,
                        special:special,
                        lowPrice:lowPrice,
                        topPrice:topPrice,
                        fee:fee,
                        stock:stock,
                        attrID:attrID
                    }
                    console.log(dataInfo);
                    var lay = layer.open({ type: 2, shadeClose: false });
                    $post('/Tshop/product/search',{
                        key:key,
                        offset:offset,
                        special:special,
                        lowPrice:lowPrice,
                        topPrice:topPrice,
                        fee:fee,
                        stock:stock,
                        attrID:attrID
                    }).success(function(req){
                        debugger;
                        layer.close(lay);
                        console.log(req);


                        var datas = req.data;
                        var catalogHtml="";

                        console.log();
                        if(req.data.catalog==undefined){
                            catalog=null;
                        }else{
                            catalog = req.data.catalog.children[0].children;
                        }


                        var attribute = req.data.attribute;

                        var typeData={
                            'catalog':catalog,
                            'attribute':attribute
                        }

                        var typeHtml = template('dialogContent-tpl', typeData);
                        document.getElementById('dialogContent').innerHTML = typeHtml;

                        $(".list-dialog-type").click(function(){

                            $(this).siblings().removeClass('cur');
                            $(this).toggleClass("cur");
                        });

                        if(datas==null){
                            $('.search-one').css('display','block');
                            return;
                        }
                        datas = datas.product;

                        if(datas==null){
                            $('.list_lading').removeClass('clickMore');
                            $('.list_lading').html('没有更多数据了');
                            return;
                        }else{
                            $('.list_lading').addClass('clickMore');
                            $('.list_lading').html('点击加载更多');
                        }
                        pageSize = datas.pageSize;
                        pagerSize=datas.pagerSize;
                        if(datas.pagerSize==count){
                            // $('.list_lading').removeClass('clickMore');
                            $('.list_lading').html('没有更多数据了');
                        }else{
                            // $('.list_lading').addClass('clickMore');
                            $('.list_lading').html('点击加载更多');
                        }
                        $('.search-one').css('display','none');
                        var childrenHtml = template('content-tpl', datas);
                        document.getElementById('goodsList').innerHTML = childrenHtml;
                        $(".list-top").click(function(){
                            $("html,body").animate({scrollTop:0}, 500);
                        });
                        $(".list-saixuan").click(function(){
                            $('body').addClass('oh');
                            $(".bcar-del-bg").css('display','block');
                        });

                        $(".list-yincang").click(function(){
                            $(this).next(".yincang-ctrl").slideToggle();
                            $(this).toggleClass("cur");
                        });

                        $(".list-dialog-close").click(function(){
                            $('body').removeClass('oh');
                            $(".bcar-del-bg").css('display','none');
                        });

                    })
                }
                refresh();
                $('.list_lading').on('click',function(){
                    offset=pageSize*count;
                    count++;
                    if(count>pagerSize){
                        return;
                    }
                    $('.list_lading').html("加载中....");
                    refresh();
                });

                $('.list-dialog-btn').on('click',function(){

                    $('.list_lading').html("加载中....");
                    document.getElementById('goodsList').innerHTML="";
                    attrID=[];
                    $('body').removeClass('oh');
                    $(".bcar-del-bg").fadeToggle();
                    var dialog = $('.list-dialog-type');
                    dialog.each(function(i) {
                        if($(this).hasClass('cur')){
                            if(catalog!=null){
                                var jumpUrl = $(this).attr("data-text");
                                console.log(jumpUrl);
                                lowPrice=$('input[name=price-s]')[0].value;
                                topPrice=$('input[name=price-x]')[0].value;
                                key=jumpUrl;
                                refresh();
                                return;
                            }

                            console.log("不能");
                            var typeId = $(this).attr('id');
                            attrID.push(typeId);
                        }
                    })
                    lowPrice=$('input[name=price-s]')[0].value;
                    topPrice=$('input[name=price-x]')[0].value;

                    refresh();
                })



                $(".ent-li").on('click',function(){
                    document.getElementById('goodsList').innerHTML="";
                    var index = $(this).index();
                    $(this).addClass('active').siblings().removeClass('active');
                    console.log(index);
                    if(index==0){
                        special="";
                    }else if(index==1){
                        special="sellcount";
                    }else if(index==2){
                        special="newset";
                    }else if(index==3){
                        special="comment";
                    }
                    refresh();
                })
                function backList(data, elem) {
                    var datas = data;
                    var lis = '';

                    if(datas==null){
                        lis +="<p style=\"line-height:40px;\">暂无数据</p>"
                    }else{
                        forOf(datas, function (v, i) {
                            lis += "<a href=\"/m/detailOnly?id="+v.id+"\">" +
                                "<div class=\"like-item fl\">" +
                                "<div class=\"like-img\" style=\"background: url("+v.picture+");background-repeat: no-repeat;background-size: cover;\">" +
                                "</div>" +
                                "<div class=\"like-text\">"+v.name+"</div>" +
                                "<div class=\"like-price\">￥"+v.nowPrice+"<span style=\"float:right;color:#646464;font-size:12px;\">销量:"+v.sellcount+"</span></div>" +
                                "</div>" +
                                "</a> ";
                            if(i==5){
                                return false;
                            }
                        });
                    }

                    elem.append(lis);
                }
                $post('/Tshop/product/hot').success(function(req){
                    backList(req.data.list, $A("hotGoods"));
                })
            }*/


        },{
            key:"appoint",
            value: function appoint() {
                $('.page-container').css('visibility','hidden');
                $('.list-top').on('click',function(){
                    $("html,body").animate({scrollTop:0}, 500);
                });
                var swiperHtml="";
                $post('/Tshop/showmessage/seckill').success(function(req){
                    var datas = req.data;

                    if(datas.length<2){
                        $('.swiper-pagination').css('display','none');
                    }
                    for(var i=0;i<datas.length;i++){
                        swiperHtml+="<div class=\"swiper-slide\" style=\"background-image: url(/"+datas[i].img+");\">" +
                            "<a href=\""+datas[i].url+"\" style='display: block;height:100%;width:100%;'></a>"+
                            "</div>";
                    }
                    $(".swiper-wrapper").html(swiperHtml);
                    new Swiper('.swiper-container', {
                        pagination: '.swiper-pagination',
                        paginationClickable: true,
                        spaceBetween: 30
                    });

                });


                var offset=0,count=1,pageSize,pagerSize;
                var refresh = function(){
                    var lay = layer.open({ type: 2, shadeClose: false });
                    $post('/Tshop/special/specialList',{offset:offset}).success(function(req){
                        layer.close(lay);
                        $('.page-container').css('visibility','visible');
                        var datas = req.data;
                        pageSize = datas.pageSize;
                        pagerSize = datas.pagerSize;


                        if(count==datas.pagerSize){
                            $('.loading').html('没有更多数据了');

                        }else{
                            $('.loading').html('点击加载更多');

                        }

                        var datainfo = {
                            'list':datas.list
                        };
                        var html = template('content-tpl', datainfo);
                        document.getElementById('appoint_list').innerHTML += html;



                    }).error()
                };
                refresh();

                $('.loading').on('click',function(){
                    offset=pageSize*count;
                    count++;
                    if(count>pageSize){
                        return;
                    }
                    $('.loading').html("加载中....");
                    refresh();
                });



                function goodList(data,elem){
                    var datas = data;
                    var lis = '';

                    if (datas == null) {
                        lis += "<p style=\"line-height:40px;\">暂无数据</p>"
                    } else {
                        forOf(datas, function (v, i) {
                            lis += "<a href=\"/m/detailOnly?id=" + v.id + "\" >" +
                                "<div class=\"like-item fl\">" +
                                "<div class=\"like-img\" style=\"background: url(" +"/"+ v.picture + ");background-repeat: no-repeat;background-size: cover;\">" +
                                "</div>" +
                                "<div class=\"like-text\">" + v.name + "</div>" +
                                "<div class=\"like-price\">￥" + v.nowPrice + "<span style=\"float:right;color:#646464;font-size:12px;\">销量:" + v.sellcount + "</span></div>" +
                                "</div>" +
                                "</a> ";
                            if (i == 5) {
                                return false;
                            }
                        });
                    }
                    elem.append(lis);
                }
                // 猜喜欢
                $post('/Tshop/special/GuessLike').success(function(req){

                    goodList(req.data, $A("like"));
                })
                // 最近浏览
                $post('/Tshop/product/historyProduct').success(function(req){
                    goodList(req.data, $A("browse"));
                })
            }

        },{
            //个人中心
            key:"personalCenter",
            value: function personalCenter() {

                $post('/Tshop/order/OrderRecord').success(function(req){
                    function setOrderNumber(val,elem){

                        if(val>0 && val<100){
                            $("#"+elem).css('display','block');
                            return val;
                        }else if(val>99){
                            $("#"+elem).css('display','block');
                            return "99+";
                        }else if(val==0){
                            $("#"+elem).css('display','none');
                        }
                    }

                    $("#totalOrder").html(setOrderNumber(req.data.totalOrder,"totalOrder"));
                    $("#orderWaitPayCount").html(setOrderNumber(req.data.orderWaitPayCount,"orderWaitPayCount"));
                    $("#orderSignCount").html(setOrderNumber(req.data.orderSignCount,"orderSignCount"));
                    $("#orderNoCommentCount").html(setOrderNumber(req.data.orderNoCommentCount,"orderNoCommentCount"));



                });

                getUserInfo(function(result){
                    var datas = result.data;

                    var rank = datas.rank,vipGrade;

                    switch (datas.rank){
                        case 'R1':
                            datas.rank='V0';
                            break;
                        case 'R2':
                            datas.rank='V1';
                            break;
                        case 'R3':
                            datas.rank='V2';
                            break;
                        case 'R4':
                            datas.rank='初级市场代理';
                            break;
                        case 'R5':
                            datas.rank='高级市场代理';
                            break;

                        default:

                            break;
                    }


                    $('.user-name').html(datas.nickname);
                    $('#userGrade').html(datas.rank);
                    $('#userPhone').text(datas.tel);
                    localStorage.setItem("cashAmount",datas.cashAmount);

                    localStorage.setItem("userId",datas.id);
                })


                $("#copyUrl").on('click',function(){

                    //生成分享二维码图片


                    //var url ="http://47.92.97.86:8080/Tshop/account/cs?link="+ExtensionUrl;
                    var url ="http://47.92.93.90:8080/Tshop/account/cs?link="+ExtensionUrl; //正式服地址


                    layer.open({
                        content:'<img src="'+url+'">'
                        ,btn: '转发二维码'
                    });


                })



            }
            //我的钱包
        },{
            key:"myWallet",
            value:function myWallet(){
                var cashAmount = localStorage.getItem("cashAmount");
                $('.wallet-fee').html(cashAmount+"元");
            }
            //现金余额
        },{
            key:"balance",
            value:function balance(){
                var userId = localStorage.getItem("userId");
                var lay = layer.open({ type: 2, shadeClose: false });
                $post('/Tshop/account/cashAmount',{offset: 0,type:0}).success(function(req){
                    layer.close(lay);

                    var datas = req.data;
                    var totalCash = parseFloat(datas.totalFee)+parseFloat(datas.total);

                    $('.frozen').html(Number(datas.totalFee).toFixed(2));//冻结资金

                    $('.balanceNumber').html(Number(datas.total).toFixed(2));//可用资金

                    $('.profit').html(Number(datas.totalIncomeCash).toFixed(2));//累计收益
                    $('.consumption').html(Number(datas.totalAmount).toFixed(2));//累计消费
                    $('.totalCash').html(Number(totalCash).toFixed(2));//现金余额
                });


                //余额明细
                var offsetNo=0,pageSize=5,count=1,type=0;
                var tdlist="";
                var lay = layer.open({ type: 2, shadeClose: false });
                var refresh = function(){
                    //loading层
                    layer.open({type: 2});
                    $post('/Tshop/account/cashAmount',{
                        offset: offsetNo,
                        type:type
                    }).success(function(req){

                        $('.cashdeal-detail-table thead').html("<tr><th>日期</th><th>收入/支出</th><th>交易对象</th><th>详细说明</th></tr>");
                        layer.close(lay);
                        var datas = req.data.Detaileds;

                        if(!datas.length){
                            $(".page_loading").html("暂无数据！");
                            layer.closeAll();
                            return;
                        }
                        if(offsetNo/5+1< Math.ceil(req.data.totalPageCount/5)){
                            $(".page_loading").html("点击加载更多");

                        }else if(offsetNo/5+1== Math.ceil(req.data.totalPageCount/5)){
                            $(".page_loading").html("没有更多数据了!");
                        }


                        for(var i=0;i<datas.length;i++){
                            var icons=datas[i].status ? "+" + dealNum(datas[i].money) : "-" + dealNum(datas[i].money);
                            tdlist += "<tr>" +
                                "<td>"+datas[i].date+"</td>" +
                                "<td>"+icons+"</td>" +
                                "<td>"+datas[i].person+"</td>" +
                                "<td>"+datas[i].remark+"</td>" +
                                "</tr>";
                        }

                        // var dealObj=t.account;
                        document.querySelector('.cashdeal-detail-table tbody').innerHTML = tdlist;
                        layer.closeAll();
                    })
                };
                refresh();


                var PageCount ,dataPage;
                //增值券卖出明细
                var sellRefresh= function (cpage) {
                    $post('https://www.egomalls.cn/user/sellDetail',{userId:userId,pageNo:cpage,pageSize:5}).success(function (req) {

                        $('.cashdeal-detail-table thead').html("<tr><th>时间</th><th>卖出增值券份数</th><th>卖出单价</th><th>实得金额</th></tr>");
                        var  sellPages = req.data.sells;
                        PageCount = req.data.page.pageNo;

                        if(!sellPages.length){
                            $(".page_loading").html("暂无数据！");
                            return;
                        }
                        if(PageCount<req.data.page.totalPage){
                            $(".page_loading").html("点击加载更多");
                            dataPage = Math.ceil(PageCount/sellPages.length);

                        }else if(PageCount==req.data.page.totalPage){
                            $(".page_loading").html("没有更多数据了");
                        }

                        /*  if(count==dataPage){
                         $(".page_loading").html("没有更多数据了");
                         }*/

                        for(var i=0;i<sellPages.length;i++){
                            tdlist += "<tr>" +
                                "<td>"+sellPages[i].time+"</td>" +
                                "<td>"+dealNum(sellPages[i].eFundNum)+"</td>" +
                                "<td>"+dealNum(sellPages[i].unitValue)+"</td>" +
                                "<td>"+dealNum(sellPages[i].value)+"</td>" +
                                "</tr>";

                            // "<td>"+sellPages[i].creatTime+"</td>" +
                            // "<td>"+sellPages[i].denomination+"</td>" +
                            // "<td>"+sellPages[i].trueAmount+"</td>" +
                            // "<td>"+sellPages[i].allIncome+"</td>" +
                            // "<td>"+sellPages[i].accountTel+"</td>" +
                            // "</tr>";
                        }
                        document.querySelector('.cashdeal-detail-table tbody').innerHTML = tdlist;
                    })
                };



                $('.page_loading').on('click',function(){
                    debugger;

                    if($('.page_loading').html()=="暂无数据！"||$('.page_loading').html()=="没有更多数据了!"){
                        return;
                    }

                    offsetNo=pageSize*count;
                    count++;
                    $('.page_loading').html("加载中...");



                    var titleObj= $('.deal_detail_title ul li');

                    if(titleObj[7].className=='active'){

                        sellRefresh(count);//加载增值券卖出明细数据

                    }else{
                        refresh();
                    }

                });



                $('.deal_detail_title li').on('click',function(){


                    count=1;
                    offsetNo=0;
                    $(this).addClass('active').siblings().removeClass('active');
                    type=$(this).attr('data-type');
                    tdlist="";
                    document.querySelector('.cashdeal-detail-table tbody').innerHTML = "";
                    if(type=='7'){

                        sellRefresh(1);//加载增值券卖出明细数据

                    }else{

                        refresh();//加载数据
                    }








                });


            }
            //充值
        },{
            key:"paytwo",
            value:function paytwo(){

                var rechargeInp = document.getElementById("rechargeInp");
                $("#rechargeInp").on('input propertychange',function(){

                    if(rechargeInp.value.length>=1){
                        $("#nextStep").attr('disabled',false);
                    }else{
                        $("#nextStep").attr('disabled',true);
                    }
                })
                $('#nextStep').on('click',function(){
                    // $('.mack').css('display','block');
                    // $('.popup_content').css('display','block');
                    var pattern1=/^[1-9]\d{0,10}$/;
                    if(pattern1.test(rechargeInp.value)){
                        location.href="/alipay?money="+rechargeInp.value+"&type=1231";
                    }else{
                        layer.open({
                            title: "提示",
                            content: "输入充值数字金额,不能为负数，不能超过10亿，且至少充值1元！"
                        });
                    }
                })

            }

            //提现
        },{
            key:"withdrawals",
            value:function withdrawals(){
                var withdrawalsMoney = document.getElementById("withdrawalsMoney");
                var  actualMoney = document.getElementById("actualMoney");
                $(".pay_two_input input").on('input propertychange',function(){
                    $("#actualMoney").val(withdrawalsMoney.value*0.9);
                    if(withdrawalsMoney.value.length==0){
                        $("#nextStep").attr('disabled',true);
                        return;
                    }else{
                        $("#nextStep").attr('disabled',false);
                    }

                });
                var withdrawalsMoneyVlue,actualMoneyVlue,withdrawalsWay,alipayNum=false,bankNo=false,wireTel=false;
                $('#nextStep').on('click',function(){
                    withdrawalsMoneyVlue = withdrawalsMoney.value;
                    actualMoneyVlue = actualMoney.value;

                    withdrawalsWay = $("#withdrawalsWay").val();

                    if(withdrawalsWay=="alipayNum"){
                        alipayNum=true;
                        bankNo=false,
                            wireTel=false;
                    }else if(withdrawalsWay=="bankNo"){
                        bankNo=true;
                        alipayNum=false;
                        wireTel=false;
                    }else if(withdrawalsWay=="wireTel"){
                        alipayNum=false;
                        bankNo=false;
                        wireTel=true;
                    }

                    if(withdrawalsMoneyVlue<100){
                        layer.open({
                            content: '最小提现金额为100元'
                            ,skin: 'msg'
                            ,time: 2 //2秒后自动关闭
                        });
                        return;
                    }

                    $('.mack').css('display','block');
                    $('.popup_content').css('display','block');
                });
                //6位密碼輸入
                var pwd;
                var $input = $(".fake-box input");
                $("#pwd-input").on("input", function() {
                    pwd = $(this).val().trim();
                    for (var i = 0, len = pwd.length; i < len; i++) {
                        $input.eq("" + i + "").val(pwd[i]);
                    }
                    $input.each(function() {
                        var index = $(this).index();
                        if (index >= len) {
                            $(this).val("");
                        }
                    });
                    if (len == 6) {
                        //执行其他操作
                        $('#subpaypwd').attr('disabled',false);
                    }else{
                        $('#subpaypwd').attr('disabled',true);
                    }
                });
                $(".pay_cancel_btn").on('click',function(){
                    $('.mack').hide();
                    $('.popup_content').hide();
                    $("#pwd-input").val("");
                    $(".fake-box input").val("");
                    $('#subpaypwd').attr('disabled',true);
                })
                $('#subpaypwd').on('click',function(){
                    $('.mack').hide();
                    $('.popup_content').hide();
                    $("#pwd-input").val("");
                    $(".fake-box input").val("");
                    $('#subpaypwd').attr('disabled',true);
                    var lay = layer.open({ type: 2, shadeClose: false });
                    $post('/Tshop/account/withDraw',{
                        num: withdrawalsMoneyVlue,
                        amount: actualMoneyVlue,
                        payPassword: pwd,
                        alipayNum:alipayNum ,
                        bankNo:bankNo,
                        wireTel:wireTel
                    }).success(function(req){
                        layer.close(lay);
                        if(req.code!=200){
                            layer.open({
                                title:"",
                                content: req.msg,
                                btn: "确认"
                            });
                            return;
                        }
                        layer.open({
                            content: req.msg,
                            btn: '确定',
                            shadeClose: false,
                            yes: function(){
                                location.href="/m/balance"
                            }
                        });
                    })
                })



            }

            //转账
        },{
            key:"transfer",
            value:function transfer(){
                var transferMoney = document.getElementById("transferMoney");
                var transferAccount = document.getElementById("transferAccount");
                $(".pay_two_input input").on('input propertychange',function(){

                    if(transferMoney.value.length==0&&transferAccount.value.length==0){
                        $("#nextStep").attr('disabled',true);
                        return;
                    }else if(transferMoney.value.length!=0&&transferAccount.value.length!=0){
                        $("#nextStep").attr('disabled',false);
                    }

                })
                $("#nextStep").on('click',function(){
                    $('.mack').css('display','block');
                    $('.popup_content').css('display','block');
                })
                //6位密碼輸入
                var pwd;
                var $input = $(".fake-box input");
                $("#pwd-input").on("input", function() {
                    pwd = $(this).val().trim();
                    for (var i = 0, len = pwd.length; i < len; i++) {
                        $input.eq("" + i + "").val(pwd[i]);
                    }
                    $input.each(function() {
                        var index = $(this).index();
                        if (index >= len) {
                            $(this).val("");
                        }
                    });
                    if (len == 6) {
                        //执行其他操作
                        $('#subpaypwd').attr('disabled',false);
                    }else{
                        $('#subpaypwd').attr('disabled',true);
                    }
                });
                $(".pay_cancel_btn").on('click',function(){
                    $('.mack').hide();
                    $('.popup_content').hide();
                    $("#pwd-input").val("");
                    $(".fake-box input").val("");
                    $('#subpaypwd').attr('disabled',true);
                })
                $('#subpaypwd').on('click',function(){
                    $('.mack').hide();
                    $('.popup_content').hide();
                    $("#pwd-input").val("");
                    $(".fake-box input").val("");
                    $('#subpaypwd').attr('disabled',true);
                    var lay = layer.open({ type: 2, shadeClose: false });
                    $post('/Tshop/account/moneyToMoney',{
                        money: transferMoney.value,
                        account:transferAccount.value,
                        payPsw: pwd
                    }).success(function(req){
                        layer.close(lay);
                        if(req.code!=200){
                            layer.open({
                                title:"",
                                content: req.msg,
                                btn: "确认"
                            });
                            return;
                        }
                        layer.open({
                            content: req.msg,
                            btn: '确定',
                            shadeClose: false,
                            yes: function(){
                                location.href="/m/balance"
                            }
                        });
                    })
                })

            }
            //e点
        },{
            key:"epoint",
            value:function epoint(){
                var offsetNo=0,type="",pageSize=5,count=1,pageNumber;
                var lay = layer.open({ type: 2, shadeClose: false });
                var  epointHtml="";
                var resultTime;
                function setTime(time){
                    var date = new Date(time);
                    var Y = date.getFullYear() + '/';
                    var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '/';
                    var D = date.getDate() + ' ';
                    var h = date.getHours() + ':';
                    var m = date.getMinutes() + ':';
                    var s = date.getSeconds();
                    resultTime=Y+M+D+h+m+s ;
                    return resultTime;
                }
                var incomeNumber;
                function income(inOrOut,ePoint){
                    if(inOrOut=='y'){
                        return incomeNumber=inOrOut,"+"+dealNum(ePoint);
                    }else{
                        return incomeNumber=inOrOut,"-"+dealNum(ePoint);
                    }
                }

                var refresh=function(){
                    //loading层
                    layer.open({type: 2});
                    $post('/Tshop/account/ePointOther',{
                        offset: offsetNo,
                        type: type
                    }).success(function(req){
                        layer.close(lay);
                        var  datas = req.data;
                        pageNumber = Math.ceil(datas.totalPageNo/pageSize);
                        $('.pointsNumber').html(dealNum(datas.ePoint));
                        var getePointHtml;
                        if(datas.ePoints.length<pageSize || pageNumber==count){
                            layer.closeAll();
                            $(".page_loading").html("没有更多数据了");
                        }else{
                            $(".page_loading").html("点击查看更多");
                        }

                        for(var i=0;i<datas.ePoints.length;i++){
                            if(datas.ePoints[i].inOrOut=="y"){
                                getePointHtml="<span style=\"color:#71c37d\">"+income(datas.ePoints[i].inOrOut,datas.ePoints[i].ePoint)+"</span>"
                            }else{
                                getePointHtml="<span style=\"color:red\">"+income(datas.ePoints[i].inOrOut,datas.ePoints[i].ePoint)+"</span>"
                            }
                            epointHtml  +=  "<li>" +
                                "<div class=\"deal-e-content\">" +
                                "<div class=\"e-mid\">" +
                                "<div class=\"e-title\">"+datas.ePoints[i].detail+"</div>" +
                                "<div class=\"e-points\">"+getePointHtml+"</div>" +
                                "</div>" +
                                "<div class=\"\" style=\"float:right;margin-top:36px;\">" +
                                "<div class=\"e-date\" style=\"color:#969696;font-size:12px;\">"+setTime(datas.ePoints[i].creatTime)+"</div>"+
                                "</div>" +
                                "</div>" +
                                "</li>"
                        }
                        document.querySelector('.epoint_info').innerHTML = epointHtml;

                        layer.closeAll();

                    })
                };
                refresh();
                $('.page_loading').on('click',function(){
                    offsetNo=pageSize*count;
                    count++;
                    if(count>pageNumber){
                        return;
                    }
                    $('.page_loading').html("加载中...");
                    refresh();
                });
                $(".epoint_tab_tit").on('click',function(){
                    $(this).addClass('active').siblings().removeClass('active');
                    type=$(this).attr("data-type");
                    epointHtml="";
                    document.querySelector('.epoint_info').innerHTML="";
                    refresh();
                })
            }

        },{
            //增值券
            key:"efund",
            value:function efund(){
                var pageNo=1,type=0,count=1,dataPage,PageCount;

                var userId=localStorage.getItem('userId');
                var buyDataPage,sellDataPage;

                var lay = layer.open({ type: 2, shadeClose: false });
                function dealNum(num) {
                    num=num+'';
                    if(num.indexOf('.')<0){//没有小数点
                        num=num+'.00';
                    }else if(num.substring(num.indexOf('.')).length>=3){ //小数点后超过两位
                        num=num.substring(0,num.indexOf('.')+3);
                    }else if(num.substring(num.indexOf('.')).length==2) {//小数点后只有一位
                        num=num+'0';
                    }
                    return  num;
                }
                var tdlist="";
                var refresh = function(cpage){
                    //loading层
                    layer.open({type: 2});
                    $post('https://www.egomalls.cn/user/getBasePram',{userId:userId}).success(function(req){
                        layer.close(lay);
                        $(".mySelfFund").html(req.data.myEFundNum); //我的增值券总量
                        $(".buyRecod").html(req.data.buyEFundNum); //累计买入量
                        $(".totalEpoint").html(dealNum(req.data.buyMoney));//累计买入金额
                        $(".sellRecod").html(req.data.sellEFundNum); //累计卖出量
                        $(".sellAmount").html(dealNum(req.data.sellMoney)); //累计卖出金额

                    });


                    //买入基金明细
                    $post('https://www.egomalls.cn/user/buyDetail',{userId:userId,pageNo:cpage,pageSize:5}).success(function (req){

                        $('.cashdeal-detail-table thead').html("<tr><th>日期</th><th>成功买入的增值券数量</th><th>花费e点数</th></tr>");

                        var  buyPages = req.data.buys;
                        PageCount = req.data.page.pageNo;
                        if(!buyPages.length){
                            $(".page_loading").html("暂无数据！");
                            layer.closeAll();
                            return;
                        }
                        if(PageCount<req.data.page.totalPage){
                            $(".page_loading").html("点击加载更多");
                            dataPage = Math.ceil(PageCount/buyPages.length);

                        }else if(PageCount==req.data.page.totalPage){
                            $(".page_loading").html("没有更多数据了");
                        }

                        /*if(count==dataPage){
                            $(".page_loading").html("没有更多数据了");
                        }*/

                        for(var i=0;i<buyPages.length;i++){
                            tdlist += "<tr>" +
                                "<td>"+buyPages[i].time+"</td>" +
                                "<td>"+buyPages[i].eFundNum+"</td>" +
                                "<td>"+dealNum(buyPages[i].ePoint)+"</td>" +
                                "</tr>";
                        }


                        document.querySelector('.cashdeal-detail-table tbody').innerHTML = tdlist;
                        layer.closeAll();
                    })

                };
                refresh(1);//默认显示买入明细



                //卖出增值券明细
                var sellRefresh= function (cpage) {
                    //loading层
                    layer.open({type: 2});
                    $post('https://www.egomalls.cn/user/sellDetail',{userId:userId,pageNo:cpage,pageSize:5}).success(function (req) {

                        $('.cashdeal-detail-table thead').html("<tr><th>时间</th><th>卖出增值券份数</th><th>卖出单价</th><th>实得金额</th></tr>");
                        var  sellPages = req.data.sells;
                        PageCount = req.data.page.pageNo;

                        if(!sellPages.length){
                            $(".page_loading").html("暂无数据！");
                            layer.closeAll();
                            return;
                        }
                        if(PageCount<req.data.page.totalPage){
                            $(".page_loading").html("点击加载更多");
                            dataPage = Math.ceil(PageCount/sellPages.length);

                        }else if(PageCount==req.data.page.totalPage){
                            $(".page_loading").html("没有更多数据了");
                        }

                      /*  if(count==dataPage){
                            $(".page_loading").html("没有更多数据了");
                        }*/

                        for(var i=0;i<sellPages.length;i++){
                            tdlist += "<tr>" +
                                "<td>"+sellPages[i].time+"</td>" +
                                "<td>"+sellPages[i].eFundNum+"</td>" +
                                "<td>"+dealNum(sellPages[i].unitValue)+"</td>" +
                                "<td>"+dealNum(sellPages[i].value)+"</td>" +
                                "</tr>";

                            // "<td>"+sellPages[i].creatTime+"</td>" +
                            // "<td>"+sellPages[i].denomination+"</td>" +
                            // "<td>"+sellPages[i].trueAmount+"</td>" +
                            // "<td>"+sellPages[i].allIncome+"</td>" +
                            // "<td>"+sellPages[i].accountTel+"</td>" +
                            // "</tr>";
                        }
                        document.querySelector('.cashdeal-detail-table tbody').innerHTML = tdlist;
                        layer.closeAll();
                    })
                };
                //sellRefresh(1);


                //下轮出售订单明细
                var nextsellRefresh= function (cpage) {
                    //loading层
                    layer.open({type: 2});
                    $post('https://www.egomalls.cn/user/nextSell',{userId:userId,pageNo:cpage,pageSize:5}).success(function (req) {

                        $('.cashdeal-detail-table thead').html("<tr><th>开始时间</th><th>单价</th><th>卖出数量</th><th>描述</th></tr>");

                        var  sellPages = req.data.buys;
                        PageCount = req.data.page.pageNo;

                        if(!sellPages.length){
                            $(".page_loading").html("暂无数据！");
                            layer.closeAll();
                            return;
                        }
                        if(PageCount<req.data.page.totalPage){
                            $(".page_loading").html("点击加载更多");
                            dataPage = Math.ceil(PageCount/sellPages.length);

                        }else if(PageCount==req.data.page.totalPage){
                            $(".page_loading").html("没有更多数据了");
                        }

                        /*  if(count==dataPage){
                         $(".page_loading").html("没有更多数据了");
                         }*/

                        for(var i=0;i<sellPages.length;i++){
                            tdlist += "<tr>" +
                                "<td>"+sellPages[i].beginTime+"</td>" +
                                "<td>"+sellPages[i].tel+"</td>" +
                                "<td>"+sellPages[i].sellFundNum+"</td>" +
                                "<td>"+sellPages[i].des+"</td>" +
                                "</tr>";

                            // "<td>"+sellPages[i].creatTime+"</td>" +
                            // "<td>"+sellPages[i].denomination+"</td>" +
                            // "<td>"+sellPages[i].trueAmount+"</td>" +
                            // "<td>"+sellPages[i].allIncome+"</td>" +
                            // "<td>"+sellPages[i].accountTel+"</td>" +
                            // "</tr>";
                        }
                        document.querySelector('.cashdeal-detail-table tbody').innerHTML = tdlist;
                        layer.closeAll();
                    })
                };

                //出售中订单
                var sellingRefresh= function (cpage) {
                    //loading层
                    layer.open({type: 2});
                    $post('https://www.egomalls.cn/user/selling',{userId:userId,pageNo:cpage,pageSize:5}).success(function (req) {

                        $('.cashdeal-detail-table thead').html("<tr><th>发起时间</th><th>单价</th><th>出售数量</th><th>描述</th></tr>");

                        var  sellPages = req.data.buys;
                        PageCount = req.data.page.pageNo;

                        if(!sellPages.length){
                            $(".page_loading").html("暂无数据！");
                            layer.closeAll();
                            return;
                        }
                        if(PageCount<req.data.page.totalPage){
                            $(".page_loading").html("点击加载更多");
                            dataPage = Math.ceil(PageCount/sellPages.length);

                        }else if(PageCount==req.data.page.totalPage){
                            $(".page_loading").html("没有更多数据了");
                        }

                        /*  if(count==dataPage){
                         $(".page_loading").html("没有更多数据了");
                         }*/

                        for(var i=0;i<sellPages.length;i++){
                            tdlist += "<tr>" +
                                "<td>"+sellPages[i].beginTime+"</td>" +
                                "<td>"+sellPages[i].tel+"</td>" +
                                "<td>"+sellPages[i].sellFundNum+"</td>" +
                                "<td>"+sellPages[i].des+"</td>" +
                                "</tr>";

                        }
                        document.querySelector('.cashdeal-detail-table tbody').innerHTML = tdlist;
                        layer.closeAll();
                    })
                };


                //购买中的订单
                var buyingRefresh= function (cpage) {
                    //loading层
                    layer.open({type: 2});
                    $post('https://www.egomalls.cn/user/buying',{userId:userId,pageNo:cpage,pageSize:5}).success(function (req) {

                        $('.cashdeal-detail-table thead').html("<tr><th>发起时间</th><th>买入用户</th><th>花费e点</th><th>描述</th></tr>");

                        var  sellPages = req.data.buys;
                        PageCount = req.data.page.pageNo;

                        if(!sellPages.length){
                            $(".page_loading").html("暂无数据！");
                            layer.closeAll();
                            return;
                        }
                        if(PageCount<req.data.page.totalPage){
                            $(".page_loading").html("点击加载更多");
                            dataPage = Math.ceil(PageCount/sellPages.length);

                        }else if(PageCount==req.data.page.totalPage){
                            $(".page_loading").html("没有更多数据了");
                        }

                        /*  if(count==dataPage){
                         $(".page_loading").html("没有更多数据了");
                         }*/

                        for(var i=0;i<sellPages.length;i++){
                            tdlist += "<tr>" +
                                "<td>"+sellPages[i].beginTime+"</td>" +
                                "<td>"+sellPages[i].tel+"</td>" +
                                "<td>"+dealNum(sellPages[i].ePointNum)+"</td>" +
                                "<td>"+sellPages[i].des+"</td>" +
                                "</tr>";

                        }
                        document.querySelector('.cashdeal-detail-table tbody').innerHTML = tdlist;
                        layer.closeAll();
                    })
                };

                $('.page_loading').on('click',function(){
                    debugger
                    count++;

                   if($(this).text()=="没有更多数据了"){
                       return;
                   }


                    var titleObj= $('.efund_detail_title ul li');


                    var titleFlag;

                    //确认当前的title
                    for(var i=0;i<titleObj.length;i++){

                        if($('.efund_detail_title ul li')[i].className=='active'){

                            titleFlag= $('.efund_detail_title ul li')[i].getAttribute('data-type');


                        }


                    }

                    $('.page_loading').html("加载中...");

                   switch (titleFlag){

                       case '0':
                           refresh(count);//买入记录
                           break;
                       case '1':
                           sellRefresh(count);
                           break;
                       case '2':
                           nextsellRefresh(count);
                           break;
                       case '3':
                           sellingRefresh(count);
                           break;
                       case '4':
                           buyingRefresh(count);
                           break;
                       default:
                           break;


                   }


                });
                $('.efund_detail_title li').on('click',function(){
                    $(this).addClass('active').siblings().removeClass('active');
                    type=$(this).attr('data-type');
                    tdlist="";
                    document.querySelector('.cashdeal-detail-table tbody').innerHTML = "";

/*
                    if(type=='0'){
                        refresh(1);//买入记录
                    }else {
                        sellRefresh(1);//卖出记录
                    }*/


                    switch (type){

                        case '0':
                            refresh(1);//买入记录
                            count=1;
                            break;
                        case '1':
                            sellRefresh(1);
                            count=1;
                            break;
                        case '2':
                            nextsellRefresh(1);
                            count=1;
                            break;
                        case '3':
                            sellingRefresh(1);
                            count=1;
                            break;
                        case '4':
                            buyingRefresh(1);
                            count=1;
                            break;
                        default:
                            break;
                    }



                })



            }
        },{
            //增值券交易
            key:"efunddeal",
            value:function efunddeal(){
                var userId=localStorage.getItem('userId');
                var buyRecordsArr, sellRecordsArr;
                var buyTimes = [], buyDayPiont = [], dayResidueAmount = [], denomination = [];
                var lay = layer.open({ type: 2, shadeClose: false });
                $post("https://www.egomalls.cn/user/transParam",{userId:userId}).success(function (res) {
                    layer.close(lay);
                    var datas = res.data;
                    $('#allFund').html(datas.totalNum==null?0:datas.totalNum);//市场基金总额
                    $('#upAmount').html(datas.addNum==null?0:datas.addNum);//累计增值次数
                    $('#upTime').html(datas.addTime==''?'/年/月/日':datas.addTime);//最近一次增值时间
                    $('#denomination').html(datas.currentValue==null?0:dealNum(datas.currentValue));//当前单价
                    $('#buying').html(datas.waiteBuy==null?0:datas.waiteBuy);//当前等待购买量
                    $('#waitingSell').html(datas.waiteSell==null?0:datas.waiteSell);//当前卖出总量
                    $('#mySelfFund').html(datas.myEFundNum==null?0:datas.myEFundNum);//我的基金份数
                    $("#myEPoint").html(datas.myEPoint==null||''?0:dealNum(datas.myEPoint));//我的e点数
                    buyRecordsArr = datas.table1;//历史买入记录
                    sellRecordsArr = datas.table2;//当前代售数据

                    for (var i = 0; i < buyRecordsArr.length; i++) {
                        buyTimes.push(buyRecordsArr[i].time);//买入时间
                        buyDayPiont.push((buyRecordsArr[i].eFundNum));//买入量
                    }
                    for (var j = 0; j < sellRecordsArr.length; j++) {
                        denomination.push(sellRecordsArr[j].unitValue);//增值券单价
                        dayResidueAmount.push((sellRecordsArr[j].totalValue));//卖出份数
                    }

                    //设置Y轴范围
                    var pointMax = Math.max.apply(null, buyDayPiont) + 100,
                        pointMin = Math.min.apply(null, buyDayPiont)-100;


                    //设置Y轴范围

                    var sellpointMax = Math.max.apply(null, dayResidueAmount),
                        sellpointMin = 0;


                    //代售数据柱状图
                    var totalBuyChart = echarts.init(document.getElementById('chart1'));
                    var totalOption = {
                        xAxis: [
                            {
                                type: 'category',
                                data: denomination,
                                axisLabel: {// 显示所有x轴数据
                                    show: true,
                                    interval: 0,
                                    //rotate:-60,
                                    textStyle: {
                                        color: '#000',
                                        fontSize: 9
                                    }
                                },
                                axisPointer: {
                                    type: 'shadow'
                                }
                            }
                        ],
                        yAxis: [{
                            type: "value",
                            name: "(单位:份)",
                            min: sellpointMin,
                            max: sellpointMax,
                            axisLabel: {formatter: "{value}", textStyle: {fontSize: 9, color: '#000'}}
                        }],
                        grid: {left: '16%', top: 5, height: '80%'},
                        series: [
                            {
                                name: '购买总量',
                                type: 'bar',
                                barWidth:16,
                                itemStyle: {normal: {color: "#9a73d1"}},
                                data: dayResidueAmount,
                            }
                            /*{
                             name: '购买总量',
                             type: 'line',
                             lineStyle: {normal: {width: 2, color: '#e1c359'}},
                             itemStyle: {normal: {color: '#e1c359', borderColor: '#e1c359', borderWidth: 4, shadowOffset: 2}},
                             data: dayResidueAmount,
                             }*/
                        ],
                        textStyle: {fontSize: 8}
                    };
                    totalBuyChart.setOption(totalOption);


                    //历史买入记录
                    //var totalSellChart = echarts.init(document.getElementById('chart2'));
                   /* var totalSellOption = {
                        xAxis: [
                            {
                                type: 'category',
                                data: buyTimes,
                                axisLabel: {// 显示所有x轴数据
                                    show: true,
                                    interval: 0,
                                    rotate:-32,
                                    textStyle: {
                                        color: '#000',
                                        fontSize: 9
                                    }
                                },
                                axisPointer: {
                                    type: 'shadow'
                                }
                            }
                        ],
                        grid: {left: '6%', top: 5, height: '60%',bottom:'100%',containLabel:true},
                        yAxis: [{
                            type: "value",
                            name: "(单位:万)",
                            min: pointMin,
                            max: pointMax,
                            axisLabel: {formatter: "{value}", textStyle: {fontSize: 9, color: '#000'}}
                        }],
                        series: [
                            {
                                name: '销售总量',
                                type: 'line',
                                lineStyle: {normal: {width: 2, color: '#9a73d1'}},
                                itemStyle: {normal: {color: '#9a73d1', borderColor: '#9a73d1', borderWidth: 4, shadowOffset: 2}},
                                data: buyDayPiont,
                            }
                        ],
                        textStyle: {fontSize: 8}
                    };*/
                    //totalSellChart.setOption(totalSellOption);


                  /*  //基金卖出
                    $('.sellout-btn').click(function () {
                        location.href='/m/sellfund';//到卖入页面
                    });*/

                    //基金买入
                    $('.buyin-btn').click(function () {
                        location.href='/m/buyfund';//到买入页面
                    })

                });


                //加载卖出增值券数据

                var sellNum=0,ysNum=0;
                $post('https://www.egomalls.cn/user/layerData',{userId:userId,pageNo:1,pageSize:1}).success(function (res) {
                    debugger
                    //var ksMoney=dealNum(res.data.ksNum*0.13);
                    var ysMoney=dealNum(res.data.sellNum*0.13);
                    sellNum=res.data.currentNum;
                    ysNum=res.data.jsSellNum;

                    // $('#ksNum').html(dealNum(res.data.ksNum)+'&nbsp;('+ksMoney+'元)');//可售份数
                    $('#currentNum').html(res.data.currentNum);//当前份数

                    $('#jsSellNum').html(res.data.jsSellNum); //建议出售份数

                    $('#sellNum').html(res.data.sellNum+'&nbsp;('+ysMoney+'元)');//已售份数


                    //基金卖出
                    $('.sellout-btn').click(function () {
                       // location.href='/m/sellfund';//到卖入页面
                        var pwd;
                        //弹出支付密码框
                        $('.mack').show();
                        $('.popup_content').show(function (e) {

                            //出售份数
                            $('#ysNum').val(ysNum);
                            //可售份数的范围
                            $('#ksRange').text(sellNum*2);
                            $('#ysNumown').text(sellNum);

                        });

                        var $input = $(".fake-box input");
                        $("#pwd-input").on("input", function() {
                            pwd = $(this).val().trim();
                            for (var i = 0, len = pwd.length; i < len; i++) {
                                $input.eq("" + i + "").val(pwd[i]);
                            }
                            $input.each(function() {
                                var index = $(this).index();
                                if (index >= len) {
                                    $(this).val("");
                                }
                            });
                            if (len == 6) {
                                //执行其他操作
                                $('#sellfundSbmit').attr('disabled',false);
                            }else{
                                $('#sellfundSbmit').attr('disabled',true);
                            }
                        });
                        $(".pay_cancel_btn").on('click',function(){
                            $('.mack').hide();
                            $('.popup_content').hide();
                            $("#pwd-input").val("");//密码执空

                        });


                        $("#sellfundSbmit").off('click').on('click',function(){
                            var userId=localStorage.getItem('userId');
                            //var loadindex = layer.open({ type: 2, shadeClose: false });
                            //卖出份数
                            var ysNum1=$('#ysNum').val();
                            var data={userId:userId,payPassword:pwd,sellNum:ysNum1};

                            if(data.payPassword&&sellNum!=0){
                                var loadindex2 = layer.open({ type: 2, shadeClose: false });
                                $.post('https://www.egomalls.cn/user/sellEFund',data,function (ress) {
                                    debugger
                                    layer.close(loadindex2);
                                    if(ress.code=='200'){//卖出成功
                                        var successindex= layer.open({
                                            title:"提示",
                                            icon:1,
                                            content:ress.msg
                                        });
                                        $('.mack').hide();
                                        $('.popup_content').hide();
                                        location.reload();

                                    }else{//支付密码不正确或者参数不对
                                        layer.open({
                                            title:"提示",
                                            icon:2,
                                            content:ress.msg
                                        });
                                        $("#pwd-input").val("");//密码执空
                                    }
                                })
                            }else if(!data.payPassword){
                                layer.open({
                                    title:"提示",
                                    icon:2,
                                    content:'请输入密码！'
                                });
                                $("#pwd-input").val("");//密码执空
                            }

                        });



//单行卖出
                        function sellOne(e) {

                            var orderId=$(e).next().val();

                            rowID.push({orderId:orderId,pi:$(e).parent().find('select').val()});

                            //弹出支付密码框
                            $('.mack').show();
                            $('.popup_content').show();

                            //6位密碼輸入
                            //var pwd;
                            var $input = $(".fake-box input");
                            $("#pwd-input").on("input", function() {
                                pwd = $(this).val().trim();
                                for (var i = 0, len = pwd.length; i < len; i++) {
                                    $input.eq("" + i + "").val(pwd[i]);
                                }
                                $input.each(function() {
                                    var index = $(this).index();
                                    if (index >= len) {
                                        $(this).val("");
                                    }
                                });
                                if (len == 6) {
                                    //执行其他操作
                                    $('#sellfundSbmit').attr('disabled',false);
                                }else{
                                    $('#sellfundSbmit').attr('disabled',true);
                                }
                            });
                            $(".pay_cancel_btn").on('click',function(){
                                $('.mack').hide();
                                $('.popup_content').hide();
                                $("#pwd-input").val("");
                                //清空rowID数组

                                rowID.length=0;
                            });

                        }


                    });


                })

            }
        },{
            // 现金余额交易
            key:"cashdeal",
            value:function cashdeal(){
                var offsetNo=0,deal="",state="",pageSize=5,count=1,pageNumber,type=2,dataSet,thead;
                var tdlist="";
                var lay = layer.open({ type: 2, shadeClose: false });
                var refresh = function(){
                    if(type==0){
                        thead="<tr><th>日期</th><th>买入金额</th><th>买入状态</th><th>操作</th></tr>";
                    }else if(type==1){
                        thead="<tr><th>日期</th><th>卖出金额</th><th>卖出状态</th><th>操作</th></tr>";
                    }else if(type==2){
                        thead="<tr><th>日期</th><th>买入金额</th><th>交易对象</th><th>操作</th></tr>";
                    }else if (type==3){
                        thead="<tr><th>日期</th><th>卖出金额</th><th>交易对象</th><th>操作</th></tr>";
                    }
                    document.querySelector('.cashdeal-detail-table thead').innerHTML = thead;

                    $post('/Tshop/businessmoney/gtrade',{
                        offset: offsetNo,
                        state: state,
                        type:type //买入待匹配type=0，卖出待匹配type=1;
                    }).success(function(req){
                        layer.close(lay);
                        var datas = req.data;
                        var businessMoneys = datas.businessMoneys;
                        var buyMoneyss = datas.buyMoneyss;
                        // var dealObj=t.account;

                        if(type==0){
                            dataSet=datas.buyingMoney;
                        }else if(type==1){
                            dataSet = datas.sellingMoney;
                        }else if(type==2){
                            dataSet = datas.buyMoneyss;
                        }else if (type==3){
                            dataSet = datas.sellMoneyss;
                        }


                        pageNumber = Math.ceil(datas.totalPageCount/pageSize);
                        $(".countMarketMoneyReco").html(Number(datas.countMarketMoneyReco).toFixed(2)+'元' || 0+'元');
                        $(".buyMoneyReco").html(Number(datas.buyMoneyReco).toFixed(2));
                        $(".sellMoneyReco").html(Number(datas.sellMoneyReco).toFixed(2));
                        $(".WaitBuyMoneyReco").html(Number(datas.WaitBuyMoneyReco).toFixed(2));
                        $(".WaitSellMoneyReco").html(Number(datas.WaitSellMoneyReco).toFixed(2));

                        if(pageNumber==count || datas.totalPageCount<pageSize){
                            $('.page_loading').html("没有更多数据");
                        }else{
                            $('.page_loading').html("点击加载更多");
                        }
                        var resultTime=[];
                        function setTime(time){
                            var date = new Date(time);
                            var Y = date.getFullYear() + '/';
                            var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '/';
                            var D = date.getDate() + ' ';
                            var h = date.getHours() + ':';
                            var m = date.getMinutes() + ':';
                            var s = date.getSeconds();
                            resultTime=Y+M+D+h+m+s ;
                            return resultTime;
                        }
                        //type=2为买方匹配成功
                        var Detailed;
                        function stateDeal(state){
                            //买入匹配成功
                            if(type==2 && state==1){
                                Detailed = "<span class=\"cashdeal_detail_receipt playMoney\">去转账</span>";
                                return Detailed;
                            }
                            if(type==2 && state==2){
                                Detailed = "<span class=\"cashdeal_detail_receipt\">等待对方收款</span>";
                                return Detailed;
                            }
                            //卖出匹配成功
                            if(type==3 && state==1){
                                Detailed = "<span class=\"cashdeal_detail_receipt\">等待对方打款</span>";
                                return Detailed;
                            }
                            if(type==3 && state==2){
                                Detailed = "<span class=\"cashdeal_detail_receipt receivables\">确认收款</span>";
                                return Detailed;
                            }
                            //买入待匹配
                            if(type==0 || type==1){
                                Detailed = "<span class=\"cashdeal_detail_receipt\">等待后台匹配</span>";
                                return Detailed;
                            }

                            if(state==3){
                                Detailed = "<span class=\"cashdeal_detail_receipt\">交易成功</span>";
                                return Detailed;
                            }
                        }
                        function transactionName(accountName,businessobjName){
                            if( type==2){
                                return businessobjName;
                            }else if(type==3){
                                return accountName;
                            }
                        }
                        if(type==2 || type==3){
                            for(var i=0;i<dataSet.length;i++){

                                tdlist += "<tr>" +
                                    "<td class='dataId' style='display:none;'>"+dataSet[i].id+"</td>" +
                                    "<td>"+setTime(dataSet[i].creatTime)+"</td>" +
                                    "<td>"+dataSet[i].money+"</td>" +
                                    "<td style='color:red' id='dealObject' >"+transactionName(dataSet[i].accountName,dataSet[i].businessobjName)+"</td>" +
                                    "<td>"+stateDeal(dataSet[i].state)+"</td>" +
                                    "</tr>";
                            }
                        }else if(type==0 || type==1){
                            for(var i=0;i<dataSet.length;i++){
                                tdlist += "<tr>" +
                                    "<td class='dataId' style='display:none;'>"+dataSet[i].id+"</td>" +
                                    "<td>"+setTime(dataSet[i].creatTime)+"</td>" +
                                    "<td>"+dataSet[i].money+"</td>" +
                                    "<td>"+stateDeal(dataSet[i].state,dataSet[i].id)+"</td>" +
                                    "<td><span id="+dataSet[i].id+" dataType="+type+" class='cashdeal_detail_receipt cancelOrder'>取消订单</span></td>" +
                                    "</tr>";
                            }
                        }


                        document.querySelector('.cashdeal-detail-table tbody').innerHTML = tdlist;

                        $("#dealObject").on('click',function(){


                            // layer.open({
                            //     content: '移动版和PC版不能同时存在同一页面'
                            //     ,btn: '我知道了'
                            // });
                        })

                        function receipt(id,text){
                            layer.open({
                                content: '您确定要'+text+'吗？'
                                ,btn: ['确定', '取消']
                                ,yes: function(index){
                                    layer.close(index);
                                    var lay = layer.open({ type: 2, shadeClose: false });
                                    $post('/Tshop/businessmoney/finish',{businessmoneyId:id}).success(function(req){
                                        layer.close(lay);
                                        if(req.code!=200){
                                            layer.open({
                                                content: req.msg
                                                ,skin: 'msg'
                                                ,time: 2 //2秒后自动关闭
                                            });
                                            return;
                                        }
                                        layer.open({
                                            content:req.msg,
                                            btn: '确定',
                                            yes: function(index){
                                                location.reload();
                                                layer.close(index);
                                            }
                                        });
                                    })
                                }
                            });
                        }

                        //去打款点击
                        $('.cashdeal_detail_receipt.playMoney').on('click',function(){
                            var businessmoneyId = $(this).parent().siblings('.dataId').html();
                            receipt(businessmoneyId,'打款');
                        })
                        //确认收款点击
                        $('.cashdeal_detail_receipt.receivables').on('click',function(){
                            var businessmoneyId = $(this).parent().siblings('.dataId').html();
                            receipt(businessmoneyId,'收款');
                        })

                        //取消订单点击
                        $('.cashdeal_detail_receipt.cancelOrder').on('click',function(){
                            var dataType=$(this).attr('dataType');
                            var operationId = $(this).parent().siblings('.dataId').html();

                            layer.open({
                                content: '您确定要取消本订单吗？'
                                ,btn: ['确定', '取消']
                                ,yes: function(index){
                                    layer.close(index);
                                    var lay = layer.open({ type: 2, shadeClose: false });
                                    $post('/Tshop/businessmoney/cancel',{id:operationId,type:dataType}).success(function(req) {
                                        layer.close(lay);
                                        if(req.code!=200){
                                            layer.open({
                                                content: req.msg
                                                ,skin: 'msg'
                                                ,time: 2 //2秒后自动关闭
                                            });
                                            return;
                                        }
                                        layer.open({
                                            content:req.msg,
                                            btn: '确定',
                                            // shadeClose: false,
                                            yes: function(index){
                                                location.reload();// 刷新页面
                                                layer.close(index);
                                            }
                                        });
                                    })
                                }
                            });
                        })
                    })
                }
                refresh();

                $('.page_loading').on('click',function(){
                    offsetNo=pageSize*count;
                    count++;
                    if(count>pageNumber){
                        return;
                    }
                    $('.page_loading').html("加载中...");
                    refresh();
                });
                $('.deal_detail_title li').on('click',function(){
                    $(this).addClass('active').siblings().removeClass('active');
                    type = $(this).attr("data-type");
                    // state = $(this).attr("data-state");
                    tdlist="";
                    document.querySelector('.cashdeal-detail-table tbody').innerHTML="";
                    $('.page_loading').html("加载中...");
                    refresh();

                })

            }
        },{
            //买入
            key:"buyfund",
            value:function buyfund(){
                var userId=localStorage.getItem('userId');
                var buyNumber = document.getElementById('buyNumber');
                $("#buyNumber").on('input propertychange',function(){
                    console.log(buyNumber.value);
                    console.log(isNaN(buyNumber.value));

                    var value = buyNumber.value/50;
                    if((/^(\+|-)?\d+$/.test( value ))&&value>0){
                        $(".next-buy-btn").attr('disabled',false);

                    }else{
                        $(".next-buy-btn").attr('disabled',true);

                    }


                });
                $('.next-buy-btn').on('click',function(){
                    $('.mack').css('display','block');
                    $('.popup_content').css('display','block');
                });
                //6位密碼輸入
                var pwd;
                var $input = $(".fake-box input");
                $("#pwd-input").on("input", function() {
                    pwd = $(this).val().trim();
                    for (var i = 0, len = pwd.length; i < len; i++) {
                        $input.eq("" + i + "").val(pwd[i]);
                    }
                    $input.each(function() {
                        var index = $(this).index();
                        if (index >= len) {
                            $(this).val("");
                        }
                    });
                    if (len == 6) {
                        //执行其他操作
                        $('#subpaypwd').attr('disabled',false);
                    }else{
                        $('#subpaypwd').attr('disabled',true);
                    }
                });
                $(".pay_cancel_btn").on('click',function(){
                    $('.mack').hide();
                    $('.popup_content').hide();
                    $("#pwd-input").val("");
                    $(".fake-box input").val("");
                });

                $('#subpaypwd').on('click',function(){

                    var data={ePoint:buyNumber.value,payPassword:pwd,userId:userId};
                    var lay = layer.open({ type: 2, shadeClose: false });
                    $post('https://www.egomalls.cn/user/buyEFund',data).success(function(req){
                        layer.close(lay);

                        $('.mack').hide();
                        $('.popup_content').hide();
                        $("#pwd-input").val("");
                        $(".fake-box input").val("");

                        if(req.code=='200'){//卖出成功
                            layer.open({
                                title: [
                                    '提示',
                                    'background-color:#dd7e21; color:#fff;text-align:left;'
                                ]
                                ,anim: 'up'
                                ,content: req.msg
                                ,shadeClose: false
                                ,btn: ['确认']
                                ,yes: function(index){
                                    layer.close(index);
                                    location.href='/m/efunddeal';
                                }
                            });

                        }else{

                            layer.open({
                                title: [
                                    '提示',
                                    'background-color:red; color:#fff;text-align:left;height:40px;line-height:40px;'
                                ]
                                ,anim: 'up'
                                ,content:req.msg
                                ,shadeClose: false
                                ,btn: ['确认'],
                                yes: function(index){
                                    layer.close(index);
                                    $('.mack').hide();
                                    $('.popup_content').hide();
                                    $("#pwd-input").val("");
                                    $(".fake-box input").val("");
                                    $("#buyNumber").focus();
                                }
                            });
                        }

                    })
                })
            }
        },{
            //消费积分
            key:'spendingIntegral',
            value:function spendingIntegral(){
                var liList="";
                var resultTime=[];
                function setTime(time){
                    var date = new Date(time);
                    var Y = date.getFullYear() + '/';
                    var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '/';
                    var D = date.getDate() + ' ';
                    var h = date.getHours() + ':';
                    var m = date.getMinutes() + ':';
                    var s = date.getSeconds();
                    resultTime=Y+M+D+h+m+s ;
                    return resultTime;
                }
                var incomeNumber;
                function income(inOrOut,ePoint){
                    if(inOrOut=='y'){
                        return incomeNumber=inOrOut,"+"+dealNum(ePoint);
                    }else{
                        return incomeNumber=inOrOut,"-"+dealNum(ePoint);
                    }
                }
                var getePointHtml;
                var dataPage,count=1,type=0;
                var lay = layer.open({ type: 2, shadeClose: false });
                var refresh = function(){
                    $post('/Tshop/account/ePoint',{offset: 0, type: type}).success(function(req){
                        layer.close(lay);
                        $("#usableIntegral").html(req.data.wasteScore);
                        var datas = req.data.Detaileds;
                        var PageCount = req.data.totalPageCount;

                        if(PageCount>datas.length){
                            $(".page_loading").html("点击加载更多");
                            dataPage = Math.ceil(PageCount/datas.length);

                        }else if(PageCount<=datas.length){
                            $(".page_loading").html("没有更多数据了");
                        }

                        if(count==dataPage){
                            $(".page_loading").html("没有更多数据了");
                        }
                        if(datas.length==0||datas==undefined){
                            $('.page_loading').html("暂无数据");
                            return;
                        }
                        if(type==0){
                            for(var i=0;i<datas.length;i++){
                                if(datas[i].inOrOut=="y"){
                                    getePointHtml="<span style=\"color:#71c37d\">"+income(datas[i].inOrOut,datas[i].incomeSpend)+"</span>"
                                }else{
                                    getePointHtml="<span style=\"color:red\">"+income(datas[i].inOrOut,datas[i].incomeSpend)+"</span>"
                                }

                                liList  +=  "<li>" +
                                    "<div class=\"deal-e-content\">" +
                                    "<div class=\"e-mid\">" +
                                    "<div class=\"e-title\">"+datas[i].detail+"</div>" +
                                    "<div class=\"e-points\">"+getePointHtml+"</div>" +
                                    "</div>" +
                                    "<div class=\"\" style=\"float:right;\">" +
                                    "<p style=\'line-height:36px;\'>"+datas[i].businessobj+"</p>" +
                                    "<div class=\"e-date\" style=\"color:#969696;font-size:12px;\">"+setTime(datas[i].creatTime)+"</div>"+
                                    "</div>" +
                                    "</div>" +
                                    "</li>"
                            }
                        }else if( type==1 ){
                            for(var i=0;i<datas.length;i++){
                                if(datas[i].inOrOut=="y"){
                                    getePointHtml="<span style=\"color:#71c37d\">"+income(datas[i].inOrOut,datas[i].incomeSpend)+"</span>"
                                }else{
                                    getePointHtml="<span style=\"color:red\">"+income(datas[i].inOrOut,datas[i].incomeSpend)+"</span>"
                                }

                                liList  +=  "<li>" +
                                    "<div class=\"deal-e-content\">" +
                                    "<div class=\"e-mid\">" +
                                    "<div class=\"e-title\">"+datas[i].businessobj+"</div>" +
                                    "<div class=\"e-points\">"+getePointHtml+"</div>" +
                                    "</div>" +
                                    "<div class=\"\" style=\"float:right;\">" +
                                    "<div class=\"e-date\" style=\"color:#969696;font-size:12px;\">"+setTime(datas[i].creatTime)+"</div>"+
                                    "</div>" +
                                    "</div>" +
                                    "</li>"
                            }
                        }

                        document.querySelector('.epoint_info').innerHTML = liList;
                    })

                }
                refresh();
                $('.epoint_tab_tit').on('click',function(){
                    $(this).addClass('active').siblings().removeClass('active');
                    type = $(this).attr('data-type');
                    document.querySelector('.epoint_info').innerHTML = "";
                    liList="";
                    $('.page_loading').html("加载中...");
                    refresh();
                })
                $('.page_loading').on('click',function(){
                    count++;
                    if(count>dataPage){
                        return;
                    }
                    $('.page_loading').html("加载中...");
                    refresh();
                })
            }
        },{
            //会员推广
            key:"membership",
            value:function membership(){
                var teamamount=0,push1=0,push2=0,one=0,two=0,three=0,a,b;
                $post('/Tshop/account/VipNum').success(function(req){
                    if(req.code!=200){
                        return;
                    }
                    teamamount="("+req.data.teamamount+")人";
                    push1="("+req.data.push1+")人";
                    push2="("+req.data.push2+")人";
                    one="("+req.data.one+")元";
                    two="("+req.data.two+")元";
                    three="("+req.data.three+")元";
                    $("#teamamount").html(teamamount);
                    $("#push1").html(push1);
                    $("#push2").html(push2);
                    $("#one").html(one);
                    $("#two").html(two);
                    $("#three").html(three);
                })
                $post('/Tshop/account/personNum').success(function(req){
                    // $('.personData').val(req.data.account+","+req.data.amount);
                    // $(".membership_list  #username").html(req.data.name);
                    // $(".membership_list  #amount").html("("+req.data.amount+")人");
                    var datas = req.data;
                    var html = template('head-tpl', datas);
                    document.querySelector('#head').innerHTML = html;

                })



                // $(".head").on('click',function(){
                //     var _this = $(this);
                //     console.log("一");
                //     getTree(_this);
                //
                // })

                // function setShow(name,tel){
                //     if(name==null){
                //         return tel;
                //     }else{
                //         return name;
                //     }
                // }

                // function getTree(_this){
                //
                //     if(_this.next('ul').length>0){
                //         console.log("移除");
                //         _this.next('ul').remove();
                //         return;
                //     }else{
                //         var personData = _this.find(".personData").val();
                //         console.log(personData);
                //         personData = personData.split(",");
                //         console.log(personData);
                //         var tel = personData[0];
                //         var amount = personData[1];
                //
                //         if(amount==0){
                //             return;
                //         }
                //         var ul = $("<ul><li></li></ul>");
                //         var accountHtml="";
                //         console.log(tel);
                //         $post('/Tshop/account/getTree',{tel:tel}).success(function(req){
                //             console.log(req);
                //             var datas = req.data;
                //             // for(var i=0;i<datas.length;i++){
                //             //
                //             //     accountHtml+="<li>" +
                //             //         "<span></span>" +
                //             //         "<p class=\"bbox bboxTwo\">" +
                //             //         "<input type=\"hidden\" class=\"personData\" value=\""+datas[i].trueTel+","+datas[i].amount+"\"/>"+
                //             //         "<span>"+setShow(datas[i].name,datas[i].tel)+"</span>" +
                //             //         "<span>("+datas[i].amount+")人</span>" +
                //             //         "</p>" +
                //             //         "</li>";
                //             // }
                //             ul.append(accountHtml);
                //             _this.after(ul);
                //
                //         })
                //     }
                //
                // }

                // $('.bboxTwo').on('click',function(){
                //     console.log("pp");
                // })

            }
        },{
            //我的订单
            key:"myOrder",
            value:function myOrder(){
                var url = window.location.search;
                var urlAux = url.split('=');
                var typeIndex = url.indexOf('=');
                typeIndex = url.substring(typeIndex+1,url.length);

                var offsetNo=0,count=1,pageSize,pagerSize,paystatus,orderId;

                var liList="";
                var lay = layer.open({ type: 2, shadeClose: false });
                url = '/Tshop/order/allOrder';
                var data = {offset:offsetNo};

                var allOreder = function(){

                    $post(url,data).success(function(req){
                        layer.close(lay);
                        if(req.data==null){
                            $(".page_loading").html("暂无数据！");
                            return;
                        }
                        var datas = req.data.list;
                        if(datas.length==0||datas==undefined){
                            $(".page_loading").html("暂无数据！");
                            return;
                        }
                        pageSize = req.data.pageSize;
                        pagerSize = req.data.pagerSize;  //共有多少条订单
                        if(count == pagerSize){
                            $(".page_loading").html("没有更多数据了");
                        }else{
                            $(".page_loading").html("点击加载更多");
                        }
                        var datainfo={
                            list:req.data.list
                        };

                        var html = template('content-tpl', datainfo);
                        document.getElementById('order-content').innerHTML += html;

                        var cancelOrderHtml="";
                        cancelOrderHtml+="<div class=\"cancelOrder-content\">" +
                            "<div class=\"cancelOrder-ground\">" +
                            "<lable><i style=\"color:red;line-height:16px;margin-right:5px;\">*</i>取消原因:</lable>" +
                            "<textarea type=\"text\" rows=\"6\" class=\"cancel-reasonInp\"></textarea>" +
                            "</div><p class=\"cancel-hint\" style=\"color:red;margin-left:30%;opacity: 0\">取消原因不能为空</p>" +
                            "<div class=\"reminder\">" +
                            "<p>温馨提示:</p>" +
                            "<p>· 订单成功取消后无法恢复</p>" +
                            "<p>· 该订单取消后想，系统不会扣除提交订单时抵扣的现金余额或消费积分</p>" +
                            "<p>· 提交订单后取消订单，使用优惠券和积分券将不再返还</p>" +
                            "</div>" +
                            "</div>";

                        $('.orderop .o-tab-btn li').on('click',function(){
                            var name = $(this).attr('name');
                            orderId = $(this).attr('data-id');
                            var _this = $(this);
                            switch (name) {
                                case 'cuidan':
                                    layer.open({
                                        content: '催单成功，请耐心等待!'
                                        ,skin: 'msg'
                                        ,time: 2 //2秒后自动关闭
                                    });
                                    break;
                                case 'paymentOrder':
                                    $('.mack').css('display','block');
                                    $('.popup_content').css('display','block');
                                    break;
                                case 'cancelOrder':
                                    layer.open({
                                        content: cancelOrderHtml
                                        ,btn: ['确定取消', '暂不取消']
                                        ,skin: 'footer'
                                        ,yes: function(index){
                                            if($(".cancel-reasonInp").val()==""){
                                                layer.open({
                                                    content: '取消原因不能为空'
                                                    ,skin: 'msg'
                                                    ,time: 2 //2秒后自动关闭
                                                });
                                                $('.cancel-hint').css('opacity','1');
                                                $(".cancel-reasonInp").focus();
                                                return;
                                            }
                                            $post('/Tshop/order/cancelOrder',{
                                                orderId: orderId,
                                                cancelReason: $(".cancel-reasonInp").val()
                                            }).success(function(req){
                                                console.log(req);
                                                if(req.code!=200){
                                                    layer.open({
                                                        content: req.msg
                                                        ,skin: 'msg'
                                                        ,time: 2 //2秒后自动关闭
                                                    });
                                                    return;
                                                }
                                                layer.open({
                                                    content: req.msg
                                                    ,style: 'background-color:#fff; border:none;' //自定风格
                                                    ,time: 3
                                                    ,success: function(){
                                                        location.reload();
                                                    }
                                                });
                                            })
                                        }
                                    });
                                    break;
                                case 'confirm':
                                    layer.open({
                                        content: '确定已经收到货？'
                                        ,btn: ['确定', '取消']
                                        ,yes: function(index){
                                            $post('/Tshop/order/confirmReceive',{orderId: orderId}).success(function(req){
                                                console.log(req);
                                                if(req.code!=200){
                                                    layer.open({
                                                        content: req.msg
                                                        ,skin: 'msg'
                                                        ,time: 2 //2秒后自动关闭
                                                    });
                                                    return;
                                                }
                                                layer.open({
                                                    content: req.msg
                                                    ,style: 'background-color:#fff; border:none;' //自定风格
                                                    ,time: 3
                                                    ,success: function(){
                                                        location.reload();
                                                    }
                                                });
                                            })
                                        }
                                    });

                                    break;
                                case 'evaluate':
                                    localStorage.setItem("orderId",orderId);
                                    localStorage.setItem("orderImg",_this.parents('li').find('.item-img').html());
                                    localStorage.setItem("orderTitle",_this.parents('li').children('.item').find('.title').html());
                                    localStorage.setItem("productId",_this.attr("data-productId"));
                                    location.href='/m/orderEvaluate';
                                    break;
                                case 'viewLogistic':
                                    localStorage.setItem("orderId",orderId);
                                    localStorage.setItem("expressName",_this.attr("data-expressName"));
                                    localStorage.setItem("expressNo",_this.attr("data-expressNo"));
                                    location.href='/m/orderLogistic';

                            }
                        })
                    })
                };
                var TopLi=$(".nav-tab-top ul li");



                if(typeIndex!=""){
                    for(var i=0;i<TopLi.length;i++){
                        TopLi.eq(i).removeClass('cur');
                        if(typeIndex==i){
                            TopLi.eq(i).addClass('cur');
                            findOrder(parseInt(typeIndex));
                        }
                    }
                }else{
                    allOreder();
                }


                $('.page_loading').on('click',function(){

                    data = {offset:pageSize*count};
                    count++;
                    if(count>pagerSize){
                        return;
                    }
                    $('.page_loading').html("加载中...");
                    allOreder();
                });
                $('.nav-tab-top ul li').on('click',function(){
                    $('.page_loading').html("加载中...");
                    $(this).addClass('cur').siblings().removeClass('cur');
                    var index = $(this).index();

                    document.getElementById('order-content').innerHTML="";
                    findOrder(index);
                    // allOreder();


                });

                function findOrder(index){
                    switch (index) {
                        case 0:
                            url = '/Tshop/order/allOrder';
                            data = {offset:offsetNo};
                            break;
                        case 1:
                            url = '/Tshop/order/orderList';
                            data = {offset:offsetNo,paystatus:"n",status:"init"};
                            break;
                        case 2:
                            url = '/Tshop/order/orderList';
                            data = {offset:offsetNo,paystatus:"y",status:"send"};
                            break;
                        case 3:
                            console.log("3");
                            url = '/Tshop/order/orderList';
                            data = {offset:offsetNo,paystatus:"y",status:"sign",iscomment:"n"};
                            break;
                        case 4:
                            url = '/Tshop/order/recycleOrder';
                            data = {offset:offsetNo};
                    }
                    allOreder();
                }


                //6位密碼輸入
                var pwd;
                var $input = $(".fake-box input");
                $("#pwd-input").on("input", function() {
                    pwd = $(this).val().trim();
                    for (var i = 0, len = pwd.length; i < len; i++) {
                        $input.eq("" + i + "").val(pwd[i]);
                    }
                    $input.each(function() {
                        var index = $(this).index();
                        if (index >= len) {
                            $(this).val("");
                        }
                    });
                    if (len == 6) {
                        //执行其他操作
                        $('#subpaypwd').attr('disabled',false);
                    }else{
                        $('#subpaypwd').attr('disabled',true);
                    }
                });
                $(".pay_cancel_btn").on('click',function(){
                    $('.mack').hide();
                    $('.popup_content').hide();
                    $("#pwd-input").val("");
                    $(".fake-box input").val("");
                });
                //付款
                $("#subpaypwd").off("click").on('click',function(){
                    var lay = layer.open({ type: 2, shadeClose: false });
                    $post('/Tshop/order/payment',{
                        orderId:orderId,
                        payPassWord: pwd
                    }).success(function(req){
                        layer.close(lay);
                        if(req.code!=200){
                            layer.open({
                                content: req.msg
                                ,skin: 'msg'
                                ,time: 2 //2秒后自动关闭
                            });
                            return;
                        }
                        $('.mack').hide();
                        $('.popup_content').hide();
                        $("#pwd-input").val("");
                        $(".fake-box input").val("");
                        layer.open({
                            content: req.msg
                            ,style: 'background-color:#fff; border:none;' //自定风格
                            ,time: 3
                            ,success: function(){
                                location.reload();
                            }
                        });


                    })
                })

            }
        },{
            //订单评价
            key:'orderEvaluate',
            value:function orderEvaluate(){
                var orderId = localStorage.getItem("orderId");
                var orderImg = localStorage.getItem("orderImg");
                var orderTitle = localStorage.getItem("orderTitle");
                var productId = localStorage.getItem("productId");

                var infoHtml="";
                infoHtml+="<div class=\"order_img\">"+orderImg+"</div>" +
                    "<div class=\"order_title\">"+orderTitle+"</div>";
                document.querySelector('.order_info').innerHTML = infoHtml;

                $('.orderEvaluate_score li').on('click',function(){
                    $(this).addClass('active');
                    $(this).prevAll().addClass('active');
                    $(this).nextAll().removeClass('active');
                })
                //图片上传
                var result=document.getElementById("result");
                var file=document.getElementById("upimginp");
                var textArea=$(".textben");
                var labelId=null;

                //file.addEventListener("change",readAsDataURL);
                function bindListener(){
                    $(".img-guanbi").unbind().click(function(){
                        $(this).parent().remove();
                    })
                }
                function evaluateCheck(){
                    $(".o-pl-title-right.fl label").each(function(){
                        var _this=$(this);
                        _this.removeClass("active");
                        var inp=_this.find("input");
                        if(inp.is(":checked")&&(labelId=inp.val())){
                            _this.addClass("active");
                        }
                    })
                }


                //上传评价图片使用FileReader读取图片并转成base64编码
                var imgCounts=0;
                function selectImage(file){
                    if(typeof FileReader==='undefined'){
                        var index= layer.open({
                            title:"提示",
                            icon:1,
                            content:"抱歉，你的浏览器不支持HTML5上传图片"
                        });
                        $('#upimginp').attr('disabled','disabled');//关闭传按钮
                    }else{
                        //进行图片处理
                        if(!file.files || !file.files[0]){
                            return;
                        }
                        var reader = new FileReader();
                        reader.onload = function(evt){
                            var imgSrc = evt.target.result;//image src
                            //生成预览图
                            var imgHtml='<div class="s-pic-img" style="background-image:url('+imgSrc+')">' +
                                '<i class="icon-cancel-circled"></i>'+
                                '</div>';
                            $('#imgRresult').append(imgHtml);
                            imgCounts++;
                            //删除图片
                            var iboxObj=$('.s-pic-img i');
                            iboxObj.click(function (event) {
                                imgCounts--;
                                $(this).parent().remove();
                            });
                        };
                        reader.readAsDataURL(file.files[0]);
                    }
                }

                //打开文件夹上传图片
                $('#upimginp').change(function(e){

                    //上传不能超过5张图片
                    if(imgCounts>=4) {
                        layer.open({
                            content: '上传图片不能超过4张'
                            ,skin: 'msg'
                            ,time: 2 //2秒后自动关闭
                        });
                        return;
                    }
                    var _this=this;
                    selectImage(_this);
                });
                //点击发表评论
                $("#orderEvaluateBtn").on('click',function(){
                    var imgArrObj=$('.s-pic-img img');
                    var imgBaseArr=[];
                    //评论图片base64
                    for(var i=0;i<imgArrObj.length;i++){
                        imgBaseArr.push(imgArrObj[i].src);
                    }
                    var score = $('.orderEvaluate_score .active').length;

                    if($("#orderEvaluateInp").val()==""){
                        layer.open({
                            content: '请输入评论内容'
                            ,skin: 'msg'
                            ,time: 2 //2秒后自动关闭
                        });
                        $("#orderEvaluateInp").focus();
                        return;
                    }
                    if(score==0){
                        layer.open({
                            content: '请选择星级'
                            ,skin: 'msg'
                            ,time: 2 //2秒后自动关闭
                        });
                        return;
                    }
                    $post('/Tshop/order/doComment',{
                        productID:productId,
                        orderID:orderId,
                        content:$("#orderEvaluateInp").val(),
                        labelId:null,
                        star:score||0,
                        image:imgBaseArr,
                        isshow:$("#niming").is(":checked")
                    }).success(function(req){
                        if(req.code!=200){
                            layer.open({
                                content: req.msg
                                ,skin: 'msg'
                                ,time: 2 //2秒后自动关闭
                            });
                            return;
                        }
                        layer.open({
                            content: req.msg
                            ,skin: 'msg'
                            ,time: 2 //2秒后自动关闭
                        });
                        location.href="/m/myOrder";
                    })
                })
            }
        },{
            //订单详情
            key:"orderDetail",
            value:function orderEvaluate(){
                var url = window.location.search;
                var urlAux = url.split('=');
                var urlId = urlAux[1];

                var lay = layer.open({ type: 2, shadeClose: false });
                $post('/Tshop/order/orderDetail',{id:urlId}).success(function(req){
                    layer.close(lay);
                    if(req.code!=200){
                        layer.open({
                            content: req.msg
                            ,skin: 'msg'
                            ,time: 2 //2秒后自动关闭
                        });
                        return;
                    }
                    var datas = req.data;


                    var html = template('content-tpl', datas);
                    document.getElementById('orderDetail-content').innerHTML = html;
                })
            }
        },{
            //订单物流
            key:'orderLogistic',
            value:function orderEvaluate(){
                var orderId = localStorage.getItem("orderId");
                var expressNo = localStorage.getItem("expressNo");
                var expressName = localStorage.getItem("expressName");
                console.log(orderId,expressNo,expressName);
                var lay = layer.open({ type: 2, shadeClose: false });
                $('.orderLogistic_top').html('快递公司:'+expressName+'　快递单号'+expressNo);

                $post('/Tshop/kuaidi/test',{orderId:orderId}).success(function(req){
                    layer.close(lay);
                    if(req.code!=200){
                        layer.open({
                            content: req.msg
                            ,skin: 'msg'
                            ,time: 2 //2秒后自动关闭
                        });
                        return;
                    }

                    var datas = req.data;

                    if(datas.length==0 || datas==null || datas.length==undefined){
                        $('.logistic_info_list').html("<p style='text-align:center'>暂无物流信息</p>");
                        return;
                    }
                    var logistic_list = $A("logistic_info_list");
                    var logisticUl = $('<ul></ul>');
                    var logisticList="";
                    for(var i=0;i<datas.length;i++){
                        logisticList+="<li>" +
                            "<div class=\"logistic_item\">" +
                            "<p class=\"logistic_info_text\"></p>" +
                            "<p class=\"logistic_info_time\"></p>" +
                            "</div>" +
                            "</li>"

                    }
                    logisticUl.append(logisticList);
                    logistic_list.append(logisticUl);

                })
            }
        },{
            //现金余额买入
            key:'cashdealBuy',
            value:function cashdealBuy(){
                var cashdealBuyNum = document.getElementById("cashdealBuyNum");
                var cashdealBuyMoney = document.getElementById("cashdealBuyMoney");
                $("#cashdealBuyNum").on('input',function(){
                    cashdealBuyMoney.value = cashdealBuyNum.value;
                    // debugger;
                    // if(cashdealBuyMoney.value.length==0){
                    //     $("#nextStep").attr('disabled',true);
                    // }else{
                    //     $("#nextStep").attr('disabled',false);
                    // }
                    // debugger;
                    if( (/^(\+|-)?\d+$/.test( cashdealBuyNum.value ))&&cashdealBuyNum.value>0){
                        $("#nextStep").attr('disabled',false);
                    }else{
                        $("#nextStep").attr('disabled',true);

                    }
                })
                $("#nextStep").on('click',function(){
                    $('.mack').css('display','block');
                    $('.popup_content').css('display','block');
                })
                $(".pay_cancel_btn").on('click',function(){
                    $('.mack').hide();
                    $('.popup_content').hide();
                    $("#pwd-input").val("");
                    $(".fake-box input").val("");
                });
                //6位密碼輸入
                var pwd;
                var $input = $(".fake-box input");
                $("#pwd-input").on("input", function() {
                    pwd = $(this).val().trim();
                    for (var i = 0, len = pwd.length; i < len; i++) {
                        $input.eq("" + i + "").val(pwd[i]);
                    }
                    $input.each(function() {
                        var index = $(this).index();
                        if (index >= len) {
                            $(this).val("");
                        }
                    });
                    if (len == 6) {
                        //执行其他操作
                        $('#subpaypwd').attr('disabled',false);
                    }else{
                        $('#subpaypwd').attr('disabled',true);
                    }
                });

                $("#subpaypwd").on('click',function(){
                    var totalNums = cashdealBuyNum.value;
                    var lay = layer.open({ type: 2, shadeClose: false });
                    $post('/Tshop/businessmoney/buyMoney',{money:totalNums,password:pwd}).success(function(req){
                        layer.close(lay);
                        console.log(req);
                        if(req.code!=200){
                            layer.open({
                                content: req.msg
                                ,skin: 'msg'
                                ,time: 2 //2秒后自动关闭
                            });
                            return;
                        }
                        $('.mack').hide();
                        $('.popup_content').hide();
                        $("#pwd-input").val("");
                        $(".fake-box input").val("");
                        layer.open({
                            content: req.msg
                            ,btn: ['确定']
                            ,yes: function(index){
                                location.href='/m/cashdeal';
                            }
                        });
                    })
                })

            }
        },{
            //现金余额卖出
            key:'cashdealSell',
            value:function cashdealSell(){
                var cashdealSellNum = document.getElementById("cashdealSellNum");
                var cashdealSellMoney = document.getElementById("cashdealSellMoney");
                $("#cashdealSellNum").on('input',function(){

                    cashdealSellMoney.value = cashdealSellNum.value*0.95;
                    if((/^(\+|-)?\d+$/.test( cashdealSellNum.value ))&&cashdealSellNum.value>0){
                        $("#nextStep").attr('disabled',false);
                    }else{
                        $("#nextStep").attr('disabled',true);
                    }
                })
                $("#nextStep").on('click',function(){
                    $('.mack').css('display','block');
                    $('.popup_content').css('display','block');
                })
                $(".pay_cancel_btn").on('click',function(){
                    $('.mack').hide();
                    $('.popup_content').hide();
                    $("#pwd-input").val("");
                    $(".fake-box input").val("");
                });
                //6位密碼輸入
                var pwd;
                var $input = $(".fake-box input");
                $("#pwd-input").on("input", function() {
                    pwd = $(this).val().trim();
                    for (var i = 0, len = pwd.length; i < len; i++) {
                        $input.eq("" + i + "").val(pwd[i]);
                    }
                    $input.each(function() {
                        var index = $(this).index();
                        if (index >= len) {
                            $(this).val("");
                        }
                    });
                    if (len == 6) {
                        //执行其他操作
                        $('#subpaypwd').attr('disabled',false);
                    }else{
                        $('#subpaypwd').attr('disabled',true);
                    }
                });

                $("#subpaypwd").on('click',function(){
                    var totalNums = cashdealSellNum.value;
                    console.log(totalNums);
                    var lay = layer.open({ type: 2, shadeClose: false });
                    $post('/Tshop/businessmoney/sellMoney',{money:totalNums,password:pwd}).success(function(req){
                        layer.close(lay);
                        if(req.code!=200){
                            layer.open({
                                content: req.msg
                                ,skin: 'msg'
                                ,time: 2 //2秒后自动关闭
                            });
                            return;
                        }
                        $('.mack').hide();
                        $('.popup_content').hide();
                        $("#pwd-input").val("");
                        $(".fake-box input").val("");
                        layer.open({
                            content: req.msg
                            ,btn: ['确定']
                            ,yes: function(index){
                                location.href='/m/cashdeal';
                            }
                        });
                    })
                })
            }
        },{
            //设置个人信息
            key:"setInfo",
            value:function setInfo(){
                var lay = layer.open({ type: 2, shadeClose: false });
                getUserInfo(function(result){
                    layer.close(lay);
                    if(result.code!=200){
                        layer.open({
                            content: req.msg
                            ,skin: 'msg'
                            ,time: 2 //2秒后自动关闭
                        });
                        return;
                    }
                    $('.userName').html(result.data.account);
                    $('input[name=nickname]')[0].value=result.data.nickname;
                    $('input[name=trueName]')[0].value = result.data.trueName;
                    $('input[name=bankName]')[0].value = result.data.bankName;
                    $('input[name=bankNo]')[0].value = result.data.bankNo;
                    $('input[name=alipayNum]')[0].value = result.data.alipayNum;
                    $('input[name=wireTel]')[0].value = result.data.wireTel;




                    if($('input[name="trueName"]').val()){
                        $('input[name="trueName"]').attr("readonly",true);
                    }else{
                        $('input[name="trueName"]').attr("readonly",false);
                    }
                });
                $('.set_submitBtn').on('click',function(){
                    console.log($("#userinfoForm").serialize());
                    var lay = layer.open({ type: 2, shadeClose: false });
                    $.post("/Tshop/account/updateSetting", $("#userinfoForm").serialize(), function (req) {
                        layer.close(lay);
                        if(req.code!=200){
                            layer.open({
                                content: req.msg
                                ,skin: 'msg'
                                ,time: 2 //2秒后自动关闭
                            });
                            return;
                        }
                        layer.open({
                            content: req.msg
                            ,btn: ['确定']
                            ,yes: function(index){
                                location.reload();
                            }
                        });
                    })
                });



            }
        },{
            //安全设置
            key:"setSecurity",
            value:function setSecurity(){
                var lay = layer.open({ type: 2, shadeClose: false });
                $('body').css('visibility','hidden');
                getUserInfo(function(result){
                    layer.close(lay);
                    $('body').css('visibility','visible');
                    var tel = result.data.tel;
                    $('.tel').html(tel.substring(0, 3) + "****" + tel.substring(7, 11));
                    localStorage.setItem("tel",tel);
                });
                var setpayHtml="";
                $post('/Tshop/account/checkSecurity').success(function(req){

                    if(req.code!=200){
                        layer.open({
                            content: req.msg
                            ,skin: 'msg'
                            ,time: 2 //2秒后自动关闭
                        });
                        return;
                    }
                    if(req.data.payResult=="n"){
                        setpayHtml="<a href=\"/m/realname\">支付密码<p class=\"setSecurity_text\" style=\"width:80%;\">互联网账号存在被盗风险，建议您定期更改密码以保护账户安全。</p><span class=\"setSecurityText\">立即开启</span></a>"
                    }else{
                        setpayHtml="<a href=\"/m/setPayPassword\">支付密码<p class=\"setSecurity_text\">互联网账号存在被盗风险，建议您定期更改密码以保护账户安全。</p><span class=\"setSecurityText\">修改</span></a>"
                    }
                    $('.setPayPassword').html(setpayHtml);
                })
            }
        },{
            //设置登录密码
            key:"setLoginPassword",
            value:function setLoginPassword(){
                var tel = localStorage.getItem("tel");
                $('.userTel').html(tel.substring(0, 3) + "****" + tel.substring(7, 11));
                //倒计时
                var time=120;
                function settime(val){
                    if(time<0){
                        $("#getCode").removeAttr('disabled');
                        $("#getCode").html('重新获取');
                        time=120;
                    }else{
                        $("#getCode").attr('disabled','true');
                        $("#getCode").html(time+'s');
                        time--;
                        setTimeout(function(){
                            settime(val);
                        },1000)
                    }
                }

                $("#getCode").on('click',function(){
                    var lay = layer.open({ type: 2, shadeClose: false });
                    var _this = $(this);
                    $post('/Tshop/account/getVerifyCode2').success(function(req){
                        layer.close(lay);
                        if(req.code!=200){
                            layer.open({
                                content: req.msg
                                ,skin: 'msg'
                                ,time: 2 //2秒后自动关闭
                            });
                            return;
                        }
                        settime(_this);
                        layer.open({
                            content: req.msg
                            ,skin: 'msg'
                            ,time: 2 //2秒后自动关闭
                        });

                    })
                });
                var codeStust=false;
                $(".set_submitBtn").on('click',function(){

                    if($('input[name=verifyCode]')[0].value.length==0){
                        layer.open({
                            content: '请输入短信验证码'
                            ,skin: 'msg'
                            ,time: 2 //2秒后自动关闭
                        });
                        $('input[name=verifyCode]')[0].focus();
                        return;
                    }
                    if($('input[name=newPassword]')[0].value.length==0){
                        layer.open({
                            content: '请输入新密码'
                            ,skin: 'msg'
                            ,time: 2 //2秒后自动关闭
                        });
                        $('input[name=newPassword]')[0].focus();
                        return;
                    }
                    if($('input[name=newPassword2]')[0].value.length==0){
                        layer.open({
                            content: '请再次输入新密码'
                            ,skin: 'msg'
                            ,time: 2 //2秒后自动关闭
                        });
                        $('input[name=newPassword2]')[0].focus();
                        return;
                    }
                    var lay = layer.open({ type: 2, shadeClose: false });
                    var flag=false;

                   /* $post('/Tshop/account/checkVerify2',{verifyCode:$('input[name=verifyCode]')[0].value}).success(function(req){
                        console.log(req);
                        if(req.code!=200){
                            layer.close(lay);
                            layer.open({
                                content: req.msg
                                ,skin: 'msg'
                                ,time: 2 //2秒后自动关闭
                            });
                            codeStust=false;
                            $('input[name=verifyCode]')[0].focus();
                            return;
                        }

                        //验证码正确
                        flag=true;
                        console.log($("#userLoginPasswordForm").serialize());


                    });*/


                    $.ajax({
                        url: "/Tshop/account/checkVerify2",
                        async: false,
                        method:'post',
                        data:{verifyCode:$('input[name=verifyCode]')[0].value},
                        success:function(req){
                            console.log(req);
                            if(req.code!=200){
                                layer.close(lay);
                                layer.open({
                                    content: req.msg
                                    ,skin: 'msg'
                                    ,time: 2 //2秒后自动关闭
                                });
                                codeStust=false;
                                $('input[name=verifyCode]')[0].focus();
                                return;
                            }

                            //验证码正确
                            flag=true;
                        }
                    });




                    if(true){
                        $.post("/Tshop/account/changePassword",$("#userLoginPasswordForm").serialize(), function(req){
                            layer.close(lay);
                            console.log(req);
                            if(req.code!=200){
                                layer.open({
                                    content: req.msg
                                    ,skin: 'msg'
                                    ,time: 2 //2秒后自动关闭
                                });
                                return;
                            }
                            layer.open({
                                content: '修改登录密码成功，请重新登录！'
                                ,btn: ['确定']
                                ,yes: function(index){
                                    location.href='/m/login';
                                }
                            });
                        })


               /*         $post("/Tshop/account/changePassword", $("#userLoginPasswordForm").serialize(), function (req) {
                            layer.close(lay);
                            console.log(req);
                            if(req.code!=200){
                                layer.open({
                                    content: req.msg
                                    ,skin: 'msg'
                                    ,time: 2 //2秒后自动关闭
                                });
                                return;
                            }
                            layer.open({
                                content: '修改登录密码成功，请重新登录！'
                                ,btn: ['确定']
                                ,yes: function(index){
                                    location.href='/m/login';
                                }
                            });
                        });*/
                    }


                })
            }
        },

            {
                //地址管理
                key:"setAddress",
                value:function setAddress(){
                    var lay = layer.open({ type: 2, shadeClose: false });
                    var addressHtml="";
                    $('.addAddressBtn').on('click',function(){
                        var datas=null;
                        localStorage.setItem("datas",datas);
                        location.href="/m/addAddress";
                    })
                    $post('/Tshop/account/addressList').success(function(req){
                        layer.close(lay);
                        console.log(req);
                        var datas = req.data;

                        console.log(datas.length);
                        var addressLen = datas.length;
                        $("#addressLen").html(addressLen);
                        if(datas.length==0){
                            addressHtml+="<li><p>暂无数据</p></li>";
                            $('.setAddress_list').innerHTML=addressHtml;
                            return;
                        }

                        var editHtml="";

                        function setdefault(dault,id){
                            if(dault=="y"){
                                editHtml = "<input id=\"\" value=\""+id+"\" type=\"radio\" name=\"addressDefault\" checked /><label class=\"color_ff2150\">默认地址</label>"
                            }else{
                                editHtml = "<input id=\"\" value=\""+id+"\" type=\"radio\" name=\"addressDefault\" /><label>设为默认</label>"
                            }
                            return editHtml;
                        }

                        var setDisplayHtml='';
                        function setDisplay(email,phone){

                            if(email==null && phone!=null){
                                setDisplayHtml="<span>固定电话 :"+phone+"</span>";
                            }else if(email!=null && phone==null){
                                setDisplayHtml="<span>邮箱 :"+email+"</span>";
                            }else if(phone!=null && email!=null){
                                setDisplayHtml="<span>邮箱 :"+email+"</span><span style=\"float:right\">固定电话:"+phone+"</span>"
                            }else if(phone==null && email==null){
                                setDisplayHtml="";
                            }
                            return setDisplayHtml;



                        }
                        for(var i=0;i<datas.length;i++){

                            addressHtml+="<li>" +
                                "<div class=\"order_address\">" +
                                "<div class=\"cell\">" +
                                "<div class=\"order_address_info\">" +
                                "<span>收货人:"+datas[i].name+"</span>" +
                                "<span style=\"float:right\">"+datas[i].mobile+"</span>" +
                                "</div>" +
                                "<div class=\"order_address_detail\">" +
                                "<span>"+datas[i].pcadetail+""+datas[i].address+"</span>" +
                                "</div>" +
                                "<div class=\"order_address_info\" style=\"color:#969696;\">"+setDisplay(datas[i].email,datas[i].phone)+"</div>" +
                                "</div>" +
                                "</div>" +
                                "<div class=\"address_operate\">" +
                                "<div class=\"address_default\" >"+setdefault(datas[i].isdefault,datas[i].id)+"</div>" +
                                "<div class=\"address_operateRight\" id="+datas[i].id+">" +
                                "<div class=\"address_operateRight_col address_edit\" data-data="+datas[i].name+"-"+datas[i].province+"-"+datas[i].city+"-"+datas[i].area+"-"+datas[i].address+"-"+datas[i].mobile+"-"+datas[i].phone+"-"+datas[i].email+"-"+datas[i].id+">" +
                                "<i class=\"icon_edit\"></i>" +
                                "<span>编辑</span>" +
                                "</div>" +
                                "<div class=\"address_operateRight_col address_del\">" +
                                "<i class=\"icon_del\"></i>" +
                                "<span>删除</span>" +
                                "</div>" +
                                "</div>" +
                                "</div>" +
                                "</li>";
                        }

                        document.querySelector('.setAddress_list').innerHTML=addressHtml;
                        $('.page_loading').html("加载完成");

                        //设为默认
                        $('.address_default').on('click',function(){

                            //点击默认地址不更改
                            if($(this).text()=='默认地址'){
                                layer.open({
                                    content: '当前地址已经是默认地址'
                                    ,skin: 'msg'
                                    ,time: 2 //2秒后自动关闭
                                });
                                return;
                            }
                            var addRessId= $(this).find('input[name="addressDefault"]').val();
                            console.log(addRessId);
                            var lay = layer.open({ type: 2, shadeClose: false });
                            $post('/Tshop/account/updateDefAddress',{newaddressId:addRessId,isdefault:"y"}).success(function(req){
                                layer.close(lay);
                                console.log(req);
                                if(req.code!=200){
                                    layer.open({
                                        content: req.msg
                                        ,skin: 'msg'
                                        ,time: 2 //2秒后自动关闭
                                    });
                                    return;
                                }
                                location.reload();
                            })

                        })


                        var distFlag=0;
                        $('.address_edit').on('click',function(){

                            distFlag=1;
                            var datas = $(this).attr('data-data');
                            console.log(datas);
                            localStorage.setItem("datas",datas);
                            localStorage.setItem("distFlag",distFlag);

                            location.href="/m/addAddress";
                        })

                        $('.address_del').on('click',function(){
                            var addressId  = $(this).parent(".address_operateRight").attr('id');
                            layer.open({
                                content: '你确定要删除地址？'
                                ,btn: ['确定','取消']
                                ,yes: function(index){
                                    $post('/Tshop/account/deleteAddress',{id:addressId}).success(function(req){
                                        if(req.code!=200){
                                            layer.open({
                                                content: req.msg
                                                ,skin: 'msg'
                                                ,time: 2 //2秒后自动关闭
                                            });
                                            return;
                                        }
                                        layer.open({
                                            content: '删除成功!'
                                            ,btn: ['确定']
                                            ,yes: function(index){
                                                location.reload();
                                                layer.close(index);
                                            }
                                        });
                                    })
                                }
                            });

                        });


                    })

                }
            },
            {
                //添加收货地址
                key:"addAddress",
                value:function addAddress(){



                    function num2e(num){
                        var p = Math.floor(Math.log(num)/Math.LN10);
                        var n = num * Math.pow(10, -p);
                        return n + 'e' + p;
                    }

                    var dataInfo=[];

                    var datas = localStorage.getItem("datas");

                    var distFlag=localStorage.getItem("distFlag");

                    console.log(datas);
                    console.log(distFlag);


                    if(datas!=null){
                        datas=datas.split("-");
                        var province=datas[1],city=datas[2],district=datas[3];

                    }else{
                        datas=datas;
                        var province="",city="",district="";
                    }


                    var nown= window.ChineseDistricts;




                    //编号对应字符

                    var proviceId;
                    for(var key in nown[86]){
                        if(new Number(key+"")==province){
                            province=nown[86][key];
                            proviceId=key;
                        }
                    };

                    var cityId;
                    for(var key in nown[proviceId]){
                        if(key==city){
                            city=nown[proviceId][key];
                            cityId=key;
                        }
                    }

                    var districId;
                    for(var key in nown[cityId]){
                        if(key==district){
                            district=nown[cityId][key];
                            districId=key;
                        }
                    }


                    if(datas==null){
                        $('input[name=name]')[0].value="";
                        $('input[name=address]')[0].value="";
                        $('input[name=mobile]')[0].value="";
                    }else if(datas.length>1){
                        $('input[name=name]')[0].value=datas[0];
                        $('input[name=address]')[0].value=datas[4];
                        $('input[name=mobile]')[0].value=datas[5];
                        $('input[name=id]')[0].value = datas[8];

                        if(datas[6]!="null"){
                            $('input[name=phone]')[0].value = datas[6];
                        }else{
                            $('input[name=phone]')[0].value="";
                        }
                        if(datas[7]!="null"){
                            $('input[name=email]')[0].value = datas[7];
                        }else{
                            $('input[name=email]')[0].value = "";
                        }
                    }



                    if(distFlag==1){
                        console.log("oo");
                        $('#distpicker').distpicker({
                            province: province,
                            city: city,
                            district: district
                        });
                        localStorage.removeItem("distFlag");
                    }else{
                        console.log("pp");
                        var lay = layer.open({ type: 2, shadeClose: false });
                        var i;
                        var r = new BMap.Map("allmap");
                        var c = new BMap.Point(116.331398, 39.897445);
                        var e = void 0, a = void 0, o = void 0;
                        r.centerAndZoom(c, 12), window.addEventListener("error", function (t) {
                            "Script error" !== t.message || i || (i = $("#distpicker"), i.distpicker({
                                province: "北京市",
                                city: "",
                                district: ""
                            }))
                        }), (new BMap.Geolocation).getCurrentPosition(function (t) {
                            this.getStatus() == BMAP_STATUS_SUCCESS ? (e = t.address.province, a = t.address.city, o = t.address.district, i = $("#distpicker"), i.distpicker({
                                province: t.address.province || "北京市",
                                city: t.address.city || "",
                                district: t.address.district || ""
                            })) : alert("failed" + this.getStatus())
                            layer.close(lay);
                        })

                    }




                    $(".save-btn").on("click", function () {

                        var n, e, a, o = $("#province"), i = $("#city"), s = $("#area");
                        o.find("option").each(function () {
                            if ($(this).attr("value") === o.val())return n = $(this).attr("data-code"), !1
                        }), i.find("option").each(function () {
                            if ($(this).attr("value") === i.val())return e = $(this).attr("data-code"), !1
                        }), s.find("option").each(function () {
                            if ($(this).attr("value") === s.val())return a = $(this).attr("data-code"), !1
                        });

                        if($('input[name=name]')[0].value=="" || $('input[name=address]')[0].value=="" || $('input[name=mobile]')[0].value==""){
                            layer.open({
                                content: '请将带*号的字段填写完整'
                                ,btn: '确定'
                            });
                            return;
                        }

                        if($('input[name=mobile]')[0].value.length!=11){
                            layer.open({
                                content: '请填写正确的手机号码'
                                ,btn: '确定'
                            });
                            return;
                        }


                        var datainfo = {
                            name:$('input[name=name]')[0].value,
                            address:$('input[name=address]')[0].value,
                            mobile:$('input[name=mobile]')[0].value,
                            phone:$('input[name=phone]')[0].value,
                            email:$('input[name=email]')[0].value,
                            province:n,
                            city:e,
                            area:a,
                            id:$('input[name=id]')[0].value || null
                        }

                        console.log(datainfo);
                        var lay = layer.open({ type: 2, shadeClose: false });
                        $post("/Tshop/account/addAddress",{
                            name:$('input[name=name]')[0].value,
                            address:$('input[name=address]')[0].value,
                            mobile:$('input[name=mobile]')[0].value,
                            phone:$('input[name=phone]')[0].value,
                            email:$('input[name=email]')[0].value,
                            province:n,
                            city:e,
                            area:a,
                            id:$('input[name=id]')[0].value || null
                        }).success(function(req){
                            layer.close(lay);
                            console.log(req);
                            console.log();
                            var hitText = "";
                            console.log($('input[name=id]')[0].value);

                            if($('input[name=id]')[0].value!=""){
                                hitText = "地址修改成功";
                            }else{
                                hitText = "地址添加成功";
                            }
                            if(req.code!=200){
                                layer.open({
                                    content: req.msg
                                    ,skin: 'msg'
                                    ,time: 2 //2秒后自动关闭
                                });
                                return;
                            }
                            layer.open({
                                content:hitText
                                ,btn: ['确定']
                                ,yes: function(index){
                                    location.href='/m/setAddress';
                                }
                            });
                        })

                    })
                }





            }
            ,{
                //修改支付密码
                key:"setPayPassword",
                value:function setPayPassword(){
                    var tel = localStorage.getItem("tel");
                    $('.userTel').html(tel.substring(0, 3) + "****" + tel.substring(7, 11));
                    //倒计时
                    var time=120;
                    function settime(val){
                        if(time<0){
                            $("#getCode").removeAttr('disabled');
                            $("#getCode").html('重新获取');
                            time=120;
                        }else{
                            $("#getCode").attr('disabled','true');
                            $("#getCode").html(time+'s');
                            time--;
                            setTimeout(function(){
                                settime(val);
                            },1000)
                        }
                    }
                    $("#getCode").on('click',function(){

                        var lay = layer.open({ type: 2, shadeClose: false });
                        var _this = $(this);
                        $post('/Tshop/account/getVerifyCode2').success(function(req){
                            layer.close(lay);
                            if(req.code!=200){
                                layer.open({
                                    content: req.msg
                                    ,skin: 'msg'
                                    ,time: 2 //2秒后自动关闭
                                });
                                return;
                            }
                            settime(_this);
                            layer.open({
                                content: req.msg
                                ,skin: 'msg'
                                ,time: 2 //2秒后自动关闭
                            });

                        })
                    })

                    // var form = $("#userPayPasswordForm");
                    $(".set_submitBtn").on('click',function(){
                        if($('input[name=bankNo]')[0].value.length==0){
                            layer.open({
                                content: '请输入银行账号'
                                ,skin: 'msg'
                                ,time: 2 //2秒后自动关闭
                            });
                            $('input[name=bankNo]')[0].focus();
                            return;
                        }
                        if($('input[name=cardNo]')[0].value.length==0){
                            layer.open({
                                content: '请输入身份证号码'
                                ,skin: 'msg'
                                ,time: 2 //2秒后自动关闭
                            });
                            $('input[name=cardNo]')[0].focus();
                            return;
                        }
                        if($('input[name=vcode]')[0].value.length==0){
                            layer.open({
                                content: '请输入验证码'
                                ,skin: 'msg'
                                ,time: 2 //2秒后自动关闭
                            });
                            $('input[name=vcode]')[0].focus();
                            return;
                        }
                        if($('input[name=payPassWord]')[0].value.length==0){
                            layer.open({
                                content: '请输入新的支付密码'
                                ,skin: 'msg'
                                ,time: 2 //2秒后自动关闭
                            });
                            $('input[name=payPassWord]')[0].focus();
                            return;
                        }
                        if($('input[name=payPassWord2]')[0].value.length==0){
                            layer.open({
                                content: '请再次输入新的支付密码'
                                ,skin: 'msg'
                                ,time: 2 //2秒后自动关闭
                            });
                            $('input[name=payPassWord2]')[0].focus();
                            return;
                        }

                        if($('input[name=payPassWord2]')[0].value!=$('input[name=payPassWord]')[0].value){
                            layer.open({
                                content: '两次密码输入不一致'
                                ,skin: 'msg'
                                ,time: 2 //2秒后自动关闭
                            });
                            $('input[name=payPassWord2]')[0].focus();
                            return;
                        }
                        var lay = layer.open({ type: 2, shadeClose: false });

                        console.log($('input[name=bankNo]')[0].value);
                        console.log($('input[name=cardNo]')[0].value);
                        console.log($('input[name=vcode]')[0].value);
                        //6217003610003991673
                        $post('/Tshop/account/verifyIdentity',{
                            bankNo:$('input[name=bankNo]')[0].value,
                            cardNO:$('input[name=cardNo]')[0].value,
                            vcode:$('input[name=vcode]')[0].value
                        }).success(function(req){
                            console.log(req);
                            if(req.code!=200){
                                layer.close(lay);
                                layer.open({
                                    content: req.msg
                                    ,skin: 'msg'
                                    ,time: 2 //2秒后自动关闭
                                });
                                return;
                            }
                            console.log($("#userPayPasswordForm").serialize());
                            $post("/Tshop/account/changePayPsw", $("#userPayPasswordForm").serialize(), function (changePayPswReq) {
                                console.log(changePayPswReq);
                                layer.close(lay);
                                if(changePayPswReq.code!=200){
                                    layer.open({
                                        content: changePayPswReq.msg
                                        ,skin: 'msg'
                                        ,time: 2 //2秒后自动关闭
                                    });
                                    return;
                                }
                                layer.open({
                                    content: '支付密码修改成功'
                                    ,btn: ['确定']
                                    ,yes: function(index){
                                        location.href='/m/setSecurity';
                                    }
                                });
                            })
                        })

                    })

                }
            },{
                //实名制
                key:"setUp",
                value:function setUp(){
                    var setRealname;
                    console.log("pp");
                    var lay = layer.open({ type: 2, shadeClose: false });
                    $post('/Tshop/account/checkSecurity').success(function(req){
                        layer.close(lay);
                        if(req.code!=200){
                            layer.open({
                                content: req.msg
                                ,skin: 'msg'
                                ,time: 2 //2秒后自动关闭
                            });
                            return;
                        }
                        if(req.data.payResult=="n"){
                            setRealname="<a href=\"/m/realname\">实名制管理</a>"
                        }else{
                            setRealname="<a href=\"/m/realnameSuccess\">实名制管理</a>"
                        }
                        $('.userRealname').html(setRealname);
                    })
                    $("#loginOut").on('click',function(){
                        layer.open({
                            content: '确定退出登录？'
                            ,btn: ['确定','取消']
                            ,yes: function(index){
                                location.href='/logout?path=/personal/realname';
                            }
                        });
                    })
                }
            },{
                //我的收藏
                key:"myCollection",
                value:function myCollection(){
                    var lay = layer.open({ type: 2, shadeClose: false });
                    var collectionList='';

                    $post('/Tshop/account/listFavoriteProduct').success(function(req){
                        layer.close(lay);
                        console.log(req);
                        if(req.code!=200){
                            layer.open({
                                content: req.msg
                                ,skin: 'msg'
                                ,time: 2 //2秒后自动关闭
                            });
                            return;
                        }

                        var datas = req.data;

                        for( var i=0;i<datas.listProduct.length;i++ ){
                            collectionList+="<div class=\"xq-container\">" +
                                "<div class=\"list-item\">" +
                                "<div class=\"list-left\">" +
                                "<a style=\"display:block\" href=\"/m/detailOnly?id="+datas.listProduct[i].id+"\">" +
                                "<div class=\"list-img\" style=\"background: url("+datas.listProduct[i].images+");background-repeat: no-repeat;background-size: cover;\"></div>" +
                                "</a>" +
                                "</div>" +
                                "<div class=\"list-right\">" +
                                "<div class=\"list-text-box\">" +
                                "<div class=\"list-text-title\">" +
                                "<a style=\"display:block\" href=\"/m/detailOnly?id=11850\">"+datas.listProduct[i].name+"</a>" +
                                "</div>" +
                                "<div class=\"list-bao-box\">" +
                                "<span class=\"list-new mr5\">￥"+datas.listProduct[i].nowPrice+"</span>" +
                                "<del>￥"+datas.listProduct[i].price+"</del>" +
                                "<span>月销量　"+datas.listProduct[i].sellcount+"</span>" +
                                "</div>" +
                                "<div class=\"list-price\">" +
                                "<div class=\"fl color_2b\">" +
                                "<a class=\"appoint-buybtn addCar\" href=\"/m/detailOnly?id="+datas.listProduct[i].id+"\">查看详情</a>" +
                                "</div>" +
                                "<div class=\"fr\">" +
                                "<button class=\"appoint-buybtn collectionCancel\" dataId="+datas.listProduct[i].id+">取消收藏</button>" +
                                "</div>" +
                                "</div>" +
                                "</div>" +
                                "</div>" +
                                "</div>" +
                                "</div>";


                        }
                        document.querySelector('#appoint_list').innerHTML = collectionList;

                        $('.appoint-buybtn.collectionCancel').on('click',function(){
                            var  goodsId = $(this).attr('dataId');
                            console.log(goodsId);

                            $post('/Tshop/product/cancelCollection',{productID:goodsId}).success(function(req){
                                console.log(req);

                                if(req.code!=200){
                                    layer.open({
                                        content: req.msg
                                        ,skin: 'msg'
                                        ,time: 2 //2秒后自动关闭
                                    });
                                    return;
                                }
                                location.reload();

                            })

                        });

                    })

                }
            },{
                //我收藏的线下商铺
                key:"myCollectionShops",
                value:function myCollectionShops(){
                    var lay = layer.open({ type: 2, shadeClose: false });
                    var collectionList='';
                    $post('/Tshop/account/listFavoriteStore').success(function(req){
                        layer.close(lay);
                        console.log(req);
                        if(req.code!=200){
                            layer.open({
                                content: req.msg
                                ,skin: 'msg'
                                ,time: 2 //2秒后自动关闭
                            });
                            return;
                        }
                        var datas = req.data;

                        for( var i=0;i<datas.length;i++ ){
                            collectionList+="<div class=\"xq-container\">" +
                                "<div class=\"list-item\">" +
                                "<div class=\"list-left\">" +
                                "<a style=\"display:block\" href=\"/m/detailOnly?id="+datas[i].id+"\">" +
                                "<div class=\"list-img\" style=\"background: url("+datas[i].maxPicture+");background-repeat: no-repeat;background-size: cover;\"></div>" +
                                "</a>" +
                                "</div>" +
                                "<div class=\"list-right\">" +
                                "<div class=\"list-text-box\">" +
                                "<div class=\"list-text-title\">" +
                                "<a style=\"display:block\" href=\"/m/detailOnly?id=11850\">"+datas[i].storename+"</a>" +
                                "</div>" +
                                "<div class=\"list-bao-box\">"+datas[i].storeAddress+"</div>" +
                                "<div class=\"list-price\">" +
                                "<div class=\"fl color_2b\">" +
                                "<a class=\"appoint-buybtn addCar\" href=\"/m/detail?id="+datas[i].id+"\">查看详情</a>" +
                                "</div>" +
                                "<div class=\"fr\">" +
                                "<button class=\"appoint-buybtn collectionCancel\" dataId="+datas[i].id+">取消收藏</button>" +
                                "</div>" +
                                "</div>" +
                                "</div>" +
                                "</div>" +
                                "</div>" +
                                "</div>";

                        }
                        document.querySelector('#appoint_list').innerHTML = collectionList;

                        $('.appoint-buybtn.collectionCancel').on('click',function(){
                            var  goodsId = $(this).attr('dataId');

                            $post('/Tshop/product/cancleStore',{storeIds:goodsId}).success(function(req){
                                console.log(req);

                                if(req.code!=200){
                                    layer.open({
                                        content: req.msg
                                        ,skin: 'msg'
                                        ,time: 2 //2秒后自动关闭
                                    });
                                    return;
                                }
                                location.reload();

                            })

                        });
                    })
                }
            },

            {
                //增值券卖出模块
                key:"sellfund",
                value:function sellfund(e) {
                    var userId=localStorage.getItem('userId');
                    function check_all(obj, cName) {


                        var checkboxs = document.getElementsByName(cName);
                        for ( var i = 0; i < checkboxs.length; i+=1) {
                            checkboxs[i].checked = obj.checked;
                        }
                    }
                    var page_size=5; //每页显示条数
                    var pluginId=1;
                    var cPage=1;
                    $('#loadinging').show();
                    loadData(page_size,cPage,pluginId);

                    function loadData(page_size,cPage,pluginId) {
                        //loading层
                        layer.open({type: 2});
                        $.post('https://www.egomalls.cn/user/layerData',{userId:userId,pageSize:page_size,pageNo:cPage},function (res) {


                            var dataArr=res.data.buys;

                           // for(var i=(cPage-1)*page_size;i<(dataArr.length)*cPage;i++){

                                for(var i=0;i<dataArr.length;i++){
                                //计算出售百分比

                                //卖出预警显示大于0的显示红色
                                var warnFlag;
                                if(dataArr[i].yjPi>0){
                                    warnFlag='warn-red';
                                }else {
                                    warnFlag='warn-black';
                                }
                                var ksMoney=dealNum(dataArr[i].ksNum*0.13);
                                var ysMoney=dealNum(dataArr[i].sellNum*0.13);

                                var sellWarn=(Math.round(parseFloat(dataArr[i].yjPi) * 10000)/100).toFixed(2) + '%';//转换为百分比
                                var check='check';

                                var feeFundHtml='<div class="fee-all-item">'+
                                '                   <div class="checkboxFour in-check-box">'+
                                '                       <input type="checkbox" value="1" id="checkbox-lone'+i+'" name="check">'+
                                '                       <label for="checkbox-lone'+i+'"></label>'+
                                '                   </div>'+
                                '                   <div class="fee-one">'+
                                '                       <div class="fee-one-l fee-one-spec">'+
                                '                           <p class="fee-num-p">'+dealNum(dataArr[i].ePoint)+'</p>'+
                                '                           <p class="fee-num-p">e点数量</p>'+
                                '                       </div>'+
                                '                       <div class="fee-one-r">'+
                                '                           <p class="fee-num-p">'+dealNum(dataArr[i].currentFundNum)+'</p>'+
                                '                           <p class="fee-num-p">当前份数</p>'+
                                '                       </div>'+
                                '                   </div>'+
                                '                   <div class="fee-one">'+
                                '                       <div class="fee-one-l">'+
                                '                           <p class="fee-num-p '+warnFlag+'">'+sellWarn+'</p>'+
                                '                           <p class="fee-num-p item-thr-bg-new">卖出预警</p>'+
                                '                       </div>'+
                                '                       <div class="fee-one-r">'+
                                '                           <select name="sellPercent" id="sellPercent'+i+'" class="fee-num-p fee-red">'+
                                '                               <option id="selet0" value="0">0</option>'+
                                '                               <option id="selet1" value="0.1">10%</option>'+
                                '                               <option id="selet2" value="0.2">20%</option>'+
                                '                               <option id="selet3" value="0.3">30%</option>'+
                                '                               <option id="selet4" value="0.4">40%</option>'+
                                '                               <option id="selet5" value="0.5">50%</option>'+
                                '                               <option id="selet6" value="0.6">60%</option>'+
                                '                               <option id="selet7" value="0.7">70%</option>'+
                                '                               <option id="selet8" value="0.8">80%</option>'+
                                '                               <option id="selet9" value="0.9">90%</option>'+
                                '                               <option id="selet10" value="1">100%</option>'+
                                '                           </select>'+
                                '                           <p>出售百分比</p>'+
                                '                       </div>'+
                                '                   </div>'+
                                '                   <div class="fee-one">'+
                                '                       <div class="fee-one-l fee-num-p">可售份数</div>'+
                                '                       <div class="fee-one-r fee-num-p"><span class="fee-sell-w">'+dealNum(dataArr[i].ksNum)+'</span><span>&nbsp;('+ksMoney+'元)</span></div>'+
                                '                   </div>'+
                                '                   <div class="fee-one">'+
                                '                       <div class="fee-one-l fee-num-p">已售份数</div>'+
                                '                       <div class="fee-one-r fee-num-p"><span class="fee-sell-w">'+dealNum(dataArr[i].sellNum)+'</span><span>&nbsp;('+ysMoney+'元)</span></div>'+
                                '                   </div>'+
                                '                   <button onclick="sellOne(this)">卖出</button>'+
                                '                   <input type="hidden" id="'+'rowhide'+i+'"  value="'+dataArr[i].orderId+'">'+
                                '               </div>';


                                /*var feeFundHtml1=' <div class="fee-all-item" id="feeItem'+i+'">'+
                                    '                <div class="all-item-up">'+
                                    '                    <div class="item-one">'+
                                    '                        <div class="checkboxFour in-check-box">'+
                                    '                            <input type="checkbox" value="1" id="checkbox-lone'+i+'" name="check" />'+
                                    '                            <label for="checkbox-lone'+i+'"></label>'+
                                    '                        </div>'+
                                    '                        <div class="in-title-box">'+
                                    '                            <span>e点</span>'+
                                    '                            <span class="epoint-box">'+dataArr[i].ePoint+'</span>'+
                                    '                        </div>'+
                                    '                    </div>'+
                                    '                    <div class="item-two">'+
                                    '                        <span>可售份数</span>'+
                                    '                        <span>'+dataArr[i].ksNum+'</span>'+
                                    '                    </div>'+
                                    '                    <div class="item-three item-thr-bg">'+
                                    '                        <span>卖出预警</span>'+
                                    '                        <span class="'+warnFlag+'">'+sellWarn+'</span>'+
                                    '                    </div>'+
                                    '                    <div style="clear: both;"></div>'+
                                    '                </div>'+
                                    '                <div class="all-item-down">'+
                                    '                    <div class="item-one">'+
                                    '                        <p class="fee-num fee-num-title">'+dataArr[i].currentFundNum+'</p>'+
                                    '                        <p>当前份数</p>'+
                                    '                    </div>'+
                                    '                    <div class="item-two">'+
                                    '                        <p class="fee-num">'+dataArr[i].sellNum+'</p>'+
                                    '                        <p>已出售</p>'+
                                    '                    </div>'+
                                    '                    <div class="item-three">'+
                                    '                        <select name="sellPercent" id="sellPercent'+i+'" class="fee-num">'+
                                    '                            <option id="selet0" value="0">0</option>'+
                                    '                            <option id="selet1" value="0.1">10%</option>'+
                                    '                            <option id="selet2" value="0.2">20%</option>'+
                                    '                            <option id="selet3" value="0.3">30%</option>'+
                                    '                            <option id="selet4" value="0.4">40%</option>'+
                                    '                            <option id="selet5" value="0.5">50%</option>'+
                                    '                            <option id="selet6" value="0.6">60%</option>'+
                                    '                            <option id="selet7" value="0.7">70%</option>'+
                                    '                            <option id="selet8" value="0.8">80%</option>'+
                                    '                            <option id="selet9" value="0.9">90%</option>'+
                                    '                            <option id="selet10" value="1">100%</option>'+
                                    '                        </select>'+
                                    '                        <p>售出百分比</p>'+
                                    '                    </div>'+
                                    '                    <div style="clear: both"></div>'+
                                    '                </div>'+
                                    '              <button onclick="sellOne(this)">卖出</button>'+
                                    '                 <input type="hidden" id="'+'rowhide'+i+'" value="'+dataArr[i].orderId+'"/>'+
                                    '            </div>';*/


                                $('.fee-all-content').append(feeFundHtml);//渲染到body中



                                //下拉框默认选中值
                                if(dataArr[i].nextSellRecod==0){//当预警值为0时，默认出售百分比选中10%

                                    display(0,i);
                                }else {
                                    display(Math.ceil(dataArr[i].yjPi*10),i);
                                }
                                //下拉框选中值发生改变发起请求
                                //optionChange(i);

                                //每行注册checkbox点击事件
                                $('#checkbox-lone'+i).click(function (e) {
                                    var nowboxs = document.getElementsByName('check').length;

                                    if( $(this).prop('checked')==true){
                                        counts++;
                                        if(counts==nowboxs){ //如果全部选择则全选中
                                            $("#checkboxFourInput").prop('checked',true);
                                        }
                                    }else {
                                        counts--;
                                        if(counts!=nowboxs){ //如果不全部选择则不全选中
                                            $("#checkboxFourInput").prop('checked',false);
                                        }
                                    }
                                });
                            }

                            //如果数据已经全部显示就不在加载
                            if(res.data.page.totalNum<=$('.fee-all-item').length){
                                $('#loadMore').text('已到底了！');
                            }
                            //关闭加载loading
                            layer.closeAll();
                            //全选逻辑
                            var counts=0;
                            $('#checkboxFourInput').click(function (e) {

                                var checkboxs = document.getElementsByName('check');

                                if($(this).prop('checked')){
                                    //$(':checkbox').attr('checked',false);
                                    for(var i=0;i<checkboxs.length;i++){
                                        checkboxs[i].checked = true;
                                    }

                                    if(res.allPageCount>=5){
                                        counts=page_size*cPage;
                                    }else {

                                        counts=res.allPageCount;
                                    }

                                }else{
                                    for(var i=0;i<checkboxs.length;i++){
                                        checkboxs[i].checked = false;
                                    }
                                    counts=0;
                                }
                            });

                            //隐藏加载中
                            $('#loadinging').hide();


                        });
                    }

                    //点击加载更多 加载跟多数据
                    $('#loadMore').click(function (e) {

                        cPage++;
                        loadData(page_size,cPage,pluginId);
                    });

                }


            }



        ]);
        return Mb;
    }();

    var mb = new Mb();
    var ctrl = $('[y-ctrl]').attr('y-ctrl');
    if (mb[ctrl]) {
        mb[ctrl]();
    }
    window.addEventListener("load", function () {
        lclick.$on();
        lbind.$on();
        levent.$on();
    });

    $("[data-href]").on("click", function () {
        location.href = this.getAttribute("data-href");
    });


})();


var rowID=[];
var pwd;
//单行卖出
function sellOne(e) {

    var orderId=$(e).next().val();

    rowID.push({orderId:orderId,pi:$(e).parent().find('select').val()});

    //弹出支付密码框
    $('.mack').show();
    $('.popup_content').show();

    //6位密碼輸入
    //var pwd;
    var $input = $(".fake-box input");
    $("#pwd-input").on("input", function() {
        pwd = $(this).val().trim();
        for (var i = 0, len = pwd.length; i < len; i++) {
            $input.eq("" + i + "").val(pwd[i]);
        }
        $input.each(function() {
            var index = $(this).index();
            if (index >= len) {
                $(this).val("");
            }
        });
        if (len == 6) {
            //执行其他操作
            $('#sellfundSbmit').attr('disabled',false);
        }else{
            $('#sellfundSbmit').attr('disabled',true);
        }
    });
    $(".pay_cancel_btn").on('click',function(){
        $('.mack').hide();
        $('.popup_content').hide();
        $("#pwd-input").val("");
        //清空rowID数组

        rowID.length=0;
    });

}



//卖出选中

function sellAllCheck(){

    var checks= $('.fee-all-content').find('input[type="checkbox"]');


    var flagch=false;
    for(var j=0;j<checks.length;j++){

        if(checks[j].checked==true){
            flagch=true;
        }

    }

    if(!flagch){

        layer.open({
            content: "请至少选中一条增值券数据！"
            ,skin: 'msg'
            ,time: 2 //2秒后自动关闭
        });
        return;
    }

    //获取当前table的所有选中行对象
    var orderIdArr=[];

    for(var i=0;i<checks.length;i++){

        var orderObj={};

        if($('#checkbox-lone'+i).prop('checked')){

            orderObj['orderId']=$('#rowhide'+i).val();

            orderObj['pi']=$('#sellPercent'+i).val();
            rowID.push(orderObj);
        }
    }


    $('.mack').show();
    $('.popup_content').show();


    //6位密碼輸入

    var $input = $(".fake-box input");
    $("#pwd-input").on("input", function() {
        pwd = $(this).val().trim();
        for (var i = 0, len = pwd.length; i < len; i++) {
            $input.eq("" + i + "").val(pwd[i]);
        }
        $input.each(function() {
            var index = $(this).index();
            if (index >= len) {
                $(this).val("");
            }
        });
        if (len == 6) {
            //执行其他操作
            $('#sellfundSbmit').attr('disabled',false);
        }else{
            $('#sellfundSbmit').attr('disabled',true);
        }
    });
    $(".pay_cancel_btn").on('click',function(){
        $('.mack').hide();
        $('.popup_content').hide();
        $("#pwd-input").val("");
        //清空rowID数组

        rowID.length=0;
    });

}


$("#sellfundSbmit").on('click',function(){
    var userId=localStorage.getItem('userId');
    var data={userId:userId,payPassword:pwd,json: JSON.stringify(rowID)};
    var lay = layer.open({ type: 2, shadeClose: false });
    $post('https://www.egomalls.cn/user/sellEFund',data).success(function(req){

        layer.close(lay);
        console.log(req);
        if(req.code!=200){
            layer.open({
                content: req.msg
                ,skin: 'msg'
                ,time: 2 //2秒后自动关闭
            });
            return;
        }
        $('.mack').hide();
        $('.popup_content').hide();
        $("#pwd-input").val("");
        $(".fake-box input").val("");
        layer.open({
            content: req.msg
            ,btn: ['确定']
            ,yes: function(index){
                location.href='/m/sellfund';
            }
        });
    })
});


/*function optionChange(rowNum) {
 //下拉框值发生改变发起请求
 $('#sellPercent'+rowNum).change(function (event) {

 var ID=$('#rowhide'+rowNum).val();
 var reqData={orderId:ID};
 reqData.amount= $(this).children('option:selected').val();
 $.post('/Tshop/fund/updateSellFundAmount',reqData,function (response) {
 console.log(response);
 });


 })

 };*/
//根据预警值计算出售百分比默认选中的值
function display(optionID,rowNum){
    var all_options = document.getElementById("sellPercent"+rowNum).options;
    if(all_options[optionID].selected===false||true){
        all_options[optionID].selected=true;
    }
}

//只保留小数点后两位非四舍五入
function dealNum(num) {
 num=num+'';
 if(num.indexOf('.')<0){//没有小数点
 num=num+'.00';
 }else if(num.substring(num.indexOf('.')).length>=3){ //小数点后超过两位
 num=num.substring(0,num.indexOf('.')+3);
 }else if(num.substring(num.indexOf('.')).length==2) {//小数点后只有一位
 num=num+'0';
 }
 return  num;
 };


