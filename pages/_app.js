import '@/styles/globals.css';
import { AuthProvider } from '@/context/Authcontext';
import Navbar from '@/components/Navbar';
import { useAuth } from '@/context/Authcontext';

function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <LayoutWrapper Component={Component} pageProps={pageProps} />
    </AuthProvider>
  );
}

function LayoutWrapper({ Component, pageProps }) {
  const { isAuth, logout } = useAuth();
  return (
    <>
      <Navbar isAuthenticated={isAuth} onLogout={logout} />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
