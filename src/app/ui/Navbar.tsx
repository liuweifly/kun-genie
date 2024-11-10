'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { usePathname, useSearchParams } from 'next/navigation';

export default function Navbar() {

  const pathname = usePathname();
  const searchParams = useSearchParams();

  return (
    <header>
      <nav
        className={`w-full md:static md:text-sm`}
      >
        <div className="custom-screen items-center mx-auto md:flex p-6">
          <div className="flex items-center justify-between py-3 md:py-5 md:block">
          <Link href="/" className="flex items-center gap-3">
            <img
              src="/box-light.svg"
              alt="logo"
              className="w-8 h-8 block dark:hidden"
            />
            <img
              src="/box-dark.svg"
              alt="logo"
              className="w-8 h-8 hidden dark:block"
            />
            <div className="font-bold text-lg text-black dark:text-white">好运盒子</div>
          </Link>
          </div>
        </div>
      </nav>
    </header>
  );
}