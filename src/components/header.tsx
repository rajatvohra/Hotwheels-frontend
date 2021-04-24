import { faAddressBook, faAtom, faBook, faSignOutAlt, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { authTokenVar, isLoggedInVar } from '../apollo';
import { LOCALSTORAGE_TOKEN } from '../constants';
import { useMe } from '../hooks/useMe';
import HotwheelsLogo from '../images/logo.svg';
import { UserRole } from '../__generated__/globalTypes';

export const Header: React.FC = () => {
	const { data } = useMe();
	const history=useHistory();
	const triggerlogout=()=>{
		localStorage.setItem(LOCALSTORAGE_TOKEN, "");
        authTokenVar(null);
        isLoggedInVar(false);
        console.log("logged out");
        history.push("/");
        window.location.reload();
	}
	return (
		<div className="bg-gray-800">
			{!data?.me.verified && (
				<div className="bg-red-500 p-3 text-center text-base text-white">
					<span>Please verify your email.</span>
				</div>
			)}

			<header className="py-4  mx-4  ">
				<div className="w-full px-5 xl:px-0 max-w-screen-2xl mx-auto flex justify-between items-center">
					<Link to="/">
						<img src={HotwheelsLogo} className="w-44 h-28" alt="Hotwheels" />
					</Link>
					<span className="text-xs">
					{data?.me.role===UserRole.Retailer && (
								<Link to='/my-stores' className=' mx-5 text-base text-gray-400  p-2 hover:underline hover:text-gray-300 ' >Login as the shop owner</Link>
							)}
						<Link to="/my-orders"className="mt-16" >
							<FontAwesomeIcon icon={faBook} className=" mr-4 text-3xl text-gray-400" />
						</Link>
						<Link to="/edit-profile"className="mt-16">
							<FontAwesomeIcon icon={faUser} className=" mr-4 text-3xl text-gray-400" />
						</Link>
						<button onClick={triggerlogout} className="mt-16">
						<FontAwesomeIcon icon={faSignOutAlt} className=" mr-4 text-3xl text-gray-400" /></button>


					</span>

				</div>
				<div className="bg-gray-500  h-1">
						<p></p>
				</div>

			</header>
		</div>
	);
};
