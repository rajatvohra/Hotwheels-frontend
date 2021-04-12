import { gql, useLazyQuery } from '@apollo/client';
import React, { useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { Store } from '../../components/store';
import { STORE_FRAGMENT } from '../../fragments';
import {
	searchStore,
	searchStoreVariables,
} from '../../__generated__/searchStore';

const SEARCH_STORE = gql`
	query searchStore($input: SearchStoreInput!) {
		searchStore(input: $input) {
			ok
			error
			totalPages
			totalResults
			stores {
				...StoreParts
			}
		}
	}
	${STORE_FRAGMENT}
`;

export const Search = () => {
	const location = useLocation();
	const history = useHistory();
	const [callQuery, { loading, data, called }] = useLazyQuery<
		searchStore,
		searchStoreVariables
	>(SEARCH_STORE);
	useEffect(() => {
		const [_, query] = location.search.split('?term=');
		if (!query) {
			return history.replace('/');
		}
		callQuery({
			variables: {
				input: {
					page: 1,
					query,
				},
			},
		});
	}, [history, location]);
	console.log(loading, data, called);
	return (
		<div>
			{!loading && (
				<div className="max-w-screen-2xl pb-20 mx-auto mt-8">
					<div>
						<h1 className="bg-lime-500 text-gray-700 text-center text-2xl">
							Search Results
						</h1>
					</div>
					<div className="grid mt-16 md:grid-cols-3 gap-x-5 gap-y-10">
						{data?.searchStore.stores?.map((store) => (
							<Store
								key={store.id}
								id={store.id + ''}
								coverImg={store.coverImg}
								name={store.name}
								categoryName={store.category?.name}
							/>
						))}
					</div>
				</div>
			)}
		</div>
	);
};
