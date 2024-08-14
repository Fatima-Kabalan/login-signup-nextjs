
<h1>Simple Form using Next.js 14, JWT, MongoDB, Typescript</h1>

<br/>
<p>A demo project that uses Next.js JWT for authentication, connects to MongoDB with Mongoose, and supports email/password login.</p>
<h1>Features</h1>
<ul>
<li>Credential Login: Log in with email and password.</li>
<li>Forgot Password: Reset user's password through an email.</li>
</ul>
<h1>Environment Setup</h1>
<br/>
<p>Create a .env file in the root directory and add the following variables:</p>
NEXT_PUBLIC_BASE_URL="http://192.168.1.114:3000"

AUTH_SECRET="YOUR_AUTH_SECRET"

MONGODB_URI="YOUR_MONGODB_URI"

JWT_KEY="YOUR_SECRET_KEY"

# Nodemailer
EMAIL_USER="YOUR_EMAIL_USER"
EMAIL_PASSWORD="YOUR_EMAIL_PASSWORD"
<br/>
<h1>Getting Started</h1>
</br>
<p>First, run the development server:</p>
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
<p>Open http://localhost:3000 with your browser to see the result.

You can start editing the page by modifying app/page.tsx. The page auto-updates as you edit the file.

This project uses next/font to automatically optimize and load Inter, a custom Google Font.</p>
<h1>Learn More</h1>
</br>
<p>To learn more about Next.js, take a look at the following resources:</p>
<ul>
<li><a href="https://nextjs.org/docs">Next.js Documentation</a> - learn about Next.js features and API.</li>
<li><a href="https://nextjs.org/learn">Learn Next.js</a> - an interactive Next.js tutorial.</li>
<li>You can check out <a href="https://github.com/vercel/next.js/">the Next.js GitHub repository</a> - your feedback and contributions are welcome!</li>
</ul>
<h1>Deploy on Vercel</h1>
</br>
The easiest way to deploy your Next.js app is to use the <a href="https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme">Vercel Platform</a> from the creators of Next.js.

Check out our <a href="https://nextjs.org/docs/pages/building-your-application/deploying">Next.js deployment documentation</a> for more details.