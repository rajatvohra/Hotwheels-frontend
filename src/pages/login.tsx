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
import bg1 from '../images/bg1.jpg';


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
interface ICoords {
	lat: number;
	lng: number;
}

export const Login = () => {
  const history=useHistory();
  const [driverCoords, setDriverCoords] = useState<ICoords>({ lng: 0, lat: 0 });
  // @ts-ignore
  const onSucces = ({ coords: { latitude, longitude } }: Position) => {
		setDriverCoords({ lat: latitude, lng: longitude });
	};
	// @ts-ignore
	const onError = (error: PositionError) => {
		console.log(error);
	};
	useEffect(() => {
		navigator.geolocation.watchPosition(onSucces, onError, {
			enableHighAccuracy: true,
		});
	}, []);


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
            _geoloc:driverCoords,
          },
        },
      });
    }
  };








  return <div>
          <Helmet>
            <title>
              Login
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
          <div className="px-4 pb-2 pt-4">
							<button className="uppercase block w-full p-4 text-lg rounded-full bg-indigo-500 hover:bg-indigo-600 focus:outline-none">sign in</button>
						</div>
          {loginMutationResult?.login.error
              && (<FormError errorMessage ={loginMutationResult?.login.error}/>) }
      </form>
      <div className="text-lg text-white py-3">
          New here,<Link className="text-indigo-500 hover:text-indigo-600 hover:underline" to="/create-account">Create Account</Link>
      </div>
      </div>
			</div>
		</div>
	</body>
	</div>
};



