from django.core.management.base import BaseCommand
from scholarships.models import Scholarship

class Command(BaseCommand):
    help = 'Seed the database with initial scholarship data'

    def handle(self, *args, **kwargs):
        scholarships_data = [
            {
                "title": "DOST-SEI Undergraduate Scholarship (RA 7687)",
                "tag": "RA 7687",
                "amount": "Amount: Php 80,000/Year",
                "deadline": "2026-11-21",
                "description": "Government scholarship for financially challenged, talented students pursuing priority S&T courses like Engineering, Math, and Sciences. Includes stipend and books allowance.",
                "gradient": "linear-gradient(135deg, #4caf88 0%, #d4622a 100%)",
                "bookmarked": True,
                "min_gwa": 85.0,
                "max_income": 300000,
                "course": "STEM",
                "link": "https://www.sei.dost.gov.ph/"
            },
            {
                "title": "CHED Merit Scholarship Program (CMSP)",
                "tag": "CMSP",
                "amount": "Amount: Php 120,000/Year (Full)",
                "deadline": "2026-06-30",
                "description": "Financial assistance for academically gifted Filipino students pursuing undergraduate degrees in CHED-priority programs (Full or Half-Merit).",
                "gradient": "linear-gradient(135deg, #2d8c62 0%, #1a6648 100%)",
                "bookmarked": False,
                "min_gwa": 90.0,
                "max_income": 400000,
                "course": "ANY",
                "link": "https://dexus.r5.ched.gov.ph/student/login"
            },
            {
                "title": "SM Foundation College Scholarship Program",
                "tag": "SM",
                "amount": "Amount: Php 100,000/Year (Exc.)",
                "deadline": "2026-12-31",
                "description": "Private scholarship offering full tuition, monthly allowance, and job opportunities for students in partner schools, specializing in Tech, Engineering, or Education.",
                "gradient": "linear-gradient(135deg, #d4622a 0%, #f0b429 60%, #2d8c62 100%)",
                "bookmarked": False,
                "min_gwa": 88.0,
                "max_income": 250000,
                "course": "STEM",
                "link": "https://www.sm-foundation.org/"
            },
            {
                "title": "OWWA Education for Development Scholarship Program (EDSP)",
                "tag": "EDSP",
                "amount": "Amount: Php 65,000/Year",
                "deadline": "2025-08-30",
                "description": "A competitive program for a qualified dependent (child or spouse) of an active Overseas Filipino Worker (OFW) who is pursuing a 4 or 5-year course.",
                "gradient": "linear-gradient(135deg, #1a6648 0%, #4caf88 100%)",
                "bookmarked": False,
                "min_gwa": 80.0,
                "max_income": 9999999,
                "course": "ANY",
                "link": "https://owwa.gov.ph/"
            },
            {
                "title": "Aboitiz Foundation Full Scholarship Grant",
                "tag": "AFG",
                "amount": "Amount: Php 110,000/Year (Ext.)",
                "deadline": "2026-06-15",
                "description": "Offers full tuition and a monthly allowance to high-achieving college students in STEM, business or education programs, with incentives for Latin honors.",
                "gradient": "linear-gradient(135deg, #f0b429 0%, #d4622a 100%)",
                "bookmarked": False,
                "min_gwa": 88.0,
                "max_income": 350000,
                "course": "STEM, BUSINESS, EDUC",
                "link": "https://aboitiz.com/our-businesses/aboitiz-foundation/aboitiz-future-leaders-scholarship"
            }
        ]

        for data in scholarships_data:
            Scholarship.objects.update_or_create(
                title=data['title'],
                defaults=data
            )
        
        self.stdout.write(self.style.SUCCESS(f'Successfully seeded {len(scholarships_data)} scholarships!'))