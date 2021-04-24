import { gql, useMutation, useQuery, useSubscription } from '@apollo/client';
import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { useParams } from 'react-router-dom';
import { FULL_ORDER_FRAGMENT } from '../fragments';
import { useMe } from '../hooks/useMe';
import { editOrder, editOrderVariables } from '../__generated__/editOrder';
import { editOrderOffline, editOrderOfflineVariables } from '../__generated__/editOrderOffline';
import { getOrder, getOrderVariables } from '../__generated__/getOrder';
import { OrderMode, OrderStatus, UserRole } from '../__generated__/globalTypes';
import {
	orderUpdates,
	orderUpdatesVariables,
} from '../__generated__/orderUpdates';

const GET_ORDER = gql`
	query getOrder($input: GetOrderInput!) {
		getOrder(input: $input) {
			ok
			error
			order {
				...FullOrderParts
			}
		}
	}
	${FULL_ORDER_FRAGMENT}
`;

const ORDER_SUBSCRIPTION = gql`
	subscription orderUpdates($input: OrderUpdatesInput!) {
		orderUpdates(input: $input) {
			...FullOrderParts
		}
	}
	${FULL_ORDER_FRAGMENT}
`;

const EDIT_ORDER = gql`
	mutation editOrder($input: EditOrderInput!) {
		editOrder(input: $input) {
			ok
			error
		}
	}
`;

const EDIT_OFFLINE_ORDER = gql`
	mutation editOrderOffline($input: EditOrderInput!) {
		editOrderOffline(input: $input) {
			ok
			error
		}
	}
`;


interface IParams {
	id: string;
}

export const Order = () => {
	const params = useParams<IParams>();
	const { data: userData } = useMe();
	const [editOrderMutation] = useMutation<editOrder, editOrderVariables>(
		EDIT_ORDER
	);
	const [editOrderOfflineMutation] = useMutation<editOrderOffline, editOrderOfflineVariables>(
		EDIT_OFFLINE_ORDER
	);
	const { data, subscribeToMore } = useQuery<getOrder, getOrderVariables>(
		GET_ORDER,
		{
			variables: {
				input: {
					id: +params.id,
				},
			},
		}
	);
	useEffect(() => {
		if (data?.getOrder.ok) {
			subscribeToMore({
				document: ORDER_SUBSCRIPTION,
				variables: {
					input: {
						id: +params.id,
					},
				},
				updateQuery: (
					prev,
					{
						subscriptionData: { data },
					}: { subscriptionData: { data: orderUpdates } }
				) => {
					if (!data) return prev;
					return {
						getOrder: {
							...prev.getOrder,
							order: {
								...data.orderUpdates,
							},
						},
					};
				},
			});
		}
	}, [data]);
	const onButtonClick = (newStatus: OrderStatus) => {
		if(data?.getOrder.order?.mode===OrderMode.Online)
		editOrderMutation({
			variables: {
				input: {
					id: +params.id,
					status: newStatus,
				},
			},
		});
		if(data?.getOrder.order?.mode===OrderMode.Offline)
		editOrderOfflineMutation({
			variables: {
				input: {
					id: +params.id,
					status: newStatus,
				},
			},
		});
	};
	console.log(userData?.me.role,data?.getOrder.order?.customer?.role,"printing")
	return (
		<div className=" min-h-screen h-max bg-gray-800">
		<div className=" flex justify-evenly  ">
			<Helmet>
				<title>Order #{params.id} | Nuber Eats</title>
			</Helmet>
			<div className="border border-gray-800 w-full max-w-screen-sm   bg-white rounded-xl justify-center">
				<div className="bg-black w-full py-5 text-white text-center text-xl rounded-lg justify-center max-w-screen-sm">
					Order #{params.id}
				</div>
				<h5 className="p-5 pt-10 text-3xl text-center ">
					Rs {data?.getOrder.order?.total}
				</h5>
				<div className="p-5 text-xl grid gap-6">
					<div className="border-t pt-5 border-gray-700">
						Prepared By:{' '}
						<span className="font-medium">
							{data?.getOrder.order?.store?.name}
						</span>
					</div>
					<div className="border-t pt-5 border-gray-700 ">
						Deliver To:{' '}
						<span className="font-medium">
							{data?.getOrder.order?.customer?.email}
						</span>
					</div>
					<div className="border-t border-b py-5 border-gray-700">
						Driver:{' '}
						<span className="font-medium">
							{data?.getOrder.order?.driver?.email || 'Not yet.'}
						</span>
					</div>
					{

					(userData?.me.role === UserRole.Retailer && data?.getOrder.order?.customer?.role===UserRole.Retailer)
					&& (
						<span className=" text-center mt-5 mb-3  text-2xl text-lime-600">
							Status: {data?.getOrder.order?.status}
						</span>
					)}
					{
					(userData?.me.role === UserRole.Client && data?.getOrder.order?.customer?.role===UserRole.Client)
					&& (
						<span className=" text-center mt-5 mb-3  text-2xl text-lime-600">
							Status: {data?.getOrder.order?.status}
						</span>
					)}
					{

						(userData?.me.role === UserRole.Owner && data?.getOrder.order?.customer?.role===UserRole.Retailer)

					 && (
						<>
							{data?.getOrder.order?.status === OrderStatus.Pending && (
								<button
									onClick={() => onButtonClick(OrderStatus.Packing)}
									className="btn"
								>
									Accept Order
								</button>
							)}
							{data?.getOrder.order?.status === OrderStatus.Packing && (
								<button
									onClick={() => onButtonClick(OrderStatus.Packed)}
									className="btn"
								>
									Order Packed
								</button>
							)}
							{((data?.getOrder.order?.status === OrderStatus.Packed) && (data?.getOrder.order?.mode===OrderMode.Offline)) && (
								<button
									onClick={() => onButtonClick(OrderStatus.Delivered)}
									className="btn"
								>
									Picked Up
								</button>
							)}
							{data?.getOrder.order?.status !== OrderStatus.Packing &&
								data?.getOrder.order?.status !== OrderStatus.Pending && (
									<span className=" text-center mt-5 mb-3  text-2xl text-lime-600">
										Status: {data?.getOrder.order?.status}
									</span>
								)}
						</>
					)}
					{
						(userData?.me.role === UserRole.Retailer && data?.getOrder.order?.customer?.role===UserRole.Client)

					 && (
						<>
							{data?.getOrder.order?.status === OrderStatus.Pending && (
								<button
									onClick={() => onButtonClick(OrderStatus.Packing)}
									className="btn"
								>
									Accept Order
								</button>
							)}
							{data?.getOrder.order?.status === OrderStatus.Packing && (
								<button
									onClick={() => onButtonClick(OrderStatus.Packed)}
									className="btn"
								>
									Order Packed
								</button>
							)}
							{((data?.getOrder.order?.status === OrderStatus.Packed) && (data?.getOrder.order?.mode===OrderMode.Offline)) && (
								<button
									onClick={() => onButtonClick(OrderStatus.Delivered)}
									className="btn"
								>
									Picked Up
								</button>
							)}
							{data?.getOrder.order?.status !== OrderStatus.Packing &&
								data?.getOrder.order?.status !== OrderStatus.Pending && (
									<span className=" text-center mt-5 mb-3  text-2xl text-lime-600">
										Status: {data?.getOrder.order?.status}
									</span>
								)}
						</>
					)}
					{userData?.me.role === UserRole.Delivery && (
						<>
							{data?.getOrder.order?.status === OrderStatus.Packed && (
								<button
									onClick={() => onButtonClick(OrderStatus.PickedUp)}
									className="btn"
								>
									Picked Up
								</button>
							)}
							{data?.getOrder.order?.status === OrderStatus.PickedUp && (
								<button
									onClick={() => onButtonClick(OrderStatus.Delivered)}
									className="btn"
								>
									Order Delivered
								</button>
							)}
						</>
					)}
					{data?.getOrder.order?.status === OrderStatus.Delivered && (
						<span className=" text-center mt-5 mb-3  text-2xl text-lime-600">
							Thank you for using Nuber Eats
						</span>
					)}
				</div>
			</div>
		</div>
		</div>
	);
};
