import { gql, useMutation } from '@apollo/client';
import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { useForm } from 'react-hook-form';
import { useHistory, useParams } from 'react-router-dom';
import { Button } from '../../components/button';
import {
	createProduct,
	createProductVariables,
} from '../../__generated__/createProduct';
import { MY_STORE_QUERY } from './my_store';

const CREATE_PRODUCT_MUTATION = gql`
	mutation createProduct($input: CreateProductInput!) {
		createProduct(input: $input) {
			ok
			error
		}
	}
`;

interface IParams {
	storeId: string;
}

interface IForm {
	name: string;
	price: string;
	description: string;
	[key: string]: string;
}

export const AddProduct = () => {
	const { storeId } = useParams<IParams>();
	const history = useHistory();
	const [createProductMutation, { loading }] = useMutation<
		createProduct,
		createProductVariables
	>(CREATE_PRODUCT_MUTATION, {
		refetchQueries: [
			{
				query: MY_STORE_QUERY,
				variables: {
					input: {
						id: +storeId,
					},
				},
			},
		],
	});
	const {
		register,
		handleSubmit,
		formState,
		getValues,
		setValue,
	} = useForm<IForm>({
		mode: 'onChange',
	});
	const onSubmit = () => {
		const { name, price, description, ...rest } = getValues();
		const optionObjects = optionsNumber.map((theId) => ({
			name: rest[`${theId}-optionName`],
			extra: +rest[`${theId}-optionExtra`],
		}));
		createProductMutation({
			variables: {
				input: {
					name,
					price: +price,
					description,
					storeId: +storeId,
					options: optionObjects,
				},
			},
		});
		history.goBack();
	};
	const [optionsNumber, setOptionsNumber] = useState<number[]>([]);
	const onAddOptionClick = () => {
		setOptionsNumber((current) => [Date.now(), ...current]);
	};
	const onDeleteClick = (idToDelete: number) => {
		setOptionsNumber((current) => current.filter((id) => id !== idToDelete));
		setValue(`${idToDelete}-optionName`, '');
		setValue(`${idToDelete}-optionExtra`, '');
	};
	return (
		<div className="container flex flex-col items-center mt-52">
			<Helmet>
				<title>Add Product | Nuber Eats</title>
			</Helmet>
			<h4 className="font-semibold text-2xl mb-3">Add Product</h4>
			<form
				onSubmit={handleSubmit(onSubmit)}
				className="grid max-w-screen-sm gap-3 mt-5 w-full mb-5"
			>
				<input
					className="input"
					type="text"
					name="name"
					placeholder="Name"
					ref={register({ required: 'Name is required.' })}
				/>
				<input
					className="input"
					type="number"
					name="price"
					min={0}
					placeholder="Price"
					ref={register({ required: 'Price is required.' })}
				/>
				<input
					className="input"
					type="text"
					name="description"
					placeholder="Description"
					ref={register({ required: 'Description is required.' })}
				/>
				<div className="my-10">
					<h4 className="font-medium  mb-3 text-lg">Product Options</h4>
					<span
						onClick={onAddOptionClick}
						className="cursor-pointer text-white bg-gray-900 py-1 px-2 mt-5 bg-"
					>
						Add Product Option
					</span>
					{optionsNumber.length !== 0 &&
						optionsNumber.map((id) => (
							<div key={id} className="mt-5">
								<input
									ref={register}
									name={`${id}-optionName`}
									className="py-2 px-4 focus:outline-none mr-3 focus:border-gray-600 border-2"
									type="text"
									placeholder="Option Name"
								/>
								<input
									ref={register}
									name={`${id}-optionExtra`}
									className="py-2 px-4 focus:outline-none focus:border-gray-600 border-2"
									type="number"
									min={0}
									placeholder="Option Extra"
								/>
								<span
									className="cursor-pointer text-white bg-red-500 ml-3 py-3 px-4 mt-5 bg-"
									onClick={() => onDeleteClick(id)}
								>
									Delete Option
								</span>
							</div>
						))}
				</div>
				<Button
					loading={loading}
					canClick={formState.isValid}
					actionText="Create Product"
				/>
			</form>
		</div>
	);
};
