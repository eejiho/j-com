import Post from '@/app/(afterLogin)/_component/Post';
import PostForm from './_component/PostForm';
import Tab from './_component/Tab';
import style from './home.module.css';
import TabProvider from './_component/TabProvider';

export default function Home() {
  return (
    <main className={style.main}>
      <TabProvider>
        <Tab />
        <PostForm />
        <Post />
        <Post />
        <Post />
        <Post />
        <Post />
        <Post />
        <Post />
        <Post />
        <Post />
        <Post />
      </TabProvider>
    </main>
  );
}
