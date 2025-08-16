import React from 'react'
import { Skeleton } from '../ui/skeleton'

export default function HomePageSkeleton() {
    return (
        <div className="p-1">
            <Skeleton className="w-full h-40 rounded-lg mb-2" /> 
            <Skeleton className="h-4 w-3/4 mb-2" />
            <Skeleton className="h-3 w-1/2 mb-1" />
            <Skeleton className="h-3 w-2/3 mb-1" />
            <Skeleton className="h-3 w-1/3" />
        </div>
    )
}
