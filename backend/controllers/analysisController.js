const { spawn } = require('child_process');
const path = require('path');
// const User = require('../models/User');
const User = require('../utils/mockDb');

// Product Database with Affiliate Links
const productDatabase = [
    { id: 1, name: 'Ultra-Light SPF 50+ (Cetaphil)', category: 'Protection', target: 'Face', price: '₹1,080', image: '☀️', description: 'Non-greasy sun protection for daily use. Very High Protection SPF 50+ Broad Spectrum UVA/UVB - Lightweight, Non-Sticky Gel - Water resistant', issues: ['Dark Spots', 'Aging', 'Sunburn'], skinTypes: ['All'], affiliateLink: 'https://amzn.to/4t6h3kz' },
    { id: 2, name: 'Ceramide Barrier Cream (Dot & Key)', category: 'Moisturizer', target: 'Face', price: '-20% ₹395', image: '🧴', description: 'Deeply hydrates and repairs skin barrier. Vitamin C + E Sorbet Super Bright Moisturizer. Reduces Skin Dullness. Oil free & Lightweight', issues: ['Dry Patches', 'Sensitive Skin', 'Eczema'], skinTypes: ['Dry'], affiliateLink: 'https://amzn.to/4t21AC4' },
    { id: 3, name: 'Hyaluronic Body Lotion (Aqualogica)', category: 'Moisturizer', target: 'Face', price: '-58% ₹188', image: '💧', description: 'Full body hydration for 24 hours. Lightweight Milk-Like Texture. Brightens Skin. 48-H Deep Moisturization for Normal to Combination Skin', issues: ['Dry Patches'], skinTypes: ['Dry', 'Normal'], affiliateLink: 'https://amzn.to/4tfojuE' },
    { id: 4, name: 'Vitamin C Brightening Serum (Hyphen)', category: 'Treatment', target: 'Face', price: '-5% ₹546', image: '🍊', description: 'Evens skin tone and boosts radiance. 10% Vitamin C, 1% Vitamin E & Ferulic Acid. Clinically Tested to Brighten & Treat Dark Spots. Non-Irritating, Suitable for Sensitive Skin', issues: ['Dark Spots', 'Melasma', 'Uneven Texture'], skinTypes: ['All'], affiliateLink: 'https://amzn.to/4mZqfWg' },
    { id: 5, name: 'Gentle Milk Cleanser (Cetaphil)', category: 'Cleanser', target: 'Face', price: 'Check Site', image: '🥛', description: 'Soap-free formula for sensitive skin. Sulphate-Free with Niacinamide & Vitamin B5 for Dry to Normal, Sensitive Skin.', issues: ['Sensitive Skin', 'Redness/Rosacea', 'Contact Dermatitis'], skinTypes: ['Sensitive'], affiliateLink: 'https://amzn.to/4vWlFwd' },
    { id: 6, name: 'Mineral Body Sunscreen (The Derma Co.)', category: 'Protection', target: 'Body', price: '-24% ₹534', image: '🏖️', description: 'Water-resistant protection for body. 1% Hyaluronic Quick-Absorbing Sunscreen Spray. SPF 50 & PA++++. No White Cast. Hydrating Fluid', issues: ['Sunburn', 'Dark Spots'], skinTypes: ['All'], affiliateLink: 'https://amzn.to/4cQ4kMD' },
    { id: 7, name: 'Niacinamide Oil Control (Dot & Key)', category: 'Treatment', target: 'Face', price: '-13% ₹347', image: '🧪', description: 'Reduces pores and controls sebum. Strawberry Brightening Moisturizer with Peptides & Hyaluronic Acid. Non-sticky, Non-Comedogenic', issues: ['Acne Breakouts', 'Oily T-Zone', 'Clogged Pores'], skinTypes: ['Oily'], affiliateLink: 'https://amzn.to/3R8G6pG' },
    { id: 8, name: 'Shea Butter Hand Cream (Ghar Soaps)', category: 'Body Care', target: 'Hands', price: '-20% ₹399', image: '👐', description: 'Intensive repair for dry hands. Sandalwood & Saffron Magic Soaps. Paraben Free. Handmade for Glowing Skin Brightening', issues: ['Dry Patches'], skinTypes: ['Dry'], affiliateLink: 'https://amzn.to/42DYMQG' },
    { id: 9, name: 'Salicylic Acid Body Wash (Plum)', category: 'Cleanser', target: 'Body', price: '-10% ₹293', image: '🚿', description: 'Clears body acne and smooths texture. 1% Encapsulated Salicylic Acid Foaming Face Wash. Fights Active Acne & Deep Cleanses Pores', issues: ['Acne Breakouts', 'Whiteheads', 'Uneven Texture'], skinTypes: ['Oily'], affiliateLink: 'https://amzn.to/4d0GmP7' },
    { id: 10, name: 'Soothing Aloe Gel (Clayco.)', category: 'Treatment', target: 'Universal', price: '-18% ₹898', image: '🌵', description: 'Instant cooling for irritated skin. Rice & Sake Sleep Mask. Face Mask For Glowing Skin. Japanese Skincare. Sulphate Free & Vegan', issues: ['Redness/Rosacea', 'Sunburn', 'Hives/Urticaria'], skinTypes: ['All'], affiliateLink: 'https://amzn.to/4eSej6J' },
];

// Routine Generator
const generateRoutine = (skinType, detectedIssues, concerns = []) => {
    const allIssues = [...new Set([...detectedIssues, ...(concerns || [])])];
    
    const routineByType = {
        'Oily': {
            morning: [
                { step: 'Cleanse', product: 'Gentle water-based cleanser' },
                { step: 'Exfoliate', product: 'BHA exfoliant (2-3x weekly)' },
                { step: 'Control Oil', product: 'Niacinamide serum or toner' },
                { step: 'Protect', product: 'Lightweight SPF 30+' }
            ],
            evening: [
                { step: 'Double Cleanse', product: 'Oil cleanser then water-based' },
                { step: 'Treat', product: 'BHA or AHA treatment' },
                { step: 'Minimize Pores', product: 'Pore-minimizing serum' },
                { step: 'Moisturize', product: 'Oil-free lightweight moisturizer' }
            ]
        },
        'Dry': {
            morning: [
                { step: 'Cleanse', product: 'Hydrating cream cleanser' },
                { step: 'Tone', product: 'Hydrating or rose toner' },
                { step: 'Hydrate', product: 'Hyaluronic acid serum' },
                { step: 'Protect', product: 'Rich moisturizer + SPF 50' }
            ],
            evening: [
                { step: 'Cleanse', product: 'Gentle oil or cream cleanser' },
                { step: 'Tone', product: 'Hydrating toner' },
                { step: 'Nourish', product: 'Rich face oil or serum' },
                { step: 'Deep Moisturize', product: 'Overnight mask or sleep cream' }
            ]
        },
        'Sensitive': {
            morning: [
                { step: 'Cleanse', product: 'Micellar water or gentle cleanser' },
                { step: 'Calm', product: 'Calming or barrier-repair toner' },
                { step: 'Soothe', product: 'Centella or chamomile serum' },
                { step: 'Protect', product: 'Mineral SPF sunscreen' }
            ],
            evening: [
                { step: 'Cleanse', product: 'Gentle fragrance-free cleanser' },
                { step: 'Calm', product: 'Anti-inflammatory toner' },
                { step: 'Restore', product: 'Barrier repair cream' },
                { step: 'Recovery', product: 'Soothing mask (1-2x weekly)' }
            ]
        },
        'Normal': {
            morning: [
                { step: 'Cleanse', product: 'Gentle water-based cleanser' },
                { step: 'Hydrate', product: 'Hydrating toner' },
                { step: 'Brighten', product: 'Vitamin C or brightening serum' },
                { step: 'Protect', product: 'SPF 30+ sunscreen' }
            ],
            evening: [
                { step: 'Cleanse', product: 'Gentle cleanser' },
                { step: 'Treat', product: 'Targeted treatment serum' },
                { step: 'Moisturize', product: 'Lightweight moisturizer' },
                { step: 'Restore', product: 'Hydrating mask (1x weekly)' }
            ]
        }
    };

    return routineByType[skinType] || routineByType['Normal'];
};

// Expert Tips Generator
const getExpertTips = (skinType, detectedIssues) => {
    const tips = {
        'Oily': [
            '💧 Use blotting papers throughout the day to manage excess oil.',
            '🌡️ Avoid hot water - use lukewarm water for cleansing.',
            '💤 Change pillowcase every 2-3 days to prevent bacterial buildup.'
        ],
        'Dry': [
            '💧 Drink plenty of water and use a humidifier in dry environments.',
            '🧴 Apply moisturizer while skin is still slightly damp.',
            '☀️ Use SPF to prevent further damage to your skin barrier.'
        ],
        'Sensitive': [
            '🧪 Patch test new products on inner arm before facial use.',
            '🌡️ Avoid extreme temperatures - they trigger inflammation.',
            '✂️ Minimize skincare routine to only essential products.'
        ],
        'Normal': [
            '⚖️ Maintain your routine even when skin feels balanced.',
            '☀️ Daily SPF is non-negotiable for prevention.',
            '💤 Ensure 7-9 hours of quality sleep for skin regeneration.'
        ]
    };

    const lifestyleTips = [
        '🥗 Eat antioxidant-rich foods (berries, leafy greens, nuts).',
        '💪 Exercise 30 minutes daily to improve blood circulation.',
        '😴 Maintain consistent sleep schedule for skin repair.',
        '🚭 Avoid smoking and reduce alcohol consumption.',
        '🧘 Practice stress management - stress triggers skin issues.'
    ];

    return {
        skinTypeSpecific: tips[skinType] || tips['Normal'],
        lifestyle: lifestyleTips
    };
};

// Product Recommendation Engine
const recommendProducts = (skinType, detectedIssues, concerns = []) => {
    const allIssues = [...new Set([...detectedIssues, ...(concerns || [])])];
    
    const recommendations = productDatabase
        .filter(product => {
            // Check if product is suitable for skin type or 'All'
            const skinTypeMatch = product.skinTypes.includes(skinType) || product.skinTypes.includes('All');
            // Check if product addresses any of the detected issues
            const issueMatch = allIssues.some(issue => product.issues.includes(issue));
            return skinTypeMatch && issueMatch;
        })
        .sort((a, b) => {
            // Prioritize by relevance (number of matching issues)
            const aMatches = allIssues.filter(issue => a.issues.includes(issue)).length;
            const bMatches = allIssues.filter(issue => b.issues.includes(issue)).length;
            return bMatches - aMatches;
        })
        .slice(0, 5);

    // Return product data with id, name, category, price for frontend mapping
    return recommendations.map(prod => ({
        id: prod.id,
        name: prod.name,
        category: prod.category,
        price: prod.price,
        description: prod.description,
        issues: prod.issues,
        affiliateLink: prod.affiliateLink
    }));
};

exports.analyzeImage = async (req, res) => {
    try {
        if (!req.file) return res.status(400).json({ message: 'No image uploaded' });

        const imagePath = path.resolve(req.file.path);
        const pythonExecutable = process.platform === 'win32' ? 'python' : 'python3';
        
        console.log(`Starting analysis for image: ${imagePath}`);
        console.log(`Using Python: ${pythonExecutable}`);

        const pythonProcess = spawn(pythonExecutable, [
            path.join(__dirname, '../../ai/skin_analyzer.py'),
            imagePath
        ]);

        let resultData = '';
        let errorData = '';

        pythonProcess.stdout.on('data', (data) => {
            resultData += data.toString();
        });

        pythonProcess.stderr.on('data', (data) => {
            errorData += data.toString();
        });

        pythonProcess.on('close', async (code) => {
            if (code !== 0) {
                return res.status(500).json({ 
                    message: 'AI Analysis failed', 
                    error: errorData || `Process exited with code ${code}` 
                });
            }

            try {
                if (!resultData.trim()) {
                    throw new Error('AI analysis returned empty result');
                }
                const analysis = JSON.parse(resultData);
                
                // Get user profile for enhanced analysis
                let enhancedAnalysis = analysis;
                let recommendations = [];
                let routine = null;
                let expertTips = null;
                
                let selectedProblems = [];
                let selectedProblemNames = [];
                if (req.body.selectedProblems) {
                    try {
                        selectedProblems = JSON.parse(req.body.selectedProblems);
                        selectedProblemNames = Array.isArray(selectedProblems)
                            ? selectedProblems.map(problem => typeof problem === 'string' ? problem : problem.name).filter(Boolean)
                            : [];
                    } catch (parseError) {
                        selectedProblemNames = [];
                    }
                }

                if (req.body.userId) {
                    const user = await User.findById(req.body.userId);
                    if (user) {
                        const userConcerns = user.skinProfile?.concerns || [];
                        const skinType = user.skinProfile?.skinType || 'Normal';
                        const combinedConcerns = [...new Set([...(userConcerns || []), ...selectedProblemNames])];
                        
                        // Generate recommendations based on user profile + detected issues + user-stated concerns
                        recommendations = recommendProducts(skinType, analysis.detectedIssues, combinedConcerns);
                        routine = generateRoutine(skinType, analysis.detectedIssues, combinedConcerns);
                        expertTips = getExpertTips(skinType, analysis.detectedIssues);
                        
                        // Update user profile
                        await User.findByIdAndUpdate(req.body.userId, {
                            'skinProfile.lastAnalysis': {
                                score: analysis.score,
                                detectedIssues: analysis.detectedIssues,
                                recommendations: recommendations.map(r => r.id),
                                selectedProblems: selectedProblemNames,
                                date: new Date()
                            }
                        });
                    }
                } else {
                    const skinType = 'Normal';
                    recommendations = recommendProducts(skinType, analysis.detectedIssues, selectedProblemNames);
                    routine = generateRoutine(skinType, analysis.detectedIssues, selectedProblemNames);
                    expertTips = getExpertTips(skinType, analysis.detectedIssues);
                }

                res.json({
                    analysis: {
                        ...analysis,
                        recommendations,
                        routine,
                        expertTips
                    },
                    imageUrl: `/uploads/${req.file.filename}`
                });
            } catch (err) {
                res.status(500).json({ message: 'Error parsing analysis results', error: err.message });
            }
        });

    } catch (error) {
        res.status(500).json({ message: 'Analysis failed', error: error.message });
    }
};
