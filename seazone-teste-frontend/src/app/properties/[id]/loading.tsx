import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function LoadingPropertyPage() {
    return (
        <main className="flex min-h-screen flex-col items-center bg-background text-foreground">
            {/* Navbar */}
            <nav className="top flex flex-row gap-8 bg-white items-center justify-center h-max w-full p-8 shadow-lg ">
                <div className="flex w-full flex-col gap-2 items-center justify-center">
                <div className="flex w-full flex-row gap-2 items-center">
                    <Skeleton className="h-8 w-32 rounded-md" />
                </div>
                </div>
            </nav>
            <div className="w-full flex flex-row px-32 py-12 items-start gap-6">
                {/* Coluna esquerda (Carrossel + detalhes básicos) */}
                <div className="flex flex-col gap-4">
                    <Skeleton className="w-[500px] h-[350px] rounded-lg" />
                    <Card className="w-[500px] bg-white p-4">
                        <CardContent className="flex flex-col gap-3">
                        <Skeleton className="h-6 w-40" />
                        <Skeleton className="h-4 w-48" />
                        <Skeleton className="h-4 w-32" />
                        <Skeleton className="h-4 w-24" />
                        <Skeleton className="h-4 w-28" />
                        </CardContent>
                    </Card>
                </div>

                {/* Coluna direita (Sobre, rating, host, reserva) */}
                <div className="flex flex-col gap-6 px-12">
                    <Card className="w-[500px] bg-white p-4">
                        <CardContent className="flex flex-col gap-3">
                        <Skeleton className="h-6 w-40" />
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-5/6" />
                        <Skeleton className="h-4 w-2/3" />
                        </CardContent>
                    </Card>

                    <Card className="w-[500px] bg-white p-6 flex flex-row items-center justify-between">
                        <Skeleton className="h-10 w-10 rounded-full" />
                        <Skeleton className="h-6 w-16" />
                        <Skeleton className="h-4 w-24" />
                    </Card>

                    <Card className="w-[500px] bg-white p-6 flex flex-row items-center gap-3">
                        <Skeleton className="h-12 w-12 rounded-full" />
                        <div className="flex flex-col gap-2 w-full">
                            <Skeleton className="h-4 w-40" />
                            <Skeleton className="h-4 w-28" />
                        </div>
                    </Card>
                    <Skeleton className="w-[500px] h-12 rounded-full" />
                </div>
            </div>
        </main>
    );
}