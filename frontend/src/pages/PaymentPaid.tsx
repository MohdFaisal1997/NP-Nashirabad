import { useEffect, useState } from "react";
import { Card, Form, Input, Button, Select, DatePicker, message } from "antd";
import MainLayout from "../layout/MainLayout";
import api from "../api/api";
import dayjs from "dayjs";

const { Option } = Select;

export default function PaymentPaid(){

const [form] = Form.useForm();
const [banks,setBanks] = useState<any[]>([]);


/* GET BANK ACCOUNTS */

const fetchBanks = async ()=>{

try{

const res = await api.get("/banks");

setBanks(res.data);

}catch(err){

console.log(err);

}

};


useEffect(()=>{
fetchBanks();
},[]);



/* SAVE PAYMENT */

const handleSubmit = async ()=>{

try{

const values = await form.validateFields();

values.date = values.date.format("YYYY-MM-DD");

values.account_type = "Debit";

await api.post("/payments",values);

message.success("Payment Paid Successfully");

form.resetFields();

}catch(err){

console.log(err);

}

};



return(

<MainLayout>

<Card title="Payment Paid">

<Form form={form} layout="vertical">


{/* BANK FROM */}

<Form.Item
name="bank_id"
label="Bank From"
rules={[{required:true}]}
>

<Select placeholder="Select Bank">

{banks.map((bank:any)=>(
<Option key={bank.id} value={bank.id}>
{bank.bank_name}
</Option>
))}

</Select>

</Form.Item>



{/* PAYMENT TYPE */}

<Form.Item
name="payment_type"
label="Payment Deposit"
rules={[{required:true}]}
>

<Select placeholder="Select Payment Type">

<Option value="Property Tax Collection">
Property Tax Collection
</Option>

<Option value="Water Tax Collection">
Water Tax Collection
</Option>

<Option value="General Collection">
General Collection
</Option>

<Option value="Tender From Fees">
Tender From Fees
</Option>

<Option value="Earnest Money Deposit (EMD)">
Earnest Money Deposit (EMD)
</Option>

<Option value="State Government">
State Government
</Option>

<Option value="Central Government">
Central Government
</Option>

<Option value="MLA Funds">
MLA Funds
</Option>

<Option value="MP Funds">
MP Funds
</Option>

</Select>

</Form.Item>



{/* DATE */}

<Form.Item
name="date"
label="Date"
initialValue={dayjs()}
rules={[{required:true}]}
>

<DatePicker style={{width:"100%"}}/>

</Form.Item>



{/* AMOUNT */}

<Form.Item
name="amount"
label="Amount"
rules={[{required:true}]}
>

<Input type="number"/>

</Form.Item>



{/* ACCOUNT TYPE DEFAULT */}

<Form.Item
label="Account"
>

<Input value="Debit" disabled />

</Form.Item>



{/* PARTICULAR */}

<Form.Item
name="particular"
label="Particular"
>

<Input/>

</Form.Item>



{/* REMARK */}

<Form.Item
name="remark"
label="Remark"
>

<Input.TextArea rows={3}/>

</Form.Item>



<Button
type="primary"
size="large"
onClick={handleSubmit}
>

Payment Paid

</Button>

</Form>

</Card>

</MainLayout>

);

}