import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: 'Name is required'
    },
    email: {
        type: String,
        trim: true,
        unique: 'Email already exists',
        match: [/.+\@.+\..+/, 'Please fill a valid email'],
        required: 'Email is required'
    },
    created: {
        type: Date,
        default: Date.now
    },
    updated: Date,
    hashed_password: {
        type: String,
        required: 'Password is required'
    },
    salt: String
})

UserSchema.virtual('password').set(function (password)
{
    this._password = password
    this.salt = this.makeSalt()
    this.hashed_password = this.encryptPassword(password)
}).get(function ()
{
    return this._password
})

UserSchema.methods = {
    makeSalt: function ()
    {
        return Math.round((new Date().valueOf() * Math.random())) + ''
    },
    encryptPassword: function (password)
    {
        if (!password) return ''
        try {
            return crypto.createHmac('sha1', this.salt)
                .update(password)
                .digest('hex')
        } catch (error) {
            return ''
        }
    },
    authenticate: function (plainTxt)
    {
        return this.encryptPassword(plainTxt) === this.hashed_password
    }
}

UserSchema.path('hashed_password').validate(function (v)
{
    if (this._password && this._password.length < 6)
    {
        this.invalidate('password', 'Password must be at least 6 characters.')
    }
    if (this.isNew && !this._password)
    {
        this.invalidate('password', 'Password is required.')
    }
}, null)

export default mongoose.model('User', UserSchema)