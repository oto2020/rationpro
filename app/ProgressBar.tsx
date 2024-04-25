// ProgressBar.tsx
"use client";
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

export default function ProgressBar() {
  const pathname = usePathname();

  useEffect(() => {
    NProgress.start();
    NProgress.done();

    return () => {
      NProgress.start();
      NProgress.done();
    };
  }, [pathname]);

  return null;
}
