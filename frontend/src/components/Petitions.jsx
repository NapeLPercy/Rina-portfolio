import React from "react";
import {TrendingUp } from "lucide-react";
import { petitions } from "../utils/petitionsData";
import PetitionCard from "./ui/PetitionsCard";

export default function Petitions() {
  return (
    <section className="min-h-screen bg-gradient-to-br from-cloud via-plum-50/30 to-rose-50/20">
      {/* Decorative background */}
      <div className="fixed top-0 right-0 w-96 h-96 bg-plum-200/20 rounded-full blur-3xl pointer-events-none" />
      <div className="fixed bottom-0 left-0 w-96 h-96 bg-rose-200/20 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        
        {/* Header */}
        <div className="mb-8 sm:mb-12">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2.5 rounded-xl bg-gradient-to-br from-rose-500 to-plum-500 shadow-lg">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
            <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl text-ink">
              Active{" "}
              <span className="bg-gradient-to-r from-rose-500 to-plum-600 bg-clip-text text-transparent">
                Petitions
              </span>
            </h1>
          </div>
          <p className="font-body text-ink/60 text-base sm:text-lg ml-14 max-w-3xl">
            Explore the causes that matter and take action by signing and sharing these petitions
          </p>
        </div>

        {/* Petitions Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {petitions.map((petition, index) => (
            <PetitionCard
              key={petition.id}
              petition={petition}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

/* Keyframe Animation */
const styles = `
  @keyframes fadeSlideIn {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

// Inject styles
if (typeof document !== "undefined") {
  const styleSheet = document.createElement("style");
  styleSheet.textContent = styles;
  document.head.appendChild(styleSheet);
}