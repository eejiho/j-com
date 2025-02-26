import style from './profile.module.css';
import { getUser } from './_lib/getUser';
import { getUserPosts } from './_lib/getUserPosts';
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import UserPosts from './_component/UserPosts';
import UserInfo from './_component/UserInfo';
//import BackButton from "@/app/(afterLogin)/_component/BackButton";

type Props = {
  params: Promise<{ username: string }>
}
export default async function Profile({ params }: Props) {
  const { username } = await params;
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({queryKey: ['users', username], queryFn: getUser})
  await queryClient.prefetchQuery({queryKey: ['posts', 'users', username], queryFn: getUserPosts})
  const dehydratedState = dehydrate(queryClient);

  return (
    <main className={style.main}>
      <HydrationBoundary state={dehydratedState}>
        <UserInfo username={username} />
        <div>
          <UserPosts username={username} />
        </div>
      </HydrationBoundary>
    </main>
  )
}