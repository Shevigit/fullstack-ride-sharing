const Comment=require('../models/Comment')
const getAllComments = async (req, res) => {
    try {
        const comments = await Comment.find().sort({ createdAt: -1 }); 
        res.json(comments);
    } catch (error) {
        console.error('Failed to get comments:', error);
        res.status(500).json({ message: 'Failed to get comments' });
    }
};
const addComment = async (req, res) => {
    try {
        const {
           text
        } = req.body;
        const newSuggestion = await Comment.create({
            text: text
        });
        res.status(201).json(newSuggestion);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};
module.exports ={getAllComments,addComment}