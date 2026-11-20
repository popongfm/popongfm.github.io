import { describe, it, expect } from 'vitest';
import { readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import { parse } from 'yaml';
import { CONSTELLATIONS, starPosition } from '../../src/lib/sky/layout';

const dir = join(__dirname, '../../src/content/projects');
const projects = readdirSync(dir).filter((f) => f.endsWith('.md') && !f.endsWith('.th.md'))
  .map((f) => parse(readFileSync(join(dir, f), 'utf8').split(/^---$/m)[1]));

describe('constellation layout', () => {
  it('every project has a star inside the ring', () => {
    for (const p of projects) {
      const [x, y] = starPosition(p.constellation, p.order);
      expect(Math.hypot(x, y)).toBeLessThanOrEqual(0.84);
    }
  });
  it('throws for an order with no point', () => {
    expect(() => starPosition('space', 99)).toThrow();
  });
  it('lines only reference existing points', () => {
    for (const c of Object.values(CONSTELLATIONS)) {
      for (const line of c.lines) for (const i of line) expect(c.points[i]).toBeDefined();
    }
  });
});
