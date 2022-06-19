import React, { useState } from "react";
import { MDBCard, MDBCardBody, MDBCardFooter, MDBValidation, MDBBtn, MDBSpinner, MDBValidationItem } from "mdb-react-ui-kit";
import ChipInput from "material-ui-chip-input";
import FileBase from "react-file-base64";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const initialState = {
    title: "",
    description: "",
    tags: [],
};

const AddEditTour = () => {
    const [tourData, setTourData] = useState(initialState);
    const { title, description, tags } = tourData;

    const onInputChange = () => {}

    const handleAddTag = () => {}

    const handleDeleteTag = () => {}

    return (
        <div style={{ margin: "auto", padding: "15px", maxWidth: "450px", alignContent: "center", marginTop: "120px" }} className="container">
            <MDBCard alignment="center">
                <h5>Add Tour</h5>
                <MDBValidation>
                    <MDBValidationItem className="col-md-12" feedback="Please provide title" invalid>
                        <input type="text" placeholder="Enter Title" name="title" value={title} onChange={onInputChange} className="form-control" required />
                    </MDBValidationItem>
                    <MDBValidationItem className="col-md-12" feedback="Please provide description" invalid>
                        <textarea style={{height: '100px'}} type="text" placeholder="Enter Description" name="description" value={description} onChange={onInputChange} className="form-control" required />
                    </MDBValidationItem>
                    <div className="col-md-12">
                        <ChipInput name="tags" variant="outlined" placeholder="Enter Tag" fullWidth value={tags} onAdd={(tag) => handleAddTag(tag)} onDelete={(tag) => handleDeleteTag(tag)} />
                    </div>
                </MDBValidation>
            </MDBCard>
        </div>
    );
};

export default AddEditTour;
