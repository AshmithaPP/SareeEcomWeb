import React from 'react';
import CircleCard from './CircleCard';
import './shopByOccasion.css';

// Import local images
import bridalSaree from 'assets/images/bridal/occasion1.png';
import lightweightSilk from 'assets/images/bridal/occasion2.png';
import traditionalSilk from 'assets/images/bridal/occasion3.png';
import collection1 from 'assets/images/bridal/occasion4.png';
import collection2 from 'assets/images/cotton/occasion5.png';

const occasionItems = [
  {
    id: 1,
    name: 'Wedding',
    image: bridalSaree,
  },
  {
    id: 2,
    name: 'Engagement',
    image: lightweightSilk,
  },
  {
    id: 3,
    name: 'Festival',
    image: traditionalSilk,
  },
  {
    id: 4,
    name: 'Reception',
    image: collection1,
  },
  {
    id: 5,
    name: 'Gift Sarees',
    image: collection2,
  },
];

const ShopByOccasion = () => {
  return (
    <section className="shop-by-occasion-section py-5">
      <div className="container">
        <h2 className="section-heading mb-5">Shop By Occasion</h2>
        <div className="row justify-content-center row-cols-2 row-cols-md-3 row-cols-lg-5 g-4">
          {occasionItems.map((item) => (
            <div className="col d-flex justify-content-center" key={item.id}>
              <CircleCard image={item.image} title={item.name} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ShopByOccasion;
