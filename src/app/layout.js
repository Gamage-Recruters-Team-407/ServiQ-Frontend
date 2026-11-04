import Providers from "@/components/common/Providers";
import "@/styles/globals.css";

export const metadata = {
  title: "ServiQ - Local Services Marketplace",
  description: "AI-Powered Local Services Marketplace",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
