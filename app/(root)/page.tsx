import {Button} from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <section className="bg-primary-50 bg-dotted-pattern bg-contain py-5 md:py-10">
        <div className="wrapper grid grid-cols-1 gap-5 md:grid-cols-2">
          <div className="flex flex-col justify-center gap-8">
            <h1 className="h1-bold">
              Seamless Online Booking for Your Next Event Experience
            </h1>
            <p className="p-regular-20 md:p-regular-24">
              Book your tickets online today and save up to 30% on fares. With
              over 10,000 journeys booked daily, start exploring now!
            </p>
            <Button size={"sm"}>
              <Link href={"#events"}>Booking Now</Link>
            </Button>
          </div>
          <Image
            src={
              "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            }
            alt="image"
            width={1000}
            height={670}
            className="w-full h-full rounded-md"
          />
        </div>
      </section>

      <section
        id="events"
        className="wrapper my-8 flex flex-col gap-8 md:gap-12"
      >
        <h5 className="h5-bold">
          So Many Events Right Here!
          <br />
          Book Yours Now!
        </h5>
        <div className="flex w-full flex-col gap-5 md:flex-col">
          Search Category
        </div>
      </section>
    </>
  );
}
