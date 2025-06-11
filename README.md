# SOTACIB Commercial Mobile App

## Description

SOTACIB Commercial is a mobile application built with Next.js and Capacitor, designed to help SOTACIB's commercial team manage their visits and track points of sale locations.

## Features

- User Authentication
- Interactive Map with Points of Sale
- Visit Management
- Client Management
- Real-time Location Tracking
- Offline Support
- Visit Reports and Statistics

## Technologies Used

- Next.js 15.0.4
- Capacitor
- React
- TailwindCSS
- Leaflet Maps
- Lucide Icons

## Prerequisites

- Node.js (v18 or later)
- npm or yarn
- Xcode (for iOS development)
- Android Studio (for Android development)
- iOS Simulator or physical iOS device
- Android Emulator or physical Android device

## Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/sotacib-commercial.git
cd sotacib-commercial
```

2. Install dependencies:

```bash
npm install
```

3. Configure environment variables:

```bash
cp .env.example .env.local
# Edit .env.local with your configuration
```

## Development

### Web Development

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000)

### Building for Mobile

1. Build the web assets:

```bash
npm run static
```

2. Add mobile platforms:

```bash
# For iOS
npx cap add ios
npx cap sync

# For Android
npx cap add android
npx cap sync
```

3. Open native IDEs:

```bash
# iOS
npx cap open ios

# Android
npx cap open android
```

## Building for Production

### iOS

1. Open Xcode
2. Select your team for signing
3. Build and run on device/simulator

### Android

1. Open Android Studio
2. Build > Generate Signed Bundle/APK
3. Follow the signing process

## Project Structure

```
sotacib-commercial/
├── src/
│   ├── app/               # Next.js pages and routes
│   ├── components/        # React components
│   └── styles/           # Global styles
├── public/               # Static assets
├── ios/                  # iOS native project
└── android/             # Android native project
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request