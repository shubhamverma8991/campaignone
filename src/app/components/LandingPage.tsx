import Link from "next/link";
import React from "react";

export const LandingPage = () => {
  const cardData = [
    {
      heading: "Lead Management",
      description: "Capture, organize, and convert leads with our powerful pipeline tools.",
    },
    {
      heading: "Campaign Creation",
      description: "Build targeted multi-channel campaigns that drive results.",
    },
    {
      heading: "Performance Analytics",
      description: "Track campaign performance with detailed analytics and reporting.",
    },
  ];
  return (
    <div>
      <div className="flex flex-col items-center justify-center min-h-screen bg-white text-center p-6">
        <h1 className=" text-gray-950 text-4xl md:text-6xl font-bold">
          Welcome to <span className="text-blue-600">CampaignOne</span>
        </h1>
        <p className="text-base py-8 md:text-2xl text-gray-950 mt-2 max-w-3xl mx-auto">
          A Comprehensive Relationship Marketing Management Platform
        </p>
        <div className="mt-6 pb-8 flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
          <Link href="/login">
            <button className="  bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold text-lg hover:bg-blue-700 w-full sm:w-auto">
              Login
            </button>
          </Link>
          <Link href="/register">
            <button className="border border-blue-600 text-blue-600 px-6 py-2 rounded-lg font-semibold text-lg hover:bg-blue-100 w-full sm:w-auto">
              Register as Merchant
            </button>
          </Link>
        </div>
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl px-4">
          {cardData.map((card, index) => (
            <div key={index} className="p-6 border rounded-lg shadow-sm text-center">
              <h2 className="text-gray-950 font-semibold text-lg md:text-xl">{card.heading}</h2>
              <p className="text-gray-600 text-sm md:text-base mt-2">{card.description}</p>
            </div>
          ))}
        </div>
      </div>
      <div className=" bg-white text-center">
        <footer className="py-10 border-1 border-t-gray-200 text-gray-600 text-xs md:text-base">
          &copy; 2025 CampaignOne. All rights reserved.
        </footer>
      </div>
    </div>
  );
};
