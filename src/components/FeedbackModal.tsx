'use client';

import React, { useState, useRef } from 'react';

type TabType = 'bug' | 'feature' | 'support';

interface FormData {
  name: string;
  salonName: string;
  email: string;
  message: string;
  screenshot: File | null;
}

const defaultForm: FormData = {
  name: '',
  salonName: '',
  email: '',
  message: '',
  screenshot: null,
};

export default function FeedbackModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<TabType>('bug');
  const [formData, setFormData] = useState<FormData>(defaultForm);
  const [submitted, setSubmitted] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const tabs: { id: TabType; label: string; icon: string; description: string }[] = [
    { id: 'bug', label: 'Report Bug', icon: '🐛', description: 'Found something broken? Let us know.' },
    { id: 'feature', label: 'Request Feature', icon: '✨', description: 'Have an idea? We\'d love to hear it.' },
    { id: 'support', label: 'Contact Support', icon: '💬', description: 'Need help? We\'re here for you.' },
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleFileChange = (file: File | null) => {
    if (file && file.type.startsWith('image/')) {
      setFormData(prev => ({ ...prev, screenshot: file }));
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    handleFileChange(file);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData(defaultForm);
      setIsOpen(false);
    }, 2500);
  };

  const handleClose = () => {
    setIsOpen(false);
    setSubmitted(false);
    setFormData(defaultForm);
  };

  const tabConfig = {
    bug: { placeholder: 'Describe the bug — what happened and what you expected instead...', label: 'Bug Description' },
    feature: { placeholder: 'Describe the feature you\'d like — how would it help your salon?', label: 'Feature Description' },
    support: { placeholder: 'How can we help you today?', label: 'Your Message' },
  };

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 flex items-center gap-2 px-4 py-3 rounded-full shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105 active:scale-95"
        style={{ backgroundColor: '#1F3D2B', color: '#F6F4EF' }}
        aria-label="Open Help and Feedback"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
          <line x1="12" y1="17" x2="12.01" y2="17" />
        </svg>
        <span className="text-sm font-semibold tracking-wide">Help / Feedback</span>
      </button>

      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4"
          style={{ backgroundColor: 'rgba(31, 61, 43, 0.45)', backdropFilter: 'blur(4px)' }}
          onClick={handleClose}
        >
          {/* Modal */}
          <div
            className="relative w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden"
            style={{ backgroundColor: '#F6F4EF', maxHeight: '90vh' }}
            onClick={e => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b" style={{ borderColor: '#DDD6CC', backgroundColor: '#EEEAE3' }}>
              <div>
                <h2 className="text-lg font-bold" style={{ color: '#1F3D2B' }}>Help &amp; Feedback</h2>
                <p className="text-xs mt-0.5" style={{ color: '#6B6B6B' }}>ManageMySalon Beta Support</p>
              </div>
              <button
                onClick={handleClose}
                className="w-8 h-8 flex items-center justify-center rounded-full transition-colors hover:opacity-80"
                style={{ backgroundColor: '#DDD6CC', color: '#2A2A2A' }}
                aria-label="Close modal"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                  <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>

            {/* Tabs */}
            <div className="flex gap-1 px-4 pt-4 pb-2">
              {tabs.map(tab => (
                <button
                  key={tab.id}
                  onClick={() => { setActiveTab(tab.id); setSubmitted(false); }}
                  className="flex-1 flex flex-col items-center gap-1 py-2.5 px-2 rounded-xl text-xs font-semibold transition-all duration-200"
                  style={{
                    backgroundColor: activeTab === tab.id ? '#1F3D2B' : '#EEEAE3',
                    color: activeTab === tab.id ? '#F6F4EF' : '#6B6B6B',
                    boxShadow: activeTab === tab.id ? '0 2px 8px rgba(31,61,43,0.25)' : 'none',
                  }}
                >
                  <span className="text-base">{tab.icon}</span>
                  <span className="leading-tight text-center">{tab.label}</span>
                </button>
              ))}
            </div>

            {/* Scrollable Content */}
            <div className="overflow-y-auto px-6 pb-6" style={{ maxHeight: 'calc(90vh - 180px)' }}>
              {/* Tab Description */}
              <p className="text-xs mb-4 mt-2" style={{ color: '#6B6B6B' }}>
                {tabs.find(t => t.id === activeTab)?.description}
              </p>

              {submitted ? (
                <div className="flex flex-col items-center justify-center py-10 gap-3">
                  <div className="w-14 h-14 rounded-full flex items-center justify-center" style={{ backgroundColor: '#3F6F52' }}>
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#F6F4EF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </div>
                  <p className="text-base font-bold" style={{ color: '#1F3D2B' }}>Message Sent!</p>
                  <p className="text-sm text-center" style={{ color: '#6B6B6B' }}>Thanks for reaching out. We'll get back to you shortly.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Name + Salon Name */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold mb-1.5" style={{ color: '#2A2A2A' }}>
                        Name <span style={{ color: '#C9A44C' }}>*</span>
                      </label>
                      <input
                        type="text"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Your name"
                        className="w-full px-3 py-2.5 rounded-xl text-sm outline-none transition-all border"
                        style={{ backgroundColor: '#EEEAE3', borderColor: '#DDD6CC', color: '#2A2A2A' }}
                        onFocus={e => { e.target.style.borderColor = '#3F6F52'; e.target.style.boxShadow = '0 0 0 3px rgba(63,111,82,0.12)'; }}
                        onBlur={e => { e.target.style.borderColor = '#DDD6CC'; e.target.style.boxShadow = 'none'; }}
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold mb-1.5" style={{ color: '#2A2A2A' }}>
                        Salon Name <span style={{ color: '#C9A44C' }}>*</span>
                      </label>
                      <input
                        type="text"
                        name="salonName"
                        required
                        value={formData.salonName}
                        onChange={handleChange}
                        placeholder="Your salon"
                        className="w-full px-3 py-2.5 rounded-xl text-sm outline-none transition-all border"
                        style={{ backgroundColor: '#EEEAE3', borderColor: '#DDD6CC', color: '#2A2A2A' }}
                        onFocus={e => { e.target.style.borderColor = '#3F6F52'; e.target.style.boxShadow = '0 0 0 3px rgba(63,111,82,0.12)'; }}
                        onBlur={e => { e.target.style.borderColor = '#DDD6CC'; e.target.style.boxShadow = 'none'; }}
                      />
                    </div>
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-xs font-semibold mb-1.5" style={{ color: '#2A2A2A' }}>
                      Email <span style={{ color: '#C9A44C' }}>*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="you@example.com"
                      className="w-full px-3 py-2.5 rounded-xl text-sm outline-none transition-all border"
                      style={{ backgroundColor: '#EEEAE3', borderColor: '#DDD6CC', color: '#2A2A2A' }}
                      onFocus={e => { e.target.style.borderColor = '#3F6F52'; e.target.style.boxShadow = '0 0 0 3px rgba(63,111,82,0.12)'; }}
                      onBlur={e => { e.target.style.borderColor = '#DDD6CC'; e.target.style.boxShadow = 'none'; }}
                    />
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-xs font-semibold mb-1.5" style={{ color: '#2A2A2A' }}>
                      {tabConfig[activeTab].label} <span style={{ color: '#C9A44C' }}>*</span>
                    </label>
                    <textarea
                      name="message"
                      required
                      value={formData.message}
                      onChange={handleChange}
                      placeholder={tabConfig[activeTab].placeholder}
                      rows={4}
                      className="w-full px-3 py-2.5 rounded-xl text-sm outline-none transition-all border resize-none"
                      style={{ backgroundColor: '#EEEAE3', borderColor: '#DDD6CC', color: '#2A2A2A' }}
                      onFocus={e => { e.target.style.borderColor = '#3F6F52'; e.target.style.boxShadow = '0 0 0 3px rgba(63,111,82,0.12)'; }}
                      onBlur={e => { e.target.style.borderColor = '#DDD6CC'; e.target.style.boxShadow = 'none'; }}
                    />
                  </div>

                  {/* Screenshot Upload */}
                  <div>
                    <label className="block text-xs font-semibold mb-1.5" style={{ color: '#2A2A2A' }}>
                      Screenshot <span style={{ color: '#6B6B6B', fontWeight: 400 }}>(optional)</span>
                    </label>
                    <div
                      className="rounded-xl border-2 border-dashed p-4 text-center cursor-pointer transition-all"
                      style={{
                        borderColor: dragOver ? '#3F6F52' : '#DDD6CC',
                        backgroundColor: dragOver ? 'rgba(63,111,82,0.06)' : '#EEEAE3',
                      }}
                      onDragOver={e => { e.preventDefault(); setDragOver(true); }}
                      onDragLeave={() => setDragOver(false)}
                      onDrop={handleDrop}
                      onClick={() => fileInputRef.current?.click()}
                    >
                      {formData.screenshot ? (
                        <div className="flex items-center justify-center gap-2">
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#3F6F52" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <rect x="3" y="3" width="18" height="18" rx="2" /><circle cx="8.5" cy="8.5" r="1.5" /><polyline points="21 15 16 10 5 21" />
                          </svg>
                          <span className="text-xs font-medium" style={{ color: '#3F6F52' }}>{formData.screenshot.name}</span>
                          <button
                            type="button"
                            onClick={e => { e.stopPropagation(); setFormData(prev => ({ ...prev, screenshot: null })); }}
                            className="text-xs ml-1 hover:opacity-70"
                            style={{ color: '#6B6B6B' }}
                          >✕</button>
                        </div>
                      ) : (
                        <div className="flex flex-col items-center gap-1">
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#6B6B6B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                            <rect x="3" y="3" width="18" height="18" rx="2" /><circle cx="8.5" cy="8.5" r="1.5" /><polyline points="21 15 16 10 5 21" />
                          </svg>
                          <p className="text-xs" style={{ color: '#6B6B6B' }}>
                            <span className="font-semibold" style={{ color: '#3F6F52' }}>Click to upload</span> or drag &amp; drop
                          </p>
                          <p className="text-xs" style={{ color: '#6B6B6B' }}>PNG, JPG, GIF up to 5MB</p>
                        </div>
                      )}
                    </div>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={e => handleFileChange(e.target.files?.[0] ?? null)}
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="w-full py-3 rounded-xl text-sm font-bold transition-all duration-200 hover:opacity-90 active:scale-95"
                    style={{ backgroundColor: '#1F3D2B', color: '#F6F4EF', boxShadow: '0 4px 14px rgba(31,61,43,0.3)' }}
                  >
                    Send {tabs.find(t => t.id === activeTab)?.label}
                  </button>
                </form>
              )}

              {/* Divider */}
              <div className="flex items-center gap-3 my-5">
                <div className="flex-1 h-px" style={{ backgroundColor: '#DDD6CC' }} />
                <span className="text-xs font-medium" style={{ color: '#6B6B6B' }}>or reach us directly</span>
                <div className="flex-1 h-px" style={{ backgroundColor: '#DDD6CC' }} />
              </div>

              {/* Direct Contact Options */}
              <div className="grid grid-cols-2 gap-3">
                {/* WhatsApp */}
                <a
                  href="https://wa.me/919999999999?text=Hi%2C%20I%20need%20support%20with%20ManageMySalon"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 px-4 py-3 rounded-xl transition-all duration-200 hover:opacity-90 hover:scale-[1.02]"
                  style={{ backgroundColor: '#25D366', color: '#fff', boxShadow: '0 2px 8px rgba(37,211,102,0.3)' }}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  <div>
                    <p className="text-xs font-bold leading-tight">WhatsApp</p>
                    <p className="text-xs opacity-80 leading-tight">Chat with us</p>
                  </div>
                </a>

                {/* Email */}
                <a
                  href="mailto:hello@managemysalon.in?subject=Support%20Request"
                  className="flex items-center gap-2.5 px-4 py-3 rounded-xl transition-all duration-200 hover:opacity-90 hover:scale-[1.02]"
                  style={{ backgroundColor: '#EEEAE3', color: '#1F3D2B', border: '1px solid #DDD6CC' }}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <polyline points="22,6 12,13 2,6" />
                  </svg>
                  <div>
                    <p className="text-xs font-bold leading-tight">Email Us</p>
                    <p className="text-xs leading-tight" style={{ color: '#6B6B6B' }}>hello@managemysalon.in</p>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
