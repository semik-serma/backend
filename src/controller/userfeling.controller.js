import { Comment } from "../models/commentModels.js";
import { errorResponse, successResponse } from "../utils/response.js";

export const likecontroller = async (req, res) => {
    try {
        const { id } = req.params;
        const { userEmail } = req.body;

        if (!userEmail) {
            return errorResponse(res, 'User email required', 400);
        }

        const comment = await Comment.findById(id);
        if (!comment) {
            return errorResponse(res, 'Comment not found', 404);
        }

        const likedIndex = comment.likes.indexOf(userEmail);
        const dislikedIndex = comment.dislikes.indexOf(userEmail);

        if (likedIndex > -1) {
            comment.likes.splice(likedIndex, 1);
        } else {
            comment.likes.push(userEmail);
            if (dislikedIndex > -1) {
                comment.dislikes.splice(dislikedIndex, 1);
            }
        }

        await comment.save();
        successResponse(res, 'Like toggled successfully', comment);
    } catch (error) {
        errorResponse(res, 'Error in likecontroller', error.message);
    }
};

export const getlikecontroller = async (req, res) => {
    try {
        const { id } = req.params;
        const comment = await Comment.findById(id);
        if (!comment) {
            return errorResponse(res, 'Comment not found', 404);
        }
        successResponse(res, 'Likes fetched', comment.likes.length);
    } catch (error) {
        errorResponse(res, 'Error in getlikecontroller', error.message);
    }
};

export const dislikecontroller = async (req, res) => { // Fixed (req, body) -> (req, res)
    try {
        const { id } = req.params;
        const { userEmail } = req.body;

        if (!userEmail) {
            return errorResponse(res, 'User email required', 400);
        }

        const comment = await Comment.findById(id);
        if (!comment) {
            return errorResponse(res, 'Comment not found', 404);
        }

        const dislikedIndex = comment.dislikes.indexOf(userEmail);
        const likedIndex = comment.likes.indexOf(userEmail);

        if (dislikedIndex > -1) {
            comment.dislikes.splice(dislikedIndex, 1);
        } else {
            comment.dislikes.push(userEmail);
            if (likedIndex > -1) {
                comment.likes.splice(likedIndex, 1);
            }
        }

        await comment.save();
        successResponse(res, 'Dislike toggled successfully', comment);
    } catch (error) {
        errorResponse(res, 'Error in dislikecontroller', error.message);
    }
};

export const getdislikecontroller = async (req, res) => {
    try {
        const { id } = req.params;
        const comment = await Comment.findById(id);
        if (!comment) {
            return errorResponse(res, 'Comment not found', 404);
        }
        successResponse(res, 'Dislikes fetched', comment.dislikes.length);
    } catch (error) {
        errorResponse(res, 'Error in getdislikecontroller', error.message);
    }
};
