import "./globals.css";
import Navbar from "@/components/Navbar";
import SessionProviderWrapper from "@/components/SessionProviderWrapper";

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
      </body>
    </html>
  );
}
