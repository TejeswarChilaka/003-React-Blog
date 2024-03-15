import { useState } from "react";
import axios from "axios";

const AddCommentForm = ({articleName,onArticleUpdated}) => {
    const [name,setName] = useState('');
    const [commentText,setCommentText] = useState('');

    const addComment = async () =>{
        const response = await axios.post(`/api/articles/${articleName}/comments`,{
            by: name,
            comment: commentText
        });

        const updatedArticle = response.data;
        onArticleUpdated(updatedArticle);
        setName('');
        setCommentText('');

    };
    return(
        <div id="add-comment-form">
            <h3>Add Comments</h3>
            <label>
                Name:
                <input
                  value={name}
                  onChange={e=>setName(e.target.value) }
                  type="text"/>
            </label>
            <label>
                Comments:
                <input
                      value={commentText}
                      onChange={e=>setCommentText(e.target.value)}
                      rows="4"
                      cols="50"/>
            </label>
            <button onClick = {addComment}>Send Comment</button>
        </div>
    )
}

export default AddCommentForm;