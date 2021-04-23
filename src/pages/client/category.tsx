import { gql, useQuery } from '@apollo/client';
import React from 'react';
import { useParams } from 'react-router-dom';
import { Product } from '../../components/product';
import { CATEGORY_FRAGMENT, PRODUCT_FRAGMENT, STORE_FRAGMENT } from '../../fragments';
import { category, categoryVariables } from '../../__generated__/category';

const CATEGORY_QUERY = gql`
	query category($input: CategoryInput!) {
		category(input: $input) {
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
			category {
				...CategoryParts
			}
		}
	}
	${PRODUCT_FRAGMENT}
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
		<div className="bg-gray-800 h-screen ">
			{!loading && (
				<div className="max-w-screen-2xl pb-20 mx-auto ">
					<div>
						<h1 className=" text-indigo-600 text-center text-2xl">
							We found {data?.category.totalResults}{' '}
							{data?.category.totalResults === 1
								? 'product'
								: 'products'}{' '}
							for the {data?.category.category?.name} Category
						</h1>
					</div>
					<div className="grid mt-16 md:grid-cols-3 gap-x-5 gap-y-10">
						{data?.category.products?.map((products) => (
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
