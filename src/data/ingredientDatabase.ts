export interface IngredientData {
  id: string;
  name: string;
  aliases: string[];
  category: 'preservative' | 'sweetener' | 'coloring' | 'flavor' | 'thickener' | 'emulsifier' | 'natural' | 'vitamin' | 'mineral' | 'other';
  safetyLevel: 'safe' | 'caution' | 'warning';
  description: string;
  healthImpact: string;
  alternatives?: string;
  dailyLimit?: string;
  ageRestrictions?: {
    children: string;
    adults: string;
  };
  allergens?: string[];
  additionalInfo?: string;
}

export const ingredientDatabase: Record<string, IngredientData> = {
  // Sweeteners
  'sugar': {
    id: 'sugar',
    name: 'Sugar',
    aliases: ['sucrose', 'cane sugar', 'table sugar', 'white sugar'],
    category: 'sweetener',
    safetyLevel: 'caution',
    description: 'Simple carbohydrate that provides quick energy but lacks nutritional value.',
    healthImpact: 'High intake linked to obesity, dental issues, and blood sugar spikes. Contributes to empty calories.',
    alternatives: 'Stevia, monk fruit, or reduce overall sweetness gradually',
    dailyLimit: '25g recommended daily maximum (WHO guidelines)',
    ageRestrictions: {
      children: 'Limit to 12g per day for children under 12',
      adults: 'WHO recommends less than 25g per day'
    }
  },
  
  'high fructose corn syrup': {
    id: 'hfcs',
    name: 'High Fructose Corn Syrup',
    aliases: ['hfcs', 'corn syrup', 'fructose corn syrup', 'high-fructose corn syrup'],
    category: 'sweetener',
    safetyLevel: 'warning',
    description: 'Highly processed sweetener made from corn starch, cheaper alternative to sugar.',
    healthImpact: 'Linked to obesity, diabetes, fatty liver disease. Body processes it differently than regular sugar, bypassing normal satiety signals.',
    alternatives: 'Natural sweeteners like honey, maple syrup, or fruit',
    dailyLimit: 'Avoid when possible - no safe daily limit established',
    ageRestrictions: {
      children: 'Should be avoided in children under 2 years',
      adults: 'Limit consumption as much as possible'
    }
  },

  'aspartame': {
    id: 'aspartame',
    name: 'Aspartame',
    aliases: ['nutrasweet', 'equal', 'aspartame acesulfame salt'],
    category: 'sweetener',
    safetyLevel: 'caution',
    description: 'Artificial sweetener that is 200 times sweeter than sugar.',
    healthImpact: 'Generally recognized as safe by FDA, but some studies suggest potential links to headaches and mood changes in sensitive individuals.',
    alternatives: 'Stevia, monk fruit, or small amounts of natural sugars',
    dailyLimit: '40mg/kg body weight per day (FDA acceptable daily intake)',
    ageRestrictions: {
      children: 'Safe in normal amounts, but should be limited',
      adults: 'Generally safe within daily limits'
    }
  },

  // Artificial Colors
  'yellow 5': {
    id: 'yellow5',
    name: 'Yellow 5 (Tartrazine)',
    aliases: ['tartrazine', 'fd&c yellow no. 5', 'yellow dye 5', 'e102'],
    category: 'coloring',
    safetyLevel: 'warning',
    description: 'Artificial food coloring derived from petroleum, used to create yellow color.',
    healthImpact: 'May cause hyperactivity in children, allergic reactions, and asthma. Linked to behavioral issues in sensitive children.',
    alternatives: 'Natural colorings like turmeric, annatto, or beta-carotene',
    dailyLimit: '7.5mg/kg body weight per day (FDA acceptable daily intake)',
    ageRestrictions: {
      children: 'Avoid in children with ADHD or hyperactivity',
      adults: 'Generally safe but may cause allergic reactions'
    },
    allergens: ['may cause allergic reactions in sensitive individuals']
  },

  'red 40': {
    id: 'red40',
    name: 'Red 40 (Allura Red)',
    aliases: ['allura red', 'fd&c red no. 40', 'red dye 40', 'e129'],
    category: 'coloring',
    safetyLevel: 'warning',
    description: 'Most commonly used artificial red food coloring in the United States.',
    healthImpact: 'May cause hyperactivity in children, allergic reactions. Some studies suggest links to behavioral problems.',
    alternatives: 'Natural red colorings like beet juice, paprika extract, or lycopene',
    dailyLimit: '7mg/kg body weight per day',
    ageRestrictions: {
      children: 'Avoid in children under 3, limit in others',
      adults: 'Generally safe within limits but may cause reactions'
    }
  },

  // Preservatives
  'bht': {
    id: 'bht',
    name: 'BHT (Butylated Hydroxytoluene)',
    aliases: ['butylated hydroxytoluene', 'butylhydroxytoluene', 'e321'],
    category: 'preservative',
    safetyLevel: 'warning',
    description: 'Synthetic antioxidant used to prevent fats from becoming rancid.',
    healthImpact: 'Possible carcinogen, may cause liver and kidney damage. Linked to behavioral problems in children.',
    alternatives: 'Natural preservatives like vitamin E (tocopherols), rosemary extract',
    dailyLimit: '0.5mg/kg body weight per day',
    ageRestrictions: {
      children: 'Should be avoided in children when possible',
      adults: 'Limit consumption, avoid regular intake'
    }
  },

  'sodium benzoate': {
    id: 'sodium_benzoate',
    name: 'Sodium Benzoate',
    aliases: ['benzoate of soda', 'e211'],
    category: 'preservative',
    safetyLevel: 'caution',
    description: 'Common preservative that prevents growth of bacteria, yeast, and fungi.',
    healthImpact: 'Generally safe, but may form benzene (carcinogen) when combined with vitamin C. May worsen ADHD symptoms.',
    alternatives: 'Natural preservation methods, vitamin E, or citric acid',
    dailyLimit: '5mg/kg body weight per day',
    ageRestrictions: {
      children: 'Monitor intake, especially with vitamin C foods',
      adults: 'Safe in normal food amounts'
    }
  },

  // Natural Ingredients
  'natural vanilla flavor': {
    id: 'vanilla',
    name: 'Natural Vanilla Flavor',
    aliases: ['vanilla extract', 'natural vanilla', 'vanilla flavoring'],
    category: 'flavor',
    safetyLevel: 'safe',
    description: 'Flavoring derived from vanilla beans, generally recognized as safe.',
    healthImpact: 'Minimal health impact, provides pleasant taste without significant nutritional concerns.',
    alternatives: 'Pure vanilla extract for more authentic flavor',
    dailyLimit: 'No specific limit established - generally safe',
    ageRestrictions: {
      children: 'Safe for all ages',
      adults: 'Safe for all ages'
    }
  },

  'organic whole grain oats': {
    id: 'oats',
    name: 'Organic Whole Grain Oats',
    aliases: ['oats', 'whole oats', 'oat flour', 'rolled oats'],
    category: 'natural',
    safetyLevel: 'safe',
    description: 'Nutrient-rich whole grain providing fiber, protein, and essential minerals.',
    healthImpact: 'Supports heart health, digestive health, and provides sustained energy. Excellent source of beta-glucan fiber.',
    alternatives: 'Other whole grains like quinoa, brown rice, or barley',
    dailyLimit: 'No upper limit - encouraged as part of healthy diet',
    ageRestrictions: {
      children: 'Excellent choice for children over 6 months',
      adults: 'Highly recommended for all adults'
    }
  },

  // Common additives
  'monosodium glutamate': {
    id: 'msg',
    name: 'Monosodium Glutamate (MSG)',
    aliases: ['msg', 'sodium glutamate', 'e621', 'glutamate'],
    category: 'flavor',
    safetyLevel: 'caution',
    description: 'Flavor enhancer that adds umami (savory) taste to foods.',
    healthImpact: 'Generally recognized as safe by FDA, but some people report headaches, nausea, or flushing after consumption.',
    alternatives: 'Natural umami sources like mushrooms, tomatoes, or soy sauce',
    dailyLimit: 'No specific limit, but sensitive individuals should limit intake',
    ageRestrictions: {
      children: 'Safe in normal food amounts, monitor for sensitivity',
      adults: 'Safe for most people, avoid if sensitive'
    }
  },

  'sodium nitrite': {
    id: 'sodium_nitrite',
    name: 'Sodium Nitrite',
    aliases: ['nitrite', 'e250'],
    category: 'preservative',
    safetyLevel: 'warning',
    description: 'Preservative used in processed meats to maintain color and prevent bacterial growth.',
    healthImpact: 'Can form nitrosamines (potential carcinogens) when cooked at high temperatures. Linked to increased cancer risk.',
    alternatives: 'Uncured meats, celery powder, or fresh meats without preservatives',
    dailyLimit: '0.07mg/kg body weight per day',
    ageRestrictions: {
      children: 'Limit processed meats containing nitrites',
      adults: 'Minimize consumption of processed meats'
    }
  },

  'phosphoric acid': {
    id: 'phosphoric_acid',
    name: 'Phosphoric Acid',
    aliases: ['e338', 'orthophosphoric acid'],
    category: 'other',
    safetyLevel: 'caution',
    description: 'Acid used to add tart flavor to sodas and processed foods.',
    healthImpact: 'May interfere with calcium absorption, potentially weakening bones. Can erode tooth enamel.',
    alternatives: 'Citric acid or natural fruit acids',
    dailyLimit: '70mg/kg body weight per day',
    ageRestrictions: {
      children: 'Limit sodas and foods containing phosphoric acid',
      adults: 'Moderate consumption, especially if at risk for osteoporosis'
    }
  }
};

export function findIngredient(searchTerm: string): IngredientData | null {
  const normalizedSearch = searchTerm.toLowerCase().trim();
  
  // Direct name match
  if (ingredientDatabase[normalizedSearch]) {
    return ingredientDatabase[normalizedSearch];
  }
  
  // Search through all ingredients and their aliases
  for (const ingredient of Object.values(ingredientDatabase)) {
    if (ingredient.name.toLowerCase() === normalizedSearch) {
      return ingredient;
    }
    
    // Check aliases
    for (const alias of ingredient.aliases) {
      if (alias.toLowerCase() === normalizedSearch || 
          normalizedSearch.includes(alias.toLowerCase()) ||
          alias.toLowerCase().includes(normalizedSearch)) {
        return ingredient;
      }
    }
    
    // Partial name matching for compound ingredients
    if (normalizedSearch.includes(ingredient.name.toLowerCase()) ||
        ingredient.name.toLowerCase().includes(normalizedSearch)) {
      return ingredient;
    }
  }
  
  return null;
}

export function getPersonalizedAnalysis(ingredient: IngredientData, userAge: number): {
  riskLevel: 'safe' | 'caution' | 'warning';
  personalizedMessage: string;
  dailyLimit: string;
} {
  const isChild = userAge < 18;
  let riskLevel = ingredient.safetyLevel;
  let personalizedMessage = ingredient.healthImpact;
  let dailyLimit = ingredient.dailyLimit || 'No specific limit established';

  // Adjust risk level based on age
  if (isChild && ingredient.safetyLevel === 'caution') {
    riskLevel = 'warning';
    personalizedMessage = `⚠️ For your age (${userAge}): ${ingredient.ageRestrictions?.children || ingredient.healthImpact}`;
  } else if (isChild && ingredient.ageRestrictions?.children) {
    personalizedMessage = `For your age (${userAge}): ${ingredient.ageRestrictions.children}`;
  } else if (!isChild && ingredient.ageRestrictions?.adults) {
    personalizedMessage = ingredient.ageRestrictions.adults;
  }

  return {
    riskLevel,
    personalizedMessage,
    dailyLimit
  };
}