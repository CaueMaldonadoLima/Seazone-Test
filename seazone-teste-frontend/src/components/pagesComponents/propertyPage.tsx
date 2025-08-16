import Link from 'next/link';
import React from 'react'
import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Stars } from '../starsRating';
import { formatHostSince } from '../hostingDate';
import { BadgeCheck, BadgeX, BedDouble, CircleDollarSign, PersonStanding, Ruler, Toilet } from 'lucide-react';
import { Dialog, DialogClose, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { Button } from '../ui/button';

interface Property {
    id: number;
    title: string;
    type: string;
    location: {
        city: string;
        state: string;
        country: string;
    }
    pricePerNight: number;
    maxGuests: number;
    bedrooms: number;
    bathrooms: number;
    sizeM2: number;
    isAvailable: boolean;
    rating: number;
    reviewsCount: number;
    amenities: string[];
    images: string[];
    host: {
        name: string;
        superhost: boolean;
        since: string;
    };
}

interface PropertyPageProps {
	property: Property
}

export default function PropertyPage({ property }: PropertyPageProps) {

    function generatePropertyDescription(property: Property) {
        return (
        `Desfrute de um(a) ${property.type.toLowerCase()} aconchegante em ${property.location.city}, ${property.location.state}, ${property.location.country}. 
        O espaço oferece ${property.bedrooms} quarto(s), ${property.bathrooms} banheiro(s) e ${property.sizeM2} m² de conforto. 
        Ideal para até ${property.maxGuests} hóspede(s), perfeito para quem busca praticidade e bem-estar durante a estadia.`
        )
    }

	return (
		<main className="flex min-h-screen flex-col items-center bg-background text-foreground">
			<nav className="top flex flex-row gap-8 bg-white items-center justify-center h-max w-full px-8 shadow-lg ">
				<div className="flex w-full flex-col gap-2 items-center justify-center"> 
					<div className='flex w-full flex-row gap-2 items-center justify-between'>
						<Link title='Voltar à tela inicial' href='/' className='text-xl font-bold py-9'><p>Seazone</p></Link>
                        <p className='text-2xl font-semibold'>{property.title}</p>
                        <br />
					</div>
				</div>
			</nav>
            <div className='w-full flex flex-row px-32 py-12 items-start gap-6'>
                <div className='flex flex-col'>
                    <Carousel className="w-full max-w-2xl">
                        <CarouselContent>
                            {property.images.map((_, index) => (
                            <CarouselItem key={index}>
                                <div className="p-1">
                                    <img
                                        src={property.images[index]}
                                        alt={property.title}
                                        className="w-full h-auto rounded-lg mb-2"
                                    />
                                </div>
                            </CarouselItem>
                            ))}
                        </CarouselContent>
                        <CarouselPrevious className='bg-white'/>
                        <CarouselNext className='bg-white'/>
                    </Carousel>
                    <Card className='w-full max-w-2xl bg-white mt-4 p-4 text-lg gap-2'>
                        <div className='pb-4 px-4 flex flex-row items-center justify-between'>
                            <p className='text-xl font-semibold'>O que este lugar oferece</p>
                        </div>
                        <hr />
                        <p className='flex flex-row gap-2 px-2 pt-2'><PersonStanding /> {` Até ${property.maxGuests} pessoas `}</p>
                        <p className='flex flex-row gap-2 px-2'><CircleDollarSign />{` R$${property.pricePerNight},00 p/ noite`}</p>
                        <p className='flex flex-row gap-2 px-2'><Toilet /> {property.bathrooms} banheiros</p>
                        <p className='flex flex-row gap-2 px-2'><BedDouble /> {property.bedrooms} quartos</p>
                        <p className='flex flex-row gap-2 px-2'><Ruler /> {property.sizeM2} m²</p>
                        {property.isAvailable ? (
                            <p className='flex flex-row gap-2 px-2 pb-2'> 
                                <BadgeCheck />
                                Disponível
                            </p>
                        ) : (
                            <p className='flex flex-row gap-2 px-2 pb-2'> 
                                <BadgeX />
                                Indisponível
                            </p>
                        )}
                    </Card>
                </div>
                <div className='flex flex-col gap-4 px-12'>
                    <Card className='w-full max-w-2xl bg-white !px-0'>
                        <CardContent className='px-0'>
                            <div className='pb-4 px-4 flex flex-row items-center justify-between'>
                               <p className='text-xl font-semibold'>Sobre este lugar</p>
                            </div>
                            <hr />
                            <p className='px-4 pt-4 pb-2 text-lg'>{`${property.type} em ${property.location.city} - ${property.location.state}, ${property.location.country}.`}</p>
                            <p className='px-4 text-lg '>{generatePropertyDescription(property)}</p>
                             
                        </CardContent>
                    </Card>
                    <Card className='w-full px-6 flex flex-row max-w-2xl bg-white items-center gap-2 justify-center'>
                        <div className='flex flex-row items-center justify-center'>
                            <div className='flex flex-col items-center gap-2'>
                                <p className='text-xl font-bold'>
                                    {property.rating}
                                </p>
                                <Stars rating={property.rating} />
                            </div>
                            <div className='flex flex-col items-center ml-2 pl-2 border-l-2 border-gray-200'>
                                <p className='text-xl font-bold'>{property.reviewsCount}</p>
                                <p>avaliações</p>
                            </div>
                        </div>
                    </Card>
                    <Card className='w-full px-6 flex flex-row max-w-2xl bg-white items-center gap-2 justify-center'>
                        <Avatar className='h-12 w-12'>
                            <AvatarImage src="https://github.com/shadcn.png" />
                            <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                        <div className='flex flex-col items-start w-full justify-center'>
                            <p className='px-4 font-semibold pb-2 border-b mb-2 w-full'>Hospede-se com {property.host.name}</p>
                            <p className='px-4'>{property.host.superhost ? '(Superhost) · ' : ''} Hospedando há {formatHostSince(property.host.since)}</p>
                        </div>
                    </Card>
                    <Dialog>
                        <DialogTrigger className='w-full rounded-full bg-primary text-lg shadow-lg text-white font-semibold py-4 active:scale-95 transition-transform hover:bg-primary/90 cursor-pointer'>
                            Simular Reserva
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Simular Reserva</DialogTitle>
                            </DialogHeader>
                            
                            <div className="w-full flex items-center justify-end gap-2">
                                <DialogClose asChild>
                                    <Button variant="secondary" className="h-10 px-6 rounded-full ml-2">
                                        Cancelar
                                    </Button>
                                </DialogClose>
                                <DialogClose asChild>
                                    <Button variant="default" className="h-10 px-6 rounded-full text-white">
                                        Aplicar 
                                    </Button>
                                </DialogClose>
                            </div>
                        </DialogContent>
                    </Dialog>
                </div>
            </div>
		</main>
	);
}
