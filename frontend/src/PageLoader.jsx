import React, { useEffect, useState } from 'react';

function PageLoader() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const handleLoad = () => {
      setTimeout(() => setLoading(false), 1500); // extra delay to show loader
    };

    if (document.readyState === "complete") {
      handleLoad();
    } else {
      window.addEventListener('load', handleLoad);
    }

    // Cleanup listener
    return () => window.removeEventListener('load', handleLoad);
  }, []);

  if (!loading) return null;

  return (
    <div style={styles.loader}>
      <div style={styles.loaderContent}>
        <div style={styles.loaderIcon}>
          <img src="logo.png" alt="ICA" style={styles.logoImg} />
        </div>
        {/* <div style={styles.loaderText}>
          Loading...
        </div> */}
      </div>
    </div>
  );
}

const styles = {
  loader: {
    position: 'fixed',
    top: 0, left: 0,
    width: '100%',
    height: '100%',
    background: 'linear-gradient(135deg, rgba(37, 99, 235, 0.9), rgba(8, 9, 9, 0.9))',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10000,
    color: 'white',
    fontFamily: 'Inter, sans-serif',
  },
  loaderContent: {
    textAlign: 'center',
    animation: 'fadeIn 0.5s ease-in-out',
  },
  loaderIcon: {
    fontSize: '3rem',
    marginBottom: '1rem',
    animation: 'pulsee 2s infinite',
  },
  logoImg: {
    width: 68,
    height: 68,
    borderRadius: '50%',
  },
  loaderText: {
    fontSize: '1.2rem',
    fontWeight: 500,
  }
};

export default PageLoader;
