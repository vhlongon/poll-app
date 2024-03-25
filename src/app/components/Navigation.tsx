import Link from 'next/link';

export const Navigation = () => {
  return (
    <nav className="absolute left-1 top-1">
      <div className="dropdown">
        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h7"
            />
          </svg>
        </div>
        <ul
          tabIndex={0}
          className="menu menu-sm dropdown-content z-[1] p-2 shadow bg-base-100 rounded-box w-52"
        >
          <li>
            <Link href="/home">Home</Link>
          </li>
          <li>
            <Link href="/events">Gatherings</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};
