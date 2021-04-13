import React from 'react';
import { Link } from 'react-router-dom';

interface IStoreProps {
	id: string;
	coverImg?: string;
	name: string;
	categoryName?: string;
}

export const Store: React.FC<IStoreProps> = ({
	id,
	coverImg,
	name,
}) => (
	<Link to={`/stores/${id}`}>
		<div className="flex flex-col">
			<div
				style={{ backgroundImage: `url(${coverImg})` }}
				className="bg-cover bg-center mb-3 w-1/4 py-28"
			></div>
			<h3 className="text-xl">{name}</h3>
		</div>
	</Link>
);
