// Simple Lotus Seasonal Shifts (Safe Version)
class SimpleLotusSeasons {
  constructor() {
    this.init();
  }

  init() {
    this.updateLotusForSeason();
  }

  getCurrentSeason() {
    const now = new Date();
    const month = now.getMonth(); // 0-11
    const day = now.getDate();
    
    if ((month === 2 && day >= 20) || month === 3 || month === 4 || (month === 5 && day < 21)) {
      return 'spring';
    } else if ((month === 5 && day >= 21) || month === 6 || month === 7 || (month === 8 && day < 23)) {
      return 'summer';
    } else if ((month === 8 && day >= 23) || month === 9 || month === 10 || (month === 11 && day < 22)) {
      return 'autumn';
    } else {
      return 'winter';
    }
  }

  updateLotusForSeason() {
    const season = this.getCurrentSeason();
    
    // Only modify the existing lotus watermark slightly
    const style = document.createElement('style');
    style.id = 'simple-lotus-seasonal';
    
    const lotusConfigs = {
      spring: { scale: 0.9, opacity: 0.4, filter: 'brightness(1.1) hue-rotate(10deg)' },
      summer: { scale: 1.1, opacity: 0.45, filter: 'brightness(1.2) saturate(1.1)' },
      autumn: { scale: 1.0, opacity: 0.35, filter: 'brightness(0.9) hue-rotate(-15deg)' },
      winter: { scale: 0.8, opacity: 0.25, filter: 'brightness(0.8) saturate(0.8)' }
    };
    
    const config = lotusConfigs[season];
    
    style.textContent = `
      .container::after {
        transform: scale(${config.scale}) !important;
        opacity: ${config.opacity} !important;
        filter: ${config.filter} !important;
      }
    `;
    
    document.head.appendChild(style);
  }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new SimpleLotusSeasons();
});