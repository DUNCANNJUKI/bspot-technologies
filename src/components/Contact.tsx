import { useState } from "react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";

import { FloatingTechIcons } from "./FloatingTechIcons";

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
      details: ["+254-750-444-167"],
      description: "24/7 Support Line"
    },
    {
      icon: Mail,
      title: "Email",
      details: ["bspottechnologies@gmail.com"],
      description: "Business Inquiries"
    },
    {
      icon: MapPin,
      title: "Service Area",
      details: ["Nairobi, Kikuyu, Meru, Regen"],
      description: "Nationwide Coverage"
    },
    {
      icon: Clock,
      title: "Business Hours",
      details: ["Mon-Fri: 8AM-6PM"],
      description: "24/7 Emergency Support"
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
    <div className="py-16 sm:py-20 lg:py-24 bg-background relative overflow-hidden">
      {/* Floating Tech Icons Background */}
      <FloatingTechIcons variant="dense" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-12 sm:mb-16 animate-scale-in">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 leading-tight">
            Get In <span className="bg-gradient-primary bg-clip-text text-transparent">Touch</span>
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Ready to transform your connectivity? Let's craft a solution tailored to your needs.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Contact Information */}
          <div className="space-y-6 animate-slide-up">
            <h3 className="text-xl sm:text-2xl font-bold mb-6 bg-gradient-secondary bg-clip-text text-transparent">
              Connect With Us
            </h3>
            
            <div className="grid gap-4">
              {contactInfo.map((info, index) => (
                <Card key={index} className="bg-card/50 backdrop-blur-sm border-border/50 hover:-translate-y-1 transition-all duration-300">
                  <CardContent className="p-4 sm:p-5">
                    <div className="flex items-center space-x-4">
                      <div className="w-11 h-11 bg-gradient-primary rounded-xl flex items-center justify-center flex-shrink-0">
                        <info.icon className="w-5 h-5 text-primary-foreground" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <h4 className="text-sm font-semibold text-foreground mb-0.5">{info.title}</h4>
                        <p className="text-primary font-medium text-sm truncate">{info.details[0]}</p>
                        <p className="text-muted-foreground text-xs">{info.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Contact Form */}
          <div className="animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <Card className="bg-card/80 backdrop-blur-sm border-border/50 shadow-lg">
              <CardHeader className="pb-4">
                <CardTitle className="text-xl sm:text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                  Send Us a Message
                </CardTitle>
                <p className="text-muted-foreground text-sm mt-1">We'll get back to you within 24 hours</p>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-medium text-foreground mb-1.5 block">First Name</label>
                      <Input 
                        placeholder="John" 
                        className="h-10 text-sm"
                        value={formData.firstName}
                        onChange={(e) => handleInputChange('firstName', e.target.value)}
                        maxLength={50}
                      />
                      {errors.firstName && <p className="text-xs text-destructive mt-1">{errors.firstName}</p>}
                    </div>
                    <div>
                      <label className="text-xs font-medium text-foreground mb-1.5 block">Last Name</label>
                      <Input 
                        placeholder="Doe" 
                        className="h-10 text-sm"
                        value={formData.lastName}
                        onChange={(e) => handleInputChange('lastName', e.target.value)}
                        maxLength={50}
                      />
                      {errors.lastName && <p className="text-xs text-destructive mt-1">{errors.lastName}</p>}
                    </div>
                  </div>
                  
                  <div>
                    <label className="text-xs font-medium text-foreground mb-1.5 block">Email</label>
                    <Input 
                      type="email" 
                      placeholder="john@example.com" 
                      className="h-10 text-sm"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      maxLength={255}
                    />
                    {errors.email && <p className="text-xs text-destructive mt-1">{errors.email}</p>}
                  </div>
                  
                  <div>
                    <label className="text-xs font-medium text-foreground mb-1.5 block">Phone</label>
                    <Input 
                      type="tel" 
                      placeholder="+254-750-444-167" 
                      className="h-10 text-sm"
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      maxLength={20}
                    />
                    {errors.phone && <p className="text-xs text-destructive mt-1">{errors.phone}</p>}
                  </div>
                  
                  <div>
                    <label className="text-xs font-medium text-foreground mb-1.5 block">Service Needed</label>
                    <select 
                      className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground text-sm h-10"
                      value={formData.service}
                      onChange={(e) => handleInputChange('service', e.target.value)}
                    >
                      <option>Business WiFi Setup</option>
                      <option>Event WiFi Services</option>
                      <option>Network Optimization</option>
                      <option>Technical Support</option>
                      <option>Other</option>
                    </select>
                    {errors.service && <p className="text-xs text-destructive mt-1">{errors.service}</p>}
                  </div>
                  
                  <div>
                    <label className="text-xs font-medium text-foreground mb-1.5 block">
                      Message ({formData.message.length}/1000)
                    </label>
                    <Textarea 
                      placeholder="Tell us about your WiFi requirements..."
                      className="min-h-[100px] text-sm resize-none"
                      value={formData.message}
                      onChange={(e) => handleInputChange('message', e.target.value)}
                      maxLength={1000}
                    />
                    {errors.message && <p className="text-xs text-destructive mt-1">{errors.message}</p>}
                  </div>
                  
                  <Button 
                    type="submit"
                    className="w-full premium-button h-11 text-sm font-semibold"
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
    </div>
  );
};

export default Contact;
