"use client";

import { useSession } from 'next-auth/react';
import { useQuery } from '@tanstack/react-query';
import { getTrends } from '@/app/(afterLogin)/_lib/getTrends';
import { Hashtag } from '@/model/Hashtag';
import Trend from '../../_component/Trend';

export default function TrendSection() {
    const { data: session } = useSession();
    const { data } = useQuery<Hashtag[]>({
        queryKey: ['trends'], 
        queryFn: getTrends,
        staleTime: 60 * 1000, // fresh -> stale
        gcTime: 300 * 1000,
        enabled: !!session?.user
    });
    return data?.map((trend) => <Trend trend={trend} key={trend.title} />);
}