import React, { useState } from 'react';
import FilterSection from './FilterSection';
import './filters.css';

const FilterSidebar = ({ onFilterChange }) => {
    // State management
    const [priceRange, setPriceRange] = useState({ min: 5000, max: 25000 });
    const [selectedPattern, setSelectedPattern] = useState(null);
    const [selectedColors, setSelectedColors] = useState([]);
    const [selectedOccasions, setSelectedOccasions] = useState([]);

    const patterns = [
        { name: 'Florals', count: 24 },
        { name: 'Floral Buttis', count: 18 },
        { name: 'Buttis', count: 32 },
        { name: 'Checks', count: 12 },
        { name: 'Floral Jaal', count: 16 },
        { name: 'Leafs', count: 8 }
    ];

    const colors = [
        { name: 'Pink', style: { backgroundColor: '#F472B6' } },
        { name: 'Dual', style: { background: 'linear-gradient(90deg, #F87171 0%, #60A5FA 100%)' } },
        { name: 'Multi', style: { background: 'linear-gradient(90deg, #F87171 0%, #FACC15 50%, #60A5FA 100%)' } },
        { name: 'Gold', style: { backgroundColor: '#D4AF37' } },
        { name: 'Sky Blue', style: { backgroundColor: '#38BDF8' } },
        { name: 'Purple', style: { backgroundColor: '#A855F7' } }
    ];

    const occasions = ['Wedding', 'Bridal', 'Festival', 'Gift'];

    const handlePriceChange = (e) => {
        const { name, value } = e.target;
        const updatedPrice = { ...priceRange, [name]: Number(value) };
        setPriceRange(updatedPrice);
        fireFilterChange({ price: updatedPrice });
    };

    const handlePatternSelect = (pattern) => {
        const newPattern = selectedPattern === pattern ? null : pattern;
        setSelectedPattern(newPattern);
        fireFilterChange({ pattern: newPattern });
    };

    const handleColorToggle = (colorName) => {
        const updated = selectedColors.includes(colorName)
            ? selectedColors.filter(c => c !== colorName)
            : [...selectedColors, colorName];
        setSelectedColors(updated);
        fireFilterChange({ colors: updated });
    };

    const handleOccasionToggle = (occasion) => {
        const updated = selectedOccasions.includes(occasion)
            ? selectedOccasions.filter(o => o !== occasion)
            : [...selectedOccasions, occasion];
        setSelectedOccasions(updated);
        fireFilterChange({ occasions: updated });
    };

    const fireFilterChange = (overrides = {}) => {
        if (onFilterChange) {
            onFilterChange({
                price: overrides.price || priceRange,
                pattern: overrides.pattern !== undefined ? overrides.pattern : selectedPattern,
                colors: overrides.colors || selectedColors,
                occasions: overrides.occasions || selectedOccasions
            });
        }
    };

    const handleClearAll = () => {
        setPriceRange({ min: 5000, max: 25000 });
        setSelectedPattern(null);
        setSelectedColors([]);
        setSelectedOccasions([]);
        if (onFilterChange) {
            onFilterChange({});
        }
    };

    return (
        <aside className="filter-sidebar">
            {/* Header */}
            <div className="filter-header">
                <span className="filters-title">Filters</span>
                <button className="clear-all-btn" onClick={handleClearAll}>Clear All</button>
            </div>

            {/* Price Range Section */}
            <FilterSection title="Price Range">
                <div className="price-range-content">
                    <div className="price-range-values">
                        <span className="price-label">₹5,000</span>
                        <span className="price-label">₹50,000</span>
                    </div>

                    <div className="slider-container">
                        <div className="slider-track">
                            <div 
                                className="slider-filled-track" 
                                style={{
                                    width: `${((priceRange.max - 5000) / 45000) * 100}%`
                                }}
                            />
                        </div>
                        <input
                            type="range"
                            min="5000"
                            max="50000"
                            value={priceRange.max}
                            name="max"
                            onChange={handlePriceChange}
                            className="slider-input single-slider"
                        />
                    </div>

                    <div className="price-inputs-row">
                        <input
                            type="number"
                            value={priceRange.min}
                            name="min"
                            onChange={handlePriceChange}
                            className="price-box"
                            placeholder="Min"
                        />
                        <span className="to-text">to</span>
                        <input
                            type="number"
                            value={priceRange.max}
                            name="max"
                            onChange={handlePriceChange}
                            className="price-box"
                            placeholder="Max"
                        />
                    </div>
                </div>
            </FilterSection>

            {/* Pattern Section */}
            <FilterSection title="Pattern">
                <div className="pattern-content">
                    <ul className="pattern-list">
                        {patterns.map((attr, index) => (
                            <li 
                                key={index} 
                                className={`pattern-item ${selectedPattern === attr.name ? 'active' : ''}`}
                                onClick={() => handlePatternSelect(attr.name)}
                                role="button"
                            >
                                <span className="pattern-name">{attr.name} ({attr.count})</span>
                            </li>
                        ))}
                    </ul>
                    <button className="show-more-btn">Show More</button>
                </div>
            </FilterSection>

            {/* Color Section */}
            <FilterSection title="Color">
                <div className="color-content">
                    <ul className="color-list">
                        {colors.map((c, index) => (
                            <li 
                                key={index} 
                                className={`color-item ${selectedColors.includes(c.name) ? 'active' : ''}`}
                                onClick={() => handleColorToggle(c.name)}
                                role="button"
                            >
                                <div className="color-circle" style={c.style}></div>
                                <span className="color-name">{c.name}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </FilterSection>

            {/* Occasion Section */}
            <FilterSection title="Occasion">
                <div className="occasion-content">
                    <ul className="occasion-list">
                        {occasions.map((o, index) => (
                            <li key={index} className="occasion-item">
                                <label className="occasion-label">
                                    <input 
                                        type="checkbox" 
                                        checked={selectedOccasions.includes(o)}
                                        onChange={() => handleOccasionToggle(o)}
                                        className="occasion-checkbox"
                                    />
                                    <span className="occasion-name">{o}</span>
                                </label>
                            </li>
                        ))}
                    </ul>
                </div>
            </FilterSection>

            <div className="filter-sidebar-content-filler">
            </div>
        </aside>
    );
};

export default FilterSidebar;
