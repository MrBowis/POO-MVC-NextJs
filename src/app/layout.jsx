import "../styles/globals.css";
import { Navbar } from "../components/Navbar";

export const metadata = {
  title: "NextMongo",
  description: "NextMongo is a simple app to manage tasks.",
}

async function RootLayout({ children }) {
  return (
      <html>
        <body>
          <Navbar/>
          <main className="px-5 md:px-0 container mx-auto">{children}</main>
        </body>
      </html>
  );
}

export default RootLayout;
