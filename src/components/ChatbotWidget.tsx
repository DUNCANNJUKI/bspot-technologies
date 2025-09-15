import { useState, useEffect } from "react";
import { Bot, Send, X, Minimize2 } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import ChatbotAvatar from "./ChatbotAvatar";

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
  const [avatarMood, setAvatarMood] = useState<'neutral' | 'happy' | 'thinking' | 'error'>('neutral');

  const getTimeGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning! ☀️";
    if (hour < 17) return "Good afternoon! 🌤️";
    return "Good evening! 🌙";
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
      return "I was lovingly crafted by Mr Bee from B-SPOT Technologies Labs! 🐝 He gave me the ability to help you with all your WiFi needs. Pretty cool, right?";
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
      return `${getTimeGreeting()} It's wonderful to meet you! Welcome to B-SPOT Technologies! 🎉 I'm your friendly AI assistant, and I'm super excited to help you discover our amazing WiFi solutions. What can I help you explore today?`;
    }
    
    // Emergency/Urgent support
    if (lowerMessage.includes("emergency") || lowerMessage.includes("urgent") || 
        lowerMessage.includes("down") || lowerMessage.includes("not working") || 
        lowerMessage.includes("problem")) {
      return "For urgent technical issues or emergencies, please call our 24/7 support line immediately at +254-750-444-167. Our technical team provides rapid response and remote monitoring to resolve issues quickly. We're here to help around the clock!";
    }
    
    // Thank you responses
    if (lowerMessage.includes("thank") || lowerMessage.includes("thanks")) {
      return "Aww, you're so welcome! 😊 It makes me happy to help! B-SPOT Technologies is always here for you. Feel free to ask me anything else about our services, or give us a call at +254-750-444-167. I'm here whenever you need me!";
    }
    
    // Default response
    return "I'm your friendly B-SPOT Technologies assistant! 🤖 I'd love to help you discover our amazing WiFi solutions across Nairobi, Kikuyu, Meru, and Regen! I can tell you about our Business WiFi, Event WiFi, Hotspot Management, Network Installation, 24/7 Support, and Optimization services. Or if you prefer to chat directly, call us at +254-750-444-167! What sparks your curiosity today?";
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;
    
    const userMessage = inputValue;
    addMessage(userMessage, true);
    setInputValue("");
    setIsTyping(true);
    setAvatarMood('thinking');
    
    // Simulate typing delay
    setTimeout(() => {
      const response = botResponse(userMessage);
      addMessage(response);
      setIsTyping(false);
      setAvatarMood('happy');
      
      // Return to neutral after response
      setTimeout(() => setAvatarMood('neutral'), 2000);
    }, 1000);
  };

  const handleOpen = () => {
    setIsOpen(true);
    setAvatarMood('happy');
    if (messages.length === 0) {
      setTimeout(() => {
        addMessage(`${getTimeGreeting()} Welcome to B-SPOT Technologies! 🎉 I'm your friendly AI assistant, and I'm thrilled to meet you! I'm here to make discovering our WiFi solutions fun and easy. What would you like to explore together?`);
        setAvatarMood('neutral');
      }, 500);
    }
  };

  return (
    <>
      {/* Floating Chat Button */}
      {!isOpen && (
        <div className="fixed bottom-4 right-4 md:bottom-6 md:right-6 z-50 group">
          <Button
            onClick={handleOpen}
            className="relative w-16 h-16 md:w-18 md:h-18 rounded-full shadow-tech-glow bg-gradient-elegant hover:scale-110 hover:shadow-premium-shadow transition-all duration-300 border-2 border-primary/20"
          >
            <div className="absolute inset-0 rounded-full bg-gradient-elegant opacity-0 group-hover:opacity-30 animate-pulse"></div>
            <ChatbotAvatar 
              isTyping={false}
              isSpeaking={false}
              mood="happy"
              size="sm"
            />
          </Button>
          {/* Floating greeting tooltip */}
          <div className="absolute bottom-full right-0 mb-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
            <div className="bg-card/95 backdrop-blur-md border border-primary/30 rounded-lg px-3 py-2 text-sm text-foreground whitespace-nowrap shadow-lg">
              Hi! Need help? 👋
              <div className="absolute top-full right-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-primary/30"></div>
            </div>
          </div>
          {/* Notification badge */}
          <div className="absolute -top-1 -right-1 w-5 h-5 md:w-6 md:h-6 bg-green-400 rounded-full flex items-center justify-center animate-pulse shadow-md">
            <div className="w-2 h-2 md:w-2.5 md:h-2.5 bg-white rounded-full"></div>
          </div>
        </div>
      )}

      {/* Chat Widget */}
      {isOpen && (
        <Card className="fixed bottom-4 right-4 md:bottom-6 md:right-6 w-[calc(100vw-2rem)] max-w-sm md:w-96 h-[calc(100vh-8rem)] max-h-[520px] shadow-premium-shadow border border-primary/30 bg-card/95 backdrop-blur-md z-50 animate-scale-in rounded-2xl overflow-hidden">
          <CardHeader className="pb-4 pt-4 px-6 bg-gradient-elegant border-b border-primary/20">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <ChatbotAvatar 
                    isTyping={isTyping}
                    isSpeaking={false}
                    mood={avatarMood}
                    size="sm"
                  />
                  {/* Online status indicator */}
                  <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-400 border-2 border-background rounded-full animate-pulse"></div>
                </div>
                <div className="flex flex-col">
                  <CardTitle className="text-base font-semibold text-primary-foreground">B-SPOT Assistant 🤖</CardTitle>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse shadow-sm"></div>
                    <p className="text-xs text-primary-foreground/90 font-medium">Online • Ready to help! 💡</p>
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsOpen(false)}
                  className="w-8 h-8 text-primary-foreground/80 hover:text-primary-foreground hover:bg-primary-foreground/15 rounded-md transition-all duration-200"
                >
                  <Minimize2 className="w-4 h-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsOpen(false)}
                  className="w-8 h-8 text-primary-foreground/80 hover:text-primary-foreground hover:bg-primary-foreground/15 rounded-md transition-all duration-200"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </CardHeader>

          <CardContent className="flex flex-col h-full p-0">
            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto px-4 md:px-6 py-4 space-y-4 bg-background/20 custom-scrollbar">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.isUser ? 'justify-end' : 'justify-start'} items-end space-x-3 animate-fade-in`}
                >
                  {!message.isUser && (
                    <div className="flex-shrink-0 mb-2">
                      <div className="w-8 h-8 rounded-full bg-gradient-elegant/20 border border-primary/30 flex items-center justify-center">
                        <ChatbotAvatar 
                          isTyping={false}
                          isSpeaking={false}
                          mood={avatarMood}
                          size="sm"
                        />
                      </div>
                    </div>
                  )}
                  <div
                    className={`max-w-[80%] px-4 py-3 rounded-2xl text-sm leading-relaxed shadow-md transition-all duration-200 hover:shadow-lg ${
                      message.isUser
                        ? 'bg-gradient-elegant text-primary-foreground rounded-br-md font-medium ml-auto'
                        : 'bg-muted/90 text-foreground border border-border/30 rounded-bl-md backdrop-blur-sm'
                    }`}
                  >
                    <p className="whitespace-pre-wrap">{message.text}</p>
                    <div className={`text-xs mt-2 opacity-60 ${message.isUser ? 'text-right' : 'text-left'}`}>
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </div>
                  </div>
                  {message.isUser && (
                    <div className="flex-shrink-0 w-8 h-8 bg-gradient-elegant rounded-full flex items-center justify-center mb-2 shadow-md">
                      <div className="w-3 h-3 bg-primary-foreground rounded-full"></div>
                    </div>
                  )}
                </div>
              ))}
              
              {isTyping && (
                <div className="flex justify-start items-end space-x-3 animate-fade-in">
                  <div className="flex-shrink-0 mb-2">
                    <div className="w-8 h-8 rounded-full bg-gradient-elegant/20 border border-primary/30 flex items-center justify-center">
                      <ChatbotAvatar 
                        isTyping={true}
                        isSpeaking={false}
                        mood="thinking"
                        size="sm"
                      />
                    </div>
                  </div>
                  <div className="bg-muted/90 text-foreground px-4 py-3 rounded-2xl rounded-bl-md text-sm border border-border/30 backdrop-blur-sm shadow-md">
                    <div className="flex space-x-1 items-center">
                      <span className="text-xs text-muted-foreground mr-2">AI is thinking</span>
                      <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-primary rounded-full animate-bounce [animation-delay:0.1s]"></div>
                      <div className="w-2 h-2 bg-primary rounded-full animate-bounce [animation-delay:0.2s]"></div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Input Area */}
            <div className="p-4 md:p-6 border-t border-primary/20 bg-card/50 backdrop-blur-sm">
              <div className="flex space-x-3 items-end">
                <div className="flex-1">
                  <Input
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    placeholder="Ask me anything about WiFi solutions! 😊"
                    className="resize-none border-primary/30 bg-background/80 backdrop-blur-sm text-foreground placeholder:text-muted-foreground focus:border-primary/50 focus:shadow-tech-glow/30 rounded-xl h-12"
                    disabled={isTyping}
                  />
                </div>
                <Button
                  onClick={handleSendMessage}
                  disabled={!inputValue.trim() || isTyping}
                  className="w-12 h-12 rounded-xl bg-gradient-elegant hover:bg-gradient-elegant/90 text-primary-foreground shadow-card-shadow hover:shadow-tech-glow transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send className="w-5 h-5" />
                </Button>
              </div>
              
              {/* Quick suggestion chips */}
              <div className="flex flex-wrap gap-2 mt-4 opacity-90">
                <button 
                  onClick={() => {setInputValue("What services do you offer?"); setTimeout(handleSendMessage, 100);}}
                  className="text-xs px-3 py-2 bg-primary/15 text-primary rounded-full hover:bg-primary/25 transition-all duration-200 border border-primary/30 hover:shadow-md hover:scale-105"
                >
                  Our Services 🔧
                </button>
                <button 
                  onClick={() => {setInputValue("What areas do you cover?"); setTimeout(handleSendMessage, 100);}}
                  className="text-xs px-3 py-2 bg-primary/15 text-primary rounded-full hover:bg-primary/25 transition-all duration-200 border border-primary/30 hover:shadow-md hover:scale-105"
                >
                  Coverage Areas 📍
                </button>
                <button 
                  onClick={() => {setInputValue("Contact information"); setTimeout(handleSendMessage, 100);}}
                  className="text-xs px-3 py-2 bg-primary/15 text-primary rounded-full hover:bg-primary/25 transition-all duration-200 border border-primary/30 hover:shadow-md hover:scale-105"
                >
                  Get in Touch 📞
                </button>
              </div>
              
              {/* Friendly footer */}
              <div className="text-center mt-3">
                <p className="text-xs text-muted-foreground">
                  Powered by B-SPOT Technologies with ❤️
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </>
  );
};

export default ChatbotWidget;
