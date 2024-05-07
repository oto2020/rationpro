// testGraph/page.tsx
"use client";
import React from "react";
import { useQuery, gql } from "@apollo/client";
import SidebarMenu from "../components/SidebarMenu";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleNotch } from "@fortawesome/free-solid-svg-icons";

const PRODUCT_CATEGORIES_QUERY = gql`
  query getProductGategories {
    productCategories {
      id
      name
      desc
      _count {
        products
      }
    }
  }
`;

const PersonalCabinet = () => {
  const { data, loading, error } = useQuery(PRODUCT_CATEGORIES_QUERY);

  React.useEffect(() => {
    if (!loading && data) {
      console.log(data);
    }
    if (error) console.error(error);
  }, [loading, data, error]);

  return (
    <div className="flex min-h-screen bg-gray-200">
      <SidebarMenu />
      <div className="text-center mt-5 flex-grow">
        {loading ? (
          <FontAwesomeIcon
            icon={faCircleNotch}
            spin
            className="text-6xl text-green-500"
          />
        ) : error ? (
          <p>Error: {error.message}</p>
        ) : (
          <p>Server Status: {data.serverStatus}</p>
        )}
      </div>
    </div>
  );
};

export default PersonalCabinet;
