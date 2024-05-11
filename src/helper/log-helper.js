const printToTerminal = (err, requestId) => {
    console.log(JSON.stringify({logTime: new Date(), requestId: requestId, error: err}));
}

export default {
    printToTerminal
}