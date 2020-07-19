/* Language section */
import React from 'react';
import Cookies from 'js-cookie';
import { ChildSingleInput } from '../Form/SingleInput.jsx';
import { Table, Button, Icon, Form, Dropdown } from 'semantic-ui-react'

const options = [
    { key: 1, text: 'Beginner', value: 'Beginner' },
    { key: 2, text: 'Intermediate', value: 'Intermediate' },
    { key: 3, text: 'Expert', value: 'Expert' },


]
export default class Language extends React.Component {
    constructor(props) {
        super(props);

        

        this.state = {
                languageDetail: {
                    id:"",
                    name: "",
                    level: ""
                },
           
            newLanguage: [],
            ShowAddSection: false,
            ShowUpdateSection: false,
            updateId: ''
        }

        this.handleChange = this.handleChange.bind(this)
        this.handleChangelevel = this.handleChangelevel.bind(this)
        this.AddLanguage = this.AddLanguage.bind(this)
        this.UpdateLanguage = this.UpdateLanguage.bind(this)
        this.DeleteLanguage = this.DeleteLanguage.bind(this)
        this.renderEdit = this.renderEdit.bind(this)
        this.ShowAddLanguage = this.ShowAddLanguage.bind(this)
        this.CloseAddLanguage = this.CloseAddLanguage.bind(this)
        this.showUpdateLanguage = this.showUpdateLanguage.bind(this)
        this.cancelUpdate = this.cancelUpdate.bind(this)
        
       

        this.GetLanguages();
    }


    ShowAddLanguage(e) {
        e.preventDefault();
        this.setState({ ShowAddSection: true })
    }

    CloseAddLanguage() {
        this.setState({ ShowAddSection: false })
    }
    handleChange(event) {
        const data = Object.assign({}, this.state.languageDetail)
        data[event.target.name] = event.target.value
        console.log("language data", data)
        this.setState({
            languageDetail: data
        })
    }

    handleChangelevel(event, { name, value }) {
        const data = Object.assign({}, this.state.languageDetail)
        data[name] = value
        console.log("language data", data)
        this.setState({
            languageDetail: data
        })
    }

    GetLanguages() {
        var cookies = Cookies.get('talentAuthToken');
        $.ajax({
            url: 'http://localhost:60290/profile/profile/getLanguage',
            headers: {
                'Authorization': 'Bearer ' + cookies,
                'Content-Type': 'application/json'
            },
            type: "GET",
            success: function (res) {
                console.log("GetLanguage", res)
                if (res.data) {
                    this.setState({
                        newLanguage: res.data
                    })
                }
            }.bind(this)
        })
    }

    AddLanguage() {
        console.log(JSON.stringify(this.state.languageDetail))
        const data = Object.assign({}, this.state.languageDetail)
        console.log(data)

        if (this.state.languageDetail.name != null && this.state.languageDetail.name.length > 0
            && this.state.languageDetail.level != null && this.state.languageDetail.level.length > 0) {
            var cookies = Cookies.get('talentAuthToken');
            $.ajax({
                url: 'http://localhost:60290/profile/profile/addLanguage',
                headers: {
                    'Authorization': 'Bearer ' + cookies,
                    'Content-Type': 'application/json'
                },
                type: "POST",
                dataType: "json",
                data: JSON.stringify(this.state.languageDetail),
                success: function (res) {
                    console.log(res)
                    if (res.success == true) {

                        this.GetLanguages();

                        TalentUtil.notification.show("Language added sucessfully", "success", null, null)
                    } else {
                        TalentUtil.notification.show("Language did not add successfully", "error", null, null)
                    }

                }.bind(this),
                error: function (res, a, b) {
                    console.log(res)
                    console.log(a)
                    console.log(b)
                }
            })
        } else {
            TalentUtil.notification.show("Please enter Language and Level", "error", null, null)
        }
        
    }

    UpdateLanguage(e) {
        e.preventDefault();
        console.log(JSON.stringify(this.state.languageDetail))
        const data = Object.assign({}, this.state.languageDetail)

        console.log("update data", data)
        var cookies = Cookies.get('talentAuthToken');
        $.ajax({
            url: 'http://localhost:60290/profile/profile/updateLanguage',
            headers: {
                'Authorization': 'Bearer ' + cookies,
                'Content-Type': 'application/json'
            },
            type: "POST",
            dataType: "json",
            data: JSON.stringify(this.state.languageDetail),
            success: function (res) {
                console.log(res)
                if (res.success == true) {

                    this.GetLanguages();

                    TalentUtil.notification.show("Language updated sucessfully", "success", null, null)
                } else {
                    TalentUtil.notification.show("Language did not update successfully", "error", null, null)
                }

            }.bind(this),
            error: function (res, a, b) {
                console.log(res)
                console.log(a)
                console.log(b)
            }
        })

        this.setState({ ShowUpdateSection: false })
    }

    DeleteLanguage(i) {
        var row = this.state.newLanguage[i];
        console.log(row);

        var cookies = Cookies.get('talentAuthToken');
        $.ajax({
            url: 'http://localhost:60290/profile/profile/deleteLanguage',
            headers: {
                'Authorization': 'Bearer ' + cookies,
                'Content-Type': 'application/json'
            },
            type: "POST",
            dataType: "json",
            data: JSON.stringify(row),
            success: function (res) {
                console.log(res)
                if (res.success == true) {
                    this.GetLanguages();
                    TalentUtil.notification.show("Language deleted sucessfully", "success", null, null)
                } else {
                    TalentUtil.notification.show("Language did not delete successfully", "error", null, null)
                }

            }.bind(this),
            error: function (res, a, b) {
                console.log(res)
                console.log(a)
                console.log(b)
            }
        })
    }

    showUpdateLanguage(dataId, i, dataName, dataLevel) {

        console.log(dataId);
        const data = Object.assign({}, this.state.languageDetail)
        data['id'] = dataId
        data['name'] = dataName
        data['level'] = dataLevel

        this.setState({ ShowUpdateSection: true, updateId: dataId, languageDetail: data })
        console.log('showUpdateLanguage', data);
    }

    cancelUpdate() {
        this.setState({ ShowUpdateSection: false })
    }

    render() {
        console.log("Language record", this.state.newLanguage)
        return (
            <div className='ui sixteen wide column'>
                {this.state.ShowAddSection ? this.renderEdit() : ''}
                
                    
                <Table>

                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>Language</Table.HeaderCell>
                            <Table.HeaderCell>Level</Table.HeaderCell>
                            <Table.HeaderCell textAlign='right'>
                                <Button floated='right' secondary onClick={this.ShowAddLanguage.bind(this)}>
                                    <Icon name='plus' />Add New
                           </Button></Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {this.state.newLanguage.map((data, i) => {
                            return (

                                <Table.Row key={i}>
                                    {this.state.ShowUpdateSection ?
                                        (this.state.updateId === data.id) ?
                                            < Table.Cell >
                                                <ChildSingleInput
                                                    inputType="text"
                                                    name="name"
                                                    controlFunc={this.handleChange}
                                                    maxLength={80}
                                                    value={this.state.languageDetail.name}
                                                    placeholder="update Language "
                                                    errorMessage="Please enter a valid language "
                                                /> </ Table.Cell > : < Table.Cell > {data.name}</Table.Cell>

                                        : < Table.Cell > {data.name}</Table.Cell>}

                                    {this.state.ShowUpdateSection ? (this.state.updateId === data.id) ?
                                        < Table.Cell >
                                            <Dropdown
                                                placeholder='Level'
                                                name="level"
                                                selection options={options}
                                                onChange={this.handleChangelevel}
                                                value={this.state.languageDetail.level}
                                            />
                                        </ Table.Cell >
                                        : <Table.Cell>{data.level}</Table.Cell>
                                        : <Table.Cell>{data.level}</Table.Cell>}

                                    {this.state.ShowUpdateSection ? (this.state.updateId === data.id) ?
                                        <Table.Cell>
                                            <Button basic color='blue' onClick={this.UpdateLanguage}>
                                                Update
                                            </Button>
                                            <Button basic color='red' onClick={this.cancelUpdate.bind(this)}>
                                                Cancel
                                            </Button>
                                        </Table.Cell>
                                        : <Table.Cell textAlign='right'>
                                            <Icon name='pencil' onClick={this.showUpdateLanguage.bind(this, data.id, i, data.name, data.level)} />
                                            <Icon name='cancel' onClick={this.DeleteLanguage.bind(this, i)} />
                                        </Table.Cell>
                                        : <Table.Cell textAlign='right'>
                                            <Icon name='pencil' onClick={this.showUpdateLanguage.bind(this, data.id, i, data.name, data.level)} />
                                            <Icon name='cancel' onClick={this.DeleteLanguage.bind(this, i)} />
                                        </Table.Cell>}
                                </Table.Row>
                            )
                        })}
                    </Table.Body>


                </Table>

            </div>

            )
        
    }


    renderEdit() {
        return(
        <Form>

            <Form.Group>
                <ChildSingleInput
                    inputType="text"
                    name="name"
                    controlFunc={this.handleChange}
                    maxLength={80}
                    placeholder="Add language "
                    errorMessage="Please enter a valid language "
                />


                <Dropdown
                    placeholder='Level'
                    name="level"
                    selection options={options}
                    onChange={this.handleChangelevel} />

                    <button style={{ marginLeft: '10px' }} type="button" className="ui teal button" onClick={this.AddLanguage}>Add</button>
                    <button type="button" className="ui button" onClick={this.CloseAddLanguage} >Cancel</button>
            </Form.Group>


            </Form>
            )
    }

   
}