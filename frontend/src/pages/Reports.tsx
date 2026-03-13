// import { Card, Select, DatePicker, Button, Table, Row, Col } from "antd";
// import { useState, useEffect } from "react";
// import axios from "axios";
// import jsPDF from "jspdf";
// import autoTable from "jspdf-autotable";


// const { RangePicker } = DatePicker;
// interface ReportFilters {
//   bank_id?: string;
//   contractor_id?: string;
//   from?: string;
//   to?: string;
// }

// const ReportPage = () => {

// const [banks,setBanks] = useState([]);
// const [contractors,setContractors] = useState([]);
// const [data,setData] = useState([]);
// // const [filters,setFilters] = useState({});
// const [filters, setFilters] = useState<ReportFilters>({});

// useEffect(()=>{
// loadBanks();
// loadContractors();
// },[]);

// const loadBanks = async()=>{
// const res = await axios.get("http://localhost:5000/api/banks");
// setBanks(res.data);
// };

// const loadContractors = async()=>{
// const res = await axios.get("http://localhost:5000/api/contractors");
// setContractors(res.data);
// };

// const getReport = async () => {

// const res = await axios.get(
// "http://localhost:5000/api/report",
// {
// params:{
// bank_id: filters.bank_id || "all",
// contractor_id: filters.contractor_id || "all",
// from: filters.from,
// to: filters.to
// }
// }
// );

// setData(res.data);

// };

// const generatePDF = ()=>{

// const doc = new jsPDF("landscape");

// doc.setFontSize(16);
// doc.text("नशिराबाद नगरपरिषद नशिराबाद",120,15);

// doc.setFontSize(12);
// doc.text("कंत्राटदार नोंदवही",130,25);

// autoTable(doc,{
// startY:35,
// head:[[
// "दिनांक",
// "बँक",
// "कंत्राटदार",
// "तपशील",
// "जमा",
// "खर्च"
// ]],
// body:data.map((r:any)=>[
// r.date,
// r.bank_name,
// r.contractor_name,
// r.payment_type,
// r.account_type==="Credit"?r.amount:"",
// r.account_type==="Debit"?r.amount:""
// ]),
// styles:{fontSize:9},
// theme:"grid"
// });

// doc.save("register-report.pdf");

// };

// const columns = [

// {title:"Date",dataIndex:"date"},
// {title:"Bank",dataIndex:"bank_name"},
// {title:"Contractor",dataIndex:"contractor_name"},
// {title:"Particular",dataIndex:"payment_type"},
// {
// title:"Credit",
// render:(r:any)=>r.account_type==="Credit"?r.amount:""
// },
// {
// title:"Debit",
// render:(r:any)=>r.account_type==="Debit"?r.amount:""
// }

// ];

// return(

// <Card title="Register Report">

// <Row gutter={16} style={{marginBottom:20}}>

// <Col span={6}>

// <Select
// placeholder="Select Bank"
// style={{width:"100%"}}
// onChange={(v)=>setFilters({...filters,bank_id:v})}
// >

// <Select.Option value="all">All Banks</Select.Option>

// {banks.map((b:any)=>(
// <Select.Option key={b.id} value={b.id}>
// {b.bank_name}
// </Select.Option>
// ))}

// </Select>

// </Col>

// <Col span={6}>

// <Select
// placeholder="Select Contractor"
// style={{width:"100%"}}
// onChange={(v)=>setFilters({...filters,contractor_id:v})}
// >

// <Select.Option value="all">All Contractors</Select.Option>

// {contractors.map((c:any)=>(
// <Select.Option key={c.id} value={c.id}>
// {c.name}
// </Select.Option>
// ))}

// </Select>

// </Col>

// <Col span={6}>

// <RangePicker
// onChange={(d:any)=>{

// setFilters({
// ...filters,
// from:d[0].format("YYYY-MM-DD"),
// to:d[1].format("YYYY-MM-DD")
// });

// }}
// />

// </Col>

// <Col>

// <Button type="primary" onClick={getReport}>
// Get Report
// </Button>

// </Col>

// <Col>

// <Button onClick={generatePDF}>
// Download PDF
// </Button>

// </Col>

// </Row>

// <Table
// columns={columns}
// dataSource={data}
// rowKey="id"
// />

// </Card>

// );

// };

// export default ReportPage;

// import { Card, Select, DatePicker, Button, Table, Row, Col } from "antd";
// import { useState, useEffect } from "react";
// import axios from "axios";
// import html2canvas from "html2canvas";
// import jsPDF from "jspdf";

// const { RangePicker } = DatePicker;

// interface ReportFilters {
//   bank_id?: string;
//   contractor_id?: string;
//   from?: string;
//   to?: string;
// }

// const ReportPage = () => {

// const [banks,setBanks] = useState<any[]>([]);
// const [contractors,setContractors] = useState<any[]>([]);
// const [data,setData] = useState<any[]>([]);
// const [filters,setFilters] = useState<ReportFilters>({});

// useEffect(()=>{
// loadBanks();
// loadContractors();
// },[]);

// const loadBanks = async()=>{
// const res = await axios.get("http://localhost:5000/api/banks");
// setBanks(res.data);
// };

// const loadContractors = async()=>{
// const res = await axios.get("http://localhost:5000/api/contractors");
// setContractors(res.data);
// };

// const getReport = async () => {

// const res = await axios.get(
// "http://localhost:5000/api/report",
// {
// params:{
// bank_id: filters.bank_id || "all",
// contractor_id: filters.contractor_id || "all",
// from: filters.from,
// to: filters.to
// }
// }
// );

// setData(res.data);

// };

// const generatePDF = async ()=>{

// const element:any = document.getElementById("reportTable");

// if(!element) return;

// const canvas = await html2canvas(element);

// const imgData = canvas.toDataURL("image/png");

// const pdf = new jsPDF("landscape","mm","a4");

// const width = pdf.internal.pageSize.getWidth();
// const height = (canvas.height * width) / canvas.width;

// pdf.addImage(imgData,"PNG",0,0,width,height);

// pdf.save("नगरपरिषद-नोंदवही.pdf");

// };

// const columns = [

// {
// title:"दिनांक",
// render:(r:any)=>new Date(r.date).toLocaleDateString()
// },

// {
// title:"बँक",
// dataIndex:"bank_name"
// },

// {
// title:"कंत्राटदार",
// dataIndex:"contractor_name"
// },

// {
// title:"तपशील",
// dataIndex:"payment_type"
// },

// {
// title:"जमा",
// render:(r:any)=>r.account_type==="Credit"?r.amount:""
// },

// {
// title:"खर्च",
// render:(r:any)=>r.account_type==="Debit"?r.amount:""
// }

// ];

// return(

// <Card title="Register Report">

// <Row gutter={16} style={{marginBottom:20}}>

// <Col span={6}>

// <Select
// placeholder="Select Bank"
// style={{width:"100%"}}
// onChange={(v)=>setFilters({...filters,bank_id:v})}
// >

// <Select.Option value="all">All Banks</Select.Option>

// {banks.map((b:any)=>(
// <Select.Option key={b.id} value={b.id}>
// {b.bank_name}
// </Select.Option>
// ))}

// </Select>

// </Col>

// <Col span={6}>

// <Select
// placeholder="Select Contractor"
// style={{width:"100%"}}
// onChange={(v)=>setFilters({...filters,contractor_id:v})}
// >

// <Select.Option value="all">All Contractors</Select.Option>

// {contractors.map((c:any)=>(
// <Select.Option key={c.id} value={c.id}>
// {c.name}
// </Select.Option>
// ))}

// </Select>

// </Col>

// <Col span={6}>

// <RangePicker
// style={{width:"100%"}}
// onChange={(d:any)=>{

// if(!d) return;

// setFilters({
// ...filters,
// from:d[0].format("YYYY-MM-DD"),
// to:d[1].format("YYYY-MM-DD")
// });

// }}
// />

// </Col>

// <Col>

// <Button type="primary" onClick={getReport}>
// Get Report
// </Button>

// </Col>

// <Col>

// <Button onClick={generatePDF}>
// Download PDF
// </Button>

// </Col>

// </Row>

// <div id="reportTable">

// <h2 style={{textAlign:"center"}}>
// नशिराबाद नगरपरिषद नशिराबाद
// </h2>

// <h3 style={{textAlign:"center"}}>
// कंत्राटदार नोंदवही
// </h3>

// <Table
// columns={columns}
// dataSource={data}
// rowKey="id"
// pagination={false}
// bordered
// />

// </div>

// </Card>

// );

// };

// export default ReportPage;


// import { Card, Select, DatePicker, Button, Table, Row, Col } from "antd";
// import { useState, useEffect } from "react";
// import axios from "axios";
// import html2canvas from "html2canvas";
// import jsPDF from "jspdf";

// const { RangePicker } = DatePicker;

// interface ReportFilters {
//   bank_id?: string;
//   contractor_id?: string;
//   from?: string;
//   to?: string;
// }

// const ReportPage = () => {

// const [banks,setBanks] = useState<any[]>([]);
// const [contractors,setContractors] = useState<any[]>([]);
// const [data,setData] = useState<any[]>([]);
// const [filters,setFilters] = useState<ReportFilters>({});

// useEffect(()=>{
// loadBanks();
// loadContractors();
// },[]);

// const loadBanks = async()=>{
// const res = await axios.get("http://localhost:5000/api/banks");
// setBanks(res.data);
// };

// const loadContractors = async()=>{
// const res = await axios.get("http://localhost:5000/api/contractors");
// setContractors(res.data);
// };

// const getReport = async () => {

// const res = await axios.get(
// "http://localhost:5000/api/report",
// {
// params:{
// bank_id: filters.bank_id || "all",
// contractor_id: filters.contractor_id || "all",
// from: filters.from,
// to: filters.to
// }
// }
// );

// setData(res.data);

// };

// const generatePDF = async ()=>{

// const element:any = document.getElementById("registerPDF");

// if(!element) return;

// const canvas = await html2canvas(element,{scale:2});

// const imgData = canvas.toDataURL("image/png");

// const pdf = new jsPDF("landscape","mm","a4");

// const width = pdf.internal.pageSize.getWidth();
// const height = (canvas.height * width) / canvas.width;

// pdf.addImage(imgData,"PNG",0,0,width,height);

// pdf.save("नगरपरिषद-नोंदवही.pdf");

// };

// let balance = 0;

// const registerData = data.map((r:any)=>{

// const credit = r.account_type==="Credit"?Number(r.amount):0;
// const debit = r.account_type==="Debit"?Number(r.amount):0;

// balance = balance + credit - debit;

// return{
// ...r,
// credit,
// debit,
// balance
// };

// });

// const columns = [

// {
// title:"(1) दिनांक",
// render:(r:any)=>new Date(r.date).toLocaleDateString()
// },

// {
// title:"(2) बँक",
// dataIndex:"bank_name"
// },

// {
// title:"(3) कंत्राटदार",
// dataIndex:"contractor_name"
// },

// {
// title:"(4) तपशील",
// dataIndex:"payment_type"
// },

// {
// title:"(5) जमा",
// render:(r:any)=>r.credit
// },

// {
// title:"(6) खर्च",
// render:(r:any)=>r.debit
// },

// {
// title:"(7) शिल्लक",
// render:(r:any)=>r.balance
// }

// ];

// return(

// <Card title="Register Report">

// <Row gutter={16} style={{marginBottom:20}}>

// <Col span={6}>

// <Select
// placeholder="Select Bank"
// style={{width:"100%"}}
// onChange={(v)=>setFilters({...filters,bank_id:v})}
// >

// <Select.Option value="all">All Banks</Select.Option>

// {banks.map((b:any)=>(
// <Select.Option key={b.id} value={b.id}>
// {b.bank_name}
// </Select.Option>
// ))}

// </Select>

// </Col>

// <Col span={6}>

// <Select
// placeholder="Select Contractor"
// style={{width:"100%"}}
// onChange={(v)=>setFilters({...filters,contractor_id:v})}
// >

// <Select.Option value="all">All Contractors</Select.Option>

// {contractors.map((c:any)=>(
// <Select.Option key={c.id} value={c.id}>
// {c.name}
// </Select.Option>
// ))}

// </Select>

// </Col>

// <Col span={6}>

// <RangePicker
// style={{width:"100%"}}
// onChange={(d:any)=>{

// if(!d) return;

// setFilters({
// ...filters,
// from:d[0].format("YYYY-MM-DD"),
// to:d[1].format("YYYY-MM-DD")
// });

// }}
// />

// </Col>

// <Col>

// <Button type="primary" onClick={getReport}>
// Get Report
// </Button>

// </Col>

// <Col>

// <Button onClick={generatePDF}>
// Download PDF
// </Button>

// </Col>

// </Row>


// <div id="registerPDF" style={{padding:20,background:"#fff"}}>

// <h2 style={{textAlign:"center",marginBottom:0}}>
// नशिराबाद नगरपरिषद नशिराबाद
// </h2>

// <h3 style={{textAlign:"center",marginTop:5}}>
// कंत्राटदार नोंदवही
// </h3>

// <p style={{textAlign:"center"}}>
// कालावधी : {filters.from || "-"} ते {filters.to || "-"}
// </p>

// <Table
// columns={columns}
// dataSource={registerData}
// rowKey="id"
// pagination={false}
// bordered
// />

// </div>

// </Card>

// );

// };

// export default ReportPage;


import { Card, Select, DatePicker, Button, Table, Row, Col } from "antd";
import { useState, useEffect } from "react";
import axios from "axios";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const { RangePicker } = DatePicker;

interface ReportFilters {
  bank_id?: string;
  contractor_id?: string;
  from?: string;
  to?: string;
}

const ReportPage = () => {

const [banks,setBanks] = useState<any[]>([]);
const [contractors,setContractors] = useState<any[]>([]);
const [data,setData] = useState<any[]>([]);
const [filters,setFilters] = useState<ReportFilters>({});

useEffect(()=>{
loadBanks();
loadContractors();
},[]);

const loadBanks = async()=>{
const res = await axios.get("http://localhost:5000/api/banks");
setBanks(res.data);
};

const loadContractors = async()=>{
const res = await axios.get("http://localhost:5000/api/contractors");
setContractors(res.data);
};

const getReport = async () => {

const res = await axios.get(
"http://localhost:5000/api/report",
{
params:{
bank_id: filters.bank_id || "all",
contractor_id: filters.contractor_id || "all",
from: filters.from,
to: filters.to
}
}
);

setData(res.data);

};

const formatDate = (date:any)=>{
if(!date) return "-";
return new Date(date).toLocaleDateString("en-GB");
};

const generatePDF = async ()=>{

const element:any = document.getElementById("registerPDF");

if(!element) return;

const canvas = await html2canvas(element,{scale:2});

const imgData = canvas.toDataURL("image/png");

const pdf = new jsPDF("landscape","mm","a4");

const width = pdf.internal.pageSize.getWidth();
const height = (canvas.height * width) / canvas.width;

pdf.addImage(imgData,"PNG",0,0,width,height);

pdf.save("नगरपरिषद-नोंदवही.pdf");

};

let balance = 0;

const registerData = data.map((r:any)=>{

const credit = r.account_type==="Credit"?Number(r.amount):0;
const debit = r.account_type==="Debit"?Number(r.amount):0;

balance = balance + credit - debit;

return{
...r,
credit,
debit,
balance
};

});

const columns = [

{
title:"(1) दिनांक",
render:(r:any)=>formatDate(r.date)
},

{
title:"(2) बँक",
dataIndex:"bank_name"
},

{
title:"(3) कंत्राटदार",
dataIndex:"contractor_name"
},

{
title:"(4) तपशील",
dataIndex:"payment_type"
},

{
title:"(5) जमा",
render:(r:any)=>r.credit
},

{
title:"(6) खर्च",
render:(r:any)=>r.debit
},

{
title:"(7) शिल्लक",
render:(r:any)=>r.balance
}

];

return(

<Card title="Register Report">

<Row gutter={16} style={{marginBottom:20}}>

<Col span={6}>

<Select
placeholder="Select Bank"
style={{width:"100%"}}
onChange={(v)=>setFilters({...filters,bank_id:v})}
>

<Select.Option value="all">All Banks</Select.Option>

{banks.map((b:any)=>(
<Select.Option key={b.id} value={b.id}>
{b.bank_name}
</Select.Option>
))}

</Select>

</Col>

<Col span={6}>

<Select
placeholder="Select Contractor"
style={{width:"100%"}}
onChange={(v)=>setFilters({...filters,contractor_id:v})}
>

<Select.Option value="all">All Contractors</Select.Option>

{contractors.map((c:any)=>(
<Select.Option key={c.id} value={c.id}>
{c.name}
</Select.Option>
))}

</Select>

</Col>

<Col span={6}>

<RangePicker
style={{width:"100%"}}
format="DD/MM/YYYY"
onChange={(d:any)=>{

if(!d) return;

setFilters({
...filters,
from:d[0].format("YYYY-MM-DD"),
to:d[1].format("YYYY-MM-DD")
});

}}
/>

</Col>

<Col>

<Button type="primary" onClick={getReport}>
Get Report
</Button>

</Col>

<Col>

<Button onClick={generatePDF}>
Download PDF
</Button>

</Col>

</Row>

<div id="registerPDF" style={{padding:20,background:"#fff"}}>

<h2 style={{textAlign:"center",marginBottom:0}}>
नशिराबाद नगरपरिषद नशिराबाद
</h2>

<h3 style={{textAlign:"center"}}>
कंत्राटदार नोंदवही
</h3>

<p style={{textAlign:"center",fontSize:14}}>
अहवाल कालावधी : {formatDate(filters.from)} ते {formatDate(filters.to)}
</p>

<Table
columns={columns}
dataSource={registerData}
rowKey="id"
pagination={false}
bordered
/>

</div>

</Card>

);

};

export default ReportPage;