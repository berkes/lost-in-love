import p5 from "p5";
import seedrandom from "seedrandom";

export type ColorType = "HSL" | "BW";

export interface ColorScheme {
  foregroundColor: p5.Color;
  backgroundColor: p5.Color;
  highlightColor: p5.Color;
}

export class BWColorScheme implements ColorScheme {
  public foregroundColor: p5.Color;
  public backgroundColor: p5.Color;
  public highlightColor: p5.Color;

  constructor(p: p5) {
    this.foregroundColor = p.color(0);
    this.backgroundColor = p.color(255);
    this.highlightColor = p.color(0);
  }
}

export class HSLColorScheme implements ColorScheme {
  public foregroundColor: p5.Color;
  public backgroundColor: p5.Color;
  public highlightColor: p5.Color;

  constructor(
    private readonly baseForegroundColor: p5.Color,
    private readonly baseBackgroundColor: p5.Color,
    private readonly baseHighlightColor: p5.Color,
    private readonly rng: seedrandom.PRNG,
    private readonly p: p5,
  ) {
    this.foregroundColor = this.randomizeForegroundColor();
    this.backgroundColor = this.randomizeBackgroundColor();
    this.highlightColor = this.randomizeHighlightColor();
  }

  private randomizeForegroundColor(): p5.Color {
    const color = this.baseForegroundColor;
    const newH = this.p.hue(color) * (0.95 + this.rng() * 0.1); // 95-105% of original hue
    const newS = this.p.saturation(color) * (0.8 + this.rng() * 0.2); // 80-100% of original saturation
    const newL = this.p.lightness(color) * (1.0 + this.rng() * 0.4); // 100-120% of original lightness
    return this.p.color(newH, newS, newL);
  }

  private randomizeBackgroundColor(): p5.Color {
    const color = this.baseBackgroundColor;
    const newH = this.p.hue(color) * (0.95 + this.rng() * 0.1); // 95-105% of original hue
    const newS = this.p.saturation(color) * (0.6 + this.rng() * 0.4); // 60-100% of original saturation
    const newL = this.p.lightness(color) * (1.0 + this.rng() * 0.2); // 100-120% of original lightness
    return this.p.color(newH, newS, newL);
  }

  private randomizeHighlightColor(): p5.Color {
    const color = this.baseHighlightColor;
    const newH = this.p.hue(color) * (0.95 + this.rng() * 0.1); // 95-105% of original hue
    const newS = this.p.saturation(color) * (0.8 + this.rng() * 0.2); // 80-100% of original saturation
    const newL = this.p.lightness(color) * (1.0 + this.rng() * 0.2); // 100-120% of original lightness
    return this.p.color(newH, newS, newL);
  }
}

export function createColorScheme(
  colorType: ColorType,
  rng: seedrandom.PRNG,
  p: p5,
): ColorScheme {
  switch (colorType) {
    case "HSL":
      return new HSLColorScheme(
        p.color(336, 80, 47, 100),
        p.color(40, 100, 57, 100),
        p.color(336, 80, 47, 100),
        rng,
        p,
      );
    case "BW":
      return new BWColorScheme(p);
    default:
      throw new Error("Invalid colorType");
  }
}

export function createTranslucentColor(
  p: p5,
  color: p5.Color,
  alpha: number = 0.4,
): p5.Color {
  const newH = p.hue(color);
  const newS = p.saturation(color);
  const newL = p.lightness(color);
  return p.color(newH, newS, newL, alpha);
}
