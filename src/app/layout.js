import "./globals.css";
import MainLayout from "./components/layout/MainLayout";

export const metadata = {
  title: "SOTACIB Commercial",
  description: "Application commerciale pour SOTACIB",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: "no",
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body suppressHydrationWarning={true}>
        <MainLayout>{children}</MainLayout>
      </body>
    </html>
  );
}