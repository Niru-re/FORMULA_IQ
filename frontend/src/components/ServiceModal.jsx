import React from 'react';

const ServiceModal = ({ service, onClose, onTryService }) => {
    if (!service) return null;

    const getServiceDetails = (serviceId) => {
        const details = {
            'analysis': {
                title: 'Skin Analysis Service',
                icon: '🔬',
                description: 'Advanced AI-powered skin analysis to detect concerns and provide personalized recommendations.',
                features: [
                    'AI-powered face detection and analysis',
                    'Seasonal skin concern identification',
                    'Personalized health score calculation',
                    'Detailed issue breakdown and recommendations',
                    'Progress tracking over time'
                ],
                benefits: [
                    'Understand your skin type and concerns',
                    'Get data-driven product recommendations',
                    'Track improvements with regular analysis',
                    'Learn about seasonal skin changes'
                ],
                howItWorks: [
                    'Upload a clear photo of your face',
                    'Our AI analyzes skin texture, tone, and concerns',
                    'Receive instant personalized results',
                    'Save analysis history for progress tracking'
                ]
            },
            'recommendations': {
                title: 'Product Recommendations',
                icon: '💊',
                description: 'Smart product suggestions based on your skin analysis and personal preferences.',
                features: [
                    'AI-matched product recommendations',
                    'Category-based filtering (cleanser, moisturizer, treatment)',
                    'Price range and brand preferences',
                    'Ingredient compatibility checking',
                    'Seasonal product suggestions'
                ],
                benefits: [
                    'Discover products that work for your skin',
                    'Avoid trial-and-error with purchases',
                    'Learn about new skincare innovations',
                    'Build confidence in your routine'
                ],
                howItWorks: [
                    'Complete skin analysis first',
                    'Answer preference questions',
                    'Browse personalized recommendations',
                    'Save favorites to your wishlist'
                ]
            },
            'problem-selector': {
                title: 'Problem Selector Tool',
                icon: '🔍',
                description: 'Interactive tool to identify and prioritize your specific skin concerns.',
                features: [
                    'Multi-select concern options',
                    'Severity level assessment',
                    'Concern prioritization system',
                    'Visual concern mapping',
                    'Progress tracking for each issue'
                ],
                benefits: [
                    'Clearly identify what to focus on',
                    'Understand concern relationships',
                    'Track improvement over time',
                    'Make informed treatment decisions'
                ],
                howItWorks: [
                    'Select all relevant skin concerns',
                    'Rate severity of each concern',
                    'View prioritized concern list',
                    'Get targeted recommendations'
                ]
            },
            'routine-builder': {
                title: 'Routine Tracking',
                icon: '📅',
                description: 'Build and maintain consistent skincare routines with progress tracking.',
                features: [
                    'Morning and evening routine builder',
                    'Step-by-step guidance',
                    'Routine adherence tracking',
                    'Product usage reminders',
                    'Progress visualization'
                ],
                benefits: [
                    'Establish consistent skincare habits',
                    'Learn proper product application order',
                    'Track routine effectiveness',
                    'Stay motivated with progress data'
                ],
                howItWorks: [
                    'Build your ideal routine',
                    'Set daily reminders',
                    'Log routine completion',
                    'View adherence statistics'
                ]
            },
            'wishlist': {
                title: 'Wishlist & Favorites',
                icon: '❤️',
                description: 'Save and organize your favorite products for easy access and purchasing.',
                features: [
                    'Save products from recommendations',
                    'Organize by categories',
                    'Quick access from navbar',
                    'Purchase tracking',
                    'Price and availability monitoring'
                ],
                benefits: [
                    'Never forget products you like',
                    'Compare options easily',
                    'Track price changes',
                    'Streamlined purchasing process'
                ],
                howItWorks: [
                    'Like products during browsing',
                    'Access wishlist from navbar',
                    'View all saved items',
                    'Purchase directly from wishlist'
                ]
            },
            'seasonal': {
                title: 'Seasonal Care Guide',
                icon: '☁️',
                description: 'Weather-aware skincare advice to protect and optimize your skin year-round.',
                features: [
                    'Real-time weather integration',
                    'Seasonal skin change predictions',
                    'Weather-based product recommendations',
                    'Environmental factor alerts',
                    'Year-round care calendar'
                ],
                benefits: [
                    'Prepare for seasonal skin changes',
                    'Optimize routines for weather conditions',
                    'Prevent seasonal skin issues',
                    'Maintain consistent skin health'
                ],
                howItWorks: [
                    'App detects your location and weather',
                    'Receives seasonal care recommendations',
                    'Adjusts routine based on conditions',
                    'Gets alerts for weather changes'
                ]
            }
        };
        return details[serviceId] || details['analysis'];
    };

    const details = getServiceDetails(service.id);

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-container service-modal-container" onClick={e => e.stopPropagation()}>
                <div className="modal-content animate-modal service-modal-content">
                    <div className="modal-header service-modal-header">
                        <div className="service-header-content">
                            <div className="service-icon-large">{details.icon}</div>
                            <div className="service-title-section">
                                <h3>{details.title}</h3>
                                <p className="service-subtitle">{details.description}</p>
                            </div>
                        </div>
                        <button className="close-btn" onClick={onClose}>×</button>
                    </div>

                    <div className="modal-body service-modal-body">
                        <div className="service-details-grid">
                            <div className="service-section">
                                <h4>✨ Key Features</h4>
                                <ul className="feature-list">
                                    {details.features.map((feature, idx) => (
                                        <li key={idx}>{feature}</li>
                                    ))}
                                </ul>
                            </div>

                            <div className="service-section">
                                <h4>🎯 Benefits</h4>
                                <ul className="benefit-list">
                                    {details.benefits.map((benefit, idx) => (
                                        <li key={idx}>{benefit}</li>
                                    ))}
                                </ul>
                            </div>

                            <div className="service-section full-width">
                                <h4>🚀 How It Works</h4>
                                <div className="how-it-works-steps">
                                    {details.howItWorks.map((step, idx) => (
                                        <div key={idx} className="step-item">
                                            <div className="step-number">{idx + 1}</div>
                                            <div className="step-content">{step}</div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="service-cta">
                            <button className="try-service-btn" onClick={() => onTryService(service.id)}>
                                Try This Service
                            </button>
                            <p className="service-note">This service is included with your Skin Log account</p>
                        </div>
                    </div>
                </div>
            </div>

            <style>{`
                .service-modal-container {
                    max-width: 700px;
                    width: 90vw;
                    max-height: 90vh;
                    overflow-y: auto;
                }

                .service-modal-header {
                    background: linear-gradient(135deg, #fbc02d, #ff9800);
                    color: white;
                    padding: 25px;
                    border-radius: 15px 15px 0 0;
                    position: relative;
                }

                .service-header-content {
                    display: flex;
                    align-items: center;
                    gap: 20px;
                }

                .service-icon-large {
                    font-size: 3rem;
                    animation: bounce 2s infinite;
                }

                @keyframes bounce {
                    0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
                    40% { transform: translateY(-5px); }
                    60% { transform: translateY(-2px); }
                }

                .service-title-section h3 {
                    margin: 0 0 8px 0;
                    font-size: 1.5rem;
                    font-weight: bold;
                }

                .service-subtitle {
                    margin: 0;
                    opacity: 0.9;
                    font-size: 0.95rem;
                    line-height: 1.4;
                }

                .service-modal-body {
                    padding: 30px;
                }

                .service-details-grid {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 25px;
                    margin-bottom: 30px;
                }

                .service-section {
                    background: #f8f9fa;
                    padding: 20px;
                    border-radius: 12px;
                    border: 2px solid #e9ecef;
                }

                .service-section.full-width {
                    grid-column: span 2;
                }

                .service-section h4 {
                    margin: 0 0 15px 0;
                    color: #495057;
                    font-size: 1.1rem;
                    display: flex;
                    align-items: center;
                    gap: 8px;
                }

                .feature-list, .benefit-list {
                    list-style: none;
                    padding: 0;
                    margin: 0;
                }

                .feature-list li, .benefit-list li {
                    padding: 8px 0;
                    position: relative;
                    padding-left: 20px;
                    color: #495057;
                }

                .feature-list li:before, .benefit-list li:before {
                    content: '✓';
                    position: absolute;
                    left: 0;
                    color: #28a745;
                    font-weight: bold;
                }

                .how-it-works-steps {
                    display: flex;
                    flex-direction: column;
                    gap: 15px;
                }

                .step-item {
                    display: flex;
                    align-items: flex-start;
                    gap: 15px;
                    background: white;
                    padding: 15px;
                    border-radius: 8px;
                    border-left: 4px solid #fbc02d;
                }

                .step-number {
                    background: #fbc02d;
                    color: white;
                    width: 30px;
                    height: 30px;
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-weight: bold;
                    flex-shrink: 0;
                }

                .step-content {
                    color: #495057;
                    line-height: 1.5;
                    margin: 0;
                }

                .service-cta {
                    text-align: center;
                    padding-top: 25px;
                    border-top: 2px solid #e9ecef;
                }

                .try-service-btn {
                    background: linear-gradient(135deg, #fbc02d, #ff9800);
                    color: white;
                    border: none;
                    padding: 15px 40px;
                    border-radius: 25px;
                    font-size: 1.1rem;
                    font-weight: bold;
                    cursor: pointer;
                    transition: all 0.3s;
                    box-shadow: 0 4px 15px rgba(251, 192, 45, 0.3);
                }

                .try-service-btn:hover {
                    transform: translateY(-3px);
                    box-shadow: 0 8px 25px rgba(251, 192, 45, 0.4);
                }

                .service-note {
                    margin: 15px 0 0 0;
                    color: #6c757d;
                    font-size: 0.9rem;
                    font-style: italic;
                }

                .close-btn {
                    position: absolute;
                    top: 20px;
                    right: 20px;
                    background: rgba(255, 255, 255, 0.2);
                    border: none;
                    color: white;
                    font-size: 24px;
                    cursor: pointer;
                    border-radius: 50%;
                    width: 40px;
                    height: 40px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    transition: all 0.3s;
                }

                .close-btn:hover {
                    background: rgba(255, 255, 255, 0.3);
                    transform: scale(1.1);
                }

                @media (max-width: 768px) {
                    .service-details-grid {
                        grid-template-columns: 1fr;
                    }

                    .service-section.full-width {
                        grid-column: span 1;
                    }

                    .service-header-content {
                        flex-direction: column;
                        text-align: center;
                        gap: 15px;
                    }

                    .service-icon-large {
                        font-size: 2.5rem;
                    }
                }
            `}</style>
        </div>
    );
};

export default ServiceModal;