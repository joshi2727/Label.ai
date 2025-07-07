interface ResearchedIngredient {
  name: string;
  definition: string;
  healthImpacts: string;
  safetyLevel: 'safe' | 'caution' | 'warning';
  dailyLimit?: string;
  sources: string[];
}

// Enhanced ingredient knowledge base for better fallback analysis
const ingredientKnowledge: Record<string, Partial<ResearchedIngredient>> = {
  // Sweeteners
  'aspartame': {
    safetyLevel: 'caution',
    definition: 'Artificial sweetener approximately 200 times sweeter than sugar',
    healthImpacts: 'FDA-approved but some individuals may experience headaches or sensitivity. Not recommended for people with phenylketonuria (PKU).',
    dailyLimit: 'ADI: 40mg/kg body weight per day (FDA)',
    sources: ['FDA.gov', 'WHO/FAO Expert Committee']
  },
  'sucralose': {
    safetyLevel: 'safe',
    definition: 'Non-caloric artificial sweetener made from sugar',
    healthImpacts: 'Generally recognized as safe with no known adverse effects in normal consumption.',
    dailyLimit: 'ADI: 5mg/kg body weight per day',
    sources: ['FDA.gov', 'Health Canada']
  },
  'stevia': {
    safetyLevel: 'safe',
    definition: 'Natural sweetener derived from the stevia plant',
    healthImpacts: 'Generally safe with potential blood sugar benefits.',
    sources: ['FDA.gov', 'American Diabetes Association']
  },
  
  // Preservatives
  'sodium benzoate': {
    safetyLevel: 'caution',
    definition: 'Synthetic preservative used to prevent bacteria and fungi growth',
    healthImpacts: 'Generally safe in small amounts but may form benzene when combined with vitamin C under certain conditions.',
    dailyLimit: 'ADI: 0-5mg/kg body weight per day',
    sources: ['FDA.gov', 'European Food Safety Authority']
  },
  'potassium sorbate': {
    safetyLevel: 'safe',
    definition: 'Preservative that inhibits mold and yeast growth',
    healthImpacts: 'Generally recognized as safe with minimal health concerns.',
    sources: ['FDA.gov', 'WHO']
  },
  'bht': {
    safetyLevel: 'caution',
    definition: 'Butylated hydroxytoluene, synthetic antioxidant preservative',
    healthImpacts: 'Some studies suggest potential endocrine disruption concerns, though FDA considers it safe in small amounts.',
    dailyLimit: 'Use limited in foods',
    sources: ['FDA.gov', 'Environmental Working Group']
  },
  'bha': {
    safetyLevel: 'warning',
    definition: 'Butylated hydroxyanisole, synthetic antioxidant preservative',
    healthImpacts: 'Classified as reasonably anticipated to be a human carcinogen by some agencies.',
    dailyLimit: 'Minimize consumption',
    sources: ['National Toxicology Program', 'FDA.gov']
  },
  
  // Colors
  'tartrazine': {
    safetyLevel: 'caution',
    definition: 'Yellow food dye (Yellow No. 5)',
    healthImpacts: 'May cause allergic reactions and hyperactivity in sensitive individuals, especially children.',
    dailyLimit: 'ADI: 0-7.5mg/kg body weight per day',
    sources: ['FDA.gov', 'European Food Safety Authority']
  },
  'red 40': {
    safetyLevel: 'caution',
    definition: 'Synthetic red food coloring',
    healthImpacts: 'Some studies link to hyperactivity in children. Generally considered safe in moderation.',
    sources: ['FDA.gov', 'Journal of Pediatrics']
  },
  
  // Oils and Fats
  'palm oil': {
    safetyLevel: 'caution',
    definition: 'Vegetable oil derived from palm fruit',
    healthImpacts: 'High in saturated fat. Environmental concerns about production practices.',
    dailyLimit: 'Limit saturated fat intake',
    sources: ['American Heart Association', 'World Health Organization']
  },
  'trans fat': {
    safetyLevel: 'warning',
    definition: 'Artificially created fat through hydrogenation',
    healthImpacts: 'Increases bad cholesterol and heart disease risk. Banned in many countries.',
    dailyLimit: 'Avoid completely',
    sources: ['FDA.gov', 'American Heart Association']
  },
  'hydrogenated oil': {
    safetyLevel: 'warning',
    definition: 'Oil processed to be solid at room temperature',
    healthImpacts: 'Often contains trans fats, linked to cardiovascular disease.',
    dailyLimit: 'Avoid or minimize',
    sources: ['FDA.gov', 'Harvard T.H. Chan School of Public Health']
  },
  
  // Common safe ingredients
  'water': { safetyLevel: 'safe', definition: 'H2O, essential for life' },
  'salt': { safetyLevel: 'safe', definition: 'Sodium chloride, essential mineral', dailyLimit: 'Less than 2,300mg sodium per day' },
  'sugar': { safetyLevel: 'caution', definition: 'Sucrose, natural sweetener', dailyLimit: 'Limit added sugars to less than 10% of daily calories' },
  'flour': { safetyLevel: 'safe', definition: 'Ground grain, typically wheat' },
  'yeast': { safetyLevel: 'safe', definition: 'Microorganism used for fermentation' },
  'baking soda': { safetyLevel: 'safe', definition: 'Sodium bicarbonate, leavening agent' },
  'vanilla': { safetyLevel: 'safe', definition: 'Natural flavoring from vanilla beans' },
  'lemon juice': { safetyLevel: 'safe', definition: 'Natural citric acid from lemons' },
  'olive oil': { safetyLevel: 'safe', definition: 'Healthy monounsaturated fat from olives' },
  'vinegar': { safetyLevel: 'safe', definition: 'Acetic acid, natural preservative' }
};

export async function researchIngredient(ingredientName: string, userAge: number = 25): Promise<ResearchedIngredient> {
  console.log(`Researching ingredient: ${ingredientName}`);
  
  // Clean and normalize ingredient name
  const cleanName = ingredientName.toLowerCase()
    .replace(/[()]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
  
  // Check our enhanced knowledge base first
  const knownIngredient = findKnownIngredient(cleanName);
  
  if (knownIngredient) {
    return {
      name: ingredientName,
      definition: knownIngredient.definition || `${ingredientName} is a food ingredient used in processed foods.`,
      healthImpacts: knownIngredient.healthImpacts || generateBasicHealthImpact(ingredientName, knownIngredient.safetyLevel || 'caution', userAge),
      safetyLevel: knownIngredient.safetyLevel || 'caution',
      dailyLimit: knownIngredient.dailyLimit || getAgeBasedLimit(userAge),
      sources: knownIngredient.sources || ['FDA Food Ingredients Database', 'General food safety guidelines']
    };
  }
  
  // For unknown ingredients, use intelligent categorization instead of web search
  // This avoids CORS and API issues while still providing helpful information
  return categorizeUnknownIngredient(cleanName, ingredientName, userAge);
}

function findKnownIngredient(cleanName: string): Partial<ResearchedIngredient> | null {
  // Direct match
  if (ingredientKnowledge[cleanName]) {
    return ingredientKnowledge[cleanName];
  }
  
  // Partial matches
  for (const [key, value] of Object.entries(ingredientKnowledge)) {
    if (cleanName.includes(key) || key.includes(cleanName)) {
      return value;
    }
  }
  
  return null;
}

function categorizeUnknownIngredient(cleanName: string, originalName: string, userAge: number): ResearchedIngredient {
  let safetyLevel: 'safe' | 'caution' | 'warning' = 'caution';
  let definition = `${originalName} is a food ingredient.`;
  let healthImpacts = '';
  let sources = ['General food safety guidelines'];
  
  // Categorize based on common patterns
  if (cleanName.includes('natural') || cleanName.includes('organic')) {
    safetyLevel = 'safe';
    definition += ' This appears to be a natural ingredient.';
    healthImpacts = 'Natural ingredients are generally safer but individual sensitivities may still occur.';
  } else if (cleanName.includes('artificial') || cleanName.includes('synthetic')) {
    safetyLevel = 'caution';
    definition += ' This appears to be an artificial ingredient.';
    healthImpacts = 'Artificial ingredients require individual assessment for safety and potential sensitivities.';
  } else if (cleanName.includes('color') || cleanName.includes('dye') || cleanName.includes('fd&c')) {
    safetyLevel = 'caution';
    definition += ' This appears to be a food coloring agent.';
    healthImpacts = 'Food colorings may cause allergic reactions or hyperactivity in sensitive individuals, especially children.';
    sources = ['FDA Color Additives', 'European Food Safety Authority'];
  } else if (cleanName.includes('preservative') || cleanName.includes('acid')) {
    safetyLevel = 'caution';
    definition += ' This appears to be a preservative or acidifying agent.';
    healthImpacts = 'Preservatives help food safety but some individuals may have sensitivities.';
  } else if (cleanName.includes('vitamin') || cleanName.includes('mineral')) {
    safetyLevel = 'safe';
    definition += ' This appears to be a vitamin or mineral supplement.';
    healthImpacts = 'Vitamins and minerals are generally beneficial when consumed in appropriate amounts.';
  } else if (cleanName.includes('extract') || cleanName.includes('essence')) {
    safetyLevel = 'safe';
    definition += ' This appears to be a natural extract or essence.';
    healthImpacts = 'Natural extracts are generally safe but may cause allergies in sensitive individuals.';
  }
  
  // Add age-specific considerations
  if (userAge < 18) {
    healthImpacts += ' Children may be more sensitive to food additives and should consume processed foods in moderation.';
  } else if (userAge > 65) {
    healthImpacts += ' Older adults may want to limit processed food additives and focus on whole foods.';
  }
  
  return {
    name: originalName,
    definition: definition.trim(),
    healthImpacts: healthImpacts || generateBasicHealthImpact(originalName, safetyLevel, userAge),
    safetyLevel,
    dailyLimit: getAgeBasedLimit(userAge),
    sources
  };
}

function generateBasicHealthImpact(ingredient: string, safetyLevel: string, userAge: number): string {
  const ageGroup = userAge < 18 ? 'children and adolescents' : 
                   userAge > 65 ? 'older adults' : 'adults';
  
  switch (safetyLevel) {
    case 'safe':
      return `${ingredient} is generally considered safe for consumption by ${ageGroup} when used in normal food quantities. Monitor for any individual sensitivities.`;
    case 'warning':
      return `${ingredient} has been associated with potential health concerns and should be consumed with caution or avoided, especially by ${ageGroup}. Consider consulting a healthcare provider.`;
    default:
      return `${ingredient} requires moderate caution. Individual sensitivities may vary, and ${ageGroup} should monitor their response to this ingredient.`;
  }
}

function getAgeBasedLimit(userAge: number): string {
  if (userAge < 18) {
    return "Children should follow stricter limits - consult pediatric nutrition guidelines and healthcare providers";
  } else if (userAge > 65) {
    return "Older adults may need reduced intake - consult healthcare provider for personalized recommendations";
  }
  return "Follow standard adult serving recommendations and monitor individual tolerance";
}