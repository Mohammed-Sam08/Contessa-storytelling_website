import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Hindustan Contessa | The Indian Muscle",
    description: "A premium scrollytelling experience of the legendary Hindustan Contessa.",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className="bg-[#080808]">
            <body className={inter.className}>{children}</body>
        </html>
    );
}
