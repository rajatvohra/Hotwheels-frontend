import {  useMutation } from "@apollo/client";
import gql from "graphql-tag";
import React, { useRef } from "react";
import { useForm } from "react-hook-form";
import { FormError } from "../components/form-error";
import logo from "../images//logo.svg";
import { Button } from "../components/button";
import { Link, useHistory } from "react-router-dom";
import  { Helmet } from "react-helmet";
import { UserRole } from "../__generated__/globalTypes";
import { createAccountMutation, createAccountMutationVariables } from "../__generated__/createAccountMutation";

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
    return <div className="h-screen flex items-center justify-center bg-cyan-900    ">
        <Helmet>
            <title>Create An Account</title>
        </Helmet>
        <div className="bg-teal-600  bg-opacity-90 w-full max-w-sm flex flex-col items-center  py-10 rounded-lg text-center">
        <img src ={logo} className=" w-60 " />
        <h4 className="w-screen font-medium ml-1 text-xl mt-6 ">Let's get Started </h4>
            <form onSubmit={handleSubmit(onSubmit)}
             className="grid gap-3 mt-6 px-6 w-full">
                <input ref={register({required:"email is required",
                    pattern: email_pattern,
                })}
                required
                type="email"
                name="email"
                placeholder="Email"
                className=" input text-black ring border-red-800 focus:ring-offset-black focus:ring-indigo-900 focus:ring-inset focus:outline-none"/>
                {
                    errors.email?.message && (<FormError errorMessage={errors.email?.message}/>)
                }
                {errors.email?.type === "pattern" && (
                    <FormError errorMessage={"Please enter a valid email"} />
                )}
                <input
                ref={
                    register(
                        {
                            required:"password is required",
                            minLength: {
                                value: 8,
                                message: "Password must have at least 8 characters"
                            }
                        })}
                type="password"
                name="password"
                placeholder="retype Password"
                className=" input text-black ring border-red-800  focus:ring-offset-black focus:ring-indigo-900 focus:ring-inset focus:outline-none"/>

                <input
                ref={register({
                    validate: value =>
                      value === password.current || "The passwords do not match"
                  })}
                required
                type="password"
                name="password_repeat"
                placeholder="password_repeat"
                className=" input text-black ring border-red-800  focus:ring-offset-black focus:ring-indigo-900 focus:ring-inset focus:outline-none"/>

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
                className=" input text-black ring border-red-800  focus:ring-offset-black focus:ring-indigo-900 focus:ring-inset focus:outline-none"/>

            <select
                name="role"
                ref={register({ required: true })}
                className="input"
            >
                {Object.keys(UserRole).map((role,index) => (
                <option key={index}>{role}</option>
                ))}
            </select>
                <Button canClick={formState.isValid} loading={loading} actionText={"Create an Account"}/>
            {CreateAccountMutationResult?.createAccount.error &&<FormError errorMessage={CreateAccountMutationResult?.createAccount.error}/>}
            </form>
            <div className="text-lg text-black py-3">
                Already have an account,<Link to="/">Login now</Link>
            </div>
        </div>
    </div>
};
