import { useContext } from "react";
import { OrderDetails } from "../../OrderDetails/OrderDetails";
import { UserDetails } from "../../UserDetails/UserDetails";
import { orderContext } from "../../../Context/OrderContext/OrderContext";
import { Loader } from "../../Loader/LoaderScreen";

export const UserOrders = () => {
  const { dataOrders, isLoading, numberOfOrders } = useContext(orderContext);

  return (
    <div className="py-14 px-4 md:px-6 2xl:px-20 2xl:container 2xl:mx-auto ">
      {isLoading && <Loader />}
      <UserDetails numberOfOrders={numberOfOrders} />
      {dataOrders?.map((order) => (
        <OrderDetails key={order._id} order={order} />
      ))}
    </div>
  );
};
