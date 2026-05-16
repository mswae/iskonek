from django.core.management.base import BaseCommand
from scholarships.models import Scholarship

class Command(BaseCommand):
    help = 'Seed the database with real scholarship data for Naga City / Philippines with expanded tags'

    def handle(self, *args, **kwargs):
        
        # Pre-defined string constants mapping all frontend choices
        ALL_PROGRAMS = "STEM, ABM, HUMSS, GAS, TVL, Sports Track, Arts & Design, BS Computer Science, BS Information Technology, BS Information Systems, BS Computer Engineering, BS Civil Engineering, BS Electrical Engineering, BS Mechanical Engineering, BS Nursing, BS Education, BS Business Administration, AB Communication, AB Political Science, Other"
        
        TECH_ENGINEERING_STEM = "STEM, BS Computer Science, BS Information Technology, BS Information Systems, BS Computer Engineering, BS Civil Engineering, BS Electrical Engineering, BS Mechanical Engineering"
        
        BUSINESS_TRACKS = "ABM, BS Business Administration"
        
        EDUCATION_TRACKS = "STEM, HUMSS, GAS, AB Communication, BS Education"

        scholarships_data = [
            {
                "title": "DOST-SEI Undergraduate Scholarship (RA 7687)",
                "tag": "RA 7687",
                "amount": "Php 80,000/Year + Allowances",
                "deadline": "2026-11-21",
                "description": "Government scholarship for financially challenged, talented students in Naga City and nationwide pursuing priority S&T courses.",
                "gradient": "linear-gradient(135deg, #4caf88 0%, #d4622a 100%)",
                "bookmarked": False,
                "min_gwa": 85.0,
                "max_income": 300000,
                "course": TECH_ENGINEERING_STEM,
                "link": "https://www.sei.dost.gov.ph/"
            },
            {
                "title": "CHED Merit Scholarship Program (CMSP)",
                "tag": "CMSP",
                "amount": "Php 120,000/Year (Full)",
                "deadline": "2026-06-30",
                "description": "Financial assistance for academically gifted Filipino students pursuing undergraduate degrees. Covers tuition, stipends, and book allowances.",
                "gradient": "linear-gradient(135deg, #2d8c62 0%, #1a6648 100%)",
                "bookmarked": False,
                "min_gwa": 93.0,
                "max_income": 500000,
                "course": ALL_PROGRAMS,
                "link": "https://chedro5.com/scholarships"
            },
            {
                "title": "Naga's Tertiary Scholarship Program (NTSP)",
                "tag": "NTSP",
                "amount": "Variable Tuition Support",
                "deadline": "2026-08-15",
                "description": "Mandated by Naga City Ordinance No. 2010-063, providing targeted financial assistance specifically to Naga City residents.",
                "gradient": "linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%)",
                "bookmarked": False,
                "min_gwa": 81.0,
                "max_income": 180000,
                "course": ALL_PROGRAMS,
                "link": "https://www2.naga.gov.ph/nagas-tertiary-scholarship-program-ntsp/"
            },
            {
                "title": "Tertiary Education Subsidy (TES) - CHEDRO V",
                "tag": "TES",
                "amount": "Php 40,000 - 60,000/Year",
                "deadline": "2026-09-30",
                "description": "Grant-in-aid program prioritizing students in the Listahanan 4Ps to support the cost of tertiary education in Bicol SUCs and LUCs.",
                "gradient": "linear-gradient(135deg, #d97706 0%, #b45309 100%)",
                "bookmarked": False,
                "min_gwa": 75.0,
                "max_income": 300000,
                "course": ALL_PROGRAMS,
                "link": "https://chedro5.com/scholarships"
            },
            {
                "title": "SM Foundation College Scholarship Program",
                "tag": "SM",
                "amount": "Full Tuition + Monthly Allowance",
                "deadline": "2026-12-31",
                "description": "Private scholarship offering full tuition and job opportunities. Partner schools in Bicol include Ateneo de Naga and UNC.",
                "gradient": "linear-gradient(135deg, #0284c7 0%, #0369a1 100%)",
                "bookmarked": False,
                "min_gwa": 88.0,
                "max_income": 250000,
                "course": f"{TECH_ENGINEERING_STEM}, {BUSINESS_TRACKS}, {EDUCATION_TRACKS}",
                "link": "https://www.sm-foundation.org/"
            },
            {
                "title": "Aboitiz Future Leaders Scholarship",
                "tag": "Aboitiz",
                "amount": "Full Tuition + Stipend",
                "deadline": "2026-09-01",
                "description": "Provided by Aboitiz Foundation. TPVI, an Aboitiz subsidiary in Naga City, supports scholars pursuing critical engineering and business degrees.",
                "gradient": "linear-gradient(135deg, #dc2626 0%, #991b1b 100%)",
                "bookmarked": False,
                "min_gwa": 88.0,
                "max_income": 9999999,
                "course": f"{TECH_ENGINEERING_STEM}, {BUSINESS_TRACKS}",
                "link": "https://sites.google.com/aboitiz.com/aboitiz-future-leaders-scholar/home"
            },
            {
                "title": "OWWA Education for Development Scholarship (EDSP)",
                "tag": "OWWA",
                "amount": "Php 60,000/Year",
                "deadline": "2026-08-30",
                "description": "A competitive program for qualified dependents (child or spouse) of active Overseas Filipino Workers (OFWs) pursuing a 4 or 5-year course.",
                "gradient": "linear-gradient(135deg, #059669 0%, #047857 100%)",
                "bookmarked": False,
                "min_gwa": 80.0,
                "max_income": 9999999,
                "course": ALL_PROGRAMS,
                "link": "https://owwa.gov.ph/"
            },
            {
                "title": "CHED Tulong Dunong Program (TDP)",
                "tag": "TDP",
                "amount": "Php 15,000/Year",
                "deadline": "2026-10-15",
                "description": "A subsidy assisting enrolled students in CHED-recognized HEIs in Camarines Sur and Naga to partially cover education-related expenses.",
                "gradient": "linear-gradient(135deg, #7c3aed 0%, #5b21b6 100%)",
                "bookmarked": False,
                "min_gwa": 75.0,
                "max_income": 500000,
                "course": ALL_PROGRAMS,
                "link": "https://chedro5.com/scholarships"
            },
            {
                "title": "Security Bank Foundation Scholarship",
                "tag": "SBFI",
                "amount": "Php 100,000/Year",
                "deadline": "2026-07-31",
                "description": "Open to incoming college freshmen in partner schools like Ateneo de Naga University. Covers tuition and monthly stipend.",
                "gradient": "linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)",
                "bookmarked": False,
                "min_gwa": 85.0,
                "max_income": 300000,
                "course": f"{BUSINESS_TRACKS}, {EDUCATION_TRACKS}",
                "link": "https://www.securitybank.com/foundation/"
            },
            {
                "title": "Napolcom Scholarship Program (Bicol)",
                "tag": "Napolcom",
                "amount": "Php 75,000/Semester",
                "deadline": "2026-05-30",
                "description": "For children of deceased or disabled PNP personnel. Partner schools include Naga College Foundation and Universidad de Sta. Isabel.",
                "gradient": "linear-gradient(135deg, #475569 0%, #334155 100%)",
                "bookmarked": False,
                "min_gwa": 75.0,
                "max_income": 9999999,
                "course": ALL_PROGRAMS,
                "link": "https://pageone.ph/napolcom-bicol-schools-ink-deal-for-scholarship-program/"
            },
            {
                "title": "Gokongwei Brothers Foundation Teach STEM",
                "tag": "GBF",
                "amount": "Php 65,000/Year",
                "deadline": "2026-08-30",
                "description": "Designed for educators-in-training pursuing degrees in Science, Technology, Engineering, and Mathematics (STEM) education.",
                "gradient": "linear-gradient(135deg, #ea580c 0%, #c2410c 100%)",
                "bookmarked": False,
                "min_gwa": 85.0,
                "max_income": 300000,
                "course": EDUCATION_TRACKS,
                "link": "https://www.gokongweibrothersfoundation.org/"
            },
            {
                "title": "Megaworld Foundation Scholarship",
                "tag": "Megaworld",
                "amount": "Full Tuition + Allowance",
                "deadline": "2026-06-15",
                "description": "Provides educational grants to financially challenged but academically gifted students in partner universities across the country.",
                "gradient": "linear-gradient(135deg, #db2777 0%, #be185d 100%)",
                "bookmarked": False,
                "min_gwa": 85.0,
                "max_income": 300000,
                "course": f"{TECH_ENGINEERING_STEM}, {BUSINESS_TRACKS}, AB Communication",
                "link": "https://megaworldfoundation.com/"
            },
            {
                "title": "Ayala Foundation U-Go Scholarship",
                "tag": "U-Go",
                "amount": "Php 40,000/Year",
                "deadline": "2026-08-01",
                "description": "Private scholarship specifically supporting deserving female students enrolled in public colleges and universities.",
                "gradient": "linear-gradient(135deg, #9333ea 0%, #7e22ce 100%)",
                "bookmarked": False,
                "min_gwa": 85.0,
                "max_income": 300000,
                "course": ALL_PROGRAMS,
                "link": "https://www.ayalafoundation.org/"
            },
            {
                "title": "DOST-SEI Merit Scholarship Program",
                "tag": "DOST Merit",
                "amount": "Php 80,000/Year + Allowances",
                "deadline": "2026-11-21",
                "description": "For students with high aptitude in science and mathematics, regardless of family income.",
                "gradient": "linear-gradient(135deg, #14b8a6 0%, #0f766e 100%)",
                "bookmarked": False,
                "min_gwa": 90.0,
                "max_income": 9999999,
                "course": TECH_ENGINEERING_STEM,
                "link": "https://www.sei.dost.gov.ph/"
            },
            {
                "title": "Ateneo de Naga University College Scholarship",
                "tag": "AdNU",
                "amount": "Up to Full Tuition",
                "deadline": "2026-05-15",
                "description": "Institutional scholarship offered directly by AdNU for top-performing Senior High graduates belonging to the Top 20% of their class.",
                "gradient": "linear-gradient(135deg, #ca8a04 0%, #a16207 100%)",
                "bookmarked": False,
                "min_gwa": 90.0,
                "max_income": 500000,
                "course": ALL_PROGRAMS,
                "link": "https://www.adnu.edu.ph/admissions/"
            }
        ]

        for data in scholarships_data:
            Scholarship.objects.update_or_create(
                title=data['title'],
                defaults=data
            )
        
        self.stdout.write(self.style.SUCCESS(f'Successfully seeded {len(scholarships_data)} real scholarships!'))