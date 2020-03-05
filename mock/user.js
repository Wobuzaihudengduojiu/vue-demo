import Mock from "mockjs";

Mock.mock('/user/getUser', 'post', {
    'user|10':
        [{
            id: '@id',
            name: '@first',
            age: '@integer(1,100)',
        }],
    'status': 200
});

Mock.mock('/user/login', 'post', (config) => {

    let obj=JSON.parse(config.body);
    return {
        status:200,
        data:{
            token: Mock.Random.id(),
            username: obj.username,
        }
    }
})

Mock.mock('/user/register', 'post', {
    'status': 200,
})
