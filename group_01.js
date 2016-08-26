var atticus = ["Atticus", "2405", "47000", 3];
var jem = ["Jem", "62347", "63500", 4];
var boo = ["Boo", "11435", "54000", 3];
var scout = ["Scout", "6243", "74750", 5];

var employees = [atticus, jem, boo, scout];

//in emp# & review
var bonusGenerator = function(employee){
  var empNum = employee[1];
  var salary = employee[2];
  var review = employee[3];
  var bonusPercentage = 0;
  if (empNum.length >= 4){
    bonusPercentage += 5;
  }
  switch (review) {
    case 5:
      bonusPercentage += 10;
      break;
    case 4:
      bonusPercentage += 6;
      break;
    case 3:
      bonusPercentage += 4;
      break;
    case 2:
    case 1:
    //This will wipe the 'seniority' bonus if necessary
      bonusPercentage = 0;
      break;
    default:
      console.log('Check review score, not 1 - 5');
  }
  if (salary > 65000 && bonusPercentage > 0){
    bonusPercentage -= 1;
  }
  if (bonusPercentage > 13) {
    bonusPercentage = 13;
  }
  return bonusPercentage;
};
// for (var i = 0; i < employees.length; i++) {
//   console.log(bonusGenerator(employees[i]));
// }

var compensationArray = function(employeeArray){
  var newArray = [];
  for (var i = 0; i < employeeArray.length; i++) {
    var compensation = [];
    compensation.push(employeeArray[i][0]);
    //bonus%
    var bonus = bonusGenerator(employeeArray[i]);
    compensation.push(bonus + '%');
    //salary + bonus in $$
    var salary = parseInt(employeeArray[i][2]);
    console.log('salary: ', salary);
    var totalComp = salary + salary * (bonus/100);
    console.log('totalComp: ', totalComp);
    var splitSalary = String(totalComp).split('.');
    console.log('splitSalary: ', splitSalary);
    //if salary is a float, add or truncate to 2 decimals
    if (splitSalary[1]){
      while (splitSalary[1].length < 2) {
        splitSalary[1] += '0';
      }
      if (splitSalary[1].length > 2) {
        splitSalary[1] = splitSalary[1].slice(0,2);
      }
      totalComp = splitSalary.join('.');
    }
    else {
      totalComp += '.00';
    }
    compensation.push('$' + (totalComp));//bonus/100 creates bonus as a percentage for Maths
    //bonus in rounded $$
    compensation.push('$' + parseInt(salary * (bonus/100)) + '.00');
    //push compensation for single employee to newArray
    newArray.push(compensation);
  }
  //return new array
  return newArray;
};
//out - Bonus %
var salaryArray = compensationArray(employees);
console.log(salaryArray);


var displayCompensation = function(){
  var displayString = '';
  document.getElementById('displayArea').innerHTML = '';
  for (var i = 0; i < salaryArray.length; i++) {
    var employee = salaryArray[i];
    var employeeName = document.getElementById('nameIn').value;
    if (employee[0].toUpperCase() === employeeName.toUpperCase()) {
      for (var j = 0; j < employee.length; j++) {
        displayString += '<p>' + employee[j] + '</p>';
      }
    }

  }
  document.getElementById('nameIn').value = '';
  document.getElementById('displayArea').innerHTML = displayString;
};



//OBNOXIOUS

// for (var i = 0; i < salaryArray.length; i++) {
//   var employee = salaryArray[i];
//   for (var j = 0; j < employee.length; j++) {
//     alert(employee[j]);
//   }
// }
