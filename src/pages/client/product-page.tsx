import { gql, useMutation, useQuery } from '@apollo/client';
import React, { useState } from 'react';
import {  PRODUCT_FRAGMENT, STORE_FRAGMENT } from '../../fragments';
import {   Link, useHistory, useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { Store } from '../../components/store';
import { createOrder, createOrderVariables } from '../../__generated__/createOrder';
import { product, productVariables } from '../../__generated__/product';
import { useMe } from '../../hooks/useMe';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartPlus, faShoppingBag, faShoppingBasket, faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { UserRole } from '../../__generated__/globalTypes';


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

//for multiple orders TODO
// export const  [cart, setCart] = useState([{}]);
//export const  [cartTotal, setCart] = useState([{}]);
//export const [items,setitems]=useState([{}]);


// const [orderItems, setOrderItems] = useState<CreateOrderItemInput[]>([]);
// 	const triggerStartOrder = () => {
// 		setOrderStarted(true);
// 	};
// 	const getItem = (productId: number) => {
// 		return orderItems.find((order) => order.productId === productId);
// 	};
// 	const isSelected = (productId: number) => {
// 		return Boolean(getItem(productId));
// 	};
// 	const addItemToOrder = (productId: number) => {
// 		if (isSelected(productId)) {
// 			return;
// 		}
// 		setOrderItems((current) => [{ productId, options: [] }, ...current]);

export const  ProductPage =  () => {
    const params=useParams<IParams>();
	const history=useHistory();
	const productid=+params.id;
	const {data:Userdata}=useMe();



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
		history.push(`/orders/${orderId}`);

	}
	  const [createOrderMutation, { loading:loadingtocart }] = useMutation<
		createOrder,
		createOrderVariables
	  >(CREATE_ORDER_MUTATION, {
		onCompleted,
	  });
	  const triggerAddtoCart=()=>{

//xyz.com/storeid/productid/quantity
		  if(Productdata?.product?.product?.store?.id)
			{createOrderMutation({
				variables: {
				input: {
					storeId: +Productdata?.product?.product?.store?.id,
					productId: productid,
					quantity:1
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

				<div className="grid grid-cols-10 py-4 gap-4">

						<div className="col-span-5">
							<img className="w-full"  src={photo}>
								</img>
						</div>
						<div className="col-span-5 pl-10 pr-5 space-y-1">
							<div className="row-span-1 ">
							<h1 className="font-bold text-4xl ">{Productdata?.product.product?.name}</h1>
							</div>
							<div className="row-span-2 font-medium">
								<h3>
									Cost: Rs{Productdata?.product.product?.price}
								</h3>
								<h3 >
									Store: <Link className="text-green-600 hover:underline" to={`/stores/${Productdata?.product.product?.store.id}`}>{Productdata?.product.product?.store.name}</Link>
								</h3>

							</div>
							<div className="row-start-3 row-end-7 mt-10  border-black border-2">
							<h2 className="font-semibold ">
								Description:
							</h2>
							<h2 className="font-semibold">
								{Productdata?.product.product?.description}
							</h2>
							</div>
							<div className="row-start-8 col-start-10 mt-20">
									{(Userdata?.me.role===UserRole.Client || Userdata?.me.role===UserRole.Retailer) && Productdata && Productdata.product && Productdata.product.product && Productdata?.product.product?.stocks>0 &&
							(<button onClick={triggerAddtoCart} className="  float-right">
								<FontAwesomeIcon icon={faShoppingCart} className=" mr-4 text-4xl" />
							</button>)
							}
							</div>
						</div>










				</div>
			)}
		</div>
	);
};
