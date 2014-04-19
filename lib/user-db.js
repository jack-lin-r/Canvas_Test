var mongoose = require('mongoose'),
    Schema = mongoose.Schema;


var UserSchema = new Schema({
    position: [{posX: Number, posY: Number}]
});


module.exports = mongoose.model('User', UserSchema);

exports.checkUser = function(data, cb){
    var checkname = data.username;
    User.find({username: checkname}, cb);
};







