'use client'
import NavigationBar from "@/components/navigationBar";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

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

export default function HomePage() {

	const [properties, setProperties] = useState<Property[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

    const [filters, setFilters] = useState({title: '', city: '', state: '', type: '', price: '', guests: '', bedrooms: '', amenities: '', available: false});
    const [filteredProperties, setFilteredProperties] = useState<Property[]>([]);

	useEffect(() => {
		fetch("https://mock-api-temporada.onrender.com/properties")
		.then((res) => {
			if (!res.ok) throw new Error("Erro ao carregar dados");
			return res.json();
		})
		.then((data) => {
            setProperties(data);
            setFilteredProperties(data); 
        })
		.catch((err) => setError(err.message))
		.finally(() => setLoading(false));
	}, []);

    const applyFilters = () => {
        let filtered = [...properties];

        if (filters.title) {
            filtered = filtered.filter(p =>
                p.title.toLowerCase().includes(filters.title.toLowerCase())
            );
        }
        if (filters.city) filtered = filtered.filter(p => p.location.city.toLowerCase().includes(filters.city.toLowerCase()));
        if (filters.state) filtered = filtered.filter(p => p.location.state.toLowerCase().includes(filters.state.toLowerCase()));
        if (filters.type) filtered = filtered.filter(p => p.type.toLowerCase() === filters.type.toLowerCase());
        if (filters.price) {
            const [min, max] = filters.price.split("-").map(Number);
            if (!isNaN(min)) filtered = filtered.filter(p => p.pricePerNight >= min);
            if (!isNaN(max)) filtered = filtered.filter(p => p.pricePerNight <= max);
        }
        if (filters.guests) filtered = filtered.filter(p => p.maxGuests >= Number(filters.guests));
        if (filters.bedrooms) filtered = filtered.filter(p => p.bedrooms >= Number(filters.bedrooms));
        if (filters.amenities) {
            const amenitiesArray = filters.amenities.toLowerCase().split(",").map(a => a.trim());
            filtered = filtered.filter(p => amenitiesArray.every(a => p.amenities.map(am => am.toLowerCase()).includes(a)));
        }
        if (filters.available) filtered = filtered.filter(p => p.isAvailable);

        setFilteredProperties(filtered);
    };

    const clearFilters = () => {
        setFilters({title: '', city: '', state: '', type: '', price: '', guests: '', bedrooms: '', amenities: '', available: false}); 
        setFilteredProperties(properties);
    };

	if (loading) return <p>Carregando...</p>;
	if (error) return <p>Erro: {error}</p>;


	return (
		<main className="flex min-h-screen flex-col items-center bg-background text-foreground">
			<NavigationBar 
                filters={filters}
                setFilters={setFilters}
                onApplyFilters={applyFilters}
                onClearFilters={clearFilters}
            />
            <div className="w-full flex flex-col p-12">
                <div className="flex flex-row items-center  mb-4">
                    <p className="text-2xl items-center">Lista de imóveis</p>
                    <p className="pt-2 px-2"><ChevronRight size={20} /></p>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-5 md:grid-cols-7 gap-2 w-full">
                    {filteredProperties.length === 0 ? (
                        <div className="flex items-center justify-center col-span-full">
                            <p className="text-gray-500 text-xl italic">Nenhum imóvel encontrado</p>
                        </div>
                    ) : (
                        filteredProperties.map((property: Property, index: number) => (
                            <Link href={"#"} key={index} className="p-1">
                            <img
                                src={property.images[0]}
                                alt={property.title}
                                className="w-full h-auto rounded-lg mb-2"
                                onError={(e) => {
                                    const target = e.currentTarget as HTMLImageElement;
                                    target.src = "https://picsum.photos/800/600?blur=2";
                                }}
                            />
                            <p className="font-semibold text-sm">{property.title}</p>
                            <p className="font-semibold text-xs text-gray-700">
                                {`R$${property.pricePerNight},00 por noite · ★${property.rating}`}
                            </p>
                            <p className="font-semibold text-xs text-gray-700">
                                {property.location.city}, {property.location.state}, {property.location.country}
                            </p>
                            <p className="font-semibold text-xs text-gray-700">
                                {property.isAvailable ? 'Disponível' : 'Indisponível'}
                            </p>
                            </Link>
                        ))
                    )}
                </div>
            </div>
		</main>
	);
}
