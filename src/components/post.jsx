import { useState } from "react";
import CommentForm from "./commentform.jsx";
import ListComments from "./listcomments.jsx";

const initialComments = [
    {
        id: 1,
        author: "María García",
        text: "¡Qué hermosa vista! Se ve increíble.",
        likes: 17,
        replies: [
            { id: 11, author: "Daniel", text: "Totally de acuerdo 🙌", likes: 2 }
        ]
    },
    {
        id: 2,
        author: "Carlos Ruiz",
        text: "Esto merece un like.",
        likes: 9,
        replies: []
    }
];

let Post = () => {
    let [likes, setLikes] = useState(258);
    let [shares, setShares] = useState(42);
    let [comments, setComments] = useState(initialComments);
    let [replyingTo, setReplyingTo] = useState(null);

    let handleAddComment = (text, parentId = null) => {
        if (!text || !text.trim()) return;

        let newComment = {
            id: Date.now(),
            author: "Tú",
            text: text.trim(),
            likes: 0,
            replies: []
        };

        if (parentId === null) {
            setComments((actual) => [...actual, newComment]);
        } else {
            setComments((actual) =>
                actual.map((comment) =>
                    comment.id === parentId
                        ? { ...comment, replies: [...comment.replies, newComment] }
                        : comment
                )
            );
        }

        setReplyingTo(null);
    };

    let handleLikeComment = (commentId, replyId = null) => {
        setComments((actual) =>
            actual.map((comment) => {
                if (comment.id !== commentId) return comment;

                if (replyId === null) {
                    return { ...comment, likes: comment.likes + 1 };
                }

                return {
                    ...comment,
                    replies: comment.replies.map((reply) =>
                        reply.id === replyId ? { ...reply, likes: reply.likes + 1 } : reply
                    )
                };
            })
        );
    };

    let handleShare = () => {
        setShares((actual) => actual + 1);
    };

    return (
        <div className="facebook-shell">
            <article className="facebook-post">
                <header className="post-header">
                    <div className="post-author">
                        <div className="profile-avatar">M</div>
                        <div className="profile-meta">
                            <h3>María García</h3>
                            <span>Hace 2 horas · 🌍</span>
                        </div>
                    </div>
                    <button type="button" className="post-menu">•••</button>
                </header>

                <div className="post-body">
                    <p>
                        Hoy celebrando un gran día con esta vista increíble. ¡Gracias por
                        acompañarme en este momento especial! #WeekendMode
                    </p>
                    <img
                        src="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80"
                        alt="Paisaje del post"
                        className="post-image"
                    />
                </div>

                <div className="post-stats">
                    <span>👍 {likes} Me gusta</span>
                    <span>{comments.length} comentarios</span>
                    <span>↗ {shares} compartidos</span>
                </div>

                <div className="post-actions">
                    <button type="button" className="action-btn" onClick={() => setLikes((actual) => actual + 1)}>
                        Me gusta
                    </button>
                    <button type="button" className="action-btn" onClick={() => setReplyingTo("new-comment")}>
                        Comentar
                    </button>
                    <button type="button" className="action-btn" onClick={handleShare}>
                        Compartir
                    </button>
                </div>

                <div className="comments-section">
                    <ListComments
                        comments={comments}
                        onReply={(commentId) => setReplyingTo(commentId)}
                        onLike={handleLikeComment}
                    />

                    {replyingTo && (
                        <CommentForm
                            onSubmit={(text) =>
                                handleAddComment(text, replyingTo === "new-comment" ? null : replyingTo)
                            }
                            placeholder={
                                replyingTo === "new-comment"
                                    ? "Escribe un comentario..."
                                    : "Escribe tu respuesta..."
                            }
                            buttonText={replyingTo === "new-comment" ? "Publicar" : "Responder"}
                            onCancel={() => setReplyingTo(null)}
                        />
                    )}

                    {!replyingTo && (
                        <CommentForm
                            onSubmit={(text) => handleAddComment(text, null)}
                            placeholder="Escribe un comentario..."
                            buttonText="Publicar"
                        />
                    )}
                </div>
            </article>
        </div>
    );
};

export default Post;