
import { Toaster } from "@/components/ui/toaster";
import "./globals.css";
import Navbar from "@/components/Navbar";





export default function RootLayout({ children }) {
  return (
    <html lang="en">
<<<<<<< HEAD
      <body>
=======
    
      <body

        className={` antialiased`}
      ><Navbar />
>>>>>>> 2fb437f3b998da751560ad49a7cfaebc41cf3c5c
        {children}
        <Toaster/>
      </body>
    </html>
  );
}
