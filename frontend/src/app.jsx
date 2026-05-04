import React, { useState, useEffect } from 'react';
import Onboarding from './components/Onboarding';
import SkinAnalyzer from './components/SkinAnalyzer';
import SeasonalBlocks from './components/SeasonalBlocks';
import ProductsPage, { allProducts as productCatalog } from './components/ProductsPage';
import CursorAnimation from './components/CursorAnimation';
import QuickResultSummary from './components/QuickResultSummary';
import ProblemInput from './components/ProblemInput';
import UserProfile from './components/UserProfile';
import AffiliateModal from './components/AffiliateModal';
import ServiceModal from './components/ServiceModal';

const allServices = [
    { id: 'analysis', title: 'Skin Analysis', icon: '🔬', description: 'Personalized skin health check and issue detection.' },
    { id: 'recommendations', title: 'Product Recommendations', icon: '💊', description: 'Custom product suggestions for your skin goals.' },
    { id: 'problem-selector', title: 'Problem Selector', icon: '🔍', description: 'Multi-select concern input with smart suggestions.' },
    { id: 'routine-builder', title: 'Routine Tracking', icon: '📅', description: 'Daily skincare routine guidance and tracking.' },
    { id: 'wishlist', title: 'Wishlist & Likes', icon: '❤️', description: 'Save favorite products and review liked items anytime.' },
    { id: 'seasonal', title: 'Seasonal Advice', icon: '☁️', description: 'Season-aware skincare tips for every weather type.' },
];

function App() {
    const [user, setUser] = useState(null);
    const [analysisResults, setAnalysisResults] = useState(null);
    const [selectedProblems, setSelectedProblems] = useState([]);
    const [currentSeason, setCurrentSeason] = useState('Winter');
    const [currentPage, setCurrentPage] = useState('home'); // 'home' or 'products'
    const [wishlist, setWishlist] = useState([]);
    const [cart, setCart] = useState([]);
    const [showWishlist, setShowWishlist] = useState(false);
    const [showCart, setShowCart] = useState(false);
    const [affiliateModal, setAffiliateModal] = useState({ isOpen: false, product: null });
    const [serviceModal, setServiceModal] = useState({ isOpen: false, service: null });

    const normalizeUser = (rawUser) => {
        const skinProfile = {
            skinType: rawUser?.skinProfile?.skinType || 'Normal',
            concerns: rawUser?.skinProfile?.concerns || [],
            routine: rawUser?.skinProfile?.routine || null
        };
        const analysisHistory = rawUser?.analysisHistory || rawUser?.skinProfile?.analysisHistory || [];
        return {
            ...rawUser,
            skinProfile,
            analysisHistory
        };
    };

    useEffect(() => {
        // Simple season detection based on current month
        const month = new Date().getMonth();
        if ([10, 11, 0, 1].includes(month)) setCurrentSeason('Winter');
        else if ([2, 3, 4, 5].includes(month)) setCurrentSeason('Summer');
        else if ([6, 7, 8, 9].includes(month)) setCurrentSeason('Monsoon');
        else setCurrentSeason('Spring');

        // Check for existing session
        const savedUser = localStorage.getItem('user');
        if (savedUser) setUser(normalizeUser(JSON.parse(savedUser)));
    }, []);

    const handleAuthSuccess = (userData) => {
        const normalized = normalizeUser(userData);
        setUser(normalized);
        localStorage.setItem('user', JSON.stringify(normalized));
    };

    const handleAnalysisComplete = (results) => {
        const selectedProblemNames = selectedProblems.map(p => p.name);
        const detectedIssues = results.detectedIssues || [];
        const uniqueIssues = [...new Set([...(detectedIssues || []), ...selectedProblemNames])];
        const recommendations = results.recommendations || [];

        const newHistoryItem = {
            date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
            score: Math.round(results.score || 0),
            issues: uniqueIssues.slice(0, 4),
            recommended: recommendations.map(prod => prod.name || prod.title).filter(Boolean).slice(0, 3),
            routine: results.routine || user?.skinProfile?.routine || null,
            selectedProblems: selectedProblemNames
        };

        const updatedUser = {
            ...user,
            skinProfile: {
                ...user.skinProfile,
                concerns: [...new Set([...(user.skinProfile?.concerns || []), ...selectedProblemNames])],
                routine: results.routine || user.skinProfile?.routine || null
            },
            analysisHistory: [newHistoryItem, ...(user.analysisHistory || [])].slice(0, 10)
        };

        setUser(updatedUser);
        localStorage.setItem('user', JSON.stringify(updatedUser));
        setAnalysisResults({ ...results, selectedProblems });
    };

    const handleLogout = () => {
        setUser(null);
        localStorage.removeItem('user');
        localStorage.removeItem('token');
    };

    const toggleWishlist = (productId) => {
        setWishlist(prev => 
            prev.includes(productId) 
                ? prev.filter(id => id !== productId)
                : [...prev, productId]
        );
    };

    const removeHistoryItem = (index) => {
        const updatedHistory = [...(user.analysisHistory || [])];
        if (index < 0 || index >= updatedHistory.length) return;
        updatedHistory.splice(index, 1);

        const updatedUser = {
            ...user,
            analysisHistory: updatedHistory
        };

        setUser(updatedUser);
        localStorage.setItem('user', JSON.stringify(updatedUser));
    };

    const getWishlistItems = () => {
        return productCatalog.filter(product => wishlist.includes(product.id));
    };

    const removeFromWishlist = (productId) => {
        setWishlist(prev => prev.filter(id => id !== productId));
    };

    const addToCart = (product) => {
        setCart(prev => {
            const existing = prev.find(item => item.id === product.id);
            if (existing) {
                return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
            }
            return [...prev, { ...product, quantity: 1 }];
        });
        setShowCart(true);
    };

    const updateCartItem = (productId, quantity) => {
        setCart(prev => prev
            .map(item => item.id === productId ? { ...item, quantity: Math.max(1, quantity) } : item)
            .filter(item => item.quantity > 0)
        );
    };

    const removeFromCart = (productId) => {
        setCart(prev => prev.filter(item => item.id !== productId));
    };

    const parsePrice = (price) => {
        if (typeof price === 'number') return price;
        const value = String(price || '');
        const matches = value.match(/([0-9][0-9,]*(?:\.[0-9]+)?)(?=[^0-9]*$)/g);
        if (!matches?.length) return 0;
        const numeric = Number(matches[matches.length - 1].replace(/,/g, ''));
        return Number.isFinite(numeric) ? numeric : 0;
    };

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(amount);
    };

    const getCartTotal = () => {
        return cart.reduce((sum, item) => sum + parsePrice(item.price) * item.quantity, 0);
    };

    const openAffiliateModal = (product) => {
        setAffiliateModal({ isOpen: true, product });
        setShowWishlist(false); // Close wishlist dropdown when opening affiliate modal
    };

    const closeAffiliateModal = () => {
        setAffiliateModal({ isOpen: false, product: null });
    };

    const openServiceModal = (service) => {
        setServiceModal({ isOpen: true, service });
    };

    const handleTryService = (serviceId) => {
        setServiceModal({ isOpen: false, service: null });
        
        // Map service IDs to app actions
        switch (serviceId) {
            case 'analysis':
                setCurrentPage('home');
                // Smooth scroll to analyzer
                setTimeout(() => {
                    document.querySelector('.analyzer-container')?.scrollIntoView({ behavior: 'smooth' });
                }, 100);
                break;
            case 'recommendations':
                setCurrentPage('products');
                break;
            case 'problem-selector':
                setCurrentPage('home');
                setTimeout(() => {
                    document.querySelector('.concern-preview')?.scrollIntoView({ behavior: 'smooth' });
                    document.querySelector('.concern-preview')?.click();
                }, 100);
                break;
            case 'routine-builder':
                setCurrentPage('home');
                setTimeout(() => {
                    document.querySelector('.result-preview')?.scrollIntoView({ behavior: 'smooth' });
                    document.querySelector('.result-preview')?.click();
                    // Assuming routine is a tab, we'd need to trigger tab change here
                }, 100);
                break;
            case 'wishlist':
                setShowWishlist(true);
                break;
            case 'seasonal':
                setCurrentPage('home');
                setTimeout(() => {
                    document.querySelector('.seasonal-blocks-container')?.scrollIntoView({ behavior: 'smooth' });
                }, 100);
                break;
            default:
                break;
        }
    };

    const closeServiceModal = () => {
        setServiceModal({ isOpen: false, service: null });
    };

    if (!user) {
        return <Onboarding onAuthSuccess={handleAuthSuccess} />;
    }

    return (
        <div className="App">
            <CursorAnimation />
            <header className="app-header">
                <div className="logo-brand" onClick={() => setCurrentPage('home')}>
                    <div className="logo-mark">IQ</div>
                    <div className="logo-text">
                        <span className="logo-name">Formula IQ</span>
                        <span className="logo-tag">Smart skincare intelligence</span>
                    </div>
                </div>
                <nav className="main-nav">
                    <button 
                        className={currentPage === 'home' ? 'active' : ''} 
                        onClick={() => setCurrentPage('home')}
                    >
                        Dashboard
                    </button>
                    <button 
                        className={currentPage === 'services' ? 'active' : ''} 
                        onClick={() => setCurrentPage('services')}
                    >
                        Services
                    </button>
                    <button 
                        className={currentPage === 'products' ? 'active' : ''} 
                        onClick={() => setCurrentPage('products')}
                    >
                        Shop Products
                    </button>
                </nav>
                <div className="user-nav">
                    <div className="wishlist-nav">
                        <button 
                            className="wishlist-toggle" 
                            onClick={() => {
                                setShowWishlist(!showWishlist);
                                setShowCart(false);
                            }}
                            title="View Wishlist"
                        >
                            ❤️ {wishlist.length}
                        </button>
                        {showWishlist && (
                            <div className="wishlist-dropdown">
                                <h4>Your Wishlist</h4>
                                {getWishlistItems().length === 0 ? (
                                    <p className="empty-wishlist">No items in wishlist</p>
                                ) : (
                                    <div className="wishlist-items">
                                        {getWishlistItems().map(item => (
                                            <div key={item.id} className="wishlist-item">
                                                <div className="wishlist-item-image">{item.image}</div>
                                                <div className="wishlist-item-info">
                                                    <h5>{item.name}</h5>
                                                    <p>{item.price}</p>
                                                </div>
                                                <div className="wishlist-item-actions">
                                                    <button 
                                                        className="wishlist-buy-btn"
                                                        onClick={() => openAffiliateModal(item)}
                                                        title="Buy this product"
                                                    >
                                                        🛒
                                                    </button>
                                                    <button 
                                                        className="remove-wishlist-btn"
                                                        onClick={() => removeFromWishlist(item.id)}
                                                        title="Remove from wishlist"
                                                    >
                                                        ×
                                                    </button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                                {getWishlistItems().length > 0 && (
                                    <button 
                                        className="view-all-wishlist-btn"
                                        onClick={() => {
                                            setCurrentPage('products');
                                            setShowWishlist(false);
                                        }}
                                    >
                                        View All Products
                                    </button>
                                )}
                            </div>
                        )}
                    </div>
                    <div className="cart-nav">
                        <button 
                            className="cart-toggle" 
                            onClick={() => {
                                setShowCart(!showCart);
                                setShowWishlist(false);
                            }}
                            title="View Cart"
                        >
                            🛍️ {cart.reduce((count, item) => count + item.quantity, 0)}
                        </button>
                        {showCart && (
                            <div className="cart-dropdown">
                                <h4>Your Cart</h4>
                                {cart.length === 0 ? (
                                    <p className="empty-cart">Cart is empty</p>
                                ) : (
                                    <div className="cart-items">
                                        {cart.map(item => (
                                            <div key={item.id} className="cart-item">
                                                <div className="cart-item-image">{item.image}</div>
                                                <div className="cart-item-info">
                                                    <h5>{item.name}</h5>
                                                    <p>{item.price}</p>
                                                    <div className="cart-quantity-control">
                                                        <button onClick={() => updateCartItem(item.id, item.quantity - 1)}>-</button>
                                                        <span>{item.quantity}</span>
                                                        <button onClick={() => updateCartItem(item.id, item.quantity + 1)}>+</button>
                                                    </div>
                                                </div>
                                                <button className="remove-cart-btn" onClick={() => removeFromCart(item.id)} title="Remove from cart">×</button>
                                            </div>
                                        ))}
                                    </div>
                                )}
                                {cart.length > 0 && (
                                    <div className="cart-summary">
                                        <div>Total</div>
                                        <div className="cart-total-price">{formatCurrency(getCartTotal())}</div>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                    <span style={{ fontWeight: '500' }}>Hello, {user.username}!</span>
                    <button className="logout-btn" onClick={handleLogout}>Logout</button>
                </div>
            </header>

            <main className="container">
                {currentPage === 'home' ? (
                    <>
                        <section className="dashboard-top-grid">
                            <QuickResultSummary 
                                results={analysisResults} 
                                selectedProblems={selectedProblems} 
                            />
                            <ProblemInput 
                                selectedProblems={selectedProblems} 
                                onProblemSelect={setSelectedProblems} 
                            />
                        </section>

                        <section className="profile-summary">
                            <UserProfile
                                user={user}
                                analysisResults={analysisResults}
                                selectedProblems={selectedProblems}
                                wishlist={wishlist}
                                toggleWishlist={toggleWishlist}
                                removeHistoryItem={removeHistoryItem}
                                productCatalog={productCatalog}
                            />
                        </section>

                        <SkinAnalyzer user={user} selectedProblems={selectedProblems} onAnalysisComplete={handleAnalysisComplete} />

                        <SeasonalBlocks 
                            activeSeason={currentSeason} 
                            detectedIssues={analysisResults?.detectedIssues || []} 
                        />
                    </>
                ) : currentPage === 'services' ? (
                    <section className="services-page animate-fade-in-pro">
                        <div className="services-header">
                            <h2 className="section-title-pro">Our Specialized Services</h2>
                            <p className="section-subtitle-pro">Everything Skin Log offers to help you track, analyze, and improve your skin journey.</p>
                        </div>
                        <div className="services-grid-pro">
                            {allServices.map(service => (
                                <div key={service.id} className="service-card-pro" onClick={() => openServiceModal(service)}>
                                    <div className="card-glass-pro"></div>
                                    <div className="card-body-pro">
                                        <div className="service-icon-pro">{service.icon}</div>
                                        <h3>{service.title}</h3>
                                        <p>{service.description}</p>
                                        <div className="service-hint-pro">Explore Service →</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="service-note-pro">
                            <p>💡 All these features are designed to work together to give you the most accurate skincare intelligence possible.</p>
                        </div>
                    </section>
                ) : (
                    <ProductsPage 
                        wishlist={wishlist} 
                        toggleWishlist={toggleWishlist} 
                        addToCart={addToCart}
                        cart={cart}
                    />
                )}
            </main>

            <style>{`
                body { margin: 0; font-family: 'Inter', sans-serif; background: #ffffff; color: #444; perspective: 1000px; }
                .app-header { 
                    background: #fbc02d; padding: 15px 40px; display: flex; justify-content: space-between; 
                    align-items: center; box-shadow: 0 4px 15px rgba(251, 192, 45, 0.3);
                    position: sticky; top: 0; z-index: 100;
                    gap: 24px;
                }

                .logo-brand {
                    display: inline-flex;
                    align-items: center;
                    gap: 12px;
                    cursor: pointer;
                    text-decoration: none;
                }
                .logo-mark {
                    width: 48px;
                    height: 48px;
                    border-radius: 14px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-weight: 900;
                    color: white;
                    background: linear-gradient(135deg, #d84315, #ff9800);
                    box-shadow: 0 8px 20px rgba(0,0,0,0.12);
                    font-size: 1rem;
                    letter-spacing: 0.04em;
                }
                .logo-text {
                    display: flex;
                    flex-direction: column;
                    line-height: 1.1;
                }
                .logo-name {
                    font-size: 1.25rem;
                    font-weight: 800;
                    color: #ffffff;
                }
                .logo-tag {
                    font-size: 0.8rem;
                    color: rgba(255,255,255,0.9);
                    letter-spacing: 0.02em;
                }

                /* 3D Button Effects */
                button {
                    transition: transform 0.2s, box-shadow 0.2s !important;
                    transform-style: preserve-3d;
                }
                button:active {
                    transform: translateY(2px) scale(0.98) rotateX(10deg) !important;
                }
                button:hover {
                    transform: translateY(-2px) rotateX(-5deg);
                }

                .main-nav button { 
                    background: rgba(255, 255, 255, 0.2); border: none; padding: 10px 20px; border-radius: 20px; 
                    cursor: pointer; font-weight: 600; color: white;
                    box-shadow: 0 4px 0 rgba(0,0,0,0.1);
                }
                .main-nav button.active { 
                    background: white; color: #fbc02d; 
                    box-shadow: 0 4px 0 #d4a017;
                }
                
                .card { 
                    background: white; padding: 25px; border-radius: 20px; 
                    box-shadow: 0 10px 30px rgba(0,0,0,0.05); border: 1px solid #eee;
                    transition: transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
                }
                .card:hover {
                    transform: rotateY(5deg) rotateX(2deg) translateY(-5px);
                }
                .container { max-width: 1100px; margin: 40px auto; padding: 0 20px; }
                .animate-modal {
                    animation: modalPop 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
                }
                @keyframes modalPop {
                    from { transform: scale(0.8) translateY(20px); opacity: 0; }
                    to { transform: scale(1) translateY(0); opacity: 1; }
                }

                .dashboard-top-grid { 
                    display: grid; 
                    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); 
                    gap: 40px; 
                    margin-bottom: 50px; 
                    animation: slideUp 0.8s ease-out;
                }
                @keyframes slideUp { from { transform: translateY(20px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
                
                .dashboard-top-block {
                    z-index: 1;
                    transition: all 0.3s ease;
                }
                .dashboard-top-block:hover {
                    z-index: 10;
                }
                
                .profile-summary { 
                    display: grid; 
                    grid-template-columns: 1fr; 
                    gap: 30px; 
                    margin-bottom: 50px; 
                    animation: slideUp 0.9s cubic-bezier(0.175, 0.885, 0.32, 1.275);
                }
                .services-page { padding: 20px 0; }
                .section-title { font-size: 2rem; margin-bottom: 10px; color: #333; }
                .section-subtitle { margin-bottom: 25px; color: #555; max-width: 720px; line-height: 1.6; }
                .services-grid { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 24px; margin-bottom: 25px; }
                .service-card { background: linear-gradient(145deg, rgba(255,255,255,0.96) 0%, rgba(249,249,251,0.98) 100%); border-radius: 24px; padding: 28px; box-shadow: 0 18px 45px rgba(0,0,0,0.08), inset 0 0 0 1px rgba(255,255,255,0.8); border: 1px solid rgba(230,230,230,0.9); transition: transform 0.35s cubic-bezier(0.22, 1, 0.36, 1), box-shadow 0.35s ease, background 0.35s ease; transform-style: preserve-3d; perspective: 1200px; position: relative; overflow: hidden; cursor: pointer; }
                .service-card::before {
                    content: '';
                    position: absolute;
                    inset: 0;
                    border-radius: 24px;
                    background: radial-gradient(circle at top left, rgba(255,240,200,0.35), transparent 36%), radial-gradient(circle at bottom right, rgba(244,143,177,0.25), transparent 30%);
                    pointer-events: none;
                    opacity: 1;
                }
                .service-card::after {
                    content: '';
                    position: absolute;
                    left: 50%;
                    top: 50%;
                    width: 180%;
                    height: 180%;
                    transform: translate(-50%, -50%) rotate(40deg);
                    background: radial-gradient(circle, rgba(255,255,255,0.35) 0%, rgba(255,255,255,0) 55%);
                    opacity: 0;
                    pointer-events: none;
                    transition: opacity 0.35s ease;
                }
                .service-card:hover {
                    transform: translateY(-16px) rotateX(6deg) rotateY(3deg) scale(1.035);
                    box-shadow: 0 32px 80px rgba(0,0,0,0.18);
                }
                .service-card:hover::after {
                    opacity: 1;
                }
                .service-card:hover .service-icon {
                    transform: translateZ(20px) scale(1.05);
                }
                .service-icon { font-size: 2.4rem; margin-bottom: 18px; display: inline-flex; align-items: center; justify-content: center; width: 56px; height: 56px; border-radius: 18px; background: linear-gradient(135deg, #fff7e6 0%, #fff1d6 100%); box-shadow: inset 0 0 0 1px rgba(251,192,45,0.15); transition: transform 0.35s ease; }
                .service-card h3 { margin: 0 0 10px 0; color: #1f1f1f; font-size: 1.2rem; transform: translateZ(12px); }
                .service-card p { margin: 0; color: #5a5a5a; line-height: 1.8; transform: translateZ(8px); }
                .service-note { background: #fff8e1; padding: 20px 25px; border-radius: 18px; border: 1px solid #ffe082; color: #6d4c41; }
                .services-grid .service-card { animation: floatIn 0.75s ease both; }
                .services-grid .service-card:nth-child(1) { animation-delay: 0s; }
                .services-grid .service-card:nth-child(2) { animation-delay: 0.08s; }
                .services-grid .service-card:nth-child(3) { animation-delay: 0.16s; }
                .services-grid .service-card:nth-child(4) { animation-delay: 0.24s; }
                .services-grid .service-card:nth-child(5) { animation-delay: 0.32s; }
                .services-grid .service-card:nth-child(6) { animation-delay: 0.4s; }
                @keyframes floatIn {
                    from { opacity: 0; transform: translateY(18px) scale(0.98); }
                    to { opacity: 1; transform: translateY(0) scale(1); }
                }

                .user-nav { display: flex; align-items: center; gap: 20px; }
                .wishlist-nav, .cart-nav { position: relative; }
                .wishlist-toggle, .cart-toggle { 
                    background: linear-gradient(135deg, #ff6b9d, #c44569); 
                    border: none; 
                    color: white; 
                    padding: 8px 14px; 
                    border-radius: 999px; 
                    cursor: pointer; 
                    font-weight: bold;
                    display: flex;
                    align-items: center;
                    gap: 6px;
                    box-shadow: 0 4px 10px rgba(255, 107, 157, 0.35);
                    transition: all 0.3s;
                }
                .wishlist-toggle:hover { 
                    transform: translateY(-2px); 
                    box-shadow: 0 6px 15px rgba(255, 107, 157, 0.4);
                }
                .wishlist-dropdown, .cart-dropdown {
                    position: absolute;
                    top: 100%;
                    right: 0;
                    background: white;
                    border-radius: 16px;
                    box-shadow: 0 16px 45px rgba(0,0,0,0.18);
                    width: 360px;
                    max-height: 460px;
                    overflow-y: auto;
                    z-index: 1000;
                    margin-top: 12px;
                    border: 2px solid #ff6b9d;
                    animation: dropdownSlide 0.28s ease-out;
                }
                .cart-dropdown {
                    border-color: #ffc107;
                }
                @keyframes dropdownSlide {
                    from { opacity: 0; transform: translateY(-10px) scale(0.95); }
                    to { opacity: 1; transform: translateY(0) scale(1); }
                }
                .wishlist-dropdown h4 {
                    margin: 0;
                    padding: 15px 20px;
                    background: linear-gradient(135deg, #ff6b9d, #c44569);
                    color: white;
                    border-radius: 13px 13px 0 0;
                    font-size: 1.1rem;
                }
                .empty-wishlist {
                    padding: 20px;
                    text-align: center;
                    color: #666;
                    font-style: italic;
                }
                .wishlist-items {
                    max-height: 250px;
                    overflow-y: auto;
                }
                .wishlist-item {
                    display: flex;
                    align-items: flex-start;
                    gap: 12px;
                    padding: 12px 15px;
                    border-bottom: 1px solid #f0f0f0;
                    transition: background 0.2s;
                }
                .wishlist-item:hover {
                    background: #fff5f7;
                }
                .wishlist-item:last-child {
                    border-bottom: none;
                }
                .wishlist-item-image {
                    width: 60px;
                    min-width: 60px;
                    height: 60px;
                    border-radius: 16px;
                    overflow: hidden;
                    flex-shrink: 0;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    background: #fafafa;
                }
                .wishlist-item-info {
                    flex: 1;
                    margin-right: 10px;
                }
                .wishlist-item-info h5 {
                    margin: 0 0 4px 0;
                    font-size: 0.9rem;
                    color: #333;
                }
                .wishlist-item-info p {
                    margin: 0;
                    font-size: 0.8rem;
                    color: #ff6b9d;
                    font-weight: bold;
                }
                .cart-item {
                    display: flex;
                    align-items: flex-start;
                    gap: 12px;
                    padding: 14px 16px;
                    border-bottom: 1px solid #f5f5f5;
                }
                .cart-item:last-child {
                    border-bottom: none;
                }
                .cart-item-image {
                    width: 72px;
                    min-width: 72px;
                    height: 72px;
                    border-radius: 16px;
                    overflow: hidden;
                    margin-right: 8px;
                    flex-shrink: 0;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    background: #fafafa;
                }
                .cart-item-image img,
                .wishlist-item-image img {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                }
                .cart-item-info {
                    flex: 1;
                    margin-right: 10px;
                }
                .cart-item-info h5 {
                    margin: 0 0 4px 0;
                    font-size: 0.9rem;
                    color: #333;
                }
                .cart-item-info p {
                    margin: 0;
                    font-size: 0.8rem;
                    color: #ff6b9d;
                    font-weight: bold;
                }
                .cart-quantity-control {
                    display: inline-flex;
                    gap: 8px;
                    align-items: center;
                    margin-top: 8px;
                }
                .cart-quantity-control button {
                    border: 1px solid #ff6b9d;
                    background: #fff;
                    color: #ff6b9d;
                    width: 28px;
                    height: 28px;
                    border-radius: 50%;
                    cursor: pointer;
                }
                .cart-quantity-control span {
                    min-width: 24px;
                    text-align: center;
                    font-weight: 700;
                }
                .remove-cart-btn {
                    background: #ff4757;
                    color: white;
                    border: none;
                    border-radius: 50%;
                    width: 25px;
                    height: 25px;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 16px;
                    transition: all 0.2s;
                    flex-shrink: 0;
                }
                .cart-summary {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding: 15px 18px;
                    border-top: 1px solid #f0f0f0;
                    background: #fff8e1;
                    border-radius: 0 0 14px 14px;
                    font-weight: 700;
                    color: #555;
                }
                .cart-total-price {
                    color: #d84315;
                    font-size: 1rem;
                }
                .remove-wishlist-btn {
                    background: #ff4757;
                    color: white;
                    border: none;
                    border-radius: 50%;
                    width: 25px;
                    height: 25px;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 16px;
                    transition: all 0.2s;
                    flex-shrink: 0;
                }
                .remove-wishlist-btn:hover {
                    background: #ff3838;
                    transform: scale(1.1);
                }
                .wishlist-item-actions {
                    display: flex;
                    gap: 8px;
                    align-items: center;
                }
                .wishlist-buy-btn {
                    background: linear-gradient(135deg, #ff6b9d, #c44569);
                    color: white;
                    border: none;
                    border-radius: 50%;
                    width: 30px;
                    height: 30px;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 14px;
                    transition: all 0.3s;
                    flex-shrink: 0;
                }
                .wishlist-buy-btn:hover {
                    transform: scale(1.1);
                    box-shadow: 0 4px 12px rgba(255, 107, 157, 0.3);
                }
                .view-all-wishlist-btn {
                    width: 100%;
                    background: linear-gradient(135deg, #ff6b9d, #c44569);
                    color: white;
                    border: none;
                    padding: 12px;
                    border-radius: 0 0 13px 13px;
                    cursor: pointer;
                    font-weight: bold;
                    transition: all 0.3s;
                }
                .view-all-wishlist-btn:hover {
                    background: linear-gradient(135deg, #c44569, #a04459);
                }
                .logout-btn { 
                    background: rgba(255, 255, 255, 0.2); border: none; padding: 8px 16px; border-radius: 20px; 
                    cursor: pointer; font-weight: 600; color: white;
                    box-shadow: 0 4px 0 rgba(0,0,0,0.1);
                }
                /* Services Page Styling */
                .services-page { padding: 40px 0; text-align: center; }
                .services-header { margin-bottom: 40px; }
                .section-title-pro { font-size: 2.2rem; color: #1a1a1a; margin-bottom: 10px; font-weight: 800; }
                .section-subtitle-pro { color: #888; font-size: 1rem; max-width: 600px; margin: 0 auto; line-height: 1.5; }
                
                .services-grid-pro { 
                    display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); 
                    gap: 25px; margin-bottom: 40px;
                }
                .service-card-pro { 
                    background: white; border: 1px solid #eee; border-radius: 25px;
                    padding: 30px; text-align: center; cursor: pointer;
                    transition: all 0.3s ease; box-shadow: 0 10px 20px rgba(0,0,0,0.02);
                }
                .service-card-pro:hover {
                    transform: translateY(-10px);
                    box-shadow: 0 20px 40px rgba(251, 192, 45, 0.1);
                    border-color: #fbc02d;
                }

                .service-icon-pro { font-size: 50px; margin-bottom: 15px; }
                .service-card-pro h3 { margin: 0 0 10px 0; color: #333; font-size: 1.25rem; }
                .service-card-pro p { margin: 0; color: #777; font-size: 0.9rem; line-height: 1.5; }
                
                .service-hint-pro {
                    margin-top: 20px; color: #fbc02d; font-weight: 700; font-size: 0.8rem;
                }

                .service-note-pro { 
                    background: #fffdf5; padding: 20px; border-radius: 20px; color: #444; 
                    font-weight: 500; border: 1px solid #fbc02d; display: inline-block;
                }

                .animate-fade-in-pro { animation: fadeIn 0.6s ease-out forwards; }
                @keyframes fadeIn { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
            `}</style>

            {affiliateModal.isOpen && (
                <AffiliateModal
                    product={affiliateModal.product}
                    onClose={closeAffiliateModal}
                />
            )}

            {serviceModal.isOpen && (
                    <ServiceModal 
                        service={serviceModal.service} 
                        onClose={closeServiceModal}
                        onTryService={handleTryService}
                    />
                )}
        </div>
    );
}

export default App;
