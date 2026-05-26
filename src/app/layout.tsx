import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Nexora | פתרונות ייבוא ולוגיסטיקה חכמים לעסקים",
  description: "חוסכים עד 50% מעלויות הרכש שלכם. מעבירים את הרכש לייבוא ישיר מוגן ומנוהל מאסיה, אירופה וארה\"ב – באפס דאגות ובאחריות מלאה מקצה לקצה.",
  keywords: "ייבוא, לוגיסטיקה, ייבוא מסין, עמילות מכס, הוזלת רכש, שילוח בינלאומי, שילוח ימי, שילוח אווירי",
  authors: [{ name: "Nexora Logistics" }],
  openGraph: {
    title: "Nexora | פתרונות ייבוא ולוגיסטיקה חכמים לעסקים",
    description: "חוסכים עד 50% מעלויות הרכש שלכם. מעבירים את הרכש לייבוא ישיר מוגן ומנוהל מאסיה, אירופה וארה\"ב – באפס דאגות ובאחריות מלאה מקצה לקצה.",
    url: "https://nexora.co.il",
    siteName: "Nexora",
    locale: "he_IL",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="he" dir="rtl" className="scroll-smooth">
      <head>
        <link rel="icon" href="/logo.png" />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}
