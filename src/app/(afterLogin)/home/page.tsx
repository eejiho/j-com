import PostForm from './_component/PostForm';
import Tab from './_component/Tab';
import style from './home.module.css';
import TabProvider from './_component/TabProvider';
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import PostRecommends from '@/app/(afterLogin)/home/_component/PostRecommends';
import { getPostRecommends } from './_lib/getPostRecommends';

export default async function Home() {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({queryKey: ['posts', 'recommends'], queryFn: getPostRecommends})
  const dehydratedState = dehydrate(queryClient);

  return (
    <main className={style.main}>
      <HydrationBoundary state={dehydratedState}>
        <TabProvider>
          <Tab />
          <PostForm />
          <PostRecommends />
        </TabProvider>
      </HydrationBoundary>
    </main>
  );
}
