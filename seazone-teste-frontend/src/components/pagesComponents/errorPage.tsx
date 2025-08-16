'use client'
import React from 'react'
import { Button } from '../ui/button'
import { useRouter } from 'next/navigation'

export default function ErrorPage({ error }: { error: Error }) {
    const router = useRouter()
    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100 text-center">
            <h1 className="text-6xl font-bold text-accent">Oops!</h1>
            <p className="text-xl mt-4 text-gray-700">
                Algo deu errado ao carregar esta página.
            </p>
            <p className="text-sm text-gray-500 mt-2">{error.message}</p>
            <Button
                onClick={() => router.refresh()}
                className="mt-6 px-6 py-2 bg-accent rounded-full text-white  shadow-md hover:bg-accent/90 active:scale-95 transition-transform"
            >
                Tentar novamente
            </Button>
        </div>
    )
}