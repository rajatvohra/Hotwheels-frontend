import { gql, useQuery } from '@apollo/client';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useParams } from 'react-router-dom';
import { Button } from '../../components/button';
import { Product } from '../../components/product';
import { CATEGORY_FRAGMENT, PRODUCT_FRAGMENT, STORE_FRAGMENT } from '../../fragments';
import { category, categoryVariables } from '../../__generated__/category';
import { getOrders, getOrdersVariables } from '../../__generated__/getOrders';
import { OrderStatus, UserRole } from '../../__generated__/globalTypes';
import { Order } from '../order';


const GET_ORDERS_QUERY = gql`
  query getOrders($input: GetOrdersInput!) {
    getOrders(input: $input) {
      ok
      error
      orders{
		  id,

		  quantity,
		  status,
		  FeedbackExists,
		  product{
			  name,
			  photo,
		  }
		  driver{
			  id,
			  email
		  },
		  store{
			  id,
			  name
		  },
	  }
    }
  }
`;

interface IStatusForm{
	status:OrderStatus;
}

export const MyOrders = () => {
	const {register,getValues,handleSubmit,errors,formState,watch}=useForm<IStatusForm>({mode:'onChange',defaultValues: {status: OrderStatus.Pending,},});

	const onSubmit = () => {
		const {status}=getValues();
		console.log(status);
	}
		const { data, loading } = useQuery<getOrders, getOrdersVariables>(
			GET_ORDERS_QUERY,
			{
				variables: {
					input: {

					},
				},
			}
		);
	console.log(data,"data");

	return (
		<div>
			{  (
				<div className="max-w-screen-2xl pb-20 mx-auto mt-8">
					<div>
						<h1 className="bg-gray-300 text-black text-2xl">
							Your Orders
						</h1>
					</div>
					<div className="grid grid-cols-2 gap-2">
					{data?.getOrders.orders && data?.getOrders.orders.map((order) =>  (
						<Link to={`/orders/${order.id}`}>
							<div className=" text-black grid grid-rows-2 grid-cols-2 grid-flow-col gap-4 mt-10  border-black border-2  ">


								<div className="row-span-2 text-lg font-semibold my-4 ">
									<div className="font-bold">
										{order.product.name}
									</div>
									<div className=" my-4">
										Delivery By: {order.driver?.email|| 'Not Assigned '}
									</div>
									<div className=" my-4">
										Store:{order.store?.name}
									</div>

									<div className="text-blue-500 my-4">
										Order Status:{order.status}
									</div>

									</div>

								<div className="row-span-2 col-span-2"><img className="cover " src={order.product.photo+""}></img></div>




							</div>
							</Link>
						))}
						</div>


				</div>
			)}
		</div>
	);
};
