"use client"

import { InfiniteData, useSuspenseInfiniteQuery} from "@tanstack/react-query"
import { getPostRecommends } from "../_lib/getPostRecommends"
import Post from "../../_component/Post";
import { Post as IPost } from '@/model/Post';
import { Fragment, useEffect } from "react";
import { useInView } from "react-intersection-observer";

export default function PostRecommends() {
    const { 
        data, 
        hasNextPage, 
        fetchNextPage, 
        isFetching,
        isError
    } = useSuspenseInfiniteQuery<IPost[], Object, InfiniteData<IPost[]>, [_1: string, _2: string], number>({
        queryKey: ['posts', 'recommends'], 
        queryFn: getPostRecommends,
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

   if(isError) {
        return "에러처리해줘";
    }

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