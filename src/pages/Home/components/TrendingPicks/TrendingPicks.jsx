import React from 'react';
import TrendingCard from './TrendingCard';
import './trendingPicks.css';

// Import images from assets
import occasion1 from '../../../../assets/images/occasion1.png';
import occasion2 from '../../../../assets/images/occasion2.png';
import occasion3 from '../../../../assets/images/occasion3.png';
import occasion4 from '../../../../assets/images/occasion4.png';
import occasion5 from '../../../../assets/images/occasion5.png';
import collection1 from '../../../../assets/images/collection1.png';
import collection2 from '../../../../assets/images/collection2.png';
import collection3 from '../../../../assets/images/collection3.png';

const trendingCardsData = [
  { id: 1, title: 'Pure Kanchipuram Silks', size: 'large', image: occasion1 },
  { id: 2, title: 'Temple Border Kanchipuram', size: 'small', image: occasion2 },
  { id: 3, title: 'Zari Rich Kanchipuram', size: 'small', image: occasion3 },
  { id: 4, title: 'Traditional Kanchipuram Bridal', size: 'small', image: occasion4 },
  { id: 5, title: 'Contrast Border Kanchipuram', size: 'small', image: occasion5 },
  { id: 6, title: 'Handwoven Kanchipuram Classics', size: 'equal', image: collection1 },
  { id: 7, title: 'Muted Gold Kanchipuram', size: 'equal', image: collection2 },
  { id: 8, title: 'Contemporary Kanchipuram Silks', size: 'equal', image: collection3 }
];

const TrendingPicks = () => {
    return (
        <section className="trending-picks-section">
            <div className="container">
                <h2 className="trending-title">Trending Picks</h2>
                
                <div className="trending-grid">
                    {/* Top Section Layout */}
                    <div className="top-section">
                        <div className="left-column">
                            <TrendingCard {...trendingCardsData[0]} />
                        </div>
                        <div className="right-column">
                            {trendingCardsData.slice(1, 4+1).map(card => (
                                <TrendingCard key={card.id} {...card} />
                            ))}
                        </div>
                    </div>

                    {/* Bottom Section Layout */}
                    <div className="bottom-section">
                        {trendingCardsData.slice(5).map(card => (
                            <TrendingCard key={card.id} {...card} />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default TrendingPicks;
