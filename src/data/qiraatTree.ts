export interface ThemeClasses {
  gradient: string;
  ring: string;
  shadow: string;
}

export interface Tariq {
  id: string;
  name: string;
  isBase: boolean;
}

export interface Rawi {
  id: string;
  name: string;
  description?: string;
  turuq: Tariq[];
  theme: ThemeClasses;
}

export interface Qari {
  id: string;
  name: string;
  description: string;
  ruwat: Rawi[];
  theme: ThemeClasses;
}

export const qiraatTree: Qari[] = [
  {
    id: 'nafi',
    name: 'الإمام نافع المدني',
    description: 'إمام دار الهجرة، انتهت إليه رياسة الإقراء بالمدينة المنورة.',
    theme: {
      gradient: 'from-blue-900 to-navy-900',
      ring: 'ring-blue-500/50',
      shadow: 'shadow-blue-500/30'
    },
    ruwat: [
      {
        id: 'warsh',
        name: 'رواية ورش',
        description: 'عثمان بن سعيد المصري، رحل إلى المدينة للقراءة على نافع.',
        theme: { gradient: 'from-blue-800 to-navy-900', ring: 'ring-blue-400/50', shadow: 'shadow-blue-400/30' },
        turuq: [
          { id: 'shatibiyyah', name: 'طريق الشاطبية', isBase: true },
          { id: 'tayyibah', name: 'طريق الطيبة', isBase: false }
        ]
      },
      {
        id: 'qalun',
        name: 'رواية قالون',
        description: 'عيسى بن مينا، ربيب نافع وتلميذه المقرب.',
        theme: { gradient: 'from-cyan-800 to-navy-900', ring: 'ring-cyan-400/50', shadow: 'shadow-cyan-400/30' },
        turuq: [
          { id: 'shatibiyyah', name: 'طريق الشاطبية', isBase: true },
          { id: 'tayyibah', name: 'طريق الطيبة', isBase: false }
        ]
      }
    ]
  },
  {
    id: 'asim',
    name: 'الإمام عاصم الكوفي',
    description: 'إمام القراءة بالكوفة، جمع بين الفصاحة والإتقان.',
    theme: {
      gradient: 'from-emerald-900 to-navy-900',
      ring: 'ring-emerald-500/50',
      shadow: 'shadow-emerald-500/30'
    },
    ruwat: [
      { 
        id: 'shuba', 
        name: 'شعبة', 
        theme: { gradient: 'from-teal-800 to-navy-900', ring: 'ring-teal-400/50', shadow: 'shadow-teal-400/30' },
        turuq: [{ id: 'shatibiyyah', name: 'الشاطبية', isBase: true }, { id: 'tayyibah', name: 'الطيبة', isBase: false }] 
      },
      { 
        id: 'hafs', 
        name: 'حفص', 
        theme: { gradient: 'from-emerald-800 to-navy-900', ring: 'ring-emerald-400/50', shadow: 'shadow-emerald-400/30' },
        turuq: [{ id: 'shatibiyyah', name: 'الشاطبية', isBase: true }, { id: 'tayyibah', name: 'الطيبة', isBase: false }] 
      }
    ]
  },
  {
    id: 'ibn-kathir',
    name: 'الإمام ابن كثير المكي',
    description: 'إمام أهل مكة في القراءة، لقي بعض الصحابة.',
    theme: {
      gradient: 'from-purple-900 to-navy-900',
      ring: 'ring-purple-500/50',
      shadow: 'shadow-purple-500/30'
    },
    ruwat: [
      { 
        id: 'bazzi', 
        name: 'البزي', 
        theme: { gradient: 'from-fuchsia-800 to-navy-900', ring: 'ring-fuchsia-400/50', shadow: 'shadow-fuchsia-400/30' },
        turuq: [{ id: 'shatibiyyah', name: 'الشاطبية', isBase: true }] 
      },
      { 
        id: 'qunbul', 
        name: 'قنبل', 
        theme: { gradient: 'from-purple-800 to-navy-900', ring: 'ring-purple-400/50', shadow: 'shadow-purple-400/30' },
        turuq: [{ id: 'shatibiyyah', name: 'الشاطبية', isBase: true }] 
      }
    ]
  },
  {
    id: 'abu-amr',
    name: 'الإمام أبو عمرو البصري',
    description: 'إمام أهل البصرة، من أعلم الناس باللغة والقرآن.',
    theme: {
      gradient: 'from-amber-900 to-navy-900',
      ring: 'ring-amber-500/50',
      shadow: 'shadow-amber-500/30'
    },
    ruwat: [
      { 
        id: 'duri', 
        name: 'الدوري', 
        theme: { gradient: 'from-orange-800 to-navy-900', ring: 'ring-orange-400/50', shadow: 'shadow-orange-400/30' },
        turuq: [{ id: 'shatibiyyah', name: 'الشاطبية', isBase: true }] 
      },
      { 
        id: 'susi', 
        name: 'السوسي', 
        theme: { gradient: 'from-amber-800 to-navy-900', ring: 'ring-amber-400/50', shadow: 'shadow-amber-400/30' },
        turuq: [{ id: 'shatibiyyah', name: 'الشاطبية', isBase: true }] 
      }
    ]
  }
];
