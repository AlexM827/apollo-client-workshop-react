// NOTE has to be before the requires to make sure the delay is available there
const delayArgument = parseInt(process.argv[2], 10);
global.delay = isNaN(delayArgument) ? 0 : delayArgument;

const { ApolloServer, gql } = require("apollo-server");
const resolvers = require("./resolvers");

const typeDefs = gql`
  type Query {
    recipes(vegetarian: Boolean): [Recipe!]
    ingredients: [Ingredient!]
  }

  type Recipe {
    id: ID!
    title: String!
    vegetarian: Boolean!
    ingredients: [Ingredient!]!
    calories: String
    fat: String
    cholestero: String
    carbohydrate: String
    protein: String
    # preparation: [String!]!
  }

  type Ingredient {
    id: ID!
    name: String!
  }

  input RecipeInput {
    title: String!
    vegetarian: Boolean!
  }
  input IngredientInput {
    name: String!
  }

  type Mutation {
    addRecipe(recipe: RecipeInput!): Recipe
    addIngredient(ingredient: IngredientInput!): Ingredient
  }
`;

const server = new ApolloServer({
  typeDefs,
  resolvers,
  playground: {
    settings: {
      'editor.cursorShape': 'line'
    }
  }
});

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
