function GoogleLogin() {
  async function handleClick(event) {
    try {
      window.location.href = `${import.meta.env.VITE_API_URL}api/auth/google`;
    } catch (error) {
      alert(error.response.status);
    }
  }
  return (
    <div className="d-flex justify-content-center">
      <button
        className="btn btn-outline-danger mt-2 w-100 "
        onClick={handleClick}
      >
        Login with Google
      </button>
    </div>
  );
}

export default GoogleLogin;
