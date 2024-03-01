import Link from "next/link";
import React from "react";

type Props = {};

const Footer = (props: Props) => {
  return (
    <footer className="w-full border-t">
      <div className="wrapper flex flex-center flex-col flex-between gap-5">
        <Link
          href={"/"}
          className="text-center text-2xl font-bold text-coral-500"
        >
          Eventify
        </Link>
        <p className="text-center">
          2024 Eventify. All Rights reserved.
          <br />
          Made by Huy Bach
        </p>
      </div>
    </footer>
  );
};

export default Footer;
