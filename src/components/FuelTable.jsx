import React, { useRef, useState } from 'react';
import { SearchOutlined } from '@ant-design/icons';
import { Button, Input, Space, Table } from 'antd';
import Highlighter from 'react-highlight-words';
import fuelData from '../data/fuelData';

const FuelTable = ({ boatId }) => {
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef(null);

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = clearFilters => {
    clearFilters();
    setSearchText('');
  };

  const getColumnSearchProps = dataIndex => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
      <div className="p-2 w-[280px]" onKeyDown={e => e.stopPropagation()}>
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          className="block"
        />
        <Space className="flex justify-between w-full mt-2">
          <div className="flex space-x-2">
            <Button
              type="primary"
              onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
              icon={<SearchOutlined />}
              size="small"
              className="w-full"
            >
              Search
            </Button>
            <Button
              onClick={() => clearFilters && handleReset(clearFilters)}
              size="small"
              className="w-full"
            >
              Clear
            </Button>
          </div>
          <button className='text-[#006a71]  px-1 font-semibold hover:text-[#009AA4]' onClick={close}>
            Close
          </button>
        </Space>
      </div>
    ),
    filterIcon: filtered => (
      <SearchOutlined className={filtered ? 'text-blue-600' : ''} />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    filterDropdownProps: {
      onOpenChange(open) {
        if (open) {
          setTimeout(() => {
            searchInput.current?.select();
          }, 100);
        }
      },
    },
    render: text =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: '#006a71', padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ''}
        />
      ) : (
        text
      ),
  });

  const boat = fuelData.find(item => item.Id.toString() === boatId.toString());

  if (!boat) return <div>No data available</div>;

  const tableData = boat.FuelVolume.map((entry, index) => ({
    key: index,
    date: entry.FocusDate,
    in: entry.FuelRefuel,
    out: entry.FuelDrain,
    remain: entry.FuelRemaining,
  }));

  const columns = [
    {
      title: 'วันที่',
      dataIndex: 'date',
      key: 'date',
      width: '25%',
      ...getColumnSearchProps('date'),
      sorter: (a, b) => new Date(a.date) - new Date(b.date),
      sortDirections: ['descend', 'ascend'],
    },
    {
      title: 'รับเข้า',
      dataIndex: 'in',
      key: 'in',
      width: '20%',
      ...getColumnSearchProps('in'),
      sorter: (a, b) => a.in - b.in,
    },
    {
      title: 'จ่ายออก',
      dataIndex: 'out',
      key: 'out',
      width: '20%',
      ...getColumnSearchProps('out'),
      sorter: (a, b) => a.out - b.out,
    },
    {
      title: 'คงเหลือ',
      dataIndex: 'remain',
      key: 'remain',
      width: '20%',
      ...getColumnSearchProps('remain'),
      sorter: (a, b) => a.remain - b.remain,
    },
  ];

  return (
    <div className="bg-white rounded-xl shadow overflow-x-auto">
      <Table
        className="custom-table"
        columns={columns}
        dataSource={tableData}
        pagination={{
          pageSize: 5,
          showSizeChanger: false,
          showQuickJumper: false,
          showLessItems: true,
        }}
      />
    </div>
  );
};

export default FuelTable;
