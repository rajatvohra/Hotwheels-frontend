import React from 'react';
import logo from '../images/logo.svg';
import bg1 from '../images/bg1.jpg';
export const Test=()=>{
    return (

		<div>
			<div className=" ml-44 transition duration-500 ease-in-out text-center transform hover:-translate-y-1 hover:scale-105   ">
			<div className="max-w-xs bg-white shadow-lg rounded-lg overflow-hidden my-10  ">
				<div className="px-4 py-2">
					<h1 className="text-gray-900 font-bold text-3xl uppercase">NIKE AIR</h1>
					<p className="text-gray-600 text-sm mt-1">Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi quos quidem sequi illum facere recusandae voluptatibus</p>
				</div>
				<img className="h-56 w-full object-cover mt-2" src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80" alt="NIKE AIR"/>
				<div className="flex items-center justify-between px-4 py-2 bg-gray-900">
					<h1 className="text-gray-200 font-bold text-xl">$129</h1>
					<button className="px-3 py-1 bg-gray-200 text-sm text-gray-900 font-semibold rounded">&rarr;</button>
				</div>
				</div>
				</div>
		</div>

    )
}