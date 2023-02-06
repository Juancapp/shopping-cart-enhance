import React from "react";
import "./modal.css";

function Modal({
  setIsOpen,
  handleConfirm,
  price,
  isToConfirm = true,
  handleClose,
}) {
  return (
    <>
      <div id="myModal" className="curtain"></div>
      <div className="modal-content">
        <button
          className="close"
          onClick={() => {
            if (isToConfirm) {
              setIsOpen(false);
            } else {
              handleClose();
            }
          }}
        >
          &times;
        </button>
        <h4>{isToConfirm ? "Confirm your purchase" : "Congratulations!"}</h4>
        <p>
          {isToConfirm ? `Total Price: ${price} USD` : "Purchase completed"}
        </p>
        <div className="buttons">
          <button
            className={`button ${isToConfirm && "cancel-button"}`}
            onClick={() => {
              setIsOpen(false);
              handleClose();
            }}
          >
            {isToConfirm ? "Cancel" : "Close"}
          </button>
          {isToConfirm && (
            <button
              className="button"
              onClick={() => {
                handleConfirm();
              }}
            >
              Confirm
            </button>
          )}
        </div>
      </div>
    </>
  );
}

export default Modal;
