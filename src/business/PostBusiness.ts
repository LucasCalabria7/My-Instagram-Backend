import { PostDatabase } from "../database/PostDataBase";
import { CreatePostInputDTO, DeletePostInputDTO, EditPostInputDTO, GetPostsInputDTO, GetPostsOutputDTO, LikeOrDislikePostInputDTO } from "../DTOs/DTOs";
import { LikesDislikesDB, PostWithCreatorsDB, POST_LIKE, ROLES } from "../interfaces/interfaces";
import { Post } from "../models/Post";
import { IdGenerator } from "../services/IdGenerator";
import { TokenManager } from "../services/TokenManager";

export class PostBusiness {
    constructor(
        private postDatabase: PostDatabase,
        private idGenerator: IdGenerator,
        private tokenManager: TokenManager,
    ) { }

    public getPosts = async (input: GetPostsInputDTO): Promise<GetPostsOutputDTO> => {
        const { token } = input;

        if (token === undefined) {
            throw new Error("Token doesn't exist");
        } 

        const payload = this.tokenManager.getPayload(token);

        if (payload === null) {
            throw new Error("Invalid Token");
        }

        const postsWithCreatorsDB: PostWithCreatorsDB[] = await this.postDatabase.getPostsWithCreators();

        const posts = postsWithCreatorsDB.map((postWithCreatorsDB) => {
            const post = new Post(
                postWithCreatorsDB.id,
                postWithCreatorsDB.content,
                postWithCreatorsDB.likes,
                postWithCreatorsDB.dislikes,
                postWithCreatorsDB.created_at,
                postWithCreatorsDB.updated_at,
                postWithCreatorsDB.creator_id,
                postWithCreatorsDB.creator_name
            );
            return post.toBusinessModel();
        });

        const output: GetPostsOutputDTO = posts;

        return output;
    };

    public createPosts = async (input: CreatePostInputDTO) => {
        const { token, content } = input;

        if (token === undefined) {
            throw new Error("Token doesn't exist");
        }

        const payload = this.tokenManager.getPayload(token);

        if (payload === null) {
            throw new Error("Invalid token");
        }

        if (typeof content !== "string") {
            throw new Error("Content must be a string");
        }

        const id = this.idGenerator.generate();
        const createdAt = new Date().toISOString();
        const updatedAt = new Date().toISOString();
        const creatorId = payload.id;
        const creatorName = payload.name;

        const post = new Post(
            id,
            content,
            0,
            0,
            createdAt,
            updatedAt,
            creatorId,
            creatorName
        );

        const postDB = post.toDBModel();

        await this.postDatabase.create(postDB);

        const output = {
            message: "Post published successfully",
            post: post
        }
        return output
    };

    public editPosts = async (input: EditPostInputDTO) => {
        const { idToEdit, token, content } = input;

        if (typeof token !== "string") {
            throw new Error("Token doesn't exists");
        }

        const payload = this.tokenManager.getPayload(token);

        if (payload === null) {
            throw new Error("Invalid Token");
        }

        if (typeof content !== "string") {
            throw new Error("Content must be a string");
        }

        const postDB = await this.postDatabase.searchById(idToEdit);

        if (!postDB) {
            throw new Error("ID not found");
        }

        const creatorId = payload.id;

        if (postDB.creator_id !== payload.id) {
            throw new Error("To edit the post you must be the owner of it.");
        }

        const creatorName = payload.name;

        const post = new Post(
            postDB.id,
            postDB.content,
            postDB.likes,
            postDB.dislikes,
            postDB.created_at,
            postDB.updated_at,
            creatorId,
            creatorName
        );

        post.setContent(content);
        post.setUpdatedAt(new Date().toISOString());

        const updatedPostDB = post.toDBModel();

        await this.postDatabase.update(idToEdit, updatedPostDB);

        const output = {
            message: "Post updated successfully",
            post: post
        }
        return output
    };

    public deletePosts = async (input: DeletePostInputDTO) => {
        const { idToDelete, token } = input;

        if (token === undefined) {
            throw new Error("Token doesn't exist");
        }

        const payload = this.tokenManager.getPayload(token);

        if (payload === null) {
            throw new Error("Invalid Token");
        }

        const postDB = await this.postDatabase.searchById(idToDelete);

        if (!postDB) {
            throw new Error("ID not found");
        }

        const creatorId = payload.id;

        if (payload.role !== ROLES.ADM && postDB.creator_id !== creatorId) {
            throw new Error("To delete the post you must be the owner of it.");
        }

        await this.postDatabase.delete(idToDelete);

        const output = {
            message: "Post deleted successfully",
            post: postDB
        }
        return output
    };

    public likeOrDislikePost = async (input: LikeOrDislikePostInputDTO) => {
        const { idToLikeOrDislike, token, like } = input;

        if (token === undefined) {
            throw new Error("Token doesn't exist");
        }

        const payload = this.tokenManager.getPayload(token);

        if (payload === null) {
            throw new Error("Invalid Token");
        }

        if (typeof like !== "boolean") {
            throw new Error("Like must be a Boolean");
        }

        const postsWithCreatorDB = await this.postDatabase.findPostsWithCreatorId(idToLikeOrDislike);

        if (!postsWithCreatorDB) {
            throw new Error("ID not found");
        }

        const userId = payload.id;
        const likeSQLite = like ? 1 : 0;
        const likeDislikeDB: LikesDislikesDB = {
            user_id: userId,
            post_id: postsWithCreatorDB.id,
            like: likeSQLite,
        };

        const post = new Post(
            postsWithCreatorDB.id,
            postsWithCreatorDB.content,
            postsWithCreatorDB.likes,
            postsWithCreatorDB.dislikes,
            postsWithCreatorDB.created_at,
            postsWithCreatorDB.updated_at,
            postsWithCreatorDB.creator_id,
            postsWithCreatorDB.creator_name
        );

        const postLikeOrDislike = await this.postDatabase.searchLikes(likeDislikeDB);

        if (postLikeOrDislike === POST_LIKE.LIKED) {
            if (like) {
                await this.postDatabase.removeLikes(likeDislikeDB);
                post.removeLike();
            } else {
                await this.postDatabase.updateLikes(likeDislikeDB);
                post.removeLike();
                post.addDislike();
            }
        } else if (postLikeOrDislike === POST_LIKE.DISLIKED) {
            if (like) {
                await this.postDatabase.updateLikes(likeDislikeDB);
                post.removeDislike();
                post.addLike();
            } else {
                await this.postDatabase.removeLikes(likeDislikeDB);
                post.removeDislike();
            }
        } else {
            await this.postDatabase.likeOrDislike(likeDislikeDB);

            if (like) {
                post.addLike();
            } else {
                post.addDislike();
            }
        }
        const updatedPostDB = post.toDBModel();
        await this.postDatabase.update(idToLikeOrDislike, updatedPostDB);
    };
}