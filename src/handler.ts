import * as AWS from 'aws-sdk';
import { APIGatewayEvent, Context, Handler, Callback } from 'aws-lambda';
import 'source-map-support/register';
import rentalFormData from './model/rentalFormData';
import RentalDTO from './model/RentalDTO';
import RegisterService from './services/RentalService';
import BodyParser from './utils/bodyParser';

AWS.config.region = 'us-west-2';
const mailInfo = {
  from: "support@ajungweb.co.kr",
  to: "myraous@gmail.com"
}

export const rentalRegister: Handler = async (event: APIGatewayEvent, context: Context, cb: Callback) => {
  console.log('Remaining time: ', context.getRemainingTimeInMillis())
  console.log('Function name: ', context.functionName)

  try {
    const body = await BodyParser(event);
    delete body['files']; 

    const registerDTO = new RentalDTO(body as rentalFormData);
    
    const registerService = RegisterService.getInstance();
    registerService.setRentalDTO(registerDTO);
    
    await registerService.sendEmail(mailInfo);

    cb(null, {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*"
      },
      body: '가입 신청서가 성공적으로 전송되었습니다.'
    });
  } catch(e) {
    cb(null, {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*"
      },
      body: {
        message: '가입 신청서 전송이 실패하였습니다.',
        input: e
      }
    });
  }
}