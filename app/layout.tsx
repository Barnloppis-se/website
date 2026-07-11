import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import DBContext from "@/components/db/db";
import "./globals.css";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "Stor Barnloppis",
    description: "Stor barnloppis förening",
};

export default function RootLayout({ children, }: Readonly<{children: React.ReactNode;}>) {
    return (
        <html
          lang="en"
          className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
        >
            <body className="w-full h-full">
                <AppRouterCacheProvider options={{ enableCssLayer: true }}>
                    <DBContext url={process.env.BACKEND}>
                        <div className="flex m-0 w-full h-full">
                            {children}
                        </div>
                    </DBContext>
                </AppRouterCacheProvider>
            </body>
        </html>
    );
}
