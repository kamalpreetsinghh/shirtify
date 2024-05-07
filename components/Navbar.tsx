"use client";

import {
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
  useAuth,
} from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import ThemeSwitch from "./ThemeSwitch";

const Navbar = () => {
  const { userId } = useAuth();

  return (
    <nav className="navbar">
      <div className="flex gap-8 items-center">
        <Link href={"/"} className="mr-4">
          <Image
            src={"/assets/images/logo.png"}
            alt="logo"
            width={100}
            height={35}
          />
        </Link>
        <Link
          href="/customizations"
          className="text-primary font-semibold text-xl text-hover"
        >
          Explore Designs
        </Link>
        <SignedIn>
          <Link
            href={`/profile/${userId}`}
            className="text-primary font-semibold text-xl text-hover"
          >
            My Designs
          </Link>
        </SignedIn>
      </div>

      <div className="flex justify-center items-center gap-4 sm:gap-6">
        <ThemeSwitch />
        <>
          <SignedOut>
            <div className="rounded-button">
              <SignInButton />
            </div>
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </>
      </div>
    </nav>
  );
};

export default Navbar;
