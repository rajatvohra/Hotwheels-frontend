import React from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";

export const NotFound = () => (
  <div className="bg-gray-800  min-h-screen h-max">
  <div className="h-screen flex flex-col items-center justify-center">
    <Helmet>
      <title>
        Nuber | Not Found
      </title>
    </Helmet>
    <h2 className="font-semibold text-2xl mb-3 text-gray-500">Page Not Found.</h2>
    <h4 className="font-medium text-base mb-5 text-gray-500">
      The page you're looking for does not exist or has moved.
    </h4>
    <Link className="link" to="/">
      Go back home &rarr;
    </Link>
  </div>
  </div>
);