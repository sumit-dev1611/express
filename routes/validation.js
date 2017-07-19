var md5 = require('md5');
module.exports = {
    validateRegistration: (body, callback) => {
        var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (body.username == null || body.username == "") {
            callback("empty username!!", "");
        } else if (!(body.email.match(mailformat))) {
            callback("You have entered an invalid email address!", "");
        } else if (body.email == null || body.email == "") {
            callback("empty email!!", "");
        } else if (body.password == null || body.password == "") {
            callback("enter password!!", "");
        } else if (body.cpassword == null || body.cpassword == "") {
            callback("empty confirm password!!", "");
        } else if (!(body.password == body.cpassword)) {
            callback("You have entered passwords do not match !", "");
        } else if (body.firstname == null || body.firstname == "") {
            callback("empty firstname!!", "");
        } else if (body.lastname == null || body.lastname == "") {
            callback("empty lastname!!", "");
        } else {
            body.password = md5(body.password);
            callback("", body);
        }
    },

    validateLogin: (body, callback) => {
        if (body.username == null || body.username == "") {
            callback("empty username!!", "");
        } else if (body.password == null || body.password == "") {
            callback("enter password!!", "");
        } else {
            body.password = md5(body.password);
            callback("", body);
        }
    },

    validateAddress: (body, callback) => {
        if (body.user_id == null || body.user_id == "") {
            callback("enter user id", null);
        } else if (body.address[0].city == null || body.address[0].city == "") {
            callback("enter city", null);
        } else if (body.address[0].state == null || body.address[0].state == "") {
            callback("enter state", null);
        } else if (body.address[0].pin_code == null || body.address[0].pin_code == "") {
            callback("enter pin_code", null);
        } else if (body.address[1].city == null || body.address[1].city == "") {
            callback("enter city", null);
        } else if (body.address[1].state == null || body.address[1].state == "") {
            callback("enter state", null);
        } else if (body.address[1].pin_code == null || body.address[1].pin_code == "") {
            callback("enter pin_code", null);
        } else if (body.phone_no == null || body.phone_no == "") {
            callback("enter phone no", null)
        } else {
            callback(null, body)
        }

    }

};