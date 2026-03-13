// import MainLayout from "../layout/MainLayout";

// export default function Dashboard(){

// let user:any = {};

// try {

//   const storedUser = localStorage.getItem("user");

//   user = storedUser && storedUser !== "undefined"
//     ? JSON.parse(storedUser)
//     : {};

// } catch (error) {

//   console.error("User parse error", error);
//   user = {};

// }

// return(

// <MainLayout>

// <h1>Dashboard</h1>

// <p>Welcome {user.name || "User"}</p>

// </MainLayout>

// )

// }
import MainLayout from "../layout/MainLayout";

export default function Dashboard(){

const user = JSON.parse(localStorage.getItem("user") || "{}");

return(

<MainLayout>

<h1>Dashboard</h1>

<p>Welcome {user.name}</p>

</MainLayout>

)

}