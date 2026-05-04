import React from 'react';

const AffiliateModal = ({ product, onClose }) => {
    return (
        <div className="professional-overlay" onClick={onClose}>
            <div className="modal-container-pro" onClick={e => e.stopPropagation()}>
                <div className="professional-modal-content affiliate-modal-pro">
                    <div className="modal-header-pro">
                        <div className="header-titles-pro">
                            <h3>🛒 Purchase {product.name}</h3>
                            <p>Choose your preferred platform</p>
                        </div>
                        <button className="close-btn-pro" onClick={onClose}>&times;</button>
                    </div>

                    <div className="modal-scroll-area-pro">
                        <div className="affiliate-showcase-pro">
                            <div className="showcase-icon-pro">{product.image || product.emoji || '🧴'}</div>
                            <div className="showcase-info-pro">
                                <h4>{product.name}</h4>
                                <span className="showcase-cat-pro">{product.category}</span>
                                <p>{product.description}</p>
                            </div>
                        </div>

                        <div className="affiliate-links-pro">
                            <div className="platform-card-pro">
                                <div className="platform-header-pro">
                                    <span className="platform-icon-pro">🛍️</span>
                                    <strong>Amazon Marketplace</strong>
                                </div>
                                <div className="platform-action-pro">
                                    <input type="text" value="https://amazon.com/dp/B0..." readOnly />
                                    <button className="copy-btn-pro" onClick={() => navigator.clipboard.writeText('https://amazon.com/dp/B0...')}>Copy</button>
                                </div>
                            </div>

                            <div className="platform-card-pro">
                                <div className="platform-header-pro">
                                    <span className="platform-icon-pro">💄</span>
                                    <strong>Nayaka Beauty</strong>
                                </div>
                                <div className="platform-action-pro">
                                    <input type="text" value="https://nayaka.com/prod/..." readOnly />
                                    <button className="copy-btn-pro" onClick={() => navigator.clipboard.writeText('https://nayaka.com/prod/...')}>Copy</button>
                                </div>
                            </div>
                        </div>

                        <div className="benefits-card-pro">
                            <h5>✨ Verified Purchase Benefits</h5>
                            <ul className="pro-list-small">
                                <li>Official brand guarantee</li>
                                <li>Direct support for Skin Log AI</li>
                                <li>Tracked routine integration</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            <style>{`
                .affiliate-modal-pro { max-width: 550px; }
                .affiliate-showcase-pro { 
                    display: flex; gap: 25px; padding: 25px; background: #fff9c4; 
                    border-radius: 24px; margin-bottom: 30px; align-items: center;
                }
                .showcase-icon-pro { font-size: 4rem; transition: 0.5s; }
                .affiliate-showcase-pro:hover .showcase-icon-pro { transform: scale(1.2) rotate(5deg); }
                .showcase-info-pro h4 { margin: 0; font-size: 1.2rem; }
                .showcase-cat-pro { background: #fbc02d; color: white; padding: 4px 12px; border-radius: 20px; font-size: 0.75rem; font-weight: 800; }
                .showcase-info-pro p { margin: 10px 0 0 0; font-size: 0.85rem; color: #555; line-height: 1.5; }

                .affiliate-links-pro { display: flex; flex-direction: column; gap: 15px; margin-bottom: 30px; }
                .platform-card-pro { 
                    background: #fff; border: 1px solid #f0f0f0; padding: 20px; border-radius: 20px;
                    transition: 0.3s;
                }
                .platform-card-pro:hover { border-color: #fbc02d; transform: translateY(-3px); }
                .platform-header-pro { display: flex; align-items: center; gap: 12px; margin-bottom: 15px; }
                .platform-icon-pro { font-size: 1.5rem; }
                
                .platform-action-pro { display: flex; gap: 10px; }
                .platform-action-pro input { flex: 1; padding: 10px 15px; border: 2px solid #eee; border-radius: 12px; font-family: monospace; font-size: 0.8rem; background: #fafafa; color: #888; }
                .copy-btn-pro { background: #333; color: white; border: none; padding: 0 20px; border-radius: 12px; font-weight: 700; cursor: pointer; transition: 0.2s; }
                .copy-btn-pro:hover { background: #000; }

                .benefits-card-pro { background: #e8f5e9; padding: 20px; border-radius: 20px; border: 1px solid #c8e6c9; }
                .benefits-card-pro h5 { margin: 0 0 12px 0; color: #2e7d32; }
                .pro-list-small { list-style: none; padding: 0; margin: 0; }
                .pro-list-small li { font-size: 0.85rem; color: #444; margin-bottom: 8px; display: flex; align-items: center; gap: 8px; }
                .pro-list-small li::before { content: '✓'; color: #2e7d32; font-weight: 900; }
            `}</style>
        </div>
    );
};

export default AffiliateModal;