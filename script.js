/* ClaimVoice V14 — unified site search and navigation */
const claimVoiceTopics = [
  ["Why Motor Insurance Claims Get Rejected", "Common rejection, dispute and deduction reasons", "why-motor-insurance-claims-get-rejected.html"],
  ["Second-Hand Vehicle Claim Within 14 Days", "Used car purchase, transfer, ownership and claim issues", "second-hand-vehicle-14-day-insurance-claim.html"],
  ["Partial Theft", "Parts or components stolen from your vehicle", "partial-theft-insurance-claim.html"],
  ["Total Loss vs CTL", "Constructive Total Loss, IDV, repair cost and salvage", "total-loss-ctl-motor-insurance.html"],
  ["Genuine vs Fraudulent Claim", "Difference between genuine claims, investigations and insurance fraud", "genuine-vs-fraudulent-motor-insurance-claim.html"],
  ["Payable Claim Rejected", "What to check when an insurer rejects a claim you believe is payable", "payable-claim-rejected-by-insurer.html"],
  ["Claim Documents Checklist", "Common documents for accident, theft, fire, partial theft and total loss", "motor-insurance-claim-documents-checklist.html"],
  ["Surveyor vs Investigator", "Understand the difference between survey and investigation", "surveyor-vs-investigator-motor-insurance-claim.html"],
  ["Difficult Claim Documents", "What to do when a document is delayed or unavailable", "documents-hard-to-procure-motor-insurance-claim.html"],
  ["Why Claims Get Rejected", "Claim rejection reasons, objections, deductions and what to do", "claim-problems.html#rejected"],
  ["Partial Theft", "Parts or components stolen from your vehicle", "what-happened.html#partial-theft"],
  ["Total Theft", "Your vehicle has been stolen", "what-happened.html#total-theft"],
  ["Attempted Theft", "Someone tried to steal your vehicle", "what-happened.html#attempted-theft"],
  ["Fire Claims", "Vehicle fire, evidence, investigation and claim issues", "what-happened.html#fire"],
  ["Flood / Water Damage", "Water damage and motor insurance claim guidance", "what-happened.html#flood"],
  ["Total Loss", "When a vehicle may be treated as a total loss", "policy-decoder.html#total-loss"],
  ["CTL", "Constructive Total Loss explained simply", "policy-decoder.html#ctl"],
  ["IDV", "Insured Declared Value explained", "policy-decoder.html#idv"],
  ["Additional Documents", "Why an insurer may ask for more documents", "claim-problems.html#documents"],
  ["Claim Delayed", "What to check when a motor claim is taking too long", "claim-problems.html#delayed"],
  ["Payment / Deduction", "When settlement is lower than expected", "claim-problems.html#payment"],
  ["Surveyor vs Investigator", "Understand the two roles", "claim-process.html#surveyor"],
  ["Claim Journey", "From intimation and survey to investigation and settlement", "claim-process.html"],
  ["How to Escalate", "What to do after rejection, delay or unresolved claim", "escalation.html"],
  ["Difficult Documents", "What if a requested document is hard to obtain?", "documents-library.html"],
  ["Aftermarket Modifications", "Accessories, modifications and insurance claim issues", "modifications.html"],
  ["CNG / LPG", "Installation, RC and insurance endorsement", "cng-lpg-installation-rc-insurance-endorsement.html"],
  ["Fog Lights", "Aftermarket fog lights, wiring, fire and claim rejection", "aftermarket-fog-lights-insurance-claim.html"],
  ["Tyres & Rims", "Tyre, alloy wheel and rim modifications", "tyre-rim-modifications-insurance-claim.html"],
  ["Aftermarket Sunroof", "Sunroof modification and insurance claim issues", "aftermarket-sunroof-insurance-claim.html"],
  ["Vehicle Colour Change", "Colour change, RC and insurance implications", "car-colour-change-insurance-claim.html"],
  ["Two-Wheeler Prohibited Road", "Highway / expressway and prohibited-road claim issues", "two-wheeler-prohibited-road-insurance-claim.html"],
  ["Real Claim Stories", "Customer experiences and clearly labelled illustrative stories", "stories.html"],
  ["Policy Decoder", "Simple explanations of difficult motor insurance terms", "policy-decoder.html"],
  ["Documents Library", "Claim documents, checklists and examples", "documents-library.html"],
  ["Forms & Downloads", "Useful motor claim and RTO forms", "forms-downloads.html"],
  ["Grievance Contacts", "Insurer grievance information", "insurer-grievance-directory.html"],
  ["Feedback", "Suggestions, corrections and website feedback", "feedback.html"]
];

function attachSearch(input){
  if(!input || input.dataset.cvSearchV14) return;
  input.dataset.cvSearchV14='1';
  const box=input.parentElement.querySelector('.suggestions') || document.getElementById('suggestions');
  if(!box) return;
  const render=()=>{
    const q=input.value.trim().toLowerCase();
    if(!q){box.hidden=true;box.innerHTML='';return;}
    const matches=claimVoiceTopics.filter(t=>(t[0]+' '+t[1]).toLowerCase().includes(q)).slice(0,8);
    box.innerHTML=matches.length ? matches.map(t=>`<div data-url="${t[2]}"><b>${t[0]}</b><br><small>${t[1]}</small></div>`).join('') : '<div>No exact topic found. Try another ClaimVoice topic.</div>';
    box.hidden=false;
  };
  input.addEventListener('input',render); input.addEventListener('focus',render);
  box.addEventListener('click',e=>{const row=e.target.closest('[data-url]'); if(row) location.href=row.dataset.url;});
  const btn=document.getElementById('searchBtn'); if(btn) btn.addEventListener('click',()=>{render();const first=box.querySelector('[data-url]');if(first)location.href=first.dataset.url;});
}

document.addEventListener('DOMContentLoaded',()=>{
  document.querySelectorAll('input[placeholder*="Search"],#search').forEach(attachSearch);
  const btn=document.getElementById('cvMenuBtn'),panel=document.getElementById('cvMenuPanel');
  if(btn&&panel){
    panel.classList.remove('open'); panel.setAttribute('aria-hidden','true'); btn.setAttribute('aria-expanded','false');
    btn.addEventListener('click',()=>{const open=panel.classList.toggle('open');btn.setAttribute('aria-expanded',String(open));panel.setAttribute('aria-hidden',String(!open));});
    panel.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{panel.classList.remove('open');btn.setAttribute('aria-expanded','false');panel.setAttribute('aria-hidden','true');}));
    document.addEventListener('click',e=>{if(!panel.contains(e.target)&&!btn.contains(e.target)){panel.classList.remove('open');btn.setAttribute('aria-expanded','false');panel.setAttribute('aria-hidden','true');}});
  }
});
