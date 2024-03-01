import Collection from "@/components/shared/Collection";
import {Button} from "@/components/ui/button";
import {getEventsByUser} from "@/lib/actions/event.action";
import {auth} from "@clerk/nextjs";
import Link from "next/link";
import React from "react";
import {MdTravelExplore, MdAddCircleOutline} from "react-icons/md";

type Props = {};

const ProfilePage = async (props: Props) => {
  const {sessionClaims} = auth();

  const userId = sessionClaims?.userId as string;

  const organizedEvents = await getEventsByUser({userId, page: 1});

  return (
    <>
      <section className="bg-primary-50 py-5 md:py-10">
        <div className="wrapper flex flex-col gap-5 md:flex-row items-center justify-center sm:justify-between">
          <h3 className="h3-bold text-center sm:text-left">My Tickets</h3>
          <Button asChild>
            <Link href={"/#events"} className="flex items-center gap-2">
              <MdTravelExplore size={20} />
              Explore More Events
            </Link>
          </Button>
        </div>
      </section>

      <section className="wrapper my-8">
        <Collection
          data={[]}
          emptyTitle="No Event Tickets"
          emptyStateSubtext="Do not worry! - Please explore the events and choose the right event for yourself"
          collectionType="My_Tickets"
          limit={6}
          page={1}
          totalPages={2}
          urlParamName="ordersPage"
        />
      </section>

      <section className="bg-primary-50 py-5 md:py-10">
        <div className="wrapper flex flex-col gap-5 md:flex-row items-center justify-center sm:justify-between">
          <h3 className="h3-bold text-center sm:text-left">Event Organized</h3>
          <Button asChild>
            <Link href={"/events/create"} className="flex items-center gap-2">
              <MdAddCircleOutline size={20} />
              Create New Event
            </Link>
          </Button>
        </div>
      </section>

      <section className="wrapper my-8">
        <Collection
          data={organizedEvents?.data}
          emptyTitle="No Event has been created"
          emptyStateSubtext="Do not worry! - Create yourself a fun event and of course you can create it for free"
          collectionType="Events_Organized"
          limit={6}
          page={1}
          totalPages={2}
          urlParamName="eventsPage"
        />
      </section>
    </>
  );
};

export default ProfilePage;
