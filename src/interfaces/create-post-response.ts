import { Post } from './post';

export interface CreatePostResponse {
    ok: boolean;
    post: Post;
}
