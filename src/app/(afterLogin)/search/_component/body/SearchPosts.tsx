import Post from '@/app/(afterLogin)/_component/post/Post';
import { AdvancedPost } from '@/model/Post';

interface Props {
  posts: AdvancedPost[];
}

export default function SearchPosts({ posts }: Props) {
  return posts.map((p) => <Post key={p.postId} post={p} />);
}
