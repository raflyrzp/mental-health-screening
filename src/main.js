import "./style.css";
import { SYMPTOMS } from "./data/symptoms.js";
import { DIAGNOSES } from "./data/diagnoses.js";
import { RULES } from "./data/rules.js";
import { ADVICES, ADVICE_MAP } from "./data/advices.js";
import { infer, hasRisk } from "./inference.js";

// State
let currentIndex = 0;
const answers = {}; // { G001: true/false }

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

// Render pertanyaan
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

function updateSafetyBanner() {
  $safetyBanner.classList.toggle("hidden", !hasRisk(answers));
}

// Proses jawaban
function answerCurrent(isYes) {
  const s = SYMPTOMS[currentIndex];
  answers[s.code] = !!isYes;
  updateSafetyBanner();
  currentIndex += 1;
  renderQuestion();
}

// Render saran umum
function renderAdviceGeneric() {
  $adviceBlock.innerHTML = `
    <h3 class="font-semibold">Saran</h3>
    <ul class="list-disc pl-5 mt-2 space-y-1">
      ${ADVICES.map((a) => `<li>${a.text}</li>`).join("")}
    </ul>
  `;
}

// Saran untuk kategori aman
function renderAdviceSafe() {
  const keepWell = [1, 2, 4, 5, 7];
  const list = ADVICES.filter((a) => keepWell.includes(a.no));
  $adviceBlock.innerHTML = `
    <h3 class="font-semibold">Saran</h3>
    <ul class="list-disc pl-5 mt-2 space-y-1">
      ${list.map((a) => `<li>${a.text}</li>`).join("")}
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

// Tampilkan hasil
function finalize() {
  $progressBar.style.width = "100%";
  $quiz.classList.add("hidden");
  $result.classList.remove("hidden");

  const outcome = infer(answers, RULES, DIAGNOSES);
  $diagnosisBlock.innerHTML = "";

  if (!outcome.matched) {
    if (!hasRisk(answers)) {
      $diagnosisBlock.innerHTML = `
        <div>
          <h3 class="font-semibold mb-1">Kesimpulan</h3>
          <p><span class="tag tag-success">Kategori Aman</span></p>
          <p class="text-sm text-slate-300 mt-2">Saat ini tidak terlihat tanda yang mengkhawatirkan. Tetap jaga kesehatan mental Anda dengan kebiasaan yang baik.</p>
        </div>
      `;
      $warningBlock.classList.add("hidden");
      renderAdviceSafe();
    } else {
      $diagnosisBlock.innerHTML = `
        <div>
          <h3 class="font-semibold mb-1">Kesimpulan</h3>
          <p><span class="tag">Perlu Perhatian</span></p>
          <p class="text-sm text-slate-300 mt-2">Beberapa jawaban menunjukkan perlunya perhatian terhadap keselamatan. Pertimbangkan untuk mencari bantuan.</p>
        </div>
      `;
      $warningBlock.classList.remove("hidden");
      $warningBlock.innerHTML = `
        <h3 class="font-semibold mb-1">Peringatan</h3>
        <p>Jika Anda memiliki pikiran untuk menyakiti diri, keselamatan Anda adalah yang utama.</p>
        <ul class="list-disc pl-5 mt-2 space-y-1 text-sm">
          <li>Hubungi layanan gawat darurat: <strong>112 / 119</strong></li>
          <li>Layanan dukungan psikologis SEJIWA: <strong>119 ext 8</strong></li>
          <li>Bicarakan dengan orang tepercaya atau tenaga profesional sesegera mungkin.</li>
        </ul>
      `;
      renderAdviceGeneric();
    }
    return;
  }

  const dxCode = outcome.diagnosis;
  const dx = DIAGNOSES[dxCode];

  $diagnosisBlock.innerHTML = `
    <div>
      <h3 class="font-semibold mb-1">Kesimpulan</h3>
      <p><span class="tag">${dx.name}</span></p>
      <p class="text-sm text-slate-300 mt-2">Kesimpulan ini bersifat awal dan tidak menggantikan penilaian dari tenaga profesional.</p>
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

renderQuestion();
