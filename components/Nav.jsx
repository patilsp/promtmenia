"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";
import { motion } from "framer-motion";

const Nav = () => {
  const { data: session } = useSession();

  const [providers, setProviders] = useState(null);
  const [toggleDropdown, setToggleDropdown] = useState(false);
  const [notificationDropdown, setNotificationDropdown] = useState(false);

  useEffect(() => {
    (async () => {
      const res = await getProviders();
      setProviders(res);
    })();
  }, []);

  return (
    <nav className='flex-between w-full mb-16 pt-3'>
      <Link href='/' className='flex gap-2 flex-center'>
        <Image
          src='/assets/images/logo.svg'
          alt='logo'
          width={30}
          height={30}
          className='object-contain'
        />
        <p className='logo_text'>Promptmenia.ai</p>
      </Link>

      {/* Desktop Navigation */}
      {/* <div className='sm:flex hidden'>
        {session?.user ? (
          <div className='flex gap-3 md:gap-5'>
            <Link href='/create-prompt' className='black_btn'>
              Create Prompt
            </Link>

            <button type='button' onClick={signOut} className='outline_btn'>
              Sign Out
            </button>

            <Link href='/profile'>
              <Image
                src={session?.user.image}
                width={37}
                height={37}
                className='rounded-full'
                alt='profile'
              />
            </Link>
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider) => (
                <button
                  type='button'
                  key={provider.name}
                  onClick={() => {
                    signIn(provider.id);
                  }}
                  className='black_btn'
                >
                  Sign in
                </button>
              ))}
          </>
        )}
      </div> */
      <div className='sm:flex hidden relative'>
      {session?.user ? (

        <div className='flex'>
          <Link href='/create-prompt' className="btn btn-sm black_btn mr-2">
            Create Prompt
          </Link>
          <Image
            src="assets/images/bell.svg"
            width={37}
            height={37}
            className='notification_btn'
            alt='notification'
            onClick={() => setNotificationDropdown(!notificationDropdown)}
          />

        {notificationDropdown && (
          <motion.div
            initial={{
              opacity: 0.6,
              translateY: 8,
              scaleX: 0.8,
              scaleY: 0.6,
            }}
            animate={{ opacity: 1, translateY: 0, scaleX: 1, scaleY: 1 }}
            exit={{ opacity: 0.6, translateY: 8, scaleX: 0.8, scaleY: 0.6 }}
            >
              <div className="absolute right-0 mr-14 z-10 mt-10 w-60 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                <h3 className="p-2">Notification Not available!</h3>
              </div>
              </motion.div>
          )}

          <Image
            src={session?.user.image}
            width={37}
            height={37}
            className='rounded-full'
            alt='profile'
            onClick={() => setToggleDropdown(!toggleDropdown)}
          />

          {toggleDropdown && (
          <motion.div
            initial={{
              opacity: 0.6,
              translateY: 8,
              scaleX: 0.8,
              scaleY: 0.6,
            }}
            animate={{ opacity: 1, translateY: 0, scaleX: 1, scaleY: 1 }}
            exit={{ opacity: 0.6, translateY: 8, scaleX: 0.8, scaleY: 0.6 }}
            >
              <div className="absolute right-0 z-10 mt-10 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                <div class="py-1" role="none">
                  
                  <a class="text-gray-700 block px-4 py-2 text-sm" role="menuitem" tabindex="-1" id="menu-item-0">
                      <Link
                    href='/'
                    className='dropdown_link'
                    onClick={() => setToggleDropdown(false)}
                  >
                    Dashboard
                  </Link>
                  </a>
                  <a class="text-gray-700 block px-4 py-2 text-sm" role="menuitem" tabindex="-1" id="menu-item-1">
                      <Link
                    href='/profile'
                    className='dropdown_link'
                    onClick={() => setToggleDropdown(false)}
                  >
                    My Profile
                  </Link>
                  </a>
                  <a class="text-gray-700 block px-4 py-2 text-sm dropdown_link" role="menuitem" tabindex="-1" id="menu-item-2">Settings</a>
                  <hr className="mt-2 mb-2" />
                  <button
                    type='button'
                    onClick={() => {
                      setToggleDropdown(false);
                      signOut();
                    }}
                    className='text-gray-700 block px-4 py-2 text-sm dropdown_link'
                  >
                    Sign Out
                  </button>
                </div>
              </div>
              </motion.div>
          )}
        </div>
      ) : (
        <>
          {providers &&
            Object.values(providers).map((provider) => (
              <button
                type='button'
                key={provider.name}
                onClick={() => {
                  signIn(provider.id);
                }}
                className='black_btn'
              >
                Sign in
              </button>
            ))}
        </>
      )}
    </div>}

      {/* Mobile Navigation */}
      <div className='sm:hidden flex relative'>
        {session?.user ? (
          <div className='flex'>
            <Link href='/create-prompt' className='black_btn mr-1'>
              Create
            </Link>
            <div className="avatar">
              <Image
                src={session?.user.image}
                width={37}
                height={37}
                className='rounded-full'
                alt='profile'
                onClick={() => setToggleDropdown(!toggleDropdown)}
              />
            </div>
            {toggleDropdown && (
          
              <div className="absolute right-0 z-10 mt-10 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                <div class="py-1" role="none">
                  
                  <a class="text-gray-700 block px-4 py-2 text-sm" role="menuitem" tabindex="-1" id="menu-item-0">
                      <Link
                    href='/'
                    className='dropdown_link'
                    onClick={() => setToggleDropdown(false)}
                  >
                    Dashboard
                  </Link>
                  </a>
                  <a class="text-gray-700 block px-4 py-2 text-sm" role="menuitem" tabindex="-1" id="menu-item-1">
                      <Link
                    href='/profile'
                    className='dropdown_link'
                    onClick={() => setToggleDropdown(false)}
                  >
                    My Profile
                  </Link>
                  </a>
                  <a class="text-gray-700 block px-4 py-2 text-sm dropdown_link" role="menuitem" tabindex="-1" id="menu-item-2">Settings</a>
                  <hr className="mt-2 mb-2" />
                  <button
                    type='button'
                    onClick={() => {
                      setToggleDropdown(false);
                      signOut();
                    }}
                    className='text-gray-700 block px-4 py-2 text-sm dropdown_link'
                  >
                    Sign Out
                  </button>
                </div>
              </div>
            )}
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider) => (
                <button
                  type='button'
                  key={provider.name}
                  onClick={() => {
                    signIn(provider.id);
                  }}
                  className='black_btn'
                >
                  Sign in
                </button>
              ))}
          </>
        )}
      </div>
    </nav>
  );
};

export default Nav;
