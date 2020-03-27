import { Post } from './post';

export interface GetPostsResponse {
  ok: boolean;
  pagina: number;
  posts: Post[];
}



