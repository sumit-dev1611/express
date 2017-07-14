var md5 = require('md5');
module.exports = function(body, callback) {

    var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (body.username == null || body.username == "")
        callback("empty username!!", "");
    else if (!(body.email.match(mailformat)))
        callback("You have entered an invalid email address!", "");
    else if (body.email == null || body.email == "")
        callback("empty email!!", "");
    else if (body.password == null || body.password == "")
        callback("enter password!!", "");
    else if (body.cpassword == null || body.cpassword == "")
        callback("empty confirm password!!", "");
    else if (!(body.password == body.cpassword))
        callback("You have entered passwords do not match !", "");
    else if (body.firstname == null || body.firstname == "")
        callback("empty firstname!!", "");
    else if (body.lastname == null || body.lastname == "")
        callback("empty lastname!!", "");
    else {
        body.password = md5(body.password);
        callback("", body);
    }

};
