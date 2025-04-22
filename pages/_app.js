import '@/styles/globals.css';
import { AuthProvider, useAuth } from '@/context/Authcontext';
import Navbar from '@/components/Navbar';

function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <AppLayout Component={Component} pageProps={pageProps} />
    </AuthProvider>
  );
}

function AppLayout({ Component, pageProps }) {
  const { isAuth, logout } = useAuth();

  return (
    <>
      <Navbar isAuthenticated={isAuth} onLogout={logout} />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
