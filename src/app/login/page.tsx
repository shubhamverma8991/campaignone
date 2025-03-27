import Link from "next/link";
import React from "react";

export default function Login() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4 sm:px-6 lg:px-8">
      <div>
        <h1 className="text-6xl  font-bold text-center text-blue-600">CampaignOne</h1>
        <h2 className="text-3xl text-gray-950 py-8 font-semibold text-center">Sign in to your account</h2>
      </div>
      <div className="w-full max-w-md p-8 space-y-8  rounded-lg shadow-md">
        <form className="space-y-4">
          <div>
            <label className="text-gray-800 block text-sm font-medium">Email address</label>
            <input
              type="email"
              className="border-gray-400 w-full px-4 py-2 mt-1 border rounded-lg focus:ring focus:ring-blue-300 focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-gray-800 text-sm font-medium">Password</label>
            <input
              type="password"
              className="border-gray-400 w-full px-4 py-2 mt-1 border rounded-lg focus:ring focus:ring-blue-300 focus:outline-none"
            />
          </div>
          <div className="flex items-center justify-between">
            <label className="flex items-center text-sm">
              <input type="checkbox" className="mr-2" /> Remember me
            </label>
            <a href="#" className="text-blue-500 text-sm">
              Forgot your password?
            </a>
          </div>
          <button type="submit" className="w-full px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition duration-300">
            Sign in
          </button>
        </form>
      </div>
      <p className="text-center text-sm pt-8 text-gray-800">
        Or&nbsp;
        <Link href="/register" className="text-blue-500">
          register as a new merchant
        </Link>
      </p>
    </div>
  );
}
