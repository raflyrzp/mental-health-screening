import "./style.css";

// Data Gejala
const SYMPTOMS = [
  { code: "G001", text: "Tidak mampu merasakan perasaan senang" },
  { code: "G002", text: "Mudah marah, tersinggung, atau merasa frustasi" },
  {
    code: "G003",
    text: "Tidak lagi menikmati aktivitas yang sebelumnya disukai",
  },
  {
    code: "G004",
    text: "Menyalahkan diri sendiri atas segala kesalahan dan merasa tidak layak",
  },
  { code: "G005", text: "Merasa tidak ada harapan untuk masa depan" },
  { code: "G006", text: "Khawatir tentang masa depan atau hal-hal sepele" },
  { code: "G007", text: "Merasa merenung, kosong, atau putus asa" },
  { code: "G008", text: "Merasa lelah sepanjang waktu dan sulit beraktivitas" },
  {
    code: "G009",
    text: "Kesulitan fokus pada tugas atau menyelesaikan pekerjaan",
  },
  {
    code: "G010",
    text: "Kinerja menurun di tempat kerja atau di lingkungan perkuliahan",
  },
  {
    code: "G011",
    text: "Sulit memulai atau menyelesaikan tugas dan cenderung menunda-nunda",
  },
  { code: "G012", text: "Menarik diri dari lingkungan sosial" },
  {
    code: "G013",
    text: "Sering memikirkan hal-hal negatif tentang diri sendiri atau masa depan",
  },
  { code: "G014", text: "Merasa ragu-ragu dan sulit membuat pilihan" },
  {
    code: "G015",
    text: "Memiliki masalah konsentrasi dan daya ingat sehingga kesulitan mengingat hal-hal dan fokus pada tugas",
  },
  {
    code: "G016",
    text: "Melihat segala sesuatu dalam sudut pandang yang negatif",
  },
  { code: "G017", text: "Memiliki pikiran untuk mengakhiri hidup" },
  {
    code: "G018",
    text: "Menghindari interaksi dengan orang lain, lebih suka menyendiri",
  },
  { code: "G019", text: "Sulit tidur atau terlalu banyak tidur" },
  {
    code: "G020",
    text: "Merasa gelisah, tidak bisa diam, dan sering bergerak",
  },
  { code: "G021", text: "Bergerak lambat, bicara pelan, dan terlihat lesu" },
  {
    code: "G022",
    text: "Menggunakan alkohol atau narkoba untuk mengatasi masalah",
  },
  {
    code: "G023",
    text: "Merokok padahal bukan seorang perokok dan sebelumnya tidak pernah menyentuh rokok",
  },
  {
    code: "G024",
    text: "Mengambil risiko yang tidak perlu, seperti mengemudi ugal-ugalan atau melakukan tindakan impulsif",
  },
  { code: "G025", text: "Mengabaikan kebersihan diri atau penampilan" },
  { code: "G026", text: "Melakukan percobaan bunuh diri" },
  {
    code: "G027",
    text: "Merasa lelah sepanjang waktu, bahkan setelah beristirahat",
  },
  {
    code: "G028",
    text: "Sakit kepala, sakit punggung, atau nyeri otot tanpa sebab yang jelas",
  },
  {
    code: "G029",
    text: "Mengalami masalah pencernaan, seperti sembelit, diare, atau gangguan pencernaan lainnya",
  },
  {
    code: "G030",
    text: "Mengalami gangguan sistem kekebalan tubuh sehingga lebih sering sakit",
  },
  { code: "G031", text: "Sakit-sakitan tanpa ada penyebab medis yang jelas" },
];

// Diagnosa
const DIAGNOSES = {
  P001: { name: "Gangguan Mood", severity: 1 },
  P002: { name: "Depresi Ringan", severity: 2 },
  P003: { name: "Depresi Sedang", severity: 3 },
  P004: { name: "Depresi Sedang menuju Berat", severity: 4 },
  P005: { name: "Depresi Berat", severity: 5 },
};

// Aturan
const RULES = [
  {
    id: "R1",
    ifs: ["G001", "G002", "G003", "G004", "G006", "G008"],
    then: "P001",
  },
  {
    id: "R2",
    ifs: ["G005", "G007", "G009", "G010", "G012", "G014"],
    then: "P002",
  },
  {
    id: "R3",
    ifs: ["G013", "G015", "G016", "G018", "G019", "G020"],
    then: "P003",
  },
  {
    id: "R4",
    ifs: ["G011", "G021", "G022", "G023", "G024", "G025"],
    then: "P004",
  },
  {
    id: "R5",
    ifs: ["G017", "G026", "G027", "G028", "G029", "G030", "G031"],
    then: "P005",
  },
];

// Saran
const ADVICES = [
  {
    no: 1,
    text: "Terapkan pola hidup sehat dengan makan bergizi, tidur cukup, dan olahraga teratur",
  },
  {
    no: 2,
    text: "Lakukan teknik grounding untuk membantu menyadari kondisi diri dan mengurangi kecemasan",
  },
  {
    no: 3,
    text: "Terapkan teknik stop untuk menarik diri sejenak dari situasi yang menekan, dan lakukan refleksi untuk mereset pikiran",
  },
  {
    no: 4,
    text: "Tingkatkan kesadaran terhadap kondisi sekitar dan perasaan diri sendiri untuk mengidentifikasi stressor lebih awal",
  },
  {
    no: 5,
    text: "Bangun jaringan dukungan dengan berbagi cerita kepada orang terdekat, seperti keluarga atau teman yang dipercaya",
  },
  {
    no: 6,
    text: "Jika merasa tidak nyaman berbagi dengan orang lain, pertimbangkan untuk mencari bantuan dari profesional kesehatan mental yang dapat menjaga kerahasiaan dan memberikan dukungan objektif",
  },
  {
    no: 7,
    text: "Luangkan waktu untuk aktivitas yang menyenangkan dan menenangkan, seperti hobi atau meditasi, untuk meningkatkan kesejahteraan mental",
  },
];

// Pemetaan saran per diagnosis
const ADVICE_MAP = {
  P001: [1, 2, 4, 5, 7],
  P002: [1, 2, 3, 4, 5, 6, 7],
  P003: [1, 2, 3, 4, 5, 6, 7],
  P004: [1, 2, 3, 4, 5, 6, 7],
  P005: [1, 3, 5, 6, 7],
};

// State
let currentIndex = 0;
const answers = {};

const $question = document.getElementById("question");
const $counter = document.getElementById("counter");
const $btnYes = document.getElementById("btnYes");
const $btnNo = document.getElementById("btnNo");
const $progressBar = document.getElementById("progressBar");
const $quiz = document.getElementById("quiz");
const $result = document.getElementById("result");
const $diagnosisBlock = document.getElementById("diagnosisBlock");
const $adviceBlock = document.getElementById("adviceBlock");
const $warningBlock = document.getElementById("warningBlock");
const $btnRestart = document.getElementById("btnRestart");
const $safetyBanner = document.getElementById("safetyBanner");

// Render pertanyaan saat ini
function renderQuestion() {
  const total = SYMPTOMS.length;
  if (currentIndex >= total) {
    finalize();
    return;
  }
  const s = SYMPTOMS[currentIndex];
  $question.textContent = s.text;
  $counter.textContent = `Pertanyaan ${currentIndex + 1} dari ${total}`;
  const prog = Math.round((currentIndex / total) * 100);
  $progressBar.style.width = `${prog}%`;
}

// Cek dan tampilkan banner keselamatan jika perlu (G017/G026 = Ya)
function updateSafetyBanner() {
  const risky = answers["G017"] === true || answers["G026"] === true;
  $safetyBanner.classList.toggle("hidden", !risky);
}

// Proses jawaban
function answerCurrent(isYes) {
  const s = SYMPTOMS[currentIndex];
  answers[s.code] = !!isYes;
  updateSafetyBanner();
  currentIndex += 1;
  renderQuestion();
}

// Inferensi
function infer(ans) {
  const fired = [];
  for (const rule of RULES) {
    const ok = rule.ifs.every((code) => ans[code] === true);
    if (ok) fired.push(rule);
  }
  if (fired.length === 0) return { matched: false, rules: [], diagnosis: null };
  fired.sort((a, b) => DIAGNOSES[a.then].severity - DIAGNOSES[b.then].severity);
  const best = fired[fired.length - 1];
  return { matched: true, rules: fired, diagnosis: best.then };
}

// Tampilkan hasil
function finalize() {
  $progressBar.style.width = "100%";
  $quiz.classList.add("hidden");
  $result.classList.remove("hidden");

  const outcome = infer(answers);
  $diagnosisBlock.innerHTML = "";

  if (!outcome.matched) {
    $diagnosisBlock.innerHTML = `
      <div>
        <h3 class="font-semibold mb-1">Kesimpulan</h3>
        <p><span class="tag">Belum ada indikasi yang jelas</span></p>
        <p class="text-sm text-slate-300 mt-2">Berdasarkan jawaban Anda, belum terdapat pola yang cukup kuat. Jika Anda tetap merasa terganggu, pertimbangkan untuk berkonsultasi dengan tenaga profesional.</p>
      </div>
    `;
    $warningBlock.classList.add("hidden");
    renderAdviceGeneric();
    return;
  }

  const dxCode = outcome.diagnosis;
  const dx = DIAGNOSES[dxCode];

  $diagnosisBlock.innerHTML = `
    <div>
      <h3 class="font-semibold mb-1">Kesimpulan</h3>
      <p><span class="tag">${dx.name}</span></p>
      <p class="text-sm text-slate-300 mt-2">Kesimpulan ini hanya bersifat awal dan tidak menggantikan penilaian dari tenaga profesional.</p>
    </div>
  `;

  // Peringatan
  $warningBlock.classList.remove("hidden");
  if (dxCode === "P005") {
    $warningBlock.innerHTML = `
      <h3 class="font-semibold mb-1">Peringatan</h3>
      <p>Hasil menunjukkan indikasi kondisi yang berat. Jika Anda memiliki pikiran untuk menyakiti diri, keselamatan Anda adalah yang utama.</p>
      <ul class="list-disc pl-5 mt-2 space-y-1 text-sm">
        <li>Hubungi layanan gawat darurat: <strong>112 / 119</strong></li>
        <li>Layanan dukungan psikologis SEJIWA: <strong>119 ext 8</strong></li>
        <li>Segera hubungi tenaga profesional (psikolog/psikiater) atau bicarakan dengan orang tepercaya.</li>
      </ul>
    `;
  } else {
    $warningBlock.innerHTML = `
      <h3 class="font-semibold mb-1">Pengingat</h3>
      <p class="text-sm">Hasil ini hanyalah skrining awal. Untuk pemahaman dan penanganan yang tepat, pertimbangkan konsultasi dengan tenaga profesional.</p>
    `;
  }

  renderAdviceFor(dxCode);
}

// Saran default bila tidak ada kecocokan penuh
function renderAdviceGeneric() {
  $adviceBlock.innerHTML = `
    <h3 class="font-semibold">Saran</h3>
    <ul class="list-disc pl-5 mt-2 space-y-1">
      ${ADVICES.map((a) => `<li>${a.text}</li>`).join("")}
    </ul>
  `;
}

// Saran sesuai kesimpulan
function renderAdviceFor(dxCode) {
  const selected = ADVICE_MAP[dxCode] ?? ADVICES.map((a) => a.no);
  const list = ADVICES.filter((a) => selected.includes(a.no));
  $adviceBlock.innerHTML = `
    <h3 class="font-semibold">Saran</h3>
    <ul class="list-disc pl-5 mt-2 space-y-1">
      ${list.map((a) => `<li>${a.text}</li>`).join("")}
    </ul>
  `;
}

// Event binding
$btnYes.addEventListener("click", () => answerCurrent(true));
$btnNo.addEventListener("click", () => answerCurrent(false));
$btnRestart.addEventListener("click", () => {
  for (const s of SYMPTOMS) answers[s.code] = undefined;
  currentIndex = 0;
  $result.classList.add("hidden");
  $quiz.classList.remove("hidden");
  $warningBlock.classList.add("hidden");
  $safetyBanner.classList.add("hidden");
  renderQuestion();
});

// Init
renderQuestion();
