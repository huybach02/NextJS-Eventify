import Link from "next/link";
import React from "react";

type Props = {};

const Footer = (props: Props) => {
  return (
    <footer className="w-full border-t">
      <div className="wrapper flex flex-center flex-col flex-between gap-5">
        <Link href={"/"} className="w-36 text-2xl font-bold text-coral-500">
          Eventify
        </Link>
        <p>2024 Eventify. All Rights reserved. Made by Huy Bach</p>
      </div>
    </footer>
  );
};

export default Footer;
