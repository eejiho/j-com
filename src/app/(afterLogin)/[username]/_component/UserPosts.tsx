"use client"

import { InfiniteData, useInfiniteQuery, useQueryClient } from "@tanstack/react-query"
import { getUserPosts } from '../_lib/getUserPosts';
import Post from "../../_component/Post";
import { Post as IPost } from '@/model/Post';
import { useInView } from "react-intersection-observer";
import { Fragment, useEffect } from "react";

type Props = {
    username: string;
}

export default function UserPosts({ username }: Props) {
    const { 
        data, 
        hasNextPage, 
        fetchNextPage, 
        isFetching 
    } = useInfiniteQuery<IPost[], Object, InfiniteData<IPost[]>, [_1: string, _2: string, _3: string], number>({
        queryKey: ['posts', 'users', username], 
        queryFn: getUserPosts,
        initialPageParam: 0,
        getNextPageParam: (lastPage) => lastPage.at(-1)?.postId,
        staleTime: 60 * 1000, // fresh -> stale
        gcTime: 300 * 1000,
    });

    const { ref, inView } = useInView({
        threshold: 0,
        delay: 0,
    });

    useEffect(() => {
        if(inView) {
            if (inView && !isFetching && hasNextPage) {
                fetchNextPage();
            }
        }
    }, [inView, isFetching, hasNextPage, fetchNextPage]);

    const queryClient = useQueryClient();
    const user = queryClient.getQueryData(['users', username]);
    if(user) {
    //     return data?.map((post) => {
    //         return <Post key={post.postId} post={post} />
    //     })
        return  (
            <>
                {data?.pages.map((page, i) => (
                    <Fragment key={i}>
                        {page.map((post) => (
                            <Post key={post.postId} post={post} />
                        ))}
                    </Fragment>
                ))}
            </>
        )
    }
    return null;
}