import Button from 'react-bootstrap/Button';

export function Login() {
    const handleLogin = () => {
        window.location.href = 'http://localhost:3000/auth/google';
    };

    return (
        <div className="text-center mt-5">
            <h1>Sign in</h1>
            <Button onClick={handleLogin} variant="primary">
                Sign in with Google
            </Button>
        </div>
    )
}

export default Login;
