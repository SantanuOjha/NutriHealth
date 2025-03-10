import { UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { ReactNode } from "react";

export default function DashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Sidebar */}
      <aside className="bg-emerald-800 text-white w-full md:w-64 md:min-h-screen">
        <div className="p-4 flex justify-between items-center md:justify-start md:flex-col md:items-start">
          <Link href="/" className="text-2xl font-bold mb-0 md:mb-8">
            NutriHealth
          </Link>
          <div className="block md:hidden">
            <UserButton />
          </div>
        </div>
        <nav className="hidden md:block p-4">
          <ul className="space-y-2">
            <li>
              <Link
                href="/dashboard"
                className="block py-2 px-4 rounded hover:bg-emerald-700 transition-colors"
              >
                Dashboard
              </Link>
            </li>
            <li>
              <Link
                href="/dashboard/nutrition"
                className="block py-2 px-4 rounded hover:bg-emerald-700 transition-colors"
              >
                Nutrition Advice
              </Link>
            </li>
            <li>
              <Link
                href="/dashboard/fitness"
                className="block py-2 px-4 rounded hover:bg-emerald-700 transition-colors"
              >
                Fitness Plans
              </Link>
            </li>
            <li>
              <Link
                href="/dashboard/profile"
                className="block py-2 px-4 rounded hover:bg-emerald-700 transition-colors"
              >
                Profile
              </Link>
            </li>
          </ul>
        </nav>
        <div className="hidden md:block p-4 mt-auto">
          <UserButton />
        </div>
      </aside>

      {/* Mobile Navigation */}
      <div className="md:hidden bg-white border-b sticky top-0 z-10">
        <nav className="container mx-auto px-4 py-2">
          <ul className="flex overflow-x-auto space-x-4">
            <li>
              <Link
                href="/dashboard"
                className="block py-2 px-3 text-sm whitespace-nowrap text-emerald-800 font-medium"
              >
                Dashboard
              </Link>
            </li>
            <li>
              <Link
                href="/dashboard/nutrition"
                className="block py-2 px-3 text-sm whitespace-nowrap text-emerald-800 font-medium"
              >
                Nutrition
              </Link>
            </li>
            <li>
              <Link
                href="/dashboard/fitness"
                className="block py-2 px-3 text-sm whitespace-nowrap text-emerald-800 font-medium"
              >
                Fitness
              </Link>
            </li>
            <li>
              <Link
                href="/dashboard/profile"
                className="block py-2 px-3 text-sm whitespace-nowrap text-emerald-800 font-medium"
              >
                Profile
              </Link>
            </li>
          </ul>
        </nav>
      </div>

      {/* Main Content */}
      <main className="flex-1 bg-gray-50">
        <div className="container mx-auto p-4 md:p-6">{children}</div>
      </main>
    </div>
  );
} 