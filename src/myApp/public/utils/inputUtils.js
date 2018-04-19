/**
 * Created by timxiong on 2018/3/19.
 */
module.exports = {
    _checkUserName(t) {
        if(t == '') {
            return[false,'用户名不能为空！']
        }else if(t.length < 3) {
            return[false,'用户名长度不能小少于3个字！']
        }else if(t.length > 16) {
            return[false,'用户名长度不能超过16个字！']
        } else {
            return[true,''];
        }
    },

    _checkPsd(t1,t2) {
        if(t1 == '') {
            return [false, '密码不能为空！'];
        }else if(t1.length < 6) {
            return [false, '密码长度不足6位'];
        }else if(t1 != t2) {
            return [false, '2次密码输入不一致'];
        }else {
            return [true,''];
        }
    },

    _checkEmail(t) {
        var myreg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
        if(t == '') {
            return [false, '邮箱不能为空！']
        } else if(!myreg.test(t)) {
            return [false, '邮箱格式不正确！']
        }else {
            return [true,''];
        }
    },

    _checkPhoneNum(n) {
        var myreg = /^1[0-9]{10}$/;
        if(n == '') {
            return [false, '手机号不能为空！']
        } else if(!myreg.test(n)) {
            return [false, '请输入正确的手机号！']
        } else {
            return [true,''];
        }
    },

    _checkAge(n) {
        if(n == '') {
            return [false, '年龄不能为空！']
        }else {
            return [true,''];
        }
    },

    _checkNickname(s) {
        if (s == '') {
            return [false, '昵称不能为空！']
        }else if(s.length > 16) {
            return [false, '昵称不能超过16位！']
        } else {
            return [true,''];
        }
    }

};