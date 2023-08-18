const express = require('express');
const router = express();
const { singleFileUpload, multipleFileUpload } = require('../controllers/fileUploadController');
const { upload } = require('../middleware/upload');
const rateLimit = require('express-rate-limit')

const apiLimiter = rateLimit({
	windowMs: 10000, // 10 seconds
	max: 5, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
	standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers
})


router.post('/singleFile', upload.single('file'), singleFileUpload)
router.post('/multipleFiles', upload.array('files'), multipleFileUpload);
router.get('/request', apiLimiter, (req,res)=>{

    res.send('request successful')
})

module.exports = router