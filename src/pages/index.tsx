import Head from 'next/head';
import Image from 'next/image';
import { Inter } from 'next/font/google';
import styles from '@/styles/Home.module.css';
import { useQuery } from '@apollo/client';
import GET_POKEMONS from '@/gql/queries/pokemon';
import graphqlClient from '@/gql/graphql-client';
import Layout from '@/components/Layout';

const inter = Inter({ subsets: ['latin'] });

// Define the Pokemon type
type Pokemon = {
  id: string;
  number: string;
  name: string;
  weight: {
    minimum: string;
    maximum: string;
  };
  height: {
    minimum: string;
    maximum: string;
  };
  classification: string;
  types: string[];
  resistant: string[];
  weaknesses: string[];
  fleeRate: number;
  maxCP: number;
  maxHP: number;
  image: string;
};

// Pokemon list page component
const Home: React.FC<{ pokemons: Pokemon[] }> = ({ pokemons }) => {
  return (
    <Layout title={'PokemonApp'}>
      {/* <h1>Pokemon List</h1> */}
      <ul>
        {pokemons.map((pokemon) => (
          <li key={pokemon.id}>
            <p>ID: {pokemon.id}</p>
            <p>Number: {pokemon.number}</p>
            <p>Name: {pokemon.name}</p>
            <p>
              Weight: {pokemon.weight.minimum} - {pokemon.weight.maximum}
            </p>
            <p>
              Height: {pokemon.height.minimum} - {pokemon.height.maximum}
            </p>
            <p>Classification: {pokemon.classification}</p>
            <p>Types: {pokemon.types.join(', ')}</p>
            {/* Render additional Pokemon data as needed */}
          </li>
        ))}
      </ul>
    </Layout>
  );
};

// Fetch data from GraphQL API using Apollo Client
export async function getStaticProps() {
  const { data } = await graphqlClient.query({
    query: GET_POKEMONS,
    variables: {
      first: 20,
    },
  });

  return {
    props: {
      pokemons: data.pokemons,
    },
  };
}

export default Home;
