"use client";

import {headerLinks} from "@/constant";
import Link from "next/link";
import {usePathname} from "next/navigation";
import React from "react";

type Props = {};

const NavItems = (props: Props) => {
  const pathname = usePathname();

  return (
    <ul className="flex md:flex-between w-full flex-col gap-8 md:flex-row items-center md:items-start">
      {headerLinks.map((item) => (
        <li
          key={item.label}
          className={`${
            pathname === item.route &&
            "text-primary-500 border-b-4 border-b-primary-500"
          } font-semibold pb-1`}
        >
          <Link href={item.route}>{item.label}</Link>
        </li>
      ))}
    </ul>
  );
};

export default NavItems;
