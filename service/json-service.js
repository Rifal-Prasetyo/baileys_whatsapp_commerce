import { json } from 'express';
import { writeFile, readFile } from 'fs';
const data = { name: 'bogeng', age: 30, city: 'New York' };

// readFile('data.json', (err, data) => {
//     if(err) throw err;
//     let json = JSON.parse(data);
//     json.push({ name: 'opo', age: 30, city: 'New York' });

//     writeFile('data.json', JSON.stringify(json), (err) => {
//         if (err) throw err;
//         console.log('Data written to file');
//       });

// })
export function writeNumber(noWa, time, name) {
    const datenow = new Date();
    readFile('data.json', (err, data) => {
        if(err) throw err;
        const dataJSON = JSON.parse(data);
        const checkifhasregistered = dataJSON.filter((f) => {
            f.number == noWa
        });
        if(!checkifhasregistered[0]) {
            checkifhasregistered.time = datenow.getTime();
        } else {
            dataJSON.push(
                {
                    name: name,
                    number: noWa,
                    time: time
                }
            )
            
            writeFile('data.json', JSON.stringify(dataJSON), (err) => {
                if(err) throw err;
                console.log("Ada Pengguna Baruuuu bernama " + name);
            })
        }
        

    })
}
export  function checkNumber(noWa, result) {
    const tanggal = new Date();
    readFile('data.json', (err, data) => {
        if(err) throw err;
        const dataJSON = JSON.parse(data);
        const check = dataJSON.filter(f => f.number == noWa);
        console.log(check);

        if(check[0].time + 172800 < tanggal.getTime()) {
            result(true);
        } else {
            result(false);
        }
        
    })
}
export function checkDate(noWa) {
    readFile('data.json', (err, data) => {
        if(err) throw err;
        const cek = noWa;
        const dataJSON = JSON.parse(data);
        const check = dataJSON;
        console.log(check);
        
    });
}
// readFile('data.json', async  (err, data) => {
// let json = JSON.parse(data);
//  console.log( await json);
// }
// );