/* Navigation */
document.querySelectorAll(".tab").forEach(t=>{
  t.onclick=()=>{
    document.querySelectorAll(".tab,.view").forEach(x=>x.classList.remove("active"));
    t.classList.add("active");
    document.getElementById("view-"+t.dataset.view).classList.add("active");
  };
});

/* Utils */
const today=()=>new Date().toISOString().split("T")[0];
incomeDate.value=today;

/* Lock system */
const getLockType=()=>localStorage.getItem("lock_type")||"pin";
if(!localStorage.getItem("app_pin"))localStorage.setItem("app_pin","1234");

function showLock(){
  if(getLockType()==="none")return;
  lockScreen.classList.remove("hidden");
  pinBox.classList.toggle("hidden",getLockType()!=="pin");
  patternBox.classList.toggle("hidden",getLockType()!=="pattern");
}
showLock();

function checkPin(){
  if(pinInput.value===localStorage.getItem("app_pin")){
    lockScreen.classList.add("hidden");
  }
}

let currentPattern="";
document.querySelectorAll(".pattern-grid div").forEach(d=>{
  d.onclick=()=>{currentPattern+=d.dataset.p;d.classList.add("active");};
});
function checkPattern(){
  if(!localStorage.getItem("app_pattern")){
    localStorage.setItem("app_pattern",currentPattern);
  }else if(localStorage.getItem("app_pattern")===currentPattern){
    lockScreen.classList.add("hidden");
  }
  currentPattern="";
  document.querySelectorAll(".pattern-grid div").forEach(d=>d.classList.remove("active"));
}

function saveLockType(){
  localStorage.setItem("lock_type",lockType.value);
  alert("تم حفظ نوع القفل");
}

function changePin(){
  if(oldPin.value===localStorage.getItem("app_pin")&&newPin.value===confirmNewPin.value){
    localStorage.setItem("app_pin",newPin.value);
    alert("تم تغيير الرقم السري");
  }
}

/* Income */
function addIncome(){
  let l=JSON.parse(localStorage.getItem("incomes")||"[]");
  l.push({id:crypto.randomUUID(),amount:+incomeAmount.value,date:incomeDate.value});
  localStorage.setItem("incomes",JSON.stringify(l));
  loadIncome();loadDash();
}
function loadIncome(){
  incomeList.innerHTML="";
  JSON.parse(localStorage.getItem("incomes")||"[]").forEach(i=>{
    incomeList.innerHTML+=`${i.amount} <button onclick="delIncome('${i.id}')">🗑️</button>`;
  });
}
function delIncome(id){
  let l=JSON.parse(localStorage.getItem("incomes")||"[]").filter(x=>x.id!==id);
  localStorage.setItem("incomes",JSON.stringify(l));
  loadIncome();loadDash();
}

/* Expenses */
function addExpense(){
  let l=JSON.parse(localStorage.getItem("expenses")||"[]");
  l.push({id:crypto.randomUUID(),name:expenseName.value,amount:+expenseAmount.value});
  localStorage.setItem("expenses",JSON.stringify(l));
  loadExpenses();loadDash();
}
function loadExpenses(){
  expenseList.innerHTML="";
  JSON.parse(localStorage.getItem("expenses")||"[]").forEach(e=>{
    expenseList.innerHTML+=`${e.name} ${e.amount} <button onclick="delExpense('${e.id}')">🗑️</button>`;
  });
}
function delExpense(id){
  let l=JSON.parse(localStorage.getItem("expenses")||"[]").filter(x=>x.id!==id);
  localStorage.setItem("expenses",JSON.stringify(l));
  loadExpenses();loadDash();
}

/* Dashboard */
function loadDash(){
  let i=JSON.parse(localStorage.getItem("incomes")||"[]");
  let e=JSON.parse(localStorage.getItem("expenses")||"[]");
  sumIncome.innerText=i.reduce((a,b)=>a+b.amount,0);
  sumExpenses.innerText=e.reduce((a,b)=>a+b.amount,0);
  sumBalance.innerText=sumIncome.innerText-sumExpenses.innerText;
}

loadIncome();loadExpenses();loadDash();]");
  sumIncome.innerText=i.reduce((a,b)=>a+b.amount,0);
  sumExpenses.innerText=e.reduce((a,b)=>a+b.amount,0);
  sumBalance.innerText=sumIncome.innerText-sumExpenses.innerText;
}

loadIncome();loadExpenses();loadDash();ment("a");
 a.href=URL.createObjectURL(new Blob([csv]));
 a.download="expenses.csv";a.click();
}
function importExcel(ev){
 let r=new FileReader();
 r.onload=()=>{let l=JSON.parse(localStorage.getItem("expenses")||"[]");
 r.result.split("\n").slice(1).forEach(x=>{
  let[d,a]=x.split(",");if(d)l.push({id:crypto.randomUUID(),name:d,amount:+a});
 });
 localStorage.setItem("expenses",JSON.stringify(l));loadExpenses();loadDash();
 };
 r.readAsText(ev.target.files[0]);
}

loadIncome();loadExpenses();loadDash();.amount,0);

  sumIncome.innerText = sumIn;
  sumExpenses.innerText = sumEx;
  sumBalance.innerText = sumIn - sumEx;
}

/* ---------- Excel ---------- */
function exportExcel() {
  const expenses = JSON.parse(localStorage.getItem("expenses") || "[]");
  let csv = "Name,Amount,Date,Category\n";
  expenses.forEach(e => csv += `${e.name},${e.amount},${e.date},${e.category}\n`);
  const blob = new Blob([csv], {type:"text/csv"});
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = "expenses.csv";
  a.click();
}

function importExcel(e) {
  const file = e.target.files[0];
  const reader = new FileReader();
  reader.onload = () => {
    const rows = reader.result.split("\n").slice(1);
    let list = JSON.parse(localStorage.getItem("expenses") || "[]");
    rows.forEach(r => {
      const [name,amount,date,category] = r.split(",");
      if (name) list.push({id:crypto.randomUUID(),name,amount:+amount,date,category});
    });
    localStorage.setItem("expenses", JSON.stringify(list));
    loadExpenses(); loadDashboard();
  };
  reader.readAsText(file);
}

/* ---------- Init ---------- */
loadIncome();
loadExpenses();
loadDashboard();
loadDashboard();
