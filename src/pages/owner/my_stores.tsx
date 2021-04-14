import { gql, useApolloClient, useQuery } from '@apollo/client';
import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { Store } from '../../components/store';
import { STORE_FRAGMENT } from '../../fragments';
import { myStores } from '../../__generated__/myStores';

export const MY_STORES_QUERY = gql`
	query myStores {
		myStores {
			ok
			error
			stores {
				...StoreParts
			}
		}
	}
	${STORE_FRAGMENT}
`;

export const MyStores = () => {
	const { data ,refetch} = useQuery<myStores>(MY_STORES_QUERY);
	const client = useApolloClient();



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
							<Store
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

