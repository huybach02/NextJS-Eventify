import {Sheet, SheetContent, SheetTrigger} from "@/components/ui/sheet";
import Link from "next/link";
import {IoMenu} from "react-icons/io5";
import {Separator} from "@/components/ui/separator";
import NavItems from "./NavItems";

type Props = {};

const MobileNav = (props: Props) => {
  return (
    <nav className="md:hidden">
      <Sheet>
        <SheetTrigger className="align-middle">
          <span className="text-primary">
            <IoMenu size={30} />
          </span>
        </SheetTrigger>
        <SheetContent className="flex flex-col bg-white gap-6 md:hidden">
          <Link href={"/"} className="w-36 text-2xl font-bold text-coral-500">
            Eventify
          </Link>
          <Separator />
          <NavItems />
        </SheetContent>
      </Sheet>
    </nav>
  );
};

export default MobileNav;
