import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Alphabet = () => {
    const [outputString, setOutputString] = useState('');
    const [isLoading, setIsLoading] = useState(false); // New state for loading

    const handleClick = (letter) => {
        setIsLoading(true); // Set loading state to true when handling click

        setOutputString(prevOutputString => {
            // Append clicked letter to outputString
            const newOutputString = prevOutputString + letter;

            // Check for consecutive letters and replace them with underscores
            let consecutiveCount = 1;
            let newString = '';
            for (let i = 0; i < newOutputString.length; i++) {
                if (newOutputString[i] === newOutputString[i + 1]) {
                    consecutiveCount++;
                } else {
                    if (consecutiveCount >= 3) {
                        newString += '_';
                    } else {
                        newString += newOutputString.slice(i - consecutiveCount + 1, i + 1);
                    }
                    consecutiveCount = 1;
                }
            }

            setIsLoading(false); // Set loading state to false after processing
            return newString;
        });
    };

    const handleDelete = () => {
        setIsLoading(true); // Set loading state to true when deleting

        setOutputString(prevOutputString => {
            // Remove the last character from the output string
            const newOutput = prevOutputString.slice(0, -1);

            setIsLoading(false); // Set loading state to false after deleting
            return newOutput;
        });
    };

    // Generate tiles for each letter of the alphabet
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const tiles = alphabet.split('').map((letter, index) => (
        <div key={index} className="tile bg-blue-300 rounded-lg  hover:scale-105 hover:shadow-2xl active:scale-95 font-semibold text-white duration-300 p-2 cursor-pointer" onClick={() => handleClick(letter)}>
            {letter}
        </div>
    ));

    return (
        <div>
            <Link to="/"><h1 className='text-xl text-red-500 font-semibold'>Recursive Partitioning</h1></Link>
            <div>
                <div className='font-semibold text-2xl mb-2 text-left'>
                    <h1>Alphabet Tile Interaction</h1>
                </div>
                <div className="grid grid-cols-4 gap-4 my-10">
                    {tiles}
                </div>
            </div>
            <div className='bg-red-500 p-2 rounded-lg text-white font-semibold text-left' id="outputString">
                <div className='flex justify-between items-center '>
                    <h1 className=''> Output: {isLoading ? 'Loading...' : (outputString ? outputString : 'No string selected')}</h1>
                    <button className=" text-white border-2 py-2 px-4 rounded hover:scale-105 hover:shadow-2xl active:scale-95 font-semibold duration-300 p-2 cursor-pointer" onClick={handleDelete}>X</button>
                </div>
            </div>
        </div>
    );
};

export default Alphabet;
