import { gql, useQuery } from '@apollo/client';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useParams } from 'react-router-dom';
import { Button } from '../../components/button';
import { FormError } from '../../components/form-error';
import { Product } from '../../components/product';
import { CATEGORY_FRAGMENT, PRODUCT_FRAGMENT, STORE_FRAGMENT } from '../../fragments';
import { useMe } from '../../hooks/useMe';
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
		  mode,
		  quantity,
		  status,
		  FeedbackExists,
		  product{
			  name,
			  photo,
			  id
		  }
		  driver{
			  id,
			  email
		  },
		  store{
			  id,
			  name,
			  owner{
				  role
			  }
		  },
	  }
    }
  }
`;

interface IStatusForm{
	status:OrderStatus;
}

export const MyOrders = () => {
	const {register,getValues,handleSubmit,errors,formState,watch}=useForm<IStatusForm>({mode:'onChange'});
	const [stat,setstat]=useState(OrderStatus.Pending);
	const {data:UserData}=useMe();
	const { data, loading } = useQuery<getOrders, getOrdersVariables>(
		GET_ORDERS_QUERY,
		{
			variables: {
				input: {
					status:stat
				},
			},
		}
	);
	const onSubmit = () => {
		const{status}=getValues();
		console.log(status);
        setstat(status);

    };


	console.log(data,"data");

	return (
		<div className="bg-gray-800  min-h-screen h-max">
			{  (
				<div>
				<div className="max-w-screen-2xl pb-20 mx-auto ">
					<div className="">
						<div className="bg-gray-800 text-gray-500 text-2xl h-20 ">
							<h1 className="py-8 text-center text-3xl font-bold ">
								Your Orders
							</h1>

						<form onSubmit={handleSubmit(onSubmit)}
							className="float-right mr-8 ">
								<select
									name="status"
									ref={register({ required: true })}
									className="w-40	bg-black text-white rounded-xl transition duration-500 ease-in text-center transform hover:bg-lime-600 hover:opacity-80 hover:scale-105 mr-2"
								>
									{Object.keys(OrderStatus).map((stat,index) => (
									<option key={index}>{stat}</option>
									))}
								</select>
					<button className="ml-1 mr-5 h-8 w-8  bg-lime-600 text-white text-2xl rounded-xl transition duration-500 ease-in text-center transform hover:bg-green-400  hover:scale-105 ">&rarr;</button>

				</form>
				</div>
				</div>
				</div><div>
					<div className="grid grid-cols-2 gap-2 mx-4">
					{data?.getOrders.orders && data?.getOrders.orders.map((order) =>  (
						<div className="md:flex shadow-lg  mx-6 md:mx-auto mb-20 max-w-lg md:max-w-2xl h-64 transition duration-500 ease-in transform  hover:scale-105">
						<img className="h-full w-full md:w-1/3  rounded-lg object-cover pb-5/6" src={order.product.photo!} />
						<div className="w-full md:w-2/3 px-4 py-4 bg-white rounded-lg opacity-90">
							<div className="flex items-center">
								<h2 className="text-xl text-gray-800 font-bold  mr-auto">{order.product.name}</h2>
							</div>
							<p className="text-sm text-gray-700 mt-2">
								OrderId :{order.id} </p>
							<p className="text-sm text-gray-700 mt-2">
								Delivery By: {order.driver?.email|| 'Not Assigned '} </p>
							<p className="text-sm text-gray-700 mt-2">
								Store:{order.store?.name} </p>
							<p className="text-sm text-gray-700 mt-2">
								Order Status:{order.status} </p>
							<p className="text-sm text-gray-700 mt-2">
								Mode: {order.mode}
							</p>
							{((order.status===OrderStatus.Delivered) && (order?.store?.owner?.role!==UserData?.me?.role) ) && (<div className="text-indigo-500 font-semibold text-lg mt-6"><Link to={`/${order.product.id}/give-feedback`}>Give Feedback</Link></div>)}

							<div className="flex items-center justify-end  top-auto absolute bottom-2 right-3">
								<Link to={`/orders/${order.id}`} className=" p-2 text-base rounded-full bg-indigo-500 hover:bg-indigo-700 focus:outline-none ">View Order</Link>
							</div>
						</div>
						</div>
						))}
						</div>


				</div>
				</div>
			)}
		</div>
	);
};

