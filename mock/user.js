import Mock from "mockjs";

Mock.mock('/dev-api/user/getUser','post',{
    'user|10':[{
        id:'@id',
        name:'@first',
        age: '@integer(1,100)',
    }]
});
