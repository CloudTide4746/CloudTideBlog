import { Outlet } from "react-router";
import Navbar from "@/app/components/Navbar";

export default function Root() {
  return (
    <div className="min-h-screen bg-[#faf9f7] dark:bg-[#1a1a1a] transition-colors duration-300">
      <Navbar />
      <main className="max-w-4xl mx-auto px-6 py-8">
        <Outlet />
      </main>
    </div>
  );
}
