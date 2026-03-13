import { useEffect, useState } from "react";
import { Card, Table, Button, Input, Modal, Form, message, Popconfirm } from "antd";
import MainLayout from "../layout/MainLayout";
import api from "../api/api";

import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";


export default function Contractors(){

const [contractors,setContractors] = useState<any[]>([]);
const [loading,setLoading] = useState(false);

const [search,setSearch] = useState("");

const [selectedRowKeys,setSelectedRowKeys] = useState<number[]>([]);

const [currentPage,setCurrentPage] = useState(1);
const [pageSize,setPageSize] = useState(10);

const [open,setOpen] = useState(false);

const [form] = Form.useForm();

const [editingContractor,setEditingContractor] = useState<any>(null);



/* FETCH DATA */

const fetchContractors = async ()=>{

try{

setLoading(true);

const res = await api.get("/contractors");

setContractors(res.data);

}catch(err){

console.log(err);

}finally{

setLoading(false);

}

};


useEffect(()=>{

fetchContractors();

},[]);



/* SEARCH */

const filteredContractors = contractors.filter((c:any)=>{

const searchText = search.toLowerCase();

return(

c.name?.toLowerCase().includes(searchText) ||

String(c.contact || "").includes(searchText) ||

c.address?.toLowerCase().includes(searchText)

);

});



/* ROW SELECT */

const rowSelection = {

selectedRowKeys,

onChange:(keys:any)=>{

setSelectedRowKeys(keys);

}

};



/* ADD / UPDATE */

const handleSave = async ()=>{

try{

const values = await form.validateFields();
console.log("FORM DATA:", values);

if(editingContractor){

await api.put(`/contractors/${editingContractor.id}`,values);

message.success("Contractor updated");

}else{

await api.post("/contractors",values);

message.success("Contractor added");

}

setOpen(false);

setEditingContractor(null);

form.resetFields();

fetchContractors();

}catch(err){

console.log(err);

}

};



/* EDIT */

const handleEdit = ()=>{

const contractor = contractors.find((c:any)=>c.id===selectedRowKeys[0]);

if(!contractor) return;

setEditingContractor(contractor);

form.setFieldsValue(contractor);

setOpen(true);

};



/* DELETE */

const handleDelete = async ()=>{

try{

for(const id of selectedRowKeys){

await api.delete(`/contractors/${id}`);

}

message.success("Contractor deleted");

setSelectedRowKeys([]);

fetchContractors();

}catch(err){

message.error("Delete failed");

}

};



/* EXPORT EXCEL */

const handleExportExcel = ()=>{

const exportData = filteredContractors.map((c:any,index:number)=>({

"Sr No": index+1,
Name: c.name,
Contact: c.contact,
Address: c.address,
PAN: c.pan_number,
GST: c.gst,
Bank: c.bank_name,
Account: c.bank_account,
IFSC: c.ifsc

}));

const worksheet = XLSX.utils.json_to_sheet(exportData);

const workbook = XLSX.utils.book_new();

XLSX.utils.book_append_sheet(workbook,worksheet,"Contractors");

XLSX.writeFile(workbook,"contractors_report.xlsx");

};



/* EXPORT PDF */

const handleExportPDF = ()=>{

const doc = new jsPDF();

doc.text("Contractors Report",14,15);

const columns = [
"Sr",
"Name",
"Contact",
"Address",
"PAN",
"GST",
"Bank"
];

const rows = filteredContractors.map((c:any,index:number)=>[
index+1,
c.name,
c.contact,
c.address,
c.pan_number,
c.gst,
c.bank_name
]);

autoTable(doc,{
head:[columns],
body:rows,
startY:20
});

doc.save("contractors_report.pdf");

};



/* TABLE COLUMNS */

const columns=[

{
title:"Sr",
render:(_:any,__:any,index:number)=>
(currentPage-1)*pageSize+index+1
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
title:"Address",
dataIndex:"address"
},

{
title:"PAN",
dataIndex:"pan_number"
},

{
title:"GST",
dataIndex:"gst"
}

];



return(

<MainLayout>

<Card title="Contractors">

<div style={{display:"flex",gap:10,marginBottom:20}}>

{/* <Button type="primary" onClick={()=>setOpen(true)}>
Add
</Button> */}
<Button
type="primary"
onClick={()=>{
setEditingContractor(null);
form.resetFields();
setOpen(true);
}}
>
Add
</Button>

<Button disabled={selectedRowKeys.length!==1} onClick={handleEdit}>
Edit
</Button>

<Popconfirm
title="Delete contractor?"
onConfirm={handleDelete}
>

<Button danger disabled={selectedRowKeys.length===0}>
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
placeholder="Search contractors"
style={{width:300,marginBottom:20}}
onChange={(e)=>setSearch(e.target.value)}
/>


<div style={{marginBottom:10}}>
Total Contractors : {filteredContractors.length}
</div>


<Table
rowSelection={rowSelection}
columns={columns}
dataSource={filteredContractors}
rowKey="id"
loading={loading}
pagination={{
current:currentPage,
pageSize:pageSize,
showSizeChanger:true
}}
onChange={(p)=>{
setCurrentPage(p.current||1);
setPageSize(p.pageSize||10);
}}
/>


<Modal
title={editingContractor?"Edit Contractor":"Add Contractor"}
open={open}
onOk={handleSave}
onCancel={()=>{

setOpen(false);

setEditingContractor(null);

form.resetFields();

}}
>

<Form form={form} layout="vertical">

<Form.Item
name="name"
label="Contractor Name"
rules={[{required:true}]}
>
<Input/>
</Form.Item>

<Form.Item
name="contact"
label="Contact"
rules={[{pattern:/^[0-9]{10}$/,message:"Enter valid number"}]}
>
<Input/>
</Form.Item>

<Form.Item
name="address"
label="Address"
>
<Input/>
</Form.Item>

<Form.Item
name="pan_number"
label="PAN"
>
<Input maxLength={10}/>
</Form.Item>

<Form.Item
name="gst"
label="GST"
>
<Input/>
</Form.Item>

<Form.Item
name="bank_name"
label="Bank Name"
>
<Input/>
</Form.Item>

<Form.Item
name="bank_account"
label="Account Number"
>
<Input/>
</Form.Item>

<Form.Item
name="ifsc"
label="IFSC"
>
<Input/>
</Form.Item>

</Form>

</Modal>

</Card>

</MainLayout>

);

}