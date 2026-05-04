import React, { useState } from 'react';
import axios from 'axios';

const SkinAnalyzer = ({ user, selectedProblems = [], onAnalysisComplete }) => {
    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState(null);
    const [analyzing, setAnalyzing] = useState(false);
    const [analysisResult, setAnalysisResult] = useState(null);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setImage(file);
        setPreview(URL.createObjectURL(file));
    };

    const handleUpload = async () => {
        if (!image) return;
        setAnalyzing(true);
        
        const formData = new FormData();
        formData.append('image', image);
        if (user) formData.append('userId', user.id);
        if (selectedProblems.length > 0) {
            formData.append('selectedProblems', JSON.stringify(selectedProblems));
        }

        try {
            const res = await axios.post('http://localhost:5000/api/analysis/upload', formData);
            const responseAnalysis = res.data.analysis || {};
            
            const highlightAreas = responseAnalysis.markerPoints || [];

            const analysisPayload = {
                ...responseAnalysis,
                beforeImage: preview,
                afterImage: preview,
                highlightAreas
            };
            setAnalysisResult(analysisPayload);
            onAnalysisComplete(analysisPayload);
        } catch (err) {
            alert('Analysis failed');
        } finally {
            setAnalyzing(false);
        }
    };

    return (
        <div className="analyzer-block">
            <div className="analyzer-header">
                <h2>🔬 Skin Analysis</h2>
                <p>Upload a photo for a quick texture and tone assessment.</p>
            </div>

            <div className="analyzer-content">
                <div className="upload-container">
                    <div className={`drop-zone ${preview ? 'has-file' : ''}`} onClick={() => document.getElementById('file-upload').click()}>
                        {preview ? (
                            <img src={preview} alt="Preview" className="img-preview" />
                        ) : (
                            <div className="placeholder">
                                <div className="icon">📸</div>
                                <strong>Click to Upload</strong>
                                <span>JPEG or PNG</span>
                            </div>
                        )}
                        <input id="file-upload" type="file" onChange={handleFileChange} style={{ display: 'none' }} accept="image/*" />
                    </div>
                    
                    <button 
                        className="btn-primary analyze-btn" 
                        onClick={handleUpload} 
                        disabled={!image || analyzing}
                    >
                        {analyzing ? 'Analyzing...' : 'Start Analysis'}
                    </button>
                </div>

                {analysisResult && (
                    <div className="analysis-result-view">
                        <div className="scan-card">
                            <h4>Issue Mapping</h4>
                            <div className="image-map">
                                <img src={analysisResult.afterImage} alt="Analysis" />
                                {analysisResult.markerPoints?.map((area, index) => (
                                    <div 
                                        key={index} 
                                        className="marker-dot" 
                                        style={{ left: area.left, top: area.top }}
                                    >
                                        ⚡
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </div>

            <style>{`
                .analyzer-block { 
                    background: white; 
                    padding: 40px; 
                    border-radius: 30px; 
                    text-align: center;
                    box-shadow: 0 10px 30px rgba(0,0,0,0.05);
                    margin-bottom: 40px;
                    border: 2px solid #eee;
                    transition: all 0.3s ease;
                }
                .analyzer-block:hover {
                    transform: translateY(-8px);
                    box-shadow: 0 20px 40px rgba(0,0,0,0.08);
                    border-color: #fbc02d;
                }
                .analyzer-header h2 { color: #333; margin-bottom: 10px; }
                .analyzer-header p { color: #888; margin-bottom: 30px; }

                .analyzer-content { display: flex; flex-direction: column; align-items: center; gap: 30px; }
                
                .upload-container { width: 100%; max-width: 400px; }
                .drop-zone { 
                    border: 3px dashed #eee; 
                    padding: 40px; 
                    border-radius: 24px; 
                    cursor: pointer;
                    transition: 0.3s;
                    background: #fafafa;
                }
                .drop-zone:hover { border-color: #fbc02d; background: #fffdf5; }
                .drop-zone.has-file { padding: 10px; border-style: solid; }
                
                .img-preview { width: 100%; border-radius: 18px; display: block; }
                .placeholder .icon { font-size: 3rem; margin-bottom: 10px; }
                .placeholder strong { display: block; color: #444; }
                .placeholder span { font-size: 0.8rem; color: #999; }

                .analyze-btn { 
                    margin-top: 20px; width: 100%; padding: 15px; 
                    background: #fbc02d; color: white; border: none;
                    border-radius: 15px; font-weight: bold; cursor: pointer;
                    box-shadow: 0 5px 15px rgba(251, 192, 45, 0.3);
                }
                .analyze-btn:disabled { background: #eee; box-shadow: none; cursor: not-allowed; }

                .analysis-result-view { width: 100%; max-width: 600px; margin-top: 20px; }
                .scan-card h4 { margin-bottom: 15px; color: #333; }
                .image-map { position: relative; border-radius: 20px; overflow: hidden; box-shadow: 0 15px 35px rgba(0,0,0,0.1); }
                .image-map img { width: 100%; display: block; }
                
                .marker-dot {
                    position: absolute; width: 20px; height: 20px;
                    background: rgba(255, 82, 82, 0.8); color: white;
                    border-radius: 50%; display: flex; align-items: center;
                    justify-content: center; font-size: 0.7rem;
                    transform: translate(-50%, -50%);
                    animation: pulseMarker 1.5s infinite;
                }
                @keyframes pulseMarker {
                    0% { transform: translate(-50%, -50%) scale(1); opacity: 1; }
                    50% { transform: translate(-50%, -50%) scale(1.2); opacity: 0.7; }
                    100% { transform: translate(-50%, -50%) scale(1); opacity: 1; }
                }
            `}</style>
        </div>
    );
};

export default SkinAnalyzer;
