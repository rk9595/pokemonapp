import React, { useState } from 'react';
import Modal from 'react-modal';

const PokemonEvolutionsModal = ({ evolutions, isOpen, onRequestClose }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      className="modal"
      overlayClassName="overlay"
    >
      <div>
        <h2 className="text-2xl font-semibold">Evolutions</h2>
        <ul>
          {evolutions.map((evolution) => (
            <li key={evolution.id} className="text-gray-500 text-lg mt-2">
              {evolution.name}
            </li>
          ))}
        </ul>
        <button
          className="px-4 py-2 bg-blue-500 text-white font-semibold rounded mt-4"
          onClick={onRequestClose}
        >
          Close
        </button>
      </div>
    </Modal>
  );
};

const PokemonEvolutions = ({ evolutions }) => {
  const [showModal, setShowModal] = useState(false);

  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-semibold">Evolutions</h2>
      {evolutions && evolutions.length > 0 ? (
        <div className="flex flex-wrap justify-center items-center mt-4">
          {evolutions.map((evolution) => (
            <PokemonEvolutionsModal
              key={evolution.id}
              evolutions={evolution}
              isOpen={showModal}
              onRequestClose={handleCloseModal}
            />
          ))}
        </div>
      ) : (
        <p className="text-gray-500 mt-4">No evolutions found.</p>
      )}
    </div>
  );
};

export default PokemonEvolutions;
