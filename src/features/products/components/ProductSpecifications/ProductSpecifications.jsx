import React from 'react';
import SpecificationsTable from '../SpecificationsTable/SpecificationsTable';
import CareInstructions from '../CareInstructions/CareInstructions';
import './productSpecifications.css';

// Importing local icons correctly based on previous setup
import dropIcon from '../../../../assets/icons/ui/drop.png';
import flowerIcon from '../../../../assets/icons/ui/flower.png';
import coolIcon from '../../../../assets/icons/ui/cool.png';
import chemicalIcon from '../../../../assets/icons/ui/chemical.png';
import handIcon from '../../../../assets/icons/ui/hand.png';

const ProductSpecifications = ({ specifications, careInstructions }) => {
    // Map API Data to Specifications format
    const specificationsData = specifications && Object.keys(specifications).length > 0 
        ? Object.entries(specifications).map(([key, value]) => ({
            label: `${key}:`,
            value: value
        })) 
        : [];

    // Map API Data to Care Instructions format
    const careInstructionsData = (careInstructions && careInstructions.length > 0)
        ? careInstructions.map((item, index) => ({
            text: typeof item === 'string' ? item : item.text,
            // Cycle through local icons if not provided in API
            icon: item.icon || [dropIcon, flowerIcon, coolIcon, chemicalIcon, handIcon][index % 5]
        }))
        : [];

    return (
        <div className="product-specifications-section mt-5 mb-5 pb-5">
            <div className="product-specifications-wrapper d-flex flex-column">
                
                {/* Heading */}
                <h2 className="specifications-heading">Product Specifications</h2>
                
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
