import { gql, useQuery } from '@apollo/client';
import React, { useState } from 'react';
import {
	storesPageQuery,
	storesPageQueryVariables,
} from '../../__generated__/storesPageQuery';
import { Store } from '../../components/store';
import { CATEGORY_FRAGMENT, STORE_FRAGMENT } from '../../fragments';
import { useForm } from 'react-hook-form';
import { Link, useHistory } from 'react-router-dom';
import { Helmet } from 'react-helmet';

const STORES_QUERY = gql`
	query storesPageQuery($input: StoresInput!) {
		allCategories {
			ok
			error
			categories {
				...CategoryParts
			}
		}
		stores(input: $input) {
			ok
			error
			totalPages
			totalResults
			results {
				...StoreParts
			}
		}
	}
	${STORE_FRAGMENT}
	${CATEGORY_FRAGMENT}
`;

interface IFormProps {
	searchTerm: string;
}

export const Stores = () => {
	const [page, setPage] = useState(1);
	const { data, loading } = useQuery<storesPageQuery, storesPageQueryVariables>(
		STORES_QUERY,
		{
			variables: {
				input: {
					page,
				},
			},
		}
	);
	const onNextPageClick = () => setPage((current) => current + 1);
	const onPrevPageClick = () => setPage((current) => current - 1);
	const { register, handleSubmit, getValues } = useForm<IFormProps>();
	const history = useHistory();
	const onSearchSubmit = () => {
		const { searchTerm } = getValues();
		history.push({
			pathname: '/search',
			search: `?term=${searchTerm}`,
		});
	};
	return (
		<div>
			<Helmet>
				<title>Home | Nuber Eats</title>
			</Helmet>
			<form
				onSubmit={handleSubmit(onSearchSubmit)}
				className="bg-gray-800 w-full py-40 flex items-center justify-center"
			>
				<input
					ref={register({ required: true, min: 3 })}
					name="searchTerm"
					type="Search"
					className="input rounded-md border-0 w-3/4 md:w-3/12"
					placeholder="Search stores..."
				/>
			</form>
			{!loading && (
				<div className="max-w-screen-2xl pb-20 mx-auto mt-8">
					<div className="flex justify-around max-w-sm mx-auto ">
						{data?.allCategories.categories?.map((category) => (
							<Link key={category.id} to={`/category/${category.slug}`}>
								<div className="flex flex-col group items-center cursor-pointer">
									<div
										className=" w-16 h-16 bg-cover group-hover:bg-gray-100 rounded-full"
										style={{ backgroundImage: `url(${category.coverImg})` }}
									></div>
									<span className="mt-1 text-sm text-center font-medium">
										{category.name}
									</span>
								</div>
							</Link>
						))}
					</div>
					<div className="grid mt-16 md:grid-cols-3 gap-x-5 gap-y-10">
						{data?.stores.results?.map((store) => (
							<Store
								key={store.id}
								id={store.id + ''}
								coverImg={store.coverImg}
								name={store.name}
								categoryName={store.category?.name}
							/>
						))}
					</div>
					<div className="grid grid-cols-3 text-center max-w-md items-center mx-auto mt-10">
						{page > 1 ? (
							<button
								onClick={onPrevPageClick}
								className="focus:outline-none font-medium text-2xl"
							>
								&larr;
							</button>
						) : (
							<div></div>
						)}
						<span>
							Page {page} of {data?.stores.totalPages}
						</span>
						{page !== data?.stores.totalPages ? (
							<button
								onClick={onNextPageClick}
								className="focus:outline-none font-medium text-2xl"
							>
								&rarr;
							</button>
						) : (
							<div></div>
						)}
					</div>
				</div>
			)}
		</div>
	);
};
