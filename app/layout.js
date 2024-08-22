"use client";
import { Inter } from "next/font/google";
import "./globals.css";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import Header from "./Header";
import { ClerkProvider } from "@clerk/nextjs";
import PlausibleProvider from "next-plausible";

const inter = Inter({ subsets: ["latin"] });

const metadata = {
  title: "SaaS Flash",
  description: "AI generated Flashcard with Stripe integration",
};

export default function RootLayout({ children }) {
  return (
    <Provider store={store}>
      <ClerkProvider>
        <html lang="en">
          <head>
            <title>{metadata.title}</title>
            <meta name="description" content={metadata.description} />
            <PlausibleProvider domain="https://flashcard-saas-a4jifr5w0-ronald-abels-projects.vercel.app" />
          </head>
          <body
            className={`${inter.className} bg-gray-200 text-gray-900 flex flex-col min-h-screen`}
          >
            <Header />
            <main className="flex-grow container mx-auto px-4 py-8">
              {children}
            </main>
            <footer className="bg-black text-white py-4 text-center shadow-md">
              <p>&copy; 2024 SaaS Flash. All Rights Reserved.</p>
            </footer>
          </body>
        </html>
      </ClerkProvider>
    </Provider>
  );
}