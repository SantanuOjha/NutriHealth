'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface FitnessPlan {
  id: string;
  name: string;
  exercises: Array<{
    name: string;
    sets: number;
    reps: number;
    instructions?: string;
  }>;
  frequency: string;
  intensity: string;
  notes?: string;
}

export default function FitnessPage() {
  const router = useRouter();
  const [plans, setPlans] = useState<FitnessPlan[]>([]);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    goals: '',
    level: 'beginner',
    preferences: ''
  });

  useEffect(() => {
    fetchPlans();
  }, []);

  const fetchPlans = async () => {
    try {
      const response = await fetch('/api/fitness');
      const data = await response.json();
      if (response.ok) {
        setPlans(data);
      }
    } catch (error) {
      console.error('Error fetching plans:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch('/api/fitness', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await response.json();
      if (response.ok) {
        setPlans([data, ...plans]);
        setFormData({ goals: '', level: 'beginner', preferences: '' });
      }
    } catch (error) {
      console.error('Error creating plan:', error);
    }
    setLoading(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl text-black font-bold mb-8">Fitness Plans</h1>
      
      <div className="grid gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl text-black font-semibold mb-4">Create New Fitness Plan</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm text-black font-medium mb-1">Goals</label>
              <textarea 
                name="goals"
                value={formData.goals}
                onChange={handleChange}
                className="w-full p-2 text-black border rounded-md"
                placeholder="What are your fitness goals?"
                rows={3}
                required
              />
            </div>
            
            <div>
              <label className="block text-sm text-black font-medium mb-1">Fitness Level</label>
              <select 
                name="level"
                value={formData.level}
                onChange={handleChange}
                className="w-full p-2 text-black border rounded-md"
                required
              >
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm text-black font-medium mb-1">Preferences</label>
              <textarea 
                name="preferences"
                value={formData.preferences}
                onChange={handleChange}
                className="w-full p-2 text-black border rounded-md"
                placeholder="Any specific preferences? (e.g., home workouts, no equipment, etc.)"
                rows={3}
                required
              />
            </div>
            
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:opacity-50"
            >
              {loading ? 'Generating Plan...' : 'Generate Plan'}
            </button>
          </form>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl text-black font-semibold mb-4">Your Fitness Plans</h2>
          <div className="space-y-4">
            {plans.map((plan: any) => (
              <div key={plan.id} className="border rounded-lg p-4">
                <h3 className="font-semibold">{plan.name}</h3>
                <p className="text-black text-sm">Frequency: {plan.frequency}</p>
                <p className="text-black text-sm">Intensity: {plan.intensity}</p>
                {plan.notes && (
                  <p className="mt-2 text-sm">{plan.notes}</p>
                )}
                <div className="mt-2">
                  <details>
                    <summary className="cursor-pointer text-blue-600">View Exercises</summary>
                    <div className="mt-2 pl-4">
                      {plan.exercises.map((exercise: any, index: number) => (
                        <div key={index} className="mb-2">
                          <p className="font-medium">{exercise.name}</p>
                          <p className="text-sm text-black">
                            {exercise.sets} sets × {exercise.reps} reps
                          </p>
                          {exercise.instructions && (
                            <p className="text-sm mt-1">{exercise.instructions}</p>
                          )}
                        </div>
                      ))}
                    </div>
                  </details>
                </div>
              </div>
            ))}
            {plans.length === 0 && (
              <p className="text-black">No fitness plans yet. Create one above!</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 