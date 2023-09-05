"use client";

import Link from "next/link"

import { siteConfig } from "@/config/site"

import { CommandMenu } from "@/components/command-menu"
import { Icons } from "@/components/icons"
import { MainNav } from "@/components/main-nav"
import { MobileNav } from "@/components/mobile-nav"
import { ModeToggle } from "@/components/mode-toggle"
import { Button } from "@/components/ui/button"
import Nav from "@components/Nav"
import { motion } from "framer-motion"

import Lottie from "lottie-react"
import animationData from "app/assets/logo.json"

export function SiteHeader() {

  return (
    <header className=" sticky top-0 z-50 w-full border-b backdrop-blur">
      <div className="container flex h-14 items-center">

      <Link href='/' className='flex gap-2 flex-center'>
          <div style={{ width: '50px', height: '50px' }}>
            <Lottie animationData={animationData} />
          </div>
        <p className='logo_text'>Promptmenia</p>
      </Link>
        <MobileNav />
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <div className="w-full flex-1 md:w-auto md:flex-none">
            <CommandMenu />
          </div>
          <div className="flex items-center gap-2"> 
            <Nav />
          </div>
        </div>
      </div>
    </header>
  )
}
