export enum QuestionOptionTag {
  SHOT = 'tiro',
  PASS = 'pase',
  OTHER = 'otro',
}

export const QuestionOptionTagLabels = {
  [QuestionOptionTag.SHOT]: 'Tiro',
  [QuestionOptionTag.PASS]: 'Pase',
  [QuestionOptionTag.OTHER]: 'Otro',
};

export function getQuestionOptionTagLabel(tag: QuestionOptionTag | string): string {
  return QuestionOptionTagLabels[tag as QuestionOptionTag] || 'Otro';
}
