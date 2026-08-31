# My Sawari 🚗

A mobile car rental application built with **React Native, Expo, and TypeScript**.

My Sawari allows users to discover cars, search for available vehicles, view car details, complete a booking and payment flow, and manage their bookings from one place.

---

## ✨ Features

### 🏠 Home
- Personalized home screen
- Car search with location, date, time, and driving option selection
- Next Trip card reflecting real upcoming bookings
- Popular Cars section with category filtering
- Functional car selection and detailed view navigation

### 🔎 Explore
- Discover available cars by city and body type
- Search by keywords or model
- Browse popular destinations (Bikaner, Jaipur, Delhi, Mumbai, etc.)
- Functional car selection directly opening vehicle details

### 🚘 Car Details
- High quality vehicle image
- Vehicle specifications (Transmission, Fuel, Seats, Mileage)
- Interactive Driving option toggle (Self Drive vs With Driver)
- Real-time price breakdown calculation
- Native Share feature

### 📅 Booking Flow
Complete end-to-end booking flow:

```text
Select Car
    ↓
Car Details
    ↓
Review Booking
    ↓
Payment
    ↓
Booking Success
    ↓
Bookings
    ↓
Booking Details
```

### 💳 Payment
- Booking price breakdown (Rental rate × days)
- Additional charges
- Discount applied
- Amount paid today
- Security deposit (refundable)
- Interactive payment simulation with instant booking creation

### 📚 Bookings
Bookings are dynamically managed and separated into tabs:
- **Upcoming**: Newly created and scheduled trips
- **Active**: Currently ongoing rentals
- **Completed**: Past trip history
- Users can tap any booking card to open its complete details.

### 🧾 Booking Details
Displays full, itemized booking information:
- Booking Reference ID (e.g. `MS-82914`)
- Booking status badge
- Vehicle details and image
- Pickup & Return trip locations and times
- Customer contact information
- Driving option (Self Drive / With Driver)
- Complete price and payment breakdown

### 🧭 Navigation
The app supports robust and smooth navigation:
- Custom in-app back buttons
- Android physical/system hardware back button
- Android swipe-back gesture
- Persistent Bottom Navigation between **Home**, **Explore**, and **Bookings**

---

## 🛠️ Tech Stack

- **React Native** (v0.86.3)
- **Expo** (v57.0.17)
- **TypeScript** (~6.0.3)
- **Expo Router** (v57.0.17)
- **React Context API** (`BookingContext.tsx`)
- **Redux Toolkit**
- **React Native Safe Area Context**
- **Expo Vector Icons** (Feather, MaterialCommunityIcons)

---

## 📂 Project Structure

```text
src/
├── app/
│   ├── _layout.tsx
│   └── index.tsx
├── components/
│   ├── AvailableCarCard.tsx
│   ├── AvailableCars.tsx
│   ├── AvailableCarsHeader.tsx
│   ├── BookingFooter.tsx
│   ├── BottomNav.tsx
│   ├── CarCategories.tsx
│   ├── CarDetailsContent.tsx
│   ├── CarDetailsHero.tsx
│   ├── DateSheet.tsx
│   ├── DrivingOptionsSheet.tsx
│   ├── FilterCarsSheet.tsx
│   ├── HomeGreeting.tsx
│   ├── HomeHeader.tsx
│   ├── NextTripCard.tsx
│   ├── NotificationsSheet.tsx
│   ├── PopularCars.tsx
│   ├── PopularCarsHeader.tsx
│   ├── SearchCarCard.tsx
│   ├── SearchCarsSheet.tsx
│   ├── SortCarsSheet.tsx
│   └── TimeSheet.tsx
├── data/
│   ├── bookings.ts
│   ├── cars.ts
│   └── destinations.ts
├── screens/
│   ├── AvailableCarsScreen.tsx
│   ├── BookingDetailsScreen.tsx
│   ├── BookingSuccessScreen.tsx
│   ├── BookingsScreen.tsx
│   ├── CarDetailsScreen.tsx
│   ├── ExploreScreen.tsx
│   ├── HomeScreen.tsx
│   ├── PaymentScreen.tsx
│   └── ReviewBookingScreen.tsx
├── store/
│   └── BookingContext.tsx
└── assets/
    └── images/
        ├── app-logo.png
        ├── icon.png
        ├── splash-icon.png
        └── cars/
```

---

## 🚀 Getting Started

### Prerequisites
Make sure you have:
- [Node.js](https://nodejs.org/) installed
- `npm` installed
- An Android device or emulator
- [Expo Go](https://expo.dev/go) or an Expo development build

### 1. Clone the repository
```bash
git clone <GITHUB_REPOSITORY_URL>
```

### 2. Navigate to the project
```bash
cd car-rental-app
```

### 3. Install dependencies
```bash
npm install
```

### 4. Start the Expo development server
```bash
npx expo start
```

### 5. Run on Android
```bash
npx expo start --android
```
*Alternatively, scan the QR code displayed in the terminal using the Expo Go app on your Android device.*

---

## 📱 Android APK

A ready-to-install Android preview build is available through Expo:
- **APK / Expo Build**: [https://expo.dev/accounts/parzan/projects/car-rental-app/builds/7fd68511-0aba-442b-8399-da2b0f66713a](https://expo.dev/accounts/parzan/projects/car-rental-app/builds/7fd68511-0aba-442b-8399-da2b0f66713a)

---

## 🔗 GitHub Repository

- **GitHub**: `<GITHUB_REPOSITORY_URL>`

---

## 💾 Data & Backend

The current version uses local mock data for the assignment. **No external API or backend is required to run the application.**

The local data includes:
- Cars (Kia Seltos, Hyundai Creta, Maruti Ignis, Toyota Innova, Hyundai Verna, Ford EcoSport)
- Vehicle specifications & categories
- High-resolution local car images
- Locations & Destinations
- Active & initial booking records
- Customer details
- Itemized pricing & security deposit calculation
- Booking lifecycle status (`upcoming`, `active`, `completed`)

This allows the complete application, search filtering, and end-to-end booking flow to be demonstrated seamlessly without additional server configuration.

---

## 🧪 Testing the Application

### Home
1. Open the application.
2. Browse the Home screen.
3. Test the search card (change location, dates, driving option).
4. Test the **Next Trip** card to view upcoming trip details.
5. Browse **Popular Cars** and switch category tabs (`All`, `SUV`, `Sedan`, `Hatchback`, etc.).
6. Tap any car card to open its details.

### Explore
1. Switch to the **Explore** tab.
2. Search cars by name or city.
3. Tap on destination cards (Bikaner, Jaipur, Delhi, Mumbai).
4. Select a car to view its full details.

### Booking Flow
1. Select any car from Home, Explore, or Available Cars.
2. Review specifications, features, and toggle driving options (`Self Drive` / `With Driver`).
3. Tap **Confirm Booking** to proceed to **Review Booking**.
4. Verify/edit customer details (Name, Mobile, Email, DL Number).
5. Tap **Continue to payment**.
6. Select a payment method and click **Pay ₹X,XXX**.
7. Confirm the **Booking Success** screen with the generated Reference ID.
8. Navigate to the **Bookings** tab to see your new booking immediately under **Upcoming**.
9. Tap the booking to review the complete **Booking Details**.

### Android Navigation
- Test both the **Android physical/system back button** and the **Android swipe-back gesture**.
- The application will smoothly navigate back through the screen stack (e.g., Payment → Review Booking → Car Details → Search Results / Home) instead of closing immediately.

---

## 🎨 Design

The implemented screens follow modern, premium mobile design principles, including:
- Curated typography (Manrope font family)
- Balanced spacing and padding
- Vibrant lime-green accent palette (`#B8F23A`) paired with deep dark mode tokens (`#101828`)
- Sleek cards, bottom sheets, and interactive chips
- Polished empty states and loading feedback

The **Explore** screen and modal sheets were crafted as natural extensions of the application's visual style.

---

## 📱 Platform

- **Target Platform**: Android (Ready for iOS and Web)
- Built using **Expo** and **React Native**, designed to be easily extensible to iOS and Web in future releases.

---

## 👨‍💻 Project Overview

| Property | Value |
| :--- | :--- |
| **Application** | My Sawari |
| **Type** | Car Rental Mobile Application |
| **Platform** | Android |
| **Framework** | React Native + Expo |
| **Language** | TypeScript |
| **State Management** | React Context API (`BookingContext`) |
| **Data Source** | Local / Mock Data |
