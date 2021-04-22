import React from 'react';
import avatar1 from '../images/avatar1.svg';
export const Test=()=>{
    return (
		<div className="w-72 mx-40 shadow-lg rounded-lg bg-white space-x-2">
			<div key ={1} className="flex justify-center md:justify-end -mt-16">
					<img className="w-20 h-20 object-cover rounded-full " src={avatar1}></img>
			</div>
			<div key={2} >
				<h2 className="text-gray-800 text-3xl font-semibold">Design Tools</h2>
				<p className="mt-2 text-gray-600">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae dolores deserunt ea doloremque natus error, rerum quas odio quaerat nam ex commodi hic, suscipit in a veritatis pariatur minus consequuntur!</p>
			</div>
			<div key={3} className="flex justify-end mt-4">
	 			<h5 className="text-xl font-medium text-indigo-500 mr-2 mb-1">John Doe</h5>
	 		</div>
		</div>


    )
}

// {/* <div className="">


// 			<div>
// 		</div>
// 		<div className="flex justify-end mt-4">
// 			<h5 className="text-xl font-medium text-indigo-500">John Doe</h5>
// 		</div>
// 		</div>
// 		</div> */}