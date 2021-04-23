import React from 'react';
import { Link } from 'react-router-dom';

interface IStoreProps {
	id: string;
	coverImg?: string;
	name: string;
	categoryName?: string;
	widthFull:Boolean;
	location:string;
}

export const Store: React.FC<IStoreProps> = ({
	id,
	coverImg,
	name,
	widthFull,
	location,
}) => (
	<div className="md:flex shadow-lg  mx-6 md:mx-auto my-10 max-w-lg md:max-w-2xl  transition duration-500 ease-in transform  hover:scale-105">
		<img className=" h-full w-5/12  object-cover rounded-lg rounded-r-none pb-5/6" src={coverImg} />
		<div className="w-full md:w-7/12 px-4 py-4 bg-white opacity-90 rounded-lg">
			<div className="flex items-center">
				<h2 className="text-3xl font-bold text-gray-800 font-medium mr-auto">{name}</h2>
			</div>
			<div>
			<p className="text-lg text-gray-700 mt-4 font-semibold">
				{location} </p>
				</div>
				</div>
			<div className="items-center justify-end  ">
			<Link to={`/stores/${id}`} className="w-7/12  bg-blue-600 text-gray-200 px-2 py-2 rounded-md absolute bottom-0 right-0 transition duration-500  text-center transform  hover:bg-indigo-500  ">View Store</Link>
			</div>

		</div>
);


// <Link to={`/stores/${id}`}>
// 		<div className="flex flex-col">
// 			<div
// 				style={{ backgroundImage: `url(${coverImg})` }}
// 				className={`${widthFull?"bg-cover bg-center mb-3 py-28":"bg-cover bg-center w-1/4  mb-3 py-28"}`}
// 			></div>
// 			<h3 className="text-xl">{name}</h3>
// 		</div>
// 	</Link>