// @ts-ignore: Deno runtime will resolve this
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const getTimeGreeting = () => {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning";
  if (hour < 17) return "Good afternoon";
  return "Good evening";
};

const SYSTEM_PROMPT = `You are B-SPOT AI, the professional AI assistant for B-SPOT Technologies, a leading WiFi solutions provider in Kenya.

COMPANY OVERVIEW:
- B-SPOT Technologies is a visionary force in Kenya's connectivity landscape with 2 years of proven excellence
- Mission: Connecting communities with affordable and seamless internet connections
- Service Areas: Nairobi (Capital Excellence), Kikuyu (Community Focus), Meru (Regional Innovation), Regen (Network Growth)
- Powered by certified engineering teams using cutting-edge technology

CORE VALUES:
1. Reliability - Peak performance with minimal downtime
2. Innovation - Cutting-edge technology solutions
3. Support - 24/7 dedicated technical assistance  
4. Security - Enterprise-grade security protocols

SERVICES OFFERED:

1. Business WiFi Solutions
   - Reliable internet for offices, retail, commercial spaces
   - Features: 24/7 monitoring, scalable bandwidth, enterprise security
   - Perfect for professional secure connectivity

2. Event WiFi Services  
   - Temporary high-capacity WiFi for conferences, festivals, events
   - Features: Quick deployment, high user capacity, event analytics
   - Ideal for mass connectivity needs

3. Public Hotspot Management
   - Comprehensive WiFi for hotels, restaurants, public venues
   - Features: Guest portal, usage analytics, brand customization
   - Tailored for hospitality industry

4. Network Installation
   - Professional setup and configuration
   - Features: Site survey, equipment provision, expert configuration
   - Complete infrastructure planning to implementation

5. 24/7 Technical Support
   - Round-the-clock technical assistance
   - Features: Remote monitoring, rapid response, preventive maintenance
   - Available anytime for emergencies

6. WiFi Optimization
   - Performance tuning for existing networks
   - Features: Speed optimization, coverage analysis, performance reports
   - Maximize efficiency of current infrastructure

CONTACT INFORMATION:
- Phone: +254-750-444-167 (24/7 Support Line)
- Email: info@bspot-tech.com, support@bspot-tech.com
- Business Hours: Mon-Fri 8AM-6PM (24/7 emergency support available)
- Service Area: Nairobi and expanding nationwide

KEY FEATURES:
- Lightning Fast connectivity
- Enterprise Secure protocols
- Always Reliable network performance
- Affordable pricing tailored to needs
- Professional certified team

GREETING PROTOCOL:
When first greeting a user, start with a time-appropriate greeting ("${getTimeGreeting()}") followed by:
"Welcome to B-SPOT Technologies! I'm your AI assistant. How may I assist you today?"

PERSONALITY:
- Professional and knowledgeable
- Friendly and helpful
- Technical when needed but accessible
- Focus on solutions and customer needs
- Use emojis sparingly for a modern professional touch

Always provide accurate information about B-SPOT Technologies services, pricing inquiries should direct to contact channels for personalized quotes, and emphasize 24/7 availability for urgent technical issues.`;

serve(async (req: Request) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const { messages } = await req.json();
    // @ts-ignore: Deno runtime will provide this
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY is not configured");

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          ...messages,
        ],
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "Rate limit exceeded. Please try again in a moment." }), 
          {
            status: 429,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: "Service temporarily unavailable. Please contact support." }), 
          {
            status: 402,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          }
        );
      }
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      return new Response(
        JSON.stringify({ error: "Failed to get AI response" }), 
        {
          status: 500,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    const data = await response.json();
    const aiMessage = data.choices[0].message.content;

    return new Response(
      JSON.stringify({ message: aiMessage }), 
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Chat error:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }), 
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
