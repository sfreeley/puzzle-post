import React, { useContext, useEffect, useState } from "react";
import { PuzzleContext } from "../../providers/PuzzleProvider";
import { Form, FormGroup, Label, Input, Button } from "reactstrap";
import { useHistory } from "react-router-dom";

const AddPuzzle = () => {
    const { addPuzzle } = useContext(PuzzleContext)
}
export default AddPuzzle;