const fs = require('fs');
const path = require('path');

// console.log(jsonData);
let count = 1;
let dbJsonArr = []
module.exports = function (app) {
    app.get('/api/notes', function (req, res) {

        const data = fs.readFileSync(path.join(__dirname, '..', 'db', 'db.json'), {
            encoding: "utf8"
        });
        // console.log('array', data);
        if (data === '') {
            return res.json([]);
        } else {
            const jsonData = JSON.parse(data);
            res.json(jsonData);
        }


    });
    app.post('/api/notes', function (req, res) {

        const noteObj = req.body;

        noteObj["id"] = count;
        const data = fs.readFileSync(path.join(__dirname, '..', 'db', 'db.json'), {
            encoding: "utf8"
        });
        // console.log(noteObj);
        if(data === '') {
            dbJsonArr.push(noteObj);
            fs.writeFileSync(path.join(__dirname, '..', 'db', 'db.json'), JSON.stringify(dbJsonArr, null, 3, ));
            dbJsonArr.length = 0;
            dbJsonArr = [];
        } else {
            const dataJson = JSON.parse(data);
            dataJson.push(noteObj);
            fs.writeFileSync(path.join(__dirname, '..', 'db', 'db.json'), JSON.stringify(dataJson, null, 3, ));
        }
        
        count++;
        // console.log(noteObj);
        res.json(noteObj);
    });
    app.delete('/api/notes/:id', function (req, res) {
        const id = Number(req.params.id);
        const data = fs.readFileSync(path.join(__dirname, '..', 'db', 'db.json'), {
            encoding: "utf8"
        });
        const dataJson = JSON.parse(data);
        dataJson.forEach((value, index) => {
            if (value.id === id) {
                dataJson.splice(index, 1);
            }
        });
        const dataArr = dataJson.map((value, index) => {
            const obj = {};
            obj['id'] = index + 1;
            obj['title'] = value.title;
            obj['text'] = value.text;
            return obj;
        });
        count = dataArr.length + 1;
        fs.writeFileSync(path.join(__dirname, '..', 'db', 'db.json'), JSON.stringify(dataArr, null, 3, ));

        res.json('Successfully Deleted Item');

    });
}