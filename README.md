# Suburbia Skate

A modern e-commerce platform for custom skateboard design and purchase. Built with Next.js 15 featuring an interactive 3D skateboard customizer powered by React Three Fiber.

## Features

- **3D Skateboard Customizer** - Build custom skateboards with real-time 3D preview
  - Choose from multiple deck designs
  - Select wheel colors and styles
  - Customize truck and bolt finishes
- **User Authentication** - Secure sign-in/sign-up with Clerk
- **Shopping Cart** - Full cart functionality with persistent state
- **Checkout** - Integrated PayPal payment processing
- **User Account Management** - Profile management, order history, and order tracking
- **Responsive Design** - Optimized for mobile, tablet, and desktop
- **Smooth Animations** - GSAP-powered animations throughout
- **Physics Interactions** - Matter.js for realistic physics effects

## Tech Stack

### Core
- **Next.js 15.0.3** - React framework with App Router
- **React 19 RC** - UI library
- **TypeScript** - Type safety

### 3D & Graphics
- **Three.js** - 3D rendering
- **@react-three/fiber** - React renderer for Three.js
- **@react-three/drei** - Useful helpers for React Three Fiber

### Styling & Animation
- **Tailwind CSS** - Utility-first CSS
- **GSAP** - Animation library
- **Matter.js** - 2D physics engine

### Integration & Services
- **Clerk** - Authentication and user management
- **PayPal SDK** - Payment processing
- **React Hot Toast** - Toast notifications

## Getting Started

### Installation

```bash
npm install
```

### Environment Variables

Create a `.env.local` file with the following:

```env
# PayPal Configuration
NEXT_PUBLIC_PAYPAL_CLIENT_ID=your_paypal_client_id
PAYPAL_CLIENT_SECRET=your_paypal_client_secret
PAYPAL_MODE=sandbox

# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

### Build

```bash
npm run build
npm start
```

## Key Pages

- `/` - Homepage with hero, products, team, and about sections
- `/build` - Interactive 3D skateboard customizer
- `/cart` - Shopping cart
- `/checkout` - Checkout with PayPal integration
- `/account` - User account dashboard with profile and order history
