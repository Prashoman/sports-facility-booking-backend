import { Request, Response } from "express";
import catchAsyn from "../../../utils/catchAsyn";
import { PaymentService } from "./payment.service";

const paymentSuccess = catchAsyn(async (req: Request, res: Response) => {
  const { transId } = req.query;
  const result = await PaymentService.paymentSuccessToDB(Number(transId));
  if (!result?.bookingInfo || !result?.userInfo) {
   return res.send("Payment failed");
  }
console.log({result});

  res.send(`
    <!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Payment Success</title>
  <style>
    body {
      margin: 0;
      font-family: Arial, sans-serif;
    }
  </style>
</head>
<body>
  <div style="background-color: #1a202c; height: auto;">
    <div
      style="width: 100%; padding: 20px; display: flex; align-items: center; justify-content: center; background-color: #374151;"
    >
      <div
        style="width: 45%; box-shadow: 0px 4px 6px -1px rgba(72, 187, 120, 0.5); padding: 20px 40px; background-color: #475569;"
      >
        <div style="width: 100%; display: flex; align-items: center; justify-content: center;">
          <img
            src='https://i.ibb.co.com/TDyW8YM/success.jpg'
            style="width: 120px; height: 110px;"
            alt="success-payment"
          />
        </div>

        <div style="padding-top: 40px; padding-bottom: 12px; space-y: 8px;">
          <div>
            <h1
              style="font-size: 25px; text-align: center; font-weight: 500; color: #f1f5f9;"
            >
              Payment Successful
            </h1>
          </div>
          <div style="padding-top: 40px; padding-bottom: 12px; space-y: 8px;">
            <div
              style="display: flex; align-items: center; justify-content: space-between;"
            >
              <span style="font-size: 16px; color: #d1d5db;">Payment type</span>
              <span style="font-size: 16px; color: #d1d5db;">Bank</span>
            </div>
            
            <div
              style="display: flex; align-items: center; justify-content: space-between;"
            >
              <span style="font-size: 16px; color: #d1d5db;">Mobile</span>
              <span style="font-size: 16px; color: #d1d5db;">${result?.userInfo?.phone}</span>
            </div>
            <div
              style="display: flex; align-items: center; justify-content: space-between;"
            >
              <span style="font-size: 16px; color: #d1d5db;">Email</span>
              <span style="font-size: 16px; color: #d1d5db;">${result?.userInfo?.email}</span>
            </div>
          </div>
          <div>
            <div
              style="display: flex; align-items: center; justify-content: space-between; padding: 12px 0;"
            >
              <span
                style="font-size: 15px; color: #d1d5db; font-weight: 500;"
              >
                Amount Price
              </span>
              <span style="font-size: 16px; color: #d1d5db;">${result?.bookingInfo?.payableAmount}</span>
            </div>
            <div
              style="display: flex; align-items: center; justify-content: space-between;"
            >
              <span style="font-size: 16px; color: #d1d5db;">Transaction Id</span>
              <span style="font-size: 16px; color: #d1d5db;">${result?.bookingInfo?.tranId}</span>
            </div>
          </div>
        </div>

        <div
          style="display: flex; align-items: center; justify-content: center; gap: 32px; padding: 24px 0;"
        >
          <a
            href="/"
            style="width: 100%; background-color: #2563eb; color: white; padding: 8px; border-radius: 4px; margin-top: 12px; text-align: center;"
          >
            Continue Shopping
          </a>
        </div>
      </div>
    </div>
  </div>
</body>
</html>
`);
});

const paymentFailed = catchAsyn(async (req: Request, res: Response) => {
    res.send(`
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Payment Failed</title>
        <style>
          body {
            margin: 0;
            font-family: Arial, sans-serif;
            background-color: #1a202c;
            color: #f1f5f9;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
          }
          .container {
            width: 100%;
            max-width: 500px;
            background-color: #374151;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0px 4px 6px -1px rgba(255, 0, 0, 0.5);
            text-align: center;
          }
          .error-icon {
            font-size: 100px;
            color: #ff4d4f;
            margin-bottom: 20px;
          }
          h1 {
            font-size: 24px;
            margin-bottom: 10px;
          }
          p {
            margin-bottom: 20px;
          }
          a {
            display: inline-block;
            background-color: #2563eb;
            color: white;
            padding: 10px 20px;
            border-radius: 4px;
            text-decoration: none;
            font-size: 16px;
          }
          a:hover {
            background-color: #1d4ed8;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="error-icon">❌</div>
          <h1>Payment Failed</h1>
          <p>We're sorry, but your payment could not be processed at this time.</p>
          <a href="/">Go Back to Home</a>
        </div>
      </body>
      </html>
    `);
});


export const PaymentController = {
  paymentSuccess,
  paymentFailed
};
