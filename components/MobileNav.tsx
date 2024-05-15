"use client";

import { SignedIn, SignedOut, UserButton, useAuth } from "@clerk/nextjs";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "./shadcn/ui/sheet";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import ThemeSwitch from "./ThemeSwitch";
import { TbMenuDeep } from "react-icons/tb";

const MobileNav = () => {
  const { userId } = useAuth();

  const pathname = usePathname();

  return (
    <header className="mobile-nav">
      <Link href="/" className="flex items-center gap-2 md:py-2">
        <Image
          src={"/assets/images/logo.png"}
          alt="logo"
          width={100}
          height={35}
        />
      </Link>
      <nav className="flex gap-4">
        <SignedIn>
          <ThemeSwitch />
          <UserButton afterSignOutUrl="/" />

          <Sheet>
            <SheetTrigger>
              <TbMenuDeep className="w-6 h-6" color="#F50056" />
            </SheetTrigger>
            <SheetContent className="sheet-content sm:w-64 sheet-background-color">
              <Image
                src={"/assets/images/logo.png"}
                alt="logo"
                width={100}
                height={35}
                priority={true}
                style={{ objectFit: "cover" }}
              />

              <ul className="header-nav_elements flex flex-col">
                <SheetClose asChild>
                  <Link
                    href="/customizations"
                    className="text-primary font-semibold text-xl text-hover"
                  >
                    Explore Designs
                  </Link>
                </SheetClose>

                <SignedIn>
                  <SheetClose asChild>
                    <Link
                      href={`/profile/${userId}`}
                      className="text-primary font-semibold text-xl text-hover"
                    >
                      My Designs
                    </Link>
                  </SheetClose>
                </SignedIn>
              </ul>
            </SheetContent>
          </Sheet>
        </SignedIn>
        <SignedOut>
          <ThemeSwitch />
        </SignedOut>
      </nav>
    </header>
  );
};

export default MobileNav;
