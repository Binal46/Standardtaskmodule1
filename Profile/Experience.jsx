/* Experience section */
import React from 'react';
import Cookies from 'js-cookie';
import { Form, Table, Button, Icon } from 'semantic-ui-react';
import { ChildSingleInput } from '../Form/SingleInput.jsx';
import moment from 'moment';

export default class Experience extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            experience: {
                Company: "",
                Position: "",
                Responsibilities: "",
                Start: "",
                End:""
            },
            newExperience: [],
            ShowAddSection: false,
            ShowUpdateSection: false,
            updateId: ''
        }

        this.handleChange = this.handleChange.bind(this)
        this.ShowAddExperience = this.ShowAddExperience.bind(this)
        this.CloseAddExperience = this.CloseAddExperience.bind(this)
        this.AddExperience = this.AddExperience.bind(this)
        this.UpdateExperience = this.UpdateExperience.bind(this)
        this.DeleteExperience = this.DeleteExperience.bind(this)
        this.renderEdit = this.renderEdit.bind(this)
        this.showUpdateExperience = this.showUpdateExperience.bind(this)
        this.cancelUpdate = this.cancelUpdate.bind(this)

        this.GetExperience()
    };

    ShowAddExperience(e) {
        e.preventDefault();
        this.setState({ ShowAddSection: true })
    }
    CloseAddExperience() {
        this.setState({ ShowAddSection: false })
    }

    handleChange(event) {

        const data = Object.assign({}, this.state.experience)
        data[event.target.name] = event.target.value
        console.log("Experience data", data)
        this.setState({
            experience: data
        })
    }

    GetExperience() {
        var cookies = Cookies.get('talentAuthToken');
        $.ajax({
            url: 'http://localhost:60290/profile/profile/getExperience',
            headers: {
                'Authorization': 'Bearer ' + cookies,
                'Content-Type': 'application/json'
            },
            type: "GET",
            success: function (res) {
                console.log("GetExperience", res)
                if (res.data) {
                    this.setState({
                        newExperience: res.data
                    })
                }
            }.bind(this)
        })
    }


    AddExperience() {
        console.log(JSON.stringify(this.state.experience))
        const data = Object.assign({}, this.state.experience)
        console.log(data)

        var cookies = Cookies.get('talentAuthToken');
        $.ajax({
            url: 'http://localhost:60290/profile/profile/addExperience',
            headers: {
                'Authorization': 'Bearer ' + cookies,
                'Content-Type': 'application/json'
            },
            type: "POST",
            dataType: "json",
            data: JSON.stringify(this.state.experience),
            success: function (res) {
                console.log(res)
                if (res.success == true) {

                    this.GetExperience();
                    TalentUtil.notification.show("Experience added sucessfully", "success", null, null)
                } else {
                    TalentUtil.notification.show("Experience did not add successfully", "error", null, null)
                }

            }.bind(this),
            error: function (res, a, b) {
                console.log(res)
                console.log(a)
                console.log(b)
            }
        })
    }

    UpdateExperience(e) {
        e.preventDefault();
        console.log(JSON.stringify(this.state.experience))
        const data = Object.assign({}, this.state.experience)

        console.log("update data", data)
        var cookies = Cookies.get('talentAuthToken');
        $.ajax({
            url: 'http://localhost:60290/profile/profile/updateExperience',
            headers: {
                'Authorization': 'Bearer ' + cookies,
                'Content-Type': 'application/json'
            },
            type: "POST",
            dataType: "json",
            data: JSON.stringify(this.state.experience),
            success: function (res) {
                console.log(res)
                if (res.success == true) {

                    this.GetExperience();

                    TalentUtil.notification.show("Experience updated sucessfully", "success", null, null)
                } else {
                    TalentUtil.notification.show("Experience did not update successfully", "error", null, null)
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


    DeleteExperience(i) {
        var row = this.state.newExperience[i];
        console.log(row);

        var cookies = Cookies.get('talentAuthToken');
        $.ajax({
            url: 'http://localhost:60290/profile/profile/deleteExperience',
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
                    this.GetExperience();
                    TalentUtil.notification.show("Experience deleted sucessfully", "success", null, null)
                } else {
                    TalentUtil.notification.show("Experience did not delete successfully", "error", null, null)
                }

            }.bind(this),
            error: function (res, a, b) {
                console.log(res)
                console.log(a)
                console.log(b)
            }
        })

    }

    showUpdateExperience(dataId, dataCompany, dataPosition, dataResponsibilities, dataStart, dataEnd) {

        console.log(dataId);
        const data = Object.assign({}, this.state.experience)

        const startDate = moment(dataStart).format('YYYY-MM-DD');
        const endDate = moment(dataEnd).format('YYYY-MM-DD');

        data['id'] = dataId
        data['Company'] = dataCompany
        data['Position'] = dataPosition
        data['Responsibilities'] = dataResponsibilities
        data['Start'] = startDate
        data['End'] = endDate

            this.setState({ ShowUpdateSection: true, updateId: dataId, experience: data })
        console.log(' showUpdateExperience', data);
    }

    cancelUpdate() {
        this.setState({ ShowUpdateSection: false })
    }


    render() {
        console.log("Experience record", this.state.newExperience)
       
        return (
            <div className='ui sixteen wide column'>
                {this.state.ShowAddSection ? this.renderEdit() : ''}
                

                 <Table>
                    <Table.Header>
                        <Table.Row>

                            <Table.HeaderCell>Company</Table.HeaderCell>
                            <Table.HeaderCell>Position</Table.HeaderCell>
                            <Table.HeaderCell>Responsibilities</Table.HeaderCell>
                            <Table.HeaderCell>Start Date</Table.HeaderCell>
                            <Table.HeaderCell>End Date</Table.HeaderCell>
                            <Table.HeaderCell textAlign='right'>
                                <Button floated='right' secondary onClick={this.ShowAddExperience.bind(this)} > <Icon name='plus' />Add New
                           </Button></Table.HeaderCell>
                    </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {this.state.newExperience.map((data, i) => {
                            const startDate = moment(data.start).format('DD MMM, YYYY');
                            const endDate = moment(data.end).format('DD MMM, YYYY');
                            

                            
                            if (this.state.ShowUpdateSection) {
                                if (this.state.updateId === data.id) {
                                    return (
                                        <Table.Row >

                                            <div key={i} style={{ marginTop: '10px', marginLeft: '10px', marginRight: '10px', marginBottom: '10px' }}>

                                                <Form>
                                            <Form.Group widths='equal'>

                                                <ChildSingleInput
                                                    inputType="text"
                                                    label="Company:"
                                                    name="Company"
                                                    controlFunc={this.handleChange}
                                                    maxLength={80}
                                                    value={this.state.experience.Company}
                                                    placeholder="Company"
                                                    errorMessage="Please enter a valid Company "
                                                />
                                                <ChildSingleInput
                                                    inputType="text"
                                                    label="Position:"
                                                    name="Position"
                                                    controlFunc={this.handleChange}
                                                    value={this.state.experience.Position}
                                                    maxLength={80}
                                                    placeholder="Position"
                                                    errorMessage="Please enter a valid Position "
                                                />

                                            </Form.Group>
                                                    <Form.Group widths='equal'>

                                                        <ChildSingleInput
                                                            inputType="date"
                                                            label="Start Date:"
                                                            name="Start"
                                                            controlFunc={this.handleChange}
                                                            maxLength={80}
                                                            value={this.state.experience.Start}
                                                            placeholder="27/08/2020"
                                                            errorMessage="Please enter a valid date "
                                                        />
                                                        <ChildSingleInput
                                                            inputType="date"
                                                            label="End Date:"
                                                            name="End"
                                                            controlFunc={this.handleChange}
                                                            maxLength={80}
                                                            value={this.state.experience.End}
                                                            placeholder="27/08/2020"
                                                            errorMessage="Please enter a valid date "
                                                        />

                                                    </Form.Group>
                                            <Form.Field>

                                                <ChildSingleInput
                                                    inputType="text"
                                                    label="Responsibilities:"
                                                    name="Responsibilities"
                                                    controlFunc={this.handleChange}
                                                    maxLength={80}
                                                    value={this.state.experience.Responsibilities}
                                                    placeholder="Responsibilities"
                                                    errorMessage="Please enter a valid Responsibilities "
                                                />
                                            </Form.Field>
                                            <div style={{ marginTop: '10px' }}>
                                                <button type="button" className="ui teal button" onClick={this.UpdateExperience}>Update</button>
                                                <button type="button" className="ui button" onClick={this.cancelUpdate}>Cancel</button>
                                            </div>
                                        </Form>
                                            
                                            </div>
                                           
                                            </Table.Row>
                                    )
                                } else {
                                    return (

                                        <Table.Row key={i}>


                                            <Table.Cell>{data.company}</Table.Cell>
                                            <Table.Cell>{data.position}</Table.Cell>
                                            <Table.Cell>{data.responsibilities}</Table.Cell>
                                            <Table.Cell>{startDate}</Table.Cell>
                                            <Table.Cell>{endDate}</Table.Cell>

                                            <Table.Cell textAlign='right'>
                                                <Icon name='pencil' onClick={this.showUpdateExperience.bind(this, data.id, data.company, data.position, data.responsibilities, data.start, data.end)} />
                                                <Icon name='cancel' onClick={this.DeleteExperience.bind(this, i)} />
                                            </Table.Cell>

                                        </Table.Row>

                                    )
                                }
                            } else {
                                return (

                                    <Table.Row key={i}>


                                        <Table.Cell>{data.company}</Table.Cell>
                                        <Table.Cell>{data.position}</Table.Cell>
                                        <Table.Cell>{data.responsibilities}</Table.Cell>
                                        <Table.Cell>{startDate}</Table.Cell>
                                        <Table.Cell>{endDate}</Table.Cell>

                                        <Table.Cell textAlign='right'>
                                            <Icon name='pencil' onClick={this.showUpdateExperience.bind(this, data.id, data.company, data.position, data.responsibilities, data.start, data.end)} />
                                            <Icon name='cancel' onClick={this.DeleteExperience.bind(this, i)} />
                                        </Table.Cell>

                                    </Table.Row>

                                )
                            }
                            
                        })}
                    </Table.Body>


                  </Table>
            </div>

        )
        
    }

   

    renderEdit() {
        return (
            <Form>
                <Form.Group widths='equal'>

                    <ChildSingleInput
                        inputType="text"
                        label="Company:"
                        name="Company"
                        controlFunc={this.handleChange}
                        maxLength={80}
                        placeholder="Company"
                        errorMessage="Please enter a valid Company "
                    />
                    <ChildSingleInput
                        inputType="text"
                        label="Position:"
                        name="Position"
                        controlFunc={this.handleChange}
                        maxLength={80}
                        placeholder="Position"
                        errorMessage="Please enter a valid Position "
                    />

                </Form.Group>
                <Form.Group widths='equal'>

                    <ChildSingleInput
                        inputType="date"
                        label="Start Date:"
                        name="Start"
                        controlFunc={this.handleChange}
                        maxLength={80}
                        placeholder="27/08/2020"
                        errorMessage="Please enter a valid date "
                    />
                    <ChildSingleInput
                        inputType="date"
                        label="End Date:"
                        name="End"
                        controlFunc={this.handleChange}
                        maxLength={80}
                        placeholder="27/08/2020"
                        errorMessage="Please enter a valid date "
                    />

                </Form.Group>
                <Form.Field>

                    <ChildSingleInput
                        inputType="text"
                        label="Responsibilities:"
                        name="Responsibilities"
                        controlFunc={this.handleChange}
                        maxLength={80}
                        placeholder="Responsibilities"
                        errorMessage="Please enter a valid Responsibilities "
                    />
                </Form.Field>
                <div style={{ marginTop: '10px' }}>
                    <button type="button" className="ui teal button" onClick={this.AddExperience}>Add</button>
                    <button type="button" className="ui button" onClick={this.CloseAddExperience}>Cancel</button>
                </div>
            </Form>
            
            )
    }
}
