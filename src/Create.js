import React, {useState} from 'react';
import axios from 'axios';
import Nav from './Nav';
import ReactQuill from 'react-quill';
import { getUser, getToken } from './helpers';
import 'react-quill/dist/quill.bubble.css';


const Create = () => {

    //STATE
    const [state, setState] = useState({
        title: '',
        user: getUser()
    });

    const [content, setContent] = useState('');

    const handleContent = (event) => {
        //console.log(event);

        setContent(event);
    }

    //Destructure values from STATE
    const {title, user} = state;

    //Onchange

    const handleChange = (name) => (event) => {

        //console.log('name', name, 'event', event.target.value);
        setState({...state, [name]: event.target.value});
    };


    const handleSubmit = event => {
        event.preventDefault();
        //console.table({title, content, user});
        
        console.log(process.env.REACT_APP_API);
        axios
        .post(`${process.env.REACT_APP_API}/post`, {title, content, user}, 
        {
            headers: {
                authorization: `Bearer ${getToken()}`
            }
        })
        .then(response => {
            console.log(response);
            //Empty the State 
            setState({...state, title: '', user: ''});
            setContent('');
            //Success alert
            alert(`Post titled ${response.data.title} is created`);

        })
        .catch(error => {
            console.log(error.response);
            alert(error.response.data.error);
        });
    };

    return (

  <div className="Container pb-5">
    <Nav />
    <br />
    <h1>Create Post</h1>
    <br/>



    <form onSubmit={handleSubmit}>
        <div className="form-group">
            <label className="text-muted">Title</label>
            <input onChange={handleChange('title')} value={title} type="text" className="form-control" placeholder="Post Title" required/>

        </div>
        <div className="form-group">
            <label className="text-muted">Content</label>
            <ReactQuill
                onChange={handleContent} value={content}
                 theme="bubble"
                 className="pb-5 mb-3"
                  placeholder="Write Something.."
                style={{ border: '1px solid #666'}}
             />
            
        </div>
        <div className="form-group">
            <label className="text-muted">User</label>
            <input onChange={handleChange('user')} value={user} type="text" className="form-control" placeholder="Your Name" required/>

        </div>
        <div>
            <button className="btn btn-primary">Create</button>
        </div>
    </form>
  </div>
);
};

export default Create;

