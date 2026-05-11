/**
 * Interactive Assessment & Feedback Hub
 * script.js — Professional Edition
 *
 * Sections: Navigation, Theme, Charts, Students,
 *           Gradebook, Cumulative, Toolkit,
 *           Narrative, Reflection, Modals
 */

'use strict';

/* ═══════════════════════════════════════
   DATA
═══════════════════════════════════════ */

const STUDENTS = [
  { id: 1, name:'Ana', score:88, letter:'B+', numerical:'1.75', descriptor:'Very Good', desc:'Strong problem-solving' },
  { id: 2, name:'Ben', score:95, letter:'A', numerical:'1.25', descriptor:'Excellent', desc:'Excellent collaboration' },
  { id: 3, name:'Cara', score:72, letter:'D+', numerical:'3.25', descriptor:'Conditional', desc:'Needs improvement' },
  { id: 4, name:'David', score:85, letter:'B', numerical:'2.00', descriptor:'Above Average', desc:'Consistent effort' },
  { id: 5, name:'Ella', score:90, letter:'B+', numerical:'1.75', descriptor:'Very Good', desc:'Creative solutions' },
  { id: 6, name:'Felix', score:67, letter:'D-', numerical:'3.75', descriptor:'Failed', desc:'Needs additional support' },
  { id: 7, name:'Grace', score:80, letter:'C+', numerical:'2.50', descriptor:'Average', desc:'Good participation' },
  { id: 8, name:'Hugo', score:76, letter:'C', numerical:'2.75', descriptor:'Average', desc:'Needs more reflection' },
  { id: 9, name:'Iris', score:92, letter:'A-', numerical:'1.50', descriptor:'Very Good', desc:'Excellent technical skills' },
  { id:10, name:'Jack', score:70, letter:'D', numerical:'3.50', descriptor:'Conditional', desc:'Needs troubleshooting practice' },
  { id:11, name:'Kim', score:83, letter:'B-', numerical:'2.25', descriptor:'Above Average', desc:'Good collaboration' },
  { id:12, name:'Liam', score:78, letter:'C', numerical:'2.75', descriptor:'Average', desc:'Average performance' },
  { id:13, name:'Mia', score:96, letter:'A', numerical:'1.25', descriptor:'Excellent', desc:'Outstanding initiative' },
  { id:14, name:'Noah', score:74, letter:'D+', numerical:'3.25', descriptor:'Conditional', desc:'Needs consistency' },
  { id:15, name:'Zoe', score:89, letter:'B+', numerical:'1.75', descriptor:'Very Good', desc:'Strong analytical thinking' },
];

// Component scores per student: [quiz, activity, longExam, participation]
// Weights: 25%, 35%, 25%, 15%
const COMPONENTS = {
  Ana:   [85, 90, 86, 92], Ben:   [94, 97, 93, 96], Cara:  [70, 74, 71, 73],
  David: [83, 87, 84, 86], Ella:  [89, 92, 88, 91], Felix: [65, 68, 66, 70],
  Grace: [78, 82, 79, 81], Hugo:  [74, 77, 75, 79], Iris:  [91, 94, 90, 93],
  Jack:  [68, 71, 69, 73], Kim:   [81, 85, 82, 84], Liam:  [76, 79, 77, 80],
  Mia:   [95, 97, 96, 97], Noah:  [72, 75, 73, 77], Zoe:   [87, 91, 88, 90],
};

const CHART_COLORS = {
  blue:   '#2563eb',
  green:  '#16a34a',
  purple: '#7c3aed',
  rose:   '#e11d48',
  amber:  '#d97706',
  teal:   '#0d9488',
};



/* ═══════════════════════════════════════
   STUDENT EVIDENCE DATA
   Each student has: quiz scores, assignment, performance task, remarks
═══════════════════════════════════════ */

const EVIDENCE = {
  Ana:   { quizzes:[82,85,88], assignment:'Printer Driver Troubleshooting Report', assignScore:90, perfTask:'Hardware Diagnostic Demonstration', perfScore:87, remarks:'Ana shows strong analytical skills. Consistently submits outputs on time and demonstrates confidence in hardware tasks.' },
  Ben:   { quizzes:[94,96,95], assignment:'Network Configuration Documentation', assignScore:97, perfTask:'Live Wi-Fi Troubleshooting Demo', perfScore:94, remarks:'Ben is an outstanding learner who takes initiative. Leads group activities effectively and helps struggling peers.' },
  Cara:  { quizzes:[68,72,74], assignment:'Software Installation Checklist', assignScore:70, perfTask:'System Boot Recovery Exercise', perfScore:73, remarks:'Cara needs additional guided practice. Struggles with independent troubleshooting but shows improvement with peer support.' },
  David: { quizzes:[83,86,84], assignment:'Peripheral Setup Documentation', assignScore:85, perfTask:'Projector Configuration Task', perfScore:86, remarks:'David is a consistent and reliable student. Produces well-organized outputs and participates actively in lab activities.' },
  Ella:  { quizzes:[89,91,90], assignment:'Security Practices Report', assignScore:92, perfTask:'Account Recovery Live Demo', perfScore:89, remarks:'Ella demonstrates creative problem-solving. Her written reports are thorough and her practical skills are commendable.' },
  Felix: { quizzes:[64,67,68], assignment:'Hardware Identification Activity', assignScore:65, perfTask:'Component Labeling Exercise', perfScore:68, remarks:'Felix requires immediate academic intervention. Participation is low and outputs are often incomplete. Remediation recommended.' },
  Grace: { quizzes:[79,80,81], assignment:'Network Topology Diagram', assignScore:82, perfTask:'IP Configuration Lab', perfScore:78, remarks:'Grace participates well in class discussions. Lab outputs are satisfactory and she engages positively with groupmates.' },
  Hugo:  { quizzes:[74,76,78], assignment:'System Maintenance Log', assignScore:77, perfTask:'Disk Cleanup and Defrag Demo', perfScore:75, remarks:'Hugo shows average performance. Needs to develop consistency in completing tasks. Reflective journaling recommended.' },
  Iris:  { quizzes:[91,93,92], assignment:'Cybersecurity Awareness Poster', assignScore:94, perfTask:'Password Security Live Audit', perfScore:91, remarks:'Iris is technically excellent. Her outputs consistently exceed expectations and she mentors classmates effectively.' },
  Jack:  { quizzes:[68,70,72], assignment:'Troubleshooting Flowchart', assignScore:69, perfTask:'Basic Hardware Assembly', perfScore:71, remarks:'Jack needs more practice in systematic troubleshooting. Attends class regularly but requires closer guidance during lab tasks.' },
  Kim:   { quizzes:[81,84,83], assignment:'Software Licensing Report', assignScore:84, perfTask:'Antivirus Installation Lab', perfScore:82, remarks:'Kim collaborates well and submits quality outputs. Performance is consistent across both written and practical assessments.' },
  Liam:  { quizzes:[76,78,80], assignment:'Computer Parts Identification Sheet', assignScore:79, perfTask:'BIOS Configuration Task', perfScore:77, remarks:'Liam performs at an average level. More effort in reviewing concepts after class would significantly improve scores.' },
  Mia:   { quizzes:[95,97,96], assignment:'ICT Lab Inventory Report', assignScore:98, perfTask:'Full System Setup Demonstration', perfScore:96, remarks:'Mia is the top performer in the class. Her initiative, attention to detail, and leadership skills are outstanding.' },
  Noah:  { quizzes:[72,74,75], assignment:'Driver Update Documentation', assignScore:73, perfTask:'Operating System Update Lab', perfScore:74, remarks:'Noah is capable but inconsistent. Needs to develop better study habits and follow through on task completion.' },
  Zoe:   { quizzes:[88,89,90], assignment:'Network Security Report', assignScore:90, perfTask:'Firewall Configuration Demo', perfScore:88, remarks:'Zoe demonstrates strong analytical thinking and clear technical writing. A reliable and independent learner.' },
};

/* ═══════════════════════════════════════
   UTILITIES
═══════════════════════════════════════ */

/**
 * Convert % score to letter grade.
 * @param {number} score
 * @returns {string}
 */
function toLetter(score) {
  if (score >= 97) return 'A+';
  if (score >= 94) return 'A';
  if (score >= 91) return 'A-';
  if (score >= 88) return 'B+';
  if (score >= 85) return 'B';
  if (score >= 82) return 'B-';
  if (score >= 79) return 'C+';
  if (score >= 76) return 'C';
  if (score >= 75) return 'C-';
  if (score >= 72) return 'D+';
  if (score >= 69) return 'D';
  if (score >= 66) return 'D-';
  if (score >= 65) return 'F+';
  return 'F';
}

/**
 * Return color set based on USTP numerical grade.
 * USTP Scale: 1.00–1.75 = Excellent/Very Good (green)
 *             2.00–2.75 = Above Average/Average (blue)
 *             3.00      = Passing (teal)
 *             3.25–3.50 = Conditional (amber)
 *             3.75–5.00 = Failed (rose)
 * @param {string} numerical  e.g. '1.50', '3.25'
 * @returns {{ text, bg, bar, cssClass }}
 */
function gradeColors(numerical) {
  const n = parseFloat(numerical);
  if (n <= 1.75) return { text: '#16a34a', bg: 'rgba(22,163,74,0.10)',   bar: CHART_COLORS.green,  cssClass: 'grade-excellent' };
  if (n <= 2.75) return { text: '#2563eb', bg: 'rgba(37,99,235,0.08)',   bar: CHART_COLORS.blue,   cssClass: 'grade-good' };
  if (n <= 3.00) return { text: '#0d9488', bg: 'rgba(13,148,136,0.10)',  bar: CHART_COLORS.teal,   cssClass: 'grade-passing' };
  if (n <= 3.50) return { text: '#d97706', bg: 'rgba(217,119,6,0.10)',   bar: CHART_COLORS.amber,  cssClass: 'grade-conditional' };
  return              { text: '#e11d48', bg: 'rgba(225,29,72,0.08)',   bar: CHART_COLORS.rose,   cssClass: 'grade-failed' };
}

/**
 * Compute cumulative grade from component array.
 * Weights: quiz 25%, activity 35%, exam 25%, participation 15%
 * @param {number[]} components [quiz, activity, exam, participation]
 * @returns {number}
 */
function cumulativeGrade([q, a, e, p]) {
  return q * 0.25 + a * 0.35 + e * 0.25 + p * 0.15;
}

/**
 * Trigger a file download.
 * @param {Blob} blob
 * @param {string} filename
 */
function triggerDownload(blob, filename) {
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
}


/* ═══════════════════════════════════════
   NAVIGATION
═══════════════════════════════════════ */

/**
 * Show a named section and update the active nav link.
 * @param {string} id      Section element ID
 * @param {Element} link   Clicked nav element
 */
function showSection(id, link) {
  // Hide all sections
  document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));

  // Show target
  const target = document.getElementById(id);
  if (target) target.classList.add('active');

  // Update nav
  document.querySelectorAll('.nav-link').forEach(el => el.classList.remove('active-link'));
  if (link) link.classList.add('active-link');

  // Close sidebar on mobile
  if (window.innerWidth <= 768) {
    document.getElementById('sidebar').classList.remove('open');
    const ov = document.getElementById('sidebarOverlay');
    if (ov) ov.classList.remove('active');
    document.body.style.overflow = '';
  }

  // Lazy-initialise charts per section
  if (id === 'dashboard') initDashboardCharts();
  if (id === 'gradebook') initGradebookCharts();
}

function toggleSidebar() {
  const sidebar = document.getElementById('sidebar');
  const overlay = document.getElementById('sidebarOverlay');
  const isOpen  = sidebar.classList.toggle('open');
  if (overlay) overlay.classList.toggle('active', isOpen);
  document.body.style.overflow = isOpen && window.innerWidth <= 768 ? 'hidden' : '';
}


/* ═══════════════════════════════════════
   THEME
═══════════════════════════════════════ */

let isDark = false;

function toggleTheme() {
  isDark = !isDark;
  document.body.classList.toggle('dark', isDark);

  const iconMoon = document.getElementById('iconMoon');
  const iconSun  = document.getElementById('iconSun');
  const label    = document.getElementById('themeLabel');

  if (iconMoon) iconMoon.style.display = isDark ? 'none' : 'block';
  if (iconSun)  iconSun.style.display  = isDark ? 'block' : 'none';
  if (label)    label.textContent       = isDark ? 'Light Mode' : 'Dark Mode';
}


/* ═══════════════════════════════════════
   ANIMATED COUNTERS
═══════════════════════════════════════ */

function animateCounters() {
  document.querySelectorAll('.stat-num[data-target]').forEach(el => {
    const target = parseInt(el.dataset.target, 10);
    let current = 0;
    const step = Math.max(1, Math.ceil(target / 55));

    const interval = setInterval(() => {
      current = Math.min(current + step, target);
      el.textContent = current;
      if (current >= target) clearInterval(interval);
    }, 20);
  });
}


/* ═══════════════════════════════════════
   PROGRESS BARS
═══════════════════════════════════════ */

function animateProgressBars() {
  setTimeout(() => {
    document.querySelectorAll('.prog-fill[data-w]').forEach(bar => {
      bar.style.width = bar.dataset.w + '%';
    });
  }, 200);
}


/* ═══════════════════════════════════════
   DASHBOARD CHARTS
═══════════════════════════════════════ */

let donutChart = null;
let radarChart = null;

function initDashboardCharts() {
  if (donutChart) return; // already initialised

  // Donut — grade distribution
  const donutCtx = document.getElementById('donutChart');
  if (donutCtx) {
    // Compute live counts from STUDENTS
    const donutCounts = { excellent: 0, good: 0, passing: 0, conditional: 0, failed: 0 };
    STUDENTS.forEach(s => {
      const n = parseFloat(s.numerical);
      if      (n <= 1.75) donutCounts.excellent++;
      else if (n <= 2.75) donutCounts.good++;
      else if (n <= 3.00) donutCounts.passing++;
      else if (n <= 3.50) donutCounts.conditional++;
      else                donutCounts.failed++;
    });

    donutChart = new Chart(donutCtx, {
      type: 'doughnut',
      data: {
        labels: ['Excellent (1.00–1.75)', 'Good/Average (2.00–2.75)', 'Passing (3.00)', 'Conditional (3.25–3.50)', 'Failed (3.75+)'],
        datasets: [{
          data: [donutCounts.excellent, donutCounts.good, donutCounts.passing, donutCounts.conditional, donutCounts.failed],
          backgroundColor: [
            CHART_COLORS.green,
            CHART_COLORS.blue,
            CHART_COLORS.teal,
            CHART_COLORS.amber,
            CHART_COLORS.rose,
          ],
          borderWidth: 0,
          hoverOffset: 6,
        }],
      },
      options: {
        responsive: true,
        cutout: '64%',
        plugins: {
          legend: {
            position: 'right',
            labels: { font: { family: 'IBM Plex Sans', size: 12 }, padding: 14 },
          },
          tooltip: {
            callbacks: {
              label: ctx => ' ' + ctx.label + ': ' + ctx.raw + ' students',
            },
          },
        },
      },
    });
  }

  // Radar — competency averages
  const radarCtx = document.getElementById('radarChart');
  if (radarCtx) {
    radarChart = new Chart(radarCtx, {
      type: 'radar',
      data: {
        labels: ['Hardware', 'Networking', 'Software', 'Security', 'System', 'Display'],
        datasets: [{
          label: 'Class Average',
          data: [88, 76, 91, 85, 82, 79],
          backgroundColor: 'rgba(37, 99, 235, 0.12)',
          borderColor: CHART_COLORS.blue,
          pointBackgroundColor: CHART_COLORS.blue,
          borderWidth: 2,
          pointRadius: 4,
        }],
      },
      options: {
        responsive: true,
        scales: {
          r: {
            beginAtZero: true,
            max: 100,
            ticks: { stepSize: 20, font: { size: 10 } },
          },
        },
        plugins: {
          legend: { labels: { font: { family: 'IBM Plex Sans', size: 12 } } },
        },
      },
    });
  }
}


/* ═══════════════════════════════════════
   GRADEBOOK CHARTS & TABLE
═══════════════════════════════════════ */

let scoreChart    = null;
let scatterChart  = null;
let gradeBarChart = null;
let sortAscending = false;

function initGradebookCharts() {
  if (scoreChart) return; // already initialised

  const names      = STUDENTS.map(s => s.name);
  const scores     = STUDENTS.map(s => s.score);
  const barColors  = STUDENTS.map(s => gradeColors(s.numerical).bar);

  // Bar — individual scores
  const scoreCtx = document.getElementById('scoreChart');
  if (scoreCtx) {
    scoreChart = new Chart(scoreCtx, {
      type: 'bar',
      data: {
        labels: names,
        datasets: [{
          label: 'Score (%)',
          data: scores,
          backgroundColor: barColors,
          borderRadius: 5,
          borderSkipped: false,
        }],
      },
      options: {
        responsive: true,
        plugins: {
          legend: { display: false },
          tooltip: { callbacks: { label: ctx => 'Score: ' + ctx.raw + '%' } },
        },
        scales: {
          y: { beginAtZero: true, max: 100, grid: { color: 'rgba(0,0,0,0.04)' }, ticks: { stepSize: 20 } },
          x: { grid: { display: false } },
        },
      },
    });
  }

  // Scatter — score distribution
  const scatterCtx = document.getElementById('scatterChart');
  if (scatterCtx) {
    scatterChart = new Chart(scatterCtx, {
      type: 'scatter',
      data: {
        datasets: [{
          label: 'Students',
          data: STUDENTS.map((s, i) => ({ x: i + 1, y: s.score })),
          backgroundColor: barColors,
          pointRadius: 8,
          pointHoverRadius: 11,
        }],
      },
      options: {
        responsive: true,
        plugins: {
          legend: { display: false },
          tooltip: {
            callbacks: {
              label: ctx => STUDENTS[ctx.parsed.x - 1].name + ': ' + ctx.parsed.y + '%',
            },
          },
        },
        scales: {
          x: { min: 0, max: 16, display: false },
          y: { min: 50, max: 100, ticks: { stepSize: 10 }, grid: { color: 'rgba(0,0,0,0.04)' } },
        },
      },
    });
  }

  // Bar — grade count breakdown by USTP descriptor
  const gradeBarCtx = document.getElementById('gradeBarChart');
  if (gradeBarCtx) {
    const counts = { excellent: 0, good: 0, passing: 0, conditional: 0, failed: 0 };
    STUDENTS.forEach(s => {
      const n = parseFloat(s.numerical);
      if      (n <= 1.75) counts.excellent++;
      else if (n <= 2.75) counts.good++;
      else if (n <= 3.00) counts.passing++;
      else if (n <= 3.50) counts.conditional++;
      else                counts.failed++;
    });

    gradeBarChart = new Chart(gradeBarCtx, {
      type: 'bar',
      data: {
        labels: ['Excellent\n(1.00–1.75)', 'Good/Avg\n(2.00–2.75)', 'Passing\n(3.00)', 'Conditional\n(3.25–3.50)', 'Failed\n(3.75+)'],
        datasets: [{
          label: 'Students',
          data: [counts.excellent, counts.good, counts.passing, counts.conditional, counts.failed],
          backgroundColor: [CHART_COLORS.green, CHART_COLORS.blue, CHART_COLORS.teal, CHART_COLORS.amber, CHART_COLORS.rose],
          borderRadius: 6,
          borderSkipped: false,
        }],
      },
      options: {
        responsive: true,
        plugins: {
          legend: { display: false },
          tooltip: { callbacks: { label: ctx => ctx.raw + ' student' + (ctx.raw !== 1 ? 's' : '') } },
        },
        scales: {
          y: { beginAtZero: true, ticks: { stepSize: 1 }, grid: { color: 'rgba(0,0,0,0.04)' } },
          x: { grid: { display: false }, ticks: { font: { size: 10 } } },
        },
      },
    });
  }

  renderGradeTable(STUDENTS);
  // Clear both cumulative table bodies before render
  const cb = document.getElementById('cumulBody');
  const ccb = document.getElementById('cumulComponentBody');
  if (cb)  cb.innerHTML  = '';
  if (ccb) ccb.innerHTML = '';
  renderCumulativeTable();
}

/**
 * Render the main grade table.
 * @param {typeof STUDENTS} data
 */
function renderGradeTable(data) {
  const tbody = document.getElementById('gradeBody');
  if (!tbody) return;

  const ranked = [...STUDENTS].sort((a, b) => b.score - a.score);

  tbody.innerHTML = data.map(student => {
    const rank   = ranked.findIndex(r => r.id === student.id) + 1;
    const colors = gradeColors(student.numerical);
    return `
      <tr>
        <td><span style="font-family:'IBM Plex Mono',monospace;font-size:0.75rem;color:var(--text-muted)">#${rank}</span></td>
        <td><strong>${student.name}</strong></td>
        <td style="font-family:'IBM Plex Mono',monospace;font-weight:600">${student.score}%</td>
        <td><span class="grade-pill letter-pill">${student.letter}</span></td>
        <td><span class="grade-pill ${colors.cssClass}">${student.numerical}</span></td>
        <td><span class="descriptor-badge descriptor-${colors.cssClass}">${student.descriptor}</span></td>
        <td>
          <div class="score-mini">
            <div class="score-mini-track">
              <div class="score-mini-fill" style="width:${student.score}%;background:${colors.bar}"></div>
            </div>
            <span class="score-mini-val">${student.score}%</span>
          </div>
        </td>
        <td style="color:var(--text-muted);font-size:0.81rem">${student.desc}</td>
      </tr>`;
  }).join('');
}

function filterTable(query) {
  const filtered = STUDENTS.filter(s =>
    s.name.toLowerCase().includes(query.toLowerCase())
  );
  renderGradeTable(filtered);
}

function sortTable() {
  sortAscending = !sortAscending;
  const sorted = [...STUDENTS].sort((a, b) =>
    sortAscending ? a.score - b.score : b.score - a.score
  );
  renderGradeTable(sorted);
}

/**
 * Render the cumulative vs. averaging comparison table.
 */
function pctToNum(pct) {
  const v = parseFloat(pct);
  if(v>=97)return'1.00';if(v>=94)return'1.25';if(v>=91)return'1.50';
  if(v>=88)return'1.75';if(v>=85)return'2.00';if(v>=82)return'2.25';
  if(v>=79)return'2.50';if(v>=76)return'2.75';if(v>=75)return'3.00';
  if(v>=72)return'3.25';if(v>=69)return'3.50';if(v>=66)return'3.75';
  if(v>=65)return'4.00';return'5.00';
}

function renderCumulativeTable() {
  const compareBody   = document.getElementById('cumulBody');
  const componentBody = document.getElementById('cumulComponentBody');

  STUDENTS.forEach(student => {
    const components = COMPONENTS[student.name];
    const cumulRaw = cumulativeGrade(components);
    const avgRaw   = components.reduce((a, b) => a + b, 0) / components.length;

    // Fix: use proper number rounding before toFixed
    const cumulPct = parseFloat(cumulRaw.toFixed(1));
    const avgPct   = parseFloat(avgRaw.toFixed(1));
    const diff     = parseFloat((cumulPct - avgPct).toFixed(1));

    const diffColor = diff > 0 ? 'var(--green)' : diff < 0 ? 'var(--rose)' : 'var(--text-muted)';
    const diffStr   = diff > 0 ? '+' + diff.toFixed(1) : diff.toFixed(1);

    const cumulNum    = pctToNum(cumulPct);
    const avgNum      = pctToNum(avgPct);
    const cumulLetter = toLetter(Math.round(cumulPct));
    const avgLetter   = toLetter(Math.round(avgPct));
    const cumulColors = gradeColors(cumulNum);
    const avgColors   = gradeColors(avgNum);
    const colors      = gradeColors(student.numerical);

    // Table 1 — Component scores
    if (componentBody) {
      componentBody.innerHTML += `
        <tr>
          <td><strong>${student.name}</strong></td>
          <td class="mono-cell">${components[0]}</td>
          <td class="mono-cell">${components[1]}</td>
          <td class="mono-cell">${components[2]}</td>
          <td class="mono-cell">${components[3]}</td>
        </tr>`;
    }

    // Table 2 — Grade comparison
    if (compareBody) {
      compareBody.innerHTML += `
        <tr>
          <td><strong>${student.name}</strong></td>
          <td class="mono-cell">${cumulPct.toFixed(1)}%</td>
          <td><span class="grade-pill letter-pill">${cumulLetter}</span></td>
          <td><span class="grade-pill ${cumulColors.cssClass}">${cumulNum}</span></td>
          <td class="mono-cell">${avgPct.toFixed(1)}%</td>
          <td><span class="grade-pill letter-pill">${avgLetter}</span></td>
          <td><span class="grade-pill ${avgColors.cssClass}">${avgNum}</span></td>
          <td class="diff-cell" style="color:${diffColor}">${diffStr}</td>
        </tr>`;
    }
  });
}


/* ═══════════════════════════════════════
   STUDENT CARDS
═══════════════════════════════════════ */

let activeGradeFilter = 'all';

function renderStudentCards(data) {
  const grid = document.getElementById('studentGrid');
  if (!grid) return;

  const source   = data || STUDENTS;
  const filtered = activeGradeFilter === 'all'
    ? source
    : source.filter(s => {
        const n = parseFloat(s.numerical);
        if(activeGradeFilter === 'excellent')    return n <= 1.75;
        if(activeGradeFilter === 'good')         return n >= 2.00 && n <= 2.75;
        if(activeGradeFilter === 'passing')      return n >= 3.00 && n <= 3.00;
        if(activeGradeFilter === 'conditional')  return n >= 3.25 && n <= 3.50;
        if(activeGradeFilter === 'failed')       return n >= 3.75;
        return true;
      });

  const sorted = [...filtered].sort((a, b) => b.score - a.score);

  grid.innerHTML = sorted.map((student, index) => {
    const colors = gradeColors(student.numerical);
    return `
      <div class="student-card" onclick="openStudentPortfolio('${student.name}')" tabindex="0" role="button" aria-label="View ${student.name}'s portfolio">
        <div class="student-card-accent" style="background:${colors.bar}"></div>
        <div class="sc-initial" style="background:${colors.bar}">${student.name[0]}</div>
        <p class="sc-name">${student.name}</p>
        <p class="sc-score" style="color:${colors.text}">${student.score}<span>%</span></p>
        <div class="sc-grade-row">
          <span class="sc-grade ${colors.cssClass}">${student.numerical}</span>
          <span class="sc-letter">${student.letter}</span>
        </div>
        <span class="sc-descriptor-label" style="color:${colors.text}">${student.descriptor}</span>
        <p class="sc-desc">${student.desc}</p>
        <div class="sc-bar-track">
          <div class="sc-bar-fill" style="width:${student.score}%;background:${colors.bar}"></div>
        </div>
        <p class="sc-rank">Rank ${index + 1} of ${sorted.length}</p>
        <div class="sc-view-btn">View Portfolio</div>
      </div>`;
  }).join('');
}

function filterStudents(query) {
  const filtered = STUDENTS.filter(s =>
    s.name.toLowerCase().includes(query.toLowerCase())
  );
  renderStudentCards(filtered);
}

function filterGrade(grade, btn) {
  activeGradeFilter = grade;
  document.querySelectorAll('.fpill').forEach(p => p.classList.remove('active'));
  btn.classList.add('active');
  renderStudentCards();
}


/* ═══════════════════════════════════════
   POPULATE DROPDOWNS
═══════════════════════════════════════ */

function populateDropdowns() {
  const selectIds = ['studentSelect', 'reportStudent', 'narrativeStudent'];

  selectIds.forEach(id => {
    const el = document.getElementById(id);
    if (!el) return;

    // Avoid duplicates on re-init
    if (el.options.length > 1) return;

    STUDENTS.forEach(student => {
      const option = document.createElement('option');
      option.value = student.name;
      option.textContent = student.name + ' — ' + student.score + '%';
      el.appendChild(option);
    });
  });
}


/* ═══════════════════════════════════════
   PARENT TOOLKIT — MESSAGE COMPOSER
═══════════════════════════════════════ */

/**
 * Insert a message template into the composer.
 * @param {'progress'|'concern'|'praise'|'conference'} type
 */
function useTemplate(type) {
  const studentName = document.getElementById('studentSelect').value || '[Student Name]';

  const templates = {
    progress: `Good day. I am writing to provide a progress update for ${studentName} in BTLEd ICT (EDU 222).\n\n${studentName} has shown consistent effort and engagement this grading period. Their current performance demonstrates growth in hardware troubleshooting and network configuration skills.\n\nWe encourage continued practice at home to reinforce the competencies developed in class.`,
    concern:  `Good day. I would like to bring to your attention an area that requires focus for ${studentName} in BTLEd ICT (EDU 222).\n\nRecent assessment results indicate that ${studentName} may benefit from additional academic support. I would like to discuss strategies we can implement both in school and at home to help improve performance before the end of the grading period.\n\nI look forward to your response at your earliest convenience.`,
    praise:   `Good day. I am pleased to share an achievement notice for ${studentName} in BTLEd ICT (EDU 222).\n\n${studentName} has demonstrated outstanding performance this grading period. Their technical problem-solving skills, initiative, and collaborative attitude have been truly commendable. Please extend my congratulations.\n\nKeep up the excellent work!`,
    conference: `Good day. I would like to invite you to a Parent-Teacher Conference to discuss ${studentName}'s progress in BTLEd ICT (EDU 222).\n\nThe conference will cover academic performance, classroom participation, identified strengths and areas for improvement, and a joint action plan for the next grading period.\n\nKindly reply to confirm your preferred schedule. Thank you.`,
  };

  const messageEl = document.getElementById('message');
  if (messageEl) {
    messageEl.value = templates[type] || '';
    updateMessagePreview();
  }
}

function updateMessagePreview() {
  const parentName = document.getElementById('parentName')?.value || 'Parent / Guardian';
  const messageText = document.getElementById('message')?.value || 'Your message will appear here as you type.';

  const prevParent = document.getElementById('prevParent');
  const prevMsg    = document.getElementById('prevMsg');

  if (prevParent) prevParent.textContent = parentName;
  if (prevMsg)    prevMsg.textContent    = messageText;
}

function sendMessage() {
  const parentName  = document.getElementById('parentName')?.value?.trim();
  const messageText = document.getElementById('message')?.value?.trim();
  const confirmation = document.getElementById('confirmation');

  if (!parentName || !messageText) {
    if (confirmation) {
      confirmation.style.color = 'var(--rose)';
      confirmation.textContent = 'Please complete both fields before sending.';
    }
    return;
  }

  if (confirmation) {
    confirmation.style.color = 'var(--green)';
    confirmation.textContent = 'Message successfully sent to ' + parentName + '.';
  }

  document.getElementById('parentName').value = '';
  document.getElementById('message').value = '';
  document.getElementById('studentSelect').value = '';
  updateMessagePreview();

  setTimeout(() => {
    if (confirmation) confirmation.textContent = '';
  }, 4000);
}


/* ═══════════════════════════════════════
   PARENT TOOLKIT — REPORT CARD
═══════════════════════════════════════ */

let reportFormat = 'txt';

function setFormat(format, btn) {
  reportFormat = format;
  document.querySelectorAll('#toolkit .pill-group .pill').forEach(p => p.classList.remove('pill-active'));
  btn.classList.add('pill-active');
}

function downloadReport() {
  const selected = document.getElementById('reportStudent')?.value;
  const data     = selected === 'all'
    ? STUDENTS
    : STUDENTS.filter(s => s.name === selected);

  if (reportFormat === 'csv') {
    const rows = ['Student,Raw Score,Letter Grade,Percentage,Descriptor'];
    data.forEach(s => rows.push(`${s.name},${s.score},${s.numerical},${s.score}%,"${s.desc}"`));
    triggerDownload(new Blob([rows.join('\n')], { type: 'text/csv' }), 'ReportCard.csv');
  } else {
    const lines = [
      'BTLEd ICT — EDU 222',
      'OFFICIAL REPORT CARD',
      '='.repeat(44),
      '',
    ];
    data.forEach(s => {
      lines.push('Student     : ' + s.name);
      lines.push('Score       : ' + s.score + '%');
      lines.push('Letter Grade: ' + s.letter);
      lines.push('Remarks     : ' + s.desc);
      lines.push('-'.repeat(44));
    });
    lines.push('');
    lines.push('Generated   : ' + new Date().toLocaleDateString('en-PH', { year: 'numeric', month: 'long', day: 'numeric' }));
    lines.push('Prepared by : Teacher Axel jess C. Awitin· BTLEd ICT Instructor');
    triggerDownload(new Blob([lines.join('\n')], { type: 'text/plain' }), 'ReportCard.txt');
  }
}


/* ═══════════════════════════════════════
   NARRATIVE REPORT
═══════════════════════════════════════ */

let narrativeTone = 'formal';

function setNarrativeTone(tone, btn) {
  narrativeTone = tone;
  btn.closest('.pill-group')
     .querySelectorAll('.pill')
     .forEach(p => p.classList.remove('pill-active'));
  btn.classList.add('pill-active');
}

function generateNarrative() {
  const studentName = document.getElementById('narrativeStudent')?.value;
  const period      = document.getElementById('narrativePeriod')?.value || '2nd Grading Period';
  const bodyEl      = document.getElementById('narrativeBody');
  const periodEl    = document.getElementById('narrativePeriodDisplay');

  if (!studentName) {
    if (bodyEl) {
      bodyEl.className = 'narrative-body-placeholder';
      bodyEl.textContent = 'Please select a student first.';
    }
    return;
  }

  const student    = STUDENTS.find(s => s.name === studentName);
  const components = COMPONENTS[studentName];
  const cumul      = cumulativeGrade(components).toFixed(1);
  const [q, a, e, p] = components;

  if (periodEl) periodEl.textContent = period + ' · A.Y. 2025–2026';

  const isHigh = student.score >= 90;
  const isMid  = student.score >= 75 && student.score < 90;

  const reports = {
    formal: {
      high: `${student.name} has demonstrated commendable academic performance during the ${period}, obtaining a cumulative grade of ${cumul}% with a final rating of ${student.numerical}. ${student.name} consistently exhibits ${student.desc.toLowerCase()} and has shown mastery across multiple ICT competency areas, including hardware troubleshooting, software installation, and system recovery. It is recommended that ${student.name} be given extension opportunities to further develop advanced technical skills in the next grading period.`,
      mid:  `${student.name} has demonstrated satisfactory performance during the ${period} with a cumulative grade of ${cumul}% and a final rating of ${student.numerical}. The student has shown ${student.desc.toLowerCase()}, particularly during practical laboratory activities. Quiz performance (${q}%) and long examination results (${e}%) indicate areas with room for improvement. The class teacher recommends establishing a consistent study routine and seeking clarification after class when needed.`,
      low:  `${student.name} obtained a cumulative grade of ${cumul}% with a final rating of ${student.numerical} during the ${period}. While the student has demonstrated effort in class participation (${p}%), performance in quizzes (${q}%) and the long examination (${e}%) indicates the need for academic intervention. A structured remediation programme including peer mentoring, scaffolded laboratory tasks, and additional formative assessments has been recommended to support improvement in the next grading period.`,
    },
    warm: {
      high: `What a wonderful grading period for ${student.name}! With a cumulative grade of ${cumul}% and a rating of ${student.numerical}, ${student.name} has truly shone in our ICT class. Their ${student.desc.toLowerCase()} is something to celebrate — it inspires their classmates and brings positive energy to every lesson. We look forward to seeing ${student.name} take on even greater challenges in the semester ahead.`,
      mid:  `${student.name} has had a solid grading period, earning a cumulative grade of ${cumul}% and a rating of ${student.numerical}. There are real strengths to acknowledge — especially in class activities (${a}%) and participation (${p}%). With a bit more focus on quiz preparation and consistent effort, we are confident ${student.name} will achieve even more. Please do not hesitate to reach out whenever support is needed.`,
      low:  `We appreciate ${student.name}'s presence and effort in class this grading period. The current cumulative grade of ${cumul}% (${student.numerical}) tells us there is significant room to grow together. ${student.name} shows genuine potential, especially in participation (${p}%), and with the right support and consistency, meaningful progress is very achievable in the next semester. Let us work together as a team.`,
    },
    concern: {
      high: `${student.name} has performed exceptionally well this ${period}, achieving ${cumul}% (${student.numerical}). There are no areas of academic concern at this time. However, please ensure ${student.name} maintains a healthy balance between academic achievement and personal well-being, as high-achieving students can sometimes place undue pressure on themselves.`,
      mid:  `${student.name} has reached a cumulative grade of ${cumul}% (${student.numerical}) for the ${period}. While overall performance is passing, attention is drawn to the quiz component (${q}%) and long examination result (${e}%), which fall below the desired level. We recommend establishing a structured home study routine and encouraging the student to seek teacher guidance proactively. Early action at this stage can prevent a more significant decline.`,
      low:  `We are writing to inform you that ${student.name} is currently at academic risk, having received a cumulative grade of ${cumul}% (${student.numerical}) this ${period}. Critical components including quizzes (${q}%) and the long examination (${e}%) require immediate attention. We strongly encourage an urgent Parent-Teacher Conference to develop a joint intervention plan. The school is committed to providing all necessary support — your active partnership is essential to ${student.name}'s success.`,
    },
  };

  const tier = isHigh ? 'high' : isMid ? 'mid' : 'low';
  const text = reports[narrativeTone]?.[tier] ?? '';

  if (bodyEl) {
    bodyEl.className = '';
    bodyEl.style.cssText = 'line-height:1.85;font-size:0.85rem;color:var(--text)';
    bodyEl.innerHTML = '<p>' + text + '</p>';
  }
}

function downloadNarrative() {
  const studentName = document.getElementById('narrativeStudent')?.value;
  const period      = document.getElementById('narrativePeriod')?.value || '';
  const bodyEl      = document.getElementById('narrativeBody');

  if (!studentName || !bodyEl) return;

  const bodyText = bodyEl.innerText || bodyEl.textContent || '';
  const content  = [
    'NARRATIVE REPORT — BTLEd ICT (EDU 222)',
    period + ' · A.Y. 2025–2026',
    'Student: ' + studentName,
    '='.repeat(50),
    '',
    bodyText,
    '',
    '='.repeat(50),
    'Prepared by: Teacher Axel jess C. Awitin · BTLEd ICT Instructor',
    'Date: ' + new Date().toLocaleDateString('en-PH', { year: 'numeric', month: 'long', day: 'numeric' }),
  ].join('\n');

  triggerDownload(
    new Blob([content], { type: 'text/plain' }),
    'NarrativeReport_' + studentName + '.txt'
  );
}


/* ═══════════════════════════════════════
   REFLECTION LOG
═══════════════════════════════════════ */

const reflections = [];

function saveReflection() {
  const titleEl = document.getElementById('refTitle');
  const entryEl = document.getElementById('refEntry');

  const title = titleEl?.value?.trim();
  const entry = entryEl?.value?.trim();

  if (!title || !entry) return;

  reflections.unshift({
    title,
    entry,
    date: new Date().toLocaleDateString('en-PH', { year: 'numeric', month: 'long', day: 'numeric' }),
  });

  if (titleEl) titleEl.value = '';
  if (entryEl) entryEl.value = '';

  renderReflectionLog();
}

function renderReflectionLog() {
  const log = document.getElementById('refLog');
  if (!log) return;

  log.innerHTML = reflections.map(r => `
    <div class="ref-log-entry">
      <strong>
        ${r.title}
        <span style="font-weight:400;color:var(--text-muted);font-family:'IBM Plex Mono',monospace;font-size:0.72rem">${r.date}</span>
      </strong>
      <p>${r.entry}</p>
    </div>`
  ).join('');
}



/* ═══════════════════════════════════════
   STUDENT PORTFOLIO MODAL
═══════════════════════════════════════ */

/**
 * Open individual student portfolio modal.
 * @param {string} name
 */
function openStudentPortfolio(name) {
  const student  = STUDENTS.find(s => s.name === name);
  const evidence = EVIDENCE[name];
  const comp     = COMPONENTS[name];
  const colors   = gradeColors(student.numerical);

  if (!student || !evidence) return;

  const avgQuiz = (evidence.quizzes.reduce((a,b)=>a+b,0)/evidence.quizzes.length).toFixed(1);

  const modal = document.getElementById('studentPortfolioModal');
  const body  = document.getElementById('studentPortfolioBody');

  body.innerHTML = `
    <!-- Header -->
    <div class="sp-header" style="background:${colors.bar}">
      <div class="sp-initial">${student.name[0]}</div>
      <div class="sp-header-info">
        <h2>${student.name}</h2>
        <p>BTLEd ICT · EDU 222 · A.Y. 2025–2026</p>
      </div>
    </div>

    <!-- Grade Summary -->
    <div class="sp-grade-row">
      <div class="sp-grade-item">
        <div class="sp-grade-num" style="color:${colors.text}">${student.score}%</div>
        <div class="sp-grade-lbl">Final Score</div>
      </div>
      <div class="sp-grade-item">
        <div class="sp-grade-num"><span class="grade-pill ${colors.cssClass}">${student.letter}</span></div>
        <div class="sp-grade-lbl">Letter Grade</div>
      </div>
      <div class="sp-grade-item">
        <div class="sp-grade-num"><span class="grade-pill ${colors.cssClass}">${student.numerical}</span></div>
        <div class="sp-grade-lbl">Numerical Grade</div>
      </div>
      <div class="sp-grade-item">
        <div class="sp-grade-num" style="color:${colors.text}">${student.descriptor}</div>
        <div class="sp-grade-lbl">Descriptor</div>
      </div>
    </div>

    <!-- Evidence Section -->
    <div class="sp-section-title">Portfolio Evidence</div>

    <div class="sp-evidence-grid">

      <!-- Quizzes -->
      <div class="sp-evidence-card">
        <div class="sp-ev-label">Quizzes (25%)</div>
        <div class="sp-quiz-scores">
          ${evidence.quizzes.map((q,i)=>`<div class="sp-quiz-item"><span>Quiz ${i+1}</span><strong>${q}%</strong></div>`).join('')}
        </div>
        <div class="sp-ev-avg">Average: <strong>${avgQuiz}%</strong></div>
      </div>

      <!-- Assignment -->
      <div class="sp-evidence-card">
        <div class="sp-ev-label">Assignment / Output (35%)</div>
        <div class="sp-ev-title">${evidence.assignment}</div>
        <div class="sp-ev-score-row">
          <div class="sp-ev-score-bar">
            <div style="width:${evidence.assignScore}%;background:${colors.bar};height:100%;border-radius:20px;transition:width 1s ease"></div>
          </div>
          <strong style="color:${colors.text}">${evidence.assignScore}%</strong>
        </div>
      </div>

      <!-- Performance Task -->
      <div class="sp-evidence-card">
        <div class="sp-ev-label">Performance Task (25%)</div>
        <div class="sp-ev-title">${evidence.perfTask}</div>
        <div class="sp-ev-score-row">
          <div class="sp-ev-score-bar">
            <div style="width:${evidence.perfScore}%;background:${colors.bar};height:100%;border-radius:20px;transition:width 1s ease"></div>
          </div>
          <strong style="color:${colors.text}">${evidence.perfScore}%</strong>
        </div>
      </div>

      <!-- Participation -->
      <div class="sp-evidence-card">
        <div class="sp-ev-label">Participation (15%)</div>
        <div class="sp-ev-title">Classroom Engagement & Lab Attendance</div>
        <div class="sp-ev-score-row">
          <div class="sp-ev-score-bar">
            <div style="width:${comp[3]}%;background:${colors.bar};height:100%;border-radius:20px;transition:width 1s ease"></div>
          </div>
          <strong style="color:${colors.text}">${comp[3]}%</strong>
        </div>
      </div>

    </div>

    <!-- Teacher Remarks -->
    <div class="sp-section-title">Teacher's Remarks</div>
    <div class="sp-remarks">${evidence.remarks}</div>

    <!-- Component Summary -->
    <div class="sp-section-title">Component Score Summary</div>
    <div class="sp-comp-grid">
      <div class="sp-comp-item">
        <div class="sp-comp-score">${comp[0]}</div>
        <div class="sp-comp-lbl">Quiz</div>
      </div>
      <div class="sp-comp-item">
        <div class="sp-comp-score">${comp[1]}</div>
        <div class="sp-comp-lbl">Activity</div>
      </div>
      <div class="sp-comp-item">
        <div class="sp-comp-score">${comp[2]}</div>
        <div class="sp-comp-lbl">Long Exam</div>
      </div>
      <div class="sp-comp-item">
        <div class="sp-comp-score">${comp[3]}</div>
        <div class="sp-comp-lbl">Participation</div>
      </div>
    </div>

    <p style="font-size:0.72rem;color:var(--text-muted);margin-top:16px;font-style:italic;text-align:center">
      This portfolio entry is part of the Class Showcase Portfolio — BTLEd ICT, EDU 222.
    </p>
  `;

  modal.classList.add('open');
  document.body.style.overflow = 'hidden';
}

/* ═══════════════════════════════════════
   MODALS
═══════════════════════════════════════ */

function openModal(id) {
  const modal = document.getElementById(id);
  if (modal) {
    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
}

function closeModal(id) {
  const modal = document.getElementById(id);
  if (modal) {
    modal.classList.remove('open');
    document.body.style.overflow = '';
  }
}

// Close modal on Escape key
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    // Close modals
    document.querySelectorAll('.modal-overlay.open').forEach(m => m.classList.remove('open'));
    // Close sidebar on mobile
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('sidebarOverlay');
    if (sidebar) sidebar.classList.remove('open');
    if (overlay) overlay.classList.remove('active');
    document.body.style.overflow = '';
  }
});

// Keyboard accessibility for portfolio cards
document.addEventListener('keydown', e => {
  if (e.key === 'Enter' && e.target.classList.contains('port-card')) {
    e.target.click();
  }
});


/* ═══════════════════════════════════════
   INIT
═══════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {
  // Set date in letter preview
  const previewDate  = document.getElementById('previewDate');
  const narrativeDate = document.getElementById('narrativeDate');
  const today = new Date().toLocaleDateString('en-PH', { year: 'numeric', month: 'long', day: 'numeric' });
  if (previewDate)   previewDate.textContent   = today;
  if (narrativeDate) narrativeDate.textContent = today;

  // Initialise UI
  populateDropdowns();
  animateCounters();
  animateProgressBars();
  initDashboardCharts();
  renderStudentCards();

  // Live message preview listeners
  const parentNameEl = document.getElementById('parentName');
  const messageEl    = document.getElementById('message');
  if (parentNameEl) parentNameEl.addEventListener('input', updateMessagePreview);
  if (messageEl)    messageEl.addEventListener('input', updateMessagePreview);
});
