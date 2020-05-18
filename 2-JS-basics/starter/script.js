/* 
var markHeight = 1.80;
var markWeight = 75;
var johnHeight = 2.00;
var johnWeight = 90;

var markBMI = markWeight / (markHeight * markHeight);

var johnBMI = johnWeight / (johnHeight * johnHeight);
console.log(markBMI, johnBMI);

var markBigger = markBMI > johnBMI;
console.log('Is Mark bigger than John? ' + markBigger);
*/

/* var johnGame1 = 89;
var johnGame2 = 120;
var johnGame3 = 103;

var mikeGame1 = 89;
var mikeGame2 = 120;
var mikeGame3 = 103;

var maryGame1 = 89;
var maryGame2 = 120;
var maryGame3 = 103;

var johnTeamAv = (johnGame1 + johnGame2 + johnGame3) / 3;
var mikeTeamAv = (mikeGame1 + mikeGame2 + mikeGame3) / 3;
var maryTeamAv = (maryGame1 + maryGame2 + maryGame3) / 3;

console.log(johnTeamAv, mikeTeamAv, maryTeamAv);

if (johnTeamAv > (mikeTeamAv && maryTeamAv)) {
    console.log('John\'s team has the highest average score with ' + johnTeamAv);
} else if (mikeTeamAv > (johnTeamAv && maryTeamAv)) {
    console.log('Mike\'s team has the highest average score with ' + mikeTeamAv);
} else if (maryTeamAv > (johnTeamAv && mikeTeamAv)) {
    console.log('Mary\'s team has the highest average score with ' + maryTeamAv);
} else {
    console.log('John, Mike and Mary\'s teams have tied averages');
} */

/* function calculateTip(bill) {
    var percentage;
        if (bill < 50) {
            percentage = 0.2;
        } else if (bill >= 50 && bill < 200) 
        { 
            percentage = .15;
        } else 
        {
            percentage = .10;
        }
        
    return percentage * bill;
}

var bills = [124, 48, 268];

var tips = [calculateTip(bills[0]), calculateTip(bills[1]), calculateTip(bills[2])];

var totalBill = [tips[0] + bills[0], tips[1] + bills[1], tips[2] + bills[2]];

console.log(tips, totalBill);
 */
/* 
 var john = {
     firstName: 'John',
     height: 2,
     weight: 110,
     calcBMI: function() {
         this.BMI = this.weight / (this.height * this.height);
         return this.BMI;
     } 
 }

 var mike = {
     firstName: 'Mike',
     height: 1.8,
     weight: 96,
     calcBMI: function() {
        this.BMI = this.weight / (this.height * this.height);
        return this.BMI;
    }
 }
 
     if (john.calcBMI() > mike.calcBMI()) {
        console.log(john.firstName + ' has the highest BMI with ' + john.BMI);
     } else if (john.BMI < mike.BMI) {
        console.log(mike.firstName + ' has the highest BMI with ' + mike.BMI);
     } else {
        console.log(john.firstName + ' and ' + mike.firstName + ' have the same BMI with ' + john.BMI);
     }
 */

var johnFamily = {
    familyName: 'John\'s Family',
    bills: [124, 48, 268, 180, 42],
    calcTips: function() {
        this.tips = [];
        this.finalBill = [];


        for (var i = 0; i < this.bills.length; i++) {
            var percentage;
            var bill = this.bills[i];

            if (bill < 50) {
                percentage = 0.2;
            } else if (bill >= 50 && bill < 200) 
            { 
                percentage = .15;
            } else 
            {
                percentage = .10;
            }

            this.tips[i] = bill * percentage;
            this.finalBill[i] = bill + bill * percentage;
        }
    }
}

var markFamily = {
    familyName: 'Mark\'s Family',
    bills: [77, 5, 110, 45],
    calcTips: function() {
        this.tips = [];
        this.finalBill = [];


        for (var i = 0; i < this.bills.length; i++) {
            var percentage;
            var bill = this.bills[i];

            if (bill < 100) {
                percentage = .2;
            } else if (bill >= 100 && bill < 300) 
            { 
                percentage = .1;
            } else 
            {
                percentage = .25;
            }

            this.tips[i] = bill * percentage;
            this.finalBill[i] = bill + bill * percentage;
        }
    }
}

function calcAverage(tips) {
    var sum = 0;
    for (var i = 0; i < tips.length; i++) {
        sum = sum + tips[i];
    }
    return sum / tips.length;
}

johnFamily.calcTips();
markFamily.calcTips();

johnFamily.average = calcAverage(johnFamily.tips);
markFamily.average = calcAverage(markFamily.tips);

console.log(johnFamily, markFamily);

if (johnFamily.average > markFamily.average) {
    console.log(johnFamily.familyName + ' pays higher tips, with an average of $' + johnFamily.average);
} else if (markFamily.average > johnFamily.average) {
    console.log(markFamily.familyName + ' pays higher tips, with an average of $' + markFamily.average);
}