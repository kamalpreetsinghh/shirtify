"use client";

import { SignedIn, SignedOut, UserButton, useAuth } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import ThemeSwitch from "./ThemeSwitch";
import { navLinks } from "@/lib/constants";
import { useEffect, useState } from "react";

const Navbar = () => {
  const { userId } = useAuth();
  const [redirectTo, setRedirectTo] = useState<string>("/");

  useEffect(() => {
    setRedirectTo(window.location.pathname);
  }, []);

  return (
    <nav className="navbar">
      <div className="flex gap-8 items-center">
        <Link href={"/"} className="mr-4">
          <Image
            src={"/assets/images/logo.png"}
            alt="logo"
            width={100}
            height={35}
            priority={true}
            style={{ objectFit: "cover" }}
          />
        </Link>
        {navLinks.map((link) => {
          return (
            <Link
              href={link.href}
              className="text-primary font-semibold text-xl text-hover"
              key={link.href}
              onClick={() => setRedirectTo(link.href)}
            >
              {link.title}
            </Link>
          );
        })}

        <SignedIn>
          <Link
            href={`/profile/${userId}`}
            className="text-primary font-semibold text-xl text-hover"
            key="profile"
            onClick={() => setRedirectTo(`/profile/${userId}`)}
          >
            My Designs
          </Link>
        </SignedIn>
      </div>

      <div className="flex justify-center items-center gap-4 sm:gap-6">
        <ThemeSwitch />
        <>
          <SignedOut>
            <div className="rounded-button bg-primary">
              <Link
                href={`/sign-in?redirectTo=${encodeURIComponent(redirectTo)}`}
              >
                Sign In
              </Link>
            </div>
          </SignedOut>
          <SignedIn>
            <UserButton afterSignOutUrl={`${encodeURIComponent(redirectTo)}`} />
          </SignedIn>
        </>
      </div>
    </nav>
  );
};

export default Navbar;
