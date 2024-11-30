import React, {
  useEffect,
  useState,
} from "react";
import { Table, Input } from 'antd';
import { base_url } from '../utils/base_url';
import moment from 'moment-timezone';


const columns = [
{
  title: 'No.',
  dataIndex: 'key',
},
{
  title: 'Nội dung',
  dataIndex: 'message',
},
{
  title: 'Thời gian',
  dataIndex: 'times',
},
{
  title: 'Số lượng hiện tại',
  dataIndex: 'count',
},
];
export default function Notification() {
useEffect(() => {
  const fetchNotifications = async () => {
    try {
      const response = await fetch(`${base_url}auth/markAllAsRead`, {
        method: "POST", // HTTP method
        headers: {
          "Content-Type": "application/json", // Header chỉ định loại dữ liệu
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch notifications");
      }
      const data = await response.json();
    } catch (error) {
      console.error("Failed to fetch notifications", error);
    }
  };

  fetchNotifications(); // Gọi hàm fetch thông báo
}, []); // Chỉ chạy một lần khi component mount

const [notifications, setNotifications] = useState([]);
  
const fetchNotifications = async () => {
  try {
    const response = await fetch(`${base_url}auth/getallnoti`, {
      method: "GET", // HTTP method
      headers: {
        "Content-Type": "application/json", // Header chỉ định loại dữ liệu
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch notifications");
    }
    const data = await response.json();
    setNotifications(data.noti); // Lưu thông báo vào state
  } catch (error) {
    console.error("Failed to fetch notifications", error);
  }
};
const [count,setCount] =useState(0)
useEffect(() => {
  let unreadCount = 0;
  fetchNotifications()
  notifications.forEach(notification => {
    if (notification.read == false) {
      unreadCount++;
    }
  });
  setCount(unreadCount);
}, []);
const data1 = [];
for (let i = 0; i < notifications?.length; i++) {
  data1.push({
      key: i,
      message: notifications[i]?.message,
      count: notifications[i]?.count,
      times: moment(notifications[i]?.createdAt).tz("Asia/Ho_Chi_Minh").format("YYYY-MM-DD HH:mm:ss"),
    });
}
return (
  <div>
    <div style={{width:"400px"}}>
          {/* {
           notifications?.map((e,index)=>(
              <p style={{fontSize:"18px"}} key={index}>
              <strong>Thông báo {index +1 } :</strong> {e.message}
              </p>
              ))
          } */}
      </div>
      <div className="">
          <Table  columns={columns} dataSource={data1} />
      </div>  
  </div>
)
}
