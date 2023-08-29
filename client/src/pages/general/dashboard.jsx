import axios from 'axios';
export default function Dashboard(){
    const dashboardApiReq= async()=>{
        alert(localStorage.getItem("jwtToken"));
        const config = {
          headers: {
            'x-auth-token': localStorage.getItem('jwtToken')
          }
        };
        try {
          const response = await axios.get('http://127.0.0.1:5000/api/dashboard', config);
        } catch (error) {
          console.error(error);
        }
      }


    return (
    <div>
    <h1>Hello World</h1>
    <button onClick={dashboardApiReq}>Dashboard Request</button>
    </div>);
}