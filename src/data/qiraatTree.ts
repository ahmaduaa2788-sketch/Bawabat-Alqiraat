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
  },
  {
    id: 'ibn-amir',
    name: 'الإمام ابن عامر الشامي',
    description: 'إمام القراءة بالشام، تابعي جليل أخذ عن بعض الصحابة.',
    theme: {
      gradient: 'from-rose-900 to-navy-900',
      ring: 'ring-rose-500/50',
      shadow: 'shadow-rose-500/30'
    },
    ruwat: [
      { 
        id: 'hisham', 
        name: 'هشام', 
        theme: { gradient: 'from-red-800 to-navy-900', ring: 'ring-red-400/50', shadow: 'shadow-red-400/30' },
        turuq: [{ id: 'shatibiyyah', name: 'الشاطبية', isBase: true }, { id: 'tayyibah', name: 'الطيبة', isBase: false }] 
      },
      { 
        id: 'ibn-dhakwan', 
        name: 'ابن ذكوان', 
        theme: { gradient: 'from-rose-800 to-navy-900', ring: 'ring-rose-400/50', shadow: 'shadow-rose-400/30' },
        turuq: [{ id: 'shatibiyyah', name: 'الشاطبية', isBase: true }, { id: 'tayyibah', name: 'الطيبة', isBase: false }] 
      }
    ]
  },
  {
    id: 'hamzah',
    name: 'الإمام حمزة الكوفي',
    description: 'إمام القراءة بالكوفة بعد عاصم والأعمش، عُرف بالورع والدقة.',
    theme: {
      gradient: 'from-indigo-900 to-navy-900',
      ring: 'ring-indigo-500/50',
      shadow: 'shadow-indigo-500/30'
    },
    ruwat: [
      { 
        id: 'khalaf', 
        name: 'خلف', 
        theme: { gradient: 'from-violet-800 to-navy-900', ring: 'ring-violet-400/50', shadow: 'shadow-violet-400/30' },
        turuq: [{ id: 'shatibiyyah', name: 'الشاطبية', isBase: true }, { id: 'tayyibah', name: 'الطيبة', isBase: false }] 
      },
      { 
        id: 'khallad', 
        name: 'خلاد', 
        theme: { gradient: 'from-indigo-800 to-navy-900', ring: 'ring-indigo-400/50', shadow: 'shadow-indigo-400/30' },
        turuq: [{ id: 'shatibiyyah', name: 'الشاطبية', isBase: true }, { id: 'tayyibah', name: 'الطيبة', isBase: false }] 
      }
    ]
  },
  {
    id: 'kisa-i',
    name: 'الإمام الكسائي الكوفي',
    description: 'إمام النحاة والقراء بالكوفة، أخذ القراءة عن حمزة.',
    theme: {
      gradient: 'from-pink-900 to-navy-900',
      ring: 'ring-pink-500/50',
      shadow: 'shadow-pink-500/30'
    },
    ruwat: [
      { 
        id: 'abu-al-harith', 
        name: 'أبو الحارث', 
        theme: { gradient: 'from-pink-800 to-navy-900', ring: 'ring-pink-400/50', shadow: 'shadow-pink-400/30' },
        turuq: [{ id: 'shatibiyyah', name: 'الشاطبية', isBase: true }, { id: 'tayyibah', name: 'الطيبة', isBase: false }] 
      },
      { 
        id: 'duri-kisai', 
        name: 'الدوري', 
        theme: { gradient: 'from-fuchsia-800 to-navy-900', ring: 'ring-fuchsia-400/50', shadow: 'shadow-fuchsia-400/30' },
        turuq: [{ id: 'shatibiyyah', name: 'الشاطبية', isBase: true }, { id: 'tayyibah', name: 'الطيبة', isBase: false }] 
      }
    ]
  },
  {
    id: 'abu-jafar',
    name: 'الإمام أبو جعفر المدني',
    description: 'من القراء الثلاثة المتممين للعشرة، وإمام القراءة بالمدينة قبل نافع.',
    theme: {
      gradient: 'from-slate-800 to-navy-900',
      ring: 'ring-slate-400/50',
      shadow: 'shadow-slate-400/30'
    },
    ruwat: [
      { 
        id: 'ibn-wardan', 
        name: 'ابن وردان', 
        theme: { gradient: 'from-gray-700 to-navy-900', ring: 'ring-gray-400/50', shadow: 'shadow-gray-400/30' },
        turuq: [{ id: 'durrah', name: 'الدرة', isBase: true }, { id: 'tayyibah', name: 'الطيبة', isBase: false }] 
      },
      { 
        id: 'ibn-jammaz', 
        name: 'ابن جماز', 
        theme: { gradient: 'from-slate-700 to-navy-900', ring: 'ring-slate-400/50', shadow: 'shadow-slate-400/30' },
        turuq: [{ id: 'durrah', name: 'الدرة', isBase: true }, { id: 'tayyibah', name: 'الطيبة', isBase: false }] 
      }
    ]
  },
  {
    id: 'yaqub',
    name: 'الإمام يعقوب الحضرمي',
    description: 'إمام القراءة بالبصرة بعد أبي عمرو.',
    theme: {
      gradient: 'from-sky-900 to-navy-900',
      ring: 'ring-sky-500/50',
      shadow: 'shadow-sky-500/30'
    },
    ruwat: [
      { 
        id: 'ruways', 
        name: 'رويس', 
        theme: { gradient: 'from-sky-800 to-navy-900', ring: 'ring-sky-400/50', shadow: 'shadow-sky-400/30' },
        turuq: [{ id: 'durrah', name: 'الدرة', isBase: true }, { id: 'tayyibah', name: 'الطيبة', isBase: false }] 
      },
      { 
        id: 'rawh', 
        name: 'روح', 
        theme: { gradient: 'from-cyan-800 to-navy-900', ring: 'ring-cyan-400/50', shadow: 'shadow-cyan-400/30' },
        turuq: [{ id: 'durrah', name: 'الدرة', isBase: true }, { id: 'tayyibah', name: 'الطيبة', isBase: false }] 
      }
    ]
  },
  {
    id: 'khalaf-bazzar',
    name: 'الإمام خلف العاشر',
    description: 'خلف بن هشام البزار الكوفي، له اختيار في القراءة خالف فيه حمزة.',
    theme: {
      gradient: 'from-zinc-800 to-navy-900',
      ring: 'ring-zinc-500/50',
      shadow: 'shadow-zinc-500/30'
    },
    ruwat: [
      { 
        id: 'ishaq', 
        name: 'إسحاق', 
        theme: { gradient: 'from-zinc-700 to-navy-900', ring: 'ring-zinc-400/50', shadow: 'shadow-zinc-400/30' },
        turuq: [{ id: 'durrah', name: 'الدرة', isBase: true }, { id: 'tayyibah', name: 'الطيبة', isBase: false }] 
      },
      { 
        id: 'idris', 
        name: 'إدريس', 
        theme: { gradient: 'from-gray-800 to-navy-900', ring: 'ring-gray-400/50', shadow: 'shadow-gray-400/30' },
        turuq: [{ id: 'durrah', name: 'الدرة', isBase: true }, { id: 'tayyibah', name: 'الطيبة', isBase: false }] 
      }
    ]
  }
];
