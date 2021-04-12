import React from 'react';

interface IProductOptionProps {
	isSelected: boolean;
	name: string;
	extra?: number | null;
	productId: number;
	addOptionToItem: (productId: number, optionName: string) => void;
	removeOptionFromItem: (productId: number, optionName: string) => void;
}

export const ProductOption: React.FC<IProductOptionProps> = ({
	isSelected,
	name,
	extra,
	addOptionToItem,
	removeOptionFromItem,
	productId,
}) => {
	const onClick = () => {
		if (isSelected) {
			removeOptionFromItem(productId, name);
		} else {
			addOptionToItem(productId, name);
		}
	};
	return (
		<span
			onClick={onClick}
			className={`border px-2 py-1 ${
				isSelected ? 'border-gray-800' : 'hover:border-gray-800'
			}`}
		>
			<span className="mr-2">{name}</span>
			{<span className="text-sm opacity-75">(${extra})</span>}
		</span>
	);
};
