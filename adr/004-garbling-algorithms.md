# Garbling Algorithms for Text Obfuscation

## Overview
We need to choose a garbling algorithm to obfuscate the "To" field and message in the UI when loading from an obfuscated URL. The algorithm should be visually interesting and "cinematic" while still being reversible or at least providing a clear obfuscation effect.

## Candidate Algorithms

### 1. Shuffle Middle Characters (Current Implementation)
**Description:** Keeps first and last characters, shuffles the middle characters randomly.

**Pros:**
- Simple to implement and understand
- Preserves word shape (first/last characters)
- Human-readable but clearly obfuscated
- Reversible if needed

**Cons:**
- Less "cinematic" or dramatic
- May be too subtle for some use cases

**Example:**
- "Juliet" → "Juleit" or "Juilte"
- "Hello World" → "Hlelo Wrold" or "Hlleo Wdlor"

### 2. ROT13 Cipher
**Description:** Classic Caesar cipher that shifts each letter by 13 positions.

**Pros:**
- Well-known and understood
- Reversible (applying ROT13 twice returns original)
- Preserves word length and case

**Cons:**
- Too familiar, may not feel "cinematic"
- Easily recognizable and decodable
- Doesn't change the visual appearance much

**Example:**
- "Juliet" → "Whyvrg"
- "Hello World" → "Uryyb Jbeyq"

### 3. Alternating Case
**Description:** AlTeRnAtInG cAsE for each character.

**Pros:**
- Visually striking and "glitchy"
- Easy to implement
- Preserves original characters

**Cons:**
- May be hard to read for longer texts
- Less "cinematic", more "digital glitch"

**Example:**
- "Juliet" → "jUlIeT"
- "Hello World" → "hElLo wOrLd"

### 4. Random Case
**Description:** RaNdOm CaSe for each character.

**Pros:**
- Very chaotic and digital-looking
- Simple to implement
- Visually interesting

**Cons:**
- Can be hard to read
- May look too random

**Example:**
- "Juliet" → "jUlIeT" or "JUliEt"
- "Hello World" → "hElLo WoRlD" or "HEllO wORld"

### 5. Character Shift
**Description:** Shifts each character by a random amount (1-5 positions).

**Pros:**
- Creates interesting scrambled text
- More "cinematic" than simple shuffling
- Visually distinct from original

**Cons:**
- Not reversible without knowing the shifts
- May produce unreadable results

**Example:**
- "Juliet" → "Kvmgfu" or "Lwnjgv"
- "Hello World" → "Ifmmp Xpsme" or "Jgnnq Yqtnf"

### 6. Glitch Effect
**Description:** Combines random case changes with character shuffling.

**Pros:**
- Very "digital glitch" aesthetic
- Visually striking
- Feels modern and cinematic

**Cons:**
- May be too chaotic
- Hard to read

**Example:**
- "Juliet" → "jUliEt" or "JUileT"
- "Hello World" → "hElLo wOrLd" (shuffled)

### 7. Cinematic Scramble (Recommended)
**Description:** Combines character shifting, random case, and occasional glitch characters.

**Pros:**
- Most "cinematic" and dramatic
- Visually interesting with multiple effects
- Feels like a movie hacking scene
- Clearly obfuscated but still has character

**Cons:**
- More complex to implement
- Not reversible
- May be too intense for some use cases

**Example:**
- "Juliet" → "KvMg#u" or "LwNj&G"
- "Hello World" → "iFmMp$ xPsMe!" or "jGnNq@ yQtNf*"

## Recommendations

### For Subtle Obfuscation
- **Shuffle Middle Characters:** Best for readability while still obfuscating
- **Alternating Case:** Good balance of visibility and obfuscation

### For Cinematic/Dramatic Effect
- **Cinematic Scramble:** Most visually interesting and "movie-like"
- **Glitch Effect:** Good digital distortion aesthetic

### For Reversible Obfuscation
- **ROT13:** Only truly reversible option
- **Shuffle Middle Characters:** Could be reversible with seed tracking

## Decision

### Chosen Algorithm: Extreme Cinematic Scramble with Smart Fallback

**Primary Algorithm:** Extreme Cinematic Scramble
- Shifts characters towards symbols, Unicode, and emojis
- Combines multiple extreme techniques for maximum obfuscation
- Creates unrecognizable but visually interesting results
- Feels like digital corruption or cinematic hacking scenes

**Fallback for Short Texts:** Symbol Shift
- For texts ≤ 5 characters, use symbol shifting
- Prevents excessive distortion while maintaining obfuscation
- More readable but still clearly garbled

**Smart Algorithm Selection:**
- Short texts (≤5 chars): Symbol Shift (more readable)
- Medium texts (6-10 chars): Unicode Scramble + Symbols
- Long texts (>10 chars): Full Extreme Cinematic Scramble with emojis

**Implementation Plan:**
1. Implement Cinematic Scramble as the primary garbling algorithm
2. Add length-based fallback to Shuffle Middle Characters
3. Apply to "To" field and message when loading from obfuscated URLs
4. Ensure form interaction shows ungarbled text

## Rationale

The Cinematic Scramble algorithm was chosen because:

1. **Visual Impact:** It creates the most dramatic and "cinematic" effect, which aligns with the artistic nature of the project.

2. **Game Aesthetic:** The combination of character shifting, random case, and glitch characters feels like something from a movie hacking scene or game interface.

3. **Clear Obfuscation:** It's immediately obvious that the text is obfuscated, which is important for the user experience.

4. **Artistic Fit:** As an art project, the more visually interesting option is preferable over purely functional obfuscation.

5. **Flexibility:** The fallback to simpler shuffling for short texts ensures readability isn't completely sacrificed.

## Next Steps

- Implement the chosen Cinematic Scramble algorithm
- Add the length-based fallback
- Update the obfuscation module with the new functions
- Test the visual effect in the actual interface
- Gather feedback on the cinematic impact

## Alternative Considerations

If the Cinematic Scramble proves too intense or distracting:
1. Fall back to Glitch Effect (random case + shuffling)
2. Consider Alternating Case for better readability
3. Use Shuffle Middle Characters as the most conservative option

The choice can be revisited based on actual visual testing in the interface.