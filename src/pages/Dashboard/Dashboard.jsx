import Card from "../../Card/Card";
import { useAuth } from "../../Context/AuthContext";
import "./Dashboard.scss";

const Dashboard = () => {
  const { currentUser } = useAuth(true);
  return (
    <>
      <Card />
      <div className="dashboard-container">{JSON.stringify(currentUser)}</div>
    </>
  );
};

export default Dashboard;
