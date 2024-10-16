import "@styles/globals.css";
import { fontSans } from "@/lib/fonts"
import { cn } from "@/lib/utils"

import Nav from "@components/Nav";
import Footer from "@components/Footer";
import SessionProvider from "@components/Provider";
import { Toaster } from "react-hot-toast"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { ThemeProvider } from "@/components/theme-provider"


export const metadata = {
  title: "Promptmenia",
  description: "Join the Promptmenia Journey: Explore, Create, Share AI-Powered Prompts! ",
  icons: {
    icon: "/assets/images/logo.svg",
  },
};

const RootLayout = ({ children }) => (
  <html lang='en'>
     <body
          className={cn(
            "min-h-screen  font-sans antialiased",
            fontSans.variable
          )}
        >
      <SessionProvider>
        <div className='main dark:bg-black'>
          <div className='gradient' />
        </div>

        <main className='dark:bg-black'>
         
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <div className="relative flex min-h-screen flex-col">
              <SiteHeader />
                <main className="flex-1">{children}</main>
              <SiteFooter />
            </div>
            <Toaster />
          </ThemeProvider>
        </main>

      </SessionProvider>
    </body>
  </html>
);

export default RootLayout;
