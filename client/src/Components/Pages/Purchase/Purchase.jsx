import React from 'react';
import { Link } from 'react-router-dom';

const Purchase = ({ updateUserCoins }) => {


    const handlePurchase = (coins, amount) => {
        updateUserCoins(coins);
      };


    return (
       <div>
                     <h2 className="text-4xl mt-24  font-serif font-extrabold text-center mb-12 text-orange-600">Purchase Coin</h2>
                     <div className="flex justify-center items-center h-full">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          <div className="bg-gradient-to-br from-yellow-400 to-red-500 shadow-md rounded-md p-6 cursor-pointer transition duration-300 ease-in-out transform hover:scale-105">
            <h3 className="text-xl font-semibold mb-2">100 Coins</h3>
            <p className="text-white mb-4">$1</p>
            <p className="text-white mb-4">Buy 100 coins for just $1!</p>
            <button className="bg-yellow-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-yellow-600" onClick={() => handlePurchase(100, 1)}>Buy Now</button>
          </div>
          <div className="bg-gradient-to-br from-green-400 to-blue-500 shadow-md rounded-md p-6 cursor-pointer transition duration-300 ease-in-out transform hover:scale-105">
            <h3 className="text-xl font-semibold mb-2">500 Coins</h3>
            <p className="text-white mb-4">$5</p>
            <p className="text-white mb-4">Buy 500 coins for just $5!</p>
            <button className="bg-green-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-green-600" onClick={() => handlePurchase(500, 5)}>Buy Now</button>
          </div>
          <div className="bg-gradient-to-br from-purple-400 to-indigo-500 shadow-md rounded-md p-6 cursor-pointer transition duration-300 ease-in-out transform hover:scale-105">
            <h3 className="text-xl font-semibold mb-2">1000 Coins</h3>
            <p className="text-white mb-4">$10</p>
            <p className="text-white mb-4">Buy 1000 coins for just $10!</p>
            <button className="bg-purple-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-purple-600" onClick={() => handlePurchase(1000, 10)}>Buy Now</button>
          </div>
        </div>
      </div>
       </div>
       
    );
};

export default Purchase;
