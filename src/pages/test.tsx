import React from 'react';
import logo from '../images/logo.svg';
import bg1 from '../images/bg1.jpg';
export const Test=()=>{
    return (

		<div className="md:flex shadow-lg  mx-6 md:mx-auto my-40 max-w-lg md:max-w-2xl h-64 transition duration-500 ease-in transform  hover:scale-105">
		<img className="h-full w-full md:w-1/3  object-cover rounded-lg rounded-r-none pb-5/6" src="https://ik.imagekit.io/q5edmtudmz/FB_IMG_15658659197157667_wOd8n5yFyXI.jpg" />
		<div className="w-full md:w-2/3 px-4 py-4 bg-white rounded-lg">
			<div className="flex items-center">
				<h2 className="text-xl text-gray-800 font-medium mr-auto">Your Travel Buddy</h2>
			</div>
			<p className="text-sm text-gray-700 mt-4">
				Lorem, ipsum dolor sit </p>
			<p className="text-sm text-gray-700 mt-4">
				Lorem, ipsum dolor sit </p>
			<p className="text-sm text-gray-700 mt-4">
				Lorem, ipsum dolor sit </p>
			<p className="text-sm text-gray-700 mt-4">
				Lorem, ipsum dolor sit </p>

			<div className="flex items-center justify-end mt-4 top-auto">
				<button className=" bg-blue-600 text-gray-200 px-2 py-2 rounded-md ">View Order #3</button>
			</div>
		</div>
		</div>

    )
}