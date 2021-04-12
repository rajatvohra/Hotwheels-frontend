import { gql, useQuery } from '@apollo/client';
import React from 'react';
import { useParams } from 'react-router-dom';
import { Store } from '../../components/store';
import { CATEGORY_FRAGMENT, STORE_FRAGMENT } from '../../fragments';
import { category, categoryVariables } from '../../__generated__/category';

const CATEGORY_QUERY = gql`
	query category($input: CategoryInput!) {
		category(input: $input) {
			ok
			error
			totalPages
			totalResults
			stores {
				...StoreParts
			}
			category {
				...CategoryParts
			}
		}
	}
	${STORE_FRAGMENT}
	${CATEGORY_FRAGMENT}
`;

interface ICategoryParams {
	slug: string;
}

export const Category = () => {
	const params = useParams<ICategoryParams>();
	const { data, loading } = useQuery<category, categoryVariables>(
		CATEGORY_QUERY,
		{
			variables: {
				input: {
					page: 1,
					slug: params.slug,
				},
			},
		}
	);
	console.log(data);
	return (
		<div>
			{!loading && (
				<div className="max-w-screen-2xl pb-20 mx-auto mt-8">
					<div>
						<h1 className="bg-lime-500 text-gray-700 text-center text-2xl">
							We found {data?.category.category?.storeCount}{' '}
							{data?.category.category?.storeCount === 1
								? 'product'
								: 'products'}{' '}
							for the {data?.category.category?.name} Category .
						</h1>
					</div>
					<div className="grid mt-16 md:grid-cols-3 gap-x-5 gap-y-10">
						{data?.category.stores?.map((store) => (
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
