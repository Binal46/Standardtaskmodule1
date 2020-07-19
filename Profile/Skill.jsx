/* Skill section */
import React from 'react';
import Cookies from 'js-cookie';
import { ChildSingleInput } from '../Form/SingleInput.jsx';
import { Table, Button, Icon, Form, Dropdown} from 'semantic-ui-react'


const options = [
    { key: 1, text: 'Beginner', value: 'Beginner' },
    { key: 2, text: 'Intermediate', value: 'Intermediate' },
    { key: 3, text: 'Expert', value: 'Expert' },
]

export default class Skill extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            skills: {
               id:"",
                name: "",
                level: ""
            },
            newSkills: [],
            ShowAddSection: false,
            ShowUpdateSection: false,
            updateId:''
           
        }
       
        this.handleChange = this.handleChange.bind(this)
        this.handleChangeLevel = this.handleChangeLevel.bind(this)
        this.AddSkill = this.AddSkill.bind(this)
        this.UpdateSkill = this.UpdateSkill.bind(this)
        this.DeleteSkill = this.DeleteSkill.bind(this)
        this.closeAddSkill = this.closeAddSkill.bind(this)
        this.ShowAddSkill = this.ShowAddSkill.bind(this)
        this.showUpdateSkill = this.showUpdateSkill.bind(this)
        this.cancelUpdate = this.cancelUpdate.bind(this)
        this.renderAddSkill = this.renderAddSkill.bind(this)
        
        this.GetSkills();
    };

    
    ShowAddSkill(e) {
        e.preventDefault();
        this.setState({ ShowAddSection: true })
    }

    closeAddSkill() {
        this.setState({ ShowAddSection: false })
    }

    handleChange(event) {
        
        const data = Object.assign({}, this.state.skills)
      
        data[event.target.name] = event.target.value
         this.setState({
             skills: data
        })
        console.log("skill data", data)
    }
    handleChangeLevel(event, { value, name }) {
       
        const data = Object.assign({}, this.state.skills)
       
        data[name] = value
        this.setState({
            skills: data
        })

        console.log("skill data", data)
    }

    GetSkills() {
        var cookies = Cookies.get('talentAuthToken');
        $.ajax({
            url: 'http://localhost:60290/profile/profile/getSkill',
            headers: {
                'Authorization': 'Bearer ' + cookies,
                'Content-Type': 'application/json'
            },
            type: "GET",
            success: function (res) {
                console.log("GetSkill", res)
                if (res.data) {
                    this.setState({
                        newSkills: res.data
                    })
                }
            }.bind(this)
        })
        
    }
    
    AddSkill() {
        console.log(JSON.stringify(this.state.skills))
        const data = Object.assign({}, this.state.skills)
        console.log("save data", data)
        console.log("save data", this.state.skills.name)
        console.log("save data", this.state.skills.level)

        if (this.state.skills.name != null && this.state.skills.name.length > 0 && this.state.skills.level != null && this.state.skills.level.length > 0) {
            var cookies = Cookies.get('talentAuthToken');
            $.ajax({
                url: 'http://localhost:60290/profile/profile/addSkill',
                headers: {
                    'Authorization': 'Bearer ' + cookies,
                    'Content-Type': 'application/json'
                },
                type: "POST",
                dataType: "json",
                data: JSON.stringify(this.state.skills),
                success: function (res) {
                    console.log(res)
                    if (res.success == true) {

                        this.GetSkills();

                        TalentUtil.notification.show("skill added sucessfully", "success", null, null)
                    } else {
                        TalentUtil.notification.show("skill did not add successfully", "error", null, null)
                    }

                }.bind(this),
                error: function (res, a, b) {
                    console.log(res)
                    console.log(a)
                    console.log(b)
                }
            })

        } else {
            TalentUtil.notification.show("Please enter Skill And Level", "error", null, null)
        }
        
       
    }


    UpdateSkill(e) {
        e.preventDefault();
        console.log(JSON.stringify(this.state.skills))
        const data = Object.assign({}, this.state.skills)

        console.log("update data", data)
        var cookies = Cookies.get('talentAuthToken');
        $.ajax({
            url: 'http://localhost:60290/profile/profile/updateSkill',
            headers: {
                'Authorization': 'Bearer ' + cookies,
                'Content-Type': 'application/json'
            },
            type: "POST",
            dataType: "json",
            data: JSON.stringify(this.state.skills),
            success: function (res) {
                console.log(res)
                if (res.success == true) {

                    this.GetSkills();

                    TalentUtil.notification.show("skill updated sucessfully", "success", null, null)
                } else {
                    TalentUtil.notification.show("skill did not update successfully", "error", null, null)
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


   
    DeleteSkill(i) {
        var row = this.state.newSkills[i];
        console.log(row);
        
        var cookies = Cookies.get('talentAuthToken');
        $.ajax({
            url: 'http://localhost:60290/profile/profile/deleteSkill',
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
                    this.GetSkills();
                    TalentUtil.notification.show("skill deleted sucessfully", "success", null, null)
                } else {
                    TalentUtil.notification.show("skill did not delete successfully", "error", null, null)
                }

            }.bind(this),
            error: function (res, a, b) {
                console.log(res)
                console.log(a)
                console.log(b)
            }
        })
    }

    showUpdateSkill(dataId, i, dataName, dataLevel) {
       
        console.log(dataId);
        const data = Object.assign({}, this.state.skills)
        data['id'] = dataId
        data['name'] = dataName
        data['level'] = dataLevel

        this.setState({ ShowUpdateSection: true, updateId: dataId, skills: data })
        console.log('showUpdateSkill',data);
    }

    cancelUpdate() {
        this.setState({ ShowUpdateSection: false })
    }
    render() {
        console.log("skill record", this.state.newSkills)
        return (
           
            <div className='ui sixteen wide column'>
                {this.state.ShowAddSection ? this.renderAddSkill() : ''}
             
                <Table >
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>Skill</Table.HeaderCell>
                            <Table.HeaderCell>Level</Table.HeaderCell>
                            <Table.HeaderCell textAlign='right'>
                                <Button floated='right' secondary onClick={this.ShowAddSkill.bind(this)}> <Icon name='plus' />Add New
                           </Button></Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                   
                    <Table.Body>

                        {this.state.newSkills.map((data, i) => {

                            return (
                                
                                <Table.Row key={i} >

                                    {this.state.ShowUpdateSection ?
                                        (this.state.updateId ===data.id)?
                                            < Table.Cell >                                              
                                                <ChildSingleInput
                                                    inputType="text"
                                                    name="name"
                                                    controlFunc={this.handleChange}
                                                    maxLength={80}
                                                    value={this.state.skills.name}
                                                    placeholder="update skill "
                                                    errorMessage="Please enter a valid skill "
                                            /> </ Table.Cell > : < Table.Cell > {data.name}</Table.Cell>
                                        
                                        : < Table.Cell > {data.name}</Table.Cell>}


                                  
                                    {this.state.ShowUpdateSection ? (this.state.updateId === data.id) ?
                                        < Table.Cell >
                                        <Dropdown
                                                placeholder='Level'
                                                name="level"
                                                selection options={options}
                                                onChange={this.handleChangeLevel}
                                                value={this.state.skills.level}
                                            />
                                            </ Table.Cell >
                                        : <Table.Cell>{data.level}</Table.Cell>
                                        : <Table.Cell>{data.level}</Table.Cell>}


                                    {this.state.ShowUpdateSection ? (this.state.updateId === data.id) ? 
                                        <Table.Cell>
                                            <Button basic color='blue' onClick={this.UpdateSkill}>
                                                Update
                                            </Button>
                                            <Button basic color='red' onClick={this.cancelUpdate.bind(this)}>
                                                Cancel  
                                            </Button>
                                        </Table.Cell>
                                       : <Table.Cell textAlign='right'>
                                            <Icon name='pencil' onClick={this.showUpdateSkill.bind(this, data.id, i, data.name, data.level)} />
                                            <Icon name='cancel' onClick={this.DeleteSkill.bind(this, i)} />
                                        </Table.Cell>
                                        : <Table.Cell textAlign='right'>
                                            <Icon name='pencil' onClick={this.showUpdateSkill.bind(this, data.id, i, data.name, data.level)} />
                                            <Icon name='cancel' onClick={this.DeleteSkill.bind(this, i)} />
                                        </Table.Cell>}
       
                                        </Table.Row>
                                
                                

                            )
                        })}
                            </Table.Body>
                       

                    
                </Table>
           </div>


       )
    }

    renderAddSkill() {
        return (
            <Form>

                <Form.Group>
                    <ChildSingleInput
                        inputType="text"
                        name="name"
                        controlFunc={this.handleChange}
                        maxLength={80}
                        placeholder="Add skill "
                        errorMessage="Please enter a valid skill "
                        value={this.state.name}
                    />
                    <Dropdown
                        placeholder='Level'
                        name="level"
                        selection options={options}
                        onChange={this.handleChangeLevel}
                        value={this.state.level}

                    />
                    <button style={{ marginLeft: '10px' }} type="button" className="ui teal button" onClick={this.AddSkill}>Add</button>
                    <button type="button" className="ui button" onClick={this.closeAddSkill}>Cancel</button>
                </Form.Group>
            </Form>
            )
    }


    


    
}

