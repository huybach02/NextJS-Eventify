import Search from "@/components/shared/Search";
import {getOrdersByEvent} from "@/lib/actions/order.action";
import {formatDateTime, formatPrice} from "@/lib/utils";
import {SearchParamProps} from "@/types";
import {IOrderItem} from "@/lib/database/models/order.model";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const Orders = async ({searchParams}: SearchParamProps) => {
  const eventId = (searchParams?.eventId as string) || "";
  const searchText = (searchParams?.query as string) || "";

  const orders = await getOrdersByEvent({eventId, searchString: searchText});

  return (
    <>
      <section className=" bg-primary-50 bg-dotted-pattern bg-cover bg-center py-5 md:py-10">
        <h3 className="wrapper h3-bold text-center sm:text-left ">Orders</h3>
      </section>

      <section className="wrapper mt-8">
        <Search />
      </section>

      <section className="wrapper">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order ID</TableHead>
              <TableHead> Event Title</TableHead>
              <TableHead>Buyer</TableHead>
              <TableHead>Created</TableHead>
              <TableHead>Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.map((item: IOrderItem) => (
              <TableRow key={item?._id}>
                <TableCell className="font-medium">{item?._id}</TableCell>
                <TableCell>{item?.eventTitle}</TableCell>
                <TableCell>{item?.buyer}</TableCell>
                <TableCell>
                  {formatDateTime(item?.createdAt)?.dateTime}
                </TableCell>
                <TableCell>{formatPrice(item?.totalAmount)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </section>
    </>
  );
};

export default Orders;
