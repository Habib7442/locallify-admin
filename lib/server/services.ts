import { client, writeClient } from "../sanity";
import { getLoggedInUser } from "./sanity";
import { Project, Review } from "../types";

export const serverProjectService = {
  async getAllProjects() {
    const user = await getLoggedInUser();
    if (!user) throw new Error("Not authenticated");

    const response = await client.fetch<any[]>(`*[_type == "project"] | order(_createdAt desc)`);
    return response.map(doc => ({
      ...doc,
      $id: doc._id,
      $createdAt: doc._createdAt,
      $updatedAt: doc._updatedAt,
    })) as unknown as Project[];
  },

  async createProject(data: Partial<Project>) {
    const payload = {
      _type: "project",
      title: data.title,
      description: data.description,
      status: data.status || "ongoing",
      live_url: data.live_url || "",
      is_public: data.is_public !== false,
      tags: data.tags || [],
      thumbnail: data.thumbnail || "default",

      // Basic Information
      slug: data.slug || "",
      shortDescription: data.shortDescription || "",
      clientName: data.clientName || "",
      industry: data.industry || "",
      category: data.category || "",
      duration: data.duration || "",
      myRole: data.myRole || "",
      teamSize: data.teamSize || 1,
      completionDate: data.completionDate || "",
      displayOrder: data.displayOrder || 0,
      clientLogo: data.clientLogo || "",
      heroBannerImage: data.heroBannerImage || "",
      featured: data.featured || false,

      // Hero Section
      heroTitle: data.heroTitle || "",
      heroSubtitle: data.heroSubtitle || "",
      heroImage: data.heroImage || "",
      heroVideo: data.heroVideo || "",
      heroBackground: data.heroBackground || "",

      // Client Info Extended
      clientLocation: data.clientLocation || "",
      clientWebsite: data.clientWebsite || "",

      // Project Overview
      overview: data.overview || "",
      problemSummary: data.problemSummary || "",
      solutionSummary: data.solutionSummary || "",
      goals: data.goals || [],
      challenges: data.challenges || [],
      solution: data.solution || "",

      // Tech Stack & Features
      technologies: data.technologies || [],
      keyFeatures: data.keyFeatures || [],

      // Design Process
      designSteps: data.designSteps || [],

      // Gallery
      gallery: data.gallery || [],

      // Performance Metrics
      lighthouseDesktop: data.lighthouseDesktop || null,
      lighthouseMobile: data.lighthouseMobile || null,

      // Toggles for Optional Panels
      enableLocalSeo: data.enableLocalSeo || false,
      enableAiOptimization: data.enableAiOptimization || false,

      // Search Console Stats & Screen Shots
      scClicks: data.scClicks || 0,
      scImpressions: data.scImpressions || 0,
      scCtr: data.scCtr || 0,
      scPosition: data.scPosition || 0,
      scIndexedPages: data.scIndexedPages || 0,
      scPerformanceScreenshot: data.scPerformanceScreenshot || "",
      scCoverageScreenshot: data.scCoverageScreenshot || "",
      scIndexingScreenshot: data.scIndexingScreenshot || "",
      scCoreWebVitalsScreenshot: data.scCoreWebVitalsScreenshot || "",

      // SEO Metadata
      metaTitle: data.metaTitle || "",
      metaDescription: data.metaDescription || "",
      metaKeywords: data.metaKeywords || [],
      robotsRule: data.robotsRule || "",
      canonicalUrl: data.canonicalUrl || "",

      // Agentic Browsing Optimization
      agenticSummary: data.agenticSummary || "",
      agentInstructions: data.agentInstructions || "",

      // Google Business Profile (GBP) & Local SEO
      gbpUrl: data.gbpUrl || "",
      mapsEmbedUrl: data.mapsEmbedUrl || "",
      localKeywords: data.localKeywords || [],
      targetAreas: data.targetAreas || [],
      napConsistency: data.napConsistency || "",

      // Case Study Results & Testimonials
      results: data.results || [],
      testimonial: data.testimonial || null,
      faq: data.faq || [],
      cta: data.cta || null,
    };

    const response = await writeClient.create(payload);
    return {
      ...response,
      $id: response._id,
      $createdAt: response._createdAt,
      $updatedAt: response._updatedAt,
    };
  },

  async updateProject(projectId: string, data: Partial<Project>) {
    const payload: any = {};
    const keys = [
      "title", "description", "status", "live_url", "is_public", "tags", "thumbnail",
      "slug", "shortDescription", "clientName", "industry", "category", "featured",
      "duration", "myRole", "teamSize", "completionDate", "displayOrder", "clientLogo", 
      "heroBannerImage", "heroTitle", "heroSubtitle", "heroImage", "heroVideo", 
      "heroBackground", "clientLocation", "clientWebsite", "overview", "problemSummary", 
      "solutionSummary", "goals", "challenges", "solution", "technologies", "keyFeatures", 
      "designSteps", "gallery", "lighthouseDesktop", "lighthouseMobile", "enableLocalSeo", 
      "enableAiOptimization", "scClicks", "scImpressions", "scCtr", "scPosition", "scIndexedPages",
      "scPerformanceScreenshot", "scCoverageScreenshot", "scIndexingScreenshot", 
      "scCoreWebVitalsScreenshot", "metaTitle", "metaDescription", "metaKeywords",
      "robotsRule", "canonicalUrl", "agenticSummary", "agentInstructions", "gbpUrl",
      "mapsEmbedUrl", "localKeywords", "targetAreas", "napConsistency", "results",
      "testimonial", "faq", "cta"
    ];

    keys.forEach(key => {
      if ((data as any)[key] !== undefined) {
        payload[key] = (data as any)[key];
      }
    });

    const response = await writeClient
      .patch(projectId)
      .set(payload)
      .commit();
      
    return {
      ...response,
      $id: response._id,
      $createdAt: response._createdAt,
      $updatedAt: response._updatedAt,
    };
  },

  async deleteProject(projectId: string) {
    return await writeClient.delete(projectId);
  },
};

export const serverProfilesService = {
  async getProfilesCount() {
    const user = await getLoggedInUser();
    if (!user) throw new Error("Not authenticated");

    const count = await client.fetch<number>(`count(*[_type == "profile"])`);
    return count;
  },
};

export const serverReviewService = {
  async getAllReviews() {
    const user = await getLoggedInUser();
    if (!user) throw new Error("Not authenticated");

    const response = await client.fetch<any[]>(`*[_type == "review"] | order(_createdAt desc)`);
    return response.map(doc => ({
      ...doc,
      $id: doc._id,
      $createdAt: doc._createdAt,
      $updatedAt: doc._updatedAt,
    })) as unknown as Review[];
  },
};
