'use client'
import React, { useState } from 'react'
import { Input,  } from './ui/input'
import { Button } from './ui/button'
import { ListFilter } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog"

export default function NavigationBar() {

    return (
        <nav className="flex flex-row gap-8 items-center justify-center h-max w-full px-8 shadow-lg ">
            <div className="flex w-full flex-col gap-2 items-center justify-center"> 
                <div className='flex w-full flex-row gap-2 items-center justify-center'>
                <p className="text-xl font-bold">Seazone</p>
                    <Input placeholder="Buscar imóveis" className="bg-white my-8 h-10 rounded-full border-black/40 focus:border-none" />
                    <Dialog>
                        <DialogTrigger title='Filtrar Busca' className="h-10 w-12 items-center justify-center flex rounded-full bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary/80 cursor-pointer active:scale-95 transition-transform">
                            <ListFilter/>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                            <DialogTitle>Filtros</DialogTitle>
                            <DialogDescription>
                               colocar filtros aqui
                            </DialogDescription>
                            </DialogHeader>
                        </DialogContent>
                    </Dialog>
                    <Button variant={"default"} className="h-10 px-6 rounded-full">Buscar</Button>
                </div>
            </div>
        </nav>
    )
}
