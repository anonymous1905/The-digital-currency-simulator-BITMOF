const mongoose = require('mongoose');


const Schema = mongoose.Schema;


const myUserSchema = new Schema(
  {   // 1st argument -> structure object
    fullName: { type: String },

    // SIGN UP/LOG IN FORM users -------
    username: { type: String },
    encryptedPassword: { type: String },

    // GOOGLE users --------------------
    googleId: { type: String },

    // FACEBOOK users ------------------
    facebookId: { type: String },

    balanceAmount: {type:Number,default:20000,min:0},

    wallet:{type: String}
  },

  {   // 2nd argument -> additional settings (optional)
    timestamps: true
      // timestamps creates two additional fields: "createdAt" & "updatedAt"
  }
);

const UserModel = mongoose.model('User', myUserSchema);
                              //   |
                              // 'User' -> 'users' -> db.users.find()


module.exports = UserModel;
