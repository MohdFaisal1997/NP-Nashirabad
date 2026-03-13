import { useEffect, useState } from "react";
import { Card, Table, Button, Input, Modal, Form, message, Popconfirm, Select } from "antd";
import MainLayout from "../layout/MainLayout";
import api from "../api/api";

import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const { Option } = Select;

export default function Employees(){

const [employees,setEmployees] = useState<any[]>([]);
const [loading,setLoading] = useState(false);

const [search,setSearch] = useState("");

const [selectedRowKeys,setSelectedRowKeys] = useState<number[]>([]);

const [open,setOpen] = useState(false);

const [form] = Form.useForm();

const [editingEmployee,setEditingEmployee] = useState<any>(null);


/* BANK LIST */

const banks = [
"SBI",
"HDFC Bank",
"ICICI Bank",
"Axis Bank",
"Bank of Baroda",
"Union Bank",
"Punjab National Bank",
"Canara Bank"
];


/* FETCH DATA */

const fetchEmployees = async ()=>{

try{

setLoading(true);

const res = await api.get("/employees");

setEmployees(res.data);

}catch(err){

console.log(err);

}finally{

setLoading(false);

}

};


useEffect(()=>{

fetchEmployees();

},[]);



/* SEARCH */

const filteredEmployees = employees.filter((e:any)=>{

const s = search.toLowerCase();

return(

e.name?.toLowerCase().includes(s) ||

e.contact?.includes(s) ||

e.designation?.toLowerCase().includes(s)

);

});



/* ROW SELECT */

const rowSelection = {

selectedRowKeys,

onChange:(keys:any)=>{

setSelectedRowKeys(keys);

}

};



/* SAVE */

const handleSave = async ()=>{

try{

const values = await form.validateFields();

if(editingEmployee){

await api.put(`/employees/${editingEmployee.id}`,values);

message.success("Employee updated");

}else{

await api.post("/employees",values);

message.success("Employee added");

}

setOpen(false);

setEditingEmployee(null);

form.resetFields();

fetchEmployees();

}catch(err){

console.log(err);

}

};



/* EDIT */

const handleEdit = ()=>{

const employee = employees.find((e:any)=>e.id===selectedRowKeys[0]);

if(!employee) return;

setEditingEmployee(employee);

form.setFieldsValue(employee);

setOpen(true);

};



/* DELETE */

const handleDelete = async ()=>{

try{

for(const id of selectedRowKeys){

await api.delete(`/employees/${id}`);

}

message.success("Employee deleted");

setSelectedRowKeys([]);

fetchEmployees();

}catch(err){

message.error("Delete failed");

}

};



/* EXPORT EXCEL */

const handleExportExcel = ()=>{

const data = filteredEmployees.map((e:any,index:number)=>({

"Sr": index+1,
Name: e.name,
Contact: e.contact,
Designation: e.designation,
Email: e.email,
Salary: e.salary,
Bank: e.bankName,
Account: e.bankAccount,
IFSC: e.ifsc

}));

const ws = XLSX.utils.json_to_sheet(data);

const wb = XLSX.utils.book_new();

XLSX.utils.book_append_sheet(wb,ws,"Employees");

XLSX.writeFile(wb,"employees.xlsx");

};



/* EXPORT PDF */

const handleExportPDF = ()=>{

const doc = new jsPDF();

doc.text("Employee Report",14,15);

const columns = [
"Sr",
"Name",
"Contact",
"Designation",
"Email",
"Salary",
"Bank"
];

const rows = filteredEmployees.map((e:any,index:number)=>[
index+1,
e.name,
e.contact,
e.designation,
e.email,
e.salary,
e.bankName
]);

autoTable(doc,{
head:[columns],
body:rows,
startY:20
});

doc.save("employees.pdf");

};



/* TABLE */

const columns = [

{
title:"Sr",
render:(_:any,__:any,index:number)=>index+1
},

{
title:"Name",
dataIndex:"name"
},

{
title:"Contact",
dataIndex:"contact"
},

{
title:"Designation",
dataIndex:"designation"
},

{
title:"Email",
dataIndex:"email"
},

{
title:"Salary",
dataIndex:"salary"
},

{
title:"Bank",
dataIndex:"bankName"
}

];



return(

<MainLayout>

<Card title="Employees">

<div style={{display:"flex",gap:10,marginBottom:20}}>

<Button
type="primary"
onClick={()=>{
setEditingEmployee(null);
form.resetFields();
setOpen(true);
}}
>
Add
</Button>

<Button
disabled={selectedRowKeys.length!==1}
onClick={handleEdit}
>
Edit
</Button>

<Popconfirm
title="Delete employee?"
onConfirm={handleDelete}
>

<Button
danger
disabled={selectedRowKeys.length===0}
>
Delete
</Button>

</Popconfirm>

<Button onClick={handleExportExcel}>
Excel
</Button>

<Button onClick={handleExportPDF}>
PDF
</Button>

</div>


<Input.Search
placeholder="Search employee"
style={{width:300,marginBottom:20}}
onChange={(e)=>setSearch(e.target.value)}
/>


<Table
rowSelection={rowSelection}
columns={columns}
dataSource={filteredEmployees}
rowKey="id"
loading={loading}
/>



<Modal
title={editingEmployee?"Edit Employee":"Add Employee"}
open={open}
onOk={handleSave}
onCancel={()=>{
setOpen(false);
form.resetFields();
}}
>

<Form form={form} layout="vertical">

<Form.Item
name="name"
label="Employee Name"
rules={[{ required:true,message:"Employee name required"}]}
>
<Input/>
</Form.Item>


<Form.Item
name="contact"
label="Contact Number"
rules={[
{required:true,message:"Contact required"},
{pattern:/^[0-9]{10}$/,message:"Enter valid number"}
]}
>
<Input/>
</Form.Item>


<Form.Item
name="designation"
label="Designation"
rules={[{required:true,message:"Designation required"}]}
>
<Input/>
</Form.Item>


<Form.Item
name="email"
label="Email"
rules={[{type:"email"}]}
>
<Input/>
</Form.Item>


<Form.Item
name="salary"
label="Salary"
rules={[{required:true,message:"Salary required"}]}
>
<Input type="number"/>
</Form.Item>


<Form.Item
name="bankName"
label="Bank Name"
>

<Select placeholder="Select Bank">

{banks.map((b)=>(
<Option key={b} value={b}>{b}</Option>
))}

</Select>

</Form.Item>


<Form.Item
name="bankAccount"
label="Bank Account"
>
<Input/>
</Form.Item>


<Form.Item
name="ifsc"
label="IFSC Code"
>
<Input/>
</Form.Item>


</Form>

</Modal>

</Card>

</MainLayout>

);

}