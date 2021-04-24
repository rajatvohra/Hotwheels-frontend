import { gql, useLazyQuery } from '@apollo/client';
import React, { useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { Product } from '../../components/product';
import { PRODUCT_FRAGMENT } from '../../fragments';
import { searchProduct, searchProductVariables } from '../../__generated__/searchProduct';

const SEARCH_PRODUCT = gql`
	query searchProduct($input: SearchProductInput!) {
		searchProduct(input: $input) {
			ok
			error
			totalPages
			totalResults
			products {
				category{
					name
				}
				...ProductParts

			}
		}
	}
	${PRODUCT_FRAGMENT}
`;

export const Search = () => {
	const location = useLocation();
	const history = useHistory();
	const [callQuery, { loading, data, called }] = useLazyQuery<
		searchProduct,
		searchProductVariables
	>(SEARCH_PRODUCT);
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
		<div className="bg-gray-800  min-h-screen h-max">
			{!loading && (
				<div className="max-w-screen-2xl pb-20 mx-auto ">
					<div>
						<h1 className="text-indigo-600 text-center text-2xl">
							Search Results
						</h1>
					</div>
					<div className="grid mt-16 md:grid-cols-3 gap-x-5 gap-y-10">
					{data?.searchProduct.products?.map((products) => (
							<Product
								key={products.id}
								id={products.id }
								photo={products.photo}
								name={products.name}
								price={products.price}
								Categoryname={products.category?.name}

								description={products.description}
							/>

						))}
					</div>
				</div>
			)}
		</div>
	);
};
