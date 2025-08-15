'use client'
import React, { useEffect, useState } from 'react'
import { Input,  } from './ui/input'
import { Button } from './ui/button'
import { ListFilter } from 'lucide-react'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog"
import FilterContent from './filterContent'

interface NavigationBarProps {
  filters: any;
  setFilters: (filters: any) => void;
  onApplyFilters: () => void;
  onClearFilters: () => void;
}

export default function NavigationBar({ filters, setFilters, onApplyFilters, onClearFilters }: NavigationBarProps) {
    const [search, setSearch] = useState("")

    useEffect(() => {
        setFilters({ ...filters, title: search })
        onApplyFilters()
    }, [search])
    return (
        <nav className="top flex flex-row gap-8 items-center justify-center h-max w-full px-8 shadow-lg ">
            <div className="flex w-full flex-col gap-2 items-center justify-center"> 
                <div className='flex w-full flex-row gap-2 items-center justify-center'>
                <p className="text-xl font-bold">Seazone</p>
                     <Input
                        placeholder="Buscar imóveis pelo título"
                        className="bg-white my-8 h-10 rounded-full border-black/40 focus:outline-none focus:ring-0 focus:border-transparent"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                    <Dialog>
                        <DialogTrigger title='Filtrar Busca' className="h-10 w-12 items-center justify-center flex rounded-full bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary/80 cursor-pointer active:scale-95 transition-transform">
                            <ListFilter className='text-font-base'/>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Filtros</DialogTitle>
                            </DialogHeader>
                            <FilterContent 
                                filters={filters}
                                setFilters={setFilters}
                                onApply={onApplyFilters}
                                onClear={onClearFilters}
                            />
                            <div className="w-full flex items-center justify-end gap-2">
                                <Button variant="secondary" onClick={onClearFilters} className="h-10 px-6 rounded-full ml-2">
                                    Limpar Filtros
                                </Button>
                                <DialogClose asChild>
                                    <Button variant="default" onClick={onApplyFilters} className="h-10 px-6 rounded-full">
                                        Aplicar Filtros
                                    </Button>
                                </DialogClose>
                            </div>
                        </DialogContent>
                    </Dialog>
                    <Button variant={"default"} className="h-10 px-6 rounded-full" onClick={() => {
                        onApplyFilters()
                        setSearch("")
                    }}>Buscar</Button>
                </div>
            </div>
        </nav>
    )
}
