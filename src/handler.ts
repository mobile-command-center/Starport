import * as AWS from 'aws-sdk';
import { APIGatewayEvent, Handler } from 'aws-lambda';
import 'source-map-support/register';
import RentalFormData from './model/RentalFormData';
import TelecomFormData from './model/telecomFormData';
import RentalDTO from './model/RentalDTO';
import TelecomDTO from './model/TelecomDTO';
import RegisterService from './services/RentalService';
import TelecomService from './services/TelecomService';
import BodyParser from './utils/bodyParser';

AWS.config.region = 'us-west-2';
const mailInfo = {
  from: "support@ajungweb.co.kr",
  to: "kajkaj0815@gmail.com"
}

export const rentalRegister: Handler = async (event: APIGatewayEvent) => {
  console.log(event.requestContext.identity.userAgent);

  try {
    const body = await BodyParser(event);
    delete body['files']; 

    const registerDTO = new RentalDTO(body as RentalFormData);
    
    const registerService = RegisterService.getInstance();
    registerService.setRentalDTO(registerDTO);
    
    await registerService.sendEmail(mailInfo);

    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "text/plain; charset=utf-8"
      },
      body: '가입 신청서가 성공적으로 전송되었습니다.',
      isBase64Encoded: false
    };
  } catch(e) {
    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "text/plain; charset=utf-8"
      },
      body: {
        message: '가입 신청서 전송이 실패하였습니다.',
        input: e
      },
      isBase64Encoded: false
    };
  }
}

export const telecomRegister: Handler = async (event: APIGatewayEvent) => {
  console.log(event.requestContext.identity.userAgent);

  try {
    const body = await BodyParser(event);
    delete body['files']; 

    const telecomDTO = new TelecomDTO(body as TelecomFormData);
    
    const telecomService = TelecomService.getInstance();
    telecomService.setTelecomDTO(telecomDTO);
    
    await telecomService.sendEmail(mailInfo);

    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "text/plain; charset=utf-8"
      },
      body: '가입 신청서가 성공적으로 전송되었습니다.',
      isBase64Encoded: false
    };
  } catch(e) {
    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "text/plain; charset=utf-8"
      },
      body: {
        message: '가입 신청서 전송이 실패하였습니다.',
        input: e
      },
      isBase64Encoded: false
    };
  }
}