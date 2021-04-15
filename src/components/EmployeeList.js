import React from 'react'
import {
    Col,
    InputGroup,
    Button,
    FormGroup,
    ListGroup,
    ListGroupItem,
    Row,
    Badge
} from 'reactstrap'
const EmployeeList = (props) => {
    let {CustomInput, onChange} = props
    return <React.Fragment>
        <h1 className="d-flex justify-content-center">Employees</h1>
        <hr/>
        <Row> {
            props.employees.map((employee, index) => {
                let {
                    _id,
                    name,
                    email,
                    phone,
                    address,
                    role,
                    gender
                } = employee
                let emp = {
                    name,
                    email,
                    phone,
                    address,
                    role,
                    gender
                }
                return (
                    <Col md={3}>
                        <Badge style={
                            {
                                position: 'absolute',
                                zIndex: 99,
                                marginLeft: 3,
                                marginTop: 3
                            }
                        }>
                            {
                            index + 1
                        }</Badge>
                        <ListGroupItem key={
                            `todo-list-${_id}`
                        }>
                            <InputGroup>
                                <FormGroup> {
                                    Object.keys(emp).map(key => (
                                        <CustomInput name={key}
                                            value={
                                                employee[key]
                                            }
                                            onChange={
                                                (e) => onChange({
                                                    [key]: e.target.value
                                                }, _id)
                                            }/>
                                    ))
                                } </FormGroup>
                                <InputGroup className="d-flex justify-content-end">
                                    <Button color="danger" size="md" active
                                        onClick={
                                            () => props.deleteEmployee(_id)
                                    }>Delete Employee</Button>
                                </InputGroup>
                            </InputGroup>
                        </ListGroupItem>
                    </Col>
                )
            })
        } </Row>
    </React.Fragment>
}
export default EmployeeList
