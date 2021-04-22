import React from 'react';
import avatar1 from '../images/avatar1.svg';
export const Test=()=>{
    return (
		<div className="grid grid-cols-2">
			<div key={1}>
				<img src={avatar1}/>
			</div>
			<div key={2}>
				<h1>HI</h1>
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