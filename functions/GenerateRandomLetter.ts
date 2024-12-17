export const generateRandomLetter = (): string => {
  const letters = [
    'أ', 'ب', 'ت', 'ث',/*  'ج', 'ح', 'خ',  */
    // 'د', 'ذ', 'ر', 'ز', 'س', 'ش', 'ص', 
    // 'ض', 'ط', 'ظ', 'ع', 'غ', 'ف', 'ق', 
    // 'ك', 'ل', 'م', 'ن', 'هـ', 'و', 'ي'
  ];
  const randomIndex = Math.floor(Math.random() * letters.length);
  return letters[randomIndex];
};