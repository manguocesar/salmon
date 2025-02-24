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
#Stripe payment
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=
NEXT_PUBLIC_STRIPE_SECRET_KEY=

#Payment redirection
NEXT_PUBLIC_URL=

#Configure Sentry Locally
SENTRY_AUTH_TOKEN=
```

## <a name=upcoming-features">⚙️ Upcoming features</a>

1. email & sms notification about deliveries
2. headless cms with strapi to manage content
3. loading skeleton
4. i18next for english
5. vitestest testing
6. 3D assets
