const SingleFile = require('../models/fileUploadModel')
const MultipleFile = require('../models/multipleFileUploadModel')

//post request to save single file
const singleFileUpload = async (req, res) => {
    console.log(req.body)
    try {
        const file = await SingleFile.create({ // save to db
            fileName: req.file.originalname,
            filePath: req.file.path,
            fileType: req.file.mimetype,
            fileSize: fileSizeFormatter(req.file.size, 2)
        })
        res.status(201).send(file);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

//post request to save multiple files
const multipleFileUpload = async (req, res) => {
    console.log(req.files[0])
    try {
        let filesArray = [];
        req.files.forEach(element => { // save to db
            const file = {
                fileName: element.originalname,
                filePath: element.path,
                fileType: element.mimetype,
                fileSize: fileSizeFormatter(element.size, 2)
            }
            filesArray.push(file);
        });
        const multipleFiles = new MultipleFile({
            // title: req.body.title,
            files: filesArray
        });
        await multipleFiles.save();
        res.status(201).send('Files Uploaded Successfully');
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const fileSizeFormatter = (bytes, decimal) => {
    if (bytes === 0) {
        return '0 Bytes';
    }
    const dm = decimal || 2;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'YB', 'ZB'];
    const index = Math.floor(Math.log(bytes) / Math.log(1000));
    return parseFloat((bytes / Math.pow(1000, index)).toFixed(dm)) + ' ' + sizes[index];

}

module.exports = { singleFileUpload, multipleFileUpload }