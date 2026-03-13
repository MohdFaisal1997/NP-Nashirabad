import { useEffect, useState } from "react";
import { Card, Table, Button, Input, Modal, Form, message, Popconfirm } from "antd";
import MainLayout from "../layout/MainLayout";
import api from "../api/api";

import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export default function Banks(){

const [banks,setBanks] = useState<any[]>([]);
const [loading,setLoading] = useState(false);

const [search,setSearch] = useState("");

const [selectedRowKeys,setSelectedRowKeys] = useState<number[]>([]);

const [open,setOpen] = useState(false);

const [form] = Form.useForm();

const [editingBank,setEditingBank] = useState<any>(null);

const [currentPage,setCurrentPage] = useState(1);
const [pageSize,setPageSize] = useState(10);



/* FETCH BANKS */

const fetchBanks = async ()=>{

try{

setLoading(true);

const res = await api.get("/banks");

setBanks(res.data);

}catch(err){

console.error(err);

}finally{

setLoading(false);

}

};

useEffect(()=>{
fetchBanks();
},[]);



/* SEARCH */

const filteredBanks = banks.filter((b:any)=>{

const name = b.bank_name?.toLowerCase() || "";
const account = b.account_name?.toLowerCase() || "";

const searchText = search.toLowerCase();

return name.includes(searchText) || account.includes(searchText);

});



/* ROW SELECTION */

const rowSelection = {
selectedRowKeys,
onChange:(keys:any)=>{
setSelectedRowKeys(keys);
}
};



/* SAVE BANK */

const handleSaveBank = async ()=>{

try{

const values = await form.validateFields();

if(editingBank){

await api.put(`/banks/${editingBank.id}`,values);

message.success("Bank updated");

}else{

await api.post("/banks",values);

message.success("Bank added");

}

form.resetFields();

setOpen(false);

setEditingBank(null);

fetchBanks();

}catch(err){

console.error(err);

}

};



/* DELETE */

const handleDeleteBank = async ()=>{

try{

for(const id of selectedRowKeys){

await api.delete(`/banks/${id}`);

}

message.success("Bank deleted");

setSelectedRowKeys([]);

fetchBanks();

}catch(err){

message.error("Delete failed");

}

};



/* EXPORT EXCEL */

const handleExportExcel = ()=>{

const exportData = filteredBanks.map((b:any,index:number)=>({

"Sr No":index+1,
"Bank Name":b.bank_name,
"Account Name":b.account_name,
"Account Number":b.account_number,
"IFSC Code":b.ifsc_code,
"Branch":b.branch

}));

const ws = XLSX.utils.json_to_sheet(exportData);

const wb = XLSX.utils.book_new();

XLSX.utils.book_append_sheet(wb,ws,"Banks");

XLSX.writeFile(wb,"banks_list.xlsx");

};



/* EXPORT PDF */

const handleExportPDF = ()=>{

const doc = new jsPDF();

doc.text("Bank Accounts",14,15);

const columns=[
"Sr",
"Bank Name",
"Account Name",
"Account Number",
"IFSC",
"Branch"
];

const rows = filteredBanks.map((b:any,index:number)=>[
index+1,
b.bank_name,
b.account_name,
b.account_number,
b.ifsc_code,
b.branch
]);

autoTable(doc,{
head:[columns],
body:rows,
startY:20
});

doc.save("banks_list.pdf");

};



/* TABLE COLUMNS */

const columns=[

{
title:"Sr",
render:(_:any,__:any,index:number)=>
(currentPage-1)*pageSize+index+1
},

{
title:"Bank Name",
dataIndex:"bank_name"
},

{
title:"Account Name",
dataIndex:"account_name"
},

{
title:"Account Number",
dataIndex:"account_number"
},

{
title:"IFSC Code",
dataIndex:"ifsc_code"
},

{
title:"Branch",
dataIndex:"branch"
}

];



return(

<MainLayout>

<Card title="Bank Accounts">

<div style={{display:"flex",gap:10,marginBottom:20}}>

<Button type="primary" onClick={()=>{
setEditingBank(null);
form.resetFields();
setOpen(true);
}}>
Add
</Button>


<Button
disabled={selectedRowKeys.length!==1}
onClick={()=>{

const bank = banks.find((b:any)=>b.id===selectedRowKeys[0]);

if(!bank) return;

setEditingBank(bank);

form.setFieldsValue(bank);

setOpen(true);

}}
>
Edit
</Button>


<Popconfirm
title="Delete bank?"
onConfirm={handleDeleteBank}
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
placeholder="Search banks"
style={{width:300,marginBottom:20}}
onChange={(e)=>setSearch(e.target.value)}
/>



<Table
rowSelection={rowSelection}
columns={columns}
dataSource={filteredBanks}
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
title={editingBank?"Edit Bank":"Add Bank"}
open={open}
onOk={handleSaveBank}
onCancel={()=>{
setOpen(false);
setEditingBank(null);
form.resetFields();
}}
>

<Form form={form} layout="vertical">


<Form.Item
name="bank_name"
label="Bank Name"
rules={[{required:true,message:"Enter bank name"}]}
>
<Input/>
</Form.Item>


<Form.Item
name="account_name"
label="Account Name"
rules={[{required:true,message:"Enter account name"}]}
>
<Input/>
</Form.Item>


<Form.Item
name="account_number"
label="Account Number"
rules={[
{required:true,message:"Enter account number"},
{pattern:/^[0-9]{9,18}$/,message:"Invalid account number"}
]}
>
<Input/>
</Form.Item>


<Form.Item
name="ifsc_code"
label="IFSC Code"
rules={[
{required:true,message:"Enter IFSC code"},
{
pattern:/^[A-Z]{4}0[A-Z0-9]{6}$/,
message:"Example SBIN0001234"
}
]}
>
<Input
maxLength={11}
style={{textTransform:"uppercase"}}
onChange={(e)=>{
const value = e.target.value.toUpperCase();
form.setFieldsValue({ifsc_code:value});
}}
/>
</Form.Item>


<Form.Item
name="branch"
label="Branch"
rules={[{required:true,message:"Enter branch"}]}
>
<Input/>
</Form.Item>


</Form>

</Modal>

</Card>

</MainLayout>

);

}