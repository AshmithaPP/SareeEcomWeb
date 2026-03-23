import './App.css'
import TopBar from './components/TopBar/TopBar'
import Navbar from './components/Navbar/Navbar'
import HeroSection from './components/HeroSection/HeroSection'
import CategoriesSection from './components/CategoriesSection/CategoriesSection'
import ShopByCollections from './components/ShopByCollections/ShopByCollections'

import cottonS1 from './assets/images/cottonS1.png'
import cottonS2 from './assets/images/cottonS2.png'
import cottonS3 from './assets/images/cottonS3.png'
import cottonS4 from './assets/images/cottonS4.png'

import traditional_silk from './assets/images/traditional_silk.png'
import bridal_saree from './assets/images/bridal_saree.png'
import lightweight_silk from './assets/images/lightweight_silk.png'

import collection1 from './assets/images/collection1.png'
import collection2 from './assets/images/collection2.png'
const cottonProducts = [
  { id: 1, discount: "20%", discountBg: "#10B981", title: "Bridal Kanchipuram Silk Saree", discountedPrice: "₹24,999", originalPrice: "₹29,999", image: cottonS1 },
  { id: 2, discount: "30%", discountBg: "#E11D48", title: "Traditional Kanchipuram Silk Saree", discountedPrice: "₹24,999", originalPrice: "₹29,999", image: cottonS2 },
  { id: 3, discount: "30%", discountBg: "#E11D48", title: "Light Weight Silk Saree", discountedPrice: "₹24,999", originalPrice: "₹29,999", image: cottonS3 },
  { id: 4, discount: "50%", discountBg: "#F59E0B", title: "Traditional Kanchipuram Silk Saree", discountedPrice: "₹24,999", originalPrice: "₹29,999", image: cottonS4 }
];

const newArrivalsProducts = [
  { id: 1, discount: "20%", discountBg: "#10B981", title: "Bridal Kanchipuram Silk", discountedPrice: "₹24,999", originalPrice: "₹29,999", image: collection1 },
  { id: 2, discount: "30%", discountBg: "#E11D48", title: "Traditional Silk Saree", discountedPrice: "₹21,999", originalPrice: "₹25,999", image: traditional_silk },
  { id: 3, discount: "30%", discountBg: "#E11D48", title: "Light Weight Saree", discountedPrice: "₹18,999", originalPrice: "₹22,999", image: lightweight_silk },
  { id: 4, discount: "50%", discountBg: "#F59E0B", title: "Rich Zari Silk Saree", discountedPrice: "₹27,999", originalPrice: "₹32,999", image: collection2 }
];

const bridalProducts = [
  { id: 1, discount: "20%", discountBg: "#10B981", title: "Bridal Special Saree", discountedPrice: "₹34,999", originalPrice: "₹39,999", image: bridal_saree },
  { id: 2, discount: "30%", discountBg: "#E11D48", title: "Vibrant Silk Saree", discountedPrice: "₹21,999", originalPrice: "₹25,999", image: traditional_silk },
  { id: 3, discount: "30%", discountBg: "#E11D48", title: "Elegant Light Saree", discountedPrice: "₹18,999", originalPrice: "₹22,999", image: lightweight_silk },
  { id: 4, discount: "50%", discountBg: "#F59E0B", title: "Bridal Special Saree", discountedPrice: "₹34,999", originalPrice: "₹39,999", image: bridal_saree }
];

function App() {
  return (
    <>
      <TopBar />
      <Navbar />
      <HeroSection />
      <CategoriesSection />
      <ShopByCollections />
      <ShopByCollections
        title="Best Selling Kanchipuram Silk Sarees"
        subtitle="Our customers' most loved designs"
        products={cottonProducts}
      />
      <ShopByCollections
        title="New Arrivals - Kanchipuram Silk Sarees"
        subtitle="Fresh designs from our master weavers"
        products={newArrivalsProducts}
      />
      <ShopByCollections
        title="Bridal Kanchipuram Silk Sarees"
        subtitle="Exquisite designs for your special day"
        products={bridalProducts}
      />
    </>
  )
}


export default App
