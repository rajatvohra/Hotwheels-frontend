import {  useMutation } from "@apollo/client";
import gql from "graphql-tag";
import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { FormError } from "../components/form-error";
import logo from "../images//logo.svg";
import { Button } from "../components/button";
import { Link, useHistory } from "react-router-dom";
import  { Helmet } from "react-helmet";
import { UserRole } from "../__generated__/globalTypes";
import { createAccountMutation, createAccountMutationVariables } from "../__generated__/createAccountMutation";
import bg1 from '../images/bg1.jpg';

const email_pattern=/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/



const CREATE_ACCOUNT_MUTATION= gql `
    mutation createAccountMutation($createAccountInput: CreateAccountInput!){
        createAccount(input:$createAccountInput){
            ok
            error
        }
    }
    `;

interface ICreateAccountForm{
        email: string;
        password: string;
        role: UserRole;
        location: string;
        password_repeat:string;
    }

export const CreateAccount=()=>{
    const {register,getValues,handleSubmit,errors,formState,watch}=useForm<ICreateAccountForm>({mode:'onChange',
    defaultValues: {
        role: UserRole.Client,},
      });
    const history=useHistory();
    const onCompleted=(data:createAccountMutation)=>{
        const{
            createAccount:{ok,error},
        }=data;
        if(ok){
            //redirect to login page;
            alert("Account Created! ,You can Log in now!");
            history.push("/");
        }else{
            console.log(error);
        }
    }
    const[createAccountMutation,{loading,data:CreateAccountMutationResult},]=useMutation<createAccountMutation,createAccountMutationVariables>(CREATE_ACCOUNT_MUTATION
        ,{onCompleted,});
    const onSubmit = () => {
        if (!loading) {
        const { email, password, role,location,password_repeat } = getValues();
        createAccountMutation({
            variables: {
            createAccountInput: { email, password, role,location },
            },
        });
        }
    };
    const password = useRef({});
    password.current = watch("password", "");
    console.log(password.current);


    return <div>
    <Helmet>
        <title>Create An Account</title>
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
            <input ref={register({required:"email is required",
            pattern: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,})}
            required
            type="email"
            name="email"
            placeholder="Email"
            className="block w-full p-4 text-lg rounded-sm bg-black "/>
            {
                errors.email?.message && (<FormError errorMessage={errors.email?.message}/>)
            }
            {errors.email?.type === "pattern" && (
                <FormError errorMessage={"Please enter a valid email"} />
            )}
            <input ref={register({required:"password is required"})}
            required
            type="password"
            name="password"
            placeholder="Password"
            className="block w-full p-4 text-lg rounded-sm bg-black"/>
            {
                errors.password?.message && (<FormError errorMessage={errors.password?.message}/>)
            }
            {
                errors.password?.type==="minLength" && (<FormError errorMessage="Atleast 10 char are required" />)
            }
            <input
                ref={register({
                    validate: value =>
                      value === password.current || "The passwords do not match"
                  })}
                required
                type="password"
                name="password_repeat"
                placeholder="Repeat Password"
                className=" block w-full p-4 text-lg rounded-sm bg-black"/>

                {
                    errors.password_repeat?.message  && (<FormError errorMessage={errors.password_repeat?.message}/>)
                }
                {
                    errors.password?.message  && (<FormError errorMessage={errors.password?.message}/>)
                }

                <input
                ref={
                    register(
                        {
                            required:"location is required",

                        })}
                type="input"
                name="location"
                placeholder="Location"
                className=" block w-full p-4 text-lg rounded-sm bg-black"/>

            <select
                name="role"
                ref={register({ required: true })}
                className="block w-full p-4 text-lg rounded-sm bg-black"
            >
                {Object.keys(UserRole).map((role,index) => (
                <option key={index}>{role}</option>
                ))}
            </select>
                        <div className="px-4 pb-2 pt-4">
							<button className="uppercase block w-full p-4 text-lg rounded-full bg-indigo-500 hover:bg-indigo-600 focus:outline-none">Create Account</button>
						</div>
                {CreateAccountMutationResult?.createAccount.error &&<FormError errorMessage={CreateAccountMutationResult?.createAccount.error}/>}
            </form>
            <div className="text-lg text-white py-3">
                Already have an account,<Link className="text-indigo-500 hover:text-indigo-600 hover:underline" to="/">Login now</Link>
            </div>
        </div>
            </div>
        </div>
        </body>
        </div>
};
