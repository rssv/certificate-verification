import React from 'react';
import classes from './ViewSignDetails.module.css';


const ViewSignDetails = (props) => {

    const details = props.signDetails.map((detail) => {
        return {...detail.transaction, 
            input: detail.data.inputs, 
            timestamp: detail.block.timestamp,
            admNo: detail.admNo,
            semNo: detail.semNo
        }
    })
    
    return (
        <div className={classes.backdrop}>
            <div className={classes.modal}>
                <div className={classes.empty} />
                <p className={classes.tab0}>[</p>

                {details.map((detail, i) => {
                    let d = new Date(0);
                    d.setUTCSeconds(detail.timestamp);
                    return(
                        <div key={i}>
                            <p className={classes.tab1}>{`{`}</p>
                            <p className={classes.tab2}>{`"admissionNo.": "${detail.admNo}",`}</p>
                            <p className={classes.tab2}>{`"semesterNo.": "${detail.semNo}",`}</p>
                            <p className={classes.tab2}>{`"blockHash": "${detail.blockHash}",`}</p>
                            <p className={classes.tab2}>{`"blockNumber": ${detail.blockNumber},`}</p>
                            <p className={classes.tab2}>{`"from": "${detail.from}",`}</p>
                            <p className={classes.tab2}>{`"gas": ${detail.gas},`}</p>
                            <p className={classes.tab2}>{`"gasPrice": "${detail.gasPrice}",`}</p>
                            <p className={classes.tab2}>{`"transactionHash": "${detail.hash}",`}</p>
                            <p className={classes.tab2}>"input": [</p>
                            <p className={classes.tab3}>{`"${detail.input[0]}",`}</p>
                            <p className={classes.tab3}>{`"${detail.input[1]}"`}</p>
                            <p className={classes.tab2}>],</p>
                            <p className={classes.tab2}>{`"nonce": ${detail.nonce},`}</p>
                            <p className={classes.tab2}>{`"to": "${detail.to}",`}</p>
                            <p className={classes.tab2}>{`"transactionIndex": ${detail.transactionIndex},`}</p>
                            <p className={classes.tab2}>{`"type": ${detail.type},`}</p>
                            <p className={classes.tab2}>{`"value": "${0}"`}</p>
                            <p className={classes.tab2}>{`"timestamp": "${d.toUTCString()}"`}</p>
                            <p className={classes.tab1}>{`},`}</p>
                        </div>
                    )
                })}
    
                <p className={classes.tab0}>]</p>
                <div className={classes.empty} />
                <footer className={classes.footer}>
                    <div className={classes.footer_deny}><button onClick={props.denyHandler}>Cancel</button></div>
                </footer>
            </div>
            
        </div>
    )
}

export default ViewSignDetails;