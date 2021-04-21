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
import { feedbacks, feedbacksVariables } from '../../__generated__/feedbacks';


const PRODUCT_QUERY = gql`
	query product($input: ProductInput!) {
		product(input: $input) {
			ok
			error
			product {
				...ProductParts
				stocks
				dateNextAvailable
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

const FEEDBACK_QUERY = gql`
  query feedbacks($input: FeedbacksInput!) {
    feedbacks(input: $input) {
		error,
		ok,
		totalPages,
		totalResults,
		results{
		  complaint
		}
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


	const { data:Feedbackdata, loading:Feedbackloading } = useQuery<feedbacks,feedbacksVariables>(
		FEEDBACK_QUERY,
		{
			variables: {
				input: {
					productId:productid,
				},
			},
		}
	);
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
	  console.log(Feedbackdata?.feedbacks.results,"res");





	return (
		<div>
			<Helmet>
				<title>{Productdata?.product.product?.name||''} | Nuber Eats</title>
			</Helmet>

			{!loading && (
				<div>
					<div className="max-w-screen-2xl pb-4 mx-auto mt-8">
				<div className="">
					<div className="bg-gray-600 text-black text-2xl h-20 ">
						<h1 className="py-8 text-center text-3xl font-bold">
						{Productdata?.product.product?.name}
						</h1>
						</div></div></div>


				<div className="grid grid-cols-10 py-4 gap-4 ">

						<div className="col-span-5 ">
							<img className="w-full"  src={photo}>
								</img>
						</div>
						<div className="col-span-5 pl-6 pr-5 space-y-1 border-2 border-black border-opacity-25">

							<div className="row-span-2 font-medium">
								<h3>
									Cost: Rs{Productdata?.product.product?.price}
								</h3>
								{Productdata?.product.product?.stocks!>0 &&(
								<h3>
									Stock: {Productdata?.product.product?.stocks }
								</h3>)}
								{Productdata?.product.product?.stocks===0 && (<h3>Next in stock : {Productdata?.product.product?.dateNextAvailable}</h3>)}
								<h3 >
								<Link className="text-green-600 hover:underline" to={`/stores/${Productdata?.product.product?.store.id}`}>Visit the  {Productdata?.product.product?.store.name}</Link>
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
							<div>
								{}
							</div>

								<div className="col-start-9 pt-60">
									{(Userdata?.me.role===UserRole.Client || Userdata?.me.role===UserRole.Retailer) && Productdata && Productdata.product && Productdata.product.product && Productdata?.product.product?.stocks>0 &&
							(<button onClick={triggerAddtoCart} className="  float-right">
								<FontAwesomeIcon icon={faShoppingCart} className=" mr-4 text-4xl" />
							</button>)
							}
							{Productdata?.product.product?.stocks!<=0 && (<div className="text-right font-semibold text-2xl">Out of Stock</div>)}

							</div>
						</div>



						</div>

						<div className="border-2 border-black">
									<h1>
										Feedback:
									</h1>
						{Feedbackdata?.feedbacks.results && Feedbackdata?.feedbacks.results.map((result,index) => (
								<div className="font-medium  space-y-2">

									<h1>
										{index+1}) {result.complaint}
									</h1>
									</div>

								))}
						</div>
						<div className="max-w-screen-2xl pb-4 mx-auto bg-gray-900 text-white text-right">
							Footer
						</div>










				</div>
			)}
		</div>
	);
};
