import LoginForm from "@/app/components/form/LoginForm";

const LoginPage = () => {
  return (
    <main className="w-full h-screen min-h-screen bg-gray-900">
      <div className="w-full h-full flex flex-col items-center justify-center p-4">
        <LoginForm />
      </div>
    </main>
  )
}

export default LoginPage;