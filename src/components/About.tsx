import { Card, CardContent } from "./ui/card";
import { CheckCircle, Award, Users, Clock } from "lucide-react";

const About = () => {
  const stats = [
    { icon: Users, number: "500+", label: "Happy Clients" },
    { icon: CheckCircle, number: "1000+", label: "Projects Completed" },
    { icon: Award, number: "5+", label: "Years Experience" },
    { icon: Clock, number: "24/7", label: "Support Available" }
  ];

  const values = [
    {
      title: "Reliability",
      description: "We ensure your WiFi network operates at peak performance with minimal downtime."
    },
    {
      title: "Innovation",
      description: "Using cutting-edge technology to deliver the best WiFi solutions in the industry."
    },
    {
      title: "Support",
      description: "Our dedicated team provides round-the-clock technical support and maintenance."
    },
    {
      title: "Security",
      description: "Enterprise-grade security protocols to protect your network and user data."
    }
  ];

  return (
    <section id="about" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
            About <span className="text-primary">B-SPOT TECHNOLOGIES</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            We are a leading provider of professional WiFi hotspot solutions, committed to 
            delivering reliable, fast, and secure internet connectivity for businesses and events.
          </p>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4 shadow-tech-glow">
                <stat.icon className="w-8 h-8 text-primary-foreground" />
              </div>
              <div className="text-3xl font-bold text-primary mb-2">{stat.number}</div>
              <div className="text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Values Section */}
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-3xl font-bold mb-6 text-foreground">Our Mission</h3>
            <p className="text-lg text-muted-foreground mb-6">
              To provide businesses and organizations with cutting-edge WiFi solutions that 
              enhance connectivity, productivity, and user experience. We believe that reliable 
              internet access is essential in today's digital world.
            </p>
            <p className="text-lg text-muted-foreground">
              Our team of certified network engineers and technicians work tirelessly to ensure 
              your WiFi infrastructure meets the highest standards of performance and security.
            </p>
          </div>

          <div className="grid gap-6">
            {values.map((value, index) => (
              <Card key={index} className="bg-card border-border">
                <CardContent className="p-6">
                  <h4 className="text-xl font-semibold mb-3 text-foreground">{value.title}</h4>
                  <p className="text-muted-foreground">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;