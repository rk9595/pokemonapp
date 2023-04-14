/* eslint-disable @next/next/no-img-element */
import Head from 'next/head';
// import Image from 'next/image';
import { Inter } from 'next/font/google';
import { useQuery } from '@apollo/client';
import GET_POKEMONS from '@/gql/queries/pokemons';
import graphqlClient from '@/gql/graphql-client';
import Layout from '@/components/Layout';
import Link from 'next/link';
import GET_POKEMON from '@/gql/queries/pokemon';

const inter = Inter({ subsets: ['latin'] });

// Define the Pokemon type
type Pokemon = {
  id: string;
  number: string;
  name: string;
  types: string[];
  image: string;
};

// Pokemon list page component
const Home: React.FC<{ pokemons: Pokemon[] }> = ({ pokemons }) => {
  // const pokemons = data?.pokemons || [];

  return (
    <Layout title={'PokemonApp'}>
      {/* <h1>Pokemon List</h1> */}
      <div className="flex flex-wrap justify-center mx-auto">
        {pokemons.map((pokemon) => (
          <div key={pokemon.id} className="p-4">
            <Link href={`/pokemons/${pokemon.id}`}>
              <div className="bg-gray-200 py-4 px-6 rounded">
                <img
                  src={pokemon.image}
                  alt=""
                  className="h-[152px] w-[152px] sm:h-[200px] sm:w-[200px]"
                />
                <div className="text-center">
                  {pokemon.types.map((type) => (
                    <span
                      key={type}
                      className="text-white text-xs font-semibold mr-2 px-2.5 py-0.5 rounded"
                      // style={{ backgroundColor: styles[type.toLowerCase()] }}
                    >
                      {type}
                    </span>
                  ))}
                </div>
                <p className="text-center">
                  <span className="font-semibold text-3xl mr-2">
                    {pokemon.number}
                  </span>
                  <span className="text-3xl">{pokemon.name}</span>
                </p>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </Layout>
  );
};

// Fetch data from GraphQL API using Apollo Client
export async function getStaticProps() {
  const { data } = await graphqlClient.query({
    query: GET_POKEMONS,
    variables: {
      first: 60,
    },
  });

  return {
    props: {
      pokemons: data.pokemons,
    },
  };
}

export default Home;
