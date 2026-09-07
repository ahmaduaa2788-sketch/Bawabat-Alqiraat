import { qalunUnit0Content } from './qalunUnit0';
import { qalunUnit1Content } from './qalunUnit1';
import { qalunUnit2Content } from './qalunUnit2';
import { qalunUnit3Content } from './qalunUnit3';
import { qalunUnit4Content } from './qalunUnit4';
import { qalunUnit5Content } from './qalunUnit5';
import { ReactNode } from 'react';

export const qalunContentMap: Record<string, ReactNode> = {
  ...qalunUnit0Content,
  ...qalunUnit1Content,
  ...qalunUnit2Content,
  ...qalunUnit3Content,
  ...qalunUnit4Content,
  ...qalunUnit5Content,
};
