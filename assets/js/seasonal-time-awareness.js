// Seasonal and Time Awareness System
class SeasonalTimeAwareness {
  constructor() {
    this.init();
  }

  init() {
    this.applyTimeOfDayEffects();
    this.applySeasonalEffects();
    this.setupPeriodicUpdates();
    this.initializeSeasonalLotus();
  }

  // Time of Day Color Temperature System
  applyTimeOfDayEffects() {
    const now = new Date();
    const hour = now.getHours();
    const timePhase = this.getTimePhase(hour);
    const intensity = this.getTimeIntensity(hour);

    // Apply time-based CSS custom properties
    document.documentElement.style.setProperty('--time-phase', timePhase.name);
    document.documentElement.style.setProperty('--time-intensity', intensity);
    
    // Add time-based classes to body
    document.body.classList.add(`time-${timePhase.name}`);
    document.body.setAttribute('data-time-phase', timePhase.name);
    document.body.setAttribute('data-time-hour', hour);

    this.createTimeBasedStyles(timePhase, intensity);
  }

  getTimePhase(hour) {
    // Define time phases with philosophical meanings
    if (hour >= 5 && hour < 8) {
      return { 
        name: 'dawn', 
        description: 'Awakening consciousness',
        colors: { warm: '#FFE4B5', cool: '#E6E6FA', accent: '#F0E68C' }
      };
    } else if (hour >= 8 && hour < 12) {
      return { 
        name: 'morning', 
        description: 'Active contemplation',
        colors: { warm: '#FFF8DC', cool: '#F5F5DC', accent: '#DEB887' }
      };
    } else if (hour >= 12 && hour < 17) {
      return { 
        name: 'afternoon', 
        description: 'Clarity of thought',
        colors: { warm: '#FFFFFF', cool: '#F8F8FF', accent: '#E0E0E0' }
      };
    } else if (hour >= 17 && hour < 20) {
      return { 
        name: 'evening', 
        description: 'Reflection begins',
        colors: { warm: '#FFE4E1', cool: '#E6E6FA', accent: '#DDA0DD' }
      };
    } else if (hour >= 20 && hour < 23) {
      return { 
        name: 'dusk', 
        description: 'Deep contemplation',
        colors: { warm: '#2F2F4F', cool: '#483D8B', accent: '#6A5ACD' }
      };
    } else {
      return { 
        name: 'night', 
        description: 'Inner journey',
        colors: { warm: '#1C1C2E', cool: '#2E2E4F', accent: '#4B0082' }
      };
    }
  }

  getTimeIntensity(hour) {
    // Create a smooth intensity curve throughout the day
    const dayMinutes = hour * 60 + new Date().getMinutes();
    const totalMinutes = 24 * 60;
    
    // Peak intensity at noon, minimum at midnight
    return Math.abs(Math.sin((dayMinutes / totalMinutes) * Math.PI)) * 0.3 + 0.7;
  }

  createTimeBasedStyles(timePhase, intensity) {
    const existingStyle = document.getElementById('time-awareness-styles');
    if (existingStyle) existingStyle.remove();

    const style = document.createElement('style');
    style.id = 'time-awareness-styles';
    
    // Apply subtle color temperature shifts
    style.textContent = `
      body.time-${timePhase.name} {
        --primary-bg-color: ${timePhase.colors.warm};
        --secondary-bg-color: ${timePhase.colors.cool};
        --accent-color: ${timePhase.colors.accent};
        --time-filter: brightness(${intensity}) saturate(${0.8 + intensity * 0.2});
      }
      
      body.time-${timePhase.name} .site-header,
      body.time-${timePhase.name} .container {
        filter: var(--time-filter);
        transition: filter 10s ease;
      }
      
      body.time-${timePhase.name}::before {
        background-image: 
          radial-gradient(circle at 30% 40%, ${this.hexToRgba(timePhase.colors.warm, 0.02)} 0%, transparent 50%),
          radial-gradient(circle at 70% 60%, ${this.hexToRgba(timePhase.colors.cool, 0.015)} 0%, transparent 50%);
        animation: time-ambient-${timePhase.name} 20s ease-in-out infinite;
      }
      
      @keyframes time-ambient-${timePhase.name} {
        0%, 100% { 
          background-position: 30% 40%, 70% 60%;
          opacity: ${0.01 + intensity * 0.02};
        }
        50% { 
          background-position: 35% 35%, 65% 65%;
          opacity: ${0.005 + intensity * 0.01};
        }
      }
    `;
    
    document.head.appendChild(style);
  }

  // Seasonal Effects System
  applySeasonalEffects() {
    const season = this.getCurrentSeason();
    const seasonIntensity = this.getSeasonalIntensity();
    
    document.body.classList.add(`season-${season.name}`);
    document.body.setAttribute('data-season', season.name);
    document.body.setAttribute('data-season-intensity', seasonIntensity);
    
    this.createSeasonalStyles(season, seasonIntensity);
  }

  getCurrentSeason() {
    const now = new Date();
    const month = now.getMonth(); // 0-11
    const day = now.getDate();
    
    // Define seasons with philosophical associations
    if ((month === 2 && day >= 20) || month === 3 || month === 4 || (month === 5 && day < 21)) {
      return { 
        name: 'spring', 
        description: 'Renewal and growth',
        lotus: 'budding',
        colors: { primary: '#98FB98', secondary: '#F0FFF0', accent: '#90EE90' }
      };
    } else if ((month === 5 && day >= 21) || month === 6 || month === 7 || (month === 8 && day < 23)) {
      return { 
        name: 'summer', 
        description: 'Full bloom of consciousness',
        lotus: 'flowering',
        colors: { primary: '#FFE4B5', secondary: '#FFFACD', accent: '#F0E68C' }
      };
    } else if ((month === 8 && day >= 23) || month === 9 || month === 10 || (month === 11 && day < 22)) {
      return { 
        name: 'autumn', 
        description: 'Wisdom of letting go',
        lotus: 'mature',
        colors: { primary: '#DEB887', secondary: '#F5DEB3', accent: '#D2691E' }
      };
    } else {
      return { 
        name: 'winter', 
        description: 'Inner contemplation',
        lotus: 'dormant',
        colors: { primary: '#E6E6FA', secondary: '#F8F8FF', accent: '#D8BFD8' }
      };
    }
  }

  getSeasonalIntensity() {
    const now = new Date();
    const dayOfYear = this.getDayOfYear(now);
    const totalDays = this.isLeapYear(now.getFullYear()) ? 366 : 365;
    
    // Create seasonal intensity curve (stronger at solstices/equinoxes)
    return Math.abs(Math.sin((dayOfYear / totalDays) * 4 * Math.PI)) * 0.4 + 0.6;
  }

  createSeasonalStyles(season, intensity) {
    const existingStyle = document.getElementById('seasonal-awareness-styles');
    if (existingStyle) existingStyle.remove();

    const style = document.createElement('style');
    style.id = 'seasonal-awareness-styles';
    
    style.textContent = `
      body.season-${season.name} {
        --seasonal-primary: ${season.colors.primary};
        --seasonal-secondary: ${season.colors.secondary};
        --seasonal-accent: ${season.colors.accent};
        --seasonal-intensity: ${intensity};
      }
      
      body.season-${season.name} .contextual-bg::before {
        mix-blend-mode: ${season.name === 'winter' ? 'soft-light' : 'normal'};
        opacity: ${0.015 + intensity * 0.01} !important;
      }
      
      body.season-${season.name} .container::after {
        opacity: ${0.25 + intensity * 0.15};
        filter: hue-rotate(${this.getSeasonalHueRotation(season.name)}deg);
        transition: all 30s ease;
      }
    `;
    
    document.head.appendChild(style);
  }

  getSeasonalHueRotation(seasonName) {
    const rotations = {
      spring: 15,   // Slight green shift
      summer: 30,   // Warmer yellows
      autumn: -20,  // Cooler, more orange
      winter: -10   // Slightly blue
    };
    return rotations[seasonName] || 0;
  }

  // Seasonal Lotus Watermark System
  initializeSeasonalLotus() {
    const season = this.getCurrentSeason();
    this.updateLotusWatermark(season);
  }

  updateLotusWatermark(season) {
    const existingStyle = document.getElementById('seasonal-lotus-styles');
    if (existingStyle) existingStyle.remove();

    const style = document.createElement('style');
    style.id = 'seasonal-lotus-styles';
    
    // Different lotus states for different seasons
    const lotusConfigs = {
      spring: { scale: 0.9, opacity: 0.4, filter: 'brightness(1.1) hue-rotate(10deg)' },
      summer: { scale: 1.1, opacity: 0.45, filter: 'brightness(1.2) saturate(1.1)' },
      autumn: { scale: 1.0, opacity: 0.35, filter: 'brightness(0.9) hue-rotate(-15deg)' },
      winter: { scale: 0.8, opacity: 0.25, filter: 'brightness(0.8) saturate(0.8)' }
    };
    
    const config = lotusConfigs[season.name] || lotusConfigs.summer;
    
    style.textContent = `
      .container::after {
        transform: scale(${config.scale});
        opacity: ${config.opacity} !important;
        filter: ${config.filter};
        animation: lotus-${season.name} 30s ease-in-out infinite;
      }
      
      @keyframes lotus-${season.name} {
        0%, 100% { transform: scale(${config.scale}) rotate(0deg); }
        50% { transform: scale(${config.scale * 1.05}) rotate(${season.name === 'autumn' ? '2deg' : '-1deg'}); }
      }
    `;
    
    document.head.appendChild(style);
  }

  // Periodic Updates
  setupPeriodicUpdates() {
    // Update time effects every 10 minutes
    setInterval(() => {
      this.applyTimeOfDayEffects();
    }, 10 * 60 * 1000);
    
    // Update seasonal effects daily at midnight
    const now = new Date();
    const tomorrow = new Date(now);
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(0, 0, 0, 0);
    
    const msUntilMidnight = tomorrow.getTime() - now.getTime();
    
    setTimeout(() => {
      this.applySeasonalEffects();
      // Then update daily
      setInterval(() => {
        this.applySeasonalEffects();
      }, 24 * 60 * 60 * 1000);
    }, msUntilMidnight);
  }

  // Utility Functions
  hexToRgba(hex, alpha) {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  }

  getDayOfYear(date) {
    const start = new Date(date.getFullYear(), 0, 0);
    const diff = date - start;
    const oneDay = 1000 * 60 * 60 * 24;
    return Math.floor(diff / oneDay);
  }

  isLeapYear(year) {
    return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
  }

  // Public Methods for External Integration
  getCurrentPhase() {
    const hour = new Date().getHours();
    const timePhase = this.getTimePhase(hour);
    const season = this.getCurrentSeason();
    
    return {
      time: timePhase,
      season: season,
      intensity: {
        time: this.getTimeIntensity(hour),
        season: this.getSeasonalIntensity()
      }
    };
  }

  // Method to trigger special seasonal transitions
  triggerSeasonalTransition() {
    const season = this.getCurrentSeason();
    const body = document.body;
    
    // Add temporary transition class
    body.classList.add('seasonal-transition');
    
    // Intensify effects temporarily
    const style = document.createElement('style');
    style.textContent = `
      .seasonal-transition .contextual-bg::before {
        opacity: 0.08 !important;
        animation-duration: 3s !important;
      }
      .seasonal-transition .container::after {
        opacity: 0.8 !important;
        transform: scale(1.3) !important;
      }
    `;
    document.head.appendChild(style);
    
    // Return to normal after 5 seconds
    setTimeout(() => {
      body.classList.remove('seasonal-transition');
      document.head.removeChild(style);
    }, 5000);
  }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  window.seasonalTimeAwareness = new SeasonalTimeAwareness();
  
  // Make transition method available globally
  window.triggerSeasonalTransition = () => {
    if (window.seasonalTimeAwareness) {
      window.seasonalTimeAwareness.triggerSeasonalTransition();
    }
  };
  
  // Expose current phase info for debugging or other features
  window.getCurrentPhase = () => {
    return window.seasonalTimeAwareness ? window.seasonalTimeAwareness.getCurrentPhase() : null;
  };
});