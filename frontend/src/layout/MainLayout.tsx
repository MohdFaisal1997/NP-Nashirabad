import { Layout, Menu, Button } from "antd";
import { useNavigate } from "react-router-dom";

const { Header, Content } = Layout;

export default function MainLayout({ children }: any) {

  const navigate = useNavigate();

  let user: any = {};

  try {
    const data = localStorage.getItem("user");
    if (data && data !== "undefined") {
      user = JSON.parse(data);
    }
  } catch {
    user = {};
  }

  const items = [

    {
      label: "Master",
      key: "master",
      children: [
        { label: "Users", key: "/users" },
        { label: "Settings", key: "/settings" },
        { label: "Backup", key: "/backup" },
        { label: "Bank Accounts", key: "/banks" },
        { label: "Contractors", key: "/contractors" }
      ]
    },

    {
      label: "Salary",
      key: "salary",
      children: [
        { label: "Employee", key: "/employees" }
      ]
    },

    {
      label: "Transaction",
      key: "transaction",
      children: [
        { label: "Payment Credit", key: "/payment-deposit" },
        { label: "Payment Deposit", key: "/payment-paid" },
        { label: "Payment List", key: ""}
      ]
    },

    {
      label: "Report",
      key: "report",
      children: [
        { label: "Reports", key: "/reports" },
        { label: "Namuna No.1", key: "/report" },
        // { label: "Contractor Wise", key: "/contractor-wise" },
        // { label: "Bank Account Wise", key: "/bank-wise" }
      ]
    },

    {
      label: "Help",
      key: "/help"
    }

  ];

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/", { replace: true });
  };

  return (

    <Layout style={{ minHeight: "100vh", width: "100%" }}>

      <Header style={{
        display:"flex",
        alignItems:"center",
        justifyContent:"space-between"
      }}>

         <div
    style={{
      color: "white",
      fontWeight: "bold",
      marginRight: "30px",
      cursor: "pointer"
    }}
    onClick={() => navigate("/dashboard")}
  >
    Nagar Parishad Nashirabad
  </div>

        <Menu
          theme="dark"
          mode="horizontal"
          items={items}
          onClick={(e)=>navigate(e.key)}
          style={{ flex: 1 }}
        />

        <div style={{ color:"white" }}>
          Welcome {user?.name || "User"}

          <Button
            type="primary"
            danger
            style={{ marginLeft:15 }}
            onClick={handleLogout}
          >
            Logout
          </Button>

        </div>

      </Header>

      <Content style={{ padding:"30px", width:"100%" }}>
        {children}
      </Content>

    </Layout>

  );

}