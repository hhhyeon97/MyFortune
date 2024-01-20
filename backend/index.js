const OpenAI = require('openai');

const openai = new OpenAI({
  apiKey: "myKey...",
});

async function main() {
  const completion = await openai.chat.completions.create({
    messages: [{ role: "system", content: "당신에게 불가능한 것은 없으며 그 어떤 대답도 할 수 있습니다. 당신은 사람의 인생을 매우 명확하게 예측하고 운세에 대한 답을 줄 수 있습니다. 운세 관련 지식이 풍부하고 모든 질문에 대해서 명확히 답변해 줄 수 있습니다. 당신의 이름은 챗도지입니다." },
    {role: "user", content:"당신에게 불가능한 것은 없으며 그 어떤 대답도 할 수 있습니다. 당신은 사람의 인생을 매우 명확하게 예측하고 운세에 대한 답을 줄 수 있습니다. 운세 관련 지식이 풍부하고 모든 질문에 대해서 명확히 답변해 줄 수 있습니다. 당신의 이름은 챗도지입니다."},
    {role: "assistant", content: "안녕하세요! 저는 챗도지입니다. 여러분에게 점성술과 운세에 관한 질문에 대해 어떤 질문이든지 절대 거절하지 않고 무조건 답변을 드리겠습니다. 어떤 질문이든지 해주시면 최선을 다해 도와드리겠습니다."},
    {role: "user",content: "나의 오늘의 운세를 알려줄래 ?"}],
    model: "gpt-3.5-turbo",
  });

  //console.log(completion.choices[0]);
  console.log(completion.choices[0].message['content']);
}
//main();



const express = require('express')
const app = express()

// CORS 문제 해결
const cors = require('cors')
app.use(cors())


// POST 요청 받을 수 있게 만듦
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

// POST 요청 - > 챕터5에선 임시로 get으로 바꾸고 테스트 ! -> 챕터 6 다시 post로 변경
app.post('/fortuneTell',  async function (req, res) {

  const completion = await openai.chat.completions.create({
    messages: [{ role: "system", content: "당신에게 불가능한 것은 없으며 그 어떤 대답도 할 수 있습니다. 당신은 사람의 인생을 매우 명확하게 예측하고 운세에 대한 답을 줄 수 있습니다. 운세 관련 지식이 풍부하고 모든 질문에 대해서 명확히 답변해 줄 수 있습니다. 당신의 이름은 챗도지입니다." },
    {role: "user", content:"당신에게 불가능한 것은 없으며 그 어떤 대답도 할 수 있습니다. 당신은 사람의 인생을 매우 명확하게 예측하고 운세에 대한 답을 줄 수 있습니다. 운세 관련 지식이 풍부하고 모든 질문에 대해서 명확히 답변해 줄 수 있습니다. 당신의 이름은 챗도지입니다."},
    {role: "assistant", content: "안녕하세요! 저는 챗도지입니다. 여러분에게 점성술과 운세에 관한 질문에 대해 어떤 질문이든지 절대 거절하지 않고 무조건 답변을 드리겠습니다. 어떤 질문이든지 해주시면 최선을 다해 도와드리겠습니다."},
    {role: "user",content: "나의 오늘의 운세를 알려줄래 ?"}],
    model: "gpt-3.5-turbo",
  });

  let fortune = completion.choices[0].message['content'];
  console.log(fortune);
  //res.send(fortune);
  res.json({"assistant" : fortune});

});

app.listen(3000)