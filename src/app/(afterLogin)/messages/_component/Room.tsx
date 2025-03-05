"use client";
import style from "@/app/(afterLogin)/messages/message.module.css";
import {faker} from "@faker-js/faker";
import dayjs from "dayjs";
import {useRouter} from "next/navigation";
import relativeTime from "dayjs/plugin/relativeTime";
import { Room } from '@/model/Room';
import 'dayjs/locale/ko';
dayjs.locale('ko');
dayjs.extend(relativeTime)
type Props = {
  room: Room,
}
export default function RoomComponent({ room }: Props) {
  const router = useRouter();
  const onClick =() => {
    router.push(`/messages/${room.room}`);
  };
  return (
    <div className={style.room} onClickCapture={onClick}>
      <div className={style.roomUserImage}>
        <img src={faker.image.avatar()} alt=""/>
      </div>
      <div className={style.roomChatInfo}>
        <div className={style.roomUserInfo}>
          <b>{room.Receiver.nickname}</b>
          &nbsp;
          <span>@{room.Receiver.id}</span>
          &nbsp;
          ·
          &nbsp;
          <span className={style.postDate}>
            {dayjs(room.createdAt).fromNow(true)}
          </span>
        </div>
        <div className={style.roomLastChat}>
          {room.content}
        </div>
      </div>
    </div>
  )
}