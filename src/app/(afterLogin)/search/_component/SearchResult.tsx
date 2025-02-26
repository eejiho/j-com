"use client"
import { useQuery } from "@tanstack/react-query";
import { getSearchResult } from "@/app/(afterLogin)/search/_lib/getSearchResult";
import Post from "../../_component/Post";
import { Post as IPost } from '@/model/Post';

type Props = {
    searchParams: { q: string, f?: string, pf?: string };
}

export default function SearchResult({ searchParams }: Props) {
    const { data } = useQuery<IPost[], object, IPost[], [_1: string, _2: string, Props['searchParams']]>({
        queryKey: ['posts', 'search', searchParams], 
        queryFn: getSearchResult,
        staleTime: 60 * 1000, // fresh -> stale
        gcTime: 300 * 1000,
    });
    return data?.map((post) => {
        return <Post key={post.postId} post={post} />
    })
}