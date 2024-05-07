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
          <div className="p-4">
            {data.productCategories.map((category: { id: React.Key | null | undefined; name: string | number | bigint | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<React.AwaitedReactNode> | null | undefined; desc: string | number | bigint | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<React.AwaitedReactNode> | null | undefined; _count: { products: string | number | bigint | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<React.AwaitedReactNode> | null | undefined; }; }) => (
              <div key={category.id} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                <h2 className="font-bold text-2xl mb-2">{category.name}</h2>
                <p className="text-gray-700 text-base">{category.desc}</p>
                <p className="mt-2 text-gray-500">Продуктов: {category._count.products}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default PersonalCabinet;
