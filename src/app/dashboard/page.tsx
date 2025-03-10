import Link from "next/link";

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Welcome to NutriHealth!
        </h1>
        <p className="text-gray-600 mb-4">
          Get personalized AI-powered health and fitness insights tailored just for you.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
          <Link 
            href="/dashboard/nutrition"
            className="bg-emerald-50 hover:bg-emerald-100 transition-colors p-6 rounded-lg border border-emerald-200"
          >
            <h2 className="text-xl font-semibold text-emerald-800 mb-2">Nutrition Advice</h2>
            <p className="text-gray-600">
              Get AI-powered nutrition recommendations based on your goals and preferences.
            </p>
          </Link>
          
          <Link 
            href="/dashboard/fitness"
            className="bg-emerald-50 hover:bg-emerald-100 transition-colors p-6 rounded-lg border border-emerald-200"
          >
            <h2 className="text-xl font-semibold text-emerald-800 mb-2">Fitness Plans</h2>
            <p className="text-gray-600">
              Receive personalized workout plans tailored to your fitness level and goals.
            </p>
          </Link>
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">
          Recent Health Insights
        </h2>
        <div className="space-y-4">
          <div className="p-4 border rounded-lg">
            <p className="text-gray-600">
              You haven't requested any health insights yet. Visit the Nutrition Advice or Fitness Plans section to get started!
            </p>
          </div>
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">
          Health Stats
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-sm font-medium text-gray-500">Weight</h3>
            <p className="text-2xl font-bold text-gray-900">--</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-sm font-medium text-gray-500">Height</h3>
            <p className="text-2xl font-bold text-gray-900">--</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-sm font-medium text-gray-500">BMI</h3>
            <p className="text-2xl font-bold text-gray-900">--</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-sm font-medium text-gray-500">Daily Calories</h3>
            <p className="text-2xl font-bold text-gray-900">--</p>
          </div>
        </div>
        <div className="mt-4">
          <Link 
            href="/dashboard/profile"
            className="text-emerald-600 hover:text-emerald-700 text-sm font-medium"
          >
            Complete your profile to see your health stats →
          </Link>
        </div>
      </div>
    </div>
  );
} 