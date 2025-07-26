'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { User, Settings, LogOut, Plus, HelpCircle, Mail } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuShortcut,
} from "@/components/ui/dropdown-menu"
import { signIn, signOut, useSession, getProviders } from "next-auth/react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button"

const UserAccountNav = () => {
  const { data: session } = useSession();
  const [providers, setProviders] = useState<any>(null);

  useEffect(() => {
    (async () => {
      const res = await getProviders();
      setProviders(res);
    })();
  }, []);

  return (
    <>
      {session?.user ? (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center space-x-2 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              <Image
                src={session.user.image || "/assets/images/avatar.jpg"}
                width={32}
                height={32}
                className='rounded-full border-2 border-gray-200 dark:border-gray-700'
                alt='profile'
              />
            </motion.button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className='w-64 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-xl rounded-xl' align='end'>
            <DropdownMenuLabel className="p-4">
              <div className="flex items-center space-x-3">
                <Image
                  src={session.user.image || "/assets/images/avatar.jpg"}
                  width={48}
                  height={48}
                  className="rounded-full border-2 border-gray-200 dark:border-gray-600"
                  alt="Profile"
                />
                <div>
                  <p className="font-semibold text-gray-900 dark:text-white">
                    {session.user.username || session.user.name}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {session.user.email}
                  </p>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator className="bg-gray-200 dark:bg-gray-700" />
            
            <div className="p-2">
              <DropdownMenuItem asChild>
                <Link href="/profile" className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors cursor-pointer">
                  <User className="w-4 h-4 text-gray-600 dark:text-gray-300" />
                  <span>My Profile</span>
                </Link>
              </DropdownMenuItem>
              
              <DropdownMenuItem asChild>
                <Link href="/create-prompt" className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors cursor-pointer">
                  <Plus className="w-4 h-4 text-gray-600 dark:text-gray-300" />
                  <span>Create Prompt</span>
                </Link>
              </DropdownMenuItem>
              
              <DropdownMenuItem asChild>
                <Link href="/settings" className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors cursor-pointer">
                  <Settings className="w-4 h-4 text-gray-600 dark:text-gray-300" />
                  <span>Settings</span>
                </Link>
              </DropdownMenuItem>
              
              <DropdownMenuItem asChild>
                <Link href="/help" className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors cursor-pointer">
                  <HelpCircle className="w-4 h-4 text-gray-600 dark:text-gray-300" />
                  <span>Help & FAQ</span>
                </Link>
              </DropdownMenuItem>
            </div>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className='h-8 w-full cursor-pointer bg-black text-center font-bold text-white dark:bg-white dark:text-slate-700'
              onClick={() => {
                signOut({
                  callbackUrl: `${window.location.origin}/`,
                });
              }}
            >
              Sign out
              <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
            </DropdownMenuItem>
           
           
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <>
          {providers &&
            Object.values(providers).map((provider: any) => (
              <Button
                type='button'
                key={provider.name}
                onClick={() => signIn(provider.id)}
                className='border shadow'
              >
                Sign In
              </Button>
            ))}
        </>
      )}
    </>
  );
}

export default UserAccountNav;
