module.exports = {
    verifyAccess: (req, callback) => {
        req.access_token_collection.findOne({ access_token: req.query.access_token }, function(err, access_token_data) {
            if (err) {
                next(err);
            } else {
                callback(access_token_data)
            }
        });
    }

}