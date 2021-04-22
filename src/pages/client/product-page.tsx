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
import { useForm } from 'react-hook-form';
import { Button } from '../../components/button';
import { Card, CardActions, CardContent, CardHeader, makeStyles, Typography } from '@material-ui/core';
import avatar1 from '../../images/avatar1.svg';
import avatar2 from '../../images/avatar2.svg';
import avatar3 from '../../images/avatar3.svg';
import avatar4 from '../../images/avatar4.svg';
import avatar5 from '../../images/avatar5.svg';
import avatar6 from '../../images/avatar6.svg';
import avatar7 from '../../images/avatar7.svg';

const useStyles = makeStyles({
	root: {
	  minWidth: 275,
	},
	bullet: {
	  display: 'inline-block',
	  margin: '0 2px',
	  transform: 'scale(0.8)',
	},
	title: {
	  fontSize: 14,
	},
	pos: {
	  marginBottom: 12,
	},
  });

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
		  complaint,
		  customer{email},
		  createdAt,
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
	const {register,getValues,handleSubmit,errors,formState}=useForm<{quantity:string}>({mode:'onChange',});
	const classes = useStyles();


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

		const{quantity}=getValues();

		const ok = window.confirm(`You are about to place an order for Rs ${(+quantity)*(Productdata?.product.product?.price!)}. Click ok to confirm`);
		  if(Productdata?.product?.product?.store?.id)
		  	if(ok)
				{createOrderMutation({
					variables: {
					input: {
						storeId: +Productdata?.product?.product?.store?.id,
						productId: productid,
						quantity:+quantity
					},
					},
				});}

	  }
	  const photo=Productdata?.product?.product?.photo+"";
	  console.log(Feedbackdata?.feedbacks.results,"res");
	  const img_ran=()=>{
		let imgs=[avatar1,avatar2,avatar3,avatar4,avatar5,avatar6,avatar7];
		var randColor = imgs[Math.floor(Math.random() * imgs.length)];
		return randColor;
	  }
	  console.log(img_ran());





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
							</div>
						</div>
					</div>


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
							(
							<div>
								<form onSubmit={handleSubmit(triggerAddtoCart)}
								className="float-right">

									<input ref={register({required:"quantity is required",})}
									required
									type="number"
									name="quantity"
									placeholder="quantity"
									className="border-2 border-black w-20 text-center"/>

									<button> <FontAwesomeIcon icon={faShoppingCart} className=" mx-2 text-2xl" /></button>

								</form>


							</div>)
							}
							{Productdata?.product.product?.stocks!<=0 && (<div className="text-right font-semibold text-2xl">Out of Stock</div>)}

							</div>
						</div>



						</div>
						<div className="shadow-lg rounded-lg  border-2 border-blue-400 border-opacity-75 m-2">
						<div className="text-center mb-4 mt-2  font-bold text-4xl ">Reviews</div>


						<div className="grid grid-cols-3  mb-6" >


						{Feedbackdata?.feedbacks.results && Feedbackdata?.feedbacks.results.map((result,index) => (
								<div className="w-72 mx-20 shadow-lg rounded-lg bg-white space-x-2 mt-24 border border-black">
								<div key ={1} className="flex justify-center md:justify-end -mt-16">
										<img className="w-20 h-20 object-cover rounded-full " src={img_ran()}></img>
								</div>
								<div key={2} >
									<h2 className="text-gray-800 text-xl font-semibold text-blue-400">{result.customer.email}</h2>
									<p className="mt-2 text-gray-600 italic">{result.complaint}</p>
								</div>
								<div key={3} className="flex justify-end mt-4">
									 <h4 className="text-md font-medium text-indigo-500 mr-2 mb-1">{(result.createdAt).slice(2,10)}</h4>
								 </div>
							</div>


								))}
						</div>
						</div>

						<div className="max-w-screen-2xl pb-4 mx-auto bg-gray-900 text-white text-right">
							Footer
						</div>

				</div>
			)}
		</div>
	);
};

