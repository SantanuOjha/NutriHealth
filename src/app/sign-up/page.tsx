import { SignUp } from "@clerk/nextjs";
import Link from "next/link";

export default function SignUpPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 to-white flex flex-col">
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <Link href="/" className="text-2xl font-bold text-emerald-600">
            NutriHealth
          </Link>
        </div>
      </header>
      
      <div className="flex-grow flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
            <h1 className="text-2xl font-bold text-center text-gray-900 mb-6">
              Create Your NutriHealth Account
            </h1>
            <SignUp 
              appearance={{
                elements: {
                  formButtonPrimary: 'bg-emerald-600 hover:bg-emerald-700',
                  footerActionLink: 'text-emerald-600 hover:text-emerald-700'
                }
              }}
              redirectUrl="/dashboard"
            />
          </div>
          <p className="text-center text-gray-600">
            Already have an account?{" "}
            <Link href="/sign-in" className="text-emerald-600 hover:underline">
              Sign in
            </Link>
          </p>
        </div>
      </div>
      
      <footer className="bg-white py-4 border-t">
        <div className="container mx-auto px-4 text-center text-gray-500">
          <p>&copy; {new Date().getFullYear()} NutriHealth. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
} 