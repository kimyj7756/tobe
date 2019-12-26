import React, { Component } from 'react';
// npm install react-router-dom
import { Route, Link } from 'react-router-dom';
import './App.css';
// handlingSubmit() 에서 사용
import api from './api';
import PostView from './Components/PostView';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Fade from '@material-ui/core/Fade';
import Calendar from 'react-calendar';
import Webcam from "react-webcam";
 
const WebcamComponent = () => <Webcam />;

export class Home extends Component {
  
  constructor(props) {
    super(props)
    this.state = {
      title: "",
      content: "",
      //image: "",
      author: "",
      results: [],
    }
  }

  componentDidMount() {
    this.getPosts()
  }

  async getPosts() {
    const _results = await api.getAllPosts()
    console.log(_results)
    this.setState({results: _results.data})
  }

  handlingChange = (event) => {
    this.setState({[event.target.name]: event.target.value})    
  }

  handlingDelete = async (id) => {
    await api.deletePost(id)
    this.getPosts()
  }

  // 수정하기
  handlingUpdate = async (id) => {
    const _results = await api.getAllPosts()
    this.setState({
      results: _results.data.filter(_results.data.id == id)
    })
    await api.UpdatePost(id)
    this.setState({title: '', content: '', author: ''})
    this.getPosts()
  }

  handlingSubmit = async (event) => {
    event.preventDefault() // event의 기본적인 기능을 하지않게 함
    let result = await api.createPost(
      {
        title: this.state.title,
        content: this.state.content,
        author: this.state.author,
        // image: this.state.image,
      }
    );
    console.log("작성 완료!", result);
    this.setState({title: '', content: '', author: ''})
    this.getPosts()
  }

  render() {
    const backstyle={
      background:"white",
      
      
    }
    
    const buttonstyle={
      background:"rgba(0,80,178,0.2)",
      
    }

    const formstyle={
      background:"rgba(0,80,165,0.1)",
    }
    

    return (
      
      <div className="App">
        
        <Container maxWidth="lg">
          <div className="fixed">
          <div className="PostingSection">
            <Paper className="PostingPaper"  style={backstyle}>
              <h2>오늘의 일기</h2>
              <form className="PostingForm" onSubmit={this.handlingSubmit}>
                <TextField
                  id="outlined-name"
                  label="글 제목"
                  name="title"
                  value={this.state.title}
                  onChange={this.handlingChange}
                  margin="normal"
                  variant="outlined"
                  style={formstyle}
                />
                <TextField
                  id="outlined-name"
                  label="닉네임"
                  name="author"
                  value={this.state.author}
                  onChange={this.handlingChange}
                  margin="normal"
                  variant="outlined"
                  style={formstyle}
                />

                {/* <br /> */}

                {/* <textarea 
                  name="content"
                  value={this.state.content}
                  onChange={this.handlingChange}
                /> */}

                <TextField
                  id="outlined-name"
                  label="본문"
                  name="content"
                  multiline
                  rowsMax="4"
                  value={this.state.content}
                  onChange={this.handlingChange}
                  margin="normal"
                  variant="outlined"
                  className="outline-content"
                  style={formstyle}
                />

                {/* <br /> */}
                <Button variant="outlined" color="primary" type="submit" style={buttonstyle}>저장하기</Button>
              </form>
            </Paper>
          </div>
        </div>
        <div className="none-fixed">
          <div className="ViewSection">
            {
              this.state.results.map(
                (post) =>
                <Card className={'card'}  style={backstyle}>
                  <CardContent>
                    <Typography className={'card-title'} color="textSecondary" gutterBottom>
                      {post.id}번째 글  <div class="date">{post.created_at }</div> 
                      
                      
                      
                    </Typography>
                    <Typography variant="h5" component="h2">
                      <PostView
                      key={post.id}
                      title={post.title}
                      style={formstyle}
                      
                      />
                    </Typography>
                    <h2>{post.content}</h2>
                    <div class="date">{post.author}</div>
                    <h4></h4>
                    
                    
                   

                  </CardContent>
                  <CardActions>
                    <Button value={post.id} onClick={(event) => this.handlingDelete(post.id)} color="secondary" size="small">삭제하기</Button>
                    {/* <Button value={post.id} onClick={(event) => this.handlingUpdate(post.id)} color="secondary" size="small">수정하기</Button> */}
                    <Button value={post.id}><Link className="navButton" to="/update">수정하기</Link></Button>
                  </CardActions>
               </Card>
              )
            }
          </div>
          </div>
        </Container>
      </div>
    )
  
  }
}

// 게시글 수정하기
export class Update extends Component {

  constructor(props) {
    super(props)
    
    this.state = {
      title: "",
      content: "",
      //image: "",
      author: "",
      results: [],
    }
  }

  render() {
    const backstyle={
      background:"white",
    }
    
    const buttonstyle={
      background:"white",
    }

    const formstyle={
      background:"white",
    }

    const filestyle={
      background:"white",
      border: "solid 1px #ccc",
      borderRadius: "3px",
      height:"2rem",
    }

    return (
      <div className="App">
        <Container maxWidth="lg">
          <div className="fixed">
          <div className="PostingSection">
            <Paper className="PostingPaper"  style={backstyle}>
              <h2>오늘의 일기</h2>
              <form className="PostingForm" onSubmit={this.handlingSubmit}>
                <TextField
                  id="outlined-name"
                  label="글 제목"
                  name="title"
                  value={this.state.title}
                  onChange={this.handlingChange}
                  margin="normal"
                  variant="outlined"
                  style={formstyle}
                />
                <TextField
                  id="outlined-name"
                  label="name"
                  name="author"
                  value={this.state.author}
                  onChange={this.handlingChange}
                  margin="normal"
                  variant="outlined"
                />

                <input 
                  type="file" 
                  name="image"
                  value={this.state.image}
                  style={filestyle}
                  className="filebutton"
                  onChange={this.handlingChange}></input>

                <TextField
                  id="outlined-name"
                  label="본문"
                  name="content"
                  multiline
                  rowsMax="4"
                  value={this.state.content}
                  onChange={this.handlingChange}
                  margin="normal"
                  variant="outlined"
                  className="outline-content"
                  style={formstyle}

                />

                {/* <br /> */}
                <Button variant="outlined" color="primary" type="submit" style={buttonstyle}>수정하기</Button>
              </form>
            </Paper>
          </div>
        </div>
        </Container>
        </div>
    )
  }
}

export class Login extends Component {
  
  constructor(props){
    super(props)
    this.state = {
      id : '',
      password : '',
    }
  }

  handlingChange = (event) => {
    this.setState({[event.target.name] : event.target.value})
  }
  // handlingSubmit = () => {
  //   api.createPost()
  // }
  
  render() {
    return (
      <div>

        <h2>1, 로그인 페이지</h2>
        <h2>1, 로그인 페이지</h2>
        <h2>1, 로그인 페이지</h2>
        <h2>1, 로그인 페이지</h2>
        <h1>asdasd</h1>

      </div>
    )
  }
}

export class Cal extends Component {
  state = {
    date: new Date(),
  }
   
  onChange = date => this.setState({ date })

  render() {
    return (
      <div>
        <br></br>
        <br></br>
        <br></br>
    <Calendar
      onChange={this.onChange}
      value={this.state.date}
      
    />
    </div>
    )
  }
}
export default function FadeMenu() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Button aria-controls="fade-menu" aria-haspopup="true" onClick={handleClick}>
        Open with fade transition
      </Button>
      <Menu
        id="fade-menu"
        anchorEl={anchorEl}
        keepMounted
        open={open}
        onClose={handleClose}
        TransitionComponent={Fade}
      >
        <MenuItem onClick={handleClose}>Profile</MenuItem>
        <MenuItem onClick={handleClose}>My account</MenuItem>
        <MenuItem onClick={handleClose}>Logout</MenuItem>
      </Menu>
    </div>
  );
}

const videoConstraints = {
  width: 1280,
  height: 720,
  facingMode: "user"
};
 
const WebcamCapture = () => {
  const webcamRef = React.useRef(null);
 
  const capture = React.useCallback(
    () => {
      const imageSrc = webcamRef.current.getScreenshot();
    },
    [webcamRef]
  );
 
  return (
    <>
      <Webcam
        audio={false}
        height={720}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        width={1280}
        videoConstraints={videoConstraints}
      />
      <button onClick={capture}>Capture photo</button>
    </>
  );
};

export class WebcamCapture extends Component {
  render() {
    const videoConstraints = {
      facingMode: "user"
    };
    return <Webcam videoConstraints={videoConstraints} />;
  }
}

export class Third extends Component {
  render() {
    return (
      <div>
       <h1>내용내용</h1>
      </div>
    )
  }
}

class Item extends Component {
  render() {
    return (
      <div>
        <h3>{this.props.match.params.id}</h3>
      </div>
    )
  }
}