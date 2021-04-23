import { gql, useMutation, useQuery } from '@apollo/client';
import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useMe } from '../hooks/useMe';
import { PRODUCT_QUERY } from '../pages/client/product-page';
import { deleteProduct, deleteProductVariables } from '../__generated__/deleteProduct';
import { UserRole } from '../__generated__/globalTypes';
import { product, productVariables } from '../__generated__/product';
import { store_store_store_menu_options } from '../__generated__/store';

interface IProductProps {
	id: number;
	description: string;
	photo:string | null;
	name: string;
	Categoryname: string | undefined;
	price: number;
	isCustomer?: boolean;
	orderStarted?: boolean;
	isSelected?: boolean;
	options?: store_store_store_menu_options[] | null;
	addItemToOrder?: (productId: number) => void;
	removeFromOrder?: (productId: number) => void;
}



const DELETE_PRODUCT_MUTATION=gql`
	mutation deleteProduct($deleteproductinput: DeleteProductInput!){
		deleteProduct(input: $deleteproductinput) {
			ok
			error
		}
	}
`

export const Product: React.FC<IProductProps> = ({
	id ,
	description,
	Categoryname,
	name,
	price,
	isCustomer = false,
	orderStarted = false,
	options,
	photo,
	isSelected,
	addItemToOrder,
	removeFromOrder,
	children: productOptions,
}) => {
	const { data:Productdata } = useQuery<product,productVariables>(
		PRODUCT_QUERY,
		{
			variables: {
				input: {
					productId:id,
				},
			},
		}
	);
	const history = useHistory();
	const[DeleteProduct,{data,loading}]=useMutation<deleteProduct,deleteProductVariables>(DELETE_PRODUCT_MUTATION);
	const ondelete=()=>{
		DeleteProduct(
			{variables: {
				deleteproductinput: {
					productId: id,
				},
			},
		});
		console.log(id);
		window.location.reload();
	}
	const { data:UserData } = useMe();
	return (
		<div>
		<div>
			<div className="ml-10    ">
			<div className="max-w-xs bg-white shadow-lg rounded-lg overflow-hidden my-10 ring-2 ring-gray-400 transition duration-500 ease-in text-center transform hover:-translate-y-1  hover:scale-110  ">
				<div className="px-4 py-2">
					<h1 className="text-indigo-900 font-bold text-3xl uppercase">{name}</h1>
					<p className="text-gray-600 text-sm m-1 max-h-6 italic ">{(description.slice(0,150))}...	</p>
				</div>
				<img className="h-56 w-full object-cover mt-2" src={photo+""} alt="NIKE AIR"/>
				<div className="flex items-center space-x-4 px-4 py-2 bg-gray-900">
					<h1 className="text-green-500 font-bold text-xl">₹ {price}</h1>
					{(UserData?.me.role===UserRole.Owner && Productdata?.product.product?.store.owner.role===UserRole.Owner) &&(<Link to={`/edit-product/${id}`}  className="  text-red-500 hover:text-red-600 hover:underline">
							Edit
						</Link>)}
					{(UserData?.me.role===UserRole.Retailer && Productdata?.product.product?.store.owner.role===UserRole.Retailer) &&(<Link to={`/edit-product/${id}`}  className="text-red-500 hover:text-red-600 hover:underline">
							Edit
						</Link>)}
					{(UserData?.me.role===UserRole.Owner && Productdata?.product.product?.store.owner.role===UserRole.Owner) &&(<button onClick={ondelete} className="  text-red-500 hover:text-red-600 hover:underline">
								Delete
							</button>)}
					{(UserData?.me.role===UserRole.Retailer && Productdata?.product.product?.store.owner.role===UserRole.Retailer) &&(<button onClick={ondelete} className="  text-red-500 hover:text-red-600 hover:underline">
								Delete
							</button>)}
					<Link to={`/product/${id}`} className="absolute bottom-0 right-0 transition duration-500 text-white  text-center transform  hover:bg-blue-500 bg-black  text-3xl  font-semibold rounded h-11  w-14 ArrowForwardIosIcon">&rarr;</Link>
					<div><span>



					</span>
				</div>
				</div>
				</div>
				</div>
		</div>

		</div>
	);
	};


// // <div className="mb-5">


// // 				<div
// // 					style={{ backgroundImage: `url(${photo})` }}
// // 					className="bg-cover bg-center mb-3 py-28"
// // 				></div>
// // 				<h3 className="text-lg font-medium flex object-right ">
// // 					{name}{' '}

// // 					{orderStarted && (
// // 						<button
// // 							className={`ml-3 py-1 px-3 focus:outline-none text-sm  text-white ${
// // 								isSelected ? 'bg-red-500' : ' bg-lime-600'
// // 							}`}
// // 							onClick={onClick}
// // 						>
// // 							{isSelected ? 'Remove' : 'Add'}
// // 						</button>
// // 					)}
// // 				</h3>
// // 				<h5>
// // 					{Categoryname}
// // 				</h5>
// // 				<h4 className="font-medium">{description}</h4>
// // 			</div>
// // 			<span>${price}</span>
// 			<div><span>
// 				{UserData?.me.role===UserRole.Owner &&(<Link to={`/edit-product/${id}`}  className="  text-white bg-gray-500 py-1 px-6 mb-1 ml-64">
// 						Edit
// 					</Link>)}
// 				{UserData?.me.role===UserRole.Owner &&(<button onClick={ondelete} className="  text-white bg-red-500 py-1 px-2 mt-6 ml-4 ">
// 							Delete
// 						</button>)}


// 					</span>
// 				</div>

// // 		</div>