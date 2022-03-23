const { Thought, User } = require('../models');

const thoughtController = {
    getThoughtById({ params }, res) {
        Thought.findOne({_id: params.id })
            .then(dbUserData => {
                if (!dbUserData) {
                    res.json({ message: 'You never thought this.' })
                    return;
                }
                res.json(dbUserData)
            })
            .catch(err => {
                console.log(err);
                res.sendStatus(400);
            });
    },

    getAllThoughts(req, res){
        Thought.find({})
            .then(dbUserData => res.json(dbUserData))
            .catch(err => {
                console.log(err);
                res.sendStatus(400);
            });
    },

    addThought({ params, body }, res){
        Thought.create(body)
            .then( ({_id}) => {
                return User.findOneAndUpdate(
                    { _id: body.userId },
                    { $push: { thoughts: _id }},
                    { new: true}
                );
            })
            .then(dbUserData =>  res.json(dbUserData))
            .catch( err => res.json(err));
    },

    updateThought({ params, body }, res){
        Thought.findOneAndUpdate({_id: params.id }, body, {new:true})
            .then(dbUserData => {
                if(!dbUserData){
                    res.status(404).json({ message: 'You never thought this.'});
                    return;
                }
                res.json(dbUserData);
            })
            .catch(err => res.json(err));
    },

    deleteThought({ params }, res) {
        Thought.findOneAndDelete({ _id: params.id })
            .then(dbUserData => res.json(dbUserData))
            .catch(err => res.json(err));
    },

    addReaction({ params, body }, res){
        Thought.findOneAndUpdate(
            {_id: params.thoughtId },
            { $push: { reactions: body }},
            { new: true }
            )
            .then(dbUserData => {
                if(!dbUserData){
                    res.status(404).json({ message: 'You never thought this.'});
                    return;
                }
                res.json(dbUserData);
            })
            .catch( err => res.json(err));
    },

    deleteReaction({ params }, res ){
        Thought.findOneAndUpdate(
            { _id: params.thoughtId },
            { $pull: { reactions: {reactionsId: params.reactionsId}} },
            { new: true }
        )
        .then(dbUserData => res.json(dbUserData))
        .catch(err => res.json(err));
    }
};

module.exports = thoughtController;