import "@styles/globals.css";

import Nav from "@components/Nav";
import Footer from "@components/Footer";
import SessionProvider from "@components/Provider";
import { Toaster } from "react-hot-toast"
import { SiteHeader } from "@/components/site-header"

export const metadata = {
  title: "Promptmenia",
  description: "Join the Promptmenia Journey: Explore, Create, Share AI-Powered Prompts! ",
  icons: {
    icon: "/assets/images/logo1.svg",
  },
};

const RootLayout = ({ children }) => (
  <html lang='en'>
    <body>
      <SessionProvider>
        <div className='main'>
          <div className='gradient' />
        </div>

        <main className='app'>
          {/* <Nav /> */}
          <Toaster />

          <SiteHeader />
          {children}
          <Footer />
        </main>

      </SessionProvider>
    </body>
  </html>
);

export default RootLayout;
