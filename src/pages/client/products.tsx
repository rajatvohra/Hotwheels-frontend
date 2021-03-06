import { gql, useQuery } from '@apollo/client';
import React, { useEffect, useState } from 'react';
import { Store } from '../../components/store';
import { CATEGORY_FRAGMENT, PRODUCT_FRAGMENT, STORE_FRAGMENT } from '../../fragments';
import { useForm } from 'react-hook-form';
import {  Link, useHistory } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { products, productsVariables } from '../../__generated__/products';
import { Product } from '../../components/product';
import { UserRole } from '../../__generated__/globalTypes';
import { useMe } from '../../hooks/useMe';
import { category } from '../../__generated__/category';
import { allCategories } from '../../__generated__/allCategories';
import { filterProduct, filterProductVariables } from '../../__generated__/filterProduct';


export const PRODUCTS_QUERY = gql`
	query products($input: ProductsInput!) {
		products(input: $input) {
			ok
			error
			totalPages
			totalResults
			results {
				...ProductParts
			}
		}
	}
	${PRODUCT_FRAGMENT}
`;

const FILTER_PRODUCT_QUERY = gql`
	query filterProduct($input: FilterProductInput!){
		filterProduct(input: $input) {
			ok
			error
			totalPages
			totalResults
			products {
				...ProductParts
			}
		}
	}
	${PRODUCT_FRAGMENT}
`;

const ALL_CATEGORTIES_QUERY = gql`
	query allCategories {
		allCategories {
			ok
			error
			categories {
				...CategoryParts
			}
		}
	}
	${CATEGORY_FRAGMENT}
`;

interface IFormProps {
	searchTerm: string;
}

export const Products = () => {
	const [page, setPage] = useState(1);
	const [filterOn, setfilterOn] = useState(false);
	const{data:UserData}=useMe();
	const { data, loading } = useQuery<products,productsVariables>(
		PRODUCTS_QUERY,
		{
			variables: {
				input: {
					page,
				},
			},
		}
	);
	const { data:FilterData, loading:filterloading } = useQuery<filterProduct,filterProductVariables>(
		FILTER_PRODUCT_QUERY,
		{
			variables: {
				input: {
					page:1,
					radiusInKm:1000,
				},
			},
		}
	);
	const { data:CategoryData, loading:CategoryLoading } = useQuery<allCategories>(
		ALL_CATEGORTIES_QUERY,

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
	const triggerFilter=()=>{

		setfilterOn(true);
	}
	return (
		<div className="bg-gray-800  min-h-screen h-max">
		<div>
			<Helmet>
				<title>Home | Hotwheels</title>
			</Helmet>
			<div>
			<form
				onSubmit={handleSubmit(onSearchSubmit)}
				className="bg-gray-800 w-full py-12  items-center justify-center grid grid-rows-2 space-y-2"
			>
				<div>
				<input
					ref={register({ required: true, min: 3 })}
					name="searchTerm"
					type="Search"
					className="input rounded-md border-0 w-full"
					placeholder="Search products..."
				/>
				</div>
				<div>
				<p>
				<button className=" text-lime-400 mt-1 mr-2 items-center justify-center ml-10 hover:underline hover:text-lime-500 transition duration-500 ease-in text-center transform  hover:scale-95 " onClick={triggerFilter}>Filter By location</button>
				</p>
				</div>


			</form>
			</div>
			<div className="bg-gray-500  h-1 mx-4">
						<p></p>
				</div>

			{!CategoryLoading && <div className="max-w-screen-2xl mx-auto mt-8">
          <div className="flex justify-around max-w-lg mx-auto ">
		  {CategoryData?.allCategories.categories?.map((category) => (
              <Link key={category.id} to={`/category/${category.slug}`} className="transition duration-400 ease-in text-center transform  hover:scale-125">
                <div className="flex flex-col group items-center cursor-pointer">
                  <div
                    className=" w-24 h-24 bg-cover group-hover:bg-gray-100 rounded-full"
                    style={{ backgroundImage: `url(${category.coverImg})` }}
                  ></div>
                  <span className="mt-1 text-sm text-center font-medium text-lime-400">
                    {category.name}
                  </span>
                </div>
              </Link>
            ))}
          </div>
		  </div>}

			{!loading &&!filterOn  && (
				<div className="">

				<div className="max-w-screen-2xl pb-20 mx-auto mt-8">


					<div className="grid mt-16 md:grid-cols-3 gap-x-5 gap-y-10">
						{data?.products.results?.map((product) => (
							<Product
								id={product.id}
								description={product.description}
								name={product.name}
                                photo={product.photo}
                                Categoryname={product.category?.name}
                                price={product.price}
							/>

						))}
					</div>
					<div className="grid grid-cols-3 text-center max-w-md items-center mx-auto mt-10 text-white">
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
							Page {page} of {data?.products.totalPages}
						</span>
						{page !== data?.products.totalPages ? (
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
				</div>
			)}
			{!loading &&filterOn  && (
				<div className="max-w-screen-2xl pb-20 mx-auto mt-8">


					<div className="grid mt-16 md:grid-cols-3 gap-x-5 gap-y-10">
						{FilterData?.filterProduct?.products && FilterData?.filterProduct?.products.map((product) => (
							<Product
								id={product.id}
								description={product.description}
								name={product.name}
                                photo={product.photo}
                                Categoryname={product.category?.name}
                                price={product.price}
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
							Page {page} of {FilterData?.filterProduct?.totalPages}
						</span>
						{page !== FilterData?.filterProduct?.totalPages ? (
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
		</div>
	);
};
