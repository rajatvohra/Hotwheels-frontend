import React from 'react';
import { Link } from 'react-router-dom';

interface IStoreProps {
	id: string;
	coverImg?: string;
	name: string;
	categoryName?: string;
	widthFull:Boolean
}

export const RetailerStore: React.FC<IStoreProps> = ({
	id,
	coverImg,
	name,
	widthFull,
}) => (
	<Link to={`/my-stores/${id}`}>
		<div className="flex flex-col">
			<div
				style={{ backgroundImage: `url(${coverImg})` }}
				className={`${widthFull?"bg-cover bg-center mb-3 py-28":"bg-cover bg-center w-1/4  mb-3 py-28"}`}
			></div>
			<h3 className="text-xl">{name}</h3>
		</div>
	</Link>
);
