const titbit = require('titbit');
const crypto = require('crypto');

var app = new titbit();

var {router} = app;

router.get('/wx/msg',async c =>{
    let token = 'msgtalk';

    let urlarges =[
        c.query.nonce,//随机数
        c.query.timestamp,//时间戳
        token //自己设置token
    ];

    urlarges.sort();//字典排序

    let onestr = urlarges.join('');//拼接成一个字符

    let hash = crypto.createHash('sha1');
    let sian = hash.update(onestr);//进行hash散列计算

    //转换成16进制字符串编码格式和signature对比
    //如果相同则返回随机字符串

    if(sian.digest('hex') === c.query.signature){
        c.res.body = c.query.echostr;
    }

});

app.run(8000,'localhost');

