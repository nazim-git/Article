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
    NavbarBrand
} from "reactstrap"
import ArticleList from "./components/ArticlesList"

const serverURL = "https://articlesbynazim-server.herokuapp.com"
export default class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            articles: [],
            article: {
                title: "",
                author: "",
                body: "",
            },
            loading: false
        }
    }
    componentDidMount = _ => {
        this.getAllArticles()
    }
    getAllArticles = async () => {
        let articles = await axios.get(`${serverURL}/articles`)
        this.setState({
            articles: articles.data,
            loading: false,
            article: {
                title: "",
                author: "",
                body: "",
            }
        })
    }
    addNewArticle = (article) => {
        this.setState({ loading: true })
        axios.post(`${serverURL}/addArticle`, article).then(() => {
            alert("article added");
            this.getAllArticles()
        }).catch(err => { alert(err + ""); this.getAllArticles() })
    }
    deleteArticle = (emp_id) => {
        this.setState({
            articles: this.state.articles.filter(emp => {
                return emp._id !== emp_id
            })
        }, () => {
            axios.delete(`${serverURL}/deleteArticle/${emp_id}`).then(() => alert("Article deleted")).catch(err => {
                alert(err + "");
                this.getAllArticles()
            })
        })
    }
    updateArticle = (updatedObject, emp_id) => {
        this.setState({
            articles: this.state.articles.map(article => {
                if (article._id === emp_id) {
                    article = {
                        ...article,
                        ...updatedObject
                    }
                }
                return article
            })
        }, () => {
            axios.post(`${serverURL}/updateArticle/${emp_id}`, updatedObject).then(() => {
                console.log("article updated")
            }).catch(err => {
                alert(err + "")
                this.getAllArticles()
            })
        })

    }
    validate = () => {
        let validate = Object.values(this.state.article).every(value => value);
        return validate
    }
    search = (articles, search) => {
        return articles.filter(article => {
            let combinedString = Object.values(article).map(e => e + "").join();
            console.log(combinedString, search)
            return combinedString.includes(search)
        })
    }
    render() {
        let { article, articles, search } = this.state
        let {
            title,
            author,
            body,
        } = article
        if (search)
            articles = this.search(articles, search)
        return (
            <React.Fragment>
                <Navbar color="dark" light expand="md">
                    <NavbarBrand className="mr-auto text-white">Articles Gallery</NavbarBrand>
                </Navbar>
                <div className="mr-2 ml-2">
                    <Row className="d-flex justify-content-center ">
                        <Card className="w-100">
                            <CardHeader>
                                Add New Article
                        </CardHeader>
                            <CardBody>
                                <FormGroup> {
                                    Object.keys(article).map(key => (
                                        <CustomInput name={key}
                                            value={
                                                article[key]
                                            }
                                            onChange={
                                                (e) => this.setState({
                                                    article: {
                                                        ...article,
                                                        [key]: e.target.value
                                                    }
                                                })
                                            } />
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
                                            () => this.addNewArticle({
                                                ...this.state.article
                                            })
                                        }>Add Article</Button>
                                </InputGroup>
                            </CardBody>
                        </Card>
                    </Row>
                    <CustomInput name="Search"
                        value={search}
                        placeholder="Search something . . ."
                        onChange={
                            (e) => this.setState({ search: e.target.value })
                        } />
                    <ArticleList articles={articles}
                        delete={
                            this.deleteArticle
                        }
                        CustomInput={CustomInput}
                        onChange={
                            this.updateArticle
                        } />
                </div>
            </React.Fragment>
        )
    }
}
const CustomInput = ({
    name = "",
    value = "",
    placeholder = "",
    onChange = () => { }
}) => {
    return (
        <InputGroup className="w-100 pl-4 pr-4 mt-1">
            <InputGroupAddon style={{ width: "90px" }}>
                <InputGroupText>{name.toUpperCase()}</InputGroupText>
            </InputGroupAddon>
            <Input type={value.length > 50 ? "textarea" : "text"}
                rows="1"
                placeholder={placeholder}
                value={value}
                onChange={onChange} />
        </InputGroup>
    )
}
