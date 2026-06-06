import fs from 'node:fs';
import * as core from '@actions/core';
import { vi, describe, it, expect, afterEach } from 'vitest';
import extract from '../extract';

vi.mock('@actions/core');

describe('extract', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  })

  it('returns trimmed file content when file exists', () => {
    vi.spyOn(fs, 'existsSync').mockReturnValue(true);
    vi.spyOn(fs, 'readFileSync').mockReturnValue('  hello world  ');

    const result: string = extract('/path/to/file.txt');

    expect(result).toBe('hello world');
    expect(fs.existsSync).toHaveBeenCalledWith('/path/to/file.txt');
    expect(fs.readFileSync).toHaveBeenCalledWith('/path/to/file.txt', 'utf-8');
    expect(core.debug).toHaveBeenCalledWith(expect.stringContaining('/path/to/file.txt'));
  })

  it('returns source string when file does not exist', () => {
    vi.spyOn(fs, 'existsSync').mockReturnValue(false);

    const result: string = extract('hello world');

    expect(result).toBe('hello world');
    expect(core.debug).toHaveBeenCalledWith(expect.stringContaining('hello world'));
  })
})
