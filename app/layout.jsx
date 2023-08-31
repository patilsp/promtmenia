import "@styles/globals.css";

import Nav from "@components/Nav";
import Provider from "@components/Provider";
import { Toaster } from "react-hot-toast"

export const metadata = {
  title: "Promptmenia",
  description: "Join the Promptmenia Journey: Explore, Create, Share! ",
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
        </main>
      </Provider>
    </body>
  </html>
);

export default RootLayout;
