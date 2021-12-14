import { Post } from "./models/Post";

export type ApplicationState = {
  posts: {
    ids: string[],
    entities: {
      [slug: string]: Post
    }
  },
  homePage: string[]
};