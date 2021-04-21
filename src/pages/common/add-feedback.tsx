

import { gql, useApolloClient, useMutation, useQuery } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { useForm } from "react-hook-form";
import { useHistory, useParams } from "react-router-dom";
import { Button } from "../../components/button";
import { createFeedbackVariables,createFeedback} from "../../__generated__/createFeedback";
import { editProduct,editProductVariables } from "../../__generated__/editProduct";



const CREATE_FEEDBACK_MUTATION=gql`
mutation createFeedback($input: FeedbackInput!){
    createFeedback(input: $input){
			ok
			error
		}
	}

	`


interface IFormProps {
  complaint:string;
}

interface IParams {
    id?: string;
  }




export const GiveFeedback = () => {
  const params = useParams<IParams>();

  const history=useHistory();
  const onCompleted = () => {
   alert("Thank you for your valuable Feedback");

  };
  const [createFeedback, { loading }] = useMutation<
    createFeedback,
    createFeedbackVariables
  >(CREATE_FEEDBACK_MUTATION, {
    onCompleted,
  });
  const { register, handleSubmit, getValues, formState } = useForm<IFormProps>({
    mode: "onChange",

  });
  const onSubmit = () => {
    const { complaint } = getValues();
    createFeedback({
      variables: {
        input: {
            complaint,
          productId:+(params.id+""),
        },
      },
    });
  };
  return (
    <div className="mt-52 flex flex-col justify-center items-center">
      <Helmet>
      <title>
        Nuber |Feedbck Page
      </title>
    </Helmet>
      <h4 className="font-semibold text-2xl mb-3">Give Feedback</h4>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid max-w-screen-sm gap-3 mt-5 w-full mb-5"
      >
        <input
          ref={register}
          name="complaint"
          className="input"
          type="complaint"
          placeholder="Feedback"
        />
        <Button
          loading={loading}
          canClick={formState.isValid}

          actionText="Submit FeedBack"
        />
      </form>
    </div>
  );
};