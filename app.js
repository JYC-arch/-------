'use strict';
const sections = [
  ['abstract','摘要',5,'涵蓋全文重點，書寫簡要流暢，500 字內。',['涵蓋選案理由、照顧期間、評估方法、健康問題、照護措施與建議（5 分）'],'請簡要說明選案理由、照顧期間、評估方法、健康問題、照護措施與建議。'],
  ['introduction','前言',5,'說明選案動機與照護的重要性。',['明確說明個案選擇之動機（2 分）','明確說明此個案照護之重要性（3 分）'],'為何選擇此個案？此個案的照護具有什麼重要性？'],
  ['literature','文獻查證',15,'用文獻支持評估、問題、措施與評值。',['文獻查證之系統、組織與條理（3 分）','文獻查證內容中含近期之中、英文獻（4 分）','呈現與個案護理過程相關之文獻，如有高證據等級實證文獻或照護指引尤佳（8 分）'],'依主題整理相關文獻，並說明如何應用於此個案的護理過程。'],
  ['assessment','護理評估（含個案簡介）',15,'整合具時效性的主、客觀資料。',['相關資料具主客觀性及時效性（5 分）','能提供患者整體性及持續性的評估（10 分）'],'以代稱介紹個案，記錄照顧期間、主客觀資料、整體性及持續性的評估。'],
  ['problems','問題確立',10,'從資料辨識問題，說明相關因素。',['問題剖析之客觀、具時效性與正確性（5 分）','具主、客觀資料及相關因素（5 分）'],'逐一寫出健康問題、確立日期、主客觀資料與相關因素。'],
  ['interventions','護理措施',20,'把問題、目標與個別化措施連結起來。',['確立護理目標，具獨特性（5 分）','根據問題提供連貫、一致與適當措施（5 分）','護理措施具體、周詳，具個別性與可行性（7 分）','護理措施能參考文獻查證內容，應用於個案照護（3 分）'],'對每個問題寫出護理目標、具體措施、執行方式與文獻依據。'],
  ['evaluation','結果評值',10,'用具體成效回應目標與措施。',['針對護理目標與措施之有效性評值（4 分）','對個案整體護理之具體成效作評值（4 分）','有具體的後續照顧計畫（2 分）'],'逐項記錄目標達成情形、具體成效、評值日期與後續照顧計畫。'],
  ['discussion','討論與結論',10,'反思照護成效、限制與實務建議。',['能討論影響個案照護成效之因素（4 分）','提出具體限制與困難（3 分）','對日後護理實務工作有具體建議（3 分）'],'哪些因素影響照護成效？遇到哪些限制？對未來實務有何具體建議？'],
  ['references','參考資料',5,'確認內文引用與參考資料彼此一致。',['參考資料與內文引用依台灣護理學會護理雜誌最近期方式書寫，中文文獻不需加英譯（2 分）','參考資料與全文一致與適切（3 分）'],'逐筆列出參考資料，並核對內文引用。']
];
const form = document.querySelector('#assignment');
const key = 'nursing-case-assignment-112-v1';
const escapeHTML = value => String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
document.querySelector('#nav').innerHTML='<a href="#identity"><span>○</span>學生資料</a>'+sections.map(([id,title,points],i)=>`<a href="#${id}"><span>${String(i+1).padStart(2,'0')}</span>${title.replace('（含個案簡介）','')}<em>${points} 分</em></a>`).join('')+'<a href="#writing"><span>✓</span>最後檢查</a>';
document.querySelector('#sections').innerHTML=sections.map(([id,title,points,hint,criteria,placeholder],i)=>`<section class="card" id="${id}"><div class="section-heading"><span class="number">${String(i+1).padStart(2,'0')}</span><div><h2>${title}</h2><p>${hint}</p></div><span class="points">${points} 分</span></div><details><summary>查看評分規準</summary><ul>${criteria.map(c=>`<li>${c}</li>`).join('')}</ul></details><label for="field-${id}">撰寫${title}</label><textarea id="field-${id}" name="${id}" placeholder="${placeholder}" ${id==='abstract'?'aria-describedby="count-abstract"':''}></textarea><div class="print-text" id="print-${id}"></div><div class="count" id="count-${id}">0 字${id==='abstract'?' / 500 字':''}</div></section>`).join('');
const controls = [...form.querySelectorAll('input[name],textarea[name]')];
const wordCount = text => [...text.replace(/\s/g,'')].length;
const status = document.querySelector('#saveStatus');
const feedback = document.querySelector('#feedback');
function data(){return Object.fromEntries(controls.map(el=>[el.name,el.type==='checkbox'?el.checked:el.value]));}
function apply(values){for(const el of controls){if(Object.hasOwn(values,el.name)){if(el.type==='checkbox')el.checked=values[el.name]===true;else if(typeof values[el.name]==='string')el.value=values[el.name];}}update();}
function update(){let complete=0;for(const [id] of sections){const el=form.elements[id];const count=wordCount(el.value);document.querySelector(`#count-${id}`).textContent=`${count} 字${id==='abstract'?' / 500 字（不含空白與換行）':''}`;document.querySelector(`#count-${id}`).classList.toggle('over',id==='abstract'&&count>500);el.setCustomValidity(id==='abstract'&&count>500?'摘要請控制在 500 字內。':'');document.querySelector(`#print-${id}`).textContent=el.value||'（未填寫）';if(el.value.trim())complete++;}document.querySelector('#progress').value=complete;document.querySelector('#progressText').textContent=`${complete} / 9`;}
function save(){update();try{localStorage.setItem(key,JSON.stringify({version:1,values:data()}));status.textContent='草稿已儲存於此瀏覽器 · '+new Date().toLocaleTimeString('zh-TW',{hour:'2-digit',minute:'2-digit'});}catch{status.textContent='此瀏覽器無法保存草稿，請使用「匯出可續寫草稿」。';}}
try{const stored=localStorage.getItem(key);if(stored){const parsed=JSON.parse(stored);if(parsed.version===1&&parsed.values){apply(parsed.values);status.textContent='已還原此瀏覽器中的草稿';}}}catch{status.textContent='無法讀取瀏覽器草稿；可匯入已下載的草稿檔。';}
form.addEventListener('input',save);form.addEventListener('change',save);
function filename(ext){const values=data();return `個案報告_${values.studentId||'學號'}_${values.studentName||'姓名'}.${ext}`.replace(/[<>:"/\\|?*\x00-\x1f]/g,'_');}
function download(content,type,ext){const url=URL.createObjectURL(new Blob([content],{type}));const a=document.createElement('a');a.href=url;a.download=filename(ext);a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);}
function ready(){update();if(!form.reportValidity())return false;const empty=sections.filter(([id])=>!form.elements[id].value.trim());if(empty.length){feedback.textContent='請先完成：'+empty.map(s=>s[1]).join('、')+'。';form.elements[empty[0][0]].focus();return false;}if(!form.elements.privacy.checked){feedback.textContent='請先確認並勾選已移除可識別病人的資料。';form.elements.privacy.focus();return false;}feedback.textContent='';return true;}
form.addEventListener('submit',event=>{event.preventDefault();if(!ready())return;const d=data();const text=[`# ${d.reportTitle}`,`學生姓名：${d.studentName}\n學號：${d.studentId}\n班級：${d.className||'未填'}\n完成日期：${d.reportDate||'未填'}`,...sections.map(([id,title])=>`## ${title}\n\n${d[id]}`),'## 自我檢查',`- [${d.structure?'x':' '}] 文章結構清晰、文辭通順正確\n- [${d.reasoning?'x':' '}] 整體架構呈現護理過程之思考過程\n- [${d.privacy?'x':' '}] 已移除可識別病人的資料`,'---\n作業依據：台灣護理學會個案報告審查評分表，112 年 10 月 24 日修訂版。'].join('\n\n');download(text,'text/markdown;charset=utf-8','md');feedback.textContent='已產生作業下載檔。請依老師指定管道繳交；本頁尚未向老師送出。';});
document.querySelector('#backup').addEventListener('click',()=>{download(JSON.stringify({version:1,values:data()},null,2),'application/json;charset=utf-8','json');feedback.textContent='已匯出可續寫草稿；請妥善保管檔案。';});
document.querySelector('#restore').addEventListener('change',async event=>{const file=event.target.files[0];if(!file)return;try{if(file.size>5*1024*1024)throw Error('草稿檔過大。');const parsed=JSON.parse(await file.text());const allowed=new Set(controls.map(el=>el.name));if(parsed.version!==1||!parsed.values||typeof parsed.values!=='object'||Array.isArray(parsed.values)||!Object.keys(parsed.values).some(k=>allowed.has(k)))throw Error('無法辨識草稿格式。');if(controls.some(el=>el.type==='checkbox'?el.checked:el.value.trim())&&!confirm('匯入會取代目前作業內容，確定要繼續嗎？'))return;for(const el of controls){if(el.type==='checkbox')el.checked=false;else el.value='';}apply(parsed.values);save();feedback.textContent='草稿已匯入，可繼續編輯。';}catch(error){feedback.textContent='匯入失敗：'+error.message;}finally{event.target.value='';}});
document.querySelector('#print').addEventListener('click',()=>{if(ready())window.print();});
window.addEventListener('beforeprint',update);update();
