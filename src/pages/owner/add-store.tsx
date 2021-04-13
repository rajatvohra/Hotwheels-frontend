import { gql, useApolloClient, useMutation } from '@apollo/client';
import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { useForm } from 'react-hook-form';
import { Button } from '../../components/button';
import { FormError } from '../../components/form-error';
import { MY_STORES_QUERY } from './my_stores';
import {
	createStore,
	createStoreVariables,
} from '../../__generated__/createStore';
import { useHistory } from 'react-router-dom';

const CREATE_STORE_MUTATION = gql`
	mutation createStore($input: CreateStoreInput!) {
		createStore(input: $input) {
			error
			ok
			storeId
		}
	}
`;

interface IFormProps {
	name: string;
	address: string;

	file: FileList;
}

export const AddStore = () => {
	const client = useApolloClient();
	const history = useHistory();
	const [imageUrl, setImageUrl] = useState('');
	const onCompleted = (data: createStore) => {
		const {
			createStore: { ok, storeId },
		} = data;
		if (ok) {
			const { name,  address } = getValues();
			setUploading(false);
			const queryResult = client.readQuery({ query: MY_STORES_QUERY });
			client.writeQuery({
				query: MY_STORES_QUERY,
				data: {
					myStores: {
						...queryResult.myStores,
						stores: [
							{
								address,
								coverImg: imageUrl,
								id: storeId,
								isPromoted: false,
								name,
								__typename: 'Store',
							},
							...queryResult.myStores.stores,
						],
					},
				},
			});
			history.push('/');
		}
	};
	const [createStoreMutation, { data }] = useMutation<
		createStore,
		createStoreVariables
	>(CREATE_STORE_MUTATION, {
		onCompleted,
	});
	const { register, getValues, formState, handleSubmit } = useForm<IFormProps>({
		mode: 'onChange',
	});
	const [uploading, setUploading] = useState(false);
	const onSubmit = async () => {
		try {
			setUploading(true);
			const { file, name, address } = getValues();
			const actualFile = file[0];
			const formBody = new FormData();
			formBody.append('file', actualFile);
			const { url: coverImg } = await (
				await fetch('http://localhost:3000/uploads/', {
					method: 'POST',
					body: formBody,
				})
			).json();
			setImageUrl(coverImg);
			createStoreMutation({
				variables: {
					input: {
						name,
						address,
						coverImg,
					},
				},
			});
		} catch (e) {}
	};
	return (
		<div className="container flex flex-col items-center mt-52">
			<Helmet>
				<title>Add Store | Nuber Eats</title>
			</Helmet>
			<h4 className="font-semibold text-2xl mb-3">Add Store</h4>
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
					type="text"
					name="address"
					placeholder="Address"
					ref={register({ required: 'Address is required.' })}
				/>
				<div>
					<input
						type="file"
						name="file"
						accept="image/*"
						ref={register({ required: true })}
					/>
				</div>
				<Button
					loading={uploading}
					canClick={formState.isValid}
					actionText="Create Store"
				/>
				{data?.createStore?.error && (
					<FormError errorMessage={data.createStore.error} />
				)}
			</form>
		</div>
	);
};
