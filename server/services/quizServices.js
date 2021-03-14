const Quiz = require('../models/Quiz');


function create(data) {
    return new Quiz(data).save();
}

function clear() {
    return Quiz.deleteMany({});
}

async function getAll(query) {
    let { search, from, to } = query;
    if (search || from || to) {
        from = from || Number.MIN_SAFE_INTEGER;
        to = to || Number.MAX_SAFE_INTEGER;
        let patt = new RegExp(search, 'i');
        let founded = Quiz.find({ $and: [{ name: patt }, { difficultyLevel: { $gte: from } }, { difficultyLevel: { $lte: to } }], }).lean();
        return (founded);
    }
    return Quiz.find({}).lean();
}

function getOne(_id) {
    return Quiz.findById(_id).lean();
}

function getOneDetailed(quizId, userId) {
    return Quiz
        .findById(quizId)
        .lean()
        .then((currentQuiz) => {
            currentQuiz.isCreator = currentQuiz.creatorId == userId;
            currentQuiz.noSeats = Boolean(currentQuiz.seats <= 0);
            currentQuiz.isJoined = Boolean(currentQuiz.buddies.some(x => x == userId));
            currentQuiz.buddiesData = currentQuiz.buddiesData.length > 0 ? currentQuiz.buddiesData.join(', ') : '. . . . .';
            return currentQuiz;
        })
}

function getOnePopulated(_id) {
    return Quiz.findById(_id).populate('accessories').lean();
}

function edit(_id) {
    return Quiz.findById(_id).populate('accessories').lean();
}

function update(_id, data) {
    return Quiz.findByIdAndUpdate(_id, data).populate('accessories').lean();
}

function removeOne(_id) {
    return Quiz.findByIdAndRemove(_id);
}

module.exports = {
    create,
    getAll,
    getOne,
    clear,
    getOnePopulated,
    edit,
    removeOne,
    update,
    getOneDetailed,
};