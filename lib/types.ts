export interface Challenge {
    title: string;
    description: string;
    icon?: string;
}

export interface KeyFeature {
    title: string;
    description: string;
    featureImage?: string;
    featureVideo?: string;
    highlight?: string;
    order?: number;
}

export interface DesignStep {
    title: string;
    description: string;
    image?: string;
}

export interface UIAsset {
    caption?: string;
    image: string;
    alt?: string;
}

export interface LighthouseScore {
    performance: number;
    accessibility: number;
    bestPractices: number;
    seo: number;
    screenshot?: string;
}

export interface ProjectResult {
    title: string;
    description: string;
}

export interface Testimonial {
    clientName: string;
    company?: string;
    designation?: string;
    photo?: string;
    rating: number;
    testimonial: string;
}

export interface FAQItem {
    question: string;
    answer: string;
}

export interface CTAConfig {
    title: string;
    description: string;
    buttonText: string;
    buttonLink: string;
}

export interface Project {
    $id: string;
    $createdAt: string;
    $updatedAt: string;
    title: string;
    thumbnail: string; // Cover image
    live_url: string;
    description: string;
    is_public: boolean;
    status: 'ongoing' | 'completed';
    tags: string[];
    
    // Basic Information
    slug?: string;
    shortDescription?: string;
    clientName?: string;
    industry?: string;
    category?: string;
    duration?: string;
    myRole?: string;
    teamSize?: number;
    completionDate?: string;
    displayOrder?: number;
    clientLogo?: string;
    heroBannerImage?: string;
    featured?: boolean;

    // Hero Section
    heroTitle?: string;
    heroSubtitle?: string;
    heroImage?: string; // Legacy field
    heroVideo?: string;
    heroBackground?: string;

    // Client Info Extended
    clientLocation?: string;
    clientWebsite?: string;

    // Project Overview
    overview?: string;
    problemSummary?: string;
    solutionSummary?: string;
    goals?: string[];
    challenges?: Challenge[];
    solution?: string;

    // Tech Stack & Features
    technologies?: string[];
    keyFeatures?: KeyFeature[];

    // Design Process
    designSteps?: DesignStep[];

    // Gallery
    gallery?: UIAsset[];

    // Performance Metrics
    lighthouseDesktop?: LighthouseScore;
    lighthouseMobile?: LighthouseScore;

    // Toggles for Optional Panels
    enableLocalSeo?: boolean;
    enableAiOptimization?: boolean;

    // Search Console Stats & Screen Shots
    scClicks?: number;
    scImpressions?: number;
    scCtr?: number;
    scPosition?: number;
    scIndexedPages?: number;
    scPerformanceScreenshot?: string;
    scCoverageScreenshot?: string;
    scIndexingScreenshot?: string;
    scCoreWebVitalsScreenshot?: string;

    // SEO Metadata
    metaTitle?: string;
    metaDescription?: string;
    metaKeywords?: string[];
    robotsRule?: string;
    canonicalUrl?: string;

    // Agentic Browsing Optimization
    agenticSummary?: string;    // Markdown/text optimized summary for AI Search Agents
    agentInstructions?: string; // Directions/prompts for LLMs crawling this page

    // Google Business Profile (GBP) & Local SEO
    gbpUrl?: string;            // GBP review/listing link
    mapsEmbedUrl?: string;      // Google Maps direction embed link
    localKeywords?: string[];   // e.g. ["ent clinic silchar"]
    targetAreas?: string[];     // Targeted locations/neighborhoods
    napConsistency?: string;    // Consistent Name, Address, Phone details

    // Case Study Results & Testimonials
    results?: ProjectResult[];
    testimonial?: Testimonial;
    faq?: FAQItem[];
    cta?: CTAConfig;
}

export type CreateProjectData = Omit<Project, '$id' | '$createdAt' | '$updatedAt' | 'thumbnail'>;

export interface Review {
    $id: string;
    $createdAt: string;
    $updatedAt: string;
    name: string;
    review: string;
    rating: number;
    is_published: boolean;
}
