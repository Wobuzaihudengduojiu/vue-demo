import {getAllCategory} from "@/api/news";

const actions = {
    getCategoryInfo({commit}, data) {
        return new Promise((resolve, reject) => {
            getAllCategory().then((resp) => {
                resolve(resp);
            }).catch((error) => {
                reject(error);
            })
        })
    },

};

export default {
    namespaced: true,
    actions
}
