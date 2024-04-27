import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import ThemeSwitch from "./ThemeSwitch";

const Navbar = () => {
  return (
    <nav className="flex justify-between items-center w-full py-4 gap-4 px-6 sm:px-24">
      <Link href={"/"}>
        <Image
          src={"/assets/images/logo.png"}
          alt="logo"
          width={100}
          height={35}
        />
      </Link>

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
