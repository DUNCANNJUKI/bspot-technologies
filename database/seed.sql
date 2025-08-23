-- Seed data for B-Spot Network Solutions
-- Run this after schema.sql to populate the database with sample data

BEGIN;

-- Clear existing data (optional - remove if you want to preserve data)
-- TRUNCATE public.contacts, public.services, public.projects, public.profiles RESTART IDENTITY CASCADE;

-- ======================
-- SAMPLE SERVICES DATA
-- ======================

INSERT INTO public.services (title, description, price_range, category, features, sort_order) VALUES
    (
        'Complete WiFi Infrastructure',
        'End-to-end WiFi solutions including planning, installation, and optimization for businesses of all sizes.',
        '$1,000 - $10,000',
        'wifi',
        ARRAY[
            'Professional site survey and planning',
            'Enterprise-grade equipment installation',
            'Network security configuration',
            'Performance optimization',
            'Staff training and documentation',
            '1-year warranty and support'
        ],
        1
    ),
    (
        'Network Security Assessment',
        'Comprehensive security evaluation and hardening of your network infrastructure to protect against cyber threats.',
        '$500 - $3,000',
        'consulting',
        ARRAY[
            'Vulnerability scanning and penetration testing',
            'Security policy review',
            'Compliance assessment (HIPAA, PCI, etc.)',
            'Detailed security report',
            'Remediation recommendations',
            'Follow-up consultation'
        ],
        2
    ),
    (
        'Access Point Installation & Configuration',
        'Professional installation and optimization of wireless access points for optimal coverage and performance.',
        '$200 - $800 per AP',
        'infrastructure',
        ARRAY[
            'Optimal placement planning',
            'Professional mounting and cabling',
            'Advanced configuration and tuning',
            'Signal strength optimization',
            'Guest network setup',
            'Remote monitoring setup'
        ],
        3
    ),
    (
        'Network Maintenance & Support',
        'Ongoing maintenance and support services to keep your network running at peak performance.',
        '$100 - $500/month',
        'maintenance',
        ARRAY[
            '24/7 network monitoring',
            'Proactive issue detection',
            'Regular performance optimization',
            'Security updates and patches',
            'Priority technical support',
            'Quarterly performance reports'
        ],
        4
    ),
    (
        'Fiber Optic Network Installation',
        'High-speed fiber optic network installation for businesses requiring maximum bandwidth and reliability.',
        '$2,000 - $15,000',
        'infrastructure',
        ARRAY[
            'Fiber route planning and design',
            'Professional fiber optic installation',
            'Splicing and termination',
            'Testing and certification',
            'Integration with existing networks',
            'Documentation and labeling'
        ],
        5
    ),
    (
        'Guest WiFi Solutions',
        'Secure and user-friendly guest WiFi systems with branding and social media integration.',
        '$300 - $1,500',
        'wifi',
        ARRAY[
            'Branded guest portal design',
            'Social media login integration',
            'Terms of service management',
            'Bandwidth and time controls',
            'Usage analytics and reporting',
            'Easy management interface'
        ],
        6
    );

-- ======================
-- SAMPLE PROJECTS DATA
-- ======================

INSERT INTO public.projects (title, description, client_name, project_type, start_date, end_date, status, technologies, is_featured, is_public) VALUES
    (
        'Corporate Headquarters WiFi Overhaul',
        'Complete redesign and installation of enterprise WiFi infrastructure for a 300-employee corporate headquarters, including guest networks and IoT device management.',
        'TechCorp Solutions',
        'Enterprise WiFi Infrastructure',
        '2024-01-15',
        '2024-03-20',
        'completed',
        ARRAY['Ubiquiti UniFi Dream Machine Pro', 'WiFi 6E Access Points', 'Cisco Catalyst Switches', 'Fiber Backbone', 'UniFi Network Management'],
        true,
        true
    ),
    (
        'Multi-Location Restaurant Chain Network',
        'Standardized WiFi solution deployment across 12 restaurant locations with centralized management and guest analytics.',
        'Gourmet Restaurant Group',
        'Multi-Site WiFi Deployment',
        '2023-11-01',
        '2024-02-15',
        'completed',
        ARRAY['Cloud-Managed WiFi', 'Guest Portal System', 'Social Media Integration', 'Bandwidth Management', 'Centralized Monitoring'],
        true,
        true
    ),
    (
        'Hospital Secure Network Infrastructure',
        'HIPAA-compliant network infrastructure with segregated networks for medical devices, staff, and guests.',
        'Regional Medical Center',
        'Healthcare Network Security',
        '2024-02-01',
        '2024-05-30',
        'completed',
        ARRAY['Aruba ClearPass', 'Medical Device Network Segmentation', 'WPA3 Enterprise Security', 'Network Access Control', 'Compliance Monitoring'],
        true,
        true
    ),
    (
        'Manufacturing Facility IoT Network',
        'Industrial-grade wireless network supporting IoT sensors, machinery monitoring, and warehouse management systems.',
        'Advanced Manufacturing Inc.',
        'Industrial IoT Network',
        '2024-03-15',
        '2024-06-30',
        'active',
        ARRAY['Industrial WiFi 6', 'IoT Device Management', 'Edge Computing', 'Real-time Monitoring', 'Predictive Analytics'],
        true,
        true
    ),
    (
        'University Campus WiFi Expansion',
        'Expansion of campus-wide WiFi to support 5,000+ concurrent users across dormitories, classrooms, and common areas.',
        'State University',
        'Educational Institution Network',
        '2023-08-01',
        '2023-12-20',
        'completed',
        ARRAY['High-Density WiFi Design', 'Student Portal Integration', 'RADIUS Authentication', 'Content Filtering', 'Load Balancing'],
        false,
        true
    ),
    (
        'Retail Chain Network Standardization',
        'Standardized network infrastructure across 25 retail locations with PCI compliance and customer analytics.',
        'Fashion Forward Retail',
        'Retail Network Infrastructure',
        '2024-04-01',
        '2024-08-15',
        'active',
        ARRAY['PCI-Compliant Networks', 'Customer Analytics', 'Point-of-Sale Integration', 'Inventory Management WiFi', 'Cloud Management'],
        false,
        true
    );

-- ======================
-- SAMPLE CONTACT DATA
-- ======================

INSERT INTO public.contacts (name, email, phone, company, message, status) VALUES
    (
        'John Smith',
        'john.smith@techcorp.com',
        '(555) 123-4567',
        'TechCorp Solutions',
        'We need a comprehensive WiFi solution for our new office building. Looking for enterprise-grade equipment and professional installation.',
        'contacted'
    ),
    (
        'Sarah Johnson',
        'sarah@restaurantgroup.com',
        '(555) 987-6543',
        'Gourmet Restaurant Group',
        'Interested in guest WiFi solutions for our restaurant chain. Need something that integrates with social media.',
        'resolved'
    ),
    (
        'Mike Chen',
        'mike.chen@email.com',
        '(555) 456-7890',
        'Personal',
        'Having issues with WiFi coverage in my home office. Can you help with a site survey?',
        'new'
    );

-- ======================
-- SAMPLE PROFILES DATA
-- ======================
-- Note: These would typically be created when users sign up
-- For demo purposes, we can create some sample profiles

INSERT INTO public.profiles (user_id, display_name, bio) VALUES
    (
        uuid_generate_v4(),
        'Network Administrator',
        'Experienced network administrator looking for reliable WiFi solutions.'
    ),
    (
        uuid_generate_v4(),
        'Business Owner',
        'Small business owner seeking professional network setup and support.'
    );

-- ======================
-- UPDATE SEQUENCES
-- ======================

-- Reset sequences if needed (optional)
-- SELECT setval('contacts_id_seq', (SELECT MAX(id) FROM contacts));

COMMIT;

-- Display sample data counts
SELECT 
    'services' as table_name, 
    COUNT(*) as record_count 
FROM public.services
UNION ALL
SELECT 
    'projects' as table_name, 
    COUNT(*) as record_count 
FROM public.projects
UNION ALL
SELECT 
    'contacts' as table_name, 
    COUNT(*) as record_count 
FROM public.contacts
UNION ALL
SELECT 
    'profiles' as table_name, 
    COUNT(*) as record_count 
FROM public.profiles;