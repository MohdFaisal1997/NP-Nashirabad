import { useEffect, useState } from "react";
import { Table, Button, Modal, Form, Input, Select, Popconfirm, message, Card } from "antd";
import api from "../api/api";
import MainLayout from "../layout/MainLayout";

export default function Users(){

  const [users,setUsers] = useState([]);
  const [open,setOpen] = useState(false);
  const [form] = Form.useForm();
  const [editingUser,setEditingUser] = useState<any>(null);

  const fetchUsers = async () => {

    const res = await api.get("/users");

    setUsers(res.data);

  };

  useEffect(()=>{
    fetchUsers();
  },[]);

  const handleAddUser = async () => {

    const values = await form.validateFields();

    if(editingUser){

      await api.put(`/users/${editingUser.id}`,values);

    }else{

      await api.post("/users",values);

    }

    message.success("User saved");

    setEditingUser(null);
    form.resetFields();
    setOpen(false);

    fetchUsers();

  };

  const handleEdit = (user:any) => {

    setEditingUser(user);

    form.setFieldsValue(user);

    setOpen(true);

  };

  const handleDelete = async (id:number) => {

    await api.delete(`/users/${id}`);

    message.success("User deleted");

    fetchUsers();

  };

  const handleToggleStatus = async (user:any)=>{

    const newStatus = user.status === "active" ? "blocked" : "active";

    await api.put(`/users/status/${user.id}`,{
      status:newStatus
    });

    message.success("User status updated");

    fetchUsers();

  };

  const columns = [

    {
      title:"Name",
      dataIndex:"name"
    },

    {
      title:"Contact",
      dataIndex:"contact"
    },

    {
      title:"Username",
      dataIndex:"username"
    },

    {
      title:"Role",
      dataIndex:"role"
    },

    {
      title:"Status",
      render:(record:any)=>(
        record.status === "blocked"
        ? <span style={{color:"red"}}>Blocked</span>
        : <span style={{color:"green"}}>Active</span>
      )
    },

    {
      title:"Actions",
      render:(record:any)=>(
        <>

          <Button
            type="link"
            onClick={()=>handleEdit(record)}
          >
            Edit
          </Button>

          <Button
            type="link"
            danger={record.status === "active"}
            onClick={()=>handleToggleStatus(record)}
          >
            {record.status === "active" ? "Block" : "Unblock"}
          </Button>

          <Popconfirm
            title="Delete User"
            onConfirm={()=>handleDelete(record.id)}
          >
            <Button type="link" danger>
              Delete
            </Button>
          </Popconfirm>

        </>
      )
    }

  ];

  return(

    <MainLayout>

      <Card title="Users">

        <Button
          type="primary"
          onClick={()=>setOpen(true)}
          style={{marginBottom:20}}
        >
          Add User
        </Button>

        <Table
          columns={columns}
          dataSource={users}
          rowKey="id"
        />

        <Modal
          title="Add User"
          open={open}
          onOk={handleAddUser}
          onCancel={()=>setOpen(false)}
        >

          <Form form={form} layout="vertical">

            <Form.Item
              name="name"
              label="Name"
              rules={[{required:true}]}
            >
              <Input/>
            </Form.Item>

            <Form.Item
              name="contact"
              label="Contact"
            >
              <Input/>
            </Form.Item>

            <Form.Item
              name="username"
              label="Username"
              rules={[{required:true}]}
            >
              <Input/>
            </Form.Item>

            <Form.Item
              name="password"
              label="Password"
              rules={[{required:true}]}
            >
              <Input.Password/>
            </Form.Item>

            <Form.Item
              name="role"
              label="Role"
            >

              <Select
                options={[
                  {value:"MasterAdmin",label:"Master Admin"},
                  {value:"Accounter",label:"Accounter"},
                  {value:"Auditor",label:"Auditor"},
                  {value:"DataEntryOperator",label:"Data Entry Operator"},
                  {value:"BillCollector",label:"Bill Collector"}
                ]}
              />

            </Form.Item>

          </Form>

        </Modal>

      </Card>

    </MainLayout>

  )

}