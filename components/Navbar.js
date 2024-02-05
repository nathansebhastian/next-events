import Link from 'next/link';

export default function Navbar() {
  return (
    <div className='navbar bg-base-100 shadow-md'>
      <div className='navbar-start'>
        <Link href='/' className='btn btn-ghost text-xl'>
          Next-Events
        </Link>
      </div>
      <div className='navbar-center'>
        Search Bar here
      </div>
      <div className='navbar-end'>
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
      </div>
    </div>
  );
};
