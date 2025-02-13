import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../styles/globals.css";
import Script from "next/script";
const googleApiKey : any = process.env.NEXT_PUBLIC_GOOGLE_API_KEY;

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Trouvaille - Trip Planner",
  description: "Plan your next trip with Trouvaille.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <Script
          src={`https://maps.googleapis.com/maps/api/js?key=${googleApiKey}&libraries=places`}
          strategy="beforeInteractive"
        />
      </head>
      <body className={inter.className} suppressHydrationWarning={true}>{children}</body>
    </html>
  );
}
