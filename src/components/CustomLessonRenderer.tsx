import React from 'react';
import { BookOpen, AlertCircle, Sparkles, CheckCircle2 } from 'lucide-react';

interface CustomLessonRendererProps {
  content: string;
  ruleSummary?: string;
}

export function CustomLessonRenderer({ content, ruleSummary }: CustomLessonRendererProps) {
  if (!content || !content.trim()) {
    return (
      <div className="bg-navy-900/60 p-8 rounded-2xl border border-navy-700 text-center text-navy-300">
        لا يوجد محتوى مخصص لهذا الدرس حالياً.
      </div>
    );
  }

  // Parse sections and paragraphs
  const lines = content.split('\n');
  const renderedElements: React.ReactNode[] = [];
  let currentParagraphLines: string[] = [];
  let currentListItems: string[] = [];
  let inTable = false;
  let tableRows: string[][] = [];

  const flushParagraph = (key: string) => {
    if (currentParagraphLines.length > 0) {
      const text = currentParagraphLines.join(' ').trim();
      if (text) {
        renderedElements.push(
          <p key={key} className="text-navy-100 text-lg leading-relaxed mb-6 font-normal">
            {formatInlineText(text)}
          </p>
        );
      }
      currentParagraphLines = [];
    }
  };

  const flushList = (key: string) => {
    if (currentListItems.length > 0) {
      renderedElements.push(
        <ul key={key} className="space-y-3 mb-6 pr-2">
          {currentListItems.map((item, idx) => (
            <li key={idx} className="flex items-start gap-3 text-navy-100 text-lg">
              <span className="w-2 h-2 rounded-full bg-gold-400 mt-2.5 shrink-0 shadow-sm" />
              <span>{formatInlineText(item)}</span>
            </li>
          ))}
        </ul>
      );
      currentListItems = [];
    }
  };

  const flushTable = (key: string) => {
    if (tableRows.length > 0) {
      const headerRow = tableRows[0];
      const dataRows = tableRows.slice(1).filter(row => !row.every(c => c.match(/^[-:]+$/)));
      renderedElements.push(
        <div key={key} className="overflow-x-auto my-6 rounded-xl border border-navy-700 shadow-md">
          <table className="w-full text-right border-collapse">
            <thead>
              <tr className="bg-navy-900 border-b border-navy-700">
                {headerRow.map((cell, idx) => (
                  <th key={idx} className="p-3 text-gold-400 font-bold text-base md:text-lg">
                    {formatInlineText(cell)}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {dataRows.map((row, rIdx) => (
                <tr key={rIdx} className="border-b border-navy-800/80 hover:bg-navy-800/30 transition-colors">
                  {row.map((cell, cIdx) => (
                    <td key={cIdx} className="p-3 text-navy-200 text-base">
                      {formatInlineText(cell)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
      tableRows = [];
      inTable = false;
    }
  };

  // Inline formatting: Bold **text**, Verses ﴿...﴾, and quotes
  function formatInlineText(text: string): React.ReactNode {
    // Match Quranic brackets ﴿...﴾ or bold **...**
    const parts = text.split(/(﴿[^﴾]+﴾|\*\*[^*]+\*\*)/g);
    return parts.map((part, index) => {
      if (part.startsWith('﴿') && part.endsWith('﴾')) {
        return (
          <span
            key={index}
            className="inline-block font-serif text-xl text-gold-300 mx-1 px-2 py-0.5 bg-navy-900/80 border border-gold-500/30 rounded-lg shadow-sm"
          >
            {part}
          </span>
        );
      }
      if (part.startsWith('**') && part.endsWith('**')) {
        return (
          <strong key={index} className="text-gold-400 font-bold">
            {part.slice(2, -2)}
          </strong>
        );
      }
      return part;
    });
  }

  for (let i = 0; i < lines.length; i++) {
    const rawLine = lines[i];
    const trimmed = rawLine.trim();

    if (!trimmed) {
      flushParagraph(`p-${i}`);
      flushList(`l-${i}`);
      flushTable(`t-${i}`);
      continue;
    }

    // Markdown Table check
    if (trimmed.startsWith('|') && trimmed.endsWith('|')) {
      flushParagraph(`p-${i}`);
      flushList(`l-${i}`);
      inTable = true;
      const cells = trimmed
        .slice(1, -1)
        .split('|')
        .map(c => c.trim());
      tableRows.push(cells);
      continue;
    } else if (inTable) {
      flushTable(`t-${i}`);
    }

    // Headings
    if (trimmed.startsWith('## ')) {
      flushParagraph(`p-${i}`);
      flushList(`l-${i}`);
      renderedElements.push(
        <h2
          key={`h2-${i}`}
          className="text-2xl md:text-3xl font-extrabold text-white mt-8 mb-4 border-r-4 border-gold-500 pr-3 flex items-center gap-3"
        >
          <BookOpen className="w-6 h-6 text-gold-400 shrink-0" />
          {formatInlineText(trimmed.replace('## ', ''))}
        </h2>
      );
      continue;
    }

    if (trimmed.startsWith('### ')) {
      flushParagraph(`p-${i}`);
      flushList(`l-${i}`);
      renderedElements.push(
        <h3
          key={`h3-${i}`}
          className="text-xl md:text-2xl font-bold text-gold-300 mt-6 mb-3 flex items-center gap-2"
        >
          <Sparkles className="w-5 h-5 text-gold-500 shrink-0" />
          {formatInlineText(trimmed.replace('### ', ''))}
        </h3>
      );
      continue;
    }

    if (trimmed.startsWith('#### ')) {
      flushParagraph(`p-${i}`);
      flushList(`l-${i}`);
      renderedElements.push(
        <h4
          key={`h4-${i}`}
          className="text-lg md:text-xl font-bold text-navy-100 mt-4 mb-2"
        >
          {formatInlineText(trimmed.replace('#### ', ''))}
        </h4>
      );
      continue;
    }

    // Callout: Warning / Caution
    if (trimmed.startsWith('> [تنبيه]') || trimmed.startsWith('⚠️') || trimmed.startsWith('[تنبيه]')) {
      flushParagraph(`p-${i}`);
      flushList(`l-${i}`);
      const clean = trimmed
        .replace('> [تنبيه]', '')
        .replace('⚠️', '')
        .replace('[تنبيه]', '')
        .trim();
      renderedElements.push(
        <div key={`alert-${i}`} className="my-6 bg-red-500/10 border border-red-500/30 p-5 rounded-xl flex items-start gap-4 shadow-sm">
          <AlertCircle className="w-6 h-6 text-red-400 shrink-0 mt-0.5" />
          <div className="text-red-200 text-lg leading-relaxed">
            <strong className="text-red-300 block mb-1">تنبيه واستثناء هام:</strong>
            {formatInlineText(clean)}
          </div>
        </div>
      );
      continue;
    }

    // Callout: Rule / Usul
    if (trimmed.startsWith('> [قاعدة]') || trimmed.startsWith('📌') || trimmed.startsWith('[قاعدة]')) {
      flushParagraph(`p-${i}`);
      flushList(`l-${i}`);
      const clean = trimmed
        .replace('> [قاعدة]', '')
        .replace('📌', '')
        .replace('[قاعدة]', '')
        .trim();
      renderedElements.push(
        <div key={`rule-${i}`} className="my-6 bg-gold-500/10 border border-gold-500/30 p-5 rounded-xl flex items-start gap-4 shadow-sm">
          <CheckCircle2 className="w-6 h-6 text-gold-400 shrink-0 mt-0.5" />
          <div className="text-white text-lg leading-relaxed">
            <strong className="text-gold-400 block mb-1">القاعدة والأصل:</strong>
            {formatInlineText(clean)}
          </div>
        </div>
      );
      continue;
    }

    // Callout: Example
    if (trimmed.startsWith('> [مثال]') || trimmed.startsWith('💡') || trimmed.startsWith('[مثال]')) {
      flushParagraph(`p-${i}`);
      flushList(`l-${i}`);
      const clean = trimmed
        .replace('> [مثال]', '')
        .replace('💡', '')
        .replace('[مثال]', '')
        .trim();
      renderedElements.push(
        <div key={`example-${i}`} className="my-6 bg-emerald-500/10 border border-emerald-500/30 p-5 rounded-xl flex items-start gap-4 shadow-sm">
          <Sparkles className="w-6 h-6 text-emerald-400 shrink-0 mt-0.5" />
          <div className="text-emerald-100 text-lg leading-relaxed">
            <strong className="text-emerald-300 block mb-1">أمثلة تطبيقية:</strong>
            {formatInlineText(clean)}
          </div>
        </div>
      );
      continue;
    }

    // Standalone Quranic Verse block
    if (trimmed.startsWith('﴿') && trimmed.endsWith('﴾')) {
      flushParagraph(`p-${i}`);
      flushList(`l-${i}`);
      renderedElements.push(
        <div key={`verse-${i}`} className="my-6 text-center py-4 px-6 bg-navy-900 border border-gold-500/30 rounded-2xl shadow-md">
          <span className="font-serif text-2xl md:text-3xl text-gold-300 tracking-wide leading-loose">
            {trimmed}
          </span>
        </div>
      );
      continue;
    }

    // List item
    if (trimmed.startsWith('* ') || trimmed.startsWith('- ')) {
      flushParagraph(`p-${i}`);
      currentListItems.push(trimmed.slice(2));
      continue;
    }

    // Regular paragraph line
    currentParagraphLines.push(trimmed);
  }

  flushParagraph('final-p');
  flushList('final-l');
  flushTable('final-t');

  return (
    <div className="space-y-4 animate-in fade-in duration-300">
      {ruleSummary && (
        <div className="bg-gradient-to-r from-navy-900 to-navy-800 border-r-4 border-gold-500 p-5 rounded-xl mb-8 shadow-md">
          <h4 className="text-gold-400 font-bold text-sm mb-1">خلاصة سريعة للدرس:</h4>
          <p className="text-white text-lg font-medium">{ruleSummary}</p>
        </div>
      )}
      <div className="space-y-2">
        {renderedElements}
      </div>
    </div>
  );
}
