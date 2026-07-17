import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Application from "../components/app/Application";
import "./globals.css";

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
                <Application>
                    <div className="flex m-0 w-full h-full">
                        {children}
                    </div>
                </Application>
            </body>
        </html>
    );
}
