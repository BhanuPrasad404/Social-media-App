import Post from "../models/Post.js"
import User from "../models/User.js";

//CREATE//

export const createPost = async (req, res) => {

    try {
        const { userId, description, picturePath } = req.body;

        const user = await User.findById(userId);
        const newPost = new Post({
            userId,
            firstName: user.firstName,
            lastName: user.lastName,
            location: user.location,
            description,
            userPicturePath: user.picturePath,
            picturePath,
            likes: {},
            Comments: []
        })

        await newPost.save();// here the posts are saving to the mongoDB data base 
        const post = await Post.find() //written all posts in the front end Dom and the posts are visble to the user 
        res.status(201).json(post);
    }
    catch (err) {
        res.status(409).json({ message: err.message })
    }
}

//Read the all the  posts //

export const getFeedPosts = async (req, res) => {

    try {

        const post = await Post.find();
        res.status(200).json(post);

    } catch (err) {

        res.status(404).json({ message: err.message })
    }

}


export const getUserPosts = async (req, res) => {

    try {

        const { userId } = req.params;
        const post = await Post.find({userId});
        res.status(200).json(post);

    }
    catch (err) {
        res.status(404).json({ message: err.message })
    }

    
}


//Update//

export const likePost = async(req, res) => {

    try {
        const {id} = req.params;
        const {userId} = req.body;

        const post  = await Post.findById(id);
        const isLiked = post.likes.get(userId);

        if(isLiked) {

            post.likes.delete(userId);

        }
        else {
            post.likes.set(userId,true);
        }

        const UpdatePost = await Post.findByIdAndUpdate(
            id,
            {likes:post.likes},
            {new:true}
        )
        res.status(200).json(UpdatePost )
    }
    catch (err) {
        res.status(404).json({ message: err.message })
    }
}

