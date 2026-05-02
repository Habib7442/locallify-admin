# LOCALLIFY — Final Product Requirements Document
**Version:** 2.0 — Final MVP  
**Author:** Habib / Locallify  
**Date:** April 2026  
**Status:** Ready To Build  

---

## 1. One Line Summary

> **Locallify is a monthly subscription platform that gives Indian local businesses a complete digital presence — a branded page, WhatsApp lead system, UPI payments, QR code, Google Review system, printable business card, and AI social media creatives — all managed through WhatsApp, with zero tech knowledge required.**

---

## 2. The Problem

Small local businesses in India — restaurants, salons, shops, clinics, coaching centres — are invisible online.

When a customer searches "salon near me" or "restaurant in Silchar" on Google, these businesses do not appear. Not because they are bad. Because they have no digital presence.

### Why Existing Solutions Fail Them

| Solution | Why It Fails |
|---|---|
| Full website | Too expensive (₹15,000+), too complex to manage |
| Linktree | Built for global creators, no UPI, no WhatsApp, no Indian languages |
| Justdial | They own your customer, you get nothing |
| Google Business Profile | Hard to set up, no design, no store features |
| Stan Store | Built for global creators, priced in dollars |
| CONNECTit / review tools | Only solve one problem, not full presence |

### The Real Gap

Nobody has built a simple, affordable, WhatsApp-first complete digital presence product specifically for small Indian businesses — priced in rupees, delivered in their language, requiring zero tech knowledge.

---

## 3. The Solution — Locallify Pages

A hosted business profile at `locallify.in/businessname` that gives every local Indian business:

- A beautiful mobile-first page they can share anywhere
- WhatsApp-first lead delivery — no dashboards, no logins
- UPI payment collection from their page
- Google Review QR code for their counter
- Print-ready visiting card with QR code
- 4 AI-generated branded social media posts every month

Everything delivered through WhatsApp. Everything in their language. Everything for ₹999/month.

---

## 4. Target Users

### Primary — Local Business Owner
- Restaurants, dhabas, salons, beauty parlours, coaching institutes, clinics, retail shops, sweet shops, property dealers, service providers
- Location: Silchar, Guwahati, and Tier 2/3 cities across Assam and NE India — expanding to all India
- Age: 25–55
- Tech comfort: Low — comfortable with WhatsApp and Instagram only
- Language: Assamese, Bengali, Hindi, or English
- Budget: ₹500–₹1,500/month comfortable range

### Secondary — Locallify Team (Internal)
- Habib and team who onboard, build, and manage pages
- Need a fast, templated workflow to deliver pages within 24 hours of payment

### End User — Business Customer (Visitor)
- Person who receives a Locallify page link via WhatsApp, Instagram bio, or QR scan
- Needs to find contact info, location, hours, and reach the business instantly
- Must work perfectly on a mobile phone

---

## 5. Pricing — Paid Only From Day 1

No free plan. No trial. No exceptions.

| | First Month | Month 2 Onwards |
|---|---|---|
| **Price** | ₹499 | ₹999/month |
| **Why** | Low barrier to start | Full recurring revenue |

### Psychological Logic
- ₹499 removes hesitation — easy to say yes
- After one month they have QR codes printed, cards distributed, page live
- Cancelling costs them more than ₹999 — so they stay
- ₹999/month feels justified once they see value

### Payment Collection
- Month 1: Send UPI ID or Razorpay link on WhatsApp — client pays — page live in 24 hours
- Month 2+: WhatsApp reminder on day 25 — client pays — subscription continues
- Non-payment: Page goes offline on day 7 — data preserved — reactivates on payment

### If Page Goes Offline
```
Page shows: "This business is currently inactive.
Contact them directly or visit locallify.in"
```
Their printed QR codes still point to this URL — creating urgency to reactivate.

---

## 6. Core Features — MVP Only

These 7 features and nothing else until 50+ paying clients.

---

### Feature 1 — Business Profile Page

**What:** A beautiful mobile-first business page at `locallify.in/businessname`

**Includes:**
- Business name, logo, cover photo
- Category tag (Restaurant / Salon / Shop / Coaching / Clinic / etc.)
- Short bio — max 150 characters
- Business hours with live Open Now / Closed badge (IST timezone)
- Google Maps embed with Get Directions button
- Social media links (Instagram, Facebook, YouTube)
- "Powered by Locallify" footer — subtle branding

**Design:** Cinematic, premium, dark-navy aesthetic — NOT generic Linktree cards. Every page must look designed, not auto-generated.

**URL Structure:**
```
locallify.in/sharma-restaurant-silchar
locallify.in/trendy-salon-guwahati
locallify.in/icon-coaching-silchar
```

---

### Feature 2 — WhatsApp Contact Button

**What:** One-tap WhatsApp button — most prominent element on the page

**How it works:**
- Large green WhatsApp button above the fold on every page
- Pre-filled message: "Hi! I found you on Locallify 👋"
- Opens WhatsApp directly — no app install needed
- Tracks click count (shown in owner dashboard later)

**Cost:** ₹0 — uses wa.me link, no API needed

---

### Feature 3 — Lead Capture Form → WhatsApp Delivery

**What:** Simple enquiry form that delivers leads instantly to owner's WhatsApp

**Form fields:**
```
Name: [____________]
Phone: [____________]
Message: [____________]
[Send on WhatsApp →]
```

**How it works:**
1. Customer fills 3 fields
2. Clicks Send on WhatsApp
3. WhatsApp opens on customer's phone — pre-filled with formatted message
4. Customer taps Send
5. Owner receives on their WhatsApp instantly

**Message format owner receives:**
```
🔔 New Lead — Locallify
━━━━━━━━━━━━━━━
👤 Name: Rahul Kumar
📞 Phone: 9876543210
💬 Message: Table for 2 tonight at 8pm
🔗 Page: locallify.in/sharma-restaurant
🕐 Time: 23 Apr 2026, 7:30 PM IST
━━━━━━━━━━━━━━━
Reply to connect with your lead.
```

**Technical implementation:**
```javascript
const waMessage = `New Lead from Locallify
Name: ${name}
Phone: ${phone}  
Message: ${message}`

const waLink = `https://wa.me/91${ownerNumber}
?text=${encodeURIComponent(waMessage)}`

window.open(waLink)
```

**Cost:** ₹0 — pure frontend, no backend, no API

---

### Feature 4 — UPI Payment Button (Phase 2 — Coming Soon)

**What:** One-tap UPI payment from the Locallify page

**Status:** Not in MVP. To be added once 20+ clients are onboarded.

**How it will work:**
- Owner adds their UPI ID later
- "Pay Us" button appears on their page
- Customer taps — phone opens GPay / PhonePe / Paytm automatically
- Customer enters amount and pays
- Owner gets UPI notification on their phone

---

### Feature 5 — Google Review QR Code

**What:** A branded QR code that opens directly to the business's Google review page

**How it works:**
- Owner provides their Google Business Profile link during onboarding
- Locallify generates a branded QR code
- Delivered as print-ready PNG (300 DPI) on WhatsApp
- Owner prints and places at counter, table, reception

**The QR code design:**
```
[Locallify branded QR code]
⭐ Scan to Review Us on Google
[Business Name]
locallify.in
```

**Why this works:**
- Customer scans at emotional peak — right after the experience
- Opens Google review page directly — no searching
- Zero friction = more reviews
- More reviews = higher Google Maps ranking = free organic customers

**Cost:** ₹0 — free QR generation API

---

### Feature 6 — Printable Business Card

**What:** A professional print-ready visiting card generated from their Locallify profile

**Card contains:**

Front:
```
[Business Logo]
[Business Name]
[Tagline / Category]
Powered by Locallify (subtle footer)
```

Back:
```
[Owner Name]
📞 [Phone]
💬 [WhatsApp]
✉️ [Email]
📍 [Address]
🌐 locallify.in/theirbusiness
[QR Code — links to Locallify page]
```

**Specifications:**
- Size: 3.5 × 2 inches (standard visiting card)
- Resolution: 300 DPI — print ready
- Format: PDF download
- Delivered on WhatsApp within 24 hours of onboarding

**MVP workflow:**
- Client pays → fills onboarding form → you create card in Canva using pre-made template → send PDF on WhatsApp
- No automation needed for first 20 clients — manual is fine

**Why this is powerful:**
- Every printed card = Locallify URL visible to 50+ people
- QR on card links to full digital profile — 100x better than a phone number card
- Business owner gets ₹2,000 worth of design work included

---

### Feature 7 — 4 AI Social Media Creatives Per Month

**What:** 4 branded, ready-to-post Instagram/Facebook post images delivered every month

**What they get:**
- 4 posts sized 1080×1080px (feed) or 1080×1920px (story/reel cover)
- Their logo, business name, brand colors
- Relevant content: offers, product highlights, festive posts, tips
- Delivered as images on WhatsApp — ready to post directly

**Workflow:**
- Day 1 of each month: WhatsApp client asking for that month's content theme
- You generate using AI tools (your existing workflow)
- Deliver within 48 hours
- Client downloads from WhatsApp and posts

**Why this retains clients:**
- Designers charge ₹500–₹2,000 per post
- 4 posts = ₹2,000–₹8,000 value
- They get it included in ₹999 — they never cancel

**Cost:** 2–3 hours of your time per client per month using existing AI tools

---

## 7. What Is NOT In MVP

Do not build these until you have 50+ paying clients and real user feedback:

- ❌ Self-serve signup (manual onboarding for now)
- ❌ Client dashboard / analytics
- ❌ Multilingual toggle
- ❌ Festive mode auto-scheduling
- ❌ Booking / appointment system
- ❌ Digital product store
- ❌ Brand collaboration marketplace
- ❌ Influencer features
- ❌ Locallify Score
- ❌ Google Reviews showcase wall
- ❌ WhatsApp API integration
- ❌ Mobile app
- ❌ Today's Special self-serve update
- ❌ Competitor report

---

## 8. Technical Stack — Zero Budget

| Need | Tool | Cost |
|---|---|---|
| Page hosting | Vercel | ₹0 |
| Database | Appwrite (Current) | ₹0 |
| Domain | locallify.in (already owned) | ₹0 |
| Lead form | WhatsApp wa.me link — pure JS | ₹0 |
| UPI button | UPI deep link | ₹0 |
| QR code generation | qrcode.js library | ₹0 |
| Business card | Canva manual template | ₹0 |
| AI creatives | Existing AI workflow | ₹0 |
| Payment collection | Razorpay payment link / UPI | 2% per transaction |
| Client communication | WhatsApp Business app | ₹0 |

**Total monthly infrastructure cost: ₹0**

---

## 9. Build Order — Week By Week

### Week 1 — Build One Perfect Page
```
→ Build one complete Locallify page template in Next.js
→ All 7 features working on a single template
→ Test on mobile — must be perfect on phone
→ Create demo page: locallify.in/demo
→ Create your own agency page: locallify.in/locallify
```

### Week 2 — Get First 3 Clients
```
→ Walk into 3 local businesses in Silchar
→ Show demo page on their phone
→ Collect ₹499 on UPI on the spot
→ Take their details (name, phone, logo, photos, hours, UPI ID)
→ Build their page within 24 hours
→ Send page link + business card + QR code on WhatsApp
```

### Week 3 — WhatsApp Outreach
```
→ Message 30 business owners you know personally
→ Send demo link + pricing
→ Goal: 5 more paying clients
→ Total: 8 clients, ₹3,992 revenue
```

### Week 4 — Instagram Content
```
→ Post before/after carousels (already have prompts)
→ Post Shark Tank India clip with caption (already written)
→ Post the anime motorcycle brand film
→ Goal: 2 more inbound clients from Instagram
→ Total: 10 clients
```

### Month 2
```
→ 10 existing clients pay ₹999 = ₹9,990
→ Acquire 10 more new clients at ₹499 = ₹4,990
→ Total month 2 revenue: ₹14,980
→ Start building simple admin panel for managing pages
```

### Month 3
```
→ 20 existing × ₹999 = ₹19,980
→ 10 new × ₹499 = ₹4,990
→ Total: ₹24,970/month
→ Hire one assistant to help with AI creatives
→ Build self-serve onboarding form
```

### Month 6 Target
```
→ 50 clients × ₹999 = ₹49,950/month recurring
→ Build client dashboard with basic analytics
→ Add multilingual support
→ Add festive mode
→ Expand to Guwahati aggressively
```

### Month 12 Target
```
→ 100 clients × ₹999 = ₹99,900/month
→ Full self-serve platform
→ Expand to all of NE India
→ Consider influencer tier
```

---

## 10. Onboarding Checklist — After Client Pays

Every new client goes through this exact process:

```
Step 1 — Collect Information (WhatsApp form or call)
□ Business name
□ Business category
□ Owner name
□ Phone number
□ WhatsApp number
□ Email address
□ Full address
□ Business hours (each day)
□ Instagram handle (Optional)
□ Facebook page link (Optional)
□ Google Business Profile link (Optional)
□ Logo file (PNG with transparent background)
□ Cover photo (best quality available)
□ 3–5 product/business photos
□ Short bio (you write this for them if needed)
□ Preferred URL slug (locallify.in/their-choice)

Step 2 — Build Page (2–3 hours)
□ Set up page on template
□ Add all info and photos
□ Test WhatsApp lead button
□ Test UPI button
□ Test Google Maps
□ Test on mobile — must look perfect
□ Test Open/Closed badge timing

Step 3 — Generate Assets (1 hour)
□ Generate Google Review QR code
□ Design visiting card in Canva template
□ Export card as PDF (300 DPI)
□ Generate page QR code

Step 4 — Deliver On WhatsApp
□ Send page link: locallify.in/theirbusiness
□ Send Google Review QR code PNG
□ Send visiting card PDF
□ Send instructions on how to use everything
□ Schedule month 1 AI creatives (within 48 hours)

Step 5 — First Month AI Creatives
□ WhatsApp client: "Kaunsa content chahiye is mahine?"
□ Generate 4 branded posts using AI
□ Send on WhatsApp as images
□ Done
```

---

## 11. Client Retention System

### Monthly Rhythm Per Client
```
Day 1    → WhatsApp: "Content theme for this month?"
Day 3    → Deliver 4 AI creatives on WhatsApp
Day 25   → WhatsApp renewal reminder + payment link
Day 28   → Follow up if not paid
Day 30   → Page goes offline if not paid (reactivates on payment)
```

### Why They Won't Cancel
```
1. QR codes already printed at counter — cancelling breaks their QR
2. Visiting cards already distributed — URL goes dead
3. Monthly AI creatives coming — they need content
4. WhatsApp leads flowing — they don't want to miss enquiries
5. Google Review QR working — reviews stop if page goes offline
```

---

## 12. Revenue Projections

| Month | Existing Clients | New Clients | Total Revenue |
|---|---|---|---|
| Month 1 | 0 | 10 × ₹499 | ₹4,990 |
| Month 2 | 10 × ₹999 | 10 × ₹499 | ₹14,980 |
| Month 3 | 20 × ₹999 | 10 × ₹499 | ₹24,970 |
| Month 6 | 50 × ₹999 | 10 × ₹499 | ₹54,940 |
| Month 12 | 100 × ₹999 | 10 × ₹499 | ₹99,900+ |

---

## 13. Competitive Advantage

| Feature | Linktree | Justdial | CONNECTit | Locallify |
|---|---|---|---|---|
| Business profile page | ✅ | ❌ | ❌ | ✅ |
| WhatsApp lead delivery | ❌ | ❌ | ❌ | ✅ |
| UPI payment button | ❌ | ❌ | ❌ | ✅ |
| Google Review QR | ❌ | ❌ | ✅ | ✅ |
| Printable business card | ❌ | ❌ | ❌ | ✅ |
| AI social media creatives | ❌ | ❌ | ✅ | ✅ |
| ₹ pricing India-first | ❌ | ✅ | ✅ | ✅ |
| WhatsApp-first delivery | ❌ | ❌ | ❌ | ✅ |
| Done-for-you service | ❌ | ❌ | ❌ | ✅ |
| NE India local knowledge | ❌ | ❌ | ❌ | ✅ |

**Locallify wins on combination — no single competitor offers all of these together.**

---

## 14. Honest Risks

| Risk | Likelihood | Mitigation |
|---|---|---|
| Client says no customer came — wants refund | High | Clear terms: we promise visibility not customers. Written in onboarding. |
| Client stops paying after month 1 | Medium | Page goes offline — their QR and card stop working — creates urgency to renew |
| Manual workflow doesn't scale past 20 clients | High | Build admin panel by month 3 before it becomes a problem |
| AI creative quality not good enough | Low | You already have proven AI workflow from Mr. Haddi and other projects |
| Competitor copies the idea | Low near-term | First mover advantage + local relationships + done-for-you layer they can't replicate |

---

## 15. Terms Of Service — Key Clause

Must be communicated clearly to every client before payment:

> *"Locallify provides digital visibility services. We make your business visible online — on Google, Instagram, and WhatsApp. We do NOT guarantee customers, sales, revenue, footfall, leads, or any specific business outcome. Results depend on your business quality, location, pricing, and factors outside our control. We promise visibility. What you do with that visibility is your business."*

---

## 16. The One Sentence Pitch

For every sales conversation — WhatsApp message, in-person meeting, Instagram DM:

> **"Locallify pe aapka business Google, Instagram aur WhatsApp pe visible ho jayega — sirf ₹499 pehle mahine mein. 24 ghante mein live."**

Or in English:

> **"Get your business on Google, Instagram and WhatsApp — for ₹499 your first month. Live in 24 hours."**

---

*Document finalised for Locallify MVP build — April 2026.*  
*Next review: When 20 paying clients are onboarded.*  
*Do not add new features before reaching 20 clients.*