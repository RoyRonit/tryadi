
export const generateInterestCategories = (url: string): string[] => {
  // This is mock data - in a real application, this would be determined by analyzing the website
  const interestMap: Record<string, string[]> = {
    default: [
      "Fashion & Style", 
      "Fitness", 
      "Home Decor", 
      "Health & Wellness",
      "Beauty", 
      "Sports", 
      "Technology", 
      "Gaming", 
      "Food & Cooking", 
      "Travel"
    ],
    
    // Fashion related sites
    shop: ["Fashion & Style", "Beauty", "Shopping", "Luxury", "Clothing", "Accessories", "Jewelry", "Seasonal Fashion"],
    fashion: ["Fashion & Style", "Shopping", "Beauty", "Clothing", "Models", "Fashion Week", "Luxury", "Accessories"],
    clothing: ["Fashion & Style", "Clothing", "Shopping", "Streetwear", "Seasonal Fashion", "Accessories"],
    
    // Tech related sites
    tech: ["Technology", "Gadgets", "Programming", "Innovation", "Smartphones", "Computers", "AI", "Software"],
    electronic: ["Technology", "Gadgets", "Smart Home", "Smartphones", "Computers", "Audio", "Gaming"],
    gadget: ["Technology", "Gadgets", "Smartphones", "Innovation", "Smart Home", "Reviews"],
    
    // Food related sites
    food: ["Food & Cooking", "Recipes", "Restaurants", "Cooking", "Baking", "Healthy Eating", "Gourmet"],
    recipe: ["Food & Cooking", "Recipes", "Baking", "Cooking", "Healthy Eating", "Kitchen", "Meal Prep"],
    restaurant: ["Food & Cooking", "Restaurants", "Dining", "Gourmet", "Food Tourism"],
    
    // Health related sites
    health: ["Health & Wellness", "Fitness", "Nutrition", "Medical", "Mental Health", "Supplements", "Healthcare"],
    fitness: ["Fitness", "Workout", "Exercise", "Health & Wellness", "Sports", "Nutrition", "Weight Loss"],
    wellness: ["Health & Wellness", "Meditation", "Yoga", "Mental Health", "Natural Health", "Self-care"],
    
    // Home related sites
    home: ["Home Decor", "DIY", "Interior Design", "Furniture", "Architecture", "Real Estate", "Home Improvement"],
    decor: ["Home Decor", "Interior Design", "Furniture", "Design", "Architecture", "Luxury Homes"],
    furniture: ["Home Decor", "Furniture", "Interior Design", "Home Improvement", "Modern Living"],
    
    // Beauty related sites
    beauty: ["Beauty", "Skincare", "Makeup", "Cosmetics", "Hair", "Nails", "Self-care"],
    cosmetic: ["Beauty", "Makeup", "Skincare", "Cosmetics", "Luxury Beauty", "Beauty Trends"],
    skincare: ["Beauty", "Skincare", "Self-care", "Health & Wellness", "Natural Beauty"],
    
    // Travel related sites
    travel: ["Travel", "Adventure", "Tourism", "Vacation", "Destinations", "Luxury Travel", "Budget Travel"],
    tourism: ["Travel", "Tourism", "Destinations", "Vacation", "Cultural Travel", "Travel Photography"],
    vacation: ["Travel", "Vacation", "Hotels", "Resorts", "Luxury Travel", "Family Travel"]
  };
  
  // Find matching keywords in the URL
  const lowerUrl = url.toLowerCase();
  let matchedInterests: string[] = [];
  
  Object.keys(interestMap).forEach(keyword => {
    if (lowerUrl.includes(keyword)) {
      matchedInterests = [...matchedInterests, ...interestMap[keyword]];
    }
  });
  
  // If no matches, return default categories
  if (matchedInterests.length === 0) {
    matchedInterests = interestMap.default;
  }
  
  // Remove duplicates
  return Array.from(new Set(matchedInterests)).sort();
};
