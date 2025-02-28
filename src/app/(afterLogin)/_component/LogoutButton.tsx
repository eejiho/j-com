"use client";

import style from './logoutButton.module.css';
import {signOut} from "next-auth/react";
import { Session } from 'next-auth';

type Props = {
    me: Session | null
}
export default function LogoutButton({ me }: Props) {

    const onLogout = () => {
        signOut({callbackUrl: '/'});
    }

    if(!me?.user) {
        return null;
    }

    return (
        <button className={style.logOutButton} onClick={onLogout}>
            <div className={style.logOutUserImage}>
                <img src={me.user?.image as string} alt={me.user?.email as string }/>
            </div>
            <div className={style.logOutUserName}>
                <div>{me.user?.name}</div>
                <div>@{me.user?.email}</div>
            </div>
        </button>
    );
}