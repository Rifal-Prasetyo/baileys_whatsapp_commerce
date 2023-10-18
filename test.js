const test = [
    {
        name: "bogeng",
        alamat: "krasak"

    },
    {
        name: "haii",
        alamat: "krasak"

    }
    
]

const mapping = test.filter(check);
function check(number, index) {
    console.log(number.name == "bogeng");
    console.log(index);
}
// let coba = {
//     name: 'apa sih',
//     alamat: 'srikandang'
// }

// console.log(test);
// let coy = test.map((m, index) => m.name).filter(m => m == 'sia');
// console.log(coy);
// import { writeFile, readFile } from 'fs';
// import { checkDate, checkNumber } from './service/json-service.js';
// const data = { name: 'bogeng', age: 30, city: 'New York' };

// // readFile('data.json', (err, data) => {
// //     if(err) throw err;
// //     let json = JSON.parse(data);
// //     json.push({ name: 'opo', age: 30, city: 'New York' });

// //     writeFile('data.json', JSON.stringify(json), (err) => {
// //         if (err) throw err;
// //         console.log('Data written to file');
// //       });

// // })

// readFile('data.json', async  (err, data) => {
// let json = JSON.parse(data);
//  console.log( await json);
// }
// );

// import { writeNumber, checkNumber } from "./service/json-service.js";
// // writeNumber(76);
// checkNumber(76);

// setTimeout(() => {
//     readFile('data.json', async  (err, data) => {
//     let json = JSON.parse(data);
//     console.log( await json[0]);
//     }
//     );
// }, 2000);
// console.log(checkDate(6668));