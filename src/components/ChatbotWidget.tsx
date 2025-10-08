import { useState, useEffect, useRef } from "react";
import { Bot, Send, X, Minimize2 } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import ChatbotAvatar from "./ChatbotAvatar";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

const MAX_MESSAGE_LENGTH = 1000;
const MIN_MESSAGE_INTERVAL = 2000; // 2 seconds between messages

const ChatbotWidget = () => {
  const { toast } = useToast();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [avatarMood, setAvatarMood] = useState<'neutral' | 'happy' | 'thinking' | 'error'>('neutral');
  const [lastMessageTime, setLastMessageTime] = useState(0);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatWidgetRef = useRef<HTMLDivElement>(null);

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

  // Close chatbot when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isOpen && chatWidgetRef.current && !chatWidgetRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

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
      
      const { data, error } = await supabase.functions.invoke('chat', {
        body: {
          messages: [
            ...conversationHistory,
            { role: "user", content: userMessage }
          ]
        }
      });

      if (error) {
        console.error("Edge Function error:", error);
        throw error;
      }

      if (!data) {
        throw new Error("No response from AI");
      }

      console.log("AI Response:", data);

      if (data.error) {
        if (data.error.includes("Rate limit")) {
          return "I'm receiving too many requests right now. Please try again in a moment. For urgent matters, call us at +254-750-444-167! 📞";
        }
        if (data.error.includes("Payment required") || data.error.includes("Service temporarily unavailable")) {
          return "I'm temporarily unavailable. Please contact our support team directly at +254-750-444-167 or email info@bspot-tech.com for immediate assistance! 📧";
        }
        throw new Error(data.error);
      }

      if (data.message) {
        return data.message;
      }
      
      return "I apologize, but I couldn't generate a proper response. Please call +254-750-444-167 for direct assistance!";
    } catch (error) {
      console.error("AI Error Details:", error);
      return "I apologize for the inconvenience. Please contact our support team at +254-750-444-167 for assistance! 📞";
    }
  };

  const sanitizeInput = (input: string): string => {
    return input
      .replace(/[<>]/g, '') // Remove potential HTML tags
      .slice(0, MAX_MESSAGE_LENGTH)
      .trim();
  };

  const handleSendMessage = async () => {
    const trimmedInput = inputValue.trim();
    
    if (!trimmedInput || isTyping) return;
    
    // Rate limiting check
    const now = Date.now();
    if (now - lastMessageTime < MIN_MESSAGE_INTERVAL) {
      toast({
        title: "Please wait",
        description: "You're sending messages too quickly. Please wait a moment.",
        variant: "destructive"
      });
      return;
    }
    
    // Validate message length
    if (trimmedInput.length > MAX_MESSAGE_LENGTH) {
      toast({
        title: "Message too long",
        description: `Please keep your message under ${MAX_MESSAGE_LENGTH} characters.`,
        variant: "destructive"
      });
      return;
    }
    
    // Sanitize input
    const sanitizedMessage = sanitizeInput(trimmedInput);
    
    addMessage(sanitizedMessage, true);
    setInputValue("");
    setIsTyping(true);
    setAvatarMood('thinking');
    setLastMessageTime(now);
    
    try {
      const response = await callAI(sanitizedMessage);
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
        <Card ref={chatWidgetRef} className="fixed bottom-4 right-4 md:bottom-6 md:right-6 w-[calc(100vw-2rem)] sm:w-[calc(100vw-3rem)] max-w-[380px] md:max-w-[400px] h-[480px] sm:h-[500px] shadow-premium-shadow border border-primary/30 bg-card/95 backdrop-blur-md z-50 animate-scale-in rounded-2xl overflow-hidden">
          <CardHeader className="pb-3 pt-3 px-4 sm:px-5 md:px-6 bg-gradient-elegant border-b border-primary/20">
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center space-x-2 sm:space-x-3 flex-1 min-w-0">
                <div className="relative flex-shrink-0">
                  <ChatbotAvatar 
                    isTyping={isTyping}
                    isSpeaking={false}
                    mood={avatarMood}
                    size="sm"
                  />
                  {/* Online status indicator */}
                  <div className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 sm:w-3 sm:h-3 bg-green-400 border-2 border-background rounded-full animate-pulse"></div>
                </div>
                 <div className="flex flex-col min-w-0 flex-1">
                   <CardTitle className="text-sm sm:text-base font-semibold text-primary-foreground truncate">B-SPOT AI Assistant 🤖</CardTitle>
                   <div className="flex items-center space-x-1.5 sm:space-x-2">
                     <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-green-400 rounded-full animate-pulse shadow-sm flex-shrink-0"></div>
                     <p className="text-[10px] sm:text-xs text-primary-foreground/90 font-medium truncate">Online • Ready 24/7</p>
                   </div>
                 </div>
              </div>
              <div className="flex items-center space-x-1 flex-shrink-0">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsOpen(false)}
                  className="w-7 h-7 sm:w-8 sm:h-8 text-primary-foreground/80 hover:text-primary-foreground hover:bg-primary-foreground/15 rounded-md transition-all duration-200"
                >
                  <Minimize2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsOpen(false)}
                  className="w-7 h-7 sm:w-8 sm:h-8 text-primary-foreground/80 hover:text-primary-foreground hover:bg-primary-foreground/15 rounded-md transition-all duration-200"
                >
                  <X className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </Button>
              </div>
            </div>
          </CardHeader>

          <CardContent className="flex flex-col h-full p-0">
            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto px-3 sm:px-4 md:px-6 py-3 sm:py-4 space-y-3 sm:space-y-4 custom-scrollbar relative overflow-hidden">
              {/* Animated gradient background with vibrant colors */}
              <div className="absolute inset-0 bg-gradient-to-br from-violet-500/5 via-background to-cyan-500/5 animate-pulse" style={{ animationDuration: '8s' }}></div>
              <div className="absolute inset-0 bg-gradient-to-tr from-pink-500/3 via-transparent to-blue-500/3 animate-pulse" style={{ animationDuration: '10s', animationDelay: '2s' }}></div>
              
              {/* Colorful mesh grid pattern */}
              <div className="absolute inset-0 opacity-[0.15]" style={{
                backgroundImage: `linear-gradient(hsl(var(--primary) / 0.15) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--primary) / 0.15) 1px, transparent 1px)`,
                backgroundSize: '50px 50px'
              }}></div>
              
              {/* Vibrant radial glow effects */}
              <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-primary/15 to-violet-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '6s' }}></div>
              <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-tl from-cyan-500/15 to-primary/10 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '7s', animationDelay: '1s' }}></div>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-gradient-to-r from-pink-500/8 to-blue-500/8 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '9s', animationDelay: '3s' }}></div>
              
              {/* Animated colorful particles */}
              <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-primary/40 rounded-full animate-ping" style={{ animationDuration: '4s' }}></div>
                <div className="absolute top-3/4 right-1/3 w-1.5 h-1.5 bg-cyan-500/40 rounded-full animate-ping" style={{ animationDuration: '5s', animationDelay: '1s' }}></div>
                <div className="absolute top-1/2 right-1/4 w-2.5 h-2.5 bg-violet-500/30 rounded-full animate-ping" style={{ animationDuration: '6s', animationDelay: '2s' }}></div>
                <div className="absolute top-1/3 right-1/2 w-2 h-2 bg-pink-500/35 rounded-full animate-ping" style={{ animationDuration: '5.5s', animationDelay: '1.5s' }}></div>
              </div>
              
              {/* Bouncing Company Logo Watermark */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-5 pointer-events-none">
                <img 
                  src="/bspot-logo-128.webp" 
                  alt="B-SPOT Logo" 
                  width="128"
                  height="128"
                  loading="lazy"
                  className="w-24 h-24 sm:w-32 sm:h-32 animate-bounce"
                  style={{ animationDuration: '3s' }}
                />
              </div>
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.isUser ? 'justify-end' : 'justify-start'} items-end space-x-2 sm:space-x-3 animate-fade-in`}
                >
                  {!message.isUser && (
                    <div className="flex-shrink-0 mb-2">
                      <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-gradient-elegant/20 border border-primary/30 flex items-center justify-center">
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
                    className={`max-w-[85%] sm:max-w-[80%] px-3 sm:px-4 py-2.5 sm:py-3 rounded-2xl text-xs sm:text-sm leading-relaxed shadow-lg transition-all duration-200 hover:shadow-xl relative overflow-hidden ${
                      message.isUser
                        ? 'bg-gradient-to-br from-primary via-primary/90 to-primary/80 text-primary-foreground rounded-br-md font-medium ml-auto border border-primary/20'
                        : 'bg-gradient-to-br from-card via-muted/50 to-muted/80 text-foreground border-2 border-primary/20 rounded-bl-md backdrop-blur-sm'
                    }`}
                  >
                    {!message.isUser && (
                      <div className="absolute top-0 right-0 w-16 h-16 bg-primary/5 rounded-full blur-xl"></div>
                    )}
                    <p className="whitespace-pre-wrap break-words relative z-10">{message.text}</p>
                    <div className={`text-[10px] sm:text-xs mt-1.5 sm:mt-2 opacity-70 relative z-10 font-semibold ${message.isUser ? 'text-right text-primary-foreground/90' : 'text-left text-primary'}`}>
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </div>
                  </div>
                  {message.isUser && (
                    <div className="flex-shrink-0 w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-br from-primary via-primary/90 to-primary/70 rounded-full flex items-center justify-center mb-2 shadow-lg border-2 border-primary/30 relative overflow-hidden">
                      <div className="absolute inset-0 bg-white/10 rounded-full animate-pulse"></div>
                      <div className="w-2 h-2 sm:w-3 sm:h-3 bg-primary-foreground rounded-full relative z-10"></div>
                    </div>
                  )}
                </div>
              ))}
              
              {isTyping && (
                <div className="flex justify-start items-end space-x-2 sm:space-x-3 animate-fade-in">
                  <div className="flex-shrink-0 mb-2">
                    <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-gradient-elegant/20 border border-primary/30 flex items-center justify-center">
                      <ChatbotAvatar 
                        isTyping={true}
                        isSpeaking={false}
                        mood="thinking"
                        size="sm"
                      />
                    </div>
                  </div>
                  <div className="bg-gradient-to-r from-muted/95 via-muted/90 to-card/90 text-foreground px-3 sm:px-4 py-2.5 sm:py-3 rounded-2xl rounded-bl-md text-xs sm:text-sm border-2 border-primary/30 backdrop-blur-sm shadow-lg relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-20 h-20 bg-primary/10 rounded-full blur-2xl animate-pulse"></div>
                    <div className="flex space-x-1 items-center relative z-10">
                      <span className="text-[10px] sm:text-xs text-primary font-semibold mr-1.5 sm:mr-2">AI is thinking</span>
                      <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-gradient-to-r from-primary to-violet-500 rounded-full animate-bounce"></div>
                      <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-gradient-to-r from-violet-500 to-cyan-500 rounded-full animate-bounce [animation-delay:0.1s]"></div>
                      <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-gradient-to-r from-cyan-500 to-primary rounded-full animate-bounce [animation-delay:0.2s]"></div>
                    </div>
                  </div>
                </div>
              )}
              
              {/* Invisible div for auto-scroll */}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-3 sm:p-4 md:p-6 border-t border-primary/20 bg-card/50 backdrop-blur-sm">
              <div className="flex space-x-2 sm:space-x-3 items-end">
                <div className="flex-1 min-w-0 relative">
                  <Input
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value.slice(0, MAX_MESSAGE_LENGTH))}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    placeholder="Ask about WiFi solutions..."
                    className="resize-none border-primary/30 bg-background/80 backdrop-blur-sm text-foreground placeholder:text-muted-foreground focus:border-primary/50 focus:shadow-tech-glow/30 rounded-xl h-10 sm:h-11 md:h-12 text-xs sm:text-sm pr-16"
                    disabled={isTyping}
                    maxLength={MAX_MESSAGE_LENGTH}
                  />
                  <span className="absolute right-2 top-1/2 -translate-y-1/2 text-[10px] text-muted-foreground">
                    {inputValue.length}/{MAX_MESSAGE_LENGTH}
                  </span>
                </div>
                <Button
                  onClick={handleSendMessage}
                  disabled={!inputValue.trim() || isTyping}
                  className="w-10 h-10 sm:w-11 sm:h-11 md:w-12 md:h-12 rounded-xl bg-gradient-elegant hover:bg-gradient-elegant/90 text-primary-foreground shadow-card-shadow hover:shadow-tech-glow transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex-shrink-0"
                >
                  <Send className="w-4 h-4 sm:w-4.5 sm:h-4.5 md:w-5 md:h-5" />
                </Button>
              </div>
              
              {/* Quick suggestion chips */}
              <div className="flex flex-wrap gap-1.5 sm:gap-2 mt-3 sm:mt-4 opacity-90">
                <button 
                  onClick={() => {setInputValue("What services do you offer?"); setTimeout(handleSendMessage, 100);}}
                  className="text-[10px] sm:text-xs px-2 sm:px-3 py-1.5 sm:py-2 bg-primary/15 text-primary rounded-full hover:bg-primary/25 transition-all duration-200 border border-primary/30 hover:shadow-md hover:scale-105"
                >
                  Services 🔧
                </button>
                <button 
                  onClick={() => {setInputValue("What areas do you cover?"); setTimeout(handleSendMessage, 100);}}
                  className="text-[10px] sm:text-xs px-2 sm:px-3 py-1.5 sm:py-2 bg-primary/15 text-primary rounded-full hover:bg-primary/25 transition-all duration-200 border border-primary/30 hover:shadow-md hover:scale-105"
                >
                  Coverage 📍
                </button>
                <button 
                  onClick={() => {setInputValue("Contact information"); setTimeout(handleSendMessage, 100);}}
                  className="text-[10px] sm:text-xs px-2 sm:px-3 py-1.5 sm:py-2 bg-primary/15 text-primary rounded-full hover:bg-primary/25 transition-all duration-200 border border-primary/30 hover:shadow-md hover:scale-105"
                >
                  Contact 📞
                </button>
              </div>
              
              {/* Friendly footer */}
              <div className="text-center mt-2 sm:mt-3">
                <p className="text-[10px] sm:text-xs text-muted-foreground">
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
