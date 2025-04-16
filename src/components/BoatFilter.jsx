import React, { useState } from 'react';
import { DownOutlined } from '@ant-design/icons';
import { Dropdown, Space, Checkbox, Button, Divider } from 'antd';
import fuelData from '../data/fuelData'; // นำเข้าข้อมูลเรือ

const BoatFilter = ({ selectedBoats, onChange }) => {
    const [open, setOpen] = useState(false);

    // กำหนด options จาก fuelData
    const options = fuelData.map((boat) => ({
        label: boat.Name, // แสดงชื่อเรือ
        value: boat.Id.toString(), // ใช้ ID เป็น value
    }));

    const handleChange = (checkedValues) => {
        onChange(checkedValues); // อัพเดตค่า selectedBoats
    };

    const handleApply = () => {
        setOpen(false); // ปิด dropdown
    };

    // แสดงชื่อเรือที่เลือก
    const selectedBoatNames = options
        .filter(option => selectedBoats.includes(option.value))
        .map(option => option.label)
        .join(', ');

    return (
        <Dropdown
            overlay={
                <div className="p-4 bg-white rounded-md shadow-[0px_4px_10px_rgba(0,0,0,0.10)] hover:bg-gray-50" style={{ width: 200 }}>
                    <Checkbox.Group
                        options={options}
                        value={selectedBoats}
                        onChange={handleChange}
                        className="gap-y-2 flex flex-col"
                    />
                    <Divider style={{ margin: '12px 0' }} />
                    <Button type="primary" block onClick={handleApply}>
                        Apply
                    </Button>
                </div>
            }
            trigger={['click']}
            open={open}
            onOpenChange={(flag) => setOpen(flag)}
            placement="bottomLeft"
        >
            <button className="bg-white py-1 px-3">
                <Space>
                    {selectedBoatNames || 'Select Boat'}
                    <DownOutlined />
                </Space>
            </button>
        </Dropdown>
    );
};

export default BoatFilter;
