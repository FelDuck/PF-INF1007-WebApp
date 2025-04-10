// pages/index.js
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '@/context/Authcontext'; // ou '../context/AuthContext'

export default function HomePage() {
  const { isAuth } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // Redirige automatiquement
    if (isAuth) {
      router.replace('/dashboard');
    } else {
      router.replace('/login');
    }
  }, [isAuth]);

  return <p>Redirection...</p>;
}
