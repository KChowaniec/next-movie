let ids = [];

let exportedMethods = {

formatReleaseDate(movielist) {
            for (var i = 0; i < movielist.length; i++) {
                if (!movielist[i].release_date == '') {
                    let parsedDate = Date.parse(movielist[i].release_date);
                    let newDate = new Date(parsedDate);
                    movielist[i].release_date = newDate.toDateString();
                }
            }
            return movielist;
    },
    getKeywordIds(keywords) {
        let ids = [];
        for (var i = 0; i < keywords.length; i++) {
            let wordId = this.getKeywordIdByName(keywords[i]);
            wordId.then((keywordId) => {
                if (keywordId.total_results > 0) {
                    ids.push(keywordId.results[0].id);
                }
            });
        }
        return ids;
    },
    getActorIds(actors) {

        let ids = [];
        for (var i = 0; i < actors.length; i++) {
            let id = this.addId(actors[i], i, actors);
            id.then((newId) => {
                console.log(newId);
                ids.push(newId);
            });
        }

        // ids.push(id);
        console.log(ids);
        return ids;
    },

    addId(current, index, array) {
        return exportedMethods.getPersonIdByName(array[index]).then((personId) => {
            console.log(personId);
            if (personId.total_results > 0) {
                return personId.results[0].id;
            }
            else {
                return;
            }
        });
    }
};

module.exports = exportedMethods; //export methods