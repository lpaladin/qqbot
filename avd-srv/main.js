const e = require('express');
const c = require('child_process');

const s = e();

// 以下是需要配置的部分
const listenAddr = '0.0.0.0';
const listenPort = 23333;
const adbPath = 'D:\\Program Files\\Nox\\bin\\nox_adb';

s.post("/login", (req, res, next) => {
    res.type("text");
    let qrContent = req.header("x-qrurl");
    if (!qrContent)
        return res.end("Missing argument");
    console.log(qrContent);
    qrContent = qrContent.replace(/&/g, '^&');
    res.end("Command acquired!");
    const cmd = `"${adbPath}" shell am start -n com.tencent.mobileqq/com.tencent.biz.qrcode.activity.QRLoginActivity ` +
        "--activity-no-user-action --es QR_CODE_STRING " + qrContent;
    c.exec(cmd, (e, out, err) => {
        console.log(e, out, err);
        setTimeout(() => {
            c.exec(`"${adbPath}" shell input tap 516 495`);
        }, 5000);
    });
});

s.listen(listenPort, listenAddr, () => {
    console.log(`Listening on ${listenAddr}:${listenPort}`);
});