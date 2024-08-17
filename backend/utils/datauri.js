// import DataUriParser from 'datauri/parser.js';
// import path from 'path';

// const getDataUri = (file) =>{
//     const parser =  new DataUriParser();
//     const extName = path.extname(file.originalname).toString();
//     // console.log("extName in datauri ",extName);
//     return parser.format(extName,file.buffer);
// }

// export default getDataUri;
import DataURIParser from 'datauri/parser.js';
import path from 'path';

const parser = new DataURIParser();

const getDataUri = (file) => {
  if (!file) {
    throw new Error('File is required to generate data URI');
  }

  const extName = path.extname(file.originalname).toString();
  return parser.format(extName, file.buffer);
};

export default getDataUri;
