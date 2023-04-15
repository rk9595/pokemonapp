import { useState, useEffect, useCallback } from 'react';
import Head from 'next/head';
import { useQuery } from '@apollo/client';
import GET_POKEMONS from '@/gql/queries/pokemons';
import graphqlClient from '@/gql/graphql-client';
import Layout from '@/components/Layout';
import Link from 'next/link';
type Pokemon = {
  id: string;
  number: string;
  name: string;
  types: string[];
  image: string;
};

const Home: React.FC<{ initialPokemons?: Pokemon[] }> = ({
  initialPokemons = [],
}) => {
  const [offset, setOffset] = useState(60); // Start fetching from the 4th page
  const [pokemons, setPokemons] = useState(initialPokemons);
  const [isLoading, setIsLoading] = useState(false);

  const loadMorePokemons = useCallback(async () => {
    const newOffset = offset + 20;
    setIsLoading(true);
    const { data } = await graphqlClient.query({
      query: GET_POKEMONS,
      variables: {
        first: 20,
        offset: newOffset,
      },
    });

    setOffset(newOffset);
    setPokemons([...pokemons, ...data.pokemons]);
    setIsLoading(false);
  }, [offset, pokemons]);

  const handleScroll = useCallback(() => {
    const threshold = 200; // Set a threshold value
    const scrollPosition =
      window.innerHeight + document.documentElement.scrollTop;
    const pageHeight = document.documentElement.offsetHeight;

    if (scrollPosition < pageHeight - threshold) return;
    loadMorePokemons();
  }, [loadMorePokemons]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  return (
    <Layout title={'PokemonApp'}>
      <div className="flex flex-wrap justify-center mx-auto">
        {pokemons?.map((pokemon: Pokemon) => (
          <div key={pokemon.id} className="p-4">
            <Link href={`/pokemons/${pokemon.id}`}>
              <div className="bg-gray-200 py-4 px-6 rounded">
                <img
                  src={pokemon.image}
                  alt=""
                  className="h-[152px] w-[152px] sm:h-[200px] sm:w-[200px]"
                />
                <div className="text-center">
                  {pokemon?.types.map((type) => (
                    <span
                      key={type}
                      className="text-white text-xs font-semibold mr-2 px-2.5 py-0.5 rounded"
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
      <div className="container mx-auto flex flex-wrap justify-center items-center pb-8 ">
        {isLoading ? (
          <div className="border-t-4 border-blue-500 border-solid rounded-full w-12 h-12 animate-spin" />
        ) : (
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={loadMorePokemons}
          >
            Load More
          </button>
        )}
      </div>
    </Layout>
  );
};

export async function getStaticProps() {
  const { data } = await graphqlClient.query({
    query: GET_POKEMONS,
    variables: {
      first: 60, // Fetch the first 60 Pokemon (first three pages)
    },
  });

  return {
    props: {
      initialPokemons: data.pokemons,
    },
  };
}

export default Home;
