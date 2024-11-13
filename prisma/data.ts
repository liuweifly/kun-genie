export const users = [
  {
    id: '410544b2-4001-4271-9855-fec4b6a6442a',
    userName: '大李四',
    createdAt: new Date('2024-01-01T00:00:00Z'),
    updatedAt: new Date('2024-01-01T00:00:00Z'),
  },
  {
    id: '76d65c26-f784-44a2-ac19-586678f7c2f2',
    userName: '大张三',
    createdAt: new Date('2024-01-01T00:00:00Z'),
    updatedAt: new Date('2024-01-01T00:00:00Z'),
  },
] as const;

export const customers = [  
  {
    id: '3958dc9e-712f-4377-85e9-fec4b6a6442a',
    name: '张三',
    birthDateTime: new Date('2024-01-01T12:00:00Z'),
    gender: 'male',
    userId: '76d65c26-f784-44a2-ac19-586678f7c2f2',
    createdAt: new Date('2024-01-01T00:00:00Z'),
    updatedAt: new Date('2024-01-01T00:00:00Z'),
  },
  {
    id: 'd6e15727-9fe1-4961-8c5b-ea44a9bd81aa',
    name: '李四',
    birthDateTime: new Date('2024-09-01T12:00:00Z'),
    gender: 'female',
    userId: '410544b2-4001-4271-9855-fec4b6a6442a',
    createdAt: new Date('2024-01-01T00:00:00Z'),
    updatedAt: new Date('2024-01-01T00:00:00Z'),
  },
] as const;

export const fortunes = [
  {
    id: 'f47ac10b-58cc-4372-a567-0e02b2c3d479',
    customerId: '3958dc9e-712f-4377-85e9-fec4b6a6442a',
    date: new Date('2024-01-01T00:00:00Z'),
    overallScore: 85,
    details: {
      bazi: {
        year: { stem: '甲', branch: '子' },
        month: { stem: '乙', branch: '丑' },
        day: { stem: '丙', branch: '寅' },
        hour: { stem: '丁', branch: '卯' },
      },
      strength: {
        score: 75,
        status: 'balanced',
      },
      dayFortune: {
        score: 85,
        details: []
      }
    },
    createdAt: new Date('2024-01-01T00:00:00Z'),
  },
] as const;
