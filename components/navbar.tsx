'use client';
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut, useSession } from "next-auth/react";

declare module "next-auth" {
  interface User {
    role?: string;
  }
  interface Session {
    user?: User;
  }
}

export default function Navbar() {
  const { data: session } = useSession();
  const pathname = usePathname();

  const navLinkClass = (path: string) =>
    `text-[11px] font-bold uppercase tracking-[0.1em] transition-all pb-1 border-b-2 ${pathname === path
      ? "border-white text-white"
      : "border-transparent text-blue-100 hover:text-white hover:border-blue-200"
    }`;

  return (
    <nav className="w-full shadow-lg">
      {/* Top Bar */}
      <div className="bg-[#08335e] text-white">
        <div className="max-w-7xl mx-auto px-8 py-5 flex items-center justify-between gap-8">
          <Link href="/" className="flex items-center gap-5 shrink-0">
            <div className="bg-white p-1 rounded-sm shadow-inner">
              <Image src="/uni-logo.jpg" width={48} height={48} alt="UIST Logo" />
            </div>
            <div className="border-l border-blue-400/30 pl-5 hidden lg:block">
              <h1 className="text-sm font-serif font-bold leading-tight tracking-wide">
                University of Information Science and Technology <br />
                <span className="text-blue-200 italic font-medium text-xs">
                  "St. Paul the Apostle"
                </span>
              </h1>
            </div>
          </Link>

          {/* Global Search */}
          <form className="flex-1 max-w-sm relative">
            <input
              type="text"
              placeholder="Search repository (Title, Author, DOI...)"
              className="w-full bg-[#062a4d] border border-blue-800/50 text-white text-sm px-4 py-2.5 rounded-sm focus:outline-none focus:ring-1 focus:ring-blue-400 placeholder:text-blue-300/50 transition-all"
            />
            <button type="submit" className="absolute right-3 top-2.5 text-blue-300 hover:text-white">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
          </form>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-[#062a4d] border-t border-white/5">
        <div className="max-w-7xl mx-auto px-8 flex items-center justify-between">
          <ul className="flex gap-10 py-3.5">
            <li><Link href="/" className={navLinkClass("/")}>Home</Link></li>
            <li><Link href="/browse" className={navLinkClass("/browse")}>Browse</Link></li>
            <li><Link href="/about" className={navLinkClass("/about")}>About</Link></li>
            <li><Link href="/help" className={navLinkClass("/help")}>Help</Link></li>
            {(session?.user as any)?.role === "admin" && (
              <li><Link href="/admin/buffer" className={navLinkClass("/admin/buffer")}>Editorial Buffer</Link></li>
            )}
          </ul>

          <div className="flex items-center">
            {session ? (
              <div className="flex items-center gap-8">
                {/* Dynamic Links for Logged In Users */}
                <ul className="flex gap-6 items-center mr-2">
                  <li>
                    <Link href="/deposit" className={navLinkClass("/deposit")}>
                      New Deposit
                    </Link>
                  </li>
                  <li>
                    {/* Link directly to their EPrints Manage page */}
                    <Link href="#" className={navLinkClass("/manage")}>
                      Manage Deposits
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className={navLinkClass("/profile")}>
                      Profile
                    </Link>
                  </li>
                </ul>

                <div className="flex items-center gap-4">
                  <span className="text-[10px] font-bold text-blue-200 uppercase tracking-widest">
                    User: <span className="text-white ml-1">{session.user?.name}</span>
                  </span>
                  <button
                    onClick={() => signOut({ callbackUrl: "/" })}
                    className="text-[10px] font-bold uppercase tracking-widest text-[#FF0000] hover:text-red-100 transition-colors hover:cursor-pointer"
                  >
                    [ Logout ]
                  </button>
                </div>
              </div>
            ) : (
              <Link href="/login" className={navLinkClass("/login")}>
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
