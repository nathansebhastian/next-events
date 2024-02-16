'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useSession } from 'next-auth/react';
import { signOut } from 'next-auth/react';
import { FaSearch } from 'react-icons/fa';
import Search from './Search';
import { Suspense } from 'react'

const Navbar = () => {
  const { status, data: session } = useSession();

  const toggleMobileSearch = () => {
    var searchDropdown = document.getElementById('searchDropdown');
    searchDropdown.classList.toggle('hidden');
  }

  return (
    <div className='navbar bg-base-100 shadow-md'>
      <div className='navbar-start'>
        <Link href='/' className='btn btn-ghost text-xl'>
          Next-Events
        </Link>
      </div>
      <div className='navbar-center'>
        <div className='hidden md:block w-[32rem]'>
          <Suspense>
            <Search />
          </Suspense>
        </div>
        <div className='md:hidden'>
          <div
            id='searchIcon'
            className='btn btn-ghost'
            onClick={toggleMobileSearch}
          >
            <FaSearch size="1.5rem" />
          </div>
          <div
            id='searchDropdown'
            className='hidden absolute mt-2 left-1/4 bg-white p-2 rounded shadow-md w-72'
          >
            <Suspense>
              <Search />
            </Suspense>
          </div>
        </div>
      </div>
      <div className='navbar-end'>
        {status === 'authenticated' && (
          <div className='dropdown dropdown-end'>
            <div
              tabIndex={0}
              role='button'
              className='btn btn-ghost btn-circle avatar'
            >
              <div className='w-10 rounded-full'>
                <Image
                  alt='Profile Picture'
                  src={session.user.image ?? '/default-user.png'}
                  width={60}
                  height={60}
                />
              </div>
            </div>
            <ul
              tabIndex={0}
              className='mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52'
            >
              <li>
                <Link href='/profile'>Profile</Link>
              </li>
              <li>
                <Link href='/events/create'>Create Event</Link>
              </li>
              <li>
                <Link href='' onClick={signOut}>
                  Sign Out
                </Link>
              </li>
            </ul>
          </div>
        )}
        {status === 'unauthenticated' && (
          <div className='flex-none'>
            <ul className='menu menu-horizontal px-1'>
              <li>
                <Link href='/login'>Login</Link>
              </li>
              <li>
                <Link href='/signup'>Sign Up</Link>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
