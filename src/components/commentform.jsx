import { useState } from "react";

let CommentForm = ({ onSubmit, placeholder = "Escribe un comentario...", buttonText = "Publicar", onCancel = null }) => {
    let [valor, setValor] = useState("");

    let manejarCambio = (e) => {
        setValor(e.target.value);
    };

    let publicar = () => {
        if (!valor.trim()) return;
        onSubmit(valor);
        setValor("");
    };

    return (
        <div className="comment-form">
            <textarea
                className="comment-textarea"
                rows="3"
                value={valor}
                onChange={manejarCambio}
                placeholder={placeholder}
            />

            <div className="comment-form-actions">
                {onCancel && (
                    <button type="button" className="comment-btn secondary" onClick={onCancel}>
                        Cancelar
                    </button>
                )}
                <button type="button" className="comment-btn primary" onClick={publicar}>
                    {buttonText}
                </button>
            </div>
        </div>
    );
};

export default CommentForm;