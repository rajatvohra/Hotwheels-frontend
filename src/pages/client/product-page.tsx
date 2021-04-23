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
import { Card, CardActions, CardContent, CardHeader, Input, makeStyles, Typography } from '@material-ui/core';
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

export const PRODUCT_QUERY = gql`
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
		console.log(quantity,"quantity")
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
		<div className="bg-gray-800 h-screen" >
			<Helmet>
				<title>{Productdata?.product.product?.name||''} | Nuber Eats</title>
			</Helmet>

			{!loading && (
				<div className="shadow-2xl rounded-lg ">
					<div key={1} className="grid grid-cols-2">
						<div key={1} className="shadow-2xl rounded-lg mx-4 mb-5 ring-2 ring-offset-2 ring-green-400">
							<img className="rounded-lg" src={Productdata?.product.product?.photo+""} />
						</div>
						<div key={2} className="shadow-2xl rounded-lg mx-4 mb-5 ring-2 ring-offset-2 ring-green-400 space-x-4 bg-white opacity-90	 ">
							<div key={1} className=" leading-tight tracking-tight font-bold text-gray-800 text-2xl md:text-3xl ml-4 mt-4">{Productdata?.product.product?.name}        <Link className="text-indigo-700 hover:underline text-lg font-medium " to={`/category/${Productdata?.product.product?.category?.name}`}>{Productdata?.product.product?.category?.name}</Link></div>
							<p className="text-gray-500 text-sm"> <Link className="text-indigo-600 hover:underline" to={`/stores/${Productdata?.product.product?.store.id}`}>Visit the  {Productdata?.product.product?.store.name}</Link></p>
							<div className="flex items-center space-x-4 my-4">
								<div>
									<div className="rounded-lg bg-blue-100 flex py-2 px-3">
									<span className="text-indigo-400 mr-1 mt-1">Rs</span>
									<span className="font-bold text-indigo-600 text-3xl">{Productdata?.product.product?.price}</span>
									</div>
								</div>
								<div className="flex-1">
									<p className="text-green-500 text-xl font-semibold">Free Shipping</p>
									<p className="text-gray-400 text-sm">Inclusive of all Taxes.</p>
								</div>
							</div>
							<p className="text-gray-500">{Productdata?.product.product?.description}</p>
							<div>
							{(Userdata?.me.role===UserRole.Client || Userdata?.me.role===UserRole.Retailer) && Productdata && Productdata.product && Productdata.product.product && Productdata?.product.product?.stocks>0 &&(
								<div className="flex py-4 space-x-4">
								<div className="relative">
								  <div className="text-center left-0 pt-2 right-0 absolute block text-xs uppercase text-gray-400 tracking-wide font-semibold">Qty</div>
								  <input ref={register({required:"quantity is required",})}
									required
									type="string"
									name="quantity" className=" mt-2 cursor-pointer appearance-none rounded-xl border border-gray-200 pl-4 w-24 pr-8 h-14 flex items-end pb-1">
								  </input>
								</div>
								<button onClick={triggerAddtoCart} className="h-14 px-6 py-2 font-semibold rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white">
								  Buy Now
								</button>
							  </div>

)}

							</div>

						</div>
					</div>





					{Feedbackdata?.feedbacks.totalResults!>0 && (
					<div key={2} className="shadow-lg rounded-lg  border-2 border-blue-400 border-opacity-75 m-2  ">
						<div className="text-center mb-4 mt-2  font-bold text-4xl text-gray-500">Reviews</div>
						<div className="bg-blue-300 h-0.5 border-opacity-75">
							<p></p>
						</div>
						<div className="grid grid-cols-3  mb-6 opacity-90 " >
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
										<h4 className="text-md font-medium text-indigo-500 mr-2 mb-1 ">{(result.createdAt).slice(2,10)}</h4>
									</div>
								</div>
							))}
							</div>
					</div>)}
				</div>
			)}
		</div>
	);
};

