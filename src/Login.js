

import "./Login.css";

function Login() {
  const loginToSalesforce = () => {
    const clientId = "3MVG9HtWXcDGV.nHf.wvLN3RXGJS7rvfV.Hcc0oBZ7SqhMfPPxEUm6U_31THpfBKv2itoWBg4VwnTGwjvto0P";
    const redirectUri = "http://localhost:3000/callback";

    const salesforceLoginUrl =
      `https://login.salesforce.com/services/oauth2/authorize` +
      `?response_type=token` +
      `&client_id=${clientId}` +
      `&redirect_uri=${redirectUri}`;

    window.location.href = salesforceLoginUrl;
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h1>React Salesforce CRM</h1>

        <button
          className="login-btn"
          onClick={loginToSalesforce}
        >
          Login with Salesforce
        </button>
      </div>
    </div>
  );
}

export default Login;