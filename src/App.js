import React from "react"
import axios from "axios"
import {
    Row,
    InputGroup,
    InputGroupText,
    InputGroupAddon,
    Input,
    Card,
    CardBody,
    Button,
    FormGroup,
    CardHeader,
    Navbar,
    Nav,
    NavbarText,
    NavItem,
    NavbarBrand
} from "reactstrap"
import EmployeeList from "./components/EmployeeList"

const serverURL = "https://employee-profile-server.herokuapp.com"
export default class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            employees: [],
            employee: {
                name: "",
                email: "",
                phone: "",
                address: "",
                role: "",
                gender: ""
            },
            loading: false
        }
    }
    componentDidMount = _ => {
        this.getAllEmployees()
    }
    getAllEmployees = async () => {
        let employees = await axios.get(`${serverURL}/employees`)
        this.setState({
            employees: employees.data,
            loading: false,
            employee: {
                name: "",
                email: "",
                phone: "",
                address: "",
                role: "",
                gender: ""
            }
        })
    }
    addNewEmployee = (employee) => {
        this.setState({loading: true})
        axios.post(`${serverURL}/addEmployee`, employee).then(() => {
            alert("employee added");
            this.getAllEmployees()
        }).catch(err => alert(err + ""))
    }
    deleteEmployee = (emp_id) => {
        this.setState({
            employees: this.state.employees.filter(emp => {
                return emp._id !== emp_id
            })
        }, () => {
            axios.delete(`${serverURL}/deleteEmployee/${emp_id}`).then(() => alert("Employee deleted")).catch(err => {
                alert(err + "");
                this.getAllEmployees()
            })
        })
    }
    updateEmployee = (updatedObject, emp_id) => {
        this.setState({
            employees: this.state.employees.map(employee => {
                if (employee._id === emp_id) {
                    employee = {
                        ...employee,
                        ...updatedObject
                    }
                }
                return employee
            })
        }, () => {
            axios.post(`${serverURL}/updateEmployee/${emp_id}`, updatedObject).then(() => {
                console.log("employee updated")
            }).catch(err => {
                alert(err + "")
                this.getAllEmployees()
            })
        })

    }
    validate = () => {
        let validate = Object.values(this.state.employee).every(value => value);

        return validate
    }
    search = (employees, search) => {
        return employees.filter(employee => {
            let combinedString = Object.values(employee).map(e => e + "").join();
            console.log(combinedString, search)
            return combinedString.includes(search)
        })
    }
    render() {
        let {employee, employees, search} = this.state
        let {
            name,
            email,
            phone,
            address,
            role,
            gender
        } = employee
        if (search) 
            employees = this.search(employees, search)
        return (
            <React.Fragment>
                <Navbar color="dark" light expand="md">
                    <NavbarBrand className="mr-auto text-white">Employee Profile Management</NavbarBrand>
                </Navbar>
                <div className="mr-2 ml-2">
                <Row className="d-flex justify-content-center ">
                    <Card className="w-100">
                        <CardHeader>
                            Add New Employee
                        </CardHeader>
                        <CardBody>
                            <FormGroup> {
                                Object.keys(employee).map(key => (
                                    <CustomInput name={key}
                                        value={
                                            employee[key]
                                        }
                                        onChange={
                                            (e) => this.setState({
                                                employee: {
                                                    ...employee,
                                                    [key]: e.target.value
                                                }
                                            })
                                        }/>
                                ))
                            } </FormGroup>
                            <InputGroup className="d-flex justify-content-start ml-4">
                                <Button disabled={
                                        this.state.loading || !this.validate()
                                    }
                                    color="success"
                                    size="md"
                                    active
                                    onClick={
                                        () => this.addNewEmployee({
                                            ...this.state.employee
                                        })
                                }>Add Employee</Button>
                            </InputGroup>
                        </CardBody>
                    </Card>
                </Row>
                <CustomInput name="Search"
                    value={search}
                    placeholder="Search something . . ."
                    onChange={
                        (e) => this.setState({search: e.target.value})
                    }/>
                <EmployeeList employees={employees}
                    deleteEmployee={
                        this.deleteEmployee
                    }
                    updateEmployee={
                        this.updateEmployee
                    }
                    CustomInput={CustomInput}
                    onChange={
                        this.updateEmployee
                    }/>
                </div>
            </React.Fragment>
        )
    }
}
const CustomInput = ({
    name,
    value,
    placeholder = "",
    onChange = () => {}
}) => {
    return (
        <InputGroup className="w-100 pl-4 pr-4 mt-1">
            <InputGroupAddon style={{width:"90px"}}>
                <InputGroupText>{name.toUpperCase()}</InputGroupText>
            </InputGroupAddon>
            <Input type="text"
                placeholder={placeholder}
                value={value}
                onChange={onChange}/>
        </InputGroup>
    )
}
