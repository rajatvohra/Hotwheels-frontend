

import { gql, useApolloClient, useMutation, useQuery } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { useForm } from "react-hook-form";
import { useHistory, useParams } from "react-router-dom";
import { Button } from "../../components/button";
import { editProduct,editProductVariables } from "../../__generated__/editProduct";



const EDIT_PRODUCT_MUTATION=gql`
mutation editProduct($input: EditProductInput!){
		editProduct(input: $input){
			ok
			error
		}
	}

	`


interface IFormProps {
  stocks: number;
  dateNextAvailable?:string;
}

interface IParams {
    id?: string;
  }




export const EditProduct = () => {
  const params = useParams<IParams>();
  //params.id=productid

  const history=useHistory();
  const onCompleted = (data: editProduct) => {
    const {
      editProduct: { ok },
    } = data;
    if (ok) {
      history.goBack();
    }
  };
  const [editProduct, { loading }] = useMutation<
    editProduct,
    editProductVariables
  >(EDIT_PRODUCT_MUTATION, {
    onCompleted,
  });
  const { register, handleSubmit, getValues, formState } = useForm<IFormProps>({
    mode: "onChange",

  });
  const onSubmit = () => {
    const { stocks,dateNextAvailable } = getValues();
    console.log(stocks);
    editProduct({
      variables: {
        input: {
          stocks:+(stocks),
          dateNextAvailable,
          productId:+(params.id+""),
        },
      },
    });
  };
  return (
    <div className="bg-gray-800 h-screen">
    <div className=" flex flex-col justify-center items-center">
      <Helmet>
      <title>
        Nuber |Edit Product
      </title>
    </Helmet>
      <h4 className="font-semibold text-2xl mb-3 mt-52 text-gray-500">Edit Product</h4>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="sm:w-2/3 w-full px-4 lg:px-0 mx-auto space-y-4"
      >

        <input
          ref={register}
          name="stocks"
          className="input"
          type="number"
          placeholder="Update Stock"
        />
        <input
          ref={register}
          name="dateNextAvailable"
          className="input"
          type="dateNextAvailable"
          placeholder="dateNextAvailable"
        />
        <Button
          loading={loading}
          canClick={formState.isValid}

          actionText="Update Product"
        />
      </form>
    </div>
    </div>
  );
};