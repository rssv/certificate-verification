

// const fileToBase64 = (filename, filepath) => {
//     return new Promise(resolve => {
//       var file = new File([filename], filepath);
//       var reader = new FileReader();
//       // Read file content on file loaded event
//       reader.onload = function(event) {
//         resolve(event.target.result);
//       };
      
//       // Convert data to base64 
//       reader.readAsDataURL(file);
//     });
//   };
//   // Example call:
//   fileToBase64("result.pdf", "./result.pdf").then(result => {
//     //console.log(result);
//   });

const pdf2base64 = require('pdf-to-base64');
const sha256 = require('sha256');

const ptob = async() => {
    let str;
    try{
        str = await pdf2base64("result.pdf")
    } catch(e){
        //console.log(e)
    }

    //console.log(sha256(str));
}

ptob()


