import React, { useState } from 'react';
import AffiliateModal from './AffiliateModal';
import productImage01 from '../assets2/IMG_20260428_192506.jpg.jpeg';
import productImage02 from '../assets2/IMG_20260428_192520.jpg.jpeg';
import productImage03 from '../assets2/IMG_20260428_192530.jpg.jpeg';
import productImage04 from '../assets2/IMG_20260428_192541.jpg.jpeg';
import productImage05 from '../assets2/IMG_20260428_192550.jpg.jpeg';
import productImage06 from '../assets2/IMG_20260428_192611.jpg.jpeg';
import productImage07 from '../assets2/IMG_20260428_192620.jpg.jpeg';
import productImage08 from '../assets2/IMG_20260428_192707.jpg.jpeg';
import productImage09 from '../assets2/IMG_20260428_192725.jpg.jpeg';
import productImage10 from '../assets2/IMG_20260428_192741.jpg.jpeg';
import productImage11 from '../assets2/IMG_20260428_192753.jpg.jpeg';
import productImage12 from '../assets2/IMG_20260428_231705.jpg.jpeg';
import productImage13 from '../assets2/IMG_20260428_231714.jpg.jpeg';
import productImage14 from '../assets2/IMG_20260428_231721.jpg.jpeg';
import productImage15 from '../assets2/IMG_20260428_231742.jpg.jpeg';
import productImage16 from '../assets2/IMG_20260428_231843.jpg.jpeg';
import productImage17 from '../assets2/IMG_20260428_231855.jpg.jpeg';
import productImage18 from '../assets2/IMG_20260428_231926.jpg.jpeg';
import productImage19 from '../assets2/IMG_20260428_231947.jpg.jpeg';
import productImage20 from '../assets2/IMG_20260428_231955.jpg.jpeg';
import productImage21 from '../assets2/IMG_20260428_232002.jpg.jpeg';
import productImage22 from '../assets2/IMG_20260428_232033.jpg.jpeg';
import productImage23 from '../assets2/IMG_20260428_232051.jpg (1).jpeg';
import productImage24 from '../assets2/IMG_20260428_232051.jpg.jpeg';
import productImage25 from '../assets2/IMG_20260428_232138.jpg.jpeg';
import productImage26 from '../assets2/IMG_20260428_232154.jpg.jpeg';
import productImage27 from '../assets2/IMG_20260428_232201.jpg.jpeg';
import productImage28 from '../assets2/IMG_20260428_232216.jpg.jpeg';
import productImage29 from '../assets2/IMG_20260428_232229.jpg.jpeg';
import productImage30 from '../assets2/IMG_20260428_232251.jpg.jpeg';
import productImage31 from '../assets2/IMG_20260428_232329.jpg.jpeg';
import productImage32 from '../assets2/IMG_20260428_232343.jpg.jpeg';
import productImage33 from '../assets2/IMG_20260428_232418.jpg.jpeg';
import productImage34 from '../assets2/IMG_20260428_232451.jpg.jpeg';
import productImage35 from '../assets2/IMG_20260428_232508.jpg.jpeg';
import productImage36 from '../assets2/IMG_20260428_232527.jpg.jpeg';
import productImage37 from '../assets2/IMG_20260428_232544.jpg.jpeg';
import productImage38 from '../assets2/IMG_20260428_232557.jpg.jpeg';
import productImage39 from '../assets2/IMG_20260428_232610.jpg.jpeg';
import productImage40 from '../assets2/IMG_20260428_232642.jpg.jpeg';
import productImage41 from '../assets2/IMG_20260428_232735.jpg.jpeg';
import productImage42 from '../assets2/IMG_20260429_062909.jpg.jpeg';
import productImage43 from '../assets2/IMG_20260429_062940.jpg.jpeg';
import productImage44 from '../assets2/IMG_20260429_062950.jpg.jpeg';
import productImage45 from '../assets2/IMG_20260429_062959.jpg.jpeg';
import productImage46 from '../assets2/IMG_20260429_063008.jpg.jpeg';
import productImage47 from '../assets2/IMG_20260429_063016.jpg.jpeg';
import productImage48 from '../assets2/IMG_20260429_063024.jpg.jpeg';
import productImage49 from '../assets2/IMG_20260429_063040.jpg.jpeg';
import productImage50 from '../assets2/IMG_20260429_063109.jpg.jpeg';

const AFFILIATE_URL = 'https://www.example-affiliate-link.com';

export const allProducts = [
    { id: 1, name: 'Dot & Key', category: 'Treatment', target: 'Face', price: '987', image: <img src={productImage01} alt="Dot & Key" />, description: 'Dot & Key Vitamin C + E Skin Care Combo for glowing skin (3 Items in the set) 34% OFF.', affiliateLink: 'https://fktr.in/UiOp5Qf' },
    { id: 2, name: 'Dot & Key', category: 'Night Gel', target: 'Face', price: '-14% ₹426', image: <img src={productImage02} alt="Ceramide Barrier Cream" />, description: 'Dot & Key CICA Calming Skin Renewing Night Gel | For Oily, Acne Prone And Sensitive Skin | Night Cream with Niacinamide, Green Tea & Hyaluronic | Fades Blemishes & Dark Spots | 60ml.', affiliateLink: 'https://amzn.to/3Qvtvgf' },
    { id: 3, name: 'Dot & Key', category: 'Moisturizer', target: 'Face', price: '-13% ₹347', image: <img src={productImage03} alt="Hyaluronic Body Lotion" />, description: 'Strawberry Brightening Moisturizer | Niacinamide, Peptides & Hyaluronic Acid, Non-sticky, Brightens Skin, Intense Moisturization | Non-Comedogenic & Fragrance Free, Lightweight | 80g.', affiliateLink: 'https://amzn.to/3R8G6pG' },
    { id: 4, name: 'Dot & Key', category: 'Moisturizer', target: 'Face', price: '-20% ₹395', image: <img src={productImage04} alt="Vitamin C Brightening Serum" />, description: 'Dot & Key Vitamin C + E Sorbet Super Bright Moisturizer For Face | Vitamin C Face Moisturizer|Reduces Skin Dullness|Oil Free & Lightweight | For All Skin Types | 60Ml.', affiliateLink: 'https://amzn.to/4t21AC4' },
    { id: 5, name: 'Clayco.', category: 'Night Cream', target: 'Face', price: '-18% ₹898', image: <img src={productImage05} alt="Cetaphil Gentle Skin Cleanser" />, description: 'Rice & Sake Sleep Mask 50 Ml | Face Mask For Glowing Skin | Night Cream For Glass skin | Japanese Skincare Routine | Sulphate Free & Vegan.', affiliateLink: 'https://amzn.to/4eSej6J' },
    { id: 6, name: 'Clayco.', category: 'Clay Mask', target: 'Face', price: '-3% ₹579', image: <img src={productImage06} alt="Mineral Body Sunscreen" />, description: 'Matcha Detox Clay Mask | Deep Cleansing & Brightening | Green Tea & Collagen | Tan Removal & Dark Spot Reduction | Vegan Japanese Skincare | 50ml.', affiliateLink: 'https://amzn.to/4n2qakT' },
    { id: 7, name: 'Clayco.', category: 'Serum', target: 'Face', price: '-10% ₹899', image: <img src={productImage07} alt="Niacinamide Oil Control" />, description: 'Cica Microneedling Exosome Serum for Brightening, Uneven Skin & Fine Lines | Calms Redness, Boosts Collagen & Strengthens Barrier | 30ml.', affiliateLink: 'https://amzn.to/48uEfBy' },
    { id: 8, name: 'Cetaphil', category: 'Sunscreen', target: 'Face', price: '₹1,080', image: <img src={productImage08} alt="Shea Butter Hand Cream" />, description: 'Sun SPF 50 Sunscreen Light Gel 50 ml – Very High Protection SPF 50+ Broad Spectrum UVA/UVB - Lightweight, Non-Sticky Gel - - Water resistant - Fast Absorbing Daily Face Sunscreen for Sensitive Skin - For All Skin Types.', affiliateLink: 'https://amzn.to/4t6h3kz' },
    { id: 9, name: 'Cetaphil', category: 'Cleanser', target: 'Face', price: '$16', image: <img src={productImage09} alt="Cetaphil Gentle Skin Cleanser" />, description: 'Sulphate-Free Gentle Skin Hydrating Cleanser with Niacinamide, Vitamin B5 for Dry to Normal, Sensitive Skin.', affiliateLink: 'https://amzn.to/4vWlFwd' },
    { id: 10, name: 'The Derma Co.', category: 'Sunscreen', target:'Face', price: '-24% ₹534', image: <img src={productImage10} alt="Soothing Aloe Gel" />, description: '1% Hyaluronic Quick-Absorbing Sunscreen Spray |Hyaluronic Acid & Vitamin E | SPF 50 & PA++++ | No White Cast | Hydrating Fluid | Easy Reapplication | Face & Body | All Skin Types-100 ml.', affiliateLink: 'https://amzn.to/4cQ4kMD' },
    { id: 11, name: 'The Derma Co.', category: 'Sunscreen', target: 'Face', price: '-24% ₹534', image: <img src={productImage11} alt="Brightening Dew Drops" />, description: '1% Hyaluronic Quick-Absorbing Sunscreen Spray |Hyaluronic Acid & Vitamin E | SPF 50 & PA++++ | No White Cast | Hydrating Fluid | Easy Reapplication | Face & Body | All Skin Types-100 ml.', affiliateLink: 'https://amzn.to/4n93lvR' },
    { id: 12, name: 'Beauty of Joseon', category: 'Serum', target: 'Face', price: '-12% ₹1,975', image: <img src={productImage12} alt="Deep Repair Night Cream" />, description: 'Hanbang Serum Discovery Kit (10ml each) (4 Items in the set).', affiliateLink: 'https://fktr.in/glVZi79' },
    { id: 13, name: 'Phitku', category: 'Deodorant Roll On', target: 'Underarms', price: '-23% ₹767', image: <img src={productImage13} alt="Aloe Cooling Body Mist" />, description: 'Phitku Alum Aloe Roll On | Natural Deodorant Men & Women | Long Odor Control Deodorant Roll-on  -  For Men & Women (100 g).', affiliateLink: 'https://fktr.in/bcxui2Y' },
    { id: 14, name: 'Phitku', category: 'Deodorant Roll On', target: 'Underarms', price: '-23% ₹767', image: <img src={productImage14} alt="SPF Lip Shield" />, description: 'Phitku Alum Natural Roll On | Unscented Deodorant Men & Women | Long Odor Control Deodorant Roll-on  -  For Men & Women (100 g).', affiliateLink: 'https://amzn.to/48vYPl6' },
    { id: 15, name: 'Medicube', category: 'Serum', target: 'Face', price: '-49% ₹1,770', image: <img src={productImage15} alt="Gentle Exfoliating Gel" />, description: 'Collagen Glow Booster Serum, Purunto Collagen, Collagen Blended, Vibrant Skin, Ultra Dry Skin Serum,UNBOX JAPAN EXCLUSIVE.', affiliateLink: 'https://amzn.to/4n2CzFt' },
    { id: 16, name: 'Medicube', category: 'Serum', target: 'Face', price: '-37% ₹2,199', image: <img src={productImage16} alt="Overnight Retinol Rescue" />, description: 'Zero 1DAY Exosome Shot 2000ppm, Needle Serum, Pores, Firmness, Sensitive Skin,UnboxJapan Exclusive.', affiliateLink: 'https://amzn.to/4edqAT6' },
    { id: 17, name: 'Medicube', category: 'Booster Gel', target: 'Face', price: '-13% ₹1,660', image: <img src={productImage17} alt="Hydrating Eye Dew" />, description: 'Medicube Age-R PDRN Booster Gel 300ml Hydrating & Skin Revitalizing Care Formula (300 ml).', affiliateLink: 'https://fktr.in/HoNfpkT' },
    { id: 18, name: 'Medicube', category: 'Toner', target: 'Face', price: '-12% ₹1,930', image: <img src={productImage18} alt="Cucumber Cooling Sheet Mask" />, description: 'Medicube PDRN PINK CICA SOOTHING TONER Men & Women (250 ml).', affiliateLink: 'https://fktr.in/HDQIut5' },
    { id: 19, name: 'Medicube', category: 'Gelly Cream', target: 'Face', price: '-5% ₹1,520', image: <img src={productImage19} alt="Daily Barrier Booster" />, description: 'Collagen Jelly Cream-50ml with Niacinamide and Freeze-Dried Collagen improves uneven skin tone, boosts hydration, and 24-hour glow. No artificial colors. Korean skincare(1.69 fl. oz.).', affiliateLink: 'https://amzn.to/3Pb0iGX' },
    { id: 20, name: 'Ghar Soaps', category: 'Soaps', target: 'Body', price: '-23% ₹299', image: <img src={productImage20} alt="Charcoal Detox Body Bar" />, description: 'Sandalwood & Saffron Magic Soaps For Bath (100 Gms Pack Of 2) | Paraben Free | Chandan & Kesar Bath Soap | Handmade Soaps For Glowing | Skin Brightening Soap For Men & Women.', affiliateLink: 'https://amzn.to/4t2gFDG' },
    { id: 21, name: 'Ghar Soaps', category: 'Soaps', target: 'Body', price: '-20% ₹399', image: <img src={productImage21} alt="Rose Radiance Toner" />, description: 'Sandalwood & Saffron Magic Soaps For Bath (300 Gms Pack Of 3) | Paraben Free | Chandan & Kesar Bath Soap | Handmade Soaps For Glowing | Skin Brightening Soap For Men & Women.', affiliateLink: 'https://amzn.to/42DYMQG' },
    { id: 22, name: 'Clayco.', category: 'Scrub', target: 'Face', price: '-19% ₹649', image: <img src={productImage22} alt="Sugar Glow Lip Scrub" />, description: 'Matcha Enzyme Scrub with AHA & BHA | Gentle Exfoliating Green Tea Scrub for Dead Skin Removal, Blackheads & Pore Cleansing.', affiliateLink: 'https://amzn.to/4mV0IO0' },
    { id: 23, name: 'Hyphen', category: 'Serum', target: 'Face', price: '-5% ₹546', image: <img src={productImage23} alt="Vitamin B5 Recovery Mask" />, description: '10% Vitamin C, 1% Vitamin E & Ferulic Acid Serum| Clinically Tested to Brighten, Treat Dark Spots & Pigmentation | 12Hr Slow Release Formula| Non-Irritating, Suitable for Sensitive Skin – 20ml.', affiliateLink: 'https://amzn.to/4mZqfWg' },
    { id: 24, name: 'Hyphen', category: 'Serum', target: 'Face', price: '-5% ₹546', image: <img src={productImage24} alt="Ocean Mineral Hand Rescue" />, description: '10% Vitamin C, 1% Vitamin E & Ferulic Acid Serum| Clinically Tested to Brighten, Treat Dark Spots & Pigmentation | 12Hr Slow Release Formula| Non-Irritating, Suitable for Sensitive Skin – 20ml.', affiliateLink: 'https://amzn.to/4mZqfWg' },
    { id: 25, name: 'Hyphen', category: 'Serum', target: 'Face', price: '-5% ₹569', image: <img src={productImage25} alt="Peptide Neck Firming Cream" />, description: '4% Tranexamic Acid + 5% Niacinamide Biphasic De-Pigmentation Serum | Correction & Prevents Hyperpigmentation, Dark Spots & Melasma| In-vivo tested & Non-Comedogenic| Deep Penetration - 30 ml.', affiliateLink: 'https://amzn.to/4w1dlez' },
    { id: 26, name: 'Hyphen', category: 'Serum', target: 'Face', price: '-15% ₹549', image: <img src={productImage26} alt="Glow Boost C Serum" />, description: '18% Brightening + 20% Collagen Face Serum | Double Shot Serum with 11% Mandarin 5% Niacinamide 2% PGA & Bakuchiol | Winter Skincare | Brightening, Hydrating & Collagen Boost for Dry Skin - 50ml.', affiliateLink: 'https://amzn.to/4cGnIgj' },
    { id: 27, name: 'Scalpe+', category: 'Shampoo', target: 'Scalpe', price: '-5% ₹327.', image: <img src={productImage27} alt="Mint Refresh Foot Cream" />, description: 'Expert - Bottle of 75ml Anti Dandruff Shampoo for Men and Women with Ketoconazole and ZPTO.', affiliateLink: 'https://amzn.to/4cUkK6R' },
    { id: 28, name: 'Plum', category: 'Makeup', target: 'Eyes', price: '-14% ₹237', image: <img src={productImage28} alt="Silk Finish Primer" />, description: 'Eye-Swear-By Kajal | Deep Black | Creamy Smooth | Smudge-Proof & Waterproof | Long-Lasting | Twist-Up Pencil | Enriched with Vitamin E | 100% Vegan & Cruelty-Free | 0.35g.', affiliateLink: 'https://amzn.to/4cQIatF' },
    { id: 29, name: 'Kajal', category: 'Makeup', target: 'Eyes', price: '-84% ₹49', image: <img src={productImage29} alt="Gentle Calming Spray" />, description: 'Long Lasting 12hr Kajal Pencil Waterproof, Smudge-Proof, Extra Black Eyeliner 3-in-1 Use as Eyeliner & Eyeshadow Eye Care Kajal for Women & Girls.', affiliateLink: 'https://amzn.to/4w1fAP1' },
    { id: 30, name: 'COSRX', category: 'Cleansing Water', target: 'Face', price: '₹600', image: <img src={productImage30} alt="Hydra Quench Serum" />, description: 'Low pH Niacinamide Micellar Cleansing Water.', affiliateLink: 'https://amzn.to/4vQ96m2' },
    { id: 31, name: 'COSRX', category: 'Serum', target: 'Face', price: '-22% ₹1,600', image: <img src={productImage31} alt="Coconut Glow Body Oil" />, description: 'COSRX 6X Peptide Collagen Booster Toner Serum 150ml, Skin Renewal Boosting Facial Essence, Niacinamide & Hyaluronic Acid for All Skin Types, Korean Skincare, Paraben Free.', affiliateLink: 'https://amzn.to/4vUdMax' },
    { id: 32, name: 'COSRX', category: 'Serum', target: 'Face', price: '-10% ₹1,215', image: <img src={productImage32} alt="Jasmine Night Balm" />, description: 'COSRX AHA 7 Whitehead Power Liquid, 3.38 fl.oz / 100ml, Whitehead Remover, Glycolic Acid 7%, AHA Exfoliant, Pore Minimizer, Korean Skin Care, Animal Testing Free, Paraben Free.', affiliateLink: 'https://amzn.to/4uijIZg' },
    { id: 33, name: 'Plix', category: 'Water Spray', target: 'Hair', price: '₹225', image: <img src={productImage33} alt="Bright Eyes Serum" />, description: 'THE PLANT FIX Rosemary Advanced Spray for Fuller, Thicker Hair, Redensyl® & Rosemary Extract, Easy to Use, Mess-free, Stimulates Hair Follicles & Promotes Hair Growth, For All Hair Types, 100ml.', affiliateLink: 'https://amzn.to/4w7kqun' },
    { id: 34, name: 'Plix', category: 'Serum', target: 'Face', price: '-5% ₹449', image: <img src={productImage34} alt="Marine Collagen Mask" />, description: '10% Vitamin C Face Serum (20ml) for Skin Brightening & Even toned complexion with Guava Extract, Hyaluronic acid & Pentavitin, for Women & Men | All Skin Types.', affiliateLink: 'https://amzn.to/4tNCuYW' },
    { id: 35, name: 'Aqualogica', category: 'Perfume', target: 'Body Mist', price: '-14% ₹431', image: <img src={productImage35} alt="Golden Glow Face Oil" />, description: ' Cherry Blossom Bloom Perfume Body Mist with Zemea and Hyaluronic Acid - 150 ml | Sweet Floral & Fruity Notes of Pear & Jasmine | Long-Lasting Fragrance | Hydrating & Non-Irritating.', affiliateLink: 'https://amzn.to/4eT05m5' },
    { id: 36, name: 'Aqualogica', category: 'Moisturizer', target: 'Face', price: '-58% ₹188', image: <img src={productImage36} alt="Purifying Clay Cleanser" />, description: ' Milk Fluid Moisturizer with Papaya & Vitamin C | Lightweight Milk-Like Texture | Brightens Skin | 48-H Deep Moisturization I For Normal To Combination Skin | Non Sticky, Quick Absorbing & Hydrating | 70 ml.', affiliateLink: 'https://amzn.to/4tfojuE' },
    { id: 37, name: 'Aqualogica', category: 'Sweet Summer Kiss Body Care Set', target: 'Face or Body', price: '-40% ₹596', image: <img src={productImage37} alt="Revive Sleep Mask" />, description: 'Sweet Summer Kiss Body Care Set | Perfume Body Wash + Perfume Mist + Hydra Gel Moisturizer.', affiliateLink: 'https://amzn.to/4dj78Cv' },
    { id: 38, name: 'Aqualogica', category: 'Aqualogica Cherry Blossom Bloom', target: 'Face or Body', price: '-33% ₹997', image: <img src={productImage38} alt="Hydro Shield Mist" />, description: ' (Hot Girl Essentials) | With Sling Bag & Charms | Perfume Body Wash | Perfume Body Mist | Hydra Gel Moisturizer | Fragrance | Gift Set | Gifting For Valentines Birthday, Anniversary, Rakhi & Special Occasions | Premium Gift Pack.', affiliateLink: 'https://amzn.to/3P90iHu' },
    { id: 39, name: 'Aqualogica', category: 'Aqualogica Glow+ Born to Glow', target: 'Face or Body', price: '-33% ₹997', image: <img src={productImage39} alt="Rosehip Repair Oil" />, description: 'Aqualogica Glow+ Born to Glow | With Sling Bag & Charms | For fresh & glowing skin | Gently Cleanses | 24-Hour Hydration | SPF 50+ PA++++ | Anti-Pollution Factor | Travel-friendly | Gift Set For Women | Gifting For Birthday, Valentines, Anniversary, Rakhi & Special Occasions | Premium Gift Pack | Pack Of 3.', affiliateLink: 'https://amzn.to/4eRGBOO' },
    { id: 40, name: 'Aqualogica', category: 'Moisturizer', target: 'Face', price: '-13% ₹347', image: <img src={productImage40} alt="Cocoa Comfort Body Cream" />, description: 'Oil-Free Moisturizer with Wild Berries & Alpha Arbutin for Luminous Glow - Normal, Dry & Combination Skin -Hydration & Even Skin Tone for Men & Women | 100 g.', affiliateLink: 'https://amzn.to/4ucesq6' },
    { id: 41, name: 'Aqualogica', category: 'Sun Kissed Vanilla Body Care Set ', target: 'Face or Body', price: '-10% ₹898', image: <img src={productImage41} alt="Matcha Detox Sheet Mask" />, description: 'Cherry Blossom Bloom Body Care Set | Perfume Body Wash | Perfume Body Mist | Hydra Gel Moisturizer | Fragrance | Gift Set | Gifting For Birthday | Anniversary, Rakhi & Special Occasions| Premium Gift Pack.', affiliateLink: 'https://amzn.to/3RazJSJ' },
    { id: 42, name: 'Aqualogica', category: 'Cherry Blossom Bloom', target: 'Face or Body', price: '-10% ₹898', image: <img src={productImage42} alt="Pore Refining Essence" />, description: 'Cherry Blossom Bloom Body Care Set | Perfume Body Wash | Perfume Body Mist | Hydra Gel Moisturizer | Fragrance | Gift Set | Gifting For Birthday | Anniversary, Rakhi & Special Occasions| Premium Gift Pack.', affiliateLink: 'https://amzn.to/3RazJSJ' },
    { id: 43, name: 'Plum', category: 'Night Gel', target: 'Face', price: '-10% ₹175', image: <img src={productImage43} alt="Satin Finish Hand Serum" />, description: 'Green Tea Renewed Clarity Night Gel Mini | Hydrates Skin & Fights Acne | Lightweight, Quick-Absorbing, Non-Sticky Gel Texture | Oily, Acne-Prone Skin | 100% Vegan(15ml).', affiliateLink: 'https://amzn.to/4mVkkS8' },
    { id: 44, name: 'Plum', category: 'Face Wash', target: 'Face', price: '-10% ₹293', image: <img src={productImage44} alt="Ultra Calm Toner" />, description: '1% Encapsulated Salicylic Acid Foaming Face Wash | Fights Active Acne, controls oil & deep cleanses pores | with Glycolic Acid & Fruit AHAs | All Skin Types | Face Cleanser for Women & Men | 110ml.', affiliateLink: 'https://amzn.to/4d0GmP7' },
    { id: 45, name: 'Plum', category: 'Face Wash', target: 'Face', price: '-10% ₹270', image: <img src={productImage45} alt="Citrus Energizing Gel" />, description: '2% Niacinamide & Rice Water Face Wash 100ml | Hydrates & Brightens Skin | Softens & Smoothens Skin | Gentle & Non-Drying | Gently Cleanses 99% pore clogging impurities | Women & Men |.', affiliateLink: 'https://amzn.to/4mZ3zFL' },
    { id: 46, name: 'Bare Anatomy', category: 'Anit-dandruff Kit', target: 'Scalp', price: '-17% ₹774', image: <img src={productImage46} alt="Essential Beard Oil" />, description: 'Bare Anatomy Anti-Dandruff Shampoo & Conditioner Combo | Up to 100% Dandruff Control Reduces Dryness & Frizz | For All Hair Types | 250ml + 175gm.', affiliateLink: 'https://amzn.to/4eelmGI' },
    { id: 47, name: 'Plum', category: 'Skincare', target: 'Face', price: '-25% ₹1,179', image: <img src={productImage47} alt="Lemon Zest Foot Exfoliator" />, description: 'Plum Niacinamide Brightening Skincare Routine Combo | Oil-Free Hydration, Oil Control & SPF 50 PA++++ Protection | Face Wash, Serum, Moisturiser & Sunscreen.', affiliateLink: 'https://amzn.to/4cQtZ7X' },
    { id: 48, name: 'Plum', category: 'Toner', target: 'Face', price: '-9% ₹399', image: <img src={productImage48} alt="Mint Fresh Deodorant" />, description: '3% Niacinamide & Rice Water Face Toner | Alcohol-Free Toner for Oily Acne Prone Dry Combination Skin | Pore Tightening & Glowing Skin |Fades Blemishes, Brightens & Smoothens | Women & Men | 150ml.', affiliateLink: 'https://amzn.to/4tGWRXs' },
    { id: 49, name: 'CeraVe', category: 'Moisturizer', target: 'Face', price: '-15% ₹1,619', image: <img src={productImage49} alt="Squalane Repair Drops" />, description: 'Moisturizing Cream For Dry To Very Dry Skin (454g) - Formulated with 3 Essential Ceramides And Hyaluronic Acid | Non-Comedogenic Moisturizer For Face and Body.', affiliateLink: 'https://amzn.to/4mVrrdi' },
    { id: 50, name: 'CeraVe', category: 'Face Wash', target: 'Face', price: '-13%₹1,437', image: <img src={productImage50} alt="Velvet Sleep Body Lotion" />, description: 'CeraVe Foaming Cleanser  For Oily Skin with Hyaluronic Acid, Dermatologist Recommended Face Wash (473 ml).', affiliateLink: 'https://fktr.in/bTV2R5m' }
];

const ProductsPage = ({ wishlist = [], toggleWishlist, addToCart }) => {
    const [filter, setFilter] = useState('All');
    const [searchTerm, setSearchTerm] = useState('');
    const [affiliateModal, setAffiliateModal] = useState({ isOpen: false, product: null });

    const uniqueCategories = ['All', ...Array.from(new Set(allProducts.map(product => product.category).filter(Boolean)))];

    const filteredProducts = allProducts.filter(p => {
        const matchesFilter = filter === 'All' || p.category === filter;
        const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase()) || p.description.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesFilter && matchesSearch;
    });

    const formatPrice = (price) => {
        const value = String(price || '');
        const matches = value.match(/([0-9][0-9,]*(?:\.[0-9]+)?)(?=[^0-9]*$)/g);
        if (!matches?.length) return '₹0';
        const numeric = Number(matches[matches.length - 1].replace(/,/g, ''));
        if (!Number.isFinite(numeric) || numeric === 0) return '₹0';
        return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(numeric);
    };

    const categories = uniqueCategories;

    const openAffiliateModal = (product) => {
        setAffiliateModal({ isOpen: true, product });
    };

    const closeAffiliateModal = () => {
        setAffiliateModal({ isOpen: false, product: null });
    };

    return (
        <div className="products-page">
            <header className="products-header">
                <h1>Skin & Body Protection</h1>
                <p>Premium solutions for your skin's health and safety.</p>
            </header>

            <div className="controls">
                <div className="search-bar">
                    <input 
                        type="text" 
                        placeholder="Search products..." 
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <div className="filter-chips">
                    {categories.map(cat => (
                        <button 
                            key={cat} 
                            className={`chip ${filter === cat ? 'active' : ''}`}
                            onClick={() => setFilter(cat)}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
            </div>

            <div className="products-grid">
                {filteredProducts.map(product => (
                    <div key={product.id} className="product-card">
                        <div className="product-image">
                            {product.image}
                            <button 
                                className={`wishlist-btn ${wishlist.includes(product.id) ? 'active' : ''}`}
                                onClick={() => toggleWishlist(product.id)}
                                title={wishlist.includes(product.id) ? 'Remove from wishlist' : 'Add to wishlist'}
                            >
                                {wishlist.includes(product.id) ? '❤️' : '🤍'}
                            </button>
                        </div>
                        <div className="product-info">
                            <div className="product-labels">
                                <span className="product-category">{product.category}</span>
                                <span className="product-target">for {product.target}</span>
                            </div>
                            <h3>{product.name}</h3>
                            <p>{product.description}</p>
                            <div className="product-footer">
                                <span className="price">{formatPrice(product.price)}</span>
                                <div className="product-actions">
                                    <button 
                                        className="buy-btn"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            window.open(product.affiliateLink, '_blank');
                                        }}
                                    >
                                        🛒 Buy Now
                                    </button>
                                    <button
                                        className="add-btn"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            addToCart(product);
                                        }}
                                    >
                                        Add to Bag
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {filteredProducts.length === 0 && (
                <div className="no-results">
                    <p>No products found matching your search.</p>
                </div>
            )}

            {affiliateModal.isOpen && (
                <AffiliateModal
                    product={affiliateModal.product}
                    onClose={closeAffiliateModal}
                />
            )}

            <style>{`
                .products-page { padding: 40px 20px; max-width: 1200px; margin: 0 auto; perspective: 1500px; min-height: 100vh; }
                .products-header { text-align: center; margin-bottom: 50px; }
                .products-header h1 { font-size: 2.5rem; margin-bottom: 10px; color: #fbc02d; }
                .products-header p { color: #888; font-size: 1.1rem; }

                .controls { margin-bottom: 40px; display: flex; flex-direction: column; gap: 20px; align-items: center; }
                .search-bar { width: 100%; max-width: 500px; }
                .search-bar input { 
                    width: 100%; padding: 12px 20px; border-radius: 30px; border: 2px solid #fff9c4;
                    font-size: 1rem; outline: none; transition: all 0.3s;
                    box-sizing: border-box;
                }
                .search-bar input:focus { border-color: #fbc02d; background: #fffde7; }

                .filter-chips { display: flex; flex-wrap: wrap; gap: 10px; justify-content: center; }
                .chip { 
                    padding: 8px 20px; border-radius: 20px; border: 1px solid #fff9c4; background: #fff;
                    cursor: pointer; transition: all 0.3s; font-weight: 500; color: #666;
                }
                .chip.active { background: #fbc02d; color: #fff; border-color: #fbc02d; box-shadow: 0 4px 15px rgba(251, 192, 45, 0.3); }
                .chip:hover:not(.active) { background: #fffde7; color: #fbc02d; }

                .products-grid { 
                    display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); 
                    gap: 30px; 
                }
                .product-card { 
                    background: #fff; border-radius: 20px; overflow: hidden;
                    box-shadow: 0 10px 20px rgba(251, 192, 45, 0.1); 
                    transition: all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
                    border: 1px solid #fff9c4;
                    animation: popIn 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275) backwards;
                }
                @keyframes popIn {
                    0% { transform: scale(0.5) rotateX(-45deg); opacity: 0; }
                    100% { transform: scale(1) rotateX(0); opacity: 1; }
                }
                .product-card:hover { 
                    transform: translateY(-8px);
                    box-shadow: 0 20px 40px rgba(251, 192, 45, 0.2);
                    border-color: #fbc02d;
                }
                .product-image { 
                    height: 260px; background: #fffde7; display: flex; 
                    align-items: center; justify-content: center; font-size: 80px;
                    transition: transform 0.3s; position: relative;
                }
                .product-image img {
                    width: 100%;
                    height: 100%;
                    object-fit: contain;
                }
                .product-card:hover .product-image { transform: scale(1.1) translateZ(30px); }
                
                .wishlist-btn {
                    position: absolute; top: 15px; right: 15px; 
                    background: rgba(255, 255, 255, 0.9); 
                    border: 2px solid #fbc02d; 
                    border-radius: 50%; 
                    width: 45px; height: 45px; 
                    display: flex; align-items: center; justify-content: center;
                    cursor: pointer; 
                    font-size: 20px; 
                    transition: all 0.3s ease;
                    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
                    backdrop-filter: blur(10px);
                }
                .wishlist-btn:hover { 
                    transform: scale(1.1); 
                    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.2);
                }
                .wishlist-btn.active { 
                    background: linear-gradient(135deg, #ff6b9d, #c44569); 
                    border-color: #ff6b9d; 
                    color: white; 
                    animation: heartPulse 0.6s ease;
                }
                .wishlist-btn.active:hover { 
                    background: linear-gradient(135deg, #ff4757, #ff3838); 
                }
                @keyframes heartPulse {
                    0% { transform: scale(1); }
                    50% { transform: scale(1.2); }
                    100% { transform: scale(1); }
                }
                
                .product-info { padding: 20px; }
                .product-category { font-size: 0.8rem; color: #fbc02d; text-transform: uppercase; font-weight: bold; }
                .product-info h3 { margin: 5px 0 10px; font-size: 1.2rem; color: #333; }
                .product-info p { font-size: 0.9rem; color: #666; line-height: 1.4; margin-bottom: 20px; height: 40px; overflow: hidden; }
                
                .product-footer { display: flex; justify-content: space-between; align-items: center; }
                .price { font-weight: bold; font-size: 1.1rem; color: #333; }
                .product-actions { display: flex; gap: 10px; flex-wrap: nowrap; }
                .buy-btn { 
                    background: linear-gradient(135deg, #ff6b9d, #c44569); color: #fff; border: none; padding: 10px 20px; 
                    border-radius: 20px; cursor: pointer; font-weight: bold; transition: background 0.3s, box-shadow 0.3s;
                    box-shadow: 0 4px 10px rgba(255, 107, 157, 0.2);
                    font-size: 0.9rem;
                    pointer-events: auto;
                    user-select: none;
                    white-space: nowrap;
                }
                .buy-btn:hover { 
                    background: linear-gradient(135deg, #c44569, #a04459); 
                    box-shadow: 0 6px 15px rgba(255, 107, 157, 0.3);
                }
                .buy-btn:active {
                    box-shadow: 0 2px 5px rgba(255, 107, 157, 0.2);
                }
                .add-btn { 
                    background: #fbc02d; color: #fff; border: none; padding: 10px 20px; 
                    border-radius: 20px; cursor: pointer; font-weight: bold; transition: background 0.3s, box-shadow 0.3s;
                    box-shadow: 0 4px 10px rgba(251, 192, 45, 0.2);
                    font-size: 0.9rem;
                    pointer-events: auto;
                    user-select: none;
                    white-space: nowrap;
                }
                .add-btn:hover { 
                    background: #f9a825; 
                    box-shadow: 0 6px 15px rgba(251, 192, 45, 0.3); 
                }
                .add-btn:active { 
                    box-shadow: 0 2px 5px rgba(251, 192, 45, 0.2);
                }

                .no-results { text-align: center; padding: 50px; color: #fbc02d; }
            `}</style>
        </div>
    );
};

export default ProductsPage;