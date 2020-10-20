import React from 'react';
import { useQuery } from "@apollo/react-hooks"
import gql from "graphql-tag"
import './ProductListing.css';

const GET_USERS = gql`
{
  products{
    id
    title
    description
    tags
    variants{
      id
      product_id
      price
      compare_at_price
    }
    images{
      id
      product_id
      src
    }
  }
}
`

function ProductListing() {
  const { loading, error, data } = useQuery(GET_USERS)
  if (error) return <h1>Something went wrong!</h1>
  if (loading) return <h1>Loading...</h1>


  return <div className="row row-cols-1 row-cols-md-4">
    {data.products.map(product => (
      <div key={product.id} className="col mb-4 productlisting">
        <div className="card h-100">
        <img src={product.images[0].src} className="card-img-top" alt="..." />
        <div className="card-body">
          <h5 className="card-title">{product.title}</h5>
          <span className="fa fa-star checked"></span>
          <span className="fa fa-star checked"></span>
          <span className="fa fa-star checked"></span>
          <span className="fa fa-star"></span>
          <span className="fa fa-star"></span>
          <br />
          <h3 className="">{product.variants[0].price}$</h3>
        </div>
        </div>
      </div>            
    ))}
  </div>
}

export default ProductListing;