import { useState } from "react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Check, Megaphone, Users, TrendingUp, Zap } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";

const adInquirySchema = z.object({
  companyName: z.string().trim().min(1, "Company name is required").max(100),
  contactName: z.string().trim().min(1, "Contact name is required").max(100),
  email: z.string().trim().email("Invalid email address").max(255),
  phone: z.string().trim().min(10).max(20).regex(/^[+\d\s()-]+$/),
  selectedTier: z.string().min(1),
  message: z.string().trim().max(500).optional(),
});

type AdInquiryData = z.infer<typeof adInquirySchema>;

const pricingTiers = [
  {
    name: "Starter",
    price: "KES 5,000",
    period: "/month",
    icon: Zap,
    features: [
      "Banner placement on homepage",
      "5,000+ monthly impressions",
      "Basic analytics report",
      "Email support",
    ],
    popular: false,
  },
  {
    name: "Professional",
    price: "KES 15,000",
    period: "/month",
    icon: TrendingUp,
    features: [
      "Premium banner positions",
      "20,000+ monthly impressions",
      "Detailed analytics dashboard",
      "Priority support",
      "Social media mentions",
    ],
    popular: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "",
    icon: Users,
    features: [
      "Exclusive sponsorship",
      "Unlimited impressions",
      "Custom integrations",
      "Dedicated account manager",
      "Co-branded content",
      "Event sponsorship",
    ],
    popular: false,
  },
];

interface AdvertiseSectionProps {
  className?: string;
}

export function AdvertiseSection({ className = "" }: AdvertiseSectionProps) {
  const { toast } = useToast();
  const [selectedTier, setSelectedTier] = useState("Professional");
  const [formData, setFormData] = useState<AdInquiryData>({
    companyName: "",
    contactName: "",
    email: "",
    phone: "",
    selectedTier: "Professional",
    message: "",
  });
  const [errors, setErrors] = useState<Partial<Record<keyof AdInquiryData, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleTierSelect = (tierName: string) => {
    setSelectedTier(tierName);
    setFormData((prev) => ({ ...prev, selectedTier: tierName }));
  };

  const handleInputChange = (field: keyof AdInquiryData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    setIsSubmitting(true);
    setErrors({});

    try {
      const validatedData = adInquirySchema.parse(formData);

      // Send via edge function
      const { error } = await supabase.functions.invoke("send-contact-email", {
        body: {
          firstName: validatedData.contactName.split(" ")[0] || validatedData.contactName,
          lastName: validatedData.contactName.split(" ").slice(1).join(" ") || "",
          email: validatedData.email,
          phone: validatedData.phone,
          service: `Advertising Inquiry - ${validatedData.selectedTier} Tier`,
          message: `Company: ${validatedData.companyName}\n\nSelected Tier: ${validatedData.selectedTier}\n\n${validatedData.message || "No additional message"}`,
        },
      });

      if (error) throw error;

      toast({
        title: "Inquiry Sent!",
        description: "We'll contact you within 24 hours to discuss advertising opportunities.",
      });

      setFormData({
        companyName: "",
        contactName: "",
        email: "",
        phone: "",
        selectedTier: "Professional",
        message: "",
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErrors: Partial<Record<keyof AdInquiryData, string>> = {};
        error.issues.forEach((issue) => {
          if (issue.path[0]) {
            fieldErrors[issue.path[0] as keyof AdInquiryData] = issue.message;
          }
        });
        setErrors(fieldErrors);
        toast({
          title: "Validation Error",
          description: "Please check the form for errors.",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Error",
          description: "Failed to send inquiry. Please try again.",
          variant: "destructive",
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={`py-16 sm:py-20 bg-gradient-to-br from-muted/30 via-background to-primary/5 ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
            <Megaphone className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">Advertising Opportunities</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 leading-tight">
            <span className="bg-gradient-primary bg-clip-text text-transparent">Advertise With Us</span>
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
            Reach thousands of tech-savvy customers across Kenya. Partner with us to grow your brand visibility.
          </p>
        </div>

        {/* Pricing Tiers */}
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8 mb-12 sm:mb-16">
          {pricingTiers.map((tier, index) => (
            <Card
              key={tier.name}
              onClick={() => handleTierSelect(tier.name)}
              className={`relative cursor-pointer transition-all duration-300 hover:-translate-y-2 ${
                selectedTier === tier.name
                  ? "border-primary shadow-tech-glow scale-[1.02]"
                  : "border-border/50 hover:border-primary/50"
              } ${tier.popular ? "md:-mt-4 md:mb-4" : ""}`}
              style={{
                animationDelay: `${index * 0.1}s`,
              }}
            >
              {tier.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-gradient-primary rounded-full">
                  <span className="text-xs font-bold text-primary-foreground">Most Popular</span>
                </div>
              )}
              <CardHeader className="text-center pb-4">
                <div className={`w-14 h-14 mx-auto rounded-xl flex items-center justify-center mb-4 ${
                  selectedTier === tier.name ? "bg-gradient-primary" : "bg-muted"
                }`}>
                  <tier.icon className={`w-7 h-7 ${
                    selectedTier === tier.name ? "text-primary-foreground" : "text-muted-foreground"
                  }`} />
                </div>
                <CardTitle className="text-xl font-bold">{tier.name}</CardTitle>
                <div className="mt-2">
                  <span className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                    {tier.price}
                  </span>
                  <span className="text-muted-foreground text-sm">{tier.period}</span>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {tier.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-sm">
                      <Check className={`w-4 h-4 mt-0.5 flex-shrink-0 ${
                        selectedTier === tier.name ? "text-primary" : "text-muted-foreground"
                      }`} />
                      <span className="text-foreground/80">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Inquiry Form */}
        <Card className="max-w-2xl mx-auto bg-card/80 backdrop-blur-sm border-border/50 shadow-lg">
          <CardHeader className="text-center pb-4">
            <CardTitle className="text-xl sm:text-2xl font-bold bg-gradient-secondary bg-clip-text text-transparent">
              Get Started Today
            </CardTitle>
            <p className="text-muted-foreground text-sm mt-1">
              Selected: <span className="text-primary font-medium">{selectedTier}</span> tier
            </p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-medium text-foreground mb-1.5 block">Company Name</label>
                  <Input
                    placeholder="Your Company"
                    className="h-10 text-sm"
                    value={formData.companyName}
                    onChange={(e) => handleInputChange("companyName", e.target.value)}
                    maxLength={100}
                  />
                  {errors.companyName && <p className="text-xs text-destructive mt-1">{errors.companyName}</p>}
                </div>
                <div>
                  <label className="text-xs font-medium text-foreground mb-1.5 block">Contact Name</label>
                  <Input
                    placeholder="John Doe"
                    className="h-10 text-sm"
                    value={formData.contactName}
                    onChange={(e) => handleInputChange("contactName", e.target.value)}
                    maxLength={100}
                  />
                  {errors.contactName && <p className="text-xs text-destructive mt-1">{errors.contactName}</p>}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-medium text-foreground mb-1.5 block">Email</label>
                  <Input
                    type="email"
                    placeholder="contact@company.com"
                    className="h-10 text-sm"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    maxLength={255}
                  />
                  {errors.email && <p className="text-xs text-destructive mt-1">{errors.email}</p>}
                </div>
                <div>
                  <label className="text-xs font-medium text-foreground mb-1.5 block">Phone</label>
                  <Input
                    type="tel"
                    placeholder="+254-700-000-000"
                    className="h-10 text-sm"
                    value={formData.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    maxLength={20}
                  />
                  {errors.phone && <p className="text-xs text-destructive mt-1">{errors.phone}</p>}
                </div>
              </div>

              <div>
                <label className="text-xs font-medium text-foreground mb-1.5 block">
                  Additional Information (Optional)
                </label>
                <Textarea
                  placeholder="Tell us about your advertising goals..."
                  className="min-h-[80px] text-sm resize-none"
                  value={formData.message}
                  onChange={(e) => handleInputChange("message", e.target.value)}
                  maxLength={500}
                />
              </div>

              <Button
                type="submit"
                className="w-full premium-button h-11 text-sm font-semibold"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Sending Inquiry..." : "Submit Advertising Inquiry"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default AdvertiseSection;
