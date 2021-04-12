import { gql, useMutation, useQuery } from '@apollo/client';
import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { useHistory, useParams } from 'react-router-dom';
import { Product } from '../../components/product';
import { ProductOption } from '../../components/product-option';
import { PRODUCT_FRAGMENT, STORE_FRAGMENT } from '../../fragments';
import {
	createOrder,
	createOrderVariables,
} from '../../__generated__/createOrder';
import { CreateOrderItemInput } from '../../__generated__/globalTypes';
import { store, storeVariables } from '../../__generated__/store';

const STORE_QUERY = gql`
	query store($input: StoreInput!) {
		store(input: $input) {
			ok
			error
			store {
				...StoreParts
				menu {
					...ProductParts
				}
			}
		}
	}
	${STORE_FRAGMENT}
	${PRODUCT_FRAGMENT}
`;

const CREATE_ORDER_MUTATION = gql`
	mutation createOrder($input: CreateOrderInput!) {
		createOrder(input: $input) {
			ok
			error
			orderId
		}
	}
`;

interface IStoreParams {
	id: string;
}

export const Store = () => {
	const params = useParams<IStoreParams>();
	const { loading, data } = useQuery<store, storeVariables>(STORE_QUERY, {
		variables: {
			input: {
				storeId: +params.id,
			},
		},
	});
	const [orderStarted, setOrderStarted] = useState(false);
	const [orderItems, setOrderItems] = useState<CreateOrderItemInput[]>([]);
	const triggerStartOrder = () => {
		setOrderStarted(true);
	};
	const getItem = (productId: number) => {
		return orderItems.find((order) => order.productId === productId);
	};
	const isSelected = (productId: number) => {
		return Boolean(getItem(productId));
	};
	const addItemToOrder = (productId: number) => {
		if (isSelected(productId)) {
			return;
		}
		setOrderItems((current) => [{ productId, options: [] }, ...current]);
	};
	const removeFromOrder = (productId: number) => {
		setOrderItems((current) =>
			current.filter((product) => product.productId !== productId)
		);
	};
	const addOptionToItem = (productId: number, optionName: string) => {
		if (!isSelected(productId)) {
			return;
		}
		const oldItem = getItem(productId);
		if (oldItem) {
			const hasOption = Boolean(
				oldItem.options?.find((aOption) => aOption.name == optionName)
			);
			if (!hasOption) {
				removeFromOrder(productId);
				setOrderItems((current) => [
					{ productId, options: [{ name: optionName }, ...oldItem.options!] },
					...current,
				]);
			}
		}
	};
	const removeOptionFromItem = (productId: number, optionName: string) => {
		if (!isSelected(productId)) {
			return;
		}
		const oldItem = getItem(productId);
		if (oldItem) {
			removeFromOrder(productId);
			setOrderItems((current) => [
				{
					productId,
					options: oldItem.options?.filter(
						(option) => option.name !== optionName
					),
				},
				...current,
			]);
			return;
		}
	};
	const getOptionFromItem = (
		item: CreateOrderItemInput,
		optionName: string
	) => {
		return item.options?.find((option) => option.name === optionName);
	};

	const isOptionSelected = (productId: number, optionName: string) => {
		const item = getItem(productId);
		if (item) {
			return Boolean(getOptionFromItem(item, optionName));
		}
		return false;
	};
	const triggerCancelOrder = () => {
		setOrderStarted(false);
		setOrderItems([]);
	};
	const history = useHistory();
	const onCompleted = (data: createOrder) => {
		const {
			createOrder: { ok, orderId },
		} = data;
		if (data.createOrder.ok) {
			history.push(`/orders/${orderId}`);
		}
	};
	const [createOrderMutation, { loading: placingOrder }] = useMutation<
		createOrder,
		createOrderVariables
	>(CREATE_ORDER_MUTATION, {
		onCompleted,
	});
	const triggerConfirmOrder = () => {
		if (placingOrder) {
			return;
		}
		if (orderItems.length === 0) {
			alert("Can't place empty order");
			return;
		}
		const ok = window.confirm('You are about to place an order');
		if (ok) {
			createOrderMutation({
				variables: {
					input: {
						storeId: +params.id,
						items: orderItems,
					},
				},
			});
		}
	};
	return (
		<div>
			<Helmet>
				<title>{data?.store.store?.name || ''} | Nuber Eats</title>
			</Helmet>
			<div
				className=" bg-gray-800 bg-center bg-cover py-48"
				style={{
					backgroundImage: `url(${data?.store.store?.coverImg})`,
				}}
			>
				<div className="bg-white w-3/12 py-8 pl-48">
					<h4 className="text-4xl mb-3">{data?.store.store?.name}</h4>
					<h5 className="text-sm font-light mb-2">
						{data?.store.store?.category?.name}
					</h5>
					<h6 className="text-sm font-light">{data?.store.store?.address}</h6>
				</div>
			</div>
			<div className="container pb-32 flex flex-col items-end mt-20">
				{!orderStarted && (
					<button onClick={triggerStartOrder} className="btn px-10">
						Start Order
					</button>
				)}
				{orderStarted && (
					<div className="flex items-center">
						<button onClick={triggerConfirmOrder} className="btn px-10 mr-3">
							Confirm Order
						</button>
						<button
							onClick={triggerCancelOrder}
							className="btn px-10 bg-black hover:bg-black"
						>
							Cancel Order
						</button>
					</div>
				)}

				<div className="w-full grid mt-16 md:grid-cols-3 gap-x-5 gap-y-10">
					{data?.store.store?.menu.map((product, index) => (
						<Product
							isSelected={isSelected(product.id)}
							id={product.id}
							orderStarted={orderStarted}
							key={index}
							name={product.name}
							description={product.description}
							price={product.price}
							isCustomer={true}
							options={product.options}
							addItemToOrder={addItemToOrder}
							removeFromOrder={removeFromOrder}
						>
							{product.options?.map((option, index) => (
								<ProductOption
									key={index}
									productId={product.id}
									isSelected={isOptionSelected(product.id, option.name)}
									name={option.name}
									extra={option.extra}
									addOptionToItem={addOptionToItem}
									removeOptionFromItem={removeOptionFromItem}
								/>
							))}
						</Product>
					))}
				</div>
			</div>
		</div>
	);
};
