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
    <section id="about" className="py-20 sm:py-24 bg-background relative">
      {/* Professional Background Pattern */}
      <div className="absolute inset-0 opacity-3">
        <div className="absolute top-20 left-20 w-32 h-32 border border-primary rounded-full animate-float" />
        <div className="absolute bottom-20 right-20 w-24 h-24 border border-primary rounded-lg rotate-45 animate-float" style={{ animationDelay: '2s' }} />
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16 sm:mb-20 animate-scale-in">
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 sm:mb-8 text-foreground leading-tight">
            About <span className="elegant-text">B-SPOT TECHNOLOGIES</span>
          </h2>
          <p className="text-lg sm:text-xl md:text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
            A visionary force in Kenya's connectivity landscape, delivering 
            <span className="text-primary font-semibold"> transformative WiFi experiences</span> across 
            Nairobi, Kikuyu, Meru, and Regen with <span className="text-primary font-semibold">two years of proven excellence</span>.
          </p>
        </div>

        {/* Professional Company Overview */}
        <div className="text-center mb-16 sm:mb-20 animate-slide-up" style={{ animationDelay: '0.2s' }}>
          <div className="max-w-5xl mx-auto">
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 sm:mb-8 text-foreground">Expanding Across Kenya</h3>
            <p className="text-base sm:text-lg md:text-xl text-muted-foreground mb-10 sm:mb-12 leading-relaxed">
              In just two years, B-SPOT TECHNOLOGIES has carved a distinctive path in Kenya's connectivity sector, 
              establishing premium network solutions that define industry standards across multiple regions.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
              <div className="luxury-card rounded-xl p-4 sm:p-6 lg:p-8 hover-lift animate-scale-in group" style={{ animationDelay: '0.4s' }}>
                <h4 className="text-lg sm:text-xl font-bold elegant-text mb-2 sm:mb-3">Nairobi</h4>
                <p className="text-muted-foreground text-sm sm:text-base font-medium">Capital Excellence</p>
                <div className="w-full h-0.5 sm:h-1 bg-gradient-elegant rounded-full mt-3 sm:mt-4 opacity-50 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              <div className="luxury-card rounded-xl p-4 sm:p-6 lg:p-8 hover-lift animate-scale-in group" style={{ animationDelay: '0.5s' }}>
                <h4 className="text-lg sm:text-xl font-bold elegant-text mb-2 sm:mb-3">Kikuyu</h4>
                <p className="text-muted-foreground text-sm sm:text-base font-medium">Community Focus</p>
                <div className="w-full h-0.5 sm:h-1 bg-gradient-elegant rounded-full mt-3 sm:mt-4 opacity-50 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              <div className="luxury-card rounded-xl p-4 sm:p-6 lg:p-8 hover-lift animate-scale-in group" style={{ animationDelay: '0.6s' }}>
                <h4 className="text-lg sm:text-xl font-bold elegant-text mb-2 sm:mb-3">Meru</h4>
                <p className="text-muted-foreground text-sm sm:text-base font-medium">Regional Innovation</p>
                <div className="w-full h-0.5 sm:h-1 bg-gradient-elegant rounded-full mt-3 sm:mt-4 opacity-50 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              <div className="luxury-card rounded-xl p-4 sm:p-6 lg:p-8 hover-lift animate-scale-in group" style={{ animationDelay: '0.7s' }}>
                <h4 className="text-lg sm:text-xl font-bold elegant-text mb-2 sm:mb-3">Regen</h4>
                <p className="text-muted-foreground text-sm sm:text-base font-medium">Network Growth</p>
                <div className="w-full h-0.5 sm:h-1 bg-gradient-elegant rounded-full mt-3 sm:mt-4 opacity-50 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            </div>
          </div>
        </div>

        {/* Professional Values Section */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          <div className="animate-slide-up" style={{ animationDelay: '0.8s' }}>
            <h3 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 sm:mb-8 text-foreground">Our Mission</h3>
            <div className="space-y-4 sm:space-y-6">
              <p className="text-base sm:text-lg md:text-xl text-muted-foreground leading-relaxed">
                <span className="text-primary font-semibold">Connecting communities with affordable and seamless internet connections</span>
              </p>
              <p className="text-base sm:text-lg md:text-xl text-muted-foreground leading-relaxed">
                Our certified engineering team leverages 
                <span className="text-primary font-semibold"> cutting-edge technology</span> and 
                <span className="text-primary font-semibold"> proven methodologies</span> to deliver 
                network infrastructures that exceed industry standards.
              </p>
            </div>
          </div>

          <div className="grid gap-4 sm:gap-6 lg:gap-8">
            {values.map((value, index) => (
              <Card 
                key={index} 
                className="luxury-card hover-lift animate-slide-up group" 
                style={{ animationDelay: `${1 + index * 0.1}s` }}
              >
                <CardContent className="p-4 sm:p-6 lg:p-8">
                  <h4 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 elegant-text">{value.title}</h4>
                  <p className="text-muted-foreground text-sm sm:text-base lg:text-lg leading-relaxed">{value.description}</p>
                  <div className="w-full h-0.5 sm:h-1 bg-gradient-elegant rounded-full mt-4 sm:mt-6 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
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