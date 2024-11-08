import Navbar from "@/components/Navbar";
import { AuthProvider } from "../context/AuthContext";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <div className="h-24">
        <Navbar />
      </div>

      <Component {...pageProps} />
    </AuthProvider>
  );
}

export default MyApp;
