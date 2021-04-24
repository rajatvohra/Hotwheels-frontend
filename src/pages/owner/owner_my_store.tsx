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
	VictoryStack,
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
	var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
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
	let orderArr=data?.myStore.store?.orders;
	let ordertotalarr=[0,0]
	//1:0,2:0,31:0
	for(let i=0;i<32;i++){
		ordertotalarr[i]=0;
	}
	if(orderArr)
		orderArr.forEach(element => {
			let x=ordertotalarr[new Date(element.createdAt).getDate()];
			ordertotalarr[new Date(element.createdAt).getDate()]=element.total!+x;
			//console.log(element.createdAt,new Date(element.createdAt).getDate());
		});
	console.log(ordertotalarr)


	return (
		<div className="bg-gray-800 min-h-screen h-max" >
			<Helmet>
				<title>{data?.myStore.store?.name+"xy" || 'Loading...'} | Hotwheels</title>
			</Helmet>
			<div className="checkout-container"></div>
			<div
				className="  bg-gray-700  py-28 bg-center bg-cover"
				style={{
					backgroundImage: `url(${data?.myStore.store?.coverImg})`,
				}}
			></div>
			<div className="container mt-10">
				<h2 className="text-4xl font-medium mb-10 text-indigo-600 ml-10">
					{data?.myStore.store?.name || 'Loading...'}
				</h2>
				{userData?.me.role===UserRole.Retailer ?(<Link
					to={`/my-stores/${id}/add-product`}
					className=" text-lg mt-6 text-lime-600 hover:underline   py-3 px-10 absolute top-96 right-52"
				>
					Add Product
				</Link>):(<Link
					to={`/stores/${id}/add-product`}
					className="text-lg mt-6 text-lime-600 hover:underline   py-3 px-10 absolute top-96 right-52"
				>
					Add Product
				</Link>)}

				<button onClick={ondelete} className=" text-lg mt-6 text-red-600 hover:underline   py-3 px-10 absolute top-96 right-6">
					Delete This Store
				</button>
				<div className="mt-10">
					{data?.myStore.store?.menu.length === 0 ? (
						<h4 className="text-xl mb-5 text-gray-500 ml-10">Please upload a product!</h4>
					) : (
						<div className="grid mt-16 md:grid-cols-3">
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
				<div className="mt-20">
					<div className="">
						<p className="h-1 bg-gray-500"></p>
					</div>
					<h4 className="text-center text-4xl mt-4 text-indigo-600 font-semibold">Sales</h4>

					<div className="  mt-10 ">
						<VictoryChart
							height={500}
							theme={VictoryTheme.material}
							width={window.innerWidth}
							domainPadding={50}
							containerComponent={<VictoryVoronoiContainer labels={({ datum }) => `₹${datum.y}`}
							labelComponent={
							  <VictoryTooltip  dy={0} constrainToVisibleArea />
							}   />}

						>
							<VictoryLine


								labelComponent={
									<VictoryLabel
										style={{ fontSize: 18 } as any}
										renderInPortal
										dy={-20}
									/>
								}
								data={ordertotalarr.map((index,value) => ({
									x: (value),
									y: index,
								}))}
								style={{
									data: {
										strokeWidth: 5,
										stroke:'tomato'
									},
								}}

							/>
							<VictoryAxis
								tickLabelComponent={<VictoryLabel renderInPortal />}

								style={{
									grid: { stroke: "#818e99", strokeWidth: 0 },
									tickLabels: {
										fontSize: 20,
										fill: 'white',
									} as any,
								}}
								tickFormat={(tick) => tick}
								fixLabelOverlap={true}
							/>
							<VictoryAxis dependentAxis
							style={{
									grid: { stroke: "#818e99", strokeWidth: 0 },
									tickLabels: {
										fontSize: 20,
										fill: 'white',
									} as any,
								}}  />
						</VictoryChart>
					</div>
				</div>
			</div>
		</div>
	);
};
