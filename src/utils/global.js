import {MessageBox} from 'element-ui';

export function global() {

    const confirm = (param) => {
        MessageBox.confirm(param.text, '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
        }).then(() => {

            param.fn && param.fn();

            // root.$message({
            //     type: 'success',
            //     message: '删除成功!'
            // });
        }).catch(() => {
            // root.$message({
            //     type: 'info',
            //     message: '已取消删除'
            // });
        });
    };

    return{
        confirm,
    }


}
