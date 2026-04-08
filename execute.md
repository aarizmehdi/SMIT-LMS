You are a senior UI engineer and design systems expert. Build a complete, 
production-ready SMIT Student Portal as a single HTML file from scratch.

═══════════════════════════════════════
BRAND IDENTITY — NON NEGOTIABLE
═══════════════════════════════════════
Primary Blue:   #1A56DB
Primary Green:  #16A34A
Background:     #FFFFFF
Surface:        #F8FAFC
Text Primary:   #0F172A
Text Muted:     #64748B
Border:         #E2E8F0
Error/Alert:    #DC2626
Warning:        #D97706
Success:        #16A34A

Never use dark mode. Never use teal, purple, pink, or any off-brand color.
SMIT blue and green only as accent colors.

═══════════════════════════════════════
TYPOGRAPHY — STRICT
═══════════════════════════════════════
Import from Google Fonts:
- "Plus Jakarta Sans" — headings, labels, nav, buttons (weights: 500, 600, 700)
- "Inter" — body text, form inputs, table data (weights: 400, 500)

Font scale:
- Display: 28px / 700 / Plus Jakarta Sans
- Heading: 20px / 600 / Plus Jakarta Sans  
- Subheading: 16px / 600 / Plus Jakarta Sans
- Body: 14px / 400 / Inter
- Label: 12px / 500 / Plus Jakarta Sans / uppercase / letter-spacing: 0.5px
- Micro: 11px / 400 / Inter

Line height: 1.6 for body, 1.2 for headings.
Never go below 11px. Never use font-weight 300.

═══════════════════════════════════════
DESIGN SYSTEM
═══════════════════════════════════════
Border radius: 8px buttons/inputs, 12px cards, 16px large cards
Shadows: 
  - Card: 0 1px 3px rgba(0,0,0,0.08), 0 1px 2px rgba(0,0,0,0.04)
  - Elevated: 0 4px 16px rgba(0,0,0,0.10)
  - Focus ring: 0 0 0 3px rgba(26,86,219,0.15)

Spacing system: 4px base unit. Use 8, 12, 16, 20, 24, 32, 40, 48px only.

Transitions: all interactive elements use transition: all 0.18s ease

Buttons:
  - Primary: bg #1A56DB, text white, hover bg #1746C0, active scale(0.98)
  - Secondary: bg white, border #E2E8F0, hover bg #F8FAFC
  - Danger: bg #DC2626, text white

Inputs: 
  - border: 1px solid #E2E8F0
  - focus: border #1A56DB + focus ring
  - height: 44px
  - padding: 0 14px

Badges:
  - ENROLLED: bg #DCFCE7, text #15803D, border #BBF7D0
  - PENDING: bg #FEF3C7, text #B45309, border #FDE68A
  - PRESENT: bg #DCFCE7, text #15803D
  - ABSENT: bg #FEE2E2, text #B91C1C

═══════════════════════════════════════
LAYOUT — PERSISTENT SHELL
═══════════════════════════════════════
After login, all pages share this shell:

SIDEBAR (240px fixed left):
- Top: SMIT logo + "Student Portal" label
- Search bar (search courses)
- Nav items with icons: Dashboard, Progress, Attendance, Payment, Assignment, Quiz
- Active state: blue left border (3px) + blue bg tint (#EFF6FF) + blue text
- Hover: #F8FAFC bg
- Bottom: user avatar (initials circle, blue bg) + name + role + logout icon

TOPBAR (full width, 64px height):
- Left: Page title (breadcrumb for inner pages)
- Right: "Feedback" button (outlined) + notification bell + user avatar

MAIN CONTENT: calc(100% - 240px), left offset 240px, top offset 64px
Scrollable content area with 32px padding.

═══════════════════════════════════════
PAGE 1 — LOGIN
═══════════════════════════════════════
Full viewport split layout:

LEFT PANEL (45% width, bg #1A56DB):
- SMIT logo white version top left
- Center content:
  - Tagline: "Empowering Pakistan's Digital Future"
  - Subtitle: "Access your courses, track progress, and build your career"
  - 3 stats row: "50,000+ Students" | "120+ Courses" | "35+ Cities"
  - Each stat: large white number, small muted label below
- Bottom: decorative subtle pattern (CSS only, dots or grid lines using opacity)

RIGHT PANEL (55% width, bg white):
- Center aligned form, max-width 400px
- "Welcome back 👋" heading
- "Sign in to your student portal" subtitle
- Tab switcher: [Student] [Teacher] — pill style tabs
- Form fields:
  - CNIC: label + input with placeholder "xxxxx-xxxxxxx-x"
  - Password: label + input type password + eye toggle button (right side)
- LOGIN button (full width, primary)
- Divider line with "or" text
- "Create Password" section with subtle card:
  - "First time? Set up your account" text
  - Link styled button "Create Password →"
- Below form: "Having trouble? Contact support" in muted text

═══════════════════════════════════════
PAGE 2 — COURSE LIST (Home after login)
═══════════════════════════════════════
Topbar search: "Search Course" input + filter dropdown [ENROLLED ▾]

Content:
- Section heading: "My Courses"
- Course card (full width, white, elevated shadow):
  - Left accent bar (3px, green)
  - Course name: "Web and Mobile App Development" — heading size
  - Course code badge: "WMAD" with book icon
  - Status badge: "ENROLLED" top right
  - Progress bar: 0% with label
  - Meta row: batch icon + "Batch: 4" | roll icon + "Roll: 433008"
  - Meta row 2: pin icon + "Campus: Mohsin and Huma Campus" | city icon + "Peshawar"
  - "View Details →" button (secondary, full width, bottom)

Empty state (if no courses): illustration placeholder + "No courses found"

═══════════════════════════════════════
PAGE 3 — DASHBOARD (View Details of course)
═══════════════════════════════════════
Breadcrumb: Home > Web and Mobile App Development

Top stats row (2 cards):
  Card 1: Clock icon (green circle bg) | "24/37" large | "Attendance" label
  Card 2: Graduation icon (purple circle bg) | "0/0" large | "Assignment" label

Right panel (sticky): "Class Schedule" card
  - 7-day week strip: Sun 29, Mon 30, Tue 31, Wed 01 (highlighted blue), Thu 02 (highlighted blue), Fri 03, Sat 04
  - Today gets blue filled pill, class days get border highlight
  - Tabs below: [Assignments] [Quizzes] [Events]
  - Content: "No upcoming quizzes" empty state with icon

Active Course card:
  - Same design as course list card but expanded
  - Schedule pills: "Wed 06:00 PM – 08:00 PM" | "Thu 06:00 PM – 08:00 PM"
  - Progress bar 0%
  - All meta info

Fee section (below course card):
  - Table with columns: Month | Amount | Due Date | Voucher ID | 1Bill/Inv | Status
  - Row: Apr 2026 | Rs: 1000/- | 08-Apr-2026 | 202604433008 (copy icon) | N/A | PENDING badge
  - JazzCash payment instruction box:
    - Blue left border card
    - "Pay via JazzCash" heading
    - Numbered steps: Open JazzCash → More → Education → Universities → Saylani Education → Voucher ID → Pay
    - Right side: phone mockup placeholder (dark card with play button)
    - "Refresh" button bottom right

═══════════════════════════════════════
PAGE 4 — ATTENDANCE
═══════════════════════════════════════
Breadcrumb: Home > Web and Mobile App Development > Attendance

Top 4 stat cards (equal width grid):
  - Total Classes: 37 (calendar icon)
  - Present: 24 (green check circle)
  - Leave: 0 (orange X circle)
  - Absent: 13 (red X circle)

Attendance Overview card:
  - Label: "Attendance Overview"
  - Progress bar: fill width based on 24/37 = 64.8%, color RED (#DC2626) because below 75%
  - Warning text: "Your attendance is below 75%. Please improve your attendance." in red

Attendance Details card:
  - Header: "Attendance Details" + month dropdown [Apr 2026 ▾]
  - Table: Class# | Date | Status
  - Row 1: 1 | Wed, Apr 1, 2026 | PRESENT badge
  - Row 2: 2 | Thu, Apr 2, 2026 | PRESENT badge
  - Table striped rows (alternate #F8FAFC)
  - Empty rows show dashes

═══════════════════════════════════════
PAGE 5 — PAYMENT
═══════════════════════════════════════
Same as fee section from Dashboard but full page.
- JazzCash card full width
- Fee table full width
- Add "Copy Voucher ID" button that copies to clipboard and shows "Copied!" tooltip

═══════════════════════════════════════
PAGE 6 — ASSIGNMENT
═══════════════════════════════════════
Table: Module | Title | Due Date | Status | Submission | Action
Empty state: "No assignments yet. Check back later." with icon

═══════════════════════════════════════
PAGE 7 — QUIZ
═══════════════════════════════════════
Important info card (warning style, amber left border):
  - Triangle warning icon
  - 4 bullet points:
    "Once started, quizzes must be completed in one session"
    "Switching tabs or leaving the window will be recorded"
    "Ensure you have a stable internet connection"
    "The quiz will open in fullscreen mode"

Quiz table: Module | Title | Questions | Attempts | Score | Percentage | Status | Info | Action
Empty state row: "No active quizzes available" | "Check back later for upcoming assessments"
Footer text: "Contact your instructor if you have any issues accessing your quizzes."

═══════════════════════════════════════
PAGE 8 — PROFILE
═══════════════════════════════════════
Cover: solid blue (#1A56DB) banner, 120px height
Avatar: circular, overlapping cover bottom, 80px, shows initials "AM" on blue bg
  - Camera icon overlay on hover (edit photo)
  - "Private" toggle button top right (lock icon)
  - Cancel + Save Changes buttons

Form grid (2 columns):
  Left column:
    - Name field: "AARIZ MEHDI" (editable input)
    - "Student" badge below name
    - About Me: textarea with placeholder "Write something about yourself..."
    - Email: aarizm*****@gmail.com (partially masked)
    - Phone: (editable)

  Right column:
    - Gender: dropdown [Male ▾]
    - Date of Birth: date input [09/05/2009]
    - Last Qualification: dropdown
    - CNIC: "1730157164037" (read-only, copy icon)
    - Enrolled Courses: 
      - "ویب اینڈ موبائل ایپ ڈویلپمنٹ" with ENROLLED badge

═══════════════════════════════════════
INTERACTIONS & MICRO-ANIMATIONS
═══════════════════════════════════════
- Sidebar nav: smooth active state transition
- Page switching: fade in (opacity 0→1, translateY 8px→0, duration 200ms)
- Buttons: scale(0.98) on click
- Cards: subtle lift on hover (transform: translateY(-1px), shadow increase)
- Copy button: shows "Copied!" for 2 seconds then reverts
- Password eye toggle: functional show/hide
- Attendance progress bar: animates on page load (width 0 → actual %, 600ms ease)
- Form tab switcher: smooth underline slide
- Dropdown month filter: functional (JS)
- Stats numbers: count-up animation on first view (0 → actual number, 800ms)

═══════════════════════════════════════
TECHNICAL REQUIREMENTS
═══════════════════════════════════════
- Single HTML file. All CSS and JS inline. No frameworks.
- Google Fonts CDN only external dependency.
- SVG icons inline (no icon library CDN) — use simple geometric SVG paths
- All navigation functional via JS (show/hide sections)
- No console errors
- Semantic HTML: nav, main, section, article, aside
- ARIA labels on interactive elements
- Smooth scroll behavior
- CSS custom properties (variables) for all colors and spacing
- Works on Chrome, Firefox, Safari latest
- Minimum viewport: 1024px (desktop focused, no mobile required)
- No Lorem Ipsum — use real SMIT data from above

═══════════════════════════════════════
DATA TO USE (real, from screenshots)
═══════════════════════════════════════
Student: Aariz Mehdi
CNIC: 1730157164037
Roll: 433008
Batch: 4
Campus: Mohsin and Huma Campus
City: Peshawar
Course: Web and Mobile App Development (WMAD)
Schedule: Wed & Thu, 6:00 PM – 8:00 PM
Total Classes: 37 | Present: 24 | Leave: 0 | Absent: 13
Fee: Rs. 1,000 | Due: 08-Apr-2026 | Voucher: 202604433008 | Status: PENDING
DOB: 09/05/2009 | Email: aarizm*****@gmail.com

Output: One complete, valid, production-ready HTML file.
No placeholders. No TODOs. No incomplete sections.
Every page fully built. Every interaction working.