import {ReactNode} from "react";
import styles from '@/app/page.module.css';
//import styles from '@/app/(beforeLogin)/_component/main.module.css';

type Props = { children: ReactNode, modal: ReactNode };
export default function Layout({ children, modal }: Props) {
  return (
    <div className={styles.container}>
      비포 로그인 레이아웃
      {children}
      {modal}
    </div>
  )
}