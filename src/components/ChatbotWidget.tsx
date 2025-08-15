
import { useState, useEffect } from "react";
import { Bot, Send, X, Minimize2 } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

const ChatbotWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const getTimeGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning!";
    if (hour < 17) return "Good afternoon!";
    return "Good evening!";
  };

  const addMessage = (text: string, isUser: boolean = false) => {
    const message: Message = {
      id: Date.now().toString(),
      text,
      isUser,
      timestamp: new Date(),
    };
    setMessages(prev => [...prev, message]);
  };

  const botResponse = (userMessage: string) => {
    const lowerMessage = userMessage.toLowerCase();
    
    // Developer question responses
    if (lowerMessage.includes("who developed") || 
        lowerMessage.includes("who created") || 
        lowerMessage.includes("who built") ||
        lowerMessage.includes("who made")) {
      return "I was developed by Mr Bee from Bspot Technologies Labs.";
    }
    
    // Services offered
    if (lowerMessage.includes("service") || lowerMessage.includes("what do you do") || 
        lowerMessage.includes("what services") || lowerMessage.includes("offerings")) {
      return "B-SPOT Technologies offers premium WiFi solutions including: Business WiFi Solutions with enterprise-grade security, Event WiFi Services for conferences and festivals, Public Hotspot Management for hotels and restaurants, Professional Network Installation with site surveys, 24/7 Technical Support with remote monitoring, and WiFi Optimization for maximum efficiency. Which service interests you?";
    }
    
    // Business WiFi Solutions
    if (lowerMessage.includes("business wifi") || lowerMessage.includes("office wifi") || 
        lowerMessage.includes("commercial wifi") || lowerMessage.includes("enterprise")) {
      return "Our Business WiFi Solutions provide reliable internet connectivity for offices, retail stores, and commercial spaces. Features include 24/7 monitoring, scalable bandwidth, and enterprise-grade security. Perfect for businesses needing professional, secure connectivity.";
    }
    
    // Event WiFi Services
    if (lowerMessage.includes("event wifi") || lowerMessage.includes("conference wifi") || 
        lowerMessage.includes("festival wifi") || lowerMessage.includes("temporary wifi")) {
      return "Our Event WiFi Services offer temporary high-capacity WiFi solutions for conferences, festivals, and special events. We provide quick deployment, high user capacity support, and detailed event analytics. Ideal for any event needing reliable mass connectivity.";
    }
    
    // Public Hotspot Management
    if (lowerMessage.includes("hotspot") || lowerMessage.includes("hotel wifi") || 
        lowerMessage.includes("restaurant wifi") || lowerMessage.includes("guest wifi")) {
      return "Our Public Hotspot Management provides comprehensive WiFi solutions for hotels, restaurants, and public venues. Features include customizable guest portals, detailed usage analytics, and full brand customization to match your business identity.";
    }
    
    // Network Installation
    if (lowerMessage.includes("installation") || lowerMessage.includes("setup") || 
        lowerMessage.includes("network install") || lowerMessage.includes("infrastructure")) {
      return "Our Professional Network Installation service includes comprehensive site surveys, equipment provision, and expert configuration. We handle everything from planning to implementation, ensuring your WiFi infrastructure is perfectly tailored to your needs.";
    }
    
    // Technical Support
    if (lowerMessage.includes("support") || lowerMessage.includes("technical") || 
        lowerMessage.includes("maintenance") || lowerMessage.includes("help")) {
      return "We provide 24/7 Technical Support with round-the-clock assistance to ensure your network runs smoothly. Our support includes remote monitoring, rapid response times, and preventive maintenance. Call us anytime at +254-750-444-167!";
    }
    
    // WiFi Optimization
    if (lowerMessage.includes("optimization") || lowerMessage.includes("speed") || 
        lowerMessage.includes("performance") || lowerMessage.includes("improve wifi")) {
      return "Our WiFi Optimization service focuses on performance tuning of existing networks for maximum efficiency. We provide speed optimization, comprehensive coverage analysis, and detailed performance reports to ensure you get the best from your network.";
    }
    
    // Coverage Areas
    if (lowerMessage.includes("area") || lowerMessage.includes("location") || 
        lowerMessage.includes("where") || lowerMessage.includes("coverage") || 
        lowerMessage.includes("region")) {
      return "B-SPOT Technologies currently serves multiple locations across Kenya: Nairobi (our capital excellence hub), Kikuyu (community-focused solutions), Meru (regional innovation center), and Regen (expanding network growth). We're continuously expanding our coverage to serve more communities with affordable, seamless internet connections.";
    }
    
    // Nairobi specific
    if (lowerMessage.includes("nairobi")) {
      return "We provide comprehensive WiFi solutions throughout Nairobi, our capital excellence hub. As Kenya's business center, we offer enterprise-grade solutions for offices, commercial spaces, and events across the city.";
    }
    
    // Kikuyu specific
    if (lowerMessage.includes("kikuyu")) {
      return "In Kikuyu, we focus on community-centered WiFi solutions, providing reliable internet connectivity that serves local businesses, educational institutions, and residential areas with our signature affordable and seamless approach.";
    }
    
    // Meru specific
    if (lowerMessage.includes("meru")) {
      return "Meru represents our regional innovation center, where we deliver cutting-edge WiFi solutions adapted to the unique needs of the region, supporting both agricultural businesses and urban development with reliable connectivity.";
    }
    
    // Regen specific
    if (lowerMessage.includes("regen")) {
      return "Regen is part of our expanding network growth strategy, where we're establishing new WiFi infrastructure and hotspot solutions to connect more communities with affordable, high-quality internet access.";
    }
    
    // Contact information
    if (lowerMessage.includes("contact") || lowerMessage.includes("phone") || 
        lowerMessage.includes("call") || lowerMessage.includes("number")) {
      return "You can reach B-SPOT Technologies at +254-750-444-167 - our 24/7 support line! We're also available via email at info@bspot-tech.com and support@bspot-tech.com. Our business hours are Mon-Fri: 8AM-6PM, with 24/7 emergency support available.";
    }
    
    // About the company
    if (lowerMessage.includes("about") || lowerMessage.includes("company") || 
        lowerMessage.includes("bspot") || lowerMessage.includes("b-spot") || 
        lowerMessage.includes("history")) {
      return "B-SPOT Technologies is a visionary force in Kenya's connectivity landscape with 2 years of proven excellence. Our mission is connecting communities with affordable and seamless internet connections. We're powered by a certified engineering team using cutting-edge technology and proven methodologies to deliver network infrastructures that exceed industry standards.";
    }
    
    // Mission and values
    if (lowerMessage.includes("mission") || lowerMessage.includes("values") || 
        lowerMessage.includes("vision") || lowerMessage.includes("goal")) {
      return "Our mission at B-SPOT Technologies is connecting communities with affordable and seamless internet connections. We're built on four core values: Reliability (ensuring peak performance with minimal downtime), Innovation (using cutting-edge technology), Support (24/7 dedicated technical assistance), and Security (enterprise-grade security protocols). We strive for excellence in every connection we create.";
    }
    
    // Pricing/Cost inquiries
    if (lowerMessage.includes("price") || lowerMessage.includes("cost") || 
        lowerMessage.includes("affordable") || lowerMessage.includes("quote")) {
      return "We pride ourselves on providing affordable WiFi solutions tailored to your specific needs. Pricing varies based on coverage area, user capacity, and service requirements. For a personalized quote, please call us at +254-750-444-167 or email info@bspot-tech.com. Our team will assess your needs and provide competitive pricing.";
    }
    
    // WiFi/Internet general questions
    if (lowerMessage.includes("wifi") || lowerMessage.includes("internet") || 
        lowerMessage.includes("connection") || lowerMessage.includes("network")) {
      return "B-SPOT Technologies specializes in premium WiFi hotspot solutions, network infrastructure, and connectivity services across Kenya. We provide reliable, affordable, and seamless internet connections for businesses, events, and communities. How can we help improve your connectivity today?";
    }
    
    // Greetings
    if (lowerMessage.includes("hello") || lowerMessage.includes("hi") || 
        lowerMessage.includes("hey") || lowerMessage.includes("good morning") || 
        lowerMessage.includes("good afternoon") || lowerMessage.includes("good evening")) {
      return `${getTimeGreeting()} Welcome to B-SPOT Technologies! I'm here to help you with information about our premium WiFi solutions, coverage areas, and services. How can I assist you today?`;
    }
    
    // Emergency/Urgent support
    if (lowerMessage.includes("emergency") || lowerMessage.includes("urgent") || 
        lowerMessage.includes("down") || lowerMessage.includes("not working") || 
        lowerMessage.includes("problem")) {
      return "For urgent technical issues or emergencies, please call our 24/7 support line immediately at +254-750-444-167. Our technical team provides rapid response and remote monitoring to resolve issues quickly. We're here to help around the clock!";
    }
    
    // Thank you responses
    if (lowerMessage.includes("thank") || lowerMessage.includes("thanks")) {
      return "You're welcome! B-SPOT Technologies is always here to help with your connectivity needs. If you have any other questions about our services, coverage areas, or need technical support, feel free to ask or call us at +254-750-444-167.";
    }
    
    // Default response
    return "I'm your B-SPOT Technologies assistant, ready to help with information about our WiFi solutions, coverage in Nairobi, Kikuyu, Meru, and Regen, our services (Business WiFi, Event WiFi, Hotspot Management, Network Installation, 24/7 Support, and Optimization), or technical support. You can also call us directly at +254-750-444-167. What would you like to know?";
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;
    
    const userMessage = inputValue;
    addMessage(userMessage, true);
    setInputValue("");
    setIsTyping(true);
    
    // Simulate typing delay
    setTimeout(() => {
      const response = botResponse(userMessage);
      addMessage(response);
      setIsTyping(false);
    }, 1000);
  };

  const handleOpen = () => {
    setIsOpen(true);
    if (messages.length === 0) {
      setTimeout(() => {
        addMessage(`${getTimeGreeting()} Welcome to B-SPOT Technologies! I'm your AI assistant, ready to help with our WiFi solutions, coverage areas, services, and support. How can I assist you today?`);
      }, 500);
    }
  };

  return (
    <>
      {/* Floating Chat Button */}
      {!isOpen && (
        <Button
          onClick={handleOpen}
          className="fixed bottom-6 right-6 w-14 h-14 rounded-full shadow-tech-glow bg-gradient-elegant hover:scale-110 transition-all duration-300 z-50"
        >
          <Bot className="w-6 h-6 text-primary-foreground" />
        </Button>
      )}

      {/* Chat Widget */}
      {isOpen && (
        <Card className="fixed bottom-6 right-6 w-80 h-96 shadow-premium-shadow border border-primary/20 bg-gradient-card backdrop-blur-sm z-50 animate-scale-in">
          <CardHeader className="pb-3 bg-gradient-elegant rounded-t-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded-full bg-primary-foreground/20 flex items-center justify-center">
                  <Bot className="w-4 h-4 text-primary-foreground" />
                </div>
                <div>
                  <CardTitle className="text-sm text-primary-foreground">B-SPOT Assistant</CardTitle>
                  <p className="text-xs text-primary-foreground/80">Online • AI Powered</p>
                </div>
              </div>
              <div className="flex space-x-1">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsOpen(false)}
                  className="w-6 h-6 text-primary-foreground hover:bg-primary-foreground/20"
                >
                  <Minimize2 className="w-3 h-3" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsOpen(false)}
                  className="w-6 h-6 text-primary-foreground hover:bg-primary-foreground/20"
                >
                  <X className="w-3 h-3" />
                </Button>
              </div>
            </div>
          </CardHeader>

          <CardContent className="flex flex-col h-full p-0">
            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-background/50">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[70%] px-3 py-2 rounded-lg text-sm ${
                      message.isUser
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted text-foreground border border-border/50'
                    }`}
                  >
                    {message.text}
                  </div>
                </div>
              ))}
              
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-muted text-foreground px-3 py-2 rounded-lg text-sm border border-border/50">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-primary rounded-full animate-bounce [animation-delay:0.1s]"></div>
                      <div className="w-2 h-2 bg-primary rounded-full animate-bounce [animation-delay:0.2s]"></div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Input Area */}
            <div className="p-4 border-t border-border/30 bg-background/80">
              <div className="flex space-x-2">
                <Input
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Ask about our WiFi solutions..."
                  className="flex-1 border-border/50 bg-background/50"
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                />
                <Button
                  onClick={handleSendMessage}
                  size="icon"
                  className="bg-gradient-elegant hover:scale-105 transition-all duration-200"
                  disabled={!inputValue.trim() || isTyping}
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
              <p className="text-xs text-muted-foreground mt-2 text-center">
                Powered by B-SPOT Technologies AI
              </p>
            </div>
          </CardContent>
        </Card>
      )}
    </>
  );
};

export default ChatbotWidget;
