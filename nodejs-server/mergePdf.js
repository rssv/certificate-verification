const pdfMerger = require('pdf-merger-js');
const path = require('path');

const merger = new pdfMerger();

const mergepdf = (async () => {
    merger.add(path.join(__dirname, 'results', 'result_20ME0003_1.pdf')); 
    merger.add(path.join(__dirname, 'results', 'result_20ME0003_2.pdf'));
    merger.add(path.join(__dirname, 'results', 'result_20ME0003_3.pdf'));
    merger.add(path.join(__dirname, 'results', 'result_20ME0003_4.pdf')); 
    
  
    await merger.save(path.join(__dirname, 'results', 'mergedresult.pdf')); //save under given name and reset the internal document
  });

mergepdf();