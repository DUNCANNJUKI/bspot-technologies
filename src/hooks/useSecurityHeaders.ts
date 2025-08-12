import { useEffect } from 'react';

/**
 * Security hook that applies CSP and other security headers via meta tags
 * This provides basic client-side security configuration
 */
export const useSecurityHeaders = () => {
  useEffect(() => {
    // Content Security Policy
    const cspMeta = document.createElement('meta');
    cspMeta.httpEquiv = 'Content-Security-Policy';
    cspMeta.content = [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' https://analytics.google.com",
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
      "font-src 'self' https://fonts.gstatic.com",
      "img-src 'self' data: https:",
      "connect-src 'self' https://*.supabase.co https://*.supabase.io",
      "frame-ancestors 'none'",
      "base-uri 'self'",
      "form-action 'self'"
    ].join('; ');
    
    // X-Frame-Options
    const frameMeta = document.createElement('meta');
    frameMeta.httpEquiv = 'X-Frame-Options';
    frameMeta.content = 'DENY';
    
    // X-Content-Type-Options
    const contentTypeMeta = document.createElement('meta');
    contentTypeMeta.httpEquiv = 'X-Content-Type-Options';
    contentTypeMeta.content = 'nosniff';
    
    // Referrer Policy
    const referrerMeta = document.createElement('meta');
    referrerMeta.name = 'referrer';
    referrerMeta.content = 'strict-origin-when-cross-origin';
    
    document.head.appendChild(cspMeta);
    document.head.appendChild(frameMeta);
    document.head.appendChild(contentTypeMeta);
    document.head.appendChild(referrerMeta);
    
    return () => {
      document.head.removeChild(cspMeta);
      document.head.removeChild(frameMeta);
      document.head.removeChild(contentTypeMeta);
      document.head.removeChild(referrerMeta);
    };
  }, []);
};