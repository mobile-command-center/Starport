import * as Busboy from 'busboy';

//lambda-multipart-parser 를 frok 떠서 개발

const BodyParser = (event) => new Promise((resolve, reject) => {
    const busboy = new Busboy({
        headers: {
            'content-type': event.headers['content-type'] || event.headers['Content-Type']
        }
    });
    const result = {
        files: []
    };

    busboy.on('file', (fieldname, file, filename, encoding, mimetype) => {
        const uploadFile: any = {
            
        };

        file.on('data', data => {
            uploadFile.content = data;
        });

        file.on('end', () => {
            if (uploadFile.content) {
                uploadFile.filename = filename;
                uploadFile.contentType = mimetype;
                uploadFile.encoding = encoding;
                uploadFile.fieldname = fieldname;
                result.files.push(uploadFile);
            }
        });
    });

    //커스터 마이징한 부분
    busboy.on('field', (fieldname, value) => {
        if(!result[fieldname]) {
            result[fieldname] = value;
        } else {
            if(!Array.isArray(result[fieldname])) {
                const temp = result[fieldname];
                result[fieldname] = [];
                result[fieldname].push(temp);
            } 

            result[fieldname].push(value);
        }
    });

    busboy.on('error', error => {
        reject(error);
    });

    busboy.on('finish', () => {
        resolve(result);
    });

    busboy.write(event.body, event.isBase64Encoded ? 'base64' : 'binary');
    busboy.end();
});

export default BodyParser;