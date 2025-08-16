import React from 'react';
import PropertyPage from '@/components/pagesComponents/propertyPage';

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

export default async function Property({ params }: { params: Promise<{ id: string }> }) {
	const { id } = await params; 
	const res = await fetch(`https://mock-api-temporada.onrender.com/properties/${id}`);
	if (!res.ok) throw new Error('Erro ao carregar imóvel');
	const property: Property = await res.json();

	return <PropertyPage property={property} />;
}