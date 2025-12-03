import React, { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import './WelcomeModal.css';

export const WelcomeModal = ({ isOpen, onClose }) => {
  const [step, setStep] = useState(1);
  const [businessName, setBusinessName] = useState('');
  const [businessWebsite, setBusinessWebsite] = useState('');
  const [selectedOptions, setSelectedOptions] = useState([]);

  if (!isOpen) return null;

  const handleContinue = () => {
    if (step === 1) {
      setStep(2);
    } else if (step === 2) {
      setStep(3);
    } else {
      // Final step - close modal
      onClose();
      setStep(1); // Reset for next time
    }
  };

  const handleBack = () => {
    if (step === 2) {
      setStep(1);
    } else if (step === 3) {
      setStep(2);
    }
  };

  const handleSkip = () => {
    if (step === 1) {
      setStep(2);
    } else if (step === 2) {
      setStep(3);
    } else {
      onClose();
      setStep(1);
    }
  };

  const handleGoToSandbox = () => {
    onClose();
    setStep(1);
    // Navigate to sandbox or perform action
  };

  const handleGoToLiveAccount = () => {
    onClose();
    setStep(1);
    // Navigate to live account
  };

  const toggleOption = (option) => {
    setSelectedOptions(prev => 
      prev.includes(option) 
        ? prev.filter(o => o !== option)
        : [...prev, option]
    );
  };

  const paymentOptions = [
    {
      id: 'non-recurring',
      title: 'Non-recurring payments',
      description: 'Accept payments for products and services using a checkout page or invoices.',
    },
    {
      id: 'recurring',
      title: 'Recurring payments',
      description: 'Offer subscriptions and bill customers for ongoing usage and services.',
    },
  ];

  const platformOption = {
    id: 'platform',
    title: 'Build a platform or marketplace',
    description: 'Use Connect to enable money movement between multiple parties.',
  };

  return (
    <div className="welcome-modal-overlay" onClick={onClose}>
      <div className="welcome-modal" onClick={(e) => e.stopPropagation()}>
        {/* Left Content */}
        <div className="welcome-modal-left">
          {/* Scrollable Content */}
          <div className="welcome-content-wrapper">
            {step === 1 && (
              <>
                <h1 className="welcome-title">Welcome to Xperty</h1>
                <p className="welcome-description">
                  Answer a few questions about your business to customize your setup. You can always change this later.
                </p>

                <div className="welcome-form">
                  <div className="welcome-form-group">
                    <label className="welcome-label">Business name</label>
                    <input
                      type="text"
                      className="welcome-input"
                      value={businessName}
                      onChange={(e) => setBusinessName(e.target.value)}
                      placeholder=""
                    />
                  </div>

                  <div className="welcome-form-group">
                    <label className="welcome-label">
                      Business website <span className="welcome-optional">(optional)</span>
                    </label>
                    <p className="welcome-helper">Your website helps us make setup recommendations for you.</p>
                    <input
                      type="text"
                      className="welcome-input"
                      value={businessWebsite}
                      onChange={(e) => setBusinessWebsite(e.target.value)}
                      placeholder=""
                    />
                  </div>
                </div>
              </>
            )}

            {step === 2 && (
              <>
                <button className="welcome-back-btn" onClick={handleBack}>
                  <ArrowLeft className="w-4 h-4" />
                  Back
                </button>
                
                <h1 className="welcome-title">How do you want to start?</h1>
                <p className="welcome-description">
                  You can add other features later if you need them.
                </p>

                <div className="welcome-options">
                  {paymentOptions.map((option) => (
                    <label key={option.id} className="welcome-option">
                      <input
                        type="checkbox"
                        checked={selectedOptions.includes(option.id)}
                        onChange={() => toggleOption(option.id)}
                      />
                      <div className="welcome-option-checkbox">
                        {selectedOptions.includes(option.id) && (
                          <svg viewBox="0 0 12 12" fill="none">
                            <path d="M2 6L5 9L10 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        )}
                      </div>
                      <div className="welcome-option-content">
                        <span className="welcome-option-title">{option.title}</span>
                        <span className="welcome-option-description">{option.description}</span>
                      </div>
                    </label>
                  ))}

                  <p className="welcome-options-divider">Includes tools for onboarding and verifying seller identity</p>

                  <label className="welcome-option">
                    <input
                      type="checkbox"
                      checked={selectedOptions.includes(platformOption.id)}
                      onChange={() => toggleOption(platformOption.id)}
                    />
                    <div className="welcome-option-checkbox">
                      {selectedOptions.includes(platformOption.id) && (
                        <svg viewBox="0 0 12 12" fill="none">
                          <path d="M2 6L5 9L10 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      )}
                    </div>
                    <div className="welcome-option-content">
                      <span className="welcome-option-title">{platformOption.title}</span>
                      <span className="welcome-option-description">{platformOption.description}</span>
                    </div>
                  </label>
                </div>
              </>
            )}

            {step === 3 && (
              <>
                <button className="welcome-back-btn" onClick={handleBack}>
                  <ArrowLeft className="w-4 h-4" />
                  Back
                </button>
                
                <h1 className="welcome-title">Get started in your sandbox</h1>
                <p className="welcome-description">
                  Your sandbox is a safe environment for testing. You can try out features without any real money movement.
                </p>

                <div className="sandbox-steps">
                  <div className="sandbox-step">
                    <div className="sandbox-step-number">1</div>
                    <div className="sandbox-step-line"></div>
                    <div className="sandbox-step-content">
                      <span className="sandbox-step-title">Complete your setup</span>
                      <span className="sandbox-step-description">Follow the steps in your setup guide to explore features that fit your business needs.</span>
                    </div>
                  </div>

                  <div className="sandbox-step">
                    <div className="sandbox-step-number">2</div>
                    <div className="sandbox-step-line"></div>
                    <div className="sandbox-step-content">
                      <span className="sandbox-step-title">Switch to live account</span>
                      <span className="sandbox-step-description">When you're ready to go live, answer some questions to verify your business.</span>
                    </div>
                  </div>

                  <div className="sandbox-step last">
                    <div className="sandbox-step-number">3</div>
                    <div className="sandbox-step-content">
                      <span className="sandbox-step-title">You're ready to go</span>
                      <span className="sandbox-step-description">Copy your work to your live account and start accepting payments.</span>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Fixed Actions at Bottom */}
          {step !== 3 ? (
            <div className="welcome-actions">
              <button className="welcome-skip-btn" onClick={handleSkip}>
                Skip for now
              </button>
              <button className="welcome-continue-btn" onClick={handleContinue}>
                Continue
              </button>
            </div>
          ) : (
            <div className="welcome-actions-sandbox">
              <button className="welcome-sandbox-btn" onClick={handleGoToSandbox}>
                Go to sandbox
              </button>
              <button className="welcome-live-btn" onClick={handleGoToLiveAccount}>
                Go to my live account now
              </button>
            </div>
          )}
        </div>

        {/* Right Preview */}
        <div className={`welcome-modal-right ${step === 3 ? 'sandbox-preview' : ''}`}>
          {step !== 3 ? (
            <div className="welcome-preview">
              <div className="preview-card">
                <div className="preview-logo">
                  <div className="preview-logo-box"></div>
                  <span className="preview-business-name">
                    {businessName || 'New business'}
                  </span>
                </div>
                <div className="preview-website">
                  <span className="preview-dot"></span>
                  <span>{businessWebsite || 'www.example.com'}</span>
                </div>
                <div className="preview-checkout-box"></div>
              </div>
              <div className="preview-xperty-logo">xperty</div>
            </div>
          ) : (
            <div className="sandbox-preview-content">
              {/* Sandbox Header */}
              <div className="sandbox-header">
                <span>Sandbox</span>
              </div>
              
              {/* Sandbox Dashboard Preview */}
              <div className="sandbox-dashboard">
                <div className="sandbox-sidebar">
                  <div className="sandbox-business-row">
                    <div className="sandbox-business-icon"></div>
                    <span>New business</span>
                  </div>
                  <div className="sandbox-menu-items">
                    <div className="sandbox-menu-bar"></div>
                    <div className="sandbox-menu-bar short"></div>
                    <div className="sandbox-menu-bar"></div>
                  </div>
                  <div className="sandbox-products-label">Products</div>
                  <div className="sandbox-menu-items">
                    <div className="sandbox-menu-bar colored"></div>
                    <div className="sandbox-menu-bar"></div>
                  </div>
                </div>
                <div className="sandbox-main">
                  <div className="sandbox-chart-bars">
                    <div className="sandbox-bar" style={{height: '60%'}}></div>
                    <div className="sandbox-bar" style={{height: '80%'}}></div>
                    <div className="sandbox-bar" style={{height: '40%'}}></div>
                    <div className="sandbox-bar" style={{height: '70%'}}></div>
                    <div className="sandbox-bar" style={{height: '50%'}}></div>
                  </div>
                  <div className="sandbox-line-chart">
                    <svg viewBox="0 0 100 40" className="sandbox-line-svg">
                      <path d="M0,30 Q20,35 40,25 T80,20 T100,15" fill="none" stroke="rgba(168,85,247,0.5)" strokeWidth="2"/>
                      <path d="M0,35 Q25,30 50,28 T100,20" fill="none" stroke="rgba(236,72,153,0.3)" strokeWidth="2"/>
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

