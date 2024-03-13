import Post from "../models/Post.js";
import User from "../models/User.js";


// router.post('/', createPost);
// router.delete('/:id', deletePost);
// router.put('/', updatePost);
// router.get('/own', getMyOwnPost);
// router.get('/', getAllPost);
// router.get('/:id', getPostById);


export const createPost = async (req, res) => {

    try {
        const nick = req.tokenData.userId
        const text = req.body.text
        const title = req.body.title


        if (!text) {
            return res.status(400).json({
                success: false,
                message: "Write some words"
            })
        }


        const newPost = await Post.create({
            nick,
            text,
            title
        })

        res.status(201).json({
            success: true,
            message: "Post created",
            data: newPost
        })

    } catch (error) {
        res.status(500).json(
            {
                success: false,
                message: "Post cannot be created",
                error: error.message
            }
        )
    }
}

export const deletePost = async (req, res) => {
    try {
        const postId = req.params.id;
        const userId = req.tokenData.userId;

        const findPost = await Post

            .findOne(
                {
                    _id: postId,
                    nick: userId

                }
            )
        console.log(findPost)

        if (!findPost) {
            res.status(400).json(
                {
                    success: false,
                    message: "cant find a post"
                }
            )
        }

        await Post.deleteOne(
            { _id: postId }
        )
        res.status(200).json({
            success: true,
            message: "Post deleted successfuly"
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Post was not deleted",
            error: error.message
        })
    }

}


export const updatePost = async (req, res) => {

    try {
        const postId = req.params.id;
        const userId = req.tokenData.userId;
        const newTitle = req.body.title;

        const findPost = await Post

            .findOne(
                {
                    _id: postId,
                    nick: userId,

                }
            )
        

        if (!findPost) {
            res.status(400).json(
                {
                    success: false,
                    message: "cant find a post"
                }
            )
        }

        await Post.findOneAndUpdate(
            {
                _id: postId,
                nick: userId,
            },
            {
                title: newTitle
            }
        )
        res.status(200).json({
            success: true,
            message: "Post update successfuly"
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Post was not deleted",
            error: error.message
        })
    }



}


export const getMyOwnPost = async (req, res) => {
    try {

        const userId = req.tokenData.userId
        const ownPosts = await Post.find(
            {
                nick: userId
            }
        )
        

        if (ownPosts.length <= 0) {
            throw new Error("Any post founded")
        }

        res.status(200).json(
            {
                success: true,
                message: "Posts retrieved succesfully",
                data: ownPosts

            }
        )
    } catch (error) {
        res.status(500).json(
            {
                success: false,
                message: "ERROR",
                error: error.message
            }
        )
    }
}


export const getAllPost = async (req, res) => {

    try {
        const findPosts = await Post.find()

        res.status(201).json(
            {
                success: true,
                message: "All posts retrieved",
                data: findPosts
            }
        )

        if (findPosts === 0) {
            res.status(400).json(
                {
                    success: false,
                    message: "Any post found"
                }
            )
        }

    } catch (error) {
        res.status(500).json(
            {
                success: false,
                message: "Post didn't retrieved",
                error: error.message
            }
        )

    }

}

export const getPostById = async (req, res) => {

    try {

         // tiene   que mostrar los post que le pertenecen por id?
         // tiene que mostrar slo el que pones por id? 

        const postId = req.params._id
        const userId = req.tokenData.userId;

        const findPost = await Post

            .find(
                {
                    _id: postId  //en teoria debe mostrar cualquier post con su id, aunq no sea suyo no?

                }
            )
        

        if (!findPost) {
            res.status(400).json(
                {
                    success: false,
                    message: "Id incorrect or any post have this id"
                }
            )
        }
        
        res.status(200).json({
            success: true,
            message: "Post retrieved successfuly",
            data: postId
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Any post found",
            error: error.message
        })

}}