import React, { useState } from 'react';
import axios from 'axios';

const Onboarding = ({ onAuthSuccess }) => {
    const [isLogin, setIsLogin] = useState(true);
    const [formData, setFormData] = useState({
        username: '', email: '', password: '', skinType: 'Normal', concerns: []
    });

    const skinTypes = ['Normal', 'Oily', 'Dry', 'Sensitive'];
    const commonConcerns = ['Acne', 'Aging', 'Dark Spots', 'Pores', 'Redness'];

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleConcernToggle = (concern) => {
        const newConcerns = formData.concerns.includes(concern)
            ? formData.concerns.filter(c => c !== concern)
            : [...formData.concerns, concern];
        setFormData({ ...formData, concerns: newConcerns });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const apiBase = window.location.hostname === 'localhost' ? 'http://localhost:5000' : '';
            const endpoint = isLogin ? '/api/auth/login' : '/api/auth/signup';
            const res = await axios.post(`${apiBase}${endpoint}`, formData);
            localStorage.setItem('token', res.data.token);
            onAuthSuccess(res.data.user);
        } catch (err) {
            alert(err.response?.data?.message || 'Auth failed');
        }
    };

    return (
        <div className="onboarding-container">
            <form onSubmit={handleSubmit} className="auth-form">
                <div className="logo-section">✨</div>
                <h2>{isLogin ? 'Welcome Back' : 'Create Your Skin Profile'}</h2>
                
                {!isLogin && (
                    <input
                        type="text"
                        name="username"
                        placeholder="Username"
                        value={formData.username}
                        onChange={handleChange}
                        required
                    />
                )}
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                />

                {!isLogin && (
                    <div className="skin-info">
                        <h4>Your Skin Type:</h4>
                        <div className="radio-group">
                            {skinTypes.map(type => (
                                <label key={type} className={formData.skinType === type ? 'active' : ''}>
                                    <input 
                                        type="radio" name="skinType" value={type} 
                                        checked={formData.skinType === type} 
                                        onChange={handleChange} 
                                    /> {type}
                                </label>
                            ))}
                        </div>

                        <h4>Concerns:</h4>
                        <div className="checkbox-group">
                            {commonConcerns.map(concern => (
                                <label key={concern} className={formData.concerns.includes(concern) ? 'active' : ''}>
                                    <input 
                                        type="checkbox" 
                                        checked={formData.concerns.includes(concern)}
                                        onChange={() => handleConcernToggle(concern)}
                                    /> {concern}
                                </label>
                            ))}
                        </div>
                    </div>
                )}

                <button type="submit" className="submit-btn">{isLogin ? 'Login' : 'Start My Journey'}</button>
                <p className="toggle-link" onClick={() => setIsLogin(!isLogin)}>
                    {isLogin ? "New here? Create a profile" : "Already have a profile? Login"}
                </p>
            </form>

            <style>{`
                .onboarding-container { 
                    display: flex; justify-content: center; align-items: center; min-height: 100vh; 
                    font-family: 'Inter', sans-serif; background: #ffffff;
                }
                .auth-form { 
                    background: white; padding: 40px; border-radius: 30px; 
                    box-shadow: 0 15px 40px rgba(0,0,0,0.08);
                    width: 100%; max-width: 450px; border: 1px solid #eee;
                    text-align: center;
                }
                .logo-section { font-size: 50px; margin-bottom: 20px; }
                h2 { color: #333; margin-bottom: 30px; font-weight: 800; }
                
                input[type="text"], input[type="email"], input[type="password"] {
                    width: 100%; padding: 15px; margin-bottom: 15px; border: 2px solid #fff9c4; 
                    border-radius: 12px; font-size: 1rem; outline: none; transition: border-color 0.3s;
                    box-sizing: border-box;
                }
                input:focus { border-color: #fbc02d; background: #fffde7; }
                
                .skin-info { text-align: left; }
                h4 { margin: 20px 0 10px; color: #fbc02d; font-weight: bold; }
                
                .radio-group, .checkbox-group { display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 20px; }
                .radio-group label, .checkbox-group label {
                    padding: 8px 15px; background: #fff9c4; border-radius: 20px; 
                    cursor: pointer; font-size: 0.9rem; transition: all 0.3s;
                    border: 1px solid transparent;
                }
                .radio-group label.active, .checkbox-group label.active {
                    background: #fbc02d; color: white; border-color: #fbc02d;
                }
                .radio-group input, .checkbox-group input { display: none; }

                .submit-btn { 
                    width: 100%; padding: 18px; background: #fbc02d; color: white; 
                    border: none; border-radius: 15px; cursor: pointer;
                    font-weight: 800; font-size: 1.1rem; transition: transform 0.2s, background 0.3s;
                    box-shadow: 0 4px 15px rgba(251, 192, 45, 0.3);
                }
                .submit-btn:hover { background: #f9a825; transform: translateY(-2px); }
                
                .toggle-link { text-align: center; margin-top: 25px; cursor: pointer; color: #888; font-weight: 500; }
                .toggle-link:hover { color: #fbc02d; }
            `}</style>
        </div>
    );
};

export default Onboarding;
