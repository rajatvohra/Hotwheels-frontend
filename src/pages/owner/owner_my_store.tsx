import { gql, useMutation, useQuery, useSubscription } from '@apollo/client';
import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { Link, useHistory, useParams } from 'react-router-dom';
import { Product } from '../../components/product';
import {
	VictoryAxis,
	VictoryBar,
	VictoryChart,
	VictoryLabel,
	VictoryLine,
	VictoryPie,
	VictoryTheme,
	VictoryTooltip,
	VictoryVoronoiContainer,
} from 'victory';
import {
	PRODUCT_FRAGMENT,
	FULL_ORDER_FRAGMENT,
	ORDERS_FRAGMENT,
	STORE_FRAGMENT,
} from '../../fragments';
import { useMe } from '../../hooks/useMe';
import { myStore, myStoreVariables } from '../../__generated__/myStore';
import { pendingOrders } from '../../__generated__/pendingOrders';
import { deleteStore, deleteStoreVariables } from '../../__generated__/deleteStore';
import { UserRole } from '../../__generated__/globalTypes';

export const MY_STORE_QUERY = gql`
	query myStore($input: MyStoreInput!) {
		myStore(input: $input) {
			ok
			error
			store {
				...StoreParts
				menu {
					id
					name
					price
					photo
					description
					options {
						name
						extra
						choices {
							name
							extra
						}
					}
					category{
						name
					}
					store{
						owner{
							role
						}
					}
				}
				orders {
					...OrderParts
				}
			}
		}
	}
	${STORE_FRAGMENT}
	${ORDERS_FRAGMENT}
`;
const DELETE_STORE_MUTATION=gql`
	mutation deleteStore($deletestoreinput: DeleteStoreInput!){
		deleteStore(input: $deletestoreinput) {
			ok
			error
		}
	}
`
export const PENDING_ORDERS_SUBSCRIPTION = gql`
	subscription pendingOrders {
		pendingOrders {
			...FullOrderParts
		}
	}
	${FULL_ORDER_FRAGMENT}
`;

interface IParams {
	id: string;
}

export const MyStore = () => {
	const { id } = useParams<IParams>();
	console.log("id=",id);
	const {data:userData}=useMe();
	const { data } = useQuery<myStore, myStoreVariables>(MY_STORE_QUERY, {
		variables: {
			input: {
				id: +id,
			},
		},
	});
	console.log(data);

	const { data: subscriptionData } = useSubscription<pendingOrders>(
		PENDING_ORDERS_SUBSCRIPTION
	);
	const history = useHistory();
	useEffect(() => {
		if (subscriptionData?.pendingOrders.id) {
			history.push(`/orders/${subscriptionData.pendingOrders.id}`);
		}
	}, [subscriptionData]);
	const[DeleteStore,{data:DeleteStoredata,loading}]=useMutation<deleteStore,deleteStoreVariables>(DELETE_STORE_MUTATION)
	const ondelete=()=>{
		DeleteStore(
			{variables: {
				deletestoreinput: {
					storeId: +id,
				},
			},
		});
		history.push('/');
		window.location.reload();
	}

	return (
		<div className="bg-gray-800 h-max" >
			<Helmet>
				<title>{data?.myStore.store?.name || 'Loading...'} | Nuber Eats</title>
			</Helmet>
			<div className="checkout-container"></div>
			<div
				className="  bg-gray-700  py-28 bg-center bg-cover"
				style={{
					backgroundImage: `url(${data?.myStore.store?.coverImg})`,
				}}
			></div>
			<div className="container mt-10">
				<h2 className="text-4xl font-medium mb-10">
					{data?.myStore.store?.name || 'Loading...'}
				</h2>
				{userData?.me.role===UserRole.Retailer ?(<Link
					to={`/my-stores/${id}/add-product`}
					className=" mr-8 text-white bg-gray-800 py-3 px-10"
				>
					Add Product &rarr;
				</Link>):(<Link
					to={`/stores/${id}/add-product`}
					className=" mr-8 text-white bg-gray-800 py-3 px-10"
				>
					Add Product &rarr;
				</Link>)}

				<button onClick={ondelete} className=" ml-8 text-white bg-red-500 py-3 px-10 justify-self-end">
					Delete This Store
				</button>
				<div className="mt-10">
					{data?.myStore.store?.menu.length === 0 ? (
						<h4 className="text-xl mb-5">Please upload a product!</h4>
					) : (
						<div className="grid mt-16 md:grid-cols-2">
							{data?.myStore.store?.menu.map((product, index) => (
								<Product
									id={product.id}
									name={product.name}
									description={product.description}
									price={product.price}
									photo={product.photo}
									Categoryname={product.category?.name}
								/>
							))}
						</div>
					)}
				</div>
				<div className="mt-20 mb-10">
					<h4 className="text-center text-2xl font-medium">Sales</h4>
					<div className="  mt-10">
						<VictoryChart
							height={500}
							theme={VictoryTheme.material}
							width={window.innerWidth}
							domainPadding={50}
							containerComponent={<VictoryVoronoiContainer />}
						>
							<VictoryLine
								labels={({ datum }) => `$${datum.y}`}
								labelComponent={
									<VictoryLabel
										style={{ fontSize: 18 } as any}
										renderInPortal
										dy={-20}
									/>
								}
								data={data?.myStore.store?.orders.map((order) => ({
									x: order.createdAt,
									y: order.total,
								}))}
								interpolation="natural"
								style={{
									data: {
										strokeWidth: 5,
									},
								}}
							/>
							<VictoryAxis
								tickLabelComponent={<VictoryLabel renderInPortal />}
								style={{
									tickLabels: {
										fontSize: 20,
									} as any,
								}}
								tickFormat={(tick) => new Date(tick).toLocaleDateString('ko')}
							/>
						</VictoryChart>
					</div>
				</div>
			</div>
		</div>
	);
};
