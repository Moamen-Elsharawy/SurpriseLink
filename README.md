# 🎁 SurpriseLink - Interactive Digital Invitations

SurpriseLink is a high-end, interactive digital invitation platform that allows users to create, share, and experience animated, immersive celebration pages for various occasions.

## 🚀 Key Features
- **Smart AI Invitations**: Generates unique greeting messages using OpenRouter AI (Gemini Flash).
- **Customizable Messages**: Option to write your own messages in Arabic and English for a personal touch.
- **Multilingual Support**: Fully localized in Arabic (RTL) and English (LTR) with automatic browser language detection.
- **Dynamic Seasonal Themes**: Interactive animations for Ramadan, Eid, Christmas, Birthdays, and more.
- **Real-time Analytics**: Built-in visitor counter to see who viewed your surprise.
- **Sharing Made Easy**: Automatic QR code generation and WhatsApp one-click sharing.
- **Cinematic Experience**: Background music, sound effects, and 3D-like animations using Framer Motion and Howler.js.

---

## 🏗 Project Structure

```text
src/
├── components/          # Reusable UI components
│   ├── layout/          # Page layouts and Navigation
│   ├── shared/          # Shared components (Toggles, Mute, QR)
│   └── ui/              # Shadcn-style base components (Button, Input, Card)
├── features/            
│   ├── create-invite/   # Logic for generating invitations and AI text
│   ├── view-invite/     # Logic for the recipient's surprise experience
│   └── themes/          # Interactive theme components (RamadanTheme, etc.)
├── hooks/               # Custom React hooks (SoundContext, ThemeContext)
├── i18n/                # Multilingual translation setup (EN, AR)
├── lib/                 # Shared utilities, Supabase client, and static data
├── services/            # API services (AI generation)
└── types/               # Zod schemas and data definitions
```

---

## 🛠 Technology Stack
- **Frontend**: React + Vite
- **Styling**: Tailwind CSS v4 (Glassmorphism & Mesh gradients)
- **Animations**: Framer Motion & Canvas Confetti
- **Backend/DB**: Supabase (PostgreSQL)
- **AI Engine**: OpenRouter (AI Message Generation)
- **Audio**: Howler.js (Sound Effects Management)
- **Validation**: React Hook Form + Zod

---

## 📖 Usage Guide

### Creating an Invitation
1.  **Enter Your Details**: Fill in your name and phone number.
2.  **Select Occasion**: Choose from over 20+ different occasions.
3.  **Choose Message Mode**:
    - **Magic (AI)**: Let the AI generate a diverse message in both languages.
    - **Custom**: Write your own personal greeting in Arabic and English.
4.  **Share**: Copy the generated link, send it via WhatsApp, or let the recipient scan the QR code.

### Viewing an Invitation
1.  **Identification**: The recipient enters their name/phone to unlock the surprise.
2.  **The Reveal**: Click "Open Surprise" to enter the immersive experience.
3.  **Interaction**: Interact with animated elements (like lanterns or gift boxes) to reveal the message with music and confetti.

---

## ⚙️ Setup & Deployment

1.  **Environment Variables**: Create a `.env` file with:
    ```env
    VITE_SUPABASE_URL=your_url
    VITE_SUPABASE_ANON_KEY=your_key
    VITE_OPENROUTER_API_KEY=your_ai_key
    ```
2.  **Install Dependencies**: `npm install`
3.  **Run Locally**: `npm run dev`
4.  **Build for Production**: `npm run build`

---

## 📝 Goal
The goal of SurpriseLink is to bridge the gap between simple text messages and traditional cards by providing a modern, "wow" experience that feels alive, personal, and premium.
