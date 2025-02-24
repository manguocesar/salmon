## 📋 <a name="table">Table of Contents</a>

1. [Overview](#introduction)
2. [Tech Stack](#tech-stack)
3. [Quick Start](#quick-start)
4. [Hosting](#hosting)
5. [Set Up Environment Variables](#env-variables)
6. [Upcoming Features](#upcoming-features)

## <a name="introduction">⚙️ Overview</a>

Seafood Ecommerce Website built on NextJS 15 app router

## <a name="tech-stack">⚙️ Tech Stack</a>

- Next.js 15 app router
- Typescript 5
- Tailwind CSS 4
- Stripe Checkout

## <a name="quick-start">⚙️ Quick Start</a>

1.  **Install the dependencies.**

    ```shell
    pnpm
    ```

2.  **Run the app locally.** `shell     pnpm run dev     ` Open the browser at
    http://localhost:3000/

## <a name="hosting">⚙️ Hosting</a>

Hosted with [Vercel](https://vercel.com/) Prod URL www.mikaelhertz.com

**Set Up Environment Variables**

## <a name=env-variables">⚙️ Set Up Environment Variables</a>

Create a new file named `.env` in the root of your project and add the following
content:

```env
#Clerk
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up

#Liveblocks
NEXT_PUBLIC_LIVEBLOCKS_PUBLIC_KEY=
LIVEBLOCKS_SECRET_KEY=
```

## <a name=upcoming-features">⚙️ Upcoming features</a>

0. headless cms to manage content
1. loading skeleton
2. i18next for english
3. vitestest testing
4. 3D assets
5. email & sms notification about deliveries
