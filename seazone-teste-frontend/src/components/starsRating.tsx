import { Star, StarHalf } from "lucide-react";

export function Stars({ rating }: { rating: number }) {
    const totalStars = 5;

    return (
        <div className="flex gap-1">
            {Array.from({ length: totalStars }).map((_, i) => {
                if (i + 1 <= Math.floor(rating)) {
                    return <Star key={i} className="w-4 h-4 text-accent" />;
                } else if (i < rating) {
                    return <StarHalf key={i} className="w-4 h-4 text-accent" />;
                } else {
                    return <Star key={i} className="w-4 h-4 text-gray-300" />;
                }
            })}
        </div>
    );
}
