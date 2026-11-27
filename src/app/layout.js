import "@/styles/globals.css";
import { AuthProvider } from "@/context/AuthContext";

export const metadata = {
  title: "ServiQ - Local Services Marketplace",
  description: "AI-Powered Local Services Marketplace"
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <main>{children}</main>
        </AuthProvider>
      </body>
    </html>
  );
}
