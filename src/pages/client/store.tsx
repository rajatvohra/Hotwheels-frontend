import { gql, useQuery } from '@apollo/client';
import React from 'react';
import { Helmet } from 'react-helmet';
import {  useParams } from 'react-router-dom';
import { Product } from '../../components/product';
import { PRODUCT_FRAGMENT, STORE_FRAGMENT } from '../../fragments';
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
					category{
						name
					}
				}
			}
		}
	}
	${STORE_FRAGMENT}
	${PRODUCT_FRAGMENT}
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
	return (
		<div className="bg-gray-800">
			<Helmet>
				<title>{data?.store.store?.name || ''} | Nuber Eats</title>
			</Helmet>
			<div
				className=" bg-gray-800 bg-center bg-cover py-48"
				style={{
					backgroundImage: `url(${data?.store.store?.coverImg})`,
				}}
			>
				<div className="bg-white w-3/12 py-8 pl-48 opacity-75">
					<h4 className="text-4xl mb-3">{data?.store.store?.name}</h4>

					<h6 className="text-sm font-light">{data?.store.store?.address}</h6>
				</div>
			</div>
			<div className="container pb-32 flex flex-col items-end mt-20">



				<div className="w-full grid mt-16 md:grid-cols-3 gap-x-5 gap-y-10">
					{data?.store.store?.menu.map((product, index) => (
						<Product
							id={product.id}
							Categoryname={product.category?.name}
							photo={product.photo}
							key={index}
							name={product.name}
							description={product.description}
							price={product.price}
							isCustomer={true}
							options={product.options}
						>

						</Product>
					))}
				</div>
			</div>
		</div>
	);
};
