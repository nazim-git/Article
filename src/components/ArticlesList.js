import React from 'react'
import {
    Col,
    Button,
    FormGroup,
    ListGroupItem,
    Row,
    Badge
} from 'reactstrap'
const ArticlesList = (props) => {
    let { CustomInput, onChange } = props
    return <React.Fragment>
        {props.articles.length > 0 && <h1 className="d-flex justify-content-center">Articles</h1>}
        <hr />
        <Row> {
            props.articles.map((article, index) => {
                let {
                    _id,
                    title,
                    author,
                    body
                } = article
                let emp = {
                    title,
                    author,
                    body
                }
                return (
                    <Col md={6}>
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
                                    top: 0
                                }
                            }
                                color="danger"
                                size="sm"
                                active
                                onClick={
                                    () => props.delete(_id)
                                }>
                                <i class="fas fa-user-minus"></i>
                            </Button>
                            <FormGroup> {
                                Object.keys(emp).map(key => (
                                    <CustomInput name={key}
                                        value={
                                            article[key]
                                        }
                                        onChange={
                                            (e) => onChange({
                                                [key]: e.target.value
                                            }, _id)
                                        } />
                                ))
                            } </FormGroup>
                        </ListGroupItem>
                    </Col>
                )
            })
        } </Row>
    </React.Fragment>
}
export default ArticlesList
