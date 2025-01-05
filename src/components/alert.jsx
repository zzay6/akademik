const Alert = ({ type, message, handleClose }) => {
  if (type == "warning")
    return (
      <>
        <div
          className={`fixed top-16 w-full bg-yellow-200 px-4 py-2 rounded shadow text-yellow-600`}
          style={{
            maxWidth: "430px",
          }}
        >
          <div className="flex justify-between">
            <p>{message || "No message"}</p>
            {handleClose && (
              <button onClick={handleClose}>
                <i className="fas fa-times"></i>
              </button>
            )}
          </div>
        </div>
      </>
    );

  if (type == "info")
    return (
      <>
        <div
          className={`fixed top-16 w-full bg-blue-200 px-4 py-2 rounded shadow text-blue-600`}
          style={{
            maxWidth: "430px",
          }}
        >
          <div className="flex justify-between">
            <p>{message || "No message"}</p>
            {handleClose && (
              <button onClick={handleClose}>
                <i className="fas fa-times"></i>
              </button>
            )}
          </div>
        </div>
      </>
    );

  if (type == "error")
    return (
      <>
        <div
          className={`fixed top-16 w-full bg-red-200 px-4 py-2 rounded shadow text-red-600`}
          style={{
            maxWidth: "430px",
          }}
        >
          <div className="flex justify-between">
            <p>{message || "No message"}</p>
            {handleClose && (
              <button onClick={handleClose}>
                <i className="fas fa-times"></i>
              </button>
            )}
          </div>
        </div>
      </>
    );

  return (
    <>
      <div
        className={`fixed top-16 w-full bg-green-200 px-4 py-2 rounded shadow text-green-600`}
        style={{
          maxWidth: "430px",
        }}
      >
        <div className="flex justify-between">
          <p>{message || "No message"}</p>
          {handleClose && (
            <button onClick={handleClose}>
              <i className="fas fa-times"></i>
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default Alert;
