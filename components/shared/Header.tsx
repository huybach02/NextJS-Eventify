import {SignedIn, SignedOut, UserButton} from "@clerk/nextjs";
import Link from "next/link";
import React from "react";
import {Button} from "../ui/button";
import NavItem from "./NavItems";
import MobileNav from "./MobileNav";

type Props = {};

const Header = (props: Props) => {
  return (
    <header className="w-full border-b">
      <div className="wrapper flex items-center justify-between">
        <Link href={"/"} className="w-36 text-2xl font-bold text-coral-500">
          Eventify
        </Link>

        <SignedIn>
          <nav className="md:flex-between hidden w-full max-w-xs">
            <NavItem />
          </nav>
        </SignedIn>

        <div className="flex w-32 justify-end gap-3">
          <div className="flex items-center gap-5">
            <SignedIn>
              <UserButton afterSignOutUrl="/" />
              <MobileNav />
            </SignedIn>
          </div>
          <SignedOut>
            <Button asChild className="rounded-md" size={"lg"}>
              <Link href={"/sign-in"}>Login</Link>
            </Button>
          </SignedOut>
        </div>
      </div>
    </header>
  );
};

export default Header;
