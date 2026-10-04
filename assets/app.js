const COLORS={A:"#cf635d",B:"#bd7e3d",AB:"#8067a8",O:"#bd4352"};
const records=[
{name:"Karl Landsteiner",field:"Medicine",year:1930,blood:"O",country:"Austria",status:"unverified",sourceType:"unsourced compilation",source:"https://abofan.jimdofree.com/%E3%83%87%E3%83%BC%E3%82%BF/%E3%83%8E%E3%83%BC%E3%83%99%E3%83%AB%E8%B3%9E%E5%8F%97%E8%B3%9E%E8%80%85/",note:"Experimental history does not identify which sample was his."},
{name:"Hideki Yukawa",field:"Physics",year:1949,blood:"O",country:"Japan",status:"unverified",sourceType:"unsourced compilation",source:"https://abobible.wixsite.com/abo-bible/nobel",note:"Uncited compilation lead."},
{name:"Shinichiro Tomonaga",field:"Physics",year:1965,blood:"A",country:"Japan",status:"unverified",sourceType:"unsourced compilation",source:"https://abobible.wixsite.com/abo-bible/nobel",note:"Uncited compilation lead."},
{name:"Leo Esaki",field:"Physics",year:1973,blood:"AB",country:"Japan",status:"unverified",sourceType:"unsourced compilation",source:"https://abobible.wixsite.com/abo-bible/nobel",note:"Uncited compilation lead."},
{name:"Eisaku Sato",field:"Peace",year:1974,blood:"A",country:"Japan",status:"unverified",sourceType:"unsourced compilation",source:"https://abobible.wixsite.com/abo-bible/nobel",note:"Uncited compilation lead."},
{name:"Kenichi Fukui",field:"Chemistry",year:1981,blood:"A",country:"Japan",status:"unverified",sourceType:"unsourced compilation",source:"https://abobible.wixsite.com/abo-bible/nobel",note:"Uncited compilation lead."},
{name:"Susumu Tonegawa",field:"Medicine",year:1987,blood:"AB",country:"Japan",status:"unverified",sourceType:"unsourced compilation",source:"https://abobible.wixsite.com/abo-bible/nobel",note:"Uncited compilation lead."},
{name:"Mikhail Gorbachev",field:"Peace",year:1990,blood:"O",country:"Russia",status:"unverified",sourceType:"unsourced compilation",source:"https://abofan.jimdofree.com/%E3%83%87%E3%83%BC%E3%82%BF/%E3%83%8E%E3%83%BC%E3%83%99%E3%83%AB%E8%B3%9E%E5%8F%97%E8%B3%9E%E8%80%85/",note:"Repeated list claim; no primary source found."},
{name:"Kenzaburo Oe",field:"Literature",year:1994,blood:"A",country:"Japan",status:"unverified",sourceType:"unsourced compilation",source:"https://abobible.wixsite.com/abo-bible/nobel",note:"Uncited compilation lead."},
{name:"Hideki Shirakawa",field:"Chemistry",year:2000,blood:"B",country:"Japan",status:"unverified",sourceType:"unsourced compilation",source:"https://abobible.wixsite.com/abo-bible/nobel",note:"Uncited compilation lead."},
{name:"Kim Dae-jung",field:"Peace",year:2000,blood:"A",country:"South Korea",status:"reported_secondary_source",sourceType:"reputable news report",source:"https://view.asiae.co.kr/article/2012072311474739066",note:"Explicit public report; no released medical record."},
{name:"Koichi Tanaka",field:"Chemistry",year:2002,blood:"B",country:"Japan",status:"unverified",sourceType:"unsourced compilation",source:"https://abobible.wixsite.com/abo-bible/nobel",note:"Uncited compilation lead."},
{name:"Jimmy Carter",field:"Peace",year:2002,blood:"A",country:"United States",status:"reported_secondary_source",sourceType:"blood-service secondary review",source:"https://ourbloodinstitute.org/blood-matters/blood-type-us-presidents/",note:"Secondary review linked to press reporting."},
{name:"Daniel Kahneman",field:"Economics",year:2002,blood:"O",country:"Israel",status:"unverified",sourceType:"unsourced compilation",source:"https://abofan.jimdofree.com/%E3%83%87%E3%83%BC%E3%82%BF/%E3%83%8E%E3%83%BC%E3%83%99%E3%83%AB%E8%B3%9E%E5%8F%97%E8%B3%9E%E8%80%85/",note:"Uncited compilation lead."},
{name:"Barack Obama",field:"Peace",year:2009,blood:"AB",country:"United States",status:"reported_secondary_source",sourceType:"reputable news report",source:"http://news.bbc.co.uk/2/hi/americas/7973274.stm",note:"BBC report concerning emergency blood."},
{name:"Shinya Yamanaka",field:"Medicine",year:2012,blood:"B",country:"Japan",status:"unverified",sourceType:"unsourced compilation",source:"https://abobible.wixsite.com/abo-bible/nobel",note:"Uncited compilation lead."},
{name:"Satoshi Omura",field:"Medicine",year:2015,blood:"O",country:"Japan",status:"unverified",sourceType:"unsourced compilation",source:"https://abobible.wixsite.com/abo-bible/nobel",note:"Category corrected against Nobel record."},
{name:"Yoshinori Ohsumi",field:"Medicine",year:2016,blood:"O",country:"Japan",status:"reported_secondary_source",sourceType:"published interview profile",source:"https://www.sandiegoyuyu.com/index.php/features-2/interviews/%E5%A4%A7%E9%9A%85%E8%89%AF%E5%85%B82016",note:"Named profile explicitly reports O; not medical confirmation."},
{name:"Bob Dylan",field:"Literature",year:2016,blood:"AB",country:"United States",status:"unverified",sourceType:"unsourced compilation",source:"https://abofan.jimdofree.com/%E3%83%87%E3%83%BC%E3%82%BF/%E3%83%8E%E3%83%BC%E3%83%99%E3%83%AB%E8%B3%9E%E5%8F%97%E8%B3%9E%E8%80%85/",note:"Uncited compilation lead."}
];

const baselines={
"Global":{A:29.41,B:23.13,AB:6.24,O:41.22,source:"https://hemefoundation.org/what-types-of-blood-donations-are-considered-rare/",note:"Broad global aggregate; useful only as a coarse context."},
"Japan":{A:40,B:20,AB:10,O:30,source:"https://www.bs.jrc.or.jp/kk/hyogo/donation/m2_02_01_00_bloodtype.html",note:"Japanese Red Cross population estimate."},
"United States":{A:42,B:10,AB:4,O:44,source:"https://stanfordbloodcenter.org/donate-blood/blood-donation-facts/blood-types/",note:"Stanford Blood Center / AABB educational estimate."},
"Canada":{A:42,B:9,AB:3,O:46,source:"https://www.blood.ca/en/stories/blood-types-canada-how-common-or-rare-are-they",note:"Canadian Blood Services estimate."},
"South Korea":{A:34,B:27,AB:12,O:27,source:"https://www.statista.com/statistics/1364781/south-korea-blood-type-distribution/",note:"Rounded 2024 blood-donation distribution."}
};
const fieldTotals={Physics:229,Chemistry:198,Medicine:232,Literature:122,Peace:112,Economics:99};
const conflicts={Physics:1,Chemistry:1,Medicine:0,Literature:1,Peace:0,Economics:0};
const schoolCountries=[["United States",155],["Canada",12],["Australia",5],["South Africa",3],["Germany",2],["Hungary",2],["China",2],["Romania",2]];
const sources=[
["Official Nobel Prize API","Primary","Prize years, categories and laureate identities.","https://www.nobelprize.org/about/developer-zone-2/"],
["Ohsumi interview profile","Reported secondary","Person-specific interview profile explicitly reporting type O.","https://www.sandiegoyuyu.com/index.php/features-2/interviews/%E5%A4%A7%E9%9A%85%E8%89%AF%E5%85%B82016"],
["BBC: Obama security bubble","Reported secondary","Report that AB blood travelled with the president for emergencies.","http://news.bbc.co.uk/2/hi/americas/7973274.stm"],
["Our Blood Institute","Reported secondary","Secondary review of public evidence concerning Carter and Obama.","https://ourbloodinstitute.org/blood-matters/blood-type-us-presidents/"],
["Asia Economy: Kim Dae-jung","Reported secondary","Korean public report explicitly identifying type A.","https://view.asiae.co.kr/article/2012072311474739066"],
["Japanese Red Cross","Baseline","Japan reference: A 40%, O 30%, B 20%, AB 10%.","https://www.bs.jrc.or.jp/kk/hyogo/donation/m2_02_01_00_bloodtype.html"],
["Stanford Blood Center / AABB","Baseline","United States reference aggregated to A 42%, O 44%, B 10%, AB 4%.","https://stanfordbloodcenter.org/donate-blood/blood-donation-facts/blood-types/"],
["Canadian Blood Services","Baseline","Canada reference aggregated to A 42%, O 46%, B 9%, AB 3%.","https://www.blood.ca/en/stories/blood-types-canada-how-common-or-rare-are-they"],
["South Korea 2024 donor distribution","Baseline · donor","Rounded donor distribution: A 34%, O 27%, B 27%, AB 12%.","https://www.statista.com/statistics/1364781/south-korea-blood-type-distribution/"],
["Heme Foundation world estimate","Baseline","Broad ABO/Rh composition used as coarse global context.","https://hemefoundation.org/what-types-of-blood-donations-are-considered-rare/"],
["Japanese Nobel compilation","Unverified lead","Discovery list with no person-level citations and several conflicts.","https://abobible.wixsite.com/abo-bible/nobel"],
["ABO FAN compilation","Unverified lead","Additional international discovery leads; not confirmation.","https://abofan.jimdofree.com/%E3%83%87%E3%83%BC%E3%82%BF/%E3%83%8E%E3%83%BC%E3%83%99%E3%83%AB%E8%B3%9E%E5%8F%97%E8%B3%9E%E8%80%85/"]
];

function esc(value){return String(value).replace(/[&<>"']/g,function(c){return({"&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;","'":"&#039;"}[c]);});}
function filteredStudy(){
  const set=document.getElementById("evidence-set").value;
  const field=document.getElementById("field-filter").value;
  return records.filter(function(r){return(set==="screening"||r.status==="reported_secondary_source")&&(field==="All fields"||r.field===field);});
}
function renderAnalysis(){
  const rows=filteredStudy();
  const field=document.getElementById("field-filter").value;
  const baselineName=document.getElementById("baseline-filter").value;
  const base=baselines[baselineName];
  const counts={A:0,B:0,AB:0,O:0};rows.forEach(function(r){counts[r.blood]++;});
  const max=Math.max(1,...["A","B","AB","O"].map(function(t){return Math.max(counts[t],rows.length*base[t]/100);}));
  document.getElementById("analysis-title").textContent=field;
  document.getElementById("sample-size").textContent="n = "+rows.length;
  const denom=field==="All fields"?992:fieldTotals[field];
  document.getElementById("sample-coverage").textContent=(rows.length/denom*100).toFixed(1)+"% of denominator";
  document.getElementById("comparison-chart").innerHTML=["A","B","AB","O"].map(function(t){
    const expected=rows.length*base[t]/100;
    return '<div class="comparison-row"><span class="type-badge" style="background:'+COLORS[t]+'">'+t+'</span><div class="comparison-bars">'+
      '<div class="comparison-line"><span>Observed</span><div class="track"><div class="fill" style="width:'+(counts[t]/max*100)+'%;background:'+COLORS[t]+'"></div></div><b>'+counts[t]+'</b></div>'+
      '<div class="comparison-line"><span>Expected</span><div class="track"><div class="fill expected" style="width:'+(expected/max*100)+'%"></div></div><b>'+expected.toFixed(2)+'</b></div>'+
      '</div></div>';
  }).join("");
  document.getElementById("baseline-note").textContent=base.note+" This reference is contextual and is not evidence that every screened person belongs to that population.";
  const link=document.getElementById("baseline-link");link.href=base.source;
  document.getElementById("name-chips").innerHTML=rows.map(function(r){return"<span>"+esc(r.name)+" · "+r.blood+"</span>";}).join("");
  const copy=rows.length<5?"Too few stronger-source records for meaningful inference.":"The sample remains selected and non-random; descriptive differences should not be interpreted biologically.";
  document.getElementById("gate-copy").textContent=copy;
}
function renderLedger(){
  const q=document.getElementById("record-search").value.trim().toLowerCase();
  const status=document.getElementById("record-status").value;
  const blood=document.getElementById("record-blood").value;
  const rows=records.filter(function(r){
    const text=(r.name+" "+r.field+" "+r.country+" "+r.note).toLowerCase();
    return(!q||text.includes(q))&&(status==="all"||r.status===status)&&(blood==="all"||r.blood===blood);
  }).sort(function(a,b){return b.year-a.year;});
  document.getElementById("result-count").textContent=rows.length+" of 19 records";
  document.getElementById("ledger-body").innerHTML=rows.map(function(r){
    const label=r.status==="reported_secondary_source"?"Reported secondary":"Unverified";
    const cls=r.status==="reported_secondary_source"?"reported":"unverified";
    return"<tr><td><strong>"+esc(r.name)+"</strong><small>"+esc(r.note)+"</small></td><td>"+r.field+"<small>"+r.year+"</small></td><td><span class='blood-dot' style='background:"+COLORS[r.blood]+"'></span>"+r.blood+"</td><td>"+esc(r.sourceType)+"</td><td><span class='evidence-pill "+cls+"'>"+label+"</span></td><td><a class='source-link' href='"+esc(r.source)+"' target='_blank' rel='noreferrer'>Open ↗</a></td></tr>";
  }).join("");
}
function renderQueue(){
  document.getElementById("queue-body").innerHTML=Object.keys(fieldTotals).map(function(field){
    const rs=records.filter(function(r){return r.field===field;});
    const reported=rs.filter(function(r){return r.status==="reported_secondary_source";}).length;
    const unverified=rs.length-reported;
    const conflict=conflicts[field];
    const unknown=fieldTotals[field]-rs.length-conflict;
    const reviewed=(rs.length+conflict)/fieldTotals[field]*100;
    return"<tr><td>"+field+"</td><td>"+fieldTotals[field]+"</td><td>"+reported+"</td><td>"+unverified+"</td><td>"+conflict+"</td><td>"+unknown+"</td><td><span class='progress'><i style='width:"+reviewed+"%'></i></span>"+reviewed.toFixed(1)+"%</td></tr>";
  }).join("");
}
function renderSchool(){
  const max=Math.max.apply(null,schoolCountries.map(function(x){return x[1];}));
  document.getElementById("school-chart").innerHTML=schoolCountries.map(function(x){
    return"<div class='bar-row'><div class='bar-meta'><span>"+x[0]+"</span><b>"+x[1]+"</b></div><div class='bar-track'><div class='bar-fill' style='width:"+(x[1]/max*100)+"%'></div></div></div>";
  }).join("");
}
function renderBaselines(){
  const keys=Object.keys(baselines);
  document.getElementById("baseline-table").innerHTML="<div class='baseline-row header'><b>Population</b><span>A</span><span>B</span><span>AB</span><span>O</span></div>"+keys.map(function(k){
    const b=baselines[k];
    return"<div class='baseline-row'><b>"+k+"</b><span>"+b.A+"%</span><span>"+b.B+"%</span><span>"+b.AB+"%</span><span>"+b.O+"%</span></div>";
  }).join("");
}
function renderSources(){
  document.getElementById("source-list").innerHTML=sources.map(function(s,i){
    return"<a class='source-item' href='"+esc(s[3])+"' target='_blank' rel='noreferrer'><span>"+String(i+1).padStart(2,"0")+"</span><div><strong>"+esc(s[0])+"</strong><small>"+esc(s[2])+"</small></div><b>"+esc(s[1])+"</b><i>↗</i></a>";
  }).join("");
}
["evidence-set","field-filter","baseline-filter"].forEach(function(id){document.getElementById(id).addEventListener("change",renderAnalysis);});
["record-search","record-status","record-blood"].forEach(function(id){document.getElementById(id).addEventListener(id==="record-search"?"input":"change",renderLedger);});
renderAnalysis();renderLedger();renderQueue();renderSchool();renderBaselines();renderSources();
