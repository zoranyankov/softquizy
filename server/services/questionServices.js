const Question = require('../models/Question');


function create(data) {
    return new Question(data).save();
}

function clear() {
    return Question.deleteMany({});
}

async function getAll(query) {
    let { search, from, to } = query;
    if (search || from || to) {
        from = from || Number.MIN_SAFE_INTEGER;
        to = to || Number.MAX_SAFE_INTEGER;
        let patt = new RegExp(search, 'i');
        let founded = Question.find({ $and: [{ name: patt }, { difficulty: { $gte: from } }, { difficulty: { $lte: to } }], }).lean();
        return (founded);
    }
    return Question.find({}).lean();
}

async function getCategories(query) {
    let founded = Question.find({}).select('category creatorId').lean();
    return (founded);
}

async function getCategory(cat) {
    console.log(cat);
    let founded = Question.find({category: cat}).lean();
    return (founded);
}

function getOne(_id) {
    return Question.findById(_id).lean();
}

function getOneDetailed(questionId, userId) {
    return Question
        .findById(questionId)
        .lean()
        .then((currentQuestion) => {
            currentQuestion.isCreator = currentQuestion.creatorId == userId;
            currentQuestion.noSeats = Boolean(currentQuestion.seats <= 0);
            currentQuestion.isJoined = Boolean(currentQuestion.buddies.some(x => x == userId));
            currentQuestion.buddiesData = currentQuestion.buddiesData.length > 0 ? currentQuestion.buddiesData.join(', ') : '. . . . .';
            return currentQuestion;
        })
}

function getOnePopulated(_id) {
    return Question.findById(_id).populate('accessories').lean();
}

function edit(_id) {
    return Question.findById(_id).populate('accessories').lean();
}

function update(_id, data) {
    return Question.findByIdAndUpdate(_id, data).populate('accessories').lean();
}

function removeOne(_id) {
    return Question.findByIdAndRemove(_id);
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
    getCategories,
    getCategory,
};