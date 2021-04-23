
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
import bg1 from '../images/bg1.jpg';



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



    return <div>
            <Helmet>
              <title>
                Verify OTP
              </title>
            </Helmet>
          <body>
          <div className="min-h-screen flex items-stretch text-white ">
            <div style={{ backgroundImage: `url(${bg1})` }} className="md:flex w-11/12 hidden bg-gray-500 bg-no-repeat bg-cover relative items-center"  >
              <div className="absolute bg-black opacity-60 inset-0 z-0"></div>
            </div>
            <div className="lg:w-1/2 bg-gray-800 w-full flex items-center justify-center text-center md:px-16 px-0 z-0">
              <div className="absolute lg:hidden z-10 inset-0 bg-gray-500 bg-no-repeat bg-cover items-center" style={{ backgroundImage: `url(${bg1})` }} >
                <div className="absolute bg-black opacity-60 inset-0 z-0"></div>
              </div>
              <div className="w-full py-6 z-20">
                <h1 className="my-6">
                  <img className ="w-auto sm:h-32 sm:w-32 inline-flex" src={logo}></img>
                </h1>

                <form onSubmit={handleSubmit(onSubmit)}
                className="sm:w-2/3 w-full px-4 lg:px-0 mx-auto space-y-2">
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
                className="block w-full p-4 text-lg rounded-sm bg-black "/>
                {
                    data?.otpVerify.error  && (<FormError errorMessage={data?.otpVerify.error}/>)
                }
            <div className="px-4 pb-2 pt-4">
                <button className="uppercase block w-full p-4 text-lg rounded-full bg-indigo-500 hover:bg-indigo-600 focus:outline-none">Verify</button>
              </div>
        </form>

        </div>
        </div>
        </div>
        </body>
        </div>
};
