import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "./ui/label";
import { Button } from "./ui/button";

interface FilterContentProps {
	filters: any;
	setFilters: (filters: any) => void;
	onApply: () => void;
	onClear: () => void;
}


export default function FilterContent({ filters, setFilters, onApply, onClear }: FilterContentProps) {
	return (
		<div className="flex flex-col gap-4">
			<div className="flex flex-row w-full items-center justify-between gap-2">
				<div className="flex flex-col gap-1 w-full">
					<Label className="px-1" htmlFor="city">Cidade</Label>
					<Input 
						id="city" 
						placeholder="Digite a cidade" 
						className="bg-white h-10 rounded-full" 
						value={filters.city}
						onChange={(e) => setFilters({ ...filters, city: e.target.value })}
					/>
				</div>
				<div className="flex flex-col gap-1 w-full">
					<Label className="px-1" htmlFor="state">Estado</Label>
					<Input 
						id="state" 
						placeholder="Digite o estado" 
						className="bg-white h-10 rounded-full"
						value={filters.state}
						onChange={(e) => setFilters({ ...filters, state: e.target.value })}
					/>
				</div>

			</div>
			<div className="flex flex-col gap-1">
				<Label className="px-1" htmlFor="type">Tipo de imóvel</Label>
				<Select
					value={filters.type}
          			onValueChange={(val: string) => setFilters({ ...filters, type: val })}
				>
					<SelectTrigger id="type" className="h-10 w-full rounded-full bg-white border-black/40">
						<SelectValue placeholder="Selecione o tipo" />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value="apartamento">Apartamento</SelectItem>
						<SelectItem value="casa">Casa</SelectItem>
						<SelectItem value="chale">Chalé</SelectItem>
						<SelectItem value="cabana">Cabana</SelectItem>
						<SelectItem value="flat">Flat</SelectItem>
					</SelectContent>
				</Select>
			</div>
			<div className="flex flex-col gap-1">
				<Label className="px-1" htmlFor="price">Faixa de preço</Label>
				<Input 
					id="price" 
					placeholder="Ex: 100-500" 
					className="bg-white h-10 rounded-full" 
					value={filters.price}
					onChange={(e) => setFilters({ ...filters, price: e.target.value })}
				/>
			</div>
			<div className="flex flex-col gap-1">
				<Label className="px-1" htmlFor="guests">Capacidade de hóspedes</Label>
				<Input 
					id="guests" 
					placeholder="Máx. de hóspedes" 
					type="number" 
					className="bg-white h-10 rounded-full" 
					value={filters.guests || ''}
					onChange={(e) => setFilters({ ...filters, guests: Number(e.target.value) || '' })}
				/>
			</div>
			<div className="flex flex-col gap-1">
				<Label className="px-1" htmlFor="bedrooms">Quantidade de quartos</Label>
				<Input 
					id="bedrooms" 
					placeholder="Número de quartos" 
					type="number" 
					className="bg-white h-10 rounded-full" 
					value={filters.bedrooms || ''}
					onChange={(e) => setFilters({ ...filters, bedrooms: Number(e.target.value) || '' })}
				/>
			</div>
			<div className="flex flex-col gap-1">
				<Label className="px-1" htmlFor="amenities">Comodidades</Label>
				<Input 
					id="amenities" 
					placeholder="Ex: Wi-Fi, Piscina, Lareira" 
					className="bg-white h-10 rounded-full" 
					value={filters.amenities}
					onChange={(e) => setFilters({ ...filters, amenities: e.target.value })}
				/>
			</div>
			<div className="flex items-center gap-2">
				<Checkbox 
					id="available"  
					checked={filters.available}
          			onCheckedChange={val => setFilters({ ...filters, available: !!val })}
				/>
				<Label className="px-1" htmlFor="available">Somente imóveis disponíveis</Label>
			</div>
			
		</div>
	);
}
