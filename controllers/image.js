const Clarifai = require('clarifai');
const prediction = require('../constants.js');
const app = new Clarifai.App({
    apiKey: prediction.API_KEY
});

const handlePrediction = (req, res) => {
    app.models.predict(prediction.FACE_DETECT_MODEL, req.body.input)
    .then(response => {
        res.json(response);
    })
    .catch(err => res.status(400).json(err));

}

const handleImage = db => (req, res) => {
    const { id } = req.body;
    db('users').where('id', '=', id)
    .increment('entries', 1)
    .returning('entries')
    .then(numEntries => res.json(numEntries[0]))
    .catch(err => res.status(400).json('cannot get user'));
}

module.exports = {
    handleImage: handleImage,
    handlePrediction: handlePrediction
}