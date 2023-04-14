import React from 'react';
import Link from 'next/link';

const Navbar: React.FC = () => {
  return (
    <div className="h-14 p-2 flex items-center justify-center bg-poke-red">
      <Link href="/">
        <p>PokemonApp</p>{' '}
      </Link>
    </div>
  );
};

export default Navbar;
