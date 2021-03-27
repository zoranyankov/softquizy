const Result = require('../models/Result');

function createResult(data) {
    return new Result(data).save();
}

async function getOneByUserId(userId) {
    // user = user.toLowerCase(); // first option
    return Result.find({ creatorId: userId })
        .then((results) => {
            if (!results) {
                // return { errors: [{ message: 'Wrong User or Password!' }] };
                return { error : { message: 'Wrong User or Password!' }};
                // return false;
            }
            return results;
        })
}

// function clear() {
//     return Result.deleteMany({});
// }

async function getAllResults(query) {
    // let { search, from, to } = query;
    // if (search || from || to) {
    //     from = from || Number.MIN_SAFE_INTEGER;
    //     to = to || Number.MAX_SAFE_INTEGER;
    //     let patt = new RegExp(search, 'i');
    //     let founded = Result.find({ $and: [{ name: patt }, { difficulty: { $gte: from } }, { difficulty: { $lte: to } }], }).lean();
    //     return (founded);
    // }
    return Result.find({}).lean();
}

// async function getCategories(query) {
//     let founded = Result.find({}).select('category creatorId').lean();
//     return (founded);
// }

// async function getCategory(cat) {
//     console.log(cat);
//     let founded = Result.find({category: cat}).lean();
//     return (founded);
// }

// function getOne(_id) {
//     return Result.findById(_id).lean();
// }

// function getOneDetailed(questionId, userId) {
//     return Result
//         .findById(questionId)
//         .lean()
//         .then((currentQuestion) => {
//             currentQuestion.isCreator = currentQuestion.creatorId == userId;
//             currentQuestion.noSeats = Boolean(currentQuestion.seats <= 0);
//             currentQuestion.isJoined = Boolean(currentQuestion.buddies.some(x => x == userId));
//             currentQuestion.buddiesData = currentQuestion.buddiesData.length > 0 ? currentQuestion.buddiesData.join(', ') : '. . . . .';
//             return currentQuestion;
//         })
// }

// function getOnePopulated(_id) {
//     return Result.findById(_id).populate('userAnswers').lean();
// }

// function edit(_id) {
//     return Result.findById(_id).populate('userAnswers').lean();
// }

// function update(_id, data) {
//     return Result.findByIdAndUpdate(_id, data).populate('userAnswers').lean();
// }

// function removeOne(_id) {
//     return Result.findByIdAndRemove(_id);
// }

module.exports = {
    createResult,
    getAllResults,
    getOneByUserId,
    // getOne,
    // clear,
    // getOnePopulated,
    // edit,
    // removeOne,
    // update,
    // getOneDetailed,
    // getCategories,
    // getCategory,
};