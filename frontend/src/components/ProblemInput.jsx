import React, { useState } from 'react';

const problemDatabase = [
    { name: "Acne Breakouts", description: "Inflammation of the skin, often caused by clogged pores.", solution: "Use salicylic acid treatments and oil-free moisturizers", routine: "AM: Cleanse + BHA Treatment + SPF | PM: Double Cleanse + BHA Treatment + Oil Control", do: "Use oil-free products", dont: "Don't pick at acne" },
    { name: "Dry Patches", description: "Rough, scaly areas often due to lack of moisture.", solution: "Hydrate with ceramides and hyaluronic acid", routine: "AM: Cleanse + Hydrate + SPF | PM: Double Cleanse + Barrier Repair + Overnight Mask", do: "Use humidifier in dry environments", dont: "Don't use hot water for cleansing" },
    { name: "Oily T-Zone", description: "Excess sebum production in the forehead, nose, and chin.", solution: "Balance sebum with niacinamide and mattifying products", routine: "AM: Cleanse + Oil Control + SPF | PM: Double Cleanse + Pore Minimizer + Light Hydration", do: "Use blotting papers when needed", dont: "Don't skip moisturizer" },
    { name: "Dark Spots", description: "Hyperpigmentation caused by sun damage or scarring.", solution: "Brighten with vitamin C and gentle exfoliation", routine: "AM: Cleanse + Vitamin C + SPF | PM: Double Cleanse + Brightening Serum + Recovery Cream", do: "Apply SPF daily", dont: "Don't use harsh exfoliants" },
    { name: "Fine Lines", description: "Early signs of aging or dehydration.", solution: "Plump skin with retinoids and peptides", routine: "AM: Cleanse + Anti-Aging Serum + SPF | PM: Double Cleanse + Retinoid + Eye Cream", do: "Stay hydrated", dont: "Don't smoke or expose to pollution" },
    { name: "Redness/Rosacea", description: "Sensitive skin showing flushed appearance.", solution: "Calm with green tea and soothing ingredients", routine: "AM: Gentle Cleanse + Calming Serum + SPF | PM: Gentle Cleanse + Barrier Repair + Soothing Mask", do: "Use fragrance-free products", dont: "Don't use hot showers" },
    { name: "Clogged Pores", description: "Blackheads and whiteheads from buildup.", solution: "Clear pores with AHAs and proper cleansing", routine: "AM: Cleanse + Exfoliate + SPF | PM: Double Cleanse + Pore Clearing Mask + Hydrate", do: "Clean makeup brushes weekly", dont: "Don't sleep with makeup on" },
    { name: "Uneven Texture", description: "Bumpy skin feeling often needing exfoliation.", solution: "Smooth with gentle exfoliation and hydration", routine: "AM: Cleanse + Exfoliate + Hydrate + SPF | PM: Double Cleanse + Smoothing Treatment + Barrier Cream", do: "Exfoliate 2-3 times per week", dont: "Don't over-exfoliate" }
];

const ProblemInput = ({ selectedProblems = [], onProblemSelect }) => {
    const [inputText, setInputText] = useState("");
    const [suggestions, setSuggestions] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => {
        setIsModalOpen(true);
        setInputText("");
        setSuggestions([]);
    };
    const closeModal = () => setIsModalOpen(false);

    const handleInputChange = (e) => {
        const text = e.target.value;
        setInputText(text);

        const normalized = text.toLowerCase().trim();
        if (normalized.length > 0) {
            const filtered = problemDatabase.filter(p => 
                p.name.toLowerCase().includes(normalized) || 
                p.description.toLowerCase().includes(normalized)
            );
            setSuggestions(filtered);
        } else {
            setSuggestions([]);
        }
    };

    const toggleProblemSelection = (problem) => {
        const isSelected = selectedProblems.some(p => p.name === problem.name);
        if (isSelected) {
            onProblemSelect(selectedProblems.filter(p => p.name !== problem.name));
        } else {
            onProblemSelect([...selectedProblems, problem]);
        }
    };

    return (
        <>
            <div className="card dashboard-top-block concern-preview-card" onClick={openModal}>
                <div className="card-icon">🔍</div>
                <div className="card-text-content">
                    <h3>Skin Concerns</h3>
                    <p>{selectedProblems.length > 0 ? `${selectedProblems.length} Active Concerns` : 'Describe Problem'}</p>
                </div>
                {selectedProblems.length > 0 && <div className="counter-badge">{selectedProblems.length}</div>}
            </div>

            {isModalOpen && (
                <div className="modal-overlay" onClick={closeModal}>
                    <div className="modal-container" onClick={e => e.stopPropagation()}>
                        <div className="simple-modal-content animate-modal">
                            <div className="modal-header">
                                <h3>🔍 Symptom Checker</h3>
                                <button className="close-btn" onClick={closeModal}>&times;</button>
                            </div>

                            <div className="modal-body">
                                <div className="input-section">
                                    <label>What's bothering your skin today?</label>
                                    <textarea 
                                        placeholder="e.g., I have some red bumps on my chin..."
                                        value={inputText}
                                        onChange={handleInputChange}
                                    />
                                </div>

                                {selectedProblems.length > 0 && (
                                    <div className="active-concerns">
                                        <h5>Active Selections</h5>
                                        <div className="tag-cloud">
                                            {selectedProblems.map((p, i) => (
                                                <span key={i} className="issue-tag active-tag">
                                                    {p.name}
                                                    <button onClick={() => toggleProblemSelection(p)}>&times;</button>
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                <div className="suggestions-section">
                                    <h5>{inputText.length > 0 ? 'Related Concerns' : 'Common Concerns'}</h5>
                                    <div className="suggestion-list">
                                        {(inputText.length > 0 ? suggestions : problemDatabase).map((p, i) => {
                                            const isSelected = selectedProblems.some(sp => sp.name === p.name);
                                            return (
                                                <div 
                                                    key={i} 
                                                    className={`suggestion-item ${isSelected ? 'selected' : ''}`}
                                                    onClick={() => toggleProblemSelection(p)}
                                                >
                                                    <div className="check-mark">{isSelected ? '✓' : ''}</div>
                                                    <div className="item-info">
                                                        <strong>{p.name}</strong>
                                                        <p>{p.description}</p>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <style>{`
                .concern-preview-card {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    height: 200px;
                    cursor: pointer;
                    background: white;
                    border: 2px solid #eee;
                    position: relative;
                    transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
                }
                .concern-preview-card:hover {
                    transform: translateY(-8px) scale(1.02);
                    box-shadow: 0 15px 30px rgba(0,0,0,0.05);
                    border-color: #fbc02d;
                }
                .card-icon { font-size: 48px; margin-bottom: 15px; }
                .card-text-content { text-align: center; }
                .card-text-content h3 { margin: 0; color: #333; font-size: 1.2rem; }
                .card-text-content p { margin: 5px 0 0 0; color: #666; font-size: 0.9rem; }
                
                .counter-badge {
                    position: absolute; top: 20px; right: 20px; 
                    background: #fbc02d; color: white; padding: 4px 10px; 
                    border-radius: 12px; font-size: 0.8rem; font-weight: 800;
                    box-shadow: 0 5px 15px rgba(251, 192, 45, 0.3);
                }

                .animate-modal {
                    animation: modalPop 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
                }
                @keyframes modalPop {
                    from { transform: scale(0.8) translateY(20px); opacity: 0; }
                    to { transform: scale(1) translateY(0); opacity: 1; }
                }

                .simple-modal-content { 
                    background: white; 
                    border-radius: 30px; 
                    overflow: hidden; 
                    box-shadow: 0 30px 60px rgba(0,0,0,0.3); 
                    border: 3px solid #fbc02d;
                    width: 100%;
                }
                .modal-header { 
                    background: linear-gradient(135deg, #fbc02d 0%, #ff9800 100%); 
                    color: white; 
                    padding: 25px; 
                    display: flex; 
                    justify-content: space-between; 
                    align-items: center; 
                }
                .close-btn { background: none; border: none; color: white; font-size: 32px; cursor: pointer; transition: 0.3s; }
                .close-btn:hover { transform: rotate(90deg); }

                .modal-body { padding: 30px; text-align: left; max-height: 70vh; overflow-y: auto; }
                .input-section { margin-bottom: 25px; }
                .input-section label { display: block; margin-bottom: 10px; font-weight: 700; color: #333; }
                textarea {
                    width: 100%; height: 80px; padding: 15px; border-radius: 15px; 
                    border: 2px solid #eee; font-family: inherit; resize: none;
                    box-sizing: border-box; transition: 0.3s;
                }
                textarea:focus { outline: none; border-color: #fbc02d; }

                .active-concerns { margin-bottom: 25px; }
                .active-concerns h5 { margin: 0 0 10px 0; color: #888; text-transform: uppercase; font-size: 0.75rem; letter-spacing: 1px; }
                .tag-cloud { display: flex; flex-wrap: wrap; gap: 8px; }
                .issue-tag { background: #fffde7; border: 1px solid #fbc02d; color: #fbc02d; padding: 5px 15px; border-radius: 20px; margin: 5px; display: inline-block; font-size: 0.85rem; font-weight: 700; }
                .active-tag { background: #fbc02d; color: white; border: none; }
                .active-tag button { background: none; border: none; color: white; margin-left: 8px; cursor: pointer; font-size: 1.1rem; padding: 0; }

                .suggestions-section h5 { margin: 0 0 10px 0; color: #888; text-transform: uppercase; font-size: 0.75rem; letter-spacing: 1px; }
                .suggestion-list { display: flex; flex-direction: column; gap: 10px; }
                .suggestion-item {
                    display: flex; align-items: center; gap: 15px; padding: 15px;
                    background: #fcfcfc; border: 1px solid #f0f0f0; border-radius: 15px;
                    cursor: pointer; transition: 0.2s;
                }
                .suggestion-item:hover { border-color: #fbc02d; background: #fffdf5; transform: translateX(5px); }
                .suggestion-item.selected { background: #fffdf5; border-color: #fbc02d; }
                
                .check-mark { width: 20px; height: 20px; border: 2px solid #eee; border-radius: 6px; display: flex; align-items: center; justify-content: center; color: #fbc02d; font-weight: bold; }
                .suggestion-item.selected .check-mark { border-color: #fbc02d; }
                
                .item-info strong { display: block; font-size: 0.95rem; margin-bottom: 2px; }
                .item-info p { margin: 0; font-size: 0.8rem; color: #777; }
            `}</style>
        </>
    );
};

export default ProblemInput;
