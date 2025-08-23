import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Phone, Mail, MapPin, Clock } from "lucide-react";

const Contact = () => {
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
      details: ["info@bspot-tech.com", "support@bspot-tech.com"],
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

  return (
    <section id="contact" className="py-20 sm:py-24 bg-gradient-secondary relative overflow-hidden">
      {/* Professional Background Elements */}
      <div className="absolute top-20 left-10 w-24 h-24 border border-primary/8 rounded-full animate-float opacity-40" />
      <div className="absolute bottom-20 right-10 w-20 h-20 bg-primary/3 rounded-xl rotate-45 animate-float" style={{ animationDelay: '1s' }} />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 sm:mb-20 animate-scale-in">
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 sm:mb-8 text-foreground leading-tight">
            Get In <span className="elegant-text">Touch</span>
          </h2>
          <p className="text-lg sm:text-xl md:text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
            Transform your connectivity vision into reality. Let's craft a 
            <span className="text-primary font-semibold"> bespoke solution</span> that elevates your digital experience.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Professional Contact Information */}
          <div className="animate-slide-up">
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-8 sm:mb-10 text-foreground">Connect With Excellence</h3>
            <div className="grid gap-6 sm:gap-8">
              {contactInfo.map((info, index) => (
                <Card key={index} className="luxury-card hover-lift group" style={{ animationDelay: `${index * 0.1}s` }}>
                  <CardContent className="p-6 sm:p-8">
                    <div className="flex items-start space-x-4 sm:space-x-6">
                      <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-elegant rounded-xl flex items-center justify-center shadow-tech-glow group-hover:scale-110 transition-all duration-500 flex-shrink-0">
                        <info.icon className="w-6 h-6 sm:w-7 sm:h-7 text-primary-foreground" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3 elegant-text">{info.title}</h4>
                        {info.details.map((detail, idx) => (
                          <p key={idx} className="text-primary font-semibold text-base sm:text-lg mb-1 break-words">{detail}</p>
                        ))}
                        <p className="text-muted-foreground mt-2 font-medium text-sm sm:text-base">{info.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Professional Contact Form */}
          <div className="animate-slide-up" style={{ animationDelay: '0.3s' }}>
            <Card className="luxury-card shadow-elegant-shadow">
              <CardHeader className="pb-6 sm:pb-8">
                <CardTitle className="text-2xl sm:text-3xl md:text-4xl font-bold elegant-text">Send Us a Message</CardTitle>
                <p className="text-muted-foreground text-base sm:text-lg mt-2">Let's discuss your connectivity vision</p>
              </CardHeader>
              <CardContent className="space-y-6 sm:space-y-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  <div>
                    <label className="text-sm font-semibold text-foreground mb-2 sm:mb-3 block tracking-wide">First Name</label>
                    <Input placeholder="John" className="glass-effect border-border/50 h-11 sm:h-12 text-base sm:text-lg rounded-lg" />
                  </div>
                  <div>
                    <label className="text-sm font-semibold text-foreground mb-2 sm:mb-3 block tracking-wide">Last Name</label>
                    <Input placeholder="Doe" className="glass-effect border-border/50 h-11 sm:h-12 text-base sm:text-lg rounded-lg" />
                  </div>
                </div>
                
                <div>
                  <label className="text-sm font-semibold text-foreground mb-2 sm:mb-3 block tracking-wide">Email</label>
                  <Input type="email" placeholder="john@example.com" className="glass-effect border-border/50 h-11 sm:h-12 text-base sm:text-lg rounded-lg" />
                </div>
                
                <div>
                  <label className="text-sm font-semibold text-foreground mb-2 sm:mb-3 block tracking-wide">Phone</label>
                  <Input type="tel" placeholder="+254-750-444-167" className="glass-effect border-border/50 h-11 sm:h-12 text-base sm:text-lg rounded-lg" />
                </div>
                
                <div>
                  <label className="text-sm font-semibold text-foreground mb-2 sm:mb-3 block tracking-wide">Service Needed</label>
                  <select className="w-full p-3 sm:p-4 border border-border/50 rounded-lg glass-effect text-foreground text-base sm:text-lg h-11 sm:h-12 bg-background">
                    <option>Business WiFi Setup</option>
                    <option>Event WiFi Services</option>
                    <option>Network Optimization</option>
                    <option>Technical Support</option>
                    <option>Other</option>
                  </select>
                </div>
                
                <div>
                  <label className="text-sm font-semibold text-foreground mb-2 sm:mb-3 block tracking-wide">Message</label>
                  <Textarea 
                    placeholder="Tell us about your WiFi requirements..."
                    className="glass-effect border-border/50 min-h-[120px] sm:min-h-[140px] text-base sm:text-lg rounded-lg resize-none"
                  />
                </div>
                
                <Button className="w-full premium-button text-lg sm:text-xl py-6 sm:py-8 rounded-xl font-bold tracking-wide">
                  Send Message
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;