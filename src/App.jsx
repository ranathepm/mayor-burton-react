import { useState, useEffect } from 'react'

function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [visibleStats, setVisibleStats] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
          }
        })
      },
      { threshold: 0.1 }
    )
    document.querySelectorAll('.scroll-reveal').forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const statsObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleStats(true)
            statsObserver.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.5 }
    )
    const statsSection = document.querySelector('.stats-section')
    if (statsSection) statsObserver.observe(statsSection)
    return () => statsObserver.disconnect()
  }, [])

  const scrollToSection = (e, sectionId) => {
    e.preventDefault()
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
    setMobileMenuOpen(false)
  }

  return (
    <div className="font-sans text-gray-900 bg-offwhite antialiased">
      {/* Navigation */}
      <nav id="navbar" className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white shadow-md' : 'glass'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <a href="#" className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-forest rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/>
                </svg>
              </div>
              <span className="font-semibold text-lg text-gray-900">Rob Burton</span>
            </a>
            
            <div className="hidden md:flex items-center space-x-8">
              <a href="#home" onClick={(e) => scrollToSection(e, 'home')} className="nav-link text-sm font-medium text-gray-700 hover:text-forest transition-colors">Home</a>
              <a href="#about" onClick={(e) => scrollToSection(e, 'about')} className="nav-link text-sm font-medium text-gray-700 hover:text-forest transition-colors">About</a>
              <a href="#vision" onClick={(e) => scrollToSection(e, 'vision')} className="nav-link text-sm font-medium text-gray-700 hover:text-forest transition-colors">Vision</a>
              <a href="#initiatives" onClick={(e) => scrollToSection(e, 'initiatives')} className="nav-link text-sm font-medium text-gray-700 hover:text-forest transition-colors">Initiatives</a>
              <a href="#leadership" onClick={(e) => scrollToSection(e, 'leadership')} className="nav-link text-sm font-medium text-gray-700 hover:text-forest transition-colors">Leadership</a>
              <a href="#contact" onClick={(e) => scrollToSection(e, 'contact')} className="px-5 py-2.5 bg-forest text-white text-sm font-medium rounded-full hover:bg-sage transition-all hover:shadow-lg">Contact</a>
            </div>
            
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden p-2 text-gray-700">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"/>
              </svg>
            </button>
          </div>
        </div>
        
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t">
            <div className="px-4 py-4 space-y-3">
              <a href="#home" onClick={(e) => scrollToSection(e, 'home')} className="block py-2 text-gray-700 font-medium">Home</a>
              <a href="#about" onClick={(e) => scrollToSection(e, 'about')} className="block py-2 text-gray-700 font-medium">About</a>
              <a href="#vision" onClick={(e) => scrollToSection(e, 'vision')} className="block py-2 text-gray-700 font-medium">Vision</a>
              <a href="#initiatives" onClick={(e) => scrollToSection(e, 'initiatives')} className="block py-2 text-gray-700 font-medium">Initiatives</a>
              <a href="#leadership" onClick={(e) => scrollToSection(e, 'leadership')} className="block py-2 text-gray-700 font-medium">Leadership</a>
              <a href="#contact" onClick={(e) => scrollToSection(e, 'contact')} className="block py-2 text-forest font-medium">Contact</a>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="home" className="hero-section relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 gradient-bg"></div>
        
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full mb-6 animate-fade-in">
            <svg className="w-4 h-4 text-white mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"/>
            </svg>
            <span className="text-white text-sm font-medium">Mayor of Oakville, Ontario</span>
          </div>
          
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold text-white mb-6 animate-slide-up">
            Building a Vibrant,<br/>Livable Oakville for All
          </h1>
          
          <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto mb-10 animate-slide-up">
            Visionary municipal leadership since 2006. Championing sustainability, smart growth, and a community where families thrive.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up">
            <a href="#contact" onClick={(e) => scrollToSection(e, 'contact')} className="inline-flex items-center justify-center px-8 py-4 bg-white text-forest font-semibold rounded-full hover:shadow-xl hover:scale-105 transition-all">
              Contact Mayor
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
              </svg>
            </a>
            <a href="#vision" onClick={(e) => scrollToSection(e, 'vision')} className="inline-flex items-center justify-center px-8 py-4 bg-transparent border-2 border-white text-white font-semibold rounded-full hover:bg-white/10 transition-all">
              Explore Vision
            </a>
          </div>
          
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-float">
            <svg className="w-6 h-6 text-white/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"/>
            </svg>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section py-16 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center scroll-reveal">
              <div className="text-4xl font-bold text-forest stat-number">{visibleStats ? '19' : '0'}+</div>
              <div className="text-gray-600 mt-1">Years Leading Oakville</div>
            </div>
            <div className="text-center scroll-reveal" style={{animationDelay: '0.1s'}}>
              <div className="text-4xl font-bold text-forest stat-number">{visibleStats ? '150' : '0'}+</div>
              <div className="text-gray-600 mt-1">Community Initiatives</div>
            </div>
            <div className="text-center scroll-reveal" style={{animationDelay: '0.2s'}}>
              <div className="text-4xl font-bold text-forest stat-number">{visibleStats ? '200' : '0'}+</div>
              <div className="text-gray-600 mt-1">Local Projects Supported</div>
            </div>
            <div className="text-center scroll-reveal" style={{animationDelay: '0.3s'}}>
              <div className="text-4xl font-bold text-forest">#1</div>
              <div className="text-gray-600 mt-1">Canada's Safest City</div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 lg:py-32 bg-offwhite">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="scroll-reveal">
              <div className="relative">
                <div className="absolute -top-4 -left-4 w-full h-full bg-forest/10 rounded-2xl"></div>
                <div className="relative bg-gradient-to-br from-forest to-civic rounded-2xl p-8 h-full min-h-[400px] flex items-center justify-center">
                  <div className="text-center text-white">
                    <div className="w-32 h-32 mx-auto mb-6 bg-white/20 rounded-full flex items-center justify-center">
                      <svg className="w-16 h-16 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                      </svg>
                    </div>
                    <h3 className="text-2xl font-bold">Rob Burton</h3>
                    <p className="text-white/80">45th Mayor of Oakville</p>
                    <p className="text-white/60 text-sm mt-2">Serving Since 2006</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="scroll-reveal" style={{animationDelay: '0.2s'}}>
              <span className="inline-block text-forest font-semibold text-sm tracking-wider uppercase mb-4">About The Mayor</span>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">A Visionary Leader for Oakville's Future</h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                Rob Burton has served as Oakville's 45th Mayor since 2006, bringing visionary leadership that has transformed our town into one of Canada's most livable communities.
              </p>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                Before entering municipal politics, Rob was a pioneering media executive, founding the YTV network—Canada's first national youth television channel. He holds an MSc from Columbia University Graduate School of Journalism, equipping him with the strategic vision and communication skills that define his leadership style.
              </p>
              
              <div className="flex flex-wrap gap-3">
                <div className="flex items-center px-4 py-2 bg-forest/10 rounded-full">
                  <svg className="w-4 h-4 text-forest mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"/>
                  </svg>
                  <span className="text-forest text-sm font-medium">19 Years Mayoral Leadership</span>
                </div>
                <div className="flex items-center px-4 py-2 bg-forest/10 rounded-full">
                  <svg className="w-4 h-4 text-forest mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"/>
                  </svg>
                  <span className="text-forest text-sm font-medium">Columbia MSc</span>
                </div>
                <div className="flex items-center px-4 py-2 bg-forest/10 rounded-full">
                  <svg className="w-4 h-4 text-forest mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"/>
                  </svg>
                  <span className="text-forest text-sm font-medium">Media Pioneer</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Vision Section */}
      <section id="vision" className="py-20 lg:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 scroll-reveal">
            <span className="inline-block text-forest font-semibold text-sm tracking-wider uppercase mb-4">Vision & Leadership</span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">A Clear Vision for Oakville's Future</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Building a sustainable, thriving community that balances growth with preservation of our natural heritage.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 bg-offwhite rounded-2xl card-hover scroll-reveal" style={{animationDelay: '0.1s'}}>
              <div className="w-12 h-12 bg-forest/10 rounded-xl flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-forest" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/>
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Smart Urban Planning</h3>
              <p className="text-gray-600 text-sm">Thoughtful development that preserves neighborhood character while enabling sustainable growth.</p>
            </div>
            
            <div className="p-6 bg-offwhite rounded-2xl card-hover scroll-reveal" style={{animationDelay: '0.2s'}}>
              <div className="w-12 h-12 bg-forest/10 rounded-xl flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-forest" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z"/>
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Controlled Growth</h3>
              <p className="text-gray-600 text-sm">Balanced development that protects existing neighborhoods and maintains Oakville's unique character.</p>
            </div>
            
            <div className="p-6 bg-offwhite rounded-2xl card-hover scroll-reveal" style={{animationDelay: '0.3s'}}>
              <div className="w-12 h-12 bg-forest/10 rounded-xl flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-forest" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Environmental Protection</h3>
              <p className="text-gray-600 text-sm">Championing green initiatives and preserving our natural heritage systems for future generations.</p>
            </div>
            
            <div className="p-6 bg-offwhite rounded-2xl card-hover scroll-reveal" style={{animationDelay: '0.4s'}}>
              <div className="w-12 h-12 bg-forest/10 rounded-xl flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-forest" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Fiscal Responsibility</h3>
              <p className="text-gray-600 text-sm">Keeping taxes low while delivering excellent services and investing in community infrastructure.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Initiatives Section */}
      <section id="initiatives" className="py-20 lg:py-32 bg-offwhite">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 scroll-reveal">
            <span className="inline-block text-forest font-semibold text-sm tracking-wider uppercase mb-4">Key Initiatives</span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Driving Change Through Action</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Under Mayor Burton's leadership, Oakville has launched transformative programs that set the standard for sustainable municipal governance.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: 'Natural Heritage Systems', desc: 'Comprehensive strategy to protect and enhance Oakville\'s green spaces and natural areas.' },
              { title: 'Energy Management Plan', desc: 'Reducing municipal energy consumption and promoting renewable energy adoption.' },
              { title: 'Climate Change Adaptation', desc: 'Proactive planning to protect Oakville from climate impacts while reducing emissions.' },
              { title: 'Urban Forest Strategy', desc: 'Expanding tree canopy coverage to improve air quality and urban resilience.' },
              { title: 'Livable Oakville', desc: 'Partnership with Sustainable Halton to create age-friendly, accessible communities.' },
              { title: 'Community Safety Plan', desc: 'Comprehensive approach to public safety and community well-being across Oakville.' }
            ].map((item, index) => (
              <div key={index} className="bg-white p-6 rounded-2xl card-hover scroll-reveal" style={{animationDelay: `${0.1 + index * 0.05}s`}}>
                <div className="w-10 h-10 bg-forest/10 rounded-lg flex items-center justify-center mb-4">
                  <svg className="w-5 h-5 text-forest" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"/>
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm mb-4">{item.desc}</p>
                <span className="text-xs font-medium text-forest">Active Program</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Environmental Leadership Section */}
      <section className="py-20 bg-gradient-to-r from-forest to-civic">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="scroll-reveal">
              <span className="inline-block text-white/80 font-semibold text-sm tracking-wider uppercase mb-4">Environmental Leadership</span>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">"The Greenest Mayor in Canada"</h2>
              <p className="text-lg text-white/90 mb-8 leading-relaxed">
                Mayor Burton's unwavering commitment to environmental sustainability has earned national recognition. As Chair of Municipal Leaders for the Greenbelt, he champions policies that protect Ontario's green spaces while enabling responsible growth.
              </p>
              
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center px-5 py-3 bg-white/20 backdrop-blur-sm rounded-xl">
                  <svg className="w-6 h-6 text-gold mr-3" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                  </svg>
                  <span className="text-white font-medium">Chair, Municipal Leaders for the Greenbelt</span>
                </div>
                <div className="flex items-center px-5 py-3 bg-white/20 backdrop-blur-sm rounded-xl">
                  <svg className="w-6 h-6 text-gold mr-3" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                  </svg>
                  <span className="text-white font-medium">National Climate Leadership Award</span>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4 scroll-reveal" style={{animationDelay: '0.2s'}}>
              {[
                { value: '100%', label: 'Renewable Energy Target' },
                { value: '40%', label: 'Emissions Reduction' },
                { value: '30%', label: 'Tree Canopy Expansion' },
                { value: '#1', label: 'Green City Ranking' }
              ].map((stat, index) => (
                <div key={index} className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center">
                  <div className="text-4xl font-bold text-white mb-2">{stat.value}</div>
                  <div className="text-white/80 text-sm">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Boards & Leadership Section */}
      <section id="leadership" className="py-20 lg:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 scroll-reveal">
            <span className="inline-block text-forest font-semibold text-sm tracking-wider uppercase mb-4">Leadership Positions</span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Serving Our Community</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Mayor Burton holds leadership roles on key municipal and regional boards that shape Oakville's future.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: 'Oakville Municipal Development Corporation', role: 'Board Member' },
              { title: 'Oakville Enterprises Corporation', role: 'Board Member' },
              { title: 'Oakville Police Services Board', role: 'Chair' },
              { title: 'Halton Healthcare Corporation', role: 'Board Member' },
              { title: 'Housing Halton', role: 'Board Member' },
              { title: 'Oakville BIA', role: 'Board Member' },
              { title: 'Compact of Mayors', role: 'Climate Leadership Ambassador' },
              { title: 'Ontario Auto Mayors', role: 'Member' },
              { title: 'Canadian Nuclear Technology Mayors', role: 'Member' }
            ].map((item, index) => (
              <div key={index} className="p-6 border border-gray-200 rounded-2xl scroll-reveal" style={{animationDelay: `${0.1 + index * 0.05}s`}}>
                <div className="flex items-center mb-3">
                  <div className="w-2 h-2 bg-forest rounded-full mr-3"></div>
                  <h3 className="font-semibold text-gray-900">{item.title}</h3>
                </div>
                <p className="text-gray-600 text-sm">{item.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Community Impact Section */}
      <section className="py-20 lg:py-32 bg-forest">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 scroll-reveal">
            <span className="inline-block text-white/80 font-semibold text-sm tracking-wider uppercase mb-4">Community Impact</span>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Supporting Our Community</h2>
            <p className="text-lg text-white/90 max-w-2xl mx-auto">
              Mayor Burton is a passionate advocate for sports, arts, charities, and initiatives that strengthen Oakville's social fabric.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6">
            {[
              { icon: 'M13 10V3L4 14h7v7l9-11h-7z', title: 'Local Sports', subtitle: 'Youth & Professional' },
              { icon: 'M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3', title: 'Arts & Culture', subtitle: 'Creative Community' },
              { icon: 'M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z', title: 'Charities', subtitle: 'Caring Community' },
              { icon: 'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z', title: 'Diversity & Inclusion', subtitle: 'Equity for All' },
              { icon: 'M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z', title: 'Women & Children', subtitle: 'Protection & Support' }
            ].map((item, index) => (
              <div key={index} className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center scroll-reveal" style={{animationDelay: `${0.1 + index * 0.05}s`}}>
                <svg className="w-8 h-8 mx-auto mb-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={item.icon}/>
                </svg>
                <h3 className="font-semibold text-white">{item.title}</h3>
                <p className="text-white/70 text-sm mt-1">{item.subtitle}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 lg:py-32 bg-offwhite">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 scroll-reveal">
            <span className="inline-block text-forest font-semibold text-sm tracking-wider uppercase mb-4">Community Voices</span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">What Oakville Residents Say</h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { quote: "Mayor Burton's leadership has transformed Oakville into a model for sustainable urban development. His commitment to green initiatives and community engagement is evident in every aspect of our town.", name: 'Sarah Mitchell', role: 'Local Business Owner' },
              { quote: "Rob Burton truly listens to residents. Under his leadership, Oakville has maintained its small-town charm while becoming a leader in environmental sustainability and innovation.", name: 'James Chen', role: 'Community Leader' },
              { quote: "The Mayor's dedication to keeping taxes low while investing in community infrastructure shows his genuine care for residents. Oakville is a better place because of his service.", name: 'Maria Rodriguez', role: 'Resident' }
            ].map((item, index) => (
              <div key={index} className="bg-white p-8 rounded-2xl shadow-sm scroll-reveal" style={{animationDelay: `${0.1 + index * 0.1}s`}}>
                <div className="quote-mark mb-4"></div>
                <p className="text-gray-700 mb-6 leading-relaxed">{item.quote}</p>
                <div className="font-medium text-gray-900">{item.name}</div>
                <div className="text-gray-500 text-sm">{item.role}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-16 bg-forest">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">Have a Vision to Share?</h2>
              <p className="text-white/90">We'd love to hear from you. Connect with Mayor Burton's office today.</p>
            </div>
            <a href="#contact" onClick={(e) => scrollToSection(e, 'contact')} className="inline-flex items-center justify-center px-8 py-4 bg-white text-forest font-semibold rounded-full hover:shadow-xl hover:scale-105 transition-all whitespace-nowrap">
              Get In Touch
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
              </svg>
            </a>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 lg:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16">
            <div className="scroll-reveal">
              <span className="inline-block text-forest font-semibold text-sm tracking-wider uppercase mb-4">Get In Touch</span>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Contact Mayor Burton</h2>
              <p className="text-lg text-gray-600 mb-8">
                Have questions, ideas, or concerns? Reach out to Mayor Burton's office. We're here to listen and help.
              </p>
              
              <div className="space-y-4 mb-8">
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-forest/10 rounded-lg flex items-center justify-center mr-4">
                    <svg className="w-5 h-5 text-forest" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                    </svg>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">Phone</div>
                    <div className="font-medium text-gray-900">905-845-6601</div>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-forest/10 rounded-lg flex items-center justify-center mr-4">
                    <svg className="w-5 h-5 text-forest" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                    </svg>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">Email</div>
                    <div className="font-medium text-gray-900">mayor@oakville.ca</div>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-forest/10 rounded-lg flex items-center justify-center mr-4">
                    <svg className="w-5 h-5 text-forest" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"/>
                    </svg>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">Website</div>
                    <div className="font-medium text-forest">robburton.ca</div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-offwhite p-8 rounded-2xl scroll-reveal" style={{animationDelay: '0.2s'}}>
              <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Your Name</label>
                  <input type="text" className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-forest focus:ring-2 focus:ring-forest/20 outline-none transition-all" placeholder="Enter your name"/>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                  <input type="email" className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-forest focus:ring-2 focus:ring-forest/20 outline-none transition-all" placeholder="Enter your email"/>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                  <textarea rows="4" className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-forest focus:ring-2 focus:ring-forest/20 outline-none transition-all resize-none" placeholder="How can we help?"></textarea>
                </div>
                
                <button type="submit" className="w-full px-6 py-4 bg-forest text-white font-semibold rounded-lg hover:bg-sage transition-all hover:shadow-lg">
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-forest text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div className="md:col-span-2">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-forest rounded-full flex items-center justify-center border-2 border-white/30">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/>
                  </svg>
                </div>
                <span className="text-xl font-semibold">Rob Burton</span>
              </div>
              <p className="text-white/80 max-w-md">
                Building a Vibrant, Livable Oakville for All. Serving as your Mayor since 2006 with vision, integrity, and commitment to our community.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><a href="#home" onClick={(e) => scrollToSection(e, 'home')} className="text-white/70 hover:text-white transition-colors">Home</a></li>
                <li><a href="#about" onClick={(e) => scrollToSection(e, 'about')} className="text-white/70 hover:text-white transition-colors">About</a></li>
                <li><a href="#vision" onClick={(e) => scrollToSection(e, 'vision')} className="text-white/70 hover:text-white transition-colors">Vision</a></li>
                <li><a href="#initiatives" onClick={(e) => scrollToSection(e, 'initiatives')} className="text-white/70 hover:text-white transition-colors">Initiatives</a></li>
                <li><a href="#contact" onClick={(e) => scrollToSection(e, 'contact')} className="text-white/70 hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Connect</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-white/70 hover:text-white transition-colors">Twitter</a></li>
                <li><a href="#" className="text-white/70 hover:text-white transition-colors">Facebook</a></li>
                <li><a href="#" className="text-white/70 hover:text-white transition-colors">LinkedIn</a></li>
                <li><a href="#" className="text-white/70 hover:text-white transition-colors">Instagram</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-white/20 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-white/60 text-sm">© 2024 Rob Burton for Oakville. All rights reserved.</p>
            <p className="text-white/60 text-sm">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a> | <a href="#" className="hover:text-white transition-colors">Terms of Use</a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
