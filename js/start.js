const main = document.querySelector('#main');
const qna = document.querySelector('#qna');
const endPoint = 12;
const result = document.querySelector('#result');
var select = [0,0,0,0,0,0,0,0,0,0,0,0];

// 결과창을 만들기 위한 함수
function calResult(){

  var result = select.indexOf(Math.max(...select));

  return result;
}

function setResult() {
  let point = calResult();

}

function goResult () {
  qna.style.WebkitAnimation = "fadeOut 1s";
  qna.style.animation = "fadeOut 1s";
    setTimeout(() => {

      result.style.WebkitAnimation = "fadeIn 1s";
      result.style.animation = "fadeIn 1s";
      setTimeout(() => {
        qna.style.display = "none";
        result.style.display = 'block';}, 450)})

  console.log(select);
  setResult();
  calResult();
}



function addAnswer(answerText, qIdx, idx)
{
  var a = document.querySelector('.answerBox');
  var answer = document.createElement('button');
  //createElement를 통해 button 요소를 document에 만들어주고
  answer.classList.add('answerList');
  //answerList 라는 class 값을 할당해줌 (classList.add)
  answer.classList.add('py-3');
  //padding 값을 설정하기 위해 jquery 사용
  answer.classList.add('fadeIn');
  a.appendChild(answer);
  //만든 버튼을 a 즉 answerBox라는 class를 가진 요소의 자식으로 넣음.
  answer.innerHTML = answerText;

  answer.addEventListener("click",function(){
    var children = document.querySelectorAll('.answerList');
    for (let i = 0 ; i < children.length; i++){
      children[i].disabled = true;
      children[i].style.WebkitAnimation = "fadeOut 0.5s";
      children[i].style.animation = "fadeOut 0.5s";
    }
    setTimeout( () => {
      var target = qnaList[qIdx].a[idx].type;
      for (let j = 0; j < target.length; j++){
        select[target[j]] += 1;
      }

      for (let i = 0 ; i < children.length; i++){
        children[i].style.display = 'none';
      }
      goNext(++qIdx);

    }, 450)
  }, false);
}



function goNext(qIdx) {
  if (qIdx === endPoint)
  {
    goResult();
    return;
  }

  var q = document.querySelector('.qBox');
  q.innerHTML = qnaList[qIdx].q;
  for (let i in qnaList[qIdx].a)
  {
    addAnswer(qnaList[qIdx].a[i].answer, qIdx, i);
  }
  var status = document.querySelector('.statusBar');
  status.style.width = (100/endPoint) * (qIdx+1) + '%';
}



function begin() {
  main.style.WebkitAnimation = "fadeOut 1s";
  main.style.animation = "fadeOut 1s";
    setTimeout(() => {

      qna.style.WebkitAnimation = "fadeIn 1s";
      qna.style.animation = "fadeIn 1s";
      setTimeout(() => {
        main.style.display = "none";
        qna.style.display = 'block';}, 450)
        let qIdx = 0;
        goNext(qIdx);
    }, 450);
}
