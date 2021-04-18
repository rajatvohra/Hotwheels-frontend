import { gql, useMutation } from '@apollo/client';
import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useMe } from '../hooks/useMe';
import { deleteProduct, deleteProductVariables } from '../__generated__/deleteProduct';
import { UserRole } from '../__generated__/globalTypes';
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
	const onClick = () => {
		if (orderStarted) {
			if (!isSelected && addItemToOrder) {
				return addItemToOrder(id);
			}
			if (isSelected && removeFromOrder) {
				return removeFromOrder(id);
			}
		}
	};
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
		<Link to={`/product/${id}`}>
		<div
			className={` px-8 py-4 border cursor-pointer  transition-all ${
				isSelected ? 'border-gray-800' : ' hover:border-gray-800'
			}`}
		>
			<div className="mb-5">


				<div
					style={{ backgroundImage: `url(${photo})` }}
					className="bg-cover bg-center mb-3 py-28"
				></div>
				<h3 className="text-lg font-medium flex object-right ">
					{name}{' '}

					{orderStarted && (
						<button
							className={`ml-3 py-1 px-3 focus:outline-none text-sm  text-white ${
								isSelected ? 'bg-red-500' : ' bg-lime-600'
							}`}
							onClick={onClick}
						>
							{isSelected ? 'Remove' : 'Add'}
						</button>
					)}
				</h3>
				<h5>
					{Categoryname}
				</h5>
				<h4 className="font-medium">{description}</h4>
			</div>
			<span>${price}</span>
			<div><span>
				{UserData?.me.role===UserRole.Owner &&(<Link to={`/edit-product/${id}`}  className="  text-white bg-gray-500 py-1 px-6 mb-1 ml-64">
						Edit
					</Link>)}
				{UserData?.me.role===UserRole.Owner &&(<button onClick={ondelete} className="  text-white bg-red-500 py-1 px-2 mt-6 ml-4 ">
							Delete
						</button>)}


					</span>
				</div>

		</div>
		</Link>
	);
};
