import React from 'react';
import { store_store_store_menu_options } from '../__generated__/store';

interface IProductProps {
	id?: number;
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

export const Product: React.FC<IProductProps> = ({
	id = 0,
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
	return (
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
				<h4 className="font-medium">{description}</h4>
			</div>
			<span>${price}</span>
			{isCustomer && options && options?.length !== 0 && (
				<div>
					<h5 className="mt-8 mb-3 font-medium">Product Options:</h5>
					<div className="grid gap-2  justify-start">{productOptions}</div>
				</div>
			)}
		</div>
	);
};
