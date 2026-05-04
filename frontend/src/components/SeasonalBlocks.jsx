import React, { useState, useEffect } from 'react';

const seasonalData = {
    Winter: {
        color: '#8ec5fc',
        gradient: 'linear-gradient(135deg, #e0c3fc 0%, #8ec5fc 100%)',
        icon: '❄️',
        commonProblems: ['Dryness', 'Flaky Skin', 'Redness', 'Dehydration'],
        tips: ['Moisturize heavily with ceramide creams', 'Use cream-based cleansers', 'Don\'t skip SPF even if it\'s cloudy'],
        solution: 'Focus on barrier repair and deep hydration.',
        routine: 'AM: Gentle Cleanse -> Hyaluronic Acid -> Rich Moisturizer -> SPF. PM: Oil Cleanse -> Cream Cleanse -> Night Mask.',
        products: [
            { name: 'Ceramide Cream', type: 'Moisturizer', price: '$22' },
            { name: 'Lipid Balm', type: 'Body Care', price: '$18' },
            { name: 'Gentle Milk Cleanser', type: 'Cleanser', price: '$15' }
        ]
    },
    Summer: {
        color: '#fbc2eb',
        gradient: 'linear-gradient(135deg, #f6d365 0%, #fda085 100%)',
        icon: '☀️',
        commonProblems: ['Excess Oil', 'Sunburn', 'Clogged Pores', 'Hyper-pigmentation'],
        tips: ['Stay hydrated with water-based products', 'Use lightweight gels', 'Reapply SPF every 2 hours outdoors'],
        solution: 'Focus on oil control and high UV protection.',
        routine: 'AM: Foaming Wash -> Vitamin C -> Gel Moisturizer -> SPF 50+. PM: Double Cleanse -> BHA Exfoliant -> Light Lotion.',
        products: [
            { name: 'Mattifying SPF', type: 'Protection', price: '$25' },
            { name: 'Salicylic Acid Gel', type: 'Treatment', price: '$19' },
            { name: 'Cooling Mist', type: 'Body Care', price: '$12' }
        ]
    },
    Monsoon: {
        color: '#84fab0',
        gradient: 'linear-gradient(135deg, #84fab0 0%, #8fd3f4 100%)',
        icon: '🌧️',
        commonProblems: ['Humidity Breakouts', 'Fungal Infections', 'Dullness', 'Sticky Texture'],
        tips: ['Deep cleanse twice daily', 'Use water-resistant SPF', 'Exfoliate weekly to remove dead skin'],
        solution: 'Focus on anti-bacterial care and exfoliation.',
        routine: 'AM: Tea Tree Wash -> Niacinamide -> Light Moisturizer -> Waterproof SPF. PM: Deep Cleanse -> Clay Mask -> Soothing Gel.',
        products: [
            { name: 'Clay Mask', type: 'Treatment', price: '$16' },
            { name: 'Anti-Bacterial Wash', type: 'Cleanser', price: '$14' },
            { name: 'pH Balanced Toner', type: 'Toner', price: '$13' }
        ]
    },
    Spring: {
        color: '#fa709a',
        gradient: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
        icon: '🌸',
        commonProblems: ['Seasonal Allergies', 'Sensitivity', 'Uneven Texture', 'Pollen Irritation'],
        tips: ['Gentle exfoliation to renew skin', 'Switch to lighter creams', 'Use antioxidant serums to fight pollen damage'],
        solution: 'Focus on soothing and renewal.',
        routine: 'AM: Soothing Wash -> Antioxidant Serum -> Light Cream -> SPF. PM: Gentle Cleanse -> Peptides -> Calming Mask.',
        products: [
            { name: 'Soothing Mist', type: 'Body Care', price: '$14' },
            { name: 'Antioxidant Serum', type: 'Treatment', price: '$28' },
            { name: 'Barrier Repair Gel', type: 'Moisturizer', price: '$21' }
        ]
    }
};

const ProcessingStep = ({ season, solution, onComplete }) => {
    const [progress, setProgress] = useState(0);
    const [status, setStatus] = useState('Initializing...');

    useEffect(() => {
        const stages = [
            { p: 30, s: 'Analyzing climate data...' },
            { p: 60, s: 'Mapping skin response...' },
            { p: 90, s: 'Matching products...' },
            { p: 100, s: 'Ready!' }
        ];

        let currentStage = 0;
        const interval = setInterval(() => {
            if (currentStage < stages.length) {
                setProgress(stages[currentStage].p);
                setStatus(stages[currentStage].s);
                currentStage++;
            } else {
                clearInterval(interval);
            }
        }, 600);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="step-content">
            <h2>⚙️ Processing Solution</h2>
            <div className="progress-bar-container">
                <div className="progress-bar-track">
                    <div className="progress-bar-fill" style={{ width: `${progress}%` }}></div>
                </div>
                <p className="status-text">{status}</p>
            </div>

            {progress === 100 && (
                <div className="reveal-box animate-pop">
                    <h3>Analysis Complete!</h3>
                    <div className="strategy-card">
                        <strong>Seasonal Strategy:</strong>
                        <p>{solution}</p>
                    </div>
                    <button className="btn-primary" onClick={onComplete}>Show Results →</button>
                </div>
            )}

            <style>{`
                .progress-bar-container { margin: 30px 0; }
                .progress-bar-track { height: 10px; background: #eee; border-radius: 10px; overflow: hidden; margin-bottom: 10px; }
                .progress-bar-fill { height: 100%; background: #fbc02d; transition: width 0.4s ease; }
                .status-text { font-weight: bold; color: #fbc02d; font-size: 0.9rem; }
                
                .reveal-box { margin-top: 20px; }
                .strategy-card { background: #fffdf5; padding: 20px; border-radius: 15px; border: 1px solid #fbc02d; margin-bottom: 20px; text-align: left; }
                .strategy-card strong { color: #fbc02d; display: block; margin-bottom: 5px; }
                .strategy-card p { margin: 0; line-height: 1.5; }
                
                .animate-pop { animation: popIn 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275); }
                @keyframes popIn { from { transform: scale(0.8); opacity: 0; } to { transform: scale(1); opacity: 1; } }
            `}</style>
        </div>
    );
};

const SeasonalBlocks = ({ activeSeason = 'Winter', detectedIssues = [] }) => {
    const [selectedSeason, setSelectedSeason] = useState(null);
    const [step, setStep] = useState(0); // 0: Grid, 1: Problem, 2: Process, 3: Result

    const handleSeasonClick = (season) => {
        setSelectedSeason(season);
        setStep(1);
    };

    const nextStep = () => setStep(prev => prev + 1);
    const reset = () => {
        setStep(0);
        setSelectedSeason(null);
    };

    if (selectedSeason && step > 0) {
        const data = seasonalData[selectedSeason];
        return (
            <div className="modal-overlay">
                <div className="modal-container" onClick={e => e.stopPropagation()}>
                    <div className="simple-modal-content animate-modal">
                        <button className="close-btn" onClick={reset}>×</button>
                        
                        {step === 1 && (
                            <div className="modal-body">
                                <h2>{data.icon} {selectedSeason} Concerns</h2>
                                <p>Typical issues during {selectedSeason}:</p>
                                <div className="tag-cloud">
                                    {data.commonProblems.map(p => (
                                        <span key={p} className="issue-tag">{p}</span>
                                    ))}
                                </div>
                                {detectedIssues.length > 0 && selectedSeason === activeSeason && (
                                    <div className="insight-box">
                                        <strong>Detected for you:</strong>
                                        <p>{detectedIssues.join(', ')}</p>
                                    </div>
                                )}
                                <button className="btn-primary" onClick={nextStep}>Analyze Solution →</button>
                            </div>
                        )}

                        {step === 2 && (
                            <div className="modal-body">
                                <ProcessingStep 
                                    season={selectedSeason} 
                                    solution={data.solution} 
                                    onComplete={nextStep} 
                                />
                            </div>
                        )}

                        {step === 3 && (
                            <div className="modal-body">
                                <h2>✨ {selectedSeason} Plan</h2>
                                
                                <div className="plan-grid">
                                    <div className="plan-card">
                                        <h4>💡 Tips</h4>
                                        <ul>
                                            {data.tips.map((t, i) => <li key={i}>{t}</li>)}
                                        </ul>
                                    </div>

                                    <div className="plan-card">
                                        <h4>🗓️ Routine</h4>
                                        <div className="routine-steps">
                                            {data.routine.split('->').map((part, i) => (
                                                <span key={i} className="step-tag">{part.trim()}</span>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="plan-card full-width">
                                        <h4>🛍️ Products</h4>
                                        <div className="product-mini-grid">
                                            {data.products.map(p => (
                                                <div key={p.name} className="product-mini-card">
                                                    <strong>{p.name}</strong>
                                                    <span>{p.price}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                                
                                <button className="btn-secondary" onClick={reset}>Back to Dashboard</button>
                            </div>
                        )}
                    </div>
                </div>

                <style>{`
                    .modal-overlay {
                        position: fixed; top: 0; left: 0; width: 100%; height: 100%;
                        background: rgba(0,0,0,0.7); display: flex; align-items: center; justify-content: center;
                        z-index: 2000; padding: 20px; backdrop-filter: blur(5px);
                    }
                    .simple-modal-content {
                        background: #fff; width: 100%; max-width: 600px; border-radius: 30px;
                        position: relative; max-height: 90vh; overflow-y: auto;
                        box-shadow: 0 30px 60px rgba(0,0,0,0.3);
                        text-align: center;
                        border: 3px solid #fbc02d;
                    }
                    .animate-modal {
                        animation: modalPop 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
                    }
                    @keyframes modalPop {
                        from { transform: scale(0.8) translateY(20px); opacity: 0; }
                        to { transform: scale(1) translateY(0); opacity: 1; }
                    }

                    .modal-body { padding: 40px; }

                    .close-btn {
                        position: absolute; top: 20px; right: 20px; font-size: 30px;
                        background: none; border: none; cursor: pointer; color: #ccc;
                        transition: 0.3s; z-index: 10;
                    }
                    .close-btn:hover { color: #333; transform: rotate(90deg); }
                    
                    .tag-cloud { display: flex; flex-wrap: wrap; gap: 10px; justify-content: center; margin: 20px 0; }
                    .issue-tag { background: #fffdf5; border: 1px solid #fbc02d; color: #fbc02d; padding: 8px 15px; border-radius: 20px; font-weight: bold; }
                    
                    .insight-box { background: #f9f9f9; padding: 15px; border-radius: 15px; margin-bottom: 20px; text-align: left; border-left: 4px solid #fbc02d; }
                    .insight-box strong { color: #fbc02d; }
                    
                    .btn-primary { background: #fbc02d; color: white; border: none; padding: 15px 30px; border-radius: 15px; font-weight: bold; cursor: pointer; width: 100%; }
                    .btn-secondary { background: #333; color: white; border: none; padding: 15px 30px; border-radius: 15px; font-weight: bold; cursor: pointer; margin-top: 20px; }

                    .plan-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; text-align: left; margin-top: 20px; }
                    .plan-card { background: #fafafa; padding: 20px; border-radius: 20px; border: 1px solid #eee; }
                    .plan-card.full-width { grid-column: span 2; }
                    .plan-card h4 { margin: 0 0 10px 0; color: #fbc02d; }
                    
                    .plan-card ul { padding-left: 20px; margin: 0; font-size: 0.9rem; }
                    .plan-card li { margin-bottom: 5px; color: #555; }
                    
                    .routine-steps { display: flex; flex-wrap: wrap; gap: 5px; }
                    .step-tag { background: white; padding: 5px 10px; border-radius: 8px; border: 1px solid #eee; font-size: 0.8rem; }
                    
                    .product-mini-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
                    .product-mini-card { background: white; padding: 10px; border-radius: 12px; border: 1px solid #eee; display: flex; justify-content: space-between; font-size: 0.85rem; }
                `}</style>
            </div>
        );
    }

    return (
        <div className="seasonal-blocks-container">
            <div className="section-header">
                <h2>Seasonal Skin Blocks</h2>
                <p>Click a season to discover your personalized solution path.</p>
            </div>
            
            <div className="blocks-grid">
                {Object.entries(seasonalData).map(([season, data]) => (
                    <div 
                        key={season} 
                        className={`season-card ${activeSeason === season ? 'is-active' : ''}`}
                        onClick={() => handleSeasonClick(season)}
                        style={{ 
                            '--season-color': data.color,
                            '--season-gradient': data.gradient
                        }}
                    >
                        <div className="season-card-content">
                            <div className="card-icon">{data.icon}</div>
                            <h3>{season}</h3>
                            <p>Explore Routine</p>
                            {activeSeason === season && <span className="current-badge">Current</span>}
                        </div>
                    </div>
                ))}
            </div>

            <style>{`
                .seasonal-blocks-container { padding: 40px 0; text-align: center; }
                .section-header { margin-bottom: 40px; }
                .section-header h2 { font-size: 2.2rem; color: #333; margin-bottom: 10px; font-weight: 800; }
                
                .blocks-grid { 
                    display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); 
                    gap: 30px; max-width: 1100px; margin: 0 auto; 
                }

                .season-card {
                    height: 220px;
                    cursor: pointer;
                    transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
                    position: relative;
                }

                .season-card-content {
                    width: 100%; height: 100%;
                    background: var(--season-gradient);
                    border-radius: 25px;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    color: white;
                    box-shadow: 0 10px 20px rgba(0,0,0,0.1);
                    border: 2px solid transparent;
                    transition: all 0.3s ease;
                }

                .season-card:hover {
                    transform: translateY(-10px) scale(1.02);
                }

                .season-card:hover .season-card-content {
                    box-shadow: 0 20px 40px rgba(0,0,0,0.15);
                    border-color: white;
                }

                .card-icon { font-size: 45px; margin-bottom: 10px; }
                .season-card h3 { font-size: 1.6rem; margin: 0; font-weight: 700; }
                .season-card p { opacity: 0.9; font-size: 0.95rem; margin-top: 5px; }

                .current-badge {
                    position: absolute; top: 15px; right: 15px;
                    background: rgba(255,255,255,0.3);
                    padding: 5px 12px; border-radius: 15px;
                    font-size: 0.7rem; font-weight: bold;
                    backdrop-filter: blur(4px);
                    border: 1px solid rgba(255,255,255,0.4);
                }
            `}</style>
        </div>
    );
};

export default SeasonalBlocks;
