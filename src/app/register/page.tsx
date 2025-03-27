"use client";
import Link from "next/link";
import React, { useState } from "react";

// const steps = ["STEP 1", "STEP 2", "STEP 3", "STEP 4"];
const steps = [
  {
    step: "STEP 1",
    desc: "Business Information",
  },
  {
    step: "STEP 2",
    desc: "Contact Details",
  },
  {
    step: "STEP 3",
    desc: "Brand & Subscription",
  },
  {
    step: "STEP 4",
    desc: "Review & Submit",
  },
];

export default function Register() {
  const [currentStep, setCurrentStep] = useState(0);

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div className="max-w-5xl mx-auto">
      <div className="text-center py-8">
        <h1 className="text-3xl font-semibold">Register as a Merchant</h1>
        <p className="py-4">
          Already have an account?{" "}
          <Link className="text-blue-500" href="/login">
            Sign in
          </Link>
        </p>
      </div>
      <div className="bg-white shadow-lg rounded-lg p-6">
        {/* Progress Bar */}
        <div className="flex mb-4">
          {steps.map((step, index) => (
            <div key={index} className="mr-4">
              <div className={`h-2 w-40 rounded-full ${index <= currentStep ? "bg-blue-500" : "bg-gray-300"}`}></div>
              <div className={`pl-3 pt-2 text-xs text-left ${index <= currentStep ? "text-blue-600 font-semibold" : "text-gray-400"}`}>
                {step.step}
              </div>
              <div className="pl-3 text-sm text-gray-950 text-left">{step.desc}</div>
            </div>
          ))}
        </div>

        {/* Form Content */}
        <div className="mt-6 text-center text-lg font-semibold text-gray-800">
          Step {currentStep + 1}: {steps[currentStep].desc}
        </div>

        {/* Navigation Buttons */}
        <div className="mt-6 flex justify-between">
          <button
            onClick={prevStep}
            disabled={currentStep === 0}
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded disabled:opacity-50"
          >
            Previous
          </button>
          <button
            onClick={nextStep}
            disabled={currentStep === steps.length - 1}
            className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
