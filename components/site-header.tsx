"use client";

import Link from "next/link";
import Image from "next/image";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";
import { CommandMenu } from "@/components/command-menu";
import { Icons } from "@/components/icons";
import { MainNav } from "@/components/main-nav";
import { MobileNav } from "@/components/mobile-nav";
import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import { useRouter } from 'next/navigation'
import { NavbarDemo } from "@/components/NavbarDemo"
import UserAccountNav from '@/components/UserAccountNav';
// import logoImage from '../public/images/logo.webp';


export function SiteHeader() {

  return (
    <header className="supports-backdrop-blur:bg-background/60 sticky top-0 z-50 w-full shadow backdrop-blur dark:bg-slate-900 dark:text-white">
      <div className="max-w-70 flex justify-between w-full h-14 items-center px-2">
        <div className="mt-1">
          <Link href="/">
            <Image
              src="/assets/images/logo.svg"
              className="object-contain "
              width={25}
              height={25}
              alt="logo image"            
            />
            
          </Link>
        </div>

        <div className="flex items-center justify-end gap-2"> 
          <a className="text-gray-700 block px-4 py-2 text-sm">
              <Link href='/create-prompt' className='dropdown_link'>
                Create Prompt
              </Link>
            </a>         
          <ModeToggle />
          <div className="mt-2 hidden md:block">
            <CommandMenu />
          </div>
        <div className="mt-1">
          <UserAccountNav />            
        </div>
          
        </div>
      </div>
    </header>
  );
}
