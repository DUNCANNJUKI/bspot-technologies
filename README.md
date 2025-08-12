# B-Spot Network Solutions

A modern web application for network infrastructure services built with React, TypeScript, and Supabase.

## 🚀 Overview

B-Spot Network Solutions provides comprehensive network infrastructure services including WiFi solutions, access point installations, and network optimization. This application showcases our services with a modern, responsive design.

## ✨ Features

- **Modern UI/UX**: Built with React and Tailwind CSS
- **Responsive Design**: Mobile-first approach with beautiful animations
- **Component Library**: Extensive shadcn/ui component system
- **Type Safety**: Full TypeScript implementation
- **Backend Integration**: Supabase for authentication and data management
- **Security**: Comprehensive security headers and CSP implementation
- **Performance**: Optimized with Vite build system

## 🛠️ Tech Stack

### Frontend
- **React 18.3.1** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Styling framework
- **shadcn/ui** - Component library
- **React Router** - Client-side routing
- **React Query** - Server state management

### Backend
- **Supabase** - Backend as a Service
  - Database (PostgreSQL)
  - Authentication
  - Real-time subscriptions
  - Storage

### UI Components
- **Radix UI** - Headless component primitives
- **Lucide React** - Icon library
- **Sonner** - Toast notifications
- **React Hook Form** - Form management

## 📁 Project Structure

```
src/
├── components/           # Reusable UI components
│   ├── ui/              # shadcn/ui components
│   ├── Header.tsx       # Navigation header
│   ├── Hero.tsx         # Hero section
│   ├── Services.tsx     # Services showcase
│   ├── About.tsx        # About section
│   ├── Contact.tsx      # Contact form
│   └── Footer.tsx       # Site footer
├── hooks/               # Custom React hooks
│   ├── use-mobile.tsx   # Mobile detection
│   ├── use-toast.ts     # Toast notifications
│   └── useSecurityHeaders.ts # Security headers
├── integrations/        # External service integrations
│   └── supabase/       # Supabase client and types
├── lib/                # Utility functions
│   └── utils.ts        # Class name utilities
├── pages/              # Page components
│   ├── Index.tsx       # Landing page
│   └── NotFound.tsx    # 404 page
└── assets/             # Static assets
```

## 🚦 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn or bun

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd bspot-network-solutions
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   ```
   http://localhost:8080
   ```

### Build for Production

```bash
# Build the application
npm run build

# Preview production build
npm run preview
```

## 🔧 Configuration

### Environment Setup
The application is configured to work with Supabase. The connection is pre-configured in `src/integrations/supabase/client.ts`.

### Tailwind Configuration
Custom design system tokens are defined in:
- `src/index.css` - CSS custom properties
- `tailwind.config.ts` - Tailwind configuration

## 🎨 Design System

The application uses a comprehensive design system with:

- **Color Tokens**: Semantic color variables for theming
- **Typography**: Custom font stacks with tech-inspired styling
- **Components**: Reusable UI components with variants
- **Animations**: Smooth transitions and hover effects
- **Responsive Design**: Mobile-first approach

## 🔐 Security Features

- **Content Security Policy (CSP)** - Prevents XSS attacks
- **X-Frame-Options** - Prevents clickjacking
- **X-Content-Type-Options** - Prevents MIME type sniffing
- **Referrer Policy** - Controls referrer information
- **Input Validation** - Form validation with proper sanitization

## 📱 Features Overview

### Landing Page Sections
1. **Navigation Header** - Responsive navigation with mobile menu
2. **Hero Section** - Compelling value proposition with CTA
3. **Services** - Showcase of network solutions
4. **About** - Company information and expertise
5. **Contact** - Contact form with validation
6. **Footer** - Additional information and links

### Interactive Elements
- Smooth scrolling navigation
- Animated service cards
- Contact form with validation
- Responsive mobile menu
- Hover effects and transitions

## 🧪 Testing

```bash
# Run linting
npm run lint

# Build for development mode
npm run build:dev
```

## 📚 Documentation

- [Development Guide](docs/DEVELOPMENT.md)
- [Deployment Guide](docs/DEPLOYMENT.md)
- [Component Documentation](docs/COMPONENTS.md)
- [Backup Guide](docs/BACKUP_GUIDE.md)
- [Troubleshooting Guide](docs/TROUBLESHOOTING.md)

## 🚀 Deployment

The application can be deployed to various platforms:

### Lovable (Recommended)
- Automatic deployment via Lovable platform
- Built-in preview environments
- Custom domain support

### Other Platforms
- Vercel
- Netlify
- GitHub Pages
- Any static hosting service

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is proprietary software. All rights reserved.

## 📞 Support

For support and inquiries:
- Email: contact@bspot-solutions.com
- Website: [B-Spot Network Solutions](https://your-domain.com)

---

**Development URLs**:
- Lovable Project: https://lovable.dev/projects/fdf1f569-7a7c-4bf8-ae06-553202cbfc7f
- Supabase Dashboard: https://supabase.com/dashboard/project/rtgcrclgmvcmrjpvtpwm

Built with ❤️ using [Lovable](https://lovable.dev)
