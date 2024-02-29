import {IEvent} from "@/lib/database/models/event.model";
import React from "react";
import Card from "./Card";

type Props = {
  data: IEvent[];
  emptyTitle: string;
  emptyStateSubtext: string;
  page: number | string;
  limit: number;
  totalPages?: number;
  collectionType: "Events_Organized" | "My_Tickets" | "All_Events";
  urlParamName?: string;
};

const Collection = ({
  data,
  emptyTitle,
  emptyStateSubtext,
  page,
  totalPages = 0,
  collectionType,
  urlParamName,
}: Props) => {
  return (
    <>
      {data?.length > 0 ? (
        <div className="flex flex-col items-center gap-10">
          <div className="grid w-full grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:gap-10">
            {data.map((item) => {
              const hasOrderLink = collectionType === "Events_Organized";
              const hidePrice = collectionType === "My_Tickets";
              return (
                <div key={item._id} className="flex items-center">
                  <Card
                    event={item}
                    hasOrderLink={hasOrderLink}
                    hidePrice={hidePrice}
                  />
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <div className="text-center">
          <h3>{emptyTitle}</h3>
          <p>{emptyStateSubtext}</p>
        </div>
      )}
    </>
  );
};

export default Collection;
