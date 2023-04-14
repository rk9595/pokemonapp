import { gql } from '@apollo/client';

// Define the GraphQL query for fetching Pokemon evolutions data
const GET_POKEMON_EVOLUTIONS = gql`
  query ($id: String, $name: String) {
    pokemon(id: $id, name: $name) {
      id
      name
      evolutions {
        id
        number
        name
        classification
        types
        resistant
        weaknesses
        fleeRate
        maxCP
        evolutions {
          id
          number
          name
          classification
          types
          resistant
          weaknesses
          fleeRate
          maxCP
          maxHP
          image
        }
        maxHP
        image
      }
    }
  }
`;

export default GET_POKEMON_EVOLUTIONS;
