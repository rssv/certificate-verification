import React, {useState} from 'react';
import classes from './Verify.module.css'


const Verify = () => {
    const [fileData, setFileData] = useState(null);
    const [inputAdmNo, setInputAdmNo] = useState("");
    const [inputSemNo, setInputSemNo] = useState("5")
    const [verdict, setVerdict] = useState("");
    const [buttonStatus, setButtonStatus] = useState("Verify");

    const inputFileChangeHandler = (e) => {
        setFileData(e.target.files[0]);
    }
    const inputAdmNoChangeHandler = (e) => {
        setInputAdmNo(e.target.value);
    }
    const inputSemNoChangeHandler = (e) => {
        setInputSemNo(e.target.value);
    }

    const submitHandler = (e) => {
        e.preventDefault();
        setButtonStatus("Verifying...");
        const data = new FormData();
        console.log(fileData);
        data.append('result', fileData);
        data.append('admNo', inputAdmNo);
        data.append('semNo', inputSemNo);

        fetch("http://localhost:4000/result/verify-new", {
            method: 'POST',
            headers: {
    
            },
            body: data,
            credentials: 'include'
        })
        .then(response => {
            console.log(response);
            return response.json();
        })
        .then(data => {
            console.log(data, "dtaaljsaljlajljalk");
            setVerdict(data.verdict);
        })
        .catch(e => {
            alert(e.message);
            console.log("errrrrrrr", e)
            setButtonStatus("Verify");
        })
    }

    const resetHandler = (e) => {
        e.preventDefault();
        document.getElementById("certificate-verification-form").reset();
        setVerdict("");
        setButtonStatus("Verify");
    }

    return (
        <section className={classes.auth}>
            <form onSubmit={submitHandler} id="certificate-verification-form">
                <div className={classes.file}>
                <label htmlFor='resultfile'>Result File</label>
                <input type='file' id='resultfile' required onChange={inputFileChangeHandler} />
                </div>
                <div className={classes.control}>
                <label htmlFor='admno'>Admission No.</label>
                <input type='text' id='admno' required onChange={inputAdmNoChangeHandler} />
                {/* <label htmlFor='blockNo'>Semester No.</label>
                <select name="semNo" id="semNo" onChange={inputSemNoChangeHandler}>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">final</option>
                        </select> */}
                </div>
                {verdict === "verified" && <h1 className={classes.verified}>Verified! certificate is correct</h1>}
                {verdict === "hash mismatched" && <h1 className={classes.not_verified}>Hash mismatched! certificate is not correct</h1>}
                <div className={classes.actions}>
                <div className={classes.fat}>{!verdict && <button type="submit">{buttonStatus}</button>}</div>
                <div className={classes.fat}>{verdict && <button type="reset" onClick={resetHandler}>Verify Another</button>}</div>
                </div>
            </form>
            
        </section>
    )
}

export default Verify;