"use client";
import { Button, Card, CardContent, Typography } from "@mui/material";
import { Inter } from "next/font/google";
import { motion } from "framer-motion";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import PricingSection from "./components/PriceSection";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const { isSignedIn } = useUser();
  const router = useRouter();

  const handleGetStarted = () => {
    if (isSignedIn) {
      router.push("/dashboard");
    } else {
      router.push("/sign-in");
    }
  };

  return (
    <Provider store={store}>
      <div
        className={`min-h-screen mt-16 p-10 flex flex-col items-center justify-center bg-gradient-to-r from-gray-400 to-black text-white ${inter.className}`}
      >
        {/* Header Section */} 
        <header className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-6"
          >
            <h5 className="text-4xl font-bold py-4">Welcome to Flashcard SaaS with Stripe</h5>
            <h1 className="text-xl">The easiest way to make flashcards from prompt</h1>
          </motion.div>
          <nav>
            <Button
              variant="contained"
              onClick={handleGetStarted}
              sx={{
                bgcolor: "black",
                color: "white",
                fontSize: "1rem",
                fontWeight: "bold",
                padding: "10px 20px",
                borderRadius: "50px",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
                transition: "all 0.3s ease",
                "&:hover": {
                  bgcolor: "white",
                  color: "black",
                  boxShadow: "0 6px 12px rgba(0, 0, 0, 0.3)",
                  transform: "scale(1.05)",
                },
                "&:active": {
                  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
                  transform: "scale(0.98)",
                },
              }}
            >
              Get Started
            </Button>
          </nav>
        </header>

        {/* AI/Flashcard Section */}
        <section className="w-full max-w-8xl mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Flashcard Genius */}
            <Card
              component={motion.div}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="bg-white text-black shadow-lg"
              style={{
                borderRadius: "10px"
              }}
            >
              <CardContent>
                <Typography variant="h5" component="div" gutterBottom>
                  Flashcard Genius
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Boost learning efficiency with AI-powered flashcards that adapt to your progress.
                </Typography>
              </CardContent>
            </Card>

            {/* AI-Smart Study */}
            <Card
              component={motion.div}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="bg-white text-black shadow-lg"
              style={{
                borderRadius: "10px"
              }}
            >
              <CardContent>
                <Typography variant="h5" component="div" gutterBottom>
                  Smart Study
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Enhance retention with interactive flashcards designed for optimal study sessions.
                </Typography>
              </CardContent>
            </Card>

            {/* AI-Card Mastery */}
            <Card
              component={motion.div}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="bg-white text-black shadow-lg"
              style={{
                borderRadius: "10px"
              }}
            >
              <CardContent>
                <Typography variant="h5" component="div" gutterBottom>
                  Card Mastery
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Achieve mastery with intelligent flashcards that improve learning outcomes.
                </Typography>
              </CardContent>
            </Card>
          </div>
          <PricingSection />
        </section>
      </div>
    </Provider>
  );
}