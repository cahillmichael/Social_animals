const { Schema, model } = require('mongoose');

const UserSchema = new Schema({
        username: {
            type: String,
            unique:true,
            required: 'Username required.',
            trim: true
        },
        email: {
            type: String,
            unique: true,
            required: true,
            match: [/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/, 'Valid email required.']
        },
        thoughts: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Thought'
            }
        ],
        friends: [
            {
                type: Schema.Types.ObjectId,
                ref: 'User'
            }
        ]
},
{
            toJSON: {
                virtuals: true
            },
            id: false
});

UserSchema.virtual('friendCount').get(function() {
    return this.friends.length;
});

const User = model('User', UserSchema);

module.exports = User;
	