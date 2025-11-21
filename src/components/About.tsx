import { Card, CardContent } from "./ui/card";

const About = () => {

  const values = [
    {
      title: "Affordable Packages",
      description: "Pricing designed for every household, business, and community."
    },
    {
      title: "Reliable Connectivity",
      description: "Consistent speeds and uptime you can trust."
    },
    {
      title: "Quick Installation",
      description: "Fast setup with minimal downtime."
    },
    {
      title: "Excellent Customer Support",
      description: "Friendly support staff always ready to assist."
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
            Who <span className="elegant-text">We Are</span>
          </h2>
          <p className="text-lg sm:text-xl md:text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
            At Bspot Technologies, we provide high-quality internet solutions designed to keep you connected—whether at home, at work, in school, or in public spaces.
          </p>
          <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed mt-4">
            We believe <span className="text-primary font-semibold">reliable internet should be simple, accessible, and affordable</span> for everyone.
          </p>
        </div>

        {/* Professional Company Overview */}
        <div className="text-center mb-16 sm:mb-20 animate-slide-up" style={{ animationDelay: '0.2s' }}>
          <div className="max-w-5xl mx-auto">
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 sm:mb-8 text-foreground">Serving Communities Across Kenya</h3>
            <p className="text-base sm:text-lg md:text-xl text-muted-foreground mb-10 sm:mb-12 leading-relaxed">
              Bspot Technologies delivers trusted connectivity solutions across multiple regions, 
              empowering homes, businesses, schools, and communities with seamless internet access.
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
                <span className="text-primary font-semibold">To make internet access simple, affordable, and dependable for all communities</span>, 
                empowering homes, businesses, and learning environments with seamless connectivity.
              </p>
            </div>
          </div>

          <div className="grid gap-4 sm:gap-6 lg:gap-8">
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2 text-foreground">Why Choose Bspot Technologies?</h3>
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
            <Card 
              className="luxury-card hover-lift animate-slide-up group" 
              style={{ animationDelay: `${1 + values.length * 0.1}s` }}
            >
              <CardContent className="p-4 sm:p-6 lg:p-8">
                <h4 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 elegant-text">Flexible Options</h4>
                <p className="text-muted-foreground text-sm sm:text-base lg:text-lg leading-relaxed">Hotspot, PPPoE, wide-area Wi-Fi, and community solutions—whatever you need, we deliver.</p>
                <div className="w-full h-0.5 sm:h-1 bg-gradient-elegant rounded-full mt-4 sm:mt-6 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;