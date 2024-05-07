// lk/page.tsx
"use client"
import React from 'react';
import { useQuery, gql } from '@apollo/client';
import SidebarMenu from '../components/SidebarMenu';
import PersonalCabinetContent from '../components/PersonalCabinetContent';

const GET_PRODUCT_CATEGORIES = gql`
  query getProductCategories {
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
  const { data, loading, error } = useQuery(GET_PRODUCT_CATEGORIES);

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
          <p>Loading...</p>
        ) : error ? (
          <p>Error: {error.message}</p>
        ) : (
          data.productCategories.map((category: { id: React.Key | null | undefined; name: string | number | bigint | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<React.AwaitedReactNode> | null | undefined; desc: string | number | bigint | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<React.AwaitedReactNode> | null | undefined; _count: { products: string | number | bigint | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<React.AwaitedReactNode> | null | undefined; }; }) => (
            <div key={category.id}>
              <h2>{category.name}</h2>
              <p>{category.desc}</p>
              <p>Number of products: {category._count.products}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default PersonalCabinet;
