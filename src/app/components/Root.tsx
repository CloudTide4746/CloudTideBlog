import { Outlet } from "react-router";
import Navbar from "@/app/components/Navbar";
import { I18nProvider } from "@/app/i18n/I18nContext";
import DonationButton from "@/app/components/DonationButton";

export default function Root() {
  return (
    <I18nProvider>
      <div className="min-h-screen bg-[#faf9f7] dark:bg-[#1a1a1a] transition-colors duration-300">
        <Navbar />
        <main className="max-w-4xl mx-auto px-6 py-8 pb-24 md:pb-8">
          <Outlet />
        </main>
        <DonationButton />
      </div>
    </I18nProvider>
  );
}
