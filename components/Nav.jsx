"use client";
import React from 'react';
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";
import { motion, AnimatePresence } from "framer-motion";
import { User, Settings, LogOut, Plus, Home, Search, Bell } from "lucide-react";

import Lottie from "lottie-react";
import animationData from "app/assets/logo.json";
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const Nav = () => {
  const { data: session } = useSession();
  const [providers, setProviders] = useState(null);

  useEffect(() => {
    (async () => {
      const res = await getProviders();
      setProviders(res);
    })();
  }, []);

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="sticky top-0 z-50 w-full border-b border-gray-200 dark:border-gray-800 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo Section */}
          <motion.div 
            className="flex items-center space-x-3"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <Link href="/" className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl flex items-center justify-center">
                <Lottie 
                  animationData={animationData} 
                  className="w-6 h-6" 
                  loop={true}
                />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                PromptMenia
              </span>
            </Link>
          </motion.div>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-1">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link href="/">
                <Button variant="ghost" className="flex items-center space-x-2 text-gray-600 hover:text-purple-600 dark:text-gray-300 dark:hover:text-purple-400">
                  <Home className="w-4 h-4" />
                  <span>Home</span>
                </Button>
              </Link>
            </motion.div>
            
            {session?.user && (
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link href="/create-prompt">
                  <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white shadow-lg hover:shadow-xl transition-all duration-300">
                    <Plus className="w-4 h-4 mr-2" />
                    Create Prompt
                  </Button>
                </Link>
              </motion.div>
            )}
          </div>

          {/* User Section */}
          <div className="flex items-center space-x-4">
            {session?.user ? (
              <div className="flex items-center space-x-3">
                {/* Notifications */}
                <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                  <Button variant="ghost" size="sm" className="relative p-2">
                    <Bell className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                    <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
                  </Button>
                </motion.div>

                {/* User Dropdown */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex items-center space-x-3 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                    >
                      <Image
                        src={session.user.image || '/assets/images/avatar.jpg'}
                        width={40}
                        height={40}
                        className="rounded-full border-2 border-gray-200 dark:border-gray-700"
                        alt="Profile"
                      />
                      <div className="hidden md:block text-left">
                        <p className="text-sm font-medium text-gray-900 dark:text-white">
                          {session.user.username || session.user.name}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          {session.user.email}
                        </p>
                      </div>
                    </motion.button>
                  </DropdownMenuTrigger>
                  
                  <DropdownMenuContent 
                    align="end" 
                    className="w-64 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-xl rounded-xl"
                  >
                    <DropdownMenuLabel className="p-4">
                      <div className="flex items-center space-x-3">
                        <Image
                          src={session.user.image || '/assets/images/avatar.jpg'}
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
                        <Link href="/settings" className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors cursor-pointer">
                          <Settings className="w-4 h-4 text-gray-600 dark:text-gray-300" />
                          <span>Settings</span>
                        </Link>
                      </DropdownMenuItem>
                      
                      <div className="md:hidden">
                        <DropdownMenuSeparator className="my-2 bg-gray-200 dark:bg-gray-700" />
                        <DropdownMenuItem asChild>
                          <Link href="/create-prompt" className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors cursor-pointer">
                            <Plus className="w-4 h-4 text-gray-600 dark:text-gray-300" />
                            <span>Create Prompt</span>
                          </Link>
                        </DropdownMenuItem>
                      </div>
                    </div>
                    
                    <DropdownMenuSeparator className="bg-gray-200 dark:bg-gray-700" />
                    
                    <div className="p-2">
                      <DropdownMenuItem 
                        onClick={() => signOut()}
                        className="flex items-center space-x-3 p-3 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 text-red-600 dark:text-red-400 transition-colors cursor-pointer"
                      >
                        <LogOut className="w-4 h-4" />
                        <span>Sign Out</span>
                      </DropdownMenuItem>
                    </div>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                {providers &&
                  Object.values(providers).map((provider) => (
                    <motion.div
                      key={provider.name}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Button
                        onClick={() => signIn(provider.id)}
                        className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white shadow-lg hover:shadow-xl transition-all duration-300"
                      >
                        Sign In
                      </Button>
                    </motion.div>
                  ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.nav>
  );
};

export default Nav;
