import React, {Component, Fragment} from 'react';
import {message, Modal} from "antd";
import requestUrl from "../api/requestUrl";
import {TableList} from "../api/common";
import PropType from "prop-types"
import {TableDelete} from "../api/common";
import TableBasis from "./Table";

class TableComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            //默认参数
            pageNumber: 1,
            pageSize: 10,
            //关键词
            keyWord: "",
            //复选框
            checkBoxValue: [],
            //表格加载
            tableLoading: false,
            data: [],
            total: 0,
            //    弹窗参数
            modalVisible: false,
            modalConfirmLoading: false,
        };
    }

    componentDidMount() {
        this.loadData();
        this.props.onRef(this);

    }

    loadData = () => {
        const {pageNumber, pageSize, keyWord} = this.state;
        const requestData = {
            url: requestUrl[this.props.config.url],
            method: this.props.config.method,
            data: {
                pageNumber,
                pageSize,
            }
        }
        if (keyWord) requestData.name = keyWord;
        this.setState({tableLoading: true})
        TableList(requestData).then(response => {
            const responseData = response.data.data;
            if (responseData.data) {
                this.setState({
                    data: responseData.data,
                    total: responseData.total,
                });
                console.log(responseData.data);
            }
            this.setState({tableLoading: false});
        }).catch(error => {
            console.log(error);
            this.setState({tableLoading: false});
        })
    }
    //复选框
    onCheckBox = (selectedRowKeys) => {
        this.setState({checkBoxValue: selectedRowKeys});
        console.log(selectedRowKeys);
    }
    //改变页码
    onChangeCurrentPage = (value) => {
        this.setState({
            pageNumber: value
        }, () => {
            this.loadData();
        });
    }
    //改变每页的item个数(第一个参数为当前页码。从0开始。第二个参数为每个页面的item个数)
    onChangeSizePage = (value, page) => {
        this.setState({
            pageNumber: 1,
            pageSize: page,
        }, () => {
            this.loadData();
        });
    }
    //确认弹窗
    modalThen = () => {
        //判断是否已选择删除的数据
        if (this.state.checkBoxValue.length === 0) {
            message.info("请选择需要删除的数据");
            return false;
        }
        this.setState({
            modalConfirmLoading: true,
        });
        const id = this.state.checkBoxValue.join();
        const requestData = {
            url: requestUrl[`${this.props.config.url}Delete`],
            method: this.props.config.method,
            data: {id},
        }
        TableDelete(requestData).then(response => {
                message.info(response.data.message);
                this.setState({
                    modalVisible: false,
                    modalConfirmLoading: false,
                    selectedRowKeys: [],
                })
                //重新加载数据
                this.loadData();
            }
        ).catch(error => {
            console.log(error);
            this.setState({
                modalVisible: false,
                id: "",
                modalConfirmLoading: false,
                selectedRowKeys: [],
            });
        })
    }
    //删除事件
    onHandleDelete = (id) => {
        this.setState({
            modalVisible: true,
        })
        if (id) this.setState({checkBoxValue: [id]});
    }

    render() {
        const {tableLoading, total} = this.state
        const {thead, checkbox, rowKey} = this.props.config;
        const rowSelection = {
            onChange: this.onCheckBox,
        }
        return (

            <Fragment>
                <TableBasis
                    columns={thead}
                    dataSource={this.state.data}
                    total={total}
                    changePageCurrent={this.onChangeCurrentPage}
                    changePageSize={this.onChangeSizePage}
                    batchButton={this.props.batchButton}
                    handleDelete={() => this.onHandleDelete()}
                    rowSelection={checkbox ? rowSelection : null}
                    rowKey={rowKey}
                    loading={tableLoading}
                />
                <Modal
                    title="提示"
                    visible={this.state.modalVisible}
                    onOk={this.modalThen}
                    onCancel={() => {
                        this.setState({
                            modalVisible: false,
                            id: "",
                        })
                    }}
                    okText="确认"
                    cancelText="取消"
                    confirmLoading={this.state.modalConfirmLoading}
                >
                    <p className="text-center">确认删除本条信息？<strong className="color-red">删除后将无法恢复。</strong></p>
                </Modal>
            </Fragment>

        );
    }
}

TableComponent.propTypes = {
    config: PropType.object,

}
TableComponent.defaultProps = {
    batchButton: false
}
export default TableComponent;
