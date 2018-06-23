<template>
    <div class="l_login">
        <div class="l_logoBox">
            <img class="l_logo_img" src="./img/logo.png" alt="图片不见了"/>
        </div>
        <div class="l_loginStyle">
            <div :class="is_mobile?'l_loginStyle_active':''" v-on:click="is_mobile=true">短信登录</div>
            <div :class="is_mobile?'':'l_loginStyle_active'" v-on:click="is_mobile=false">密码登录</div>
        </div>
        <form class="l_loginForm" v-show="is_mobile">
            <section style="position: relative">
                <input type="text" class="l_username l_input" v-model="phone" v-on:input="isPhone" placeholder="手机号"/>
                <span class="l_username_label" v-on:click="mobile_send_code">获取验证码</span>
            </section>
            <section class="l_passwordBox">
                <input type="text" class="l_password l_input" v-model="validate_code" placeholder="验证码" />
            </section>
            <section class="l_username_tips">
                温馨提示：未注册饿了么帐号的手机号，登录时将自动注册，且代表您已同意
                <a href="https://h5.ele.me/service/agreement/">《用户服务协议》</a>
            </section>
            <section>
                <div class="l_button" v-on:click="login_by_mobile">登录</div>
            </section>
        </form>
        <form class="l_loginForm" v-show="!is_mobile">
            <section>
                <input v-model="username" type="text" class="l_username l_input" placeholder="手机号/邮箱/用户名"/>
            </section>
            <section class="l_passwordBox">
                <input v-model="password" type="password" class="l_password l_input" placeholder="密码" />
                <div class="l_showPassword" v-on:click="showABC">
                    <div class="l_showPassword_text l_showPassword_defaultText">...</div>
                    <div class="l_showPassword_text l_showPassword_ShowText" :style="is_showABC&&'opacity:1'">abc</div>
                    <div class="l_showPassword_btn" :style="is_showABC&&'left:25px'"></div>
                </div>
            </section>
            <section class="l_user_yanzheng" v-if="user_captcha">
                <input v-model="user_captcha_value" type="text" class="l_user_yanzheng_input l_input" placeholder="验证码" />
                <img class="l_yanzheng_img l_user_yanzheng_img" src="" alt="图片不见了" v-on:click="captchas(username)"/>
                <span class='l_user_yanzheng_text' v-on:click="captchas(username)">看不清换一张</span>
            </section>
            <section>
                <div class="l_button" v-on:click="user_login">登录</div>
            </section>
        </form>
        <a href="https://h5.ele.me/service/about/" class="l_learnMore">关于我们</a>

        <div class="l_yanzhengBox" v-if="is_mobile">
            <div class="l_yanzheng">
                <h3 class="l_yanzheng_title">请填写图形验证码</h3>
                <div class="l_yanzheng_inputBox">
                    <input class="l_yanzheng_input" v-model="captcha_value" type="text"/>
                    <img class="l_yanzheng_img" src="" alt="图片不见了" v-on:click="captchas(phone)"/>
                </div>
                <p class="l_yanzheng_error" v-if="yanzheng_error">图形验证码错误，请重新输入</p>
                <div class="l_yanzheng_btn">
                    <div class="l_yanzheng_btn_cache" v-on:click="captchas_cache">
                        取消
                    </div>
                    <div class="l_yanzheng_btn_enter" v-on:click="captchas_enter">
                        确定
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'login',
        data(){
            return {
                is_showABC:'',
                is_mobile:true,
                phone:'',
                validate_token:'',
                validate_code:'',
                captcha_hash:'',
                captcha_value:'',
                is_send:false,
                yanzheng_error:false,
                username:'',
                password:'',
                user_captcha_value:'',
                user_captcha:false,
            }
        },
        mounted(){
        },
        methods:{
            captchas_enter(){
                let data = {
                    captcha_hash:this.captcha_hash,
                    captcha_value:this.captcha_value,
                    mobile:this.phone,
                };

                //发送图形验证码结果，成功即发送短信
                $.ajax({
                    type: "POST",
                    url: "userLogin/mobile_send_code",
                    contentType: "application/json; charset=utf-8",
                    data: JSON.stringify(data),
                    dataType: "json",
                    success: message=>{
                        if(!message.message){
                            this.validate_token = message.validate_token;

                            this.captchas_cache();
                            this.is_send = true;//验证码已发送  改变发送状态

                            let time = 30;
                            let box = $('.l_username_label');

                            box.text(`已发送(${time})`).css('color','#ccc');
                            let interval = '';

                            let jishi=()=>{
                                if(time>0){
                                    box.text(`已发送(${--time})`);
                                }else{
                                    clearInterval(interval);
                                    box.text('重新发送').css('color','#2395ff');
                                }
                            };

                            interval = setInterval(jishi,1000);
                        }else{
                            //验证码输入错误
                            this.captchas();
                            this.yanzheng_error = true;
                        }
                    },
                })
            },//确认验证码
            captchas_cache(){
                let box = $('.l_yanzhengBox');
                box.stop().animate({
                    'opacity':'0'
                },300,()=>{
                    box.css('display','none');
                });
            },//取消输入验证码
            showABC(){
                if(this.is_showABC){
                    this.is_showABC = '';
                    $('.l_password').eq(1).attr('type','password');
                }else{
                    this.is_showABC = true;
                    $('.l_password').eq(1).attr('type','text');
                }
            },
            user_login(){
                if(!this.username.trim()){
                    alert('请输入帐号');
                    return false;
                }

                if(!this.password.trim()){
                    alert('请输入密码');
                    return false;
                }

                let data = {
                    captcha_hash:this.captcha_hash,
                    captcha_value:this.user_captcha_value,
                    password:this.password,
                    username:this.username,
                };
                $.ajax({
                    type: "POST",
                    url: "userLogin",
                    contentType: "application/json; charset=utf-8",
                    data: JSON.stringify(data),
                    dataType: "json",
                    success: message=>{
                        if(!message.message){
                            localStorage.setItem('user_id',message);
                            this.$router.push('/wode');
                        }else{
                            if(message.message == '账户存在风险,需要图形验证码'){
                                this.user_captcha = true;
                                this.captchas(this.username);
                            }else{
                                alert('为了更好的保障您的账号安全，请使用短信登录');
                                this.is_mobile = true;
                            }
                        }
                    },
                })
            },//用户使用帐号密码登录
            isPhone(){
                let box = $('.l_username_label');
                box.css('color','#ccc');
                if(!this.is_send){
                    if(/^1[34578]\d{9}$/.test(this.phone)){
                        box.css('color','#2395ff');
                        return true;
                    }else{
                        return false;
                    }
                }
            },//正则判断是否是正确手机号
            captchas(str){
                //需要显示验证码,获取验证码图片
                let data = {
                    captcha_str:str,
                };

                //发送请求获取图形验证码
                $.ajax({
                    type: "POST",
                    url: "captchas",
                    contentType: "application/json; charset=utf-8",
                    data: JSON.stringify(data),
                    dataType: "json",
                    success: message=>{
                        //将图片显示出来
                        let box = $('.l_yanzhengBox');
                        box.css('display','flex');
                        box.stop().animate({
                            'opacity':'1'
                        },300);

                        $('.l_yanzheng_img').attr('src',message.captcha_image);
                        this.captcha_hash = message.captcha_hash;
                    },
                });
            },//获取图形验证码
            mobile_send_code(){
                if(!this.is_send){
                    let data = {
                        captcha_hash:this.captcha_hash,
                        captcha_value:this.captcha_value,
                        mobile:this.phone,
                    };

                    //发送短信验证请求
                    $.ajax({
                        type: "POST",
                        url: "userLogin/mobile_send_code",
                        contentType: "application/json; charset=utf-8",
                        data: JSON.stringify(data),
                        dataType: "json",
                        success: message=>{
                            if(!message.message){
                                //如果没有风险即会收到短信，将短信哈希保存
                                this.validate_token = message.validate_token;

                                //暂时不可点击
                                this.is_send = true;

                                let time = 30;
                                let box = $('.l_username_label');

                                box.text(`已发送(${time})`).css('color','#ccc');
                                let interval = '';

                                let jishi=()=>{
                                    if(time>0){
                                        box.text(`已发送(${--time})`);
                                    }else{
                                        clearInterval(interval);
                                        box.text('重新发送').css('color','#2395ff');
                                    }
                                };

                                interval = setInterval(jishi,1000);
                            }else{
                                //如果有风险，即获取图形验证码
                                this.captchas();
                            }
                        },
                    })

                }
            },//获取验证码
            login_by_mobile(){
                if(!(/^1[34578]\d{9}$/.test(this.phone))){
                    alert('请输入正确的手机号');
                    return false;
                }

                if(this.is_send){
                    let data = {
                        mobile:this.phone,
                        validate_code:this.validate_code,
                        validate_token:this.validate_token,
                    };

                    //发送手机号登录请求
                    $.ajax({
                        type: "POST",
                        url: "userLogin/login_by_mobile",
                        contentType: "application/json; charset=utf-8",
                        data: JSON.stringify(data),
                        dataType: "json",
                        success: message=>{
                            if(!message.message){
                                //登录成功即保存内容
                                localStorage.setItem('user_id',message);
                                this.$router.push('/wode');
                            }else{
                                alert(message.message);
                            }
                        },
                    })
                }else{
                    alert('未获取验证码');
                }
            },//手机号登录
        },
    }
</script>

<style>

    /* 验证框 */
    .l_yanzheng_error:before{
        content:'!';
        font-weight: bold;
    }
    .l_yanzheng_error{
        position: absolute;
        top:130px;
        left:15px;
        text-align: left;
        font-size:.65rem;
        color:#ff6000;
    }
    .l_yanzheng_btn_enter{
        flex: 1;
        border-left: 1px solid #ddd;
        color:#3190e8;
    }
    .l_yanzheng_btn_cache{
        flex: 1;
    }
    .l_yanzheng_btn{
        display: flex;
        height:54px;
        border-top: 1px solid #ddd;
        line-height: 54px;
    }
    .l_yanzheng_title{
        margin-top:22px;
    }
    .l_yanzheng_inputBox{
        display: flex;
        align-items: center;
        justify-content: center;
        width: 289px;
        height:47px;
        margin: 26px 15px;
        background-color: #fff;
    }
    .l_yanzheng_input{
        width:168px;
        height:47px;
        border:none;
    }
    .l_yanzheng_img{
        width:110px;
        height:37px;
        margin: 5px;
    }
    .l_yanzheng{
        position: relative;
        text-align: center;
        width:320px;
        height:207px;
        background: hsla(0,0%,100%,.9);
        border-radius: 6px;
    }
    .l_yanzhengBox{
        opacity: 0;
        display: none;
        align-items: center;
        justify-content: center;
        position: absolute;
        top:0;
        left:0;
        width:100%;
        height:100%;
        background-color: rgba(0,0,0,.4);
    }

    /* 关于我们 */
    .l_learnMore{
        display: block;
        margin-top:.8rem;
        text-align: center;
        font-size:.5rem;
        color:#999;
    }

    /* 短信框 */
    .l_username_label{
        position: absolute;
        top:15px;
        right:10px;
        font-size: .6rem;
        color:#ccc;
    }
    .l_username_tips{
        margin-top:.6rem;
        text-align: left;
        font-size: .6rem;
        color:#999;
    }


    /* 帐号密码登录验证框 */
    .l_user_yanzheng_text{
        position: absolute;
        top:.3rem;
        right:.26rem;
        width: 36px;
        font-size: .5rem;
    }
    .l_user_yanzheng_img{
        position: absolute;
        top:.13rem;
        right:2rem;
        width: 85px;
        height:32px;
    }
    .l_user_yanzheng{
        position: relative;
        margin-top:.7rem;
    }
    .l_user_yanzheng_input{

    }
    /* 密码框 */
    .l_showPassword_btn{
        position: absolute;
        top:0;
        left:0;
        width:15px;
        height:15px;
        background-color: #fff;
        border-radius: 50%;
        box-shadow: 0 0 3px;
        transition: left .3s;
    }
    .l_showPassword_ShowText{
        opacity:0;
        background-color: #3190e8;
        text-indent: -.3rem;
        line-height: .7rem;
        color:#fff;
        transition: opacity .3s;
    }
    .l_showPassword_defaultText{
        text-indent: .7rem;
        line-height: .3rem;
        color:#999;
    }
    .l_showPassword_text{
        position: absolute;
        top:0;
        left:0;
        width: 100%;
        height:100%;
        border:1px solid #ddd;
        font-size: .5rem;
        border-radius: 20px;
    }
    .l_showPassword{
        position: absolute;
        top:33px;
        right:10px;
        width: 40px;
        height:16px;
    }
    .l_password{
        margin-top:.7rem;
    }
    .l_passwordBox{
        position: relative;
    }

    /* 表单样式 */
    .l_button{
        width: 300px;
        height:42px;
        margin-top:1.3rem;
        background-color: #4cd96f;
        border: none;
        line-height: 42px;
        font-size: .72rem;
        color:#fff;
        border-radius: 4px;
    }
    .l_input{
        width: 300px;
        height:48px;
        border:1px solid #ddd;
        font-size: .62rem;
        text-indent: .4rem;
        border-radius: 4px;
    }
    .l_loginForm{
        display: inline-block;
        width: 300px;
        margin-top:.5rem;
    }

    /* 登录方式选择 */
    .l_loginStyle_active{
        padding:0 .05rem .1rem;
        border-bottom: 2px solid #2395ff;
        font-weight: bold;
        color:#2395ff;
    }
    .l_loginStyle>div{
        margin:0 1rem;
    }
    .l_loginStyle{
        display: flex;
        justify-content: center;
        margin-top:1rem;
        font-size:.65rem;
    }

    /*全局属性*/
    .l_login{
        z-index:99;
        position: relative;
        height:100%;
        background-color: #fff;
        text-align: center;
    }

    /* logo */
    .l_logoBox{
        text-align: center;
        padding-top:1.4rem;
    }
    .l_logo_img{
        width:158px;
        height:72px;
    }
</style>
