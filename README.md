# Tarot Dating Consultation Platform

An AI-powered tarot reading application for dating and relationship guidance, built with React, TypeScript, and Supabase.

## Features

- 🎴 **4 Consultation Categories**
  - General Love Reading
  - Reconciliation
  - True Feelings
  - Intimate Connection

- 🔮 **Interactive Card Selection**
  - Choose 3 cards from a shuffled deck
  - Beautiful card animations
  - Real-time selection feedback

- 📖 **AI-Powered Interpretations**
  - Past, Present, Future card positions
  - Category-specific readings
  - Personalized advice and guidance

- 💾 **Supabase Integration**
  - Save consultation history
  - Retrieve past readings

## Tech Stack

- **React 18** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool
- **TailwindCSS** - Styling
- **Supabase** - Backend and database

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- A Supabase account (optional, for saving consultations)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/eddiepak/tarot-dating-consultation-platform.git
cd tarot-dating-consultation-platform
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables (optional):
```bash
cp .env.example .env
```

Edit `.env` and add your Supabase credentials:
```
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

4. Start the development server:
```bash
npm run dev
```

5. Open your browser and navigate to `http://localhost:5173`

## Building for Production

```bash
npm run build
npm run preview
```

## Supabase Setup (Optional)

To enable consultation history saving:

1. Create a new Supabase project
2. Create a `consultations` table with the following schema:

```sql
create table consultations (
  id uuid default gen_random_uuid() primary key,
  category text not null,
  cards text[] not null,
  interpretation text not null,
  advice text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);
```

3. Update your `.env` file with your Supabase credentials

## Project Structure

```
src/
├── components/          # React components
│   ├── CategorySelector.tsx
│   ├── CardSelection.tsx
│   └── ResultsDisplay.tsx
├── data/               # Static data
│   ├── categories.ts
│   └── tarotCards.ts
├── lib/                # Utilities
│   ├── interpretation.ts
│   └── supabase.ts
├── types/              # TypeScript types
│   └── index.ts
├── App.tsx             # Main app component
├── main.tsx            # Entry point
└── index.css           # Global styles
```

## Development

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## License

MIT

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
