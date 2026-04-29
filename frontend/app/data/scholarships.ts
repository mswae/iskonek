// app/data/scholarships.ts — Mock scholarship data
import { Scholarship } from '../components/ScholarshipCard';

export const SCHOLARSHIPS: Scholarship[] = [
  {
    id: '1',
    title: 'DOST-SEI Undergraduate Scholarship (RA 7687)',
    tag: 'RA 7687',
    amount: 'Amount: Php 80,000/Year',
    deadline: '11/21/26',
    description:
      'Government scholarship for financially challenged, talented students pursuing priority S&T courses like Engineering, Math, and Sciences. Includes stipend and books allowance.',
    gradient: 'linear-gradient(135deg, #4caf88 0%, #d4622a 100%)',
    bookmarked: true,
    criteria: {
      minGwa: 85,
      maxIncome: 300000,
      course: 'STEM',
    },
    link: 'https://www.sei.dost.gov.ph/',
  },
  {
    id: '2',
    title: 'CHED Merit Scholarship Program (CMSP)',
    tag: 'CMSP',
    amount: 'Amount: Php 120,000/Year (Full)',
    deadline: '06/30/26',
    description:
      'Financial assistance for academically gifted Filipino students pursuing undergraduate degrees in CHED-priority programs (Full or Half-Merit).',
    gradient: 'linear-gradient(135deg, #2d8c62 0%, #1a6648 100%)',
    bookmarked: false,
    criteria: {
      minGwa: 90,
      maxIncome: 400000,
      course: 'ANY',
    },
    link: 'https://dexus.r5.ched.gov.ph/student/login',
  },
  {
    id: '3',
    title: 'SM Foundation College Scholarship Program',
    tag: 'SM',
    amount: 'Amount: Php 100,000/Year (Exc.)',
    deadline: '01/31/26',
    description:
      'Private scholarship offering full tuition, monthly allowance, and job opportunities for students in partner schools, specializing in Tech, Engineering, or Education.',
    gradient: 'linear-gradient(135deg, #f0b429 0%, #2d8c62 100%)',
    bookmarked: false,
    criteria: {
      minGwa: 88,
      maxIncome: 250000,
      course: 'STEM',
    },
    link: 'https://www.sm-foundation.org/', 
  },

  {
    id: '4',
    title: 'SM Foundation College Scholarship Program',
    tag: 'SM',
    amount: 'Amount: Php 100,000/Year (Exc.)',
    deadline: '12/31/26',
    description:
      'Private scholarship offering full tuition, monthly allowance, and job opportunities for students in partner schools, specializing in Tech, Engineering, or Education.',
    gradient: 'linear-gradient(135deg, #d4622a 0%, #f0b429 60%, #2d8c62 100%)',
    bookmarked: false,
    criteria: {
      minGwa: 88,
      maxIncome: 250000,
      course: 'STEM',
    },
    link: 'https://www.sm-foundation.org/',
  },
  {
    id: '5',
    title: 'OWWA Education for Development Scholarship Program (EDSP)',
    tag: 'EDSP',
    amount: 'Amount: Php 65,000/Year',
    deadline: '08/30/25',
    description:
      'A competitive program for a qualified dependent (child or spouse) of an active Overseas Filipino Worker (OFW) who is pursuing a 4 or 5-year course.',
    gradient: 'linear-gradient(135deg, #1a6648 0%, #4caf88 100%)',
    bookmarked: false,
    criteria: {
      minGwa: 80,
      maxIncome: 9999999, // Assuming no strict income cap for OFWs in this mock
      course: 'ANY',
    },
    link: 'https://owwa.gov.ph/',
  },
  {
    id: '6',
    title: 'Aboitiz Foundation Full Scholarship Grant',
    tag: 'AFG',
    amount: 'Amount: Php 110,000/Year (Ext.)',
    deadline: '06/15/26',
    description:
      'Offers full tuition and a monthly allowance to high-achieving college students in STEM, business or education programs, with incentives for Latin honors.',
    gradient: 'linear-gradient(135deg, #f0b429 0%, #d4622a 100%)',
    bookmarked: false,
    criteria: {
      minGwa: 88,
      maxIncome: 350000,
      course: ['STEM', 'BUSINESS', 'EDUC'],
    },
    link: 'https://aboitiz.com/our-businesses/aboitiz-foundation/aboitiz-future-leaders-scholarship',
  },
];