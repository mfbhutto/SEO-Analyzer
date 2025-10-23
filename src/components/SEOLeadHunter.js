import React, { useState, useEffect } from 'react';
import { Search, Download, Trash2, Eye, Copy, CheckCircle, AlertCircle } from 'lucide-react';

const SEOLeadHunter = () => {
  const [selectedNiche, setSelectedNiche] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [customCity, setCustomCity] = useState('');
  const [leads, setLeads] = useState([]);
  const [currentQueries, setCurrentQueries] = useState([]);
  const [copied, setCopied] = useState(null);
  const [searchHistory, setSearchHistory] = useState([]);

  // Load data from localStorage on mount
  useEffect(() => {
    loadFromStorage();
  }, []);

  // Save to localStorage whenever leads or history changes
  useEffect(() => {
    saveToStorage();
  }, [leads, searchHistory]);

  const loadFromStorage = () => {
    try {
      const leadsData = localStorage.getItem('seo-leads');
      const historyData = localStorage.getItem('seo-search-history');
      
      if (leadsData) {
        setLeads(JSON.parse(leadsData));
      }
      if (historyData) {
        setSearchHistory(JSON.parse(historyData));
      }
    } catch (error) {
      console.log('No stored data found, starting fresh');
    }
  };

  const saveToStorage = () => {
    try {
      if (leads.length > 0) {
        localStorage.setItem('seo-leads', JSON.stringify(leads));
      }
      if (searchHistory.length > 0) {
        localStorage.setItem('seo-search-history', JSON.stringify(searchHistory));
      }
    } catch (error) {
      console.error('Error saving to storage:', error);
    }
  };

  const niches = {
    'roofing': {
      name: '🏠 Local Roofing Services',
      keywords: [
        'roofing',
        'roof repair',
        'roofing contractors',
        'roof replacement',
        'roofing company',
        'roof inspection',
        'roofing services',
        'commercial roofing',
        'residential roofing',
        'emergency roof repair'
      ],
      painPoint: 'High competition, customers search "emergency roof repair near me"'
    },
    'tutoring': {
      name: '📚 Private Tutors / Coaching',
      keywords: [
        'tutoring center',
        'private tutor',
        'math tutoring',
        'SAT prep',
        'ACT tutoring',
        'test prep center',
        'reading tutor',
        'science tutoring',
        'homework help',
        'learning center'
      ],
      painPoint: 'Parents search online first, referrals aren\'t enough'
    },
    'dental': {
      name: '🦷 Dental Clinics',
      keywords: [
        'dental clinic',
        'dentist',
        'family dentist',
        'cosmetic dentist',
        'emergency dentist',
        'pediatric dentist',
        'teeth whitening',
        'dental implants',
        'orthodontist',
        'invisalign'
      ],
      painPoint: 'Local searches drive 80% of new patients'
    },
    'pet': {
      name: '🐕 Pet Grooming & Veterinary',
      keywords: [
        'pet grooming',
        'dog grooming',
        'veterinary clinic',
        'animal hospital',
        'mobile pet grooming',
        'pet spa',
        'emergency vet',
        'dog boarding',
        'pet daycare',
        'dog training'
      ],
      painPoint: 'Pet owners book online, reviews matter hugely'
    },
    'realestate': {
      name: '🏡 Real Estate Agents',
      keywords: [
        'real estate agent',
        'realtor',
        'homes for sale',
        'buyer\'s agent',
        'listing agent',
        'property listings',
        'first time homebuyer',
        'luxury homes',
        'investment property',
        'commercial real estate'
      ],
      painPoint: 'Buyers research online before calling agents'
    },
    'construction': {
      name: '🔨 Construction Contractors',
      keywords: [
        'construction company',
        'general contractor',
        'home builder',
        'remodeling contractor',
        'commercial construction',
        'kitchen remodel',
        'bathroom renovation',
        'home addition',
        'deck builder',
        'custom home builder'
      ],
      painPoint: 'Commercial clients vet contractors online first'
    },
    'photography': {
      name: '📸 Wedding Photographers',
      keywords: [
        'wedding photographer',
        'wedding photography',
        'bridal photographer',
        'engagement photos',
        'destination wedding photographer',
        'elopement photographer',
        'fine art wedding',
        'documentary wedding',
        'luxury wedding photographer',
        'outdoor wedding photography'
      ],
      painPoint: 'Couples spend 10+ hours researching photographers'
    },
    'restaurant': {
      name: '🍽️ Local Restaurants',
      keywords: [
        'restaurant',
        'family restaurant',
        'fine dining',
        'Italian restaurant',
        'Mexican restaurant',
        'steakhouse',
        'seafood restaurant',
        'sushi restaurant',
        'breakfast cafe',
        'brunch restaurant'
      ],
      painPoint: '"Restaurants near me" searched 100M+ times monthly'
    },
    'lawfirm': {
      name: '⚖️ Law Firms',
      keywords: [
        'personal injury lawyer',
        'car accident attorney',
        'family law attorney',
        'divorce lawyer',
        'criminal defense attorney',
        'DUI lawyer',
        'estate planning attorney',
        'bankruptcy lawyer',
        'workers compensation lawyer',
        'medical malpractice attorney'
      ],
      painPoint: 'Clients research extensively before hiring'
    },
    'nonprofit': {
      name: '💚 NGOs & Charities',
      keywords: [
        'nonprofit organization',
        'charity',
        'animal rescue',
        'food bank',
        'homeless shelter',
        'youth program',
        'environmental nonprofit',
        'health nonprofit',
        'education foundation',
        'community center'
      ],
      painPoint: 'Donors and volunteers find them via search'
    }
  };

  const cities = [
    'Dallas', 'Houston', 'Austin', 'San Antonio', 'Phoenix', 'Miami', 'Orlando',
    'Los Angeles', 'San Diego', 'San Francisco', 'Chicago', 'Seattle', 'Portland',
    'Denver', 'Atlanta', 'Boston', 'Philadelphia', 'Nashville', 'Charlotte',
    'Indianapolis', 'Jacksonville', 'Fort Worth', 'Columbus', 'Memphis'
  ];

  const baseExclusions = '-filetype:pdf -filetype:doc -filetype:docx -filetype:ppt -filetype:pptx -filetype:xls -filetype:xlsx -filetype:txt -site:facebook.com -site:yelp.com -site:linkedin.com -site:yellowpages.com -site:bbb.org';

  const generateQueries = () => {
    if (!selectedNiche) {
      alert('Please select a niche first!');
      return;
    }

    const cityToUse = customCity.trim() || selectedCity;
    if (!cityToUse) {
      alert('Please select or enter a city!');
      return;
    }

    const niche = niches[selectedNiche];
    const queries = niche.keywords.map(keyword => {
      return `"${keyword}" "${cityToUse}" inurl:wp-content ${baseExclusions}`;
    });

    setCurrentQueries(queries);

    // Add to search history
    const historyEntry = {
      id: Date.now(),
      niche: niche.name,
      city: cityToUse,
      date: new Date().toLocaleString(),
      queryCount: queries.length
    };
    setSearchHistory([historyEntry, ...searchHistory.slice(0, 19)]); // Keep last 20
  };

  const copyQuery = (query, index) => {
    navigator.clipboard.writeText(query);
    setCopied(index);
    setTimeout(() => setCopied(null), 2000);
  };

  const copyAllQueries = () => {
    const allQueries = currentQueries.join('\n\n');
    navigator.clipboard.writeText(allQueries);
    setCopied('all');
    setTimeout(() => setCopied(null), 2000);
  };

  const openInGoogle = (query) => {
    const googleUrl = `https://www.google.com/search?q=${encodeURIComponent(query)}`;
    window.open(googleUrl, '_blank');
  };

  const addLead = () => {
    const newLead = {
      id: Date.now(),
      date: new Date().toLocaleDateString(),
      business: '',
      niche: niches[selectedNiche]?.name || '',
      city: customCity.trim() || selectedCity,
      website: '',
      contact: '',
      email: '',
      seoScore: '',
      pageSpeed: '',
      issues: '',
      status: 'New',
      notes: ''
    };
    setLeads([newLead, ...leads]);
  };

  const updateLead = (id, field, value) => {
    setLeads(leads.map(lead => 
      lead.id === id ? { ...lead, [field]: value } : lead
    ));
  };

  const deleteLead = (id) => {
    if (confirm('Delete this lead?')) {
      setLeads(leads.filter(lead => lead.id !== id));
    }
  };

  const exportLeads = () => {
    const csv = [
      ['Date', 'Business', 'Niche', 'City', 'Website', 'Contact', 'Email', 'SEO Score', 'Page Speed', 'Issues', 'Status', 'Notes'].join(','),
      ...leads.map(lead => [
        lead.date,
        lead.business,
        lead.niche,
        lead.city,
        lead.website,
        lead.contact,
        lead.email,
        lead.seoScore,
        lead.pageSpeed,
        lead.issues,
        lead.status,
        lead.notes
      ].map(field => `"${field}"`).join(','))
    ].join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `seo-leads-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
  };

  const clearAllData = () => {
    if (confirm('⚠️ This will delete ALL leads and search history. Are you sure?')) {
      setLeads([]);
      setSearchHistory([]);
      setCurrentQueries([]);
      try {
        localStorage.removeItem('seo-leads');
        localStorage.removeItem('seo-search-history');
      } catch (error) {
        console.error('Error clearing storage:', error);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-6">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">🎯 SEO Lead Hunter</h1>
          <p className="text-gray-600">Generate targeted Google search queries for any niche + city combo</p>
        </div>

        {/* Main Controls */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-6">
          <div className="grid md:grid-cols-3 gap-6 mb-6">
            {/* Niche Selection */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                1. Select Niche
              </label>
              <select
                value={selectedNiche}
                onChange={(e) => setSelectedNiche(e.target.value)}
                className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
              >
                <option value="">Choose a niche...</option>
                {Object.keys(niches).map(key => (
                  <option key={key} value={key}>{niches[key].name}</option>
                ))}
              </select>
              {selectedNiche && (
                <p className="mt-2 text-xs text-gray-500">
                  💡 {niches[selectedNiche].painPoint}
                </p>
              )}
            </div>

            {/* City Selection */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                2. Select City
              </label>
              <select
                value={selectedCity}
                onChange={(e) => {
                  setSelectedCity(e.target.value);
                  setCustomCity('');
                }}
                className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
              >
                <option value="">Choose a city...</option>
                {cities.map(city => (
                  <option key={city} value={city}>{city}</option>
                ))}
              </select>
              <p className="mt-2 text-xs text-gray-500">OR enter custom city below</p>
            </div>

            {/* Custom City */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Custom City (Optional)
              </label>
              <input
                type="text"
                value={customCity}
                onChange={(e) => {
                  setCustomCity(e.target.value);
                  setSelectedCity('');
                }}
                placeholder="e.g., Brooklyn, Manhattan..."
                className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
              />
            </div>
          </div>

          {/* Generate Button */}
          <button
            onClick={generateQueries}
            className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-4 rounded-lg font-bold text-lg hover:from-blue-700 hover:to-indigo-700 transition-all transform hover:scale-105 shadow-lg"
          >
            <Search className="inline mr-2" size={24} />
            Generate Search Queries
          </button>
        </div>

        {/* Generated Queries */}
        {currentQueries.length > 0 && (
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-gray-800">
                📋 Generated Queries ({currentQueries.length})
              </h2>
              <button
                onClick={copyAllQueries}
                className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-all flex items-center gap-2"
              >
                {copied === 'all' ? <CheckCircle size={18} /> : <Copy size={18} />}
                {copied === 'all' ? 'Copied!' : 'Copy All'}
              </button>
            </div>

            <div className="space-y-3 max-h-96 overflow-y-auto">
              {currentQueries.map((query, index) => (
                <div key={index} className="bg-gray-50 p-4 rounded-lg border border-gray-200 flex justify-between items-start gap-3">
                  <div className="flex-1">
                    <span className="text-xs font-semibold text-blue-600 mb-1 block">Query #{index + 1}</span>
                    <code className="text-sm text-gray-700 break-all">{query}</code>
                  </div>
                  <div className="flex gap-2 flex-shrink-0">
                    <button
                      onClick={() => copyQuery(query, index)}
                      className="bg-blue-500 text-white px-3 py-2 rounded hover:bg-blue-600 transition-all"
                      title="Copy query"
                    >
                      {copied === index ? <CheckCircle size={16} /> : <Copy size={16} />}
                    </button>
                    <button
                      onClick={() => openInGoogle(query)}
                      className="bg-indigo-500 text-white px-3 py-2 rounded hover:bg-indigo-600 transition-all"
                      title="Open in Google"
                    >
                      <Eye size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
              <p className="text-sm text-blue-800">
                <strong>💡 Pro Tip:</strong> Click <Eye className="inline" size={14} /> to open any query directly in Google, 
                then copy website URLs into the leads tracker below!
              </p>
            </div>
          </div>
        )}

        {/* Search History */}
        {searchHistory.length > 0 && (
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">📜 Recent Searches</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
              {searchHistory.slice(0, 6).map(entry => (
                <div key={entry.id} className="bg-gradient-to-r from-purple-50 to-pink-50 p-4 rounded-lg border border-purple-200">
                  <div className="font-semibold text-gray-800">{entry.niche}</div>
                  <div className="text-sm text-gray-600">{entry.city}</div>
                  <div className="text-xs text-gray-500 mt-1">{entry.date}</div>
                  <div className="text-xs text-purple-600 mt-1">{entry.queryCount} queries</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Leads Tracker */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">📊 Leads Tracker ({leads.length})</h2>
            <div className="flex gap-3">
              <button
                onClick={addLead}
                disabled={!selectedNiche}
                className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-all disabled:bg-gray-400"
              >
                + Add Lead
              </button>
              {leads.length > 0 && (
                <>
                  <button
                    onClick={exportLeads}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-all flex items-center gap-2"
                  >
                    <Download size={18} />
                    Export CSV
                  </button>
                  <button
                    onClick={clearAllData}
                    className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-all flex items-center gap-2"
                  >
                    <Trash2 size={18} />
                    Clear All
                  </button>
                </>
              )}
            </div>
          </div>

          {leads.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              <AlertCircle size={48} className="mx-auto mb-4 text-gray-400" />
              <p className="text-lg">No leads yet. Generate queries and start adding leads!</p>
            </div>
          ) : (
            <div className="space-y-4 max-h-[600px] overflow-y-auto">
              {leads.map(lead => (
                <div key={lead.id} className="bg-gray-50 p-5 rounded-lg border-2 border-gray-200 hover:border-blue-300 transition-all">
                  <div className="grid md:grid-cols-4 gap-4">
                    <input
                      type="text"
                      placeholder="Business Name"
                      value={lead.business}
                      onChange={(e) => updateLead(lead.id, 'business', e.target.value)}
                      className="p-2 border rounded focus:border-blue-500 focus:outline-none"
                    />
                    <input
                      type="text"
                      placeholder="Website URL"
                      value={lead.website}
                      onChange={(e) => updateLead(lead.id, 'website', e.target.value)}
                      className="p-2 border rounded focus:border-blue-500 focus:outline-none"
                    />
                    <input
                      type="text"
                      placeholder="Contact Name"
                      value={lead.contact}
                      onChange={(e) => updateLead(lead.id, 'contact', e.target.value)}
                      className="p-2 border rounded focus:border-blue-500 focus:outline-none"
                    />
                    <input
                      type="email"
                      placeholder="Email"
                      value={lead.email}
                      onChange={(e) => updateLead(lead.id, 'email', e.target.value)}
                      className="p-2 border rounded focus:border-blue-500 focus:outline-none"
                    />
                    <input
                      type="text"
                      placeholder="SEO Score (e.g., 42/100)"
                      value={lead.seoScore}
                      onChange={(e) => updateLead(lead.id, 'seoScore', e.target.value)}
                      className="p-2 border rounded focus:border-blue-500 focus:outline-none"
                    />
                    <input
                      type="text"
                      placeholder="Page Speed (e.g., 7.2s)"
                      value={lead.pageSpeed}
                      onChange={(e) => updateLead(lead.id, 'pageSpeed', e.target.value)}
                      className="p-2 border rounded focus:border-blue-500 focus:outline-none"
                    />
                    <select
                      value={lead.status}
                      onChange={(e) => updateLead(lead.id, 'status', e.target.value)}
                      className="p-2 border rounded focus:border-blue-500 focus:outline-none"
                    >
                      <option>New</option>
                      <option>Contacted</option>
                      <option>Follow-up</option>
                      <option>Hot Lead</option>
                      <option>Proposal Sent</option>
                      <option>Won</option>
                      <option>Lost</option>
                    </select>
                    <button
                      onClick={() => deleteLead(lead.id)}
                      className="bg-red-500 text-white px-3 py-2 rounded hover:bg-red-600 transition-all"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                  <div className="mt-3">
                    <textarea
                      placeholder="Issues found / Notes..."
                      value={lead.issues}
                      onChange={(e) => updateLead(lead.id, 'issues', e.target.value)}
                      className="w-full p-2 border rounded focus:border-blue-500 focus:outline-none"
                      rows="2"
                    />
                  </div>
                  <div className="mt-2 text-xs text-gray-500">
                    {lead.niche} • {lead.city} • Added: {lead.date}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Quick Stats */}
        {leads.length > 0 && (
          <div className="mt-6 grid md:grid-cols-4 gap-4">
            <div className="bg-gradient-to-r from-green-400 to-green-600 text-white p-6 rounded-xl shadow-lg">
              <div className="text-3xl font-bold">{leads.length}</div>
              <div className="text-sm">Total Leads</div>
            </div>
            <div className="bg-gradient-to-r from-blue-400 to-blue-600 text-white p-6 rounded-xl shadow-lg">
              <div className="text-3xl font-bold">{leads.filter(l => l.status === 'Hot Lead').length}</div>
              <div className="text-sm">Hot Leads</div>
            </div>
            <div className="bg-gradient-to-r from-purple-400 to-purple-600 text-white p-6 rounded-xl shadow-lg">
              <div className="text-3xl font-bold">{leads.filter(l => l.status === 'Contacted').length}</div>
              <div className="text-sm">Contacted</div>
            </div>
            <div className="bg-gradient-to-r from-orange-400 to-orange-600 text-white p-6 rounded-xl shadow-lg">
              <div className="text-3xl font-bold">{leads.filter(l => l.status === 'Won').length}</div>
              <div className="text-sm">Deals Won</div>
            </div>
          </div>
        )}

        {/* Free SEO Tools Section */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mt-6">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-2">🛠️ Free SEO Tools & Report Generators</h2>
            <p className="text-gray-600">Analyze your leads' websites with these powerful free SEO tools</p>
          </div>

          {/* SEO Audit Tools */}
          <div className="mb-8">
            <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
              🔍 SEO Audit & Analysis Tools
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              <a href="https://seo-expert-tool.vercel.app" target="_blank" rel="noopener noreferrer" className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-lg border border-blue-200 hover:border-blue-400 transition-all hover:shadow-md">
                <div className="font-semibold text-gray-800">SEO Expert Tool</div>
                <div className="text-sm text-gray-600 mt-1">Comprehensive SEO & visual audit in under 1 minute</div>
                <div className="text-xs text-blue-600 mt-2">seo-expert-tool.vercel.app</div>
              </a>
              
              <a href="https://seoreportfree.com" target="_blank" rel="noopener noreferrer" className="bg-gradient-to-r from-green-50 to-emerald-50 p-4 rounded-lg border border-green-200 hover:border-green-400 transition-all hover:shadow-md">
                <div className="font-semibold text-gray-800">SEO Report Free</div>
                <div className="text-sm text-gray-600 mt-1">Professional free SEO reports & technical analysis</div>
                <div className="text-xs text-green-600 mt-2">seoreportfree.com</div>
              </a>
              
              <a href="https://erankseo.com" target="_blank" rel="noopener noreferrer" className="bg-gradient-to-r from-purple-50 to-violet-50 p-4 rounded-lg border border-purple-200 hover:border-purple-400 transition-all hover:shadow-md">
                <div className="font-semibold text-gray-800">eRank SEO</div>
                <div className="text-sm text-gray-600 mt-1">Detailed SEO reports & ranking improvement tools</div>
                <div className="text-xs text-purple-600 mt-2">erankseo.com</div>
              </a>
              
              <a href="https://seoanalysis.report" target="_blank" rel="noopener noreferrer" className="bg-gradient-to-r from-orange-50 to-amber-50 p-4 rounded-lg border border-orange-200 hover:border-orange-400 transition-all hover:shadow-md">
                <div className="font-semibold text-gray-800">SEO Website Report</div>
                <div className="text-sm text-gray-600 mt-1">Website SEO metrics analysis & improvement tips</div>
                <div className="text-xs text-orange-600 mt-2">seoanalysis.report</div>
              </a>
              
              <a href="https://authority.builders/free-seo-report-tool" target="_blank" rel="noopener noreferrer" className="bg-gradient-to-r from-red-50 to-rose-50 p-4 rounded-lg border border-red-200 hover:border-red-400 transition-all hover:shadow-md">
                <div className="font-semibold text-gray-800">Authority Builders</div>
                <div className="text-sm text-gray-600 mt-1">Comprehensive website performance analysis</div>
                <div className="text-xs text-red-600 mt-2">authority.builders</div>
              </a>
              
              <a href="https://seoaudit.software/seo-report" target="_blank" rel="noopener noreferrer" className="bg-gradient-to-r from-teal-50 to-cyan-50 p-4 rounded-lg border border-teal-200 hover:border-teal-400 transition-all hover:shadow-md">
                <div className="font-semibold text-gray-800">SEO Audit Software</div>
                <div className="text-sm text-gray-600 mt-1">Instant SEO visibility & PDF audit reports</div>
                <div className="text-xs text-teal-600 mt-2">seoaudit.software</div>
              </a>
            </div>
          </div>

          {/* Popular SEO Platforms */}
          <div className="mb-8">
            <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
              🌟 Popular SEO Platforms
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              <a href="https://www.thehoth.com/seo-report-tool" target="_blank" rel="noopener noreferrer" className="bg-gradient-to-r from-indigo-50 to-blue-50 p-4 rounded-lg border border-indigo-200 hover:border-indigo-400 transition-all hover:shadow-md">
                <div className="font-semibold text-gray-800">The HOTH SEO Tool</div>
                <div className="text-sm text-gray-600 mt-1">In-depth website analysis with WooRank data</div>
                <div className="text-xs text-indigo-600 mt-2">thehoth.com</div>
              </a>
              
              <a href="https://startupcontent.com/free-seo-audit-report" target="_blank" rel="noopener noreferrer" className="bg-gradient-to-r from-pink-50 to-rose-50 p-4 rounded-lg border border-pink-200 hover:border-pink-400 transition-all hover:shadow-md">
                <div className="font-semibold text-gray-800">Startup Content</div>
                <div className="text-sm text-gray-600 mt-1">AI-powered SEO audit & headline generator</div>
                <div className="text-xs text-pink-600 mt-2">startupcontent.com</div>
              </a>
              
              <a href="https://www.seoauditcheck.com" target="_blank" rel="noopener noreferrer" className="bg-gradient-to-r from-yellow-50 to-amber-50 p-4 rounded-lg border border-yellow-200 hover:border-yellow-400 transition-all hover:shadow-md">
                <div className="font-semibold text-gray-800">SEO Audit Check</div>
                <div className="text-sm text-gray-600 mt-1">Comprehensive SEO audit with actionable insights</div>
                <div className="text-xs text-yellow-600 mt-2">seoauditcheck.com</div>
              </a>
              
              <a href="https://toolcorehub.com/seo-report" target="_blank" rel="noopener noreferrer" className="bg-gradient-to-r from-emerald-50 to-green-50 p-4 rounded-lg border border-emerald-200 hover:border-emerald-400 transition-all hover:shadow-md">
                <div className="font-semibold text-gray-800">ToolCoreHub</div>
                <div className="text-sm text-gray-600 mt-1">Complete no-signup SEO audit in seconds</div>
                <div className="text-xs text-emerald-600 mt-2">toolcorehub.com</div>
              </a>
              
              <a href="https://seoeshop.com/tool/free-seo-analyzer" target="_blank" rel="noopener noreferrer" className="bg-gradient-to-r from-slate-50 to-gray-50 p-4 rounded-lg border border-slate-200 hover:border-slate-400 transition-all hover:shadow-md">
                <div className="font-semibold text-gray-800">SEOeShop Analyzer</div>
                <div className="text-sm text-gray-600 mt-1">Technical SEO issues identification & insights</div>
                <div className="text-xs text-slate-600 mt-2">seoeshop.com</div>
              </a>
              
              <a href="https://www.clickminded.com/templates/seo/seo-report-template" target="_blank" rel="noopener noreferrer" className="bg-gradient-to-r from-violet-50 to-purple-50 p-4 rounded-lg border border-violet-200 hover:border-violet-400 transition-all hover:shadow-md">
                <div className="font-semibold text-gray-800">ClickMinded</div>
                <div className="text-sm text-gray-600 mt-1">SEO report template & analysis tools</div>
                <div className="text-xs text-violet-600 mt-2">clickminded.com</div>
              </a>
            </div>
          </div>

          {/* Additional SEO Tools */}
          <div className="mb-8">
            <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
              🔧 Additional SEO Tools
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              <a href="https://www.seoptimer.com" target="_blank" rel="noopener noreferrer" className="bg-gradient-to-r from-cyan-50 to-blue-50 p-4 rounded-lg border border-cyan-200 hover:border-cyan-400 transition-all hover:shadow-md">
                <div className="font-semibold text-gray-800">SEOptimer</div>
                <div className="text-sm text-gray-600 mt-1">Free SEO audit with detailed recommendations</div>
                <div className="text-xs text-cyan-600 mt-2">seoptimer.com</div>
              </a>
              
              <a href="https://neilpatel.com/seo-analyzer" target="_blank" rel="noopener noreferrer" className="bg-gradient-to-r from-green-50 to-teal-50 p-4 rounded-lg border border-green-200 hover:border-green-400 transition-all hover:shadow-md">
                <div className="font-semibold text-gray-800">Neil Patel SEO Analyzer</div>
                <div className="text-sm text-gray-600 mt-1">Free SEO analysis with improvement suggestions</div>
                <div className="text-xs text-green-600 mt-2">neilpatel.com</div>
              </a>
              
              <a href="https://smallseotools.com/seo-checker" target="_blank" rel="noopener noreferrer" className="bg-gradient-to-r from-orange-50 to-red-50 p-4 rounded-lg border border-orange-200 hover:border-orange-400 transition-all hover:shadow-md">
                <div className="font-semibold text-gray-800">Small SEO Tools</div>
                <div className="text-sm text-gray-600 mt-1">Free SEO checker & analysis tool</div>
                <div className="text-xs text-orange-600 mt-2">smallseotools.com</div>
              </a>
              
              <a href="https://sitechecker.pro" target="_blank" rel="noopener noreferrer" className="bg-gradient-to-r from-purple-50 to-indigo-50 p-4 rounded-lg border border-purple-200 hover:border-purple-400 transition-all hover:shadow-md">
                <div className="font-semibold text-gray-800">Sitechecker</div>
                <div className="text-sm text-gray-600 mt-1">Free SEO audit with comprehensive report</div>
                <div className="text-xs text-purple-600 mt-2">sitechecker.pro</div>
              </a>
              
              <a href="https://www.seositecheckup.com" target="_blank" rel="noopener noreferrer" className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-lg border border-blue-200 hover:border-blue-400 transition-all hover:shadow-md">
                <div className="font-semibold text-gray-800">SEO Site Checkup</div>
                <div className="text-sm text-gray-600 mt-1">Free SEO analysis for common issues</div>
                <div className="text-xs text-blue-600 mt-2">seositecheckup.com</div>
              </a>
              
              <a href="https://www.woorank.com" target="_blank" rel="noopener noreferrer" className="bg-gradient-to-r from-pink-50 to-rose-50 p-4 rounded-lg border border-pink-200 hover:border-pink-400 transition-all hover:shadow-md">
                <div className="font-semibold text-gray-800">Woorank</div>
                <div className="text-sm text-gray-600 mt-1">Free website review & SEO performance analysis</div>
                <div className="text-xs text-pink-600 mt-2">woorank.com</div>
              </a>
            </div>
          </div>

          {/* Keyword Research Tools */}
          <div className="mb-8">
            <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
              🔑 Keyword Research Tools
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              <a href="https://soovle.com" target="_blank" rel="noopener noreferrer" className="bg-gradient-to-r from-emerald-50 to-green-50 p-4 rounded-lg border border-emerald-200 hover:border-emerald-400 transition-all hover:shadow-md">
                <div className="font-semibold text-gray-800">Soovle</div>
                <div className="text-sm text-gray-600 mt-1">Multi-platform keyword suggestions aggregator</div>
                <div className="text-xs text-emerald-600 mt-2">soovle.com</div>
              </a>
              
              <a href="https://moz.com/domain-analysis" target="_blank" rel="noopener noreferrer" className="bg-gradient-to-r from-blue-50 to-cyan-50 p-4 rounded-lg border border-blue-200 hover:border-blue-400 transition-all hover:shadow-md">
                <div className="font-semibold text-gray-800">Moz Domain Analysis</div>
                <div className="text-sm text-gray-600 mt-1">Free domain authority & top pages analysis</div>
                <div className="text-xs text-blue-600 mt-2">moz.com</div>
              </a>
              
              <a href="https://trends.google.com" target="_blank" rel="noopener noreferrer" className="bg-gradient-to-r from-red-50 to-pink-50 p-4 rounded-lg border border-red-200 hover:border-red-400 transition-all hover:shadow-md">
                <div className="font-semibold text-gray-800">Google Trends</div>
                <div className="text-sm text-gray-600 mt-1">Free keyword trend analysis & insights</div>
                <div className="text-xs text-red-600 mt-2">trends.google.com</div>
              </a>
            </div>
          </div>

          {/* Pro Tips */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-lg border border-blue-200">
            <h4 className="font-bold text-blue-800 mb-3">💡 Pro Tips for Using These Tools:</h4>
            <ul className="text-sm text-blue-700 space-y-2">
              <li>• <strong>Run multiple tools</strong> on the same website to get comprehensive insights</li>
              <li>• <strong>Focus on technical SEO issues</strong> first - they're usually the easiest to fix</li>
              <li>• <strong>Check mobile performance</strong> - most tools include mobile analysis</li>
              <li>• <strong>Look for duplicate content</strong> and meta tag issues</li>
              <li>• <strong>Export reports</strong> to share with clients or team members</li>
              <li>• <strong>Track improvements</strong> by running audits monthly</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SEOLeadHunter;
