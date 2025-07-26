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
      details: ["Metro Area Coverage", "Nationwide Solutions"],
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
    <section id="contact" className="py-20 bg-gradient-secondary">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
            Get In <span className="text-primary">Touch</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Ready to upgrade your WiFi infrastructure? Contact us today for a free consultation 
            and customized solution for your business needs.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div>
            <h3 className="text-2xl font-bold mb-8 text-foreground">Contact Information</h3>
            <div className="grid gap-6">
              {contactInfo.map((info, index) => (
                <Card key={index} className="bg-card border-border">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center shadow-tech-glow">
                        <info.icon className="w-6 h-6 text-primary-foreground" />
                      </div>
                      <div>
                        <h4 className="text-lg font-semibold mb-2 text-foreground">{info.title}</h4>
                        {info.details.map((detail, idx) => (
                          <p key={idx} className="text-primary font-medium">{detail}</p>
                        ))}
                        <p className="text-sm text-muted-foreground mt-1">{info.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Contact Form */}
          <div>
            <Card className="bg-card border-border shadow-card-shadow">
              <CardHeader>
                <CardTitle className="text-2xl text-foreground">Send Us a Message</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">First Name</label>
                    <Input placeholder="BEE" className="bg-background border-border" />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">Last Name</label>
                    <Input placeholder="ENT" className="bg-background border-border" />
                  </div>
                </div>
                
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">Email</label>
                  <Input type="email" placeholder="john@example.com" className="bg-background border-border" />
                </div>
                
                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">Phone</label>
                    <Input type="tel" placeholder="+254-750-444-167" className="bg-background border-border" />
                  </div>
                
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">Service Needed</label>
                  <select className="w-full p-3 border border-border rounded-md bg-background text-foreground">
                    <option>Business WiFi Setup</option>
                    <option>Event WiFi Services</option>
                    <option>Network Optimization</option>
                    <option>Technical Support</option>
                    <option>Other</option>
                  </select>
                </div>
                
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">Message</label>
                  <Textarea 
                    placeholder="Tell us about your WiFi requirements..."
                    className="bg-background border-border min-h-[120px]"
                  />
                </div>
                
                <Button className="w-full bg-gradient-primary hover:shadow-tech-glow transition-all duration-300 text-lg py-6">
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