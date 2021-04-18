import { gql, useMutation } from '@apollo/client';
import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { useForm } from 'react-hook-form';
import { useHistory, useParams } from 'react-router-dom';
import { Button } from '../../components/button';
import {
	createProduct,
	createProductVariables,
} from '../../__generated__/createProduct';

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
	categoryName:string;
	stocks:string;
}

export const AddProduct = () => {
	const { storeId } = useParams<IParams>();
	const history = useHistory();
	const [imageUrl, setImageUrl] = useState('');
	const [uploading, setUploading] = useState(false);



	var notclicked=true;
	const onCompleted = (data: createProduct) => {
		const {
			createProduct: { ok },
		} = data;
		if (ok) {
			setUploading(false);

			history.push(`/stores/${storeId}`);

		}
	};
	const [createProductMutation, { data,loading }] = useMutation<
		createProduct,
		createProductVariables
	>(CREATE_PRODUCT_MUTATION, {
		onCompleted,
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
	const onSubmit = async () => {
		notclicked=false;
		try {
			const { file, name,price,categoryName,description,stocks,...rest} = getValues();
			const optionObjects = optionsNumber.map((theId) => ({
				name: rest[`${theId}-optionName`],
				extra: +rest[`${theId}-optionExtra`],
			}));
			setUploading(true);
			const actualFile = file[0];
			const formBody = new FormData();
			formBody.append('file', actualFile);
			const { url: photo } = await (
				await fetch('http://localhost:3000/uploads/', {
					method: 'POST',
					body: formBody,
				})
			).json();
			setImageUrl(photo);
			console.log(name,
				price,
				photo,
				description,storeId,
				categoryName,stocks);
			createProductMutation({
				variables: {
					input: {
						name,
                        price:+price,
                        photo,
                        description,
                        options:optionObjects,
                        storeId:+storeId,
                        categoryName,
						stocks:+stocks,
					},
				},
			});

		}
		catch (e) {
			console.log(e);
		}

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
					type="number"
					name="stocks"
					min={0}
					placeholder="stocks"
					ref={register({ required: 'stock is required.' })}
				/>
				<input
					className="input"
					type="text"
					name="categoryName"
					placeholder="Category"
					ref={register({ required: 'category is required.' })}
				/>
				<input
					className="input"
					type="text"
					name="description"
					placeholder="Description"
					ref={register({ required: 'Description is required.' })}
				/>
				<div>
					<input
						type="file"
						name="file"
						accept="image/*"
						ref={register({ required: true })}
					/>
				</div>
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
					canClick={formState.isValid && notclicked}

					actionText="Create Product"
				/>
			</form>
		</div>
	);
};

