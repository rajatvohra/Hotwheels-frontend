import { gql, useMutation, useQuery } from '@apollo/client';
import React, { useState } from 'react';
import {  PRODUCT_FRAGMENT, STORE_FRAGMENT } from '../../fragments';
import {   useHistory, useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { Store } from '../../components/store';
import { CreateOrderItemInput, UserRole } from '../../__generated__/globalTypes';
import { createOrder, createOrderVariables } from '../../__generated__/createOrder';
import { product, productVariables } from '../../__generated__/product';
import { useMe } from '../../hooks/useMe';
import { index } from '../../algolia/index_algolia';


const PRODUCT_QUERY = gql`
	query product($input: ProductInput!) {
		product(input: $input) {
			ok
			error
			product {
				...ProductParts
				stocks
                store{
                    ...StoreParts
                }
			}
		}
	}
	${PRODUCT_FRAGMENT}
    ${STORE_FRAGMENT}
`;

const CREATE_ORDER_MUTATION = gql`
  mutation createOrder($input: CreateOrderInput!) {
    createOrder(input: $input) {
      ok
      error
      orderId
    }
  }
`;

interface IParams {
	id: string;
}

export const  ProductPage =  () => {
    const params=useParams<IParams>();
	const history=useHistory();
	const productid=+params.id;
	const {data:Userdata}=useMe();
	const [obj,setobj]=useState({});
	

	const temp = index.search('Owner').then(({ hits }) => {
		return hits;
	});
	let ownerprod=Promise.resolve(temp);
	ownerprod.then((_)=>{
		console.log(_);
	})
	console.log(temp,"type");


	const { data:Productdata, loading } = useQuery<product,productVariables>(
		PRODUCT_QUERY,
		{
			variables: {
				input: {
					productId:productid,
				},
			},
		}
	);
	console.log(Productdata?.product.product?.stocks);





	const onCompleted=(data: createOrder)=>{
		const {
			createOrder: { ok, orderId },
		  } = data;
		console.log("added to cart");

	}
	  const [createOrderMutation, { loading:loadingtocart }] = useMutation<
		createOrder,
		createOrderVariables
	  >(CREATE_ORDER_MUTATION, {
		onCompleted,
	  });
	  const triggerAddtoCart=()=>{


		  if(Productdata?.product?.product?.store?.id)
			{createOrderMutation({
				variables: {
				input: {
					storeId: +Productdata?.product?.product?.store?.id,
					items: [{productId: productid,quantity:1}],
				},
				},
			});}

	  }
	  const photo=Productdata?.product?.product?.photo+"";
	  




	return (
		<div>
			<Helmet>
				<title>{Productdata?.product.product?.name||''} | Nuber Eats</title>
			</Helmet>

			{!loading && (

				<div className="max-w-screen-2xl pb-20 mx-auto mt-8 ">
						<h1 className="mb-10 text-2xl text-blue-800 text-left font-bold">
					{Productdata?.product.product?.name}
				</h1>
					<div>
					<img src={photo}>

					</img>
					</div>

					<h2 className="mt-10 text-2xl text-black text-left font-bold">
						Description:
					</h2>
					<h2 className="mt-4 text-xl text-black text-left font-bold">
						{Productdata?.product.product?.description}
					</h2>
					(<div className="mt-4 text-xl text-black text-left font-bold">
						<button className="mr-6 mt-56 text-xl text-black float-right font-semibold">
							Rs {Productdata?.product.product?.price}
						</button>
					</div>)
					<div className="grid gap-3 w-1/3 text-xl text-black text-left font-bold">
						<h6>
							Check out other products from this store.
						</h6>
						<Store
						id={Productdata?.product.product?.store.id+""}
						name={Productdata?.product.product?.store.name+" "}
						coverImg={Productdata?.product.product?.store.coverImg+" "}
						widthFull={true}>

						</Store>
					</div>
					{Userdata?.me.role===UserRole.Client && Productdata && Productdata.product && Productdata.product.product && Productdata?.product.product?.stocks>0 &&
					(<button onClick={triggerAddtoCart} className="btn px-10 float-right">
						BUY NOW
					</button>)
					}





				</div>
			)}
		</div>
	);
};
