import { createElement } from 'react'
import { renderToString } from 'react-dom/server'
const express = require('express');
const { ApolloServer, gql } = require("apollo-server")
const axios = require("axios")
const cors = require('cors');
import App from './src/App.js'
import ssrPrepass from 'react-ssr-prepass'


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
        const users = await axios.get("https://f671744fd02270cce93384d577bd6da1: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@prosper-dev-test.myshopify.com/admin/api/2020-10/products.json")
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

const renderApp = async App => {
  const element = createElement(App)
  await ssrPrepass(element)

  return renderToString(element)
}


ssrPrepass(<App />, (element, instance) => {
  if (element.type === SomeData) {
    return fetchData()
  } else if (instance && instance.fetchData) {
    return instance.fetchData()
  }
})

// tell the app to use the above rules
app.use(router)

server.listen().then(({ url }) => console.log(`Server ready at ${url}`))

app.listen(port);
console.log("listening to " + port);









































// import path from 'path'
// import fs from 'fs'
// import React from 'react'
// import ReactDOMServer from 'react-dom/server'
// const express = require('express');
// const { ApolloServer, gql } = require("apollo-server")
// const axios = require("axios")
// const cors = require('cors');
// import App from './src/App.js'

// const port = process.env.PORT || 8080;

// const app = express();
// app.use(cors());

// const router = express.Router()

// const typeDefs = gql`
//   type Variants {
//     id:ID
//     product_id: ID
//     price : String
//     compare_at_price : String
//   }

//   type Images {
//     id : ID
//     product_id: ID
//     src : String
//   }

//   type Image {
//     id : ID
//     product_id: ID
//     src : String
//   }

//   type Products {
//           id : ID
//           title : String
//           description : String
//           tags : String
//           variants: [Variants!]
//           images : [Images!]
//         }

//   type Query {
//     products: [Products]
//   }
// `

// const resolvers = {
//   Query: {
//     products: async () => {
//       try {
//         const users = await axios.get("https://f671744fd02270cce93384d577bd6da1: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@prosper-dev-test.myshopify.com/admin/api/2020-10/products.json")
//         // console.log(users.data)
//         return users.data.products.map(({ id, title, description, tags, variants, images }) => ({
//           id,
//           title,
//           description,
//           tags,
//           variants,
//           images
//         }))
//       } catch (error) {
//         throw error
//       }
//     },
//   },
// }

// const server = new ApolloServer({
//   typeDefs,
//   resolvers,
// })


// const serverRenderer = (req, res, next) => {
//   fs.readFile(path.resolve('./build/index.html'), 'utf8', (err, data) => {
//     if (err) {
//       console.error(err)
//       return res.status(500).send('An error occurred')
//     }
//     return res.send(
//       data.replace(
//         '<div id="root"></div>',
//         `<div id="root">${ReactDOMServer.renderToString(<App />)}</div>`
//       )
//     )
//   })
// }
// router.use('^/$', serverRenderer)

// router.use(
//   express.static(path.resolve(__dirname, '..', 'build'), { maxAge: '30d' })
// )

// // tell the app to use the above rules
// app.  use(router)

// server.listen().then(({ url }) => console.log(`Server ready at ${url}`))

// app.listen(port);
// console.log("listening to " + port);


















// const express = require('express');
// const path = require('path');

// const port = process.env.PORT || 8080;

// const app = express();

// app.use(express.static(__dirname+'/build/'));
// //app.use(express.static(path.join(__dirname, 'build')));

// app.get('/*', function (req, res) {
//     res.sendFile(path.join(__dirname, '/build/index.html'));
//   });


// app.listen(port);
// console.log("listening to " + port);