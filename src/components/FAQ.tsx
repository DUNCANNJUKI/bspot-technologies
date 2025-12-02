import { 
  Accordion, 
  AccordionContent, 
  AccordionItem, 
  AccordionTrigger 
} from "./ui/accordion";
import { HelpCircle } from "lucide-react";

const FAQ = () => {
  const faqs = [
    {
      category: "Installation & Setup",
      questions: [
        {
          q: "How long does installation take?",
          a: "Installation typically takes 2-4 hours for home connections and 1-3 days for business setups, depending on the complexity. Our team conducts a site survey first to provide an accurate timeline."
        },
        {
          q: "What equipment do I need?",
          a: "For Hotspot connections, you just need a WiFi-enabled device. For PPPoE connections, we provide a router configured specifically for your connection. All necessary equipment is included in our packages."
        },
        {
          q: "Do you offer installation in my area?",
          a: "We currently serve Nairobi, Kikuyu, Meru, and Regen, with plans to expand nationwide. Contact us at +254-750-444-167 or bspottechnologies@gmail.com to check availability in your specific location."
        },
        {
          q: "Is there an installation fee?",
          a: "Installation fees vary based on location and setup complexity. We offer free consultations and site surveys. Contact us for a personalized quote with transparent pricing."
        }
      ]
    },
    {
      category: "Payment & Packages",
      questions: [
        {
          q: "What payment methods do you accept?",
          a: "We accept M-Pesa, bank transfers, and cash payments. For businesses, we also offer invoice-based billing with flexible payment terms."
        },
        {
          q: "Are there monthly or annual plans?",
          a: "Yes! We offer both monthly and annual subscription plans. Annual plans come with significant discounts and priority support. Choose the option that best fits your budget."
        },
        {
          q: "Can I upgrade or downgrade my package?",
          a: "Absolutely! Our packages are flexible. You can upgrade for more speed or downgrade if your needs change. Contact our support team, and we'll adjust your plan accordingly."
        },
        {
          q: "What happens if I miss a payment?",
          a: "We send reminders before your due date. If payment is missed, service continues for a grace period. After that, the connection is temporarily suspended until payment is made. No penalties for late payment during the grace period."
        },
        {
          q: "Do you offer refunds?",
          a: "Yes, we have a satisfaction guarantee. If you're not happy within the first 7 days, we offer a full refund minus installation costs. After that, refunds are prorated based on unused service time."
        }
      ]
    },
    {
      category: "Technical Support",
      questions: [
        {
          q: "How do I contact technical support?",
          a: "Reach us 24/7 via phone at +254-750-444-167, email at bspottechnologies@gmail.com, or through our chatbot on this website. We also offer WhatsApp support for quick assistance."
        },
        {
          q: "What if my internet is slow?",
          a: "First, try restarting your router. If issues persist, contact our support team. We'll run diagnostics remotely and, if needed, send a technician for free within 24 hours."
        },
        {
          q: "Do you provide on-site support?",
          a: "Yes! For critical issues, we dispatch technicians within 2-4 hours in urban areas and within 24 hours in remote locations. On-site support is included in all our packages."
        },
        {
          q: "What is your uptime guarantee?",
          a: "We maintain 99.5% uptime for home connections and 99.9% for business connections. In case of downtime, we provide service credits proportional to the outage duration."
        },
        {
          q: "Can you help with WiFi coverage issues?",
          a: "Definitely! We offer free WiFi coverage assessments. If dead zones are detected, we can install additional access points or recommend WiFi extenders to ensure complete coverage."
        },
        {
          q: "Do you offer network security advice?",
          a: "Yes, our team provides security recommendations including strong password setup, network encryption, guest network configuration, and regular security updates for your router."
        }
      ]
    },
    {
      category: "Service Features",
      questions: [
        {
          q: "What's the difference between Hotspot and PPPoE?",
          a: "Hotspot connections are simpler—just connect and browse with a username/password. PPPoE requires router configuration but offers more control, better security, and is ideal for businesses or power users."
        },
        {
          q: "Can multiple devices connect at once?",
          a: "Yes! Home plans support 5-10 devices, while business plans support 20-100+ devices depending on your package. We ensure consistent speed across all connected devices."
        },
        {
          q: "Do you offer static IP addresses?",
          a: "Yes, static IPs are available for business customers who need them for hosting servers, remote access, or security systems. Contact us to add this feature to your plan."
        },
        {
          q: "Is there a data cap or fair usage policy?",
          a: "Most of our plans are unlimited with no data caps. However, we do have a fair usage policy to ensure quality service for all users. Excessive usage beyond typical patterns may be reviewed."
        }
      ]
    }
  ];

  return (
    <div className="py-20 sm:py-24 bg-background relative overflow-hidden">
      {/* Elegant Background Elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-32 left-16 w-64 h-64 border-2 border-primary rounded-full animate-float" />
        <div className="absolute bottom-32 right-16 w-48 h-48 border-2 border-secondary rotate-45 animate-float" style={{ animationDelay: '2s' }} />
      </div>
      
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16 sm:mb-20 animate-scale-in">
          <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-primary mb-6 shadow-tech-glow">
            <HelpCircle className="w-8 h-8 sm:w-10 sm:h-10 text-primary-foreground" />
          </div>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-display font-bold mb-6 sm:mb-8 leading-tight">
            Frequently Asked <span className="bg-gradient-primary bg-clip-text text-transparent">Questions</span>
          </h2>
          <p className="text-lg sm:text-xl text-foreground/70 max-w-3xl mx-auto leading-relaxed">
            Find answers to common questions about our services, installation, payments, and technical support.
          </p>
        </div>

        {faqs.map((category, categoryIndex) => (
          <div 
            key={categoryIndex} 
            className="mb-12 sm:mb-16 animate-fade-in"
            style={{ animationDelay: `${categoryIndex * 0.2}s` }}
          >
            <h3 className="text-2xl sm:text-3xl font-display font-bold mb-6 sm:mb-8 text-foreground flex items-center">
              <span className="w-2 h-8 sm:h-10 bg-gradient-primary rounded-full mr-4"></span>
              {category.category}
            </h3>
            
            <Accordion type="single" collapsible className="space-y-4">
              {category.questions.map((faq, faqIndex) => (
                <AccordionItem 
                  key={faqIndex} 
                  value={`${categoryIndex}-${faqIndex}`}
                  className="luxury-card border-primary/20 rounded-xl overflow-hidden hover:-translate-y-1 transition-all duration-300"
                >
                  <AccordionTrigger className="px-6 py-4 text-left hover:no-underline group">
                    <span className="text-base sm:text-lg font-semibold text-foreground pr-4 group-hover:text-primary transition-colors">
                      {faq.q}
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-6">
                    <p className="text-sm sm:text-base text-foreground/70 leading-relaxed">
                      {faq.a}
                    </p>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        ))}

        {/* Contact CTA */}
        <div className="mt-16 sm:mt-20 text-center animate-fade-in" style={{ animationDelay: '0.8s' }}>
          <div className="luxury-card border-primary/20 rounded-2xl p-8 sm:p-12">
            <h3 className="text-2xl sm:text-3xl font-display font-bold mb-4 text-foreground">
              Still Have Questions?
            </h3>
            <p className="text-base sm:text-lg text-foreground/70 mb-6 sm:mb-8 max-w-2xl mx-auto">
              Our friendly support team is here to help you 24/7. Reach out anytime!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="tel:+254750444167" 
                className="inline-flex items-center justify-center px-8 py-4 bg-gradient-primary text-primary-foreground font-semibold rounded-xl shadow-tech-glow hover:scale-105 transition-all duration-300"
              >
                Call Us: +254-750-444-167
              </a>
              <a 
                href="mailto:bspottechnologies@gmail.com" 
                className="inline-flex items-center justify-center px-8 py-4 glass-effect border-primary/30 text-primary hover:bg-primary/10 font-semibold rounded-xl transition-all duration-300 hover:scale-105"
              >
                Email Us
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQ;
