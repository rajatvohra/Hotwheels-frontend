import { gql, useQuery } from '@apollo/client';
import React from 'react';
import { useParams } from 'react-router-dom';
import { Product } from '../../components/product';
import { CATEGORY_FRAGMENT, PRODUCT_FRAGMENT, STORE_FRAGMENT } from '../../fragments';
import { category, categoryVariables } from '../../__generated__/category';


export const MyOrders = () => {

	return (
		<div>
			{  (
				<div className="max-w-screen-2xl pb-20 mx-auto mt-8">
					<div>
						<h1 className="bg-lime-500 text-gray-700 text-center text-2xl">
							Your Orders
						</h1>
					</div>

				</div>
			)}
		</div>
	);
};
