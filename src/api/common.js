import {getAllCategory} from "./news";
import {reactive, ref} from "@vue/composition-api";

export function common() {

    const categorys = reactive({
        item: [],
    });

    const getCategoryInfo = () => {
        getAllCategory({}).then(
            (resp) => {
                categorys.item = resp.data.data.category;
            }
        ).catch(
            (error) => {

            }
        );
    }

    return {
        getCategoryInfo,
        categorys
    }
}
