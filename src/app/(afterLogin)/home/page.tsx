import PostForm from './_component/PostForm';
import Tab from './_component/Tab';
import style from './home.module.css';
import TabProvider from './_component/TabProvider';
import { Suspense } from 'react';
import Loading from './loading';
import TabDeciderSuspense from './_component/TabDeciderSuspense';

export default async function Home() {
  

  return (
    <main className={style.main}>
      <TabProvider>
        <Tab />
        <PostForm />
        <Suspense fallback={<Loading />}>
          <TabDeciderSuspense />
        </Suspense>
      </TabProvider>
    </main>
  );
}
