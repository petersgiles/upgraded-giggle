export interface DeckCardInput {
  id?: string | null;

  thumbnail?: string | null;

  title: string;

  subTitle?: string | null;

  supportingText?: string | null;

  parentId?: string | null;

  order: number;

  presentation?: DeckCardPresentationInput | null;

  buttons?: (DeckCardActionButtonInput | null)[] | null;

  icons?: (DeckCardActionIconInput | null)[] | null;
}

export interface DeckCardPresentationInput {
  description: string;
}

export interface DeckCardActionButtonInput {
  text: string;

  action?: DeckCardActionInput | null;
}

export interface DeckCardActionInput {
  description: string;

  action: string;
}

export interface DeckCardActionIconInput {
  text: string;

  action?: DeckCardActionInput | null;
}

export enum CacheControlScope {
  Public = 'PUBLIC',
  Private = 'PRIVATE'
}

/** The `Upload` scalar type represents a file upload promise that resolves anobject containing `stream`, `filename`, `mimetype` and `encoding`. */
export type Upload = any;
