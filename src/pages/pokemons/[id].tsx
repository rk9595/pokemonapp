import { useQuery } from '@apollo/client';
import GET_POKEMON from '@/gql/queries/pokemon';
import GET_POKEMON_EVOLUTIONS from '@/gql/queries/evolutions';
import graphqlClient from '@/gql/graphql-client';
import Layout from '@/components/Layout';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { log } from 'console';
import Modal from 'react-modal';

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
  evolutions: PokemonEvolution[]; // Add the evolutions property
};

type PokemonEvolution = {
  id: string;
  number: string;
  name: string;
  classification: string;
  types: string[];
  resistant: string[];
  weaknesses: string[];
  fleeRate: number;
  maxCP: number;
  evolutions: PokemonEvolution[]; // Recursive reference to itself for nested evolutions
  maxHP: number;
  image: string;
};

const PokemonDetail: React.FC = () => {
  const router = useRouter();
  const { id } = router.query; // Access the 'id' parameter from the URL
  const [showEvolutions, setShowEvolutions] = useState(false);
  const [pokemonE, setPokemon] = useState<Pokemon | null>(null);
  const [modalIsOpen, setIsOpen] = React.useState(false);

  // Fetch data for the Pokemon with the given 'id'
  const { loading, error, data } = useQuery(GET_POKEMON, {
    variables: {
      id: id as string,
    },
  });

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }
  function closeModal() {
    setIsOpen(false);
  }
  const handleShowEvolutions = () => {
    // setShowEvolutions(!showEvolutions);
    setIsOpen(true);

    if (!showEvolutions && !pokemonE?.evolutions) {
      setShowEvolutions(true);
      graphqlClient
        .query({
          query: GET_POKEMON_EVOLUTIONS,
          variables: {
            id: id as string,
          },
        })
        .then(({ data }) => {
          const { evolutions } = data.pokemon;
          setPokemon((prevPokemon) => ({
            ...prevPokemon!,
            evolutions,
          }));
        })
        .catch((error) => {
          console.error('Error fetching evolutions:', error);
        });
    }
  };
  console.log('evolutions', pokemonE);
  const pokemon: Pokemon = data.pokemon;

  return pokemon ? (
    <Layout title={`Pokemon Details - ${pokemon.name}`}>
      <div className="flex flex-col items-center mt-10">
        <img
          src={pokemon.image}
          alt=""
          className="h-[200px] w-[200px] sm:h-[250px] sm:w-[250px] rounded"
        />
        <h1 className="text-4xl font-bold mt-6">{pokemon.name}</h1>
        <p className="text-gray-500 text-xl mt-2">{`#${pokemon.number}`}</p>
        <div className="mt-8">
          <h2 className="text-2xl font-semibold">Details</h2>
          <div className="flex flex-col items-center mt-4">
            <div className="flex justify-center items-center text-gray-500">
              <p className="mr-2">Height:</p>
              <p>
                {pokemon.height.minimum}m - {pokemon.height.maximum}m
              </p>
            </div>
            <div className="flex justify-center items-center text-gray-500">
              <p className="mr-2">Weight:</p>
              <p>
                {pokemon.weight.minimum}kg - {pokemon.weight.maximum}kg
              </p>
            </div>
            <div className="flex justify-center items-center text-gray-500">
              <p className="mr-2">Classification:</p>
              <p>{pokemon.classification}</p>
            </div>
            <div className="flex justify-center items-center text-gray-500">
              <p className="mr-2">Types:</p>
              <p>{pokemon.types.join(', ')}</p>
            </div>
            <div className="flex justify-center items-center text-gray-500">
              <p className="mr-2">Resistant:</p>
              <p>{pokemon.resistant.join(', ')}</p>
            </div>
            <div className="flex justify-center items-center text-gray-500">
              <p className="mr-2">Weaknesses:</p>
              <p>{pokemon.weaknesses.join(', ')}</p>
            </div>
            <div className="flex justify-center items-center text-gray-500">
              <p className="mr-2">Flee Rate:</p>
              <p>{pokemon.fleeRate}</p>
            </div>
            <div className="flex justify-center items-center text-gray-500">
              <p className="mr-2">Max CP:</p>
              <p>{pokemon.maxCP}</p>
            </div>
            <div className="flex justify-center items-center mt-2">
              <span className="font-semibold">Max HP:</span>
              <span>{data.pokemon.maxHP}</span>
            </div>
          </div>
        </div>
        <div className="mt-8">
          {/* <h2 className="text-2xl font-semibold">Evolutions</h2> */}
          <div className="flex justify-center mt-4">
            <button
              className="px-4 py-2 bg-blue-500 text-white font-semibold rounded"
              onClick={handleShowEvolutions}
            >
              Evolutions
            </button>
          </div>
          {showEvolutions && (
            <Modal isOpen={modalIsOpen} onRequestClose={closeModal}>
              <button
                className="absolute top-0 right-0 m-4 text-gray-500 hover:text-gray-800"
                onClick={closeModal}
              >
                Close
              </button>

              <div className="mt-8">
                <h2 className="text-2xl font-semibold">Evolutions</h2>
                {pokemonE?.evolutions && pokemonE.evolutions.length > 0 ? (
                  <div className="flex flex-wrap justify-center items-center mt-4">
                    {pokemonE.evolutions.map((evolution) => (
                      <div key={evolution.id} className="mx-2">
                        <img
                          src={evolution.image}
                          alt={evolution.name}
                          className="h-[80px] w-[80px] sm:h-[100px] sm:w-[100px] rounded"
                        />
                        <p className="text-center mt-1">{evolution.name}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 mt-4">No Evolutions</p>
                )}
              </div>
            </Modal>
          )}
        </div>
      </div>
    </Layout>
  ) : (
    <div>Loading...</div>
  );
};

export default PokemonDetail;
