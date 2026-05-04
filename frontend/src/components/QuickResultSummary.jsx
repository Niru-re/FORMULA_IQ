import React, { useState } from 'react';

const QuickResultSummary = ({ results, selectedProblems = [] }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    const analysis = results || {};
    const routine = analysis?.routine || {};
    const detectedIssues = analysis?.detectedIssues || [];
    const describedProblems = selectedProblems.map(problem => problem.name);
    const allIssues = [...new Set([...detectedIssues, ...describedProblems])];

    return (
        <>
            <div className="card dashboard-top-block result-preview-card" onClick={openModal}>
                <div className="card-icon">📊</div>
                <div className="card-text-content">
                    <h3>Checkup Result</h3>
                    <p>{results ? 'Report Ready' : 'Analysis Required'}</p>
                </div>
                {results && <div className="pulse-dot"></div>}
            </div>

            {isModalOpen && (
                <div className="modal-overlay" onClick={closeModal}>
                    <div className="modal-container" onClick={(e) => e.stopPropagation()}>
                        <div className="simple-modal-content animate-modal">
                            <div className="modal-header">
                                <h3>📊 Skin Health Report</h3>
                                <button className="close-btn" onClick={closeModal}>&times;</button>
                            </div>

                            <div className="modal-body">
                                <div className="analysis-summary">
                                    <div className="score-box">
                                        <div className="score-circle">
                                            <span>{Math.round(analysis?.score || 0)}%</span>
                                            <small>Health</small>
                                        </div>
                                    </div>

                                    <div className="issues-box">
                                        <h4>🎯 Identified Issues:</h4>
                                        <div className="tag-cloud">
                                            {allIssues.length > 0 ? allIssues.map((issue, i) => (
                                                <span key={i} className="issue-tag">{issue}</span>
                                            )) : <p>No major issues detected</p>}
                                        </div>
                                    </div>
                                </div>

                                <div className="result-grid">
                                    <div className="res-card do">
                                        <strong>✅ Recommended:</strong>
                                        <p>{analysis?.do || "Stay hydrated and use SPF daily."}</p>
                                    </div>
                                    <div className="res-card dont">
                                        <strong>❌ Avoid:</strong>
                                        <p>{analysis?.dont || "Avoid touching your face often."}</p>
                                    </div>
                                </div>

                                <div className="routine-box">
                                    <h4>🗓️ Daily Routine:</h4>
                                    <div className="routine-item">
                                        <strong>AM:</strong> {routine.morning?.join(' → ') || 'Cleanse -> Hydrate -> SPF'}
                                    </div>
                                    <div className="routine-item">
                                        <strong>PM:</strong> {routine.evening?.join(' → ') || 'Double Cleanse -> Treatment -> Repair'}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <style>{`
                .result-preview-card {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    height: 200px;
                    cursor: pointer;
                    background: linear-gradient(135deg, #fff9c4 0%, #fffde7 100%);
                    border: 2px solid #fbc02d;
                    position: relative;
                    transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
                }
                .result-preview-card:hover {
                    transform: translateY(-8px) scale(1.02);
                    box-shadow: 0 15px 30px rgba(251, 192, 45, 0.2);
                    border-color: #ff9800;
                }
                .card-icon { font-size: 48px; margin-bottom: 15px; }
                .card-text-content { text-align: center; }
                .card-text-content h3 { margin: 0; color: #333; font-size: 1.2rem; }
                .card-text-content p { margin: 5px 0 0 0; color: #666; font-size: 0.9rem; }
                
                .pulse-dot {
                    position: absolute; top: 20px; right: 20px; width: 12px; height: 12px;
                    background: #4caf50; border-radius: 50%; box-shadow: 0 0 10px #4caf50;
                    animation: pulse 2s infinite;
                }
                @keyframes pulse { 0% { transform: scale(1); opacity: 1; } 50% { transform: scale(1.5); opacity: 0.5; } 100% { transform: scale(1); opacity: 1; } }

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
                }
                .modal-header { 
                    background: linear-gradient(135deg, #fbc02d 0%, #ff9800 100%); 
                    color: white; 
                    padding: 25px; 
                    display: flex; 
                    justify-content: space-between; 
                    align-items: center; 
                }
                .modal-header h3 { margin: 0; font-size: 1.4rem; }
                .close-btn { background: none; border: none; color: white; font-size: 32px; cursor: pointer; transition: 0.3s; }
                .close-btn:hover { transform: rotate(90deg); }

                .modal-body { padding: 30px; text-align: left; }
                .analysis-summary { display: flex; gap: 30px; align-items: center; margin-bottom: 30px; padding-bottom: 20px; border-bottom: 1px solid #eee; }
                .score-circle { width: 80px; height: 80px; border-radius: 50%; background: #fbc02d; color: white; display: flex; flex-direction: column; align-items: center; justify-content: center; font-weight: 800; }
                .score-circle span { font-size: 1.5rem; }
                .score-circle small { font-size: 0.6rem; text-transform: uppercase; }
                
                .issue-tag { background: #fffde7; border: 1px solid #fbc02d; color: #fbc02d; padding: 5px 15px; border-radius: 20px; margin: 5px; display: inline-block; font-size: 0.85rem; font-weight: 700; }
                
                .result-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 30px; }
                .res-card { padding: 20px; border-radius: 20px; border: 1px solid #eee; }
                .res-card.do { background: #e8f5e9; border-color: #c8e6c9; }
                .res-card.dont { background: #fffde7; border-color: #fff9c4; }
                .res-card p { margin: 8px 0 0 0; font-size: 0.9rem; color: #444; }

                .routine-box { background: #fafafa; padding: 20px; border-radius: 20px; border: 1px solid #eee; }
                .routine-box h4 { margin: 0 0 12px 0; color: #fbc02d; }
                .routine-item { margin: 8px 0; font-size: 0.9rem; line-height: 1.5; }
            `}</style>
        </>
    );
};

export default QuickResultSummary;
