import React from 'react';
import logo from '../images/logo.svg';
import bg1 from '../images/bg1.jpg';
export const Test=()=>{
    return (
		<body>
		<div className="min-h-screen flex items-stretch text-white ">
			<div style={{ backgroundImage: `url(${bg1})` }} className="md:flex w-11/12 hidden bg-gray-500 bg-no-repeat bg-cover relative items-center"  >
				<div className="absolute bg-black opacity-60 inset-0 z-0"></div>

			</div>

			<div className="lg:w-1/2 bg-gray-800 w-full flex items-center justify-center text-center md:px-16 px-0 z-0">
				<div className="absolute lg:hidden z-10 inset-0 bg-gray-500 bg-no-repeat bg-cover items-center" style={{ backgroundImage: `url(${bg1})` }} >
					<div className="absolute bg-black opacity-60 inset-0 z-0"></div>
				</div>
				<div className="w-full py-6 z-20">
					<h1 className="my-6">
						<img className ="w-auto sm:h-32 sm:w-32 inline-flex" src={logo}></img>
					</h1>

					<form action="" className="sm:w-2/3 w-full px-4 lg:px-0 mx-auto">
						<div className="pb-2 pt-4">
							<input type="email" name="email" id="email" placeholder="Email" className="block w-full p-4 text-lg rounded-sm bg-black"></input>
						</div>
						<div className="pb-2 pt-4">
							<input className="block w-full p-4 text-lg rounded-sm bg-black" type="password" name="password" id="password" placeholder="Password"/>
						</div>
						<div className="px-4 pb-2 pt-4">
							<button className="uppercase block w-full p-4 text-lg rounded-full bg-indigo-500 hover:bg-indigo-600 focus:outline-none">sign in</button>
						</div>


					</form>
				</div>
			</div>
		</div>
	</body>




    )
}

// {/* <div classNameName="">


// 			<div>
// 		</div>
// 		<div classNameName="flex justify-end mt-4">
// 			<h5 classNameName="text-xl font-medium text-indigo-500">John Doe</h5>
// 		</div>
// 		</div>
// 		</div> */}