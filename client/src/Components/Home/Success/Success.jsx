import React from 'react';
import CountUp from 'react-countup';


const Success = () => {
    return (
        <div>
             <h2 className="text-4xl mt-8  font-serif font-extrabold text-center mb-12 text-orange-600">Success Stories</h2>
             <p className="text-center text-lg mb-12">
                    Join our community and see why thousands of users are sharing and enjoying delicious recipes every day!
                </p>
             <div className="bg-slate-100 text-black py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
               
               
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 ">
                    <div className='text-center'>
                        <h3 className="text-4xl font-bold text-violet-700">
                            <CountUp end={2000} duration={3} />
                        </h3>
                        <p className="mt-2 text-lg font-medium">Recipes Shared</p>
                    </div>
                    <div className='text-center'>
                        <h3 className="text-4xl font-bold text-red-500">
                            <CountUp end={9} duration={3} />
                        </h3>
                        <p className="mt-2 text-lg font-medium"> Users Rating</p>
                    </div>
                    <div className='text-center'>
                        <h3 className="text-4xl font-bold text-green-500">
                            <CountUp end={500} duration={3} />
                        </h3>
                        <p className="mt-2 text-lg font-medium">Active Users</p>
                    </div>
                   
                </div>
            </div>
        </div>
        </div>
        
    );
};

export default Success;