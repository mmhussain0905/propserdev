const express = require('express');
const { ApolloServer, gql } = require("apollo-server")
const axios = require("axios")
const cors = require('cors');

const port = process.env.PORT || 8080;

const app = express();
app.use(cors());

const router = express.Router()

const typeDefs = gql`
  type Variants {
    id:ID
    product_id: ID
    price : String
    compare_at_price : String
  }

  type Images {
    id : ID
    product_id: ID
    src : String
  }

  type Image {
    id : ID
    product_id: ID
    src : String
  }

  type Products {
          id : ID
          title : String
          description : String
          tags : String
          variants: [Variants!]
          images : [Images!]
        }

  type Query {
    products: [Products]
  }
`

const resolvers = {
  Query: {
    products: async () => {
      try {
        const users = await axios.get("https://{APIKEY}:{Password}@prosper-dev-test.myshopify.com/admin/api/2020-10/products.json")
        // console.log(users.data)
        return users.data.products.map(({ id, title, description, tags, variants, images }) => ({
          id,
          title,
          description,
          tags,
          variants,
          images
        }))
      } catch (error) {
        throw error
      }
    },
  },
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

// tell the app to use the above rules
app.use(router)

server.listen().then(({ url }) => console.log(`Server ready at ${url}`))

app.listen(port);
console.log("listening to " + port);