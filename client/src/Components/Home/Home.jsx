import React from 'react';
import Banner from './Banner/Banner';
import Success from './Success/Success';
import DevInfo from './DevInfo/DevInfo';
import Purchase from '../Pages/Purchase/Purchase';

const Home = () => {
    return (
        <div>
            <Banner/>
            <Purchase/>
            <Success/>
            <DevInfo/>
        </div>
    );
};

export default Home;