import { useEffect, useState } from "react";
import { Card, Form, Input, Button, Select, DatePicker, message } from "antd";
import MainLayout from "../layout/MainLayout";
import api from "../api/api";
import dayjs from "dayjs";

const { Option } = Select;

export default function PaymentDeposit() {

const [form] = Form.useForm();
const [banks,setBanks] = useState<any[]>([]);

/* FETCH BANK ACCOUNTS */

const fetchBanks = async () => {
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


/* SAVE TRANSACTION */

const handleSubmit = async () => {

  try{

    const values = await form.validateFields();

    values.date = values.date.format("YYYY-MM-DD");

    await api.post("/transactions",values);

    message.success("Payment Deposited Successfully");

    form.resetFields();

  }catch(err){
    console.log(err);
    message.error("Transaction Failed");
  }

};


return(

<MainLayout>

<Card title="Payment Deposit">

<Form form={form} layout="vertical">


{/* BANK FROM (FIXED OPTIONS) */}

<Form.Item
name="bank_from"
label="Bank From"
rules={[{required:true}]}
>

<Select placeholder="Select Source">

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



{/* PAYMENT DEPOSIT (BANK ACCOUNT DROPDOWN) */}

<Form.Item
name="bank_id"
label="Payment Deposit"
rules={[{required:true}]}
>

<Select placeholder="Select Bank Account">

{banks.map((bank:any)=>(
<Option key={bank.id} value={bank.id}>
{bank.bank_name} - {bank.account_number}
</Option>
))}

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



{/* ACCOUNT TYPE */}

<Form.Item
name="account_type"
label="Account Type"
initialValue="Credit"
>

<Select>

<Option value="Credit">Credit</Option>
<Option value="Debit">Debit</Option>

</Select>

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

Payment Deposit to Account

</Button>

</Form>

</Card>

</MainLayout>

);

}