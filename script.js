/* ClaimVoice V15 — unified site search, autocomplete and navigation */
const claimVoiceTopics = [
  ["Why Motor Insurance Claims Get Rejected", "Common rejection, dispute and deduction reasons", "why-motor-insurance-claims-get-rejected.html"],
  ["Second-Hand Vehicle Claim Within 14 Days", "Used car purchase, transfer, ownership and claim issues", "second-hand-vehicle-14-day-insurance-claim.html"],
  ["Accident Claim Documents", "Approximate documents for an accident or own-damage claim", "claim-documents-accident-theft.html#accident"],
  ["Theft Claim Documents", "Approximate documents for a stolen vehicle claim", "claim-documents-accident-theft.html#theft"],
  ["Vehicle Recovered After Theft", "Court release, Superdari, insurance claim status and lock/security precautions", "vehicle-recovered-after-theft-insurance-claim.html"],

  ["RTO Forms 26, 28, 29 and 30", "Official motor vehicle forms and where to download them", "forms-downloads.html#rto-forms"],
  ["Claim Document Submission Cover Letter", "Template for submitting multiple documents with a clear record", "forms-downloads.html#templates"],
  ["Claim Reconsideration Request", "Sample request after rejection or disputed claim decision", "forms-downloads.html#reconsideration"],
  ["Subrogation and I-Bond", "Simple explanation and sample document guidance", "forms-downloads.html#subrogation"],
  ["Partial Theft", "Parts or components stolen from your vehicle", "partial-theft-insurance-claim.html"],
  ["Total Loss vs CTL", "Constructive Total Loss, IDV, repair cost and salvage", "total-loss-ctl-motor-insurance.html"],
  ["Genuine vs Fraudulent Claim", "Difference between genuine claims, investigations and insurance fraud", "genuine-vs-fraudulent-motor-insurance-claim.html"],
  ["Payable Claim Rejected", "What to check when an insurer rejects a claim you believe is payable", "payable-claim-rejected-by-insurer.html"],
  ["Claim Documents Checklist", "Common documents for accident, theft, fire, partial theft and total loss", "motor-insurance-claim-documents-checklist.html"],
  ["Surveyor vs Investigator", "Understand the difference between survey and investigation", "surveyor-vs-investigator-motor-insurance-claim.html"],
  ["Difficult Claim Documents", "What to do when a document is delayed or unavailable", "documents-hard-to-procure-motor-insurance-claim.html"],
  ["Why Claims Get Rejected", "Claim rejection reasons, objections, deductions and what to do", "claim-problems.html#rejected"],
  ["Fire Claims", "Vehicle fire, evidence, investigation and claim issues", "what-happened.html#fire"],
  ["Flood / Water Damage", "Water damage and motor insurance claim guidance", "what-happened.html#flood"],
  ["IDV", "Insured Declared Value explained", "policy-decoder.html#idv"],
  ["CTL", "Constructive Total Loss explained simply", "policy-decoder.html#ctl"],
  ["Claim Delayed", "What to check when a motor claim is taking too long", "claim-problems.html#delayed"],
  ["Payment / Deduction", "When settlement is lower than expected", "claim-problems.html#payment"],
  ["How to Escalate", "What to do after rejection, delay or unresolved claim", "escalation.html"],
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

function escapeHtml(value){return value.replace(/[&<>'"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]));}
function attachSearch(input){
  if(!input || input.dataset.cvSearchV15) return;
  input.dataset.cvSearchV15='1';
  const container=input.closest('.search-area,.search-wrap,.search,.search-box') || input.parentElement;
  let box=container?.querySelector('.suggestions,#suggestions,#drop');
  if(!box){box=document.createElement('div');box.className='suggestions';box.hidden=true;input.parentElement.appendChild(box);}
  const render=()=>{
    const q=input.value.trim().toLowerCase();
    if(!q){box.hidden=true;box.innerHTML='';return;}
    const terms=q.split(/\s+/).filter(Boolean);
    const matches=claimVoiceTopics.map(t=>({t,score:terms.reduce((n,w)=>n+((t[0]+' '+t[1]).toLowerCase().includes(w)?1:0),0)})).filter(x=>x.score===terms.length || x.score>0).sort((a,b)=>b.score-a.score).slice(0,8).map(x=>x.t);
    box.innerHTML=matches.length ? matches.map((t,i)=>`<div class="cv-suggestion-row" data-url="${t[2]}" data-index="${i}" role="option"><b>${escapeHtml(t[0])}</b><br><small>${escapeHtml(t[1])}</small></div>`).join('') : '<div class="cv-suggestion-row">No matching ClaimVoice topic. Try words such as rejection, accident, theft, documents, RTO, CTL or modification.</div>';
    box.hidden=false;
  };
  input.addEventListener('input',render);
  input.addEventListener('focus',render);
  input.addEventListener('keydown',e=>{
    if(e.key==='Escape'){box.hidden=true;return;}
    if(e.key==='Enter'){const first=box.querySelector('[data-url]');if(first){e.preventDefault();location.href=first.dataset.url;}}
  });
  box.addEventListener('click',e=>{const row=e.target.closest('[data-url]');if(row)location.href=row.dataset.url;});
}

document.addEventListener('DOMContentLoaded',()=>{
  document.querySelectorAll('input[type="search"],.search-area input,.search-wrap input,.search input,#search,#q').forEach(attachSearch);
  const btn=document.getElementById('searchBtn');
  if(btn){btn.addEventListener('click',()=>{const input=document.getElementById('search');if(input){const first=input.closest('.search-area')?.querySelector('[data-url]');if(first)location.href=first.dataset.url;}});}

  const recoveredYes=document.getElementById('recoveredYes');
  const recoveredNo=document.getElementById('recoveredNo');
  const recoveryModal=document.getElementById('recoveryModal');
  const closeRecoveryModal=document.getElementById('closeRecoveryModal');
  if(recoveredYes&&recoveryModal){ recoveredYes.addEventListener('click',()=>{recoveryModal.classList.add('open');}); }
  if(recoveredNo){ recoveredNo.addEventListener('click',()=>{recoveredNo.blur();}); }
  if(closeRecoveryModal&&recoveryModal){ closeRecoveryModal.addEventListener('click',()=>recoveryModal.classList.remove('open')); recoveryModal.addEventListener('click',e=>{if(e.target===recoveryModal) recoveryModal.classList.remove('open');}); }
  const menuBtn=document.getElementById('cvMenuBtn'),panel=document.getElementById('cvMenuPanel');
  if(menuBtn&&panel){
    panel.classList.remove('open');panel.setAttribute('aria-hidden','true');menuBtn.setAttribute('aria-expanded','false');
    menuBtn.addEventListener('click',()=>{const open=panel.classList.toggle('open');menuBtn.setAttribute('aria-expanded',String(open));panel.setAttribute('aria-hidden',String(!open));});
    panel.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{panel.classList.remove('open');menuBtn.setAttribute('aria-expanded','false');panel.setAttribute('aria-hidden','true');}));
    document.addEventListener('click',e=>{if(!panel.contains(e.target)&&!menuBtn.contains(e.target)){panel.classList.remove('open');menuBtn.setAttribute('aria-expanded','false');panel.setAttribute('aria-hidden','true');}});
  }
});
