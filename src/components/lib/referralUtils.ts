/**
 * Provides utility functions for handling referral IDs based on domain and URL paths
 */

/**
 * List of known routes that should not be treated as referral IDs
 */
export const KNOWN_ROUTES = [
    'home-dark', 'home-classic', 'login', 'register', 'documentation', 
    'satoshi-matrix', 'satoshi-matrix-one', 'satoshi-matrix-test',
    'dashboard', 'dashboard-new', 'dashboard-classic', 'network-stats',
    'matrix', 'referral-stats', 'live-stream', 'oil', 'game',
    'deploy-contract', 'ico', 'web3btc', 'grimface-scale', '911',
    'direct-referrals-test', 'test-contracts'
  ];
  
  /**
   * Extracts a potential referral ID from a URL path
   * NOTE: This function is no longer used as the URL-based referral system has been removed
   * This function is kept for backward compatibility.
   * @param {string} path - The URL path to check
   * @returns {string|null} Always returns null as URL-based referrals are disabled
   */
  export function extractReferralIdFromPath(path: string): string | null {
    // URL-based referral system has been turned off
    return null;
  }
  
  /**
   * Gets the default referral ID based on the current domain
   * @returns {string} The default referral ID
   */
  export function getDefaultReferralId(): string {
    const hostname = window.location.hostname;
    
    if (hostname.includes('bitcoinmzunemployable.com')) {
      return '1912';
    } else if (hostname.includes('bitcoincryptosista.com')) {
      return '1569';
    } else if (hostname.includes('cryptoasha.com')) {
      return '1873';
    } else if (hostname.includes('cleargoldcrypto.com')) {
      return '2077';
    } else if (hostname.includes('stevieb.cc')) {
      return '1318';
    } else if (hostname.includes('chwikachris.pro')) {
      return '1118';
    } else if (hostname.includes('digicoinrocks.com')) {
      return '911';
    } else if (hostname.includes('web3sonic.com')) {
      return 'bitcoin';
    } else if (hostname.includes('thecryptorise.com')) {
      return '2086';
    }
    
    // Default ID if no domain match
    return 'bitcoin';
  }
  
  /**
   * Gets a cookie value by name
   * @param {string} name - The name of the cookie to get
   * @returns {string|null} The cookie value or null if not found
   */
  export function getCookie(name: string): string | null {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop()?.split(";").shift() || null;
    return null;
  }
  
  /**
   * Builds a registration URL with the appropriate referral ID
   * @param {string|null} referralId - The referral ID to use, or null to use the default
   * @param {number|null} level - Optional level parameter
   * @returns {string} The complete registration URL
   */
  export function buildReferralUrl(referralId: string | null, level: number | null = null): string {
    const baseUrl = 'https://dapp.web3sonic.com/register';
    const actualReferralId = referralId || getDefaultReferralId();
    
    if (level !== null) {
      return `${baseUrl}?ref=${actualReferralId}&level=${level}`;
    }
    
    return `${baseUrl}?ref=${actualReferralId}`;
  }