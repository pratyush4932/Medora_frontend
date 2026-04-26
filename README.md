# Medora Health App

> A cross-platform mobile application for secure personal health record management — digitize, organize, and share clinical documents with AI-powered insights.

---

## Table of Contents

- [Project Overview](#project-overview)
- [Architecture Overview](#architecture-overview)
- [Technology Stack](#technology-stack)
- [Project Structure](#project-structure)
- [Navigation Architecture](#navigation-architecture)
- [Screen Inventory & Responsibilities](#screen-inventory--responsibilities)
- [Component Architecture](#component-architecture)
- [Design System](#design-system)
- [Data Flow](#data-flow)
- [Feature Flows (End-to-End)](#feature-flows-end-to-end)
- [Getting Started](#getting-started)
- [Development Scripts](#development-scripts)
- [Current Limitations & Roadmap](#current-limitations--roadmap)

---

## Project Overview

**Medora** is a React Native mobile application built with Expo that acts as a personal health record vault. Its core value propositions are:

| Capability | Description |
|---|---|
| **Digitize** | Scan physical documents (prescriptions, lab reports, imaging) via camera |
| **Organize** | Store records in typed folders (Lab Results, Prescriptions, Imaging, General Reports) grouped by hospital/facility |
| **Share** | Generate time-limited encrypted QR codes and share links so medical staff can access records instantly |
| **Insights** | AI-powered summary screen that narrates health trends in plain language |

The app is currently in the **UI prototype / frontend-only** phase. All authentication, storage, and AI calls are wired to stubs or navigation redirects. The backend integration layer is the immediate next milestone.

---

## Architecture Overview

```
┌─────────────────────────────────────────────────────────┐
│                   Expo Router (v6)                        │
│               File-System Based Routing                   │
└────────────────────┬────────────────────────────────────┘
                     │
       ┌─────────────┼──────────────┐
       ▼             ▼              ▼
  (auth) Stack   (tabs) Stack   Modal/Full Screens
  ┌──────────┐  ┌────────────┐  ┌───────────────────┐
  │  login   │  │   home     │  │  scanner.tsx       │
  │  signup  │  │  summary   │  │  share-qr.tsx      │
  └──────────┘  │  hospital  │  │  ai-summary.tsx    │
                │  upload    │  └───────────────────┘
                └────────────┘
                      │
                      ▼
            ┌─────────────────┐
            │  Shared Components
            │  BottomTabBar   │
            │  TopAppBar      │
            │  GradientButton │
            │  ShareModal     │
            │  IconButton     │
            └────────┬────────┘
                     │
            ┌────────▼────────┐
            │  Design System  │
            │  colors.ts      │
            │  scaling.ts     │
            │  tailwind.config│
            └─────────────────┘
```

The application follows a **flat, screen-centric architecture** with no state management library. All UI state is local (`useState`) within each screen. The routing layer (Expo Router) is the primary source of navigation truth.

---

## Technology Stack

| Layer | Technology | Version | Purpose |
|---|---|---|---|
| **Runtime** | React Native | 0.81.5 | Cross-platform UI primitives |
| **Framework** | Expo | ~54.0.33 | Native module management, build tooling |
| **Routing** | Expo Router | ~6.0.23 | File-system based navigation |
| **Language** | TypeScript | ~5.9.2 | Type safety throughout |
| **Styling (utility)** | NativeWind | ^4.2.3 | Tailwind CSS classes for React Native |
| **Styling (imperative)** | StyleSheet API | — | Primary in-component styling |
| **Animations** | React Native Reanimated | ~4.1.1 | Scanner line animation, shared values |
| **Blur** | expo-blur | ~15.0.8 | Glassmorphism in AppBar & BottomTabBar |
| **Gradients** | expo-linear-gradient | ~15.0.8 | Buttons, signup accent line |
| **Icons** | @expo/vector-icons (MaterialIcons) | ^15.1.1 | All iconography |
| **Fonts** | @expo-google-fonts/manrope, /inter | ^0.4.2 | Typography system |
| **Safe Area** | react-native-safe-area-context | ~5.6.0 | Notch/inset handling |
| **Navigation** | react-native-screens | ~4.16.0 | Native screen containers |

### Why These Choices

- **Expo Router over React Navigation directly** — file-system routing maps 1:1 to URL structure, which simplifies deep-linking when QR codes need to open specific records.
- **NativeWind alongside StyleSheet** — Tailwind classes available for rapid prototyping while complex dynamic styles (shadow props, animated values) stay in `StyleSheet.create`.
- **Reanimated over Animated API** — the scanner line runs on the UI thread via `withRepeat`/`withTiming`, avoiding JS-thread jank during heavy operations.
- **MaterialIcons** — single icon family ensures visual consistency without bundle bloat from multiple sets.

---

## Project Structure

```
Medora_frontend/
├── app/                          # All routable screens (Expo Router)
│   ├── _layout.tsx               # Root Stack: font loading, splash, route declarations
│   ├── index.tsx                 # Entry redirect → /(auth)/login
│   ├── (auth)/                   # Auth route group (no tab bar)
│   │   ├── _layout.tsx           # Stack layout for auth screens
│   │   ├── login.tsx             # Phone + OTP login, country picker modal
│   │   └── signup.tsx            # Registration screen (currently mirrors login flow)
│   ├── (tabs)/                   # Tab route group (with BottomTabBar)
│   │   ├── _layout.tsx           # Tabs layout, injects custom BottomTabBar
│   │   ├── home.tsx              # Dashboard: smart insights bento grid, recent records
│   │   ├── upload.tsx            # Records vault: folder grid, recent documents
│   │   ├── summary.tsx           # AI Health Summary: report card, folder actions
│   │   └── hospital.tsx          # Hospital Records: chronological view by facility
│   ├── scanner.tsx               # Full-screen camera scanner (animated scan line)
│   ├── share-qr.tsx              # QR code generator, scope selector, share modal
│   └── ai-summary.tsx            # [Stub] AI summary detail (currently empty)
│
├── src/
│   ├── components/               # Reusable UI primitives
│   │   ├── TopAppBar.tsx         # Glassmorphic floating header (BlurView)
│   │   ├── BottomTabBar.tsx      # Custom glassmorphic tab bar (BlurView)
│   │   ├── GradientButton.tsx    # Linear gradient CTA button
│   │   ├── ShareModal.tsx        # Bottom sheet modal for share options
│   │   └── IconButton.tsx        # Simple icon-only touchable
│   ├── constants/
│   │   ├── colors.ts             # Full Material Design 3 color token map
│   │   └── countries.ts          # ISO country list with dial codes (~250 entries)
│   └── utils/
│       └── scaling.ts            # Responsive scale functions (moderateScale, verticalScale)
│
├── assets/                       # Static assets (icon, splash, adaptive-icon, favicon)
├── global.css                    # NativeWind global CSS entry point
├── app.json                      # Expo app config (name, slug, plugins, orientation)
├── tailwind.config.js            # Tailwind theme extending MD3 color palette + fonts
├── babel.config.js               # expo preset + NativeWind babel plugin
├── metro.config.js               # Metro bundler with NativeWind/CSS support
├── tsconfig.json                 # TypeScript strict mode, bundler resolution
└── package.json                  # Dependencies and scripts
```

---

## Navigation Architecture

Expo Router maps the `app/` directory directly to the URL/navigation tree. The routing hierarchy is:

```
/  (index.tsx)
└── Redirect → /(auth)/login

/(auth)/
├── login        Phone number + country code OTP entry
└── signup       Registration (currently routes to home on submit)

/(tabs)/         Custom BottomTabBar (3 tabs)
├── home         Tab 1: Dashboard
├── summary      Tab 2: AI Summary
├── upload       Tab 3 (upload): Records Vault
└── hospital     Tab 3 (hospital): Records by Facility

/scanner         Full-screen scanner (modal-style, no tab bar)
/share-qr        QR share screen (pushed from home/upload)
/ai-summary      AI detail screen (stub, pushed from scanner)
```

### Route Group Isolation

- `(auth)` group — screens rendered in a bare Stack with no persistent chrome. The group name is stripped from the URL path.
- `(tabs)` group — screens rendered inside the custom `BottomTabBar` which uses `BlurView` for a glassmorphic floating effect.
- Top-level screens (`scanner`, `share-qr`, `ai-summary`) render inside the root Stack with `headerShown: false`.

### Key Navigation Events

| Trigger | Source | Destination |
|---|---|---|
| App launch | `index.tsx` | `/(auth)/login` |
| "Send OTP" tapped | `login.tsx` / `signup.tsx` | `/(tabs)/home` (skips real auth) |
| "Upload" card | `home.tsx` | `/(tabs)/upload` |
| "Generate QR" card | `home.tsx` | `/share-qr` |
| "Scan Record" bento | `home.tsx` | `/scanner` |
| "Scan Document" | `upload.tsx` | `/scanner` |
| "ANALYZE" button | `scanner.tsx` | `/ai-summary` |
| Record row | `home.tsx` | `/ai-summary` |
| Back button | All | Previous screen via `router.back()` |

---

## Screen Inventory & Responsibilities

### `app/index.tsx` — Root Redirect
- Pure redirect component. On app launch, immediately redirects to `/(auth)/login`.
- No UI rendered.

---

### `app/(auth)/login.tsx` — Login Screen
**State:** `activeTab`, `selectedCountry`, `isCountryModalVisible`, `searchQuery`

**Responsibilities:**
1. Renders a card UI with Login/Signup tab switcher.
2. Accepts phone number input with a country code picker.
3. Country picker: a bottom-sheet Modal with searchable `FlatList` over the `COUNTRIES` constant (~250 entries). Filtered in real-time via `searchQuery`.
4. On "Send OTP" → navigates directly to `/(tabs)/home` (auth verification not yet implemented).

**Notable:** Both `login.tsx` and `signup.tsx` currently behave identically — they are separate UI explorations of the same onboarding step. The tab switcher on `login.tsx` allows toggling between them in-place, while `signup.tsx` is a standalone route.

---

### `app/(auth)/signup.tsx` — Signup Screen
**State:** `activeTab`

Simplified version of the login card with a gradient top accent and ambient background blobs. Uses `LinearGradient` for the CTA button. Functionally equivalent to login at this stage.

---

### `app/(tabs)/home.tsx` — Dashboard
**State:** None (fully static data)

**Responsibilities:**
1. **Hero Section**: Personalized greeting, global search bar (currently unfunctional), two quick-action cards (Upload, Generate QR).
2. **Smart Insights Bento Grid**: Four metric cards:
   - Heart Rate (72 bpm) — light card
   - Sleep Score (88) — primary-colored teal card with a fake bar chart
   - Hydration (1.8L) — light card
   - Scan Record — tertiary-colored CTA card linking to `/scanner`
3. **Recent Records**: Two static record rows linking to `/ai-summary`.

The bento grid uses a custom card system with three visual variants: `cardLight`, `cardPrimary`, `cardTertiary`.

---

### `app/(tabs)/upload.tsx` — Records Vault
**State:** `activeFilter` (All | Hospital | Manual)

**Responsibilities:**
1. Two quick-upload actions: "Scan Document" (→ `/scanner`) and "Choose File" (stub).
2. Filter pill row to scope the record view.
3. Folder grid (2-column wrap): Lab Results, Prescriptions, Imaging, General Reports — all static.
4. Recent Documents list: static items with document icon, title, metadata.

---

### `app/(tabs)/summary.tsx` — AI Health Summary Tab
**State:** None

Displays the Medora Intelligence Report — a styled card with a teal corner accent, AI-generated health narrative text, and a timestamp badge. Provides two folder actions: "Create Folder" and "Add to Existing Folder" (both stubs). Also accessible directly from the home screen's recent records.

---

### `app/(tabs)/hospital.tsx` — Hospital Records
**State:** None

Chronological record view grouped by healthcare facility:
- **Metropolitan Hospital** — 2 records (Blood Analysis, MRI Scan)
- **City Wellness Center** — 1 record (Cardiology Evaluation)

Each record card shows: document type icon, title, date, doctor/department, category tag.

---

### `app/scanner.tsx` — Document Scanner
**State (animation):** `scanLineY` (Reanimated shared value)

**Responsibilities:**
1. Full-bleed camera viewfinder (currently a static image placeholder — real camera integration pending).
2. Animated scan line using `withRepeat(withTiming(...))` — runs on the UI thread, bounces top-to-bottom continuously.
3. Four corner bracket markers rendered absolutely within the scanner frame.
4. Floating status card at the bottom: scanning status badge, HIPAA compliance notice.
5. Bottom action bar: Gallery, Capture shutter button, Analyze (→ `/ai-summary`).

**Architecture note:** The `TopAppBar` is rendered on top of the full-screen view using `position: absolute`. This means it overlays the camera preview without interrupting it.

---

### `app/share-qr.tsx` — Share Identity / QR Code
**State:** `scope` (full | hospital), `isShareModalVisible`

**Responsibilities:**
1. Scope selector: "Full Records" vs "Hospital Only" — a segmented control.
2. QR Code display module with:
   - Expiry timer badge ("Expires in 5:00") — static, not counting down yet
   - Decorative QR pattern (hand-drawn View blocks — real QR generation pending)
   - "SECURE DYNAMIC TOKEN" label + Token ID
3. Action buttons: Share Link (→ opens `ShareModal`), Print PDF (stub), Regenerate (stub).
4. Security note: informational banner about encrypted access logging.

---

### `app/ai-summary.tsx` — AI Summary Detail
Currently an **empty stub file** (0 bytes). Navigation targets this route from both the scanner's Analyze button and the home screen's record rows. Planned to render a full AI analysis of a scanned document.

---

## Component Architecture

### `TopAppBar`
```
Props:
  title: string
  showBack?: boolean       → shows back arrow, calls router.back()
  rightAction?: 'notifications' | 'close' | 'none'
  onRightPress?: () => void
  showAvatar?: boolean     → shows circular avatar image

Rendering:
  - position: absolute, top: 0, zIndex: 50
  - BlurView (intensity 80, tint light) fills the container
  - Safe area top inset applied via useSafeAreaInsets()
  - Height: 64dp + top inset
```

The absolute positioning means the scrollable content must add `paddingTop: 88` to scroll beneath the bar without being hidden.

---

### `BottomTabBar`
```
Props: BottomTabBarProps (from @react-navigation/bottom-tabs)

Rendering:
  - position: absolute, bottom: 0
  - BlurView (intensity 80, tint light) as background
  - Border-top-radius 32dp for floating pill shape
  - 3 tabs: home (home icon), summary (description icon), hospital (local-hospital icon)
  - Active tab gets primary-tinted background pill
  - Contains dead code for a center "Add" FAB (isCenter = false currently)
```

Since this is `position: absolute`, all tab screens add `paddingBottom: 100` to their scroll content.

---

### `GradientButton`
```
Props:
  title: string
  icon?: MaterialIcons glyph key
  style?: ViewStyle
  textStyle?: TextStyle
  ...TouchableOpacityProps

Renders:
  TouchableOpacity → LinearGradient (primary → primaryContainer) → Icon + Text
  Shadow: primary color shadow (elevation 8)
```

Used in: `share-qr.tsx`, `ShareModal.tsx`, `signup.tsx`.

---

### `ShareModal`
```
Props:
  visible: boolean
  onClose: () => void

Renders:
  Modal (transparent, slide animation)
  → TouchableWithoutFeedback (dismiss on backdrop)
    → BlurView (dark tint backdrop)
    → Bottom sheet (surfaceContainerLowest bg, rounded top corners)
       → Header: "Share Options" + close button
       → GradientButton: "Copy Link"
       → Action Grid: WhatsApp, Messages, Email (all stubs)
       → Footer: security note
```

---

### `IconButton`
Simple `TouchableOpacity` wrapping a `MaterialIcons` glyph. Used internally and available for general purpose icon actions.

---

## Design System

### Color Palette — Material Design 3

The entire color system is a **Material You / Material Design 3** teal-based palette defined in `src/constants/colors.ts` and mirrored in `tailwind.config.js`:

| Role | Token | Value |
|---|---|---|
| Primary | `Colors.primary` | `#006767` (deep teal) |
| Primary Container | `Colors.primaryContainer` | `#0d8282` |
| On Primary | `Colors.onPrimary` | `#ffffff` |
| Secondary | `Colors.secondary` | `#555f71` (blue-gray) |
| Tertiary | `Colors.tertiary` | `#8d4a26` (warm amber) |
| Surface | `Colors.surface` | `#f8fafa` |
| Background | `Colors.background` | `#f8fafa` |
| On Surface | `Colors.onSurface` | `#191c1d` |
| Surface Lowest | `Colors.surfaceContainerLowest` | `#ffffff` |

### Typography

Two font families loaded at root layout startup via `useFonts`:

| Family | Weights | Usage |
|---|---|---|
| **Manrope** | 400, 600, 700, 800 | Headlines, large titles, CTA buttons |
| **Inter** | 400, 500, 600, 700 | Body text, labels, metadata |

Fonts block rendering until loaded; `SplashScreen.preventAutoHideAsync()` keeps the splash visible during font load, then `SplashScreen.hideAsync()` is called in `useEffect`.

### Responsive Scaling (`src/utils/scaling.ts`)

Based on a **375×812 baseline** (iPhone 11 Pro / X):

```typescript
// Linear scale relative to screen width
scale(size) = (screenWidth / 375) * size

// Linear scale relative to screen height
verticalScale(size) = (screenHeight / 812) * size

// Moderate scale: interpolates between unscaled and fully scaled
// factor=0.5 means 50% of the way toward full proportional scaling
moderateScale(size, factor = 0.5) = size + (scale(size) - size) * factor
```

`moderateScale` is used for font sizes and padding — it scales up on large screens without growing as aggressively as raw linear scaling. `verticalScale` is used for heights and vertical spacing.

---

## Data Flow

### Current State (UI Prototype)

All data is **static / hardcoded**. There is no backend API, no local database, and no state management library. Every screen is self-contained with its own `useState`.

```
User Interaction
      │
      ▼
Screen Component (useState)
      │
      ├── Local UI state update (filter selection, modal visibility, tab switch)
      │
      └── Navigation event (router.push / router.replace)
```

### Intended Future Data Flow

```
User Action (e.g., "Send OTP")
      │
      ▼
Screen Component
      │
      ├── API call → Auth Service (phone/OTP verification)
      │        └── JWT token returned → stored in SecureStore
      │
      ▼
Home Screen
      │
      ├── API call → Records Service → fetch user's documents
      │        └── Paginated list of { id, type, date, facility, aiSummary }
      │
      ├── Camera Capture → Image Upload → OCR/AI Pipeline
      │        └── { extracted_text, ai_summary } stored in Records Service
      │
      └── QR Generation → Backend issues signed token with expiry
               └── QR encodes a short-lived URL: /records/share/{token}
```

### Authentication Flow (Current vs Intended)

```
CURRENT:
  Login Screen → "Send OTP" → router.replace('/(tabs)/home')   ← bypasses auth

INTENDED:
  Login Screen → Submit phone → POST /auth/send-otp
  OTP Entry Screen (not yet built) → POST /auth/verify-otp → JWT
  → Persist JWT → redirect to /(tabs)/home
  → All subsequent API calls include Authorization: Bearer <jwt>
```

---

## Feature Flows (End-to-End)

### Flow 1: Upload via Camera Scan

```
home.tsx (Scan Record card)
    │  router.push('/scanner')
    ▼
scanner.tsx
    │  Camera viewfinder active
    │  Scan line animates (Reanimated, UI thread)
    │  User frames document → taps Capture or ANALYZE
    │  router.push('/ai-summary')
    ▼
ai-summary.tsx  [stub - not implemented]
    │  [Intended: show extracted text + AI summary]
    │  User chooses folder → POST /records
    ▼
upload.tsx / home.tsx (record appears in list)
```

### Flow 2: Share Records via QR

```
home.tsx (Generate QR card)
    │  router.push('/share-qr')
    ▼
share-qr.tsx
    │  Scope selector: Full Records | Hospital Only
    │  QR code displayed with expiry timer
    │  [Intended: fetch signed token from backend]
    │  User taps "Share Link"
    │  → isShareModalVisible = true
    ▼
ShareModal (bottom sheet)
    │  Options: Copy Link, WhatsApp, Messages, Email
    │  [All stubs - platform share sheet not integrated]
    └── onClose → dismisses modal
```

### Flow 3: View Hospital Records

```
home.tsx (recent record row)  OR  BottomTabBar tab
    │  router.push('/(tabs)/hospital')  OR  tab press
    ▼
hospital.tsx
    │  Records grouped by facility (Metropolitan, City Wellness)
    │  Each card: title, date, doctor, department, type
    │  [Intended: fetch from /records?groupBy=facility]
    │  Tap record card → [navigation not yet wired]
```

### Flow 4: Authentication

```
index.tsx
    │  <Redirect href="/(auth)/login" />
    ▼
login.tsx
    │  Country code picker modal (searchable FlatList of ~250 countries)
    │  Phone number input
    │  "Send OTP" → router.replace('/(tabs)/home')
    │  [Intended: POST /auth/send-otp → OTP screen]
    ▼
home.tsx (currently reached directly)
```

---

## Getting Started

### Prerequisites

- Node.js ≥ 18
- npm ≥ 9
- Expo CLI: `npm install -g expo-cli` (or use `npx expo`)
- For iOS: macOS with Xcode
- For Android: Android Studio with an AVD or physical device
- Expo Go app on your device (for quick testing)

### Installation

```bash
# 1. Clone the repository
git clone <repository-url>
cd Medora_frontend

# 2. Install dependencies
npm install

# 3. Start the development server
npx expo start -c
```

The `-c` flag clears the Metro bundler cache, which is recommended after adding/updating packages.

### Running on a Device

```bash
# iOS Simulator (macOS only)
npm run ios

# Android Emulator / Device
npm run android

# Web (experimental)
npm run web

# Expo Go via QR code (default)
npm start
```

Scan the QR code printed in the terminal with the **Expo Go** app on iOS or Android.

---

## Development Scripts

| Script | Command | Description |
|---|---|---|
| `start` | `expo start` | Start Metro with interactive menu |
| `android` | `expo start --android` | Launch directly on Android |
| `ios` | `expo start --ios` | Launch directly on iOS Simulator |
| `web` | `expo start --web` | Launch in browser (experimental) |

---

## Current Limitations & Roadmap

### Known Stubs / Incomplete Features

| Feature | File | Status |
|---|---|---|
| OTP verification | `login.tsx`, `signup.tsx` | Navigation bypasses auth — goes directly to home |
| Real camera | `scanner.tsx` | Static image placeholder; `expo-camera` not installed |
| AI Summary detail | `ai-summary.tsx` | Empty file (0 bytes) |
| QR generation | `share-qr.tsx` | Decorative hand-drawn blocks; no real QR library |
| QR expiry countdown | `share-qr.tsx` | Static text "Expires in 5:00" |
| File picker | `upload.tsx` | "Choose File" button is a stub |
| Share sheet | `ShareModal.tsx` | Buttons render but no action wired |
| Search | `home.tsx` | TextInput renders but no filtering logic |
| Record detail navigation | `hospital.tsx`, `upload.tsx` | Cards are tappable but go nowhere |
| State management | All screens | Local `useState` only; no global store |
| Backend API | All screens | No API client or service layer exists |

### Recommended Next Steps

1. **Authentication** — Integrate a real OTP service (Twilio/Firebase Auth) with a new OTP entry screen.
2. **Camera** — Install `expo-camera`, request permissions, and replace the static image in `scanner.tsx` with a live `<CameraView>`.
3. **QR Code** — Install `react-native-qrcode-svg` and replace the decorative blocks with a real signed token QR.
4. **State Management** — As API calls are added, introduce Zustand or React Query for server-state caching.
5. **AI Integration** — Wire `ai-summary.tsx` to an LLM endpoint (e.g., Gemini, OpenAI) that receives OCR text and returns a structured health narrative.
6. **Backend** — Build a REST or GraphQL API for: user auth, record CRUD, QR token issuance, AI pipeline orchestration.

---

## License

ISC License — see [LICENSE](./LICENSE) for full text.
