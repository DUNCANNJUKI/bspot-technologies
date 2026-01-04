import { Facebook, Youtube } from "lucide-react";

interface SocialLinksProps {
  size?: "sm" | "md" | "lg";
  showLabels?: boolean;
  className?: string;
}

const socialLinks = [
  {
    name: "Facebook",
    href: "https://www.facebook.com/people/B-Spot-Technologies/61574108452350/?rdid=DTgk4hdhIKNRQlaM&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F17CUFWVonm%2F",
    icon: Facebook,
    color: "#1877F2",
    label: "Follow us on Facebook",
  },
  {
    name: "YouTube",
    href: "https://youtube.com/@beeent001?si=pU8Pv6dL_F2VvG6y",
    icon: Youtube,
    color: "#FF0000",
    label: "Subscribe on YouTube",
  },
  {
    name: "X",
    href: "https://x.com/ent_bee?t=QUDS0XTLVz-3R1wjJO_E-w&s=09",
    icon: null, // Custom SVG
    color: "#000000",
    darkColor: "#FFFFFF",
    label: "Follow us on X",
  },
];

const sizeClasses = {
  sm: { container: "w-10 h-10", icon: "w-4 h-4" },
  md: { container: "w-12 h-12", icon: "w-5 h-5" },
  lg: { container: "w-14 h-14", icon: "w-6 h-6" },
};

export function SocialLinks({ size = "md", showLabels = false, className = "" }: SocialLinksProps) {
  const sizeClass = sizeClasses[size];

  return (
    <div className={`flex items-center gap-4 ${className}`}>
      {socialLinks.map((social) => (
        <a
          key={social.name}
          href={social.href}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex flex-col items-center gap-2"
          aria-label={social.label}
        >
          <div
            className={`relative ${sizeClass.container} rounded-xl flex items-center justify-center group-hover:scale-110 transition-all duration-300 overflow-hidden`}
            style={{
              backgroundColor: social.name === "X" ? undefined : social.color,
            }}
          >
            {/* X has special dark/light handling */}
            {social.name === "X" && (
              <div className="absolute inset-0 bg-black dark:bg-white" />
            )}
            
            {/* Hover gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/25 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            
            {/* Icon */}
            {social.icon ? (
              <social.icon
                className={`${sizeClass.icon} text-white relative z-10`}
                fill="white"
              />
            ) : (
              <svg
                className={`${sizeClass.icon} text-white dark:text-black relative z-10`}
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            )}
            
            {/* Glow effect on hover */}
            <div
              className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-300"
              style={{
                boxShadow: `0 8px 24px ${social.color}60`,
              }}
            />
          </div>
          
          {showLabels && (
            <span className="text-xs font-medium text-muted-foreground group-hover:text-foreground transition-colors">
              {social.name}
            </span>
          )}
        </a>
      ))}
    </div>
  );
}

export default SocialLinks;
