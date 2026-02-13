# EduPlan360

A production-ready education consultancy platform built with Next.js, TypeScript, and modern web technologies.

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **Components**: shadcn/ui
- **Forms**: React Hook Form + Zod validation
- **Animations**: Framer Motion
- **Icons**: lucide-react
- **Database**: Supabase
- **Auth**: NextAuth.js v5
- **CMS**: Sanity (for content management)
- **Email**: Resend
- **Analytics**: Google Analytics 4 + PostHog

## Project Structure

```
eduplan/
├── src/
│   ├── app/                    # Next.js App Router pages
│   ├── components/
│   │   ├── ui/                # shadcn/ui components
│   │   ├── layout/            # Header, Footer, Navigation
│   │   └── forms/             # Form components
│   ├── lib/
│   │   ├── supabase/          # Database clients
│   │   ├── sanity/            # CMS configuration
│   │   ├── auth/              # Authentication config
│   │   └── utils.ts           # Utility functions
│   └── types/                 # TypeScript type definitions
├── public/                     # Static assets
└── supabase-schema.sql        # Database schema
```

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- Supabase account
- Sanity account
- Resend account (for emails)

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Copy environment variables:
   ```bash
   cp .env.local.example .env.local
   ```

4. Fill in your environment variables in `.env.local`

5. Set up Supabase database:
   - Create a new Supabase project
   - Run the SQL schema from `supabase-schema.sql`
   - Copy your project URL and anon key to `.env.local`

6. Run the development server:
   ```bash
   npm run dev
   ```

7. Open [http://localhost:3000](http://localhost:3000)

## Environment Variables

See `.env.local.example` for all required environment variables.

Key services to configure:
- **Supabase**: Database and storage
- **NextAuth**: Authentication
- **Sanity**: Content management
- **Resend**: Email notifications
- **Analytics**: GA4 and PostHog tracking

## Development

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Features

- **Student Journey**: From discovery to admission
- **Consultation Booking**: Contact form with email notifications
- **Student Portal**: Application tracking and document management
- **Scholarships**: Search and filter opportunities
- **Associate Program**: Partner recruitment system
- **CMS Integration**: Easy content updates via Sanity
- **Analytics**: Track user behavior and conversions

## Design Philosophy

EduPlan360 follows these core principles:
- **Human over techy**: Warm, trustworthy, supportive
- **Simplicity wins**: Guide users step-by-step
- **Conversion-first**: Every page drives action
- **Mobile-first**: Responsive and accessible

## License

Proprietary - EduPlan360

## Support

For support, contact: support@eduplan360.com
