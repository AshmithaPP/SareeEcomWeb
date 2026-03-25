import React from 'react';
import SpecificationsTable from '../SpecificationsTable/SpecificationsTable';
import CareInstructions from '../CareInstructions/CareInstructions';
import './productSpecifications.css';

// Importing local icons correctly based on previous setup
import dropIcon from '../../../../assets/icons/drop.png';
import flowerIcon from '../../../../assets/icons/flower.png';
import coolIcon from '../../../../assets/icons/cool.png';
import chemicalIcon from '../../../../assets/icons/chemical.png';
import handIcon from '../../../../assets/icons/hand.png';

const ProductSpecifications = () => {
    // Mock API Data for Specifications
    const specificationsData = [
        { label: 'Saree Type:', value: 'Kanchipuram Silk Saree' },
        { label: 'Silk Type:', value: 'Pure Mulberry Silk' },
        { label: 'Zari Type:', value: 'Pure Zari' },
        { label: 'Saree Colour:', value: 'Deep Maroon' },
        { label: 'Border Colour:', value: 'Gold with Temple Design' },
        { label: 'Pallu Design:', value: 'Peacock & Floral Motifs' },
        { label: 'Saree Length:', value: '5.5 Meters' },
        { label: 'Blouse Piece:', value: '0.8 Meters (Included)' },
        { label: 'Saree Width:', value: '46 Inches' },
        { label: 'Weight:', value: '750 grams' },
        { label: 'Weaving Type:', value: 'Handloom' },
        { label: 'Occasion:', value: 'Wedding / Bridal / Festival' },
        { label: 'Craft Origin:', value: 'Kanchipuram, Tamil Nadu' }
    ];

    // Mock API Data for Care Instructions
    const careInstructionsData = [
        { text: 'Dry clean only for best results', icon: dropIcon },
        { text: 'Avoid direct sunlight exposure', icon: flowerIcon },
        { text: 'Store in a cool, dry place wrapped in muslin cloth', icon: coolIcon },
        { text: 'Avoid contact with perfumes and chemicals', icon: chemicalIcon },
        { text: 'Iron on low heat with a cotton cloth', icon: handIcon }
    ];

    return (
        <div className="product-specifications-section mt-5 mb-5 pb-5">
            <div className="product-specifications-wrapper d-flex flex-column">
                
                {/* Heading */}
                <h2 className="specifications-heading">Saree Specifications</h2>
                
                {/* Specs Table */}
                <div className="specifications-table-container">
                    <SpecificationsTable specs={specificationsData} />
                </div>
                
                {/* Care Instructions Section */}
                <div className="care-instructions-container">
                    <CareInstructions instructions={careInstructionsData} />
                </div>

            </div>
        </div>
    );
};

export default ProductSpecifications;
