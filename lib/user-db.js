var mongoose = require('mongoose'),
    Schema = mongoose.Schema;


var UserSchema = new Schema({
    username: {type: String, required: true, index: {unique: true}},
    password: {type: String, required: true},
    credit: {type: Number, default: 0}
});


UserSchema.methods.comparePassword = function(candidatePassword, cb){
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch){
        if (err) return cb(err);
        cb(null, isMatch);
    });
};

module.exports = mongoose.model('User', UserSchema);

var User_test = mongoose.model('UserInfo', UserSchema);

exports.checkUser = function(data, cb){
    var checkname = data.username;
    User.find({username: checkname}, cb);
};







