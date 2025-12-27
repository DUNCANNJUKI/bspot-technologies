import { Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface Testimonial {
  id: number;
  name: string;
  role: string;
  company: string;
  content: string;
  rating: number;
  avatar?: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "James Mwangi",
    role: "IT Director",
    company: "Safaricom PLC",
    content: "Bspot Networks transformed our connectivity infrastructure. Their fiber installation was seamless, and the uptime has been exceptional. Highly recommend their services!",
    rating: 5,
  },
  {
    id: 2,
    name: "Aisha Ochieng",
    role: "Operations Manager",
    company: "Kenya Airways",
    content: "The team's expertise in network solutions is unmatched. They delivered our enterprise WiFi project ahead of schedule with outstanding quality.",
    rating: 5,
  },
  {
    id: 3,
    name: "David Kimani",
    role: "CEO",
    company: "TechHub Nairobi",
    content: "Reliable, professional, and innovative. Bspot Networks has been our trusted partner for all networking needs. Their support team is always responsive.",
    rating: 5,
  },
  {
    id: 4,
    name: "Grace Wanjiku",
    role: "Facility Manager",
    company: "Kenyatta Hospital",
    content: "Critical infrastructure requires reliable connectivity. Bspot delivered exactly that - robust network solutions that our medical facility depends on daily.",
    rating: 4,
  },
  {
    id: 5,
    name: "Michael Otieno",
    role: "CTO",
    company: "M-Pesa Foundation",
    content: "From consultation to implementation, the Bspot team demonstrated exceptional professionalism. Our data center connectivity has never been better.",
    rating: 5,
  },
  {
    id: 6,
    name: "Sarah Njeri",
    role: "Branch Manager",
    company: "Equity Bank",
    content: "Outstanding service! The network infrastructure they installed has significantly improved our branch operations and customer experience.",
    rating: 5,
  },
];

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          className={`h-4 w-4 ${
            i < rating
              ? "fill-yellow-400 text-yellow-400"
              : "fill-muted text-muted"
          }`}
        />
      ))}
    </div>
  );
}

function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  const initials = testimonial.name
    .split(" ")
    .map((n) => n[0])
    .join("");

  return (
    <Card className="bg-card/50 backdrop-blur-sm border-border/50 hover:border-primary/30 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5">
      <CardContent className="p-6">
        <div className="flex items-start gap-4 mb-4">
          <Avatar className="h-12 w-12 border-2 border-primary/20">
            <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
            <AvatarFallback className="bg-primary/10 text-primary font-semibold">
              {initials}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <h4 className="font-semibold text-foreground">{testimonial.name}</h4>
            <p className="text-sm text-muted-foreground">
              {testimonial.role}, {testimonial.company}
            </p>
          </div>
        </div>
        <StarRating rating={testimonial.rating} />
        <p className="mt-4 text-muted-foreground leading-relaxed">
          "{testimonial.content}"
        </p>
      </CardContent>
    </Card>
  );
}

export default function Testimonials() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-background to-muted/20">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            What Our Clients Say
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Trusted by leading organizations across Kenya for reliable network solutions
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial) => (
            <TestimonialCard key={testimonial.id} testimonial={testimonial} />
          ))}
        </div>
      </div>
    </section>
  );
}
