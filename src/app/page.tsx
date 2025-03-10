import Link from 'next/link';
import Image from 'next/image';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <span className="text-2xl font-bold text-emerald-600">NutriHealth</span>
          </div>
          <div className="flex space-x-4">
            <Link href="/sign-in" className="px-4 py-2 rounded-md text-emerald-600 hover:bg-emerald-50 transition-colors">
              Sign In
            </Link>
            <Link href="/sign-up" className="px-4 py-2 rounded-md bg-emerald-600 text-white hover:bg-emerald-700 transition-colors">
              Sign Up
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="flex-grow bg-gradient-to-b from-emerald-50 to-white">
        <div className="container mx-auto px-4 py-16 md:py-24 flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-10 md:mb-0">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              AI-Powered Health & Fitness Insights
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Get personalized nutrition advice and fitness plans tailored to your unique needs using advanced AI technology.
            </p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <Link href="/sign-up" className="px-6 py-3 rounded-md bg-emerald-600 text-white text-center hover:bg-emerald-700 transition-colors">
                Get Started
              </Link>
              <Link href="#features" className="px-6 py-3 rounded-md border border-emerald-600 text-emerald-600 text-center hover:bg-emerald-50 transition-colors">
                Learn More
              </Link>
            </div>
          </div>
          <div className="md:w-1/2 flex justify-center">
            <div className="relative w-full max-w-md h-80">
              <div className="absolute inset-0 bg-emerald-200 rounded-lg transform rotate-3"></div>
              <div className="absolute inset-0 bg-white rounded-lg shadow-lg flex items-center justify-center p-6">
                <div className="text-center">
                  <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Personalized Nutrition Plans</h3>
                  <p className="text-gray-600">AI-generated nutrition advice based on your goals and preferences</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">How NutriHealth Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">AI-Powered Analysis</h3>
              <p className="text-gray-600">Our advanced AI analyzes your health data to provide personalized insights.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Customized Plans</h3>
              <p className="text-gray-600">Get nutrition and fitness plans tailored to your specific goals and needs.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Real-Time Insights</h3>
              <p className="text-gray-600">Receive instant feedback and adjustments as your health journey progresses.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <span className="text-xl font-bold text-emerald-600">NutriHealth</span>
              <p className="text-gray-600 mt-2">AI-powered health and fitness insights</p>
            </div>
            <div className="flex space-x-6">
              <a href="#" className="text-gray-600 hover:text-emerald-600">
                Privacy Policy
              </a>
              <a href="#" className="text-gray-600 hover:text-emerald-600">
                Terms of Service
              </a>
              <a href="#" className="text-gray-600 hover:text-emerald-600">
                Contact
              </a>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-200 text-center text-gray-500">
            <p>&copy; {new Date().getFullYear()} NutriHealth. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
