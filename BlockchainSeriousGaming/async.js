function waitAsync() {
    return new Promise(result => {
        setTimeout(() => {
            result('DONE!');
        }, 500);
    });
}

async function asyncCall() {
    console.log('executing');
    const result = await waitAsync();
    console.log('.');
    await waitAsync();
    console.log('.');
    await waitAsync();
    console.log('.');
    await waitAsync();
    console.log(result);
    // Expected output: "resolved"
}

asyncCall();
