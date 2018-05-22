var express = require('express');

var app = express();

app.get('/messages', (req, res) => {
  console.log('Message get request');
  res.json(JSON.stringify(sampleMessages));
});

app.get('/profile/');

app.listen(3000, () => console.log('Example app listening on port 3000!'));

/*
  Message in database
  {
    id: '',
    message: '',
    author_id: '',
    timestamp: '',
    score: '',
    replies: [
      {
        id: '',
        reply: '',
        author_id: '',
        timestamp: '',
        score: ''
      }
    ]
  }
*/

const sampleMessages = [
  {
    id: 'abcdef1',
    message: 'first message',
    timestamp: new Date(new Date().getUTCMinutes() - 3),
    score: 35,
    replyCount: 0
  },
  {
    id: 'acbdef2',
    message: 'second message',
    timestamp: new Date(new Date().getUTCMinutes() - 5),
    score: 50,
    replyCount: 3
  },
  {
    id: 'acbdef3',
    message: 'third message',
    timestamp: new Date(new Date().getUTCMinutes() - 9),
    score: 22,
    replyCount: 5
  },
  {
    id: 'acbdef4',
    message:
      'tihijsflsdf  asldkjfal slkjf lsdlkf loafds lkasdljkflk jalkjdfl aslkd flaskfjl sfkldfs',
    timestamp: new Date(new Date().getUTCMinutes() - 11),
    score: 18,
    replyCount: 12
  },
  {
    id: 'abcdef5',
    message:
      '123456789 12141618 2123252729 32343638 4143454749 52545658 6163656769 72747678 8183858789 92949698 2123252729 ',
    timestamp: new Date(new Date().getUTCMinutes() - 14),
    score: 35,
    replyCount: 4
  },
  {
    id: 'acbdef6',
    message:
      '111111111 111111111 111111111 111111111 111111111 111111111 111111111 111111111 111111111 111111111 111111111 111111111 111111111 111111111 111111111 111111111 111111111 111111111 111111111 111111111 ',
    timestamp: new Date(new Date().getUTCMinutes() - 19),
    score: 50,
    replyCount: 7
  },
  {
    id: 'acbdef7',
    message:
      'asjdlk alkj aflkjsafd lka lksdj lakl skdj flk jvlkja;dlfkjas ;dl a;sldkjf ;al; dalskjf as;ldk fj;laskd jf;l a;lskdj ;flak sjdlfkj ;akld jsfk j;slvkj al;sdkfj ;al ',
    timestamp: new Date(new Date().getUTCHours() - 2),
    score: 22,
    replyCount: 10
  },
  {
    id: 'acbdef8',
    message:
      'lkjf;ds alk ;alsdkjf a;lskdj f;alka jvm,n .bmxvnb ;oijrkl; jf;aosijdfkl; jas,dj flskdj f;lad m,vncxl;kj sa;dlkjf mcv o;kajsdlk jmnv lkj; asdfn ,mc vlkj as;dlkfs m,nv l;kjsda flkjsd jl;kjsdfo;iwe',
    timestamp: new Date(new Date().getUTCHours() - 5),
    score: 18,
    replyCount: 1
  }
];
