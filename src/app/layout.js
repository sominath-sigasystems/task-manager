import "./globals.css";
import Navbar from "@/components/Navbar";
import SessionProviderWrapper from "@/components/SessionProviderWrapper";
import { Toaster } from "sonner";

export const metadata = {
  title: "Task Manager",
  description: "Mini Jira built with Next.js",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <SessionProviderWrapper>
          <Navbar />
          <main>{children}</main>
        </SessionProviderWrapper>
        <Toaster richColors position="top-right" />
      </body>
    </html>
  );
}
