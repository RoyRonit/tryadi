
export interface ScrapedData {
  title: string;
  description: string;
  links: string[];
  images: string[];
  meta: Record<string, string>;
}

export const scrapeWebsite = async (url: string): Promise<ScrapedData> => {
  // In a real implementation, this would call a backend API
  // For demo purposes, we'll simulate a response with a timeout
  return new Promise((resolve) => {
    console.log(`Scraping website: ${url}`);
    
    setTimeout(() => {
      // Generate some fake data based on the URL
      const domain = new URL(url).hostname;
      
      resolve({
        title: `${domain} - Website Title`,
        description: `This is a simulated description for ${domain}. In a real implementation, this would be the actual scraped content from the website.`,
        links: [
          `https://${domain}/about`,
          `https://${domain}/products`,
          `https://${domain}/contact`,
        ],
        images: [
          `https://source.unsplash.com/random/300x200?sig=${Math.floor(Math.random() * 1000)}`,
          `https://source.unsplash.com/random/300x200?sig=${Math.floor(Math.random() * 1000)}`,
        ],
        meta: {
          "keywords": "example, demo, website, scrape",
          "author": "TikTok Ad Assistant",
          "viewport": "width=device-width, initial-scale=1"
        }
      });
    }, 1500);
  });
};

export const isValidUrl = (url: string): boolean => {
  try {
    new URL(url);
    return true;
  } catch (err) {
    return false;
  }
};
