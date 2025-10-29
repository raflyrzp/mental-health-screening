export function hasRisk(answers) {
  return answers["G017"] === true || answers["G026"] === true;
}

function chooseBestDiagnosis(fired, diagnoses) {
  const sorted = [...fired].sort(
    (a, b) => diagnoses[a.then].severity - diagnoses[b.then].severity
  );
  return sorted[sorted.length - 1].then;
}

export function infer(answers, rules, diagnoses) {
  const fired = [];
  for (const rule of rules) {
    const ok = rule.ifs.every((code) => answers[code] === true);
    if (ok) fired.push(rule);
  }
  if (fired.length === 0) return { matched: false, diagnosis: null, rules: [] };
  const best = chooseBestDiagnosis(fired, diagnoses);
  return { matched: true, diagnosis: best, rules: fired };
}
