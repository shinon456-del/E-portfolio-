/* ─────────────────────────────────────────
   Interactive Assessment & Feedback Hub
   script.js — Enhanced Version
   ───────────────────────────────────────── */

// ─── Student Data ───────────────────────────────────────
const STUDENTS = [
  { id:1,  name:'Ana',   score:88, letter:'B+', desc:'Strong problem-solving', avatar:1  },
  { id:2,  name:'Ben',   score:95, letter:'A',  desc:'Excellent collaboration', avatar:2  },
  { id:3,  name:'Cara',  score:72, letter:'C',  desc:'Needs improvement', avatar:3  },
  { id:4,  name:'David', score:85, letter:'B',  desc:'Consistent effort', avatar:4  },
  { id:5,  name:'Ella',  score:90, letter:'A-', desc:'Creative solutions', avatar:5  },
  { id:6,  name:'Felix', score:67, letter:'D+', desc:'Needs support', avatar:6  },
  { id:7,  name:'Grace', score:80, letter:'B-', desc:'Good participation', avatar:7  },
  { id:8,  name:'Hugo',  score:76, letter:'C+', desc:'Needs reflection', avatar:8  },
  { id:9,  name:'Iris',  score:92, letter:'A',  desc:'Excellent technical skills', avatar:9  },
  { id:10, name:'Jack',  score:70, letter:'C',  desc:'Needs troubleshooting practice', avatar:10 },
  { id:11, name:'Kim',   score:83, letter:'B',  desc:'Good collaboration', avatar:11 },
  { id:12, name:'Liam',  score:78, letter:'C+', desc:'Average performance', avatar:12 },
  { id:13, name:'Mia',   score:96, letter:'A',  desc:'Outstanding initiative', avatar:13 },
  { id:14, name:'Noah',  score:74, letter:'C',  desc:'Needs consistency', avatar:14 },
  { id:15, name:'Zoe',   score:89, letter:'B+', desc:'Strong analytical thinking', avatar:15 },
];

// ─── Color helpers ──────────────────────────────────────
function gradeColor(letter){
  if(letter.startsWith('A')) return {text:'#14a054',bg:'rgba(67,233,123,0.12)',bar:'#43e97b',grad:'linear-gradient(90deg,#43e97b,#06d6a0)'};
  if(letter.startsWith('B')) return {text:'#2a7ccf',bg:'rgba(79,172,254,0.12)',bar:'#4facfe',grad:'linear-gradient(90deg,#4facfe,#00c9ff)'};
  if(letter.startsWith('C')) return {text:'#c07800',bg:'rgba(255,209,102,0.18)',bar:'#ffd166',grad:'linear-gradient(90deg,#ffd166,#ffb703)'};
  return {text:'#d43355',bg:'rgba(245,87,108,0.12)',bar:'#f5576c',grad:'linear-gradient(90deg,#f5576c,#fc466b)'};
}

// ─── Navigation ─────────────────────────────────────────
function showSection(id, el){
  document.querySelectorAll('section').forEach(s=>s.classList.remove('active'));
  document.getElementById(id).classList.add('active');
  document.querySelectorAll('.nav-link').forEach(a=>a.classList.remove('active-link'));
  if(el) el.classList.add('active-link');
  if(window.innerWidth <= 768) document.getElementById('sidebar').classList.remove('open');

  // Trigger lazy inits
  if(id === 'dashboard') initDashboardCharts();
  if(id === 'gradebook') initGradeCharts();
  if(id === 'students') renderStudentCards();
}

function toggleSidebar(){
  document.getElementById('sidebar').classList.toggle('open');
}

// ─── Theme ──────────────────────────────────────────────
let dark = false;
function toggleTheme(){
  dark = !dark;
  document.body.classList.toggle('dark', dark);
  document.getElementById('themeIcon').textContent = dark ? '☀️' : '🌙';
  document.getElementById('themeLabel').textContent = dark ? 'Light Mode' : 'Dark Mode';
}

// ─── Animated counters ──────────────────────────────────
function animateCounters(){
  document.querySelectorAll('.stat-num[data-target]').forEach(el=>{
    const target = +el.dataset.target;
    let cur = 0;
    const step = Math.max(1, Math.ceil(target / 60));
    const t = setInterval(()=>{
      cur = Math.min(cur+step, target);
      el.textContent = cur;
      if(cur >= target) clearInterval(t);
    }, 22);
  });
}

// ─── Progress bars ──────────────────────────────────────
function animateProgressBars(){
  setTimeout(()=>{
    document.querySelectorAll('.prog-bar[data-w]').forEach(bar=>{
      bar.style.width = bar.dataset.w + '%';
    });
  }, 200);
}

// ─── Dashboard Charts ───────────────────────────────────
let donutInst, radarInst;
function initDashboardCharts(){
  if(donutInst) return; // already drawn

  // Donut
  const dCtx = document.getElementById('donutChart');
  donutInst = new Chart(dCtx,{
    type:'doughnut',
    data:{
      labels:['A (90-100)','B (80-89)','C (70-79)','D (60-69)'],
      datasets:[{
        data:[4,5,5,1],
        backgroundColor:['#43e97b','#4facfe','#ffd166','#f5576c'],
        borderWidth:0,
        hoverOffset:8
      }]
    },
    options:{
      responsive:true,
      cutout:'65%',
      plugins:{
        legend:{position:'right',labels:{font:{family:'Plus Jakarta Sans',size:12},padding:16}},
        tooltip:{callbacks:{label:ctx=>' '+ctx.label+': '+ctx.raw+' students'}}
      }
    }
  });

  // Radar
  const rCtx = document.getElementById('radarChart');
  radarInst = new Chart(rCtx,{
    type:'radar',
    data:{
      labels:['Hardware','Networking','Software','Security','System','Display'],
      datasets:[{
        label:'Class Average',
        data:[88,76,91,85,82,79],
        backgroundColor:'rgba(79,172,254,0.15)',
        borderColor:'#4facfe',
        pointBackgroundColor:'#4facfe',
        borderWidth:2,
        pointRadius:4
      }]
    },
    options:{
      responsive:true,
      scales:{r:{beginAtZero:true,max:100,ticks:{stepSize:20,font:{size:10}}}},
      plugins:{legend:{labels:{font:{family:'Plus Jakarta Sans',size:12}}}}
    }
  });
}

// ─── Gradebook Charts ───────────────────────────────────
let scoreInst, scatterInst, gradeBarInst;
function initGradeCharts(){
  if(scoreInst) return;
  const names = STUDENTS.map(s=>s.name);
  const scores = STUDENTS.map(s=>s.score);
  const bgColors = STUDENTS.map(s=>gradeColor(s.letter).bar);

  // Bar
  const bCtx = document.getElementById('scoreChart');
  scoreInst = new Chart(bCtx,{
    type:'bar',
    data:{
      labels:names,
      datasets:[{
        label:'Score (%)',
        data:scores,
        backgroundColor:bgColors,
        borderRadius:6,
        borderSkipped:false
      }]
    },
    options:{
      responsive:true,
      plugins:{legend:{display:false},tooltip:{callbacks:{label:ctx=>'Score: '+ctx.raw+'%'}}},
      scales:{y:{beginAtZero:true,max:100,grid:{color:'rgba(0,0,0,0.05)'},ticks:{stepSize:20}},x:{grid:{display:false}}}
    }
  });

  // Scatter
  const sCtx = document.getElementById('scatterChart');
  scatterInst = new Chart(sCtx,{
    type:'scatter',
    data:{
      datasets:[{
        label:'Students',
        data:STUDENTS.map((s,i)=>({x:i+1,y:s.score})),
        backgroundColor:bgColors,
        pointRadius:8,
        pointHoverRadius:11
      }]
    },
    options:{
      responsive:true,
      plugins:{
        legend:{display:false},
        tooltip:{callbacks:{label:ctx=>{const s=STUDENTS[ctx.parsed.x-1];return s.name+': '+s.score+'%'}}}
      },
      scales:{
        x:{min:0,max:16,display:false},
        y:{min:50,max:100,ticks:{stepSize:10},grid:{color:'rgba(0,0,0,0.05)'}}
      }
    }
  });

  // Grade bar breakdown
  const gbCtx = document.getElementById('gradeBarChart');
  const gradeCount = {A:0,B:0,C:0,D:0};
  STUDENTS.forEach(s=>{
    const k = s.letter[0];
    gradeCount[k] = (gradeCount[k]||0)+1;
  });
  gradeBarInst = new Chart(gbCtx,{
    type:'bar',
    data:{
      labels:['A Grade','B Grade','C Grade','D Grade'],
      datasets:[{
        label:'Students',
        data:[gradeCount.A,gradeCount.B,gradeCount.C,gradeCount.D],
        backgroundColor:['#43e97b','#4facfe','#ffd166','#f5576c'],
        borderRadius:8,borderSkipped:false
      }]
    },
    options:{
      responsive:true,
      plugins:{legend:{display:false}},
      scales:{y:{beginAtZero:true,ticks:{stepSize:1}},x:{grid:{display:false}}}
    }
  });

  // Grade table
  renderGradeTable(STUDENTS);
}

// ─── Grade Table ────────────────────────────────────────
let sortAsc = true;
function renderGradeTable(data){
  const tbody = document.getElementById('gradeBody');
  if(!tbody) return;
  const sorted = [...STUDENTS].sort((a,b)=>b.score-a.score);
  tbody.innerHTML = data.map(s=>{
    const rank = sorted.findIndex(r=>r.id===s.id)+1;
    const c = gradeColor(s.letter);
    const pct = s.score;
    return `<tr>
      <td><span style="color:var(--text-muted);font-size:0.8rem">#${rank}</span></td>
      <td><strong>${s.name}</strong></td>
      <td>${s.score}</td>
      <td><span class="grade-pill g-${s.letter[0]}">${s.letter}</span></td>
      <td>
        <div style="display:flex;align-items:center;gap:8px">
          <div class="score-bar-mini"><div class="score-bar-fill" style="width:${pct}%;background:${c.bar}"></div></div>
          <span style="font-size:0.82rem;color:var(--text-muted)">${pct}%</span>
        </div>
      </td>
      <td style="color:var(--text-muted);font-size:0.82rem">${s.desc}</td>
    </tr>`;
  }).join('');
}

function filterTable(q){
  const filtered = STUDENTS.filter(s=>s.name.toLowerCase().includes(q.toLowerCase()));
  renderGradeTable(filtered);
}

function sortTable(){
  sortAsc = !sortAsc;
  const sorted = [...STUDENTS].sort((a,b)=>sortAsc ? a.score-b.score : b.score-a.score);
  renderGradeTable(sorted);
}

// ─── Student Cards ──────────────────────────────────────
let activeGradeFilter = 'all';
function renderStudentCards(data){
  const grid = document.getElementById('studentGrid');
  if(!grid) return;
  const list = data || STUDENTS;
  const filtered = activeGradeFilter === 'all' ? list : list.filter(s=>s.letter.startsWith(activeGradeFilter));
  const sorted = [...filtered].sort((a,b)=>b.score-a.score);

  grid.innerHTML = sorted.map((s,i)=>{
    const c = gradeColor(s.letter);
    return `<div class="student-card" style="--sc:${c.grad}">
      <div class="sc-avatar-init" style="background:${c.grad}">${s.name[0]}</div>
      <div class="sc-name">${s.name}</div>
      <div class="sc-score" style="color:${c.text}">${s.score}<span style="font-size:1rem;font-weight:600">%</span></div>
      <span class="sc-grade" style="color:${c.text};background:${c.bg}">${s.letter}</span>
      <div class="sc-desc">${s.desc}</div>
      <div class="sc-mini-bar"><div class="sc-mini-fill" style="width:${s.score}%"></div></div>
      <div class="sc-rank">Rank ${i+1} of ${sorted.length}</div>
    </div>`;
  }).join('');
}

function filterStudents(q){
  const filtered = STUDENTS.filter(s=>s.name.toLowerCase().includes(q.toLowerCase()));
  const grid = document.getElementById('studentGrid');
  renderStudentCards(filtered);
}

function filterGrade(grade, btn){
  activeGradeFilter = grade;
  document.querySelectorAll('.fpill').forEach(p=>p.classList.remove('active'));
  btn.classList.add('active');
  renderStudentCards();
}

// ─── Parent Toolkit ─────────────────────────────────────
let reportFormat = 'txt';
function setFormat(fmt, btn){
  reportFormat = fmt;
  document.querySelectorAll('.tpill').forEach(p=>p.classList.remove('active-t'));
  btn.classList.add('active-t');
}

function populateSelects(){
  ['studentSelect','reportStudent'].forEach(id=>{
    const sel = document.getElementById(id);
    if(!sel) return;
    STUDENTS.forEach(s=>{
      const opt = document.createElement('option');
      opt.value = s.name;
      opt.textContent = s.name + ' — ' + s.score + '%';
      sel.appendChild(opt);
    });
  });
}

function useTemplate(type){
  const studentName = document.getElementById('studentSelect').value || '[Student Name]';
  const templates = {
    progress:`Good day! I am writing to provide a progress update for ${studentName}. 
Based on recent assessments in our ICT class (EDU 222), ${studentName} has shown consistent effort and engagement. Their current performance demonstrates growth in hardware troubleshooting and network configuration skills.

We encourage continued practice at home through guided exercises and reflection activities.`,
    concern:`Good day! I would like to bring to your attention an area that needs focus for ${studentName}.
Recent assessment results indicate that ${studentName} may benefit from additional support in specific ICT competency areas. I would like to discuss strategies we can implement both in school and at home to help improve performance before the end of the grading period.`,
    praise:`Good day! I am pleased to share wonderful news about ${studentName}'s academic performance!
${studentName} has demonstrated outstanding achievement in our ICT class. Their initiative, technical problem-solving skills, and collaborative attitude have made a positive impact in our classroom. Please congratulate them on this achievement!`,
    conference:`Good day! I would like to invite you to a Parent-Teacher Conference to discuss ${studentName}'s progress in ICT (EDU 222).
The conference will allow us to review academic performance, discuss strengths and areas for improvement, and set goals together for the remainder of the school year.

Kindly reply to confirm your preferred schedule. Thank you!`
  };
  document.getElementById('message').value = templates[type];
  updatePreview();
}

function updatePreview(){
  const parent = document.getElementById('parentName').value || 'Parent/Guardian';
  const msg = document.getElementById('message').value || 'Your message will appear here as you type.';
  document.getElementById('prevParent').textContent = parent;
  document.getElementById('prevMsg').textContent = msg;
}

function sendMessage(){
  const parent = document.getElementById('parentName').value;
  const msg = document.getElementById('message').value;
  const conf = document.getElementById('confirmation');
  if(!parent || !msg){
    conf.style.color='#d43355';
    conf.textContent = '⚠️ Please fill in both fields.';
    return;
  }
  conf.style.color='#14a054';
  conf.textContent = `✅ Message sent to ${parent}!`;
  document.getElementById('parentName').value = '';
  document.getElementById('message').value = '';
  document.getElementById('studentSelect').value = '';
  updatePreview();
  setTimeout(()=>conf.textContent='', 4000);
}

function downloadReport(){
  const sel = document.getElementById('reportStudent').value;
  const data = sel === 'all' ? STUDENTS : STUDENTS.filter(s=>s.name===sel);

  if(reportFormat === 'csv'){
    const rows = ['Student,Raw Score,Letter Grade,Percentage,Descriptor'];
    data.forEach(s=>rows.push(`${s.name},${s.score},${s.letter},${s.score}%,"${s.desc}"`));
    const blob = new Blob([rows.join('\n')],{type:'text/csv'});
    triggerDownload(blob,'ReportCard.csv');
  } else {
    const lines = ['BTLED ICT — EDU 222','OFFICIAL REPORT CARD','='.repeat(40),''];
    data.forEach(s=>{
      lines.push(`Student  : ${s.name}`);
      lines.push(`Score    : ${s.score}%`);
      lines.push(`Grade    : ${s.letter}`);
      lines.push(`Remarks  : ${s.desc}`);
      lines.push('-'.repeat(40));
    });
    lines.push('');lines.push(`Generated: ${new Date().toLocaleDateString()}`);
    lines.push('Teacher  : Sharren | BTLEd ICT Instructor');
    const blob = new Blob([lines.join('\n')],{type:'text/plain'});
    triggerDownload(blob,'ReportCard.txt');
  }
}

function triggerDownload(blob, filename){
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = filename;
  a.click();
}

// ─── Reflection Log ─────────────────────────────────────
const reflections = [];
function saveReflection(){
  const title = document.getElementById('refTitle').value.trim();
  const entry = document.getElementById('refEntry').value.trim();
  if(!title || !entry) return;
  reflections.unshift({title,entry,date:new Date().toLocaleDateString()});
  document.getElementById('refTitle').value = '';
  document.getElementById('refEntry').value = '';
  renderReflections();
}
function renderReflections(){
  const log = document.getElementById('refLog');
  log.innerHTML = reflections.map(r=>`
    <div class="ref-entry">
      <strong>📝 ${r.title} <span style="float:right;color:var(--text-muted);font-weight:400">${r.date}</span></strong>
      <p>${r.entry}</p>
    </div>`).join('');
}

// ─── Modals ─────────────────────────────────────────────
function openModal(id){
  document.getElementById(id).classList.add('open');
  document.body.style.overflow='hidden';
}
function closeModal(id){
  document.getElementById(id).classList.remove('open');
  document.body.style.overflow='';
}
document.addEventListener('keydown',e=>{
  if(e.key==='Escape') document.querySelectorAll('.modal-overlay.open').forEach(m=>m.classList.remove('open'));
});

// ─── Init ───────────────────────────────────────────────
document.addEventListener('DOMContentLoaded',()=>{
  // Set date in letter preview
  document.getElementById('previewDate').textContent = new Date().toLocaleDateString('en-PH',{year:'numeric',month:'long',day:'numeric'});

  populateSelects();
  animateCounters();
  animateProgressBars();
  initDashboardCharts();

  // Live message preview
  ['parentName','message'].forEach(id=>{
    const el = document.getElementById(id);
    if(el) el.addEventListener('input', updatePreview);
  });
});

// ─── Cumulative Grading Data ────────────────────────────
// Component scores per student: [quiz, activity, longExam, participation]
// Weights: 25%, 35%, 25%, 15%
const COMPONENTS = {
  Ana:   [85, 90, 86, 92], Ben:   [94, 97, 93, 96], Cara:  [70, 74, 71, 73],
  David: [83, 87, 84, 86], Ella:  [89, 92, 88, 91], Felix: [65, 68, 66, 70],
  Grace: [78, 82, 79, 81], Hugo:  [74, 77, 75, 79], Iris:  [91, 94, 90, 93],
  Jack:  [68, 71, 69, 73], Kim:   [81, 85, 82, 84], Liam:  [76, 79, 77, 80],
  Mia:   [95, 97, 96, 97], Noah:  [72, 75, 73, 77], Zoe:   [87, 91, 88, 90]
};

function renderCumulTable() {
  const tbody = document.getElementById('cumulBody');
  if (!tbody) return;
  tbody.innerHTML = STUDENTS.map(s => {
    const [q, a, e, p] = COMPONENTS[s.name];
    const cumul = (q*0.25 + a*0.35 + e*0.25 + p*0.15).toFixed(1);
    const avg   = ((q + a + e + p) / 4).toFixed(1);
    const diff  = (cumul - avg).toFixed(1);
    const diffColor = diff > 0 ? '#14a054' : diff < 0 ? '#d43355' : 'var(--text-muted)';
    const c = gradeColor(s.letter);
    return `<tr>
      <td><strong>${s.name}</strong></td>
      <td>${q}</td><td>${a}</td><td>${e}</td><td>${p}</td>
      <td><strong style="color:${c.text}">${cumul}%</strong></td>
      <td>${avg}%</td>
      <td style="color:${diffColor};font-weight:700">${diff > 0 ? '+' : ''}${diff}</td>
    </tr>`;
  }).join('');
}

// ─── Narrative Report ───────────────────────────────────
let narrativeTone = 'formal';
function setNarrativeTone(tone, btn) {
  narrativeTone = tone;
  document.querySelectorAll('#narrativeStudent').forEach(()=>{});
  btn.closest('.template-pills').querySelectorAll('.tpill').forEach(b => b.classList.remove('active-t'));
  btn.classList.add('active-t');
}

function populateNarrativeSelect() {
  const sel = document.getElementById('narrativeStudent');
  if (!sel || sel.options.length > 1) return;
  STUDENTS.forEach(s => {
    const opt = document.createElement('option');
    opt.value = s.name;
    opt.textContent = s.name + ' — ' + s.score + '%';
    sel.appendChild(opt);
  });
}

function generateNarrative() {
  const selName = document.getElementById('narrativeStudent').value;
  const period  = document.getElementById('narrativePeriod').value;
  const body    = document.getElementById('narrativeBody');
  const periodDisplay = document.getElementById('narrativePeriodDisplay');
  if (!selName) { body.innerHTML = '<em style="color:var(--text-muted)">Please select a student first.</em>'; return; }

  const s = STUDENTS.find(st => st.name === selName);
  const [q, a, e, p] = COMPONENTS[s.name];
  const cumul = (q*0.25 + a*0.35 + e*0.25 + p*0.15).toFixed(1);
  periodDisplay.textContent = period + ' · A.Y. 2025–2026';

  const isHigh = s.score >= 90;
  const isMid  = s.score >= 75 && s.score < 90;
  const isLow  = s.score < 75;

  const formal = {
    high: `${s.name} has demonstrated commendable academic performance during the ${period}, obtaining a cumulative grade of ${cumul}% and a final rating of ${s.letter}. ${s.name} consistently exhibits ${s.desc.toLowerCase()} and has shown mastery across multiple ICT competency areas, including hardware troubleshooting, software installation, and system recovery. It is recommended that ${s.name} be given extension opportunities to further develop advanced technical skills.`,
    mid:  `${s.name} has demonstrated satisfactory performance during the ${period} with a cumulative grade of ${cumul}% and a final rating of ${s.letter}. The student has shown ${s.desc.toLowerCase()}, particularly in practical laboratory activities. Areas for improvement include consistency in quiz performance (${q}%) and long examination results (${e}%). The teacher recommends continued guided practice and self-directed reflection exercises to strengthen academic standing.`,
    low:  `${s.name} obtained a cumulative grade of ${cumul}% with a final rating of ${s.letter} during the ${period}. While the student has shown effort in class participation (${p}%), performance in quizzes (${q}%) and long examinations (${e}%) indicates the need for academic intervention. A structured remediation programme has been recommended, including peer mentoring, scaffolded lab tasks, and additional formative assessments to support improvement in the next grading period.`
  };

  const warm = {
    high: `What a wonderful grading period for ${s.name}! With a cumulative grade of ${cumul}% and a rating of ${s.letter}, ${s.name} has truly shone in our ICT class. Their ${s.desc.toLowerCase()} is something we celebrate — it inspires their classmates and brings positive energy to every lesson. We look forward to seeing ${s.name} take on even greater challenges in the coming semester!`,
    mid:  `${s.name} has had a solid grading period, earning a cumulative grade of ${cumul}% and a rating of ${s.letter}. There are clear strengths to celebrate — especially in class activities (${a}%) and participation (${p}%). With a little more focus on quiz preparation and consistent effort, we are confident ${s.name} will climb even higher. We encourage continued practice and open communication with the teacher whenever support is needed.`,
    low:  `We appreciate ${s.name}'s presence and effort in class. This grading period, ${s.name} received a cumulative grade of ${cumul}% (${s.letter}), and we want to work together as a team — teacher, student, and family — to help improve this. ${s.name} shows potential, especially in participation (${p}%), and with the right support and consistency, we believe meaningful progress is very achievable next semester.`
  };

  const concern = {
    high: `${s.name} has performed exceptionally well this ${period}, achieving ${cumul}% (${s.letter}). There are no areas of academic concern at this time. However, please ensure that ${s.name} maintains a healthy balance between academic excellence and personal well-being, as high-achieving students can sometimes experience unnecessary pressure.`,
    mid:  `${s.name} has reached a cumulative grade of ${cumul}% (${s.letter}) for the ${period}. While overall performance is passing, we draw your attention to the quiz component (${q}%) and long examination score (${e}%), which are below the desired level. We recommend establishing a consistent home study routine focused on ICT concepts and encouraging the student to seek clarification from the teacher after class. Early action at this stage can prevent a more significant decline.`,
    low:  `We are writing to inform you that ${s.name} is currently at risk of academic failure, having received a cumulative grade of ${cumul}% (${s.letter}) this ${period}. Critical components such as quizzes (${q}%) and the long examination (${e}%) require immediate attention. We strongly encourage an urgent parent-teacher conference to develop a joint intervention plan. The school is committed to providing the necessary support — your partnership is essential to ${s.name}'s success.`
  };

  const toneMap = { formal, warm, concern };
  const tier = isHigh ? 'high' : isMid ? 'mid' : 'low';
  body.style.fontStyle = 'normal';
  body.style.color = 'var(--text)';
  body.innerHTML = `<p style="line-height:1.85;font-size:0.87rem">${toneMap[narrativeTone][tier]}</p>`;
}

function downloadNarrative() {
  const selName = document.getElementById('narrativeStudent')?.value;
  const period  = document.getElementById('narrativePeriod')?.value || '';
  const bodyEl  = document.getElementById('narrativeBody');
  if (!selName || !bodyEl) return;
  const text = bodyEl.innerText || bodyEl.textContent;
  const content = `NARRATIVE REPORT — BTLEd ICT (EDU 222)\n${period} · A.Y. 2025-2026\nStudent: ${selName}\n${'='.repeat(50)}\n\n${text}\n\n${'='.repeat(50)}\nPrepared by: Teacher Sharren · BTLEd ICT Instructor\nDate: ${new Date().toLocaleDateString()}`;
  const blob = new Blob([content], { type: 'text/plain' });
  triggerDownload(blob, `NarrativeReport_${selName}.txt`);
}

// ─── Hook into initGradeCharts ───────────────────────────
const _origInitGrade = initGradeCharts;
initGradeCharts = function() {
  _origInitGrade();
  renderCumulTable();
};

// ─── Hook into populateSelects ──────────────────────────
const _origPopulate = populateSelects;
populateSelects = function() {
  _origPopulate();
  populateNarrativeSelect();
};
