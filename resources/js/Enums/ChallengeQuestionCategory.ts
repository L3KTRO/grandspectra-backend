export enum ChallengeQuestionCategory {
  SHOT = 'tiro',
  PASS = 'pase',
  OTHER = 'otro',
}

export const ChallengeQuestionCategoryLabels = {
  [ChallengeQuestionCategory.SHOT]: 'Tiro',
  [ChallengeQuestionCategory.PASS]: 'Pase',
  [ChallengeQuestionCategory.OTHER]: 'Otro',
};

export function getChallengeQuestionCategoryLabel(category: ChallengeQuestionCategory | string): string {
  return ChallengeQuestionCategoryLabels[category as ChallengeQuestionCategory] || 'Otro';
}
