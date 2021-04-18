import { faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Link } from 'react-router-dom';
import { useMe } from '../hooks/useMe';
import nuberLogo from '../images/logo.svg';
import { UserRole } from '../__generated__/globalTypes';

export const Header: React.FC = () => {
	const { data } = useMe();
	return (
		<>
			{!data?.me.verified && (
				<div className="bg-red-500 p-3 text-center text-base text-white">
					<span>Please verify your email.</span>
				</div>
			)}

			<header className="py-4">
				<div className="w-full px-5 xl:px-0 max-w-screen-2xl mx-auto flex justify-between items-center">
					<Link to="/">
						<img src={nuberLogo} className="w-44 h-28" alt="Nuber Eats" />
					</Link>
					<span className="text-xs">
					{data?.me.role===UserRole.Retailer && (
								<button className=' mx-5 text-base bg-black text-white p-2  ' >Login as the shop owner</button>
							)}
						<Link to="/my-orders" className='text-base bg-black text-white w-8 h-6 p-2 mr-4'>
							My-Orders
						</Link>
						<Link to="/edit-profile">
							<FontAwesomeIcon icon={faUser} className=" mr-4 text-3xl" />
						</Link>


					</span>

				</div>

			</header>
		</>
	);
};
