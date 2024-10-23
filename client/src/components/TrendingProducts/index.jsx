import React from "react";
import ProductCard from "./ProductCard";
import Loading from "../Loading";

export default function TrendingProducts({ products }) {
  return (
    <div className="container mt-5 mb-5">
      <div className="row mt-4">
        <div className="seven mb-5">
          <h1 className="m-0">Trending Products</h1>
        </div>
        {products.length > 0 ? (
          products
            .filter((product) => product.popular)
            .splice(0, 9)
            .map((product) => (
              <ProductCard key={product.id} product={product} />
            ))
        ) : (
          <div className="col-12 products d-flex justify-content-center align-items-center">
            <Loading />
          </div>
        )}
      </div>
    </div>
  );
}
