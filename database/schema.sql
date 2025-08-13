-- B-Spot Network Solutions Database Schema
-- PostgreSQL Schema for local development

-- Enable required extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Create custom types if needed
-- (Add custom types here as project grows)

-- ======================
-- AUTHENTICATION TABLES
-- ======================
-- Note: If using Supabase, auth is handled automatically
-- For local setup without Supabase, implement basic auth tables:

-- User profiles table (extends Supabase auth.users)
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID UNIQUE NOT NULL, -- References auth.users(id) in Supabase
    display_name TEXT,
    avatar_url TEXT,
    bio TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ======================
-- BUSINESS TABLES
-- ======================

-- Contact form submissions
CREATE TABLE IF NOT EXISTS public.contacts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    company TEXT,
    message TEXT NOT NULL,
    status TEXT DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'resolved')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Services catalog
CREATE TABLE IF NOT EXISTS public.services (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    price_range TEXT,
    category TEXT NOT NULL CHECK (category IN ('wifi', 'infrastructure', 'consulting', 'maintenance')),
    features TEXT[], -- Array of features
    is_active BOOLEAN DEFAULT true,
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Projects/Case studies
CREATE TABLE IF NOT EXISTS public.projects (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    client_name TEXT,
    project_type TEXT NOT NULL,
    start_date DATE,
    end_date DATE,
    status TEXT DEFAULT 'active' CHECK (status IN ('planning', 'active', 'completed', 'on-hold')),
    technologies TEXT[], -- Array of technologies used
    images TEXT[], -- Array of image URLs
    is_featured BOOLEAN DEFAULT false,
    is_public BOOLEAN DEFAULT true, -- Whether to show in portfolio
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ======================
-- INDEXES
-- ======================

-- Profiles indexes
CREATE INDEX IF NOT EXISTS idx_profiles_user_id ON public.profiles(user_id);

-- Contacts indexes
CREATE INDEX IF NOT EXISTS idx_contacts_created_at ON public.contacts(created_at);
CREATE INDEX IF NOT EXISTS idx_contacts_status ON public.contacts(status);
CREATE INDEX IF NOT EXISTS idx_contacts_email ON public.contacts(email);

-- Services indexes
CREATE INDEX IF NOT EXISTS idx_services_category ON public.services(category);
CREATE INDEX IF NOT EXISTS idx_services_active ON public.services(is_active);
CREATE INDEX IF NOT EXISTS idx_services_sort_order ON public.services(sort_order);

-- Projects indexes
CREATE INDEX IF NOT EXISTS idx_projects_status ON public.projects(status);
CREATE INDEX IF NOT EXISTS idx_projects_featured ON public.projects(is_featured);
CREATE INDEX IF NOT EXISTS idx_projects_public ON public.projects(is_public);
CREATE INDEX IF NOT EXISTS idx_projects_type ON public.projects(project_type);

-- ======================
-- TRIGGERS
-- ======================

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Apply updated_at triggers
CREATE TRIGGER update_profiles_updated_at
    BEFORE UPDATE ON public.profiles
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_contacts_updated_at
    BEFORE UPDATE ON public.contacts
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_services_updated_at
    BEFORE UPDATE ON public.services
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_projects_updated_at
    BEFORE UPDATE ON public.projects
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- ======================
-- ROW LEVEL SECURITY (RLS)
-- ======================
-- Note: Enable RLS if using Supabase authentication

-- Enable RLS on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contacts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;

-- Profiles policies (users can only see/edit their own profile)
-- CREATE POLICY "Users can view their own profile" ON public.profiles
--     FOR SELECT USING (auth.uid() = user_id);
-- CREATE POLICY "Users can update their own profile" ON public.profiles
--     FOR UPDATE USING (auth.uid() = user_id);
-- CREATE POLICY "Users can insert their own profile" ON public.profiles
--     FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Public read policies for services and projects
-- CREATE POLICY "Services are publicly readable" ON public.services
--     FOR SELECT USING (is_active = true);
-- CREATE POLICY "Public projects are readable" ON public.projects
--     FOR SELECT USING (is_public = true);

-- Contacts policies (admin only for security)
-- Note: Implement admin role checking as needed

-- ======================
-- INITIAL DATA
-- ======================

-- Insert sample services
INSERT INTO public.services (title, description, price_range, category, features) VALUES
    (
        'WiFi Infrastructure Setup', 
        'Complete WiFi network design and installation for businesses and residential properties.',
        '$500 - $5,000',
        'wifi',
        ARRAY['Site survey', 'Network design', 'Equipment installation', 'Configuration', 'Testing']
    ),
    (
        'Network Security Audit',
        'Comprehensive security assessment of your network infrastructure.',
        '$300 - $1,500',
        'consulting',
        ARRAY['Vulnerability scanning', 'Security recommendations', 'Compliance check', 'Report delivery']
    ),
    (
        'Access Point Installation',
        'Professional installation and configuration of wireless access points.',
        '$200 - $800',
        'infrastructure',
        ARRAY['Mount installation', 'Cable management', 'Configuration', 'Signal optimization']
    )
ON CONFLICT DO NOTHING;

-- Insert sample projects
INSERT INTO public.projects (title, description, client_name, project_type, status, technologies, is_featured, is_public) VALUES
    (
        'Enterprise WiFi Deployment',
        'Large-scale WiFi infrastructure for 200+ employee office building.',
        'Tech Solutions Inc.',
        'Enterprise WiFi',
        'completed',
        ARRAY['Ubiquiti UniFi', 'Cisco Switches', 'Fiber Optics'],
        true,
        true
    ),
    (
        'Restaurant WiFi Solution',
        'Guest and staff WiFi networks with social media integration.',
        'Downtown Bistro',
        'Hospitality WiFi',
        'completed',
        ARRAY['Guest Portal', 'Social Login', 'Bandwidth Management'],
        true,
        true
    )
ON CONFLICT DO NOTHING;

COMMIT;