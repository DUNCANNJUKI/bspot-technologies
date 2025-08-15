
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
    
    // WiFi/Service related questions
    if (lowerMessage.includes("wifi") || lowerMessage.includes("internet") || lowerMessage.includes("connection")) {
      return "We provide professional WiFi hotspot solutions for businesses and events. Would you like to know more about our services?";
    }
    
    if (lowerMessage.includes("service") || lowerMessage.includes("what do you do")) {
      return "B-SPOT Technologies specializes in premium WiFi hotspot solutions, network infrastructure, and connectivity services. How can we help with your networking needs?";
    }
    
    if (lowerMessage.includes("contact") || lowerMessage.includes("phone") || lowerMessage.includes("call")) {
      return "You can reach us at +254-750-444-167 or email info@bspot-tech.com. We're available 24/7 for support!";
    }
    
    if (lowerMessage.includes("hello") || lowerMessage.includes("hi") || lowerMessage.includes("hey")) {
      return `${getTimeGreeting()} Welcome to B-SPOT Technologies! How can I assist you today?`;
    }
    
    // Default response
    return "I'm here to help with information about B-SPOT Technologies and our WiFi solutions. Could you please be more specific about what you'd like to know?";
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
        addMessage(`${getTimeGreeting()} How can I assist you today?`);
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
                  placeholder="Type your message..."
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
