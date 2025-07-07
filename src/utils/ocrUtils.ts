import { createWorker } from 'tesseract.js';

export interface OCRResult {
  text: string;
  confidence: number;
  ingredients: string[];
}

let ocrWorker: Tesseract.Worker | null = null;

export async function initializeOCR(): Promise<void> {
  if (ocrWorker) return;
  
  ocrWorker = await createWorker('eng');
  await ocrWorker.setParameters({
    tessedit_char_whitelist: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789()[]{},.:-% ',
  });
}

export async function extractTextFromImage(imageFile: File | Blob | string): Promise<OCRResult> {
  try {
    if (!ocrWorker) {
      await initializeOCR();
    }

    console.log('Starting OCR recognition...');
    const { data: { text, confidence } } = await ocrWorker!.recognize(imageFile);
    console.log('OCR Raw text:', text);
    console.log('OCR Confidence:', confidence);
    
    // Parse ingredients from the extracted text
    const ingredients = parseIngredients(text);
    console.log('Parsed ingredients:', ingredients);
    
    // If no ingredients found, provide fallback
    if (ingredients.length === 0 && text.trim().length > 0) {
      // Try splitting by common patterns as fallback
      const fallbackIngredients = text
        .toLowerCase()
        .split(/[,\n;]/)
        .map(item => item.trim())
        .filter(item => item.length > 2 && item.length < 100)
        .slice(0, 20); // Limit to reasonable number
      
      console.log('Using fallback ingredients:', fallbackIngredients);
      
      return {
        text: text.trim(),
        confidence,
        ingredients: fallbackIngredients
      };
    }
    
    return {
      text: text.trim(),
      confidence,
      ingredients
    };
  } catch (error) {
    console.error('OCR Error:', error);
    throw new Error('Failed to extract text from image');
  }
}

export function parseIngredients(text: string): string[] {
  // Clean up the text
  let cleanText = text
    .replace(/\n/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

  // Look for common ingredient list patterns
  const ingredientPatterns = [
    /ingredients?:?\s*(.*?)(?=\.|nutrition|allergen|contains|$)/i,
    /contains?:?\s*(.*?)(?=\.|nutrition|allergen|ingredients|$)/i,
    // Fallback: use the entire text if no clear pattern
  ];

  let ingredientText = '';
  
  for (const pattern of ingredientPatterns) {
    const match = cleanText.match(pattern);
    if (match && match[1] && match[1].trim().length > 10) {
      ingredientText = match[1].trim();
      break;
    }
  }

  // If no pattern matched, use the whole text
  if (!ingredientText) {
    ingredientText = cleanText;
  }

  // Split ingredients by common separators
  const rawIngredients = ingredientText
    .split(/[,;]\s*/)
    .map(ingredient => ingredient.trim())
    .filter(ingredient => ingredient.length > 1 && ingredient.length < 200);

  // Clean up each ingredient
  const cleanedIngredients = rawIngredients.map(ingredient => {
    return ingredient
      .replace(/^\d+\.?\s*/, '') // Remove numbering
      .replace(/[\[\]()]/g, '') // Remove brackets temporarily for main ingredient
      .replace(/\.$/, '') // Remove trailing period
      .trim();
  }).filter(ingredient => ingredient.length > 1);

  return cleanedIngredients;
}

export async function terminateOCR(): Promise<void> {
  if (ocrWorker) {
    await ocrWorker.terminate();
    ocrWorker = null;
  }
}

// Utility function to preprocess image for better OCR results
export function preprocessImage(canvas: HTMLCanvasElement): void {
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const data = imageData.data;

  // Increase contrast and convert to grayscale for better OCR
  for (let i = 0; i < data.length; i += 4) {
    // Convert to grayscale
    const gray = Math.round(0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2]);
    
    // Increase contrast
    const contrast = 1.5;
    const factor = (259 * (contrast * 255 + 255)) / (255 * (259 - contrast * 255));
    const newGray = Math.min(255, Math.max(0, factor * (gray - 128) + 128));
    
    data[i] = newGray;     // Red
    data[i + 1] = newGray; // Green
    data[i + 2] = newGray; // Blue
    // Alpha channel remains unchanged
  }

  ctx.putImageData(imageData, 0, 0);
}
