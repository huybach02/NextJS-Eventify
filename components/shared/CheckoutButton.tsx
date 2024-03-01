"use client";

import {IEvent} from "@/lib/database/models/event.model";
import {SignedIn, SignedOut, useUser} from "@clerk/nextjs";
import React from "react";
import {Button} from "../ui/button";
import Link from "next/link";
import Checkout from "./Checkout";

type Props = {
  event: IEvent;
};

const CheckoutButton = ({event}: Props) => {
  const {user} = useUser();

  const userId = user?.publicMetadata.userId as string;

  const closedEvent = new Date(event.endDateTime) < new Date();

  return (
    <div className="flex items-center gap-3">
      {closedEvent && (
        <span className="p-3 bg-red-500 rounded-md text-white cursor-default">
          Tickets are sold out
        </span>
      )}
      {!closedEvent && (
        <>
          <SignedOut>
            <Button size={"lg"}>
              <Link href={"/sign-in"}>Get Ticket</Link>
            </Button>
          </SignedOut>
          <SignedIn>
            <Checkout event={event} userId={userId} />
          </SignedIn>
        </>
      )}
    </div>
  );
};

export default CheckoutButton;
