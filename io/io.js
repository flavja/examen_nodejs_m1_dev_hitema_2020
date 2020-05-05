const fs = require('fs');
module.exports.decodeHexFileContent = (filePath) =>  {
    return new Promise((resolve, reject) => {
        let content = fs.readFileSync(filePath, 'utf8');
        let convert =  Buffer.from(content, 'hex').toString('utf8');
        resolve(convert);
    });
}
