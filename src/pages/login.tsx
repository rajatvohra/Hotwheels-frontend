import { gql, useMutation } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FormError } from "../components/form-error";
import { Helmet } from "react-helmet";
import {
  loginMutation,
  loginMutationVariables,
} from "../__generated__/loginMutation";
import logo from "../images//logo.svg";
import { Link, useHistory } from "react-router-dom";
import { Button } from "../components/button";
import { LOCALSTORAGE_TOKEN } from "../constants";
import { authTokenVar, isLoggedInVar } from "../apollo";


const LOGIN_MUTATION = gql`
  mutation loginMutation($loginInput: LoginInput!) {
    login(input: $loginInput) {
      ok
      userId
      error
    }
  }
`;

interface ILoginForm {
  email: string;
  password: string;
  resultError?: string;
}

export const Login = () => {
  const history=useHistory();
  
	
  const { register, getValues, errors, handleSubmit,formState } = useForm<ILoginForm>({mode:'onChange'});
  const onCompleted = (data: loginMutation) => {
    const {
      login: { ok,
        error,
        userId },
    } = data;
    if (ok ) {
      isLoggedInVar(true);
      console.log(isLoggedInVar());
      history.push(`/${userId}/otp`);
      //console.log(authTokenVar());
    }
  };
  const [loginMutation, { data: loginMutationResult, loading }] = useMutation<
    loginMutation,
    loginMutationVariables
  >(LOGIN_MUTATION, {
    onCompleted,
  });
  const onSubmit = () => {
    if (!loading) {
      const { email, password } = getValues();
      loginMutation({
        variables: {
          loginInput: {
            email,
            password,
          },
        },
      });
    }
  };
  return <div className="h-screen flex items-center justify-center bg-cyan-900    ">
  <Helmet>
      <title>
          Login
      </title>
  </Helmet>
  <div className="bg-teal-600  bg-opacity-90 w-full max-w-sm flex flex-col items-center  py-10 rounded-lg text-center">
  <img src ={logo} className=" w-40" />
      <form onSubmit={handleSubmit(onSubmit)}
       className="grid gap-3 mt-6 px-6 w-full">
          <input ref={register({required:"email is required",
          pattern: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,})}
          required
          type="email"
          name="email"
          placeholder="Email"
          className=" input"/>
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
          className=" input"/>
          {
              errors.password?.message && (<FormError errorMessage={errors.password?.message}/>)
          }
          {
              errors.password?.type==="minLength" && (<FormError errorMessage="Atleast 10 char are required" />)
          }
          <Button canClick={formState.isValid}  loading={loading} actionText={"Login"}/>
          {loginMutationResult?.login.error
              && (<FormError errorMessage ={loginMutationResult?.login.error}/>) }
      </form>
      <div className="text-lg text-black py-3">
          New here,<Link className="link" to="/create-account">Create an Account</Link>
      </div>
  </div>
</div>
};
function token(token: any) {
  throw new Error("Function not implemented.");
}

