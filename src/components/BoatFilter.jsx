import React, { useState } from "react";
import { DownOutlined } from "@ant-design/icons";
import { Dropdown, Space, Checkbox, Button, Divider } from "antd";

const BoatFilter = ({ boats, selectedBoats, onChange }) => {
  const [open, setOpen] = useState(false);

  const options =
    boats &&
    boats.map((boat) => ({
      label: boat.name,
      value: boat.id.toString(),
    }));

  const handleChange = (checkedValues) => {
    onChange(checkedValues);
  };

  const handleApply = () => {
    setOpen(false);
  };

  const selectedBoatNames = options
    .filter((option) => selectedBoats.includes(option.value))
    .map((option) => option.label)
    .join(", ");

  return (
    <Dropdown
      dropdownRender={() => (
        <div className="p-4 bg-white rounded-md shadow-[0px_4px_10px_rgba(0,0,0,0.10)] hover:bg-gray-50 ">
          <div
            style={{
              width: 200,
              maxHeight: "300px",
              overflowY: "auto",
            }}
          >
            <Checkbox.Group
              options={options}
              value={selectedBoats}
              onChange={handleChange}
              className="gap-y-2 flex flex-col font-medium "
            />
            <Divider style={{ margin: "12px 0" }} />

          </div>
          <Button type="primary" block onClick={handleApply}>
            Apply
          </Button>
        </div>

      )}
      trigger={["click"]}
      open={open}
      onOpenChange={(flag) => setOpen(flag)}
      placement="bottomLeft"
    >
      <button className="bg-white py-1 px-3 rounded-sm outline-1 outline-gray-300 hover:text-[#006A71] hover:outline-1 hover:outline-[#006A71]">
        <Space>
          {selectedBoatNames || "Select Boat"}
          <DownOutlined />
        </Space>
      </button>


    </Dropdown>
  );
};

export default BoatFilter;
