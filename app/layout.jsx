import "@styles/globals.css";

import Nav from "@components/Nav";
import Footer from "@components/Footer";
import Provider from "@components/Provider";
import { Toaster } from "react-hot-toast"

export const metadata = {
  title: "Promptmenia",
  description: "Join the Promptmenia Journey: Explore, Create, Share AI-Powered Prompts! ",
};

const RootLayout = ({ children }) => (
  <html lang='en'>
    <body>
      <Provider>
        <div className='main'>
          <div className='gradient' />
        </div>

        <main className='app'>
          <Nav />
          <Toaster />
          {children}
          <Footer />
        </main>

      </Provider>
    </body>
  </html>
);

export default RootLayout;
