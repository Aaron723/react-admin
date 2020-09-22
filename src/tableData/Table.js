import React, {Component, Fragment} from 'react';
import {Button, Col, Pagination, Row, Table} from "antd";
import PropType from "prop-types";

class TableBasis extends Component {
    render() {
        const {columns, dataSource, total, changePageCurrent, changePageSize, batchButton, handleDelete, rowSelection, rowKey, loading} = this.props
        return (
            <Fragment>
                <Table
                    pagination={false}
                    columns={columns}
                    dataSource={dataSource}
                    rowSelection={rowSelection}
                    rowKey={rowKey}
                    loading={loading}
                    bordered
                />
                <div className="space-30">
                    <Row>
                        <Col span={8}>
                            {batchButton && <Button onClick={() => {
                                handleDelete()
                            }}>批量删除</Button>}
                        </Col>
                        <Col span={16}>
                            <Pagination
                                onChange={changePageCurrent}
                                onShowSizeChange={changePageSize}
                                className="pull-right"
                                total={total}
                                showQuickJumper
                                showSizeChanger
                                showTotal={() => `Total ${total} items`}
                            />
                        </Col>
                    </Row>
                </div>
            </Fragment>

        );
    }
}

TableBasis.propTypes = {
    columns: PropType.array,
    dataSource: PropType.array,
    total: PropType.number,
    changePageCurrent: PropType.func,
    changePageSize: PropType.func,
    batchButton: PropType.bool,
    handleDelete: PropType.func,
    rowSelection: PropType.object,
    rowKey: PropType.string,
    loading:PropType.bool
}
TableBasis.defaultProps = {
    columns: [],
    dataSource: [],
    total: 0,
    batchButton: false,
    rowKey:"id",
    loading: false,
}
export default TableBasis;
