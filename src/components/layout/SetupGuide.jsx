import React, { useState } from 'react';
import {
  X,
  Maximize2,
  ArrowRight,
  ChevronUp,
  ChevronDown,
  Check,
  Circle,
} from 'lucide-react';
import './SetupGuide.css';
import { WelcomeModal } from './WelcomeModal';

export const SetupGuide = ({ isOpen, onClose }) => {
  const [expandedSection, setExpandedSection] = useState('verify');
  const [showWelcomeModal, setShowWelcomeModal] = useState(false);

  const toggleSection = (section) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  if (!isOpen) return null;

  return (
    <>
      <div className="setup-guide-popup">
        {/* Header */}
        <div className="setup-guide-header">
          <h3 className="setup-guide-title">Setup guide</h3>
          <div className="setup-guide-actions">
            <button className="setup-guide-action-btn" aria-label="Expand">
              <Maximize2 className="w-4 h-4" />
            </button>
            <button className="setup-guide-action-btn" onClick={onClose} aria-label="Close">
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="setup-guide-progress">
          <div className="setup-guide-progress-bar">
            <div className="setup-guide-progress-fill" style={{ width: '50%' }}></div>
          </div>
        </div>

        {/* Content */}
        <div className="setup-guide-content">
          {/* Customize your setup */}
          <div className="setup-guide-item">
            <button 
              className="setup-guide-item-header clickable"
              onClick={() => setShowWelcomeModal(true)}
            >
              <span className="setup-guide-item-title">Customize your setup</span>
              <div className="setup-guide-arrow-btn">
                <ArrowRight className="w-4 h-4" />
              </div>
            </button>
          </div>

        {/* Verify your business - Accordion */}
        <div className="setup-guide-item accordion">
          <button 
            className="setup-guide-item-header clickable"
            onClick={() => toggleSection('verify')}
          >
            <span className="setup-guide-item-title">Verify your business</span>
            {expandedSection === 'verify' ? (
              <ChevronUp className="w-4 h-4 text-gray-400" />
            ) : (
              <ChevronDown className="w-4 h-4 text-gray-400" />
            )}
          </button>
          
          {expandedSection === 'verify' && (
            <div className="setup-guide-subitems">
              <div className="setup-guide-subitem completed">
                <div className="setup-guide-check-icon completed">
                  <Check className="w-3 h-3" />
                </div>
                <span>Verify your email</span>
              </div>
              <div className="setup-guide-subitem">
                <div className="setup-guide-check-icon">
                  <Circle className="w-3 h-3" />
                </div>
                <span>Complete your profile</span>
              </div>
            </div>
          )}
        </div>

      </div>
    </div>

      {/* Welcome Modal */}
      <WelcomeModal 
        isOpen={showWelcomeModal} 
        onClose={() => setShowWelcomeModal(false)} 
      />
    </>
  );
};

