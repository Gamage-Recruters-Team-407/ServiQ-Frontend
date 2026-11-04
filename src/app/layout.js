import "@/styles/globals.css";
import Providers from "@/components/common/Providers";

export const metadata = {
  title: "ServiQ - AI-Powered Local Services Marketplace",
  description: "Connect with Top Verified Local Experts for home repairs, cleaning, plumbing, electrical, and more."
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <main>{children}</main>
        </Providers>
      </body>
    </html>
  );
}

