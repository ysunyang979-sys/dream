
export interface DreamPalette {
  name: string;
  hex: string;
}

export interface DreamResult {
  interpretation: string;
  palette: DreamPalette[];
  story: string;
  imageUrl: string;
}
