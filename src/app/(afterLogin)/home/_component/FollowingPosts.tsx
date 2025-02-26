"use client"

import { InfiniteData, useInfiniteQuery } from "@tanstack/react-query"
import { getFollowingPosts } from "../_lib/getFollowingPosts"
import Post from "@/app/(afterLogin)/_component/Post";
import { Post as IPost } from '@/model/Post';
import { Fragment, useEffect } from "react";
import { useInView } from "react-intersection-observer";

export default function FollowingPosts() {
    const { data, hasNextPage, fetchNextPage, isFetching } = useInfiniteQuery<IPost[], Object, InfiniteData<IPost[]>, [_1: string, _2: string], number>({
        queryKey: ['posts', 'followings'],
        queryFn: getFollowingPosts,
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
        console.log(inView);
        console.log(isFetching);
        console.log(hasNextPage);
        if(inView) {
            if (inView && !isFetching && hasNextPage) {
                fetchNextPage();
            }
        }
    }, [inView, isFetching, hasNextPage, fetchNextPage]);

    return (
            <>
                {data?.pages. map((page, i) => (
                    <Fragment key={i}>
                    {page.map((post) => (
                        <Post key={post.postId} post={post}/>
                    ))}
                    </Fragment>))}
                <div ref={ref} style={{height: 50}} />
            </>
        )
}