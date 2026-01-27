function LoginForm({
  email,
  password,
  authError,
  authLoading,
  isDisabled,
  authMode,
  onModeChange,
  onEmailchange,
  onPasswordChange,
  onSubmit,
  signupMessage,
}) {
  return (
    <div>
      <h1>
        {signupMessage
          ? "Signup Successful🥂, Now Login"
          : authMode === "login"
            ? "Login"
            : "Sign Up"}
      </h1>

      <form onSubmit={onSubmit}>
        <input
          type="email"
          placeholder="johnDoe@gmail.com"
          value={email}
          onChange={(e) => onEmailchange(e.target.value)}
        />

        <input
          type="password"
          placeholder="password"
          value={password}
          onChange={(e) => onPasswordChange(e.target.value)}
        />

        <button type="submit" disabled={isDisabled || authLoading}>
          {authLoading
            ? "Please wait..."
            : authMode === "login"
              ? "Login"
              : "Sign Up"}
        </button>
      </form>

      {authError && <p className="error">{authError}</p>}

      <p style={{ marginTop: "12px" }}>
        {authMode === "login" ? (
          <>
            Don’t have an account?{" "}
            <button
              type="button"
              className="secondary"
              onClick={() => onModeChange("signup")}
            >
              Sign up
            </button>
          </>
        ) : (
          <>
            Already have an account?{" "}
            <button
              type="button"
              className="secondary"
              onClick={() => onModeChange("login")}
            >
              Login
            </button>
          </>
        )}
      </p>
    </div>
  );
}

export default LoginForm;
