import { Card, CardContent } from "./ui/card";

const About = () => {

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
            Based in Kenya with 2 years of operation, we are a leading provider of professional 
            WiFi hotspot solutions. We serve Regen, Kikuyu, Meru, Nairobi and are rapidly extending 
            our reach to deliver reliable, fast, and secure internet connectivity for businesses and events.
          </p>
        </div>

        {/* Company Overview */}
        <div className="text-center mb-16">
          <div className="max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold mb-6 text-foreground">Growing Across Kenya</h3>
            <p className="text-lg text-muted-foreground mb-8">
              In just 2 years of operation, B-SPOT TECHNOLOGIES has established a strong presence 
              across key locations in Kenya. Our commitment to excellence has enabled us to expand 
              our services and build lasting relationships with clients throughout the region.
            </p>
            <div className="grid md:grid-cols-4 gap-6">
              <div className="bg-card border border-border rounded-lg p-4">
                <h4 className="font-semibold text-primary mb-2">Nairobi</h4>
                <p className="text-sm text-muted-foreground">Capital city coverage</p>
              </div>
              <div className="bg-card border border-border rounded-lg p-4">
                <h4 className="font-semibold text-primary mb-2">Kikuyu</h4>
                <p className="text-sm text-muted-foreground">Local community services</p>
              </div>
              <div className="bg-card border border-border rounded-lg p-4">
                <h4 className="font-semibold text-primary mb-2">Meru</h4>
                <p className="text-sm text-muted-foreground">Regional expansion</p>
              </div>
              <div className="bg-card border border-border rounded-lg p-4">
                <h4 className="font-semibold text-primary mb-2">Regen</h4>
                <p className="text-sm text-muted-foreground">Growing network</p>
              </div>
            </div>
          </div>
        </div>

        {/* Values Section */}
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-3xl font-bold mb-6 text-foreground">Our Mission</h3>
            <p className="text-lg text-muted-foreground mb-6">
              To provide businesses and organizations across Kenya with cutting-edge WiFi solutions that 
              enhance connectivity, productivity, and user experience. We believe that reliable 
              internet access is essential in today's digital world, and we're committed to bridging 
              the connectivity gap in our communities.
            </p>
            <p className="text-lg text-muted-foreground">
              Our team of certified network engineers and technicians work tirelessly to ensure 
              your WiFi infrastructure meets the highest standards of performance and security, 
              backed by our 2 years of proven experience in the Kenyan market.
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