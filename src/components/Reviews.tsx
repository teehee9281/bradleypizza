import { Star } from 'lucide-react';

interface Review {
  name: string;
  rating: number;
  text: string;
  time: string;
}

interface ReviewsProps {
  reviews: Review[];
}

export function Reviews({ reviews }: ReviewsProps) {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
      {reviews.map((review, index) => (
        <article
          key={`${review.name}-${index}`}
          className="bg-card border border-border rounded-2xl p-6 shadow-[var(--shadow-card)] hover:border-accent hover:scale-105 transition-all duration-300 cursor-pointer"
        >
          <div className="flex items-center gap-1 mb-3">
            {[...Array(review.rating)].map((_, i) => (
              <Star key={i} className="h-4 w-4 fill-primary text-primary" />
            ))}
          </div>
          <p className="text-sm text-foreground mb-4 line-clamp-4">{review.text}</p>
          <div className="flex items-center justify-between">
            <p className="font-semibold text-sm">{review.name}</p>
            <p className="text-xs text-muted-foreground">{review.time}</p>
          </div>
        </article>
      ))}
    </div>
  );
}
