import { LikesDislikesDB, PostDB, PostWithCreatorsDB, POST_LIKE } from "../interfaces/interfaces";
import { BaseDatabase } from "./BaseDatabase";

export class PostDatabase extends BaseDatabase {
    public static TABLE_POSTS = "posts";
    public static TABLE_LIKES_DISLIKES = "likes_dislikes";

    public create = async (postDB: PostDB) => {
        await BaseDatabase.connection(PostDatabase.TABLE_POSTS).insert(postDB);
    };


    public update = async (id: string, postDB: PostDB) => {
        await BaseDatabase.connection(PostDatabase.TABLE_POSTS)
            .update(postDB)
            .where({ id });
    };


    public delete = async (id: string) => {
        await BaseDatabase.connection(PostDatabase.TABLE_POSTS)
            .delete()
            .where({ id });
    };


    public searchByName = async (name: string) => {
        const result: PostDB[] = await BaseDatabase.connection(PostDatabase.TABLE_POSTS)
            .select()
            .where({ name });
        return result[0];
    };

    public searchById = async (id: string) => {
        const result: PostDB[] = await BaseDatabase.connection(PostDatabase.TABLE_POSTS)
            .select()
            .where({ id });
        return result[0];
    };


    public getPostsWithCreators = async () => {
        const result: PostWithCreatorsDB[] = await BaseDatabase.connection(PostDatabase.TABLE_POSTS)
            .select(
                "posts.id",
                "posts.creator_id",
                "posts.content",
                "posts.likes",
                "posts.dislikes",
                "posts.created_at",
                "posts.updated_at",
                "users.name AS creator_name"
            )
            .join("users", "posts.creator_id", "=", "users.id");
        return result;
    };


    public createLike = async (like: LikesDislikesDB) => {
        await BaseDatabase.connection(PostDatabase.TABLE_LIKES_DISLIKES)
            .insert(like);
    };


    public findPostsWithCreatorId = async (postId: string) => {
        const result: PostWithCreatorsDB[] = await BaseDatabase.connection(PostDatabase.TABLE_POSTS)
            .select(
                "posts.id",
                "posts.creator_id",
                "posts.content",
                "posts.likes",
                "posts.dislikes",
                "posts.created_at",
                "posts.updated_at",
                "users.name AS creator_name"
            )
            .join("users", "posts.creator_id", "=", "users.id")
            .where("posts.id", postId);
        return result[0];
    };


    public searchLikes = async (like: LikesDislikesDB) => {
        const [likeDislikeDB]: LikesDislikesDB[] = await BaseDatabase.connection(PostDatabase.TABLE_LIKES_DISLIKES)
            .select()
            .where({
                user_id: like.user_id,
                post_id: like.post_id,
            });
        if (likeDislikeDB) {
            return likeDislikeDB.like === 1 ? POST_LIKE.LIKED : POST_LIKE.DISLIKED;
        } else {
            return null;
        }
    };


    public removeLikes = async (like: LikesDislikesDB) => {
        await BaseDatabase.connection(PostDatabase.TABLE_LIKES_DISLIKES)
            .delete()
            .where({
                user_id: like.user_id,
                post_id: like.post_id,
            });
    };


    public updateLikes = async (like: LikesDislikesDB) => {
        await BaseDatabase.connection(PostDatabase.TABLE_LIKES_DISLIKES)
            .update(like)
            .where({
                user_id: like.user_id,
                post_id: like.post_id,
            });
    };


    public likeOrDislike = async (likeDislike: LikesDislikesDB) => {
        await BaseDatabase.connection(PostDatabase.TABLE_LIKES_DISLIKES).insert(likeDislike);
    };
}