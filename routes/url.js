const express = require('express');
const {handleGenShortUrl , handleGetAnalytics , handleRedirectUrl} = require('../controllers/url')

const router = express.Router();


//here user will give url to us and we provide short url 
router.post('/' , handleGenShortUrl)



router.get('/:shortId' , handleRedirectUrl); //to reditrect to url

router.get('/analytics/:shortId' ,handleGetAnalytics ) //to get no. of clicks of that url



module.exports = router;