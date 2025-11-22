import { useState } from "react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Phone, Mail, MapPin, Clock, Facebook, Youtube } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";

const contactSchema = z.object({
  firstName: z.string()
    .trim()
    .min(1, "First name is required")
    .max(50, "First name must be less than 50 characters"),
  lastName: z.string()
    .trim()
    .min(1, "Last name is required")
    .max(50, "Last name must be less than 50 characters"),
  email: z.string()
    .trim()
    .email("Invalid email address")
    .max(255, "Email must be less than 255 characters"),
  phone: z.string()
    .trim()
    .min(10, "Phone number must be at least 10 characters")
    .max(20, "Phone number must be less than 20 characters")
    .regex(/^[+\d\s()-]+$/, "Invalid phone number format"),
  service: z.string().min(1, "Please select a service"),
  message: z.string()
    .trim()
    .min(10, "Message must be at least 10 characters")
    .max(1000, "Message must be less than 1000 characters")
});

type ContactFormData = z.infer<typeof contactSchema>;

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState<ContactFormData>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    service: "Business WiFi Setup",
    message: ""
  });
  const [errors, setErrors] = useState<Partial<Record<keyof ContactFormData, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const contactInfo = [
    {
      icon: Phone,
      title: "Phone",
      details: ["+254-750-444-167", "24/7 Support Line"],
      description: "Call us for immediate assistance"
    },
    {
      icon: Mail,
      title: "Email",
      details: ["bspottechnologies@gmail.com"],
      description: "Send us your inquiries"
    },
    {
      icon: MapPin,
      title: "Service Area",
      details: ["Nairobi Area Coverage", "Nationwide Solutions"],
      description: "We serve multiple locations"
    },
    {
      icon: Clock,
      title: "Business Hours",
      details: ["Mon-Fri: 8AM-6PM", "24/7 Emergency Support"],
      description: "When you can reach us"
    }
  ];

  const handleInputChange = (field: keyof ContactFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error for this field when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const sanitizeInput = (input: string): string => {
    return input
      .replace(/[<>]/g, '') // Remove potential HTML tags
      .trim();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isSubmitting) return;
    
    setIsSubmitting(true);
    setErrors({});

    try {
      // Validate form data
      const validatedData = contactSchema.parse(formData);
      
      // Sanitize all inputs
      const sanitizedData = {
        firstName: sanitizeInput(validatedData.firstName),
        lastName: sanitizeInput(validatedData.lastName),
        email: sanitizeInput(validatedData.email),
        phone: sanitizeInput(validatedData.phone),
        service: sanitizeInput(validatedData.service),
        message: sanitizeInput(validatedData.message)
      };

      console.log("Sending email via edge function:", sanitizedData);

      // Send email via edge function
      const { data, error } = await supabase.functions.invoke('send-contact-email', {
        body: sanitizedData,
      });

      if (error) {
        throw error;
      }

      console.log("Email sent successfully:", data);

      // Show success message
      toast({
        title: "Message sent!",
        description: "We've received your message and will get back to you soon.",
      });

      // Reset form
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        service: "Business WiFi Setup",
        message: ""
      });

    } catch (error) {
      if (error instanceof z.ZodError) {
        // Set validation errors
        const fieldErrors: Partial<Record<keyof ContactFormData, string>> = {};
        error.issues.forEach((issue) => {
          if (issue.path[0]) {
            fieldErrors[issue.path[0] as keyof ContactFormData] = issue.message;
          }
        });
        setErrors(fieldErrors);
        
        toast({
          title: "Validation Error",
          description: "Please check the form for errors and try again.",
          variant: "destructive"
        });
      } else {
        console.error("Error sending email:", error);
        toast({
          title: "Error",
          description: "Failed to send message. Please try again or contact us directly.",
          variant: "destructive"
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-20 sm:py-24 bg-background relative overflow-hidden">
      {/* Tech Background Elements */}
      <div className="absolute top-20 left-10 w-24 h-24 border-2 border-primary/20 rounded-full animate-pulse opacity-30" />
      <div className="absolute bottom-20 right-10 w-20 h-20 bg-primary/10 rounded-xl rotate-45 animate-float" style={{ animationDelay: '1s' }} />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 sm:mb-20 animate-scale-in">
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 sm:mb-8 leading-tight">
            Get In <span className="bg-gradient-primary bg-clip-text text-transparent">Touch</span>
          </h2>
          <p className="text-lg sm:text-xl md:text-2xl text-foreground/70 max-w-4xl mx-auto leading-relaxed">
            Transform your connectivity vision into reality. Let's craft a 
            <span className="text-primary font-bold"> bespoke solution</span> that elevates your digital experience.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Professional Contact Information */}
          <div className="animate-slide-up">
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-8 sm:mb-10 bg-gradient-secondary bg-clip-text text-transparent">Connect With Excellence</h3>
            <div className="grid gap-6 sm:gap-8">
              {contactInfo.map((info, index) => (
                <Card key={index} className="luxury-card hover:-translate-y-2 transition-all duration-500 group border-primary/20" style={{ animationDelay: `${index * 0.1}s` }}>
                  <CardContent className="p-6 sm:p-8">
                    <div className="flex items-start space-x-4 sm:space-x-6">
                      <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-primary rounded-xl flex items-center justify-center shadow-tech-glow group-hover:scale-110 transition-all duration-500 flex-shrink-0">
                        <info.icon className="w-6 h-6 sm:w-7 sm:h-7 text-primary-foreground" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3 bg-gradient-primary bg-clip-text text-transparent">{info.title}</h4>
                        {info.details.map((detail, idx) => (
                          <p key={idx} className="text-primary font-bold text-base sm:text-lg mb-1 break-words">{detail}</p>
                        ))}
                        <p className="text-muted-foreground mt-2 font-medium text-sm sm:text-base">{info.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            {/* Social Media Section */}
            <Card className="luxury-card hover:-translate-y-2 transition-all duration-500 group border-primary/20 mt-8" style={{ animationDelay: '0.4s' }}>
              <CardContent className="p-6 sm:p-8">
                <h4 className="text-xl font-bold mb-6 bg-gradient-primary bg-clip-text text-transparent">Follow Us</h4>
                <div className="flex items-center justify-start space-x-6">
                  <a 
                    href="https://www.facebook.com/people/B-Spot-Technologies/61574108452350/?rdid=DTgk4hdhIKNRQlaM&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F17CUFWVonm%2F" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="group/icon"
                    aria-label="Follow us on Facebook"
                  >
                    <div className="relative w-16 h-16 rounded-2xl bg-[#1877F2] flex items-center justify-center group-hover/icon:scale-110 group-hover/icon:shadow-2xl group-hover/icon:shadow-[#1877F2]/60 transition-all duration-300 overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-br from-white/30 to-transparent opacity-0 group-hover/icon:opacity-100 transition-opacity duration-300"></div>
                      <Facebook className="w-8 h-8 text-white relative z-10" fill="white" />
                      <div className="absolute inset-0 rounded-2xl border-2 border-white/0 group-hover/icon:border-white/30 transition-all duration-300"></div>
                    </div>
                  </a>
                  <a 
                    href="https://youtube.com/@beeent001?si=pU8Pv6dL_F2VvG6y" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="group/icon"
                    aria-label="Subscribe on YouTube"
                  >
                    <div className="relative w-16 h-16 rounded-2xl bg-[#FF0000] flex items-center justify-center group-hover/icon:scale-110 group-hover/icon:shadow-2xl group-hover/icon:shadow-[#FF0000]/60 transition-all duration-300 overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-br from-white/30 to-transparent opacity-0 group-hover/icon:opacity-100 transition-opacity duration-300"></div>
                      <Youtube className="w-8 h-8 text-white relative z-10" fill="white" />
                      <div className="absolute inset-0 rounded-2xl border-2 border-white/0 group-hover/icon:border-white/30 transition-all duration-300"></div>
                    </div>
                  </a>
                  <a 
                    href="https://x.com/ent_bee?t=QUDS0XTLVz-3R1wjJO_E-w&s=09" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="group/icon"
                    aria-label="Follow us on X"
                  >
                    <div className="relative w-16 h-16 rounded-2xl bg-[#000000] dark:bg-[#FFFFFF] flex items-center justify-center group-hover/icon:scale-110 group-hover/icon:shadow-2xl group-hover/icon:shadow-slate-500/60 transition-all duration-300 overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-br from-white/30 dark:from-black/30 to-transparent opacity-0 group-hover/icon:opacity-100 transition-opacity duration-300"></div>
                      <svg 
                        className="w-7 h-7 text-white dark:text-black relative z-10" 
                        viewBox="0 0 24 24" 
                        fill="currentColor"
                      >
                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                      </svg>
                      <div className="absolute inset-0 rounded-2xl border-2 border-white/0 dark:border-black/0 group-hover/icon:border-white/30 dark:group-hover/icon:border-black/30 transition-all duration-300"></div>
                    </div>
                  </a>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Professional Contact Form */}
          <div className="animate-slide-up" style={{ animationDelay: '0.3s' }}>
            <Card className="luxury-card shadow-card-shadow border-primary/20">
              <CardHeader className="pb-6 sm:pb-8">
                <CardTitle className="text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent">Send Us a Message</CardTitle>
                <p className="text-muted-foreground text-base sm:text-lg mt-2">Let's discuss your connectivity vision</p>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-8">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                    <div>
                      <label className="text-sm font-semibold text-foreground mb-2 sm:mb-3 block tracking-wide">First Name</label>
                      <Input 
                        placeholder="John" 
                        className="glass-effect border-border/50 h-11 sm:h-12 text-base sm:text-lg rounded-lg"
                        value={formData.firstName}
                        onChange={(e) => handleInputChange('firstName', e.target.value)}
                        maxLength={50}
                      />
                      {errors.firstName && <p className="text-sm text-destructive mt-1">{errors.firstName}</p>}
                    </div>
                    <div>
                      <label className="text-sm font-semibold text-foreground mb-2 sm:mb-3 block tracking-wide">Last Name</label>
                      <Input 
                        placeholder="Doe" 
                        className="glass-effect border-border/50 h-11 sm:h-12 text-base sm:text-lg rounded-lg"
                        value={formData.lastName}
                        onChange={(e) => handleInputChange('lastName', e.target.value)}
                        maxLength={50}
                      />
                      {errors.lastName && <p className="text-sm text-destructive mt-1">{errors.lastName}</p>}
                    </div>
                  </div>
                  
                  <div>
                    <label className="text-sm font-semibold text-foreground mb-2 sm:mb-3 block tracking-wide">Email</label>
                    <Input 
                      type="email" 
                      placeholder="john@example.com" 
                      className="glass-effect border-border/50 h-11 sm:h-12 text-base sm:text-lg rounded-lg"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      maxLength={255}
                    />
                    {errors.email && <p className="text-sm text-destructive mt-1">{errors.email}</p>}
                  </div>
                  
                  <div>
                    <label className="text-sm font-semibold text-foreground mb-2 sm:mb-3 block tracking-wide">Phone</label>
                    <Input 
                      type="tel" 
                      placeholder="+254-750-444-167" 
                      className="glass-effect border-border/50 h-11 sm:h-12 text-base sm:text-lg rounded-lg"
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      maxLength={20}
                    />
                    {errors.phone && <p className="text-sm text-destructive mt-1">{errors.phone}</p>}
                  </div>
                  
                  <div>
                    <label className="text-sm font-semibold text-foreground mb-2 sm:mb-3 block tracking-wide">Service Needed</label>
                    <select 
                      className="w-full p-3 sm:p-4 border border-border/50 rounded-lg glass-effect text-foreground text-base sm:text-lg h-11 sm:h-12 bg-background"
                      value={formData.service}
                      onChange={(e) => handleInputChange('service', e.target.value)}
                    >
                      <option>Business WiFi Setup</option>
                      <option>Event WiFi Services</option>
                      <option>Network Optimization</option>
                      <option>Technical Support</option>
                      <option>Other</option>
                    </select>
                    {errors.service && <p className="text-sm text-destructive mt-1">{errors.service}</p>}
                  </div>
                  
                  <div>
                    <label className="text-sm font-semibold text-foreground mb-2 sm:mb-3 block tracking-wide">
                      Message ({formData.message.length}/1000)
                    </label>
                    <Textarea 
                      placeholder="Tell us about your WiFi requirements..."
                      className="glass-effect border-border/50 min-h-[120px] sm:min-h-[140px] text-base sm:text-lg rounded-lg resize-none"
                      value={formData.message}
                      onChange={(e) => handleInputChange('message', e.target.value)}
                      maxLength={1000}
                    />
                    {errors.message && <p className="text-sm text-destructive mt-1">{errors.message}</p>}
                  </div>
                  
                  <Button 
                    type="submit"
                    className="w-full premium-button text-lg sm:text-xl py-6 sm:py-8 rounded-xl font-bold tracking-wide"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Sending..." : "Send Message"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
