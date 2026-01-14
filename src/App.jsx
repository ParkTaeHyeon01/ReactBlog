import { useState } from 'react';
import './App.css';

function App() {

  let post = '강남 우동 맛집';
  let [글제목, 글제목변경] = useState(['남자코트 추천', '강남 우동맛집', '파이썬독학']);
  let [좋아요, 좋아요변경] = useState([0, 0, 0]);
  let [modal, setModal] = useState(false);
  let [title, setTitle] = useState(0);
  let [입력값, 입력값변경] = useState('');
  let [date, setDate] = useState(['1월 9일 발행', '1월 9일 발행', '1월 9일 발행']);

  const addPost = () => {
    if (입력값.trim() === '') return;

    let copy;
    copy = [...글제목]
    copy.unshift(입력값);
    글제목변경(copy);

    copy = [...좋아요];
    copy.unshift(0);
    좋아요변경(copy);

    copy = [...date];
    copy.unshift(getDate());
    setDate(copy);

    입력값변경('');

    setModal(false);
    setTitle(0);
  };

  return (
    <div className="App">
      <div className="black-nav">
        <h4>ReactBlog</h4>
      </div>
      {
        글제목.map(function (a, i) {
          return (
            <div className="list" key={i}>
              <h4
                onClick={() => {
                  // 같은 글 다시 누르면 닫힘, 다른 글 누르면 그 글로 이동
                  if (modal && title === i) setModal(false);
                  else { setTitle(i); setModal(true); }
                }}
              >
                {글제목[i]}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    let copy = [...좋아요];
                    copy[i]++;
                    좋아요변경(copy);
                  }}
                >
                  👍
                </button>
                {좋아요[i]}
              </h4>

              <p>{date[i]}</p>

              <button
                onClick={() => {
                  let copy;

                  copy = [...글제목]; copy.splice(i, 1); 글제목변경(copy);
                  copy = [...좋아요]; copy.splice(i, 1); 좋아요변경(copy);
                  copy = [...date]; copy.splice(i, 1); setDate(copy);

                  if (title === i) setModal(false);
                }}
              >
                삭제
              </button>

              {modal && title === i ? (
                <Modal title={title} 글제목={글제목} 글제목변경={글제목변경} />
              ) : null}
            </div>
          );
        })
      }


      <div className="inputbox">
        <input
          className="input"
          value={입력값}
          onChange={(e) => 입력값변경(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") addPost();
          }}
        />
        <button onClick={addPost}>글발행</button>
      </div>
    </div>
  );
}

function Modal(props) {
  return (
    <div className="modal">
      <h4>{props.글제목[props.title]}</h4>
      <p>날짜</p>
      <p>상세내용</p>
      <button onClick={() => { let copy = [...props.글제목]; copy[0] = '여자 코트 추천'; props.글제목변경(copy); }}>글수정</button>
    </div>
  );
}

function getDate() {
  let today = new Date();
  let month = today.getMonth() + 1
  let day = today.getDate()
  let dateString = month + '월 ' + day + '일 발행'
  return dateString
}

export default App
