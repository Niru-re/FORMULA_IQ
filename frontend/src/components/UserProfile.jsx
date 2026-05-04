import React, { useState } from 'react';
import AffiliateModal from './AffiliateModal';
import { allProducts } from './ProductsPage';

const AFFILIATE_URL = 'https://www.example-affiliate-link.com';

function UserProfile({ user, analysisResults, selectedProblems = [], wishlist = [], toggleWishlist, removeHistoryItem }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [affiliateModal, setAffiliateModal] = useState({ isOpen: false, product: null });

    const likedProducts = allProducts.filter(product => wishlist.includes(product.id));
    const userConcerns = user.skinProfile?.concerns?.length > 0 ? user.skinProfile.concerns : selectedProblems.map(p => p.name);
    const analysisHistory = user.analysisHistory || [];
    const displayedRoutine = analysisResults?.routine || analysisHistory[0]?.routine || user.skinProfile?.routine || { morning: [], evening: [] };
    
    // Enhanced dynamic product recommendations based on analysis
    const getDynamicRecommendations = () => {
        const skinType = user.skinProfile?.skinType || 'Normal';
        const detectedIssues = analysisResults?.detectedIssues || [];
        const allConcerns = [...new Set([...userConcerns, ...detectedIssues].map(concern => String(concern).trim()).filter(Boolean))];

        const normalize = (text) => String(text || '').toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();

        // Start with randomized catalog to ensure variety
        const shuffledCatalog = [...allProducts].sort(() => 0.5 - Math.random());

        const matchingProducts = shuffledCatalog.filter(product => {
            if (wishlist.includes(product.id)) return false;

            const productName = normalize(product.name);
            const productDesc = normalize(product.description);
            const categoryText = normalize(product.category);
            const targetText = normalize(product.target);

            // Match skin type
            const skinTypeMatch = skinType === 'Normal' || 
                               productName.includes(normalize(skinType)) || 
                               productDesc.includes(normalize(skinType)) ||
                               targetText.includes(normalize(skinType));

            // Match concerns and problems from product description
            const concernMatch = allConcerns.some(concern => {
                const concernText = normalize(concern);
                if (!concernText) return false;
                
                // Check direct matches and keyword associations
                const keywords = {
                    acne: ['acne', 'breakout', 'pimple', 'salicylic', 'bha', 'cleansing', 'oil control', 'clogged'],
                    dry: ['dry', 'hydration', 'moisturizer', 'hydrating', 'ceramide', 'hyaluronic', 'milk', 'cream'],
                    oily: ['oil', 'sebum', 'mattifying', 'oil control', 'niacinamide', 'pore'],
                    sensitive: ['sensitive', 'gentle', 'soothing', 'calming', 'barrier', 'fragrance free', 'cica'],
                    'dark spots': ['brightening', 'vitamin c', 'pigmentation', 'dark spot', 'even tone', 'dullness'],
                    redness: ['redness', 'rosacea', 'soothing', 'anti-inflammatory', 'calming'],
                    pores: ['pore', 'texture', 'exfoliating', 'aha', 'bha', 'scrub', 'blackhead'],
                    aging: ['aging', 'wrinkle', 'firming', 'retinol', 'peptide', 'collagen', 'fine line']
                };

                const isDirectMatch = productName.includes(concernText) || 
                                    productDesc.includes(concernText) || 
                                    categoryText.includes(concernText);

                const concernKey = Object.keys(keywords).find(k => concernText.includes(k) || k.includes(concernText));
                const isKeywordMatch = concernKey && keywords[concernKey].some(kw => 
                    productName.includes(kw) || productDesc.includes(kw)
                );

                return isDirectMatch || isKeywordMatch;
            });

            return skinTypeMatch && concernMatch;
        });

        // Ensure we have at least some products even if matching is too strict
        const finalRecs = matchingProducts.length > 0 
            ? matchingProducts 
            : shuffledCatalog.slice(0, 8);

        // Remove duplicates and limit
        return finalRecs
            .filter((product, index, self) => index === self.findIndex(p => p.id === product.id))
            .slice(0, 12);
    };
    
    const recommendedProducts = getDynamicRecommendations();

    // Expert explanation generator for each product
    const getProductExplanation = (product) => {
        const skinType = user.skinProfile?.skinType || 'Normal';
        const concerns = userConcerns;
        
        const productName = product.name?.toLowerCase() || '';
        const category = product.category?.toLowerCase() || '';
        const description = product.description?.toLowerCase() || '';
        
        let reason = '';
        
        if (category.includes('cleanser')) {
            reason = 'This cleanser removes impurities and prepares your skin for treatments.';
        } else if (category.includes('treatment') || category.includes('serum')) {
            reason = 'This targeted treatment addresses your specific skin concerns.';
        } else if (category.includes('moisturizer')) {
            reason = 'This moisturizer locks in hydration and prevents water loss.';
        } else if (category.includes('protection') || productName.includes('spf')) {
            reason = 'Daily sun protection prevents dark spots, aging, and skin damage.';
        } else if (category.includes('exfo')) {
            reason = 'Gentle exfoliation reveals fresh, glowing skin by removing dead cells.';
        } else {
            reason = 'This product is recommended for your specific skin type and concerns.';
        }
        
        return reason;
    };

    // Routine with product recommendations from shop
    const getRoutineWithProducts = () => {
        const baseRoutine = displayedRoutine || { morning: [], evening: [] };
        
        const matchProductToStep = (stepName) => {
            if (!stepName) return null;
            
            const stepLower = String(stepName).toLowerCase();
            
            // Find best matching product from recommended products
            let matchedProduct = null;
            let matchScore = 0;
            
            recommendedProducts.forEach(prod => {
                let score = 0;
                const prodName = prod.name?.toLowerCase() || '';
                const prodCat = prod.category?.toLowerCase() || '';
                
                if (stepLower.includes('cleanse') && prodCat.includes('cleanser')) {
                    score = 10;
                } else if (stepLower.includes('exfoliate') && (prodName.includes('acid') || prodCat.includes('treatment'))) {
                    score = 10;
                } else if ((stepLower.includes('hydrate') || stepLower.includes('tone')) && prodCat.includes('serum')) {
                    score = 10;
                } else if ((stepLower.includes('moisturize') || stepLower.includes('protect')) && prodCat.includes('moisturizer')) {
                    score = 10;
                } else if (stepLower.includes('protect') && (prodCat.includes('protection') || prodName.includes('spf'))) {
                    score = 10;
                } else if (stepLower.includes('treat') && (prodCat.includes('treatment') || prodCat.includes('serum'))) {
                    score = 8;
                } else if ((stepLower.includes('control') || stepLower.includes('oil')) && prodName.includes('niacinamide')) {
                    score = 8;
                } else if (stepLower.includes('calm') && (prodName.includes('soothing') || prodName.includes('aloe'))) {
                    score = 8;
                }
                
                if (score > matchScore) {
                    matchScore = score;
                    matchedProduct = prod;
                }
            });
            
            return matchedProduct;
        };
        
        return {
            morning: (baseRoutine.morning || []).map((step, idx) => ({
                ...step,
                step: step.step || '',
                product: step.product || '',
                matchedProduct: matchProductToStep(step.step || step?.name || '')
            })) || [],
            evening: (baseRoutine.evening || []).map((step, idx) => ({
                ...step,
                step: step.step || '',
                product: step.product || '',
                matchedProduct: matchProductToStep(step.step || step?.name || '')
            })) || []
        };
    };

    const routineWithProducts = getRoutineWithProducts();

    const openAffiliateModal = (product) => {
        setAffiliateModal({ isOpen: true, product });
    };

    const closeAffiliateModal = () => {
        setAffiliateModal({ isOpen: false, product: null });
    };

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    return (
        <>
            <div className="card profile-card" onClick={openModal}>
                <div className="profile-card-content">
                    <h3 style={{ color: '#fbc02d', margin: '0 0 15px 0' }}>👤 Your Profile</h3>
                    <div className="profile-stats">
                        <div className="stat-item">
                            <span className="stat-icon">🧬</span>
                            <span className="stat-label">Skin Type</span>
                            <span className="stat-value">{user.skinProfile?.skinType || 'Not set'}</span>
                        </div>
                        <div className="stat-item">
                            <span className="stat-icon">⚠️</span>
                            <span className="stat-label">Concerns</span>
                            <span className="stat-value">{user.skinProfile?.concerns?.length || 0}</span>
                        </div>
                        <div className="stat-item">
                            <span className="stat-icon">📊</span>
                            <span className="stat-label">Attempts</span>
                            <span className="stat-value">{analysisHistory.length}</span>
                        </div>
                        <div className="stat-item">
                            <span className="stat-icon">❤️</span>
                            <span className="stat-label">Liked</span>
                            <span className="stat-value">{likedProducts.length}</span>
                        </div>
                    </div>
                    <p style={{ margin: '15px 0 0 0', fontSize: '0.85rem', color: '#999', textAlign: 'center' }}>Click to view full profile</p>
                </div>
            </div>

            {isModalOpen && (
                <div className="modal-overlay" onClick={closeModal}>
                    <div className="modal-container profile-modal-container" onClick={e => e.stopPropagation()}>
                        <div className="modal-content animate-modal profile-modal-content">
                            <div className="modal-header profile-modal-header">
                                <h3>👤 Your Complete Profile</h3>
                                <button className="close-btn" onClick={closeModal}>×</button>
                            </div>

                            <div className="modal-body profile-modal-body">
                                {/* User Info Section */}
                                <div className="profile-section">
                                    <h4>👤 User Information</h4>
                                    <div className="info-grid">
                                        <div className="info-item">
                                            <label>Username</label>
                                            <span className="info-value">{user.username}</span>
                                        </div>
                                        <div className="info-item">
                                            <label>Email</label>
                                            <span className="info-value">{user.email}</span>
                                        </div>
                                        <div className="info-item">
                                            <label>Skin Type</label>
                                            <span className="info-value">{user.skinProfile?.skinType || 'Not set'}</span>
                                        </div>
                                        <div className="info-item">
                                            <label>Age Group</label>
                                            <span className="info-value">{user.ageGroup || 'Not set'}</span>
                                        </div>
                                    </div>
                                    <div className="info-item full">
                                        <label>Concerns</label>
                                        <div className="concerns-tags">
                                            {user.skinProfile?.concerns && user.skinProfile.concerns.length > 0 ? (
                                                user.skinProfile.concerns.map((concern, idx) => (
                                                    <span key={idx} className="concern-tag">{concern}</span>
                                                ))
                                            ) : (
                                                <span>No concerns recorded</span>
                                            )}
                                        </div>
                                    </div>

                                    {selectedProblems.length > 0 && (
                                        <div className="info-item full">
                                            <label>Stated Skin Concerns</label>
                                            <div className="concerns-tags">
                                                {selectedProblems.map((problem, idx) => (
                                                    <span key={idx} className="concern-tag">{problem.name}</span>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>

                                {/* Analysis History Section */}
                                <div className="profile-section">
                                    <h4>📊 Analysis History</h4>
                                    <div className="history-list">
                                        {analysisHistory.length > 0 ? (
                                            analysisHistory.map((attempt, idx) => (
                                                <div key={`${attempt.date}-${idx}`} className="history-item">
                                                    <div className="history-main">
                                                        <div className="history-date">{attempt.date}</div>
                                                        <div className="history-score">Health Score: {attempt.score}%</div>
                                                    </div>
                                                    <div className="history-details">
                                                        <div className="history-issue">{attempt.issues?.join(', ') || attempt.issue || 'No issues logged'}</div>
                                                        <div className="history-recommendation">
                                                            Recommended: {attempt.recommended?.join(', ') || attempt.recommendation || 'No recommendation available'}
                                                        </div>
                                                    </div>
                                                    <button
                                                        className="history-delete-btn"
                                                        onClick={() => removeHistoryItem(idx)}
                                                        title="Delete this attempt"
                                                    >
                                                        Delete Attempt
                                                    </button>
                                                </div>
                                            ))
                                        ) : (
                                            <p className="empty-history">No previous analysis yet. Try a skin checkup to build your history.</p>
                                        )}
                                    </div>
                                </div>

                                {/* Daily Routine Section */}
                                <div className="profile-section">
                                    <h4>🌅 Your Personalized Skincare Routine</h4>
                                    <p style={{ fontSize: '0.9rem', color: '#666', marginBottom: '15px' }}>
                                        Based on your {user.skinProfile?.skinType || 'Normal'} skin type and concerns, here's your expert-curated AM/PM routine:
                                    </p>
                                    {routineWithProducts?.morning?.length > 0 || routineWithProducts?.evening?.length > 0 ? (
                                        <div className="routine-grid">
                                            <div className="routine-time">
                                                <h5>☀️ Morning Routine</h5>
                                                <p style={{ fontSize: '0.85rem', color: '#888', marginBottom: '12px', fontStyle: 'italic' }}>
                                                    Start your day with these steps to protect and prep your skin
                                                </p>
                                                {routineWithProducts.morning.map((step, idx) => (
                                                    <div key={idx} className="routine-step-detailed">
                                                        <div className="step-header">
                                                            <span className="step-number">{idx + 1}</span>
                                                            <div className="step-info">
                                                                <div className="step-name">{step.step}</div>
                                                                <div className="step-product">{step.product}</div>
                                                            </div>
                                                        </div>
                                                        {step.matchedProduct && (
                                                            <div className="recommended-product-slot">
                                                                <div className="slot-label">💡 Shop Recommendation:</div>
                                                                <div className="slot-product">
                                                                    <span className="slot-product-name">{step.matchedProduct.name}</span>
                                                                    <p className="slot-product-explanation">
                                                                        {getProductExplanation(step.matchedProduct)}
                                                                    </p>
                                                                </div>
                                                                <button 
                                                                    className="slot-product-btn"
                                                                    onClick={() => openAffiliateModal(step.matchedProduct)}
                                                                >
                                                                    View Product
                                                                </button>
                                                            </div>
                                                        )}
                                                    </div>
                                                ))}
                                                {routineWithProducts.morning.length === 0 && <p className="routine-empty">No morning routine available yet.</p>}
                                            </div>
                                            <div className="routine-time">
                                                <h5>🌙 Evening Routine</h5>
                                                <p style={{ fontSize: '0.85rem', color: '#888', marginBottom: '12px', fontStyle: 'italic' }}>
                                                    Evening is when your skin repairs itself - use these steps to maximize recovery
                                                </p>
                                                {routineWithProducts.evening.map((step, idx) => (
                                                    <div key={idx} className="routine-step-detailed">
                                                        <div className="step-header">
                                                            <span className="step-number">{idx + 1}</span>
                                                            <div className="step-info">
                                                                <div className="step-name">{step.step}</div>
                                                                <div className="step-product">{step.product}</div>
                                                            </div>
                                                        </div>
                                                        {step.matchedProduct && (
                                                            <div className="recommended-product-slot">
                                                                <div className="slot-label">💡 Shop Recommendation:</div>
                                                                <div className="slot-product">
                                                                    <span className="slot-product-name">{step.matchedProduct.name}</span>
                                                                    <p className="slot-product-explanation">
                                                                        {getProductExplanation(step.matchedProduct)}
                                                                    </p>
                                                                </div>
                                                                <button 
                                                                    className="slot-product-btn"
                                                                    onClick={() => openAffiliateModal(step.matchedProduct)}
                                                                >
                                                                    View Product
                                                                </button>
                                                            </div>
                                                        )}
                                                    </div>
                                                ))}
                                                {routineWithProducts.evening.length === 0 && <p className="routine-empty">No evening routine available yet.</p>}
                                            </div>
                                        </div>
                                    ) : (
                                        <p className="routine-empty">Your analysis will generate a personalized AM/PM routine here once complete.</p>
                                    )}
                                </div>

                                {/* Liked Products Summary */}
                                <div className="profile-section liked-products-section">
                                    <h4>❤️ Liked Products</h4>
                                    {likedProducts.length > 0 ? (
                                        <div className="liked-products-list">
                                            {likedProducts.map(product => (
                                                <div key={product.id} className="liked-product-item">
                                                    <div className="liked-product-info">
                                                        <div className="liked-product-image">
                                                            {product.image || <span className="liked-product-emoji">{product.emoji || '🧴'}</span>}
                                                        </div>
                                                        <span className="liked-product-name">{product.name}</span>
                                                    </div>
                                                    <button
                                                        className="liked-product-buy-btn"
                                                        onClick={() => openAffiliateModal(product)}
                                                        title="Buy this product"
                                                    >
                                                        🛒 Buy
                                                    </button>
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <p className="empty-liked-text">Like a product to save it here.</p>
                                    )}
                                </div>

                                {/* Recommended Products Section */}
                                <div className="profile-section">
                                    <h4>💊 Expert Product Recommendations for Your Skin</h4>
                                    <p style={{ fontSize: '0.9rem', color: '#666', marginBottom: '15px' }}>
                                        Based on your {user.skinProfile?.skinType || 'Normal'} skin type and your specific concerns ({userConcerns.length > 0 ? userConcerns.slice(0, 3).join(', ') : 'general skincare'}), 
                                        these products are specially selected from our shop to address your skin's needs:
                                    </p>
                                    {recommendedProducts.length > 0 ? (
                                        <div className="products-grid-expert">
                                            {recommendedProducts.map(product => {
                                                const liked = wishlist.includes(product.id);
                                                return (
                                                    <div key={product.id} className={`product-card-expert ${liked ? 'liked' : ''}`}>
                                                        <div className="product-card-header">
                                                            <div className="product-card-image">
                                                                {product.image || <span className="product-emoji">{product.emoji || '🧴'}</span>}
                                                            </div>
                                                            <button
                                                                className={`product-like-btn ${liked ? 'liked' : ''}`}
                                                                onClick={(e) => {
                                                                    e.stopPropagation();
                                                                    toggleWishlist(product.id);
                                                                }}
                                                                title={liked ? 'Remove from liked' : 'Like product'}
                                                            >
                                                                {liked ? '❤️' : '🤍'}
                                                            </button>
                                                        </div>
                                                        <div className="product-header-info">
                                                            <div className="product-name">{product.name}</div>
                                                            <div className="product-category">{product.category}</div>
                                                        </div>
                                                        <div className="product-expert-explanation">
                                                            <p className="expert-reason">
                                                                <strong>Why we recommend it:</strong> {getProductExplanation(product)}
                                                            </p>
                                                        </div>
                                                        {product.description && <p className="product-desc">{product.description}</p>}
                                                        <div className="product-footer">
                                                            <div className="product-price">{product.price}</div>
                                                            <a
                                                                href={product.affiliateLink}
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                                className="product-buy-btn"
                                                                title="Buy now via affiliate link"
                                                            >
                                                                🛒 Shop Now
                                                            </a>
                                                        </div>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    ) : (
                                        <div className="empty-recommendations">
                                            <p>Complete your skin analysis to get personalized product recommendations from our expert-curated shop.</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {affiliateModal.isOpen && (
                <AffiliateModal
                    product={affiliateModal.product}
                    onClose={closeAffiliateModal}
                />
            )}

            <style>{`
                .profile-card {
                    cursor: pointer;
                    background: linear-gradient(135deg, #fff9c4 0%, #fffde7 100%);
                    border: 2px solid #fbc02d;
                    position: relative;
                    overflow: hidden;
                }

                .profile-card::before {
                    content: '';
                    position: absolute;
                    top: -2px;
                    left: -2px;
                    right: -2px;
                    bottom: -2px;
                    background: linear-gradient(135deg, #ffeb3b, #ffc107, #ff9800);
                    border-radius: 20px;
                    opacity: 0;
                    z-index: -1;
                    transition: opacity 0.3s;
                }

                .profile-card:hover {
                    transform: translateY(-8px) scale(1.05) rotateY(8deg);
                    box-shadow: 0 20px 40px rgba(251, 192, 45, 0.4), 0 0 30px rgba(255, 193, 7, 0.3);
                    border-color: #ff9800;
                }

                .profile-card-content {
                    padding: 0;
                }

                .profile-stats {
                    display: grid;
                    grid-template-columns: repeat(4, minmax(0, 1fr));
                    gap: 15px;
                    margin-top: 10px;
                }

                .stat-item {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    gap: 5px;
                    padding: 12px;
                    background: rgba(251, 192, 45, 0.1);
                    border-radius: 12px;
                    transition: all 0.3s;
                }

                .stat-item:hover {
                    background: rgba(251, 192, 45, 0.2);
                    transform: translateY(-3px);
                }

                .stat-icon {
                    font-size: 24px;
                }

                .stat-label {
                    font-size: 0.75rem;
                    color: #999;
                    font-weight: 600;
                    text-transform: uppercase;
                }

                .stat-value {
                    font-size: 1.3rem;
                    font-weight: bold;
                    color: #fbc02d;
                }

                /* Modal Styles */
                .modal-overlay {
                    position: fixed;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background: rgba(0, 0, 0, 0.75);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    z-index: 1000;
                    backdrop-filter: blur(4px);
                }

                .modal-container {
                    max-width: 700px;
                    width: 95%;
                    max-height: 85vh;
                    overflow-y: auto;
                    padding: 10px;
                }

                .profile-modal-container {
                    max-width: 700px;
                    width: 95%;
                    max-height: 85vh;
                    overflow-y: auto;
                }

                .profile-modal-content {
                    background: linear-gradient(135deg, #fff 0%, #fffef5 100%);
                    border: 3px solid #fbc02d;
                }

                .profile-modal-header {
                    background: linear-gradient(135deg, #fbc02d 0%, #ff9800 100%);
                    color: white;
                }

                .profile-modal-body {
                    padding: 25px;
                }

                .profile-section {
                    margin-bottom: 25px;
                    padding: 25px;
                    border-radius: 24px;
                    background: linear-gradient(135deg, #fffdf3 0%, #fff7de 100%);
                    border: 1px solid rgba(251, 192, 45, 0.25);
                    box-shadow: 0 18px 40px rgba(251, 192, 45, 0.08);
                }

                .profile-section:last-child {
                    margin-bottom: 0;
                }

                .profile-section h4 {
                    margin: 0 0 18px 0;
                    color: #fbc02d;
                    font-size: 1.15rem;
                    display: flex;
                    align-items: center;
                    gap: 10px;
                }

                .info-grid {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 15px;
                    margin-bottom: 15px;
                }

                .info-item {
                    background: linear-gradient(135deg, #fffde7 0%, #fff9c4 100%);
                    padding: 12px;
                    border-radius: 10px;
                    border-left: 4px solid #fbc02d;
                }

                .info-item.full {
                    grid-column: span 2;
                }

                .info-item label {
                    display: block;
                    font-size: 0.8rem;
                    color: #999;
                    font-weight: 600;
                    text-transform: uppercase;
                    margin-bottom: 5px;
                }

                .info-value {
                    display: block;
                    font-size: 1rem;
                    color: #444;
                    font-weight: 500;
                }

                .concerns-tags {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 8px;
                }

                .concern-tag {
                    background: linear-gradient(135deg, #fbc02d 0%, #ff9800 100%);
                    color: white;
                    padding: 5px 12px;
                    border-radius: 15px;
                    font-size: 0.8rem;
                    font-weight: 500;
                }

                /* History Section */
                .history-list {
                    display: flex;
                    flex-direction: column;
                    gap: 12px;
                }

                .history-item {
                    background: linear-gradient(135deg, #fffdf2 0%, #fff1c2 100%);
                    padding: 18px 18px 18px;
                    border-radius: 18px;
                    border-left: 5px solid #fbc02d;
                    display: grid;
                    gap: 12px;
                    align-items: start;
                    box-shadow: 0 16px 36px rgba(0,0,0,0.08);
                    position: relative;
                    overflow: visible;
                }

                .history-main {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 10px;
                    justify-content: space-between;
                    align-items: center;
                }

                .history-date {
                    font-size: 0.8rem;
                    color: #555;
                    font-weight: 600;
                }

                .history-score {
                    font-size: 0.85rem;
                    color: #d84315;
                    font-weight: 700;
                }

                .history-delete-btn {
                    position: absolute;
                    top: 16px;
                    right: 16px;
                    border: none;
                    background: #ef5350;
                    color: white;
                    border-radius: 14px;
                    padding: 8px 14px;
                    cursor: pointer;
                    font-weight: 700;
                    transition: transform 0.2s ease, background 0.2s ease;
                }

                .history-delete-btn:hover {
                    background: #d32f2f;
                    transform: translateY(-1px);
                }

                .history-details {
                    display: flex;
                    flex-direction: column;
                    gap: 3px;
                }

                .history-issue {
                    font-weight: 600;
                    color: #444;
                }

                .history-recommendation {
                    font-size: 0.85rem;
                    color: #666;
                    background: rgba(251, 192, 45, 0.1);
                    padding: 10px 12px;
                    border-radius: 12px;
                    white-space: normal;
                }

                /* Routine Section */
                .routine-grid {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 20px;
                }

                .routine-time {
                    background: linear-gradient(135deg, #fffde7 0%, #fff9c4 100%);
                    padding: 15px;
                    border-radius: 12px;
                    border: 2px solid #fbc02d;
                }

                .routine-time h5 {
                    margin: 0 0 12px 0;
                    color: #fbc02d;
                    font-size: 0.95rem;
                }

                .routine-step {
                    display: grid;
                    grid-template-columns: auto 1fr;
                    gap: 10px;
                    margin-bottom: 10px;
                    padding: 10px;
                    background: white;
                    border-radius: 8px;
                    align-items: start;
                }

                .routine-step:last-child {
                    margin-bottom: 0;
                }

                .routine-empty {
                    margin: 0;
                    color: #777;
                    font-size: 0.9rem;
                    line-height: 1.5;
                }

                .step-number {
                    background: #fbc02d;
                    color: white;
                    width: 24px;
                    height: 24px;
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-weight: bold;
                    font-size: 0.8rem;
                    flex-shrink: 0;
                }

                .step-info {
                    display: flex;
                    flex-direction: column;
                    gap: 2px;
                }

                .step-name {
                    font-weight: 600;
                    color: #444;
                    font-size: 0.9rem;
                }

                .step-product {
                    font-size: 0.8rem;
                    color: #999;
                    font-style: italic;
                }

                /* Products Section */
                .products-grid {
                    display: grid;
                    grid-template-columns: repeat(2, 1fr);
                    gap: 12px;
                }

                .product-card-mini {
                    background: linear-gradient(135deg, #fffde7 0%, #fff9c4 100%);
                    padding: 12px;
                    border-radius: 10px;
                    border: 2px solid #fbc02d;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    gap: 8px;
                    text-align: center;
                    transition: all 0.3s;
                    cursor: pointer;
                    position: relative;
                }

                .product-card-mini.liked {
                    border-color: #ff6b9d;
                    background: linear-gradient(135deg, #fff0f2 0%, #ffe4e8 100%);
                }

                .product-card-mini:hover {
                    transform: translateY(-5px);
                    box-shadow: 0 10px 20px rgba(251, 192, 45, 0.2);
                }

                .product-like-btn {
                    position: absolute;
                    top: 10px;
                    right: 10px;
                    border: none;
                    background: rgba(255, 255, 255, 0.8);
                    color: #ff6b9d;
                    width: 32px;
                    height: 32px;
                    border-radius: 50%;
                    font-size: 1rem;
                    cursor: pointer;
                    transition: all 0.2s;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }

                .product-like-btn:hover {
                    transform: scale(1.1);
                    background: white;
                }

                .product-like-btn.liked {
                    color: #d81b60;
                }

                .product-emoji {
                    font-size: 28px;
                }

                .product-name {
                    font-weight: 600;
                    color: #444;
                    font-size: 0.9rem;
                    line-height: 1.2;
                }

                .product-category {
                    font-size: 0.7rem;
                    color: #999;
                    text-transform: uppercase;
                    font-weight: 600;
                }

                .product-buy-btn {
                    background: linear-gradient(135deg, #ff6b9d, #c44569);
                    color: white;
                    border: none;
                    padding: 6px 12px;
                    border-radius: 15px;
                    font-size: 0.75rem;
                    font-weight: bold;
                    cursor: pointer;
                    transition: all 0.3s;
                    margin-top: 5px;
                }

                .product-buy-btn:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 4px 12px rgba(255, 107, 157, 0.3);
                }

                .liked-products-section {
                    padding-top: 5px;
                }

                .liked-products-list {
                    display: flex;
                    flex-direction: column;
                    gap: 12px;
                    margin-top: 10px;
                }

                .liked-product-item {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    padding: 12px 16px;
                    background: linear-gradient(135deg, #ffe3e9 0%, #ffd1d9 100%);
                    border-radius: 12px;
                    border: 2px solid #ffb3c2;
                    transition: all 0.3s;
                }

                .liked-product-item:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 4px 12px rgba(255, 107, 157, 0.2);
                }

                .liked-product-info {
                    display: flex;
                    align-items: center;
                    gap: 12px;
                }

                .liked-product-emoji {
                    font-size: 24px;
                }

                .liked-product-name {
                    font-weight: 600;
                    color: #b71c1c;
                }

                .liked-product-buy-btn {
                    background: linear-gradient(135deg, #ff6b9d, #c44569);
                    color: white;
                    border: none;
                    padding: 8px 16px;
                    border-radius: 20px;
                    font-size: 0.8rem;
                    font-weight: bold;
                    cursor: pointer;
                    transition: all 0.3s;
                }

                .liked-product-buy-btn:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 4px 15px rgba(255, 107, 157, 0.4);
                }

                .empty-liked-text {
                    color: #777;
                    font-size: 0.9rem;
                    margin-top: 10px;
                }

                /* Enhanced Product Card Profile */
                .product-card-profile {
                    background: linear-gradient(135deg, #fffde7 0%, #fff9c4 100%);
                    border: 2px solid #fbc02d;
                    border-radius: 15px;
                    padding: 15px;
                    display: flex;
                    flex-direction: column;
                    gap: 10px;
                    transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
                    position: relative;
                    overflow: hidden;
                }

                .product-card-image {
                    width: 80px;
                    height: 80px;
                    border-radius: 16px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    overflow: hidden;
                    background: #fff;
                    border: 1px solid rgba(251, 192, 45, 0.25);
                }

                .product-card-image img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    display: block;
                }

                .product-card-profile:hover {
                    transform: translateY(-8px) scale(1.02);
                    box-shadow: 0 15px 40px rgba(251, 192, 45, 0.3);
                    border-color: #ff9800;
                }

                .product-card-profile.liked {
                    border-color: #ff6b9d;
                    background: linear-gradient(135deg, #fff0f2 0%, #ffe4e8 100%);
                }

                .product-card-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    gap: 10px;
                }

                .product-emoji {
                    font-size: 32px;
                    display: block;
                }

                .product-like-btn {
                    border: none;
                    background: transparent;
                    font-size: 1.3rem;
                    cursor: pointer;
                    transition: all 0.2s;
                    filter: drop-shadow(0 2px 4px rgba(0,0,0,0.1));
                }

                .product-like-btn:hover {
                    transform: scale(1.2);
                }

                .product-name {
                    font-weight: 700;
                    color: #333;
                    font-size: 0.95rem;
                    line-height: 1.3;
                }

                .product-category {
                    font-size: 0.75rem;
                    color: #999;
                    text-transform: uppercase;
                    font-weight: 600;
                    letter-spacing: 0.5px;
                }

                .product-desc {
                    font-size: 0.8rem;
                    color: #666;
                    margin: 5px 0;
                    line-height: 1.3;
                }

                .product-price {
                    font-weight: 700;
                    color: #ff9800;
                    font-size: 0.95rem;
                }

                .product-buy-btn {
                    background: linear-gradient(135deg, #fbc02d 0%, #ff9800 100%);
                    color: white;
                    border: none;
                    padding: 10px 16px;
                    border-radius: 20px;
                    font-size: 0.85rem;
                    font-weight: 700;
                    cursor: pointer;
                    transition: all 0.3s;
                    text-decoration: none;
                    display: inline-block;
                    text-align: center;
                    box-shadow: 0 4px 15px rgba(251, 192, 45, 0.2);
                }

                .product-buy-btn:hover {
                    transform: translateY(-3px);
                    box-shadow: 0 6px 20px rgba(251, 192, 45, 0.4);
                    background: linear-gradient(135deg, #ff9800 0%, #ff7043 100%);
                }

                .product-buy-btn:active {
                    transform: translateY(-1px);
                }

                .empty-recommendations {
                    text-align: center;
                    color: #999;
                    padding: 30px 20px;
                    background: rgba(251, 192, 45, 0.05);
                    border: 2px dashed #fbc02d;
                    border-radius: 12px;
                    font-size: 0.95rem;
                    line-height: 1.5;
                }

                .empty-history {
                    text-align: center;
                    color: #999;
                    padding: 20px;
                    font-style: italic;
                }

                .routine-empty {
                    text-align: center;
                    color: #999;
                    font-style: italic;
                    padding: 10px;
                }

                @media (max-width: 768px) {
                    .profile-stats {
                        grid-template-columns: 1fr;
                    }

                    .routine-grid {
                        grid-template-columns: 1fr;
                    }

                    .info-grid {
                        grid-template-columns: 1fr;
                    }

                    .info-item.full {
                        grid-column: span 1;
                    }

                    .products-grid {
                        grid-template-columns: 1fr;
                    }

                    .history-item {
                        grid-template-columns: 1fr;
                        gap: 8px;
                    }
                }

                /* Expert Skincare Features */
                .routine-step-detailed {
                    background: #f9f9f9;
                    border-left: 4px solid #fbc02d;
                    padding: 12px;
                    margin-bottom: 12px;
                    border-radius: 6px;
                }

                .step-header {
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    margin-bottom: 8px;
                }

                .recommended-product-slot {
                    background: linear-gradient(135deg, #fff9e6 0%, #fffdf0 100%);
                    border: 1px solid #fbe9b0;
                    border-radius: 8px;
                    padding: 10px;
                    margin-top: 8px;
                }

                .slot-label {
                    font-size: 0.75rem;
                    color: #f57f17;
                    font-weight: 600;
                    text-transform: uppercase;
                    margin-bottom: 4px;
                }

                .slot-product {
                    margin-bottom: 8px;
                }

                .slot-product-name {
                    display: block;
                    font-weight: 600;
                    color: #333;
                    font-size: 0.9rem;
                    margin-bottom: 4px;
                }

                .slot-product-explanation {
                    font-size: 0.85rem;
                    color: #666;
                    font-style: italic;
                    margin: 0;
                    line-height: 1.4;
                }

                .slot-product-btn {
                    background: linear-gradient(135deg, #fbc02d 0%, #f57f17 100%);
                    color: white;
                    border: none;
                    padding: 6px 12px;
                    border-radius: 4px;
                    font-size: 0.8rem;
                    cursor: pointer;
                    font-weight: 600;
                    transition: all 0.3s;
                }

                .slot-product-btn:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 4px 12px rgba(251, 192, 45, 0.3);
                }

                .products-grid-expert {
                    display: grid;
                    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
                    gap: 20px;
                    margin-top: 15px;
                }

                .product-card-expert {
                    background: white;
                    border: 1px solid #e0e0e0;
                    border-radius: 12px;
                    padding: 15px;
                    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                    position: relative;
                    overflow: hidden;
                }

                .product-card-expert::before {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    height: 3px;
                    background: linear-gradient(90deg, #fbc02d, #f57f17);
                    transform: scaleX(0);
                    transform-origin: left;
                    transition: transform 0.3s;
                }

                .product-card-expert:hover {
                    border-color: #fbc02d;
                    box-shadow: 0 8px 24px rgba(251, 192, 45, 0.15);
                    transform: translateY(-4px);
                }

                .product-card-expert:hover::before {
                    transform: scaleX(1);
                }

                .product-card-expert.liked {
                    background: linear-gradient(135deg, #fff9e6 0%, #fffdf0 100%);
                    border-color: #fbc02d;
                }

                .product-header-info {
                    margin: 10px 0;
                }

                .product-expert-explanation {
                    background: #f9f9f9;
                    border-left: 3px solid #fbc02d;
                    padding: 10px;
                    border-radius: 4px;
                    margin: 10px 0;
                }

                .expert-reason {
                    font-size: 0.85rem;
                    color: #555;
                    margin: 0;
                    line-height: 1.5;
                }

                .expert-reason strong {
                    color: #f57f17;
                }

                .product-footer {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-top: 12px;
                    padding-top: 12px;
                    border-top: 1px solid #f0f0f0;
                }

                .empty-recommendations {
                    background: linear-gradient(135deg, #fff9e6 0%, #fffdf0 100%);
                    border: 2px dashed #fbc02d;
                    border-radius: 12px;
                    padding: 30px;
                    text-align: center;
                    color: #666;
                }

                .empty-recommendations p {
                    margin: 0;
                    font-size: 0.95rem;
                }

                @media (max-width: 768px) {
                    .products-grid-expert {
                        grid-template-columns: 1fr;
                    }

                    .routine-grid {
                        grid-template-columns: 1fr;
                    }
                }
            `}</style>
        </>
    );
}

export default UserProfile;
