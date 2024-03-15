const CommentList= ({comments})=>(
    <>
    <h3>comments</h3>
    {comments.map(comment =>(
        <div className="comment" key={comment.by +':'+comment.comment}>
            <h4>{comment.by}</h4>
            <p>{comment.comment}</p>

        </div>
    ))}
    </>
);

export default CommentList;