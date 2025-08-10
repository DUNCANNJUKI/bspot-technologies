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
    <section id="contact" className="py-24 bg-gradient-secondary relative overflow-hidden">
      {/* Elegant Background Elements */}
      <div className="absolute top-20 left-10 w-32 h-32 border border-primary/10 rounded-full animate-float opacity-30" />
      <div className="absolute bottom-20 right-10 w-24 h-24 bg-primary/5 rounded-2xl rotate-45 animate-float" style={{ animationDelay: '1s' }} />
      
      <div className="container mx-auto px-6">
        <div className="text-center mb-20 animate-scale-in">
          <h2 className="text-5xl md:text-6xl font-bold mb-8 text-foreground leading-tight">
            Get In <span className="elegant-text">Touch</span>
          </h2>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
            Transform your connectivity vision into reality. Let's craft a 
            <span className="text-primary font-medium"> bespoke solution</span> that elevates your digital experience.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16">
          {/* Premium Contact Information */}
          <div className="animate-slide-up">
            <h3 className="text-3xl md:text-4xl font-bold mb-10 text-foreground">Connect With Excellence</h3>
            <div className="grid gap-8">
              {contactInfo.map((info, index) => (
                <Card key={index} className="luxury-card hover-lift group" style={{ animationDelay: `${index * 0.1}s` }}>
                  <CardContent className="p-8">
                    <div className="flex items-start space-x-6">
                      <div className="w-16 h-16 bg-gradient-elegant rounded-2xl flex items-center justify-center shadow-tech-glow group-hover:scale-110 transition-all duration-500">
                        <info.icon className="w-8 h-8 text-primary-foreground" />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-xl font-bold mb-3 elegant-text">{info.title}</h4>
                        {info.details.map((detail, idx) => (
                          <p key={idx} className="text-primary font-semibold text-lg mb-1">{detail}</p>
                        ))}
                        <p className="text-muted-foreground mt-2 font-medium">{info.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Premium Contact Form */}
          <div className="animate-slide-up" style={{ animationDelay: '0.3s' }}>
            <Card className="luxury-card shadow-elegant-shadow">
              <CardHeader className="pb-8">
                <CardTitle className="text-3xl md:text-4xl font-bold elegant-text">Send Us a Message</CardTitle>
                <p className="text-muted-foreground text-lg mt-2">Let's discuss your connectivity vision</p>
              </CardHeader>
              <CardContent className="space-y-8">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="text-sm font-semibold text-foreground mb-3 block tracking-wide">First Name</label>
                    <Input placeholder="BEE" className="glass-effect border-border/50 h-12 text-lg rounded-xl" />
                  </div>
                  <div>
                    <label className="text-sm font-semibold text-foreground mb-3 block tracking-wide">Last Name</label>
                    <Input placeholder="ENT" className="glass-effect border-border/50 h-12 text-lg rounded-xl" />
                  </div>
                </div>
                
                <div>
                  <label className="text-sm font-semibold text-foreground mb-3 block tracking-wide">Email</label>
                  <Input type="email" placeholder="john@example.com" className="glass-effect border-border/50 h-12 text-lg rounded-xl" />
                </div>
                
                <div>
                  <label className="text-sm font-semibold text-foreground mb-3 block tracking-wide">Phone</label>
                  <Input type="tel" placeholder="+254-750-444-167" className="glass-effect border-border/50 h-12 text-lg rounded-xl" />
                </div>
                
                <div>
                  <label className="text-sm font-semibold text-foreground mb-3 block tracking-wide">Service Needed</label>
                  <select className="w-full p-4 border border-border/50 rounded-xl glass-effect text-foreground text-lg h-12">
                    <option>Business WiFi Setup</option>
                    <option>Event WiFi Services</option>
                    <option>Network Optimization</option>
                    <option>Technical Support</option>
                    <option>Other</option>
                  </select>
                </div>
                
                <div>
                  <label className="text-sm font-semibold text-foreground mb-3 block tracking-wide">Message</label>
                  <Textarea 
                    placeholder="Tell us about your WiFi requirements..."
                    className="glass-effect border-border/50 min-h-[140px] text-lg rounded-xl resize-none"
                  />
                </div>
                
                <Button className="w-full premium-button text-xl py-8 rounded-2xl font-bold tracking-wide">
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