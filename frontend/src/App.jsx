import { useState } from 'react'
import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'
import axios from 'axios';
import toast from 'react-hot-toast';
import { useEffect } from 'react';
import { } from '@fortawesome/free-brands-svg-icons';
import { } from '@fortawesome/free-regular-svg-icons';
import { faInfinity, faL } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PageLoader from './PageLoader';

function App() {



  // State for mobile menu toggle
  const [menuActive, setMenuActive] = useState(false);
  // State for navbar scrolled
  const [scrolled, setScrolled] = useState(false);
  // State for active nav link
  const [activeSection, setActiveSection] = useState('home');

  // Toggle mobile menu
  const toggleMenu = () => {
    setMenuActive(prev => !prev);
  };

  // Close menu on link click
  const handleNavLinkClick = () => {
    setMenuActive(false);
  };

  // Scroll listener for navbar style and active link
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      const sections = document.querySelectorAll('section[id]');
      let current = 'home';

      sections.forEach(section => {
        const sectionTop = section.offsetTop - 110;
        if (window.scrollY >= sectionTop) {
          current = section.id;
        }
      });

      setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll);
    // Initial call
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (showModal) {
      document.body.classList.add('modal-open');
    } else {
      document.body.classList.remove('modal-open');
    }

    // Cleanup in case component unmounts with modal open
    return () => document.body.classList.remove('modal-open');
  }, [showModal]);


  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  // Input change handler
  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const [notif, setNotif] = useState({ message: '', type: 'info' });
  const [notifVisible, setNotifVisible] = useState(false);

  const showNotify = (message, type) => {
    setNotif({ message, type });
    setTimeout(() => setNotifVisible(true), 10); // Thoda delay animation ke liye
    setTimeout(() => setNotifVisible(false), 4800);
    setTimeout(() => setNotif({ message: '', type: 'info' }), 5000);
  };


  // Form submission handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const { name, email, subject, message } = formData;

    if (!name || !email || !subject || !message) {
      showNotify('Please fill all fields', 'error');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      showNotify('Please enter a valid email', 'error');
      return;
    }

    try {
      // alert('come')
      const response = await axios.post('http://localhost:9000/send-mail', { name, email, subject, message }, {
        headers: {
          'Content-Type': 'application/json'
        },
        withCredentials: true
      });
      // alert('gone')
      if (response.status === 200) {
        setLoading(false);
        showNotify(response.data.message || 'Message sent successfully!', 'success');
        setFormData({ name: '', email: '', subject: '', message: '' }); // Reset form
      } else {
        showNotify(response.data.error || 'Failed to send message.', 'error');
      }
    } catch (error) {
      showNotify('Error sending message.', 'error');
      console.error(error);
    }
    finally {
      setLoading(false);
    }
  };



  const advisorDetails = {
    name: 'Dr. Mala Airun',
    role: 'Clinical Director & Healthcare Strategist',
    education: 'Graduate of SMS Medical College, Jaipur',
    exp: 'Extensive experience in hospital administration, clinical governance, and strategic planning.',
    bio: `Dr. Mala Airun has over 20 years of dedicated service in healthcare, having worked across government and private sector hospitals. She specializes in organizational strategy, quality compliance, and medical process innovation. She is a speaker at national conferences and an active advisor for hospital transformation projects in Rajasthan and Gujarat.`
  };

  const [loading, setLoading] = useState(true);


  return (
    <>

      {
        loading && <PageLoader />
      }

      {notif.message && (
        <div className={`notification notification-${notif.type} ${notifVisible ? 'notification-show' : ''}`}>
          <div className="notification-content">
            <span className="notification-message">{notif.message}</span>
            <button
              className="notification-close"
              onClick={() => {
                setNotifVisible(false);
                setTimeout(() => setNotif({ message: '', type: 'info' }), 500);
              }}
            >
              &times;
            </button>
          </div>
        </div>
      )}

      <div className="html">
        <div className='.body'>
          {/* <!-- Navigation --> */}
          <nav class="navbar" id="navbar">
            <div class="nav-container">
              <div class="nav-logo">
                <a style={{ textDecoration: 'none', color: 'black' }} href="#home">
                  <i class="logo"><img class="imgg" src="./img/logo.png" alt="ICA" /></i>

                  {/* <span>Impetus Consulting Associate Pvt.Ltd.</span> */}
                </a>
              </div>
              <ul className={`nav-menu ${menuActive ? "active" : ""}`} id="nav-menu">
                {/* <li><a href="#home" className="nav-link" onClick={handleNavLinkClick}>Home</a></li> */}
                <li><a href="#about" className="nav-link" onClick={handleNavLinkClick}>About</a></li>
                <li><a href="#solutions" className="nav-link" onClick={handleNavLinkClick}>Solutions</a></li>
                <li><a href="#team" className="nav-link" onClick={handleNavLinkClick}>Team</a></li>
                <li><a href="#contact" className="nav-link" onClick={handleNavLinkClick}>Contact</a></li>
              </ul>
              <div
                className={`nav-toggle ${menuActive ? "active" : ""}`}
                id="nav-toggle"
                onClick={toggleMenu}
              >
                <span className="bar"></span>
                <span className="bar"></span>
                <span className="bar"></span>
              </div>
            </div>
          </nav>

          {/* <!-- Hero Section --> */}
          <section id="home" class="hero">
            <div class="hero-background">
              {/* <div class="floating-shapes">
                <div class="shape shape-1"></div>
                <div class="shape shape-2"></div>
                <div class="shape shape-3"></div>
                <div class="shape shape-4"></div>
                <div class="shape shape-5"></div>
              </div> */}
            </div>
            <div class="container">
              <div class="hero-content">
                <div class="hero-text">
                  <h1 class="hero-title">
                    <span class="itle-line">Welcome to</span>
                    <span class="title-highlight">Impetus Consulting</span>
                    <span class="title-line">Associates</span>
                  </h1>
                  <p class="hero-subtitle">Empowering hospitals with intelligent, patient-centric technology solutions
                    that bridge the gap between service and care.</p>
                  <div class="hero-buttons">
                    <a href="#solutions" class="btn btn-primary">Our Solutions</a>
                    <a href="#contact" class="btn btn-outline">Get In Touch</a>
                  </div>
                </div>
                <div class="hero-visual">
                  <div class="medical-icon-container">
                    {/* <!-- <i class="fas fa-hospital medical-icon"></i> --> */}
                    <img src="./img/unnamed.png" class="infinis" alt="" />
                    {/* <img src="./heard.png" className='pulse-ring' alt="img" />
                    <img src="./heard.png" className='pulse-ring-2' alt="img" /> */}
                    {/* <svg
                      // style={{}}
                      width="160"
                      height="50"
                      viewBox="0 0 160 50"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      style={{ overflow: 'visible', position: 'absolute' }}
                    >
                      <path
                        d="M0 25 L20 25 L25 15 L35 35 L45 5 L55 45 L65 25 L160 25"
                        stroke="#adb4b2ff"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        style={{
                          strokeDasharray: 300,
                          strokeDashoffset: 300,
                          animation: 'dash 2.5s linear infinite'
                        }}
                      />
                      <style>{`
        @keyframes dash {
          to {
            stroke-dashoffset: 0;
          }
        }
      `}</style>
                    </svg> */}
                    <div class="pulse-ring"></div>
                    <div class="pulse-ring-2"></div>
                  </div>
                </div>
              </div>
            </div>
            <div class="scroll-indicator">
              <span></span>
            </div>
          </section>

          {/* <!-- About Section --> */}
          <section id="about" class="about">
            <div class="container">
              <div class="section-header">
                <h2 class="section-title">About Us</h2>
                <p class="section-subtitle">Born inside hospitals, built for healthcare excellence</p>
              </div>

              <div class="about-content">
                <div class="about-story">
                  <div class="story-card">
                    <div class="story-icon">
                      <i class="fas fa-user-md"></i>
                    </div>
                    <h3>Our Origin</h3>
                    <p>We are not a typical software company that builds products in isolation. Impetus Consulting
                      Associates was born inside hospitals—working day and night in their contact centers,
                      listening to patient queries, supporting doctors, and coordinating with staff.</p>
                  </div>

                  <div class="story-card">
                    <div class="story-icon">
                      <i class="fas fa-cogs"></i>
                    </div>
                    <h3>Our Approach</h3>
                    <p>From 2020 onwards, our team has been at the frontlines of hospital communication. We realized
                      that hospitals don't just need manpower—they need intelligent systems that understand their
                      workflow.</p>
                  </div>

                  <div class="story-card">
                    <div class="story-icon">
                      <i class="fas fa-lightbulb"></i>
                    </div>
                    <h3>Our Belief</h3>
                    <p>This ground-level experience shaped our belief: Hospitals need intelligent systems designed
                      for hospitals, by people who have lived hospital operations.</p>
                  </div>
                </div>
              </div>

              <div class="mission-vision">
                <div class="mv-card mission-card">
                  <div class="mv-icon">
                    <i class="fas fa-bullseye"></i>
                  </div>
                  <h3>Our Mission</h3>
                  <p>To empower hospitals, clinics, and healthcare providers with intelligent, patient-centric, and
                    efficient technology solutions that bridge the gap between service and care.</p>
                </div>

                <div class="mv-card vision-card">
                  <div class="mv-icon">
                    <i class="fas fa-eye"></i>
                  </div>
                  <h3>Our Vision</h3>
                  <p>To become India's most trusted partner in hospital process transformation, combining human
                    expertise with cutting-edge healthcare technology.</p>
                </div>
              </div>
            </div>
          </section>

          {/* <!-- Solutions Section --> */}
          <section id="solutions" class="solutions">
            <div class="container">
              <div class="section-header">
                <h2 class="section-title">Our Solutions</h2>
                <p class="section-subtitle">Comprehensive healthcare technology platforms</p>
              </div>

              <div class="solutions-grid">
                <div class="solution-card">
                  <div class="solution-icon">
                    {/* <i class="fas fa-phone-alt"></i> */}
                    <i><FontAwesomeIcon icon={faInfinity} /></i>
                  </div>
                  <h3>Infinis - Smart Hospital Contact Center Suite</h3>
                  <p class="solution-description">Built from thousands of patient calls and hospital interactions,
                    mirroring how hospitals actually work.</p>
                  <ul class="solution-features">
                    <li><i class="fas fa-check"></i> Patient Management System (PMS)</li>
                    <li><i class="fas fa-check"></i> AI Auto Call Auditor</li>
                    <li><i class="fas fa-check"></i> Ticket Management System (TMS)</li>
                    <li><i class="fas fa-check"></i> Omnichannel Integration</li>
                  </ul>
                </div>

                <div class="solution-card">
                  <div class="solution-icon">
                    <i class="fas fa-file-medical"></i>
                  </div>
                  <h3>EMR - Electronic Medical Records</h3>
                  <p class="solution-description">Adapted to Indian hospital realities, digitizing medical histories
                    step by step without disrupting daily care.</p>
                  <ul class="solution-features">
                    <li><i class="fas fa-check"></i> Digital Record Management</li>
                    <li><i class="fas fa-check"></i> Easy Staff Adoption</li>
                    <li><i class="fas fa-check"></i> Seamless Integration</li>
                    <li><i class="fas fa-check"></i> Secure Data Storage</li>
                  </ul>
                </div>

                <div class="solution-card">
                  <div class="solution-icon">
                    <i class="fas fa-award"></i>
                  </div>
                  <h3>Q Panel - NABH Certification Tool</h3>
                  <p class="solution-description">Turns accreditation into a living, digital process with continuous
                    tracking and monitoring.</p>
                  <ul class="solution-features">
                    <li><i class="fas fa-check"></i> SOP Management</li>
                    <li><i class="fas fa-check"></i> Compliance Tracking</li>
                    <li><i class="fas fa-check"></i> Audit Management</li>
                    <li><i class="fas fa-check"></i> Quality Assurance</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* <!-- Why Choose Us Section --> */}
          <section class="why-choose">
            <div class="container">
              <div class="section-header">
                <h2 class="section-title">Why Choose ICA?</h2>
              </div>

              <div class="features-grid">
                <div class="solution-card">
                  <div class="feature-icon">
                    <i class="fas fa-comments"></i>
                  </div>
                  <h4>We Speak Hospital's Language</h4>
                  <p>Tools built after years of working directly inside hospital systems</p>
                </div>

                <div class="solution-card">
                  <div class="feature-icon">
                    <i class="fas fa-project-diagram"></i>
                  </div>
                  <h4>Centralization Made Simple</h4>
                  <p>Bringing communication, records, and compliance into one structure</p>
                </div>

                <div class="solution-card">
                  <div class="feature-icon">
                    <i class="fas fa-expand-arrows-alt"></i>
                  </div>
                  <h4>Scalable Solutions</h4>
                  <p>From single clinics to multi-branch hospital groups</p>
                </div>

                <div class="solution-card">
                  <div class="feature-icon">
                    <i class="fas fa-shield-alt"></i>
                  </div>
                  <h4>Trusted Track Record</h4>
                  <p>Over 13 hospitals in Rajasthan and Gujarat trust our systems</p>
                </div>

                <div class="solution-card">
                  <div class="feature-icon">
                    <i class="fas fa-globe"></i>
                  </div>
                  <h4>Omnichannel Integration</h4>
                  <p>Handle queries through calls, WhatsApp, websites, and social media</p>
                </div>

                <div class="solution-card">
                  <div class="feature-icon">
                    <i class="fas fa-chart-line"></i>
                  </div>
                  <h4>Data-Driven Approach</h4>
                  <p>Centralized communication systems for improved transparency</p>
                </div>
              </div>
            </div>
          </section>

          {/* <!-- Team Section --> */}
          <section id="team" class="team">
            <div class="container">
              <div class="section-header">
                <h2 class="section-title">Our Leadership Team</h2>
                <p class="section-subtitle">Expertise in healthcare technology and patient management</p>
              </div>

              <div class="team-grid">
                <div class="team-card" style={{ backgroundImage: "url('./img/mam.jpg')" }}>
                  <div class="team-photo">

                  </div>
                  <div class="team-info"  >
                    <h4>Ayuksha Singh</h4>
                    <p class="team-role">Founder & CEO</p>
                    <div className='forbg'>
                      <p class="team-description">16+ years of experience with 5+ years in healthcare. Visionary
                        behind innovative solutions like Infinis and Q Panel.</p>
                      <div class="team-stats">
                        <span>16+ Years Experience</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="team-card" style={{ backgroundImage: "url('./img/atul.jpg')" }}>
                  <div class="team-photo">

                  </div>
                  <div class="team-info">
                    <h4  >Atul Jalan</h4>
                    <p class="team-role">Co-Founder</p>
                    <div className="forbg">
                      <p class="team-description">Atul is a seasoned engineer with over 12 years of startup experience and 6+ years in trade-in technology businesses. He was a core team member at Safe Securities (formerly Lucideus), a $200M cybersecurity venture, and later, as CTO of InstaCash, drove innovations that built a successful $18M SaaS business.</p>
                      <div class="team-stats">
                        <span>18+ Years Experience</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="team-card" style={{ backgroundImage: "url('./img/rahul.jpg')" }}>
                  <div className="team-photo">
                    {/* yahaan agar aapko koi overlay ya icon chahiye toh add karo, warna khali chod do */}
                  </div>

                  <div className="team-info">
                    <h4>Rahul Barman</h4>
                    <p className="team-role">Operations Manager</p>
                    <div className='forbg'>
                      <p className="team-description">
                        Founding member with 9+ years experience managing hospital contact center operations across 13+ hospitals.
                      </p>
                      <div className="team-stats">
                        <span>9+ Years Experience</span>
                      </div>
                    </div>
                  </div>
                </div>




                <div class="team-card" style={{ backgroundImage: "url('./img/praveen.png')" }}>
                  <div class="team-photo">

                  </div>
                  <div class="team-info">
                    <h4>Praveen Tak</h4>
                    <p class="team-role">Head of Product</p>
                    <div className="forbg">
                      <p class="team-description">16+ years in AI and healthcare product development, leading creation
                        of AI-driven hospital solutions.</p>
                      <div class="team-stats">
                        <span>16+ Years Experience</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="team-card" style={{ backgroundImage: "url('./img/ajay.jpg')" }}>
                  <div class="team-photo">

                  </div>
                  <div class="team-info">
                    <h4>Ajay Barman</h4>
                    <p class="team-role">Head of Quality & Training</p>
                    <div className="forbg">
                      <p class="team-description">8+ years expertise ensuring NABH compliance and developing
                        performance frameworks for hospital operations.</p>
                      <div class="team-stats">
                        <span>8+ Years Experience</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="team-card" style={{ backgroundImage: "url('./img/rohit.jpg')" }}>
                  <div class="team-photo">

                  </div>
                  <div class="team-info">
                    <h4>Rohit Das</h4>
                    <p class="team-role">Head of Human Resources</p>
                    <div className="forbg">
                      <p class="team-description">5+ years HR experience specializing in talent acquisition for
                        healthcare technology roles and organizational development.</p>
                      <div class="team-stats">
                        <span>5+ Years Experience</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* <!-- Advisory Panel --> */}
              <div className={showModal ? 'advisor-blur-bg' : ''}></div>
              <div class="advisory-section">
                <h3>Our Advisory Panel</h3>
                <div class="advisory-card">
                  <div class="advisor-photo">
                    <div class="photo-placeholder">
                      <i class="fas fa-user-md"></i>
                    </div>
                  </div>
                  <div class="advisor-info">
                    <h4>Dr. Mala Airun</h4>
                    <p class="advisor-role">Clinical Director & Healthcare Strategist</p>
                    <p>Graduate of SMS Medical College, Jaipur, with extensive experience in hospital
                      administration, clinical governance, and strategic planning.</p>
                    <div className='advisor-viewmore'>
                      <button className='btn btn-outline'
                        onClick={() => setShowModal(true)}
                        onMouseEnter={() => setShowModal(true)}
                      >View More</button>
                    </div>
                  </div>

                </div>
              </div>

              {showModal && (
                <div className="advisor-modal">
                  <div className="advisor-modal-content">
                    <button className="modal-close" onClick={() => setShowModal(false)}>
                      &times;
                    </button>
                    <h3>Dr. Mala Airun</h3>
                    <p><b>Clinical Director &amp; Healthcare Strategist</b></p>
                    <p>Dr. Mala Airun is a highly respected healthcare leader with extensive experience as a <b>Clinical
                      Director</b> and <b>hospital operations strategist</b>. A graduate of <b>SMS Medical College, Jaipur</b>, she
                      has built a distinguished career in the <b>hospital and healthcare industry</b>, excelling in
                      <b>operations management, clinical governance, and strategic planning</b>.</p>
                    <p>Her expertise spans across:
                      <li>Hospital Administration &amp; Operations Management</li>
                      <li>Strategic Healthcare Planning &amp; Policy Implementation</li>
                      <li>Quality Assurance and Patient Safety in Hospitals</li>
                      <li>Training &amp; Mentorship of Healthcare Professionals</li>
                    </p>
                    <hr />
                    <p>With a proven track record of leading large healthcare teams and driving efficiency in
                      hospital ecosystems, Dr. Mala provides invaluable guidance to Impetus Consulting. Her
                      insights help us design <b>AI-driven hospital solutions, patient management systems, and
                        quality tools</b> that are not only technologically advanced but also clinically relevant and
                      compliant with industry standards.</p>
                    <p>By combining her <b>clinical expertise and administrative acumen</b>, Dr. Mala ensures that
                      Impetus products meet the dual goals of <b>operational excellence and patient-centric care</b>.</p>
                    <p><b>Guiding Us Towards Smarter Healthcare</b>
                      Our Advisory Panel acts as a bridge between <b>medical excellence and technological
                        innovation</b>. With experts like <b>Dr. Mala Airun</b>, we are constantly refining our solutions to
                      ensure that they add real value to hospitals, clinics, and healthcare professionals across
                      India.</p>
                  </div>
                </div>
              )}

            </div>
          </section>

          {/* <!-- Contact Section --> */}
          <section id="contact" class="contact">
            <div class="container">
              <div class="section-header">
                <h2 class="section-title">Contact Us</h2>
                <p class="section-subtitle">Partnering Hospitals in Service, Communication, and Technology</p>
              </div>

              <div class="contact-content">
                <div class="contact-info">
                  <div class="contact-item">
                    <div class="contact-icon">
                      <i class="fas fa-phone"></i>
                    </div>
                    <div class="contact-details">
                      <h4>Phone</h4>
                      <p>8441818414</p>
                    </div>
                  </div>

                  <div class="contact-item">
                    <div class="contact-icon">
                      <i class="fas fa-envelope"></i>
                    </div>
                    <div class="contact-details">
                      <h4>Email</h4>
                      <p>support@icaimpetus.com</p>
                    </div>
                  </div>

                  {/* <div class="contact-item">
                    <div class="contact-icon">
                      <i class="fas fa-globe"></i>
                    </div>
                    <div class="contact-details">
                      <h4>Website</h4>
                      <p>icaimpetus.com</p>
                    </div>
                  </div> */}

                  <div class="contact-item">
                    <div class="contact-icon">
                      <i class="fas fa-map-marker-alt"></i>
                    </div>
                    <div class="contact-details">
                      <h4>Offices</h4>
                      <p>Rajasthan, Gujarat</p>
                    </div>
                  </div>
                </div>

                <div class="contact-form">
                  <form id="contactForm" onSubmit={handleSubmit}>
                    <div className="form-group">
                      <input
                        type="text"
                        id="name"
                        name="name"
                        placeholder="Your Name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <input
                        type="email"
                        id="email"
                        name="email"
                        placeholder="Your Email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <input
                        type="text"
                        id="subject"
                        name="subject"
                        placeholder="Subject"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <textarea
                        id="message"
                        name="message"
                        rows="5"
                        placeholder="Your Message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <button type="submit" className="btn btn-primary">Send Message</button>
                  </form>
                </div>
              </div>
            </div>
          </section>

          {/* <!-- Footer --> */}

          <footer>
            <div class="footer-container">
              <div class="footer-col">
                <h4>About ICA</h4>
                <p>Impetus Consulting Associate Pvt. Ltd. (ICA) empowers organizations through business strategy, IT
                  solutions, and digital transformation services. We believe in driving growth with innovation and
                  integrity.
                </p>
              </div>
              <div class="footer-col">
                <h4>Quick Links</h4>
                <ul>
                  <li><a href="#about">About Us</a></li>
                  <li><a href="#solutions">Our Solutions</a></li>
                  {/* <li><a href="#projects">Projects</a></li> */}
                  <li><a href="#team">Our Team</a></li>
                  <li><a href="#contact">Contact</a></li>
                </ul>
              </div>
              <div class="footer-col">
                <h4>Contact Us</h4>
                <p>📍 Corporate Office: Jaipur, Rajasthan, India</p>
                <p>✉️ Email: support@icaimpetus.com</p>
                <p>📞 Phone: +91 8441818414</p>
              </div>
              {/* <!-- <div class="footer-col">
          <h4>Follow Us</h4>
          <div class="social-links">
            <a href="#">🌐</a>
            <a href="#">📘</a>
            <a href="#">🐦</a>
            <a href="#">📸</a>
            <a href="#">💼</a>
          </div>
        </div> --> */}
            </div>
            <div class="footer-bottom">
              {/* <!-- <br><br><br><br> <br><br><br><br><br><br><br><br><br><br><br><br> --> */}
              <span id="year">©Impetus Consulting Associate Pvt. Ltd. (ICA) | All Rights Reserved</span>
            </div>
          </footer>


        </div >
      </div >
    </>
  )
}

export default App
