const handleImage = (req, res, db) => {
    const { id } = req.body;
    db('users').where('id', '=', id)
    .increment('entries', 1)
    .returning('entries')
    .then(entries => {
        res.json(entries[0].entries);
    })
    .catch(err => res.status(400).json('Unable to get entries.'))
}

const handleApiCall = (req, res) => {
    const PAT = '38009da47ba64169ab61e887b26b4818';
    const USER_ID = 'kilian';       
    const APP_ID = 'smartbrain';
    const MODEL_ID = 'face-detection';
    const { imageURL } = req.body;

    const raw = JSON.stringify({
        "user_app_id": {
            "user_id": USER_ID,
            "app_id": APP_ID
        },
        "inputs": [
            {
                "data": {
                    "image": {
                        "url": imageURL
                    }
                }
            }
        ]
    });

    const requestOptions = {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Authorization': 'Key ' + PAT,
            'Content-Type': 'application/json',
        },
        body: raw
    };

    fetch("https://api.clarifai.com/v2/models/" + MODEL_ID + "/outputs", requestOptions)
        .then(response => response.json())
        .then(data => res.json(data))
        .catch(error => res.status(400).json('Unable to work with API'))
};

module.exports = {
    handleImage,
    handleApiCall
}