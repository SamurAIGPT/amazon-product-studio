# 📦 Amazon Product Studio — Premium AI Product Photo & Ad Creative Generator SaaS

> **A beautifully designed, premium dark-themed AI Product Background Generator.** Built with Next.js (App Router), this application is a production-ready SaaS boilerplate that replaces expensive product photography shoots with high-converting AI generated scenes. Upload your Amazon product photo, choose a preset scene template or write a custom description, specify your aspect ratio, and download professional studio-grade product mockups in seconds.

## 🌐 Project Details

**GitHub Repository:** [github.com/SamurAIGPT/amazon-product-studio](https://github.com/SamurAIGPT/amazon-product-studio)

**Live Demo Preview:** [amazon-product-studio.vercel.app](https://amazon-product-studio.vercel.app/)

---

Amazon Product Studio is a fully optimized, credits-based SaaS application built for modern e-commerce sellers. It seamlessly handles User Authentication, Credits & Billing, Image Persistence, and asynchronous AI generation using a sleek Next.js (App Router) structure. It is designed to allow sellers and agencies to quickly test multiple background settings for their products without needing manual editing or photoshoots.

**Why use Amazon Product Studio?**

- **Production-Ready SaaS** — Complete with Google OAuth and Stripe Checkout workflows built-in.
- **Sleek Custom Dropdowns** — Upward-opening aspect ratio and preset selectors prevent clipping and scroll-chaining on all viewport screens.
- **Self-Healing AI Polling & Webhooks** — Uses MuAPI predictions API with fallback status checking during fetches (`GET /api/creations`), ensuring local development works without external tunnels.
- **Personal Creation History** — Keep track of previous creatives in the inline dashboard gallery or the dedicated `/gallery` route.
- **Responsive Screen-Fitting** — Designed with a fluid layout that fits perfectly on all screens (mobile, tablet, desktop) using stacked adaptive grids on mobile and viewport-locked scrolling on desktop.

![Amazon Product Studio Screenshot](https://cdn.muapi.ai/data/2/327865410974/Screenshot_2026-05-26_132418.png)

---

## ✨ Core Features

### 🎨 Product Scene Studio (Main Page `/`)
- Upload up to 14 product reference photos via file picker or drag-and-drop. Real-time preview grid shown instantly.
- Custom dropdown for **Preset Scene Templates**:
  - **Minimalist Marble**: Elegant white block with natural daylight
  - **Luxury Spotlight**: Moody highlight with dark reflection
  - **Rustic Wood**: Cozy home table with window light
  - **Granite Countertop**: Modern granite kitchen surface
  - **Sunny Beach**: Warm golden sand & blurred ocean
  - **Forest Moss**: Organic stone in green woods
  - **Modern Office**: Corporate office workspace desk
- Custom descriptive Prompt Input with a **Reset** button to restore the smart default prompt instructions.
- Custom dropdown for **Aspect Ratio**: `1:1`, `4:3`, `3:4`, `16:9`, `9:16`.
- Cost: **18 credits** per generation.
- Real-time status displays (`processing` / `completed` / `failed`) with an inline fallback polling loop.
- Floating original inputs context bubble overlay on the output image for reference.
- User history gallery at the bottom with real-time status auto-refreshing.

### 🖼️ Creative Gallery (`/gallery`)
- Dedicated `/gallery` route displaying all user's generated listing images.
- Cards show a thumbnail, aspect ratio, prompt summary, creation date, and status (`processing` / `completed` / `failed`).
- Full-screen viewer modal showing a larger preview, aspect ratio, prompt description, creation date, and high-speed HD download.
- Auto-polls for pending creations in the database.

### 💳 Stripe Credit Billing (`/pricing`)
- Four credit packages based on a **$1 = 200 credits** conversion rate:
  - **Basic Pack** ($5 / 1,000 credits)
  - **Standard Pack** ($10 / 2,000 credits)
  - **Professional Pack** ($20 / 4,000 credits — Most Popular)
  - **Business Pack** ($50 / 10,000 credits)
- No recurring subscriptions — pay once, use at your own pace.
- Credit balance is automatically topped up via Stripe webhook on checkout completion.

### 🔐 Google Auth + Credit Persistence
- NextAuth Google provider with Prisma adapter — user sessions, credit balances, and galleries are all persisted per account.
- Credits displayed live in the Navbar with a pulsing coin icon.

---

## ⚡ Deployment: Vercel & Production

This architecture is engineered explicitly for **Vercel** serverless environments.

### One-Click Deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/SamurAIGPT/amazon-product-studio)

**Live App:** [amazon-product-studio.vercel.app](https://amazon-product-studio.vercel.app/)

### 🔑 Required Environment Variables

To successfully deploy and run, you must populate the following environment variables in your Vercel project settings:

| Service | Variable | Description & Source |
| :--- | :--- | :--- |
| **Database** | `DATABASE_URL` | PostgreSQL connection string ([Supabase](https://supabase.com) or [Neon](https://neon.tech)) |
| **NextAuth / Google** | `NEXTAUTH_SECRET` | Secure random string generated via `openssl rand -base64 32` |
| | `NEXTAUTH_URL` | Your production domain (e.g. `https://my-app.vercel.app`) |
| | `WEBHOOK_URL` | Public URL for MuAPI async callbacks (same as `NEXTAUTH_URL` in production) |
| | `GOOGLE_CLIENT_ID` | Get from [Google Cloud Console](https://console.cloud.google.com/apis/credentials) |
| | `GOOGLE_CLIENT_SECRET` | Get from [Google Cloud Console](https://console.cloud.google.com/apis/credentials) |
| **Stripe Billing** | `STRIPE_SECRET_KEY` | Get from [Stripe Dashboard](https://dashboard.stripe.com/apikeys) |
| | `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | Get from [Stripe Dashboard](https://dashboard.stripe.com/apikeys) |
| | `STRIPE_WEBHOOK_SECRET` | Webhook secret for resolving credit purchases |
| **AI Generation** | `MUAPIAPP_API_KEY` | Create an account and get key from [muapi.ai/access-keys](https://muapi.ai/access-keys) |

### 🚀 Launching on Vercel: Step-by-Step

1. **Database Provisioning**: Create a new Postgres database (via Supabase or Neon). Retrieve the connection string (`DATABASE_URL`).
2. **Project Creation**: Import your GitHub fork into the Vercel dashboard.
3. **Configure Environment Variables**: Copy the variables above into the Vercel project settings environment tab.
4. **Deploy**: Hit "Deploy". Vercel will automatically run the build steps (`npm run build`).
5. **Database Push**: Run `npx prisma db push` to synchronize database models before launching.
6. **Integrations Setup**:
   - Establish a **Google Cloud OAuth app**, enabling the callback URL: `https://your-app.vercel.app/api/auth/callback/google`
   - Setup a **Stripe Webhook**, pointing to `https://your-app.vercel.app/api/stripe/webhook` and selecting the `checkout.session.completed` event.
   - Register a **MuAPI Webhook** pointing to `https://your-app.vercel.app/api/webhook/muapi` to receive async generation results.

---

## 🛠️ Local Development

Ready to iterate locally? Setup is straightforward.

### Prerequisites

- [Node.js](https://nodejs.org/en/) (v18 or higher)
- A local PostgreSQL instance or a free cloud Database URL.
- [ngrok](https://ngrok.com) (optional, for local MuAPI webhook testing)

### Setup

```bash
# 1. Clone the repository
git clone https://github.com/SamurAIGPT/amazon-product-studio
cd amazon-product-studio

# 2. Install dependencies
npm install

# 3. Setup Environment
cp .env.example .env
# Open .env and insert your specific keys.

# 4. Initialize Database Schema
# Note: Because the database is shared, see the Safety Warning below!
npx prisma generate
npx prisma db push

# 5. Start the Development Server
npm run dev
```

The console should now be active on `http://localhost:3000`.

> **Webhook Tip:** For local MuAPI webhook testing, run `ngrok http 3000` and set `WEBHOOK_URL` to the generated HTTPS URL in your `.env`.

---

## ⚠️ Database Safety Warning (Shared Pool)

The workspace database is shared with other applications. Running `npx prisma db push` on a clean, empty schema will drop tables belonging to other applications. Always follow the **Pull-Declare-Push-Cleanup** sequence detailed in the [SaaS Application Blueprint Guide](../blueprint.md):

1. Run `npx prisma db pull` to fetch all database tables.
2. Declare your `Creation` table and update the relations on the `User` model.
3. Run `npx prisma db push` to add your changes safely.
4. Clean up `schema.prisma` to keep only NextAuth models, `Creation`, and the updated `User` relations.
5. Run `npx prisma generate` to rebuild the type-safe client.

---

## 🏗️ Technical Architecture

```
amazon-product-studio/
├── prisma/
│   └── schema.prisma           # Postgres schema (User, Account, Session, Creation)
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── page.js             # Main Studio Workspace (Uploads, Aspect Ratio, Prompt)
│   │   ├── gallery/            # Dedicated gallery grid with details modal & polling
│   │   ├── pricing/            # 4-Plan credit pricing grid ($1 = 200 credits)
│   │   └── api/
│   │       ├── auth/           # NextAuth handler
│   │       ├── upload/         # MuAPI file upload proxy
│   │       ├── creations/      # GET / POST creations and sync logic (per user)
│   │       ├── download/       # Image downloading bypass endpoint
│   │       ├── webhooks/
│   │       │   └── ai/         # MuAPI webhook endpoint
│   │       └── stripe/         # Stripe checkout creation + checkout webhook
│   ├── components/
│   │   ├── Providers.js        # NextAuth SessionProvider wrapper
│   │   └── saas/
│   │       ├── Navbar.jsx      # Sticky header with Vercel Deploy button & credit balance
│   │       └── CreditBadge.jsx # Credit badge display
│   └── lib/
│       ├── auth.js             # NextAuth config with Prisma adapter
│       ├── config.js           # Central config mapping Google, Stripe, MuAPI keys
│       ├── prisma.js           # Cached Prisma client singleton
│       ├── stripe.js           # Stripe instance initializer
│       └── services/
│           ├── user.js         # Credit management service (18 credits per run)
│           └── billing.js      # Stripe checkout and payment webhook parser
└── next.config.mjs             # Next.js configuration
```

---

## 📄 License

MIT Licensed.

---

_Amazon Product Studio: A premium, high-contrast, fully responsive product scene creator built for modern e-commerce sellers and marketing teams._
