'use client';

import { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { AuthContext } from '@/providers/AuthProvider';
import Loading from '@/app/loading';

const PrivateRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false); // for hydration issues

  useEffect(() => {
    setIsMounted(true); // Prevent hydration mismatch

    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  if (!isMounted || loading || !user) {
    return <Loading />;
  }

  return children;
};

export default PrivateRoute;
