import { useState, useEffect, useRef } from "react";
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

// Direct URL configuration (VITE_ env variables not supported)
const CHAT_URL = "https://rtgcrclgmvcmrjpvtpwm.supabase.co/functions/v1/chat";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ0Z2NyY2xnbXZjbXJqcHZ0cHdtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQ4NTU0NTEsImV4cCI6MjA3MDQzMTQ1MX0.JR45nTPTScLaObpXQM-VzQ50ODRJTzakrvPOA3HldCM";

const ChatbotWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [avatarMood, setAvatarMood] = useState<'neutral' | 'happy' | 'thinking' | 'error'>('neutral');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    // Use requestAnimationFrame to avoid forced reflow
    requestAnimationFrame(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    });
  };

  useEffect(() => {
    // Debounce scroll to prevent excessive calls during rapid updates
    const timeoutId = setTimeout(() => {
      scrollToBottom();
    }, 50);
    
    return () => clearTimeout(timeoutId);
  }, [messages, isTyping]);

  const getTimeGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 17) return "Good afternoon";
    return "Good evening";
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

  const callAI = async (userMessage: string): Promise<string> => {
    try {
      const conversationHistory = messages.map(msg => ({
        role: msg.isUser ? "user" : "assistant",
        content: msg.text
      }));

      console.log("Sending message to AI:", userMessage);
      console.log("Chat URL:", CHAT_URL);
      
      const response = await fetch(CHAT_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${SUPABASE_KEY}`,
        },
        body: JSON.stringify({
          messages: [
            ...conversationHistory,
            { role: "user", content: userMessage }
          ]
        }),
      });

      console.log("Response status:", response.status);

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ error: "Unknown error" }));
        console.error("API Error Response:", errorData);
        
        if (response.status === 429) {
          return "I'm receiving too many requests right now. Please try again in a moment. For urgent matters, call us at +254-750-444-167! 📞";
        }
        if (response.status === 402) {
          return "I'm temporarily unavailable. Please contact our support team directly at +254-750-444-167 or email info@bspot-tech.com for immediate assistance! 📧";
        }
        
        // Return error message from backend if available
        return errorData.error || "I encountered an issue. Please contact us at +254-750-444-167 for assistance! 📞";
      }

      const data = await response.json();
      console.log("AI Response:", data);
      
      if (data.message) {
        return data.message;
      }
      
      return "I apologize, but I couldn't generate a proper response. Please call +254-750-444-167 for direct assistance!";
    } catch (error) {
      console.error("AI Error Details:", error);
      return "Please contact our support team at +254-750-444-167 for assistance! 📞";
    }
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;
    
    const userMessage = inputValue;
    addMessage(userMessage, true);
    setInputValue("");
    setIsTyping(true);
    setAvatarMood('thinking');
    
    try {
      const response = await callAI(userMessage);
      addMessage(response);
      setAvatarMood('happy');
    } catch (error) {
      console.error("Error sending message:", error);
      addMessage("Please contact our support team at +254-750-444-167 for assistance! 📞");
      setAvatarMood('error');
    } finally {
      setIsTyping(false);
      setTimeout(() => setAvatarMood('neutral'), 2000);
    }
  };

  const handleOpen = () => {
    setIsOpen(true);
    setAvatarMood('happy');
    if (messages.length === 0) {
      setTimeout(() => {
        addMessage(`${getTimeGreeting()}! Welcome to B-SPOT Technologies! 👋

I'm your AI assistant, here to help you with all your WiFi and connectivity needs. 

How may I assist you today?`);
        setAvatarMood('neutral');
      }, 800);
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
               Need WiFi assistance? 💬
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
                   <CardTitle className="text-base font-semibold text-primary-foreground">B-SPOT AI Assistant 🤖</CardTitle>
                   <div className="flex items-center space-x-2">
                     <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse shadow-sm"></div>
                     <p className="text-xs text-primary-foreground/90 font-medium">Online • Ready to Help 24/7</p>
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
            <div className="flex-1 overflow-y-auto px-4 md:px-6 py-4 space-y-4 bg-gradient-to-b from-background/60 to-background/40 custom-scrollbar relative">
              {/* Bouncing Company Logo Watermark */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-5 pointer-events-none">
                <img 
                  src="/bspot-logo-new.png" 
                  alt="B-SPOT Logo" 
                  width="128"
                  height="128"
                  loading="lazy"
                  className="w-32 h-32 animate-bounce"
                  style={{ animationDuration: '3s' }}
                />
              </div>
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
              
              {/* Invisible div for auto-scroll */}
              <div ref={messagesEndRef} />
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
