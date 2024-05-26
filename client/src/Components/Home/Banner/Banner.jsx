import React from 'react';
import banner from '../../../assets/images/banner2.jpg'
import { Link } from 'react-router-dom';

const Banner = () => {
    return (
        <div>
            <div className="hero h-92" >
  <div className="hero-overlay  "     style={{ backgroundImage: `url(${banner})` }}>
</div>
  <div className="hero-content  text-center ">
    <div className="max-w-md">
      <h1 className=" mt-24 text-3xl font-bold font-serif">Easy and Tasty Recipes for Every Occasion</h1>
      
      <div className='mb-24 mt-4 flex justify-center gap-4'>
      <Link to={"/allRecipes"}>
      <button className="btn btn-sm text-white bg-orange-600   ">See Recipes</button>
      </Link>
      <Link to={"/addRecipes"}>
      <button className="btn btn-sm text-white bg-orange-600   ">Add Recipes</button>
      </Link>
      </div>
    </div>
  </div>
</div>
            
        </div>
    );
};

export default Banner;