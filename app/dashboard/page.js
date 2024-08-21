"use client";
import React from "react";
import FlashcardForm from "../components/FlashcardForm";

const Dashboard = () => {
  return (
      <div className="p-6 mt-16">
        <div
          className={`min-h-screen p-12 flex flex-col bg-gradient-to-r from-blue-500 to-purple-500 text-white`}
        >
          <h1 className="text-2xl font-bold text-center mb-6">My Flashcards</h1>
          <FlashcardForm />
        </div>
      </div>
  );
};

export default Dashboard;