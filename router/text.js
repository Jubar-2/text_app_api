
let array =  [1,2]
const acb = () =>{
    // return "hello";
//    return array.forEach(element => {
//         return element;
//     });
let netArry = [];

    for(let a = 0 ; a<array.length;a++){
         (async()=>{
            netArry.push(array[a]);
        })()
    }
    return netArry;
}



const x = acb();

console.log(x)