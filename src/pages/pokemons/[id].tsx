import { useQuery } from '@apollo/client';
import GET_POKEMON from '@/gql/queries/pokemon';
import graphqlClient from '@/gql/graphql-client';
import Layout from '@/components/Layout';
import { useRouter } from 'next/router';

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

const PokemonDetail: React.FC = () => {
  const router = useRouter();
  const { id } = router.query; // Access the 'id' parameter from the URL

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

  const pokemon: Pokemon = data.pokemon;
  return (
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
            <div className="flex justify-center items-center text-gray-500">
              <p className="mr-2">Max HP:</p>
              <p>{pokemon.maxHP}</p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default PokemonDetail;