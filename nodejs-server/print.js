let students = require('./student_new.json');

const mnames = ['Avinash', 'Badal', 'Chitranjan', 'Deepak', 'Ashish','Fulendra','Govind', 'Haricharan', 'Ishwar', 'Jimmy', 'Kunal', 'Lalit', 'Mohan', 'Neelakant', 'Om Prakash', 'Parimal', 'Sourav', 'Rishi', 'Saransh', 'Tushar', 'Udbhav', 'Vickey', 'Punit', 'Anil', 'Sudhanshu', 'Punit' ];
const msnames = ['Kumar', 'Raj', 'Singh', 'Pandey', 'Verma', 'Gupta', 'Soni', 'Sarkar', 'Yadav', 'Rai'];
const fnames = ['Anjali', 'Bhumika', 'Chanchal', 'Durga', 'Ella', 'Falguni', 'Gauri', 'Ishita', 'Jasmine', 'Kirti', 'Leela', 'Mahak', 'Neelam', 'Alisa', 'Preeti', 'Shushmita', 'Reema', 'Saraojini', 'Tulika', 'Ujjwala', 'Vamika', 'Palavi', 'Roshani'];
const fsnames = ['Kumari', 'Singh', 'Priyadarshani', 'Anand', 'Jain', 'Rani','Tiwari', 'Verma', 'Agarwal', 'Bharti'];

// students.forEach(s => {
//     const rn = Math.random();
//     let gender;
//     let name;
//     if(rn>=0.5){
//         gender='male';
//         name = mnames[Math.floor(Math.random()*mnames.length)] + " " + msnames[Math.floor(Math.random()*msnames.length)];
//     }
//     else{
//         gender='female';
//         name = fnames[Math.floor(Math.random()*fnames.length)] + " " + fsnames[Math.floor(Math.random()*fsnames.length)];
//     }
//     console.log(`('${s.admNo}','${name}','${gender}','${s.yearOfAdmission}'),`)
// });


// for(let i=0;i<20;i++){
//     const rn = Math.random();
//     let gender;
//     let name;
//     if(rn>=0.5){
//         gender='male';
//         name = mnames[Math.floor(Math.random()*mnames.length)] + " " + msnames[Math.floor(Math.random()*msnames.length)];
//     }
//     else{
//         gender='female';
//         name = fnames[Math.floor(Math.random()*fnames.length)] + " " + fsnames[Math.floor(Math.random()*fsnames.length)];
//     }
//     const rn2 = Math.random();
//     let role;
//     if(rn2<0.5){
//         role = "Assistant Professor";
//     } else if(rn2<0.8){
//         role = "Associate Professor";
//     }
//     else role = "Professor";
//     console.log(`('${name}','${gender}','teaching','${role}'),`);
// }

console.log(Math.random()*6.66);
console.log(Math.random()*13.33);
console.log(Math.random()*20);