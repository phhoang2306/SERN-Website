import db from '../models/index'

let handleGetTopDoctor = (limit) => {
    return new Promise (async(resolve, reject) => {
        try {
            let doctor = await db.User.findAll({
                limit: limit,
                where: {roleID:"R2"},
                attributes: {exclude: ['password', 'image']},
                include: [
                    {model: db.Allcode, as: 'positionData', attributes: ['valueEn', 'valueVi']},
                    {model: db.Allcode, as: 'genderData', attributes: ['valueEn', 'valueVi']}
                ],
                raw: true,
                nest: true
            });
            resolve(doctor)
        } catch(e){
            reject(e)
        }
    })
}

module.exports = {
   handleGetTopDoctor
}