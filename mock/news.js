import Mock from 'mockjs';

Mock.mock('/news/addCategory', 'post', (config) => {
        let obj = JSON.parse(config.body);
        return {
            status: 200,
            data: {
                token: Mock.Random.id(),
                category: obj.category,
                message: '添加成功!'
            }
        }
    }
);

Mock.mock('/news/getCategory', 'get', {
    status: 200,
    data: {
        category: [{
            id:1,
            category_name: '国际信息',
            children: [
                {
                    category_name: '国际信息',
                },
                {
                    category_name: '国际信息',
                }
            ]
        },
            {
                id:2,
                category_name: '国外信息',
                children: [
                    {
                        category_name: '国际信息',
                    },
                    {
                        category_name: '国际信息',
                    }
                ]
            }]
    }
});
