//output element
const output_year = document.querySelector(".output-year");
const output_month = document.querySelector(".output-month");
const output_day= document.querySelector(".output-day");
const submit_button = document.querySelector(".submit-btn");

//input element
const input_year = document.querySelector("#year");
const input_month = document.querySelector("#month");
const input_day = document.querySelector("#day");

//Error elements
let isValid= false;
const error_year = document.querySelector(".error-year");
const error_month = document.querySelector(".error-month");
const error_day = document.querySelector(".error-day");
const extremeError=document.querySelectorAll(".allError");

function day_input_error(a){
    if(a===1)
    {
        input_day.style.borderColor="red";
    document.querySelector("#day-span").style.color="red";
    }
    else {
        input_day.style.borderColor="";
        document.querySelector("#day-span").style.color="var(--Smokey-grey)";
    }
}
function month_input_error(a){
    if(a===1)
    {
    input_month.style.borderColor="red";
    document.querySelector("#month-span").style.color="red";
    }
    else{
    input_month.style.borderColor="";
    document.querySelector("#month-span").style.color="var(--Smokey-grey)";
    }
}
function year_input_error(a){
    if(a===1)
    {
    input_year.style.borderColor="red";
    document.querySelector("#year-span").style.color="red";
    }
    else{
    input_year.style.borderColor="";
    document.querySelector("#year-span").style.color="var(--Smokey-grey)";
    }
}

submit_button.addEventListener("click", CalculateDate)


//!for day input
input_day.addEventListener("input", (d)=>{

    if(+input_day.value > 31){
        error_day.textContent="Must be a valid day";
        day_input_error(1);
        isValid = false;
    }
    else {
        isValid = true;
        error_day.textContent="";
        day_input_error();
    }
    if(+input_day.value<1)
    {
        error_day.textContent="Must be a valid day";
        day_input_error(1);
        isValid=false;
    }

});

//!for month input
input_month.addEventListener("input", ()=>{
    const lastDayOfMonth = new Date(+input_year.value, +input_month.value, 0).getDate();

    
    if(+input_month.value > 12 || +input_month.value<1){
        error_month.textContent="Must be a valid month";
        month_input_error(1);
        isValid = false;
    }
    else{
        error_month.textContent="";
        month_input_error();
        isValid = true;
    }
    if(+input_day.value > lastDayOfMonth)
    {
        error_day.textContent="Must be a valid date";
        day_input_error(1);
        isValid=false;
        error_month.textContent="Must be a valid month";
        month_input_error(1);
        isValid = false;
    }
    else {
        isValid = true;
        error_month.textContent="";
        error_day.textContent="";
        day_input_error();
        month_input_error();
    }

});

//!for year input
input_year.addEventListener("input", (d)=>{
    let crnDate=new  Date();
    let crnYear= crnDate.getFullYear();

    const lastDayOfMonth = new Date(+input_year.value, +input_month.value, 0).getDate();

    if(+input_year.value > crnYear ){
        error_year.textContent="Date cannot be future";
        year_input_error(1);
        isValid = false;
    }
    else {
        isValid = true;
        error_year.textContent="";
        year_input_error();
    }
    if (+input_year.value<1000) {
        error_year.textContent="Must be a valid year";
        year_input_error(1);
        isValid=false;
        return
    }
    if(+input_year.value===0)
    {
        error_year.textContent="Must be a valid year";
        year_input_error(1);
        isValid=false;
    }
    if(+input_day.value > lastDayOfMonth)
    {
        error_year.textContent="Must be a valid year";
        year_input_error(1);
        error_day.textContent="Must be a valid date";
        day_input_error(1);
        isValid=false;
        error_month.textContent="Must be a valid month";
        month_input_error(1);
        isValid = false;
    }
    else {
        isValid = true;
        error_month.textContent="";
        error_day.textContent="";
        error_year.textContent="";
        day_input_error();
        month_input_error();
        year_input_error();
    }
    

});


function CalculateDate(){
 if (isValid) {
    const birth=new Date(`${input_month.value}/${input_day.value}/${input_year.value}`);
    const today=new Date();

    if(birth > today){
    extremeError.textContent=" Date of birth can't be in the future";
    }

    let years = today.getFullYear() - birth.getFullYear();
    let months = today.getMonth()- birth.getMonth();
    let days = today.getDate() - birth.getDate();

    if(months < 0 || (months === 0 && days <0))
    {
        years--;
        months +=12;
    }
    if(days < 0)
    {
        const lastDayOfMonth=new Date(today.getFullYear(), today.getMonth(),0).getDate();
        days = lastDayOfMonth - birth.getDate() + today.getDate();
        months--;
        if(months < 0)
        {
            months += 12;
            years--;
        }
    }
    let ageYears =years;
    let ageMonth =months;
    let ageDay =days;

    output_day.textContent=ageDay;
    output_month.textContent=ageMonth;
    output_year.textContent=ageYears;
 }
 else{
    alert("Invalid Date")
    input_day.value="";
    input_month.value="";
    input_year.value="";
    error_month.textContent="";
    error_day.textContent="";
    error_year.textContent="";
    day_input_error();
    month_input_error();
    year_input_error()

 }
}