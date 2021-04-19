
import gql from "graphql-tag";
import React, { useEffect } from "react";
import {  useHistory, useParams } from "react-router-dom";
import  { Helmet } from "react-helmet";
import { useLazyQuery, useQuery } from "@apollo/client";
import { otpVerify, otpVerifyVariables } from "../__generated__/otpVerify";
import logo from "../images//logo.svg";
import { useForm } from "react-hook-form";
import { Button } from "../components/button";
import { authTokenVar, isLoggedInVar } from "../apollo";
import { LOCALSTORAGE_TOKEN } from "../constants";
import { FormError } from "../components/form-error";



const OTPVERIFY_QUERY = gql`
  query otpVerify($input: OTPInput!) {
    otpVerify(input: $input) {
      ok
      error
      token
    }
  }
`;

export const OTP=()=>{
    const params=useParams<{id:string}>();
    const id=params.id;
    const history=useHistory();
    const {register,getValues,handleSubmit,errors,formState}=useForm<{otp:string}>({mode:'onChange',});

    const [callQuery, { loading, data }] = useLazyQuery<
      otpVerify,otpVerifyVariables
    >(OTPVERIFY_QUERY);
    const onSubmit =()=>{
      const {otp} =getValues();
      callQuery({
        variables: {
          input: {
            otp:+otp ,
            id:+id
          },
        },
      });
      console.log(data,errors,"testing");
      if(data?.otpVerify.ok&&data.otpVerify.token ){
        localStorage.setItem(LOCALSTORAGE_TOKEN, data.otpVerify.token);
        authTokenVar(data.otpVerify.token);
        isLoggedInVar(true);
        console.log("logged in");
        history.push("/");
        window.location.reload();
      }


    }



    return <div className="h-screen flex items-center justify-center bg-cyan-900    ">
        <Helmet>
            <title>otp verification</title>
        </Helmet>
        <div className="bg-teal-600  bg-opacity-90 w-full max-w-sm flex flex-col items-center  py-10 rounded-lg text-center">
        <img src ={logo} className=" w-60 " />
        <h4 className="w-screen font-medium ml-1 text-xl mt-6 ">Let's get Started </h4>
            <form onSubmit={handleSubmit(onSubmit)}
             className="grid gap-3 mt-6 px-6 w-full">

                <input ref={register({required:"OTP is required",
                    maxLength: {
                      value: 6,
                      message: "Max length is 6"
                  }
              })}
                required
                type="number"
                name="otp"
                placeholder="OTP"
                className=" input text-black ring border-red-800  focus:ring-offset-black focus:ring-indigo-900 focus:ring-inset focus:outline-none"/>
                {
                    data?.otpVerify.error  && (<FormError errorMessage={data?.otpVerify.error}/>)
                }

                <Button canClick={!formState.isSubmitted} loading={loading}  actionText={"Verify"}/>

            </form>

        </div>
    </div>
};

