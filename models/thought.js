const { Schema, Types, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const ReachtionSchema = new Schema(
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId()
        },
        reactionBody: {
            type: String,
            required: true,
            maxlength: 280
        },
        username: {
            type: String,
            required: 'Provide Username'
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: (createdAtVal => dateFormat(createdAtVal))
        }
    },
    {
        toJSON: {
            getters: true,
        }
    }
);

const ThoughtSchema = new Schema (
    {
        thoughtText: {
            type: String,
            required: true,
            minlength: 1,
            maxlength: 280
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: (createdAtVal => dateFormat(createdAtVal))
        },
        username: {
            type: String,
            required: 'true'
        },
        reactions: [ReachtionSchema]
    },
    {
        toJSON: {
            getters: true,
            virtuals: true
        }
    }
);

ThoughtSchema.virtual('reactionCount').get(function(){
    return this.reactions.length;
});

const Thought = model('Thought', ThoughtSchema);
module.exports = Thought;