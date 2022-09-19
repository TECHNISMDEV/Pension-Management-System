import axios from 'axios'
import { React, useEffect, useRef, useState } from 'react'
import { API_URL, formatDate } from '../../utils/commons'

import { SearchOutlined } from '@ant-design/icons';
import { Button, Input, Space, Table } from 'antd';
import Highlighter from 'react-highlight-words';
import EmployerFormView from './employerFormView';


function MemberList() {

    const [employerList, setEmployerList] = useState([])
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const searchInput = useRef(null);
    const [enableFormView, setEnableFormView] = useState(false);
    const [formData, setFormData] = useState({})
    useEffect(() => {

        axios.get(API_URL + '/getAllcompany/').then(
            (res) => {
                console.log(res.data)
                setEmployerList(res.data)
            }
        )

    }, [])

    const handleEmployerRowClick = (rowObject, rowIndex) => {
        setFormData(rowObject)
        setEnableFormView(true)
    }
    const handleBackButton = ()=>{
        setEnableFormView(false)  
    }
    const handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        setSearchText(selectedKeys[0]);
        setSearchedColumn(dataIndex);
    };

    const handleReset = (clearFilters) => {
        clearFilters();
        setSearchText('');
    };
    const getColumnSearchProps = (dataIndex) => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
            <div
                style={{
                    padding: 8,
                }}
            >
                <Input
                    ref={searchInput}
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
                    style={{
                        marginBottom: 8,
                        display: 'block',
                    }}
                />
                <Space>
                    <Button
                        type="primary"
                        onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
                        icon={<SearchOutlined />}
                        size="small"
                        style={{
                            width: 90,
                        }}
                    >
                        Search
                    </Button>
                    <Button
                        onClick={() => clearFilters && handleReset(clearFilters)}
                        size="small"
                        style={{
                            width: 90,
                        }}
                    >
                        Reset
                    </Button>
                    <Button
                        type="link"
                        size="small"
                        onClick={() => {
                            confirm({
                                closeDropdown: false,
                            });
                            setSearchText(selectedKeys[0]);
                            setSearchedColumn(dataIndex);
                        }}
                    >
                        Filter
                    </Button>
                </Space>
            </div>
        ),
        filterIcon: (filtered) => (
            <SearchOutlined
                style={{
                    color: filtered ? '#1890ff' : undefined,
                }}
            />
        ),
        onFilter: (value, record) =>
            record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
        onFilterDropdownVisibleChange: (visible) => {
            if (visible) {
                setTimeout(() => searchInput.current?.select(), 100);
            }
        },
        render: (text) =>
            searchedColumn === dataIndex ? (
                <Highlighter
                    highlightStyle={{
                        backgroundColor: '#ffc069',
                        padding: 0,
                    }}
                    searchWords={[searchText]}
                    autoEscape
                    textToHighlight={text ? text.toString() : ''}
                />
            ) : (
                text
            ),
    });


    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
          
            ...getColumnSearchProps('name'),
        }, 
        {
            title: 'Legal Name',
            dataIndex: 'legalName',
            key: 'legalName',
        },
        {
            title: 'Company CX Ref',
            dataIndex: 'compCxRef',
            key: 'compCxRef',
        },
        {
            title: 'Pacra Id',
            dataIndex: 'pacraId',
            key: 'pacraId',
        },
        {
            title: 'Company Type',
            dataIndex: 'companyType',
            key: 'companyType',
        },
        {
            title: 'Phone Number',
            dataIndex: 'mainPhone',
            key: 'mainPhone',
        },
        {
            title: 'Sector',
            dataIndex: 'sector',
            key: 'sector',
        },
        // {
        //     title: 'Country',
        //     dataIndex: ['address', 'country'],
        //     key: 'country',
           
        // },

        {
            title: 'Owner Id',
            dataIndex: 'ownerId',
            key: 'ownerId',
        },
        {
            title: 'Created On',
            dataIndex: 'created',
            key: 'created',

            render: date => <p>{formatDate(date)}</p>,
        }
    ];

    return (
        <div className="p-4">
            <div className="row">
                <div className="card">
                    <div className="card-body">
                    <div className='my-3'><button type="button" className="btn btn-danger float-end rounded-pill" onClick={(handleBackButton)} hidden={!enableFormView}>Go Back</button></div> 
                    { !enableFormView? <div> <p className="card-title fs-3 mb-3">List of Members</p>

                       <Table onRow={(record, rowIndex) => {
                            return {
                                onClick: event => { handleEmployerRowClick(record, rowIndex) }, // click row
                                onDoubleClick: event => { }, // double click row
                                onContextMenu: event => { }, // right button click row
                                onMouseEnter: event => { }, // mouse enter row
                                onMouseLeave: event => { }, // mouse leave row
                            };
                        }} columns={columns} dataSource={employerList} 
                        loading={employerList.length===0?true:false}
                        pagination={{
                            position: ['none','bottomCenter'],
                            defaultPageSize: 5,
                          }}

                        /></div>:<EmployerFormView employer={formData}/>}
                             

                    </div>
                </div>
            </div>
        </div>
    )
}

export default MemberList
