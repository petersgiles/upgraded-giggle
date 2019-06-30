import { DocumentStatus } from '@df/components'
import { lotsofUsers } from 'apps/policy-briefs/src/devdata/data'

export const classifications = [
  {
    caption: 'UNCLASSIFIED',
    value: 'UNCLASSIFIED'
  },
  {
    caption: 'IN CONFIDENCE',
    value: 'IN CONFIDENCE'
  },
  {
    caption: 'PROTECTED',
    value: 'PROTECTED'
  }
]

export const dlms = [
  {
    caption: 'Not for tabling - For Official Use Only',
    value: 'Not for tabling - For Official Use Only'
  },
  {
    caption: 'For Official Use Only',
    value: 'For Official Use Only'
  },
  {
    caption: 'Sensitive',
    value: 'Sensitive'
  },
  {
    caption: 'Sensitive Cabinet',
    value: 'Sensitive Cabinet'
  },
  {
    caption: 'Sensitive Legal',
    value: 'Sensitive Legal'
  },
  {
    caption: 'Sensitive Personal',
    value: 'Sensitive Personal'
  }
]

export const statuslist: DocumentStatus[] = [
  {
    id: '1',
    icon: 'people',
    caption: 'In Draft',
    colour: 'Pink',
    order: 1
  },
  {
    id: '2',
    icon: 'how_to_reg',
    caption: 'Ready',
    colour: 'GhostWhite',
    order: 2
  },
  {
    id: '3',
    icon: 'cancel_presentation',
    caption: 'Cancelled',
    colour: 'Crimson',
    order: 3
  }
]

export const activityList = [
  { id: '1', icon: 'people', colour: 'Pink', order: 1, caption: `Decision` },
  {
    id: '2',
    icon: 'people',
    colour: 'Pink',
    order: 2,
    caption: `New Comments`
  },
  {
    id: '3',
    icon: 'people',
    colour: 'Pink',
    order: 3,
    caption: `New Documents`
  },
  {
    id: '4',
    icon: 'people',
    colour: 'Pink',
    order: 4,
    caption: `Updates and Changes`
  }
]

export const notifications = [
  {
    user_id: 530,
    brief_id: 296,
    activity: [{ id: 2 }, { id: 1 }, { id: 3 }],
    status: [{ id: 2 }]
  },
  {
    user_id: 28,
    brief_id: 138,
    activity: [{ id: 2 }, { id: 3 }, { id: 3 }],
    status: [{ id: 3 }]
  },
  {
    user_id: 567,
    brief_id: 74,
    activity: [{ id: 1 }, { id: 1 }],
    status: [{ id: 1 }, { id: 1 }]
  },
  {
    user_id: 945,
    brief_id: 26,
    activity: [{ id: 1 }, { id: 2 }, { id: 2 }, { id: 2 }],
    status: [{ id: 3 }]
  },
  {
    user_id: 152,
    brief_id: 17,
    activity: [{ id: 2 }, { id: 3 }, { id: 3 }],
    status: [{ id: 1 }, { id: 1 }]
  },
  {
    user_id: 967,
    brief_id: 185,
    activity: [{ id: 4 }, { id: 1 }, { id: 3 }, { id: 4 }],
    status: [{ id: 3 }]
  },
  {
    user_id: 923,
    brief_id: 33,
    activity: [{ id: 1 }, { id: 2 }, { id: 2 }, { id: 1 }],
    status: [{ id: 3 }, { id: 2 }]
  },
  {
    user_id: 252,
    brief_id: 217,
    activity: [{ id: 4 }],
    status: [{ id: 3 }, { id: 3 }]
  },
  {
    user_id: 950,
    brief_id: 160,
    activity: [{ id: 4 }, { id: 2 }],
    status: [{ id: 2 }]
  },
  {
    user_id: 936,
    brief_id: 125,
    activity: [{ id: 2 }, { id: 1 }],
    status: [{ id: 2 }]
  },
  {
    user_id: 248,
    brief_id: 261,
    activity: [{ id: 1 }, { id: 1 }],
    status: [{ id: 3 }]
  },
  {
    user_id: 681,
    brief_id: 56,
    activity: [{ id: 1 }, { id: 4 }],
    status: [{ id: 1 }, { id: 2 }, { id: 3 }]
  },
  {
    user_id: 552,
    brief_id: 54,
    activity: [{ id: 4 }, { id: 3 }, { id: 2 }],
    status: [{ id: 1 }, { id: 3 }, { id: 3 }]
  },
  {
    user_id: 708,
    brief_id: 44,
    activity: [{ id: 2 }, { id: 4 }],
    status: [{ id: 3 }, { id: 2 }, { id: 1 }]
  },
  {
    user_id: 135,
    brief_id: 273,
    activity: [{ id: 1 }, { id: 3 }, { id: 3 }],
    status: [{ id: 3 }, { id: 2 }, { id: 2 }]
  },
  {
    user_id: 845,
    brief_id: 99,
    activity: [{ id: 4 }, { id: 4 }, { id: 2 }, { id: 1 }],
    status: [{ id: 3 }, { id: 1 }]
  },
  {
    user_id: 717,
    brief_id: 274,
    activity: [{ id: 3 }, { id: 1 }, { id: 2 }],
    status: [{ id: 3 }, { id: 2 }]
  },
  {
    user_id: 374,
    brief_id: 50,
    activity: [{ id: 1 }, { id: 3 }],
    status: [{ id: 2 }, { id: 3 }, { id: 1 }]
  },
  {
    user_id: 244,
    brief_id: 84,
    activity: [{ id: 4 }, { id: 3 }],
    status: [{ id: 1 }, { id: 2 }]
  },
  {
    user_id: 31,
    brief_id: 31,
    activity: [{ id: 1 }],
    status: [{ id: 3 }, { id: 1 }]
  },
  {
    user_id: 878,
    brief_id: 202,
    activity: [{ id: 4 }, { id: 4 }, { id: 3 }, { id: 4 }],
    status: [{ id: 3 }, { id: 1 }]
  },
  {
    user_id: 342,
    brief_id: 126,
    activity: [{ id: 4 }],
    status: [{ id: 3 }, { id: 3 }, { id: 3 }]
  },
  {
    user_id: 3,
    brief_id: 151,
    activity: [{ id: 2 }, { id: 1 }],
    status: [{ id: 2 }, { id: 3 }, { id: 3 }]
  },
  {
    user_id: 452,
    brief_id: 52,
    activity: [{ id: 3 }, { id: 2 }, { id: 2 }],
    status: [{ id: 3 }, { id: 3 }, { id: 2 }]
  },
  {
    user_id: 421,
    brief_id: 94,
    activity: [{ id: 1 }, { id: 2 }],
    status: [{ id: 1 }, { id: 1 }, { id: 2 }]
  },
  {
    user_id: 380,
    brief_id: 61,
    activity: [{ id: 2 }, { id: 4 }, { id: 1 }],
    status: [{ id: 1 }, { id: 2 }]
  },
  {
    user_id: 431,
    brief_id: 237,
    activity: [{ id: 1 }, { id: 3 }, { id: 3 }, { id: 1 }],
    status: [{ id: 3 }]
  },
  {
    user_id: 114,
    brief_id: 72,
    activity: [{ id: 3 }, { id: 4 }],
    status: [{ id: 2 }, { id: 1 }, { id: 1 }]
  },
  {
    user_id: 957,
    brief_id: 144,
    activity: [{ id: 1 }, { id: 1 }, { id: 3 }],
    status: [{ id: 2 }, { id: 2 }, { id: 1 }]
  },
  { user_id: 748, brief_id: 234, activity: [{ id: 1 }], status: [{ id: 2 }] },
  {
    user_id: 332,
    brief_id: 68,
    activity: [{ id: 2 }, { id: 1 }, { id: 2 }, { id: 3 }],
    status: [{ id: 3 }, { id: 1 }]
  },
  {
    user_id: 477,
    brief_id: 203,
    activity: [{ id: 3 }],
    status: [{ id: 1 }, { id: 2 }]
  },
  {
    user_id: 342,
    brief_id: 93,
    activity: [{ id: 4 }, { id: 4 }, { id: 1 }],
    status: [{ id: 1 }, { id: 3 }]
  },
  {
    user_id: 66,
    brief_id: 267,
    activity: [{ id: 3 }, { id: 4 }, { id: 2 }, { id: 4 }],
    status: [{ id: 1 }, { id: 3 }]
  },
  {
    user_id: 100,
    brief_id: 89,
    activity: [{ id: 2 }, { id: 2 }],
    status: [{ id: 3 }, { id: 3 }, { id: 1 }]
  },
  {
    user_id: 322,
    brief_id: 45,
    activity: [{ id: 1 }, { id: 4 }, { id: 3 }, { id: 4 }],
    status: [{ id: 3 }]
  },
  {
    user_id: 936,
    brief_id: 31,
    activity: [{ id: 1 }, { id: 4 }],
    status: [{ id: 3 }]
  },
  {
    user_id: 269,
    brief_id: 32,
    activity: [{ id: 1 }, { id: 3 }, { id: 1 }],
    status: [{ id: 3 }, { id: 1 }]
  },
  {
    user_id: 640,
    brief_id: 114,
    activity: [{ id: 4 }, { id: 3 }],
    status: [{ id: 3 }]
  },
  {
    user_id: 122,
    brief_id: 205,
    activity: [{ id: 1 }, { id: 1 }, { id: 3 }, { id: 2 }],
    status: [{ id: 3 }, { id: 1 }]
  },
  {
    user_id: 844,
    brief_id: 277,
    activity: [{ id: 4 }, { id: 1 }, { id: 3 }],
    status: [{ id: 3 }, { id: 3 }, { id: 2 }]
  },
  {
    user_id: 555,
    brief_id: 195,
    activity: [{ id: 1 }, { id: 2 }, { id: 3 }],
    status: [{ id: 2 }]
  },
  {
    user_id: 172,
    brief_id: 238,
    activity: [{ id: 4 }, { id: 1 }],
    status: [{ id: 3 }, { id: 3 }, { id: 2 }]
  },
  {
    user_id: 737,
    brief_id: 113,
    activity: [{ id: 1 }, { id: 2 }, { id: 4 }, { id: 2 }],
    status: [{ id: 1 }, { id: 1 }]
  },
  {
    user_id: 115,
    brief_id: 62,
    activity: [{ id: 1 }, { id: 2 }],
    status: [{ id: 2 }, { id: 1 }, { id: 2 }]
  },
  {
    user_id: 451,
    brief_id: 113,
    activity: [{ id: 3 }],
    status: [{ id: 1 }, { id: 1 }, { id: 3 }]
  },
  {
    user_id: 736,
    brief_id: 40,
    activity: [{ id: 4 }, { id: 3 }, { id: 2 }],
    status: [{ id: 3 }, { id: 1 }, { id: 2 }]
  },
  {
    user_id: 589,
    brief_id: 29,
    activity: [{ id: 4 }, { id: 2 }, { id: 1 }, { id: 1 }],
    status: [{ id: 1 }, { id: 3 }]
  },
  {
    user_id: 500,
    brief_id: 85,
    activity: [{ id: 2 }, { id: 1 }],
    status: [{ id: 1 }]
  },
  {
    user_id: 909,
    brief_id: 156,
    activity: [{ id: 2 }, { id: 1 }],
    status: [{ id: 3 }, { id: 1 }]
  }
]

export const user_notifications = notifications.map(n => {
  const name = lotsofUsers.find(l => l.id == n.user_id)

  return { ...n, name: `${name.first_name} ${name.last_name}` }
})
