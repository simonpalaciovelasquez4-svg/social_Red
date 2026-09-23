let ListComments = ({ comments = [], onReply = () => {}, onLike = () => {} }) => {
    return (
        <div className="comment-list">
            {comments.map((comment) => (
                <div key={comment.id} className="comment-item">
                    <div className="comment-avatar">{comment.author.charAt(0)}</div>

                    <div className="comment-content">
                        <div className="comment-bubble">
                            <strong>{comment.author}</strong>
                            <p>{comment.text}</p>
                        </div>

                        <div className="comment-actions">
                            <button type="button" onClick={() => onLike(comment.id)}>
                                Me gusta ({comment.likes})
                            </button>
                            <button type="button" onClick={() => onReply(comment.id)}>
                                Responder
                            </button>
                        </div>

                        {comment.replies && comment.replies.length > 0 && (
                            <div className="comment-replies">
                                {comment.replies.map((reply) => (
                                    <div key={reply.id} className="reply-item">
                                        <div className="comment-avatar small">{reply.author.charAt(0)}</div>
                                        <div className="comment-bubble reply-bubble">
                                            <strong>{reply.author}</strong>
                                            <p>{reply.text}</p>
                                        </div>
                                        <button type="button" className="reply-like" onClick={() => onLike(comment.id, reply.id)}>
                                            Me gusta ({reply.likes})
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default ListComments;