import style from './profile.module.css';
import { getUserServer } from './_lib/getUserServer';
import { getUserPosts } from './_lib/getUserPosts';
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import UserPosts from './_component/UserPosts';
import UserInfo from './_component/UserInfo';
import { auth } from '@/auth';
import { User } from '@/model/User';
//import BackButton from "@/app/(afterLogin)/_component/BackButton";

type Props = {
  params: Promise<{ username: string }>
}

export async function generateMetadata({ params }: Props) {
  const { username } = await params;
  const user: User = await getUserServer({ queryKey: ["users", username] });
  return {
    title: `${user.nickname} (${user.id}) / Z`,
    dsecription: `${user.nickname} (${user.id}) / 프로필`,
  }
}

export default async function Profile({ params }: Props) {
  const { username } = await params;
  const session = await auth();
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({queryKey: ['users', username], queryFn: getUserServer})
  await queryClient.prefetchQuery({queryKey: ['posts', 'users', username], queryFn: getUserPosts})
  const dehydratedState = dehydrate(queryClient);

  return (
    <main className={style.main}>
      <HydrationBoundary state={dehydratedState}>
        <UserInfo username={username} session={session}/>
        <div>
          <UserPosts username={username} />
        </div>
      </HydrationBoundary>
    </main>
  )
}