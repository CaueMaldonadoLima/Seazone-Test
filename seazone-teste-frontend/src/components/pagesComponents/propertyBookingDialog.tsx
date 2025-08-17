import { useEffect, useState } from "react";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "../ui/dialog";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { toast } from "sonner";
import { Label } from "../ui/label";
import { differenceInCalendarDays, parseISO } from "date-fns";

export default function PropertyBookingDialog({ propertyId }: { propertyId: number }) {
    const [open, setOpen] = useState(false);
    const [checkIn, setCheckIn] = useState("");
    const [checkOut, setCheckOut] = useState("");
    const [guests, setGuests] = useState(1);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [property, setProperty] = useState<{ pricePerNight: number }>({ pricePerNight: 0 });
    const [totalPrice, setTotalPrice] = useState(0);

    useEffect(() => {
        async function fetchProperty() {
            const res = await fetch(`http://localhost:3001/properties/${propertyId}`);
            const data = await res.json();
            setProperty(data);
        }
        fetchProperty();
    }, [propertyId]);

    useEffect(() => {
        if (checkIn && checkOut) {
            const start = parseISO(checkIn);
            const end = parseISO(checkOut);
            const days = differenceInCalendarDays(end, start);
            setTotalPrice(days > 0 ? days * property.pricePerNight : 0);
        } else {
            setTotalPrice(0);
        }
    }, [checkIn, checkOut, property.pricePerNight]);

    const handleBooking = async () => {
         if (!checkIn || !checkOut || !guests || !name || !email) {
            toast.error("Todos os campos são obrigatórios.");
            return;
        }

        if (new Date(checkIn) > new Date(checkOut)) {
            toast.error("A data de entrada não pode ser maior que a data de saída.");
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            toast.error("Por favor, insira um email válido.");
            return;
        }

        try {
        const res = await fetch("http://localhost:3001/bookings", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                propertyId,
                checkIn,
                checkOut,
                guests,
                customerName: name,
                customerEmail: email,
            }),
        });

        const data = await res.json();

        if (!res.ok) throw new Error(data.message || "Erro ao criar reserva");

        toast.success(data.message, {
            action: {
            label: "Fechar",
            onClick: () => console.log("Fechar"),
            },
        });

        setCheckIn("");
        setCheckOut("");
        setGuests(1);
        setName("");
        setEmail("");
        setOpen(false);

        } catch (err: any) {
            toast.error(err.message || "Erro inesperado. Tente novamente.");
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger className="w-full rounded-full bg-primary text-lg shadow-lg text-white font-semibold py-4 active:scale-95 transition-transform hover:bg-primary/90 cursor-pointer">
                Simular reserva
            </DialogTrigger>
            <DialogContent>
                <DialogHeader className="pb-2 border-b">
                    <DialogTitle>Faça sua Reserva!</DialogTitle>
                </DialogHeader>
                <div className="flex flex-col gap-4">
                    <div className="flex flex-col md:flex-row gap-4">
                        <div className="flex flex-col w-full">
                            <Label className="text-sm font-semibold">Check-in</Label>
                            <Input
                                type="date"
                                value={checkIn}
                                onChange={(e) => setCheckIn(e.target.value)}
                            />
                        </div>
                        <div className="flex flex-col w-full">
                            <Label className="text-sm font-semibold">Check-out</Label>
                            <Input
                                type="date"
                                value={checkOut}
                                onChange={(e) => setCheckOut(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="flex flex-col w-full">
                        <Label className="text-sm font-semibold">Total da reserva</Label>
                        <Input 
                            type="text"
                            value={totalPrice > 0 ? `R$${totalPrice},00` : "-"}
                            readOnly
                            className="bg-gray-100 cursor-not-allowed"
                        />
                    </div>
                    <div className="flex flex-col w-full">
                        <Label className="text-sm font-semibold">Número de Hóspedes</Label>
                        <Input
                            type="number"
                            min={1}
                            value={guests}
                            onChange={(e) => setGuests(Number(e.target.value))}
                        />
                    </div>
                    <div className="flex flex-col w-full">
                        <Label className="text-sm font-semibold">Nome Completo</Label>
                        <Input
                            type="text"
                            placeholder="John Doe"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <div className="flex flex-col w-full">
                        <Label className="text-sm font-semibold">Email</Label>
                        <Input
                            placeholder="johndoe.@example.com"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                </div>
                <DialogFooter>
                    <Button onClick={handleBooking} className="w-full text-white">
                        Confirmar Reserva
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
