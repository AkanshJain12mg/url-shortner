const shortid = require('shortid');
const URL = require('../models/url');


//to generate shorturl
async function handleGenShortUrl(req , res){

    const body = req.body;
    if(!body) return res.status(400).json({error : 'URL is required'});

    const shortID = shortid();
    await URL.create({

        shortId :  shortID,
        redirectedURL : body.url,
        visitHistory : [],

    });
    return res.json({id: shortID});

}

//to find no. of clicks
async function handleGetAnalytics(req , res){

    const shortId  = req.params.shortId;

    const result = await URL.findOne({ shortId });

    return res.json({
        totalClicks : result.visitHistory.length ,
        analytics : result.visitHistory 
    });


}

//to open with short id
async function handleRedirectUrl(req , res){

    const shortId = req.params.shortId;
    const entry = await URL.findOneAndUpdate({
        shortId
    } , 
    { $push: {

        visitHistory :{
            timestamp: Date.now(),
        },

    }
    });

    res.redirect(entry.redirectedURL);


}

module.exports = {
    handleGenShortUrl,
    handleGetAnalytics,
    handleRedirectUrl
}