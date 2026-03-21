import type { Metadata } from "next";
import "../src/index.css";
import { Providers } from "@/components/providers";

export const metadata: Metadata = {
  title: "BOCRA Digital Services",
  description: "BOCRA digital services portal prototype for public, operator, and admin workflows.",
  icons: {
    icon: "/icon.svg",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
