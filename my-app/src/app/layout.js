
import { Toaster } from "@/components/ui/toaster";
import "./globals.css";
import Navbar from "@/components/Navbar";





export default function RootLayout({ children }) {
  return (
    <html lang="en">

      <body

        className={` antialiased`}
      ><Navbar />

        {children}
        <Toaster/>
      </body>
    </html>
  );
}
