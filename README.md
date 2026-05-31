# Cakap.AI — AI-Powered Interview & Presentation Coach

> **Built for Google JuaraVibeCoding 2026**

Cakap.AI is an intelligent mock interview simulator powered by the **Google Gemini API**. Paste a Job Description, choose your language and interviewer style, and get a fully interactive AI-driven interview session — followed by a structured **S.T.A.R. evaluation report** with a Readiness Score.

**Core Philosophy:** _"Simple Input, Complex AI Processing, Valuable Output."_

---

## ✨ Features

### 🏠 Landing Page (`/`)

- Bilingual marketing page (**EN / ID**) with live language toggle
- Hero section with animated mockup, CTA card with Job Description input
- **"How It Works"** 3-step explainer (Input JD → AI Simulation → S.T.A.R Feedback)
- **FAQ** section with accordion UI
- Responsive public navbar with mobile sheet menu

### 🔐 Authentication

- Google OAuth via **NextAuth.js** (Auth.js)
- Secure session handling with PostgreSQL persistence via Prisma

### 🎛️ Home Dashboard (`/home`)

- Authenticated setup form for starting a new interview session
- Configurable fields:
  - **Target Role** — the position being applied for
  - **Job Description / Topic** — paste any JD or presentation brief
  - **Language** — English or Indonesian
  - **Interview Style** — Strict HR / Technical / Casual
- Persisted session metadata stored to PostgreSQL before simulation begins
- Input validation with AI Bouncer (rejects gibberish before hitting Gemini)

### 🤖 Simulation Room (`/simulation`)

- Immersive full-screen interview environment (no navbar)
- Real-time **AI interviewer** powered by Gemini API
- **Dual input modes:**
  - 🎙️ **Voice (Web Speech API)** — smart mic toggle with `MicOff` icon when active, animated pulse indicator, `no-speech` / `aborted` error suppression
  - ⌨️ **Keyboard** — manual text input with submit
- **TTS (Text-to-Speech)** reads each AI question aloud; auto-cancelled on page unmount
- **Persistent session timer** (survives F5 refresh via `sessionStorage`)
- Real-time question counter
- **Retry** failed AI calls without losing context
- **"End Session Early"** with confirmation dialog
- Session state managed via `sessionId` URL param + API route

### 📊 Results & Evaluation (`/results/[id]`)

- Full **S.T.A.R. evaluation report** for the completed session
- **Overall Readiness Score** (0–100) with color-coded feedback ring
- **Key Strengths** and **Areas to Improve** summary
- **Question-by-Question Analysis:**
  - Per-answer score
  - AI Feedback
  - AI-rewritten "Optimized Response" suggestion
- Graceful fallback guard: if Gemini returns an unexpected schema at session end, the app retries evaluation rather than crashing

### 📋 Interview History (`/history`)

- Paginated list of all past interview sessions
- Filterable by time range: Last 7 Days / Last 30 Days / All Time
- Searchable by role
- Direct link to each session's result report

### 💼 Job Board (`/jobs`)

- Curated job listings with bilingual role titles and descriptions
- **"Practice This Interview"** button pre-fills the Home Dashboard with the job's role and JD
- 6 pre-loaded listings across roles: Frontend Developer, IoT Architect, Network Engineer, Go Backend Developer, Data Scientist, UX/UI Designer

### 🌐 Features Page (`/features`)

- Detailed feature cards (S.T.A.R Evaluation, Dynamic Personas, History Tracking, Bilingual Support)
- Comparison table: Cakap.AI vs generic alternatives
- Animated hero image with Framer Motion float effect

### 🔔 Notifications (Private Navbar)

- Popover notification tray (Shadcn Popover)
- Static system notifications with unread indicator dot
- "Mark as read" on open

---

## 🌏 Internationalization (i18n)

Full bilingual support across all public pages:

| Language      | Key  |
| ------------- | ---- |
| 🇺🇸 English    | `en` |
| 🇮🇩 Indonesian | `id` |

- Language preference persisted in `localStorage`
- All components consume `useLanguage()` context hook for reactive re-renders
- Industry terms (e.g., "Job Desc", "Feedback", "Frontend Developer") preserved in Indonesian locale for natural startup tone

---

## 🛠️ Tech Stack

| Category           | Technology                           |
| ------------------ | ------------------------------------ |
| **Framework**      | Next.js 16.2.6 (App Router)          |
| **Language**       | TypeScript 5                         |
| **Styling**        | Tailwind CSS v4                      |
| **UI Components**  | shadcn/ui + Radix UI primitives      |
| **Icons**          | Lucide React                         |
| **Animations**     | Framer Motion v12                    |
| **Authentication** | NextAuth.js (Auth.js) — Google OAuth |
| **Database**       | PostgreSQL via Prisma ORM            |
| **AI Service**     | Google Gemini API (`@google/genai`)  |
| **Smooth Scroll**  | Lenis                                |
| **Toasts**         | Sonner                               |
| **Forms**          | React Hook Form + Zod                |

---

## 🏗️ Architecture

```
cakap-ai/
├── app/                        # Next.js App Router
│   ├── page.tsx                # Landing page (public)
│   ├── features/page.tsx       # Features comparison page
│   ├── jobs/page.tsx           # Job Board
│   ├── login/page.tsx          # Auth page
│   ├── home/page.tsx           # Authenticated setup dashboard
│   ├── simulation/page.tsx     # Immersive AI interview room
│   ├── results/[id]/page.tsx   # S.T.A.R. evaluation report
│   ├── history/page.tsx        # Session history
│   └── api/
│       ├── interview/route.ts  # Gemini API bridge (AI logic)
│       ├── session/route.ts    # Session CRUD
│       └── auth/[...nextauth]/ # NextAuth handler
├── components/                 # Reusable UI components
│   ├── public-navbar.tsx
│   ├── private-navbar.tsx
│   ├── hero-card.tsx
│   ├── features-grid.tsx
│   ├── landing-faq.tsx
│   ├── footer.tsx
│   ├── language-provider.tsx   # i18n context
│   ├── language-toggle.tsx
│   └── theme-toggle.tsx
├── locales/
│   ├── en.ts                   # English translations
│   └── id.ts                   # Indonesian translations
├── prisma/
│   └── schema.prisma           # DB schema (User, Session, Evaluation)
└── types/                      # TypeScript interfaces
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js 20+
- PostgreSQL database
- Google Gemini API key
- Google OAuth credentials (for NextAuth)

### 1. Clone & Install

```bash
git clone https://github.com/manhildwinarno/cakap.ai.git
cd cakap-ai
npm install
```

### 2. Configure Environment Variables

Create a `.env` file in the project root:

```env
# Database
DATABASE_URL="postgresql://user:password@host:5432/cakapai"
DIRECT_URL="postgresql://user:password@host:5432/cakapai"

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-nextauth-secret"

# Google OAuth
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"

# Gemini API
GEMINI_API_KEY="your-gemini-api-key"
```

### 3. Set Up Database

```bash
npx prisma migrate dev
npx prisma generate
```

### 4. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🧠 AI System Design

### Session Flow

1. User submits a Role + Job Description → stored as a session record in PostgreSQL
2. `POST /api/interview` is called on each user answer
3. The API Route sends the full chat history + JD context to Gemini
4. Gemini returns a **turn JSON** (score, feedback, next question) or a **final evaluation JSON** (overall score, strengths, per-question analysis)

### AI Bouncer (Input Validation)

Before any Gemini call, the system prompt enforces a two-phase check:

- **STEP 1 — Validation:** Rejects obvious gibberish, keyboard mashes, or irrelevant inputs (e.g., food recipes in a software JD field)
- **STEP 2 — Generation:** Only proceeds to question generation if the input passes context validation

### Rate Limit Handling

- The API route cycles through multiple Gemini model variants on `429 RESOURCE_EXHAUSTED`
- Frontend displays a graceful `"System Busy"` alert with a **Retry** button instead of crashing

---

## 🎨 Design System

- **Primary Accent:** Deep Teal `#0F766E`
- **Background:** Off-White `#F8FAFC`
- **Primary Text:** Dark Slate `#0F172A`
- **Font:** Inter (Google Fonts)
- **Dark Mode:** Full support via `next-themes`
- **Shapes:** 8px buttons/inputs, 16px cards, pill badges
- **Shadows:** Soft ambient (`shadow-md`) — no harsh borders

---

## 📄 License

This project is developed for **Google JuaraVibeCoding 2026**.

---

<p align="center">
  Built with ❤️ using Next.js + Google Gemini API
</p>
