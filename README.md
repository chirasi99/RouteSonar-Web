# RouteSonar — React + TypeScript + Firebase + Tailwind CSS

A production-ready landing page that reads all content from **Firebase Firestore** and renders it with a polished dark theme using **Tailwind CSS**.

---

## 📁 Project Structure

```
src/
├── firebase/
│   └── config.ts          # Firebase init (fill in your credentials)
├── hooks/
│   └── useSiteData.ts     # Fetches all 9 Firestore collections
├── types/
│   └── index.ts           # TypeScript interfaces for all collections
├── components/
│   ├── Navbar.tsx
│   ├── Hero.tsx
│   ├── Stats.tsx
│   ├── Features.tsx
│   ├── Steps.tsx
│   ├── Pricing.tsx
│   ├── Testimonials.tsx
│   ├── News.tsx
│   └── Footer.tsx
├── App.tsx                 # Root: wires hook → components
├── index.tsx               # React DOM entry point
└── index.css               # Tailwind directives + font import
```

---

## 🚀 Setup

### 1. Install dependencies

```bash
npm install
```

### 2. Add Firebase credentials

Copy `.env.example` → `.env.local` and fill in your values:

```bash
cp .env.example .env.local
```

Open `.env.local` and paste in your Firebase project credentials  
(Firebase Console → Project Settings → General → Your apps → SDK setup).

### 3. Set Firestore read rules (development)

In the Firebase Console → Firestore Database → Rules, temporarily allow reads:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read: if true;
      allow write: if false;
    }
  }
}
```

> ⚠️ Restrict rules before going to production.

### 4. Start the dev server

```bash
npm start
```

---

## 🔥 Firestore Collections Summary

| Collection     | Document(s)        | Notes                              |
|----------------|--------------------|------------------------------------|
| `navbar`       | `main`             | Logo, CTA, nav links               |
| `hero`         | `main`             | Badge, headline, CTAs, press items |
| `stats`        | `main`             | 3-item stats array                 |
| `features`     | `main`             | 6 feature cards with icon keys     |
| `steps`        | `main`             | 5-step process timeline            |
| `pricing`      | `main`             | 4 pricing tiers                    |
| `testimonials` | `main`             | 4 customer quotes                  |
| `news`         | `post_1…post_n`    | Multiple docs, ordered by `date`   |
| `footer`       | `main`             | Contact, social, legal links       |

---

## 🎨 Design Tokens

The design uses a dark slate theme with emerald green as the primary accent:

| Token           | Value        | Usage                        |
|-----------------|--------------|------------------------------|
| Background      | `slate-950`  | Page base                    |
| Card bg         | `slate-900`  | Section cards                |
| Brand green     | `emerald-400`| CTAs, icons, accents         |
| Sky blue        | `sky-400`    | News section accent          |
| Display font    | Syne 800+    | All headings                 |
| Body font       | DM Sans 400  | Body copy                    |

---

## 📦 Dependencies

- `react` + `react-dom` 18
- `typescript` 5
- `firebase` 10 (Firestore)
- `tailwindcss` 3 + `autoprefixer` + `postcss`
- `react-scripts` 5 (CRA)
