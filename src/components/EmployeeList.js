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
        {props.employees.length>0 && <h1 className="d-flex justify-content-center">Employees</h1>}
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
                                left: 15,
                                top: 0
                            }
                        }>
                            {
                            index + 1
                        }</Badge>
                        <ListGroupItem key={
                            `todo-list-${_id}`
                        }>
                            <Button style={
                                    {
                                        position: 'absolute',
                                        zIndex: 99,
                                        right: 0,
                                        top:0
                                    }
                                }
                                color="danger"
                                size="sm"
                                active
                                onClick={
                                    () => props.deleteEmployee(_id)
                            }>
                                <i class="fas fa-user-minus"></i>
                            </Button>
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
                        </ListGroupItem>
                    </Col>
                )
            })
        } </Row>
    </React.Fragment>
}
export default EmployeeList
