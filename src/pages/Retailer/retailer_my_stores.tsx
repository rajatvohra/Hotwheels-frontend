import { gql, useApolloClient, useQuery, useSubscription } from '@apollo/client';
import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { Link, useHistory } from 'react-router-dom';
import { RetailerStore } from '../../components/retailer_Store';
import { Store } from '../../components/store';
import { FULL_ORDER_FRAGMENT, STORE_FRAGMENT } from '../../fragments';
import { myStores } from '../../__generated__/myStores';
import { pendingOrders } from '../../__generated__/pendingOrders';
import { MY_STORES_QUERY } from '../common/my_stores';
import { PENDING_ORDERS_SUBSCRIPTION } from '../owner/owner_my_store';



export const RetailerMyStores = () => {
	const { data ,refetch} = useQuery<myStores>(MY_STORES_QUERY);
	const client = useApolloClient();
	const history=useHistory();
	const { data: subscriptionData } = useSubscription<pendingOrders>(
		PENDING_ORDERS_SUBSCRIPTION
	);
	useEffect(() => {
		if (subscriptionData?.pendingOrders.id) {
			history.push(`/orders/${subscriptionData.pendingOrders.id}`);
		}
	}, [subscriptionData]);



	return (
		<div>
			<Helmet>
				<title>My Stores | Nuber Eats</title>
			</Helmet>
			<div className="max-w-screen-2xl mx-auto mt-32">
				<h2 className="text-4xl font-medium mb-10">My Stores</h2>
				<Link className="text-lime-600 hover:underline text-lg py-5" to="/add-store">
							Add a Store &rarr;
						</Link>
				{data?.myStores.ok && data.myStores.stores.length === 0 ? (
					<>
						<h4 className="text-xl mb-5">You have no stores.</h4>

					</>
				) : (



					<div className="grid mt-16 md:grid-cols-3 gap-x-5 gap-y-10">
						{data?.myStores.stores.map((store) => (
							<RetailerStore
								key={store.id}
								id={store.id + ''}
								coverImg={store.coverImg}
								name={store.name}
								widthFull={true}
							/>
						))}

					</div>

				)}
			</div>
		</div>
	);
};
function callQuery(arg0: { variables: { input: {}; }; }) {
	throw new Error('Function not implemented.');
}

