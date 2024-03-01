import {IEvent} from "@/lib/database/models/event.model";
import React from "react";
import Card from "./Card";
import Pagination from "./Pagination";

type Props = {
  data: IEvent[];
  emptyTitle: string;
  emptyStateSubtext: string;
  page: number | string;
  limit: number;
  totalPages?: number;
  collectionType: "Events_Organized" | "My_Tickets" | "All_Events";
  urlParamName?: string;
  isPaid?: boolean;
};

const Collection = ({
  data,
  emptyTitle,
  emptyStateSubtext,
  page,
  totalPages = 0,
  collectionType,
  urlParamName,
  isPaid,
}: Props) => {
  return (
    <>
      {data?.length > 0 ? (
        <div className="flex flex-col items-center gap-10">
          <div className="grid w-full grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:gap-10">
            {data.map((item) => {
              const hasOrderLink = collectionType === "Events_Organized";
              const hidePrice = false;
              return (
                <div key={item._id} className="flex items-center">
                  <Card
                    event={item}
                    hasOrderLink={hasOrderLink}
                    hidePrice={hidePrice}
                    isPaid={isPaid}
                  />
                </div>
              );
            })}
          </div>
          {totalPages > 1 && (
            <Pagination
              urlParamName={urlParamName}
              page={page}
              totalPages={totalPages}
            />
          )}
        </div>
      ) : (
        <div className="text-center">
          <h3 className="font-bold text-xl md:h5-bold mb-3">{emptyTitle}</h3>
          <p>{emptyStateSubtext}</p>
        </div>
      )}
    </>
  );
};

export default Collection;
