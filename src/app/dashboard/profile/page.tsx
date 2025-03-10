"use client";

import { useState } from "react";
import { UserProfile } from "@clerk/nextjs";

export default function ProfilePage() {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold text-black mb-4">
          Your Profile
        </h1>
        <p className="text-black mb-6">
          Manage your account settings and profile information.
        </p>
        
        <div className="border rounded-lg overflow-hidden">
          <UserProfile 
            appearance={{
              elements: {
                rootBox: "mx-auto w-full",
                card: "border-0 shadow-none",
                navbar: "hidden",
                navbarMobileMenuButton: "hidden",
                headerTitle: "hidden",
                headerSubtitle: "hidden"
              }
            }}
          />
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-bold text-black mb-4">
          Health Information
        </h2>
        <p className="text-black mb-6">
          This information helps us provide more personalized health and fitness recommendations.
        </p>
        
        <HealthInfoForm />
      </div>
    </div>
  );
}

function HealthInfoForm() {
  const [formData, setFormData] = useState({
    weight: "",
    height: "",
    birthdate: "",
    gender: "",
    activityLevel: "moderate",
    dietaryPreferences: [] as string[],
    healthGoals: [] as string[],
    medicalConditions: [] as string[]
  });
  
  const [isLoading, setIsLoading] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, checked } = e.target;
    
    setFormData(prev => {
      if (checked) {
        return {
          ...prev,
          [name]: [...prev[name as keyof typeof prev] as string[], value]
        };
      } else {
        return {
          ...prev,
          [name]: (prev[name as keyof typeof prev] as string[]).filter(item => item !== value)
        };
      }
    });
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setIsSaved(true);
      
      // Reset saved message after 3 seconds
      setTimeout(() => {
        setIsSaved(false);
      }, 3000);
    }, 1000);
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="weight" className="block text-sm font-medium text-black mb-1">
            Weight (kg)
          </label>
          <input
            type="number"
            id="weight"
            name="weight"
            min="30"
            max="300"
            className="w-full px-3 py-2 border border-black text-black
-300 rounded-md shadow-sm focus:outline-none focus:ring-emerald-500 focus:border-emerald-500"
            value={formData.weight}
            onChange={handleChange}
          />
        </div>
        
        <div>
          <label htmlFor="height" className="block text-sm font-medium text-black mb-1">
            Height (cm)
          </label>
          <input
            type="number"
            id="height"
            name="height"
            min="100"
            max="250"
            className="w-full px-3 py-2 border border-black text-black
-300 rounded-md shadow-sm focus:outline-none focus:ring-emerald-500 focus:border-emerald-500"
            value={formData.height}
            onChange={handleChange}
          />
        </div>
        
        <div>
          <label htmlFor="birthdate" className="block text-sm font-medium text-black mb-1">
            Date of Birth
          </label>
          <input
            type="date"
            id="birthdate"
            name="birthdate"
            className="w-full px-3 py-2 border text-black border-black-300 rounded-md shadow-sm focus:outline-none focus:ring-emerald-500 focus:border-emerald-500"
            value={formData.birthdate}
            onChange={handleChange}
          />
        </div>
        
        <div>
          <label htmlFor="gender" className="block text-sm font-medium text-black mb-1">
            Gender
          </label>
          <select
            id="gender"
            name="gender"
            className="w-full px-3 py-2 border text-black border-black
-300 rounded-md shadow-sm focus:outline-none focus:ring-emerald-500 focus:border-emerald-500"
            value={formData.gender}
            onChange={handleChange}
          >
            <option value="">Select gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="non-binary">Non-binary</option>
            <option value="prefer-not-to-say">Prefer not to say</option>
          </select>
        </div>
      </div>
      
      <div>
        <label htmlFor="activityLevel" className="block text-sm font-medium text-black mb-1">
          Activity Level
        </label>
        <select
          id="activityLevel"
          name="activityLevel"
          className="w-full px-3 py-2 border text-black border-black
-300 rounded-md shadow-sm focus:outline-none focus:ring-emerald-500 focus:border-emerald-500"
          value={formData.activityLevel}
          onChange={handleChange}
        >
          <option value="sedentary">Sedentary (little to no exercise)</option>
          <option value="light">Light (1-3 days per week)</option>
          <option value="moderate">Moderate (3-5 days per week)</option>
          <option value="active">Active (6-7 days per week)</option>
          <option value="very_active">Very Active (twice per day)</option>
        </select>
      </div>
      
      <div>
        <span className="block text-sm font-medium text-black mb-2">
          Health Goals (select all that apply)
        </span>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {['Weight loss', 'Muscle gain', 'Improve endurance', 'Increase strength', 'Better sleep', 'Reduce stress', 'Improve overall health'].map(goal => (
            <div key={goal} className="flex items-center">
              <input
                type="checkbox"
                id={`goal-${goal}`}
                name="healthGoals"
                value={goal.toLowerCase().replace(' ', '_')}
                checked={formData.healthGoals.includes(goal.toLowerCase().replace(' ', '_'))}
                onChange={handleCheckboxChange}
                className="h-4 w-4 text-emerald focus:ring-emerald-500 border-black
    -300 rounded"
              />
              <label htmlFor={`goal-${goal}`} className="ml-2 text-sm text-black">
                {goal}
              </label>
            </div>
          ))}
        </div>
      </div>
      
      <div className="pt-4 border-t border-black-200">
        <button
          type="submit"
          disabled={isLoading}
          className="w-full md:w-auto px-4 py-2 border border-black bg-blue text-black rounded-md hover:bg-blue-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? 'Saving...' : 'Save Health Information'}
        </button>
        
        {isSaved && (
          <p className="mt-2 text-sm text-black">
            Health information saved successfully!
          </p>
        )}
      </div>
    </form>
  );
} 