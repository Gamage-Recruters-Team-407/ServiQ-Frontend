import "@/styles/globals.css";
import Providers from "@/components/layout/Providers";
export const metadata = { title: "serviQ — Local Services Marketplace", description: "Discover trusted local professionals and manage every service in one place." };
export default function RootLayout({ children }) { return <html lang="en"><body><Providers>{children}</Providers></body></html>; }
