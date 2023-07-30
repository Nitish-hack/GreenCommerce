import React from "react";
import Layout from "./../components/Layout/Layout";
import { useSearch } from "../context/search";
import ProductCard from "../components/latestProduct/ProductCard";
const Search = () => {
  const [values, setValues] = useSearch();
  return (
    <Layout title={"Search results"}>
      <div className="container mb-5" >
        <div className="text-center">
          <h1>Search Resuts</h1>
          <h6>
            {values?.results.length < 1
              ? "No Products Found"
              : `Found ${values?.results.length}`}
          </h6>
          <div className="d-flex flex-wrap mt-4" style={{columnGap:"20px",justifyContent:"center"}}>
            {values?.results.map((p) => (
              <ProductCard p={p} />
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Search;
