# 📄 Product Requirements Document (PRD)
## LOCALLIFY — Empowering Local Business
**Website & Landing Page**

---

| Field | Details |
|---|---|
| **Product Name** | Locallify Website & Landing Page |
| **Version** | v1.0 |
| **Domain** | locallify.in |
| **Owner** | Locallify Founding Team |
| **Status** | Draft |
| **Last Updated** | April 2026 |

---

## 1. Executive Summary

Locallify is a digital marketing agency based in Guwahati, Assam, helping local businesses establish and grow their online presence. The goal of this website is to act as the primary sales engine — converting cold visitors into paying clients through clear messaging, social proof, and multiple conversion touchpoints.

The website must feel premium, load fast, work flawlessly on mobile, and speak the language of local Indian business owners. Every section should push visitors toward one action: **contacting Locallify**.

---

## 2. Business Objectives

- Generate **minimum 20 qualified leads per month** via the website within 90 days of launch
- Establish **brand credibility** for Locallify as the go-to digital partner for local businesses in Guwahati and Northeast India
- Rank on **Google Page 1** for keywords like "website design Guwahati", "Google Business Profile Guwahati", "digital marketing Guwahati"
- Reduce **sales pitch time** by letting the website do the initial explaining
- Enable clients to **self-qualify** by reading services and pricing before reaching out

---

## 3. Target Audience

### Primary Audience
Local business owners in Guwahati and Northeast India who:
- Own a physical shop, restaurant, clinic, salon, showroom, or service business
- Have little or no online presence
- Are aged 28–55 years
- Are not very tech-savvy but understand the value of online visibility
- Speak Assamese, Hindi, or Bengali as first language, basic English

### Secondary Audience
- Small startups and new businesses looking for their first website
- Businesses that tried other agencies and had a bad experience
- Businesses that want to run Google or Meta ads but don't know how

### Pain Points to Address
- "Nobody finds my business online"
- "I don't know how to set up Google Maps listing"
- "I had a website built but it's outdated and useless"
- "I tried running ads but wasted money with no results"
- "I don't have time to manage social media"

---

## 4. Brand Guidelines

| Element | Value |
|---|---|
| **Brand Name** | LOCALLIFY |
| **Tagline** | Empowering Local Business |
| **Primary Color** | Deep Blue `#1A2F8A` |
| **Accent Color** | Emerald Green `#00C896` |
| **Background** | White `#FFFFFF` / Light Grey `#F5F7FA` |
| **Heading Font** | Montserrat Bold / Poppins Bold |
| **Body Font** | Poppins Regular / Inter Regular |
| **Logo** | Map pin with growth chart icon + LOCALLIFY wordmark |
| **Tone of Voice** | Friendly, confident, local, trustworthy, action-oriented |

---

## 5. Site Architecture

```
locallify.in/
├── Home (Landing Page)          ← Primary conversion page
├── Services/
│   ├── Website Development
│   ├── Google Business Profile
│   ├── Social Media Management
│   ├── Google & Meta Ads
│   └── Mobile Apps
├── Portfolio / Case Studies
├── Pricing
├── About Us
├── Blog                         ← SEO content engine
├── Contact
└── Thank You Page               ← Post-form submission
```

---

## 6. Landing Page — Section-by-Section Requirements

---

### 6.1 Navigation Bar

**Purpose:** Help users navigate quickly + always show a CTA

**Requirements:**
- Sticky navbar that stays on screen while scrolling
- Logo on the left (clickable, links to homepage)
- Nav links: Home | Services | Portfolio | Pricing | About | Blog | Contact
- Primary CTA button on the right: **"Get Free Consultation"** in green `#00C896`
- On mobile: hamburger menu with smooth slide-down animation
- On scroll: navbar gets a white background with subtle shadow (transparent at top)

**Content:**
- Nav links in Poppins Medium, 14px
- CTA button: rounded pill shape, green fill, white text

---

### 6.2 Hero Section

**Purpose:** Grab attention immediately and push visitors toward the CTA

**Requirements:**
- Full viewport height (100vh) on desktop, auto height on mobile
- Dark blue background `#0D1F6E` with subtle animated background — floating map pins, dotted grid pattern, or particle network
- Headline in large bold white text, maximum 8 words
- Subheadline in light grey/white, 1–2 lines maximum
- Two CTA buttons side-by-side: Primary (green filled) + Secondary (white outlined)
- Right side: Animated mockup of a Google Business Profile or a phone showing a website
- Below the fold: Trust bar with stats

**Content:**

> **Headline:** Put Your Business on the Digital Map
>
> **Subheadline:** We build websites, manage your Google Business Profile, run ads, and handle social media — so you focus on running your business.
>
> **CTA 1:** Get Free Consultation (green button → links to contact form or WhatsApp)
>
> **CTA 2:** See Our Work (outlined white button → links to portfolio)
>
> **Trust Bar:** ✅ 50+ Local Businesses Grown &nbsp;|&nbsp; ⭐ 4.9 Google Rating &nbsp;|&nbsp; 📍 Based in Guwahati

**Animations:**
- Headline fades in from bottom on page load (300ms delay)
- Subheadline fades in 500ms after headline
- Buttons fade in 700ms after
- Phone mockup slides in from right
- Trust bar fades in last

---

### 6.3 Pain Points Section

**Purpose:** Make the visitor feel understood and create emotional resonance

**Requirements:**
- Light grey background `#F5F7FA`
- Section headline in dark blue, centered
- 3 cards in a row (stacked on mobile)
- Each card has an emoji/icon, a short bold problem statement, and 1 line of explanation
- Bottom of section: transition sentence leading into services

**Content:**

> **Section Headline:** Is Your Business Invisible Online?

| Card | Icon | Problem | Description |
|---|---|---|---|
| 1 | 🌐 | No Website or Outdated Site | Customers search online first. If you're not there, they go to your competitor. |
| 2 | 📍 | Google Profile Not Set Up | Missing from Google Maps means missing customers walking right past you. |
| 3 | 📢 | Competitors Getting All the Leads | While you wait, other businesses are running ads and getting your customers. |

> **Transition Line:** *"That's exactly why we built Locallify — your complete digital growth partner."*

---

### 6.4 Services Section

**Purpose:** Show all services clearly and make each one clickable for more info

**Requirements:**
- White background
- Section headline + short subtext centered at top
- 5 service cards in a 3+2 grid layout on desktop, single column on mobile
- Each card: icon, service name, 2-line description, "Learn More →" link
- Cards have hover effect: slight lift shadow + green border accent
- Each card links to individual service page

**Content:**

> **Section Headline:** Everything Your Business Needs to Grow Online
>
> **Subtext:** One partner. All your digital needs. Zero headache.

| Service | Icon | Description |
|---|---|---|
| Website Development | 🌐 | Fast, modern websites that look great on mobile and turn visitors into customers. |
| Google Business Profile | 📍 | Get found on Google Maps. We set up, verify, and optimize your GBP completely. |
| Social Media Management | 📱 | Regular posts, stories, and reels across Facebook and Instagram — done for you. |
| Google & Meta Ads | 📢 | Targeted ad campaigns that bring real customers, not just clicks and impressions. |
| Mobile Apps | 📲 | Simple, affordable mobile apps for businesses that want to offer app-based services. |

---

### 6.5 How It Works Section

**Purpose:** Remove friction by making the process feel simple and clear

**Requirements:**
- Blue gradient background (deep blue to slightly lighter blue)
- Section headline in white, centered
- 3-step horizontal timeline on desktop, vertical on mobile
- Each step: step number (large, styled), title, short description
- Connecting line or arrow between steps
- Step numbers have animated counter or pulse effect
- CTA button at the bottom

**Content:**

> **Section Headline:** Getting Started is Simple

| Step | Title | Description |
|---|---|---|
| 01 | Free Consultation | Tell us about your business and goals. We'll understand your needs — no charge, no obligation. |
| 02 | We Build & Set Up | Our team builds your website, sets up your Google profile, and prepares your social media. |
| 03 | You Get Customers | Sit back and watch customers find you online. We manage everything so you don't have to. |

> **CTA:** Start for Free Today →

---

### 6.6 Results & Social Proof Section

**Purpose:** Build trust with real numbers and client testimonials

**Requirements:**
- White background
- Top: 4 animated stat counters
- Middle: 3 case study cards (before/after format)
- Bottom: Testimonial carousel (auto-scroll, pausable)
- Google review screenshots or star rating widgets

**Content:**

**Stats (animated number counters):**
- 50+ Businesses Served
- 100+ Websites Built
- 4.9★ Average Rating
- 3+ Years Experience

**Case Studies (3 cards):**

*Card 1 — Restaurant*
- Business: Local restaurant in Guwahati
- Problem: No online presence, no Google listing
- Solution: Website + GBP setup + social media
- Result: 3x more walk-in customers in 60 days

*Card 2 — Retail Shop*
- Business: Clothing store
- Problem: Low footfall, no digital ads
- Solution: Meta ads + Instagram management
- Result: ₹50,000 revenue from ads in first month

*Card 3 — Service Provider*
- Business: AC repair service
- Problem: No way for customers to find them online
- Solution: Website + Google Ads
- Result: 40+ new service calls per month

**Testimonials (carousel):**
- 3–5 client quotes with name, business name, and photo/avatar
- Star rating on each

---

### 6.7 Pricing Section

**Purpose:** Give visitors a clear idea of cost and encourage them to pick a plan

**Requirements:**
- Light grey background
- Section headline + subtext
- 3 pricing cards side-by-side (stacked on mobile)
- Middle card (Growth) highlighted with a "Most Popular" badge, blue background
- Each card: plan name, price, short description, feature list, CTA button
- Disclaimer text below: "All prices are starting prices. Custom quotes available."

**Content:**

> **Section Headline:** Simple, Transparent Pricing
>
> **Subtext:** No hidden fees. No surprises. Just results.

| | Starter | Growth ⭐ | Pro |
|---|---|---|---|
| **Price** | ₹4,999/mo | ₹9,999/mo | ₹19,999/mo |
| **Best For** | New businesses | Growing businesses | Established businesses |
| Website | ✅ Basic (5 pages) | ✅ Custom (10 pages) | ✅ Advanced (unlimited) |
| Google Business Profile | ✅ Setup | ✅ Setup + Optimize | ✅ Full Management |
| Social Media | ❌ | ✅ 8 posts/month | ✅ 20 posts/month |
| Google/Meta Ads | ❌ | ✅ 1 platform | ✅ Both platforms |
| Monthly Report | ❌ | ✅ | ✅ |
| Dedicated Manager | ❌ | ❌ | ✅ |
| **CTA** | Get Started | Get Started | Get Started |

---

### 6.8 Why Locallify Section

**Purpose:** Differentiate from competitors and build emotional trust

**Requirements:**
- White background
- 2-column layout: left side text/headline, right side 4 feature boxes
- Feature boxes have icon, title, and 1-line description
- Subtle green left border accent on each box

**Content:**

> **Headline:** Why Local Businesses Choose Us

| Feature | Icon | Title | Description |
|---|---|---|---|
| 1 | 📍 | We Know Local Markets | We understand Guwahati and Northeast India. We know what works here. |
| 2 | ⚡ | Fast Delivery | No waiting for months. Most projects delivered within 7–14 days. |
| 3 | 💬 | Support in Your Language | We communicate in Assamese, Hindi, Bengali, and English. |
| 4 | 💰 | Affordable Indian Pricing | Premium quality at prices built for Indian local businesses. |

---

### 6.9 Final CTA Section

**Purpose:** Last push to convert visitors who scrolled all the way down

**Requirements:**
- Full-width section with deep blue background
- Bold white headline
- Short supporting text
- Large green CTA button
- WhatsApp icon button as alternative CTA
- Subtle background pattern (map pins or dots)

**Content:**

> **Headline:** Ready to Grow Your Business Online?
>
> **Subtext:** Join 50+ local businesses already growing with Locallify. Get a free consultation today — no commitment required.
>
> **CTA Button:** Get Free Consultation
>
> **WhatsApp CTA:** 💬 Chat on WhatsApp

---

### 6.10 Footer

**Requirements:**
- Dark blue background `#0D1F6E`
- 4-column layout on desktop, stacked on mobile
- Bottom bar with copyright

**Content:**

| Column 1 | Column 2 | Column 3 | Column 4 |
|---|---|---|---|
| Logo + tagline + short about | Quick Links | Services | Contact |
| Social media icons | Home, About, Portfolio, Pricing, Blog, Contact | Website Dev, GBP, Social Media, Ads, Mobile Apps | 📞 +91 XXXXX XXXXX |
| | | | ✉️ info@locallify.in |
| | | | 📍 Guwahati, Assam |

> **Bottom Bar:** © 2026 Locallify.in · All Rights Reserved · Made with ❤️ in Guwahati

---

## 7. Conversion & UX Requirements

### Conversion Elements
- **WhatsApp floating button** — fixed bottom-right corner, always visible, green color, slight bounce animation
- **Sticky CTA in navbar** — visible at all times on scroll
- **Exit intent popup** — triggered when user moves cursor to close tab: "Wait! Get a Free Website Audit" with email capture
- **Contact form** — Name, Phone, Business Name, Service Needed (dropdown), Message
- **Thank You page** — After form submission, redirect to /thank-you with confirmation message and WhatsApp link

### Mobile Requirements
- Fully responsive on all screen sizes (320px to 1440px+)
- Touch-friendly buttons (minimum 44px height)
- No horizontal scroll on any screen size
- Mobile nav hamburger menu
- Click-to-call phone number
- Click-to-WhatsApp button

### Performance Requirements
- Page load time: under 2.5 seconds on 4G mobile
- Google PageSpeed score: minimum 85 on mobile, 90 on desktop
- All images compressed and served as WebP
- Lazy loading on below-the-fold images
- Minified CSS and JavaScript

### Accessibility
- All images have descriptive alt text
- Color contrast ratio minimum 4.5:1
- Keyboard navigable
- ARIA labels on buttons and form fields

---

## 8. SEO Requirements

### On-Page SEO
- **Title Tag:** Locallify — Website Design & Digital Marketing in Guwahati
- **Meta Description:** Locallify helps local businesses in Guwahati grow online with websites, Google Business Profile, social media, and ads. Get a free consultation today.
- **H1:** Put Your Business on the Digital Map
- **H2s:** One per major section (must contain target keywords)
- **Schema Markup:** LocalBusiness schema on homepage
- **Sitemap:** Auto-generated XML sitemap at locallify.in/sitemap.xml
- **Robots.txt:** Properly configured

### Target Keywords
| Keyword | Priority |
|---|---|
| Website design Guwahati | High |
| Digital marketing Guwahati | High |
| Google Business Profile Guwahati | High |
| Social media management Guwahati | Medium |
| Web development Assam | Medium |
| Local SEO Guwahati | Medium |
| Google Ads Guwahati | Low |

### Blog Strategy (Post-Launch)
- 2 blog posts per month targeting local SEO keywords
- Example topics: "How to Set Up Google Business Profile in Guwahati", "5 Reasons Your Local Business Needs a Website"

---

## 9. Analytics & Tracking

| Tool | Purpose |
|---|---|
| Google Analytics 4 | Track all traffic, sessions, bounce rate, conversions |
| Google Search Console | Monitor search rankings and impressions |
| Meta Pixel | Track visitors for retargeting via Facebook/Instagram ads |
| Google Tag Manager | Manage all tracking scripts in one place |
| Hotjar (optional) | Heatmaps and session recordings to optimize conversions |

### Conversion Goals to Track
- Form submission (Contact form)
- WhatsApp button click
- Phone number click
- "Get Free Consultation" button click (all instances)
- Pricing page visits
- Time on page > 2 minutes

---

## 10. Technical Stack Recommendations

| Component | Recommendation | Reason |
|---|---|---|
| Frontend | HTML/CSS/JS or Next.js | Fast, SEO-friendly |
| CMS | WordPress or Webflow | Easy to update content |
| Hosting | Hostinger / Vercel | Affordable, fast Indian servers |
| Domain | locallify.in (GoDaddy/Namecheap) | Already decided |
| Email | Google Workspace (info@locallify.in) | Professional email |
| WhatsApp Integration | wa.me link or WATI API | Easy lead capture |
| Forms | Formspree / Netlify Forms / WPForms | Simple form handling |
| SSL | Free via Cloudflare or Let's Encrypt | HTTPS required |
| CDN | Cloudflare (free tier) | Faster load times in India |

---

## 11. Launch Checklist

### Pre-Launch
- [ ] All pages designed and developed
- [ ] Mobile responsiveness tested on 5+ devices
- [ ] All forms tested and working
- [ ] WhatsApp button working
- [ ] Google Analytics 4 installed and verified
- [ ] Meta Pixel installed
- [ ] SEO meta tags on all pages
- [ ] XML sitemap submitted to Google Search Console
- [ ] SSL certificate active (HTTPS)
- [ ] Page speed tested (PageSpeed Insights)
- [ ] All images have alt text
- [ ] 404 page designed

### Post-Launch
- [ ] Google Business Profile linked to website
- [ ] Website URL added to all social media profiles
- [ ] Announce launch on social media
- [ ] Run first Google/Meta ad campaign pointing to landing page
- [ ] Collect first 5 client testimonials and add to site
- [ ] Set up monthly reporting dashboard

---

## 12. Success Metrics (KPIs)

| Metric | Target (Month 1) | Target (Month 3) |
|---|---|---|
| Monthly Visitors | 500+ | 2,000+ |
| Leads Generated | 10+ | 30+ |
| WhatsApp Clicks | 50+ | 150+ |
| Google Ranking (primary keyword) | Top 20 | Top 5 |
| Bounce Rate | Below 60% | Below 50% |
| Average Session Duration | 1:30+ min | 2:00+ min |
| Conversion Rate | 2%+ | 4%+ |

---

## 13. Timeline

| Phase | Task | Duration |
|---|---|---|
| Phase 1 | Design (Figma wireframes + UI) | Week 1–2 |
| Phase 2 | Development (Home + Services pages) | Week 3–4 |
| Phase 3 | Content writing + SEO setup | Week 4–5 |
| Phase 4 | Testing + QA + Bug fixing | Week 5–6 |
| Phase 5 | Launch + Announce | Week 6 |
| Phase 6 | Post-launch optimization | Ongoing |

---

## 14. Out of Scope (v1.0)

- Client login portal or dashboard
- Payment gateway / online booking system
- Live chat widget (other than WhatsApp)
- Multi-language version (Assamese/Hindi) — to be considered for v2.0
- Mobile app for Locallify business

---

*Document Version: 1.0 | Prepared for Locallify | locallify.in*