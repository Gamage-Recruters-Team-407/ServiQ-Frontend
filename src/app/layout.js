import "@/styles/globals.css";

export const metadata = {
  title: "ServiQ - Local Services Marketplace",
  description: "AI-Powered Local Services Marketplace",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-[#FFFFFF] text-[#0F172A] antialiased">
        {children}
      </body>
    </html>
  );
}
