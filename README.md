## 📋 <a name="table">Table of Contents</a>

1. [Overview](#introduction)
2. [Tech Stack](#tech-stack)
3. [Quick Start](#quick-start)
4. [Hosting](#hosting)
5. [Set Up Environment Variables](#env-variables)
6. [Contributing](#contributing)
7. [License](#license)
8. [Upcoming Features](#upcoming-features)

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
    pnpm install
    ```

2.  **Run the app locally.**

    ```shell
    pnpm run dev
    ```

    Open the browser at [http://localhost:3000/](http://localhost:3000/)

## <a name="hosting">⚙️ Hosting</a>

Hosted with [Vercel](https://vercel.com/)  
Prod URL: [www.mikaelhertz.com](http://www.mikaelhertz.com)

## <a name="env-variables">⚙️ Set Up Environment Variables</a>

Create a new file named `.env` in the root of your project and add the following content:

```env
# Stripe payment
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=
NEXT_PUBLIC_STRIPE_SECRET_KEY=

# Payment redirection
NEXT_PUBLIC_URL=

# Configure Sentry Locally
SENTRY_AUTH_TOKEN=
```

## <a name="contributing">⚙️ Contributing</a>

Contributions are welcome! Please follow these steps:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Make your changes.
4. Commit your changes (`git commit -m 'Add some feature'`).
5. Push to the branch (`git push origin feature-branch`).
6. Open a pull request.

## <a name="license">⚙️ License</a>

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## <a name="upcoming-features">⚙️ Upcoming Features</a>

1. Email & SMS notification about deliveries
2. Headless CMS with Strapi to manage content
3. Loading skeleton
4. i18next for English
5. Vitest testing
6. 3D assets
