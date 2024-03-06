import CheckoutButton from "@/components/shared/CheckoutButton";
import Collection from "@/components/shared/Collection";
import {getAllCategories} from "@/lib/actions/category.action";
import {
  getEventById,
  getRelatedEventsByCategory,
} from "@/lib/actions/event.action";
import {formatDateTime} from "@/lib/utils";
import {SearchParamProps} from "@/types";
import Image from "next/image";
import React from "react";
import {FaCalendarAlt} from "react-icons/fa";
import {FaLocationDot} from "react-icons/fa6";

const EventDetail = async ({params: {id}, searchParams}: SearchParamProps) => {
  await getAllCategories();
  const event = await getEventById(id);

  const relatedEvents = await getRelatedEventsByCategory({
    categoryId: event.category._id,
    eventId: event._id,
    page: 1,
  });

  return (
    <>
      <section className="flex justify-center bg-primary-50">
        <div className="wrapper grid grid-cols-1 md:grid-cols-2 2xl:max-w-7xl">
          <Image
            src={event.imageUrl}
            alt="image"
            width={1000}
            height={1000}
            className="h-full min-h-[300px] object-cover object-center rounded-md"
          />
          <div className="flex w-full flex-col gap-3 md:pl-8">
            <div className="flex flex-col gap-5">
              <h2 className="h2-bold mt-5">{event.title}</h2>
              <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
                <div className="flex gap-5 md:border-r md:pr-5">
                  <p className="p-bold-20 rounded-full bg-primary-500 text-white px-5 py-1">
                    {event.isFree ? "FREE" : `$${event.price}`}
                  </p>
                  <p className="p-medium-18 rounded-full bg-grey-500/20 px-5 py-1 text-gray-500">
                    {event.category.name}
                  </p>
                </div>
                <p className="p-medium-18 ">
                  by:{" "}
                  <span className="text-primary-500">
                    {event.organizer.firstName} {event.organizer.lastName}
                  </span>
                </p>
              </div>
            </div>
            <div className="flex flex-col gap-3 mt-3">
              <div className="flex gap-3 items-center">
                <span className="text-red-400">
                  <FaCalendarAlt size={18} />
                </span>
                <div>
                  <p className="flex items-center gap-3">
                    <strong className="text-primary-500">From:</strong>{" "}
                    <span>
                      {formatDateTime(event.startDateTime).dateOnly} /{" "}
                      {formatDateTime(event.startDateTime).timeOnly}
                    </span>
                  </p>
                  <p className="flex items-center gap-9">
                    <strong className="text-primary-500">To:</strong>{" "}
                    <span>
                      {formatDateTime(event.endDateTime).dateOnly} /{" "}
                      {formatDateTime(event.endDateTime).timeOnly}
                    </span>
                  </p>
                </div>
              </div>
              <div className="p-regular-20 flex items-center gap-3">
                <span className="text-red-400">
                  <FaLocationDot />
                </span>
                <p>{event.location}</p>
              </div>
            </div>
            <div className="flex flex-col ">
              <p className="p-bold-20 text-primary-500">Description:</p>
              <p className=" text-justify">{event.description}</p>
            </div>
            <div className="flex flex-col">
              <p className="p-bold-20 text-primary-500">More information:</p>
              <p className="">
                <a href={event.url} target="_blank">
                  {event.url}
                </a>
              </p>
            </div>
            <CheckoutButton event={event} />
          </div>
        </div>
      </section>

      <section className="wrapper my-8 flex flex-col gap-8">
        <h2 className="h5-bold">Events you might like</h2>
        <Collection
          data={relatedEvents?.data}
          emptyTitle="No Events Found"
          emptyStateSubtext="Please come back later"
          collectionType="All_Events"
          limit={3}
          page={searchParams?.page as string}
          totalPages={relatedEvents?.totalPages}
        />
      </section>
    </>
  );
};

export default EventDetail;
