import { gql, useQuery } from '@apollo/client';
import React from 'react';
import {  PRODUCT_FRAGMENT, STORE_FRAGMENT } from '../../fragments';
import {  Link, useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { product, productVariables } from '../../__generated__/product';
import { Store } from '../../components/store';

const PRODUCT_QUERY = gql`
	query product($input: ProductInput!) {
		product(input: $input) {
			ok
			error
			product {
				...ProductParts
                store{
                    ...StoreParts
                }
			}
		}
	}
	${PRODUCT_FRAGMENT}
    ${STORE_FRAGMENT}
`;

interface IParams {
	id: string;
}

export const ProductPage = () => {
    const params=useParams<IParams>();
	console.log(params.id);
	const { data, loading } = useQuery<product,productVariables>(
		PRODUCT_QUERY,
		{
			variables: {
				input: {
					productId:+params.id,
				},
			},
		}
	);

	return (
		<div>
			<Helmet>
				<title>{data?.product.product?.name||''} | Nuber Eats</title>
			</Helmet>

			{!loading && (

				<div className="max-w-screen-2xl pb-20 mx-auto mt-8 ">
						<h1 className="mb-10 text-2xl text-blue-800 text-left font-bold">
					{data?.product.product?.name}
				</h1>
					<div
					className=" bg-gray-800 bg-center bg-cover p-20 px-20	"
					style={{
						backgroundImage: `url(${data?.product.product?.photo})`,
					}}
					>

					</div>
					<h2 className="mt-10 text-2xl text-black text-left font-bold">
						Description:
					</h2>
					<h2 className="mt-4 text-xl text-black text-left font-bold">
						{data?.product.product?.description}
					</h2>
					<h3 className="mr-6 mt-72 text-xl text-black text-right font-semibold">
						Rs {data?.product.product?.price}
					</h3>
					<Store
					id={data?.product.product?.store.id+""}
					name={data?.product.product?.store.name+" "}
					coverImg={data?.product.product?.store.coverImg+" "}>

					</Store>




				</div>
			)}
		</div>
	);
};
