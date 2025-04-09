import UserDashboard from "../ui/user-dashboard"
import Users from "../ui/users"

const Dashboard = () => {
  return (
    <div className="lg:px-16 md:px-8 px-4 py-28">
        <UserDashboard />
        <Users />
    </div>
  )
}

export default Dashboard