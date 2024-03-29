import {IEvent} from "@/lib/database/models/event.model";
import {formatDateTime} from "@/lib/utils";
import {auth} from "@clerk/nextjs";
import Link from "next/link";
import React from "react";
import {FaCalendarAlt, FaUserTie, FaEdit} from "react-icons/fa";
import {FaLocationDot} from "react-icons/fa6";
import {DeleteConfirm} from "./DeleteConfirm";
import {FaRegCheckCircle} from "react-icons/fa";

type Props = {
  event: IEvent;
  hasOrderLink?: boolean;
  hidePrice?: boolean;
  isPaid?: boolean;
};

const Card = ({event, hasOrderLink, hidePrice, isPaid}: Props) => {
  const {sessionClaims} = auth();
  const userId = sessionClaims?.userId as string;

  const isCreator = userId === event.organizer._id.toString();

  return (
    <div className="group relative flex min-h-[380px] w-full max-w-[400px] flex-col overflow-hidden rounded-md bg-gray-50 shadow-md transition-all hover:shadow-xl md:min-h-[440px] z-1">
      <div
        style={{backgroundImage: `url(${event.imageUrl})`}}
        className="flex-center flex-grow bg-cover bg-center"
      ></div>
      {isCreator && !hidePrice && (
        <div className="absolute right-2 top-2 flex flex-col gap-3 rounded-md bg-white shadow-md transition-all p-2">
          <Link href={`events/${event._id}/update`} className="mx-auto ">
            <span className="text-blue-500">
              <FaEdit size={18} />
            </span>
          </Link>
          <DeleteConfirm eventId={event._id} />
        </div>
      )}
      <div className="flex min-h-[230px] flex-col gap-2 px-5 py-3 ">
        <div className="flex items-center gap-3">
          {!hidePrice && (
            <span className="bg-primary-500 px-5 py-1 rounded-full text-white">
              {event.isFree ? "FREE" : `$${event.price}`}
            </span>
          )}
          <span className="bg-gray-300 px-5 py-1 rounded-full text-gray-500 line-clamp-1">
            {event.category.name.length > 10
              ? event.category.name.slice(1, 10) + "..."
              : event.category.name}
          </span>
          {isPaid && (
            <span className="absolute top-2 left-2 z-10 shadow-md px-4 py-1 bg-green-600 text-white rounded-full flex items-center gap-2">
              <FaRegCheckCircle size={20} />
              Paid
            </span>
          )}
        </div>
        <Link href={`/events/${event._id}`}>
          <p className="font-bold text-2xl text-primary-500">
            {event.title.length > 55
              ? event.title.slice(1, 52) + "..."
              : event.title}
          </p>
        </Link>
        <p className="flex gap-3 items-center ">
          <span className="text-red-400">
            <FaCalendarAlt />
          </span>
          Start at: {formatDateTime(event.startDateTime).dateTime}
        </p>
        <p className="flex gap-3 items-center ">
          <span className="text-red-400">
            <FaLocationDot />
          </span>
          {event.location.length > 55
            ? event.location.slice(1, 52) + "..."
            : event.location}
        </p>
        <p className="flex gap-3 items-center ">
          <span className="text-red-400">
            <FaUserTie />
          </span>
          {event.organizer.firstName} {event.organizer.lastName}
        </p>
        {hasOrderLink && (
          <Link
            href={`orders?eventId=${event._id}`}
            className="p-1 border border-primary-500 text-center rounded-md"
          >
            <p>Order Details</p>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Card;
