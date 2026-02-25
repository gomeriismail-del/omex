# TN Front

Tunisian Frontend Application built with Next.js 14 and Tailwind CSS.

## Features

- **Framework**: Next.js 14 with App Router
- **Styling**: Tailwind CSS
- **Language**: Arabic (RTL) with support for English and French
- **Fonts**: 
  - Arabic: Qimma-Regular.otf
  - English & French: MILONER-Medium.ttf
- **Currency**: Algerian Dinar (DZD) reference

## Project Structure

```
src/
├── app/
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── navbar/
│   ├── hero/
│   └── layout/
public/
├── assets/
└── TNFront/
    ├── Qimma-Regular.otf
    └── MILONER-Medium.ttf
```

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Configuration

- **Default Language**: Arabic (RTL)
- **Text Direction**: RTL ready
- **Font Loading**: Global font faces configured
- **Tailwind**: Custom font families defined
