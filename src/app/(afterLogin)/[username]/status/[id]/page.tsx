import BackButton from "@/app/(afterLogin)/_component/BackButton";
import style from './singlePost.module.css';
import CommentForm from "./_component/CommentForm";
import SinglePost from "./_component/SinglePost";
import { dehydrate, QueryClient } from "@tanstack/query-core";
import { getSinglePost } from "./_lib/getSinglePost";
import { getSinglePostServer } from "./_lib/getSinglePostServer";
import { getComments } from "./_lib/getComments";
import { HydrationBoundary } from "@tanstack/react-query";
import Comments from "./_component/Comments";
import { User } from "@/model/User";
import { getUserServer } from "../../_lib/getUserServer";
import { Post } from "@/model/Post";

type Props = {
  params: Promise<{ id: string, username: string }>
}
export async function generateMetadata({params}: Props) {
  const { username, id } = await params;
  const [user, post]: [User, Post] = await Promise.all([
    getUserServer({ queryKey: ["users", username] }),
    getSinglePostServer({ queryKey: ["posts", id] }) 
  ]);
  return {
    title: `Z에서 ${user.nickname} 님 : ${post.content}`,
    dsecription: post.content,
    openGraph: {
      images: '',
      title: '',
    }
  }
}
export default async function Page(props: Props) {
  const {id} = await props.params;
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({queryKey: ['posts', id], queryFn: getSinglePost});
  await queryClient.prefetchQuery({queryKey: ['posts', id, 'comments'], queryFn: getComments});
  const dehydratedState = dehydrate(queryClient);
  return (
    <div className={style.main}>
      <HydrationBoundary state={dehydratedState}>
        <div className={style.header}>
          <BackButton/>
          <h3 className={style.headerTitle}>게시하기</h3>
        </div>
        <SinglePost id={id} />
        <CommentForm id={id} />
        <div>
          <Comments id={id} />
        </div>
      </HydrationBoundary>
    </div>
  );
}
