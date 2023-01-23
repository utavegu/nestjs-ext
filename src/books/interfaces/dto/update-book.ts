// Только те поля, которые не заполняются автоматически
export interface UpdateBookDto {
  title: string;
  description: string;
  authors: string[];
  favorite?: string;
  fileCover?: string;
  fileName?: string;
  fileBook?: string;
}
