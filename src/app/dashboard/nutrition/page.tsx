'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface NutritionLog {
  id: string;
  mealType: string;
  date: string;
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
  foodItems: Array<{ name: string; portion: string }>;
  notes?: string;
}

export default function NutritionPage() {
  const router = useRouter();
  const [logs, setLogs] = useState<NutritionLog[]>([]);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    mealType: 'breakfast',
    preferences: '',
    restrictions: ''
  });

  useEffect(() => {
    fetchLogs();
  }, []);

  const fetchLogs = async () => {
    try {
      const response = await fetch('/api/nutrition');
      const data = await response.json();
      if (response.ok) {
        setLogs(data);
      }
    } catch (error) {
      console.error('Error fetching logs:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch('/api/nutrition', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await response.json();
      if (response.ok) {
        setLogs([data, ...logs]);
        setFormData({ mealType: 'breakfast', preferences: '', restrictions: '' });
      }
    } catch (error) {
      console.error('Error creating log:', error);
    }
    setLoading(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl text-black font-bold mb-8">Nutrition Advice</h1>
      
      <div className="grid gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl text-black font-semibold mb-4">Get Meal Recommendations</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm text-black font-medium mb-1">Meal Type</label>
              <select 
                name="mealType"
                value={formData.mealType}
                onChange={handleChange}
                className="w-full p-2 text-black border rounded-md"
                required
              >
                <option value="breakfast" className="text-black">Breakfast</option>
                <option value="lunch" className="text-black">Lunch</option>
                <option value="dinner" className="text-black">Dinner</option>
                <option value="snack" className="text-black">Snack</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm text-black font-medium mb-1">Dietary Preferences</label>
              <textarea 
                name="preferences"
                value={formData.preferences}
                onChange={handleChange}
                className="w-full p-2 text-black border rounded-md"
                placeholder="Any specific preferences? (e.g., vegetarian, high-protein, etc.)"
                rows={3}
                required
              />
            </div>
            
            <div>
              <label className="block text-sm text-black font-medium mb-1">Dietary Restrictions</label>
              <textarea 
                name="restrictions"
                value={formData.restrictions}
                onChange={handleChange}
                className="w-full p-2 text-black border rounded-md"
                placeholder="Any allergies or foods to avoid?"
                rows={3}
                required
              />
            </div>
            
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 py-2 px-4 rounded-md hover:bg-blue-700 disabled:opacity-50"
            >
              {loading ? 'Getting Recommendations...' : 'Get Recommendations'}
            </button>
          </form>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl text-black font-semibold mb-4">Your Nutrition Log</h2>
          <div className="space-y-4">
            {logs.map((log: any) => (
              <div key={log.id} className="border rounded-lg p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold capitalize">{log.mealType}</h3>
                    <p className="text-sm text-black">
                      {new Date(log.date).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="text-right text-sm">
                    <p>Calories: {log.calories}</p>
                    <p>Protein: {log.protein}g</p>
                    <p>Carbs: {log.carbs}g</p>
                    <p>Fats: {log.fats}g</p>
                  </div>
                </div>
                <div className="mt-2">
                  <details>
                    <summary className="cursor-pointer text-blue-600">View Food Items</summary>
                    <div className="mt-2 pl-4">
                      {log.foodItems.map((item: any, index: number) => (
                        <div key={index} className="mb-1">
                          <p>{item.name} - {item.portion}</p>
                        </div>
                      ))}
                    </div>
                  </details>
                </div>
                {log.notes && (
                  <p className="mt-2 text-sm text-black">{log.notes}</p>
                )}
              </div>
            ))}
            {logs.length === 0 && (
              <p className="text-black">No nutrition logs yet. Get recommendations above!</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}