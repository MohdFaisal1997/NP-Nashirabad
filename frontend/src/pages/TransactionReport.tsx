import { Card, Form, Select, DatePicker, Input, Button, Table, Row, Col } from "antd";
import { useEffect, useState } from "react";
import api from "../api/api";

const TransactionList = () => {

const [banks,setBanks] = useState<any[]>([]);
const [contractors,setContractors] = useState<any[]>([]);
const [data,setData] = useState<any[]>([]);

const [filters,setFilters] = useState<any>({});



/* TABLE COLUMNS */

const columns = [

{ title:"Transaction ID", dataIndex:"TransactionID" },

{ title:"Credit Payment", dataIndex:"CreditPayment" },

{ title:"Debit Payment", dataIndex:"DebitPayment" },

{ title:"Transaction From", dataIndex:"TransactionType" },

{ title:"Account ID", dataIndex:"Bank" },

{ title:"Contractor", dataIndex:"Contractor" },

{ title:"Date", dataIndex:"TransactionDate" }

];



/* LOAD BANKS */

const fetchBanks = async()=>{

const res = await api.get("/banks");

setBanks(res.data);

};



/* LOAD CONTRACTORS */

const fetchContractors = async()=>{

const res = await api.get("/contractors");

setContractors(res.data);

};



/* LOAD TRANSACTIONS */

const fetchTransactions = async()=>{

const res = await api.get("/payment-reports",{params:filters});

setData(res.data);

};



useEffect(()=>{

fetchBanks();
fetchContractors();
fetchTransactions();

},[]);



return (

<Card title="Transaction List">


{/* SEARCH SECTION */}

<Card title="Search Option" style={{marginBottom:20}}>

<Form layout="vertical">

<Row gutter={16}>


<Col span={6}>
<Form.Item label="Bank">

<Select
placeholder="Select Bank"
onChange={(v)=>setFilters({...filters,bank_id:v})}
>

{banks.map((b:any)=>(
<Select.Option key={b.id} value={b.id}>
{b.bank_name}
</Select.Option>
))}

</Select>

</Form.Item>
</Col>



<Col span={6}>
<Form.Item label="Contractor">

<Select
placeholder="Select Contractor"
onChange={(v)=>setFilters({...filters,contractor_id:v})}
>

{contractors.map((c:any)=>(
<Select.Option key={c.id} value={c.id}>
{c.name}
</Select.Option>
))}

</Select>

</Form.Item>
</Col>



<Col span={6}>
<Form.Item label="Transaction Type">

<Select
placeholder="Select Type"
onChange={(v)=>setFilters({...filters,type:v})}
>

<Select.Option value="Credit">Credit</Select.Option>
<Select.Option value="Debit">Debit</Select.Option>

</Select>

</Form.Item>
</Col>



<Col span={6}>
<Form.Item label="Transaction Amount">

<Input
onChange={(e)=>setFilters({...filters,amount:e.target.value})}
/>

</Form.Item>
</Col>


</Row>



<Row gutter={16}>

<Col span={6}>
<Form.Item label="From Date">

<DatePicker
style={{width:"100%"}}
onChange={(d)=>setFilters({...filters,from:d?.format("YYYY-MM-DD")})}
/>

</Form.Item>
</Col>


<Col span={6}>
<Form.Item label="To Date">

<DatePicker
style={{width:"100%"}}
onChange={(d)=>setFilters({...filters,to:d?.format("YYYY-MM-DD")})}
/>

</Form.Item>
</Col>

</Row>



<Row gutter={16}>

<Col>
<Button type="primary" onClick={fetchTransactions}>
Search
</Button>
</Col>

<Col>
<Button>Edit</Button>
</Col>

<Col>
<Button danger>Delete</Button>
</Col>

</Row>

</Form>

</Card>



{/* TABLE */}

<Card title="Transaction List View">

<Table
columns={columns}
dataSource={data}
rowKey="TransactionID"
pagination={false}
/>

</Card>


</Card>

);

};

export default TransactionList;